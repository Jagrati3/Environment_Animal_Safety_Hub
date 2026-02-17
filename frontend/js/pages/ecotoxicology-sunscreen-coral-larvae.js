// Ecotoxicology of Sunscreen Chemicals on Coral Larvae Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeScrollAnimations();
    initializeToxicitySimulation();
    initializeStatCounters();
    initializeCardEffects();
    initializeAccessibilityFeatures();
});

// Scroll animations for sections
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Interactive toxicity simulation
function initializeToxicitySimulation() {
    const slider = document.getElementById('concentration-slider');
    const valueDisplay = document.getElementById('concentration-value');
    const metricBars = document.querySelectorAll('.metric-fill');

    if (!slider || !valueDisplay) return;

    // Update simulation based on concentration
    function updateSimulation(concentration) {
        // Update concentration display
        valueDisplay.textContent = `${concentration} μg/L`;

        // Calculate toxicity effects (simplified model)
        const survivalRate = Math.max(0, 100 - (concentration * 0.5));
        const settlementRate = Math.max(0, 100 - (concentration * 0.8));
        const developmentRate = Math.max(0, 100 - (concentration * 0.3));

        // Update metric bars with smooth animation
        updateMetricBar(metricBars[0], survivalRate); // Survival
        updateMetricBar(metricBars[1], settlementRate); // Settlement
        updateMetricBar(metricBars[2], developmentRate); // Development

        // Update visual feedback
        updateToxicityVisualFeedback(concentration);
    }

    // Update individual metric bar
    function updateMetricBar(bar, percentage) {
        bar.style.width = `${percentage}%`;

        // Color coding based on severity
        if (percentage > 70) {
            bar.style.background = 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)';
        } else if (percentage > 40) {
            bar.style.background = 'linear-gradient(90deg, #eab308 0%, #ca8a04 100%)';
        } else {
            bar.style.background = 'linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)';
        }
    }

    // Visual feedback for toxicity levels
    function updateToxicityVisualFeedback(concentration) {
        const container = document.querySelector('.simulation-container');

        // Remove existing classes
        container.classList.remove('low-toxicity', 'medium-toxicity', 'high-toxicity');

        // Add appropriate class based on concentration
        if (concentration < 50) {
            container.classList.add('low-toxicity');
        } else if (concentration < 200) {
            container.classList.add('medium-toxicity');
        } else {
            container.classList.add('high-toxicity');
        }
    }

    // Event listener for slider
    slider.addEventListener('input', function() {
        updateSimulation(this.value);
    });

    // Initialize with default value
    updateSimulation(slider.value);
}

// Animated stat counters
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        if (isNaN(target)) return;

        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toLocaleString();
        }, 20);
    });
}

// Card hover effects and interactions
function initializeCardEffects() {
    const cards = document.querySelectorAll('.chemical-card, .mechanism-card, .evidence-card, .solution-card');

    cards.forEach(card => {
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = `${e.offsetX - 10}px`;
            ripple.style.top = `${e.offsetY - 10}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add keyboard interaction
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });
}

// Accessibility features
function initializeAccessibilityFeatures() {
    // High contrast mode detection
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }

    // Reduced motion detection
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Skip to main content
        if (e.key === 's' && e.altKey) {
            e.preventDefault();
            const mainContent = document.querySelector('.container');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView();
            }
        }
    });

    // Screen reader announcements for simulation changes
    const slider = document.getElementById('concentration-slider');
    if (slider) {
        let lastValue = slider.value;

        slider.addEventListener('input', function() {
            if (this.value !== lastValue) {
                announceToScreenReader(`Concentration changed to ${this.value} micrograms per liter`);
                lastValue = this.value;
            }
        });
    }
}

// Screen reader announcement helper
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';

    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor simulation performance
    let frameCount = 0;
    let lastTime = performance.now();

    function monitorPerformance() {
        frameCount++;
        const currentTime = performance.now();

        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

            // Log performance if below threshold
            if (fps < 30) {
                console.warn(`Performance warning: ${fps} FPS detected`);
            }

            frameCount = 0;
            lastTime = currentTime;
        }

        requestAnimationFrame(monitorPerformance);
    }

    requestAnimationFrame(monitorPerformance);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);

    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc2626;
        color: white;
        padding: 15px;
        border-radius: 8px;
        z-index: 1000;
        max-width: 300px;
    `;
    errorDiv.innerHTML = `
        <strong>Error:</strong> Something went wrong with the interactive features.
        Please refresh the page or contact support if the problem persists.
    `;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
});

// Initialize performance monitoring
initializePerformanceMonitoring();

// Add CSS for ripple effect and accessibility
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .high-contrast {
        --bg-color: #000000;
        --text-color: #ffffff;
        --accent-color: #ffff00;
    }

    .high-contrast .chemical-card,
    .high-contrast .mechanism-card,
    .high-contrast .evidence-card,
    .high-contrast .solution-card {
        border: 2px solid #ffffff;
    }

    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    .low-toxicity .simulation-container {
        border-color: rgba(34, 197, 94, 0.3);
        box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
    }

    .medium-toxicity .simulation-container {
        border-color: rgba(234, 179, 8, 0.3);
        box-shadow: 0 0 20px rgba(234, 179, 8, 0.2);
    }

    .high-toxicity .simulation-container {
        border-color: rgba(220, 38, 38, 0.3);
        box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);
    }
`;
document.head.appendChild(style);

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeScrollAnimations,
        initializeToxicitySimulation,
        initializeStatCounters,
        initializeCardEffects,
        initializeAccessibilityFeatures,
        announceToScreenReader
    };
}