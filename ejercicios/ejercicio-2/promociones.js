// 2. conDescuento: Aplica descuento sin alterar el objeto original usando spread
export const conDescuento = (producto, porcentaje) => {
  const nuevoPrecio = producto.precio * (1 - porcentaje / 100);
  return {
    ...producto,
    precioOriginal: producto.precio,
    precio: nuevoPrecio
  };
};

// 3. resumen: Desestructuración con renombre y valor por defecto en los parámetros
export const resumen = ({
  nombre: nombreProd,
  precio: precioProd,
  marca: marcaProd = 'Genérica'
}) => {
  return `Producto: ${nombreProd}
Marca: ${marcaProd}
Precio: S/ ${precioProd.toFixed(2)}`;
};

// 4. combinar: Parámetro rest + spread para unir N cantidad de arreglos
export const combinar = (...listas) => {
  return listas.reduce((acumulado, lista) => [...acumulado, ...lista], []);
};