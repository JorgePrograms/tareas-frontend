# Clase 8. JavaScript (2): ECMAScript moderno

En la Clase 7 TechCart empezó a **pensar**: el catálogo pasó a ser un array de objetos y
aprendimos `map`, `filter` y `reduce`. En la Clase 8 no hay ideas nuevas: aprendemos a escribir
**lo mismo como se escribe hoy** (lo que la industria llama **ES6+**) y repartimos el proyecto en
**módulos**, un archivo por responsabilidad. Son cuatro piezas —template literals,
desestructuración, spread/rest y módulos— y las cuatro aparecen en cada archivo de React: hoy
estamos aprendiendo su **idioma**.

## Contenido de la carpeta

- `index.html` y `css/styles.css`: TechCart **tal como quedó al final de la Clase 6** (Tailwind v4,
  tokens con `@theme`, modo oscuro, componentes `.card` y `.btn`), con el `<script>` que enlaza el
  JavaScript.
- `js/main.js`: **el punto de partida**, o sea el código con el que cerró la Clase 7 (el array
  `productos` y los ejercicios de `map`/`filter`/`reduce`).
- `clase-08.pdf`: las diapositivas de la clase.

> Los archivos nuevos de hoy —`datos.js`, `carrito.js`, `formato.js` y `ui.js`— se escriben
> **durante la clase**. Por eso la carpeta arranca con un solo `main.js`.

## Herramientas de hoy

- **Live Server** en VS Code, y hoy **no es opcional**: los módulos (`import`/`export`) no
  funcionan si abres el `index.html` a mano; el navegador los bloquea por seguridad. Si ves un
  error de CORS con la palabra `module`, la pregunta es: ¿estoy con Live Server?
- **La consola del navegador** (F12 → *Console*) para probar ideas sueltas.
- Sin instalar nada más. (Node.js llega con React.)

## Temas

**Deudas que se pagan hoy (los 2 ejercicios difíciles de la Clase 7):**
1. **Valor de una categoría**: `filter` + `reduce` encadenados — de los smartphones con stock, el
   valor total (precio × stock). Se filtra **primero**, siempre.
2. **`resumenCarrito(items)`**: devuelve un **objeto** `{ cantidad, total }`. Una función devuelve
   un solo valor, pero si es un objeto adentro caben todos los datos que quieras.

**ECMAScript moderno:**
3. **Template literals**: comillas invertidas y `${ }`; adentro cabe cualquier expresión. Texto
   **multilínea** (la plantilla de una tarjeta) y `.toFixed(2)` para los decimales del dinero.
4. **Desestructuración**: `const { nombre, precio } = producto`; renombrar (`{ nombre: titulo }`),
   valor por defecto (`{ descuento = 0 }`), arrays por posición y —la más importante— en el
   **parámetro** de la función: `({ nombre, precio }) => …`, que es cómo React recibe sus props.
5. **Spread y rest** (`...`): copiar en vez de **mutar**. `[...productos, nuevo]` en vez de `push`,
   `{ ...producto, precio: otro }` para copiar cambiando una cosa, `[...productos].sort(...)`
   porque `sort` muta. Y rest, que son los **varargs** de Java.
6. **Detalles modernos**: propiedades abreviadas (`{ cantidad, total }`), arrow que devuelve un
   objeto (`p => ({ … })`, con paréntesis), parámetros por defecto, `find` / `some` / `every`, y la
   pareja **`?.` y `??`** para que un dato que falta no tumbe la página (`??` en vez de `||`
   cuando el `0` es un valor válido).
7. **Módulos JavaScript**: `export` / `import`, `export default`, `<script type="module">`, y el
   proyecto partido en `datos.js` (catálogo), `carrito.js` (dinero), `formato.js` (mostrar
   números), `ui.js` (cómo se ve un producto) y `main.js` (orquesta).
8. **Taller**: agrupar el catálogo por categoría con un `reduce` de **acumulador objeto**, y sacar
   la ficha de producto a `js/ui.js`.

## Cómo queda el proyecto al terminar

```
clase-08/
├─ index.html          → <script type="module" src="js/main.js">
├─ css/styles.css
└─ js/
   ├─ datos.js         → export const productos · contarPorCategoria
   ├─ carrito.js       → IGV · resumenCarrito · conDescuento · masCaroDe
   ├─ formato.js       → export default formatearPrecio
   ├─ ui.js            → fichaProducto (template literal multilínea)
   └─ main.js          → solo importa, usa y muestra
```

## Errores que vas a ver hoy (y qué significan)

| Mensaje | Causa |
|---|---|
| `Cannot use import statement outside a module` | Falta `type="module"` en el `<script>`. |
| `404` / `Failed to resolve module specifier` | Falta la extensión **`.js`** en el import (es obligatoria). |
| `does not provide an export named 'X'` | La función existe, pero le falta el `export`. |
| `Cannot destructure property 'x' of 'undefined'` | El objeto no llegó: estás desestructurando la nada. |
| `Cannot read properties of undefined` | Le pediste una propiedad a algo que no existe → usa `?.`. |
| `Identifier 'nombre' has already been declared` | Dejaste la forma larga y la desestructurada juntas. |

> ⚠️ Un error de import que **solo aparece al desplegar**: `"./Datos.js"` con mayúscula funciona en
> Windows y da 404 en Vercel (Linux). Nombres de archivo en minúscula, siempre.

## Lecturas y recursos

- **MDN** (developer.mozilla.org) — busca tres páginas: *destructuring assignment*, *spread
  syntax* y *JavaScript modules*. La última tiene un tutorial corto muy bueno.
- Lo que **no** vimos y vale la pena mirar: `switch` y `while` (pendientes de la Clase 7),
  `Object.keys` / `values` / `entries` para recorrer objetos, `Object.freeze` y `structuredClone`
  (el tema de la copia superficial), `Intl.NumberFormat` (la forma profesional de mostrar dinero,
  mejor que `toFixed`) y las `class` de JavaScript, que existen y se parecen a las de Java aunque
  en React casi no se usan.
- **playcode.io** — un playground gratis para probar JavaScript sin abrir el proyecto.

> 🔮 El tipado dinámico que incomoda en estas clases (escribes `p.Nombre` y nadie te avisa) se
> arregla en la **Clase 11 con TypeScript**. Todo lo de hoy es la base sobre la que se apoya: los
> tipos no cambian esta sintaxis, la **anotan**.


## Tareas

Cinco tareas graduadas sobre los módulos de esta clase. Las dos difíciles son las dos mitades de lo que
viene después, así que quien las haga llega leyendo.

| Nivel | Tarea |
|---|---|
| **Fácil** | **El catálogo en texto**: con `map` y un template literal, imprime una línea por producto así: `"AirPods Max · audio · S/ 549.99"`. Desestructura en el parámetro de la arrow y usa `formatearPrecio`. |
| **Intermedia 1** | **Rebajar sin romper**: en `carrito.js`, exporta `aplicarDescuento(producto, porcentaje = 10)` que devuelva una **copia** del producto con el precio rebajado. Úsala con dos productos e imprime después el precio **original** de ambos, para demostrar que no cambiaron. |
| **Intermedia 2** | **Buscar sin caerse**: exporta `buscarPorNombre(items, nombre)` con `find`. Imprime nombre y precio con template literal, usando `?.` y `??` para que cuando no exista salga `"No lo tenemos · S/ 0.00"` en vez de un error rojo. |
| **Difícil 1** | **El módulo de la vista**: en `ui.js`, agrega `fichaProducto(producto)` (template literal **multilínea**) y `resumenStock(items)`, que devuelva un texto tipo `"5 productos, 1 agotado"` — el conteo con `filter` y el "hay agotados" con `some`. |
| **Difícil 2** | **El carrito de verdad**: en `carrito.js`, `agregarAlCarrito(carrito, producto)` que devuelva un **carrito nuevo** (spread, sin `push`), y `resumenCarrito(items)` que devuelva `{ cantidad, subtotal, igv, total }` con **propiedades abreviadas**. Empieza con `[]`, agrega tres productos, imprime el resumen y comprueba que el carrito original sigue vacío. |

> Y la que quedó del taller: **`contarPorCategoria(items)`** — un `reduce` cuyo acumulador es un
> **objeto**, que devuelva `{ laptops: 1, smartphones: 1, tablets: 1, audio: 2 }`. Pista: el valor
> inicial es `{}` y adentro va `{ ...acc, [p.categoria]: (acc[p.categoria] ?? 0) + 1 }`. Esos corchetes
> hacen que JavaScript **evalúe** el nombre de la propiedad.

> Basado en el proyecto de referencia TechCart. Datos e imágenes de [DummyJSON](https://dummyjson.com).
