// datos.js — el PLAN B. Cuando la API no responde, la tienda muestra estos cinco.
//
// La Clase 11 les agregó `marca` y `valoracion` y les corrigió la categoría
// ("audio" → "mobile-accessories"), porque todo dato que entra al proyecto tiene
// que cumplir el MISMO contrato, venga de donde venga.
//
// ⚠️ Deuda consciente: este archivo se mantiene A MANO para que coincida con la
// forma que devuelve el adaptador. Si el adaptador gana un campo, hay que acordarse
// de agregarlo acá — y nadie se acuerda. Eso es exactamente el problema que
// TypeScript viene a resolver hoy.
export const productos = [
  {
    id: 1, nombre: "MacBook Pro 14", precio: 1999.99, categoria: "laptops", stock: 5,
    marca: "Apple", valoracion: 4.5,
    imagen: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
  },
  {
    id: 2, nombre: "iPhone 13 Pro", precio: 1099.99, categoria: "smartphones", stock: 8,
    marca: "Apple", valoracion: 4.7,
    imagen: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp",
  },
  {
    id: 3, nombre: "iPad Mini", precio: 499.99, categoria: "tablets", stock: 0,
    marca: "Apple", valoracion: 4.4,
    imagen: "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/thumbnail.webp",
  },
  {
    id: 4, nombre: "AirPods Max", precio: 549.99, categoria: "mobile-accessories", stock: 3,
    marca: "Apple", valoracion: 4.6,
    imagen: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
  },
  {
    id: 5, nombre: "Apple Watch", precio: 399.99, categoria: "mobile-accessories", stock: 6,
    marca: "Apple", valoracion: 4.3,
  },
]
