# Clase 4. CSS Grid: colocación y maquetación

En la Clase 3 maquetamos con Flexbox y arrancamos **CSS Grid**: el catálogo quedó como una
cuadrícula que se adapta sola (`auto-fill` + `minmax`). En la Clase 4 **terminamos Grid**:
aprendemos a **colocar** cada elemento en la cuadrícula (líneas, `span`), a **alinear** dentro
de las celdas, y a **maquetar la página entera** con `grid-template-areas` (la tienda gana una
barra lateral de categorías y un footer de verdad).

## Contenido de la carpeta

- `index.html` y `css/styles.css`: el código **tal como quedó al final de la Clase 3** (header
  con Flexbox, catálogo con Grid responsive, tarjetas en columna). Este es el punto de partida;
  sobre él colocamos y maquetamos en clase. Si faltaste a la Clase 3, cópialo para tener la base.

> El código de hoy se escribe **durante la clase**; por eso esta carpeta arranca con la base de
> la Clase 3, no con el resultado final.

## Temas

**Repaso y deudas de la Clase 3:**
1. Repaso de Grid (`fr`, `repeat`, `auto-fill`/`minmax`) y la diferencia `auto-fill` vs `auto-fit`.
2. Revisión de las tareas de Flexbox; la difícil (el footer de tienda) la resolvemos juntos.

**Colocar en la cuadrícula:**
3. Las líneas numeradas: `grid-column-start` / `grid-column-end` (4 columnas → 5 líneas; los
   negativos cuentan desde la derecha).
4. `span`: "dame 2 columnas" sin contar líneas — la tarjeta destacada.
5. `grid-row` y el bloque 2×2; de dónde salen las filas (filas implícitas).

**Alinear y maquetar:**
6. Alinear dentro de la celda: la escalera `justify/align-items` (todos) · `-self` (uno) ·
   `-content` (la cuadrícula entera).
7. `grid-template-areas`: el plano de la página con nombres + la barra lateral de categorías.
8. `order`: reordenar sin tocar el HTML.

**Bonus (solo si sobra tiempo):** arranque de Responsive con media queries.

## Cómo ver la página

Abre `index.html` con doble clic, o con la extensión Live Server en VS Code.

## Practicar jugando

- Grid: https://cssgridgarden.com — se juega **salteado** con el selector de nivel (arriba a la
  derecha), un rango por concepto: repaso N20-25 · líneas N1-6 · span N7-11 · filas N12-15 ·
  grid-area N16-17 · order N18-19. Terminar los 28 niveles es la mejor práctica que existe.
- Alineación (el juego no la trae): los editores en vivo de MDN (`justify-items`,
  `align-content`) y la chuleta visual https://grid.malven.co — guárdala en favoritos.

## Para repasar

- grid-column (span y líneas): https://developer.mozilla.org/es/docs/Web/CSS/grid-column
- grid-row: https://developer.mozilla.org/es/docs/Web/CSS/grid-row
- grid-area: https://developer.mozilla.org/es/docs/Web/CSS/grid-area
- grid-template-areas: https://developer.mozilla.org/es/docs/Web/CSS/grid-template-areas
- justify-items: https://developer.mozilla.org/es/docs/Web/CSS/justify-items
- justify-self: https://developer.mozilla.org/es/docs/Web/CSS/justify-self
- order: https://developer.mozilla.org/es/docs/Web/CSS/order
- Media queries (bonus): https://developer.mozilla.org/es/docs/Web/CSS/CSS_media_queries/Using_media_queries

## Tareas

De Grid, para que TechCart crezca. La que nadie logre, la armamos juntos al inicio de la próxima:

1. Fácil. Que la **segunda** tarjeta (no la destacada) ocupe 2 columnas con
   `grid-column: span 2`. Observa cómo se reacomodan las demás (¿apareció un hueco? En clase
   vimos por qué).
2. Intermedia. Zona **"promo"** en el plano de la página: un `<section class="promo">` nuevo en
   el HTML + `grid-area: promo` + su fila en el dibujo — con el nombre dos veces
   (`"promo promo"`), porque el plano tiene dos columnas.
3. Intermedia. La destacada en **2×2**: devuélvele `grid-row: span 2` y reparte su contenido
   con `justify-content` (la tarjeta ya es Flexbox en columna) para que no se vea vacía.
4. Difícil. Investiga `row-gap` y `column-gap` y dale al catálogo más aire entre filas que
   entre columnas (pista: `gap` acepta dos valores — averigua cuál va primero).
5. Difícil. El formulario de compra a **2 columnas**: los dos `<fieldset>` lado a lado
   (`display: grid` en el `form`) y el botón cruzando todo el ancho con `grid-column: 1 / -1`.

Clase anterior: [Clase 3. Flexbox (y arranque de Grid)](../clase-03/README.md)
