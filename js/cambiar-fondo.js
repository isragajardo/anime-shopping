const naruto = document.querySelector("#naruto")
const demonSlayer = document.querySelector("#demon-slayer")

naruto.addEventListener("click", ()=>{

    document.documentElement.style.setProperty('--fondo', 'url("../img/fondo-naruto.jpg")');
    naruto.classList.add("disabled")
    demonSlayer.classList.remove("disabled")

})

demonSlayer.addEventListener("click", ()=>{

    document.documentElement.style.setProperty('--fondo', 'url("../img/fondo-ds.png")');
    demonSlayer.classList.add("disabled")
    naruto.classList.remove("disabled")

})