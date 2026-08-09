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

// --- FORMATO ---
const formatearPrecio = (precio) => `S/ ${precio.toFixed(2)}`;

// --- Tarea 1 (Fácil): Catálogo en texto con map ---
const productosFormateados = productos.map(
  ({ nombre, categoria, precio }) => `${nombre} · ${categoria} · ${formatearPrecio(precio)}`
);

// --- Tarea 2 (Intermedia 1): Aplicar descuento (Inmutable) ---
function aplicarDescuento(producto, porcentaje = 10) {
  return {
    ...producto,
    precio: producto.precio * (1 - porcentaje / 100)
  };
}

// --- Tarea 3 (Intermedia 2): Buscar por nombre con ?. y ?? ---
function buscarPorNombre(items, nombre) {
  const encontrado = items.find(
    (item) => item.nombre.toLowerCase() === nombre.toLowerCase()
  );
  const nombreProd = encontrado?.nombre ?? "No lo tenemos";
  const precioProd = encontrado?.precio ?? 0;

  return `${nombreProd} · S/ ${precioProd.toFixed(2)}`;
}

// --- Tarea 4 (Difícil 1): Módulo UI / Vista ---
function fichaProducto({ nombre, categoria, precio, stock }) {
  return `
--------------------------------
PRODUCTO: ${nombre}
CATEGORÍA: ${categoria}
PRECIO: ${formatearPrecio(precio)}
ESTADO: ${stock > 0 ? `En stock (${stock} un.)` : 'AGOTADO'}
--------------------------------`;
}

function resumenStock(items) {
  const total = items.length;
  const agotados = items.filter((item) => item.stock === 0).length;
  const hayAgotados = items.some((item) => item.stock === 0);

  const detalleAgotados = hayAgotados 
    ? `, ${agotados} agotado${agotados !== 1 ? 's' : ''}` 
    : ', sin agotados';

  return `${total} productos${detalleAgotados}`;
}

function listaCatalogo(items) {
  return items
    .map(({ nombre, categoria, precio }) => `${nombre} · ${categoria} · S/ ${precio.toFixed(2)}`)
    .join("\n");
}

// --- Tarea 5 (Difícil 2): Carrito de verdad y Resumen ---
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


// ==============================================================================
// DEMOSTRACIONES Y PRUEBAS REQUERIDAS DE LAS TAREAS
// ==============================================================================

console.log("\n--- DEMOSTRACIÓN TAREA 1 ---");
console.log(productosFormateados);

console.log("\n--- DEMOSTRACIÓN TAREA 2 ---");
const prod1 = productos[0];
const prod2 = productos[1];

const prod1Rebajado = aplicarDescuento(prod1, 10);
const prod2Rebajado = aplicarDescuento(prod2, 20);

console.log("Precio Rebajado P1:", prod1Rebajado.precio);
console.log("Precio Rebajado P2:", prod2Rebajado.precio);
console.log("Original P1 (Demuestra Inmutabilidad):", prod1.precio);
console.log("Original P2 (Demuestra Inmutabilidad):", prod2.precio);

console.log("\n--- DEMOSTRACIÓN TAREA 3 ---");
console.log(buscarPorNombre(productos, "iPad Mini"));
console.log(buscarPorNombre(productos, "PlayStation 5"));

console.log("\n--- DEMOSTRACIÓN TAREA 4 ---");
console.log(fichaProducto(productos[0]));
console.log("Resumen de Stock:", resumenStock(productos));

console.log("\n--- DEMOSTRACIÓN TAREA 5 ---");
const carritoInicial = [];
const c1 = agregarAlCarrito(carritoInicial, productos[0]);
const c2 = agregarAlCarrito(c1, productos[1]);
const carritoFinal = agregarAlCarrito(c2, productos[3]);

console.log("Resumen del Carrito Final:", resumenCarrito(carritoFinal));
console.log("¿El carrito inicial sigue estando vacío?:", carritoInicial.length === 0);