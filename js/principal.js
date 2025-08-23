$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        dots: true,
        responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 1 }
        }
    });

    $('.owl-carousel img').on('click', function() {
        const clickedImage = $(this);
        const clickedIndex = clickedImage.data('index');

        const fancyboxItems = clickedImage.closest('.owl-carousel').find('.owl-item:not(.cloned) img').map(function() {
            return {
                src: $(this).data('full-src'),
                thumbSrc: $(this).attr('src')
            };
        }).get();

        Fancybox.show(fancyboxItems, {
            startIndex: clickedIndex,
            Thumbs: true
        });
    });
});

const btnTodos = document.querySelector('.todos');
const btnElectricidad = document.querySelector('.electricidad');
const btnHerramientas = document.querySelector('.herramientas');
const btnCarpinteria = document.querySelector('.carpinteria');
const btnJardineria = document.querySelector('.jardineria');
const contenedorProductos = document.querySelector('.gallery_agile');

const productos = () => {
    let productosArreglo = [];
    const productos = document.querySelectorAll('.producto');

    productos.forEach(producto => productosArreglo = [...productosArreglo, producto]);

    const electricidad = productosArreglo.filter(producto => producto.getAttribute('data-producto') === 'electricidad');
    const herramientas = productosArreglo.filter(producto => producto.getAttribute('data-producto') === 'herramientas');
    const carpinteria = productosArreglo.filter(producto => producto.getAttribute('data-producto') === 'carpinteria');
    const jardineria = productosArreglo.filter(producto => producto.getAttribute('data-producto') === 'jardineria');

    mostrarProductos(electricidad, herramientas, carpinteria, jardineria, productosArreglo);
};

const mostrarProductos = (electricidad, herramientas, carpinteria, jardineria, todos) => {
    btnElectricidad.addEventListener('click', () => {
        limpiarHtml(contenedorProductos);
        electricidad.forEach(producto => contenedorProductos.appendChild(producto));
    });

    btnHerramientas.addEventListener('click', () => {
        limpiarHtml(contenedorProductos);
        herramientas.forEach(producto => contenedorProductos.appendChild(producto));
    });

    btnCarpinteria.addEventListener('click', () => {
        limpiarHtml(contenedorProductos);
        carpinteria.forEach(producto => contenedorProductos.appendChild(producto));
    });

    btnJardineria.addEventListener('click', () => {
        limpiarHtml(contenedorProductos);
        jardineria.forEach(producto => contenedorProductos.appendChild(producto));
    });

    btnTodos.addEventListener('click', () => {
        limpiarHtml(contenedorProductos);
        todos.forEach(producto => contenedorProductos.appendChild(producto));
    });

    btnTodos.click();
};

const limpiarHtml = (contenedor) => {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
};

productos();