# Clase 5. Responsive: media queries, variables CSS y transiciones

En la Clase 4 terminamos **CSS Grid**: la página quedó maquetada con un plano
(`grid-template-areas`), barra lateral, footer de tienda y el pie pegado abajo. En la Clase 5
la tienda aprende a **vivir en cualquier pantalla**: media queries, unidades relativas, la
paleta con **variables CSS**, **modo oscuro**, las primeras **transiciones** — y una sección
nueva construida desde cero.

## Contenido de la carpeta

- `index.html` y `css/styles.css`: el código **tal como quedó al final de la Clase 4** (página
  con plano y barra lateral, catálogo Grid responsive, footer de columnas, destacada a 2
  columnas). Este es el punto de partida; sobre él trabajamos en clase. Si faltaste a la
  Clase 4, cópialo para tener la base.

> El código de hoy se escribe **durante la clase**; por eso esta carpeta arranca con la base de
> la Clase 4, no con el resultado final.

## Temas

**Deudas que se pagan hoy:**
1. Repaso de la Clase 4 y sus tareas; las dos difíciles (el `gap` desigual y el formulario a
   2 columnas) se resuelven juntos.
2. Las unidades relativas: `%` (mira al padre), `em` (mira al tamaño de letra y se anida),
   `rem` (mira a la raíz de 16px), `vh`/`vw` (miran a la pantalla) — y el nivel 22 de Grid
   Garden que quedó saltado.

**Responsive:**
3. Media queries y el `meta viewport`; auditoría de la tienda en el celular (6 fallas).
4. La imagen fluida: `width: 100%`, `aspect-ratio` y `object-fit` (contain vs cover).
5. El plano re-dibujado para el celular + segundo breakpoint (tablet, 900px); el orden de los
   breakpoints.
6. Mobile-first: leer `min-width` (piso) frente a `max-width` (techo).

**Piel y movimiento:**
7. Variables CSS (design tokens): la paleta con nombre en `:root` + `var()`.
8. Modo oscuro con `@media (prefers-color-scheme: dark)`: mismos tokens, otros valores.
9. Transiciones y micro-interacciones: `transition` (en el estado base) + `transform`.
10. Sección nueva: la **franja de beneficios** — integra todo, construida desde el HTML.

**Bonus (solo si sobra tiempo):** animaciones con `@keyframes`.

## Cómo ver la página

Abre `index.html` con doble clic, o con la extensión Live Server en VS Code.

## Practicar

- **El modo móvil de DevTools** es la herramienta de esta clase: F12 y, con DevTools abierto,
  `Ctrl+Shift+M`. Para probar anchos libres, elige **"Responsive"** en el desplegable de
  dispositivos y escribe el ancho a mano (con un dispositivo fijo, el ancho queda bloqueado).
- **Emular el modo oscuro** sin tocar tu sistema: F12 → `Ctrl+Shift+P` → escribe `prefers` →
  "Emulate CSS prefers-color-scheme: dark" (y "No emulation" para soltarlo).
- Grid Garden, nivel 22 (el que faltaba): https://cssgridgarden.com — con las unidades de hoy
  ya se puede.

## Para repasar

- Media queries: https://developer.mozilla.org/es/docs/Learn_web_development/Core/CSS_layout/Media_queries
- Unidades y valores CSS: https://developer.mozilla.org/es/docs/Learn_web_development/Core/Styling_basics/Values_and_units
- Variables CSS (custom properties): https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties
- prefers-color-scheme: https://developer.mozilla.org/es/docs/Web/CSS/@media/prefers-color-scheme
- object-fit: https://developer.mozilla.org/es/docs/Web/CSS/object-fit
- transition: https://developer.mozilla.org/es/docs/Web/CSS/transition
- transform: https://developer.mozilla.org/es/docs/Web/CSS/transform

## Lecturas adicionales

Temas que en clase **no** desarrollamos a propósito. Ninguno hace falta para las tareas;
léelos cuando lo de la clase ya lo domines:

- `prefers-reduced-motion` — respetar a quien pide menos animación:
  https://developer.mozilla.org/es/docs/Web/CSS/@media/prefers-reduced-motion
- `clamp()` — tipografía que escala sola entre un mínimo y un máximo:
  https://developer.mozilla.org/es/docs/Web/CSS/clamp
- `srcset` — servir imágenes más livianas al celular:
  https://developer.mozilla.org/es/docs/Web/HTML/Guides/Responsive_images
- `@media (hover: hover)` — afinar los efectos de mouse en pantallas táctiles:
  https://developer.mozilla.org/es/docs/Web/CSS/@media/hover
- Container queries — media queries que miran al contenedor (lo más nuevo):
  https://developer.mozilla.org/es/docs/Web/CSS/CSS_containment/Container_queries
- `@keyframes` — animaciones de varios pasos (si no llegamos al bloque bonus):
  https://developer.mozilla.org/es/docs/Web/CSS/@keyframes

## Tareas

Para que TechCart crezca. La que nadie logre, la armamos juntos al inicio de la próxima:

1. Fácil. **Categorías en fila**: dentro del `@media` de 600px, que la lista de la barra
   lateral (`.lateral ul`) se ponga en fila con Flexbox y un `gap` — en el celular debe quedar
   una línea horizontal compacta bajo la cabecera.
2. Intermedia. **Modo oscuro completo**: con el modo oscuro emulado, recorre la página entera —
   los inputs, selects y textarea del formulario siguen blancos. Arréglalo con los tokens que
   ya existen (`--tarjeta`, `--borde`, `--texto`) en las reglas de `#compra`.
3. Intermedia. **Tokens de forma**: crea `--radio: 12px` y `--espacio: 1rem` en `:root` y
   reemplaza los `border-radius` y `padding` repetidos. Luego cambia `--radio` a `0` y mira tu
   tienda "cuadrada": esa es la prueba de que el token manda.
4. Difícil. **Zoom de producto**: al pasar el mouse por una tarjeta, la imagen hace zoom suave
   (`transform: scale(1.05)` con su `transition`) SIN salirse de su marco — investiga
   `overflow: hidden` en el `<figure>`.
5. Difícil. **Cabecera pegajosa**: que la cabecera quede fija arriba al hacer scroll.
   Investiga `position: sticky` con `top: 0` — y prepárate para dos sorpresas (`z-index`, y
   las mañas del sticky dentro de un body-grid). Quien la logre, cuenta CÓMO la próxima clase.

Clase anterior: [Clase 4. CSS Grid: colocación y maquetación](../clase-04/README.md)
