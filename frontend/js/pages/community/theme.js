/**
 * Theme Toggle System
 *
 * Manages light/dark theme switching for the community platform
 * with persistent storage and visual feedback.
 *
 * Features:
 * - Light/dark theme toggle
 * - Local storage persistence
 * - Dynamic icon updates
 * - Smooth theme transitions
 *
 * @author Environment & Animal Safety Hub Team
 * @version 1.0.0
 * @since 2024
 */

/**
 * Community pages now rely on centralized global theme management.
 * This script remains as a compatibility layer and avoids rebinding
 * if the global theme handler is already active.
 */
document.addEventListener('DOMContentLoaded', () => {
    if (window.__ECO_THEME_TOGGLE_BOUND__) {
        return;
    }

    const toggleButtons = Array.from(document.querySelectorAll('#themeToggle'));
    if (!toggleButtons.length) return;

    const STORAGE_KEY = 'ecolife_theme';
    const savedTheme = localStorage.getItem(STORAGE_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    toggleButtons.forEach((toggleButton) => {
        toggleButton.addEventListener('click', () => {
            if (window.PreferencesManager && typeof window.PreferencesManager.toggleTheme === 'function') {
                const nextTheme = window.PreferencesManager.toggleTheme();
                updateIcon(nextTheme);
                return;
            }

            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem(STORAGE_KEY, newTheme);
            updateIcon(newTheme);
        });
    });

    function updateIcon(theme) {
        toggleButtons.forEach((toggleButton) => {
            toggleButton.innerHTML = theme === 'dark'
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';
            toggleButton.style.color = theme === 'dark' ? '#ffd700' : '#ffffff';
        });
    }
});