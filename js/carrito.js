let productosEnCarrito = localStorage.getItem("productos-en-carrito")
productosEnCarrito = JSON.parse(productosEnCarrito)

const carritoVacio = document.querySelector("#carrito-vacio")
const carritoAcciones = document.querySelector("#carrito-acciones")
const contenedorProductos = document.querySelector("#carrito-productos")
const carritoComprado = document.querySelector("#carrito-comprado")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const total = document.querySelector("#total")
const btnComprar = document.querySelector(".carrito-acciones-comprar");







function cargarProductosCarrito(){
    document.querySelector("#contenedor-carrito").classList.remove("disabled")
    if (productosEnCarrito && productosEnCarrito.length > 0) //si la variable contiene algo hara lo siguiente
  {
    carritoVacio.classList.add("disabled")
    contenedorProductos.classList.remove("disabled")
    carritoAcciones.classList.remove("disabled")
    
    contenedorProductos.innerHTML ="";
    
    

   
    productosEnCarrito.forEach(producto =>{

        const div = document.createElement("div");
        
        div.classList.add("carrito-producto");
        div.innerHTML = 
        `
        <img class="carrito-imagen" src=".${producto.imagen}" alt="">
        <div class="carrito-producto-titulo">
            <small>Titulo</small>
            <h3>${producto.titulo}</h3>

        </div>
        <div class="carrito-producto-cantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
            <small>Precio</small>
            <p>$${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
            <small>Sub total</small>
            <p>$${producto.precio*producto.cantidad}</p>
        </div>
        <button class="carrito-producto-eliminar" id="${producto.id}">Eliminar</button

        
        `

        contenedorProductos.append(div);
        
    })

   }else{ //sino contiene nada hara esto

    carritoVacio.classList.remove("disabled")
    contenedorProductos.classList.add("disabled")
    carritoVacio.classList.add("enabled")
    
  }
  actualizarBotonesEliminar()
  actualizarTotal()
}


cargarProductosCarrito()

function actualizarBotonesEliminar() {
    
   
    const btnEliminar = document.querySelectorAll(".carrito-producto-eliminar")

    

    btnEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminadorDeCarrito);
    });
}

function eliminadorDeCarrito(e){
    const idBoton = e.currentTarget.id;
    /*const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    console.log(index) */
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
   
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    
  
}




/*numero carrito*/

const numeroCarrito = document.querySelector("#numero-carrito")





/****************/




/*vaciar carrito*/

vaciarCarrito.addEventListener("click", () =>{
    localStorage.clear();
    carritoVacio.classList.remove("disabled")
    contenedorProductos.classList.add("disabled")
    total.innerHTML = "0"
    
    

})

/****************/

function actualizarTotal(){
    total.innerText = productosEnCarrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad),0)
}


btnComprar.addEventListener("click", ()=>{
     
    let totalF = productosEnCarrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad),0)
    let totalIva = parseInt(totalF*1.19)
    
    if(totalF>0)
    {
        Swal.fire({
            title: 'Total $'+totalIva,
            text: "Subtotal :"+totalF + " + IVA (19%)",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Pagar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Pagado!',
                'Muchas gracias por su compra!',
                'success'
                
              )
              localStorage.clear();
              document.querySelector("#contenedor-carrito").classList.add("disabled")

            }
            
          })

    }
    else
    {
        Swal.fire('Tu carrito esta vacio')


    }
    
})