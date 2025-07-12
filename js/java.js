const modeToggleContainer = document.getElementById('mode-toggle-container');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const autoIconImg = document.getElementById('auto-icon-img');
const header = document.querySelector('header'); 
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const themeModes = ['light', 'dark', 'auto'];
let currentThemeIndex = 0;

function updateAutoIconImage() {
    if (!autoIconImg) return;

    const currentTheme = document.documentElement.getAttribute('data-theme');
    const isNavFixed = header && header.classList.contains('nav-fixed');

    if (currentTheme === 'dark') {
        autoIconImg.src = 'img/diaynoche2.png';
    } else if (currentTheme === 'light') {
        if (isNavFixed) {
            autoIconImg.src = 'img/diaynoche.png';
        } else {
            autoIconImg.src = 'img/diaynoche2.png';
        }
    } else if (currentTheme === 'auto') {
        const systemPreference = prefersDarkScheme.matches ? 'dark' : 'light';
        if (systemPreference === 'dark') {
            autoIconImg.src = 'img/diaynoche2.png';
        } else {
            if (isNavFixed) {
                autoIconImg.src = 'img/diaynoche.png';
            } else {
                autoIconImg.src = 'img/diaynoche2.png';
            }
        }
    }
}

/**
 * @param {string} theme
 */

function applyThemeAndShowIcon(theme) {
    [sunIcon, moonIcon, autoIconImg].forEach(icon => {
        if (icon) icon.classList.remove('visible');
    });

    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (sunIcon) sunIcon.classList.add('visible');
        currentThemeIndex = themeModes.indexOf('light');
    } else if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (moonIcon) moonIcon.classList.add('visible');
        currentThemeIndex = themeModes.indexOf('dark');
    } else if (theme === 'auto') {
        const systemPreference = prefersDarkScheme.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', systemPreference);
        if (autoIconImg) {
            autoIconImg.classList.add('visible');
        }
        currentThemeIndex = themeModes.indexOf('auto');
    }

    updateAutoIconImage();
}

function toggleNextTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themeModes.length;
    const nextTheme = themeModes[currentThemeIndex];

    applyThemeAndShowIcon(nextTheme);

    if (nextTheme === 'auto') {
        localStorage.removeItem('theme');
    } else {
        localStorage.setItem('theme', nextTheme);
    }
}

if (modeToggleContainer) {
    modeToggleContainer.addEventListener('click', toggleNextTheme, false);
}

document.addEventListener('DOMContentLoaded', () => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
        applyThemeAndShowIcon(storedTheme);
    } else {
        applyThemeAndShowIcon('auto');
    }

    updateAutoIconImage();

    prefersDarkScheme.addEventListener('change', () => {
        const currentLocalStorageTheme = localStorage.getItem('theme');
        if (currentLocalStorageTheme === null || currentLocalStorageTheme === 'auto') {
            applyThemeAndShowIcon('auto');
        }
    });

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                updateAutoIconImage(); 
            }
        });
    });

    if (header) {
        observer.observe(header, { attributes: true });
    }

    // Menú
    const menu = document.querySelector('#navbartogglermv');
    const navLinks = document.querySelectorAll('#navbartogglermv .navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menuToggle = document.querySelector('.navbar-toggler[data-bs-toggle="collapse"]');
            if (menuToggle && menu.classList.contains('show')) {
                menuToggle.click();
            }
            eliminarOverlay();
        });
    });

    const agregarOverlay = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('pantalla-completa');
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
            const menuToggle = document.querySelector('.navbar-toggler[data-bs-toggle="collapse"]');
            if (menuToggle && menu.classList.contains('show')) {
                menuToggle.click();
            }
            eliminarOverlay();
        });
    };

    const eliminarOverlay = () => {
        const overlay = document.querySelector('.pantalla-completa');
        if (overlay) {
            overlay.remove();
        }
    };

    if (menu) {
        menu.addEventListener('shown.bs.collapse', agregarOverlay);
        menu.addEventListener('hidden.bs.collapse', eliminarOverlay);
    }
});

// JS para el carrito

document.addEventListener('DOMContentLoaded', function() {
    const cartQuantitySpan = document.getElementById('cantidad-carrito');

    window.updateCartQuantity = function() {
        const cartItems = localStorage.getItem('cartItems');
        const quantity = cartItems ? JSON.parse(cartItems).reduce((sum, item) => sum + item.quantity, 0) : 0;
        if (cartQuantitySpan) {
            cartQuantitySpan.textContent = quantity;
        }
    };

    window.updateCartQuantity();

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productId = this.dataset.productId;
            const productName = this.dataset.productName;
            const productPrice = parseFloat(this.dataset.productPrice);
            const productImage = this.dataset.productImage; 

            let cartItems = localStorage.getItem('cartItems');
            cartItems = cartItems ? JSON.parse(cartItems) : [];

            const existingItemIndex = cartItems.findIndex(item => item.id === productId);

            if (existingItemIndex > -1) {
                cartItems[existingItemIndex].quantity++;
            } else {
                cartItems.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    productImage: productImage, 
                    quantity: 1
                });
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            window.updateCartQuantity();

            const originalHTML = this.innerHTML;
            this.classList.add('adding-to-cart');
            this.textContent = 'Added!';
            setTimeout(() => {
                this.classList.remove('adding-to-cart');
                this.innerHTML = originalHTML;
            }, 1500);
        });
    });

    const cartTableBody = document.querySelector('#carrito-table');

    if (cartTableBody) {
        cartTableBody.addEventListener('click', function(event) {
            const target = event.target;
            if (target.classList.contains('bin-button') || target.closest('.bin-button')) {
                const button = target.closest('.bin-button');
                if (button && button.dataset.productId) {
                    const productIdToRemove = button.dataset.productId;
                    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                    cartItems = cartItems.filter(item => item.id !== productIdToRemove);
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    window.updateCartQuantity();
                    if (typeof renderCart === 'function') {
                        renderCart();
                    }
                }
            }
        });
    }
});