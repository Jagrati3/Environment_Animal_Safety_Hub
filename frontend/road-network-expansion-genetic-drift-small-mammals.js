// Road Network Expansion and Genetic Drift in Small Mammals - JavaScript
// Interactive functionality for fragmentation simulator and educational interface

// Global variables
let currentTab = 'science';
let simulatorValues = {
    roadDensity: 1.5,
    patchSize: 25,
    isolationDistance: 1.5,
    populationSize: 'medium'
};

// Accessibility settings
let highContrast = false;
let largeFont = false;
let reducedMotion = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSimulator();
    initializeCharts();
    initializeMechanismExplorer();
    initializeAccessibility();
    updateSimulator();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');

            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            const targetSection = document.getElementById(targetTab);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            currentTab = targetTab;

            // Smooth scroll to top of content
            window.scrollTo({
                top: document.querySelector('.main-content').offsetTop - 100,
                behavior: reducedMotion ? 'auto' : 'smooth'
            });
        });
    });
}

// Fragmentation Simulator
function initializeSimulator() {
    const controls = {
        roadDensity: document.getElementById('road-density'),
        patchSize: document.getElementById('patch-size'),
        isolationDistance: document.getElementById('isolation-distance'),
        populationSize: document.getElementById('population-size')
    };

    // Add event listeners for all controls
    Object.keys(controls).forEach(key => {
        const control = controls[key];
        if (control) {
            control.addEventListener('input', function() {
                updateSimulatorValues();
                updateSimulator();
            });
            control.addEventListener('change', function() {
                updateSimulatorValues();
                updateSimulator();
            });
        }
    });
}

function updateSimulatorValues() {
    simulatorValues.roadDensity = parseFloat(document.getElementById('road-density').value);
    simulatorValues.patchSize = parseInt(document.getElementById('patch-size').value);
    simulatorValues.isolationDistance = parseFloat(document.getElementById('isolation-distance').value);
    simulatorValues.populationSize = document.getElementById('population-size').value;

    // Update display values
    document.getElementById('road-density-value').textContent = simulatorValues.roadDensity.toFixed(1);
    document.getElementById('patch-size-value').textContent = simulatorValues.patchSize;
    document.getElementById('isolation-distance-value').textContent = simulatorValues.isolationDistance.toFixed(1);
}

function updateSimulator() {
    // Calculate genetic impacts based on simulator values
    const impacts = calculateGeneticImpacts(simulatorValues);

    // Update display elements
    updateImpactDisplay('genetic-diversity', impacts.geneticDiversityLoss + '%');
    updateImpactDisplay('gene-flow', impacts.geneFlowReduction + '%');
    updateImpactDisplay('inbreeding-risk', impacts.inbreedingRisk);
    updateImpactDisplay('viability-status', impacts.viabilityStatus);

    // Update risk bars
    updateRiskBar('diversity-bar', impacts.geneticDiversityLoss / 100);
    updateRiskBar('flow-bar', impacts.geneFlowReduction / 100);
    updateRiskBar('inbreeding-bar', impacts.inbreedingCoefficient);

    // Update viability indicators
    updateViabilityIndicators(impacts);

    // Update barrier effects display
    updateBarrierEffects(impacts);
}

function calculateGeneticImpacts(values) {
    // Population size multiplier
    const populationMultiplier = {
        'large': 1.0,
        'medium': 1.2,
        'small': 1.5
    }[values.populationSize] || 1.2;

    // Calculate genetic diversity loss
    // Higher road density and isolation distance increase loss
    // Smaller patch size increases loss
    const baseLoss = (values.roadDensity * 10) + (values.isolationDistance * 15) - (values.patchSize / 5);
    const geneticDiversityLoss = Math.min(85, Math.max(5, baseLoss * populationMultiplier));

    // Calculate gene flow reduction
    const geneFlowReduction = Math.min(95, Math.max(10,
        (values.roadDensity * 20) + (values.isolationDistance * 25) - (values.patchSize / 10)
    ));

    // Calculate inbreeding coefficient (0-1 scale)
    const inbreedingCoefficient = Math.min(0.8, Math.max(0.05,
        (geneFlowReduction / 100) * populationMultiplier * 0.6
    ));

    // Determine inbreeding risk level
    let inbreedingRisk = 'Low';
    if (inbreedingCoefficient > 0.6) inbreedingRisk = 'Critical';
    else if (inbreedingCoefficient > 0.4) inbreedingRisk = 'High';
    else if (inbreedingCoefficient > 0.2) inbreedingRisk = 'Moderate';

    // Determine viability status
    let viabilityStatus = 'High';
    const totalRisk = (geneticDiversityLoss + geneFlowReduction) / 2;
    if (totalRisk > 70) viabilityStatus = 'Critical';
    else if (totalRisk > 50) viabilityStatus = 'Low';
    else if (totalRisk > 30) viabilityStatus = 'Moderate';

    return {
        geneticDiversityLoss: Math.round(geneticDiversityLoss),
        geneFlowReduction: Math.round(geneFlowReduction),
        inbreedingCoefficient,
        inbreedingRisk,
        viabilityStatus,
        populationMultiplier
    };
}

function updateImpactDisplay(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

function updateRiskBar(barId, percentage) {
    const bar = document.getElementById(barId);
    if (bar) {
        bar.style.width = (percentage * 100) + '%';
    }
}

function updateViabilityIndicators(impacts) {
    const indicators = {
        shortTerm: document.getElementById('short-term'),
        longTerm: document.getElementById('long-term'),
        extinctionRisk: document.getElementById('extinction-risk')
    };

    // Reset all indicators
    Object.values(indicators).forEach(indicator => {
        if (indicator) indicator.style.opacity = '0.3';
    });

    // Set active indicators based on risk level
    const totalRisk = (impacts.geneticDiversityLoss + impacts.geneFlowReduction) / 2;

    if (indicators.shortTerm) indicators.shortTerm.style.opacity = '1';

    if (totalRisk > 40) {
        if (indicators.longTerm) indicators.longTerm.style.opacity = '1';
    }

    if (totalRisk > 70) {
        if (indicators.extinctionRisk) indicators.extinctionRisk.style.opacity = '1';
    }
}

function updateBarrierEffects(impacts) {
    // Update dynamic barrier effect values
    const collisionRate = document.getElementById('collision-rate');
    const barrierPermeability = document.getElementById('barrier-permeability');
    const crossingSuccess = document.getElementById('crossing-success');
    const avoidanceDistance = document.getElementById('avoidance-distance');
    const patchIsolation = document.getElementById('patch-isolation');
    const areaLoss = document.getElementById('area-loss');
    const edgeEffects = document.getElementById('edge-effects');
    const connectivityLoss = document.getElementById('connectivity-loss');

    if (collisionRate) collisionRate.textContent = `${Math.round(5 + impacts.geneFlowReduction * 0.3)}-30 deaths/km/year`;
    if (barrierPermeability) barrierPermeability.textContent = `${Math.round(100 - impacts.geneFlowReduction * 0.8)}% reduction`;
    if (crossingSuccess) crossingSuccess.textContent = `${Math.round(25 - impacts.geneFlowReduction * 0.2)}% for small mammals`;
    if (avoidanceDistance) avoidanceDistance.textContent = `${Math.round(20 + impacts.geneticDiversityLoss * 0.3)}-200m buffer zones`;
    if (patchIsolation) patchIsolation.textContent = `${(1 + impacts.geneticDiversityLoss / 50).toFixed(1)}x increase`;
    if (areaLoss) areaLoss.textContent = `${Math.round(15 + impacts.geneticDiversityLoss * 0.5)}% effective reduction`;
    if (edgeEffects) edgeEffects.textContent = `${Math.round(5 + impacts.geneticDiversityLoss * 0.2)}% of habitat affected`;
    if (connectivityLoss) connectivityLoss.textContent = `${Math.round(20 + impacts.geneFlowReduction * 0.6)}% reduction`;
}

// Chart.js visualizations
function initializeCharts() {
    initializeDriftChart();
    initializeRoadDensityChart();
}

function initializeDriftChart() {
    const ctx = document.getElementById('driftChart');
    if (!ctx) return;

    const driftChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Genetic Diversity', 'Population Size', 'Gene Flow', 'Inbreeding Risk', 'Viability'],
            datasets: [{
                label: 'Current Conditions',
                data: [75, 80, 60, 30, 70],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                pointBackgroundColor: '#e74c3c',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#e74c3c'
            }, {
                label: 'Pre-Fragmentation',
                data: [95, 95, 90, 5, 95],
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                pointBackgroundColor: '#27ae60',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#27ae60'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            animation: {
                duration: reducedMotion ? 0 : 1000
            }
        }
    });

    // Store chart reference for updates
    window.driftChart = driftChart;
}

function initializeRoadDensityChart() {
    const ctx = document.getElementById('roadDensityChart');
    if (!ctx) return;

    const roadDensityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1980', '1990', '2000', '2010', '2020', '2030'],
            datasets: [{
                label: 'Global Road Density (km/km²)',
                data: [0.8, 1.1, 1.4, 1.8, 2.2, 2.6],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Fragmented Habitat (%)',
                data: [15, 22, 35, 48, 62, 75],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                fill: true,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Road Density'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Fragmented Habitat (%)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            animation: {
                duration: reducedMotion ? 0 : 1500
            }
        }
    });

    // Store chart reference for updates
    window.roadDensityChart = roadDensityChart;
}

// Mechanism Explorer
function initializeMechanismExplorer() {
    const mechanismTabs = document.querySelectorAll('.mechanism-tab');
    const mechanismPanels = document.querySelectorAll('.mechanism-panel');

    mechanismTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const mechanism = this.getAttribute('data-mechanism');

            // Update active tab
            mechanismTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update active panel
            mechanismPanels.forEach(panel => {
                panel.classList.remove('active');
            });

            const targetPanel = document.getElementById(mechanism + '-panel');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Accessibility features
function initializeAccessibility() {
    // Check for saved preferences
    highContrast = localStorage.getItem('highContrast') === 'true';
    largeFont = localStorage.getItem('largeFont') === 'true';
    reducedMotion = localStorage.getItem('reducedMotion') === 'true' ||
                   window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    applyAccessibilitySettings();
}

function toggleHighContrast() {
    highContrast = !highContrast;
    localStorage.setItem('highContrast', highContrast);
    applyAccessibilitySettings();
}

function toggleFontSize() {
    largeFont = !largeFont;
    localStorage.setItem('largeFont', largeFont);
    applyAccessibilitySettings();
}

function toggleReducedMotion() {
    reducedMotion = !reducedMotion;
    localStorage.setItem('reducedMotion', reducedMotion);
    applyAccessibilitySettings();
}

function applyAccessibilitySettings() {
    const body = document.body;

    // High contrast
    if (highContrast) {
        body.classList.add('high-contrast');
    } else {
        body.classList.remove('high-contrast');
    }

    // Large font
    if (largeFont) {
        body.classList.add('large-font');
    } else {
        body.classList.remove('large-font');
    }

    // Reduced motion
    if (reducedMotion) {
        body.classList.add('reduced-motion');
    } else {
        body.classList.remove('reduced-motion');
    }
}

// Performance monitoring
function initializePerformanceMonitoring() {
    if ('performance' in window && 'PerformanceObserver' in window) {
        // Monitor Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Monitor First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could send to error reporting service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Could send to error reporting service
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Tab navigation with arrow keys
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const navLinks = Array.from(document.querySelectorAll('.nav-link'));
        const currentIndex = navLinks.findIndex(link => link.classList.contains('active'));

        if (currentIndex !== -1) {
            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : navLinks.length - 1;
            } else {
                newIndex = currentIndex < navLinks.length - 1 ? currentIndex + 1 : 0;
            }

            navLinks[newIndex].click();
        }
    }
});

// Responsive behavior
function handleResize() {
    const width = window.innerWidth;

    // Adjust chart sizes for mobile
    if (width < 768) {
        if (window.driftChart) {
            window.driftChart.options.plugins.legend.position = 'bottom';
            window.driftChart.update();
        }
        if (window.roadDensityChart) {
            window.roadDensityChart.options.plugins.legend.position = 'bottom';
            window.roadDensityChart.update();
        }
    }
}

window.addEventListener('resize', handleResize);

// Initialize performance monitoring
initializePerformanceMonitoring();

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateGeneticImpacts,
        updateSimulator,
        toggleHighContrast,
        toggleFontSize,
        toggleReducedMotion
    };
}