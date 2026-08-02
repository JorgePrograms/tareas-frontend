// main.js — punto donde quedó la Clase 7.
// Este es el PUNTO DE PARTIDA de la Clase 8: durante la clase este archivo se
// reescribe con sintaxis moderna y al final se parte en módulos
// (datos.js · carrito.js · formato.js · ui.js · main.js).

// El catálogo de TechCart, como datos: un array de objetos.
const productos = [
  { nombre: "MacBook Pro 14", precio: 1999.99, categoria: "laptops",     stock: 5 },
  { nombre: "iPhone 13 Pro",  precio: 1099.99, categoria: "smartphones", stock: 8 },
  { nombre: "iPad Mini",      precio: 499.99,  categoria: "tablets",     stock: 0 },
  { nombre: "AirPods Max",    precio: 549.99,  categoria: "audio",       stock: 3 },
]

// Ejercicio 3 de la Clase 7: agregar un quinto producto y leer el catálogo.
productos.push({ nombre: "Apple Watch", precio: 399.99, categoria: "audio", stock: 6 })

console.log(productos[2].nombre)   // "iPad Mini" — el índice 2 es el TERCERO
console.log(productos.length)      // 5

// map — transforma cada elemento y devuelve un array del MISMO tamaño.
const nombres = productos.map(p => p.nombre)
const conIGV = productos.map(p => p.precio * 1.18)
console.log(nombres)
console.log(conIGV)

// filter — deja pasar los que cumplen y devuelve un array MÁS CHICO.
const caros = productos.filter(p => p.precio > 1000)
const disponibles = productos.filter(p => p.stock > 0)
console.table(caros)
console.table(disponibles)

// map y filter se encadenan: primero se filtra, después se transforma.
const nombresEnStock = productos.filter(p => p.stock > 0).map(p => p.nombre)
console.log(nombresEnStock)

// reduce — combina todo el array en UN solo valor. El 0 es el valor inicial.
const total = productos.reduce((suma, p) => suma + p.precio, 0)
console.log("Total: " + total)

// Ejercicio 4: nombres de los productos en oferta (menos de 600).
const enOferta = productos
  .filter(p => p.precio < 600)
  .map(p => p.nombre)
console.log(enOferta)

// Ejercicio 5: valor total del inventario (precio x stock, acumulado).
const inventario = productos.reduce((suma, p) => suma + p.precio * p.stock, 0)
console.log(inventario)   // 22849.780000000002 ← los decimales de JS, ver Clase 8
