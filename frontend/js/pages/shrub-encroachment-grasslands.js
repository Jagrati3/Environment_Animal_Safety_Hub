// Shrub Encroachment into Grasslands Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeScrollAnimations();
    initializeHeroStats();
    initializeEcosystemSimulator();
    initializeMechanismCards();
    initializeCaseStudies();
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

// Animated hero statistics
function initializeHeroStats() {
    const statNumbers = document.querySelectorAll('.hero-stats .stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (isNaN(target)) return;

        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                // Add suffix if needed
                if (stat.nextElementSibling.textContent.includes('%')) {
                    stat.textContent = Math.floor(current) + '%';
                } else if (stat.nextElementSibling.textContent.includes('M')) {
                    stat.textContent = Math.floor(current) + 'M';
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            } else {
                if (stat.nextElementSibling.textContent.includes('%')) {
                    stat.textContent = Math.floor(current) + '%';
                } else if (stat.nextElementSibling.textContent.includes('M')) {
                    stat.textContent = Math.floor(current) + 'M';
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }
        }, 20);
    });
}

// Interactive ecosystem transformation simulator
function initializeEcosystemSimulator() {
    const timeSlider = document.getElementById('time-slider');
    const fireSlider = document.getElementById('fire-frequency');
    const grazingSlider = document.getElementById('grazing-pressure');

    const timeValue = document.getElementById('time-value');
    const fireValue = document.getElementById('fire-value');
    const grazingValue = document.getElementById('grazing-value');

    const grassFill = document.getElementById('grass-fill');
    const shrubFill = document.getElementById('shrub-fill');
    const biodiversityFill = document.getElementById('biodiversity-fill');
    const fireFill = document.getElementById('fire-fill');

    const grassPercentage = document.getElementById('grass-percentage');
    const shrubPercentage = document.getElementById('shrub-percentage');
    const biodiversityPercentage = document.getElementById('biodiversity-percentage');
    const firePercentage = document.getElementById('fire-percentage');

    const insightText = document.getElementById('insight-text');
    const transitionProgress = document.getElementById('transitionProgress');

    if (!timeSlider || !fireSlider || !grazingSlider) return;

    // Update simulation based on all parameters
    function updateSimulation() {
        const time = parseInt(timeSlider.value);
        const fireFreq = parseInt(fireSlider.value);
        const grazing = parseInt(grazingSlider.value);

        // Complex simulation model (simplified for demo)
        // Grass cover decreases with time, increases with fire frequency, decreases with grazing
        let grassCover = Math.max(0, 100 - (time * 1.5) + (fireFreq * 2) - (grazing * 0.3));

        // Shrub cover increases with time, decreases with fire frequency, increases with grazing
        let shrubCover = Math.min(100, (time * 1.2) - (fireFreq * 1.5) + (grazing * 0.2));

        // Ensure they don't exceed 100% total
        const totalCover = grassCover + shrubCover;
        if (totalCover > 100) {
            const excess = totalCover - 100;
            grassCover -= excess * (grassCover / totalCover);
            shrubCover -= excess * (shrubCover / totalCover);
        }

        // Biodiversity decreases as shrub cover increases
        const biodiversity = Math.max(0, 100 - (shrubCover * 0.8));

        // Fire risk increases with shrub cover but decreases with fire frequency
        const fireRisk = Math.min(100, (shrubCover * 0.5) - (fireFreq * 2) + 20);

        // Update visual elements
        updateMetric(grassFill, grassCover, grassPercentage);
        updateMetric(shrubFill, shrubCover, shrubPercentage);
        updateMetric(biodiversityFill, biodiversity, biodiversityPercentage);
        updateMetric(fireFill, fireRisk, firePercentage);

        // Update transition progress bar
        transitionProgress.style.width = `${shrubCover}%`;

        // Update insights
        updateInsights(time, fireFreq, grazing, grassCover, shrubCover, biodiversity, fireRisk);
    }

    // Update individual metric
    function updateMetric(fillElement, value, percentageElement) {
        fillElement.style.width = `${value}%`;
        percentageElement.textContent = `${Math.round(value)}%`;
    }

    // Update insight text based on simulation state
    function updateInsights(time, fireFreq, grazing, grass, shrub, biodiversity, fireRisk) {
        let insight = '';

        if (time === 0) {
            insight = 'Healthy grassland ecosystem with diverse plant and animal communities.';
        } else if (shrub > 70) {
            insight = 'Severe shrub encroachment has transformed the landscape. Fire regimes altered, biodiversity significantly reduced.';
        } else if (shrub > 40) {
            insight = 'Moderate shrub expansion occurring. Grassland species declining, woody plants dominating.';
        } else if (fireFreq < 3) {
            insight = 'Low fire frequency allowing woody plant establishment. Consider prescribed burning.';
        } else if (grazing > 70) {
            insight = 'Heavy grazing pressure reducing grass competition, favoring shrub expansion.';
        } else if (biodiversity < 50) {
            insight = 'Biodiversity declining rapidly. Immediate management intervention recommended.';
        } else {
            insight = 'Early stages of shrub encroachment. Monitor closely and maintain disturbance regimes.';
        }

        insightText.textContent = insight;
    }

    // Event listeners for sliders
    timeSlider.addEventListener('input', function() {
        timeValue.textContent = `${this.value} years`;
        updateSimulation();
    });

    fireSlider.addEventListener('input', function() {
        fireValue.textContent = `${this.value} fires/decade`;
        updateSimulation();
    });

    grazingSlider.addEventListener('input', function() {
        grazingValue.textContent = `${this.value}%`;
        updateSimulation();
    });

    // Initialize with default values
    updateSimulation();
}

// Interactive mechanism cards
function initializeMechanismCards() {
    const mechanismCards = document.querySelectorAll('.mechanism-card');

    mechanismCards.forEach(card => {
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
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

        // Add hover effects for details
        const details = card.querySelector('.mechanism-details');
        if (details) {
            details.style.maxHeight = '0';
            details.style.overflow = 'hidden';
            details.style.transition = 'max-height 0.3s ease';

            card.addEventListener('mouseenter', function() {
                details.style.maxHeight = '200px';
            });

            card.addEventListener('mouseleave', function() {
                details.style.maxHeight = '0';
            });
        }
    });
}

// Interactive case studies
function initializeCaseStudies() {
    const caseCards = document.querySelectorAll('.case-card');

    caseCards.forEach(card => {
        // Add click to expand/collapse impact details
        const impacts = card.querySelector('.case-impacts');
        if (impacts) {
            impacts.style.maxHeight = '100px';
            impacts.style.overflow = 'hidden';
            impacts.style.transition = 'max-height 0.3s ease';

            card.addEventListener('click', function() {
                if (impacts.style.maxHeight === '100px') {
                    impacts.style.maxHeight = '200px';
                } else {
                    impacts.style.maxHeight = '100px';
                }
            });
        }

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
    const timeSlider = document.getElementById('time-slider');
    if (timeSlider) {
        let lastTimeValue = timeSlider.value;

        timeSlider.addEventListener('input', function() {
            if (this.value !== lastTimeValue) {
                announceToScreenReader(`Time progression changed to ${this.value} years`);
                lastTimeValue = this.value;
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

// Add CSS for additional interactive effects
const style = document.createElement('style');
style.textContent = `
    .mechanism-card:focus,
    .case-card:focus {
        outline: 2px solid #4A5D23;
        outline-offset: 2px;
    }

    .high-contrast {
        --bg-color: #000000;
        --text-color: #ffffff;
        --accent-color: #ffff00;
    }

    .high-contrast .mechanism-card,
    .high-contrast .case-card,
    .high-contrast .management-card,
    .high-contrast .crisis-stat {
        border: 2px solid #ffffff;
    }

    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    .mechanism-card:hover .mechanism-details {
        max-height: 200px;
    }

    .case-card:hover .case-impacts {
        max-height: 200px;
    }

    /* Loading animation for metrics */
    .metric-fill {
        position: relative;
    }

    .metric-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }

    .reduced-motion .metric-fill::after {
        display: none;
    }
`;
document.head.appendChild(style);

// Initialize performance monitoring
initializePerformanceMonitoring();

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeScrollAnimations,
        initializeHeroStats,
        initializeEcosystemSimulator,
        initializeMechanismCards,
        initializeCaseStudies,
        initializeAccessibilityFeatures,
        announceToScreenReader
    };
}