/**
 * EcoLife Global Utilities
 *
 * Core utility functions for the Environment & Animal Safety Hub platform,
 * including live clock updates, page view tracking, PWA service worker
 * registration, and push notification management.
 *
 * Features:
 * - Real-time clock display with automatic updates
 * - Persistent page view counter with localStorage
 * - Progressive Web App (PWA) service worker registration
 * - Eco-friendly push notifications with permission handling
 * - Automatic initialization on page load
 *
 * @author Environment & Animal Safety Hub Team
 * @version 1.0.0
 * @since 2024
 */

// ==========================================
// Live Clock Update Function (Issue #691)
// ==========================================

/**
 * Update the live clock display with current time
 * Updates the clock element every second with formatted HH:MM:SS
 */
function updateClock() {
    const now = new Date();

    // Get hours, minutes, and seconds
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Add leading zeros if needed
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Format time string
    const timeString = `${hours}:${minutes}:${seconds}`;

    // Update the clock element
    const clockElement = document.getElementById('clock-time');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Update clock immediately on page load
updateClock();

// Update clock every second
setInterval(updateClock, 1000);

// ==========================================
// Page View Counter (Issue #691)
// ==========================================

/**
 * Increment and display page view count
 * Uses localStorage to persist view count across sessions
 * Displays formatted number with comma separators
 */
function updatePageViewCounter() {
    // Get the current page view count from local storage
    let pageViews = localStorage.getItem('ecolife_page_views');

    // If no count exists, initialize to 0
    if (pageViews === null) {
        pageViews = 0;
    } else {
        pageViews = parseInt(pageViews, 10);
    }

    // Increment the count
    pageViews++;

    // Save the new count to local storage
    localStorage.setItem('ecolife_page_views', pageViews);

    // Update the display element
    const countElement = document.getElementById('page-view-count');
    if (countElement) {
        // Format the number with comma separators for better readability
        countElement.textContent = pageViews.toLocaleString();
    }
}

// Initialize page view counter on page load
updatePageViewCounter();

// ==========================================
// Service Worker Registration for PWA (Issue #736)
// ==========================================

// Register service worker if supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// ==========================================
// Push Notifications for Eco-Tips (Issue #736)
// ==========================================

/**
 * Request notification permission and show a sample eco-tip
 * Handles permission request and displays initial eco-friendly notification
 */
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
                // Show a sample eco-tip notification
                showEcoTipNotification();
            } else {
                console.log('Notification permission denied');
            }
        });
    }
}

/**
 * Show eco-tip notification with environmental message
 * Displays a sample notification encouraging eco-friendly actions
 */
function showEcoTipNotification() {
    if (Notification.permission === 'granted') {
        const notification = new Notification('EcoLife Tip', {
            body: 'Remember to reduce, reuse, and recycle to protect our planet!',
            icon: '/assets/images/others/Logo.webp'
        });

        // Close notification after 5 seconds
        setTimeout(() => {
            notification.close();
        }, 5000);
    }
}

// Request permission on page load (you can trigger this on user interaction for better UX)
setTimeout(requestNotificationPermission, 3000);

// ==========================================
// Initialization Complete
// ==========================================

console.log('%c🌍 EcoLife Global Utilities Initialized', 'color: #22c55e;font-weight: bold;');