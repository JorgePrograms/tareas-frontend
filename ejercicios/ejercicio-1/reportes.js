// Array de datos inicial (mínimo 8 productos)
const productos = [
  { nombre: 'Laptop Pro 15', precio: 3500, stock: 5, categoria: 'Laptops' },
  { nombre: 'Mouse Inalámbrico', precio: 80, stock: 15, categoria: 'Accesorios' },
  { nombre: 'Teclado Mecánico', precio: 250, stock: 3, categoria: 'Accesorios' },
  { nombre: 'Monitor 27 IPS', precio: 1200, stock: 8, categoria: 'Monitores' },
  { nombre: 'Audífonos Bluetooth', precio: 180, stock: 2, categoria: 'Audio' },
  { nombre: 'Silla Gamer', precio: 850, stock: 4, categoria: 'Muebles' },
  { nombre: 'Webcam HD', precio: 150, stock: 10, categoria: 'Video' },
  { nombre: 'Disco SSD 1TB', precio: 320, stock: 1, categoria: 'Almacenamiento' },
];

// 1. Unidades totales (reduce)
const unidadesTotales = (prods) =>
  prods.reduce((acumulado, p) => acumulado + p.stock, 0);

// 2. Valor total del inventario (reduce)
const valorInventario = (prods) =>
  prods.reduce((acumulado, p) => acumulado + p.precio * p.stock, 0);

// 3. Producto más caro (reduce comparando objetos)
const masCaro = (prods) =>
  prods.reduce((max, p) => (p.precio > max.precio ? p : max));

// 4. Productos con stock menor al umbral (filter)
const bajoStock = (prods, umbral) =>
  prods.filter((p) => p.stock < umbral);

// 5. Array de etiquetas formateadas (map)
const etiquetas = (prods) =>
  prods.map((p) => `${p.nombre} (S/ ${p.precio})`);

// --- EJECUCIÓN Y PRUEBAS EN CONSOLA ---

console.log("=== REPORTE DE INVENTARIO ===");

// Copia previa para verificar inmutabilidad
const copiaOriginal = JSON.stringify(productos);

console.log("1. Unidades totales en stock:", unidadesTotales(productos));
console.log("2. Valor total del inventario: S/", valorInventario(productos));
console.log("3. Producto más caro:", masCaro(productos));
console.log("4. Productos con stock menor a 5:", bajoStock(productos, 5));
console.log("5. Etiquetas formateadas:", etiquetas(productos));

// Verificación de inmutabilidad
const fueModificado = JSON.stringify(productos) !== copiaOriginal;
console.log("¿El array original fue modificado?:", fueModificado ? "SÍ (Error)" : "NO (Correcto)");