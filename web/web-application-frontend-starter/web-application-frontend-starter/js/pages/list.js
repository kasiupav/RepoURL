function renderListPage() {
    const appContainer = document.getElementById('app-container');

    const defaultProducts = [
        {
            id: 1,
            name: "Sushi Rice",
            price: 50,
            weight: "1 kg",
            origin: "Japan",
            quality: "Premium grade",
            category: "Rice"
        },
        {
            id: 2,
            name: "Jasmine Rice",
            price: 40,
            weight: "1 kg",
            origin: "Thailand",
            quality: "Fragrant",
            category: "Rice"
        },
        {
            id: 3,
            name: "Brown Rice",
            price: 35,
            weight: "1 kg",
            origin: "Vietnam",
            quality: "Organic",
            category: "Rice"
        },
        {
            id: 4,
            name: "Soy Sauce",
            price: 20,
            weight: "500 ml",
            origin: "China",
            quality: "Traditional brewing",
            category: "Sauces"
        },
        {
            id: 5,
            name: "Teriyaki Sauce",
            price: 25,
            weight: "400 ml",
            origin: "Japan",
            quality: "Sweet & savory",
            category: "Sauces"
        },
        {
            id: 6,
            name: "Rice Vinegar",
            price: 18,
            weight: "300 ml",
            origin: "Japan",
            quality: "Mild acidity",
            category: "Sauces"
        },
        {
            id: 7,
            name: "Nori Sheets",
            price: 35,
            weight: "50 pcs",
            origin: "Japan",
            quality: "A-grade",
            category: "Seafood"
        },
        {
            id: 8,
            name: "Salmon Fillet",
            price: 90,
            weight: "1 kg",
            origin: "Norway",
            quality: "Fresh",
            category: "Seafood"
        },
        {
            id: 9,
            name: "Tuna",
            price: 85,
            weight: "1 kg",
            origin: "Spain",
            quality: "Sushi grade",
            category: "Seafood"
        },
        {
            id: 10,
            name: "Shiitake Mushrooms",
            price: 30,
            weight: "200 g",
            origin: "China",
            quality: "Dried",
            category: "Vegetables"
        },
        {
            id: 11,
            name: "Spring Onion",
            price: 12,
            weight: "100 g",
            origin: "Poland",
            quality: "Fresh",
            category: "Vegetables"
        },
        {
            id: 12,
            name: "Ginger",
            price: 10,
            weight: "150 g",
            origin: "India",
            quality: "Aromatic",
            category: "Vegetables"
        }
    ];


    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }

    let products = JSON.parse(localStorage.getItem('products'));

    appContainer.innerHTML = `
        <section class="food_section">
            <div class="container">

                <div class="text-center mb-5">
                    <h2>OrientMarket Products</h2>
                    <p>Wholesale ingredients for restaurants & businesses</p>
                </div>

                <div class="row mb-4">
                    <div class="col-md-6">
                        <input type="text" id="searchInput" class="form-control" placeholder="Search products..."/>
                    </div>

                    <div class="col-md-6">
                        <select id="categoryFilter" class="form-select">
                            <option value="all">All categories</option>
                            <option value="Rice">Rice</option>
                            <option value="Sauces">Sauces</option>
                            <option value="Seafood">Seafood</option>
                            <option value="Vegetables">Vegetables</option>
                        </select>
                    </div>
                </div>

                <div class="row" id="productList"></div>

            </div>
        </section>
    `;

    function renderProducts(list) {
        const container = document.getElementById('productList');

        container.innerHTML = list.map(p => {

            const image = (p.images && p.images.length > 0)
                ? p.images[0]
                : "assets/img/no-image.png";

            return `
                <div class="col-md-4 mb-4">
                    <div class="box p-3 h-100 shadow-sm">

                        <img src="${image}"
                             class="img-fluid mb-3"
                             onerror="this.src='assets/img/no-image.png'"
                             style="height:200px; width:100%; object-fit:cover; border-radius:10px;" alt="">

                        <div class="text-center">
                            <h5>${p.name}</h5>
                            <p class="text-muted">${p.quality}</p>
                            <span class="badge bg-secondary">${p.category}</span>
                        </div>

                        <hr>

                        <div class="px-2">
                            <p><strong>Weight:</strong> ${p.weight}</p>
                            <p><strong>Origin:</strong> ${p.origin}</p>
                        </div>

                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <h6>${p.price} zł</h6>

                            <div>
                                <button class="btn btn-sm btn-outline-dark me-2"
                                    onclick="navigateTo('details', {id: ${p.id}})">
                                    Details
                                </button>

                                <button class="btn btn-sm btn-danger"
                                    onclick="addToCart(${p.id})">
                                    Add
                                </button>

                                ${isAdmin() ? `
                                    <button class="btn btn-sm btn-warning ms-1"
                                        onclick="editProduct(${p.id})">
                                        Edit
                                    </button>
                                ` : ''}
                            </div>
                        </div>

                    </div>
                </div>
            `;
        }).join('');
    }

    renderProducts(products);

    function applyFilters() {
        const searchValue = document.getElementById('searchInput').value.toLowerCase();
        const categoryValue = document.getElementById('categoryFilter').value;

        let filtered = products.filter(p =>
            p.name.toLowerCase().includes(searchValue)
        );

        if (categoryValue !== 'all') {
            filtered = filtered.filter(p => p.category === categoryValue);
        }

        renderProducts(filtered);
    }

    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('categoryFilter').addEventListener('change', applyFilters);
}