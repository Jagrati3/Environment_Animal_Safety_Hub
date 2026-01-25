/**
 * EcoLife PWA Manager
 * Handles service worker registration, install prompts, and offline functionality
 */

class EcoLifePWA {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.serviceWorkerRegistration = null;

        this.init();
    }

    async init() {
        // Check if already installed
        this.checkInstalledState();

        // Register service worker
        await this.registerServiceWorker();

        // Set up install prompt
        this.setupInstallPrompt();

        // Set up network status monitoring
        this.setupNetworkMonitoring();

        // Create install button UI
        this.createInstallUI();

        // Setup update handling
        this.setupUpdateHandling();

        console.log('[EcoLife PWA] Initialized successfully');
    }

    // Register the service worker
    async registerServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            console.warn('[EcoLife PWA] Service Workers not supported');
            return;
        }

        try {
            this.serviceWorkerRegistration = await navigator.serviceWorker.register('./service-worker.js', {
                scope: './'
            });

            console.log('[EcoLife PWA] Service Worker registered:', this.serviceWorkerRegistration.scope);

            // Check for updates periodically
            setInterval(() => {
                this.serviceWorkerRegistration.update();
            }, 60 * 60 * 1000); // Check every hour

        } catch (error) {
            console.error('[EcoLife PWA] Service Worker registration failed:', error);
        }
    }

    // Check if app is already installed
    checkInstalledState() {
        // Check display mode
        if (window.matchMedia('(display-mode: standalone)').matches) {
            this.isInstalled = true;
        }

        // Check iOS standalone mode
        if (window.navigator.standalone === true) {
            this.isInstalled = true;
        }

        // Check localStorage for installed state
        if (localStorage.getItem('ecolife-pwa-installed') === 'true') {
            this.isInstalled = true;
        }

        // Listen for display mode changes
        window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
            this.isInstalled = e.matches;
            this.updateInstallUI();
        });
    }

    // Set up the install prompt capture
    setupInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (event) => {
            // Prevent the mini-infobar from appearing on mobile
            event.preventDefault();

            // Store the event for later use
            this.deferredPrompt = event;

            // Show install UI
            this.showInstallUI();

            console.log('[EcoLife PWA] Install prompt captured');
        });

        // Handle successful install
        window.addEventListener('appinstalled', () => {
            // Clear the prompt
            this.deferredPrompt = null;
            this.isInstalled = true;

            // Save installed state
            localStorage.setItem('ecolife-pwa-installed', 'true');

            // Hide install UI
            this.hideInstallUI();

            // Show success message
            this.showNotification('🎉 EcoLife installed successfully! Access it from your home screen.', 'success');

            console.log('[EcoLife PWA] App was installed');
        });
    }

    // Create the install UI elements
    createInstallUI() {
        // Create install banner
        const installBanner = document.createElement('div');
        installBanner.id = 'pwa-install-banner';
        installBanner.className = 'pwa-install-banner';
        installBanner.innerHTML = `
      <div class="pwa-banner-content">
        <div class="pwa-banner-icon">
          <img src="assets/images/others/envirnoment-logo.png" alt="EcoLife" />
        </div>
        <div class="pwa-banner-text">
          <h4>Install EcoLife</h4>
          <p>Get quick access! Works offline too.</p>
        </div>
        <div class="pwa-banner-actions">
          <button id="pwa-install-btn" class="pwa-install-btn">
            <i class="fa-solid fa-download"></i> Install
          </button>
          <button id="pwa-dismiss-btn" class="pwa-dismiss-btn" aria-label="Dismiss">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
      </div>
    `;

        // Create floating install button
        const floatingBtn = document.createElement('button');
        floatingBtn.id = 'pwa-floating-install';
        floatingBtn.className = 'pwa-floating-install';
        floatingBtn.innerHTML = `
      <i class="fa-solid fa-mobile-screen"></i>
      <span>Install App</span>
    `;

        // Create iOS install modal
        const iosModal = document.createElement('div');
        iosModal.id = 'pwa-ios-modal';
        iosModal.className = 'pwa-ios-modal';
        iosModal.innerHTML = `
      <div class="pwa-ios-content">
        <button class="pwa-ios-close" aria-label="Close">
          <i class="fa-solid fa-times"></i>
        </button>
        <div class="pwa-ios-icon">
          <img src="assets/images/others/envirnoment-logo.png" alt="EcoLife" />
        </div>
        <h3>Install EcoLife</h3>
        <p>Install this app on your iPhone/iPad for the best experience:</p>
        <ol class="pwa-ios-steps">
          <li>
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
            Tap the <strong>Share</strong> button at the bottom of Safari
          </li>
          <li>
            <i class="fa-solid fa-plus-square"></i>
            Scroll down and tap <strong>Add to Home Screen</strong>
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            Tap <strong>Add</strong> to confirm
          </li>
        </ol>
        <button class="pwa-ios-got-it">Got it!</button>
      </div>
    `;

        // Create offline indicator
        const offlineIndicator = document.createElement('div');
        offlineIndicator.id = 'pwa-offline-indicator';
        offlineIndicator.className = 'pwa-offline-indicator';
        offlineIndicator.innerHTML = `
      <i class="fa-solid fa-wifi-slash"></i>
      <span>You're offline. Some content may not be available.</span>
    `;

        // Add elements to DOM
        document.body.appendChild(installBanner);
        document.body.appendChild(floatingBtn);
        document.body.appendChild(iosModal);
        document.body.appendChild(offlineIndicator);

        // Set up event listeners
        this.setupUIEventListeners();
    }

    // Set up UI event listeners
    setupUIEventListeners() {
        const installBtn = document.getElementById('pwa-install-btn');
        const dismissBtn = document.getElementById('pwa-dismiss-btn');
        const floatingBtn = document.getElementById('pwa-floating-install');
        const iosModal = document.getElementById('pwa-ios-modal');
        const iosClose = iosModal?.querySelector('.pwa-ios-close');
        const iosGotIt = iosModal?.querySelector('.pwa-ios-got-it');

        if (installBtn) {
            installBtn.addEventListener('click', () => this.promptInstall());
        }

        if (dismissBtn) {
            dismissBtn.addEventListener('click', () => {
                this.hideInstallBanner();
                // Don't show again for 3 days
                localStorage.setItem('ecolife-pwa-dismissed', Date.now().toString());
            });
        }

        if (floatingBtn) {
            floatingBtn.addEventListener('click', () => this.promptInstall());
        }

        if (iosClose) {
            iosClose.addEventListener('click', () => this.hideIOSModal());
        }

        if (iosGotIt) {
            iosGotIt.addEventListener('click', () => {
                this.hideIOSModal();
                localStorage.setItem('ecolife-pwa-ios-shown', 'true');
            });
        }
    }

    // Prompt user to install the app
    async promptInstall() {
        // iOS detection
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        if (isIOS) {
            this.showIOSModal();
            return;
        }

        if (!this.deferredPrompt) {
            console.warn('[EcoLife PWA] Install prompt not available');
            return;
        }

        try {
            // Show the install prompt
            this.deferredPrompt.prompt();

            // Wait for the user choice
            const { outcome } = await this.deferredPrompt.userChoice;

            console.log('[EcoLife PWA] User choice:', outcome);

            // Clear the prompt
            this.deferredPrompt = null;

            if (outcome === 'accepted') {
                this.hideInstallUI();
            }
        } catch (error) {
            console.error('[EcoLife PWA] Install prompt error:', error);
        }
    }

    // Show install UI
    showInstallUI() {
        if (this.isInstalled) return;

        // Check if user dismissed recently
        const dismissedTime = localStorage.getItem('ecolife-pwa-dismissed');
        if (dismissedTime) {
            const threeDays = 3 * 24 * 60 * 60 * 1000;
            if (Date.now() - parseInt(dismissedTime) < threeDays) {
                return;
            }
        }

        const banner = document.getElementById('pwa-install-banner');
        const floatingBtn = document.getElementById('pwa-floating-install');

        if (banner) {
            setTimeout(() => {
                banner.classList.add('visible');
            }, 3000); // Show after 3 seconds
        }

        if (floatingBtn) {
            setTimeout(() => {
                floatingBtn.classList.add('visible');
            }, 10000); // Show floating button after 10 seconds
        }
    }

    // Hide all install UI
    hideInstallUI() {
        this.hideInstallBanner();
        const floatingBtn = document.getElementById('pwa-floating-install');
        if (floatingBtn) {
            floatingBtn.classList.remove('visible');
        }
    }

    // Hide install banner
    hideInstallBanner() {
        const banner = document.getElementById('pwa-install-banner');
        if (banner) {
            banner.classList.remove('visible');
        }
    }

    // Show iOS install modal
    showIOSModal() {
        if (localStorage.getItem('ecolife-pwa-ios-shown') === 'true') {
            return;
        }

        const modal = document.getElementById('pwa-ios-modal');
        if (modal) {
            modal.classList.add('visible');
            document.body.style.overflow = 'hidden';
        }
    }

    // Hide iOS install modal
    hideIOSModal() {
        const modal = document.getElementById('pwa-ios-modal');
        if (modal) {
            modal.classList.remove('visible');
            document.body.style.overflow = '';
        }
    }

    // Update install UI based on state
    updateInstallUI() {
        if (this.isInstalled) {
            this.hideInstallUI();
        }
    }

    // Set up network status monitoring
    setupNetworkMonitoring() {
        const offlineIndicator = document.getElementById('pwa-offline-indicator');

        const updateOnlineStatus = () => {
            if (navigator.onLine) {
                offlineIndicator?.classList.remove('visible');
                document.body.classList.remove('offline-mode');
            } else {
                offlineIndicator?.classList.add('visible');
                document.body.classList.add('offline-mode');
            }
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        // Initial check
        updateOnlineStatus();
    }

    // Set up update handling
    setupUpdateHandling() {
        if (!this.serviceWorkerRegistration) return;

        this.serviceWorkerRegistration.addEventListener('updatefound', () => {
            const newWorker = this.serviceWorkerRegistration.installing;

            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New version available
                    this.showUpdateNotification();
                }
            });
        });
    }

    // Show update notification
    showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'pwa-update-notification';
        notification.innerHTML = `
      <div class="pwa-update-content">
        <i class="fa-solid fa-rotate"></i>
        <span>A new version of EcoLife is available!</span>
        <button id="pwa-update-btn">Update Now</button>
      </div>
    `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('visible');
        }, 100);

        document.getElementById('pwa-update-btn')?.addEventListener('click', () => {
            this.updateApp();
            notification.remove();
        });
    }

    // Update the app
    updateApp() {
        if (this.serviceWorkerRegistration?.waiting) {
            this.serviceWorkerRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        window.location.reload();
    }

    // Show notification toast
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `pwa-notification pwa-notification-${type}`;
        notification.innerHTML = `
      <span>${message}</span>
      <button aria-label="Close notification"><i class="fa-solid fa-times"></i></button>
    `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('visible');
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('visible');
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        notification.querySelector('button')?.addEventListener('click', () => {
            notification.classList.remove('visible');
            setTimeout(() => notification.remove(), 300);
        });
    }

    // Save content for offline reading
    async saveForOffline(urls) {
        if (!this.serviceWorkerRegistration) return;

        navigator.serviceWorker.controller?.postMessage({
            type: 'CACHE_CONTENT',
            urls: Array.isArray(urls) ? urls : [urls]
        });

        this.showNotification('📥 Content saved for offline reading!', 'success');
    }

    // Get service worker version
    async getVersion() {
        return new Promise((resolve) => {
            const messageChannel = new MessageChannel();

            messageChannel.port1.onmessage = (event) => {
                resolve(event.data.version);
            };

            navigator.serviceWorker.controller?.postMessage(
                { type: 'GET_VERSION' },
                [messageChannel.port2]
            );
        });
    }
}

// Initialize PWA when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize in production or localhost
    const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    const isHTTPS = location.protocol === 'https:';

    if (isHTTPS || isLocalhost) {
        window.ecoLifePWA = new EcoLifePWA();
    } else {
        console.warn('[EcoLife PWA] PWA requires HTTPS or localhost');
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EcoLifePWA;
}
