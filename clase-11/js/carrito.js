export const IGV = 0.18

export const resumenCarrito = (items) => {
  const cantidad = items.length
  const subtotal = items.reduce((suma, p) => suma + p.precio, 0)
  const total = subtotal * (1 + IGV)
  const envioGratis = subtotal >= 50 // <--- Fácil — Envío gratis desde $50

  return { cantidad, subtotal, total, envioGratis }
}
export const conDescuento = (precio, porcentaje = 10) => precio * (1 - porcentaje / 100)

export const masCaroDe = (items) =>
  items.reduce((mayor, p) => (p.precio > mayor.precio ? p : mayor), items[0])


export const contarPorCategoria = (items) =>
  items.reduce((acc, p) => ({
    ...acc,
    [p.categoria]: (acc[p.categoria] ?? 0) + 1
  }), {})