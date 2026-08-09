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
import { obtenerProductos } from "./api.js"

// ---------- Referencias a la pantalla ----------
const contenedor = document.querySelector(".productos")
const cajaResumen = document.querySelector("#resumen-carrito")
const listaCarrito = document.querySelector("#lista-carrito")
const totalCarrito = document.querySelector("#total-carrito")

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
// Una sola función que sabe cómo se pinta el catálogo.
const pintarCatalogo = () => {
  contenedor.innerHTML = productos.map(tarjetaProducto).join("")
}

// Todo lo que MUESTRA el carrito vive acá. Lee el dato y dibuja; nunca lo modifica.
const pintarCarrito = () => {
  const { cantidad, subtotal, total } = resumenCarrito(carrito)

  cajaResumen.textContent = `🛒 ${cantidad} productos · ${formatearPrecio(total)}`

  listaCarrito.innerHTML = carrito.map(filaCarrito).join("")

  totalCarrito.textContent = cantidad === 0
    ? "Tu carrito está vacío."
    : `Subtotal: ${formatearPrecio(subtotal)} · IGV incluido · Total: ${formatearPrecio(total)}`
}

// ---------- Los eventos ----------
// DELEGACIÓN: un solo listener en el contenedor, que nunca se vuelve a pintar.
// Si le pusiéramos un listener a cada botón, morirían en cuanto repintemos con innerHTML.
contenedor.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-accion='agregar']")
  if (!boton) return

  const id = Number(boton.dataset.id)   // dataset SIEMPRE devuelve texto
  const producto = productos.find(p => p.id === id)
  if (!producto) return

  // Un evento hace DOS cosas: cambia el dato y manda a pintar.
  carrito = [...carrito, producto]      // spread: un carrito nuevo, sin mutar
  guardarCarrito(carrito)
  pintarCarrito()
})

// Otro listener, en la lista del carrito: estos botones no viven en el catálogo.
listaCarrito.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-accion='quitar']")
  if (!boton) return

  const indice = Number(boton.dataset.indice)
  carrito = carrito.filter((producto, i) => i !== indice)   // quito por POSICIÓN
  guardarCarrito(carrito)
  pintarCarrito()
})

// ---------- El arranque, con los tres estados ----------
const arrancar = async () => {
  contenedor.innerHTML = aviso("Cargando productos…")                      // 1) CARGANDO

  try {
    productos = await obtenerProductos()

    if (productos.length === 0) {
      contenedor.innerHTML = aviso("No hay productos para mostrar.")        // 2) VACÍO
      return
    }

    pintarCatalogo()
  } catch (error) {
    console.warn("Falló la carga del catálogo:", error.message)
    contenedor.innerHTML = aviso(`No pudimos cargar los productos. ${error.message}`)  // 3) ERROR
  } finally {
    // El finally corre SIEMPRE, haya salido bien o mal. En una app de verdad acá se
    // apaga un spinner o se vuelve a habilitar un botón. (Se escribió en la Clase 10.)
    console.log("La carga terminó (bien o mal), esto se ejecuta siempre")
  }
}

arrancar()
pintarCarrito()   // el carrito no depende de la API: se pinta de una
