const filtros = document.querySelector(".filtros")
const flecha = document.querySelector(".fa-caret-down")
const menu = document.getElementById("menu")
const conteiner = document.querySelector(".conteiner")

function onoff(){
    currentvalue = document.getElementById('onoff').value;
    if(currentvalue == "Off"){
      document.getElementById("onoff").value="On";
      abrirMenu()
    }
    else{
      document.getElementById("onoff").value="Off";
      cerrarMenu()
    }
}

function abrirMenu(){
    filtros.setAttribute("class", "open--filtros filtros")
    flecha.setAttribute("class", "fa-solid fa-caret-down open")
    menu.setAttribute("class", "menu open--menu")
    conteiner.setAttribute("style", "padding-left: calc(10% + 100px); padding-right: 0;")
}

function cerrarMenu(){
    filtros.setAttribute("class", "filtros")
    flecha.setAttribute("class", "fa-solid fa-caret-down")
    menu.setAttribute("class", "menu")
    conteiner.setAttribute("style", "padding-left: 10%")
}

let boton = localStorage.getItem('boton')

if (boton == 'todos'){
  document.querySelector('#filtro-todos').checked = true
}
else if (boton == 'collares'){
  document.querySelector('#filtro-collares').checked = true
}
else if (boton == 'aretes'){
  document.querySelector('#filtro-aretes').checked = true
}
else if (boton == 'pulseras'){
  document.querySelector('#filtro-pulseras').checked = true
}
else if (boton == 'nuevos'){
  document.querySelector('#filtro-nuevos').checked = true
}
else if (boton == 'ofertas'){
  document.querySelector('#filtro-ofertas').checked = true
}
sessionStorage.removeItem('boton')