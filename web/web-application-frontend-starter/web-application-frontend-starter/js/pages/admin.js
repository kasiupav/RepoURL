
function renderAdminPage() {
    const appContainer = document.getElementById('app-container');

    appContainer.innerHTML = `
        <div class="container">
            <h2 class="mb-4">Admin Panel</h2>

            <div class="row">

                <div class="col-md-4">
                    <div class="card p-3 mb-3">
                        <h5>Manage Products</h5>
                        <button class="btn btn-primary" id="admin-products">Open</button>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card p-3 mb-3">
                        <h5>Orders</h5>
                        <button class="btn btn-primary" id="admin-orders">Open</button>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card p-3 mb-3">
                        <h5>Users</h5>
                        <button class="btn btn-primary" id="admin-users">Open</button>
                    </div>
                </div>

            </div>
        </div>
    `;


    document.getElementById('admin-products').onclick = renderAdminProducts;
    document.getElementById('admin-orders').onclick = renderAdminOrders;
    document.getElementById('admin-users').onclick = renderAdminUsers;
}


function renderAdminProducts() {
    const appContainer = document.getElementById('app-container');

    appContainer.innerHTML = `
        <h2>Manage Products</h2>

        <button class="btn btn-success mb-3" onclick="addFakeProduct()">
            + Add Product
        </button>

        <div id="admin-product-list"></div>

        <button class="btn btn-secondary mt-3" data-route="admin">
            ← Back
        </button>
    `;

    const list = document.getElementById('admin-product-list');

    list.innerHTML = defaultProducts.map(p => `
        <div class="card p-2 mb-2 d-flex justify-content-between">
            ${p.name} - ${p.price} zł
            <button class="btn btn-danger btn-sm"
                onclick="deleteProduct(${p.id})">
                Delete
            </button>
        </div>
    `).join('');
}

function deleteProduct(id) {
    const index = defaultProducts.findIndex(p => p.id === id);

    if (index !== -1) {
        defaultProducts.splice(index, 1);
        renderAdminProducts();
    }
}

function addFakeProduct() {
    defaultProducts.push({
        id: Date.now(),
        name: "New Product",
        price: 99,
        weight: "1kg",
        origin: "Test",
        quality: "Test",
        description: "Test product",
        reviews: []
    });

    renderAdminProducts();
}


function renderAdminOrders() {
    const appContainer = document.getElementById('app-container');

    appContainer.innerHTML = `
        <h2>Orders</h2>

        <div class="card p-3 mb-2">Order #1 - Sushi Rice</div>
        <div class="card p-3 mb-2">Order #2 - Salmon</div>

        <button class="btn btn-secondary mt-3" data-route="admin">
            ← Back
        </button>
    `;
}


function renderAdminUsers() {
    const appContainer = document.getElementById('app-container');

    appContainer.innerHTML = `
        <h2>Users</h2>

        <div class="card p-3 mb-2">Admin (role: admin)</div>
        <div class="card p-3 mb-2">Client (role: customer)</div>

        <button class="btn btn-secondary mt-3" data-route="admin">
            ← Back
        </button>
    `;
}