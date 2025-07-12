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
        const images = $(this).closest('.owl-carousel').find('img').map(function() {
            return $(this).attr('src');
        }).get();
        let currentIndex = images.indexOf($(this).attr('src'));

        const fullScreenDiv = $('<div>').css({
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        });

        const fullScreenImage = $('<img>').attr('src', images[currentIndex]).css({
            maxWidth: '50%', 
            maxHeight: '40%', 
            objectFit: 'contain'
        });

        const prevButton = $('<button>').html('<i class="bi bi-arrow-left-circle-fill"></i>').css({
            position: 'absolute',
            left: '10px', 
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10000,
            background: 'transparent',
            color: 'white',
            border: 'none',
            padding: '10px',
            fontSize: '2em',
            cursor: 'pointer'
        });

        const nextButton = $('<button>').html('<i class="bi bi-arrow-right-circle-fill"></i>').css({
            position: 'absolute',
            right: '10px', 
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10000,
            background: 'transparent',
            color: 'white',
            border: 'none',
            padding: '10px',
            fontSize: '2em',
            cursor: 'pointer'
        });

        const closeButton = $('<button>').html('<i class="bi bi-x-circle-fill"></i>').css({
            position: 'absolute',
            top: '10px',    
            right: '10px', 
            zIndex: 10001,
            background: 'transparent',
            color: 'coral',
            border: 'none',
            padding: '10px',
            fontSize: '2em',
            cursor: 'pointer'
        });

        fullScreenDiv.append(prevButton).append(fullScreenImage).append(nextButton).append(closeButton).appendTo('body');

        closeButton.on('click', function() {
            fullScreenDiv.remove();
        });

        prevButton.on('click', function() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            fullScreenImage.attr('src', images[currentIndex]);
        });

        nextButton.on('click', function() {
            currentIndex = (currentIndex + 1) % images.length;
            fullScreenImage.attr('src', images[currentIndex]);
        });

        $(document).on('keydown.fullScreenViewer', function(e) {
            if (e.key === "Escape") {
                fullScreenDiv.remove();
                $(document).off('keydown.fullScreenViewer'); 
            }
        });

        fullScreenDiv.on('click', function(e) {
            if ($(e.target).is(fullScreenDiv)) {
                fullScreenDiv.remove();
                $(document).off('keydown.fullScreenViewer'); 
            }
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