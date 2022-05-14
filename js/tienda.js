function ampliarProducto(x){
    const producto = document.getElementById(`producto-${x}`)
    producto.setAttribute("class", "producto producto-ampliado")
}

function achicarProducto(x){
    const producto = document.getElementById(`producto-${x}`)
    producto.setAttribute("class", "producto")
}

function mostrarInfo(a, b, c, d){
    const show = document.getElementById(`${b}-texto-${a}`)
    const oculto = document.getElementById(`${c}-texto-${a}`)
    const oculto2 = document.getElementById(`${d}-texto-${a}`)

        show.setAttribute("class", `${b}-show`)
        oculto.setAttribute("class", `${c}-oculto`)
        oculto2.setAttribute("class", `${d}-oculto`)
}