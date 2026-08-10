// Contrato principal de la aplicación
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
  imagen: string;
  marca: string;
  valoracion: number;
  descripcion?: string; // Tarea 4: opcional desde la API
}

export type ItemCarrito = Producto & { cantidad: number };

// Aduana 1: Lo que viene de la API de DummyJSON
export interface ProductoAPI {
  id: number;
  title: string;
  price: number;
  category: string;
  stock?: number;
  thumbnail: string;
  brand?: string;
  rating?: number;
  description?: string;
}

// Tarea 2: Tipado de estados de carga
export type EstadoCarga = "cargando" | "exito" | "vacio" | "error";

// Tarea 5: Contrato para los pedidos guardados
export interface Pedido {
  id: number;
  fecha: string;
  cliente: string;
  items: ItemCarrito[];
  cantidad: number;
  total: number;
}