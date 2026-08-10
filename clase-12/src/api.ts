import { productos } from './datos';
// api.js — la capa de datos. Habla con el servidor y traduce a NUESTRO modelo.
//
// Estado al terminar la Clase 11 (Bloques 2 y 3).
//
// Lo que se le hace EN LA CLASE 12:
//   Bloque 4 → `import type { Producto }` y anotar el retorno del adaptador
//   Bloque 6 → el `p` deja de ser `any`: se declara `ProductoAPI` con TODO opcional,
//              y `obtenerProductos` promete `Promise<{productos, esRespaldo}>`
import { productos as respaldo } from "./datos.js";
import { Producto, ProductoAPI } from "./tipos";

const BASE = "https://dummyjson.com"

const CATEGORIAS = ["laptops", "smartphones", "tablets", "mobile-accessories"]

// El traductor (adaptador): de un producto de la API a un producto de TechCart.
// Las protecciones con ?? viven acá, en UN solo lugar: el resto del proyecto ya
// puede confiar en que un producto siempre tiene stock, marca y valoración.
const mapearProducto = (p: ProductoAPI) => ({
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
const pedirCategoria = async (categoria: string): Promise<Producto[]> => {
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
export const obtenerProductos = async (): Promise<{ productos: Producto[]; esRespaldo: boolean }> => {
  try {
    const listas = await Promise.all(CATEGORIAS.map(pedirCategoria));
    return { productos: listas.flat(), esRespaldo: false };
  } catch (error) {
    const err = error as Error;
    console.warn("La API no respondió, uso el respaldo local:", err.message);
    return { productos: respaldo as Producto[], esRespaldo: true };
  }
};

// --- Tarea 4: Obtener un solo producto para el detalle ---
export const obtenerProductoPorId = async (id: number): Promise<Producto> => {
  const respuesta = await fetch(`${BASE}/products/${id}`);
  if (!respuesta.ok) throw new Error(`No se encontró el producto ${id}`);
  const datos: ProductoAPI = await respuesta.json();
  return mapearProducto(datos);
};
