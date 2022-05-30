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
    conteiner.setAttribute("style", "padding-left: calc(10% + 100px)")
}

function cerrarMenu(){
    filtros.setAttribute("class", "filtros")
    flecha.setAttribute("class", "fa-solid fa-caret-down")
    menu.setAttribute("class", "menu")
    conteiner.setAttribute("style", "padding-left: 10%")
}

