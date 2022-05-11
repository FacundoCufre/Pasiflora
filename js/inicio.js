//AVISO

const checkAviso = document.getElementById("check1")
const aviso = document.getElementById("aviso")
checkAviso.addEventListener(`click`, ()=>{
    aviso.setAttribute("style", "display:none")
})

//GALERIA

const imagenesMuestra = ["img/muestra1.jpeg", "./img/muestra2.jpeg", "img/muestra3.jpeg", "img/muestra4.jpeg", "img/muestra5.jpeg", "img/muestra6.jpeg", "img/muestra12.jpeg", "img/muestra8.jpeg", "img/muestra9.jpg", "img/muestra10.jpeg", "img/muestra11.jpeg", "img/muestra7.jpeg", "img/muestra14.jpeg", "img/muestra13.jpeg"]

const imagen1 = document.getElementById("imagen-1")
const imagen2 = document.getElementById("imagen-2")
const imagen3 = document.getElementById("imagen-3")

var num1 = 1
var num2 = 2
var num3 = 3

let identificadorIntervaloDeTiempo;

document.addEventListener('DOMContentLoaded', () => {
    actualizarGaleria()
});

function actualizarGaleria() {
    imagen1.setAttribute("style", `background-image: url(${imagenesMuestra[0]})`)
    imagen2.setAttribute("style", `background-image: url(${imagenesMuestra[1]})`)
    imagen3.setAttribute("style", `background-image: url(${imagenesMuestra[2]})`)
    identificadorIntervaloDeTiempo = setInterval(cambiarFondos, 10000);
}

function cambiarFondos() {
    imagen1.setAttribute("style", `background-image: url(${imagenesMuestra[num1]})`)
    num1 < 13 ? num1++ : num1=0

    imagen2.setAttribute("style", `background-image: url(${imagenesMuestra[num2]})`)
    num2 < 13 ? num2++ : num2=0
    
    imagen3.setAttribute("style", `background-image: url(${imagenesMuestra[num3]})`)
    num3 < 13 ? num3++ : num3=0
}

//RESEÑAS

const reviewsList = document.querySelectorAll('.slider-container__body');
const before = document.getElementById('before');
const after = document.getElementById('after');
let currentReview = 1;
const numOfReviews = 3;

before.addEventListener('click', () => {
    currentReview--;
    controlReviews();
    resetInterval();
});

after.addEventListener('click', () => {
    controlReviews();
    currentReview++;
    resetInterval();
    
});

// Lógica Reviews Slider
const controlReviews = () => {
    if(currentReview > numOfReviews) {
        currentReview = 1;
    } else if (currentReview === 0) {
        currentReview = 3;
    }
    showReview();
}

const showReview = () => {
    reviewsList.forEach((review) => {
        const dataId = parseInt(review.dataset.id);

        (dataId !== currentReview) ? (
            (review.classList.contains('slider-container__body--show')) && review.classList.remove('slider-container__body--show')
        ) : (
            review.classList.add('slider-container__body--show')
        )
    });
}

let interval = setInterval(() => {
    controlReviews();
    currentReview++;
}, 7000);

// Resetear el intervalo
const resetInterval = () => {
    clearInterval(interval);
    interval = setInterval(() => {
        controlReviews();
        currentReview++;
    }, 7000);
}

