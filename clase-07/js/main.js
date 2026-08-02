const productos = [
    {
        nombre: "Mackbook pro 14",
        precio : 1999.99 ,
        categoria : "laptops",
        stock : 5
    } , 
    {
        nombre : "Iphone 13 pro",
        precio : 1099.99 , 
        categoria : "smartphones",
        stock : 8
    }, 
    {
        nombre : "Ipad mini",
        precio : 499.99, 
        categoria : "tablets",
        stock : 0
    },
    {
        nombre : "Airpods Max",
        precio: 549.99, 
        categoria : "audio",
        stock : 3
    }
];
productos.push({
    nombre: "Apple Watch",
    precio: 399.99,
    categoria : "audio",
    stock : 6
});
// impriman el tercer producto solo su nombre
console.log(productos[2].nombre);
// ver cuantos productos hay 
console.log(productos.length);

console.log("USO DE MAP \n");
const nombres = productos.map(producto => producto.nombre);
const conIGV = productos.map(producto => producto.precio * 1.18);
console.log(nombres);
console.log(conIGV);

const caros = productos.filter( producto => producto.precio > 1000);
const stock = productos.filter(producto => producto.stock > 0);
const productoFiltrado = productos.filter(producto => producto.stock > 4).map(producto => producto.nombre);
console.table(caros);
console.table(stock);
console.log(productoFiltrado);

const total = productos.reduce((suma, producto) => suma + producto.precio, 0);
console.log("Total : " + total);

const enOferta = productos
                    .filter(producto => producto.precio < 600)
                    .map(producto => producto.nombre);

const inventarioPrecio = productos
                    .reduce((suma, producto) => suma + producto.precio * producto.stock,0);

console.log(enOferta);
console.log(inventarioPrecio);