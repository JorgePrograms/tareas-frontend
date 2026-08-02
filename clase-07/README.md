# Clase 7. JavaScript (1): la tienda empieza a pensar

En la Clase 6 dejamos TechCart **vestida con Tailwind v4**: se ve profesional, se adapta y tiene
modo oscuro. Pero si le haces clic a "Agregar al carrito", no pasa **nada**: es una foto bonita.
En la Clase 7 damos el salto más grande del curso — de **estilar** la tienda a hacerla
**pensar**: empieza **JavaScript**. Y como el grupo **viene de Java**, gran parte ya la saben;
solo cambia cómo se escribe. El foco está en la **sintaxis nueva** y en el corazón del día:
**map, filter y reduce**, que son los **Streams de Java** que ya usaron.

## Contenido de la carpeta

- `index.html` y `css/styles.css`: TechCart **tal como quedó al final de la Clase 6** (re-vestida
  con Tailwind v4: utilidades, tokens con `@theme`, modo oscuro automático, componentes `.card` y
  `.btn`). Este es el punto de partida; sobre él trabajamos en clase.
- `clase-07.pdf`: las diapositivas de la clase.

> El código JavaScript de hoy —el archivo `js/main.js`— se escribe **durante la clase**; por eso
> esta carpeta arranca con el resultado de la Clase 6, sin lógica todavía.

## Herramientas de hoy

- **La consola del navegador** (F12 → pestaña *Console*) es nuestro laboratorio: escribimos una
  línea, Enter, y responde al instante. Es la "cancha" de la clase.
- Un archivo **`js/main.js`** enlazado con `<script defer src="js/main.js">`, para el código que
  no queremos perder al refrescar.
- **Sin instalar nada** — todo corre en el navegador. (Node.js llega más adelante.)

## Temas

**Deudas que se pagan hoy (tareas difíciles de la Clase 6):**
1. **Zoom con `group`**: `class="group"` en la tarjeta + `group-hover:scale-105` en la imagen.
2. **Modo oscuro sin repetir `dark:`**: los tokens de `@theme` cambian de valor en un `@media`
   oscuro, y toda la tienda los sigue sola.

**JavaScript (con puente constante a Java):**
3. **Variables y tipos**: `const` (= `final`) y `let`, y el **tipado dinámico** (la variable puede
   cambiar de tipo — la solución se llama TypeScript, en unas semanas).
4. **Operadores y control de flujo**: aritméticos y lógicos como en Java; el gran tema **`===` vs
   `==`** (usa siempre `===`); `if` y el **ternario**.
5. **Funciones**: la forma clásica y las **arrow functions** — que son las **lambdas** de Java.
6. **Arrays y objetos**: el catálogo de TechCart, convertido en **datos** (un array de objetos);
   `for...of` (= el for-each) y `.push`.
7. **map / filter / reduce**: los **Streams de Java**, pero más directos (sin `.stream()`).
   `map` transforma, `filter` filtra, `reduce` acumula (¡el total del carrito!).
8. **Arranque de ES6+**: **template literals** (`` `$${precio}` ``) y **desestructuración**
   (`const { nombre, precio } = p`) — la forma en que se escribe una lista en React.

## Lecturas y recursos

- **MDN** (developer.mozilla.org) — la documentación oficial de JavaScript: cuando no sepas un
  método de array, se busca ahí.
- **Disarray** (codepip.com) — un juego para dominar los métodos de array, de los mismos
  creadores de Grid Garden y Flexbox Froggy. (De pago: Codepip Pro.)
- **playcode.io** — un playground gratis para escribir JavaScript y verlo correr sin instalar
  nada. Aunque, para lo de hoy, la consola del navegador es el mejor laboratorio.

> Basado en el proyecto de referencia TechCart. Datos e imágenes de [DummyJSON](https://dummyjson.com).
