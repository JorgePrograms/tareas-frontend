// ui.js — cómo se ve un producto. No calcula nada y no sabe de dónde vienen los datos.
//
// Estado al terminar la Clase 10.
//
// Lo que se escribe EN LA CLASE 11 sobre este archivo:
//   Bloque 5 → `escaparTexto`, para que el texto del usuario no se ejecute (XSS).
//   Bloque 6 → `filaCarrito` se reescribe: ya NO recibe la posición, muestra
//              `× cantidad`, multiplica el precio y trae los botones − / + / Quitar.
import formatearPrecio from "./formato.js"

// Versión en texto, de la Clase 8.
export const fichaProducto = ({ nombre, categoria, precio, stock }) => `
  ${nombre}
  categoría: ${categoria}
  precio:    ${formatearPrecio(precio)}
  ${stock > 0 ? `En stock (${stock})` : "Agotado"}
`

// La misma idea, pero con etiquetas HTML adentro: esto es lo que innerHTML mete en la página.
// El data-id y el data-accion son para que el listener sepa QUÉ producto y QUÉ hacer.
export const tarjetaProducto = ({ id, nombre, precio, stock, imagen, marca, valoracion }) => `
  <article class="card group" data-id="${id}">
    <figure class="w-full overflow-hidden rounded-lg m-0">
      ${imagen
        ? `<img src="${imagen}" alt="${nombre}" class="w-full aspect-square object-contain transition group-hover:scale-105" />`
        : `<div class="w-full aspect-square grid place-items-center text-5xl">📦</div>`}
      <figcaption class="text-texto-suave text-xs uppercase tracking-wide">${marca}</figcaption>
    </figure>
    <h3 class="text-base font-semibold mt-2 mb-1">${nombre}</h3>
    <p class="m-0"><strong class="text-precio text-lg font-bold">${formatearPrecio(precio)}</strong></p>
    <p class="m-0 text-sm">⭐ ${valoracion}</p>
    <button type="button" class="btn mt-2" data-accion="agregar" data-id="${id}" ${stock === 0 ? "disabled" : ""}>
      ${stock > 0 ? "Agregar al carrito" : "Agotado"}
    </button>
  </article>
`

// Una fila del carrito. Recibe el producto y su POSICIÓN en el array.
// (Se quita por posición y no por id porque hoy el mismo producto puede entrar
//  dos veces: un filter por id se llevaría las dos filas. Se arregla en la C11.)
export const filaCarrito = ({ nombre, precio }, indice) => `
  <li class="flex justify-between items-center border-b border-borde py-2">
    <span>${nombre}</span>
    <span class="flex gap-3 items-center">
      <strong class="text-precio">${formatearPrecio(precio)}</strong>
      <button type="button" class="btn" data-accion="quitar" data-indice="${indice}">Quitar</button>
    </span>
  </li>
`

// Un mensaje que ocupa todo el ancho del grid del catálogo.
// Sirve para los tres estados: cargando, error y vacío.
export const aviso = (texto) => `
  <p class="col-span-full text-center text-texto-suave py-8">${texto}</p>
`
