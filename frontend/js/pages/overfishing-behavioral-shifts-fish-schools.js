// Overfishing Behavioral Shifts in Fish Schools Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeScrollAnimations();
    initializeHeroStats();
    initializeFishSchoolAnimation();
    initializeBehaviorSimulator();
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
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            } else {
                if (stat.nextElementSibling.textContent.includes('%')) {
                    stat.textContent = Math.floor(current) + '%';
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }
        }, 20);
    });
}

// Animated fish school in hero
function initializeFishSchoolAnimation() {
    const fishElements = document.querySelectorAll('.fish-school .fish');
    const schoolContainer = document.querySelector('.fish-school');

    if (!fishElements.length) return;

    // Initial positioning
    positionFishInitially();

    // Animate fish movement
    function animateFishSchool() {
        fishElements.forEach((fish, index) => {
            // Create schooling behavior with slight variations
            const time = Date.now() * 0.001;
            const baseX = 50 + Math.sin(time + index * 0.5) * 30;
            const baseY = 50 + Math.cos(time + index * 0.7) * 20;

            // Add some randomness
            const randomX = (Math.sin(time * 2 + index) * 5);
            const randomY = (Math.cos(time * 1.5 + index) * 3);

            const x = Math.max(10, Math.min(90, baseX + randomX));
            const y = Math.max(10, Math.min(90, baseY + randomY));

            fish.style.left = `${x}%`;
            fish.style.top = `${y}%`;

            // Rotate fish to face movement direction
            const prevX = parseFloat(fish.dataset.prevX || x);
            const prevY = parseFloat(fish.dataset.prevY || y);
            const angle = Math.atan2(y - prevY, x - prevX) * 180 / Math.PI;

            fish.style.transform = `rotate(${angle}deg)`;

            fish.dataset.prevX = x;
            fish.dataset.prevY = y;
        });

        requestAnimationFrame(animateFishSchool);
    }

    function positionFishInitially() {
        fishElements.forEach((fish, index) => {
            const x = 30 + (index * 15) % 40;
            const y = 30 + (index * 10) % 40;
            fish.style.left = `${x}%`;
            fish.style.top = `${y}%`;
            fish.dataset.prevX = x;
            fish.dataset.prevY = y;
        });
    }

    // Start animation
    animateFishSchool();
}

// Interactive behavior simulator
function initializeBehaviorSimulator() {
    const pressureSlider = document.getElementById('fishing-pressure');
    const timeSlider = document.getElementById('time-elapsed');
    const gearSelect = document.getElementById('gear-selectivity');

    const pressureValue = document.getElementById('pressure-value');
    const timeValue = document.getElementById('time-value');

    const cohesionFill = document.getElementById('cohesion-fill');
    const riskFill = document.getElementById('risk-fill');
    const leadershipFill = document.getElementById('leadership-fill');
    const resilienceFill = document.getElementById('resilience-fill');

    const cohesionPercentage = document.getElementById('cohesion-percentage');
    const riskPercentage = document.getElementById('risk-percentage');
    const leadershipPercentage = document.getElementById('leadership-percentage');
    const resiliencePercentage = document.getElementById('resilience-percentage');

    const insightText = document.getElementById('insight-text');
    const schoolBefore = document.getElementById('schoolBefore');
    const schoolAfter = document.getElementById('schoolAfter');

    if (!pressureSlider || !timeSlider) return;

    // Update simulation based on all parameters
    function updateSimulation() {
        const pressure = parseInt(pressureSlider.value);
        const time = parseInt(timeSlider.value);
        const gearType = gearSelect.value;

        // Complex simulation model (simplified for demo)
        // Different gear types affect different behavioral traits
        let gearMultiplier = 1;
        if (gearType === 'personality') {
            gearMultiplier = 1.5; // More selective for personality
        } else if (gearType === 'mixed') {
            gearMultiplier = 1.2; // Moderately selective
        }

        // School cohesion decreases with pressure and time
        const cohesion = Math.max(0, 100 - (pressure * 0.8) - (time * 0.5 * gearMultiplier));

        // Risk taking changes based on selective pressure
        let riskTaking;
        if (gearType === 'personality') {
            // Personality-selective fishing removes bold individuals, increases shyness
            riskTaking = Math.max(0, 50 - (pressure * 0.6) - (time * 0.3));
        } else {
            // Size-selective maintains more balanced risk distribution
            riskTaking = Math.max(0, 45 - (pressure * 0.4) - (time * 0.2));
        }

        // Leadership quality decreases as experienced individuals are removed
        const leadership = Math.max(0, 100 - (pressure * 1.2) - (time * 0.8 * gearMultiplier));

        // Population resilience depends on behavioral diversity
        const resilience = Math.max(0, 100 - (pressure * 0.5) - (time * 0.3) - ((100 - cohesion) * 0.2));

        // Update visual elements
        updateMetric(cohesionFill, cohesion, cohesionPercentage);
        updateMetric(riskFill, riskTaking, riskPercentage);
        updateMetric(leadershipFill, leadership, leadershipPercentage);
        updateMetric(resilienceFill, resilience, resiliencePercentage);

        // Update insights
        updateInsights(pressure, time, gearType, cohesion, riskTaking, leadership, resilience);

        // Update visual school composition
        updateSchoolComposition(pressure, time, gearType);
    }

    // Update individual metric
    function updateMetric(fillElement, value, percentageElement) {
        fillElement.style.width = `${value}%`;
        percentageElement.textContent = `${Math.round(value)}%`;
    }

    // Update insight text based on simulation state
    function updateInsights(pressure, time, gearType, cohesion, risk, leadership, resilience) {
        let insight = '';

        if (pressure < 30 && time < 20) {
            insight = 'Low fishing pressure maintains diverse behavioral traits. School coordination remains strong with balanced risk-taking behaviors.';
        } else if (gearType === 'personality' && pressure > 50) {
            insight = 'Personality-selective fishing creates shy-dominated populations. Leadership quality severely impacted with reduced coordination.';
        } else if (cohesion < 40) {
            insight = 'School cohesion breakdown detected. Anti-predator defenses weakened, increasing vulnerability to predation.';
        } else if (leadership < 30) {
            insight = 'Critical loss of experienced leaders. School navigation and decision-making capabilities significantly reduced.';
        } else if (resilience < 50) {
            insight = 'Population resilience declining. Recovery potential reduced due to behavioral homogenization.';
        } else {
            insight = 'Moderate behavioral shifts occurring. Some loss of coordination but core functions maintained.';
        }

        insightText.textContent = insight;
    }

    // Update visual school composition
    function updateSchoolComposition(pressure, time, gearType) {
        // Clear existing fish
        schoolBefore.innerHTML = '';
        schoolAfter.innerHTML = '';

        // Before fishing (diverse population)
        const beforeFish = [
            { type: 'leader', count: 1 },
            { type: 'bold', count: 2 },
            { type: 'normal', count: 3 },
            { type: 'shy', count: 1 }
        ];

        beforeFish.forEach(fishType => {
            for (let i = 0; i < fishType.count; i++) {
                const fish = document.createElement('div');
                fish.className = 'fish-icon';
                fish.setAttribute('data-type', fishType.type);
                schoolBefore.appendChild(fish);
            }
        });

        // After fishing (selective removal)
        const afterFish = [];
        const selectivePressure = pressure / 100;

        if (gearType === 'personality') {
            // Removes bold individuals preferentially
            afterFish.push({ type: 'shy', count: Math.max(1, 4 - Math.floor(selectivePressure * 2)) });
            afterFish.push({ type: 'normal', count: Math.max(1, 3 - Math.floor(selectivePressure * 1.5)) });
            afterFish.push({ type: 'bold', count: Math.max(0, 2 - Math.floor(selectivePressure * 3)) });
            afterFish.push({ type: 'leader', count: Math.max(0, 1 - Math.floor(selectivePressure * 2)) });
        } else if (gearType === 'size') {
            // Removes larger individuals
            afterFish.push({ type: 'shy', count: Math.max(1, 2 - Math.floor(selectivePressure * 1)) });
            afterFish.push({ type: 'normal', count: Math.max(1, 3 - Math.floor(selectivePressure * 1.5)) });
            afterFish.push({ type: 'bold', count: Math.max(1, 2 - Math.floor(selectivePressure * 1.5)) });
            afterFish.push({ type: 'leader', count: Math.max(0, 1 - Math.floor(selectivePressure * 2)) });
        } else {
            // Mixed selectivity
            afterFish.push({ type: 'shy', count: Math.max(1, 3 - Math.floor(selectivePressure * 1.5)) });
            afterFish.push({ type: 'normal', count: Math.max(1, 3 - Math.floor(selectivePressure * 1.2)) });
            afterFish.push({ type: 'bold', count: Math.max(0, 2 - Math.floor(selectivePressure * 2)) });
            afterFish.push({ type: 'leader', count: Math.max(0, 1 - Math.floor(selectivePressure * 1.5)) });
        }

        afterFish.forEach(fishType => {
            for (let i = 0; i < fishType.count; i++) {
                const fish = document.createElement('div');
                fish.className = 'fish-icon';
                fish.setAttribute('data-type', fishType.type);
                schoolAfter.appendChild(fish);
            }
        });
    }

    // Event listeners for controls
    pressureSlider.addEventListener('input', function() {
        const pressure = this.value;
        let label = 'Light';
        if (pressure > 70) label = 'Heavy';
        else if (pressure > 40) label = 'Moderate';
        pressureValue.textContent = `${pressure}% (${label})`;
        updateSimulation();
    });

    timeSlider.addEventListener('input', function() {
        timeValue.textContent = `${this.value} years`;
        updateSimulation();
    });

    gearSelect.addEventListener('change', function() {
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
    const pressureSlider = document.getElementById('fishing-pressure');
    if (pressureSlider) {
        let lastPressureValue = pressureSlider.value;

        pressureSlider.addEventListener('input', function() {
            if (this.value !== lastPressureValue) {
                announceToScreenReader(`Fishing pressure changed to ${this.value} percent`);
                lastPressureValue = this.value;
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
        outline: 2px solid #60a5fa;
        outline-offset: 2px;
    }

    .high-contrast {
        --bg-color: #000000;
        --text-color: #ffffff;
        --accent-color: #ffff00;
    }

    .high-contrast .mechanism-card,
    .case-card,
    .management-card,
    .crisis-stat {
        border: 2px solid #ffffff;
    }

    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    /* Fish school animation controls */
    .fish-school .fish {
        transition: all 0.3s ease;
    }

    .reduced-motion .fish-school .fish {
        transition: none;
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
        initializeFishSchoolAnimation,
        initializeBehaviorSimulator,
        initializeMechanismCards,
        initializeCaseStudies,
        initializeAccessibilityFeatures,
        announceToScreenReader
    };
}