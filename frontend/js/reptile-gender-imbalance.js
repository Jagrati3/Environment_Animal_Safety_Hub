// Reptile Gender Imbalance Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
});

function initializePage() {
    // Set up tab navigation
    setupTabNavigation();

    // Initialize scroll animations
    setupScrollAnimations();

    // Set up progress bar
    setupProgressBar();

    // Initialize tooltips
    setupTooltips();

    // Set up card hover effects
    setupCardEffects();

    // Load theme toggle if available
    if (typeof themeToggle === 'function') {
        themeToggle();
    }
}

// Tab Navigation System
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const contentSections = document.querySelectorAll('.content-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));
            // Show target content section
            const targetSection = document.getElementById(targetTab);
            if (targetSection) {
                targetSection.classList.add('active');
                // Smooth scroll to content
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Set default active tab
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe cards and other elements
    document.querySelectorAll('.card, .challenge-card, .timeline-item').forEach(el => {
        observer.observe(el);
    });
}

// Progress Bar
function setupProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    function updateProgressBar() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar(); // Initial call
}

// Tooltips
function setupTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');

    tooltips.forEach(tooltip => {
        const tooltipText = tooltip.querySelector('.tooltip-text');

        tooltip.addEventListener('mouseenter', function(e) {
            const rect = tooltipText.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            // Adjust position if tooltip goes off screen
            if (rect.right > viewportWidth) {
                tooltipText.style.left = 'auto';
                tooltipText.style.right = '0';
                tooltipText.style.transform = 'translateX(0)';
            }
        });
    });
}

// Card Hover Effects
function setupCardEffects() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle animation
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            // Reset animation
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Temperature Impact Visualization
function createTemperatureChart() {
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return;

    // Simple SVG-based visualization
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 400 200');

    // Background gradient
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'tempGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '0%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#4ade80');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '50%');
    stop2.setAttribute('stop-color', '#fbbf24');

    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('stop-color', '#ef4444');

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);
    defs.appendChild(gradient);
    svg.appendChild(defs);

    // Temperature bars
    const temperatures = [25, 27, 29, 31, 33];
    const labels = ['Normal', '+1°C', '+2°C', '+3°C', '+4°C'];

    temperatures.forEach((temp, index) => {
        const x = 50 + index * 70;
        const height = temp * 3;
        const y = 180 - height;

        // Bar
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', '40');
        rect.setAttribute('height', height);
        rect.setAttribute('fill', `url(#tempGradient)`);
        rect.setAttribute('opacity', '0.8');
        svg.appendChild(rect);

        // Label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x + 20);
        text.setAttribute('y', 195);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '10');
        text.setAttribute('fill', '#666');
        text.textContent = labels[index];
        svg.appendChild(text);

        // Value
        const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        valueText.setAttribute('x', x + 20);
        valueText.setAttribute('y', y - 5);
        valueText.setAttribute('text-anchor', 'middle');
        valueText.setAttribute('font-size', '12');
        valueText.setAttribute('font-weight', 'bold');
        valueText.setAttribute('fill', '#2c5530');
        valueText.textContent = temp + '°C';
        svg.appendChild(valueText);
    });

    chartContainer.appendChild(svg);
}

// Initialize temperature chart when overview section is active
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('tab-btn') && e.target.getAttribute('data-tab') === 'overview') {
        setTimeout(createTemperatureChart, 100);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keyboard navigation for tabs
document.addEventListener('keydown', function(e) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const activeTab = document.querySelector('.tab-btn.active');

    if (!activeTab) return;

    let currentIndex = Array.from(tabButtons).indexOf(activeTab);

    if (e.key === 'ArrowRight' && currentIndex < tabButtons.length - 1) {
        tabButtons[currentIndex + 1].click();
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        tabButtons[currentIndex - 1].click();
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced scroll handler
window.addEventListener('scroll', debounce(() => {
    // Update progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
}, 10));

// Accessibility: Focus management
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Print styles
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics service
});

// Service worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}