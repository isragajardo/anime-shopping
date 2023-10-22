const productos= [
    {
        id : "abrigo-01",
        titulo : "Naruto",
        imagen : "./img/naruto/naruto.jpg",
        categoria : {
            nombre: "anime",
            id : "abrigos"
        },
        precio : 1000
    },
    {
        id : "abrigo-02",
        titulo : "Naruto",
        imagen : "./img/naruto/naruto.jpg",
        categoria : {
            nombre: "anime",
            id : "abrigos"
        },
        precio : 1000
    },
    {
        id : "abrigo-03",
        titulo : "Naruto",
        imagen : "./img/naruto/naruto.jpg",
        categoria : {
            nombre: "anime",
            id : "abrigos"
        },
        precio : 1000
    },
    {
        id : "abrigo-04",
        titulo : "Naruto",
        imagen : "./img/naruto/naruto.jpg",
        categoria : {
            nombre: "anime",
            id : "abrigos"
        },
        precio : 1000
    },
    {
        id : "abrigo-05",
        titulo : "Naruto",
        imagen : "./img/naruto/naruto.jpg",
        categoria : {
            nombre: "anime",
            id : "abrigos"
        },
        precio : 1000
    },
    {
        id : "abrigo-06",
        titulo : "Naruto",
        imagen : "./img/naruto/naruto.jpg",
        categoria : {
            nombre: "anime",
            id : "abrigos"
        },
        precio : 1000
    }
]
const contenedorProductos = document.querySelector("#contenedor-productos");
const btnCategorias = document.querySelectorAll(".btn-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let btnAgregarCarrito
const numeroCarrito = document.querySelector("#numero-carrito")
let productosEnCarrito

let productosEnCarritoJson = localStorage.getItem("productos-en-carrito")
if(productosEnCarritoJson)
{
    productosEnCarritoJson = JSON.parse(localStorage.getItem("productos-en-carrito"))
    productosEnCarrito = productosEnCarritoJson;
    actualizarNumeroCarrito()
}else{
    productosEnCarrito = []
}

function cargarProductos(ProductoSeleccionado)
{
    contenedorProductos.innerHTML = "";

    ProductoSeleccionado.forEach(producto => {

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
        console.log(producto.id)
        contenedorProductos.appendChild(div)
        actualizarBotonesAgregar();


    })

}


btnCategorias.forEach(boton => {
   
    boton.addEventListener("click", (addActiveClass) =>{

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
    console.log("test")

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
    console.log(nuevoNumero)
    numeroCarrito.innerText = nuevoNumero
}


