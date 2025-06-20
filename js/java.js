const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {        document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);


document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.navbar-toggler');
    const menu = document.querySelector('#navbarTogglerDemo02');
    const iconExpand = document.querySelector('.icon-expand'); 
    const iconClose = document.querySelector('.icon-close'); 

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            cerrarMenu();
        } else {
            abrirMenu();
        }
    });

    const abrirMenu = () => {
        menu.classList.add('show');
        menuToggle.setAttribute('aria-expanded', 'true');
        agregarOverlay();
        iconExpand.style.display = 'none'; 
        iconClose.style.display = 'block';
    };

    const cerrarMenu = () => {
        menu.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
        eliminarOverlay();
        iconExpand.style.display = 'block';
        iconClose.style.display = 'none'; 
    };

    const agregarOverlay = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('pantalla-completa');
        document.body.appendChild(overlay);

        overlay.addEventListener('click', cerrarMenu);
    };

    const eliminarOverlay = () => {
        const overlay = document.querySelector('.pantalla-completa');
        if (overlay) {
            overlay.remove();
        }
    };
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
});

document.addEventListener('DOMContentLoaded', function() {
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