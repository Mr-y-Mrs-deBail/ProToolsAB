document.addEventListener('DOMContentLoaded', function() {
    const moveTopButton = document.getElementById("movetop");
    const scrollDistance = 300; // Define cuánto scroll hará el botón en píxeles
    let lastScrollY = 0; // Para detectar la dirección del scroll manual

    // Función para desplazarse a una posición específica
    function scrollToPosition(position) {
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    }

    // Mantiene el botón visible.
    function updateButtonVisibility() {
        if (moveTopButton) {
            moveTopButton.style.display = "block"; // O "none" si quieres que desaparezca al principio
        }
    }

    // Actualiza el icono del botón (flecha arriba/abajo)
    function updateButtonIcon() {
        if (moveTopButton) {
            const currentScrollY = window.scrollY;
            const docHeight = document.body.offsetHeight;
            const windowHeight = window.innerHeight;

            // Si estamos cerca del final de la página, muestra la flecha hacia arriba
            if ((currentScrollY + windowHeight) >= (docHeight - 50)) { // Margen de 50px para el final
                moveTopButton.innerHTML = '<i class="bi bi-chevron-up"></i>';
            } 
            // Si estamos cerca del principio de la página, muestra la flecha hacia abajo
            else if (currentScrollY <= 50) { // Margen de 50px para el inicio
                moveTopButton.innerHTML = '<i class="bi bi-chevron-down"></i>';
            } 
            // Si estamos en el medio, muestra la flecha según la dirección del último scroll
            else if (currentScrollY > lastScrollY) {
                moveTopButton.innerHTML = '<i class="bi bi-chevron-down"></i>';
            } else { // currentScrollY < lastScrollY
                moveTopButton.innerHTML = '<i class="bi bi-chevron-up"></i>';
            }
        }
    }

    // Inicializa la visibilidad y el icono del botón al cargar.
    updateButtonVisibility();
    updateButtonIcon(); // Llama para establecer el icono inicial

    // Listener para el botón movetop
    if (moveTopButton) {
        moveTopButton.addEventListener('click', function() {
            const currentScrollY = window.scrollY;
            const docHeight = document.body.offsetHeight;
            const windowHeight = window.innerHeight;

            // Si el botón muestra la flecha hacia arriba, significa que queremos subir
            if (moveTopButton.innerHTML.includes('chevron-up')) {
                scrollToPosition(Math.max(0, currentScrollY - scrollDistance)); // Sube 'scrollDistance' píxeles
            } 
            // Si el botón muestra la flecha hacia abajo, significa que queremos bajar
            else if (moveTopButton.innerHTML.includes('chevron-down')) {
                // Baja 'scrollDistance' píxeles, sin exceder el final de la página
                scrollToPosition(Math.min(docHeight - windowHeight, currentScrollY + scrollDistance)); 
            }
            // Después de hacer clic en el botón, también actualizamos el icono
            // para reflejar la nueva posición o la expectativa del siguiente scroll.
            setTimeout(updateButtonIcon, 700); // Un pequeño retraso para que el scroll termine
        });
    }

    // Listener para el evento de scroll general de la ventana
    window.addEventListener('scroll', function() {
        updateButtonVisibility(); 
        const currentScrollY = window.scrollY;

        // Actualiza la dirección del último scroll para que el botón refleje el movimiento manual
        if (currentScrollY !== lastScrollY) { // Solo actualiza si hubo un cambio real de scroll
            updateButtonIcon(); // Actualiza el icono del botón
        }
        lastScrollY = currentScrollY; // Guarda la posición actual para la próxima comparación
    });

    // --- Manejo de clics en enlaces del menú de hamburguesa ---
    // Esto asegura que los enlaces del menú usen scrollIntoView (por defecto del navegador)
    // y no haya interferencia. También cierra el menú después de hacer clic.
    document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                // No necesitamos e.preventDefault() ni scrollToSection aquí,
                // ya que queremos que el navegador maneje los enlaces de ancla
                // directamente para un comportamiento estándar y libre.
                // Sin embargo, si necesitas smooth scroll para los anchors:
                // e.preventDefault();
                // const targetId = href.substring(1);
                // const targetSection = document.getElementById(targetId);
                // if (targetSection) {
                //    targetSection.scrollIntoView({ behavior: 'smooth' });
                // }

                // Lógica para cerrar el menú de hamburguesa (la mantengo igual)
                const menu = document.querySelector('#navbartogglermv');
                if (menu && menu.classList.contains('show')) {
                    menu.classList.remove('show');
                    const menuToggle = document.querySelector('.navbar-toggler');
                    if (menuToggle) {
                        menuToggle.setAttribute('aria-expanded', 'false');
                        const iconExpand = document.querySelector('.icon-expand');
                        const iconClose = document.querySelector('.icon-close');
                        if (iconExpand) iconExpand.style.display = 'block';
                        if (iconClose) iconClose.style.display = 'none';
                    }
                    const overlay = document.querySelector('.pantalla-completa');
                    if (overlay) {
                        overlay.remove();
                    }
                }
            }
        });
    });
});
