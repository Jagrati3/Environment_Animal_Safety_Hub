import { validateForm } from '../utils/form-validator.js';
import { contactSchema } from '../utils/validation-schemas.js';

// Load navbar and footer
const loadComponents = async () => {
    try {
        const navbar = await fetch('../components/navbar.html');
        document.getElementById('navbar-container').innerHTML = await navbar.text();

        const footer = await fetch('../components/footer.html');
        document.getElementById('footer-container').innerHTML = await footer.text();
    } catch (error) {
        console.error("Failed to load components:", error);
    }
};

loadComponents();

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Run validation
        const isValid = await validateForm(this, contactSchema);

        if (isValid) {
            // Simulate API call or success acton
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            console.log("Form validation failed.");
        }
    });
}
