import { fetchProducts } from "./firebase.js";
import { ampliarProducto, cambiarImagen, achicarProducto, cambiarDescripcion } from "./productos.js";

const contenedorProductos = document.getElementById('conteiner');
const templateProducto = document.getElementById('template-card-producto').content;
const fragment = document.createDocumentFragment();
let catalogoProductos = [];

const getProducts = async() => {
    try {
        const response = await fetchProducts();
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
            precio
        } = product;

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
        // clone.querySelector('.producto').style.backgroundImage = `url(${imagen})`;
        clone.querySelectorAll('.nombre').forEach((nombreProducto) => nombreProducto.textContent = `${nombre}`);
        clone.querySelector('.producto-info-contenido span').textContent = `PEN ${precio}`;
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
        clone.getElementById(`detallelabel-${id}`).for = `detalle-${id}` 

        clone.getElementById("cuidadolabel").id = `cuidadolabel-${id}`
        clone.getElementById(`cuidadolabel-${id}`).addEventListener(`click`, ()=>{
            cambiarDescripcion(`#cuidados-${id}`,`#detalles-${id}`)
        });
        clone.getElementById(`cuidadolabel-${id}`).for = `cuidado-${id}`

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
        `;

        clone.querySelector('.cuidados').id = `cuidados-${id}`
        clone.querySelector(`#cuidados-${id}`).innerHTML = `
            <ul>
                ${cuidadosText}
            </ul>
        `;

        clone.querySelector(`.fade`)

        clone.querySelector('.imagen-principal').id = `imagen-principal-${id}`;
        clone.querySelector(`#imagen-principal-${id}`).style.backgroundImage = `url(${fotos.fotoPrincipal})`;
        
        clone.querySelector(".imagenes-todas").innerHTML = `
                            <input type="radio" id='foto1-${id}' name='img-${id}' checked>
                            <label id='fotolabel1-${id}' for='foto1-${id}' style="background-image: url(${fotos.fotoPrincipal});"></label>

                            <input type="radio" id='foto2-${id}' name='img-${id}'>
                            <label id='fotolabel2-${id}' for='foto2-${id}' style="background-image: url(${fotos.foto2});"></label>

                            <input type="radio" id='foto3-${id}' name='img-${id}'>
                            <label id='fotolabel3-${id}' for='foto3-${id}' style="background-image: url(${fotos.foto3});"></label>

                            <input type="radio" id='foto4-${id}' name='img-${id}'>
                            <label id='fotolabel4-${id}' for='foto4-${id}' style="background-image: url(${fotos.foto4});"></label>
        `

        clone.getElementById(`fotolabel1-${id}`).addEventListener('click', () => {
            cambiarImagen(id, `url(${fotos.fotoPrincipal})`);
        });

        clone.getElementById(`fotolabel2-${id}`).addEventListener('click', () => {
            cambiarImagen(id, `url(${fotos.foto2})`);
        });

        clone.getElementById(`fotolabel3-${id}`).addEventListener('click', () => {
            cambiarImagen(id, `url(${fotos.foto3})`);
        });
        
        clone.getElementById(`fotolabel4-${id}`).addEventListener('click', () => {
            cambiarImagen(id, `url(${fotos.foto4})`);
        });
        
        clone.querySelector('.cerrar').addEventListener('click', () => {
            achicarProducto(id);
        });

        fragment.appendChild(clone);
    });

    contenedorProductos.appendChild(fragment);
};

document.addEventListener('DOMContentLoaded', async() => {
    catalogoProductos = await getProducts();
    renderProducts();
});