// ui.js — cómo se ve un producto. No calcula nada y no sabe de dónde vienen los datos.
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
