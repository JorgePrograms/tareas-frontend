// carrito.js — el archivo que PIENSA. No sabe que existe una pantalla.
//
// Estado al terminar la Clase 11 (Bloque 6): un ítem del carrito ya no es un
// producto, es un producto CON una cantidad. Todas las funciones son puras:
// reciben la lista, devuelven una lista NUEVA y nunca mutan la que recibieron.
//
// Lo que se le hace EN LA CLASE 12:
//   Bloque 5 → `items: ItemCarrito[]`, `producto: Producto`, y el tipo de retorno.
//              Ahí se ve que `ItemCarrito = Producto & { cantidad: number }`.
export const IGV = 0.18

// Devuelve un carrito NUEVO con el producto agregado. Nunca modifica el que recibe.
// Con el tope de stock del Ejercicio 4 de la Clase 11.
export const agregarItem = (items, producto) => {
  const existente = items.find(item => item.id === producto.id)

  // Caso 1: no estaba. Entra como copia del producto, con cantidad 1.
  if (!existente) return [...items, { ...producto, cantidad: 1 }]

  // Caso 2: ya está en el tope de stock. Devuelvo la MISMA lista: no pasó nada.
  if (existente.cantidad >= producto.stock) return items

  // Caso 3: ya estaba. La misma lista pero con ESE item copiado y su cantidad + 1.
  // Este map con ternario es EL patrón de la inmutabilidad.
  return items.map(item =>
    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
  )
}

// Sube o baja la cantidad de UN item. Si llega a 0, el item sale del carrito:
// bajar a cero ES quitar, así que la regla vive en un solo lugar.
export const cambiarCantidad = (items, id, paso) =>
  items
    .map(item => {
      if (item.id !== id) return item
      if (paso > 0 && item.cantidad >= item.stock) return item    // tope de stock
      return { ...item, cantidad: item.cantidad + paso }
    })
    .filter(item => item.cantidad > 0)

// Volvió a quitarse por id: ahora cada id aparece UNA sola vez en el carrito.
export const quitarItem = (items, id) => items.filter(item => item.id !== id)

// `cantidad` cuenta UNIDADES (no filas), y el subtotal multiplica por la cantidad.
export const resumenCarrito = (items) => {
  const cantidad = items.reduce((suma, item) => suma + item.cantidad, 0)
  const subtotal = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
  const total = subtotal * (1 + IGV)
  return { cantidad, subtotal, total }
}

// De la Clase 8, todavía sin usar en la pantalla.
export const conDescuento = (precio, porcentaje = 10) => precio * (1 - porcentaje / 100)

export const masCaroDe = (items) =>
  items.reduce((mayor, p) => (p.precio > mayor.precio ? p : mayor), items[0])
