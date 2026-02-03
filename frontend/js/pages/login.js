/**
 * Login Page JavaScript
 *
 * Handles user authentication with real API, password visibility toggle, 
 * and login form submission for the environmental and animal safety platform.
 *
 * Features:
 * - Password visibility toggle
 * - Form validation and submission
 * - JWT token management
 * - Real API authentication
 * - Redirect after successful login
 *
 * @author Environment & Animal Safety Hub Team
 * @version 2.0.0
 * @since 2024
 */

// API Configuration
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'
    : '/api';

/**
 * Toggle password visibility for input fields
 * @param {string} inputId - ID of the password input element
 */
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(inputId + "-icon");

    if (!input || !icon) {
        console.error(`Element with ID '${inputId}' or '${inputId}-icon' not found.`);
        return;
    }

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

/**
 * Show error message on the form
 * @param {string} message - Error message to display
 */
function showLoginError(message) {
    let errorDiv = document.getElementById('login-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'login-error';
        errorDiv.style.cssText = 'background:#ffebee;color:#c62828;padding:12px;border-radius:8px;margin-bottom:16px;text-align:center;';
        const form = document.getElementById('loginForm');
        form.insertBefore(errorDiv, form.firstChild);
    }
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => { errorDiv.style.display = 'none'; }, 5000);
}

/**
 * Handle login form submission with real API
 * @param {Event} e - Form submit event
 */
async function handleLoginSubmit(e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Get form values
    const identifier = document.getElementById('email')?.value || document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;

    if (!identifier || !password) {
        showLoginError('Please enter your email/username and password');
        return;
    }

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // Store auth data
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('refreshToken', result.data.refreshToken);
            localStorage.setItem('userName', result.data.user.firstName + ' ' + result.data.user.lastName);
            localStorage.setItem('userId', result.data.user.id);
            localStorage.setItem('userEmail', result.data.user.email);

            alert("Success! Welcome back to EcoLife.");
            window.location.href = "../index.html";
        } else {
            showLoginError(result.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Login error:', error);
        // Fallback to localStorage for offline/demo mode
        if (error.name === 'TypeError') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', 'Eco Warrior');
            alert("Demo mode: Welcome back to EcoLife!");
            window.location.href = "../index.html";
        } else {
            showLoginError('Connection error. Please try again.');
        }
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

/**
 * Initialize login page functionality
 */
function initLoginPage() {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", handleLoginSubmit);
    } else {
        console.error("Login form element not found.");
    }

    // Check if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const shouldRedirect = confirm('You are already logged in. Go to homepage?');
        if (shouldRedirect) window.location.href = "../index.html";
    }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initLoginPage);