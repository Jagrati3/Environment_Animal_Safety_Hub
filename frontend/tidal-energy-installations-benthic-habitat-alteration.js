// Tidal Energy Installations and Benthic Habitat Alteration - JavaScript
// Interactive simulator and visualizations for benthic habitat impacts

class BenthicImpactSimulator {
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
        this.tidalCurrentSlider = document.getElementById('tidal-current');
        this.turbineSizeSlider = document.getElementById('turbine-size');
        this.foundationTypeSelect = document.getElementById('foundation-type');
        this.sedimentTypeSelect = document.getElementById('sediment-type');

        // Control value displays
        this.tidalCurrentValue = document.getElementById('tidal-current-value');
        this.turbineSizeValue = document.getElementById('turbine-size-value');

        // Result displays
        this.habitatAlteration = document.getElementById('habitat-alteration');
        this.sedimentDeposition = document.getElementById('sediment-deposition');
        this.speciesImpact = document.getElementById('species-impact');
        this.recoveryTime = document.getElementById('recovery-time');

        // Risk indicators
        this.alterationBar = document.getElementById('alteration-bar');
        this.sedimentBar = document.getElementById('sediment-bar');
        this.speciesBar = document.getElementById('species-bar');

        // Impact indicators
        this.biodiversityRisk = document.getElementById('biodiversity-risk');
        this.sedimentRisk = document.getElementById('sediment-risk');
        this.fisheriesRisk = document.getElementById('fisheries-risk');

        // Technology metrics
        this.horizontalAxis = document.getElementById('horizontal-axis');
        this.verticalAxis = document.getElementById('vertical-axis');
        this.tidalBarrage = document.getElementById('tidal-barrage');
        this.globalCapacity = document.getElementById('global-capacity');

        // Operating conditions
        this.currentSpeed = document.getElementById('current-speed');
        this.waterDepth = document.getElementById('water-depth');
        this.tidalRange = document.getElementById('tidal-range');
        this.powerDensity = document.getElementById('power-density');
    }

    setupEventListeners() {
        // Simulator controls
        this.tidalCurrentSlider.addEventListener('input', () => this.updateSimulator());
        this.turbineSizeSlider.addEventListener('input', () => this.updateSimulator());
        this.foundationTypeSelect.addEventListener('change', () => this.updateSimulator());
        this.sedimentTypeSelect.addEventListener('change', () => this.updateSimulator());

        // Update value displays
        this.tidalCurrentSlider.addEventListener('input', (e) => {
            this.tidalCurrentValue.textContent = e.target.value + ' m/s';
        });

        this.turbineSizeSlider.addEventListener('input', (e) => {
            this.turbineSizeValue.textContent = e.target.value;
        });
    }

    updateSimulator() {
        const tidalCurrent = parseFloat(this.tidalCurrentSlider.value);
        const turbineSize = parseFloat(this.turbineSizeSlider.value);
        const foundationType = this.foundationTypeSelect.value;
        const sedimentType = this.sedimentTypeSelect.value;

        // Calculate habitat alteration
        const habitatAlteration = this.calculateHabitatAlteration(tidalCurrent, turbineSize, foundationType, sedimentType);
        this.updateHabitatDisplay(habitatAlteration);

        // Calculate sediment deposition
        const sedimentDeposition = this.calculateSedimentDeposition(tidalCurrent, turbineSize, sedimentType);
        this.updateSedimentDisplay(sedimentDeposition);

        // Calculate species impact
        const speciesImpact = this.calculateSpeciesImpact(habitatAlteration, sedimentDeposition, foundationType);
        this.updateSpeciesDisplay(speciesImpact);

        // Update recovery time
        const recoveryTime = this.calculateRecoveryTime(habitatAlteration, sedimentType);
        this.updateRecoveryTime(recoveryTime);

        // Update technology metrics
        this.updateTechnologyMetrics(turbineSize);
    }

    calculateHabitatAlteration(current, size, foundation, sediment) {
        // Base calculation with modifiers
        const foundationModifiers = {
            monopile: 1.0,
            tripod: 1.2,
            gravity: 0.8
        };

        const sedimentModifiers = {
            sand: 1.0,
            mud: 1.3,
            gravel: 0.8
        };

        const baseAlteration = (current * 0.2) + (size * 0.1) + 1.0;
        return Math.round(baseAlteration * foundationModifiers[foundation] * sedimentModifiers[sediment] * 10) / 10;
    }

    calculateSedimentDeposition(current, size, sediment) {
        // Sediment deposition calculation
        const sedimentModifiers = {
            sand: 1.0,
            mud: 1.5,
            gravel: 0.7
        };

        const baseDeposition = (current * 0.3) + (size * 0.05) + 1.0;
        const multiplier = baseDeposition * sedimentModifiers[sediment];
        return Math.round(multiplier * 10) / 10;
    }

    calculateSpeciesImpact(alteration, deposition, foundation) {
        const foundationModifiers = {
            monopile: 1.0,
            tripod: 1.1,
            gravity: 0.9
        };

        const totalImpact = (alteration * 0.6) + (deposition * 0.4);
        return Math.round(totalImpact * foundationModifiers[foundation]);
    }

    calculateRecoveryTime(alteration, sediment) {
        const sedimentModifiers = {
            sand: 1.0,
            mud: 1.3,
            gravel: 0.8
        };

        const baseTime = alteration * 3 * sedimentModifiers[sediment];
        return Math.round(baseTime);
    }

    updateHabitatDisplay(alteration) {
        let alterationText = 'Low';
        let barWidth = 30;

        if (alteration > 4) {
            alterationText = 'Critical';
            barWidth = 100;
        } else if (alteration > 3) {
            alterationText = 'High';
            barWidth = 80;
        } else if (alteration > 2) {
            alterationText = 'Moderate';
            barWidth = 60;
        } else if (alteration > 1) {
            alterationText = 'Low-Moderate';
            barWidth = 45;
        }

        this.habitatAlteration.textContent = alterationText;
        this.alterationBar.style.width = barWidth + '%';
    }

    updateSedimentDisplay(deposition) {
        this.sedimentDeposition.textContent = deposition + 'x increase';
        const percentage = Math.min((deposition / 5) * 100, 100);
        this.sedimentBar.style.width = percentage + '%';
    }

    updateSpeciesDisplay(impact) {
        const percentage = Math.max(0, Math.min(impact, 60));
        this.speciesImpact.textContent = percentage + '% decline';
        this.speciesBar.style.width = percentage + '%';
    }

    updateRecoveryTime(months) {
        this.recoveryTime.textContent = months + ' months';

        // Update impact indicators
        const indicators = [this.biodiversityRisk, this.sedimentRisk, this.fisheriesRisk];
        indicators.forEach(indicator => {
            indicator.style.opacity = months < 12 ? '0.3' : '1';
        });
    }

    updateTechnologyMetrics(size) {
        // Update metrics based on turbine size
        const sizeFactor = size / 20; // Normalized to 20m baseline

        this.horizontalAxis.textContent = Math.round(85 * sizeFactor) + '%';
        this.verticalAxis.textContent = Math.round(10 / sizeFactor) + '%';
        this.tidalBarrage.textContent = Math.round(5 / sizeFactor) + '%';
        this.globalCapacity.textContent = Math.round(15 * sizeFactor) + ' GW';

        this.currentSpeed.textContent = (2 + sizeFactor * 0.5).toFixed(1) + '-4 m/s';
        this.waterDepth.textContent = Math.round(20 + sizeFactor * 10) + '-50 m';
        this.tidalRange.textContent = (2 + sizeFactor).toFixed(1) + '-8 m';
        this.powerDensity.textContent = Math.round(5 + sizeFactor * 2) + '-10 kW/m²';
    }

    initializeCharts() {
        this.initializeHabitatChart();
        this.initializeGlobalTidalChart();
    }

    initializeHabitatChart() {
        const ctx = document.getElementById('habitatChart').getContext('2d');

        const data = {
            labels: ['Soft Sediment', 'Hard Substrate', 'Mixed Habitat', 'Vegetated'],
            datasets: [{
                label: 'Habitat Distribution (%)',
                data: [60, 25, 10, 5],
                backgroundColor: [
                    'rgba(139, 69, 19, 0.8)',
                    'rgba(112, 128, 144, 0.8)',
                    'rgba(32, 178, 170, 0.8)',
                    'rgba(46, 139, 87, 0.8)'
                ],
                borderColor: [
                    'rgba(139, 69, 19, 1)',
                    'rgba(112, 128, 144, 1)',
                    'rgba(32, 178, 170, 1)',
                    'rgba(46, 139, 87, 1)'
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
                                return context.parsed + '% of benthic habitats';
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        };

        this.habitatChart = new Chart(ctx, config);
    }

    initializeGlobalTidalChart() {
        const ctx = document.getElementById('globalTidalChart').getContext('2d');

        const data = {
            labels: ['Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania'],
            datasets: [{
                label: 'Installed Capacity (MW)',
                data: [25, 15, 10, 5, 2, 3],
                backgroundColor: [
                    'rgba(30, 144, 255, 0.8)',
                    'rgba(0, 0, 128, 0.8)',
                    'rgba(0, 206, 209, 0.8)',
                    'rgba(70, 130, 180, 0.8)',
                    'rgba(46, 139, 87, 0.8)',
                    'rgba(32, 178, 170, 0.8)'
                ],
                borderColor: [
                    'rgba(30, 144, 255, 1)',
                    'rgba(0, 0, 128, 1)',
                    'rgba(0, 206, 209, 1)',
                    'rgba(70, 130, 180, 1)',
                    'rgba(46, 139, 87, 1)',
                    'rgba(32, 178, 170, 1)'
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
                                return context.parsed + ' MW installed capacity';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Installed Capacity (MW)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Region'
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            }
        };

        this.globalTidalChart = new Chart(ctx, config);
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
    const simulator = new BenthicImpactSimulator();

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
            const step = parseFloat(focused.step) || 0.1;
            const min = parseFloat(focused.min) || 0;
            const max = parseFloat(focused.max) || 10;
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
            if (simulator.habitatChart) {
                simulator.habitatChart.resize();
            }
            if (simulator.globalTidalChart) {
                simulator.globalTidalChart.resize();
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