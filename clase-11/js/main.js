// main.js — orquesta: pide los datos, escucha los eventos y manda a pintar.
//
// ===== PUNTO DE PARTIDA DE LA CLASE 11 =====
// Es exactamente donde terminó la Clase 10 (se cortó en el Ejercicio 3).
//
// Lo que YA funciona:
//   · el catálogo se pinta desde `productos`, que ahora llega de la API (solo laptops)
//   · los tres estados: cargando · error · vacío
//   · el carrito se ve, suma, se guarda en localStorage y se le puede quitar
//
// Lo que falta y se escribe EN CLASE:
//   Bloque 2 → los 38 productos, con Promise.all
//   Bloque 3 → el plan B y el aviso de "datos guardados"
//   Bloque 4 → el filtro por categoría, y el ESTADO DERIVADO
//   Bloque 5 → el buscador, el estado vacío de la búsqueda y el escapado (XSS)
//   Bloque 6 → el carrito con cantidades
//   Bloque 7 → el contador en la pestaña, some/every y el CHECKOUT
//
// La forma del archivo, que se mantiene todo el día:
//   los datos arriba · las funciones que pintan en el medio · los eventos abajo.
import { resumenCarrito } from "./carrito.js"
import formatearPrecio from "./formato.js"
import { tarjetaProducto, filaCarrito, aviso } from "./ui.js"
import { obtenerProductos, obtenerProductoPorId } from "./api.js"

// ---------- Referencias a la pantalla ----------
const contenedor = document.querySelector(".productos")
const cajaResumen = document.querySelector("#resumen-carrito")
const listaCarrito = document.querySelector("#lista-carrito")
const totalCarrito = document.querySelector("#total-carrito")
const selectOrden = document.querySelector("#select-orden")

// ---------- Los datos ----------
const CLAVE = "techcart_carrito"

// Ya no viene de un archivo: arranca vacío y se llena cuando llegan los datos.
let productos = []

const guardarCarrito = (items) => {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(items))
  } catch (error) {
    // setItem falla con el almacenamiento lleno, y en Safari en modo privado.
    console.warn("No se pudo guardar el carrito:", error.message)
  }
}

const cargarCarrito = () => {
  try {
    const crudo = localStorage.getItem(CLAVE)
    return crudo ? JSON.parse(crudo) : []
  } catch (error) {
    // Si el JSON guardado está corrupto, la tienda abre igual: con el carrito vacío.
    console.warn("Carrito guardado inválido, empiezo vacío:", error.message)
    return []
  }
}

let carrito = cargarCarrito()

// ---------- Las funciones que pintan ----------
// Función auxiliar para ordenar / filtrar (Estado derivado)
const productosVisibles = (lista, orden) => {
  if (!orden) return lista

  return [...lista].sort((a, b) => {
    if (orden === "precio-asc") return a.precio - b.precio
    if (orden === "precio-desc") return b.precio - a.precio
    if (orden === "rating") return b.valoracion - a.valoracion
    return 0
  })
}

// Una sola función que sabe cómo se pinta el catálogo (acepta lista opcional).
const pintarCatalogo = (lista = productos) => {
  if (!contenedor) return
  contenedor.innerHTML = lista.map(tarjetaProducto).join("")
}

// Todo lo que MUESTRA el carrito vive acá. Lee el dato y dibuja; nunca lo modifica.
const pintarCarrito = () => {
  const { cantidad, subtotal, total, envioGratis } = resumenCarrito(carrito)

  if (cajaResumen) {
    cajaResumen.textContent = `🛒 ${cantidad} productos · ${formatearPrecio(total)}`
  }

  if (listaCarrito) {
    listaCarrito.innerHTML = carrito.map(filaCarrito).join("")
  }

  if (totalCarrito) {
    const textoEnvio = envioGratis ? " 🚚 Envío gratis" : ""
    totalCarrito.textContent = cantidad === 0
      ? "Tu carrito está vacío."
      : `Subtotal: ${formatearPrecio(subtotal)}${textoEnvio} · IGV incluido · Total: ${formatearPrecio(total)}`
  }
}

// ---------- Los eventos ----------
// DELEGACIÓN: un solo listener en el contenedor, que nunca se vuelve a pintar.
// Si le pusiéramos un listener a cada botón, morirían en cuanto repintemos con innerHTML.
if (contenedor) {
  contenedor.addEventListener("click", async (evento) => {
    // 1) Click en el botón de agregar al carrito
    const boton = evento.target.closest("button[data-accion='agregar']")
    if (boton) {
      const id = Number(boton.dataset.id)   // dataset SIEMPRE devuelve texto
      const producto = productos.find(p => p.id === id)
      if (!producto) return

      // Un evento hace DOS cosas: cambia el dato y manda a pintar.
      carrito = [...carrito, producto]      // spread: un carrito nuevo, sin mutar
      guardarCarrito(carrito)
      pintarCarrito()
      return
    }

    // 2) Click en la tarjeta para ver detalle (opcional si existe #modal-detalle)
    const tarjeta = evento.target.closest("article.card")
    const modal = document.querySelector("#modal-detalle")
    if (tarjeta && modal) {
      const id = Number(tarjeta.dataset.id)
      modal.innerHTML = aviso("Cargando detalle del producto...")
      try {
        const productoDetalle = await obtenerProductoPorId(id)
        modal.innerHTML = `
          <div class="detalle p-4 bg-tarjeta rounded-lg border border-borde mt-4">
            <h2 class="text-xl font-bold">${productoDetalle.nombre}</h2>
            <p class="text-sm text-texto-suave"><strong>Marca:</strong> ${productoDetalle.marca}</p>
            <p class="my-2">${productoDetalle.descripcion}</p>
            <p>⭐ ${productoDetalle.valoracion} | Stock: ${productoDetalle.stock}</p>
            <p class="text-lg font-bold text-precio">${formatearPrecio(productoDetalle.precio)}</p>
          </div>
        `
      } catch (error) {
        modal.innerHTML = aviso(`Error al cargar detalle: ${error.message}`)
      }
    }
  })
}

// Otro listener, en la lista del carrito: estos botones no viven en el catálogo.
if (listaCarrito) {
  listaCarrito.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-accion='quitar']")
    if (!boton) return

    const indice = Number(boton.dataset.indice)
    carrito = carrito.filter((_, i) => i !== indice)   // quito por POSICIÓN
    guardarCarrito(carrito)
    pintarCarrito()
  })
}

// Listener para el selector de ordenamiento
selectOrden?.addEventListener("change", (evento) => {
  const criterio = evento.target.value
  const listaOrdenada = productosVisibles(productos, criterio)
  pintarCatalogo(listaOrdenada)
})

// ---------- El arranque, con los tres estados ----------
const arrancar = async () => {
  if (contenedor) {
    contenedor.innerHTML = aviso("Cargando productos…")                      // 1) CARGANDO
  }

  try {
    productos = await obtenerProductos()

    if (productos.length === 0) {
      if (contenedor) contenedor.innerHTML = aviso("No hay productos para mostrar.")        // 2) VACÍO
      return
    }

    // Si ya había seleccionado un orden antes de cargar
    const criterioInicial = selectOrden?.value ?? ""
    pintarCatalogo(productosVisibles(productos, criterioInicial))
  } catch (error) {
    console.warn("Falló la carga del catálogo:", error.message)
    if (contenedor) {
      contenedor.innerHTML = aviso(`No pudimos cargar los productos. ${error.message}`)  // 3) ERROR
    }
  } finally {
    // El finally corre SIEMPRE, haya salido bien o mal. En una app de verdad acá se
    // apaga un spinner o se vuelve a habilitar un botón. (Se escribió en la Clase 10.)
    console.log("La carga terminó (bien o mal), esto se ejecuta siempre")
  }
}

arrancar()
pintarCarrito()   // el carrito no depende de la API: se pinta de una