// api.js — la capa de datos. Habla con el servidor y traduce a NUESTRO modelo.
//
// Estado al terminar la Clase 11 (Bloques 2 y 3).
//
// Lo que se le hace EN LA CLASE 12:
//   Bloque 4 → `import type { Producto }` y anotar el retorno del adaptador
//   Bloque 6 → el `p` deja de ser `any`: se declara `ProductoAPI` con TODO opcional,
//              y `obtenerProductos` promete `Promise<{productos, esRespaldo}>`
import { productos as respaldo } from "./datos.js"

const BASE = "https://dummyjson.com"

const CATEGORIAS = ["laptops", "smartphones", "tablets", "mobile-accessories"]

// El traductor (adaptador): de un producto de la API a un producto de TechCart.
// Las protecciones con ?? viven acá, en UN solo lugar: el resto del proyecto ya
// puede confiar en que un producto siempre tiene stock, marca y valoración.
const mapearProducto = (p) => ({
  id: p.id,
  nombre: p.title,
  precio: p.price,
  categoria: p.category,
  stock: p.stock ?? 0,
  imagen: p.thumbnail,
  marca: p.brand ?? "Sin marca",
  valoracion: p.rating ?? 0,
})

// Pide UNA categoría y devuelve sus productos ya traducidos.
// No se exporta: es un ayudante interno. La interfaz pública de este módulo
// es solo `obtenerProductos`.
const pedirCategoria = async (categoria) => {
  const respuesta = await fetch(`${BASE}/products/category/${categoria}`)

  // fetch NO falla con un 404: hay que mirar el ok y lanzar el error uno mismo.
  if (!respuesta.ok) {
    throw new Error(`No pude traer ${categoria} (${respuesta.status})`)
  }

  const datos = await respuesta.json()
  return datos.products.map(mapearProducto)
}

// Devuelve DOS cosas: los productos y si tuvo que usar el plan B.
// El try/catch va acá, en la capa de datos, y no en main.js: quien sabe qué hacer
// cuando los datos no llegan es esta capa, no la pantalla.
export const obtenerProductos = async () => {
  try {
    const listas = await Promise.all(CATEGORIAS.map(pedirCategoria))
    return { productos: listas.flat(), esRespaldo: false }
  } catch (error) {
    console.warn("La API no respondió, uso el respaldo local:", error.message)
    return { productos: respaldo, esRespaldo: true }
  }
}
