// api.js — la capa de datos. Habla con el servidor y traduce a NUESTRO modelo.
//
// Estado al terminar la Clase 10 (se cortó en el Ejercicio 3).
//
// Lo que se escribe EN LA CLASE 11 sobre este archivo:
//   Bloque 2 → sacar `pedirCategoria` con la categoría como parámetro, y pedir
//              las CUATRO categorías con Promise.all (+ .flat()).
//   Bloque 3 → el plan B: importar `datos.js` como respaldo, envolver en try/catch
//              y devolver { productos, esRespaldo } en vez del array pelado.
const BASE = "https://dummyjson.com"

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

export const obtenerProductos = async () => {
  const respuesta = await fetch(`${BASE}/products/category/laptops`)

  // fetch NO falla con un 404: hay que mirar el ok y lanzar el error uno mismo.
  if (!respuesta.ok) {
    throw new Error(`La tienda no respondió bien (${respuesta.status})`)
  }

  const datos = await respuesta.json()
  return datos.products.map(mapearProducto)
}
