// Array de catálogo de productos
const productos = [
  { id: 101, nombre: 'Laptop Pro 15', precio: 3500 },
  { id: 102, nombre: 'Mouse Inalámbrico', precio: 80 },
  { id: 103, nombre: 'Teclado Mecánico', precio: 250 },
  { id: 104, nombre: 'Monitor 27 IPS', precio: 1200 },
  { id: 105, nombre: 'Audífonos Bluetooth', precio: 180 },
  { id: 106, nombre: 'Silla Gamer', precio: 850 }
];

const CLAVE_STORAGE = 'lista_deseos_ids';

// Función para prevenir XSS al renderizar texto
function escaparTexto(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// Carga inicial segura con try/catch contra datos corruptos
function cargarDeseosGuardados() {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    const parsed = guardado ? JSON.parse(guardado) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Error al leer localStorage, reiniciando lista:', error);
    return [];
  }
}

// Guardado seguro con try/catch
function guardarDeseos(deseos) {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(deseos));
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
}

// Estado de la lista (guarda únicamente los IDs)
let listaDeseos = cargarDeseosGuardados();

// Referencias al DOM
const catalogoContenedor = document.getElementById('catalogo');
const contadorDeseos = document.getElementById('contador-deseos');

// Renderiza el catálogo completo
function renderizarCatalogo() {
  catalogoContenedor.innerHTML = productos.map((p) => {
    const esDeseo = listaDeseos.includes(p.id);
    return `
      <article class="tarjeta">
        <h3>${escaparTexto(p.nombre)}</h3>
        <p>Precio: S/ ${p.precio}</p>
        <button class="btn-deseo" data-id="${p.id}" aria-label="Favorito">
          ${esDeseo ? '❤️ En deseos' : '🤍 Agregar a deseos'}
        </button>
      </article>
    `;
  }).join('');

  actualizarContador();
}

function actualizarContador() {
  contadorDeseos.textContent = `Deseos: ${listaDeseos.length}`;
}

// Delegación de eventos: UN SOLO addEventListener para todo el catálogo
catalogoContenedor.addEventListener('click', (e) => {
  const boton = e.target.closest('.btn-deseo');
  if (!boton) return;

  const idProducto = Number(boton.dataset.id);
  const existe = listaDeseos.includes(idProducto);

  if (existe) {
    listaDeseos = listaDeseos.filter((id) => id !== idProducto);
  } else {
    listaDeseos.push(idProducto);
  }

  guardarDeseos(listaDeseos);
  renderizarCatalogo();
});

// Inicialización al cargar la página
renderizarCatalogo();