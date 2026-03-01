// accessibility.js - Accessibility enhancements for Urban Heat Refuge Navigator

export function enableKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Optionally, highlight focused controls
        }
        // Add more keyboard shortcuts for map navigation, popups, etc.
    });
}

export function setAriaLabels() {
    document.getElementById('search').setAttribute('aria-label', 'Search for location');
    document.getElementById('locate-btn').setAttribute('aria-label', 'Use my location');
    document.getElementById('time-window').setAttribute('aria-label', 'Select time window');
    // ...
}
