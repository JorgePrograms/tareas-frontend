import { productos, novedades } from './productos.js';
import { conDescuento, resumen, combinar } from './promociones.js';

console.log('=== EJERCICIO 2: EL DESCUENTO SIN DAÑOS ===\n');

// Pruebas de inmutabilidad en conDescuento
const productoOriginal = productos[0];
const productoOfertado = conDescuento(productoOriginal, 15);

console.log('--- 1. Demostración de Inmutabilidad ---');
console.log('Precio original (S/ 3500 intacto):', productoOriginal.precio);
console.log('Objeto con oferta:', productoOfertado);

// Pruebas de desestructuración y renombre en resumen
console.log('\n--- 2. Resumen con Desestructuración ---');
console.log(resumen(productoOfertado));

console.log('\nPrueba con producto sin marca (aplica valor por defecto):');
console.log(resumen(productos[1]));

// Pruebas de combinación con parámetro rest
console.log('\n--- 3. Combinación de Múltiples Listas ---');
const listaCompleta = combinar(productos, novedades);
console.log('Lista combinada (5 productos):', listaCompleta);