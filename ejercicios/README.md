# Ejercicios de práctica · JavaScript y TypeScript (clases 07 a 12)

Cinco ejercicios para reforzar el bloque de JavaScript y TypeScript: cuatro intermedios y uno
difícil. Cada uno indica qué clase practica. Se resuelven con lo mismo que usaste en esas
clases: VS Code, el navegador con Live Server, y para el último, tu proyecto con TypeScript.

**Criterio de entrega:** sube tu solución a tu repositorio (`git add`, `commit`, `push`). El
difícil tiene además su criterio propio: `npx tsc --noEmit` en cero.

---

## Ejercicio 1 (intermedio) · El reporte de inventario

**Practica:** clase 07 (arrays, funciones flecha, map, filter, reduce).

**Contexto.** Todo comercio necesita reportes, y todos los reportes son transformaciones de un
array. Este ejercicio es map, filter y reduce puros, sin DOM: la respuesta se imprime en la
consola.

**Lo que debes construir.** Partiendo del array de productos de tu `datos.js` (o uno propio de
al menos 8 productos con `nombre`, `precio`, `stock` y `categoria`), escribe estas funciones,
todas flecha y todas puras (reciben el array, devuelven el resultado, no modifican nada):

1. `unidadesTotales(productos)`: la suma de todo el stock (reduce).
2. `valorInventario(productos)`: la suma de precio por stock de cada producto (reduce).
3. `masCaro(productos)`: el producto de mayor precio (reduce comparando).
4. `bajoStock(productos, umbral)`: los productos con stock menor al umbral (filter).
5. `etiquetas(productos)`: un array de textos con el formato `"Laptop X (S/ 3499)"` (map con
   template literal).

Imprime los cinco resultados con `console.log` y una etiqueta clara cada uno.

**Criterios de aceptación:**

- [ ] Cero bucles `for` o `while`: todo con métodos de array.
- [ ] Ninguna función modifica el array original (compruébalo imprimiéndolo antes y después).
- [ ] `bajoStock` funciona con cualquier umbral que le pases.

**Pistas:** el reduce de `masCaro` lleva como acumulador un producto, no un número; si un
método te devuelve array y necesitas otro paso, encadénalos.

---

## Ejercicio 2 (intermedio) · El descuento sin daños

**Practica:** clase 08 (desestructuración, spread, template literals, módulos).

**Contexto.** Aplicar un descuento parece fácil hasta que descubres que modificaste el
producto original y ahora TODA la tienda muestra el precio rebajado. Este ejercicio es sobre
copiar bien.

**Lo que debes construir:**

1. Dos archivos módulo: `productos.js` (exporta el array) y `promociones.js` (exporta la
   lógica). Un `main.js` los importa y ejecuta.
2. En `promociones.js`, una función `conDescuento(producto, porcentaje)` que devuelve un
   producto NUEVO con el precio rebajado y un campo extra `precioOriginal`, usando spread.
   El producto original no se toca.
3. Una función `resumen(producto)` que use desestructuración con renombre y valor por defecto
   en sus parámetros (por ejemplo `{ nombre, precio, marca = 'Genérica' }`) y devuelva un
   texto multilínea con template literal: nombre, marca y precio formateado.
4. Una función `combinar(...listas)` con parámetro rest que reciba varios arrays de productos
   y devuelva uno solo (spread para unirlos).

**Criterios de aceptación:**

- [ ] Después de aplicar `conDescuento`, el producto original conserva su precio (demuéstralo
      con dos `console.log`).
- [ ] Los tres archivos usan `import`/`export` de módulos ES (recuerda: `type="module"` y
      Live Server).
- [ ] `combinar` funciona con 2, 3 o más listas sin cambiar el código.

**Pistas:** `{ ...producto, precio: nuevoPrecio }` copia y pisa en un solo paso; el orden del
spread decide qué campo gana.

---

## Ejercicio 3 (intermedio) · La lista de deseos

**Practica:** clase 09 (DOM, eventos con delegación, localStorage).

**Contexto.** Toda tienda tiene el corazón de "me gusta". El reto real no es el corazón: es
escuchar cuarenta corazones con UN solo listener, y que la lista sobreviva al F5.

**Lo que debes construir:**

1. Una página con tu catálogo pintado desde el array por JavaScript (como en la clase), y en
   cada tarjeta un botón de deseo con el `id` del producto en un `data-id`.
2. UN solo `addEventListener` en el contenedor del catálogo (delegación) que detecte el clic
   en cualquier botón de deseo y agregue o quite ese producto de la lista de deseos.
3. Un contador en el encabezado ("Deseos: 3") que se actualice en cada cambio.
4. La lista de deseos persistida en `localStorage` (guardar en cada cambio, leer al cargar),
   siempre dentro de `try/catch`.
5. Los botones reflejan el estado: corazón lleno si el producto está en deseos, vacío si no,
   incluso después de recargar.

**Criterios de aceptación:**

- [ ] Hay exactamente UN `addEventListener` de clic para todos los corazones.
- [ ] F5 conserva los deseos y los corazones pintados correctamente.
- [ ] Si el valor guardado en localStorage está corrupto (edítalo a mano para probar), la
      página carga con lista vacía en lugar de romperse.
- [ ] Ningún texto que venga de datos se inserta sin escapar (tu `escaparTexto` de la clase).

**Pistas:** `evento.target.closest('button')` encuentra el botón aunque el clic caiga en el
ícono; guarda solo los ids en localStorage, no los productos completos.

---

## Ejercicio 4 (intermedio) · El comparador de categorías

**Practica:** clase 10 (fetch, promesas, async/await, Promise.all, manejo de errores).

**Contexto.** Una pregunta de negocio real: ¿qué categoría es más cara en promedio? Para
responderla hay que pedir dos categorías a la API, en paralelo, y sobrevivir si la red falla.

**Lo que debes construir:**

1. Una página con un botón "Comparar" y una zona de resultado con sus tres estados: cargando,
   error y listo.
2. Al hacer clic, pide DOS categorías de DummyJSON **en paralelo** con `Promise.all`:
   `https://dummyjson.com/products/category/laptops` y `.../smartphones`.
3. Con los resultados, calcula el precio promedio de cada categoría (reduce dividido entre la
   cantidad) y muestra cuál es más cara y por cuánto.
4. Si la red falla, la zona de resultado muestra un mensaje claro con un botón de reintento.
   Nada de `catch` vacío: siempre un `console.warn` con contexto o un mensaje en pantalla.

**Criterios de aceptación:**

- [ ] En la pestaña Network se ven las dos peticiones salir JUNTAS, no una después de la otra.
- [ ] Con DevTools en Offline, aparece el mensaje de error y el reintento funciona al volver
      la conexión.
- [ ] El resultado muestra los dos promedios formateados con `Intl.NumberFormat` y la
      diferencia.

**Pistas:** `async/await` dentro de una función, nunca suelto; `Promise.all` recibe un array
de promesas y devuelve un array de resultados en el mismo orden.

---

## Ejercicio 5 (difícil) · El módulo de cupones, tipado

**Practica:** clases 11 y 12 (lógica del carrito, inmutabilidad, TypeScript: interfaces,
uniones, narrowing, unknown).

**Contexto.** Un cupón de descuento parece un string, pero es un contrato con reglas: tipos
distintos de descuento, fechas de vencimiento, datos que llegan de afuera y no son de fiar.
Exactamente el terreno donde TypeScript se gana el sueldo. Se trabaja en tu proyecto con
TypeScript de la clase 12 (con `tsc --watch` corriendo).

**Lo que debes construir:**

1. En `tipos.ts`, el contrato `Cupon`: `codigo` (string), `tipo` (unión de literales:
   `'porcentaje' | 'monto'`), `valor` (number) y `expira` opcional (string de fecha).
2. En un `cupones.ts` nuevo, la función pura
   `aplicarCupon(total: number, cupon: Cupon): number`:
   - Si el cupón está vencido (`expira` existe y ya pasó), devuelve el total sin cambios.
   - Si el tipo es `'porcentaje'`, descuenta ese porcentaje; si es `'monto'`, resta ese monto
     fijo. El narrowing sobre la unión debe ser exhaustivo: si mañana agregas un tercer tipo,
     el compilador debe avisarte (pista de la clase: `never`).
   - El resultado nunca baja de cero.
3. Una aduana: `leerCupon(crudo: unknown): Cupon | null` que compruebe la forma antes de
   confiar (existe `codigo`, el `tipo` es uno de los dos válidos, `valor` es number). Pruébala
   con un `JSON.parse` de un texto correcto y uno corrupto.
4. Integración: en tu resumen del carrito, aplica un cupón de prueba al total con IGV y
   muestra el antes y el después.

**Criterios de aceptación:**

- [ ] `npx tsc --noEmit` en cero.
- [ ] Comentar una de las ramas del narrowing hace que el compilador proteste (demuéstralo y
      vuelve a dejarlo bien).
- [ ] `leerCupon` devuelve `null` con datos corruptos y el programa sigue vivo.
- [ ] `aplicarCupon` no modifica nada externo: total entra, total sale.

**Pistas:** para el vencimiento, `new Date(cupon.expira) < new Date()`; en la aduana,
`typeof` para los primitivos y una comparación explícita para la unión; `Math.max(0, ...)`
resuelve el piso del total.
