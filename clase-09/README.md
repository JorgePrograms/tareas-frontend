# Clase 9. El DOM: la tienda reacciona

Hasta ahora TechCart se **ve** (Clases 2-6) y **piensa** (Clases 7-8), pero todo lo que piensa vive
en la consola: el usuario no ve nada. En la Clase 9 abrimos la puerta entre JavaScript y la página
—el **DOM**— y la tienda deja de ser una foto: el catálogo se **pinta solo** desde el array, los
botones **responden** al clic y el carrito **sobrevive al refresco**.

## Contenido de la carpeta (y en qué estado está)

Esta carpeta es el **punto de partida**: el proyecto tal como quedó al terminar la Clase 8, que se
dictó **hasta el `rest`** (los tres puntos juntando parámetros) y ahí se cortó.

- `index.html` y `css/styles.css`: TechCart con Tailwind v4, igual que en la Clase 6. El catálogo
  sigue escrito a mano con cuatro `<article>`, y el `<script>` sigue siendo un script normal
  (`defer`).
- `js/main.js`: **un solo archivo** con todo lo de las Clases 7 y 8 — el array de productos,
  `map`/`filter`/`reduce`, los dos difíciles (`valorCategoria` y `resumenCarrito`), los template
  literals, la desestructuración y el spread/rest. La última línea marca dónde nos quedamos.

> **Si te quedaste atrás, descarga esta carpeta y arrancas parejo.** Las dos sesiones anteriores se
> cortaron a mitad, así que este es el punto de partida común de todos.

**Lo que se escribe durante la clase** (y por eso **no** está en esta carpeta):

1. El ejercicio de spread que faltó: `aplicarDescuento` y ordenar sin mutar.
2. Propiedades abreviadas, parámetros por defecto, `find`, `?.` y `??`.
3. **Partir `main.js` en cinco módulos**: `datos.js`, `carrito.js`, `formato.js`, `ui.js` y
   `main.js`, y cambiar el `<script>` a `type="module"`.
4. El **DOM**: pintar el catálogo desde el array (y borrar las tarjetas escritas a mano), los
   eventos y el `localStorage`.

## Herramientas de hoy

- **Live Server** en VS Code, y hoy no es opcional: los módulos (`import`/`export`) no funcionan si
  abres el `index.html` a mano. El navegador los bloquea por seguridad.
- **DevTools** (F12) en dos pestañas nuevas: **Elements**, para ver el DOM como árbol, y
  **Application → Local Storage**, para ver lo que guardamos.

## Temas

**Cierre de la Clase 8 (primera mitad):**
1. **Spread**: `aplicarDescuento` devolviendo una **copia**, y ordenar sin mutar con
   `[...productos].sort(...)`.
2. **Detalles de ES6+**: propiedades abreviadas (`{ cantidad, total }`), arrow que devuelve un
   objeto (`p => ({ … })`, con paréntesis), parámetros por defecto, `find`, y la pareja **`?.` y
   `??`** — con `??` en vez de `||` cuando el `0` es un valor válido.
3. **Módulos**: `export` / `import`, `export default`, `<script type="module">` y el proyecto
   repartido en cinco archivos.

**El DOM (segunda mitad):**
4. **El árbol**: `document`, `querySelector` y `querySelectorAll` con **los selectores de CSS** que
   ya conoces. Si no encuentra nada devuelve `null`.
5. **`textContent` vs `innerHTML`**: texto plano contra etiquetas de verdad. `innerHTML` reemplaza
   todo lo de adentro, y con datos externos hay riesgo de **XSS**.
6. **Pintar el catálogo desde el array**: `map` + `join("")`, y adiós a las 40 líneas de HTML
   escritas a mano. Si mañana son 40 productos, aparecen 40.
7. **Eventos**: `addEventListener`, el objeto `evento`, y el problema de verdad — los elementos que
   JavaScript crea **nacen sin listener**. Se resuelve con **delegación**: un listener en el
   contenedor y `closest` para preguntar quién originó el clic.
8. **`dataset`**: los atributos `data-*` para saber **cuál** producto. Siempre devuelven **texto**,
   así que van con `Number()`.
9. **`localStorage`**: guarda solo texto, así que va con `JSON.stringify` y `JSON.parse`, y envuelto
   en `try/catch`. Más `sessionStorage`, que es la misma API pero se borra al cerrar la pestaña.

## La idea que ordena todo

> **Un dato, una función que pinta.** El evento hace dos cosas: cambia el dato y llama a pintar.
> Nunca toca la pantalla por su cuenta. La función que pinta mira el dato y lo dibuja, y nunca
> modifica el dato. Cuando lleguemos a React con `useState`, vas a reconocer exactamente esto.

## Errores que vas a ver hoy (y qué significan)

| Mensaje | Causa |
|---|---|
| `Cannot use import statement outside a module` | Falta `type="module"` en el `<script>`. |
| `404` / `Failed to resolve module specifier` | Falta la extensión **`.js`** en el import. |
| `does not provide an export named 'X'` | La función existe, pero le falta el `export`. |
| `Cannot read properties of null` | El selector no encontró nada: revisa el **selector**, no el JS. |
| `Cannot read properties of undefined` | Le pediste una propiedad a algo que no existe → usa `?.`. |
| El botón funciona una vez y después no | Repintaste con `innerHTML` y mataste los listeners → **delegación**. |
| `[object Object]` guardado en localStorage | Te faltó `JSON.stringify`. |
| Hago clic y no agrega nada, sin errores | `dataset` da **texto**: te faltó `Number()`. |

> ⚠️ Un error de import que **solo aparece al desplegar**: `"./Datos.js"` con mayúscula funciona en
> Windows y da 404 en Vercel (Linux). Nombres de archivo en minúscula, siempre.

## Lecturas y recursos

- **MDN**: *Introduction to the DOM* y *Web Storage API*.
- Lo que no vimos y vale la pena: **`createElement`** y `appendChild` (crear elementos sin
  `innerHTML`, sin riesgo de XSS), **`classList`** para agregar y quitar clases, los eventos
  `input` y `submit`, y **`event.preventDefault()`** para que un formulario no recargue la página.
- De la Clase 8 quedaron pendientes `some` y `every`, y el `reduce` con acumulador **objeto** para
  agrupar por categoría (está en las tareas).
- `getElementById` y `getElementsByClassName` funcionan y los vas a ver en tutoriales viejos, pero
  `querySelector` los cubre a todos con la sintaxis de CSS que ya sabes.

> ⚠️ En `localStorage` **no** se guardan contraseñas ni datos sensibles: cualquier JavaScript de la
> página lo puede leer.


## Tareas

Cinco tareas graduadas. La difícil 2 es la que convierte esto en un carrito de verdad, y la vamos a
necesitar armada para las clases de React.

| Nivel | Tarea |
|---|---|
| **Fácil** | **El contador en la pestaña**: que el título de la pestaña del navegador muestre cuántos productos hay en el carrito. Una línea: `document.title = …` con un template literal, llamada desde `pintarCarrito`. |
| **Intermedia 1** | **Filtrar por categoría**: los enlaces de la barra lateral no hacen nada. Haz que filtren el catálogo. Pistas: un solo listener en el `<ul>` (delegación), un `data-categoria` en cada enlace, y `pintarCatalogo` recibiendo la lista que va a pintar en vez de usar `productos` siempre. Ojo: al filtrar se repinta, así que los botones "Agregar" tienen que seguir funcionando. |
| **Intermedia 2** | **Agrupar por categoría**: en `datos.js`, exporta `contarPorCategoria(items)`: un `reduce` cuyo acumulador es un **objeto**, que devuelva `{ laptops: 1, smartphones: 1, tablets: 1, audio: 2 }`. Pistas: valor inicial `{}`, y adentro `{ ...acc, [p.categoria]: (acc[p.categoria] ?? 0) + 1 }` — esos corchetes hacen que JS **evalúe** el nombre de la propiedad. Muestra el número al lado de cada categoría en la barra lateral. |
| **Difícil 1** | **El tema oscuro que se recuerda**: un botón que alterne claro y oscuro —pista: `document.documentElement.classList.toggle("dark")` y el `dark:` de Tailwind— y que la elección se **guarde en localStorage**, de modo que al volver a entrar la página abra como la dejaste. Es exactamente lo que hacen las páginas que usas todos los días. |
| **Difícil 2** | **El carrito con cantidades**: que cada producto entre **una vez** con una propiedad `cantidad`. Si agregas uno que ya está, sube la cantidad en vez de duplicar la fila. Necesitas: buscar con `find` si ya está, y si está, devolver un array **nuevo** con ese ítem copiado y su cantidad + 1 (spread dentro de un `map`), sin mutar nada. En la fila, un `× cantidad` y botones de más y menos. Y con esto, quitar vuelve a ser por **`id`**, no por posición. |

> Basado en el proyecto de referencia TechCart. Datos e imágenes de [DummyJSON](https://dummyjson.com).
