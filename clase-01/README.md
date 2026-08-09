# Clase 1. La web y el HTML

En esta primera clase de TechCart entendemos cómo funciona la web y creamos el esqueleto
semántico de la tienda junto con su formulario de compra, usando solo HTML (aún sin CSS
ni JavaScript).

## Contenido de la carpeta

- `index.html`: el código que construimos en clase. Léelo con calma; cada parte tiene
  comentarios que explican la etiqueta o el atributo que se usa y por qué. Los ejercicios
  están al final del archivo.
- `Clase-01-diapositivas.pdf`: las diapositivas de la sesión.

## Lo que vimos

1. Cómo funciona la web: cliente y servidor, petición y respuesta, y los tres lenguajes
   del frontend (HTML, CSS y JavaScript).
2. HTML semántico: `header`, `nav`, `main`, `section`, `article`, `figure` y `footer`.
3. Formularios: `form`, `label`, `fieldset`/`legend`, `input`, `select`, `datalist`,
   `textarea` y botones de radio.
4. Validaciones nativas: `required`, `type="email"`, `pattern`, `minlength`. El navegador
   valida sin necesidad de JavaScript.

## Cómo ver la página

Abre la carpeta en tu explorador de archivos y haz doble clic en `index.html`. Si tienes
la extensión Live Server en VS Code, también puedes hacer clic derecho y elegir "Open with
Live Server". Prueba a enviar el formulario vacío para ver las validaciones del navegador.

## Ejercicios

Están dentro de `index.html`, al final del archivo, como comentarios. Se resuelven ahí
mismo y solo con lo visto en clase (HTML semántico y formularios).

1. Fácil. Agrega un quinto producto al catálogo copiando un `article` y cambiando sus datos.
2. Medio. Agrega al formulario un campo "Cantidad" (`type="number"` con `min`, `max` y
   `required`) y uno "Empresa" opcional (sin `required`).
3. Difícil. Crea una segunda página `nosotros.html` con estructura semántica completa y un
   formulario de contacto, y enlázala desde el `nav`.

## Entregar

```bash
git add .
git commit -m "clase 1: ejercicios resueltos"
git push
```

Siguiente clase: [Clase 2. Introducción a CSS](../clase-02/README.md)

## Tareas para casa

Cinco tareas graduadas, todas **solo con HTML** (sin CSS y sin JavaScript). La fácil es para todos; las
difíciles piden investigar. La que nadie logre se resuelve al inicio de la Clase 2.

| Nivel | Tarea |
|---|---|
| **Fácil** | **Un sexto producto**: copia un `<article>` completo — su `<figure>`, su `<img>` con `alt` bien escrito, su `<figcaption>`, nombre, precio y botón. Si el `alt` queda vacío, no vale. |
| **Intermedia 1** | **La página "Nosotros"**: termina `nosotros.html` con su estructura semántica completa (`header`, `nav`, `main`, `section`, `footer`) y **enlázala desde el `<nav>`** de las dos páginas, para poder ir y volver. |
| **Intermedia 2** | **Dos campos que el navegador valide solo**: un **teléfono** con `type="tel"` y un `pattern` de solo dígitos, y una **fecha de entrega** con `type="date"`. Intenta enviar con el teléfono mal escrito y comprueba que el navegador te frena sin JavaScript. |
| **Difícil 1** | **Datos de facturación**: un `<fieldset>` con su `<legend>` y dos campos — **empresa** (opcional, sin `required`) y **RUC** (obligatorio, 11 dígitos exactos). Pista: `pattern="[0-9]{11}"`. Prueba que con 10 dígitos no te deja enviar. |
| **Difícil 2** | **Preguntas frecuentes sin JavaScript**: investiga `<details>` y `<summary>` y arma tres preguntas que se **abran y cierren al hacer clic**, sin una línea de JS. |

> Sube lo que hagas a GitHub: `git add .` → `git commit -m "clase 1"` → `git push`.
