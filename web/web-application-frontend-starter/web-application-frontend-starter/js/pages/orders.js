function renderOrdersPage() {
    const appContainer = document.getElementById('app-container');

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders.length === 0) {
        appContainer.innerHTML = `
            <div class="text-center mt-5">
                <h3>No orders yet</h3>
                <p>Your orders will appear here after checkout</p>
            </div>
        `;
        return;
    }

    appContainer.innerHTML = `
        <div class="container">
            <h2 class="mb-4">Orders History</h2>

            ${orders.map(order => `
                <div class="card mb-3 shadow-sm">
                    <div class="card-body">

                        <div class="d-flex justify-content-between align-items-center">
                            <h5>Order #${order.id}</h5>
                            <span class="text-muted">
                                ${new Date(order.date).toLocaleString()}
                            </span>
                        </div>

                        <hr>

                        <ul class="list-group mb-3">
                            ${order.items.map(item => `
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>
                                        ${item.name} × ${item.quantity}
                                    </span>
                                    <strong>
                                        ${(item.price * item.quantity).toFixed(2)} zł
                                    </strong>
                                </li>
                            `).join('')}
                        </ul>

                        <h5 class="text-end">
                            Total: ${order.total.toFixed(2)} zł
                        </h5>

                    </div>
                </div>
            `).join('')}

        </div>
    `;
}