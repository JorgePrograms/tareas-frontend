# Clase 3. Flexbox (y arranque de Grid)

En la Clase 2 le dimos los primeros estilos a la tienda, pero las tarjetas quedaron puestas
con `inline-block`, que es la forma torpe. En la Clase 3 maquetamos de verdad con **Flexbox**
y, si queda tiempo, arrancamos **CSS Grid**.

## Contenido de la carpeta

- `index.html` y `css/styles.css`: el código **tal como quedó al final de la Clase 2**. Este
  es el punto de partida; sobre él construimos Flexbox en clase. Si faltaste a la Clase 2,
  cópialo para tener la base.

> El código de Flexbox y Grid se escribe **durante la clase**; por eso esta carpeta arranca
> con la base de la Clase 2, no con el resultado final.

## Temas

**Flexbox** (alinear y distribuir en una dimensión):
1. Contenedor, ítems y los dos ejes (principal y cruzado).
2. `justify-content`: distribuir en el eje principal.
3. `align-items` y `flex-direction`: alinear y elegir fila o columna.
4. `flex-wrap` y `gap`: que las tarjetas salten de línea y respiren.
5. `flex` en los ítems: crecer o tamaño fijo.

**Arranque de CSS Grid** (dos dimensiones):
6. `display: grid`, `grid-template-columns` y la unidad `fr`.
7. Catálogo responsivo con `repeat(auto-fill, minmax(200px, 1fr))`.

## Cómo ver la página

Abre `index.html` con doble clic, o con la extensión Live Server en VS Code.

## Practicar jugando

- Flexbox: https://flexboxfroggy.com (llevar ranas a su nenúfar con propiedades de Flexbox).
- Grid: https://cssgridgarden.com (el equivalente para Grid).

## Para repasar

- Flexbox (guía completa): https://developer.mozilla.org/es/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox
- justify-content: https://developer.mozilla.org/es/docs/Web/CSS/justify-content
- align-items: https://developer.mozilla.org/es/docs/Web/CSS/align-items
- flex-wrap: https://developer.mozilla.org/es/docs/Web/CSS/flex-wrap
- flex: https://developer.mozilla.org/es/docs/Web/CSS/flex
- Grid (guía completa): https://developer.mozilla.org/es/docs/Web/CSS/CSS_grid_layout
- grid-template-columns: https://developer.mozilla.org/es/docs/Web/CSS/grid-template-columns

## Tareas

De Flexbox, para expandir TechCart:

1. Fácil. Centrar los enlaces del menú con `justify-content` en el `nav ul`.
2. Intermedia. Que en pantalla angosta el menú baje debajo del logo (`flex-wrap` en el `header`).
3. Intermedia. Agregar arriba del catálogo una barra de categorías con botones en fila,
   distribuidos con `justify-content`.
4. Difícil. Investigar `align-self` y usarlo para destacar una tarjeta.
5. Difícil. Rearmar el `footer` como el de una tienda real: varias columnas con Flexbox.

Las de Grid llegan cuando terminemos Grid en la próxima sesión.

Clase anterior: [Clase 2. Introducción a CSS](../clase-02/README.md)