const imagenesMuestra = ["img/muestra1.jpeg", "./img/muestra2.jpeg", "img/muestra3.jpeg", "img/muestra4.jpeg", "img/muestra5.jpeg", "img/muestra6.jpeg", "img/muestra12.jpeg", "img/muestra8.jpeg", "img/muestra9.jpg", "img/muestra10.jpeg", "img/muestra11.jpeg", "img/muestra7.jpeg", "img/muestra14.jpeg", "img/muestra13.jpeg"]

const imagen1 = document.getElementById("imagen-1")
const imagen2 = document.getElementById("imagen-2")
const imagen3 = document.getElementById("imagen-3")

var num1 = 1
var num2 = 2
var num3 = 3

let identificadorIntervaloDeTiempo;

function repetir() {
    imagen1.setAttribute("style", `background-image: url(${imagenesMuestra[0]})`)
    imagen2.setAttribute("style", `background-image: url(${imagenesMuestra[1]})`)
    imagen3.setAttribute("style", `background-image: url(${imagenesMuestra[2]})`)
    identificadorIntervaloDeTiempo = setInterval(cambiarFondo, 10000);
}

function cambiarFondo() {
    imagen1.setAttribute("style", `background-image: url(${imagenesMuestra[num1]})`)
    num1 < 13 ? num1++ : num1=0

    imagen2.setAttribute("style", `background-image: url(${imagenesMuestra[num2]})`)
    num2 < 13 ? num2++ : num2=0
    
    imagen3.setAttribute("style", `background-image: url(${imagenesMuestra[num3]})`)
    num3 < 13 ? num3++ : num3=0
}

repetir()