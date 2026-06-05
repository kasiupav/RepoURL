export function renderHomePage() {
    const appContainer = document.getElementById('app-container');

    appContainer.innerHTML = `
        <section class="text-center p-5 bg-light rounded shadow">

            <h1 class="display-4 text-danger mb-4">
                B2B Asian Food Ingredient Platform
            </h1>

            <p class="lead mb-4">
                Wholesale platform for restaurants and food businesses.
                Order ingredients, manage supplies and streamline your operations.
            </p>

            <div class="d-flex justify-content-center gap-3">

                <button class="btn btn-danger btn-lg"
                    onclick="navigateTo('products')">
                    Browse Products
                </button>

                <button class="btn btn-outline-dark btn-lg"
                    onclick="navigateTo('orders')">
                    View Orders
                </button>

            </div>

        </section>
    `;
}