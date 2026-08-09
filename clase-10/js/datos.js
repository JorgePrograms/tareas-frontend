export const productos = [
  {
    id: 1, nombre: "MacBook Pro 14", precio: 1999.99, categoria: "laptops", stock: 5,
    imagen: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
  },
  {
    id: 2, nombre: "iPhone 13 Pro", precio: 1099.99, categoria: "smartphones", stock: 8,
    imagen: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp",
  },
  {
    id: 3, nombre: "iPad Mini", precio: 499.99, categoria: "tablets", stock: 0,
    imagen: "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/thumbnail.webp",
  },
  {
    id: 4, nombre: "AirPods Max", precio: 549.99, categoria: "audio", stock: 3,
    imagen: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
  },
  { id: 5, nombre: "Apple Watch", precio: 399.99, categoria: "audio", stock: 6 },
]

/**
 * Tarea Intermedia 2: Carga productos e identifica si son datos de respaldo (Plan B)
 */
export async function obtenerProductos() {
  try {
    const respuesta = await fetch('https://api.ejemplo.com/productos');

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const productos = await respuesta.json();
    return { productos, esRespaldo: false };

  } catch (error) {
    console.warn('Cargando catálogo desde respaldo...');

    const productosRespaldo = JSON.parse(localStorage.getItem('productos_cache')) || [
      { id: 1, nombre: 'Teclado Mecánico', categoria: 'tecnologia', precio: 150 },
      { id: 2, nombre: 'Mouse Óptico', categoria: 'tecnologia', precio: 80 },
      { id: 3, nombre: 'Polera Negra', categoria: 'ropa', precio: 120 }
    ];

    return { productos: productosRespaldo, esRespaldo: true };
  }
}