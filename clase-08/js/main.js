// main.js — punto donde quedó la Clase 7.
// Este es el PUNTO DE PARTIDA de la Clase 8: durante la clase este archivo se
// reescribe con sintaxis moderna y al final se parte en módulos
// (datos.js · carrito.js · formato.js · ui.js · main.js).

// El catálogo de TechCart, como datos: un array de objetos.
const productos = [
  { nombre: "MacBook Pro 14", precio: 1999.99, categoria: "laptops",     stock: 5, hijos : {
    nombre : "Edward",
    apellido : "Carlos",
    dni: 34343434,
    envio: {costo: 10}
  } },
  { nombre: "iPhone 13 Pro",  precio: 1099.99, categoria: "smartphones", stock: 8 },
  { nombre: "iPad Mini",      precio: 499.99,  categoria: "tablets",     stock: 0 },
  { nombre: "AirPods Max",    precio: 549.99,  categoria: "audio",       stock: 3 },
]


/ --- Tarea 1: Formatear precios con map ---
const formatearPrecio = (precio) => `$${precio.toFixed(2)}`;
const productosFormateados = productos.map(
  ({ nombre, categoria, precio }) => `${nombre} · ${categoria} · ${formatearPrecio(precio)}`
);

// --- Tarea 2: Aplicar descuento (Inmutable) ---
function aplicarDescuento(producto, pct = 10) {
  return {
    ...producto,
    precio: producto.precio * (1 - pct / 100)
  };
}

// --- Tarea 3: Buscar por nombre ---
function buscarPorNombre(items, nombre) {
  const encontrado = items.find(
    (item) => item.nombre.toLowerCase() === nombre.toLowerCase()
  );
  const nombreProd = encontrado?.nombre ?? "No lo tenemos";
  const precioProd = encontrado?.precio ?? 0;

  return `${nombreProd} · $${precioProd.toFixed(2)}`;
}

// --- Tarea 4: Formato de catálogo y resumen de stock ---
function listaCatalogo(items) {
  return items
    .map(({ nombre, categoria, precio }) => `${nombre} · ${categoria} · $${precio.toFixed(2)}`)
    .join("\n");
}

function resumenStock(items) {
  const total = items.length;
  const agotados = items.filter((item) => item.stock === 0).length;
  return `${total} productos, ${agotados} agotado${agotados !== 1 ? 's' : ''}`;
}

// --- Tarea 5: Carrito y Resumen con IGV ---
function agregarAlCarrito(carrito, producto) {
  return [...carrito, producto];
}

function resumenCarrito(carrito) {
  const cantidad = carrito.length;
  const subtotal = carrito.reduce((acc, item) => acc + item.precio, 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  return {
    cantidad,
    subtotal: Number(subtotal.toFixed(2)),
    igv: Number(igv.toFixed(2)),
    total: Number(total.toFixed(2))
  };
}



// Ejercicio 3 de la Clase 7: agregar un quinto producto y leer el catálogo.
productos.push({ nombre: "Apple Watch", precio: 399.99, categoria: "audio", stock: 6 });
//COPIA LA LISAT DE PRODUCTOS Y PEGALA EN COPIA

const magicMouse = {
  nombre : "Magic Mouse",
  precio: 79.99,
  categoria : "accesorios",
  stock : 12
};
const copia = [...productos];
// copia.push(magicMouse);

const copiaConNuevo = [magicMouse, ...productos, magicMouse];
console.log(productos.length);
console.log(copiaConNuevo.length);

const laptops = productos.filter(p => p.categoria === "laptops");
const audio = productos.filter(p => p.categoria === "audio");
const seleccionados = [...laptops, ...audio];
// console.log(seleccionados);
// console.log(productos);

const porPrecio = [...productos].sort((a,b) => a.precio - b.precio);
// console.log(porPrecio);

const rebajado = {...productos[0], hijos: {
  nombre : "edward",
}};
console.log(productos[0]);
console.log(rebajado);