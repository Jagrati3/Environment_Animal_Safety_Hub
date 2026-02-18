import { validateForm } from '../../utils/form-validator.js';
import { reportSchema } from '../../utils/validation-schemas.js';

/**
 * Report Form Handler
 *
 * Handles form submission for abandoned and injured animal reports.
 * Provides validation, situation-specific messaging, and user guidance.
 *
 * Features:
 * - AOS (Animate On Scroll) library initialization
 * - Form submission handling with Zod validation
 * - Situation-aware success messages (abandoned vs injured)
 * - Urgency-based response prioritization
 * - Automatic form reset after submission
 * - Responsive design support
 *
 * @author Environment & Animal Safety Hub Team
 * @version 2.1.0
 * @since 2024
 */

// ========== AOS INITIALIZATION ==========

/**
 * Initialize Animate On Scroll (AOS) library
 * Configures smooth scroll animations for the report page
 */
// Check if AOS is defined (loaded via CDN scripts)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,    // Animation duration in milliseconds
        once: true,        // Animation occurs only once per element
    });
}

// ========== FORM HANDLING ==========

/**
 * Report form element
 * @type {HTMLFormElement}
 */
const reportForm = document.getElementById("reportForm");

if (reportForm) {
    /**
     * Handle form submission
     * Prevents default submission, validates input, shows appropriate messages, and resets form
     * @param {Event} e - Form submit event
     */
    reportForm.addEventListener("submit", async function (e) {
        // Prevent default form submission
        e.preventDefault();

        // Run Zod Validation
        const isValid = await validateForm(this, reportSchema);

        if (!isValid) {
            console.log("Form validation failed.");
            return;
        }

        // Get form data for logic (validation already passed)
        const formData = new FormData(this);
        const situation = formData.get('situation');
        const urgency = formData.get('urgency');
        const details = formData.get('details')?.trim() || '';

        // For abandoned animals, suggest checking for identification (Business Logic after validation)
        if (situation === "abandoned" && !details.toLowerCase().includes("collar") && !details.toLowerCase().includes("tag")) {
            if (!confirm("🐕 For abandoned animals, consider checking for a collar or ID tag. Continue with report?")) {
                return;
            }
        }

        // Generate appropriate success message based on situation and urgency
        let message = "🦊 Thank you! Your report has been submitted successfully 💚";

        if (situation === "abandoned") {
            if (urgency === "emergency") {
                message = "🚨 ABANDONED ANIMAL EMERGENCY! Authorities will respond immediately 🐾";
            } else if (urgency === "urgent") {
                message = "⚡ URGENT: Abandoned animal reported. We'll prioritize finding help 🐕";
            } else {
                message = "📝 Abandoned animal report submitted. We'll work to find assistance 💚";
            }
        } else if (situation === "injured") {
            if (urgency === "emergency") {
                message = "🚨 INJURED ANIMAL EMERGENCY! Medical help is on the way 🏥🐾";
            } else if (urgency === "urgent") {
                message = "⚡ URGENT: Injured animal needs attention. Coordinating response 🐕‍🦺";
            } else {
                message = "📝 Injured animal report submitted. We'll arrange appropriate care 💚";
            }
        } else if (urgency === "emergency") {
            message = "🚨 EMERGENCY REPORT SUBMITTED! Help is on the way 🐕‍🦺";
        } else if (urgency === "urgent") {
            message = "⚡ URGENT REPORT SUBMITTED! We'll prioritize assistance 🐕";
        }

        alert(message);

        // Reset form to clear all fields
        this.reset();

        // Clear any success/error styles if any remains
        const errorInputs = this.querySelectorAll('.error-border');
        errorInputs.forEach(el => el.classList.remove('error-border'));
    });
}