// main.js — orquesta: pide los datos, escucha los eventos y manda a pintar.
//
// Este es el PUNTO DE PARTIDA de la Clase 10: es exactamente donde quedó la Clase 9.
// El catálogo ya se pinta desde el array y los botones ya responden al clic, pero el
// carrito solo se ve en la consola.
//
// Lo que falta y se hace EN CLASE:
//   1. que el carrito se VEA en la página (estado → render)
//   2. localStorage: que sobreviva al refresco
//   3. la lista del carrito y quitar productos
//   4. fetch: traer los productos de verdad desde una API (y async/await, errores)
import { productos } from "./datos.js"
import { resumenCarrito } from "./carrito.js"
import formatearPrecio from "./formato.js"
import { tarjetaProducto } from "./ui.js"

const contenedor = document.querySelector(".productos")

// Una sola función que sabe cómo se pinta el catálogo.
const pintarCatalogo = () => {
  contenedor.innerHTML = productos.map(tarjetaProducto).join("")
}

// El carrito, por ahora, vive solo en memoria.
let carrito = []

// DELEGACIÓN: un solo listener en el contenedor, que nunca se vuelve a pintar.
// Si le pusiéramos un listener a cada botón, morirían en cuanto repintemos con innerHTML.
contenedor.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-accion='agregar']")
  if (!boton) return

  const id = Number(boton.dataset.id)   // dataset SIEMPRE devuelve texto
  const producto = productos.find(p => p.id === id)
  if (!producto) return

  carrito = [...carrito, producto]      // spread: un carrito nuevo, sin mutar
  console.log(carrito)                  // ← en la Clase 10 esto se convierte en pintarCarrito()
  console.log(resumenCarrito(carrito))
  console.log(formatearPrecio(resumenCarrito(carrito).total))
})

pintarCatalogo()
