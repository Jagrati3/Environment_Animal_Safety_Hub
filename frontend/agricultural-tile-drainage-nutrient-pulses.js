// Agricultural Tile Drainage and Nutrient Pulses - JavaScript
// Interactive simulator and visualizations for nutrient loading dynamics

class NutrientPulseSimulator {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.initializeCharts();
        this.updateSimulator();
        this.setupAccessibility();
        this.setupNavigation();
        this.setupMechanismExplorer();
    }

    initializeElements() {
        // Simulator controls
        this.precipitationSlider = document.getElementById('precipitation');
        this.fertilizerSlider = document.getElementById('fertilizer');
        this.drainageFlowSlider = document.getElementById('drainage-flow');
        this.soilTypeSelect = document.getElementById('soil-type');

        // Control value displays
        this.precipitationValue = document.getElementById('precipitation-value');
        this.fertilizerValue = document.getElementById('fertilizer-value');
        this.drainageFlowValue = document.getElementById('drainage-flow-value');

        // Result displays
        this.pulseIntensity = document.getElementById('pulse-intensity');
        this.nitrateLevel = document.getElementById('nitrate-level');
        this.phosphorusLoad = document.getElementById('phosphorus-load');
        this.riverImpact = document.getElementById('river-impact');

        // Risk indicators
        this.pulseBar = document.getElementById('pulse-bar');
        this.nitrateBar = document.getElementById('nitrate-bar');
        this.phosphorusBar = document.getElementById('phosphorus-bar');

        // Impact indicators
        this.eutrophicationRisk = document.getElementById('eutrophication-risk');
        this.drinkingRisk = document.getElementById('drinking-risk');
        this.aquaticRisk = document.getElementById('aquatic-risk');

        // Drainage metrics
        this.baseFlow = document.getElementById('base-flow');
        this.peakFlow = document.getElementById('peak-flow');
        this.responseTime = document.getElementById('response-time');
        this.drainageExtent = document.getElementById('drainage-extent');

        // Nutrient sources
        this.fertN = document.getElementById('fert-n');
        this.manureP = document.getElementById('manure-p');
        this.soilOrganic = document.getElementById('soil-organic');
        this.legacyP = document.getElementById('legacy-p');
    }

    setupEventListeners() {
        // Simulator controls
        this.precipitationSlider.addEventListener('input', () => this.updateSimulator());
        this.fertilizerSlider.addEventListener('input', () => this.updateSimulator());
        this.drainageFlowSlider.addEventListener('input', () => this.updateSimulator());
        this.soilTypeSelect.addEventListener('change', () => this.updateSimulator());

        // Update value displays
        this.precipitationSlider.addEventListener('input', (e) => {
            this.precipitationValue.textContent = e.target.value + ' mm';
        });

        this.fertilizerSlider.addEventListener('input', (e) => {
            this.fertilizerValue.textContent = e.target.value;
        });

        this.drainageFlowSlider.addEventListener('input', (e) => {
            this.drainageFlowValue.textContent = e.target.value;
        });
    }

    updateSimulator() {
        const precipitation = parseFloat(this.precipitationSlider.value);
        const fertilizer = parseFloat(this.fertilizerSlider.value);
        const drainageFlow = parseFloat(this.drainageFlowSlider.value);
        const soilType = this.soilTypeSelect.value;

        // Calculate nutrient pulse intensity
        const pulseIntensity = this.calculatePulseIntensity(precipitation, fertilizer, drainageFlow, soilType);
        this.updatePulseDisplay(pulseIntensity);

        // Calculate nitrate concentration
        const nitrateLevel = this.calculateNitrateLevel(precipitation, fertilizer, soilType);
        this.updateNitrateDisplay(nitrateLevel);

        // Calculate phosphorus load
        const phosphorusLoad = this.calculatePhosphorusLoad(precipitation, fertilizer, soilType);
        this.updatePhosphorusDisplay(phosphorusLoad);

        // Update river impact
        const riverImpact = this.calculateRiverImpact(pulseIntensity, nitrateLevel, phosphorusLoad);
        this.updateRiverImpact(riverImpact);

        // Update drainage metrics
        this.updateDrainageMetrics(drainageFlow);
    }

    calculatePulseIntensity(precipitation, fertilizer, drainageFlow, soilType) {
        // Base calculation with soil type modifiers
        const soilModifiers = {
            clay: 0.8,
            loam: 1.0,
            sandy: 1.3
        };

        const baseIntensity = (precipitation * 0.1) + (fertilizer * 0.02) + (drainageFlow * 0.5);
        return Math.round(baseIntensity * soilModifiers[soilType] * 10) / 10;
    }

    calculateNitrateLevel(precipitation, fertilizer, soilType) {
        // Nitrate concentration based on fertilizer and precipitation
        const soilModifiers = {
            clay: 0.7,
            loam: 1.0,
            sandy: 1.2
        };

        const baseNitrate = (fertilizer * 0.3) + (precipitation * 0.2);
        return Math.round(baseNitrate * soilModifiers[soilType] * 10) / 10;
    }

    calculatePhosphorusLoad(precipitation, fertilizer, soilType) {
        // Phosphorus load calculation
        const soilModifiers = {
            clay: 1.2,
            loam: 1.0,
            sandy: 0.8
        };

        const basePhosphorus = (fertilizer * 0.05) + (precipitation * 0.01);
        return Math.round(basePhosphorus * soilModifiers[soilType] * 100) / 100;
    }

    calculateRiverImpact(pulseIntensity, nitrateLevel, phosphorusLoad) {
        const totalRisk = (pulseIntensity * 0.4) + (nitrateLevel * 0.3) + (phosphorusLoad * 0.3);

        if (totalRisk < 2) return 'Low';
        if (totalRisk < 4) return 'Moderate';
        if (totalRisk < 6) return 'High';
        return 'Critical';
    }

    updatePulseDisplay(intensity) {
        let intensityText = 'Low';
        let barWidth = 30;

        if (intensity > 8) {
            intensityText = 'Critical';
            barWidth = 100;
        } else if (intensity > 6) {
            intensityText = 'High';
            barWidth = 80;
        } else if (intensity > 4) {
            intensityText = 'Moderate';
            barWidth = 60;
        } else if (intensity > 2) {
            intensityText = 'Low-Moderate';
            barWidth = 45;
        }

        this.pulseIntensity.textContent = intensityText;
        this.pulseBar.style.width = barWidth + '%';
    }

    updateNitrateDisplay(level) {
        this.nitrateLevel.textContent = level + ' mg/L';
        const percentage = Math.min((level / 50) * 100, 100);
        this.nitrateBar.style.width = percentage + '%';
    }

    updatePhosphorusDisplay(load) {
        this.phosphorusLoad.textContent = load + ' kg/ha';
        const percentage = Math.min((load / 5) * 100, 100);
        this.phosphorusBar.style.width = percentage + '%';
    }

    updateRiverImpact(impact) {
        this.riverImpact.textContent = impact;

        // Update impact indicators
        const indicators = [this.eutrophicationRisk, this.drinkingRisk, this.aquaticRisk];
        indicators.forEach(indicator => {
            indicator.style.opacity = impact === 'Low' ? '0.3' : '1';
        });

        // Color coding based on impact level
        const colors = {
            'Low': '#27AE60',
            'Moderate': '#F39C12',
            'High': '#E74C3C',
            'Critical': '#8B0000'
        };

        this.riverImpact.style.color = colors[impact] || '#34495E';
    }

    updateDrainageMetrics(flow) {
        // Update flow metrics based on drainage flow
        const baseFlow = (flow * 0.1).toFixed(1);
        const peakFlow = (flow * 5).toFixed(0);
        const responseTime = Math.max(1, Math.round(24 / (flow / 10)));
        const extent = '500,000+ km';

        this.baseFlow.textContent = baseFlow + ' L/s';
        this.peakFlow.textContent = peakFlow + ' L/s';
        this.responseTime.textContent = responseTime + ' hours';
        this.drainageExtent.textContent = extent;
    }

    initializeCharts() {
        this.initializeTransportChart();
        this.initializeGlobalNutrientChart();
    }

    initializeTransportChart() {
        const ctx = document.getElementById('transportChart').getContext('2d');

        const data = {
            labels: ['Nitrate-N', 'Ammonium-N', 'Phosphate-P', 'Particulate-P'],
            datasets: [{
                label: 'Concentration (mg/L)',
                data: [18, 3, 0.8, 0.2],
                backgroundColor: [
                    'rgba(50, 205, 50, 0.8)',
                    'rgba(65, 105, 225, 0.8)',
                    'rgba(255, 140, 0, 0.8)',
                    'rgba(160, 82, 45, 0.8)'
                ],
                borderColor: [
                    'rgba(50, 205, 50, 1)',
                    'rgba(65, 105, 225, 1)',
                    'rgba(255, 140, 0, 1)',
                    'rgba(160, 82, 45, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + ' mg/L';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Concentration (mg/L)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Nutrient Form'
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        };

        this.transportChart = new Chart(ctx, config);
    }

    initializeGlobalNutrientChart() {
        const ctx = document.getElementById('globalNutrientChart').getContext('2d');

        const data = {
            labels: ['USA Midwest', 'Europe', 'Canada Prairies', 'China', 'Australia', 'Other'],
            datasets: [{
                label: 'Tile Drainage Contribution (%)',
                data: [45, 35, 30, 40, 25, 20],
                backgroundColor: [
                    'rgba(139, 69, 19, 0.8)',
                    'rgba(210, 105, 30, 0.8)',
                    'rgba(70, 130, 180, 0.8)',
                    'rgba(30, 144, 255, 0.8)',
                    'rgba(50, 205, 50, 0.8)',
                    'rgba(255, 140, 0, 0.8)'
                ],
                borderColor: [
                    'rgba(139, 69, 19, 1)',
                    'rgba(210, 105, 30, 1)',
                    'rgba(70, 130, 180, 1)',
                    'rgba(30, 144, 255, 1)',
                    'rgba(50, 205, 50, 1)',
                    'rgba(255, 140, 0, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        };

        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed + '% of river nutrient loads';
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            }
        };

        this.globalNutrientChart = new Chart(ctx, config);
    }

    setupAccessibility() {
        // High contrast toggle
        window.toggleHighContrast = () => {
            document.body.classList.toggle('high-contrast');
            this.announceToScreenReader('High contrast mode ' +
                (document.body.classList.contains('high-contrast') ? 'enabled' : 'disabled'));
        };

        // Font size toggle
        window.toggleFontSize = () => {
            const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
            const newSize = currentSize === 16 ? 20 : 16;
            document.body.style.fontSize = newSize + 'px';
            this.announceToScreenReader('Font size ' + (newSize === 20 ? 'increased' : 'normal'));
        };

        // Reduced motion toggle
        window.toggleReducedMotion = () => {
            const currentPref = document.body.style.getPropertyValue('--transition-fast');
            const newPref = currentPref === '0.01ms ease' ? '0.2s ease' : '0.01ms ease';
            document.body.style.setProperty('--transition-fast', newPref);
            document.body.style.setProperty('--transition-normal', newPref);
            document.body.style.setProperty('--transition-slow', newPref);
            this.announceToScreenReader('Reduced motion ' +
                (newPref === '0.01ms ease' ? 'enabled' : 'disabled'));
        };
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';

        document.body.appendChild(announcement);
        announcement.textContent = message;

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.content-section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = e.target.dataset.tab;

                // Update active states
                navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');

                // Show target section
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetTab) {
                        section.classList.add('active');
                    }
                });

                // Smooth scroll to section
                document.getElementById(targetTab).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    setupMechanismExplorer() {
        const mechanismTabs = document.querySelectorAll('.mechanism-tab');
        const mechanismPanels = document.querySelectorAll('.mechanism-panel');

        mechanismTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const mechanism = tab.dataset.mechanism;

                // Update active tab
                mechanismTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Show corresponding panel
                mechanismPanels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.id === mechanism + '-panel') {
                        panel.classList.add('active');
                    }
                });
            });
        });
    }

    // Performance monitoring
    monitorPerformance() {
        if ('performance' in window && 'mark' in window.performance) {
            performance.mark('simulator-initialized');

            // Monitor simulator updates
            this.updateStartTime = 0;
            this.originalUpdateSimulator = this.updateSimulator;

            this.updateSimulator = () => {
                this.updateStartTime = performance.now();
                this.originalUpdateSimulator();
                const updateTime = performance.now() - this.updateStartTime;

                if (updateTime > 16.67) { // More than one frame at 60fps
                    console.warn('Simulator update took longer than 16.67ms:', updateTime);
                }
            };
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const simulator = new NutrientPulseSimulator();

    // Performance monitoring
    simulator.monitorPerformance();

    // Add loading animation
    const heroSection = document.querySelector('.hero-section');
    heroSection.style.opacity = '0';
    heroSection.style.transform = 'translateY(20px)';

    setTimeout(() => {
        heroSection.style.transition = 'opacity 1s ease, transform 1s ease';
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }, 100);

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('.content-card, .case-study, .solution-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });

    // Keyboard navigation for simulator
    document.addEventListener('keydown', (e) => {
        const focused = document.activeElement;

        if (focused && focused.type === 'range') {
            const step = parseFloat(focused.step) || 1;
            const min = parseFloat(focused.min) || 0;
            const max = parseFloat(focused.max) || 100;
            let value = parseFloat(focused.value);

            if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
                e.preventDefault();
                value = Math.min(value + step, max);
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
                e.preventDefault();
                value = Math.max(value - step, min);
            }

            focused.value = value;
            focused.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });

    // Add resize handler for charts
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (simulator.transportChart) {
                simulator.transportChart.resize();
            }
            if (simulator.globalNutrientChart) {
                simulator.globalNutrientChart.resize();
            }
        }, 250);
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send to error reporting service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send to error reporting service
});