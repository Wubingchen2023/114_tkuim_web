// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// API Request Helper
async function apiRequest(endpoint, method = 'GET', body = null, requiresAuth = true) {
    const headers = {
        'Content-Type': 'application/json',
    };

    // Add auth token if required
    if (requiresAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const options = {
        method,
        headers,
    };

    if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Fetch wrapper for simple GET requests
async function apiGet(endpoint, requiresAuth = false) {
    return apiRequest(endpoint, 'GET', null, requiresAuth);
}

// Fetch wrapper for POST requests
async function apiPost(endpoint, body, requiresAuth = true) {
    return apiRequest(endpoint, 'POST', body, requiresAuth);
}

// Fetch wrapper for PUT requests
async function apiPut(endpoint, body, requiresAuth = true) {
    return apiRequest(endpoint, 'PUT', body, requiresAuth);
}

// Fetch wrapper for DELETE requests
async function apiDelete(endpoint, requiresAuth = true) {
    return apiRequest(endpoint, 'DELETE', null, requiresAuth);
}
