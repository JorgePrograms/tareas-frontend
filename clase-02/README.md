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

## Retos

1. Paleta propia: cambia el color de acento de la tienda (título, botones, `.destacado`, enlaces).
2. Tarjetas con vida: investiga `box-shadow` y un `:hover` con `transform` que las eleve.
3. Footer con estilo: estiliza el `footer` (hoy sin diseño) usando box model y centra su contenido.

Clase anterior: [Clase 1. La web y el HTML](../clase-01/README.md)
