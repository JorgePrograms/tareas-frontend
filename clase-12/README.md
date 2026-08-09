# Clase 12 — TypeScript: el contrato del proyecto

> ⏱️ **Duración: 4 h 30 min** de contenido (el receso va aparte).
> ✅ **Esta carpeta es el punto de partida**: el proyecto tal como quedó cuando se cortó la Clase 11.
> 🟢 **Primera clase que necesita instalar algo: Node.js.** Los pasos están acá abajo — si podés,
> hacelo **antes** de que empiece la clase.

## ✅ Qué necesitás hoy (checklist)

| | Qué | Estado |
|---|---|---|
| 🟢 | **Node.js** (trae npm incluido) | **hay que instalarlo** — pasos acá abajo |
| 🔵 | **TypeScript** | se instala **en clase**, dentro del proyecto: `npm i -D typescript` |
| ⚪ | **VS Code** | ya lo tenés · **no hace falta ninguna extensión de TypeScript**, viene incorporado |
| ⚪ | **Live Server** | ya lo tenés desde la Clase 9 · **hoy es obligatorio**: el proyecto usa módulos ES y con doble clic (`file://`) la página queda en blanco |
| ⚠️ | **Internet** | para `npm install`, para los 38 productos de DummyJSON y para el CDN de Tailwind |

Nada más. No se instala nada global ni se toca ninguna configuración de tu sistema.

## 🟢 Instalar Node.js (lee esto primero)

Hasta ahora nos alcanzó con VS Code y el navegador, porque el navegador entiende HTML, CSS y JavaScript.
Pero **no entiende TypeScript**: alguien tiene que traducirlo, y ese traductor es un programa que corre
**fuera** del navegador. Para eso existe **Node.js**.

> 🔗 Si venís de Java: Node es a JavaScript lo que la **JVM** es a Java. Y **npm** —que viene incluido— es
> tu **Maven**: baja las dependencias y las deja en una carpeta del proyecto.

**Pasos:**

1. Entrá a **[nodejs.org](https://nodejs.org)**.
2. Vas a ver dos botones. **Bajá el que dice `LTS`**, siempre — es la versión estable, la que usan las
   empresas. El otro ("Current") trae lo último… y los errores de lo último. La página ya detecta si
   estás en Windows o en Mac.
3. Ejecutá el instalador y **dale "Siguiente" a todo**: los valores por defecto están bien.
   ⚠️ Si aparece una casilla sobre **"Tools for Native Modules"**, **dejala desmarcada** — no la
   necesitamos y tarda diez minutos más.
4. **Cuando termine, cerrá la terminal y VS Code, y volvé a abrirlos.**

> ### ⚠️ El paso 4 es el que falla siempre
> Si no reiniciás la terminal, te va a seguir diciendo que `node` no existe — porque la que ya estaba
> abierta no se enteró de que apareció un programa nuevo. **Ese es el 90% de los "a mí no me funciona".**
> Si reiniciaste la terminal y sigue igual, cerrá **VS Code completo** y abrilo de nuevo.

**Comprobación.** Abrí una terminal (en VS Code: `Ver → Terminal`, o `Ctrl+Ñ`) y escribí:

```bash
node -v     # tiene que responder algo como v22.x
npm -v      # tiene que responder algo como 10.x
```

Si las dos responden un número, ya está: **no hace falta instalar nada más en todo el curso**. El número
exacto da igual.

### 🪟 Si estás en Windows y `npm -v` te da un error rojo largo

Si `node -v` funciona pero `npm -v` te dice algo como:

```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because
running scripts is disabled on this system.
```

**No desinstales nada: npm está bien instalado.** En Windows, npm se ejecuta a través de un script
`.ps1`, y PowerShell viene configurado de fábrica para no correr scripts. Es lo más común del mundo.

**Solución rápida (recomendada, no toca nada del sistema): usá Command Prompt en vez de PowerShell.**
En VS Code, en el panel de la terminal, hacé clic en la flechita `˅` al lado del `+` →
**Select Default Profile** → **Command Prompt**. Cerrá la terminal, abrila de nuevo, y listo.

**Solución de fondo (si querés dejarlo bien):** en la **misma PowerShell** donde falló, ejecutá:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Respondé `S` y volvé a probar. Es lo que recomienda Microsoft: afecta **solo a tu usuario**, no necesita
permisos de administrador, y `RemoteSigned` sigue exigiendo firma a los scripts bajados de internet.
No uses `Bypass` ni `Unrestricted`.

> Si es una laptop del trabajo, puede que la empresa lo tenga bloqueado y el comando falle.
> En ese caso usá **Command Prompt** y seguí sin problema.

> 🆘 Si no te funciona y la clase ya empezó, **avisá por el chat y seguí igual**: el Bloque 2 son 25
> minutos sin tocar la terminal, y existe la carpeta `clase-12-instalado/` como plan B.

Los tres errores que vivimos en la Clase 11 eran **el mismo error**: el respaldo mostró `undefined` en la
marca, el carrito guardado dijo `S/ NaN`, y el buscador se habría roto si `marca` viniera vacía. En los
tres, un objeto no tenía la forma que el código esperaba — y **nadie avisó**.

Hoy le ponemos **tipos** a este proyecto. De esta clase en adelante, todo —incluido React— se escribe en
TypeScript.

## ⚠️ Todos partimos del mismo código

La Clase 11 se cortó y cada uno quedó en un punto distinto. **Descargá esta carpeta y trabajá sobre ella**,
para que cuando el profe diga "acá les tiene que salir un subrayado rojo", te salga a vos también.
Si tu versión está más avanzada, **guardala aparte** y compará al final: no la tires.

## Conceptos que se enseñan (temario)
1. **Qué es TypeScript** — un **compilador**, no un runtime: los tipos **desaparecen** y el navegador solo ve JavaScript. De ahí la frase del día: *anotar un tipo no valida nada*.
2. **Tipado estructural** — Java mira el **nombre** (`implements`), TypeScript mira la **forma**. Si tiene los campos, **es** ese tipo.
3. **Instalar y compilar** — `npm init`, `npm i -D typescript`, `tsconfig.json`, `tsc --watch`, `src/` → `dist/`.
4. **`interface`** — el contrato en un solo lugar (`tipos.ts`), inferencia, y por qué **no se anota lo obvio**.
5. **Uniones (`|`), literales, opcionales (`?`), intersecciones (`&`)** — los tipos que Java no tiene.
6. **Tipos de función** — `(id: number) => void` y `void`: la mitad de las props de React.
7. **Narrowing** — el compilador **lee tus `if`**: `typeof`, `Array.isArray`, `instanceof`. Y por qué el `!` es una promesa peligrosa.
8. **Genéricos** — leer `Array<T>`, `Promise<T>`, `Pick`/`Omit`… y escribir uno propio con `<T extends …>`.
9. **`any` vs `unknown`** — apagar TypeScript, o que te obligue a mirar.
10. **Las tres aduanas** — la API, el `localStorage` y el formulario: las tres puertas por donde entra lo que no escribimos nosotros.
11. **El checkout, en TypeScript** — `submit`, la validación nativa que regaló la Clase 1, `FormData` + `Object.fromEntries`, y el `Pedido` tipado.

## Agenda (4 h 30)
| Bloque | Tiempo | Qué se hace |
|--------|:------:|-------------|
| 1. Punto de partida + cerrar JS | 24 min | `document.title` y `some`/`every` (en JavaScript). |
| 2. Por qué TypeScript | 26 min | Los tres fantasmas · qué es en serio · el **Playground**. |
| 3. Instalar y compilar | 32 min | npm, tsc, tsconfig, `--watch`, y el primer error. |
| 4. El contrato | 38 min | `interface Producto` y el adaptador tipado. |
| ☕ Receso | 15 min | Aparte. |
| 5. Lo que React va a pedir | 46 min | Uniones, tipos de función, `<>`, narrowing. |
| 6. Las tres aduanas | 40 min | `any` vs `unknown`, API, `localStorage`, DOM. |
| 7. Genérico propio + **checkout** | 40 min | La última deuda de JavaScript, ya en TypeScript. |
| 8. Cierre | 24 min | Resumen, lecturas, 5 tareas y anticipo a React. |

## 🛠️ La instalación, paso a paso (Bloque 3)

Los tres comandos, parados **dentro de la carpeta del proyecto** (si escribís `ls` o `dir` tenés que ver
`index.html`):

```bash
npm init -y                      # crea package.json
npm install --save-dev typescript   # baja TypeScript a ESTE proyecto
npx tsc --init                   # crea tsconfig.json
```

El `tsconfig.json` que genera viene configurado **para Node, no para el navegador**. Así que
**borrá todo su contenido y pegá esto** (no lo tecleés, es para no perder tiempo con las comas):

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "bundler",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "sourceMap": true
  },
  "include": ["src"]
}
```

> ⚠️ **Ojo con los tutoriales de internet.** Vas a encontrar muchísimos que ponen
> `"moduleResolution": "node"`. **Esa opción ya no existe**: se eliminó en TypeScript 7, que es la que
> instala `npm i -D typescript` hoy. Si la usás, el compilador te dice *"Option 'moduleResolution=node10'
> has been removed"* y no compila nada. Es un buen recordatorio de que en JavaScript el ecosistema se
> mueve más rápido que los blogs: mirá la fecha del artículo antes de dudar de tu código.

Y en `package.json`, agregá el script (queda `npm run dev` corriendo toda la clase):

```json
  "scripts": {
    "dev": "tsc --watch"
  }
```

Los últimos tres pasos: renombrá la carpeta **`js/` → `src/`** y los seis archivos de **`.js` a `.ts`**;
en `index.html` cambiá el `<script>` para que apunte a **`dist/main.js`**; y corré `npm run dev`.

**Comprobación:** abrí la tienda con Live Server. Si ves los 38 productos, ya está — acabás de meter un
compilador en el medio y la tienda ni se enteró.

> 🆘 **Si la instalación se te traba**, descargá la carpeta **`clase-12-instalado/`** del repo: viene con
> el `package.json`, el `tsconfig.json` y el `src/` ya armados. Corré `npm install` y `npm run dev` y
> seguí la clase. Lo tuyo lo miramos en el receso — no te pierdas TypeScript por un problema de rutas.

## Contenido de la carpeta (el punto de partida)
- `index.html` y `css/styles.css`: la barra lateral con `data-categoria`, el buscador, el aviso del respaldo y la sección del carrito. El `<script>` todavía apunta a `js/main.js` — **en clase pasa a `dist/main.js`**.
- `js/datos.js`: el plan B, con `marca` y `valoracion`.
- `js/api.js`: `Promise.all` con las cuatro categorías, el adaptador y el respaldo con `{ productos, esRespaldo }`.
- `js/carrito.js`: `agregarItem`, `cambiarCantidad`, `quitarItem` y `resumenCarrito` (cuenta **unidades**), con tope de stock.
- `js/ui.js`: `tarjetaProducto`, `filaCarrito` con `× cantidad`, `aviso` y `escaparTexto`.
- `js/main.js`: los tres datos del catálogo, `productosVisibles()` (estado derivado) y los cuatro listeners.

**Lo que se escribe durante la clase** (y por eso **no** está acá): `package.json`, `tsconfig.json`,
la carpeta `src/` con los archivos en `.ts`, `src/tipos.ts` con el contrato, y el **checkout** completo.

## Cómo verlo
Abrí `index.html` con **Live Server**. Y durante la clase, dejá una terminal con `npm run dev` corriendo:
cada vez que guardes un `.ts` se recompila solo. Si la página deja de actualizarse, casi siempre es que
esa terminal se cerró.

## Tareas para casa (5)

> Todas sobre **tu** proyecto. El criterio de entrega es objetivo: **`npx tsc --noEmit` en cero**.

1. **Fácil — tipar lo que quedó suelto.** Corré `npx tsc --noEmit` y arreglá todo lo que salga: `masCaroDe` y `conDescuento` en `carrito.ts`, `fichaProducto` en `ui.ts`, y los listeners donde `evento.target` sigue sin tipo. Pista: para el `target`, preferí `instanceof` antes que `as`.
2. **Intermedia 1 — el estado de carga, como tipo.** `let estado: EstadoCarga` y una función `pintarEstado()` que dibuje según el valor. La gracia: si agregás un cuarto estado y te olvidás de dibujarlo, que **el compilador te lo diga**. Buscá *exhaustiveness checking* y `never`.
3. **Intermedia 2 — `contarPorCategoria`, tipada.** Que la lateral diga "Laptops (5)". En JavaScript era un `reduce` con acumulador objeto; el retorno se escribe `Record<string, number>`. Pista: al acumulador del `reduce` hay que decirle su tipo.
4. **Difícil 1 — el detalle del producto.** Al hacer clic en una tarjeta (no en el botón), pedir `/products/{id}` y mostrar descripción, marca, valoración y stock. Hay que ampliar `ProductoAPI` y `mapearProducto`, y manejar cargando/error. **Ojo con el narrowing**: `descripcion` es opcional, así que TypeScript no te va a dejar usarla sin preguntar.
5. **Difícil 2 — "Mis pedidos", con su aduana.** El checkout guarda en `techcart_pedidos` y nadie lo mira. Listá cada pedido con número, fecha, cantidad y total, y adentro sus ítems. Tres condiciones: leer el `localStorage` con **`unknown`** y comprobar antes de confiar; **escapar** el nombre del cliente (lo escribió un usuario); y una función `pintarPedidos()` llamada al arrancar y tras confirmar.

## Lecturas adicionales
- **[TypeScript Playground](https://www.typescriptlang.org/play)** — escribí TS a la izquierda y mirá el JavaScript que sale. Media hora ahí enseña más que cualquier explicación.
- **Zod** — validación en **runtime** que además te genera el tipo. Es lo que resuelve de verdad las tres aduanas.
- **Utility types** — `Partial`, `Required`, `Readonly`, `Record`.
- **`enum` en TypeScript** — existe, pero hoy casi nadie lo usa: se prefieren las uniones de literales. Buscá por qué.
- **Type guards propios** — `function esProducto(x: unknown): x is Producto`.
- **`satisfies`** — cumplir un tipo sin perder la inferencia.

## Próxima clase (Clase 13)
**React + Vite + JSX**, en TypeScript. Arrancamos con `npm create vite@latest` y la plantilla de
**React + TypeScript**. Lo único genuinamente nuevo va a ser que una función pueda **devolver HTML** —
eso es JSX. Las props tipadas, los genéricos de `useState` y las uniones de estado ya los sabés leer.
