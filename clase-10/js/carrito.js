export const IGV = 0.18

export const resumenCarrito = (items) => {
  const cantidad = items.length
  const subtotal = items.reduce((suma, p) => suma + p.precio, 0)
  const total = subtotal * (1 + IGV)
  return { cantidad, subtotal, total }
}

export const conDescuento = (precio, porcentaje = 10) => precio * (1 - porcentaje / 100)

export const masCaroDe = (items) =>
  items.reduce((mayor, p) => (p.precio > mayor.precio ? p : mayor), items[0])



// ==========================================
// AGREGADOS PARA COMPLETAR LAS TAREAS
// ==========================================

let carrito = [];

export function obtenerCarrito() {
  return [...carrito];
}

/**
 * Tarea Difícil 2: Lógica inmutable con propiedad 'cantidad'
 */
export function agregarAlCarrito(producto) {
  const existe = carrito.find(item => item.id === producto.id);

  if (existe) {
    carrito = carrito.map(item =>
      item.id === producto.id
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    );
  } else {
    carrito = [...carrito, { ...producto, cantidad: 1 }];
  }
}

export function actualizarCantidad(idProducto, cambio) {
  carrito = carrito
    .map(item =>
      item.id === idProducto
        ? { ...item, cantidad: item.cantidad + cambio }
        : item
    )
    .filter(item => item.cantidad > 0);
}

export function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter(item => item.id !== idProducto);
}

/**
 * Tarea Fácil: Retorna el total acumulado de unidades físicas
 */
export function obtenerTotalUnidades() {
  return carrito.reduce((acc, item) => acc + item.cantidad, 0);
}