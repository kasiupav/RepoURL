function renderEditPage(params) {
    const id = params?.id;
    const appContainer = document.getElementById('app-container');
    const isCreate = !id;

    appContainer.innerHTML = `
        <h2>${isCreate ? 'Create Product' : 'Edit Product'}</h2>

        <button class="btn btn-secondary mb-3" id="back-btn">
            Back
        </button>

        <div id="form-container"></div>
    `;

    document.getElementById('back-btn').onclick = () => {
        navigateTo('products');
    };

    if (isCreate) {
        renderForm();
    } else {
        ApiService.getProductById(id).then(product => {
            renderForm(product);
        });
    }
}

function renderForm(product = {}) {
    const container = document.getElementById('form-container');

    container.innerHTML = `
        <form id="product-form">
            <input class="form-control mb-2" name="name" placeholder="Name" value="${product.name || ''}" required />
            <input class="form-control mb-2" name="category" placeholder="Category" value="${product.category || ''}" />
            <input class="form-control mb-2" name="price" placeholder="Price" value="${product.price || ''}" />
            <textarea class="form-control mb-2" name="description">${product.description || ''}</textarea>

            <button class="btn btn-success">Save</button>
        </form>
    `;

    document.getElementById('product-form').onsubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            name: formData.get('name'),
            category: formData.get('category'),
            price: formData.get('price'),
            description: formData.get('description')
        };

        if (product.id) {
            ApiService.updateProduct(product.id, data)
                .then(() => {
                    showSuccess('Updated');
                    navigateTo('products');
                });
        } else {
            ApiService.createProduct(data)
                .then(() => {
                    showSuccess('Created');
                    navigateTo('products');
                });
        }
    };
}