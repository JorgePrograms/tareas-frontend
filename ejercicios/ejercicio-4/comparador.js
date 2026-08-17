const URL_LAPTOPS = 'https://dummyjson.com/products/category/laptops';
const URL_SMARTPHONES = 'https://dummyjson.com/products/category/smartphones';

const btnComparar = document.getElementById('btn-comparar');
const contenedorResultado = document.getElementById('resultado');

// Formateador de moneda en USD
const formateadorMoneda = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Corrección: Usar prod.price en lugar de prod.precio
function calcularPromedio(productos) {
  if (!productos || productos.length === 0) return 0;
  const suma = productos.reduce((acc, prod) => acc + prod.price, 0);
  return suma / productos.length;
}

// Petición individual con verificación de respuesta OK
async function obtenerCategoria(url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`);
  }
  const datos = await respuesta.json();
  return datos.products;
}

// Función principal de comparación
async function compararCategorias() {
  // Estado 1: Cargando
  contenedorResultado.innerHTML = `<p class="estado-cargando">⏳ Cargando datos de ambas categorías...</p>`;
  btnComparar.disabled = true;

  try {
    // Peticiones en paralelo con Promise.all
    const [laptops, smartphones] = await Promise.all([
      obtenerCategoria(URL_LAPTOPS),
      obtenerCategoria(URL_SMARTPHONES),
    ]);

    // Procesamiento de promedios
    const promLaptops = calcularPromedio(laptops);
    const promSmartphones = calcularPromedio(smartphones);
    const diferencia = Math.abs(promLaptops - promSmartphones);

    const laptopEsMasCara = promLaptops > promSmartphones;
    const categoriaMasCara = laptopEsMasCara ? 'Laptops' : 'Smartphones';

    // Estado 2: Listo
    contenedorResultado.innerHTML = `
      <div class="exito">
        <h3>📊 Resultado de la Comparación</h3>
        <ul>
          <li><strong>Promedio Laptops:</strong> ${formateadorMoneda.format(promLaptops)}</li>
          <li><strong>Promedio Smartphones:</strong> ${formateadorMoneda.format(promSmartphones)}</li>
        </ul>
        <p class="destacado">
          La categoría de <strong>${categoriaMasCara}</strong> es más cara en promedio por 
          <strong>${formateadorMoneda.format(diferencia)}</strong>.
        </p>
      </div>
    `;
  } catch (error) {
    // Estado 3: Error
    console.warn('Falló la consulta de categorías en red:', error);

    contenedorResultado.innerHTML = `
      <div class="error">
        <p>❌ No se pudo realizar la comparación. Revisa tu conexión a internet.</p>
        <button id="btn-reintentar" class="btn">🔄 Reintentar</button>
      </div>
    `;

    document
      .getElementById('btn-reintentar')
      ?.addEventListener('click', compararCategorias);
  } finally {
    btnComparar.disabled = false;
  }
}

btnComparar.addEventListener('click', compararCategorias);