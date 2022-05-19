import { fetchProducts } from "./firebase.js";
import { ampliarProducto2, cambiarImagen, achicarProducto2 } from "./productos.js";

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
                <li>${cuidado}</li>
            `;
        });

        const clone = templateProducto.cloneNode(true);

        clone.querySelector('.producto').id = `producto-${id}`;
        // clone.querySelector('.producto').style.backgroundImage = `url(${imagen})`;
        clone.querySelectorAll('.nombre').forEach((nombreProducto) => nombreProducto.textContent = `${nombre}`);
        clone.querySelector('.producto-info-contenido span').textContent = `PEN ${precio}`;
        clone.querySelectorAll('a').forEach((link) => link.href = `#producto-${id}`);
        clone.querySelector('.ampliar').addEventListener('click', () => {
            ampliarProducto2(id);
        });
        clone.querySelector('.detalles').innerHTML = `
            <p>Material: ${material}</p>
            <p>Medidas:</p>
            <ul>
                ${medidasText}
            </ul>   
        `;
        clone.querySelector('.cuidados').innerHTML = `
            <ul>
                ${cuidadosText}
            </ul>
        `;
        clone.querySelector('.imagen-principal').id = `imagen-principal-${id}`;
        clone.querySelector('.imagen-principal').style.backgroundImage = `url(${fotos.fotoPrincipal})`;
        
        clone.querySelectorAll('input').forEach((input) => input.name = `img-${id}`);
        
        clone.getElementById('foto1-2').style.backgroundImage = `url(${fotos.fotoPrincipal})`;
        clone.getElementById('foto1-2').addEventListener('click', () => {
            cambiarImagen(id, `url(${fotos.fotoPrincipal})`);
        });


        clone.getElementById('foto2-2').style.backgroundImage = `url(${fotos.foto2})`;
        clone.getElementById('foto2-2').addEventListener('click', () => {
            cambiarImagen(id, `url(${fotos.foto2})`);
        });

        clone.getElementById('foto3-2').style.backgroundImage = `url(${fotos.foto3})`;
        clone.getElementById('foto3-2').addEventListener('click', () => {
            cambiarImagen(id, `url(${fotos.foto3})`);
        });

        clone.getElementById('foto4-2').style.backgroundImage = `url(${fotos.foto4})`;
        clone.getElementById('foto4-2').addEventListener('click', () => {
            cambiarImagen(id, `url(${fotos.foto4})`);
        });

        clone.querySelector('.cerrar').addEventListener('click', () => {
            achicarProducto2(id);
        });

        fragment.appendChild(clone);
    });

    contenedorProductos.appendChild(fragment);
};

document.addEventListener('DOMContentLoaded', async() => {
    catalogoProductos = await getProducts();
    renderProducts();
});
