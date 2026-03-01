// Polar Night Metabolic Suppression Breakdown - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    initializeTabs();

    // Initialize charts
    initializeCharts();

    // Initialize calculator
    initializeCalculator();

    // Initialize animations
    initializeAnimations();
});

// Tab switching functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Initialize all charts
function initializeCharts() {
    createMetabolicRateChart();
    createTemperatureCorrelationChart();
    createSpeciesImpactChart();
    createSeasonalVariationChart();
    createRegionalDistributionChart();
    createFutureProjectionChart();
}

// Metabolic Rate Chart
function createMetabolicRateChart() {
    const ctx = document.getElementById('metabolicRateChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Normal Metabolic Rate (kcal/day)',
                data: [120, 115, 110, 105, 100, 95, 90, 85, 80, 75, 70, 65],
                borderColor: '#1a237e',
                backgroundColor: 'rgba(26, 35, 126, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Suppressed Metabolic Rate (kcal/day)',
                data: [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45],
                borderColor: '#f57c00',
                backgroundColor: 'rgba(245, 124, 0, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Metabolic Rate Suppression During Polar Night'
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Metabolic Rate (kcal/day)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });
}

// Temperature Correlation Chart
function createTemperatureCorrelationChart() {
    const ctx = document.getElementById('temperatureCorrelationChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Temperature vs Metabolic Suppression',
                data: [
                    { x: -15, y: 85 }, { x: -12, y: 82 }, { x: -10, y: 78 },
                    { x: -8, y: 75 }, { x: -5, y: 70 }, { x: -3, y: 65 },
                    { x: -1, y: 60 }, { x: 1, y: 55 }, { x: 3, y: 50 },
                    { x: 5, y: 45 }, { x: 7, y: 40 }, { x: 10, y: 35 }
                ],
                backgroundColor: '#5e35b1',
                borderColor: '#5e35b1'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Temperature Correlation with Metabolic Suppression'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Metabolic Suppression (%)'
                    }
                }
            }
        }
    });
}

// Species Impact Chart
function createSpeciesImpactChart() {
    const ctx = document.getElementById('speciesImpactChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Polar Bears', 'Arctic Foxes', 'Reindeer', 'Penguins', 'Seals', 'Walruses'],
            datasets: [{
                label: 'Metabolic Impact Score',
                data: [85, 72, 68, 91, 76, 63],
                backgroundColor: [
                    '#1a237e', '#3949ab', '#5e35b1', '#7e57c2',
                    '#9575cd', '#ba68c8'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Species-Specific Metabolic Impact'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Impact Score'
                    }
                }
            }
        }
    });
}

// Seasonal Variation Chart
function createSeasonalVariationChart() {
    const ctx = document.getElementById('seasonalVariationChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Winter', 'Spring', 'Summer', 'Fall'],
            datasets: [{
                label: 'Normal Activity',
                data: [30, 70, 95, 60],
                borderColor: '#2e7d32',
                backgroundColor: 'rgba(46, 125, 50, 0.2)'
            }, {
                label: 'Current Activity',
                data: [15, 45, 85, 40],
                borderColor: '#f57c00',
                backgroundColor: 'rgba(245, 124, 0, 0.2)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Seasonal Activity Variation'
                }
            }
        }
    });
}

// Regional Distribution Chart
function createRegionalDistributionChart() {
    const ctx = document.getElementById('regionalDistributionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Arctic Ocean', 'Greenland', 'Canadian Arctic', 'Russian Arctic', 'Alaska'],
            datasets: [{
                data: [25, 20, 18, 22, 15],
                backgroundColor: [
                    '#1a237e', '#3949ab', '#5e35b1', '#7e57c2', '#9575cd'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Regional Distribution of Impact'
                }
            }
        }
    });
}

// Future Projection Chart
function createFutureProjectionChart() {
    const ctx = document.getElementById('futureProjectionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2025', '2030', '2035', '2040', '2045', '2050'],
            datasets: [{
                label: 'Projected Metabolic Suppression Increase (%)',
                data: [0, 15, 28, 42, 58, 75, 95],
                borderColor: '#d32f2f',
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Future Projections (2020-2050)'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Suppression Increase (%)'
                    }
                }
            }
        }
    });
}

// Calculator functionality
function initializeCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    if (!calculateBtn) return;

    calculateBtn.addEventListener('click', performCalculation);
}

function performCalculation() {
    // Get input values
    const species = document.getElementById('species').value;
    const temperature = parseFloat(document.getElementById('temperature').value) || 0;
    const duration = parseFloat(document.getElementById('duration').value) || 0;
    const bodyMass = parseFloat(document.getElementById('bodyMass').value) || 0;

    // Calculate metabolic suppression
    const baseSuppression = calculateBaseSuppression(temperature);
    const durationFactor = calculateDurationFactor(duration);
    const massFactor = calculateMassFactor(bodyMass);
    const speciesFactor = getSpeciesFactor(species);

    const totalSuppression = baseSuppression * durationFactor * massFactor * speciesFactor;

    // Calculate energy deficit
    const baseMetabolicRate = calculateBMR(bodyMass, species);
    const energyDeficit = baseMetabolicRate * (totalSuppression / 100);

    // Calculate survival probability
    const survivalProbability = calculateSurvivalProbability(totalSuppression, duration);

    // Update results
    updateResults(totalSuppression, energyDeficit, survivalProbability);
}

function calculateBaseSuppression(temperature) {
    // Base suppression increases with temperature
    return Math.max(0, Math.min(90, (temperature + 15) * 3));
}

function calculateDurationFactor(duration) {
    // Longer duration increases suppression
    return Math.min(2, 1 + (duration / 100));
}

function calculateMassFactor(bodyMass) {
    // Larger animals have different metabolic scaling
    if (bodyMass < 10) return 1.2; // Small animals
    if (bodyMass < 100) return 1.0; // Medium animals
    return 0.8; // Large animals
}

function getSpeciesFactor(species) {
    const factors = {
        'polar-bear': 1.0,
        'arctic-fox': 0.9,
        'reindeer': 0.8,
        'penguin': 1.1,
        'seal': 0.95,
        'walrus': 0.85
    };
    return factors[species] || 1.0;
}

function calculateBMR(bodyMass, species) {
    // Simplified BMR calculation (kcal/day)
    const baseBMR = 70 * Math.pow(bodyMass, 0.75);
    return baseBMR * getSpeciesFactor(species);
}

function calculateSurvivalProbability(suppression, duration) {
    // Simplified survival calculation
    const baseSurvival = 100 - suppression;
    const durationPenalty = duration * 0.5;
    return Math.max(0, Math.min(100, baseSurvival - durationPenalty));
}

function updateResults(suppression, energyDeficit, survivalProbability) {
    document.getElementById('suppressionResult').textContent = suppression.toFixed(1) + '%';
    document.getElementById('energyDeficitResult').textContent = energyDeficit.toFixed(0) + ' kcal/day';
    document.getElementById('survivalResult').textContent = survivalProbability.toFixed(1) + '%';

    // Update result card colors based on severity
    updateResultCardColors(suppression, survivalProbability);
}

function updateResultCardColors(suppression, survivalProbability) {
    const suppressionCard = document.querySelector('.result-card:nth-child(1)');
    const survivalCard = document.querySelector('.result-card:nth-child(3)');

    // Suppression severity
    if (suppression > 70) {
        suppressionCard.style.borderLeft = '4px solid #d32f2f';
    } else if (suppression > 40) {
        suppressionCard.style.borderLeft = '4px solid #f57c00';
    } else {
        suppressionCard.style.borderLeft = '4px solid #2e7d32';
    }

    // Survival probability
    if (survivalProbability < 30) {
        survivalCard.style.borderLeft = '4px solid #d32f2f';
    } else if (survivalProbability < 60) {
        survivalCard.style.borderLeft = '4px solid #f57c00';
    } else {
        survivalCard.style.borderLeft = '4px solid #2e7d32';
    }
}

// Animation functionality
function initializeAnimations() {
    // Animate stat cards on scroll
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

    // Observe stat cards
    document.querySelectorAll('.stat-card, .analysis-card, .impact-item, .solution-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Utility functions
function formatNumber(num) {
    return num.toLocaleString();
}

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

// Export functions for potential external use
window.PolarNightCalculator = {
    calculateBaseSuppression,
    calculateDurationFactor,
    calculateMassFactor,
    getSpeciesFactor,
    calculateBMR,
    calculateSurvivalProbability
};