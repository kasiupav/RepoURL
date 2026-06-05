/**
 * Main application script
 * Handles routing and initialization
 */


const appState = {
    currentRoute: 'home',
    params: {}
};

let appContainer = null;


let currentUser = {
    role: 'admin' // admin / customer
};


function isAdmin() {
    return currentUser && currentUser.role === 'admin';
}


function navigateTo(route, params = {}) {


    if (route === 'admin' && !isAdmin()) {
        showError("Access denied");
        return;
    }

    appState.currentRoute = route;
    appState.params = params;

    renderCurrentRoute();
}


function renderCurrentRoute() {
    if (!appContainer) return;

    appContainer.innerHTML = `
        <div class="text-center mt-5">
            <div class="spinner-border"></div>
        </div>
    `;

    setTimeout(() => {
        try {
            switch (appState.currentRoute) {

                case 'home':
                    return renderHomePage?.();

                case 'products':
                    return renderListPage?.();

                case 'details':
                    return renderDetailsPage?.(appState.params.id);

                case 'edit':
                    if (!isAdmin()) {
                        showError("Access denied");
                        return navigateTo('home');
                    }
                    return renderEditPage?.(appState.params);

                case 'create':
                    if (!isAdmin()) {
                        showError("Access denied");
                        return navigateTo('home');
                    }
                    return renderEditPage?.();

                case 'analytics':
                    if (!isAdmin()) {
                        showError("Access denied");
                        return navigateTo('home');
                    }
                    return renderAnalyticsPage?.();

                case 'cart':
                    return renderCartPage?.();

                case 'orders':
                    return renderOrdersPage?.();

                case 'admin':
                    if (!isAdmin()) {
                        showError("Access denied");
                        return navigateTo('home');
                    }
                    return renderAdminPage?.();

                default:
                    return renderNotFoundPage();
            }
        } catch (err) {
            console.error(err);
            showError("Something went wrong while rendering page");
        }
    }, 100);
}


function showError(message) {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error'
    });
}

function showSuccess(message) {
    Swal.fire({
        title: 'Success!',
        text: message,
        icon: 'success'
    });
}

function showToast(message, icon = 'success') {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });
}

function confirmAction(message) {
    return Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then(result => result.isConfirmed);
}


function initApp() {

    appContainer = document.getElementById('app-container');

    if (!appContainer) {
        console.error("app-container not found!");
        return;
    }


    document.addEventListener('click', function (e) {
        const routeElement = e.target.closest('[data-route]');

        if (routeElement) {
            e.preventDefault();
            const route = routeElement.getAttribute('data-route');
            navigateTo(route);
        }
    });

    renderCurrentRoute();

    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
}


function renderNotFoundPage() {
    if (!appContainer) return;

    appContainer.innerHTML = `
        <div class="text-center mt-5">
            <h2>404</h2>
            <p>Page not found</p>
        </div>
    `;
}


function getReviews() {
    return [
        {
            name: "Michael Johnson",
            company: "Sushi Bar Group",
            text: "Reliable supplier with consistent quality and fast delivery.",
            rating: 5
        },
        {
            name: "Anna Kowalska",
            company: "Asian Kitchen Ltd",
            text: "Great platform for wholesale ordering. Very efficient.",
            rating: 5
        },
        {
            name: "David Lee",
            company: "Noodle House Co.",
            text: "Excellent inventory management and analytics tools.",
            rating: 4
        },
        {
            name: "Emma Smith",
            company: "Tokyo Eats",
            text: "Very easy to use and saves a lot of time",
            rating: 5
        },
        {
            name: "Carlos Rivera",
            company: "Zen Food Group",
            text: "Best B2B food platform we have used so far.",
            rating: 5
        }
    ];
}


function initAutoReviewsSlider(reviews) {
    if (!reviews || reviews.length === 0) return;

    let index = 0;

    const textEl = document.getElementById('reviewText');
    const nameEl = document.getElementById('reviewName');
    const companyEl = document.getElementById('reviewCompany');
    const starsEl = document.getElementById('reviewStars');
    const box = document.getElementById('reviewBox');

    function render() {
        const r = reviews[index];

        const name = r.name || "Anonymous";
        const company = r.company || "Client";
        const text = r.text || "Great service!";
        const rating = r.rating || 5;

        box.style.opacity = "0";

        setTimeout(() => {
            textEl.textContent = `"${text}"`;
            nameEl.textContent = name;
            companyEl.textContent = company;

            starsEl.innerHTML =
                "★".repeat(rating) + "☆".repeat(5 - rating);

            box.style.opacity = "1";
        }, 200);
    }

    function next() {
        index = (index + 1) % reviews.length;
        render();
    }

    render();
    setInterval(next, 4000);
}

const user = JSON.parse(localStorage.getItem("user"));

if (user && (user.role === "ADMIN" || user.role === "MANAGER")) {
    document.getElementById("analyticsBtn").style.display = "block";
}

document.addEventListener('DOMContentLoaded', initApp);