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
import { obtenerProductos } from './datos.js';
import { 
  agregarAlCarrito, 
  actualizarCantidad, 
  eliminarDelCarrito, 
  obtenerCarrito, 
  obtenerTotalUnidades 
} from './carrito.js';
import { 
  pintarCatalogo, 
  pintarCarrito, 
  mostrarAvisoRespaldo, 
  actualizarTituloPestana 
} from './ui.js';

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

let productosGlobales = [];

function actualizarEstadoCarritoUI() {
  const carritoActual = obtenerCarrito();
  pintarCarrito(carritoActual);
  actualizarTituloPestana(obtenerTotalUnidades());
}

async function inicializarApp() {
  const { productos, esRespaldo } = await obtenerProductos();
  productosGlobales = productos;

  mostrarAvisoRespaldo(esRespaldo);
  pintarCatalogo(productosGlobales);
  actualizarEstadoCarritoUI();
}

// Tarea Intermedia 1: Filtrar por Categoría
const listaCategorias = document.querySelector('#lista-categorias');
if (listaCategorias) {
  listaCategorias.addEventListener('click', (e) => {
    const enlace = e.target.closest('[data-categoria]');
    if (!enlace) return;

    e.preventDefault();
    const categoria = enlace.dataset.categoria;

    const filtrados = categoria === 'todas'
      ? productosGlobales
      : productosGlobales.filter(p => p.categoria === categoria);

    pintarCatalogo(filtrados);
  });
}

// Tarea Difícil 1: Buscador en tiempo real
const inputBuscador = document.querySelector('#buscador');
if (inputBuscador) {
  inputBuscador.addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase().trim();

    const resultados = productosGlobales.filter(p => 
      p.nombre.toLowerCase().includes(termino)
    );

    pintarCatalogo(resultados, termino);
  });
}

// Evento: Botón Agregar al carrito
const contenedorCatalogo = document.querySelector('#catalogo');
if (contenedorCatalogo) {
  contenedorCatalogo.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-agregar')) {
      const id = Number(e.target.dataset.id);
      const producto = productosGlobales.find(p => p.id === id);

      if (producto) {
        agregarAlCarrito(producto);
        actualizarEstadoCarritoUI();
      }
    }
  });
}

// Tarea Difícil 2: Controles del carrito (+, -, eliminar)
const contenedorCarrito = document.querySelector('#lista-carrito');
if (contenedorCarrito) {
  contenedorCarrito.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains('btn-sumar')) {
      actualizarCantidad(id, 1);
    } else if (e.target.classList.contains('btn-restar')) {
      actualizarCantidad(id, -1);
    } else if (e.target.classList.contains('btn-eliminar')) {
      eliminarDelCarrito(id);
    }

    actualizarEstadoCarritoUI();
  });
}

document.addEventListener('DOMContentLoaded', inicializarApp);
