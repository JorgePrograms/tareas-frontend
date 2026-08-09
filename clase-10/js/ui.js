// ui.js — cómo se ve un producto. No calcula nada y no sabe de dónde vienen los datos.
import formatearPrecio from "./formato.js";
import { resumenCarrito } from './carrito.js';

const contenedorCatalogo = document.querySelector('#catalogo');
const contenedorCarrito = document.querySelector('#lista-carrito');
const avisoRespaldoEl = document.querySelector('#aviso-respaldo');
const resumenCarritoEl = document.querySelector('#resumen-carrito');

// Versión en texto, de la Clase 8.
export const fichaProducto = ({ nombre, categoria, precio, stock }) => `
  ${nombre}
  categoría: ${categoria}
  precio:    ${formatearPrecio(precio)}
  ${stock > 0 ? `En stock (${stock})` : "Agotado"}
`

// La misma idea, pero con etiquetas HTML adentro: esto es lo que innerHTML mete en la página.
// El data-id y el data-accion son para que el listener sepa QUÉ producto y QUÉ hacer.
export const tarjetaProducto = ({ id, nombre, precio, stock, imagen }) => `
  <article class="card group" data-id="${id}">
    <figure class="w-full overflow-hidden rounded-lg m-0">
      ${imagen
        ? `<img src="${imagen}" alt="${nombre}" class="w-full aspect-square object-contain transition group-hover:scale-105" />`
        : `<div class="w-full aspect-square grid place-items-center text-5xl">📦</div>`}
    </figure>
    <h3 class="text-base font-semibold mt-2 mb-1">${nombre}</h3>
    <p class="m-0"><strong class="text-precio text-lg font-bold">${formatearPrecio(precio)}</strong></p>
    <button type="button" class="btn mt-2" data-accion="agregar" data-id="${id}" ${stock === 0 ? "disabled" : ""}>
      ${stock > 0 ? "Agregar al carrito" : "Agotado"}
    </button>
  </article>
`


/**
 * Tarea Difícil 1: Pinta catálogo y maneja estado vacío para el buscador
 */
export function pintarCatalogo(productos, busqueda = '') {
  if (!contenedorCatalogo) return;

  if (productos.length === 0) {
    contenedorCatalogo.innerHTML = `
      <div class="estado-vacio">
        <p>No se encontraron resultados para "<strong>${busqueda}</strong>"</p>
      </div>
    `;
    return;
  }

  contenedorCatalogo.innerHTML = productos.map(p => `
    <div class="tarjeta-producto" data-id="${p.id}">
      <h3>${p.nombre}</h3>
      <p class="categoria">Categoría: ${p.categoria}</p>
      <p class="precio">${formatearMoneda(p.precio)}</p>
      <button class="btn-agregar" data-id="${p.id}">Agregar al carrito</button>
    </div>
  `).join('');
}

/**
 * Tarea Difícil 2: Pinta los ítems del carrito con controles (+ / -) y totales
 */
export function pintarCarrito(carrito) {
  if (!contenedorCarrito) return;

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
    if (resumenCarritoEl) resumenCarritoEl.innerHTML = '';
    return;
  }

  contenedorCarrito.innerHTML = carrito.map(item => `
    <div class="item-carrito" data-id="${item.id}">
      <div class="info-item">
        <span class="nombre-item">${item.nombre}</span>
        <span class="precio-item">${formatearMoneda(item.precio)} c/u</span>
      </div>
      <div class="controles-cantidad">
        <button class="btn-restar" data-id="${item.id}">-</button>
        <span class="cantidad-item">${item.cantidad}</span>
        <button class="btn-sumar" data-id="${item.id}">+</button>
      </div>
      <span class="subtotal-item">${formatearMoneda(item.precio * item.cantidad)}</span>
      <button class="btn-eliminar" data-id="${item.id}">Quitar</button>
    </div>
  `).join('');

  // Expandimos los ítems según su cantidad para entregárselos a resumenCarrito() tal como el profesor lo diseñó
  if (resumenCarritoEl) {
    const itemsDesglosados = carrito.flatMap(item => Array(item.cantidad).fill(item));
    const { subtotal, total } = resumenCarrito(itemsDesglosados);
    const montoIGV = total - subtotal;

    resumenCarritoEl.innerHTML = `
      <div class="resumen-totales">
        <p>Subtotal: <span>${formatearMoneda(subtotal)}</span></p>
        <p>IGV (18%): <span>${formatearMoneda(montoIGV)}</span></p>
        <p class="total">Total: <span>${formatearMoneda(total)}</span></p>
      </div>
    `;
  }
}

/**
 * Tarea Intermedia 2: Alerta visual para el modo de respaldo (Plan B)
 */
export function mostrarAvisoRespaldo(esRespaldo) {
  if (!avisoRespaldoEl) return;

  if (esRespaldo) {
    avisoRespaldoEl.textContent = '⚠️ Modo de respaldo: mostrando información guardada previamente.';
    avisoRespaldoEl.classList.remove('oculto');
  } else {
    avisoRespaldoEl.classList.add('oculto');
  }
}

/**
 * Tarea Fácil: Actualiza el título de la pestaña del navegador
 */
export function actualizarTituloPestana(totalUnidades) {
  document.title = totalUnidades > 0 
    ? `Carrito (${totalUnidades}) - Mi Tienda` 
    : 'Mi Tienda';
}