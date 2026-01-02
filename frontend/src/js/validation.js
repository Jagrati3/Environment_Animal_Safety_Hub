/**
 * EcoLife Signup Validation & Real-time Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthMeter = document.querySelector('.strength-meter');

    // 1. Email Validation (Regex)
    emailInput.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput.value)) {
            showSuccess(emailInput);
        } else {
            showError(emailInput, "Please enter a valid email address");
        }
    });

    // 2. Username Validation (Min 3 chars)
    usernameInput.addEventListener('input', () => {
        if (usernameInput.value.trim().length >= 3) {
            showSuccess(usernameInput);
        } else {
            showError(usernameInput, "Username must be at least 3 characters");
        }
    });

    // 3. Password Strength Logic
    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        strengthMeter.style.display = 'block';
        
        let strength = 0;
        if (val.length > 5) strength++; // Length check
        if (val.match(/[A-Z]/)) strength++; // Uppercase check
        if (val.match(/[0-9]/)) strength++; // Numbers check
        if (val.match(/[^A-Za-z0-9]/)) strength++; // Special chars check

        // Update UI based on strength
        strengthBar.className = 'strength-bar'; // Reset
        if (val.length === 0) {
            strengthMeter.style.display = 'none';
        } else if (strength <= 1) {
            strengthBar.classList.add('weak');
            showError(passwordInput, "Weak password");
        } else if (strength === 2 || strength === 3) {
            strengthBar.classList.add('medium');
            showSuccess(passwordInput);
        } else {
            strengthBar.classList.add('strong');
            showSuccess(passwordInput);
        }
    });

    // --- Helper Functions ---
    function showError(input, message) {
        input.classList.add('input-error');
        input.classList.remove('input-success');
        const errorSpan = document.getElementById(`${input.id}-error`);
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
        }
    }

    function showSuccess(input) {
        input.classList.add('input-success');
        input.classList.remove('input-error');
        const errorSpan = document.getElementById(`${input.id}-error`);
        if (errorSpan) {
            errorSpan.style.display = 'none';
        }
    }
});