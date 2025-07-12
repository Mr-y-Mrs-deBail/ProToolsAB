document.addEventListener('DOMContentLoaded', function() {
    const cartQuantitySpan = document.getElementById('cantidad-carrito');
    const cartTableBody = document.querySelector('#carrito-table');
    const subtotalElement = document.querySelector('#subtotal');
    const totalElement = document.querySelector('#total');
    const productContainer = document.querySelector('.gallery_agile.row');
    const updateCartButton = document.getElementById('update-cart-button');
    const couponInput = document.getElementById('coupon');
    const applyCouponButton = document.getElementById('apply-coupon-button');
    const discountRow = document.getElementById('discount-row');
    const discountAmountElement = document.getElementById('discount-amount');
    const proceedToCheckoutButton = document.getElementById('proceed-to-checkout-button');
    const continueShoppingContainer = document.querySelector('.continuarshop');

    let discountApplied = false;
    const couponCode = "SeñorUvita";
    const discountPercentage = 0.20;

    function toggleContinueShoppingLink(show) {
        if (continueShoppingContainer) {
            continueShoppingContainer.style.display = show ? 'block' : 'none';
        }
    }

    function updateCartQuantity() {
        const cartItems = localStorage.getItem('cartItems');
        const quantity = cartItems ? JSON.parse(cartItems).reduce((sum, item) => sum + item.quantity, 0) : 0;
        if (cartQuantitySpan) {
            cartQuantitySpan.classList.add('updating');
            setTimeout(() => {
                cartQuantitySpan.textContent = quantity;
                cartQuantitySpan.classList.remove('updating');
            }, 100);
        }
    }

    window.updateCartQuantity = updateCartQuantity;

    function addToCart(productId, productName, productPrice, productImage) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem) {
            Swal.fire({
                icon: 'info',
                title: 'Product already in cart',
                text: `"${productName}" is already in your cart.`,
                showConfirmButton: false,
                timer: 1500
            });
            return;
        } else {
            cartItems.push({
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                productImage: productImage,
                quantity: 1
            });
            Swal.fire({
                icon: 'success',
                title: 'Product Added!',
                text: `"${productName}" has been added to your cart.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartQuantity();
        if (cartTableBody) {
            renderCart();
        }
    }

    window.renderCart = function() {
        if (!cartTableBody) return; 

        cartTableBody.innerHTML = '';
        let subtotal = 0;
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        if (cartItems.length === 0) {
            const emptyRow = cartTableBody.insertRow();
            emptyRow.innerHTML = `
            <td colspan="4" class="text-center py-5">
                <p class="lead text-muted mb-3">Your cart is empty.</p>
                <p class="text-muted small mb-4">Add some products to start shopping!</p>
                <a href="index.html" class="shop-now-btn">
                    <span class="toreturn"><i class="bi bi-shop me-2"></i>Shop Now</span>
                </a>
            </td>
            `;
            if (subtotalElement) {
                subtotalElement.textContent = '$0.00';
            }
            if (totalElement) {
                totalElement.textContent = '$0.00';
            }
            if (discountRow) {
                discountRow.style.display = 'none';
            }
            if (discountAmountElement) {
                discountAmountElement.textContent = '-$0.00';
            }
            updateCartQuantity();
            toggleContinueShoppingLink(false);
            return;
        }

        toggleContinueShoppingLink(true);

        cartItems.forEach(item => {
            const row = cartTableBody.insertRow();

            const imageCell = row.insertCell();
            const img = document.createElement('img');
            img.src = item.productImage;
            img.alt = item.name;
            img.classList.add('img-fluid', 'img-thumbnail');
            imageCell.appendChild(img);
            imageCell.classList.add('product-thumbnail', 'text-center');

            const infoCell = row.insertCell();
            const nameElement = document.createElement('span');
            nameElement.textContent = item.name;
            nameElement.classList.add('h5', 'text-black');

            const priceElement = document.createElement('div');
            priceElement.textContent = '$' + item.price.toFixed(2);
            priceElement.classList.add('price-display');

            infoCell.appendChild(nameElement);
            infoCell.classList.add('product-info', 'text-center');

            const quantityRemoveCell = row.insertCell();
            quantityRemoveCell.classList.add('product-quantity-remove', 'text-center');
            const quantityContainer = document.createElement('div');
            quantityContainer.classList.add('quantity-container');
            const decreaseButton = document.createElement('button');
            decreaseButton.classList.add('quantity-button', 'decrease-button');
            decreaseButton.textContent = '-';
            decreaseButton.dataset.productId = item.id;
            const quantityDisplay = document.createElement('span');
            quantityDisplay.textContent = item.quantity;
            quantityDisplay.classList.add('quantity-display');
            const increaseButton = document.createElement('button');
            increaseButton.classList.add('quantity-button', 'increase-button');
            increaseButton.textContent = '+';
            increaseButton.dataset.productId = item.id;
            quantityContainer.appendChild(decreaseButton);
            quantityContainer.appendChild(quantityDisplay);
            quantityContainer.appendChild(increaseButton);

            const removeButton = document.createElement('button');
            removeButton.classList.add('bin-button');
            removeButton.dataset.productId = item.id;
            removeButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 39 7" class="bin-top">
                    <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                    <line stroke-width="3" stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1="12"></line>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 39" class="bin-bottom">
                    <mask fill="white" id="path-1-inside-1_8_19">
                        <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                    </mask>
                    <path mask="url(#path-1-inside-1_8_19)" fill="white" d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"></path>
                    <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                    <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 89 80" class="garbage">
                    <path fill="white" d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"></path>
                </svg>
            `;
            quantityRemoveCell.appendChild(quantityContainer);
            quantityRemoveCell.appendChild(removeButton);

            const totalCell = row.insertCell();
            const itemTotal = item.price * item.quantity;
            totalCell.textContent = '$' + itemTotal.toFixed(2);
            totalCell.classList.add('product-total', 'text-center');
            subtotal += itemTotal;
        });

        if (subtotalElement) {
            subtotalElement.textContent = '$' + subtotal.toFixed(2);
        }

        let finalTotal = subtotal;
        if (discountApplied) {
            const discountAmount = subtotal * discountPercentage;
            finalTotal = subtotal - discountAmount;
            if (discountRow) discountRow.style.display = 'flex';
            if (discountAmountElement) discountAmountElement.textContent = '-$' + discountAmount.toFixed(2);
        } else {
            if (discountRow) discountRow.style.display = 'none';
            if (discountAmountElement) discountAmountElement.textContent = '-$0.00';
        }

        if (totalElement) {
            totalElement.textContent = '$' + finalTotal.toFixed(2);
        }

        updateCartQuantity();
    };

    window.clearCartAndResetTotals = function() {
        localStorage.removeItem('cartItems');
        discountApplied = false; 
        if (couponInput) {
            couponInput.value = ''; 
        }
        window.updateCartQuantity(); 
        if (cartTableBody) { 
            window.renderCart();
        } 
    };


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
                    updateCartQuantity();
                    renderCart();
                }
            }
            if (target.classList.contains('quantity-button')) {
                const productId = target.dataset.productId;
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                const itemToUpdate = cartItems.find(item => item.id === productId);
                if (itemToUpdate) {
                    if (target.classList.contains('increase-button')) {
                        itemToUpdate.quantity++;
                    } else if (target.classList.contains('decrease-button') && itemToUpdate.quantity > 1) {
                        itemToUpdate.quantity--;
                    }
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateCartQuantity();
                    const quantityDisplay = target.parentNode.querySelector('.quantity-display');
                    if (quantityDisplay) {
                        quantityDisplay.textContent = itemToUpdate.quantity;
                    }
                    const row = target.closest('tr');
                    if (row) {
                        const totalCell = row.querySelector('.product-total');
                        if (totalCell) {
                            totalCell.textContent = '$' + (itemToUpdate.price * itemToUpdate.quantity).toFixed(2);
                        }
                    }
                    let newSubtotal = 0;
                    cartItems.forEach(item => {
                        newSubtotal += item.price * item.quantity;
                    });
                    if (subtotalElement) {
                        subtotalElement.textContent = '$' + newSubtotal.toFixed(2);
                    }
                    let newFinalTotal = newSubtotal;
                    if (discountApplied) {
                        const discountAmount = newSubtotal * discountPercentage;
                        newFinalTotal = newSubtotal - discountAmount;
                        if (discountAmountElement) discountAmountElement.textContent = '-$' + discountAmount.toFixed(2);
                    }
                    if (totalElement) {
                        totalElement.textContent = '$' + newFinalTotal.toFixed(2);
                    }
                }
            }
        });
    }

    if (productContainer) {
        productContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('add-to-cart-btn')) {
                const button = event.target;
                const productId = button.dataset.productId;
                const productName = button.dataset.productName;
                const productPrice = button.dataset.productPrice;
                const productImage = button.dataset.productImage;
                addToCart(productId, productName, productPrice, productImage);
            }
        });
    }

    if (updateCartButton) {
        updateCartButton.addEventListener('click', function() {
            renderCart();
            console.log("Cart updated!");
        });
    }

    if (applyCouponButton) {
        applyCouponButton.addEventListener('click', function() {
            const enteredCoupon = couponInput.value.trim();

            if (enteredCoupon === couponCode) {
                if (!discountApplied) {
                    discountApplied = true;
                    Swal.fire({
                        icon: 'success',
                        title: '¡Code Confirmed!',
                        text: `You got a ${discountPercentage * 100}% discount on your purchase.`,
                        confirmButtonText: '¡Great!',
                        customClass: {
                            confirmButton: 'confirmbutton'
                        }
                    });
                    renderCart();
                } else {
                    Swal.fire({
                        icon: 'info',
                        title: 'Coupon Already Applied',
                        text: 'This coupon has already been used for your current purchase.',
                        confirmButtonText: 'Got It',
                        customClass: {
                            confirmButton: 'confirmbutton'
                        }
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Code',
                    text: 'The coupon code entered is not valid. Please try again.',
                    confirmButtonText: 'Ok',
                    customClass: {
                        confirmButton: 'confirmbutton'
                    }
                });
                discountApplied = false;
                renderCart();
            }
        });
    }

    if (proceedToCheckoutButton) {
        proceedToCheckoutButton.addEventListener('click', function() {
            Swal.fire({
                title: '¡Thank You For Your Purchase!',
                html: `
                <div class="myhtml"><p>Your order has been processed successfully.</p>
                <p>Soon, we'll be enabling direct payment and shipping options from our platform.</p>
                <p>Come back soon for new offers and products!</p></div>`,
                icon: 'success',
                confirmButtonText: 'Got It',
                allowOutsideClick: false,
                allowEscapeKey: false,
                customClass: {
                confirmButton: 'confirmbutton'
            }
            }).then((result) => {
                if (result.isConfirmed) {
                    window.clearCartAndResetTotals();
                }
            });
        });
    }

    if (cartTableBody) {
        window.renderCart();
    } else {
        window.updateCartQuantity();
    }
});