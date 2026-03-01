// Lipid Reserve Depletion Under Ice Loss - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    initializeTabs();

    // Initialize charts
    initializeCharts();

    // Initialize interactive elements
    initializeInteractiveElements();
});

// Tab switching functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
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
        });
    });
}

// Initialize all charts
function initializeCharts() {
    createLipidReserveChart();
    createEnergyBudgetChart();
    createClimateDriversChart();
    createSpeciesVulnerabilityChart();
    createResearchProgressChart();
}

// Lipid reserve dynamics chart
function createLipidReserveChart() {
    const ctx = document.getElementById('lipidReserveChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Traditional Lipid Reserves',
                data: [85, 80, 75, 70, 65, 60, 55, 50, 45, 50, 60, 75],
                borderColor: '#0d47a1',
                backgroundColor: 'rgba(13, 71, 161, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Ice Loss Impact',
                data: [75, 65, 55, 45, 35, 25, 20, 15, 10, 20, 35, 55],
                borderColor: '#ff6f00',
                backgroundColor: 'rgba(255, 111, 0, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Critical Threshold',
                data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
                borderColor: '#d32f2f',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Lipid Reserve Dynamics Under Ice Loss'
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Lipid Reserves (%)'
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

// Energy budget comparison chart
function createEnergyBudgetChart() {
    const ctx = document.getElementById('energyBudgetChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Energy Intake', 'Energy Expenditure', 'Net Balance', 'Reserve Change'],
            datasets: [{
                label: 'Traditional Conditions',
                data: [2500, 1800, 700, 25],
                backgroundColor: 'rgba(46, 125, 50, 0.8)',
                borderColor: '#2e7d32',
                borderWidth: 1
            }, {
                label: 'Ice Loss Conditions',
                data: [1800, 2400, -600, -15],
                backgroundColor: 'rgba(211, 47, 47, 0.8)',
                borderColor: '#d32f2f',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Energy Budget Comparison (kcal/day, kg lipid/month)'
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Energy (kcal/day) / Mass (kg/month)'
                    }
                }
            }
        }
    });
}

// Climate drivers chart
function createClimateDriversChart() {
    const ctx = document.getElementById('climateDriversChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022'],
            datasets: [{
                label: 'Sea Ice Extent Loss (%)',
                data: [2.1, 3.2, 4.8, 6.1, 7.9, 9.3, 11.2],
                borderColor: '#0277bd',
                backgroundColor: 'rgba(2, 119, 189, 0.1)',
                yAxisID: 'y',
                tension: 0.4,
                fill: true
            }, {
                label: 'Temperature Increase (°C)',
                data: [0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6],
                borderColor: '#ff6f00',
                backgroundColor: 'rgba(255, 111, 0, 0.1)',
                yAxisID: 'y1',
                tension: 0.4,
                fill: true
            }, {
                label: 'Lipid Depletion Rate',
                data: [5, 8, 12, 18, 25, 32, 38],
                borderColor: '#d32f2f',
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                yAxisID: 'y2',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Climate Drivers and Lipid Depletion'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Sea Ice Loss (%)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Temperature Increase (°C)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y2: {
                    type: 'linear',
                    display: false,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Depletion Rate (%)'
                    }
                }
            }
        }
    });
}

// Species vulnerability chart
function createSpeciesVulnerabilityChart() {
    const ctx = document.getElementById('speciesVulnerabilityChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Ice Dependency', 'Foraging Flexibility', 'Body Size', 'Population Size', 'Reproductive Rate', 'Migration Ability'],
            datasets: [{
                label: 'Ringed Seals',
                data: [95, 25, 30, 40, 60, 20],
                borderColor: '#d32f2f',
                backgroundColor: 'rgba(211, 47, 47, 0.2)',
                pointBackgroundColor: '#d32f2f'
            }, {
                label: 'Bearded Seals',
                data: [90, 35, 70, 25, 40, 30],
                borderColor: '#f57c00',
                backgroundColor: 'rgba(245, 124, 0, 0.2)',
                pointBackgroundColor: '#f57c00'
            }, {
                label: 'Spotted Seals',
                data: [70, 60, 35, 35, 55, 50],
                borderColor: '#fbc02d',
                backgroundColor: 'rgba(251, 192, 45, 0.2)',
                pointBackgroundColor: '#fbc02d'
            }, {
                label: 'Harp Seals',
                data: [60, 70, 45, 80, 75, 80],
                borderColor: '#2e7d32',
                backgroundColor: 'rgba(46, 125, 50, 0.2)',
                pointBackgroundColor: '#2e7d32'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Species Vulnerability Assessment'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Research progress chart
function createResearchProgressChart() {
    const ctx = document.getElementById('researchProgressChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Physiological Research', 'Ecosystem Research', 'Population Research', 'Conservation Research', 'Data Gaps'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    '#1976d2',
                    '#42a5f5',
                    '#0277bd',
                    '#2e7d32',
                    '#ff6f00'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Research Progress by Category'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Add click handlers for interactive elements if needed
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add hover effects for finding cards
    const findings = document.querySelectorAll('.finding');
    findings.forEach(finding => {
        finding.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        finding.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects for driver cards
    const driverCards = document.querySelectorAll('.driver-card');
    driverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.15)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Utility functions
function formatNumber(num) {
    return num.toLocaleString();
}

function calculatePercentage(value, total) {
    return Math.round((value / total) * 100);
}

function calculateEnergyDeficit(intake, expenditure) {
    return intake - expenditure;
}

function calculateLipidDepletionRate(deficit, reserveCapacity) {
    return (deficit / reserveCapacity) * 100;
}

// Export functions for potential use in other scripts
window.LipidReserveDashboard = {
    initializeTabs,
    initializeCharts,
    initializeInteractiveElements,
    formatNumber,
    calculatePercentage,
    calculateEnergyDeficit,
    calculateLipidDepletionRate
};