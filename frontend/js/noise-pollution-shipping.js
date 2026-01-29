// Noise Pollution from Shipping Lanes - Interactive Features
// Level 3 Crisis Implementation

document.addEventListener('DOMContentLoaded', function() {
    initializeTabNavigation();
    initializeCharts();
    initializeNoiseSimulator();
    initializeInteractiveElements();
});

// Tab Navigation System
function initializeTabNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.content-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and sections
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding section
            const targetSection = document.getElementById(tab.dataset.section);
            if (targetSection) {
                targetSection.classList.add('active');

                // Trigger chart animations if switching to data section
                if (tab.dataset.section === 'data') {
                    updateGlobalNoiseChart();
                }
            }
        });
    });
}

// Chart Initialization and Management
function initializeCharts() {
    createCommunicationChart();
    createMigrationChart();
    createVulnerabilityChart();
    createNoiseImpactChart();
    createGlobalNoiseChart();
}

// Communication Disruption Chart
function createCommunicationChart() {
    const ctx = document.getElementById('communicationChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Low Frequency', 'Mid Frequency', 'High Frequency', 'Ultra Sound', 'Infrasound'],
            datasets: [
                {
                    label: 'Natural Communication Range',
                    data: [100, 95, 90, 85, 80],
                    borderColor: '#00ff80',
                    backgroundColor: 'rgba(0, 255, 128, 0.2)',
                    borderWidth: 3,
                    pointBackgroundColor: '#00ff80',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Range with Shipping Noise',
                    data: [30, 45, 60, 75, 20],
                    borderColor: '#ff0080',
                    backgroundColor: 'rgba(255, 0, 128, 0.2)',
                    borderWidth: 3,
                    pointBackgroundColor: '#ff0080',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: 'white' }
                }
            },
            scales: {
                r: {
                    ticks: { color: 'white', backdropColor: 'transparent' },
                    grid: { color: 'rgba(0, 128, 255, 0.3)' },
                    angleLines: { color: 'rgba(0, 128, 255, 0.3)' },
                    pointLabels: { color: 'white' }
                }
            }
        }
    });
}

// Migration Route Changes Chart
function createMigrationChart() {
    const ctx = document.getElementById('migrationChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020', '2025'],
            datasets: [
                {
                    label: 'Traditional Migration Routes',
                    data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
                    borderColor: '#00ff80',
                    backgroundColor: 'rgba(0, 255, 128, 0.1)',
                    borderWidth: 2,
                    tension: 0.1
                },
                {
                    label: 'Current Altered Routes',
                    data: [100, 98, 95, 88, 75, 60, 45, 30, 20],
                    borderColor: '#ff8000',
                    backgroundColor: 'rgba(255, 128, 0, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: 'white' }
                }
            },
            scales: {
                x: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(0, 128, 255, 0.2)' }
                },
                y: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(0, 128, 255, 0.2)' },
                    title: {
                        display: true,
                        text: 'Route Efficiency (%)',
                        color: 'white'
                    }
                }
            }
        }
    });
}

// Species Vulnerability Chart
function createVulnerabilityChart() {
    const ctx = document.getElementById('vulnerabilityChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Blue Whales', 'Humpbacks', 'Bottlenose Dolphins', 'Fur Seals', 'Orcas', 'Manatees'],
            datasets: [
                {
                    label: 'Communication Disruption (%)',
                    data: [90, 85, 80, 75, 70, 65],
                    backgroundColor: 'rgba(255, 0, 128, 0.6)',
                    borderColor: 'rgba(255, 0, 128, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Migration Impact (%)',
                    data: [85, 80, 70, 65, 60, 55],
                    backgroundColor: 'rgba(255, 128, 0, 0.6)',
                    borderColor: 'rgba(255, 128, 0, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Stress Level Increase (%)',
                    data: [95, 90, 85, 80, 75, 70],
                    backgroundColor: 'rgba(128, 0, 255, 0.6)',
                    borderColor: 'rgba(128, 0, 255, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: 'white' }
                },
                title: {
                    display: true,
                    text: 'Species Vulnerability Assessment',
                    color: 'white',
                    font: { size: 16 }
                }
            },
            scales: {
                x: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(0, 128, 255, 0.2)' }
                },
                y: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(0, 128, 255, 0.2)' },
                    title: {
                        display: true,
                        text: 'Impact Severity (%)',
                        color: 'white'
                    }
                }
            }
        }
    });
}

// Noise Impact Simulator Chart
let noiseImpactChart;

function createNoiseImpactChart() {
    const ctx = document.getElementById('noiseImpactChart');
    if (!ctx) return;

    noiseImpactChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Communication', 'Navigation', 'Feeding', 'Reproduction', 'Social Bonding', 'Migration'],
            datasets: [
                {
                    label: 'Normal Behavior',
                    data: [100, 100, 100, 100, 100, 100],
                    borderColor: '#00ff80',
                    backgroundColor: 'rgba(0, 255, 128, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#00ff80'
                },
                {
                    label: 'Under Noise Stress',
                    data: [50, 60, 70, 80, 40, 30],
                    borderColor: '#ff0080',
                    backgroundColor: 'rgba(255, 0, 128, 0.2)',
                    borderWidth: 3,
                    pointBackgroundColor: '#ff0080'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: 'white' }
                }
            },
            scales: {
                r: {
                    ticks: { color: 'white', backdropColor: 'transparent' },
                    grid: { color: 'rgba(0, 128, 255, 0.3)' },
                    angleLines: { color: 'rgba(0, 128, 255, 0.3)' },
                    pointLabels: { color: 'white' }
                }
            }
        }
    });
}

// Global Noise Levels Chart
function createGlobalNoiseChart() {
    const ctx = document.getElementById('globalNoiseChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020', '2025'],
            datasets: [
                {
                    label: 'North Atlantic',
                    data: [40, 45, 52, 58, 65, 72, 78, 85, 88],
                    borderColor: '#0080ff',
                    backgroundColor: 'rgba(0, 128, 255, 0.1)',
                    borderWidth: 3,
                    tension: 0.4
                },
                {
                    label: 'Pacific Ocean',
                    data: [35, 42, 48, 55, 62, 70, 76, 82, 85],
                    borderColor: '#8000ff',
                    backgroundColor: 'rgba(128, 0, 255, 0.1)',
                    borderWidth: 3,
                    tension: 0.4
                },
                {
                    label: 'Indian Ocean',
                    data: [30, 38, 45, 52, 58, 65, 71, 77, 80],
                    borderColor: '#ff0080',
                    backgroundColor: 'rgba(255, 0, 128, 0.1)',
                    borderWidth: 3,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: 'white' }
                },
                title: {
                    display: true,
                    text: 'Ocean Noise Levels (dB re 1μPa)',
                    color: 'white',
                    font: { size: 16 }
                }
            },
            scales: {
                x: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(0, 128, 255, 0.2)' }
                },
                y: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(0, 128, 255, 0.2)' },
                    title: {
                        display: true,
                        text: 'Noise Level (dB)',
                        color: 'white'
                    }
                }
            }
        }
    });
}

function updateGlobalNoiseChart() {
    // Animate chart when data section becomes active
    setTimeout(() => {
        const chart = Chart.getChart('globalNoiseChart');
        if (chart) {
            chart.update('active');
        }
    }, 300);
}

// Noise Simulator System
function initializeNoiseSimulator() {
    const slider = document.getElementById('shippingTraffic');
    const currentTraffic = document.getElementById('currentTraffic');

    if (slider && currentTraffic) {
        slider.addEventListener('input', function() {
            const traffic = parseInt(this.value);
            currentTraffic.textContent = `Current (${traffic})`;
            updateNoiseSimulation(traffic);
        });

        // Initialize with default value
        updateNoiseSimulation(10);
    }
}

function updateNoiseSimulation(trafficLevel) {
    if (!noiseImpactChart) return;

    // Calculate behavioral impacts based on traffic level
    const baseCommunication = 100;
    const baseNavigation = 100;
    const baseFeeding = 100;
    const baseReproduction = 100;
    const baseSocial = 100;
    const baseMigration = 100;

    // Higher traffic = more severe impacts
    const impactMultiplier = Math.min(trafficLevel / 10, 5); // Cap at 5x impact

    const stressedData = [
        Math.max(10, baseCommunication - (impactMultiplier * 15)), // Communication most affected
        Math.max(15, baseNavigation - (impactMultiplier * 12)),
        Math.max(20, baseFeeding - (impactMultiplier * 10)),
        Math.max(25, baseReproduction - (impactMultiplier * 8)),
        Math.max(5, baseSocial - (impactMultiplier * 18)), // Social bonding most affected
        Math.max(10, baseMigration - (impactMultiplier * 16))
    ];

    noiseImpactChart.data.datasets[1].data = stressedData;
    noiseImpactChart.update('none');

    // Update status indicators
    updateNoiseStatusIndicators(trafficLevel, stressedData);
}

function updateNoiseStatusIndicators(trafficLevel, stressedData) {
    const commStatus = document.getElementById('commStatus');
    const commDescription = document.getElementById('commDescription');
    const stressLevel = document.getElementById('stressLevel');
    const stressDescription = document.getElementById('stressDescription');

    if (!commStatus || !stressLevel) return;

    // Calculate average impact
    const avgImpact = stressedData.reduce((a, b) => a + b, 0) / stressedData.length;
    const stressPercentage = Math.round((100 - avgImpact) * 2.5); // Convert to stress percentage

    // Update communication status
    if (trafficLevel <= 5) {
        commStatus.className = 'crisis-level crisis-moderate';
        commStatus.textContent = 'Moderate Interference';
        commDescription.textContent = 'Some communication signals still effective but with reduced range.';
    } else if (trafficLevel <= 20) {
        commStatus.className = 'crisis-level crisis-severe';
        commStatus.textContent = 'Severe Interference';
        commDescription.textContent = 'Major communication disruption affecting most marine mammal activities.';
    } else {
        commStatus.className = 'crisis-level crisis-critical';
        commStatus.textContent = 'Critical Disruption';
        commDescription.textContent = 'Complete communication breakdown in affected areas.';
    }

    // Update stress level
    stressLevel.textContent = `${stressPercentage}%`;

    if (stressPercentage < 30) {
        stressDescription.textContent = 'Minimal stress response in marine mammal populations.';
        stressLevel.style.color = '#00ff80';
    } else if (stressPercentage < 60) {
        stressDescription.textContent = 'Elevated stress levels with behavioral changes observed.';
        stressLevel.style.color = '#ffff00';
    } else {
        stressDescription.textContent = 'Severe stress response with potential population-level impacts.';
        stressLevel.style.color = '#ff0080';
    }
}

// Interactive Elements and Event Handlers
function initializeInteractiveElements() {
    // Frequency marker hover effects
    const frequencyMarkers = document.querySelectorAll('.frequency-marker');
    frequencyMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-50%) scale(1.5)';
        });

        marker.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-50%) scale(1)';
        });
    });

    // Marine species status cards interaction
    const speciesCards = document.querySelectorAll('.marine-species');
    speciesCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 128, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: 50%;
                top: 50%;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Action Button Handlers
function joinShippingInitiative() {
    showNoiseActionModal(
        'Join Shipping Industry Initiative',
        'Partner with maritime companies to implement noise reduction technologies.',
        [
            'Sign petition for mandatory quiet ship technologies',
            'Join maritime environmental certification programs',
            'Support research into bubble curtain technology',
            'Advocate for speed restrictions in sensitive areas'
        ]
    );
}

function supportProtectionZones() {
    showNoiseActionModal(
        'Support Acoustic Protection Zones',
        'Help establish and maintain marine protected areas with noise limits.',
        [
            'Volunteer for marine acoustic monitoring programs',
            'Support marine protected area expansion',
            'Participate in citizen science noise monitoring',
            'Fund underwater acoustic research stations'
        ]
    );
}

function fundResearch() {
    showNoiseActionModal(
        'Fund Critical Research',
        'Support research into marine mammal communication and noise impact mitigation.',
        [
            'Donate to marine bio-acoustics research',
            'Support marine mammal tracking technology',
            'Fund underwater noise modeling studies',
            'Contribute to international noise research networks'
        ]
    );
}

function advocatePolicy() {
    showNoiseActionModal(
        'Advocate for Policy Change',
        'Push for international regulations on underwater noise pollution.',
        [
            'Contact elected representatives about marine noise',
            'Join environmental policy advocacy groups',
            'Support international marine conservation treaties',
            'Participate in public comment periods for shipping regulations'
        ]
    );
}

function showNoiseActionModal(title, description, actions) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('noiseActionModal');
    if (!modal) {
        modal = createNoiseActionModal();
        document.body.appendChild(modal);
    }

    // Update modal content
    document.getElementById('noiseModalTitle').textContent = title;
    document.getElementById('noiseModalDescription').textContent = description;

    const actionsList = document.getElementById('noiseModalActions');
    actionsList.innerHTML = '';

    actions.forEach(action => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-wave-square"></i> ${action}`;
        li.style.margin = '10px 0';
        li.style.padding = '10px';
        li.style.background = 'rgba(0, 128, 255, 0.2)';
        li.style.borderRadius = '8px';
        li.style.cursor = 'pointer';
        li.style.transition = 'all 0.3s';

        li.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 128, 255, 0.4)';
            this.style.transform = 'translateX(10px)';
        });

        li.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(0, 128, 255, 0.2)';
            this.style.transform = 'translateX(0)';
        });

        actionsList.appendChild(li);
    });

    // Show modal
    modal.style.display = 'flex';
    modal.style.animation = 'fadeIn 0.3s ease-out';
}

function createNoiseActionModal() {
    const modal = document.createElement('div');
    modal.id = 'noiseActionModal';
    modal.innerHTML = `
        <style>
            #noiseActionModal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            }
            .noise-modal-content {
                background: linear-gradient(135deg, #1a1a2e, #0f0f23);
                color: white;
                padding: 40px;
                border-radius: 20px;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                border: 2px solid rgba(0, 128, 255, 0.5);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
            }
            .noise-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 2px solid rgba(0, 128, 255, 0.3);
            }
            .noise-close-modal {
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: all 0.3s;
            }
            .noise-close-modal:hover {
                background: rgba(0, 128, 255, 0.3);
                transform: rotate(90deg);
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
        </style>
        <div class="noise-modal-content">
            <div class="noise-modal-header">
                <h2 id="noiseModalTitle"></h2>
                <button class="noise-close-modal" onclick="closeNoiseActionModal()">&times;</button>
            </div>
            <p id="noiseModalDescription" style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.6;"></p>
            <h3 style="margin-bottom: 15px; color: #0080ff;">Take Action:</h3>
            <ul id="noiseModalActions" style="list-style: none; padding: 0;"></ul>
            <div style="margin-top: 30px; text-align: center;">
                <button onclick="closeNoiseActionModal()" class="action-button">Get Started</button>
            </div>
        </div>
    `;

    return modal;
}

function closeNoiseActionModal() {
    const modal = document.getElementById('noiseActionModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
    }
`;
document.head.appendChild(fadeOutStyle);

// Emergency Alert System
function showNoiseEmergencyAlert() {
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(45deg, #0080ff, #8000ff);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 128, 255, 0.6);
        z-index: 2001;
        animation: wavePulse 2s infinite;
        max-width: 300px;
        font-weight: 600;
    `;

    alert.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-water" style="font-size: 1.2rem; animation: wavePulse 1s infinite;"></i>
            <div>
                <strong>URGENT OCEAN CRISIS</strong><br>
                <small>Level 3 Noise Pollution - Marine Life at Risk</small>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; color:white; font-size:1.2rem; cursor:pointer; padding: 5px;">×</button>
        </div>
    `;

    document.body.appendChild(alert);

    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 10000);

    console.log('🌊 Emergency notification displayed - Level 3 Ocean Noise Crisis requires immediate attention');
}

// Show emergency alert after 5 seconds if user hasn't interacted
setTimeout(showNoiseEmergencyAlert, 5000);

// Performance monitoring
console.log('🌊 Noise Pollution Level 3 Crisis System Initialized');
console.log('📊 Marine communication analysis systems active');
console.log('🚨 Ocean noise emergency response protocols loaded');
console.log('⚠️ Marine mammal adaptation failure monitoring enabled');