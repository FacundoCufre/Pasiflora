const imagenesMuestra = ["img/muestra1.jpeg", "./img/muestra2.jpeg", "img/muestra3.jpeg", "img/muestra4.jpeg", "img/muestra5.jpeg", "img/muestra6.jpeg", "img/muestra12.jpeg", "img/muestra8.jpeg", "img/muestra9.jpg", "img/muestra10.jpeg", "img/muestra11.jpeg", "img/muestra7.jpeg", "img/muestra14.jpeg", "img/muestra13.jpeg"]

const imagen1 = document.getElementById("imagen-1")
const imagen2 = document.getElementById("imagen-2")
const imagen3 = document.getElementById("imagen-3")

var num1 = 1
var num2 = 2
var num3 = 3

let identificadorIntervaloDeTiempo;

function repetir1() {
    imagen1.setAttribute("style", `background-image: url(${imagenesMuestra[0]})`)
    identificadorIntervaloDeTiempo = setInterval(mandarMensaje, 10000);
}

function mandarMensaje() {
    imagen1.setAttribute("style", `background-image: url(${imagenesMuestra[num1]})`)
    if(num1 <13){
        num1++
    }
    else{
        num1=0
    }
}


let identificadorIntervaloDeTiempo2;

function repetir2() {
    imagen2.setAttribute("style", `background-image: url(${imagenesMuestra[1]})`)
    identificadorIntervaloDeTiempo = setInterval(mandarMensaje2, 10000);
}

function mandarMensaje2() {
    imagen2.setAttribute("style", `background-image: url(${imagenesMuestra[num2]})`)
    if(num2 <13){
        num2++
    }
    else{
        num2=0
    }
}


let identificadorIntervaloDeTiempo3;

function repetir3() {
    imagen3.setAttribute("style", `background-image: url(${imagenesMuestra[2]})`)
    identificadorIntervaloDeTiempo = setInterval(mandarMensaje3, 10000);
}

function mandarMensaje3() {
    imagen3.setAttribute("style", `background-image: url(${imagenesMuestra[num3]})`)
    if(num3 <13){
        num3++
    }
    else{
        num3=0
    }
}

repetir1()
repetir2()
repetir3()