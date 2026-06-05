function renderAnalyticsPage() {
    const appContainer = document.getElementById('app-container');

    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (!products.length) {
        appContainer.innerHTML = `
            <div class="text-center mt-5">
                <h3>No data available</h3>
                <p>Add some products first</p>
            </div>
        `;
        return;
    }


    const totalProducts = products.length;

    const totalValue = products.reduce((sum, p) => sum + Number(p.price), 0);

    const avgPrice = (totalValue / totalProducts).toFixed(2);

    const maxPrice = Math.max(...products.map(p => Number(p.price)));
    const minPrice = Math.min(...products.map(p => Number(p.price)));


    const topProduct = products.reduce((max, p) =>
        Number(p.price) > Number(max.price) ? p : max
    );


    const categoryCounts = {};
    products.forEach(p => {
        const cat = p.category || "Other";
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const categoriesCount = Object.keys(categoryCounts).length;


    const salesData = [12, 19, 8, 15, 22, 30, 18];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


    appContainer.innerHTML = `
        <div class="container">

            <h2 class="mb-4 fw-bold"> Analytics Dashboard</h2>

            <!-- TOP STATS -->
            <div class="row g-3 mb-4">

                ${card("Total Products", totalProducts)}
                ${card("Average Price", avgPrice + " zł")}
                ${card("Categories", categoriesCount)}
                ${card("Max Price", maxPrice + " zł")}
                ${card("Min Price", minPrice + " zł")}
                ${card("Top Product", topProduct.name)}

            </div>

            
            <div class="mb-3">
                <label class="form-label fw-semibold">Select chart:</label>
                <select id="chartSelector" class="form-select">
                    <option value="bar"> Product Prices</option>
                    <option value="line"> Sales Trend</option>
                    <option value="pie"> Categories</option>
                </select>
            </div>

            
            <div class="card shadow-lg p-4 rounded-4">
                <canvas id="mainChart"></canvas>
            </div>

        </div>
    `;


    function card(title, value) {
        return `
            <div class="col-md-4 col-lg-2">
                <div class="card shadow-sm p-3 text-center h-100 border-0 rounded-4 stat-card">
                    <h6 class="text-muted">${title}</h6>
                    <h3 class="fw-bold">${value}</h3>
                </div>
            </div>
        `;
    }


    let chart;

    function renderChart(type) {
        if (chart) chart.destroy();

        const ctx = document.getElementById('mainChart');

        if (type === 'bar') {
            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: products.map(p => p.name),
                    datasets: [{
                        label: 'Price (zł)',
                        data: products.map(p => p.price),
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    animation: {
                        duration: 1000
                    },
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }

        if (type === 'line') {
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: days,
                    datasets: [{
                        label: 'Sales',
                        data: salesData,
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    animation: {
                        duration: 1200
                    }
                }
            });
        }

        if (type === 'pie') {
            chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(categoryCounts),
                    datasets: [{
                        data: Object.values(categoryCounts)
                    }]
                },
                options: {
                    responsive: true,
                    animation: {
                        duration: 1000
                    }
                }
            });
        }
    }

    renderChart('bar');

    document.getElementById('chartSelector')
        .addEventListener('change', (e) => {
            renderChart(e.target.value);
        });
}