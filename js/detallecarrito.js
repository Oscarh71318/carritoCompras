// Variables globales
let tablaCarrito = document.querySelector(".cart-table tbody");
let resumenSubtotal = document.querySelector(".sub-total");
let resumenTotal = document.querySelector("#total");  // Asignado al total en checkout.html

// Agregar un evento al navegador
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});

// Función cargar productos guardados en localStorage
function cargarProductos() {
    let todosproductos = [];
    let productosprevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosprevios != null) {
        todosproductos = Object.values(productosprevios);
    }

    // Limpiar la tabla
    tablaCarrito.innerHTML = "";

    // Cargar la tabla si hay productos
    if (todosproductos.length != 0) {
        todosproductos.forEach((producto, i) => {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="d-flex justify-content-evenly align-items-center">
                    <span onclick="borrarProducto(${i})" class="btn btn-danger"> ✖️ </span>
                    <img src="${producto.imagen}" width="70px">
                    ${producto.nombre}  
                </td>
                <td> 
                    $<span>${producto.precio}</span>
                </td>
                <td>  
                    <div class="quantity quantity-wrap">
                        <div class="decrement" onclick="actualizarCantidad(${i}, -1)">
                            <i class="fa-solid fa-minus"></i>
                        </div>
                        <input class="number" type="text" name="quantity" value="${producto.cantidad || 1}" maxlength="2" size="1" readonly>
                        <div class="increment" onclick="actualizarCantidad(${i}, 1)">
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </td>
                <td> 
                    $${(producto.precio * producto.cantidad).toFixed(3)}
                </td>
            `;
            tablaCarrito.appendChild(fila);
        });
    } else {
        let fila = document.createElement("tr");
        fila.innerHTML = ` 
            <td colspan="4">
                <p class="text-center fs-3">No hay productos en el carrito</p>
            </td>
        `;
        tablaCarrito.appendChild(fila);
    }

    // Ejecutar el resumen de compra
    resumenCompra();
}

// Función para actualizar cantidades del producto
function actualizarCantidad(pos, cambio) {
    let todosproductos = [];
    let productosprevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosprevios != null) {
        todosproductos = Object.values(productosprevios);
    }

    if (todosproductos[pos]) {
        // Actualizar cantidad
        todosproductos[pos].cantidad = (todosproductos[pos].cantidad || 1) + cambio;

        // Asegurar que la cantidad no sea menor a 1
        if (todosproductos[pos].cantidad < 1) {
            todosproductos[pos].cantidad = 1;
        }

        // Actualizar en el localStorage
        localStorage.setItem("pro-carrito", JSON.stringify(todosproductos));

        // Recargar la tabla
        cargarProductos();
    }
}

// Función para borrar productos del carrito
function borrarProducto(pos) {
    let todosproductos = [];
    let productosprevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosprevios != null) {
        todosproductos = Object.values(productosprevios);
    }

    todosproductos.splice(pos, 1);

    // Actualizar en el localStorage
    localStorage.setItem("pro-carrito", JSON.stringify(todosproductos));

    // Recargar tabla
    cargarProductos();
}

// Función para el resumen de la compra
function resumenCompra() {
    let todosproductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    let subtotal = 0; // Acumular el subtotal de la compra

    // Recorrer cada producto y acumular en el subtotal
    todosproductos.forEach((producto) => {
        subtotal += producto.precio * producto.cantidad;
    });

    // Calcular el descuento del 10% si la compra supera 100,000
    let descuento = 0;
    if (subtotal >= 100000) {
        descuento = subtotal * 0.10; // 10% de descuento
    }

    // Calcular el total final
    let totalConDescuento = subtotal - descuento;

    // Mostrar los cálculos de resumen de compra
    // Aquí se muestran los valores de subtotal, descuento y total con descuento
    resumenSubtotal.textContent = `Subtotal: $${subtotal.toFixed(3)}`;
    resumenTotal.textContent = `Total: $${totalConDescuento.toFixed(3)}`;
    
    // Si hay un descuento, mostrarlo también
    if (descuento > 0) {
        resumenSubtotal.textContent += ` (Descuento: -$${descuento.toFixed(3)})`;
    }
}
