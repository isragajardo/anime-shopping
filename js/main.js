
const contenedorProductos = document.querySelector("#contenedor-productos");
const btnCategorias = document.querySelectorAll(".btn-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const numeroCarrito = document.querySelector("#numero-carrito");
const naruto = document.querySelector("#naruto");
const demonSlayer = document.querySelector("#demon-slayer");
const animeSelect = document.querySelector("#anime-select");
const menu = document.querySelector("#menu");
const volverNaruto = document.querySelector("#volver-naruto");
const volverDs = document.querySelector("#volver-ds");

let productosEnCarrito = []
let productos = [];
let btnAgregarCarrito

const cambioPagNaruto = ()=>{
    document.documentElement.style.setProperty('--fondo', '#FF8000');
    animeSelect.classList.add("disabled")
    volverDs.classList.remove("disabled")
    volverNaruto.classList.add("disabled")



    fetch('./json/productos-naruto.json')
    .then(response => response.json())
    .then(data => {
      productos = data;
      setTimeout(()=>{
        menu.classList.remove("disabled")
        cargarProductos(productos)
      },300)
      
    })
    .catch(error => console.error('Error al cargar productos:', error));
}

const cambioPagDs = async()=>{
    document.documentElement.style.setProperty('--fondo', 'green');
    animeSelect.classList.add("disabled")
    volverNaruto.classList.remove("disabled")
    volverDs.classList.add("disabled")


    try{

        const response = await fetch('./json/productos-demon-slayer.json');
        const data = await response.json();
        cargarProductos(data);
        menu.classList.remove("disabled")

       } catch{
        console.error('Error al cargar productos:', error)
       }
    
    
}

naruto.addEventListener("click", ()=>{

   cambioPagNaruto();


})

 

 demonSlayer.addEventListener("click", ()=>{

    cambioPagDs();
    
   

})

volverNaruto.addEventListener("click",()=>{
    cambioPagNaruto();

})
volverDs.addEventListener("click",()=>{
    cambioPagDs();

})







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


