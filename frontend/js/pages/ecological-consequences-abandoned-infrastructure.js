// Ecological Consequences of Abandoned Infrastructure Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeScrollAnimations();
    initializeHeroStats();
    initializeInfrastructureSimulator();
    initializeInfrastructureCards();
    initializeCaseStudies();
    initializeTimeline();
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
                if (stat.nextElementSibling.textContent.includes('M+')) {
                    stat.textContent = Math.floor(current) + 'M+';
                } else if (stat.nextElementSibling.textContent.includes('%')) {
                    stat.textContent = Math.floor(current) + '%';
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            } else {
                if (stat.nextElementSibling.textContent.includes('M+')) {
                    stat.textContent = Math.floor(current) + 'M+';
                } else if (stat.nextElementSibling.textContent.includes('%')) {
                    stat.textContent = Math.floor(current) + '%';
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }
        }, 20);
    });
}

// Interactive infrastructure impact simulator
function initializeInfrastructureSimulator() {
    const timeSlider = document.getElementById('abandonment-time');
    const densitySlider = document.getElementById('infrastructure-density');
    const landscapeSelect = document.getElementById('landscape-type');

    const timeDisplay = document.getElementById('time-display');
    const densityDisplay = document.getElementById('density-display');

    const fragmentationFill = document.getElementById('fragmentation-fill');
    const biodiversityFill = document.getElementById('biodiversity-fill');
    const connectivityFill = document.getElementById('connectivity-fill');
    const restorationCost = document.getElementById('restoration-cost');

    const fragmentationPercentage = document.getElementById('fragmentation-percentage');
    const biodiversityPercentage = document.getElementById('biodiversity-percentage');
    const connectivityPercentage = document.getElementById('connectivity-percentage');

    const landscapeCanvas = document.getElementById('landscape-canvas');

    if (!timeSlider || !densitySlider || !landscapeSelect) return;

    // Update simulation based on all parameters
    function updateSimulation() {
        const time = parseInt(timeSlider.value);
        const density = parseInt(densitySlider.value);
        const landscape = landscapeSelect.value;

        // Complex simulation model (simplified for demo)
        // Fragmentation increases with time and density, varies by landscape
        let baseFragmentation = Math.min(100, (time * 0.8) + (density * 8));
        let landscapeMultiplier = 1;

        switch (landscape) {
            case 'forest':
                landscapeMultiplier = 1.2; // Forests more sensitive to fragmentation
                break;
            case 'grassland':
                landscapeMultiplier = 0.8; // Grasslands more resilient
                break;
            case 'wetland':
                landscapeMultiplier = 1.5; // Wetlands highly sensitive
                break;
            case 'urban':
                landscapeMultiplier = 0.6; // Urban areas already fragmented
                break;
        }

        const fragmentation = Math.min(100, baseFragmentation * landscapeMultiplier);

        // Biodiversity loss correlates with fragmentation
        const biodiversityLoss = Math.min(100, fragmentation * 0.7);

        // Connectivity decreases with fragmentation
        const connectivity = Math.max(0, 100 - fragmentation);

        // Restoration cost increases with time and fragmentation
        const cost = Math.round((time * 1000) + (fragmentation * 500) + (density * 2000));

        // Update visual elements
        updateMetric(fragmentationFill, fragmentation, fragmentationPercentage);
        updateMetric(biodiversityFill, 100 - biodiversityLoss, biodiversityPercentage);
        updateMetric(connectivityFill, connectivity, connectivityPercentage);

        restorationCost.textContent = `$${cost.toLocaleString()}`;

        // Update landscape visualization
        updateLandscapeVisualization(fragmentation, density, landscape);

        // Update insights
        updateSimulationInsights(time, density, landscape, fragmentation, biodiversityLoss);
    }

    // Update individual metric
    function updateMetric(fillElement, value, percentageElement) {
        fillElement.style.width = `${value}%`;
        percentageElement.textContent = `${Math.round(value)}%`;
    }

    // Update landscape grid visualization
    function updateLandscapeVisualization(fragmentation, density, landscape) {
        const grid = document.querySelector('.landscape-grid');
        if (!grid) return;

        grid.innerHTML = '';

        // Create 10x10 grid
        for (let i = 0; i < 100; i++) {
            const cell = document.createElement('div');
            cell.className = 'landscape-cell';

            // Determine cell type based on simulation parameters
            const rand = Math.random();
            const fragThreshold = fragmentation / 100;
            const densityThreshold = density / 10;

            if (rand < densityThreshold) {
                cell.classList.add('abandoned');
            } else if (rand < densityThreshold + fragThreshold * 0.3) {
                cell.classList.add('fragmented');
            } else {
                cell.classList.add('intact');
            }

            grid.appendChild(cell);
        }
    }

    // Update insight text based on simulation state
    function updateSimulationInsights(time, density, landscape, fragmentation, biodiversityLoss) {
        // This would update any insight panels if they existed
        console.log(`Simulation: ${time} years, ${density} density, ${landscape} landscape`);
        console.log(`Results: ${fragmentation}% fragmentation, ${biodiversityLoss}% biodiversity loss`);
    }

    // Event listeners for controls
    timeSlider.addEventListener('input', function() {
        timeDisplay.textContent = `${this.value} years`;
        updateSimulation();
    });

    densitySlider.addEventListener('input', function() {
        densityDisplay.textContent = `${this.value} sites/km²`;
        updateSimulation();
    });

    landscapeSelect.addEventListener('change', function() {
        updateSimulation();
    });

    // Initialize with default values
    updateSimulation();
}

// Interactive infrastructure type cards
function initializeInfrastructureCards() {
    const infraCards = document.querySelectorAll('.infra-card');

    infraCards.forEach(card => {
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
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
        const details = card.querySelector('.infra-details');
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
        // Add click to expand/collapse metrics
        const metrics = card.querySelector('.case-metrics');
        if (metrics) {
            metrics.style.maxHeight = '100px';
            metrics.style.overflow = 'hidden';
            metrics.style.transition = 'max-height 0.3s ease';

            card.addEventListener('click', function() {
                if (metrics.style.maxHeight === '100px') {
                    metrics.style.maxHeight = '200px';
                } else {
                    metrics.style.maxHeight = '100px';
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

// Interactive timeline
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Update hero stats based on timeline position
            updateTimelineStats(index);
        });
    });

    function updateTimelineStats(index) {
        const statNumbers = document.querySelectorAll('.hero-stats .stat-number');

        // Different stats for different timeline periods
        const statsData = [
            { sites: 100, fragmentation: 10, duration: 25 }, // 1900 - Construction
            { sites: 1000, fragmentation: 20, duration: 50 }, // 1950 - Peak Use
            { sites: 500, fragmentation: 30, duration: 75 }, // 2000 - Abandonment
            { sites: 500, fragmentation: 40, duration: 100 } // 2050 - Ecological Legacy
        ];

        const data = statsData[index];
        if (data && statNumbers.length >= 3) {
            animateStat(statNumbers[0], data.sites);
            animateStat(statNumbers[1], data.fragmentation);
            animateStat(statNumbers[2], data.duration);
        }
    }

    function animateStat(element, target) {
        const current = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const increment = (target - current) / 50;
        let value = current;

        const timer = setInterval(() => {
            value += increment;
            if ((increment > 0 && value >= target) || (increment < 0 && value <= target)) {
                value = target;
                clearInterval(timer);
            }

            if (element.nextElementSibling.textContent.includes('M+')) {
                element.textContent = Math.round(value) + 'M+';
            } else if (element.nextElementSibling.textContent.includes('%')) {
                element.textContent = Math.round(value) + '%';
            } else {
                element.textContent = Math.round(value) + '+';
            }
        }, 20);
    }
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
    const timeSlider = document.getElementById('abandonment-time');
    if (timeSlider) {
        let lastTimeValue = timeSlider.value;

        timeSlider.addEventListener('input', function() {
            if (this.value !== lastTimeValue) {
                announceToScreenReader(`Abandonment time changed to ${this.value} years`);
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

// Add CSS for landscape grid and additional interactive effects
const style = document.createElement('style');
style.textContent = `
    .landscape-cell {
        border-radius: 2px;
        transition: background-color 0.3s ease;
    }

    .landscape-cell.intact {
        background-color: #48BB78;
    }

    .landscape-cell.fragmented {
        background-color: #F56565;
    }

    .landscape-cell.abandoned {
        background-color: #4A5568;
    }

    .infra-card:focus,
    .case-card:focus {
        outline: 2px solid #63B3ED;
        outline-offset: 2px;
    }

    .high-contrast {
        --bg-color: #000000;
        --text-color: #ffffff;
        --accent-color: #ffff00;
    }

    .high-contrast .infra-card,
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

    .infra-card:hover .infra-details {
        max-height: 200px;
    }

    .case-card:hover .case-metrics {
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

    /* Timeline animations */
    .timeline-item {
        cursor: pointer;
    }

    .timeline-item:hover {
        transform: translateY(-2px);
    }

    .reduced-motion .timeline-item:hover {
        transform: none;
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
        initializeInfrastructureSimulator,
        initializeInfrastructureCards,
        initializeCaseStudies,
        initializeTimeline,
        initializeAccessibilityFeatures,
        announceToScreenReader
    };
}