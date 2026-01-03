/**
 * Theme Toggle Functionality
 * Handles switching between light and dark themes
 */

// Get the current theme from localStorage or default to 'light'
const getCurrentTheme = () => {
    return localStorage.getItem('theme') || 'light';
};

// Set theme on page load
const initTheme = () => {
    const currentTheme = getCurrentTheme();
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
};

// Update the theme icon based on current theme
const updateThemeIcon = (theme) => {
    const sunIcon = document.querySelector('.theme-toggle .fa-sun');
    const moonIcon = document.querySelector('.theme-toggle .fa-moon');

    if (theme === 'dark') {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
    } else {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    }
};

// Toggle theme function
const toggleTheme = () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Update the data-theme attribute
    document.documentElement.setAttribute('data-theme', newTheme);

    // Save to localStorage
    localStorage.setItem('theme', newTheme);

    // Update icon
    updateThemeIcon(newTheme);

    // Optional: Add a subtle animation
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
};

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    // Add event listener to theme toggle button
    const themeToggleBtn = document.querySelector('.theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
});

// Optional: Listen for system theme changes
if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    darkModeQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
}
