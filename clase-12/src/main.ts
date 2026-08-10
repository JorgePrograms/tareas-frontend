// main.js — orquesta: pide los datos, escucha los eventos y manda a pintar.
//
// ===== PUNTO DE PARTIDA DE LA CLASE 12 (TypeScript) =====
// Es exactamente donde se cortó la Clase 11: al terminar el Ejercicio 4 (3:25).
//
// Lo que YA funciona:
//   · los 38 productos, pedidos en paralelo con Promise.all
//   · el plan B con su aviso honesto de "datos guardados"
//   · el filtro por categoría y el buscador, combinados por ESTADO DERIVADO
//   · el estado vacío de la búsqueda, con el término escapado
//   · el carrito con cantidades, tope de stock y persistencia
//
// Lo que quedó SIN dictar y se hace en la Clase 12:
//   Bloque 1 → document.title y el botón de confirmar con `some`  (en JavaScript)
//   Bloque 7 → el CHECKOUT completo                              (ya en TypeScript)
//
// La forma del archivo, que no cambia: los datos arriba, las funciones que pintan
// en el medio, los eventos abajo. Un evento nunca toca la pantalla: cambia un dato
// y manda a pintar.
import { Producto, ItemCarrito, EstadoCarga, Pedido } from "./tipos";
import { resumenCarrito, agregarItem, cambiarCantidad, quitarItem, contarPorCategoria } from "./carrito";
import formatearPrecio from "./formato";
import { tarjetaProducto, filaCarrito, aviso, escaparTexto, filaPedido } from "./ui";
import { obtenerProductos, obtenerProductoPorId } from "./api";

// ---------- Referencias a la pantalla ----------
const contenedor = document.querySelector(".productos") as HTMLElement;
const cajaResumen = document.querySelector("#resumen-carrito") as HTMLElement;
const listaCarrito = document.querySelector("#lista-carrito") as HTMLElement;
const totalCarrito = document.querySelector("#total-carrito") as HTMLElement;
const listaCategorias = document.querySelector("#categorias") as HTMLElement;
const tituloCatalogo = document.querySelector("#titulo-catalogo") as HTMLElement;
const buscador = document.querySelector("#buscador") as HTMLInputElement;
const avisoRespaldo = document.querySelector("#aviso-respaldo") as HTMLElement;
const contenedorPedidos = document.querySelector("#lista-pedidos") as HTMLElement;

// ---------- Los datos ----------
const CLAVE_CARRITO = "techcart_carrito";
const CLAVE_PEDIDOS = "techcart_pedidos";

let productos: Producto[] = [];          // TODOS los productos, tal como llegaron. No se toca.
let categoriaActiva = "todas";  // qué categoría eligió el usuario
let etiquetaActiva = "productos";// cómo se llama esa categoría en la pantalla
let termino = "";            // qué escribió en el buscador
let estado: EstadoCarga = "cargando";

// --- Tarea 2: Exhaustiveness Checking ---
function assertNever(x: never): never {
  throw new Error(`Estado no contemplado: ${JSON.stringify(x)}`);
}

const pintarEstado = (): void => {
  switch (estado) {
    case "cargando":
      contenedor.innerHTML = aviso("Cargando productos...");
      break;
    case "vacio":
      contenedor.innerHTML = aviso("No hay productos disponibles.");
      break;
    case "error":
      contenedor.innerHTML = aviso("Ocurrió un error al cargar el catálogo.");
      break;
    case "exito":
      pintarCatalogo();
      break;
    default:
      assertNever(estado);
  }
};



const guardarCarrito = (items: ItemCarrito[]): void => {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
  } catch (error) {
    console.warn("No se pudo guardar el carrito", error);
  }
};

const cargarCarrito = (): ItemCarrito[] => {
  try {
    const crudo = localStorage.getItem(CLAVE_CARRITO);
    const items = crudo ? JSON.parse(crudo) : [];
    return items.map((item: ItemCarrito) => ({ ...item, cantidad: item.cantidad ?? 1 }));
  } catch {
    return [];
  }
};

let carrito: ItemCarrito[] = cargarCarrito();

// --- Tarea 5: Aduana para Mis Pedidos (`unknown` + Type Guard) ---
function esPedido(obj: unknown): obj is Pedido {
  if (typeof obj !== "object" || obj === null) return false;
  const p = obj as Record<string, unknown>;
  return (
    typeof p.id === "number" &&
    typeof p.fecha === "string" &&
    typeof p.cliente === "string" &&
    Array.isArray(p.items) &&
    typeof p.total === "number"
  );
}

const cargarPedidos = (): Pedido[] => {
  try {
    const crudo: unknown = JSON.parse(localStorage.getItem(CLAVE_PEDIDOS) ?? "[]");
    if (!Array.isArray(crudo)) return [];
    return crudo.filter(esPedido);
  } catch {
    return [];
  }
};

const pintarPedidos = (): void => {
  if (!contenedorPedidos) return;
  const pedidos = cargarPedidos();
  if (pedidos.length === 0) {
    contenedorPedidos.innerHTML = "<p class='text-texto-suave'>No hay pedidos registrados.</p>";
    return;
  }
  contenedorPedidos.innerHTML = pedidos.map(filaPedido).join("");
};

// --- Tarea 3: Actualizar categorías con contador ---
const actualizarContadoresCategorias = (): void => {
  const conteo = contarPorCategoria(productos);
  listaCategorias.querySelectorAll("a[data-categoria]").forEach((enlace) => {
    if (enlace instanceof HTMLAnchorElement) {
      const cat = enlace.dataset.categoria;
      if (cat && cat !== "todas") {
        const total = conteo[cat] ?? 0;
        const nombreLimpio = cat.charAt(0).toUpperCase() + cat.slice(1);
        enlace.textContent = `${nombreLimpio} (${total})`;
      }
    }
  });
};

// ---------- ESTADO DERIVADO ----------
// Lo que se VE no es un dato guardado: se CALCULA a partir de los tres de arriba.
// Los dos filtros se combinan solos porque este es el ÚNICO lugar que decide qué se ve.
const productosVisibles = (): Producto[] => {
  const porCategoria = categoriaActiva === "todas"
    ? productos
    : productos.filter((p) => p.categoria === categoriaActiva);

  const buscado = termino.trim().toLowerCase();
  if (buscado === "") return porCategoria;

  return porCategoria.filter(
    (p) => p.nombre.toLowerCase().includes(buscado) || p.marca.toLowerCase().includes(buscado)
  );
};

// ---------- Las funciones que pintan ----------
const pintarCatalogo = (): void => {
  const visibles = productosVisibles()

  if (visibles.length === 0) {
    // El término va ESCAPADO: es texto del usuario dentro de innerHTML.
    contenedor.innerHTML = aviso(`No encontramos nada para "${escaparTexto(termino)}".`)
    return
  }

  contenedor.innerHTML = visibles.map(tarjetaProducto).join("")
}



const pintarTituloCatalogo = () => {
  tituloCatalogo.textContent = categoriaActiva === "todas"
    ? "Catálogo de productos"
    : `Catálogo · ${etiquetaActiva}`
}

// Recorro los CINCO enlaces y a cada uno le pregunto "¿sos vos el activo?".
// Hay un dato, y la pantalla lo refleja entero.
const marcarCategoriaActiva = () => {
  listaCategorias.querySelectorAll("a[data-categoria]").forEach((enlace) => {
    
    if (enlace instanceof HTMLElement) {
      enlace.classList.toggle("font-bold", enlace.dataset.categoria === categoriaActiva)
    }
  })
}
// Todo lo que MUESTRA el carrito vive acá.
// ⚠️ Clase 12, Bloque 1: acá abajo van document.title y el botón de confirmar.
const pintarCarrito = (): void => {
  const { cantidad, subtotal, total } = resumenCarrito(carrito)

  cajaResumen.textContent = `🛒 ${cantidad} productos · ${formatearPrecio(total)}`

  listaCarrito.innerHTML = carrito.map(filaCarrito).join("")

  totalCarrito.textContent = cantidad === 0
    ? "Tu carrito está vacío."
    : `Subtotal: ${formatearPrecio(subtotal)} · IGV incluido · Total: ${formatearPrecio(total)}`
}

// ---------- Los eventos ----------
// DELEGACIÓN: el listener vive en el contenedor, que nunca se reemplaza.
// Por eso el filtro puede repintar el catálogo entero sin matar los botones.
// --- Tarea 1 y 4: Handlers con EventTarget e HTML Narrowing ---
contenedor.addEventListener("click", async (evento: MouseEvent) => {
  const target = evento.target;
  if (!(target instanceof HTMLElement)) return;

  const botonAgregar = target.closest("button[data-accion='agregar']");
  if (botonAgregar instanceof HTMLButtonElement) {
    evento.stopPropagation();
    const id = Number(botonAgregar.dataset.id);
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;
    carrito = agregarItem(carrito, producto);
    guardarCarrito(carrito);
    pintarCarrito();
    return;
  }

// Tarea 4: Mostrar detalle al hacer clic en la tarjeta
  const tarjeta = target.closest("article[data-accion='ver-detalle']");
  if (tarjeta instanceof HTMLElement) {
    const id = Number(tarjeta.dataset.id);
    try {
      const p = await obtenerProductoPorId(id);
      
      // Narrowing seguro de la descripción opcional
      const descripcionHTML = p.descripcion 
        ? `<p class="mt-2 text-sm text-gray-600">${escaparTexto(p.descripcion)}</p>`
        : `<p class="mt-2 text-sm italic text-gray-400">Sin descripción disponible.</p>`;

      alert(`Detalle de ${p.nombre}:\nMarca: ${p.marca}\nValoración: ⭐ ${p.valoracion}\nStock: ${p.stock}\n\nDescripción:\n${p.descripcion ?? "Sin descripción"}`);
    } catch (err) {
      console.error(err);
    }
  }
});

// Un solo listener para los tres botones del carrito.
listaCarrito.addEventListener("click", (evento: MouseEvent) => {
  if (!(evento.target instanceof HTMLElement)) return;
  const boton = evento.target.closest("button[data-accion]");
  if (!(boton instanceof HTMLButtonElement)) return;

  const id = Number(boton.dataset.id);
  const accion = boton.dataset.accion;

  if (accion === "mas") carrito = cambiarCantidad(carrito, id, 1);
  if (accion === "menos") carrito = cambiarCantidad(carrito, id, -1);
  if (accion === "quitar") carrito = quitarItem(carrito, id);

  guardarCarrito(carrito);
  pintarCarrito();
});

listaCategorias.addEventListener("click", (evento: MouseEvent) => {
  if (!(evento.target instanceof HTMLElement)) return;
  const enlace = evento.target.closest("a[data-categoria]");
  if (!(enlace instanceof HTMLAnchorElement)) return;

  evento.preventDefault();
  categoriaActiva = enlace.dataset.categoria ?? "todas";
  etiquetaActiva = enlace.textContent ?? "";
  
  tituloCatalogo.textContent = categoriaActiva === "todas" ? "Catálogo de productos" : `Catálogo · ${etiquetaActiva}`;
  pintarCatalogo();
})

// El evento input se dispara con CADA tecla (y al pegar, y al dictar por voz).
buscador.addEventListener("input", (evento: Event) => {
  if (evento.target instanceof HTMLInputElement) {
    termino = evento.target.value;
    pintarCatalogo();
  }
});

// ---------- El arranque, con los tres estados ----------
const arrancar = async (): Promise<void> => {
  estado = "cargando";
  pintarEstado();

  try {
    const { productos: recibidos, esRespaldo } = await obtenerProductos();
    productos = recibidos;
    avisoRespaldo.hidden = !esRespaldo;

    if (productos.length === 0) {
      estado = "vacio";
    } else {
      estado = "exito";
      actualizarContadoresCategorias();
    }
  } catch (error) {
    estado = "error";
  }

  pintarEstado();
  pintarCarrito();
  pintarPedidos();
};

arrancar()
marcarCategoriaActiva()
pintarTituloCatalogo()
pintarCarrito()   // el carrito no depende de la API: se pinta de una
