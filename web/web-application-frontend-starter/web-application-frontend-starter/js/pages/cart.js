function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);

    if (!product) return;

    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();
    showToast("Product added to cart");
}


function renderCartPage() {
    const appContainer = document.getElementById('app-container');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        appContainer.innerHTML = `
            <div class="text-center mt-5">
                <div class="card shadow-sm p-5">
                    <h3 class="mb-3"> Cart is empty</h3>
                    <p class="text-muted">Add products from catalog to start order</p>
                    <button class="btn btn-primary" onclick="navigateTo('products')">
                        Browse Products
                    </button>
                </div>
            </div>
        `;
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    appContainer.innerHTML = `
        <div class="container">
            <h2 class="mb-4">Your Cart</h2>

            ${cart.map(item => `
                <div class="card mb-3 p-3 d-flex justify-content-between flex-row align-items-center">
                    <div>
                        <h5>${item.name}</h5>
                        <p>${item.quantity} × ${item.price} zł</p>
                    </div>

                    <div>
                        <strong>${(item.price * item.quantity).toFixed(2)} zł</strong>

                        <button class="btn btn-sm btn-danger ms-3"
                            onclick="removeFromCart(${item.id})">
                            Remove
                        </button>
                    </div>
                </div>
            `).join('')}

            <h3 class="mt-4">Total: ${total.toFixed(2)} zł</h3>

            <button class="btn btn-success mt-3" onclick="checkout()">
                Checkout
            </button>
        </div>
    `;
}



function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));

    renderCartPage();
    updateCartCount();

    showToast("Item removed from cart");
}



function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) return;

    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = {
        id: Date.now(),
        items: cart,
        total: total,
        date: new Date().toISOString()
    };

    orders.push(newOrder);

    localStorage.setItem('orders', JSON.stringify(orders));

    localStorage.removeItem('cart');

    updateCartCount();

    showToast("Order placed successfully!");

    navigateTo('home');
}



function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const el = document.getElementById('cart-count');

    if (el) el.innerText = count;
}