# Clase 2. Introducción a CSS

En la Clase 1 dejamos la tienda sin diseño. En la Clase 2 le damos sus primeros estilos y
aprendemos las bases de CSS: cómo se aplica, los selectores, la especificidad y el modelo
de cajas.

## Contenido de la carpeta

- `index.html`: el mismo HTML de la Clase 1, ya enlazado a la hoja de estilos. Si faltaste a
  la primera clase, cópialo para tener la base.
- `css/styles.css`: los estilos que trabajamos, con el significado de cada propiedad en un
  comentario corto.

## Temas

1. Qué es CSS y cómo se aplica: en línea, `style` interno y hoja externa con `link`.
   Anatomía de una regla: `selector { propiedad: valor; }`.
2. Selectores: de etiqueta, de clase, de id, descendientes y de estado (`:hover`).
3. Especificidad: por qué una regla le gana a otra (id sobre clase, clase sobre etiqueta).
4. Modelo de cajas: `content`, `padding`, `border` y `margin`; `box-sizing`; y `object-fit`
   con `aspect-ratio` para que las imágenes no descuadren.

## Para repasar

Conceptos:
- Cómo funciona CSS: https://developer.mozilla.org/es/docs/Web/CSS
- Selectores: https://developer.mozilla.org/es/docs/Web/CSS/CSS_selectors
- Especificidad: https://developer.mozilla.org/es/docs/Web/CSS/Specificity
- Modelo de cajas: https://developer.mozilla.org/es/docs/Web/CSS/CSS_box_model

Propiedades:
- box-sizing: https://developer.mozilla.org/es/docs/Web/CSS/box-sizing
- margin y padding: https://developer.mozilla.org/es/docs/Web/CSS/margin
- object-fit: https://developer.mozilla.org/es/docs/Web/CSS/object-fit
- aspect-ratio: https://developer.mozilla.org/es/docs/Web/CSS/aspect-ratio
- :hover: https://developer.mozilla.org/es/docs/Web/CSS/:hover

Para practicar selectores jugando: https://flukeout.github.io

## Tareas

Cinco tareas graduadas, todas con lo de esta clase: selectores, especificidad y box model. La fácil es
para todos; la que nadie logre se resuelve al inicio de la Clase 3.

| Nivel | Tarea |
|---|---|
| **Fácil** | **La barra de categorías**: el `<aside>` todavía se ve como texto suelto. Dale `background`, `padding` para que respire por dentro, y separa sus enlaces con `margin`. Solo box model. |
| **Intermedia 1** | **Paleta propia**: cambia el color de acento de toda la tienda (título, botones, `.destacado`, enlaces) a una identidad tuya. Es cambiar el mismo color en varios lugares — y en la Clase 5 verás cómo hacerlo en un solo sitio con variables. |
| **Intermedia 2** | **Footer con estilo**: el pie de página quedó sin diseño a propósito. Estilízalo solo con box model —`padding`, `margin`— y centra su contenido. |
| **Difícil 1** | **Tarjetas con vida**: investiga dos propiedades nuevas: `box-shadow` para darles sombra, y `transform` junto con `:hover` para que la tarjeta se eleve al pasar el mouse. Pista: `transform: translateY(-4px)`. |
| **Difícil 2** | **Ganarle a la especificidad**: escribe **tres** reglas que apunten al mismo título de una tarjeta —una por etiqueta (`h3`), una por clase (`.titulo`) y una por id (`#destacado h3`)—, cada una con un color distinto. Antes de refrescar, anota en un comentario cuál crees que gana. Compruébalo en DevTools: verás las reglas perdedoras **tachadas**. Y después, el verdadero reto: logra que gane el color de la **clase**, sin usar `!important`. |

Clase anterior: [Clase 1. La web y el HTML](../clase-01/README.md)
