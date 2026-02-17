// Decline of Bioluminescent Marine Organisms JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeTabs();
    initializeCharts();
    initializeMonitoringSimulator();
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
            } else if (targetTab === 'impacts') {
                updateImpactCharts();
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

    // Impact Charts
    createImpactCharts();

    // Monitoring Charts
    createMonitoringCharts();
}

function createVulnerabilityChart() {
    const ctx = document.getElementById('vulnerabilityChart');
    if (!ctx) return;

    const vulnerabilityData = {
        labels: ['Dinoflagellates', 'Cnidarians', 'Ctenophores', 'Cephalopods', 'Fish', 'Crustaceans'],
        datasets: [{
            label: 'Vulnerability Score',
            data: [85, 78, 92, 65, 58, 72],
            backgroundColor: [
                'rgba(255, 68, 68, 0.8)',
                'rgba(255, 140, 66, 0.8)',
                'rgba(255, 68, 68, 0.8)',
                'rgba(255, 140, 66, 0.8)',
                'rgba(0, 255, 136, 0.8)',
                'rgba(255, 140, 66, 0.8)'
            ],
            borderColor: [
                'rgba(255, 68, 68, 1)',
                'rgba(255, 140, 66, 1)',
                'rgba(255, 68, 68, 1)',
                'rgba(255, 140, 66, 1)',
                'rgba(0, 255, 136, 1)',
                'rgba(255, 140, 66, 1)'
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
                        color: '#b0b7c3'
                    },
                    grid: {
                        color: 'rgba(0, 212, 255, 0.2)'
                    },
                    angleLines: {
                        color: 'rgba(0, 212, 255, 0.2)'
                    },
                    pointLabels: {
                        color: '#e0e6ed',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

function createImpactCharts() {
    // Economic Impact Chart
    const economicCtx = document.getElementById('economicImpactChart');
    if (economicCtx) {
        const economicData = {
            labels: ['Tourism', 'Research', 'Biotechnology', 'Education'],
            datasets: [{
                label: 'Annual Economic Value (USD)',
                data: [2500000000, 500000000, 1000000000, 300000000],
                backgroundColor: [
                    'rgba(0, 212, 255, 0.8)',
                    'rgba(0, 255, 136, 0.8)',
                    'rgba(255, 140, 66, 0.8)',
                    'rgba(255, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 212, 255, 1)',
                    'rgba(0, 255, 136, 1)',
                    'rgba(255, 140, 66, 1)',
                    'rgba(255, 68, 68, 1)'
                ],
                borderWidth: 2
            }]
        };

        new Chart(economicCtx, {
            type: 'doughnut',
            data: economicData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#e0e6ed',
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    // Biodiversity Impact Chart
    const biodiversityCtx = document.getElementById('biodiversityImpactChart');
    if (biodiversityCtx) {
        const biodiversityData = {
            labels: ['2010', '2015', '2020', '2025 (Projected)'],
            datasets: [{
                label: 'Species Diversity Index',
                data: [0.85, 0.78, 0.65, 0.45],
                borderColor: 'rgba(255, 68, 68, 1)',
                backgroundColor: 'rgba(255, 68, 68, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        };

        new Chart(biodiversityCtx, {
            type: 'line',
            data: biodiversityData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1,
                        ticks: {
                            color: '#b0b7c3'
                        },
                        grid: {
                            color: 'rgba(0, 212, 255, 0.2)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#b0b7c3'
                        },
                        grid: {
                            color: 'rgba(0, 212, 255, 0.2)'
                        }
                    }
                }
            }
        });
    }
}

function createMonitoringCharts() {
    // Monitoring Trends Chart
    const monitoringCtx = document.getElementById('monitoringTrendsChart');
    if (monitoringCtx) {
        const monitoringData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Bioluminescent Events',
                    data: [120, 98, 85, 72, 65, 58],
                    borderColor: 'rgba(0, 212, 255, 1)',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Pollution Levels',
                    data: [45, 52, 58, 65, 72, 78],
                    borderColor: 'rgba(255, 68, 68, 1)',
                    backgroundColor: 'rgba(255, 68, 68, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }
            ]
        };

        new Chart(monitoringCtx, {
            type: 'line',
            data: monitoringData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#e0e6ed',
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: '#b0b7c3'
                        },
                        grid: {
                            color: 'rgba(0, 212, 255, 0.2)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#b0b7c3'
                        },
                        grid: {
                            color: 'rgba(0, 212, 255, 0.2)'
                        }
                    }
                }
            }
        });
    }
}

function updateVulnerabilityChart() {
    // Chart updates if needed
}

function updateImpactCharts() {
    // Chart updates if needed
}

// Monitoring Simulator
function initializeMonitoringSimulator() {
    const simulator = document.getElementById('monitoringSimulator');
    if (!simulator) return;

    const controls = {
        temperature: document.getElementById('tempControl'),
        pollution: document.getElementById('pollutionControl'),
        acidification: document.getElementById('acidificationControl'),
        light: document.getElementById('lightControl')
    };

    const display = {
        bioluminescence: document.getElementById('bioluminescenceLevel'),
        species: document.getElementById('speciesCount'),
        health: document.getElementById('ecosystemHealth')
    };

    // Initialize values
    let values = {
        temperature: 20,
        pollution: 50,
        acidification: 8.1,
        light: 10
    };

    function updateSimulator() {
        // Calculate bioluminescence level based on environmental factors
        const tempFactor = Math.max(0, 1 - Math.abs(values.temperature - 22) / 10);
        const pollutionFactor = Math.max(0, 1 - values.pollution / 100);
        const acidificationFactor = Math.max(0, 1 - Math.abs(values.acidification - 8.1) / 0.5);
        const lightFactor = Math.max(0, 1 - values.light / 50);

        const bioluminescenceLevel = Math.round((tempFactor * pollutionFactor * acidificationFactor * lightFactor) * 100);

        // Calculate species count
        const speciesCount = Math.round(bioluminescenceLevel * 0.8);

        // Calculate ecosystem health
        const ecosystemHealth = Math.round((tempFactor + pollutionFactor + acidificationFactor + lightFactor) / 4 * 100);

        // Update displays
        display.bioluminescence.textContent = bioluminescenceLevel + '%';
        display.species.textContent = speciesCount;
        display.health.textContent = ecosystemHealth + '%';

        // Update visual indicators
        updateVisualIndicators(bioluminescenceLevel, ecosystemHealth);
    }

    function updateVisualIndicators(bioluminescence, health) {
        const bioluminescenceBar = document.getElementById('bioluminescenceBar');
        const healthBar = document.getElementById('healthBar');

        if (bioluminescenceBar) {
            bioluminescenceBar.style.width = bioluminescence + '%';
            bioluminescenceBar.style.backgroundColor = bioluminescence > 70 ? '#00ff88' :
                                                      bioluminescence > 40 ? '#ff8c42' : '#ff4444';
        }

        if (healthBar) {
            healthBar.style.width = health + '%';
            healthBar.style.backgroundColor = health > 70 ? '#00ff88' :
                                             health > 40 ? '#ff8c42' : '#ff4444';
        }
    }

    // Add event listeners to controls
    Object.keys(controls).forEach(key => {
        if (controls[key]) {
            controls[key].addEventListener('input', (e) => {
                values[key] = parseFloat(e.target.value);
                updateSimulator();
            });
        }
    });

    // Initialize simulator
    updateSimulator();
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
        tabsContainer.setAttribute('aria-label', 'Bioluminescent Marine Organisms Information Tabs');
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
    element.innerHTML = '<div class="loading">Loading visualization...</div>';
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
    element.innerHTML = '<div class="error">Unable to load visualization</div>';
}

// Performance optimization - lazy load charts
function lazyLoadCharts() {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chartId = entry.target.id;
                if (chartId === 'vulnerabilityChart') {
                    createVulnerabilityChart();
                } else if (chartId === 'economicImpactChart' || chartId === 'biodiversityImpactChart') {
                    createImpactCharts();
                } else if (chartId === 'monitoringTrendsChart') {
                    createMonitoringCharts();
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

// Export functions for potential external use
window.BioluminescentMonitor = {
    initializeTabs,
    initializeCharts,
    initializeMonitoringSimulator,
    updateVulnerabilityChart,
    updateImpactCharts
};