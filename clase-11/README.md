# Clase 11 — La tienda terminada (último día de JavaScript)

> ⏱️ **Duración: 4 h 30 min** de contenido (el receso va aparte). Es la única clase que pasa del
> tope de 4:15, y es deliberado: cierra el bloque de JavaScript y no hay sesión siguiente donde
> dejar caer lo que sobre.
> ✅ **Partimos del código real con el que terminó la Clase 10**: los seis módulos de `js/`, el
> catálogo trayendo solo `laptops`, el adaptador con `??`, los tres estados y el carrito en `localStorage`.

La Clase 10 se cortó en el Ejercicio 3. Hoy se paga esa deuda —`Promise.all` y el plan B— y se
construyen las piezas que convierten TechCart en un **MVP** de verdad: los filtros, el buscador, el
carrito con cantidades y el checkout. Todo es JavaScript; nada nuevo y grande, casi todo es **aplicar**
lo de las cuatro clases anteriores.

## Conceptos que se enseñan (temario)
1. **`Promise.all`** — cuatro peticiones **en paralelo** en vez de en escalera (*waterfall*); `.flat()`; todo-o-nada y por qué hoy conviene.
2. **El plan B (*fallback*)** — `datos.js` se convierte en respaldo; `try/catch` en la **capa de datos**, no en la pantalla; **degradación elegante**; que el respaldo cumpla **el mismo contrato**; devolver `{ productos, esRespaldo }`.
3. **Estado derivado** — la idea central del día: hay **datos** (`productos`, `categoriaActiva`, `termino`) y lo que se ve se **calcula**, no se guarda. Un `if` menos por cada dato que no se duplica.
4. **Filtro y buscador** — delegación en el `<ul>`, `data-categoria`, `preventDefault`, `classList.toggle` con dos argumentos, el evento **`input`**, `trim`/`toLowerCase`/`includes`.
5. **Seguridad: XSS** — `innerHTML` **interpreta HTML**; nunca meter texto del usuario crudo. `escaparTexto` con `createElement` + `textContent`. `textContent` es seguro, `innerHTML` no.
6. **Carrito con cantidades** — `find` para ver si ya está, spread para copiar con un campo más, el `map` con ternario (**el** patrón de la inmutabilidad), `reduce` sobre unidades, un listener con `data-accion` para tres botones, y quitar por `id` otra vez.
7. **Migración de datos** — el `NaN` del carrito guardado por la versión anterior; sanear al entrar vs versionar la clave.
8. **`some` / `every`** — `anyMatch` / `allMatch`; `[].every(...)` es `true`.
9. **El checkout** — el evento **`submit`**, `preventDefault`, la **validación nativa** del HTML (que ya estaba desde la Clase 1), `FormData` + `Object.fromEntries`, y el pedido guardado en su propia clave.

## Agenda (4 h 30)
| Bloque | Tiempo | Qué se hace |
|--------|:------:|-------------|
| 1. Dónde quedamos de verdad | 16 min | La verdad sobre las tareas + repaso de la Clase 10. |
| 2. `Promise.all` | 37 min | Los 38 productos; la escalera dibujada en **Network**; `.flat()`. |
| 3. El plan B | 28 min | Respaldo, el mismo contrato y el aviso honesto. |
| ☕ Receso | 15 min | Aparte. |
| 4. Filtro por categoría | 40 min | Los enlaces que nunca hicieron nada + **estado derivado**. |
| 5. El buscador | 34 min | El evento `input`, el estado vacío y **XSS**. |
| 6. El carrito con cantidades | 50 min | `find`, spread, `map`, el `NaN` de la migración y el tope de stock. |
| 7. Remates y **checkout** | 44 min | `document.title`, `some`/`every` y la compra que funciona. |
| 8. Cierre | 21 min | Resumen de **todo JavaScript**, lecturas, 5 tareas y anticipo. |

## ⚠️ Qué se dictó de verdad, y qué se movió a la Clase 12

La sesión se cortó al terminar el **Ejercicio 4** del Bloque 6 (3:25). Se dictaron los **bloques 1 a 6**:
`Promise.all`, el plan B, los dos filtros con el estado derivado, el buscador con su lección de XSS y el
carrito con cantidades. Quedaron **sin dictar**:

- Los dos remates del Bloque 7: `document.title` y `some`/`every`.
- El **checkout**.
- Todo el Bloque 8: resumen, tareas y anticipo.

Los dos remates se dictan al inicio de la **Clase 12**, en JavaScript. Y el **checkout se escribe en la
Clase 12 directamente en TypeScript** — a propósito: leer un formulario devuelve un objeto sin forma
conocida, que es justo el problema que TypeScript resuelve, así que es el mejor ejemplo posible.

> **Las 5 tareas de abajo no se dictaron en clase.** Quedan como práctica **opcional** de JavaScript para
> quien quiera reforzar. Las que cuentan son las de la Clase 12, que se hacen sobre este mismo proyecto
> ya tipado.

## Qué construimos hoy
- **`js/api.js`**: `pedirCategoria` (privada), `CATEGORIAS`, `Promise.all`, el respaldo y `{ productos, esRespaldo }`.
- **`js/main.js`**: los tres datos del catálogo, `productosVisibles()`, los listeners de categorías, buscador y carrito, y el **checkout**.
- **`js/carrito.js`**: `agregarItem`, `cambiarCantidad`, `quitarItem` y un `resumenCarrito` que cuenta **unidades**.
- **`js/ui.js`**: `filaCarrito` con `× cantidad` y sus botones, y `escaparTexto`.
- **`index.html`**: `data-categoria` en la barra lateral, el buscador, el aviso de respaldo, el aviso de pedido y los `id` que faltaban.

## Cómo verlo
Abrí `index.html` con **Live Server** y tené DevTools abierto en dos pestañas concretas:
- **Network** (filtro Fetch/XHR) para ver las cuatro peticiones **arrancando juntas**, y el selector **Offline** para probar el plan B.
- **Application → Local Storage** para ver `techcart_carrito` y `techcart_pedidos`.

## Tareas para casa (5)

> Son las **últimas de JavaScript**. La próxima clase le ponemos **tipos a este mismo proyecto**, con
> el código que ustedes escribieron: el que traiga más código va a encontrar más cosas interesantes.

1. **Fácil — envío gratis desde $50.** La tarjeta de "Envío gratis en compras desde $50" está en la página desde la Clase 6 y es pura decoración. Que `resumenCarrito` devuelva también `envioGratis` (`subtotal >= 50`) y que `pintarCarrito` agregue "🚚 Envío gratis" cuando corresponda. Una comparación y un ternario.
2. **Intermedia 1 — el número al lado de cada categoría.** Que la barra lateral diga "Laptops (5)", "Teléfonos (16)". Necesitás `contarPorCategoria(items)`, y acá está lo nuevo: un **`reduce` cuyo acumulador es un objeto**. Pista: `{ ...acumulador, [p.categoria]: (acumulador[p.categoria] ?? 0) + 1 }` — los corchetes en la clave significan "usá el **valor** de esta variable como nombre de la propiedad".
3. **Intermedia 2 — ordenar el catálogo.** Un `<select>` arriba de la grilla: precio de menor a mayor, de mayor a menor, y mejor valorados. El evento es **`change`**. Es un **cuarto dato** que entra en `productosVisibles`, al final, después de los dos filtros: si lo escribís bien, no tocás nada más que esa función. Y `sort` **muta**, así que va sobre una copia: `[...lista].sort(...)`.
4. **Difícil 1 — el detalle del producto.** Al hacer clic en una tarjeta (no en el botón), mostrar los datos completos: descripción, marca, valoración, stock. La descripción **no viene en el listado**, así que hay que pedirla: `fetch` a `/products/{id}`, el `respuesta.ok`, el adaptador ampliado con `descripcion: p.description`, y los estados de cargando y error. Es la primera vez que le pedís algo a la API **por un clic** y no al arrancar.
5. **Difícil 2 — "Mis pedidos".** El checkout guarda el pedido en `techcart_pedidos` y nadie lo vuelve a mirar. Hacéle su pantalla: listar cada pedido con número, fecha, cantidad y total, y adentro sus ítems con `× cantidad`. Pistas: una función `pintarPedidos()` que lee el dato y dibuja, llamada al arrancar y después de confirmar; `<details>`/`<summary>` para desplegar sin JavaScript; y **el nombre del cliente lo escribió un usuario**, así que va con `escaparTexto`. Si te sobra tiempo, un botón "Vaciar historial".

**Y una colgada desde la Clase 9**, que ahora sale en diez minutos porque ya vimos `classList`: el
**tema oscuro que se recuerda** — `document.documentElement.classList.toggle("dark")` + `localStorage`.

## Lecturas adicionales
- **`Promise.allSettled`** y **`Promise.race`** — para cuando quieras "lo que se pueda" en vez de todo o nada.
- **`AbortController`** y **debounce** — la pareja que hace falta el día que el buscador le pregunte al **servidor** en vez de filtrar en memoria. Hoy no hizo falta: vale entender **por qué**.
- **`appendChild`** e **`insertAdjacentHTML`** — los primos del `createElement` que usamos hoy.
- **CORS** — el día que uses una API que no lo tenga habilitado, el navegador **bloquea** la petición aunque la URL funcione al pegarla en la barra. No es un bug tuyo y no se arregla desde el front.
- **OWASP XSS** — lo del `<img src=x onerror=…>` es la punta de un tema enorme, y es el tipo de cosa que en una entrevista te distingue.
- **Snapshot de datos** — cómo se genera un respaldo **desde la API** en vez de mantenerlo a mano (nuestra deuda consciente).

## Próxima clase (Clase 12)
**TypeScript** aplicado a **este** proyecto. Hoy pasó tres veces lo mismo y nadie avisó: el respaldo
mostró `undefined` en la marca, el carrito guardado dijo `S/ NaN`, y el buscador se habría roto si
`marca` viniera vacía. Los tres son el mismo error —un objeto que no tenía la forma que el código
esperaba— y la pregunta de fondo es **dónde está escrito qué es un producto de TechCart**. Hoy: en cuatro
lugares y en la cabeza del docente. La próxima clase: en uno, y el editor avisa **antes de correr**.
