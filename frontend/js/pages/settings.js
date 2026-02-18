/**
 * Settings Page JavaScript
 *
 * Handles all settings page functionality including theme selection,
 * language selection, font size controls, and preference persistence
 * through the centralized PreferencesManager.
 *
 * @author Environment & Animal Safety Hub Team
 * @version 1.0.0
 * @since 2024
 */

(function () {
    'use strict';

    /**
     * Wait for PreferencesManager to be available
     * @returns {Promise<void>}
     */
    function waitForPreferencesManager() {
        return new Promise((resolve) => {
            if (window.PreferencesManager) {
                resolve();
                return;
            }
            const checkInterval = setInterval(() => {
                if (window.PreferencesManager) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 50);
        });
    }

    /**
     * Initialize theme selection buttons
     */
    function initThemeButtons() {
        const lightBtn = document.getElementById('themeLightBtn');
        const darkBtn = document.getElementById('themeDarkBtn');

        if (!lightBtn || !darkBtn) return;

        // Set initial active state
        const currentTheme = PreferencesManager.getTheme();
        updateThemeButtonState(currentTheme);

        // Add click handlers
        lightBtn.addEventListener('click', () => {
            PreferencesManager.setTheme('light');
        });

        darkBtn.addEventListener('click', () => {
            PreferencesManager.setTheme('dark');
        });

        // Subscribe to theme changes
        PreferencesManager.subscribe('theme', (theme) => {
            updateThemeButtonState(theme);
        });
    }

    /**
     * Update theme button active state
     * @param {string} theme - Current theme
     */
    function updateThemeButtonState(theme) {
        const lightBtn = document.getElementById('themeLightBtn');
        const darkBtn = document.getElementById('themeDarkBtn');

        if (lightBtn && darkBtn) {
            lightBtn.classList.toggle('active', theme === 'light');
            darkBtn.classList.toggle('active', theme === 'dark');
        }
    }

    /**
     * Initialize language selector
     */
    function initLanguageSelector() {
        const selector = document.getElementById('settingsLanguageSelect');
        if (!selector) return;

        // Set initial value
        selector.value = PreferencesManager.getLanguage();

        // Add change handler
        selector.addEventListener('change', (e) => {
            PreferencesManager.setLanguage(e.target.value);
        });

        // Subscribe to language changes
        PreferencesManager.subscribe('language', (language) => {
            selector.value = language;
        });
    }

    /**
     * Initialize font size controls
     */
    function initFontSizeControls() {
        const decreaseBtn = document.getElementById('fontDecreaseBtn');
        const increaseBtn = document.getElementById('fontIncreaseBtn');
        const display = document.getElementById('fontSizeDisplay');

        if (!decreaseBtn || !increaseBtn) return;

        // Get current font size from root
        let currentSize = parseInt(getComputedStyle(document.documentElement).fontSize) || 16;
        const baseSize = 16;
        let currentPercent = Math.round((currentSize / baseSize) * 100);

        // Check localStorage for saved size
        const savedSize = localStorage.getItem('ecolife_font_size');
        if (savedSize) {
            currentPercent = parseInt(savedSize);
            updateFontSize(currentPercent);
        }

        if (display) {
            display.textContent = `${currentPercent}%`;
        }

        decreaseBtn.addEventListener('click', () => {
            if (currentPercent > 80) {
                currentPercent -= 10;
                updateFontSize(currentPercent);
                if (display) display.textContent = `${currentPercent}%`;
                localStorage.setItem('ecolife_font_size', currentPercent);
            }
        });

        increaseBtn.addEventListener('click', () => {
            if (currentPercent < 150) {
                currentPercent += 10;
                updateFontSize(currentPercent);
                if (display) display.textContent = `${currentPercent}%`;
                localStorage.setItem('ecolife_font_size', currentPercent);
            }
        });
    }

    /**
     * Update font size on document
     * @param {number} percent - Font size percentage
     */
    function updateFontSize(percent) {
        document.documentElement.style.fontSize = `${percent}%`;
    }

    /**
     * Initialize sound toggle
     */
    function initSoundToggle() {
        const toggle = document.getElementById('soundToggle');
        if (!toggle) return;

        // Get saved state
        const isMuted = localStorage.getItem('ecolife_muted') === 'true';
        toggle.checked = !isMuted;

        toggle.addEventListener('change', () => {
            localStorage.setItem('ecolife_muted', !toggle.checked);
        });
    }

    /**
     * Initialize reset button
     */
    function initResetButton() {
        const resetBtn = document.getElementById('resetSettingsBtn');
        if (!resetBtn) return;

        resetBtn.addEventListener('click', () => {
            if (confirm('Reset all settings to defaults?')) {
                PreferencesManager.reset();
                localStorage.removeItem('ecolife_font_size');
                localStorage.removeItem('ecolife_muted');
                updateFontSize(100);
                document.getElementById('fontSizeDisplay').textContent = '100%';
                document.getElementById('soundToggle').checked = true;
                updatePreferencesDisplay();
            }
        });
    }

    /**
     * Update preferences debug display
     */
    function updatePreferencesDisplay() {
        const display = document.getElementById('currentPreferencesDisplay');
        if (!display) return;

        const prefs = PreferencesManager.getAll();
        display.textContent = JSON.stringify(prefs, null, 2);
    }

    /**
     * Initialize navbar language selector sync
     */
    function initNavbarLanguageSync() {
        // Wait for navbar to load
        window.addEventListener('navbarLoaded', () => {
            const navbarLangSelect = document.getElementById('languageSelect');
            if (navbarLangSelect) {
                // Set initial value
                navbarLangSelect.value = PreferencesManager.getLanguage();

                // Add change handler
                navbarLangSelect.addEventListener('change', (e) => {
                    PreferencesManager.setLanguage(e.target.value);
                });

                // Subscribe to changes
                PreferencesManager.subscribe('language', (lang) => {
                    navbarLangSelect.value = lang;
                });
            }
        });
    }

    /**
     * Main initialization function
     */
    async function init() {
        await waitForPreferencesManager();

        // Initialize all controls
        initThemeButtons();
        initLanguageSelector();
        initFontSizeControls();
        initSoundToggle();
        initResetButton();
        initNavbarLanguageSync();

        // Show current preferences
        updatePreferencesDisplay();

        // Subscribe to all preference changes to update display
        PreferencesManager.subscribe('all', () => {
            updatePreferencesDisplay();
        });

        console.log('%c⚙️ Settings Page Initialized', 'color: #22c55e; font-weight: bold;');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
