/**
 * Signup Page JavaScript
 *
 * Handles multi-step user registration form with validation, password strength checking,
 * progress tracking, and real API integration for the environmental and animal safety platform.
 *
 * Features:
 * - Multi-step form navigation (4 steps)
 * - Real-time validation and error display
 * - Password strength indicator
 * - Form data persistence and confirmation
 * - Responsive progress tracking
 * - Real API registration with JWT
 * - Accessibility considerations
 *
 * @author Environment & Animal Safety Hub Team
 * @version 2.0.0
 * @since 2024
 */

// API Configuration
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'
    : '/api';

// Current Step
let currentStep = 1;
const totalSteps = 4;

/**
 * Initialize signup form when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", function () {
    initializeSignupForm();
});

/**
 * Initialize all signup form components and event listeners
 */
function initializeSignupForm() {
    updateStepDisplay();
    updateNavigationButtons();
    updateProgressBar();
    updateSidebarSteps();

    // Setup password strength listeners
    setupPasswordListeners();

    // Setup form submission
    setupFormSubmission();

    // Setup modal listeners
    setupModalListeners();
}

/**
 * Change to a different step in the form
 * @param {number} direction - Direction to move (-1 for previous, 1 for next)
 */
function changeStep(direction) {
    // Validate current step before moving forward
    if (direction === 1 && !validateStep(currentStep)) {
        return;
    }

    // Update step
    currentStep += direction;

    // Clamp step value
    if (currentStep < 1) currentStep = 1;
    if (currentStep > totalSteps) currentStep = totalSteps;

    updateStepDisplay();
    updateNavigationButtons();
    updateProgressBar();
    updateSidebarSteps();
    updateSummary();

    // Scroll to top of form
    const formWrapper = document.querySelector(".auth-form-wrapper");
    if (formWrapper) {
        formWrapper.scrollTop = 0;
    }
}

/**
 * Update the display of form steps and step indicators
 */
function updateStepDisplay() {
    // Hide all steps
    document.querySelectorAll(".form-step").forEach((step) => {
        step.classList.remove("active");
    });

    // Show current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add("active");
    }

    // Update step indicators
    document.querySelectorAll(".step-indicator").forEach((indicator) => {
        const step = parseInt(indicator.dataset.step);
        indicator.classList.remove("active", "completed");
        if (step === currentStep) {
            indicator.classList.add("active");
        } else if (step < currentStep) {
            indicator.classList.add("completed");
        }
    });
}

/**
 * Update navigation button visibility based on current step
 */
function updateNavigationButtons() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");

    if (!prevBtn || !nextBtn || !submitBtn) return;

    // Previous button
    prevBtn.style.display = currentStep === 1 ? "none" : "flex";

    // Next/Submit buttons
    if (currentStep === totalSteps) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "flex";
    } else {
        nextBtn.style.display = "flex";
        submitBtn.style.display = "none";
    }
}

/**
 * Update progress bar based on current step
 */
function updateProgressBar() {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    const progressFill = document.getElementById("progressFill");
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
}

/**
 * Update sidebar step indicators
 */
function updateSidebarSteps() {
    document.querySelectorAll(".step-info-item").forEach((item) => {
        const step = parseInt(item.dataset.step);
        item.classList.remove("active", "completed");
        if (step === currentStep) {
            item.classList.add("active");
        } else if (step < currentStep) {
            item.classList.add("completed");
        }
    });
}

/**
 * Validate a specific step in the form
 * @param {number} step - Step number to validate
 * @returns {boolean} True if step is valid
 */
function validateStep(step) {
    let isValid = true;
    clearErrors();

    switch (step) {
        case 1:
            isValid = validatePersonalInfo();
            break;
        case 2:
            isValid = validateContactInfo();
            break;
        case 3:
            isValid = validateSecurity();
            break;
        case 4:
            isValid = validatePreferences();
            break;
    }

    return isValid;
}

/**
 * Validate personal information step
 * @returns {boolean} True if personal info is valid
 */
function validatePersonalInfo() {
    let isValid = true;
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const username = document.getElementById("username");

    if (!firstName.value.trim()) {
        showError("firstName", "First name is required");
        isValid = false;
    } else if (firstName.value.trim().length < 2) {
        showError("firstName", "First name must be at least 2 characters");
        isValid = false;
    }

    if (!lastName.value.trim()) {
        showError("lastName", "Last name is required");
        isValid = false;
    }

    if (!username.value.trim()) {
        showError("username", "Username is required");
        isValid = false;
    } else if (username.value.trim().length < 3) {
        showError("username", "Username must be at least 3 characters");
        isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
        showError("username", "Username can only contain letters, numbers, and underscores");
        isValid = false;
    }

    return isValid;
}

/**
 * Validate contact information step
 * @returns {boolean} True if contact info is valid
 */
function validateContactInfo() {
    let isValid = true;
    const email = document.getElementById("email");
    const confirmEmail = document.getElementById("confirmEmail");

    if (!email.value.trim()) {
        showError("email", "Email is required");
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError("email", "Please enter a valid email address");
        isValid = false;
    }

    if (!confirmEmail.value.trim()) {
        showError("confirmEmail", "Please confirm your email");
        isValid = false;
    } else if (email.value !== confirmEmail.value) {
        showError("confirmEmail", "Email addresses do not match");
        isValid = false;
    }

    return isValid;
}

/**
 * Validate security information step
 * @returns {boolean} True if security info is valid
 */
function validateSecurity() {
    let isValid = true;
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    if (!password.value) {
        showError("password", "Password is required");
        isValid = false;
    } else if (password.value.length < 8) {
        showError("password", "Password must be at least 8 characters");
        isValid = false;
    } else if (getPasswordStrength(password.value) < 3) {
        showError("password", "Please create a stronger password");
        isValid = false;
    }

    if (!confirmPassword.value) {
        showError("confirmPassword", "Please confirm your password");
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError("confirmPassword", "Passwords do not match");
        isValid = false;
    }

    return isValid;
}

/**
 * Validate preferences step
 * @returns {boolean} True if preferences are valid
 */
function validatePreferences() {
    let isValid = true;
    const interests = document.querySelectorAll('input[name="interests"]:checked');
    const terms = document.getElementById("terms");

    if (interests.length === 0) {
        showError("interests", "Please select at least one interest");
        isValid = false;
    }

    if (!terms.checked) {
        showError("terms", "You must agree to the Terms of Service");
        isValid = false;
    }

    return isValid;
}

/**
 * Show validation error for a field
 * @param {string} fieldId - ID of the field with error
 * @param {string} message - Error message to display
 */
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }

    if (inputElement) {
        inputElement.classList.add("error");
    }
}

/**
 * Clear all validation errors
 */
function clearErrors() {
    document.querySelectorAll(".error-message").forEach((el) => {
        el.textContent = "";
        el.style.display = "none";
    });

    document.querySelectorAll(".error").forEach((el) => {
        el.classList.remove("error");
    });
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Toggle password visibility
 * @param {string} inputId - ID of the password input
 */
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(inputId + "-icon");

    if (!input || !icon) return;

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
 * Setup password-related event listeners
 */
function setupPasswordListeners() {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    if (passwordInput) {
        passwordInput.addEventListener("input", function (e) {
            const password = e.target.value;
            updatePasswordStrength(password);
            checkPasswordMatch();
        });
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener("input", checkPasswordMatch);
    }
}

/**
 * Update password strength indicator
 * @param {string} password - Password to evaluate
 */
function updatePasswordStrength(password) {
    const strength = getPasswordStrength(password);
    const segments = ["seg1", "seg2", "seg3", "seg4"];
    const colors = ["#ff4444", "#ffaa00", "#00cc44", "#00ff88"];
    const texts = ["Weak", "Fair", "Good", "Strong"];

    // Reset all segments
    segments.forEach((seg) => {
        const segment = document.getElementById(seg);
        if (segment) {
            segment.className = "strength-segment";
        }
    });

    // Update requirements
    updateRequirement("req-length", password.length >= 8);
    updateRequirement("req-upper", /[A-Z]/.test(password));
    updateRequirement("req-lower", /[a-z]/.test(password));
    updateRequirement("req-number", /\d/.test(password));
    updateRequirement("req-special", /[^a-zA-Z0-9]/.test(password));

    // Update strength bar
    const strengthText = document.getElementById("strengthText");
    if (password.length > 0) {
        for (let i = 0; i < strength; i++) {
            const seg = document.getElementById(segments[i]);
            if (seg) {
                seg.classList.add("active");
                seg.style.backgroundColor = colors[strength - 1];
            }
        }
        if (strengthText) {
            strengthText.textContent = texts[strength - 1] || "Too Short";
        }
    } else {
        if (strengthText) {
            strengthText.textContent = "Enter a password";
        }
    }
}

/**
 * Calculate password strength score
 * @param {string} password - Password to evaluate
 * @returns {number} Strength score (0-4)
 */
function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
}

/**
 * Update password requirement indicator
 * @param {string} id - Requirement element ID
 * @param {boolean} isMet - Whether requirement is met
 */
function updateRequirement(id, isMet) {
    const req = document.getElementById(id);
    if (!req) return;

    const icon = req.querySelector("i");
    if (isMet) {
        req.classList.add("met");
        if (icon) icon.className = "fa-solid fa-circle-check";
    } else {
        req.classList.remove("met");
        if (icon) icon.className = "fa-solid fa-circle";
    }
}

/**
 * Check if passwords match and show indicator
 */
function checkPasswordMatch() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const matchIndicator = document.getElementById("passwordMatch");

    if (!password || !confirmPassword || !matchIndicator) return;

    if (confirmPassword.value && password.value === confirmPassword.value) {
        matchIndicator.classList.add("show");
    } else {
        matchIndicator.classList.remove("show");
    }
}

/**
 * Update summary section with form data
 */
function updateSummary() {
    if (currentStep === 4) {
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const username = document.getElementById("username");
        const email = document.getElementById("email");
        const summaryName = document.getElementById("summary-name");
        const summaryUsername = document.getElementById("summary-username");
        const summaryEmail = document.getElementById("summary-email");

        if (summaryName && firstName && lastName) {
            summaryName.textContent = `${firstName.value} ${lastName.value}` || "-";
        }
        if (summaryUsername && username) {
            summaryUsername.textContent = username.value ? `@${username.value}` : "-";
        }
        if (summaryEmail && email) {
            summaryEmail.textContent = email.value || "-";
        }
    }
}

/**
 * Setup form submission handling with real API
 */
function setupFormSubmission() {
    const signupForm = document.getElementById("signupForm");
    if (!signupForm) return;

    signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        if (!validateStep(4)) {
            return;
        }

        const submitBtn = document.getElementById("submitBtn");
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        
        // Show loading
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitBtn.disabled = true;
        }

        // Gather form data
        const formData = {
            firstName: document.getElementById('firstName')?.value?.trim(),
            lastName: document.getElementById('lastName')?.value?.trim(),
            username: document.getElementById('username')?.value?.trim(),
            email: document.getElementById('email')?.value?.trim(),
            password: document.getElementById('password')?.value,
            interests: Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value)
        };

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
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

                // Show success modal
                const successModal = document.getElementById("successModal");
                if (successModal) {
                    successModal.classList.add("show");
                }

                // Redirect after delay
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 2000);
            } else {
                // Show error
                showSignupError(result.message || 'Registration failed. Please try again.');
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }
        } catch (error) {
            console.error('Signup error:', error);
            // Fallback to localStorage for offline/demo mode
            if (error.name === 'TypeError') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', formData.firstName + ' ' + formData.lastName);
                
                const successModal = document.getElementById("successModal");
                if (successModal) {
                    successModal.classList.add("show");
                }
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 2000);
            } else {
                showSignupError('Connection error. Please try again.');
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }
        }
    });
}

/**
 * Show signup error message
 * @param {string} message - Error message to display
 */
function showSignupError(message) {
    let errorDiv = document.getElementById('signup-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'signup-error';
        errorDiv.style.cssText = 'background:#ffebee;color:#c62828;padding:12px;border-radius:8px;margin-bottom:16px;text-align:center;';
        const currentStepEl = document.querySelector('.form-step.active');
        if (currentStepEl) {
            currentStepEl.insertBefore(errorDiv, currentStepEl.firstChild);
        }
    }
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => { errorDiv.style.display = 'none'; }, 5000);
}

/**
 * Setup modal event listeners
 */
function setupModalListeners() {
    const successModal = document.getElementById("successModal");
    if (!successModal) return;

    successModal.addEventListener("click", function (e) {
        if (e.target === this) {
            this.classList.remove("show");
        }
    });
}