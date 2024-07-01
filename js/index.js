// Repuestos
let repuestos = [
    { id: 1, nombre: 'Disco Duro', precio: 200000, descuento: 0 },
    { id: 2, nombre: 'Memoria RAM', precio: 80000, descuento: 0 },
    { id: 3, nombre: 'Tarjeta Gráfica', precio: 500000, descuento: 10 },
    { id: 4, nombre: 'Procesador', precio: 350000, descuento: 15 },
    { id: 5, nombre: 'Fuente de Poder', precio: 120000, descuento: 0 },
    { id: 6, nombre: 'Placa Madre', precio: 150000, descuento: 5 },
    { id: 7, nombre: 'Monitor', precio: 300000, descuento: 0 },
    { id: 8, nombre: 'Teclado', precio: 50000, descuento: 0 },
    { id: 9, nombre: 'Mouse', precio: 45000, descuento: 0 },
    { id: 10, nombre: 'Ventilador', precio: 75000, descuento: 0 }
];

let carrito = [];

// Mostrar productos
function mostrarProductos(productos = repuestos) {
    let productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';

    productos.forEach(repuesto => {
        let productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <h2>${repuesto.nombre}</h2>
            <p>Precio: $${repuesto.precio}</p>
            <p>Descuento: ${repuesto.descuento}%</p>
            <button onclick="agregarAlCarrito(${repuesto.id})">Agregar al Carrito</button>
        `;
        productosDiv.appendChild(productoDiv);
    });
}

// Función para agregar al carrito
function agregarAlCarrito(id) {
    let repuesto = repuestos.find(r => r.id === id);
    carrito.push(repuesto);

    Swal.fire({
        icon: 'success',
        title: '¡Producto agregado!',
        text: `${repuesto.nombre} agregado al carrito.`,
        confirmButtonText: 'Aceptar',
        customClass: {
            popup: 'cssdepopup',
            header: 'cssdelheader',
            title: 'cssdeltitulo',
            content: 'cssdelcontenido',
            confirmButton: 'cssdelboton'
        }
    });
}

// Función para eliminar un producto del carritocon SweetAlert2
function eliminarDelCarrito(id) {
    let index = carrito.findIndex(r => r.id === id);
    if (index !== -1) {
        let [repuesto] = carrito.splice(index, 1);

        Swal.fire({
            icon: 'success',
            title: '¡Producto eliminado!',
            text: `${repuesto.nombre} eliminado del carrito.`,
            confirmButtonText: 'Aceptar',
            customClass: {
                popup: 'cssdepopup',
                header: 'cssdelheader',
                title: 'cssdeltitulo',
                content: 'cssdelcontenido',
                confirmButton: 'cssdelboton'
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No tienes ese producto en el carrito.',
            confirmButtonText: 'Aceptar',
            customClass: {
                popup: 'cssdepopup',
                header: 'cssdelheader',
                title: 'cssdeltitulo',
                content: 'cssdelcontenido',
                confirmButton: 'cssdelboton'
            }
        });
    }
}

// Función para mostrar el carrito y calcular el total
function mostrarCarrito() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'Aún no tienes productos en el carrito.',
            confirmButtonText: 'Aceptar',
            customClass: {
                popup: 'cssdepopup',
                header: 'cssdelheader',
                title: 'cssdeltitulo',
                content: 'cssdelcontenido',
                confirmButton: 'cssdelboton'
            }
        });
        return;
    }

    let total = 0;
    let mensaje = 'Productos en tu carrito:\n';

    carrito.forEach((repuesto, index) => {
        let precioDescuento = repuesto.precio * (1 - repuesto.descuento / 100);
        total += precioDescuento;
        mensaje += `${index + 1}. ${repuesto.nombre} - Precio: $${precioDescuento.toFixed(2)}\n`;
    });

    mensaje += `\nTotal a pagar: $${total.toFixed(2)}\n`;
    mensaje += '\n¿Quieres eliminar algún producto del carrito? Ingresa el número del producto o cancela para mantener tu carrito.\n';

    Swal.fire({
        icon: 'info',
        title: '\nProductos en tu carrito\n',
        text: mensaje,
        input: 'text',
        inputPlaceholder: '\nIngresa el número del producto\n',
        confirmButtonText: 'Aceptar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        customClass: {
            popup: 'cssdepopup',
            header: 'cssdelheader',
            title: 'cssdeltitulo',
            content: 'cssdelcontenido',
            confirmButton: 'cssdelboton'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let numero = parseInt(result.value);
            if (!isNaN(numero) && numero > 0 && numero <= carrito.length) {
                eliminarDelCarrito(carrito[numero - 1].id);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Opción inválida.',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        popup: 'cssdepopup',
                        header: 'cssdelheader',
                        title: 'cssdeltitulo',
                        content: 'cssdelcontenido',
                        confirmButton: 'cssdelboton'
                    }
                });
            }
        }
    });
}

// Función para filtrar productos
function filtrarProductos() {
    let busqueda = document.getElementById('buscar').value.toLowerCase();
    let productosFiltrados = repuestos.filter(repuesto =>
        repuesto.nombre.toLowerCase().includes(busqueda)
    );
    mostrarProductos(productosFiltrados);
}

// Accion!
mostrarProductos();
