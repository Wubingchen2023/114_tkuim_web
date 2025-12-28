// Authentication Module

// Register new user
async function register(username, email, password) {
    try {
        const data = await apiPost('/auth/register', { username, email, password }, false);

        if (data.success && data.data.token) {
            // Store token and user info
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            return { success: true };
        }
        return { success: false, message: data.error?.message };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Login user
async function login(email, password) {
    try {
        const data = await apiPost('/auth/login', { email, password }, false);

        if (data.success && data.data.token) {
            // Store token and user info
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            return { success: true };
        }
        return { success: false, message: data.error?.message };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Logout user
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Check if user is authenticated
function checkAuth() {
    return !!localStorage.getItem('token');
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Update UI based on auth status
function updateAuthUI() {
    const userMenu = document.getElementById('userMenu');
    if (!userMenu) return;

    if (checkAuth()) {
        const user = getCurrentUser();
        userMenu.innerHTML = `
            <span class="user-welcome">歡迎, ${user.username}</span>
            <button class="btn btn-secondary" onclick="logout()">登出</button>
        `;
    } else {
        userMenu.innerHTML = `
            <button class="btn btn-primary" onclick="window.location.href='login.html'">登入</button>
            <button class="btn btn-secondary" onclick="window.location.href='register.html'">註冊</button>
        `;
    }
}

// Initialize auth UI on page load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', updateAuthUI);
}
