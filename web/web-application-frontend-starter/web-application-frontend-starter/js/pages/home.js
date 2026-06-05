function renderHomePage() {
    const appContainer = document.getElementById('app-container');

    const reviews = typeof getReviews === 'function' ? getReviews() : [];

    appContainer.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-9">

                <div class="card text-center shadow-sm">
                    <div class="card-body">

                        <h1 class="mb-3">OrientMarket</h1>

                        <p class="text-muted">
                            B2B Wholesale Marketplace for Asian Food Ingredients.
                            A centralized platform connecting suppliers, warehouses, and restaurant businesses.
                        </p>

                        <div class="row mt-4">

                            <div class="col-md-6">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h5>Product Catalog</h5>
                                        <p class="text-muted">Browse and filter products</p>
                                        <button class="btn btn-primary" id="go-products">
                                            View Products
                                        </button>
                                    </div>
                                </div>
                            </div>

                            ${isAdmin() ? `
                            <div class="col-md-6">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h5>Management Panel</h5>
                                        <p class="text-muted">Create and manage products</p>
                                        <button class="btn btn-success" id="go-create">
                                            Create Product
                                        </button>
                                    </div>
                                </div>
                            </div>
                            ` : ''}

                        </div>

                        <button class="btn btn-dark mt-4" id="go-analytics">
                            Analytics Dashboard
                        </button>

                        ${isAdmin() ? `
                        <button class="btn btn-warning mt-3" id="go-admin">
                            Admin Panel
                        </button>
                        ` : ''}

                        <div class="mt-3">
                            <button class="btn btn-outline-dark" id="switch-role">
                                Switch Role
                            </button>
                        </div>

                    </div>
                </div>

                
                <div class="mt-5 text-center">
                    <h3 class="mb-4">What Our Clients Say</h3>

                    <div class="card shadow-sm p-5">
                        <div id="reviewBox">

                            <div class="mb-3 text-warning fs-5" id="reviewStars"></div>
                            <p class="fs-5 mb-4" id="reviewText"></p>

                            <h6 class="mb-1" id="reviewName"></h6>
                            <small class="text-muted" id="reviewCompany"></small>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;


    document.getElementById('go-products').onclick = () => navigateTo('products');

    if (document.getElementById('go-create')) {
        document.getElementById('go-create').onclick = () => navigateTo('create');
    }

    if (document.getElementById('go-admin')) {
        document.getElementById('go-admin').onclick = () => navigateTo('admin');
    }

    document.getElementById('go-analytics').onclick = () => navigateTo('analytics');


    document.getElementById('switch-role').onclick = () => {
        currentUser.role = currentUser.role === 'admin' ? 'customer' : 'admin';
        showSuccess("Role switched to: " + currentUser.role);
        renderHomePage();
    };


    setTimeout(() => {
        if (typeof initAutoReviewsSlider === "function") {
            initAutoReviewsSlider(reviews);
        }
    }, 50);
}