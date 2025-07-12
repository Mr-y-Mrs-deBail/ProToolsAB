document.addEventListener('DOMContentLoaded', function() {
    const proceedToCheckout = document.getElementById('buynow');

    if (proceedToCheckout) {
        proceedToCheckout.addEventListener('click', function() {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            if (cartItems.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Your cart is empty',
                    text: 'Please add items to your cart before proceeding to checkout.',
                    confirmButtonText: 'Got It',
                    customClass: {
                        confirmButton: 'confirmbutton'
                    }
                });
                return;
            }

            Swal.fire({
                title: '¡Thank You For Your Purchase!',
                html: `
                <div class="myhtml">
                    <p>Your order has been processed successfully.</p>
                    <p>We're actively working to enable direct payment and shipping options on our platform very soon.</p>
                    <p>We appreciate your trust and look forward to serving you again!</p>
                </div>`,
                icon: 'success',
                confirmButtonText: 'Continue Shopping',
                allowOutsideClick: false,
                allowEscapeKey: false,
                customClass: {
                    confirmButton: 'confirmbutton'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    if (typeof window.clearCartAndResetTotals === 'function') {
                        window.clearCartAndResetTotals();
                    } else {
                        localStorage.removeItem('cartItems');
                        if (typeof window.updateCartQuantity === 'function') {
                            window.updateCartQuantity();
                        } else if (document.getElementById('cantidad-carrito')) {
                            document.getElementById('cantidad-carrito').textContent = 0;
                        }
                    }
                }
            });
        });
    }
});