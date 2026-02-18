/**
 * EcoLife Theme Toggle – Integrated with PreferencesManager
 *
 * Handles theme toggle UI interactions and icon updates.
 * Delegates state management to PreferencesManager for centralized control.
 *
 * @author Environment & Animal Safety Hub Team
 * @version 2.0.0
 * @since 2024
 */

(function () {
  'use strict';

  /**
   * Get the theme toggle button element
   * @returns {HTMLElement|null} Theme toggle button
   */
  function getToggleBtn() {
    return document.getElementById('themeToggle');
  }

  /**
   * Update the theme toggle icon based on current theme
   * @param {string} theme - Current theme ('light' | 'dark')
   */
  function updateIcon(theme) {
    const toggleBtn = getToggleBtn();
    if (!toggleBtn) return;

    const icon = toggleBtn.querySelector('i');
    if (!icon) return;

    icon.classList.remove('fa-sun', 'fa-moon');
    icon.classList.add(theme === 'dark' ? 'fa-sun' : 'fa-moon');

    toggleBtn.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  /**
   * Apply theme transition animation
   */
  function animateTransition() {
    const root = document.documentElement;
    root.classList.add('theme-transitioning');
    setTimeout(() => root.classList.remove('theme-transitioning'), 400);
  }

  /**
   * Handle theme toggle click
   */
  function handleToggleClick() {
    if (window.PreferencesManager) {
      animateTransition();
      window.PreferencesManager.toggleTheme();
      console.log('🌗 Theme toggled');
    } else {
      console.warn('[ThemeToggle] PreferencesManager not available');
    }
  }

  /**
   * Initialize theme toggle functionality
   */
  function init() {
    // Get current theme from PreferencesManager or fallback
    const currentTheme = window.PreferencesManager
      ? window.PreferencesManager.getTheme()
      : (localStorage.getItem('ecolife_theme') || 'light');

    // Update icon to reflect current theme
    updateIcon(currentTheme);

    // Subscribe to theme changes from PreferencesManager
    if (window.PreferencesManager) {
      window.PreferencesManager.subscribe('theme', (newTheme) => {
        updateIcon(newTheme);
      });
    }

    // Set up click handler using event delegation
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('#themeToggle');
      if (btn) handleToggleClick();
    });
  }

  // Wait for DOM and PreferencesManager to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded, wait a tick for PreferencesManager
    setTimeout(init, 0);
  }

  // Expose init function globally for component-loader
  window.initThemeToggle = init;

})();