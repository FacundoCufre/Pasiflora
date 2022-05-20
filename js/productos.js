function ampliarProducto(x){
    const producto = document.getElementById(`producto-${x}`)
    producto.setAttribute("class", "producto producto-ampliado")
}

function achicarProducto(x){
    const producto = document.getElementById(`producto-${x}`)
    producto.setAttribute("class", "producto")
}

function cambiarImagen(a, b){
    const imagen = document.getElementById(`imagen-principal-${a}`)
    imagen.setAttribute("style", `background-image: ${b};`)
}