// High-Altitude Aviation Emissions & Alpine Ecosystems - JavaScript
// Interactive features for educational web interface

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initializeTabs();
    initializeCharts();
    initializeSimulator();
    initializeAnimations();
    initializeAccessibility();
});

// Tab System
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            // Update URL hash for bookmarking
            window.location.hash = tabId;

            // Trigger animations for new content
            animateTabContent(tabId);
        });
    });

    // Handle initial tab from URL hash
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        const initialTab = document.querySelector(`[data-tab="${hash}"]`);
        if (initialTab) {
            initialTab.click();
        }
    }
}

// Tab Content Animations
function animateTabContent(tabId) {
    const content = document.getElementById(tabId);
    const cards = content.querySelectorAll('.source-card, .impact-item, .solution-card, .pollutant-card, .region-card, .case-study, .economic-sector');

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Chart.js Visualizations
function initializeCharts() {
    // Deposition Pattern Chart
    const depositionCtx = document.getElementById('depositionChart');
    if (depositionCtx) {
        new Chart(depositionCtx, {
            type: 'line',
            data: {
                labels: ['500m', '1,000m', '1,500m', '2,000m', '2,500m', '3,000m', '3,500m', '4,000m'],
                datasets: [{
                    label: 'Nitrogen Deposition (kg/ha/year)',
                    data: [8, 12, 18, 25, 22, 15, 10, 5],
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
                }, {
                    label: 'Particulate Deposition (μg/m²/day)',
                    data: [5, 8, 15, 28, 35, 25, 18, 12],
                    borderColor: 'rgba(96, 165, 250, 1)',
                    backgroundColor: 'rgba(96, 165, 250, 0.1)',
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#f8fafc'
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Elevation (meters)',
                            color: '#f8fafc'
                        },
                        ticks: {
                            color: '#f8fafc'
                        },
                        grid: {
                            color: 'rgba(248, 250, 252, 0.1)'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            color: '#f8fafc',
                            callback: function(value) {
                                return value + ' kg/ha';
                            }
                        },
                        grid: {
                            color: 'rgba(248, 250, 252, 0.1)'
                        },
                        title: {
                            display: true,
                            text: 'Nitrogen Deposition',
                            color: '#f8fafc'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        ticks: {
                            color: '#f8fafc',
                            callback: function(value) {
                                return value + ' μg/m²';
                            }
                        },
                        grid: {
                            drawOnChartArea: false,
                            color: 'rgba(248, 250, 252, 0.1)'
                        },
                        title: {
                            display: true,
                            text: 'Particulate Deposition',
                            color: '#f8fafc'
                        }
                    }
                }
            }
        });
    }

    // Pollution Transport Chart (initialized with default data)
    initializeTransportChart();
}

function initializeTransportChart() {
    const transportCtx = document.getElementById('pollutionTransportChart');
    if (transportCtx) {
        window.pollutionTransportChart = new Chart(transportCtx, {
            type: 'radar',
            data: {
                labels: ['Jet Stream', 'Orographic Lift', 'Precipitation', 'Dry Deposition', 'Cold Trapping', 'Long-Range Transport'],
                datasets: [{
                    label: 'Transport Efficiency (%)',
                    data: [85, 75, 90, 60, 70, 80],
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(248, 250, 252, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(248, 250, 252, 0.1)'
                        },
                        pointLabels: {
                            color: '#f8fafc',
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }
}

// Aviation Pollution Impact Simulator
function initializeSimulator() {
    const controls = {
        flightVolume: document.getElementById('flightVolume'),
        engineEfficiency: document.getElementById('engineEfficiency'),
        altitude: document.getElementById('altitude')
    };

    const values = {
        flightValue: document.getElementById('flightValue'),
        efficiencyValue: document.getElementById('efficiencyValue'),
        altitudeValue: document.getElementById('altitudeValue')
    };

    const metrics = {
        noxBar: document.getElementById('noxBar'),
        noxValue: document.getElementById('noxValue'),
        contrailBar: document.getElementById('contrailBar'),
        contrailValue: document.getElementById('contrailValue'),
        depositionBar: document.getElementById('depositionBar'),
        depositionValue: document.getElementById('depositionValue')
    };

    // Update display values and calculations
    function updateSimulator() {
        const flightVolume = parseInt(controls.flightVolume.value);
        const engineEfficiency = parseInt(controls.engineEfficiency.value) / 100;
        const altitude = parseInt(controls.altitude.value);

        // Update display values
        values.flightValue.textContent = flightVolume + ' million';
        values.efficiencyValue.textContent = controls.engineEfficiency.value + '%';
        values.altitudeValue.textContent = altitude + ' ft';

        // Calculate emissions (simplified model)
        const baseNOx = 2.4; // million tons/year at 35M flights
        const flightMultiplier = flightVolume / 35;
        const efficiencyReduction = 1 - (engineEfficiency - 0.1) * 0.5; // Efficiency ranges from 10-30%
        const altitudeFactor = 1 + (altitude - 35000) * 0.00001; // Slight altitude effect

        const totalNOx = baseNOx * flightMultiplier * efficiencyReduction * altitudeFactor;

        // Calculate contrail coverage (simplified model)
        const contrailBase = 0.08; // % of sky coverage
        const contrailNOx = totalNOx / baseNOx;
        const contrailEfficiency = 1 - engineEfficiency * 0.3;
        const contrailAltitude = Math.max(0, 1 - Math.abs(altitude - 35000) * 0.00002);

        const totalContrail = contrailBase * contrailNOx * contrailEfficiency * contrailAltitude;

        // Calculate alpine deposition (simplified model)
        const depositionBase = 18; // kg/ha/year
        const depositionNOx = totalNOx / baseNOx;
        const depositionAltitude = 1 + (altitude - 30000) * 0.000005; // Higher altitude = more deposition
        const depositionEfficiency = 1 - engineEfficiency * 0.2;

        const totalDeposition = depositionBase * depositionNOx * depositionAltitude * depositionEfficiency;

        // Update metrics display
        updateMetric(metrics.noxBar, metrics.noxValue, totalNOx, 0, 4, 'M tons/year');
        updateMetric(metrics.contrailBar, metrics.contrailValue, totalContrail, 0, 0.15, '%');
        updateMetric(metrics.depositionBar, metrics.depositionValue, totalDeposition, 0, 35, ' kg/ha/year');

        // Update transport chart data
        updateTransportChart(totalNOx, altitude);
    }

    function updateMetric(bar, value, current, min, max, unit) {
        const percentage = ((current - min) / (max - min)) * 100;
        bar.style.width = Math.min(100, Math.max(0, percentage)) + '%';
        value.textContent = current.toFixed(1) + unit;
    }

    function updateTransportChart(noxLevel, altitude) {
        if (window.pollutionTransportChart) {
            // Adjust transport efficiency based on NOx levels and altitude
            const altitudeEfficiency = Math.max(0.5, 1 - Math.abs(altitude - 35000) * 0.00001);
            const noxEfficiency = Math.min(1.2, 0.8 + (noxLevel / 2.4) * 0.4);

            const newData = [
                85 * altitudeEfficiency, // Jet Stream
                75 * noxEfficiency,      // Orographic Lift
                90 * noxEfficiency,      // Precipitation
                60 * altitudeEfficiency, // Dry Deposition
                70 * altitudeEfficiency, // Cold Trapping
                80 * noxEfficiency       // Long-Range Transport
            ];

            window.pollutionTransportChart.data.datasets[0].data = newData;
            window.pollutionTransportChart.update();
        }
    }

    // Add event listeners
    Object.values(controls).forEach(control => {
        control.addEventListener('input', updateSimulator);
    });

    // Initialize with default values
    updateSimulator();
}

// Animation Effects
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.source-card, .impact-item, .solution-card, .pollutant-card, .region-card, .case-study, .economic-sector');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Accessibility Features
function initializeAccessibility() {
    // Keyboard navigation for tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % tabButtons.length;
                tabButtons[nextIndex].focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                tabButtons[prevIndex].focus();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Add ARIA labels and roles
    const tabsContainer = document.querySelector('.tabs');
    if (tabsContainer) {
        tabsContainer.setAttribute('role', 'tablist');
        tabsContainer.setAttribute('aria-label', 'Aviation emissions impact sections');
    }

    tabButtons.forEach(button => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', button.classList.contains('active'));
        button.setAttribute('tabindex', button.classList.contains('active') ? '0' : '-1');
    });

    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-labelledby', content.id + '-tab');
    });

    // Update ARIA attributes when tabs change
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-button')) {
            tabButtons.forEach(button => {
                button.setAttribute('aria-selected', button.classList.contains('active'));
                button.setAttribute('tabindex', button.classList.contains('active') ? '0' : '-1');
            });
        }
    });

    // High contrast mode detection
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }

    // Reduced motion detection
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
}

// Utility Functions
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

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window && 'getEntriesByType' in performance) {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.fetchStart;

            console.log(`Page load time: ${loadTime}ms`);

            // Send analytics if needed
            // sendAnalytics('page_load_time', loadTime);
        });
    }
}

// Initialize performance monitoring
monitorPerformance();

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics service
});

// Service worker registration (if needed for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export functions for potential external use
window.AviationInterface = {
    initializeTabs,
    initializeCharts,
    initializeSimulator,
    updateTransportChart: (noxLevel, altitude) => {
        if (window.pollutionTransportChart) {
            const altitudeEfficiency = Math.max(0.5, 1 - Math.abs(altitude - 35000) * 0.00001);
            const noxEfficiency = Math.min(1.2, 0.8 + (noxLevel / 2.4) * 0.4);

            const newData = [
                85 * altitudeEfficiency,
                75 * noxEfficiency,
                90 * noxEfficiency,
                60 * altitudeEfficiency,
                70 * altitudeEfficiency,
                80 * noxEfficiency
            ];

            window.pollutionTransportChart.data.datasets[0].data = newData;
            window.pollutionTransportChart.update();
        }
    }
};