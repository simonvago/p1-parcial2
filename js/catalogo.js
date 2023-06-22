'use strict';

/**
 * VAGO SIMÓN
*/

let Catalogo = [];
let Carrito = [];
let precioTotal = 0;
let contadorProductos = 0;

let Section = document.getElementById("contenedorProductos");

fetch("js/lista.json").then(response => response.json()).then(jsonCatalogo => {

    jsonCatalogo.forEach(productoJson => {

    let ProductoNew = new producto(
        productoJson.nombre,
        productoJson.imagen,
        productoJson.altImagen,
        productoJson.id,
        productoJson.categoria,
        productoJson.precio,
        productoJson.descripcion,
    );

    Catalogo.push(ProductoNew);

    }); 

    for (const producto of Catalogo) {
        Section.append(producto.aMostrar());
    } 

});


function agregarAlCarrito(producto){
    let i = document.querySelector("#itemsCarrito");
    let precioFinal = document.querySelector("#totalPagar");
    let itemCarritoModal = document.querySelector("#pCantProductosModal");
    let precioFinalModal = document.querySelector("#pPrecioTotalModal");

    precioTotal += producto.getPrecio();
    if (Carrito.length == 0) {
        producto.cantidad = 1;
        Carrito.push(producto);
    } else {
        let productoExistente = false;
        for (let i = 0; i < Carrito.length; i++) {
            if (Carrito[i].getId() == producto.getId()) {
                Carrito[i].cantidad += 1;
                productoExistente = true;
                break;
            }
        }
        if (!productoExistente) {
            producto.cantidad = 1;
            Carrito.push(producto);
        }
    }

    contadorProductos++;
    if(itemCarritoModal || precioFinalModal != null){
        itemCarritoModal.innerText = "Cantidad : " + contadorProductos;
        precioFinalModal.innerText = "Total: $" + precioTotal.toLocaleString();
    }
    i.innerText = contadorProductos;
    precioFinal.innerText = precioTotal.toLocaleString();
}

function eliminarDelCarrito(producto, contenedorProducto, indice){
    let itemCarrito = document.querySelector("#itemsCarrito");
    let precioFinal = document.querySelector("#totalPagar");
    let itemCarritoModal = document.querySelector("#pCantProductosModal");
    let precioFinalModal = document.querySelector("#pPrecioTotalModal");

    if(producto.cantidad > 1){
        precioTotal -= producto.getPrecio();
        for (let i = 0; i < Carrito.length; i++) {
            if (Carrito[i].getId() == producto.getId()) {
                Carrito[i].cantidad -= 1;
                break;
            }
        }
    } else {
        precioTotal -= producto.getPrecio();
        Carrito.splice(indice, 1);
        contenedorProducto.remove();
    }

    contadorProductos--;
        if(itemCarritoModal || precioFinalModal != null){
            itemCarritoModal.innerText = "Cantidad: " + contadorProductos;
            precioFinalModal.innerText = "Total: $" + precioTotal.toLocaleString();
        }
        itemCarrito.innerText = contadorProductos;
        precioFinal.innerText = precioTotal.toLocaleString();
}

function aCarrito () {
    let modalDetalle = document.querySelector("#modalProducto");
    let modalCarrito = document.querySelector("#modalCarrito");
    if(modalDetalle){
        modalDetalle.remove();
    }
    if (modalCarrito) {
        modalCarrito.remove();
    }

    modalCarrito = document.createElement("div");
    modalCarrito.classList.add("modalCarrito");
    modalCarrito.setAttribute("id", "modalCarrito");
        const aCerrar = document.createElement("a");
        aCerrar.setAttribute("href", "javascript:void(0)");
        aCerrar.innerText = "Cerrar";
        aCerrar.addEventListener('click', () => {
            let cerrar = document.querySelector("#modalCarrito");
            cerrar.remove();
        });
        let h3Carrito = document.createElement("h3");
            h3Carrito.innerText = "Carrito";

        let totalesCarrito = document.createElement("div");
            totalesCarrito.classList.add("totalesCarrito");
            let pPrecioTotal = document.createElement("p");
                pPrecioTotal.setAttribute('id','pPrecioTotalModal');
                pPrecioTotal.innerText = "Total: $" + precioTotal.toLocaleString();
            let pCantProductos = document.createElement("p");
                pCantProductos.setAttribute('id','pCantProductosModal');
                pCantProductos.innerText = "Cantidad de productos: " + contadorProductos;

            let divProductosCarrito = document.createElement("div");
                divProductosCarrito.classList.add("productosCarrito");
                for (const producto of Carrito) {
                        divProductosCarrito.append(producto.mostrarMiniProducto());
                }

        let botonesCarrito = document.createElement("div");
            botonesCarrito.classList.add("botonesCarrito");
            let buttonVaciar = document.createElement("button");
                buttonVaciar.innerText = "Vaciar";
                buttonVaciar.classList.add("btn-vaciarCarrito");
                buttonVaciar.addEventListener('click', () => {
                    Carrito = [];
                    precioTotal = 0;
                    contadorProductos = 0;
                    divProductosCarrito.innerHTML = "";
                    pPrecioTotal.innerText = "Total: $" + precioTotal;
                    pCantProductos.innerText = "Cantidad: " + contadorProductos;

                    let itemCarrito = document.querySelector("#itemsCarrito");
                    let precioFinal = document.querySelector("#totalPagar");
                    precioFinal.innerText = precioTotal;
                    itemCarrito.innerText = contadorProductos;
                });
            let buttonComprar = document.createElement("button");
                buttonComprar.innerText = "Compra";
                buttonComprar.classList.add("btn-compra");
                buttonComprar.addEventListener('click', () => {
                    realizarCompra();
                });
    
    totalesCarrito.append(pPrecioTotal, pCantProductos)
    botonesCarrito.append(buttonComprar, buttonVaciar)
    modalCarrito.append(aCerrar, h3Carrito, divProductosCarrito, totalesCarrito, botonesCarrito);

    const sectionProductos = document.querySelector("#contenedorProductos");
    sectionProductos.parentNode.appendChild(modalCarrito);
    return sectionProductos;
}

function realizarCompra() {
    let modalDetalle = document.querySelector("#modalProducto");
    let modalCarrito = document.querySelector("#modalCarrito");
    if(modalDetalle){
        modalDetalle.remove();
    }
    if (modalCarrito) {
        modalCarrito.remove();
    }

    if(Carrito.length > 0){
    let modalCompra = document.createElement("div");
        modalCompra.classList.add("modalCompra");
        modalCompra.setAttribute("id", "modalCompra");

    let aCerrar = document.createElement("a");
        aCerrar.setAttribute("href", "javascript:void(0)");
        aCerrar.innerText = "cerrar";
        aCerrar.addEventListener('click', () => {
            let cerrar = document.querySelector("#modalCompra");
            cerrar.remove();
        });

    modalCompra.append(aCerrar, pCompra1);
    
    let sectionProductos = document.querySelector("#contenedorProductos");
        sectionProductos.parentNode.appendChild(modalCompra);
    return sectionProductos;
    } else {
        let modalCompra = document.createElement("div");
            modalCompra.classList.add("modalCompra");
            modalCompra.setAttribute("id", "modalCompra");

        let aCerrar = document.createElement("a");
            aCerrar.setAttribute("href", "javascript:void(0)");
            aCerrar.innerText = "cerrar";
            aCerrar.addEventListener('click', () => {
                let cerrar = document.querySelector("#modalCompra");
                cerrar.remove();
            });

        let pCompra = document.createElement("p");
            pCompra.innerText = "Agregue productos nuevos";

        let buttonVolver = document.createElement("Button");
            buttonVolver.classList.add("btnVolver");
            buttonVolver.setAttribute("href", "javascript:void(0)");
            buttonVolver.innerText = "Volver";
            buttonVolver.addEventListener('click', () => {
                let cerrar = document.querySelector("#modalCompra");
                cerrar.remove();
            });

        modalCompra.append(aCerrar, pCompra, buttonVolver);
        let sectionProductos = document.querySelector("#contenedorProductos");
        sectionProductos.parentNode.appendChild(modalCompra);
        return sectionProductos;
    }
}


