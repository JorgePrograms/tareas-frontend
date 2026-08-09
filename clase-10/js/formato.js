const formatearPrecio = (precio) => `S/ ${precio.toFixed(2)}`
export default formatearPrecio


// formato.js

export function formatearMoneda(monto) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2
  }).format(monto || 0);
}