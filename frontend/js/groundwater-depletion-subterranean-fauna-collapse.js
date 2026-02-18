// Groundwater Depletion and Subterranean Fauna Collapse JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeTabs();
    initializeCharts();
    initializeMonitoringDashboard();
    initializeAccessibility();
});

// Tab System
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // Update URL hash for bookmarking
            window.location.hash = targetTab;

            // Initialize charts when switching to relevant tabs
            if (targetTab === 'threats') {
                updateVulnerabilityChart();
            } else if (targetTab === 'monitor') {
                updateMonitoringTrends();
            }
        });
    });

    // Handle initial tab based on URL hash
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        const targetButton = document.querySelector(`[data-tab="${hash}"]`);
        if (targetButton) {
            targetButton.click();
        }
    } else {
        // Default to first tab
        tabButtons[0].click();
    }
}

// Chart.js Visualizations
function initializeCharts() {
    // Vulnerability Assessment Chart
    createVulnerabilityChart();

    // Monitoring Trends Chart
    createMonitoringTrendsChart();
}

function createVulnerabilityChart() {
    const ctx = document.getElementById('vulnerabilityChart');
    if (!ctx) return;

    const vulnerabilityData = {
        labels: ['Crustaceans', 'Insects', 'Arachnids', 'Fish', 'Amphibians', 'Other Invertebrates'],
        datasets: [{
            label: 'Vulnerability Index',
            data: [85, 70, 60, 50, 45, 55],
            backgroundColor: [
                'rgba(204, 51, 51, 0.8)',
                'rgba(255, 102, 0, 0.8)',
                'rgba(255, 102, 0, 0.8)',
                'rgba(51, 204, 51, 0.8)',
                'rgba(51, 204, 51, 0.8)',
                'rgba(255, 102, 0, 0.8)'
            ],
            borderColor: [
                'rgba(204, 51, 51, 1)',
                'rgba(255, 102, 0, 1)',
                'rgba(255, 102, 0, 1)',
                'rgba(51, 204, 51, 1)',
                'rgba(51, 204, 51, 1)',
                'rgba(255, 102, 0, 1)'
            ],
            borderWidth: 2
        }]
    };

    new Chart(ctx, {
        type: 'radar',
        data: vulnerabilityData,
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
                        color: '#cccccc'
                    },
                    grid: {
                        color: 'rgba(0, 170, 255, 0.2)'
                    },
                    angleLines: {
                        color: 'rgba(0, 170, 255, 0.2)'
                    },
                    pointLabels: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

function createMonitoringTrendsChart() {
    const ctx = document.getElementById('monitoringTrendsChart');
    if (!ctx) return;

    const monitoringData = {
        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Groundwater Level (%)',
                data: [85, 82, 78, 75, 72, 68, 65, 62, 58, 55],
                borderColor: 'rgba(0, 170, 255, 1)',
                backgroundColor: 'rgba(0, 170, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                yAxisID: 'y'
            },
            {
                label: 'Cave Species Count',
                data: [1200, 1150, 1080, 1020, 950, 880, 800, 720, 650, 580],
                borderColor: 'rgba(204, 51, 51, 1)',
                backgroundColor: 'rgba(204, 51, 51, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                yAxisID: 'y1'
            }
        ]
    };

    new Chart(ctx, {
        type: 'line',
        data: monitoringData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#ffffff',
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#cccccc'
                    },
                    grid: {
                        color: 'rgba(0, 170, 255, 0.2)'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: '#cccccc'
                    },
                    grid: {
                        color: 'rgba(0, 170, 255, 0.2)'
                    },
                    title: {
                        display: true,
                        text: 'Groundwater Level (%)',
                        color: '#00aaff'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: '#cccccc'
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(204, 51, 51, 0.2)'
                    },
                    title: {
                        display: true,
                        text: 'Species Count',
                        color: '#cc3333'
                    }
                }
            }
        }
    });
}

function updateVulnerabilityChart() {
    // Chart updates if needed for dynamic data
}

function updateMonitoringTrends() {
    // Chart updates if needed for dynamic data
}

// Monitoring Dashboard
function initializeMonitoringDashboard() {
    const controls = {
        extractionRate: document.getElementById('extractionRate'),
        rechargeRate: document.getElementById('rechargeRate'),
        climateStress: document.getElementById('climateStress')
    };

    const displays = {
        extractionValue: document.getElementById('extractionValue'),
        rechargeValue: document.getElementById('rechargeValue'),
        climateValue: document.getElementById('climateValue'),
        waterLevelBar: document.getElementById('waterLevelBar'),
        waterLevelValue: document.getElementById('waterLevelValue'),
        biodiversityBar: document.getElementById('biodiversityBar'),
        biodiversityValue: document.getElementById('biodiversityValue'),
        healthBar: document.getElementById('healthBar'),
        healthValue: document.getElementById('healthValue')
    };

    // Initialize values
    let values = {
        extractionRate: 50,
        rechargeRate: 30,
        climateStress: 40
    };

    function updateDashboard() {
        // Calculate groundwater level based on inputs
        const baseLevel = 100;
        const extractionImpact = values.extractionRate * 0.8; // 80% impact from extraction
        const rechargeBenefit = values.rechargeRate * 0.6; // 60% benefit from recharge
        const climateImpact = values.climateStress * 0.4; // 40% impact from climate

        const groundwaterLevel = Math.max(0, Math.min(100,
            baseLevel - extractionImpact + rechargeBenefit - climateImpact
        ));

        // Calculate biodiversity index
        const biodiversityIndex = Math.max(0, Math.min(100,
            groundwaterLevel * 0.9 - values.climateStress * 0.3
        ));

        // Calculate ecosystem health
        const ecosystemHealth = Math.max(0, Math.min(100,
            (groundwaterLevel + biodiversityIndex) / 2 - values.extractionRate * 0.1
        ));

        // Update displays
        displays.extractionValue.textContent = values.extractionRate + '%';
        displays.rechargeValue.textContent = values.rechargeRate + '%';
        displays.climateValue.textContent = values.climateStress + '%';

        displays.waterLevelValue.textContent = Math.round(groundwaterLevel) + '%';
        displays.biodiversityValue.textContent = Math.round(biodiversityIndex) + '%';
        displays.healthValue.textContent = Math.round(ecosystemHealth) + '%';

        // Update progress bars with color coding
        updateProgressBar(displays.waterLevelBar, groundwaterLevel);
        updateProgressBar(displays.biodiversityBar, biodiversityIndex);
        updateProgressBar(displays.healthBar, ecosystemHealth);

        // Trigger visual feedback
        provideFeedback(groundwaterLevel, biodiversityIndex, ecosystemHealth);
    }

    function updateProgressBar(bar, value) {
        bar.style.width = value + '%';

        // Color coding based on value
        if (value >= 70) {
            bar.style.backgroundColor = '#33cc33'; // Green - good
        } else if (value >= 40) {
            bar.style.backgroundColor = '#ff6600'; // Orange - warning
        } else {
            bar.style.backgroundColor = '#cc3333'; // Red - critical
        }
    }

    function provideFeedback(waterLevel, biodiversity, health) {
        const dashboard = document.querySelector('.monitoring-dashboard');

        // Remove existing feedback classes
        dashboard.classList.remove('critical', 'warning', 'good');

        // Add appropriate feedback class
        if (health < 30 || waterLevel < 30 || biodiversity < 30) {
            dashboard.classList.add('critical');
        } else if (health < 60 || waterLevel < 60 || biodiversity < 60) {
            dashboard.classList.add('warning');
        } else {
            dashboard.classList.add('good');
        }
    }

    // Add event listeners to controls
    Object.keys(controls).forEach(key => {
        if (controls[key]) {
            controls[key].addEventListener('input', (e) => {
                values[key] = parseInt(e.target.value);
                updateDashboard();
            });
        }
    });

    // Initialize dashboard
    updateDashboard();
}

// Accessibility Features
function initializeAccessibility() {
    // Add keyboard navigation for tabs
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
        tabsContainer.setAttribute('aria-label', 'Groundwater Depletion Information Tabs');
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
    document.addEventListener('tabChange', (e) => {
        tabButtons.forEach(button => {
            const isActive = button.dataset.tab === e.detail.activeTab;
            button.setAttribute('aria-selected', isActive);
            button.setAttribute('tabindex', isActive ? '0' : '-1');
        });
    });

    // Add accessibility for range sliders
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            e.target.setAttribute('aria-valuenow', value);
            e.target.setAttribute('aria-valuetext', value + '%');
        });
    });
}

// Utility Functions
function animateValue(element, start, end, duration) {
    if (start === end) return;

    const range = end - start;
    const minTimer = 50;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = stepTime < minTimer ? minTimer : stepTime;

    const startTime = new Date().getTime();
    const endTime = startTime + duration;

    function run() {
        const now = new Date().getTime();
        const remaining = Math.max((endTime - now) / duration, 0);
        const value = Math.round(end - (remaining * range));

        if (element.tagName === 'INPUT') {
            element.value = value;
        } else {
            element.textContent = value;
        }

        if (value == end) {
            clearInterval(timer);
        }
    }

    const timer_id = setInterval(run, timer);
    run();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for charts
function showLoadingState(element) {
    element.innerHTML = '<div class="loading">Loading cave data...</div>';
}

function hideLoadingState(element) {
    const loading = element.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// Error handling for charts
function handleChartError(error, element) {
    console.error('Chart rendering error:', error);
    element.innerHTML = '<div class="error">Unable to load subterranean data</div>';
}

// Performance optimization - lazy load charts
function lazyLoadCharts() {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chartId = entry.target.id;
                if (chartId === 'vulnerabilityChart') {
                    createVulnerabilityChart();
                } else if (chartId === 'monitoringTrendsChart') {
                    createMonitoringTrendsChart();
                }
                chartObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('canvas').forEach(canvas => {
        chartObserver.observe(canvas);
    });
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    lazyLoadCharts();
}

// Add cave-like ambient animations
function initializeCaveAnimations() {
    // Add subtle stalactite-like animations
    const cards = document.querySelectorAll('.habitat-zone, .species-category, .adaptation-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('cave-drop');
    });
}

// CSS animation for cave drops
const caveAnimationStyle = document.createElement('style');
caveAnimationStyle.textContent = `
    @keyframes cave-drop {
        0% {
            opacity: 0;
            transform: translateY(-20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .cave-drop {
        animation: cave-drop 0.6s ease-out forwards;
    }

    .monitoring-dashboard.critical {
        box-shadow: 0 0 30px rgba(204, 51, 51, 0.3);
    }

    .monitoring-dashboard.warning {
        box-shadow: 0 0 30px rgba(255, 102, 0, 0.3);
    }

    .monitoring-dashboard.good {
        box-shadow: 0 0 30px rgba(51, 204, 51, 0.3);
    }
`;
document.head.appendChild(caveAnimationStyle);

// Initialize cave animations
initializeCaveAnimations();

// Export functions for potential external use
window.GroundwaterMonitor = {
    initializeTabs,
    initializeCharts,
    initializeMonitoringDashboard,
    updateVulnerabilityChart,
    updateMonitoringTrends
};