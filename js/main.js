
const contenedorProductos = document.querySelector("#contenedor-productos");
const btnCategorias = document.querySelectorAll(".btn-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const numeroCarrito = document.querySelector("#numero-carrito");
const naruto = document.querySelector("#naruto");
const demonSlayer = document.querySelector("#demon-slayer");
const animeSelect = document.querySelector("#anime-select");
let productosEnCarrito = []
let productos = [];
let btnAgregarCarrito

naruto.addEventListener("click", ()=>{

    document.documentElement.style.setProperty('--fondo', 'url("../img/fondo-naruto.jpg")');
    animeSelect.classList.add("disabled")


    fetch('./json/productos-naruto.json')
    .then(response => response.json())
    .then(data => {
      productos = data; // aqui asigno el JSON a la variable "productos"
      setTimeout(()=>{
        cargarProductos(productos)
      },100)
      
    })
    .catch(error => console.error('Error al cargar productos:', error));

})

demonSlayer.addEventListener("click", ()=>{

    document.documentElement.style.setProperty('--fondo', 'url("../img/fondo-ds.png")');
    animeSelect.classList.add("disabled")
    
    fetch('./json/productos-demon-slayer.json')
    .then(response => response.json())
    .then(data => {
      productos = data; // aqui asigno el JSON a la variable "productos"
      setTimeout(()=>{
        cargarProductos(productos)
      },100)
      
    })
    .catch(error => console.error('Error al cargar productos:', error));

})




/***fetch */



/*******/




const productosEnCarritoJson = localStorage.getItem("productos-en-carrito");
if(productosEnCarritoJson)
{
    
    productosEnCarrito = JSON.parse(productosEnCarritoJson);
    actualizarNumeroCarrito()
}else{
    productosEnCarrito = []
}



function cargarProductos(productoSeleccionado)
{
    contenedorProductos.innerHTML ="";

    productoSeleccionado.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML =   `
           <img class="producto-imagen" src="${producto.imagen}" alt=${producto.titulo}>                   <div class="producto-detalles">
           <div class="producto-detalles">
               <h3 class="producto-titulo">${producto.titulo}</h3>
               <p class="producto-precio">${producto.precio}</p>
               <button class="producto-agregar" id ="${producto.id}">Agregar</button>
           </div>
           </div>

        `
        
        contenedorProductos.appendChild(div)
        actualizarBotonesAgregar();


    })

}


btnCategorias.forEach(boton => {
   
    boton.addEventListener("click", (addActiveClass) =>{

        tituloPrincipal.innerText = "";

        btnCategorias.forEach(boton => boton.classList.remove("active"))

        addActiveClass.currentTarget.classList.add("active");
        

        if(addActiveClass.currentTarget.id != "todos")
        {
            
            const productosBoton = productos.filter( producto => producto.categoria.id === addActiveClass.currentTarget.id)
        
            cargarProductos(productosBoton)
            const categoriaSeleccionada = productos.find (producto => producto.categoria.id === addActiveClass.currentTarget.id)
             
            tituloPrincipal.innerText = categoriaSeleccionada.categoria.nombre

        }
        else
        {
            cargarProductos(productos)
            tituloPrincipal.innerText = "Todos los Productos"

        }

    })
});



function actualizarBotonesAgregar () {
    
    btnAgregarCarrito = document.querySelectorAll(".producto-agregar")
  

    btnAgregarCarrito.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    });
}



function agregarAlCarrito(valor){
    const idBoton = valor.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id  === idBoton)


    if(productosEnCarrito.some(producto => producto.id === idBoton))
    {
        const index = productosEnCarrito.findIndex(producto =>producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
       



    }else
    {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado)


        
    }
    actualizarNumeroCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))

    
}
function actualizarNumeroCarrito(){
    let nuevoNumero = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad,0)
    
    numeroCarrito.innerText = nuevoNumero
}


