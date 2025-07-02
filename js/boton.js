document.addEventListener('DOMContentLoaded', function() {
    const moveTopButton = document.getElementById("movetop");
    const scrollDistance = 300; 
    let lastScrollY = 0; 

    function scrollToPosition(position) {
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    }

    function updateButtonVisibility() {
        if (moveTopButton) {
            moveTopButton.style.display = "block"; 
        }
    }

    function updateButtonIcon() {
        if (moveTopButton) {
            const currentScrollY = window.scrollY;
            const docHeight = document.body.offsetHeight;
            const windowHeight = window.innerHeight;

            if ((currentScrollY + windowHeight) >= (docHeight - 50)) { 
                moveTopButton.innerHTML = '<i class="bi bi-chevron-up"></i>';
            } 
            else if (currentScrollY <= 50) { 
                moveTopButton.innerHTML = '<i class="bi bi-chevron-down"></i>';
            } 
            else if (currentScrollY > lastScrollY) {
                moveTopButton.innerHTML = '<i class="bi bi-chevron-down"></i>';
            } else { 
                moveTopButton.innerHTML = '<i class="bi bi-chevron-up"></i>';
            }
        }
    }

    updateButtonVisibility();
    updateButtonIcon(); 

    if (moveTopButton) {
        moveTopButton.addEventListener('click', function() {
            const currentScrollY = window.scrollY;
            const docHeight = document.body.offsetHeight;
            const windowHeight = window.innerHeight;

            if (moveTopButton.innerHTML.includes('chevron-up')) {
                scrollToPosition(Math.max(0, currentScrollY - scrollDistance)); 
            } 
            else if (moveTopButton.innerHTML.includes('chevron-down')) {
                scrollToPosition(Math.min(docHeight - windowHeight, currentScrollY + scrollDistance)); 
            }
            
            setTimeout(updateButtonIcon, 700); 
        });
    }

    window.addEventListener('scroll', function() {
        updateButtonVisibility(); 
        const currentScrollY = window.scrollY;

        if (currentScrollY !== lastScrollY) { 
            updateButtonIcon(); 
        }
        lastScrollY = currentScrollY; 
    });

  
    document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                
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
