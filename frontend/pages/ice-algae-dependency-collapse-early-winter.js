// Ice-Algae Dependency Collapse in Early Winter - JavaScript
// Comprehensive interactive functionality for environmental monitoring dashboard

// Global variables and state management
let currentTab = 'overview';
let iceAlgaeChart = null;
let riskSimulationChart = null;
let calculatorData = {
    iceThickness: 50,
    surfaceTemp: -10,
    snowDepth: 5,
    windSpeed: 8,
    bloomTiming: 15
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
    initializeCharts();
    setupAccessibility();
    initializePerformanceMonitoring();
    setupPWAFeatures();
});

// Initialize dashboard
function initializeDashboard() {
    console.log('Initializing Ice-Algae Dependency Collapse Dashboard...');

    // Set initial tab
    showTab('overview');

    // Initialize calculator with default values
    updateCalculatorDisplay();

    // Load initial data
    loadDashboardData();

    // Setup responsive behavior
    setupResponsiveBehavior();

    // Initialize tooltips
    initializeTooltips();

    // Setup keyboard navigation
    setupKeyboardNavigation();
}

// Setup event listeners
function setupEventListeners() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showTab(tabId);
        });
    });

    // Calculator inputs
    const calculatorInputs = document.querySelectorAll('#iceThickness, #surfaceTemp, #snowDepth, #windSpeed, #bloomTiming');
    calculatorInputs.forEach(input => {
        input.addEventListener('input', function() {
            updateCalculatorValue(this.id, this.value);
        });
        input.addEventListener('change', function() {
            validateCalculatorInput(this);
        });
    });

    // Calculate button
    const calculateBtn = document.querySelector('.calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateIceAlgaeRisk);
    }

    // Window resize
    window.addEventListener('resize', handleResize);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Touch events for mobile
    setupTouchEvents();

    // Intersection Observer for animations
    setupIntersectionObserver();
}

// Show tab content
function showTab(tabId) {
    // Hide all tabs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to selected button
    const selectedButton = document.querySelector(`[onclick="showTab('${tabId}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    currentTab = tabId;

    // Update URL hash
    if (history.pushState) {
        history.pushState(null, null, `#${tabId}`);
    }

    // Trigger tab-specific initialization
    initializeTabContent(tabId);

    // Announce tab change for screen readers
    announceTabChange(tabId);

    // Track analytics
    trackTabView(tabId);
}

// Initialize tab-specific content
function initializeTabContent(tabId) {
    switch (tabId) {
        case 'overview':
            initializeOverviewTab();
            break;
        case 'mechanisms':
            initializeMechanismsTab();
            break;
        case 'calculator':
            initializeCalculatorTab();
            break;
        case 'impacts':
            initializeImpactsTab();
            break;
        case 'adaptation':
            initializeAdaptationTab();
            break;
        case 'research':
            initializeResearchTab();
            break;
    }
}

// Initialize overview tab
function initializeOverviewTab() {
    // Animate stats cards
    animateStatsCards();

    // Initialize overview chart if not already done
    if (!iceAlgaeChart) {
        createIceAlgaeChart();
    }
}

// Initialize calculator tab
function initializeCalculatorTab() {
    // Reset calculator to default values
    resetCalculator();

    // Initialize risk simulation chart
    if (!riskSimulationChart) {
        createRiskSimulationChart();
    }

    // Setup calculator validation
    setupCalculatorValidation();
}

// Animate stats cards
function animateStatsCards() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 200);
    });
}

// Create ice algae overview chart
function createIceAlgaeChart() {
    const ctx = document.getElementById('iceAlgaeChart');
    if (!ctx) return;

    const data = {
        labels: ['2010', '2015', '2020', '2025', '2030'],
        datasets: [{
            label: 'Ice-Algae Biomass (g/m²)',
            data: [45, 38, 32, 28, 22],
            borderColor: 'rgb(14, 165, 233)',
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
            tension: 0.4,
            fill: true
        }, {
            label: 'Bloom Failure Rate (%)',
            data: [15, 35, 58, 73, 85],
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            yAxisID: 'y1',
            fill: true
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Ice-Algae Trends and Bloom Failures (2010-2030)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1);
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Biomass (g/m²)'
                    },
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Failure Rate (%)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            }
        }
    };

    iceAlgaeChart = new Chart(ctx, config);
}

// Create risk simulation chart
function createRiskSimulationChart() {
    const ctx = document.getElementById('riskSimulationChart');
    if (!ctx) return;

    const data = {
        labels: ['Low Risk', 'Moderate Risk', 'High Risk', 'Critical Risk'],
        datasets: [{
            label: 'Current Conditions',
            data: [25, 45, 20, 10],
            backgroundColor: [
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(107, 114, 128, 0.8)'
            ],
            borderColor: [
                'rgb(16, 185, 129)',
                'rgb(245, 158, 11)',
                'rgb(239, 68, 68)',
                'rgb(107, 114, 128)'
            ],
            borderWidth: 2
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Ice-Algae Collapse Risk Distribution',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    };

    riskSimulationChart = new Chart(ctx, config);
}

// Update calculator value
function updateCalculatorValue(id, value) {
    calculatorData[id] = parseFloat(value) || 0;
    updateCalculatorDisplay();
}

// Update calculator display
function updateCalculatorDisplay() {
    Object.keys(calculatorData).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = calculatorData[key];
        }
    });
}

// Validate calculator input
function validateCalculatorInput(input) {
    const value = parseFloat(input.value);
    const min = parseFloat(input.min) || -Infinity;
    const max = parseFloat(input.max) || Infinity;

    if (value < min || value > max) {
        input.classList.add('error');
        showErrorMessage(input, `Value must be between ${min} and ${max}`);
    } else {
        input.classList.remove('error');
        hideErrorMessage(input);
    }
}

// Show error message
function showErrorMessage(input, message) {
    let errorElement = input.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        input.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// Hide error message
function hideErrorMessage(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Calculate ice algae risk
function calculateIceAlgaeRisk() {
    // Clear previous results
    clearCalculatorResults();

    // Validate inputs
    if (!validateAllCalculatorInputs()) {
        return;
    }

    // Calculate risk metrics
    const bloomFailure = calculateBloomFailure();
    const biomassReduction = calculateBiomassReduction();
    const krillImpact = calculateKrillImpact();
    const foodWebDisruption = calculateFoodWebDisruption();

    // Update results display
    updateResultsDisplay(bloomFailure, biomassReduction, krillImpact, foodWebDisruption);

    // Update risk simulation chart
    updateRiskSimulationChart(bloomFailure);

    // Animate results
    animateResults();

    // Log calculation
    logCalculation(calculatorData, {bloomFailure, biomassReduction, krillImpact, foodWebDisruption});
}

// Validate all calculator inputs
function validateAllCalculatorInputs() {
    const inputs = document.querySelectorAll('#iceThickness, #surfaceTemp, #snowDepth, #windSpeed, #bloomTiming');
    let isValid = true;

    inputs.forEach(input => {
        if (input.classList.contains('error')) {
            isValid = false;
        }
    });

    return isValid;
}

// Calculate bloom failure probability
function calculateBloomFailure() {
    const { iceThickness, surfaceTemp, snowDepth, windSpeed, bloomTiming } = calculatorData;

    // Complex risk calculation based on multiple factors
    let risk = 0;

    // Ice thickness factor (thinner ice = higher risk)
    if (iceThickness < 30) risk += 40;
    else if (iceThickness < 50) risk += 20;
    else risk += 5;

    // Temperature factor (warmer = higher risk)
    if (surfaceTemp > -5) risk += 35;
    else if (surfaceTemp > -15) risk += 15;
    else risk += 2;

    // Snow depth factor (deeper snow = higher risk)
    if (snowDepth > 10) risk += 25;
    else if (snowDepth > 5) risk += 10;
    else risk += 1;

    // Wind speed factor (higher wind = higher risk)
    if (windSpeed > 15) risk += 20;
    else if (windSpeed > 8) risk += 8;
    else risk += 0;

    // Bloom timing factor (later timing = higher risk)
    if (bloomTiming > 20) risk += 30;
    else if (bloomTiming > 10) risk += 12;
    else risk += 0;

    // Apply interaction effects
    risk *= (1 + (windSpeed * surfaceTemp / 1000));

    return Math.min(Math.max(risk, 0), 100);
}

// Calculate biomass reduction
function calculateBiomassReduction() {
    const bloomFailure = calculateBloomFailure();
    return bloomFailure * 0.85; // 85% biomass reduction per unit bloom failure
}

// Calculate krill survival impact
function calculateKrillImpact() {
    const biomassReduction = calculateBiomassReduction();
    return biomassReduction * 0.92; // 92% krill impact per unit biomass reduction
}

// Calculate food web disruption level
function calculateFoodWebDisruption() {
    const krillImpact = calculateKrillImpact();

    if (krillImpact < 20) return 'Low';
    if (krillImpact < 50) return 'Moderate';
    if (krillImpact < 80) return 'High';
    return 'Critical';
}

// Update results display
function updateResultsDisplay(bloomFailure, biomassReduction, krillImpact, foodWebDisruption) {
    const bloomFailureElement = document.getElementById('bloomFailure');
    const biomassReductionElement = document.getElementById('biomassReduction');
    const krillImpactElement = document.getElementById('krillImpact');
    const foodWebDisruptionElement = document.getElementById('foodWebDisruption');

    if (bloomFailureElement) bloomFailureElement.textContent = bloomFailure.toFixed(1) + '%';
    if (biomassReductionElement) biomassReductionElement.textContent = biomassReduction.toFixed(1) + '%';
    if (krillImpactElement) krillImpactElement.textContent = krillImpact.toFixed(1) + '%';
    if (foodWebDisruptionElement) foodWebDisruptionElement.textContent = foodWebDisruption;
}

// Update risk simulation chart
function updateRiskSimulationChart(bloomFailure) {
    if (!riskSimulationChart) return;

    const lowRisk = Math.max(0, 100 - bloomFailure);
    const moderateRisk = Math.min(bloomFailure * 0.6, 40);
    const highRisk = Math.min(bloomFailure * 0.3, 30);
    const criticalRisk = Math.min(bloomFailure * 0.1, 20);

    riskSimulationChart.data.datasets[0].data = [lowRisk, moderateRisk, highRisk, criticalRisk];
    riskSimulationChart.update();
}

// Clear calculator results
function clearCalculatorResults() {
    const results = document.querySelectorAll('.result-value');
    results.forEach(result => {
        result.textContent = '0';
    });
}

// Reset calculator
function resetCalculator() {
    calculatorData = {
        iceThickness: 50,
        surfaceTemp: -10,
        snowDepth: 5,
        windSpeed: 8,
        bloomTiming: 15
    };
    updateCalculatorDisplay();
    clearCalculatorResults();
    if (riskSimulationChart) {
        riskSimulationChart.data.datasets[0].data = [25, 45, 20, 10];
        riskSimulationChart.update();
    }
}

// Animate results
function animateResults() {
    const resultItems = document.querySelectorAll('.result-item');
    resultItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('scale-in');
        }, index * 100);
    });
}

// Setup calculator validation
function setupCalculatorValidation() {
    const inputs = document.querySelectorAll('#iceThickness, #surfaceTemp, #snowDepth, #windSpeed, #bloomTiming');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateCalculatorInput(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateCalculatorInput(this);
            }
        });
    });
}

// Handle window resize
function handleResize() {
    // Update charts on resize
    if (iceAlgaeChart) {
        iceAlgaeChart.resize();
    }
    if (riskSimulationChart) {
        riskSimulationChart.resize();
    }

    // Update responsive behavior
    updateResponsiveLayout();
}

// Update responsive layout
function updateResponsiveLayout() {
    const width = window.innerWidth;

    if (width < 768) {
        // Mobile layout adjustments
        adjustMobileLayout();
    } else if (width < 1024) {
        // Tablet layout adjustments
        adjustTabletLayout();
    } else {
        // Desktop layout adjustments
        adjustDesktopLayout();
    }
}

// Mobile layout adjustments
function adjustMobileLayout() {
    const tabs = document.querySelector('.tabs');
    if (tabs) {
        tabs.classList.add('mobile-tabs');
    }

    const calculator = document.querySelector('.calculator-container');
    if (calculator) {
        calculator.classList.add('mobile-calculator');
    }
}

// Tablet layout adjustments
function adjustTabletLayout() {
    const tabs = document.querySelector('.tabs');
    if (tabs) {
        tabs.classList.remove('mobile-tabs');
    }

    const calculator = document.querySelector('.calculator-container');
    if (calculator) {
        calculator.classList.remove('mobile-calculator');
    }
}

// Desktop layout adjustments
function adjustDesktopLayout() {
    // Reset mobile classes
    const tabs = document.querySelector('.tabs');
    if (tabs) {
        tabs.classList.remove('mobile-tabs');
    }

    const calculator = document.querySelector('.calculator-container');
    if (calculator) {
        calculator.classList.remove('mobile-calculator');
    }
}

// Setup responsive behavior
function setupResponsiveBehavior() {
    updateResponsiveLayout();
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(event) {
    // Tab switching with number keys
    if (event.altKey) {
        const tabNumber = parseInt(event.key);
        if (tabNumber >= 1 && tabNumber <= 6) {
            const tabs = ['overview', 'mechanisms', 'calculator', 'impacts', 'adaptation', 'research'];
            showTab(tabs[tabNumber - 1]);
            event.preventDefault();
        }
    }

    // Calculator shortcuts
    if (currentTab === 'calculator') {
        if (event.ctrlKey && event.key === 'Enter') {
            calculateIceAlgaeRisk();
            event.preventDefault();
        }
        if (event.ctrlKey && event.key === 'r') {
            resetCalculator();
            event.preventDefault();
        }
    }
}

// Setup touch events
function setupTouchEvents() {
    // Swipe gestures for tab switching
    let startX = 0;
    let startY = 0;

    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;

        // Horizontal swipe (tab switching)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            const tabs = ['overview', 'mechanisms', 'calculator', 'impacts', 'adaptation', 'research'];
            const currentIndex = tabs.indexOf(currentTab);

            if (diffX > 0 && currentIndex < tabs.length - 1) {
                // Swipe left - next tab
                showTab(tabs[currentIndex + 1]);
            } else if (diffX < 0 && currentIndex > 0) {
                // Swipe right - previous tab
                showTab(tabs[currentIndex - 1]);
            }
        }

        startX = 0;
        startY = 0;
    });
}

// Setup intersection observer for animations
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements that should animate in
    const animateElements = document.querySelectorAll('.stat-card, .function-card, .impact-card, .region-card, .adaptation-category');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
        element.addEventListener('focus', showTooltip);
        element.addEventListener('blur', hideTooltip);
    });
}

// Show tooltip
function showTooltip(event) {
    const element = event.target;
    const tooltipText = element.getAttribute('data-tooltip');

    if (!tooltipText) return;

    let tooltip = document.querySelector('.tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        document.body.appendChild(tooltip);
    }

    tooltip.textContent = tooltipText;
    tooltip.style.display = 'block';

    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) + 'px';
    tooltip.style.top = rect.top - 30 + 'px';
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    // Tab navigation for interactive elements
    const focusableElements = document.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Handle tab navigation
            const focusedElement = document.activeElement;
            const focusableArray = Array.from(focusableElements);
            const currentIndex = focusableArray.indexOf(focusedElement);

            if (e.shiftKey) {
                // Shift+Tab - previous element
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableArray.length - 1;
                focusableArray[prevIndex].focus();
                e.preventDefault();
            } else {
                // Tab - next element
                const nextIndex = currentIndex < focusableArray.length - 1 ? currentIndex + 1 : 0;
                focusableArray[nextIndex].focus();
                e.preventDefault();
            }
        }
    });
}

// Setup accessibility
function setupAccessibility() {
    // Add ARIA labels and roles
    addAriaLabels();

    // Setup skip links
    setupSkipLinks();

    // Add live regions for dynamic content
    setupLiveRegions();

    // Setup focus management
    setupFocusManagement();
}

// Add ARIA labels
function addAriaLabels() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        const tabId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        button.setAttribute('aria-controls', tabId);
        button.setAttribute('aria-selected', button.classList.contains('active'));
    });

    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-labelledby', content.id + '-tab');
    });
}

// Setup skip links
function setupSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Setup live regions
function setupLiveRegions() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
}

// Announce tab change
function announceTabChange(tabId) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
        const tabNames = {
            'overview': 'Overview',
            'mechanisms': 'Mechanisms',
            'calculator': 'Calculator',
            'impacts': 'Impacts',
            'adaptation': 'Adaptation',
            'research': 'Research'
        };
        liveRegion.textContent = `Switched to ${tabNames[tabId]} tab`;
    }
}

// Setup focus management
function setupFocusManagement() {
    // Focus first focusable element in active tab
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                const tabId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
                const tabContent = document.getElementById(tabId);
                const firstFocusable = tabContent.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }, 100);
        });
    });
}

// Initialize performance monitoring
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');

        // Monitor chart rendering performance
        if (iceAlgaeChart) {
            console.log('Ice algae chart rendered');
        }
        if (riskSimulationChart) {
            console.log('Risk simulation chart rendered');
        }
    });

    // Monitor user interactions
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-btn')) {
            trackInteraction('tab_click', { tab: e.target.getAttribute('onclick').match(/'([^']+)'/)[1] });
        }
        if (e.target.classList.contains('calculate-btn')) {
            trackInteraction('calculate_click', calculatorData);
        }
    });
}

// Track interaction
function trackInteraction(eventType, data) {
    console.log('Interaction tracked:', eventType, data);
    // In a real application, this would send data to analytics service
}

// Track tab view
function trackTabView(tabId) {
    trackInteraction('tab_view', { tab: tabId });
}

// Log calculation
function logCalculation(inputs, results) {
    console.log('Ice algae risk calculation:', { inputs, results, timestamp: new Date().toISOString() });
}

// Load dashboard data
function loadDashboardData() {
    // Simulate loading data from API
    setTimeout(() => {
        console.log('Dashboard data loaded');
        // In a real application, this would fetch data from an API
    }, 100);
}

// Setup PWA features
function setupPWAFeatures() {
    // Register service worker if supported
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('Service Worker registered');
            })
            .catch(function(error) {
                console.log('Service Worker registration failed');
            });
    }

    // Add to home screen prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', function(e) {
        e.preventDefault();
        deferredPrompt = e;

        // Show install button or prompt
        showInstallPrompt();
    });
}

// Show install prompt
function showInstallPrompt() {
    // In a real application, this would show a custom install prompt
    console.log('Install prompt available');
}

// Export data functionality
function exportCalculatorData() {
    const data = {
        inputs: calculatorData,
        results: {
            bloomFailure: calculateBloomFailure(),
            biomassReduction: calculateBiomassReduction(),
            krillImpact: calculateKrillImpact(),
            foodWebDisruption: calculateFoodWebDisruption()
        },
        timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'ice-algae-risk-assessment.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Import data functionality
function importCalculatorData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.inputs) {
                calculatorData = data.inputs;
                updateCalculatorDisplay();
                calculateIceAlgaeRisk();
            }
        } catch (error) {
            console.error('Error importing data:', error);
            alert('Error importing data. Please check the file format.');
        }
    };
    reader.readAsText(file);
}

// Print functionality
function printDashboard() {
    window.print();
}

// Share functionality
function shareDashboard() {
    if (navigator.share) {
        navigator.share({
            title: 'Ice-Algae Dependency Collapse Dashboard',
            text: 'Check out this interactive dashboard on ice-algae collapse risks',
            url: window.location.href
        });
    } else {
        // Fallback - copy URL to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('URL copied to clipboard');
    }
}

// Fullscreen functionality
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Theme switching (if implemented)
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In a real application, this would send error reports to a service
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // In a real application, this would send error reports to a service
});

// Memory monitoring
function monitorMemory() {
    if ('memory' in performance) {
        setInterval(() => {
            const memInfo = performance.memory;
            console.log('Memory usage:', {
                used: Math.round(memInfo.usedJSHeapSize / 1048576) + ' MB',
                total: Math.round(memInfo.totalJSHeapSize / 1048576) + ' MB',
                limit: Math.round(memInfo.jsHeapSizeLimit / 1048576) + ' MB'
            });
        }, 10000);
    }
}

// Initialize memory monitoring
monitorMemory();

// Offline detection
function setupOfflineDetection() {
    window.addEventListener('online', function() {
        console.log('Connection restored');
        showOnlineStatus();
    });

    window.addEventListener('offline', function() {
        console.log('Connection lost');
        showOfflineStatus();
    });
}

// Show online status
function showOnlineStatus() {
    // In a real application, this would show a notification
    console.log('Online status displayed');
}

// Show offline status
function showOfflineStatus() {
    // In a real application, this would show a notification
    console.log('Offline status displayed');
}

// Initialize offline detection
setupOfflineDetection();

// URL hash handling
function handleUrlHash() {
    const hash = window.location.hash.substring(1);
    if (hash && ['overview', 'mechanisms', 'calculator', 'impacts', 'adaptation', 'research'].includes(hash)) {
        showTab(hash);
    }
}

// Handle URL hash on load
window.addEventListener('load', handleUrlHash);

// Handle browser back/forward
window.addEventListener('popstate', handleUrlHash);

// Lazy loading for images (if any)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
setupLazyLoading();

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Handle scroll-based optimizations
            handleScrollOptimizations();
        }, 16);
    });

    // Throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            handleResizeOptimizations();
        }, 16);
    });
}

// Handle scroll optimizations
function handleScrollOptimizations() {
    // Implement scroll-based optimizations like hiding/showing elements
}

// Handle resize optimizations
function handleResizeOptimizations() {
    // Implement resize-based optimizations
}

// Initialize performance optimizations
optimizePerformance();

// Final initialization
console.log('Ice-Algae Dependency Collapse Dashboard fully initialized');