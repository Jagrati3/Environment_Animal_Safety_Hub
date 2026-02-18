/**
 * Component Loader Module
 *
 * Handles dynamic loading of HTML components (navbar, footer, cursor) with proper path resolution
 * and theme initialization. Supports nested page structures and automatic asset path fixing.
 *
 * @author Environment & Animal Safety Hub Team
 * @version 1.0.0
 * @since 2024
 */

(function () {
    'use strict';

    /**
     * Calculates the relative path prefix based on current page depth relative to 'pages' folder
     * @returns {string} Relative path prefix for asset loading
     */
    function getRelativePrefix() {
        const path = window.location.pathname;

        if (path.includes('/pages/')) {
            const pathParts = path.split('/');
            const pagesIndex = pathParts.indexOf('pages');

            // Check if we are in a sub-subfolder (e.g., /pages/blogs/post.html)
            if (pagesIndex !== -1 && pagesIndex < pathParts.length - 2) {
                return '../../';
            }
            return '../';
        }
        return '';
    }

    const prefix = getRelativePrefix();

    /**
     * Loads an HTML component into a container element
     * @param {string} id - The ID of the container element
     * @param {string} fileName - The filename of the component to load
     * @returns {Promise<boolean>} Success status of the load operation
     */
    async function loadComponent(id, fileName) {
        const container = document.getElementById(id);
        if (!container) return false;

        try {
            const response = await fetch(prefix + 'components/' + fileName);
            if (!response.ok) throw new Error(`Failed to load ${fileName}`);
            const html = await response.text();
            container.innerHTML = html;
            return true;
        } catch (error) {
            console.error(`Error loading component ${fileName}:`, error);
            return false;
        }
    }

    /**
     * Initializes the PreferencesManager before other components
     * Loads preferences-manager.js script if not already present
     */
    function initPreferencesManager() {
        return new Promise((resolve) => {
            if (window.PreferencesManager) {
                window.PreferencesManager.init();
                resolve();
                return;
            }

            if (document.querySelector('script[src*="preferences-manager.js"]')) {
                // Script exists, wait for it to load
                const checkInterval = setInterval(() => {
                    if (window.PreferencesManager) {
                        clearInterval(checkInterval);
                        window.PreferencesManager.init();
                        resolve();
                    }
                }, 50);
                return;
            }

            const prefScript = document.createElement('script');
            prefScript.src = prefix + 'js/global/preferences-manager.js';
            prefScript.onload = () => {
                if (window.PreferencesManager) {
                    window.PreferencesManager.init();
                }
                resolve();
            };
            document.head.appendChild(prefScript);
        });
    }

    /**
     * Initializes theme toggle functionality
     * Loads theme-toggle.js script if not already present and initializes theme
     */
    function initTheme() {
        // Find existing theme toggle script or load it
        if (!window.initThemeToggle && !document.querySelector('script[src*="theme-toggle.js"]')) {
            const themeScript = document.createElement('script');
            themeScript.src = prefix + 'js/global/theme-toggle.js';
            themeScript.onload = () => {
                // If the script exposes EcoLifeTheme, use that, otherwise use initThemeToggle if available
                if (window.EcoLifeTheme && typeof window.EcoLifeTheme.init === 'function') {
                    window.EcoLifeTheme.init();
                } else if (typeof window.initThemeToggle === 'function') {
                    window.initThemeToggle();
                }
            };
            document.head.appendChild(themeScript);
        } else if (typeof window.initThemeToggle === 'function') {
            window.initThemeToggle();
        } else if (window.EcoLifeTheme && typeof window.EcoLifeTheme.init === 'function') {
            window.EcoLifeTheme.init();
        }

        // Load font-size-changer.js if not already present
        if (!window.initFontSizeChanger && !document.querySelector('script[src*="font-size-changer.js"]')) {
            const fontSizeScript = document.createElement('script');
            fontSizeScript.src = prefix + 'js/global/font-size-changer.js';
            document.head.appendChild(fontSizeScript);
        }
    }

    /**
     * Sets up the navbar component with proper path fixing and login state handling
     * @returns {Promise<void>}
     */
    async function setupNavbar() {
        const success = await loadComponent('navbar-container', 'navbar.html');
        if (!success) return;

        const navbarContainer = document.getElementById('navbar-container');
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        navbarContainer.setAttribute('data-logged-in', isLoggedIn);

        // Hide Login/Signup if on those pages
        const currentPage = window.location.pathname.toLowerCase();
        if (!isLoggedIn) {
            if (currentPage.includes('login.html')) {
                const btn = navbarContainer.querySelector('.btn-login');
                if (btn) btn.style.display = 'none';
            } else if (currentPage.includes('signup.html')) {
                const btn = navbarContainer.querySelector('.btn-signup');
                if (btn) btn.style.display = 'none';
            }
        }

        // Fix Navbar Paths (Links and Images)
        if (prefix) {
            const links = navbarContainer.querySelectorAll('a');
            const images = navbarContainer.querySelectorAll('img');

            links.forEach(link => {
                const href = link.getAttribute('href');
                        
                if (
                    href &&
                    !href.startsWith('http') &&
                    !href.startsWith('#') &&
                    !href.startsWith('mailto:') &&
                    !href.startsWith('/')
                ) {
                    link.setAttribute('href', prefix + href);
                }
            });
            
            images.forEach(img => {
                const src = img.getAttribute('src');
                if (src && !src.startsWith('http')) {
                    img.setAttribute('src', prefix + src);
                }
            });
        }

        // Dispatch event that navbar is ready
        window.dispatchEvent(new CustomEvent('navbarLoaded'));
    }

        /**
     * Initializes mobile navbar interactions
     * Handles hamburger toggle, submenu expand/collapse, and scroll safety
     */
    function initMobileNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;

    const menuToggle = navbarContainer.querySelector('#navToggle');
    const navMenu = navbarContainer.querySelector('#navLinks');

    if (!menuToggle || !navMenu) return;

    let menuJustOpened = false;

    // ======================
    // MAIN MENU TOGGLE
    // ======================
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isOpening = !navMenu.classList.contains('active');

        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('nav-open');

        if (isOpening) {
            menuJustOpened = true;
            requestAnimationFrame(() => {
                menuJustOpened = false;
            });
        }
    });

    // Prevent clicks inside menu
    navMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // ======================
    // OUTSIDE CLICK CLOSE
    // ======================
    document.addEventListener('click', (e) => {
        if (menuJustOpened) return;

        if (
            navMenu.classList.contains('active') &&
            !navbarContainer.contains(e.target)
        ) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('nav-open');

            navbarContainer
                .querySelectorAll('.nav-group.open')
                .forEach(item => item.classList.remove('open'));
        }
    });

    // ======================
    // SUBMENU ACCORDION
    // ======================
    const submenuButtons = navbarContainer.querySelectorAll('.submenu-toggle');

    submenuButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const parent = button.closest('.nav-group');
            if (!parent) return;

            const isOpen = parent.classList.contains('open');

            navbarContainer
                .querySelectorAll('.nav-group.open')
                .forEach(item => item.classList.remove('open'));

            if (!isOpen) {
                parent.classList.add('open');
            }
        });
    });
}

    /**
     * Sets up the footer component and loads associated CSS
     * @returns {Promise<void>}
     */
    async function setupFooter() {
        const success = await loadComponent('footer-placeholder', 'footer.html');
        if (!success) return;

        // Inject Footer CSS if missing
        if (!document.querySelector(`link[href*="footer.css"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = prefix + 'css/components/footer.css';
            document.head.appendChild(link);
        }

        // Initialize Newsletter if function exists (usually in main.js or footer-loader.js)
        if (typeof window.initFooterNewsletter === 'function') {
            window.initFooterNewsletter();
        }
    }

    /**
     * Sets up the custom cursor component and executes any inline scripts
     * @returns {Promise<void>}
     */
    async function setupCursor() {
        const container = document.getElementById('cursor-container');
        if (!container) return;

        const success = await loadComponent('cursor-container', 'cursor.html');
        if (!success) return;

        // Execute scripts inside cursor.html
        container.querySelectorAll("script").forEach(oldScript => {
            const newScript = document.createElement("script");
            if (oldScript.src) {
                newScript.src = oldScript.src;
            } else {
                newScript.textContent = oldScript.textContent;
            }
            document.body.appendChild(newScript);
            oldScript.remove();
        });
    }

    // Run when DOM is ready
    document.addEventListener('DOMContentLoaded', async () => {
        // Initialize PreferencesManager first (single source of truth)
        await initPreferencesManager();

        // Set up components
        await setupNavbar();
        initMobileNavbar();
        setupFooter();
        setupCursor();
        initTheme();
        if (typeof window.initFontSizeChanger === 'function') {
            window.initFontSizeChanger();
        }

        // Ensure FontAwesome is available
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fa = document.createElement('link');
            fa.rel = 'stylesheet';
            fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
            document.head.appendChild(fa);
        }

        // Initialize Global Progress UI
        if (!document.querySelector('script[src*="progress-ui.js"]')) {
            const progressScript = document.createElement('script');
            progressScript.type = 'module';
            progressScript.src = prefix + 'js/components/progress-ui.js';
            document.head.appendChild(progressScript);
        }
    });

})();