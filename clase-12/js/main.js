// main.js — orquesta: pide los datos, escucha los eventos y manda a pintar.
//
// ===== PUNTO DE PARTIDA DE LA CLASE 12 (TypeScript) =====
// Es exactamente donde se cortó la Clase 11: al terminar el Ejercicio 4 (3:25).
//
// Lo que YA funciona:
//   · los 38 productos, pedidos en paralelo con Promise.all
//   · el plan B con su aviso honesto de "datos guardados"
//   · el filtro por categoría y el buscador, combinados por ESTADO DERIVADO
//   · el estado vacío de la búsqueda, con el término escapado
//   · el carrito con cantidades, tope de stock y persistencia
//
// Lo que quedó SIN dictar y se hace en la Clase 12:
//   Bloque 1 → document.title y el botón de confirmar con `some`  (en JavaScript)
//   Bloque 7 → el CHECKOUT completo                              (ya en TypeScript)
//
// La forma del archivo, que no cambia: los datos arriba, las funciones que pintan
// en el medio, los eventos abajo. Un evento nunca toca la pantalla: cambia un dato
// y manda a pintar.
import { resumenCarrito, agregarItem, cambiarCantidad, quitarItem } from "./carrito.js"
import formatearPrecio from "./formato.js"
import { tarjetaProducto, filaCarrito, aviso, escaparTexto } from "./ui.js"
import { obtenerProductos } from "./api.js"

// ---------- Referencias a la pantalla ----------
const contenedor = document.querySelector(".productos")
const cajaResumen = document.querySelector("#resumen-carrito")
const listaCarrito = document.querySelector("#lista-carrito")
const totalCarrito = document.querySelector("#total-carrito")
const listaCategorias = document.querySelector("#categorias")
const tituloCatalogo = document.querySelector("#titulo-catalogo")
const buscador = document.querySelector("#buscador")
const avisoRespaldo = document.querySelector("#aviso-respaldo")

// ---------- Los datos ----------
const CLAVE = "techcart_carrito"

let productos = []              // TODOS los productos, tal como llegaron. No se toca.
let categoriaActiva = "todas"   // qué categoría eligió el usuario
let etiquetaActiva = "productos"// cómo se llama esa categoría en la pantalla
let termino = ""                // qué escribió en el buscador

const guardarCarrito = (items) => {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(items))
  } catch (error) {
    console.warn("No se pudo guardar el carrito:", error.message)
  }
}

const cargarCarrito = () => {
  try {
    const crudo = localStorage.getItem(CLAVE)
    const items = crudo ? JSON.parse(crudo) : []

    // Los items guardados por la versión vieja no tienen cantidad: se la ponemos.
    // Sanear EN LA PUERTA, igual que el adaptador con la API.
    return items.map(item => ({ ...item, cantidad: item.cantidad ?? 1 }))
  } catch (error) {
    console.warn("Carrito guardado inválido, empiezo vacío:", error.message)
    return []
  }
}

let carrito = cargarCarrito()

// ---------- ESTADO DERIVADO ----------
// Lo que se VE no es un dato guardado: se CALCULA a partir de los tres de arriba.
// Los dos filtros se combinan solos porque este es el ÚNICO lugar que decide qué se ve.
const productosVisibles = () => {
  const porCategoria = categoriaActiva === "todas"
    ? productos
    : productos.filter(p => p.categoria === categoriaActiva)

  const buscado = termino.trim().toLowerCase()
  if (buscado === "") return porCategoria

  return porCategoria.filter(p =>
    p.nombre.toLowerCase().includes(buscado) ||
    p.marca.toLowerCase().includes(buscado)
  )
}

// ---------- Las funciones que pintan ----------
const pintarCatalogo = () => {
  const visibles = productosVisibles()

  if (visibles.length === 0) {
    // El término va ESCAPADO: es texto del usuario dentro de innerHTML.
    contenedor.innerHTML = aviso(`No encontramos nada para "${escaparTexto(termino)}".`)
    return
  }

  contenedor.innerHTML = visibles.map(tarjetaProducto).join("")
}

const pintarTituloCatalogo = () => {
  tituloCatalogo.textContent = categoriaActiva === "todas"
    ? "Catálogo de productos"
    : `Catálogo · ${etiquetaActiva}`
}

// Recorro los CINCO enlaces y a cada uno le pregunto "¿sos vos el activo?".
// Hay un dato, y la pantalla lo refleja entero.
const marcarCategoriaActiva = () => {
  listaCategorias.querySelectorAll("a[data-categoria]").forEach((enlace) => {
    enlace.classList.toggle("font-bold", enlace.dataset.categoria === categoriaActiva)
  })
}

// Todo lo que MUESTRA el carrito vive acá.
// ⚠️ Clase 12, Bloque 1: acá abajo van document.title y el botón de confirmar.
const pintarCarrito = () => {
  const { cantidad, subtotal, total } = resumenCarrito(carrito)

  cajaResumen.textContent = `🛒 ${cantidad} productos · ${formatearPrecio(total)}`

  listaCarrito.innerHTML = carrito.map(filaCarrito).join("")

  totalCarrito.textContent = cantidad === 0
    ? "Tu carrito está vacío."
    : `Subtotal: ${formatearPrecio(subtotal)} · IGV incluido · Total: ${formatearPrecio(total)}`
}

// ---------- Los eventos ----------
// DELEGACIÓN: el listener vive en el contenedor, que nunca se reemplaza.
// Por eso el filtro puede repintar el catálogo entero sin matar los botones.
contenedor.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-accion='agregar']")
  if (!boton) return

  const id = Number(boton.dataset.id)   // dataset SIEMPRE devuelve texto
  // Busco en la lista COMPLETA, no en la filtrada: el id es único en toda la tienda.
  const producto = productos.find(p => p.id === id)
  if (!producto) return

  carrito = agregarItem(carrito, producto)
  guardarCarrito(carrito)
  pintarCarrito()
})

// Un solo listener para los tres botones del carrito.
listaCarrito.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-accion]")
  if (!boton) return

  const id = Number(boton.dataset.id)
  const accion = boton.dataset.accion

  if (accion === "mas")    carrito = cambiarCantidad(carrito, id, 1)
  if (accion === "menos")  carrito = cambiarCantidad(carrito, id, -1)
  if (accion === "quitar") carrito = quitarItem(carrito, id)

  guardarCarrito(carrito)
  pintarCarrito()
})

listaCategorias.addEventListener("click", (evento) => {
  const enlace = evento.target.closest("a[data-categoria]")
  if (!enlace) return

  evento.preventDefault()      // el <a href="#"> quiere navegar; se lo prohíbo

  categoriaActiva = enlace.dataset.categoria
  etiquetaActiva = enlace.textContent
  marcarCategoriaActiva()
  pintarTituloCatalogo()
  pintarCatalogo()
})

// El evento input se dispara con CADA tecla (y al pegar, y al dictar por voz).
buscador.addEventListener("input", (evento) => {
  termino = evento.target.value
  pintarCatalogo()
})

// ---------- El arranque, con los tres estados ----------
const arrancar = async () => {
  contenedor.innerHTML = aviso("Cargando productos…")                      // 1) CARGANDO

  try {
    const { productos: recibidos, esRespaldo } = await obtenerProductos()
    productos = recibidos

    // Una línea que cubre los dos casos: hay un dato y la pantalla lo refleja.
    avisoRespaldo.hidden = !esRespaldo
    avisoRespaldo.textContent =
      "⚠️ Mostrando información guardada: no pudimos conectar con la tienda."

    if (productos.length === 0) {
      contenedor.innerHTML = aviso("No hay productos para mostrar.")        // 2) VACÍO
      return
    }

    pintarCatalogo()
  } catch (error) {
    console.warn("Falló la carga del catálogo:", error.message)
    contenedor.innerHTML = aviso(`No pudimos cargar los productos. ${error.message}`)  // 3) ERROR
  }
}

arrancar()
marcarCategoriaActiva()
pintarTituloCatalogo()
pintarCarrito()   // el carrito no depende de la API: se pinta de una
