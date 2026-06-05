
window.renderListPage = async function() {
    const appContainer = document.getElementById('app-container');
    let products = [];

    try {
        products = await ApiService.getAllProducts();
    } catch (e) {
        products = [
            {id: 1, name: "Sushi Rice", category: "Rice", price: "50 zł", weight: "1 kg", origin: "Japan"},
            {id: 2, name: "Jasmine Rice", category: "Rice", price: "40 zł", weight: "1 kg", origin: "Thailand"},
            {id: 3, name: "Brown Rice", category: "Rice", price: "35 zł", weight: "1 kg", origin: "Vietnam"},
            {id: 4, name: "Soy Sauce", category: "Sauces", price: "20 zł", weight: "500 ml", origin: "China"},
            {id: 5, name: "Teriyaki Sauce", category: "Sauces", price: "25 zł", weight: "400 ml", origin: "Japan"},
            {id: 6, name: "Rice Vinegar", category: "Sauces", price: "18 zł", weight: "300 ml", origin: "Japan"},
            {id: 7, name: "Nori Sheets", category: "Seafood", price: "35 zł", weight: "50 pcs", origin: "Japan"},
            {id: 8, name: "Salmon Fillet", category: "Seafood", price: "90 zł", weight: "1 kg", origin: "Norway"},
            {id: 9, name: "Tuna", category: "Seafood", price: "85 zł", weight: "1 kg", origin: "Spain"},
            {id: 10, name: "Shiitake Mushrooms", category: "Vegetables", price: "30 zł", weight: "200 g", origin: "China"},
            {id: 11, name: "Spring Onion", category: "Vegetables", price: "12 zł", weight: "100 g", origin: "Poland"},
            {id: 12, name: "Ginger", category: "Vegetables", price: "10 zł", weight: "150 g", origin: "India"}
        ];
    }

    let html = `
        <section class="container mt-5">
            <h1 class="text-center mb-5" style="color: #dc3545; font-weight: bold;">OrientMarket Products</h1>
            <div class="row g-4">
    `;

    products.forEach(product => {
        html += `
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card h-100 shadow-sm border-0" style="border-radius: 15px; overflow: hidden; border-top: 4px solid #dc3545 !important;">
                    <div class="card-body text-center d-flex flex-column justify-content-between">
                        <div>
                            <div class="my-3 text-danger">
                                <i class="bi bi-box-seam" style="font-size: 2.5rem;"></i>
                            </div>
                            <span class="badge bg-secondary mb-2">${product.category}</span>
                            <h5 class="fw-bold text-dark">${product.name}</h5>
                            <p class="text-muted small mb-3">${product.weight || ''} | Origin: ${product.origin || '-'}</p>
                        </div>
                        <div>
                            <h4 class="text-danger fw-bold mb-3">${product.price}</h4>
                            <div class="d-grid gap-2">
                                <button class="btn btn-danger btn-sm rounded-pill">
                                    <i class="bi bi-cart-plus me-1"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    html += `</div></section>`;
    appContainer.innerHTML = html;
};