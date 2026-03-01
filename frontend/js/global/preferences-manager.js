/**
 * PreferencesManager - Centralized User Preferences Management
 *
 * A singleton module that provides a single source of truth for global user
 * preferences (theme, language). Uses pub/sub pattern for reactive updates,
 * allowing components to subscribe and react to preference changes.
 *
 * Features:
 * - Automatic sync with localStorage on init and updates
 * - Pub/sub system for reactive UI updates
 * - System preference detection for theme defaults
 * - Language preference support with extensible locale list
 *
 * @author Environment & Animal Safety Hub Team
 * @version 1.0.0
 * @since 2024
 */

(function () {
    'use strict';

    // Storage keys
    const STORAGE_KEYS = {
        THEME: 'ecolife_theme',
        LANGUAGE: 'ecolife_language'
    };

    // Valid values
    const VALID_THEMES = ['light', 'dark'];
    const VALID_LANGUAGES = [
        'en', 'hi', 'bn', 'es', 'fr', 'de', 'zh', 'mr', 'te', 'ta', 'gu', 'kn', 'ml', 'or', 'pa', 'as', 'mai', 'sat', 'ks', 'gom', 'sd', 'doi', 'mni', 'sa', 'ur', 'ne', 'si',
        'ar', 'pt', 'ru', 'ja', 'ko', 'it', 'tr', 'vi', 'pl', 'nl', 'th', 'id', 'fa', 'el', 'he', 'sv', 'no', 'da', 'fi', 'ro', 'hu', 'cs', 'sk', 'uk', 'bg', 'hr', 'sr', 'ms', 'tl', 'sw', 'am', 'zu', 'af', 'ga'
    ];

    // Default values
    const DEFAULTS = {
        THEME: 'light',
        LANGUAGE: 'en'
    };

    // Internal state
    let _currentTheme = DEFAULTS.THEME;
    let _currentLanguage = DEFAULTS.LANGUAGE;

    // Subscribers map: { eventType: [callback1, callback2, ...] }
    const _subscribers = {
        theme: [],
        language: [],
        all: [] // Catches all preference changes
    };

    /**
     * Detect system theme preference
     * @returns {'dark' | 'light'} System preferred color scheme
     */
    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    /**
     * Detect browser language preference
     * @returns {string} Two-letter language code
     */
    function getBrowserLanguage() {
        const lang = navigator.language || navigator.userLanguage || 'en';
        const shortLang = lang.split('-')[0].toLowerCase();
        return VALID_LANGUAGES.includes(shortLang) ? shortLang : DEFAULTS.LANGUAGE;
    }

    /**
     * Load preferences from localStorage or use defaults
     */
    function loadFromStorage() {
        // Load theme
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
        if (savedTheme && VALID_THEMES.includes(savedTheme)) {
            _currentTheme = savedTheme;
        } else {
            _currentTheme = getSystemTheme();
            localStorage.setItem(STORAGE_KEYS.THEME, _currentTheme);
        }

        // Load language
        const savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
        if (savedLanguage && VALID_LANGUAGES.includes(savedLanguage)) {
            _currentLanguage = savedLanguage;
        } else {
            _currentLanguage = getBrowserLanguage();
            localStorage.setItem(STORAGE_KEYS.LANGUAGE, _currentLanguage);
        }
    }

    /**
     * Save a preference to localStorage
     * @param {string} key - Storage key
     * @param {string} value - Value to store
     */
    function saveToStorage(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.error('[PreferencesManager] Failed to save to localStorage:', e);
        }
    }

    /**
     * Notify all subscribers of a preference change
     * @param {string} type - The preference type ('theme' | 'language')
     * @param {string} value - The new value
     */
    function notifySubscribers(type, value) {
        const eventData = { type, value, timestamp: Date.now() };

        // Notify type-specific subscribers
        if (_subscribers[type]) {
            _subscribers[type].forEach(callback => {
                try {
                    callback(value, eventData);
                } catch (e) {
                    console.error(`[PreferencesManager] Subscriber error (${type}):`, e);
                }
            });
        }

        // Notify 'all' subscribers
        _subscribers.all.forEach(callback => {
            try {
                callback(eventData);
            } catch (e) {
                console.error('[PreferencesManager] Subscriber error (all):', e);
            }
        });
    }

    /**
     * Apply theme to document
     * @param {string} theme - Theme to apply
     */
    function applyThemeToDocument(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (document.body) {
            document.body.classList.toggle('dark-theme', theme === 'dark');
        }
    }

    /**
     * Apply language to document
     * @param {string} language - Language code to apply
     */
    function applyLanguageToDocument(language) {
        document.documentElement.setAttribute('lang', language);
        document.documentElement.setAttribute('data-language', language);
    }

    // ==========================================
    // PUBLIC API
    // ==========================================

    const PreferencesManager = {
        /**
         * Initialize the PreferencesManager
         * Should be called once when the application loads
         */
        init() {
            loadFromStorage();
            applyThemeToDocument(_currentTheme);
            applyLanguageToDocument(_currentLanguage);

            // Listen for system theme changes
            if (window.matchMedia) {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                    // Only auto-update if user hasn't explicitly set a preference
                    const hasExplicitPreference = localStorage.getItem(STORAGE_KEYS.THEME) !== null;
                    if (!hasExplicitPreference) {
                        this.setTheme(e.matches ? 'dark' : 'light');
                    }
                });
            }

            // Listen for storage changes from other tabs
            window.addEventListener('storage', (e) => {
                if (e.key === STORAGE_KEYS.THEME && e.newValue && VALID_THEMES.includes(e.newValue)) {
                    _currentTheme = e.newValue;
                    applyThemeToDocument(_currentTheme);
                    notifySubscribers('theme', _currentTheme);
                }
                if (e.key === STORAGE_KEYS.LANGUAGE && e.newValue && VALID_LANGUAGES.includes(e.newValue)) {
                    _currentLanguage = e.newValue;
                    applyLanguageToDocument(_currentLanguage);
                    notifySubscribers('language', _currentLanguage);
                }
            });

            console.log('%c🎨 PreferencesManager Initialized', 'color: #22c55e; font-weight: bold;', {
                theme: _currentTheme,
                language: _currentLanguage
            });
        },

        /**
         * Get current theme
         * @returns {'light' | 'dark'} Current theme
         */
        getTheme() {
            return _currentTheme;
        },

        /**
         * Set theme preference
         * @param {'light' | 'dark'} theme - Theme to set
         * @returns {boolean} Success status
         */
        setTheme(theme) {
            if (!VALID_THEMES.includes(theme)) {
                console.warn(`[PreferencesManager] Invalid theme: ${theme}`);
                return false;
            }

            if (_currentTheme === theme) return true;

            _currentTheme = theme;
            saveToStorage(STORAGE_KEYS.THEME, theme);
            applyThemeToDocument(theme);
            notifySubscribers('theme', theme);

            return true;
        },

        /**
         * Toggle between light and dark theme
         * @returns {string} New theme value
         */
        toggleTheme() {
            const newTheme = _currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
            return newTheme;
        },

        /**
         * Get current language
         * @returns {string} Current language code
         */
        getLanguage() {
            return _currentLanguage;
        },

        /**
         * Set language preference
         * @param {string} language - Language code to set
         * @returns {boolean} Success status
         */
        setLanguage(language) {
            const langCode = language.toLowerCase();
            if (!VALID_LANGUAGES.includes(langCode)) {
                console.warn(`[PreferencesManager] Invalid language: ${language}`);
                return false;
            }

            if (_currentLanguage === langCode) return true;

            _currentLanguage = langCode;
            saveToStorage(STORAGE_KEYS.LANGUAGE, langCode);
            applyLanguageToDocument(langCode);
            notifySubscribers('language', langCode);

            return true;
        },

        /**
         * Get all available languages
         * @returns {Array<{code: string, name: string}>} Available languages
         */
        getAvailableLanguages() {
            return [
                { code: 'en', name: 'English' },
                { code: 'hi', name: 'हिन्दी' },
                { code: 'bn', name: 'বাংলা' },
                { code: 'mr', name: 'मराठी' },
                { code: 'te', name: 'తెలుగు' },
                { code: 'ta', name: 'தமிழ்' },
                { code: 'gu', name: 'ગુજરાતી' },
                { code: 'kn', name: 'ಕನ್ನಡ' },
                { code: 'ml', name: 'മലയാളം' },
                { code: 'or', name: 'ଓଡ଼ିଆ' },
                { code: 'pa', name: 'ਪੰਜਾਬੀ' },
                { code: 'as', name: 'অসমীয়া' },
                { code: 'ur', name: 'اردو' },
                { code: 'sa', name: 'संस्कृतम्' },
                { code: 'es', name: 'Español' },
                { code: 'fr', name: 'Français' },
                { code: 'de', name: 'Deutsch' },
                { code: 'zh', name: '中文' },
                { code: 'ar', name: 'العربية' },
                { code: 'pt', name: 'Português' },
                { code: 'ru', name: 'Русский' },
                { code: 'ja', name: '日本語' },
                { code: 'ko', name: '한국어' },
                { code: 'it', name: 'Italiano' },
                { code: 'tr', name: 'Türkçe' },
                { code: 'vi', name: 'Tiếng Việt' },
                { code: 'pl', name: 'Polski' },
                { code: 'nl', name: 'Nederlands' },
                { code: 'th', name: 'ไทย' },
                { code: 'id', name: 'Bahasa Indonesia' },
                { code: 'fa', name: 'فارسی' },
                { code: 'el', name: 'Ελληνικά' },
                { code: 'he', name: 'עברית' },
                { code: 'sv', name: 'Svenska' },
                { code: 'no', name: 'Norsk' },
                { code: 'da', name: 'Dansk' },
                { code: 'fi', name: 'Suomi' },
                { code: 'ro', name: 'Română' },
                { code: 'hu', name: 'Magyar' },
                { code: 'cs', name: 'Čeština' },
                { code: 'sk', name: 'Slovenčina' },
                { code: 'uk', name: 'Українська' },
                { code: 'bg', name: 'Български' },
                { code: 'hr', name: 'Hrvatski' },
                { code: 'sr', name: 'Српски' },
                { code: 'ms', name: 'Bahasa Melayu' },
                { code: 'tl', name: 'Filipino' },
                { code: 'sw', name: 'Kiswahili' },
                { code: 'am', name: 'አማርኛ' },
                { code: 'zu', name: 'isiZulu' },
                { code: 'af', name: 'Afrikaans' },
                { code: 'ga', name: 'Gaeilge' }
            ];
        },

        /**
         * Subscribe to preference changes
         * @param {'theme' | 'language' | 'all'} type - Event type to subscribe to
         * @param {Function} callback - Callback function
         * @returns {Function} Unsubscribe function
         */
        subscribe(type, callback) {
            if (!_subscribers[type]) {
                console.warn(`[PreferencesManager] Unknown subscription type: ${type}`);
                return () => { };
            }

            _subscribers[type].push(callback);

            // Return unsubscribe function
            return () => {
                const index = _subscribers[type].indexOf(callback);
                if (index > -1) {
                    _subscribers[type].splice(index, 1);
                }
            };
        },

        /**
         * Get all current preferences
         * @returns {{theme: string, language: string}} Current preferences
         */
        getAll() {
            return {
                theme: _currentTheme,
                language: _currentLanguage
            };
        },

        /**
         * Reset all preferences to defaults
         */
        reset() {
            this.setTheme(getSystemTheme());
            this.setLanguage(getBrowserLanguage());
        }
    };

    // Expose globally
    window.PreferencesManager = PreferencesManager;

})();
