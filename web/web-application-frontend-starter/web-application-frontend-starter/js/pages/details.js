
const defaultProducts = [
    {
        id: 1,
        name: "Sushi Rice",
        price: 50,
        weight: "1 kg",
        origin: "Japan",
        quality: "Premium grade",
        description: "Short-grain rice perfect for sushi",
        reviews: [
            { name: "Anna", rating: 5, text: "Perfect for sushi!" },
            { name: "Chef K.", rating: 4, text: "Very good quality" }
        ]
    },
    {
        id: 2,
        name: "Jasmine Rice",
        price: 40,
        weight: "1 kg",
        origin: "Thailand",
        quality: "Fragrant",
        description: "Aromatic rice",
        reviews: []
    },
    {
        id: 3,
        name: "Brown Rice",
        price: 35,
        weight: "1 kg",
        origin: "Vietnam",
        quality: "Organic",
        description: "Healthy whole grain rice",
        reviews: [
            { name: "Eva", rating: 5, text: "Very healthy!" }
        ]
    },
    {
        id: 4,
        name: "Soy Sauce",
        price: 20,
        weight: "500 ml",
        origin: "China",
        quality: "Traditional brewing",
        description: "Classic soy sauce.",
        reviews: [
            { name: "John", rating: 5, text: "Perfect taste" }
        ]
    },
    {
        id: 5,
        name: "Teriyaki Sauce",
        price: 25,
        weight: "400 ml",
        origin: "Japan",
        quality: "Sweet & savory",
        description: "Sweet Japanese sauce",
        reviews: []
    },
    {
        id: 6,
        name: "Rice Vinegar",
        price: 18,
        weight: "300 ml",
        origin: "Japan",
        quality: "Mild acidity",
        description: "Mild vinegar for sushi",
        reviews: [
            { name: "Chef A.", rating: 4, text: "Works great" }
        ]
    },
    {
        id: 7,
        name: "Nori Sheets",
        price: 35,
        weight: "50 pcs",
        origin: "Japan",
        quality: "A-grade",
        description: "Seaweed sheets",
        reviews: []
    },
    {
        id: 8,
        name: "Salmon Fillet",
        price: 90,
        weight: "1 kg",
        origin: "Norway",
        quality: "Fresh",
        description: "Premium salmon",
        reviews: [
            { name: "Chef Lee", rating: 5, text: "Best salmon!" },
            { name: "Anna", rating: 4, text: "Very fresh" }
        ]
    },
    {
        id: 9,
        name: "Tuna",
        price: 85,
        weight: "1 kg",
        origin: "Spain",
        quality: "Sushi grade",
        description: "High quality tuna",
        reviews: []
    },
    {
        id: 10,
        name: "Shiitake Mushrooms",
        price: 30,
        weight: "200 g",
        origin: "China",
        quality: "Dried",
        description: "Rich umami mushrooms",
        reviews: [
            { name: "Lara", rating: 4, text: "Great in soups" }
        ]
    },
    {
        id: 11,
        name: "Spring Onion",
        price: 12,
        weight: "100 g",
        origin: "Poland",
        quality: "Fresh",
        description: "Fresh green onions",
        reviews: []
    },
    {
        id: 12,
        name: "Ginger",
        price: 10,
        weight: "150 g",
        origin: "India",
        quality: "Aromatic",
        description: "Fresh ginger",
        reviews: [
            { name: "Anna", rating: 5, text: "Very aromatic!" }
        ]
    }
];



function renderDetailsPage(id) {
    if (!id) {
        showError('Product ID is required');
        navigateTo('products');
        return;
    }

    const appContainer = document.getElementById('app-container');

    appContainer.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Product Details</h2>

            <div>
                <button class="btn btn-secondary me-2" id="back-btn">
                    ← Back
                </button>

                ${isAdmin() ? `
                    <button class="btn btn-primary" id="edit-btn">
                        Edit
                    </button>
                ` : ''}
            </div>
        </div>

        <div id="product-details-container"></div>
    `;

    document.getElementById('back-btn').onclick = () => navigateTo('products');

    if (isAdmin()) {
        document.getElementById('edit-btn').onclick = () => {
            navigateTo('edit', { id });
        };
    }

    loadProductDetails(id);
}



function getStars(rating) {
    return '⭐'.repeat(rating);
}

function getAverageRating(reviews) {
    if (!reviews.length) return 0;
    return (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
}



function loadProductDetails(id) {
    const container = document.getElementById('product-details-container');

    const product = defaultProducts.find(p => p.id == id);

    if (!product) {
        container.innerHTML = `<p class="text-danger">Product not found</p>`;
        return;
    }

    const avg = getAverageRating(product.reviews);

    container.innerHTML = `
        <div class="card mb-4 shadow">
            <div class="card-body">

                <h3>${product.name}</h3>
                <p class="text-muted">${product.quality}</p>

                <p><strong>Rating:</strong> 
                    ${avg > 0 ? avg + " ⭐ (" + product.reviews.length + ")" : "No rating"}
                </p>

                <hr>

                <p><strong>Description:</strong> ${product.description}</p>
                <p><strong>Weight:</strong> ${product.weight}</p>
                <p><strong>Origin:</strong> ${product.origin}</p>
                <p><strong>Price:</strong> ${product.price} zł</p>

                <button class="btn btn-danger mt-3" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>

        <div class="card shadow">
            <div class="card-body">
                <h4>Customer Reviews</h4>

                ${
        product.reviews.length
            ? product.reviews.map(r => `
                            <div class="border rounded p-2 mb-2">
                                <strong>${r.name}</strong> ${getStars(r.rating)}
                                <p>${r.text}</p>
                            </div>
                        `).join('')
            : `<p class="text-muted">No reviews yet</p>`
    }

                <hr>

                <h5>Add Review</h5>

                <input class="form-control mb-2" id="review-name" placeholder="Your name">
                <input class="form-control mb-2" id="review-rating" type="number" min="1" max="5">
                <textarea class="form-control mb-2" id="review-text"></textarea>

                <button class="btn btn-primary" onclick="addReview(${product.id})">
                    Submit Review
                </button>
            </div>
        </div>
    `;
}


// ===== ADD REVIEW =====
function addReview(productId) {
    const name = document.getElementById('review-name').value;
    const rating = +document.getElementById('review-rating').value;
    const text = document.getElementById('review-text').value;

    if (!name || !rating || !text) {
        showError("Fill all fields!");
        return;
    }

    const product = defaultProducts.find(p => p.id == productId);

    product.reviews.push({ name, rating, text });

    showSuccess("Review added!");

    loadProductDetails(productId);
}