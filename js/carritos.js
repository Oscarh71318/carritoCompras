// Variables globales
let btnProduct = document.querySelectorAll(".btn-product");
let contadorCarrito = document.querySelector(".contar-pro");
let listaCarrito = document.querySelector(".list-cart tbody");

// Cargar productos del carrito desde localStorage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarProductosLocalStorage();
});

// Evento para agregar productos al carrito
btnProduct.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        agregarProductoAlCarrito(i);
    });
});

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(pos) {
    // Obtener información del producto
    let producto = btnProduct[pos].parentElement.parentElement.parentElement;
    let infoProducto = {
        nombre: producto.querySelector("h3").textContent,
        imagen: producto.querySelector("img").src,
        precio: producto.querySelector("h5").textContent,
        cantidad: 1 // Establecer la cantidad inicial a 1
    };

    // Agregar el producto al carrito y guardar en localStorage
    agregarProducto(infoProducto);
    guardarProductoEnLocalStorage(infoProducto);

    // Actualizar el contador
    actualizarContadorCarrito();
}

// Función para agregar un producto a la lista del carrito
function agregarProducto(producto) {
    let fila = document.createElement("tr");
    fila.innerHTML = `
        <td> ${producto.nombre} </td>
        <td> <img src="${producto.imagen}" width="70px"> </td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>
            <span onclick="borrarProducto(event, '${producto.nombre}')" class="btn btn-danger"> ✖️ </span>
        </td>
    `;
    listaCarrito.appendChild(fila);
}

// Función para guardar el producto en localStorage
function guardarProductoEnLocalStorage(producto) {
    let productos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    productos.push(producto);
    localStorage.setItem("pro-carrito", JSON.stringify(productos));
}

// Función para eliminar un producto del carrito
function borrarProducto(event, nombreProducto) {
    let productos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    let productosFiltrados = productos.filter(producto => producto.nombre !== nombreProducto);

    // Actualizar localStorage después de eliminar
    localStorage.setItem("pro-carrito", JSON.stringify(productosFiltrados));

    // Eliminar el producto del DOM
    event.target.closest("tr").remove();

    // Actualizar el contador de productos
    actualizarContadorCarrito();
}

// Función para cargar productos desde localStorage
function cargarProductosLocalStorage() {
    let productos = JSON.parse(localStorage.getItem("pro-carrito")) || [];

    productos.forEach(producto => {
        agregarProducto(producto);
    });

    // Actualizar el contador de productos
    actualizarContadorCarrito();
}

// Función para actualizar el contador de productos en el carrito
function actualizarContadorCarrito() {
    let productos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    let contador = productos.length;
    contadorCarrito.textContent = contador;
}

// Mostrar/ocultar el carrito
contadorCarrito.parentElement.addEventListener("click", () => {
    listaCarrito.parentElement.classList.toggle("ocultar");
});
