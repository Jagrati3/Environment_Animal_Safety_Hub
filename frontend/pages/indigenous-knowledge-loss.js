// Indigenous Knowledge Loss - Interactive JavaScript
// Charts and calculators for the crisis assessment

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
});

// Tab navigation functionality
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Initialize all charts
function initializeCharts() {
    createKnowledgeTimelineChart();
    createResilienceRadarChart();
    createPracticesMapChart();
}

// Knowledge Erosion Timeline Chart
function createKnowledgeTimelineChart() {
    const ctx = document.getElementById('knowledgeTimelineChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1900', '1920', '1940', '1960', '1980', '2000', '2020', '2040'],
            datasets: [{
                label: 'Indigenous Languages Remaining (%)',
                data: [100, 85, 75, 65, 55, 45, 35, 25],
                borderColor: '#CD853F',
                backgroundColor: 'rgba(205, 133, 63, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Traditional Knowledge Retained (%)',
                data: [100, 88, 78, 68, 58, 48, 38, 28],
                borderColor: '#8B4513',
                backgroundColor: 'rgba(139, 69, 19, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: 'white',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Ecosystem Resilience Radar Chart
function createResilienceRadarChart() {
    const ctx = document.getElementById('resilienceRadarChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Climate Adaptation', 'Species Relationships', 'Resource Management', 'Disaster Response', 'Biodiversity Conservation', 'Cultural Continuity'],
            datasets: [{
                label: 'Traditional Management',
                data: [95, 90, 88, 92, 85, 80],
                borderColor: '#4A7C59',
                backgroundColor: 'rgba(74, 124, 89, 0.2)',
                pointBackgroundColor: '#4A7C59'
            }, {
                label: 'Modern Management Only',
                data: [60, 65, 70, 55, 75, 45],
                borderColor: '#CD853F',
                backgroundColor: 'rgba(205, 133, 63, 0.2)',
                pointBackgroundColor: '#CD853F'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: 'white',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: 'white'
                    }
                }
            }
        }
    });
}

// Global Practices Distribution Chart
function createPracticesMapChart() {
    const ctx = document.getElementById('practicesMapChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Amazon', 'Pacific Islands', 'African Savannas', 'Arctic', 'Australia', 'Southeast Asia'],
            datasets: [{
                label: 'Indigenous Groups',
                data: [400, 120, 85, 40, 250, 180],
                backgroundColor: [
                    '#2D5016',
                    '#4A7C59',
                    '#8B7355',
                    '#CD853F',
                    '#8B4513',
                    '#4A7C59'
                ],
                borderColor: 'rgba(255, 255, 255, 0.3)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Biodiversity Impact Calculator
function calculateBiodiversityImpact() {
    const knowledgeLoss = parseInt(document.getElementById('knowledgeLoss').value);
    const ecosystemType = document.getElementById('ecosystemType').value;
    const timeframe = parseInt(document.getElementById('timeframe').value);

    // Base impact factors by ecosystem
    const baseFactors = {
        rainforest: { species: 0.8, resilience: 0.7 },
        savanna: { species: 0.6, resilience: 0.8 },
        arctic: { species: 0.9, resilience: 0.6 },
        coral: { species: 0.85, resilience: 0.5 },
        wetland: { species: 0.75, resilience: 0.75 }
    };

    const factor = baseFactors[ecosystemType];

    // Calculate projected losses
    const speciesLoss = Math.round(knowledgeLoss * factor.species * (timeframe / 50));
    const resilienceLoss = Math.round(knowledgeLoss * factor.resilience * (timeframe / 50));

    // Display results
    const resultDiv = document.getElementById('biodiversityResult');
    const resultsDiv = document.getElementById('impactResults');

    resultsDiv.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 15px;">
            <div style="text-align: center; padding: 15px; background: rgba(205, 133, 63, 0.1); border-radius: 8px;">
                <div style="font-size: 2rem; font-weight: bold; color: #CD853F;">${speciesLoss}%</div>
                <div>Projected Species Loss</div>
            </div>
            <div style="text-align: center; padding: 15px; background: rgba(139, 69, 19, 0.1); border-radius: 8px;">
                <div style="font-size: 2rem; font-weight: bold; color: #8B4513;">${resilienceLoss}%</div>
                <div>Ecosystem Resilience Loss</div>
            </div>
            <div style="text-align: center; padding: 15px; background: rgba(74, 124, 89, 0.1); border-radius: 8px;">
                <div style="font-size: 2rem; font-weight: bold; color: #4A7C59;">${Math.max(0, 100 - speciesLoss)}%</div>
                <div>Remaining Biodiversity</div>
            </div>
        </div>
        <div style="margin-top: 20px; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px;">
            <strong>Assessment:</strong> ${getBiodiversityAssessment(speciesLoss, resilienceLoss, ecosystemType)}
        </div>
    `;

    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Get biodiversity assessment text
function getBiodiversityAssessment(speciesLoss, resilienceLoss, ecosystemType) {
    const totalImpact = speciesLoss + resilienceLoss;

    if (totalImpact > 150) {
        return `Critical threat to ${ecosystemType} ecosystem. Immediate intervention required to preserve remaining traditional knowledge and implement integrated conservation strategies.`;
    } else if (totalImpact > 100) {
        return `Severe impact on ${ecosystemType} biodiversity. Accelerated knowledge loss will lead to irreversible species decline and ecosystem collapse.`;
    } else if (totalImpact > 50) {
        return `Moderate to severe biodiversity loss projected. ${ecosystemType} ecosystems will experience reduced resilience and increased vulnerability to environmental changes.`;
    } else {
        return `Manageable impact with proper conservation measures. ${ecosystemType} ecosystems retain significant resilience potential if traditional knowledge is preserved.`;
    }
}

// Ecosystem Resilience Calculator
function calculateResilience() {
    const climateKnowledge = parseInt(document.getElementById('climateKnowledge').value);
    const speciesKnowledge = parseInt(document.getElementById('speciesKnowledge').value);

    // Calculate resilience score (weighted average)
    const resilienceScore = Math.round((climateKnowledge * 0.4) + (speciesKnowledge * 0.3) + ((climateKnowledge + speciesKnowledge) / 2 * 0.3));

    // Determine vulnerability level
    let vulnerabilityLevel, riskColor;
    if (resilienceScore >= 80) {
        vulnerabilityLevel = "Low Vulnerability";
        riskColor = "#4A7C59";
    } else if (resilienceScore >= 60) {
        vulnerabilityLevel = "Moderate Vulnerability";
        riskColor = "#CD853F";
    } else if (resilienceScore >= 40) {
        vulnerabilityLevel = "High Vulnerability";
        riskColor = "#FF6B35";
    } else {
        vulnerabilityLevel = "Critical Vulnerability";
        riskColor = "#DC143C";
    }

    // Display results
    const resultDiv = document.getElementById('resilienceResult');
    const resultsDiv = document.getElementById('resilienceResults');

    resultsDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 3rem; font-weight: bold; color: ${riskColor}; margin-bottom: 10px;">${resilienceScore}%</div>
            <div style="font-size: 1.2rem; color: ${riskColor}; font-weight: 600;">${vulnerabilityLevel}</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 20px;">
            <div style="text-align: center; padding: 10px; background: rgba(74, 124, 89, 0.1); border-radius: 8px;">
                <div style="font-weight: bold;">Climate Adaptation</div>
                <div style="color: #4A7C59;">${climateKnowledge}%</div>
            </div>
            <div style="text-align: center; padding: 10px; background: rgba(205, 133, 63, 0.1); border-radius: 8px;">
                <div style="font-weight: bold;">Species Knowledge</div>
                <div style="color: #CD853F;">${speciesKnowledge}%</div>
            </div>
        </div>

        <div style="padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px;">
            <strong>Recommendations:</strong> ${getResilienceRecommendations(resilienceScore)}
        </div>
    `;

    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Get resilience recommendations
function getResilienceRecommendations(score) {
    if (score >= 80) {
        return "Ecosystem maintains strong resilience. Focus on knowledge preservation and community capacity building to sustain current adaptive capacity.";
    } else if (score >= 60) {
        return "Ecosystem shows moderate resilience. Implement integrated conservation strategies combining traditional knowledge with modern science.";
    } else if (score >= 40) {
        return "Ecosystem at risk. Urgent action needed to restore traditional knowledge systems and implement emergency conservation measures.";
    } else {
        return "Critical ecosystem collapse risk. Immediate intervention required including knowledge rescue, habitat protection, and community-based restoration programs.";
    }
}

// Update slider value displays
function updateKnowledgeValue() {
    document.getElementById('knowledgeValue').textContent = document.getElementById('knowledgeLoss').value + '%';
}

function updateClimateValue() {
    document.getElementById('climateValue').textContent = document.getElementById('climateKnowledge').value + '%';
}

function updateSpeciesValue() {
    document.getElementById('speciesValue').textContent = document.getElementById('speciesKnowledge').value + '%';
}

// Setup event listeners
function setupEventListeners() {
    // Add any additional event listeners here
    console.log('Indigenous Knowledge Loss interactive features initialized');
}

// Export functions for potential external use
window.showSection = showSection;
window.calculateBiodiversityImpact = calculateBiodiversityImpact;
window.calculateResilience = calculateResilience;
window.updateKnowledgeValue = updateKnowledgeValue;
window.updateClimateValue = updateClimateValue;
window.updateSpeciesValue = updateSpeciesValue;