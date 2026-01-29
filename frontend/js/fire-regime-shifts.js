// Fire Regime Shifts and Wildlife Adaptation Failure - Interactive Features
// Level 3 Crisis Implementation

document.addEventListener('DOMContentLoaded', function() {
    initializeTabNavigation();
    initializeCharts();
    initializeSimulation();
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
                    updateTrendsChart();
                }
            }
        });
    });
}

// Chart Initialization and Management
function initializeCharts() {
    createPopulationChart();
    createAdaptationChart();
    createSimulationChart();
    createTrendsChart();
}

// Population Collapse Chart
function createPopulationChart() {
    const ctx = document.getElementById('populationChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1950', '1970', '1990', '2000', '2010', '2020', '2025'],
            datasets: [
                {
                    label: 'Fire-adapted Species Population',
                    data: [100, 95, 85, 70, 50, 25, 15],
                    borderColor: '#FF4500',
                    backgroundColor: 'rgba(255, 69, 0, 0.2)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Fire Frequency (events/decade)',
                    data: [2, 2, 3, 5, 8, 15, 20],
                    borderColor: '#8B0000',
                    backgroundColor: 'rgba(139, 0, 0, 0.2)',
                    borderWidth: 3,
                    tension: 0.4,
                    yAxisID: 'y1'
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
                    grid: { color: 'rgba(255, 255, 255, 0.2)' }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' },
                    title: {
                        display: true,
                        text: 'Population (% of 1950 levels)',
                        color: 'white'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: { color: 'white' },
                    grid: { drawOnChartArea: false },
                    title: {
                        display: true,
                        text: 'Fire Events per Decade',
                        color: 'white'
                    }
                }
            }
        }
    });
}

// Species Adaptation Timeline Chart
function createAdaptationChart() {
    const ctx = document.getElementById('adaptationChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Black Bears', 'Fire Salamanders', 'Ground Birds', 'Chaparral Plants', 'Fire Beetles', 'Pine Species'],
            datasets: [
                {
                    label: 'Historical Adaptation Time (years)',
                    data: [50, 30, 25, 75, 15, 100],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Current Fire Frequency (years between fires)',
                    data: [3, 2, 1.5, 4, 2, 5],
                    backgroundColor: 'rgba(255, 69, 0, 0.6)',
                    borderColor: 'rgba(255, 69, 0, 1)',
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
                    text: 'Adaptation Time vs. Current Fire Frequency',
                    color: 'white',
                    font: { size: 16 }
                }
            },
            scales: {
                x: { 
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' }
                },
                y: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' },
                    title: {
                        display: true,
                        text: 'Years',
                        color: 'white'
                    }
                }
            }
        }
    });
}

// Fire Frequency Simulation System
let simulationChart;

function initializeSimulation() {
    const slider = document.getElementById('fireFrequency');
    const currentFrequency = document.getElementById('currentFrequency');
    
    if (slider && currentFrequency) {
        slider.addEventListener('input', function() {
            const frequency = parseFloat(this.value);
            currentFrequency.textContent = `Current (${frequency})`;
            updateSimulation(frequency);
        });
        
        // Initialize with default value
        updateSimulation(2.0);
    }
}

function createSimulationChart() {
    const ctx = document.getElementById('simulationChart');
    if (!ctx) return;

    simulationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 21}, (_, i) => 2020 + i),
            datasets: [
                {
                    label: 'Population Projection',
                    data: [],
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255, 107, 53, 0.2)',
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
                    grid: { color: 'rgba(255, 255, 255, 0.2)' }
                },
                y: {
                    min: 0,
                    max: 100,
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' },
                    title: {
                        display: true,
                        text: 'Population Health (%)',
                        color: 'white'
                    }
                }
            }
        }
    });
}

function updateSimulation(frequency) {
    if (!simulationChart) return;

    // Calculate population decline based on fire frequency
    const basePopulation = 80; // Starting population health
    const years = Array.from({length: 21}, (_, i) => i);
    
    const projectionData = years.map(year => {
        // More frequent fires cause exponential decline
        const declineRate = Math.min(frequency * 0.15, 0.8); // Cap at 80% decline per year
        const recoveryRate = Math.max(0.02, 0.1 - frequency * 0.02); // Slower recovery with more fires
        
        let population = basePopulation;
        
        // Simulate decline over years
        for (let i = 0; i <= year; i++) {
            population = Math.max(0, population - (population * declineRate) + (population * recoveryRate));
        }
        
        return Math.max(0, population);
    });

    simulationChart.data.datasets[0].data = projectionData;
    simulationChart.update('none');

    // Update status indicators
    updateStatusIndicators(frequency, projectionData[projectionData.length - 1]);
}

function updateStatusIndicators(frequency, finalPopulation) {
    const healthStatus = document.getElementById('healthStatus');
    const healthDescription = document.getElementById('healthDescription');
    const survivalRate = document.getElementById('survivalRate');
    const survivalDescription = document.getElementById('survivalDescription');

    if (!healthStatus || !survivalRate) return;

    // Update ecosystem health
    if (frequency <= 2) {
        healthStatus.className = 'crisis-level crisis-moderate';
        healthStatus.textContent = 'Moderate Stress';
        healthDescription.textContent = 'Ecosystems showing adaptation stress but still functioning.';
    } else if (frequency <= 5) {
        healthStatus.className = 'crisis-level crisis-severe';
        healthStatus.textContent = 'Severe Stress';
        healthDescription.textContent = 'Widespread ecosystem disruption and species decline.';
    } else {
        healthStatus.className = 'crisis-level crisis-critical';
        healthStatus.textContent = 'Ecosystem Collapse';
        healthDescription.textContent = 'Catastrophic failure of ecosystem functions and mass species extinction.';
    }

    // Update survival rate
    survivalRate.textContent = `${Math.round(finalPopulation)}%`;
    
    if (finalPopulation > 60) {
        survivalDescription.textContent = 'Most species maintaining stable populations with good recovery prospects.';
        survivalRate.style.color = '#4CAF50';
    } else if (finalPopulation > 30) {
        survivalDescription.textContent = 'Significant population decline but some species still viable.';
        survivalRate.style.color = '#FF9800';
    } else {
        survivalDescription.textContent = 'Critical population collapse with high extinction risk.';
        survivalRate.style.color = '#F44336';
    }
}

// Regional Fire Trends Chart
function createTrendsChart() {
    const ctx = document.getElementById('trendsChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020', '2025'],
            datasets: [
                {
                    label: 'Western North America',
                    data: [2, 2.2, 2.5, 3.2, 4.5, 7.2, 10.8, 15.2, 18.5],
                    borderColor: '#FF0000',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    borderWidth: 3
                },
                {
                    label: 'Australia',
                    data: [1.8, 1.9, 2.1, 2.8, 3.9, 6.1, 8.7, 12.3, 14.8],
                    borderColor: '#FF4500',
                    backgroundColor: 'rgba(255, 69, 0, 0.1)',
                    borderWidth: 3
                },
                {
                    label: 'Mediterranean',
                    data: [1.5, 1.7, 2.0, 2.6, 3.8, 5.9, 8.1, 11.2, 13.1],
                    borderColor: '#FF8C00',
                    backgroundColor: 'rgba(255, 140, 0, 0.1)',
                    borderWidth: 3
                },
                {
                    label: 'Amazon Basin',
                    data: [1.2, 1.4, 1.8, 2.4, 3.2, 4.8, 6.9, 9.8, 11.5],
                    borderColor: '#FFB347',
                    backgroundColor: 'rgba(255, 179, 71, 0.1)',
                    borderWidth: 3
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
                    grid: { color: 'rgba(255, 255, 255, 0.2)' }
                },
                y: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' },
                    title: {
                        display: true,
                        text: 'Fire Events per Year',
                        color: 'white'
                    }
                }
            }
        }
    });
}

function updateTrendsChart() {
    // Animate chart when data section becomes active
    setTimeout(() => {
        const chart = Chart.getChart('trendsChart');
        if (chart) {
            chart.update('active');
        }
    }, 300);
}

// Interactive Elements and Event Handlers
function initializeInteractiveElements() {
    // Timeline points hover effects
    const timelinePoints = document.querySelectorAll('.timeline-point');
    timelinePoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-50%) scale(1.5)';
        });
        
        point.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-50%) scale(1)';
        });
    });

    // Species status cards interaction
    const speciesCards = document.querySelectorAll('.species-status');
    speciesCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 107, 53, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            
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
function joinProtectionEffort() {
    showActionModal(
        'Join Emergency Protection Effort',
        'Help create emergency wildlife corridors and rescue operations.',
        [
            'Sign up for emergency response training',
            'Volunteer for wildlife corridor maintenance',
            'Donate to rapid response equipment fund',
            'Join local fire-wildlife protection networks'
        ]
    );
}

function supportRestoration() {
    showActionModal(
        'Support Ecosystem Restoration',
        'Contribute to long-term habitat restoration and fire-resilient ecosystem development.',
        [
            'Participate in native plant restoration projects',
            'Fund fire-resistant vegetation research',
            'Support soil restoration initiatives',
            'Join community firebreak creation teams'
        ]
    );
}

function takeClimateAction() {
    showActionModal(
        'Take Climate Action',
        'Address the root causes of increased fire frequency through climate action.',
        [
            'Reduce personal carbon footprint',
            'Support renewable energy policies',
            'Vote for climate-conscious leadership',
            'Join climate advocacy organizations'
        ]
    );
}

function supportResearch() {
    showActionModal(
        'Support Critical Research',
        'Fund research into adaptation strategies and fire management solutions.',
        [
            'Donate to wildlife adaptation research',
            'Participate in citizen science projects',
            'Support university fire ecology programs',
            'Fund genetic rescue technology development'
        ]
    );
}

function showActionModal(title, description, actions) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('actionModal');
    if (!modal) {
        modal = createActionModal();
        document.body.appendChild(modal);
    }
    
    // Update modal content
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    
    const actionsList = document.getElementById('modalActions');
    actionsList.innerHTML = '';
    
    actions.forEach(action => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle"></i> ${action}`;
        li.style.margin = '10px 0';
        li.style.padding = '10px';
        li.style.background = 'rgba(255, 107, 53, 0.2)';
        li.style.borderRadius = '8px';
        li.style.cursor = 'pointer';
        li.style.transition = 'all 0.3s';
        
        li.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 107, 53, 0.4)';
            this.style.transform = 'translateX(10px)';
        });
        
        li.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 107, 53, 0.2)';
            this.style.transform = 'translateX(0)';
        });
        
        actionsList.appendChild(li);
    });
    
    // Show modal
    modal.style.display = 'flex';
    modal.style.animation = 'fadeIn 0.3s ease-out';
}

function createActionModal() {
    const modal = document.createElement('div');
    modal.id = 'actionModal';
    modal.innerHTML = `
        <style>
            #actionModal {
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
            .modal-content {
                background: linear-gradient(135deg, #1a1a1a, #2d1810);
                color: white;
                padding: 40px;
                border-radius: 20px;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                border: 2px solid rgba(255, 107, 53, 0.5);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 2px solid rgba(255, 107, 53, 0.3);
            }
            .close-modal {
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: all 0.3s;
            }
            .close-modal:hover {
                background: rgba(255, 107, 53, 0.3);
                transform: rotate(90deg);
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
        </style>
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modalTitle"></h2>
                <button class="close-modal" onclick="closeActionModal()">&times;</button>
            </div>
            <p id="modalDescription" style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.6;"></p>
            <h3 style="margin-bottom: 15px; color: #ff6b35;">Take Action:</h3>
            <ul id="modalActions" style="list-style: none; padding: 0;"></ul>
            <div style="margin-top: 30px; text-align: center;">
                <button onclick="closeActionModal()" class="action-button">Get Started</button>
            </div>
        </div>
    `;
    
    return modal;
}

function closeActionModal() {
    const modal = document.getElementById('actionModal');
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
function showEmergencyAlert() {
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #8B0000, #FF0000);
        color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(255, 0, 0, 0.6);
        z-index: 9999;
        animation: emergencyPulse 2s infinite;
        max-width: 300px;
    `;
    
    alert.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-exclamation-triangle" style="font-size: 1.5rem; animation: flicker 1s infinite;"></i>
            <div>
                <strong>CRISIS LEVEL 3</strong><br>
                Immediate action required for wildlife protection
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; color:white; font-size:1.5rem; cursor:pointer;">×</button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 10000);
}

// Add emergency pulse animation
const emergencyStyle = document.createElement('style');
emergencyStyle.textContent = `
    @keyframes emergencyPulse {
        0%, 100% { transform: scale(1); box-shadow: 0 10px 30px rgba(255, 0, 0, 0.6); }
        50% { transform: scale(1.05); box-shadow: 0 15px 40px rgba(255, 0, 0, 0.8); }
    }
`;
document.head.appendChild(emergencyStyle);

// Show emergency alert on page load
setTimeout(showEmergencyAlert, 3000);

// Performance monitoring
console.log('🔥 Fire Regime Shifts Level 3 Crisis System Initialized');
console.log('📊 Data visualization systems active');
console.log('🚨 Emergency response protocols loaded');
console.log('⚠️ Species adaptation failure monitoring enabled');