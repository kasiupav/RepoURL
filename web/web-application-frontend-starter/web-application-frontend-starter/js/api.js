/**
 * API Service - B2B Platform
 */

const API_CONFIG = {
    baseUrl: 'http://150.254.36.243:8080/api',
    endpoints: {
        products: '/products',
        orders: '/orders',
        warehouses: '/warehouses'
    }
};

const ApiService = {

    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `HTTP ${response.status}`);
            }

            if (response.status === 204) return true;

            return await response.json();

        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },


    async delete(endpoint) {
        try {
            const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const text = await response.text();
            return text;

        } catch (error) {
            console.error('DELETE failed:', error);
            throw error;
        }
    },

    // ========================
    // PRODUCTS
    // ========================

    getAllProducts() {
        return this.request(API_CONFIG.endpoints.products);
    },

    getProductById(id) {
        return this.request(`${API_CONFIG.endpoints.products}/${id}`);
    },

    createProduct(product) {
        return this.request(API_CONFIG.endpoints.products, {
            method: 'POST',
            body: JSON.stringify(product)
        });
    },

    updateProduct(id, product) {
        return this.request(`${API_CONFIG.endpoints.products}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(product)
        });
    },

    deleteProduct(id) {
        return this.request(`${API_CONFIG.endpoints.products}/${id}`, {
            method: 'DELETE'
        });
    },

    // ORDERS
    getAllOrders() {
        return this.request(API_CONFIG.endpoints.orders);
    },

    createOrder(order) {
        return this.request(API_CONFIG.endpoints.orders, {
            method: 'POST',
            body: JSON.stringify(order)
        });
    },

    updateOrder(id, order) {
        return this.request(`${API_CONFIG.endpoints.orders}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(order)
        });
    },

    // WAREHOUSE
    getAllWarehouses() {
        return this.request(API_CONFIG.endpoints.warehouses);
    },

    updateWarehouse(id, warehouse) {
        return this.request(`${API_CONFIG.endpoints.warehouses}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(warehouse)
        });
    }
};