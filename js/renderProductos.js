import { fetchProducts, fetchFilteredProducts, fetchNuevosOfertas } from "./firebase.js";
import { ampliarProducto, cambiarImagen, achicarProducto, cambiarDescripcion } from "./productos.js";

const contenedorProductos = document.getElementById('conteiner');
const templateProducto = document.getElementById('template-card-producto').content;
const fragment = document.createDocumentFragment();
let catalogoProductos = [];

let category = sessionStorage.getItem('boton') ?? '';

const getProductsByCategory = async(nombreCategoria) => {
    let response;

    try {
        switch(nombreCategoria) {
            case 'collares':
                response = await fetchFilteredProducts('collar');
            break;

            case 'pulseras':
                response = await fetchFilteredProducts('pulsera');
            break;

            case 'aretes':
                response = await fetchFilteredProducts('aretes');
            break;

            case 'nuevos':
                response = await fetchNuevosOfertas(category);
            break;

            case 'ofertas':
                response = await fetchNuevosOfertas(category);
            break;

            default:
                response = await fetchProducts();
            break;
        }

        return response;

    } catch (error) {
        console.log(error);
    }
} 


const getProducts = async() => {
    try {
        const response = await getProductsByCategory(category);
        const docs = response.docs;
        
        const products = docs.map((doc) => {
            return ({
                id: doc.id,
                ...doc.data(),
            });
        });

        return products;
    } catch (error) {
        console.log(error);
    };
};


const renderProducts = () => {
    
    catalogoProductos.forEach((product) => {

        const {
            id,
            cuidados,
            fotos,
            material,
            medidas,
            nombre,
            precio,
            ofertas,
        } = product;

        const {foto1, foto2, foto3, foto4} = fotos;

        let medidasText = '';
        let cuidadosText = '';

        medidas.forEach((element) => {
            const {
                medida,
                valor,
            } = element;

            medidasText += `
                <li><p><b>${valor}: </b>${medida}</p></li>
            `;
        });

        cuidados.forEach((cuidado) => {
            cuidadosText += `
                <li><span>♢  </span>${cuidado}</li>
            `;
        });

        const clone = templateProducto.cloneNode(true);

        clone.querySelector('.producto').id = `producto-${id}`;
        clone.querySelector('.producto').style.backgroundImage = `url(${foto1})`;
        clone.querySelectorAll('.nombre').forEach((nombreProducto) => nombreProducto.textContent = `${nombre}`);
        if(ofertas){
            clone.querySelector('.precio-anterior').textContent = `PEN ${product.precioAnterior}`;
        }
        clone.querySelector('.precio').textContent = `PEN ${precio}`;
        clone.querySelectorAll('a').forEach((link) => link.href = `#producto-${id}`);
        clone.querySelector('.ampliar').addEventListener('click', () => {
            ampliarProducto(id);
        });
        

        clone.querySelector('.descripcion')
        clone.querySelector("#detalle").id = `detalle-${id}` 
        clone.querySelector("#cuidado").id = `cuidado-${id}`
        clone.getElementById(`detalle-${id}`).name = `desc-${id}`;
        clone.getElementById(`cuidado-${id}`).name = `desc-${id}`;

        clone.getElementById("detallelabel").id = `detallelabel-${id}`
        clone.getElementById(`detallelabel-${id}`).addEventListener(`click`, ()=>{
            cambiarDescripcion(`#detalles-${id}`,`#cuidados-${id}`)
        });
        clone.getElementById(`detallelabel-${id}`).setAttribute('for', `detalle-${id}`)

        clone.getElementById("cuidadolabel").id = `cuidadolabel-${id}`
        clone.getElementById(`cuidadolabel-${id}`).addEventListener(`click`, ()=>{
            cambiarDescripcion(`#cuidados-${id}`,`#detalles-${id}`)
        });
        clone.getElementById(`cuidadolabel-${id}`).setAttribute('for', `cuidado-${id}`)
        
        clone.querySelector('.detalles').id = `detalles-${id}`
        clone.querySelector(`#detalles-${id}`).innerHTML = `
            <div>
                <span>Material:</span>
                <p>${material}</p>
            </div>
            <div>
                <span>Medidas:</span>
                <ul>
                    ${medidasText}
                </ul>
            </div>
            <a href="https://wa.me/c/51902003274"><div class="boton-compra">
                <span class="boton-compra-texto">Comprar</span>
            </div></a>
            <p class="colores-disponibles"></p>
        `;
        if(product.hasOwnProperty('colores')) {
            clone.querySelector('.colores-disponibles').textContent = `Disponible en: ${product.colores.join(', ')}`;
        }

        clone.querySelector('.cuidados').id = `cuidados-${id}`
        clone.querySelector(`#cuidados-${id}`).innerHTML = `
            <ul>
                ${cuidadosText}
            </ul>
        `;

        clone.querySelector(`.fade`)

        clone.querySelector('.imagen-principal').id = `imagen-principal-${id}`;
        clone.querySelector('.imagen-principal').style.backgroundImage = `url(${foto1})`;
        
        clone.querySelectorAll('.imagenes-todas input').forEach((input, index) => {
            input.name = `img-${id}`;
            input.id = `foto${index + 1}-${id}`;
        });
        
        clone.querySelectorAll('.imagenes-todas label').forEach((label, index) => {
            
            label.id = `label${index + 1}-${id}`;
            label.setAttribute('for', `foto${index + 1}-${id}`);

        });

        clone.getElementById(`foto1-${id}`).style.backgroundImage = `url(${foto1})`;
        clone.getElementById(`label1-${id}`).style.backgroundImage = `url(${foto1})`;
        clone.getElementById(`foto1-${id}`).addEventListener('click', () => {
            cambiarImagen(id, `url(${foto1})`);
        });

        clone.getElementById(`foto2-${id}`).style.backgroundImage = `url(${foto2})`;
        clone.getElementById(`label2-${id}`).style.backgroundImage = `url(${foto2})`;
        if(foto2 !== '') {
            clone.getElementById(`foto2-${id}`).addEventListener('click', () => {
                cambiarImagen(id, `url(${foto2})`);
            });
        }
        

        clone.getElementById(`foto3-${id}`).style.backgroundImage = `url(${foto3})`;
        clone.getElementById(`label3-${id}`).style.backgroundImage = `url(${foto3})`;
        if(foto3 !== '') {
            clone.getElementById(`foto3-${id}`).addEventListener('click', () => {
                cambiarImagen(id, `url(${foto3})`);
            });
        }
        
        clone.getElementById(`foto4-${id}`).style.backgroundImage = `url(${foto4})`;
        clone.getElementById(`label4-${id}`).style.backgroundImage = `url(${foto4})`;
        if(foto4 !== '') {
            clone.getElementById(`foto4-${id}`).addEventListener('click', () => {
                cambiarImagen(id, `url(${foto4})`);
            });
        }
        
        //  *********** Evitar que se aplique el estilo de checked *************
        let labelWithoutImg = '';
        let arrayNoImg = [];
        clone.querySelectorAll('.imagenes-todas label').forEach((label) => {
            if(label.style.backgroundImage === 'url("")') {
                console.log(label);
                label.addEventListener('click', () => {
                    label.style.border = 'none';
                });
            };
        });
        // ******************************************************+

        
        clone.querySelector('.cerrar').addEventListener('click', () => {
            achicarProducto(id);
        });

        fragment.appendChild(clone);
    });

    contenedorProductos.innerHTML = '';
    contenedorProductos.appendChild(fragment);
};



document.addEventListener('DOMContentLoaded', async() => {
    catalogoProductos = await getProducts();
    renderProducts();
});


const filtrosTienda = document.querySelectorAll('.filtros label');

filtrosTienda.forEach((filtro) => {
    filtro.addEventListener('click', async() => {
        category = filtro.textContent.toLowerCase();
        sessionStorage.setItem('boton', category);
        catalogoProductos = await getProducts();
        renderProducts();
    });
});