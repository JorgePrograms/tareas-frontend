import type { Cupon } from "./tipos";

// 1. Función pura para aplicar cupones con narrowing exhaustivo
export function aplicarCupon(total: number, cupon: Cupon): number {
  // Comprobar si está vencido
  if (cupon.expira && new Date(cupon.expira) < new Date()) {
    return total;
  }

  let nuevoTotal = total;

  switch (cupon.tipo) {
    case "porcentaje":
      nuevoTotal = total * (1 - cupon.valor / 100);
      break;
    case "monto":
      nuevoTotal = total - cupon.valor;
      break;
    default: {
      // Control de exhaustividad: exige que todos los casos de TipoCupon estén cubiertos
      const _exhaustivo: never = cupon.tipo;
      return _exhaustivo;
    }
  }

  // Garantiza que el total no sea negativo
  return Math.max(0, nuevoTotal);
}

// 2. Aduana con tipo 'unknown' para validar datos crudos de cupones
export function leerCupon(crudo: unknown): Cupon | null {
  if (typeof crudo !== "object" || crudo === null) return null;

  const c = crudo as Record<string, unknown>;

  if (typeof c.codigo !== "string") return null;
  if (c.tipo !== "porcentaje" && c.tipo !== "monto") return null;
  if (typeof c.valor !== "number") return null;
  if (c.expira !== undefined && typeof c.expira !== "string") return null;

  return {
    codigo: c.codigo,
    tipo: c.tipo,
    valor: c.valor,
    expira: c.expira,
  };
}