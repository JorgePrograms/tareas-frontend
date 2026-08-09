# Clase 6. Tailwind CSS: la misma tienda, escrita con utilidades

En la Clase 5 terminamos el CSS a mano: la tienda quedó **responsive** (media queries y
unidades relativas), con la paleta en **variables CSS**, **modo oscuro** y las primeras
**transiciones**. En la Clase 6 conocemos **Tailwind CSS v4**: no reemplaza nada de lo que ya
saben, lo **comprime**. Re-vestimos TechCart pieza por pieza —cabecera y tarjetas— y comparamos
cada utilidad con el CSS que ustedes mismos escribieron.

## Contenido de la carpeta

- `index.html` y `css/styles.css`: el código **tal como quedó al final de la Clase 5** (tienda
  responsive, con tokens en `:root`, modo oscuro, micro-interacciones y la franja de
  beneficios). Este es el punto de partida; sobre él trabajamos en clase. Si faltaste a la
  Clase 5, cópialo para tener la base.
- `clase-06.pdf`: las diapositivas de la clase.

> El código de hoy se escribe **durante la clase**; por eso esta carpeta arranca con el
> resultado de la Clase 5, no con la tienda ya convertida a Tailwind. Esa conversión es lo que
> construimos juntos y lo que terminan en las tareas.

## Herramientas de hoy

- **CDN de navegador de Tailwind v4** — una sola línea en el `<head>`, sin instalar nada:
  `<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>`.
- **La documentación oficial** (`tailwindcss.com`) — la usamos como diccionario CSS → Tailwind:
  se busca la **propiedad CSS** que quieres y da la utilidad.
- **DevTools** — para comprobar que cada utilidad genera exactamente el CSS que ya conoces
  (más el modo móvil y el emulador de modo oscuro de la Clase 5).

## Temas

**Deudas que se pagan hoy (tareas difíciles de la Clase 5):**
1. **Zoom de producto**: la imagen crece al pasar el mouse (`transform: scale`) sin salirse de
   su marco (`overflow: hidden` en el `<figure>`).
2. **Cabecera pegajosa**: `position: sticky` + `top: 0`, con `z-index` para que quede por
   encima del contenido.

**Tailwind CSS:**
3. Qué es: **utility-first** — una utilidad equivale a una propiedad CSS (`flex`, `gap-4`,
   `bg-white`). Instalación con el CDN de navegador y qué es **Preflight** (el reset que aplana
   los estilos del navegador).
4. **Por qué v4 y no v3**: la configuración vive en el CSS (`@theme`), es más rápida y trae las
   container queries de fábrica. Proyecto nuevo → v4.
5. **Re-skin de la cabecera**: traducir su regla CSS a utilidades, línea por línea. Los
   **valores arbitrarios** `[...]` para el azul de marca.
6. **Re-skin de la tarjeta**: la misma idea con las micro-interacciones (`hover:`), y la
   **repetición** que aparece al escribir la misma tira de utilidades en cada tarjeta.
7. **Responsive con prefijos** (`md:`, `lg:`): Tailwind es **mobile-first de fábrica**; los
   prefijos son `min-width` ("de tal ancho para arriba").
8. **Modo oscuro** con la variante `dark:`, que por debajo es el `@media (prefers-color-scheme)`
   de la Clase 5.
9. **Componentes reutilizables**: **tokens de color** con `@theme` (las variables de la Clase 5,
   ahora generando utilidades) y los tres caminos para la repetición —convivir, `@apply` (con
   build) y el componente de verdad, que llega con **React**.

**Bonus (si sobra tiempo):**
- **Container queries** (`@container`): responsive según el **contenedor**, no la pantalla.
- **`has-*`**: estilar al **padre** según lo que tenga adentro (`has-[:checked]`), sin JavaScript.

## Lecturas adicionales

- El **build real** con la línea de comandos o Vite (lo que veremos al llegar a React) — es lo
  que habilita `@apply` para hacer componentes.
- **`group`** — para que el hover de un elemento afecte a un hijo (el zoom de imagen).
- **play.tailwindcss.com** — un editor de Tailwind en línea para experimentar sin instalar nada.


## Tareas

Cinco tareas graduadas, todas con Tailwind. La fácil es para todos; la que nadie logre se resuelve al
inicio de la Clase 7.

| Nivel | Tarea |
|---|---|
| **Fácil** | **Los enlaces en azul de marca**: termina los enlaces del menú y del pie con utilidades de color (`text-marca`) y su `hover:`. |
| **Intermedia 1** | **El footer, a Tailwind**: traduce la regla `footer` de la Clase 5 a utilidades, sin escribir CSS. |
| **Intermedia 2** | **El formulario responsive**: que el formulario de compra pase de una a dos columnas con prefijos de pantalla (`md:`). |
| **Difícil 1** | **El zoom de imagen con `group`**: al pasar el mouse por la **tarjeta**, la **imagen** hace zoom. Pistas: `group` en el padre, `group-hover:scale-105` en la imagen, y `overflow-hidden` para que no se salga. |
| **Difícil 2** | **La tienda entera en modo oscuro sin repetir `dark:`**: haz que los tokens de `@theme` cambien de valor dentro de un `@media (prefers-color-scheme: dark)`, y que todas las utilidades los sigan solas. |

> Basado en el proyecto de referencia TechCart. Datos e imágenes de [DummyJSON](https://dummyjson.com).
