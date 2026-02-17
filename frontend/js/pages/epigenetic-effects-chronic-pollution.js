// Epigenetic Effects of Chronic Pollution Exposure Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeScrollAnimations();
    initializeHeroStats();
    initializeEpigeneticSimulator();
    initializeMechanismCards();
    initializePollutantCards();
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
                if (stat.nextElementSibling.textContent.includes('+')) {
                    stat.textContent = Math.floor(current) + '+';
                } else {
                    stat.textContent = Math.floor(current);
                }
            } else {
                if (stat.nextElementSibling.textContent.includes('+')) {
                    stat.textContent = Math.floor(current) + '+';
                } else {
                    stat.textContent = Math.floor(current);
                }
            }
        }, 20);
    });
}

// Interactive epigenetic impact simulator
function initializeEpigeneticSimulator() {
    const pollutantSelect = document.getElementById('pollutant-select');
    const durationSlider = document.getElementById('exposure-duration');
    const levelSlider = document.getElementById('exposure-level');

    const durationValue = document.getElementById('duration-value');
    const levelValue = document.getElementById('level-value');

    // Gene expression elements
    const tumorSuppressorFill = document.getElementById('tumor-suppressor-fill');
    const detoxEnzymeFill = document.getElementById('detox-enzyme-fill');
    const cytokineFill = document.getElementById('cytokine-fill');

    const tumorSuppressorValue = document.getElementById('tumor-suppressor-value');
    const detoxEnzymeValue = document.getElementById('detox-enzyme-value');
    const cytokineValue = document.getElementById('cytokine-value');

    // Health impact elements
    const cancerRiskFill = document.getElementById('cancer-risk-fill');
    const neuroRiskFill = document.getElementById('neuro-risk-fill');
    const reproRiskFill = document.getElementById('repro-risk-fill');

    const cancerRiskValue = document.getElementById('cancer-risk-value');
    const neuroRiskValue = document.getElementById('neuro-risk-value');
    const reproRiskValue = document.getElementById('repro-risk-value');

    // Inheritance elements
    const gen0Marks = document.getElementById('gen0-marks');
    const gen1Marks = document.getElementById('gen1-marks');
    const gen2Marks = document.getElementById('gen2-marks');
    const gen3Marks = document.getElementById('gen3-marks');

    if (!pollutantSelect || !durationSlider || !levelSlider) return;

    // Pollutant-specific epigenetic profiles
    const pollutantProfiles = {
        'heavy-metal': {
            tumorSuppressor: { silenced: 0.8, upregulated: 0.2 },
            detoxEnzyme: { silenced: 0.1, upregulated: 0.9 },
            cytokine: { silenced: 0.2, upregulated: 0.8 },
            cancerRisk: 0.85,
            neuroRisk: 0.75,
            reproRisk: 0.60
        },
        'endocrine': {
            tumorSuppressor: { silenced: 0.6, upregulated: 0.4 },
            detoxEnzyme: { silenced: 0.3, upregulated: 0.7 },
            cytokine: { silenced: 0.4, upregulated: 0.6 },
            cancerRisk: 0.70,
            neuroRisk: 0.55,
            reproRisk: 0.80
        },
        'air': {
            tumorSuppressor: { silenced: 0.7, upregulated: 0.3 },
            detoxEnzyme: { silenced: 0.2, upregulated: 0.8 },
            cytokine: { silenced: 0.5, upregulated: 0.5 },
            cancerRisk: 0.75,
            neuroRisk: 0.65,
            reproRisk: 0.45
        },
        'pops': {
            tumorSuppressor: { silenced: 0.9, upregulated: 0.1 },
            detoxEnzyme: { silenced: 0.1, upregulated: 0.9 },
            cytokine: { silenced: 0.3, upregulated: 0.7 },
            cancerRisk: 0.90,
            neuroRisk: 0.70,
            reproRisk: 0.75
        }
    };

    // Update simulation based on all parameters
    function updateSimulation() {
        const pollutant = pollutantSelect.value;
        const duration = parseInt(durationSlider.value);
        const level = parseInt(levelSlider.value) / 100; // Convert to 0-1 scale

        const profile = pollutantProfiles[pollutant];

        // Calculate epigenetic effects based on duration and exposure level
        const durationFactor = Math.min(duration / 30, 1); // Max effect at 30 years
        const intensityFactor = level * durationFactor;

        // Update gene expression
        updateGeneExpression('tumor-suppressor', profile.tumorSuppressor, intensityFactor, tumorSuppressorFill, tumorSuppressorValue);
        updateGeneExpression('detox-enzyme', profile.detoxEnzyme, intensityFactor, detoxEnzymeFill, detoxEnzymeValue);
        updateGeneExpression('cytokine', profile.cytokine, intensityFactor, cytokineFill, cytokineValue);

        // Update health risks
        updateHealthRisk('cancer', profile.cancerRisk, intensityFactor, cancerRiskFill, cancerRiskValue);
        updateHealthRisk('neuro', profile.neuroRisk, intensityFactor, neuroRiskFill, neuroRiskValue);
        updateHealthRisk('repro', profile.reproRisk, intensityFactor, reproRiskFill, reproRiskValue);

        // Update transgenerational inheritance
        updateInheritance(intensityFactor, gen0Marks, gen1Marks, gen2Marks, gen3Marks);
    }

    // Update individual gene expression
    function updateGeneExpression(geneType, profile, intensity, fillElement, valueElement) {
        const silencedPercent = profile.silenced * intensity * 100;
        const upregulatedPercent = profile.upregulated * intensity * 100;

        if (geneType === 'tumor-suppressor') {
            fillElement.style.width = `${silencedPercent}%`;
            valueElement.textContent = silencedPercent > 50 ? 'Silenced' : 'Normal';
        } else {
            fillElement.style.width = `${upregulatedPercent}%`;
            valueElement.textContent = upregulatedPercent > 50 ? 'Upregulated' : 'Normal';
        }
    }

    // Update health risk indicators
    function updateHealthRisk(riskType, baseRisk, intensity, fillElement, valueElement) {
        const riskLevel = baseRisk * intensity;

        fillElement.style.width = `${riskLevel * 100}%`;

        if (riskLevel > 0.7) {
            valueElement.textContent = 'High';
            fillElement.className = 'impact-fill high-risk';
        } else if (riskLevel > 0.4) {
            valueElement.textContent = 'Medium';
            fillElement.className = 'impact-fill medium-risk';
        } else {
            valueElement.textContent = 'Low';
            fillElement.className = 'impact-fill low-risk';
        }
    }

    // Update transgenerational inheritance display
    function updateInheritance(intensity, gen0, gen1, gen2, gen3) {
        const baseInheritance = intensity * 100;

        gen0.textContent = `${Math.round(baseInheritance)}%`;
        gen1.textContent = `${Math.round(baseInheritance * 0.65)}%`;
        gen2.textContent = `${Math.round(baseInheritance * 0.35)}%`;
        gen3.textContent = `${Math.round(baseInheritance * 0.15)}%`;
    }

    // Event listeners
    pollutantSelect.addEventListener('change', updateSimulation);

    durationSlider.addEventListener('input', function() {
        durationValue.textContent = `${this.value} years`;
        updateSimulation();
    });

    levelSlider.addEventListener('input', function() {
        levelValue.textContent = `${this.value}%`;
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
                details.style.maxHeight = '300px';
            });

            card.addEventListener('mouseleave', function() {
                details.style.maxHeight = '0';
            });
        }
    });
}

// Interactive pollutant cards
function initializePollutantCards() {
    const pollutantCards = document.querySelectorAll('.pollutant-card');

    pollutantCards.forEach(card => {
        // Add click to expand/collapse effects
        const effects = card.querySelector('.pollutant-effects');
        if (effects) {
            effects.style.maxHeight = '200px';
            effects.style.overflow = 'hidden';
            effects.style.transition = 'max-height 0.3s ease';

            card.addEventListener('click', function() {
                if (effects.style.maxHeight === '200px') {
                    effects.style.maxHeight = '500px';
                } else {
                    effects.style.maxHeight = '200px';
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
        // Add staggered animation
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);

        // Add click interaction
        item.addEventListener('click', function() {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
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
    const pollutantSelect = document.getElementById('pollutant-select');
    if (pollutantSelect) {
        pollutantSelect.addEventListener('change', function() {
            announceToScreenReader(`Pollutant changed to ${this.options[this.selectedIndex].text}`);
        });
    }

    const durationSlider = document.getElementById('exposure-duration');
    if (durationSlider) {
        let lastDurationValue = durationSlider.value;

        durationSlider.addEventListener('input', function() {
            if (this.value !== lastDurationValue) {
                announceToScreenReader(`Exposure duration changed to ${this.value} years`);
                lastDurationValue = this.value;
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
    .pollutant-card:focus {
        outline: 2px solid #6366f1;
        outline-offset: 2px;
    }

    .timeline-item.active .timeline-marker {
        background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
        transform: scale(1.1);
    }

    .timeline-item.active .timeline-content {
        border-color: #6366f1;
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
    }

    .high-contrast {
        --bg-color: #000000;
        --text-color: #ffffff;
        --accent-color: #ffff00;
    }

    .high-contrast .mechanism-card,
    .high-contrast .pollutant-card,
    .high-contrast .research-card,
    .high-contrast .timeline-content {
        border: 2px solid #ffffff;
    }

    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    .mechanism-card:hover .mechanism-details {
        max-height: 300px;
    }

    .pollutant-card:hover .pollutant-effects {
        max-height: 500px;
    }

    /* DNA helix animation enhancement */
    .dna-helix:hover .methyl-group {
        animation-duration: 1s;
    }

    /* Loading animation for simulator results */
    .expression-fill,
    .impact-fill {
        position: relative;
    }

    .expression-fill::after,
    .impact-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: result-shimmer 2s infinite;
    }

    @keyframes result-shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }

    .reduced-motion .expression-fill::after,
    .reduced-motion .impact-fill::after {
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
        initializeEpigeneticSimulator,
        initializeMechanismCards,
        initializePollutantCards,
        initializeTimeline,
        initializeAccessibilityFeatures,
        announceToScreenReader
    };
}