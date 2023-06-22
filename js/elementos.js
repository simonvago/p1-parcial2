'use strict';

/* Clase de un producto */

class producto {
    #nombreproducto;
    #img;
    #altimg;
    #id;
    #categoria;
    #precio;
    #descripcionproducto;
    cantidad;

    constructor(nombre, imagen, altImagen, id, categoria, precio, descripcion, cantidad) {
        this.#nombreproducto = nombre;
        this.#img = imagen;
        this.#altimg = altImagen;
        this.#id = id;
        this.#categoria = categoria;
        this.#precio = precio;
        this.#descripcionproducto = descripcion;
        this.cantidad = cantidad;
    }

    getNombre () {
        return this.#nombreproducto;
    }

    getImagen () {
        return this.#img;
    }
    
    getAltImagen () {
        return this.#altimg;
    }

    getId () {
        return this.#id;
    }

    getCategoria () {
        return this.#categoria;
    }

    getPrecio () {
        return this.#precio;
    }

    getDescripcion () {
        return this.#descripcionproducto;
    }

    aMostrar() {
        let articulo = document.createElement("article");
            articulo.classList.add("card");
            /*con .dataset creo el atributo data-id en la card, para que tome el id del producto y se lo asigne a la card. De esta forma puedo identificar el producto al momento de agregarlo al carrito*/ 
            articulo.dataset.id = this.#id; 
            let h3Nombre = document.createElement("h3");
            h3Nombre.innerText = `${this.#nombreproducto}`;
            let imgImagen = document.createElement("img");
                imgImagen.setAttribute("src", this.#img);
                imgImagen.setAttribute("alt", this.#altimg);
            let pId = document.createElement("p");
                pId.innerText = `Codigo: ${this.#id}`;
            let pCategoria = document.createElement("p");
                pCategoria.innerText = `Categoria: ${this.#categoria}`;
            let pPrecio = document.createElement("p");
                pPrecio.innerText = `Precio: $ ${(this.#precio).toLocaleString()}.-`;
            let pDescripcion = document.createElement("p");
                pDescripcion.classList.add("pDescripcionCard");
                pDescripcion.innerText = `Descripcion: ${this.#descripcionproducto}`;

            // Botón agregar

            let buttonAgregarCarrito = document.createElement ("button");
                buttonAgregarCarrito.innerText = `Agregar`;
                buttonAgregarCarrito.classList.add("btn-agregarCarrito");
                buttonAgregarCarrito.addEventListener('click', (e) => {
                    const button = e.target; 
                    const articleProducto = button.parentNode; 
                    const productoId = articleProducto.dataset.id;
                    for (let producto of Catalogo){
                        if (producto.#id == productoId){
                            agregarAlCarrito(producto);
                            break;
                        }
                    }
                });

            // Botón ver más
            let buttonVerMas = document.createElement("button");
                buttonVerMas.innerText = `Mas`;
                buttonVerMas.classList.add("btn-verDetalle");
                buttonVerMas.addEventListener('click', () => {
                    let modalDetalle = document.querySelector("#modalProducto");
                    let modalCarrito = document.querySelector("#modalCarrito");
                    let modalCompra = document.querySelector("#modalCompra");
                    if(modalDetalle){
                        modalDetalle.remove();
                    } 
                    if(modalCarrito){
                        modalCarrito.remove();
                    }
                    if(modalCompra){
                        modalCompra.remove();
                    }
                    // Estructura

                    modalDetalle = document.createElement("div");
                    modalDetalle.classList.add("modalDetalle"); 
                    modalDetalle.setAttribute("id", "modalProducto");
                    modalDetalle.dataset.id = this.#id;
                        let aCerrar = document.createElement("a");
                            aCerrar.setAttribute("href", "javascript:void(0)");
                            aCerrar.innerText = "cerrar";
                            aCerrar.addEventListener('click', () => {
                                let cerrar = document.querySelector("#modalProducto");
                                    cerrar.remove();
                            });
                        modalDetalle.appendChild(aCerrar);
                        let h3Nombre = document.createElement("h3");
                            h3Nombre.innerText = `${this.#nombreproducto}`;
                        // Div info
                        let datosProducto = document.createElement("div");
                            datosProducto.classList.add("datosProducto"); 
                            let imgImagen = document.createElement("img");
                                imgImagen.setAttribute("src", this.#img);
                                imgImagen.setAttribute("alt", this.#altimg);
                            let detalleProducto = document.createElement("div");
                                detalleProducto.classList.add("detalleProducto"); 
                                let pId = document.createElement("p");
                                    pId.innerText = `Codigo: ${this.#id}`;
                                let pCategoria = document.createElement("p");
                                    pCategoria.innerText = `Categoria: ${this.#categoria}`;
                                let pPrecio = document.createElement("p");
                                    pPrecio.innerText = `Precio: $ ${this.#precio.toLocaleString()}.-`;
                                let pDescripcion = document.createElement("p");
                                    pDescripcion.innerText = `${this.#descripcionproducto}`;
                            // Botón agregar
                            let buttonAgregarCarrito = document.createElement ("button");
                                buttonAgregarCarrito.innerText = `Agregar`;
                                buttonAgregarCarrito.classList.add("btn-agregarCarrito");
                                buttonAgregarCarrito.addEventListener('click', () => {
                                    const productoId = this.#id;
                                    for (let producto of aCatalogo){
                                        if (producto.#id == productoId){
                                            agregarAlCarrito(producto);
                                            break;
                                        }
                                    }
                                });
                    detalleProducto.append(pId, pCategoria, pPrecio, pDescripcion, buttonAgregarCarrito);
                    datosProducto.append(imgImagen, detalleProducto);
                    modalDetalle.append(aCerrar, h3Nombre, datosProducto);
                    let sectionProductos = document.querySelector("#contenedorProductos");
                        sectionProductos.parentNode.appendChild(modalDetalle);
                        return sectionProductos;
                });
        articulo.append(h3Nombre, imgImagen, pId, pCategoria, pPrecio, pDescripcion, buttonVerMas, buttonAgregarCarrito);
        return articulo;
    }

    mostrarMiniProducto() {
        let divMiniProducto = document.createElement("div");
            divMiniProducto.dataset.id = this.#id;
            let pNombreMiniProducto = document.createElement("p");
                pNombreMiniProducto.innerText = `${this.#nombreproducto}`;
            let pPrecioMiniProducto = document.createElement("p");
            let precioSubtotalProducto = this.#precio * this.cantidad;
                pPrecioMiniProducto.innerText = `Total: $${precioSubtotalProducto.toLocaleString()}.-`;
            let masMenosProductos = document.createElement("div");
                masMenosProductos.classList.add("masMenosProductos")
            let pCantProducto = document.createElement("p");
                pCantProducto.classList.add("pCantidadProducto");
                pCantProducto.innerText = `${this.cantidad}`;
            // boton agregar 
            let buttonAgregarCarrito = document.createElement ("button");
                buttonAgregarCarrito.innerText = ` + `;
                buttonAgregarCarrito.classList.add("btn-agregarCarrito");
                //evento
                buttonAgregarCarrito.addEventListener('click', () => {
                    const productoId = this.#id;
                    if(productoId == divMiniProducto.dataset.id) {
                        for (let producto of  Carrito){
                            if (producto.#id == productoId){
                                agregarAlCarrito(producto);
                                precioSubtotalProducto += this.#precio;
                                pPrecioMiniProducto.innerText = `Total: $${precioSubtotalProducto.toLocaleString()}.-`;
                                pCantProducto.innerText = `${this.cantidad}`;
                                break;
                            }
                        }
                    }
                });
            // boton eliminar
            let buttonEliminarDelCarrito = document.createElement ("button");
                buttonEliminarDelCarrito.innerText = ` - `;
                buttonEliminarDelCarrito.classList.add("btn-eliminarCarrito");
                buttonEliminarDelCarrito.addEventListener('click', (e) => {
                    let contenedorProducto = e.target.parentNode.parentNode;
                const productoId = this.#id;
                for(let i=0; i< Carrito.length; i++){
                    if( Carrito[i].#id == productoId) {
                        eliminarDelCarrito( Carrito[i], contenedorProducto, i);
                        precioSubtotalProducto -= this.#precio;
                        pPrecioMiniProducto.innerText = `Subtotal: $${precioSubtotalProducto.toLocaleString()}.-`;
                        pCantProducto.innerText = `${this.cantidad}`;
                        break;
                    }
                }
            });
        masMenosProductos.append(buttonAgregarCarrito, pCantProducto, buttonEliminarDelCarrito)
        divMiniProducto.append(pNombreMiniProducto, pPrecioMiniProducto, masMenosProductos);
        return divMiniProducto;
    }
}