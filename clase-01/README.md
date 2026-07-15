# Clase 1 — La web y el HTML

Bienvenido/a a la primera clase de **TechCart**. Hoy entendemos cómo funciona la web y
creamos el **esqueleto semántico** de la tienda con su **formulario de compra**, usando
solo **HTML** (sin CSS ni JavaScript todavía).

## En esta carpeta
- **[index.html](./index.html)** — el código que construimos en clase. Léelo con calma: cada parte tiene comentarios que explican la etiqueta o el atributo que se usa y por qué. Al final del archivo están los **ejercicios**.
- **[Clase-01-diapositivas.pdf](./Clase-01-diapositivas.pdf)** — las diapositivas de la clase.

## Lo que aprendiste hoy
1. **Cómo funciona la web** — cliente y servidor, petición y respuesta, y los tres lenguajes del frontend (HTML, CSS, JS).
2. **HTML5 semántico** — `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`: etiquetas con significado.
3. **Formularios** — `<form>`, `<label>`, `<fieldset>`/`<legend>`, `<input>`, `<select>`, `<datalist>`, `<textarea>` y radios.
4. **Validaciones nativas** — `required`, `type="email"`, `pattern`, `minlength`… el navegador valida solo, sin JavaScript.

## Cómo ver la página
Abre la carpeta en tu explorador de archivos y haz **doble clic** en `index.html`
(o, si tienes la extensión **Live Server** en VS Code: clic derecho → *Open with Live Server*).
Prueba enviar el formulario **vacío**: verás las validaciones del navegador.

## 🎯 Ejercicios
Están **dentro de `index.html`**, al final del archivo, como comentarios. Resuélvelos ahí mismo:

| Nivel | Reto |
|-------|------|
| 🟢 **Fácil** | Agregar un **quinto producto** al catálogo (copiar un `<article>` con su `<figure>` y cambiarle los datos). |
| 🟡 **Medio** | Agregar al formulario un campo **"Cantidad"** (`type="number"`, con `min`/`max`/`required`) y uno **"Empresa" opcional** (sin `required`). |
| 🔴 **Difícil** | Crear una segunda página **`nosotros.html`** con estructura semántica completa + un formulario de contacto, y enlazarla desde el `<nav>`. |

> Todos los ejercicios se resuelven **solo con lo visto hoy**: HTML semántico y formularios. No necesitas CSS ni JavaScript.

## Entregar
```bash
git add .
git commit -m "clase 1: ejercicios resueltos"
git push
```

---
➡️ **Próxima clase:** [Clase 2 — CSS](../clase-02/README.md)
