// ui.js — cómo se ve un producto. No calcula nada y no sabe de dónde vienen los datos.
//
// Estado al terminar la Clase 11 (Bloques 5 y 6).
//
// Lo que se le hace EN LA CLASE 12:
//   Bloque 4 → `{ ... }: Producto` en tarjetaProducto (y ahí salta el primer typo),
//              `filaCarrito(item: ItemCarrito)` y `aviso(texto: string): string`.
import formatearPrecio from "./formato.js"

// Convierte cualquier texto en texto SEGURO para meter dentro de innerHTML.
// Sin esto, lo que escribe el usuario en el buscador se EJECUTA (XSS).
export const escaparTexto = (texto) => {
  const caja = document.createElement("div")
  caja.textContent = texto     // textContent trata todo como TEXTO, nunca como HTML
  return caja.innerHTML        // y lo devuelve ya convertido: < se volvió &lt;
}

// Versión en texto, de la Clase 8.
export const fichaProducto = ({ nombre, categoria, precio, stock }) => `
  ${nombre}
  categoría: ${categoria}
  precio:    ${formatearPrecio(precio)}
  ${stock > 0 ? `En stock (${stock})` : "Agotado"}
`

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

// Una fila del carrito. Ya NO necesita la posición: cada item se identifica por su id.
// Muestra la cantidad, el precio multiplicado y los tres botones de acción.
export const filaCarrito = ({ id, nombre, precio, cantidad }) => `
  <li class="flex justify-between items-center border-b border-borde py-2">
    <span>${nombre}</span>
    <span class="flex gap-3 items-center">
      <button type="button" class="btn" data-accion="menos" data-id="${id}">−</button>
      <strong>× ${cantidad}</strong>
      <button type="button" class="btn" data-accion="mas" data-id="${id}">+</button>
      <strong class="text-precio">${formatearPrecio(precio * cantidad)}</strong>
      <button type="button" class="btn" data-accion="quitar" data-id="${id}">Quitar</button>
    </span>
  </li>
`

// Un mensaje que ocupa todo el ancho del grid del catálogo.
// Sirve para los tres estados: cargando, error y vacío.
export const aviso = (texto) => `
  <p class="col-span-full text-center text-texto-suave py-8">${texto}</p>
`
