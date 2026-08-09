# Clase 10. Los productos de verdad

TechCart ya se **ve**, ya **piensa** y desde la Clase 9 ya **reacciona**: el catálogo se pinta solo
desde el array y los botones responden al clic. Pero hay una mentira en el corazón del proyecto — los
cinco productos los escribimos a mano. En la Clase 10 la tienda pide sus **38 productos reales** a un
servidor por internet, y para eso aparece lo último que falta de JavaScript: el modelo **asíncrono**
(`fetch`, promesas, `async`/`await` y manejo de errores).

Antes de eso cerramos lo que quedó de la Clase 9: que el carrito **se vea** en la página, que
**sobreviva al refresco** y que se le puedan **quitar** productos.

## Contenido de la carpeta (y en qué estado está)

Esta carpeta es el **punto de partida**: el proyecto tal como quedó al terminar la Clase 9.

- `index.html` y `css/styles.css`: el catálogo está **vacío** en el HTML (`<div class="productos">` con
  un comentario) porque ahora lo pinta JavaScript. El `<script>` ya es un **módulo**.
- `js/datos.js`: el catálogo, con `id` e `imagen` en cada producto. El último no tiene imagen, a
  propósito.
- `js/carrito.js`: `IGV`, `resumenCarrito`, `valorCategoria`, `conDescuento` y `masCaroDe`. Todas
  **reciben los items por parámetro**.
- `js/formato.js`: `formatearPrecio`, con `export default`.
- `js/ui.js`: `fichaProducto` (texto) y `tarjetaProducto` (el HTML de una tarjeta).
- `js/main.js`: pinta el catálogo y escucha el clic de "Agregar al carrito" por **delegación**. El
  carrito se arma bien… pero solo se ve en la **consola**.

> **Si te quedaste atrás, descarga esta carpeta y arrancas parejo.**

**Lo que se escribe durante la clase** (y por eso **no** está acá):

1. `pintarCarrito()` y el `#resumen-carrito` en la cabecera: que el carrito se vea.
2. `localStorage` con `JSON.stringify` / `JSON.parse` y `try/catch`.
3. La sección del carrito con su lista y el botón "Quitar".
4. `js/api.js`: `fetch`, `async`/`await`, el **adaptador** que traduce los campos de la API a los
   nuestros, el manejo de errores con los tres estados (cargando · error · vacío), `Promise.all` y el
   respaldo local.

## Herramientas de hoy

- **Live Server** (los módulos no funcionan con `file://`).
- **DevTools** en tres pestañas: **Console**, **Application → Local Storage** para ver lo que
  guardamos, y **Network**, que hoy es protagonista: ahí se ve si las peticiones salen en paralelo o
  en escalera, y ahí está el selector **Offline** para probar qué pasa sin internet.
- La API: **[dummyjson.com](https://dummyjson.com)**, pública y gratis. Ábrela en el navegador antes
  de la clase: `https://dummyjson.com/products/category/laptops`.

## Temas

**Cierre de la Clase 9 (primera mitad):**
1. **Estado → render**: el evento cambia el dato y llama a pintar; la función que pinta mira el dato y
   lo dibuja. **Un dato, una función que pinta.**
2. **`localStorage`**: guarda solo **texto**, así que va con `JSON.stringify` y `JSON.parse`, envuelto
   en `try/catch`. Más `sessionStorage`, que es la misma API pero se borra al cerrar la pestaña.
3. **La lista del carrito** y quitar por posición (con delegación otra vez).

**Los datos de verdad (segunda mitad):**
4. **`fetch`** devuelve una **promesa**: un "vale" por un resultado que todavía no llegó, porque la
   página no puede congelarse esperando.
5. **`async` / `await`**: la misma promesa, escrita de arriba abajo. Y las tres reglas: `await` solo
   dentro de `async`, una función `async` siempre devuelve una promesa, y por eso hay que esperarla.
6. **El adaptador** (`mapearProducto`): la API dice `title`/`price`/`thumbnail` y nuestra tienda dice
   `nombre`/`precio`/`imagen`. La traducción va en **un solo lugar**.
7. **Errores**: `fetch` **no falla** con un 404 — hay que mirar `respuesta.ok` y lanzar el error uno
   mismo. `try`/`catch`/`finally`, y los **tres estados**: cargando, error y vacío.
8. **`Promise.all`**: cuatro pedidos a la vez en vez de hacer fila. Y el **plan B**: si la API se cae,
   la tienda abre con el catálogo local.

## Errores que vas a ver hoy (y qué significan)

| Mensaje o síntoma | Causa |
|---|---|
| `Promise { <pending> }` en vez de los datos | Te falta `await` (o el `.then`): el dato todavía no llegó. |
| `length` da 0 aunque el servidor respondió | Usaste el dato **afuera** del `await`/`then`. |
| `Cannot read properties of undefined (reading 'map')` | La respuesta no traía `products`: casi siempre un 404 que no revisaste con `ok`. |
| Las tarjetas dicen `undefined` | Estás usando los campos crudos de la API (`title`) en vez de los tuyos (`nombre`): falta el adaptador. |
| `marca is not defined` | Agregaste el campo al HTML pero no a la desestructuración del parámetro. |
| `[object Object]` en localStorage | Falta `JSON.stringify`. |
| La app se queda en "Cargando…" para siempre | Un error sin atrapar cortó la ejecución antes de apagar el estado de carga. |
| `await is only valid in async functions` | El `await` está fuera de una función marcada con `async`. |

## Lecturas y recursos

- **MDN**: *Using the Fetch API*, *Promise*, *async function* y *Using promises*.
- **`Promise.allSettled`** para cuando quieras "lo que se pueda" en vez de todo o nada,
  **`Promise.race`**, y **`AbortController`** para **cancelar** una petición (lo vas a necesitar el día
  que hagas un buscador que pide en cada tecla).
- **CORS**: el día que uses una API que no lo tenga habilitado, el navegador bloqueará la petición
  aunque la URL funcione al pegarla en la barra de direcciones. No es un bug de tu código y no se
  arregla desde el front: lo habilita el servidor.
- De la Clase 9 quedaron `createElement` / `appendChild` y `classList`.

> 🔮 Hoy vas a escribir `p.title` y, si te equivocas y pones `p.titel`, **no pasa nada**: ni un aviso,
> ni un error, solo `undefined` en pantalla. Esa es la incomodidad del tipado dinámico que arrastramos
> desde la Clase 7, y la próxima clase la resolvemos con **TypeScript**.

## Tareas

Cinco tareas graduadas. La difícil 2 es la que convierte esto en un carrito de verdad, y la vamos a
necesitar armada para las clases de React.

| Nivel | Tarea |
|---|---|
| **Fácil** | **El contador en la pestaña**: que el título de la pestaña muestre cuántos productos hay en el carrito. Una línea: `document.title = …` con un template literal, llamada desde `pintarCarrito`. |
| **Intermedia 1** | **Filtrar por categoría**: los enlaces de la barra lateral siguen sin hacer nada. Haz que filtren el catálogo: un solo listener en el `<ul>` (delegación), un `data-categoria` en cada enlace, y `pintarCatalogo` recibiendo la lista que va a pintar. Con 38 productos ya se nota. Ojo: al filtrar se repinta, así que los botones "Agregar" tienen que seguir funcionando. |
| **Intermedia 2** | **El aviso del respaldo**: cuando `obtenerProductos` use el plan B, que la tienda lo **diga** — un cartelito con "Mostrando información guardada, no pudimos conectar". Pista: que `obtenerProductos` devuelva `{ productos, esRespaldo }` y que `main.js` decida qué mostrar. |
| **Difícil 1** | **El buscador**: un `<input>` arriba del catálogo que filtre mientras el usuario escribe. Pistas: el evento es **`input`**, no `click`; filtra con `filter` y `.toLowerCase().includes(...)`; y si no hay resultados, muestra el **estado vacío** con el término buscado. Todo del lado del cliente. |
| **Difícil 2** | **El carrito con cantidades**: que cada producto entre **una vez** con una propiedad `cantidad`. Si agregas uno que ya está, sube la cantidad en vez de duplicar la fila. Necesitas: buscar con `find` si ya está, y si está, devolver un array **nuevo** con ese ítem copiado y su cantidad + 1 (spread dentro de un `map`), sin mutar nada. En la fila, un `× cantidad` y botones de más y menos. Y con esto, quitar vuelve a ser por **`id`**, no por posición. |

> Y dos que quedaron de la Clase 9, por si quieres recuperarlas: **`contarPorCategoria(items)`** (un
> `reduce` con acumulador **objeto**, para mostrar el número al lado de cada categoría) y el **tema
> oscuro que se recuerda** (`classList.toggle("dark")` + `localStorage`). Las dos, con sus pistas, están
> en el [README de la Clase 9](../clase-09/README.md).

> Basado en el proyecto de referencia TechCart. Datos e imágenes de [DummyJSON](https://dummyjson.com).
