// Arctic Freshwater Influx & Marine Salinity Shifts - JavaScript
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
    const cards = content.querySelectorAll('.source-card, .adaptation-category, .tool-card, .platform-card, .metric-card, .sector-card, .policy-card');

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
    // Species Vulnerability Chart
    const vulnerabilityCtx = document.getElementById('speciesVulnerabilityChart');
    if (vulnerabilityCtx) {
        new Chart(vulnerabilityCtx, {
            type: 'radar',
            data: {
                labels: ['Zooplankton', 'Fish Species', 'Marine Mammals', 'Seabirds', 'Corals', 'Seaweed', 'Crustaceans'],
                datasets: [{
                    label: 'Vulnerability Index',
                    data: [85, 75, 70, 65, 90, 55, 80],
                    backgroundColor: 'rgba(14, 165, 233, 0.2)',
                    borderColor: 'rgba(14, 165, 233, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(14, 165, 233, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(14, 165, 233, 1)'
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
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }

    // Arctic Impact Chart (initialized with default data)
    initializeImpactChart();
}

function initializeImpactChart() {
    const impactCtx = document.getElementById('arcticImpactChart');
    if (impactCtx) {
        window.arcticImpactChart = new Chart(impactCtx, {
            type: 'line',
            data: {
                labels: ['1990', '1995', '2000', '2005', '2010', '2015', '2020', '2025'],
                datasets: [{
                    label: 'Surface Salinity (PSU)',
                    data: [34.8, 34.6, 34.4, 34.2, 34.0, 33.8, 33.6, 33.4],
                    borderColor: 'rgba(14, 165, 233, 1)',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Freshwater Influx (km³/year)',
                    data: [3500, 3800, 4100, 4400, 4700, 5000, 5300, 5600],
                    borderColor: 'rgba(20, 184, 166, 1)',
                    backgroundColor: 'rgba(20, 184, 166, 0.1)',
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
                                return value.toFixed(1);
                            }
                        },
                        grid: {
                            color: 'rgba(248, 250, 252, 0.1)'
                        },
                        title: {
                            display: true,
                            text: 'Salinity (PSU)',
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
                                return (value / 1000).toFixed(1) + 'k';
                            }
                        },
                        grid: {
                            drawOnChartArea: false,
                            color: 'rgba(248, 250, 252, 0.1)'
                        },
                        title: {
                            display: true,
                            text: 'Freshwater (km³/year)',
                            color: '#f8fafc'
                        }
                    }
                }
            }
        });
    }
}

// Arctic Impact Simulator
function initializeSimulator() {
    const controls = {
        glacialMelt: document.getElementById('glacialMelt'),
        permafrostThaw: document.getElementById('permafrostThaw'),
        precipitation: document.getElementById('precipitation')
    };

    const values = {
        glacialValue: document.getElementById('glacialValue'),
        permafrostValue: document.getElementById('permafrostValue'),
        precipitationValue: document.getElementById('precipitationValue')
    };

    const metrics = {
        freshwaterBar: document.getElementById('freshwaterBar'),
        freshwaterValue: document.getElementById('freshwaterValue'),
        amocBar: document.getElementById('amocBar'),
        amocValue: document.getElementById('amocValue'),
        biodiversityBar: document.getElementById('biodiversityBar'),
        biodiversityValue: document.getElementById('biodiversityValue')
    };

    // Update display values and calculations
    function updateSimulator() {
        const glacialMelt = parseInt(controls.glacialMelt.value);
        const permafrostThaw = parseInt(controls.permafrostThaw.value) / 100;
        const precipitation = parseInt(controls.precipitation.value) / 100;

        // Update display values
        values.glacialValue.textContent = glacialMelt + ' Gt/year';
        values.permafrostValue.textContent = controls.permafrostThaw.value + '%';
        values.precipitationValue.textContent = controls.precipitation.value + '% increase';

        // Calculate freshwater influx (simplified model)
        const baseFreshwater = 3500; // km³/year
        const glacialContribution = glacialMelt * 10; // Rough conversion
        const permafrostContribution = permafrostThaw * 500; // Rough estimate
        const precipitationContribution = precipitation * 200; // Rough estimate

        const totalFreshwater = baseFreshwater + glacialContribution + permafrostContribution + precipitationContribution;

        // Calculate AMOC strength (simplified model)
        const amocStrength = Math.max(0, 100 - (totalFreshwater - 3500) * 0.02);

        // Calculate biodiversity impact (simplified model)
        const biodiversityImpact = Math.max(0, 100 - (totalFreshwater - 3500) * 0.015);

        // Update metrics display
        updateMetric(metrics.freshwaterBar, metrics.freshwaterValue, totalFreshwater, 3500, 6000, 'km³');
        updateMetric(metrics.amocBar, metrics.amocValue, amocStrength, 0, 100, '%');
        updateMetric(metrics.biodiversityBar, metrics.biodiversityValue, biodiversityImpact, 0, 100, '%');

        // Update chart data
        updateImpactChart(totalFreshwater, amocStrength);
    }

    function updateMetric(bar, value, current, min, max, unit) {
        const percentage = ((current - min) / (max - min)) * 100;
        bar.style.width = Math.min(100, Math.max(0, percentage)) + '%';
        value.textContent = current.toFixed(0) + unit;
    }

    function updateImpactChart(freshwater, amocStrength) {
        if (window.arcticImpactChart) {
            // Update the last data point
            const salinityData = window.arcticImpactChart.data.datasets[0].data;
            const freshwaterData = window.arcticImpactChart.data.datasets[1].data;

            // Calculate salinity reduction based on freshwater influx
            const salinityReduction = (freshwater - 3500) * 0.001;
            salinityData[salinityData.length - 1] = 33.6 - salinityReduction;

            freshwaterData[freshwaterData.length - 1] = freshwater;

            window.arcticImpactChart.update();
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
    const animateElements = document.querySelectorAll('.source-card, .adaptation-category, .tool-card, .platform-card, .metric-card, .sector-card, .policy-card');
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
        tabsContainer.setAttribute('aria-label', 'Arctic freshwater impact sections');
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
window.ArcticInterface = {
    initializeTabs,
    initializeCharts,
    initializeSimulator,
    updateImpactChart: (freshwater, amoc) => {
        if (window.arcticImpactChart) {
            const salinityData = window.arcticImpactChart.data.datasets[0].data;
            const freshwaterData = window.arcticImpactChart.data.datasets[1].data;

            const salinityReduction = (freshwater - 3500) * 0.001;
            salinityData[salinityData.length - 1] = 33.6 - salinityReduction;
            freshwaterData[freshwaterData.length - 1] = freshwater;

            window.arcticImpactChart.update();
        }
    }
};