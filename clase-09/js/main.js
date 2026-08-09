// main.js — el punto donde quedó la Clase 8: se dictó hasta el "rest" (los tres puntos
// juntando parámetros) y ahí se cortó. Este es el PUNTO DE PARTIDA de la Clase 9.
//
// Lo que falta y se hace EN CLASE:
//   1. el ejercicio de spread (aplicarDescuento y ordenar sin mutar)
//   2. propiedades abreviadas, parámetros por defecto, find, ?. y ??
//   3. partir este archivo en módulos (datos.js · carrito.js · formato.js · ui.js · main.js)
//   4. el DOM: pintar el catálogo, los eventos y el localStorage

// ===== Clase 7: el catálogo como datos =====
const productos = [
  { nombre: "MacBook Pro 14", precio: 1999.99, categoria: "laptops",     stock: 5 },
  { nombre: "iPhone 13 Pro",  precio: 1099.99, categoria: "smartphones", stock: 8 },
  { nombre: "iPad Mini",      precio: 499.99,  categoria: "tablets",     stock: 0 },
  { nombre: "AirPods Max",    precio: 549.99,  categoria: "audio",       stock: 3 },
]

productos.push({ nombre: "Apple Watch", precio: 399.99, categoria: "audio", stock: 6 })

console.log(productos[2].nombre)   // "iPad Mini" — el índice 2 es el TERCERO
console.log(productos.length)      // 5

// map transforma · filter filtra · reduce acumula (= los Streams de Java)
const nombres = productos.map(p => p.nombre)
const conIGV = productos.map(p => p.precio * 1.18)
const caros = productos.filter(p => p.precio > 1000)
const disponibles = productos.filter(p => p.stock > 0)
const nombresEnStock = productos.filter(p => p.stock > 0).map(p => p.nombre)
const total = productos.reduce((suma, p) => suma + p.precio, 0)
const enOferta = productos.filter(p => p.precio < 600).map(p => p.nombre)
const inventario = productos.reduce((suma, p) => suma + p.precio * p.stock, 0)

console.log(nombres, conIGV)
console.table(caros)
console.table(disponibles)
console.log(nombresEnStock, enOferta)
console.log("Total: " + total)
console.log(inventario)   // 22849.780000000002 ← los decimales de JS

// ===== Clase 8, bloque 1: los dos difíciles que quedaron de la Clase 7 =====

// De una categoría, los que tienen stock: valor total (precio x stock).
// Se filtra PRIMERO y se acumula después.
const valorCategoria = (categoria) =>
  productos
    .filter(p => p.categoria === categoria && p.stock > 0)
    .reduce((suma, p) => suma + p.precio * p.stock, 0)

console.log(valorCategoria("smartphones"))   // 8799.92
console.log(valorCategoria("audio"))         // 4049.91
console.log(valorCategoria("tablets"))       // 0 ← el valor inicial del reduce

// El resumen del carrito: una función puede devolver varios datos si devuelve un OBJETO.
function resumenCarrito(items) {
  const cantidad = items.length
  const total = items.reduce((suma, p) => suma + p.precio, 0)
  return { cantidad: cantidad, total: total }   // ← esta línea se acorta en la Clase 9
}

console.log(resumenCarrito(productos))   // { cantidad: 5, total: 4549.95 }

// ===== Clase 8, bloque 2: template literals =====
const primerProducto = productos[0]

// Antes: concatenar con +. Ahora: comillas invertidas y ${ }.
console.log("El " + primerProducto.nombre + " cuesta S/ " + primerProducto.precio)
console.log(`El ${primerProducto.nombre} cuesta S/ ${primerProducto.precio}`)

// Adentro del ${ } cabe cualquier expresión. Y los precios van con .toFixed(2).
console.log(`${primerProducto.nombre} con IGV: S/ ${(primerProducto.precio * 1.18).toFixed(2)}`)
console.log(`${primerProducto.nombre} está ${primerProducto.stock > 0 ? "disponible" : "agotado"}`)

// Con comillas invertidas el texto puede ocupar varias líneas.
const fichaProducto = (p) => `
  ${p.nombre}
  categoría: ${p.categoria}
  precio:    S/ ${p.precio.toFixed(2)}
  ${p.stock > 0 ? "En stock" : "Agotado"}
`

console.log(fichaProducto(productos[0]))
console.log(fichaProducto(productos[2]))

// Ejercicio 1: "MacBook Pro 14 — S/ 1999.99 · 5 en stock"
const etiquetas = productos.map(p => `${p.nombre} — S/ ${p.precio.toFixed(2)} · ${p.stock} en stock`)
console.log(etiquetas)

// ===== Clase 8, bloque 3: desestructuración =====
const producto = productos[1]

// A la izquierda del = van las LLAVES del objeto (tienen que existir).
const { nombre, precio } = producto
console.log(nombre, precio)

// Renombrar al sacar: izquierda del : la llave, derecha el nombre de mi variable.
const { nombre: titulo } = productos[3]
console.log(titulo)

// Valor por defecto: entra solo si la propiedad NO existe (o es undefined).
const { descuento = 0 } = producto
console.log(descuento)

// Con arrays: corchetes y por POSICIÓN.
const [primero, segundo] = productos
const [, , tercero] = productos
console.log(primero.nombre, segundo.nombre, tercero.nombre)

// Y el caso que importa: desestructurar en el PARÁMETRO de la función.
const ficha = ({ nombre, categoria, precio }) => `${nombre} (${categoria}) — S/ ${precio.toFixed(2)}`
console.log(ficha(productos[3]))

const soloNombres = productos.map(({ nombre }) => nombre)
console.log(soloNombres)

// Ejercicio 2: map + desestructuración en el parámetro + template literal
const resumenes = productos.map(({ nombre, categoria, precio }) =>
  `${nombre} (${categoria}): S/ ${precio.toFixed(2)}`
)
console.log(resumenes)

// ===== Clase 8, bloque 4: spread y rest =====

// Copiar y agregar SIN mutar el original (a diferencia de push).
const copia = [...productos]
const magicMouse = { nombre: "Magic Mouse", precio: 79.99, categoria: "accesorios", stock: 12 }
const conNuevo = [...productos, magicMouse]

console.log(productos.length)   // 5 ← intacto
console.log(conNuevo.length)    // 6

// Combinar dos arrays.
const laptops = productos.filter(p => p.categoria === "laptops")
const audio = productos.filter(p => p.categoria === "audio")
const seleccion = [...laptops, ...audio]
console.log(seleccion.length)   // 3

// sort MUTA: se copia primero y se ordena la copia.
const porPrecio = [...productos].sort((a, b) => a.precio - b.precio)
console.log(porPrecio.map(p => p.nombre))
console.log(productos.map(p => p.nombre))   // el original, en su orden

// Spread en objetos: copio todo y piso una propiedad. El último que se escribe, gana.
const rebajado = { ...productos[0], precio: 1799.99 }
console.log(productos[0].precio)   // 1999.99 ← intacto
console.log(rebajado.precio)       // 1799.99

// Spread como argumentos: desparrama el array en valores sueltos.
const precios = productos.map(p => p.precio)
console.log(Math.max(...precios))   // 1999.99

// Rest: los mismos puntos, juntando lo que llegue (= los varargs de Java).
const sumar = (...numeros) => numeros.reduce((suma, n) => suma + n, 0)
console.log(sumar(10, 20, 30))   // 60

// Rest al desestructurar: "este dato aparte, y todo lo demás junto".
const { categoria, ...resto } = productos[0]
console.log(categoria)   // "laptops"
console.log(resto)       // { nombre, precio, stock }

// --- Hasta aquí llegó la Clase 8. La Clase 9 sigue desde acá. ---

// ==============================================================================
// ===== DESARROLLO DE TAREAS CLASE 9 =====
// ==============================================================================

// 0. Le agregamos IDs a la lista de productos para la gestión del carrito por ID (Difícil 2)
const productosConId = productos.map((p, index) => ({ id: index + 1, ...p }))

// Estado global de la aplicación
let carrito = []
let categoriaSeleccionada = "todas"

// ------------------------------------------------------------------------------
// INTERMEDIA 2: Agrupar por categoría
// ------------------------------------------------------------------------------
const contarPorCategoria = (items) => {
  return items.reduce((acc, p) => ({
    ...acc,
    [p.categoria]: (acc[p.categoria] ?? 0) + 1
  }), {})
}

// Renderizar contadores en el HTML de la barra lateral
const actualizarContadoresCategorias = () => {
  const conteos = contarPorCategoria(productosConId)
  
  // Si tienes un elemento para "todas" o por cada categoría
  Object.keys(conteos).forEach(cat => {
    const elSpan = document.querySelector(`[data-categoria-count="${cat}"]`)
    if (elSpan) {
      elSpan.textContent = ` (${conteos[cat]})`
    }
  })
}

// ------------------------------------------------------------------------------
// DIFÍCIL 1: Tema oscuro persistente (localStorage)
// ------------------------------------------------------------------------------
const initTemaOscuro = () => {
  const btnTema = document.getElementById("btn-tema")
  const temaGuardado = localStorage.getItem("theme")

  // Si ya existía la preferencia en localStorage, la aplicamos
  if (temaGuardado === "dark") {
    document.documentElement.classList.add("dark")
  }

  if (btnTema) {
    btnTema.addEventListener("click", () => {
      // Toggle de la clase dark de Tailwind
      document.documentElement.classList.toggle("dark")
      
      // Guardar el estado actual en localStorage
      const esDark = document.documentElement.classList.contains("dark")
      localStorage.setItem("theme", esDark ? "dark" : "light")
    })
  }
}

// ------------------------------------------------------------------------------
// FÁCIL: Contador en la pestaña
// DIFÍCIL 2: Carrito con cantidades e inmutabilidad
// ------------------------------------------------------------------------------

// Agregar al carrito (Intermedia 2 / Difícil 2)
const agregarAlCarrito = (idProducto) => {
  const prod = productosConId.find(p => p.id === idProducto)
  if (!prod) return

  const existe = carrito.find(item => item.id === idProducto)

  if (existe) {
    // Retorna array nuevo con el elemento copiado e incrementado (inmutable)
    carrito = carrito.map(item =>
      item.id === idProducto
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    )
  } else {
    // Se agrega por primera vez con cantidad 1
    carrito = [...carrito, { ...prod, cantidad: 1 }]
  }

  pintarCarrito()
}

// Cambiar cantidades (+ / -) o Eliminar por ID
const cambiarCantidad = (idProducto, delta) => {
  carrito = carrito
    .map(item => {
      if (item.id === idProducto) {
        const nuevaCantidad = item.cantidad + delta
        return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null
      }
      return item
    })
    .filter(Boolean) // Elimina los que quedaron en null (cantidad 0)

  pintarCarrito()
}

// Eliminar producto directamente por ID
const eliminarDelCarrito = (idProducto) => {
  carrito = carrito.filter(item => item.id !== idProducto)
  pintarCarrito()
}

// Función central para repintar la UI del carrito y la pestaña
const pintarCarrito = () => {
  const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0)
  
  // Tarea Fácil: Actualizar el título de la pestaña del navegador
  document.title = `Carrito (${totalProductos}) - Mi Tienda`

  const contenedorCarrito = document.getElementById("lista-carrito")
  if (!contenedorCarrito) return

  contenedorCarrito.innerHTML = ""

  carrito.forEach(item => {
    const li = document.createElement("li")
    li.className = "flex justify-between items-center py-2 border-b"
    li.innerHTML = `
      <div>
        <p class="font-bold">${item.nombre}</p>
        <p class="text-sm">S/ ${item.precio.toFixed(2)} × ${item.cantidad}</p>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="cambiarCantidad(${item.id}, -1)" class="px-2 bg-gray-200 dark:bg-gray-700 rounded">-</button>
        <span>${item.cantidad}</span>
        <button onclick="cambiarCantidad(${item.id}, 1)" class="px-2 bg-gray-200 dark:bg-gray-700 rounded">+</button>
        <button onclick="eliminarDelCarrito(${item.id})" class="text-red-500 font-bold ml-2">×</button>
      </div>
    `
    contenedorCarrito.appendChild(li)
  })
}

// ------------------------------------------------------------------------------
// INTERMEDIA 1: Filtrar por categoría (Delegación de eventos)
// ------------------------------------------------------------------------------
const pintarCatalogo = (listaProductos) => {
  const contenedorCatalogo = document.getElementById("catalogo")
  if (!contenedorCatalogo) return

  contenedorCatalogo.innerHTML = ""

  listaProductos.forEach(p => {
    const card = document.createElement("div")
    card.className = "p-4 border rounded shadow-sm bg-white dark:bg-gray-800"
    card.innerHTML = `
      <h3 class="font-bold text-lg">${p.nombre}</h3>
      <p class="text-sm text-gray-500">${p.categoria}</p>
      <p class="font-semibold my-2">S/ ${p.precio.toFixed(2)}</p>
      <button 
        onclick="agregarAlCarrito(${p.id})"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${p.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
        ${p.stock === 0 ? 'disabled' : ''}
      >
        ${p.stock > 0 ? 'Agregar' : 'Agotado'}
      </button>
    `
    contenedorCatalogo.appendChild(card)
  })
}

const initFiltroCategorias = () => {
  const ulCategorias = document.getElementById("lista-categorias")
  if (!ulCategorias) return

  // Delegación de eventos en el <ul>
  ulCategorias.addEventListener("click", (e) => {
    const enlace = e.target.closest("[data-categoria]")
    if (!enlace) return

    e.preventDefault()
    categoriaSeleccionada = enlace.dataset.categoria

    const filtrados = categoriaSeleccionada === "todas"
      ? productosConId
      : productosConId.filter(p => p.categoria === categoriaSeleccionada)

    pintarCatalogo(filtrados)
  })
}

// ------------------------------------------------------------------------------
// Inicialización al cargar el documento
// ------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initTemaOscuro()
  pintarCatalogo(productosConId)
  pintarCarrito()
  initFiltroCategorias()
  actualizarContadoresCategorias()
})
