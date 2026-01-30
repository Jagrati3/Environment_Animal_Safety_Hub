// Carbon Calculator JavaScript

let currentStep = 1;
const totalSteps = 5;
let calculationResults = {};
let categoryChart = null;
let breakdownChart = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCalculator();
    displayTips(sustainabilityTips);
    setupTipFilters();
});

// Initialize calculator
function initializeCalculator() {
    updateProgressBar();
    updateNavigationButtons();
}

// Change step
function changeStep(direction) {
    const newStep = currentStep + direction;
    
    if (newStep < 1 || newStep > totalSteps) {
        return;
    }
    
    // Validate current step before moving forward
    if (direction > 0 && !validateStep(currentStep)) {
        return;
    }
    
    // Hide current step
    document.querySelector(`.calculator-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
    
    // Show new step
    currentStep = newStep;
    document.querySelector(`.calculator-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');
    
    // Mark completed steps
    for (let i = 1; i < currentStep; i++) {
        document.querySelector(`.progress-step[data-step="${i}"]`).classList.add('completed');
    }
    
    updateProgressBar();
    updateNavigationButtons();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Validate step
function validateStep(step) {
    // Basic validation - can be enhanced
    return true;
}

// Update progress bar
function updateProgressBar() {
    const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
    document.getElementById('progressFill').style.width = `${progressPercent}%`;
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    
    // Show/hide previous button
    prevBtn.style.display = currentStep === 1 ? 'none' : 'flex';
    
    // Show appropriate forward button
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        calculateBtn.style.display = 'none';
    } else if (currentStep === totalSteps - 1) {
        nextBtn.style.display = 'none';
        calculateBtn.style.display = 'flex';
    } else {
        nextBtn.style.display = 'flex';
        calculateBtn.style.display = 'none';
    }
}

// Calculate carbon footprint
function calculateFootprint() {
    // Get form values
    const formData = {
        // Transportation
        carMiles: parseFloat(document.getElementById('carMiles').value) || 0,
        carType: document.getElementById('carType').value,
        publicTransit: parseFloat(document.getElementById('publicTransit').value) || 0,
        flightsShort: parseFloat(document.getElementById('flightsShort').value) || 0,
        flightsLong: parseFloat(document.getElementById('flightsLong').value) || 0,
        
        // Home Energy
        electricity: parseFloat(document.getElementById('electricity').value) || 0,
        naturalGas: parseFloat(document.getElementById('naturalGas').value) || 0,
        heatingOil: parseFloat(document.getElementById('heatingOil').value) || 0,
        renewableEnergy: parseFloat(document.getElementById('renewableEnergy').value) || 0,
        waterUsage: document.getElementById('waterUsage').value,
        
        // Food
        dietType: document.getElementById('dietType').value,
        localFood: document.getElementById('localFood').value,
        organicFood: document.getElementById('organicFood').value,
        foodWaste: document.getElementById('foodWaste').value,
        
        // Lifestyle
        shoppingFrequency: document.getElementById('shoppingFrequency').value,
        secondHand: document.getElementById('secondHand').value,
        recycling: document.getElementById('recycling').value,
        composting: document.getElementById('composting').value,
        singleUsePlastic: document.getElementById('singleUsePlastic').value,
        digitalUsage: document.getElementById('digitalUsage').value
    };
    
    // Calculate emissions by category
    const transportation = calculateTransportation(formData);
    const homeEnergy = calculateHomeEnergy(formData);
    const food = calculateFood(formData);
    const lifestyle = calculateLifestyle(formData);
    
    // Store results
    calculationResults = {
        transportation,
        homeEnergy,
        food,
        lifestyle,
        total: transportation + homeEnergy + food + lifestyle
    };
    
    // Display results
    displayResults();
    
    // Move to results step
    changeStep(1);
}

// Calculate transportation emissions
function calculateTransportation(data) {
    let emissions = 0;
    
    // Car emissions
    const carFactor = emissionFactors.transportation.carTypes[data.carType];
    emissions += (data.carMiles * carFactor) / 1000; // Convert kg to tons
    
    // Public transit
    emissions += (data.publicTransit * 52 * emissionFactors.transportation.publicTransit) / 1000;
    
    // Flights
    emissions += (data.flightsShort * emissionFactors.transportation.flightShort) / 1000;
    emissions += (data.flightsLong * emissionFactors.transportation.flightLong) / 1000;
    
    return parseFloat(emissions.toFixed(2));
}

// Calculate home energy emissions
function calculateHomeEnergy(data) {
    let emissions = 0;
    
    // Electricity (with renewable adjustment)
    const electricityEmissions = (data.electricity * 12 * emissionFactors.homeEnergy.electricity) / 1000;
    const renewableAdjustment = 1 - (data.renewableEnergy / 100);
    emissions += electricityEmissions * renewableAdjustment;
    
    // Natural gas
    emissions += (data.naturalGas * 12 * emissionFactors.homeEnergy.naturalGas) / 1000;
    
    // Heating oil
    emissions += (data.heatingOil * emissionFactors.homeEnergy.heatingOil) / 1000;
    
    // Water usage
    emissions += emissionFactors.homeEnergy.water[data.waterUsage] / 1000;
    
    return parseFloat(emissions.toFixed(2));
}

// Calculate food emissions
function calculateFood(data) {
    let emissions = emissionFactors.food.dietTypes[data.dietType] / 1000; // Convert to tons
    
    // Apply modifiers
    emissions *= emissionFactors.food.localFood[data.localFood];
    emissions *= emissionFactors.food.organicFood[data.organicFood];
    emissions *= emissionFactors.food.foodWaste[data.foodWaste];
    
    return parseFloat(emissions.toFixed(2));
}

// Calculate lifestyle emissions
function calculateLifestyle(data) {
    let emissions = 0;
    
    // Shopping
    let shoppingEmissions = emissionFactors.lifestyle.shopping[data.shoppingFrequency] / 1000;
    shoppingEmissions *= emissionFactors.lifestyle.secondHand[data.secondHand];
    emissions += shoppingEmissions;
    
    // Waste management
    let wasteEmissions = 100 / 1000; // Base waste emissions
    wasteEmissions *= emissionFactors.lifestyle.recycling[data.recycling];
    wasteEmissions *= emissionFactors.lifestyle.composting[data.composting];
    wasteEmissions *= emissionFactors.lifestyle.singleUsePlastic[data.singleUsePlastic];
    emissions += wasteEmissions;
    
    // Digital usage
    emissions += emissionFactors.lifestyle.digitalUsage[data.digitalUsage] / 1000;
    
    return parseFloat(emissions.toFixed(2));
}

// Display results
function displayResults() {
    const total = calculationResults.total;
    
    // Update total footprint
    document.getElementById('totalFootprint').textContent = total.toFixed(1);
    
    // Calculate comparisons
    const globalAverage = averages.global;
    const targetGoal = averages.target;
    
    const globalDiff = ((total - globalAverage) / globalAverage * 100).toFixed(0);
    const targetDiff = ((total - targetGoal) / targetGoal * 100).toFixed(0);
    
    // Update comparison displays
    const globalCompEl = document.getElementById('globalComparison');
    const targetCompEl = document.getElementById('targetComparison');
    
    globalCompEl.textContent = globalDiff > 0 ? `+${globalDiff}%` : `${globalDiff}%`;
    globalCompEl.style.color = globalDiff > 0 ? '#f44336' : '#4caf50';
    
    targetCompEl.textContent = targetDiff > 0 ? `+${targetDiff}%` : `${targetDiff}%`;
    targetCompEl.style.color = targetDiff > 0 ? '#f44336' : '#4caf50';
    
    // Create charts
    createCharts();
    
    // Display category details
    displayCategoryDetails();
}

// Create charts
function createCharts() {
    // Destroy existing charts
    if (categoryChart) categoryChart.destroy();
    if (breakdownChart) breakdownChart.destroy();
    
    const categories = ['Transportation', 'Home Energy', 'Food', 'Lifestyle'];
    const values = [
        calculationResults.transportation,
        calculationResults.homeEnergy,
        calculationResults.food,
        calculationResults.lifestyle
    ];
    
    const colors = ['#ff7043', '#ffa726', '#66bb6a', '#42a5f5'];
    
    // Category bar chart
    const ctx1 = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'CO₂e (tons/year)',
                data: values,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1);
                        }
                    }
                }
            }
        }
    });
    
    // Breakdown pie chart
    const ctx2 = document.getElementById('breakdownChart').getContext('2d');
    breakdownChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: values,
                backgroundColor: colors,
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Display category details
function displayCategoryDetails() {
    const container = document.getElementById('categoryDetails');
    const categories = [
        { name: 'Transportation', value: calculationResults.transportation, icon: 'fa-car' },
        { name: 'Home Energy', value: calculationResults.homeEnergy, icon: 'fa-home' },
        { name: 'Food', value: calculationResults.food, icon: 'fa-utensils' },
        { name: 'Lifestyle', value: calculationResults.lifestyle, icon: 'fa-shopping-bag' }
    ];
    
    container.innerHTML = categories.map(cat => `
        <div class="category-item">
            <div class="category-name">
                <i class="fas ${cat.icon}"></i>
                <span>${cat.name}</span>
            </div>
            <div class="category-value">${cat.value.toFixed(2)} tons</div>
        </div>
    `).join('');
}

// Download report
function downloadReport() {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carbon-footprint-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Generate report text
function generateReport() {
    const date = new Date().toLocaleDateString();
    const total = calculationResults.total;
    
    let report = `CARBON FOOTPRINT REPORT
Generated: ${date}
Environmental Wildlife Outreach Coalition (EWOC)

========================================
TOTAL ANNUAL FOOTPRINT: ${total.toFixed(2)} tons CO₂e
========================================

BREAKDOWN BY CATEGORY:
- Transportation: ${calculationResults.transportation.toFixed(2)} tons CO₂e (${(calculationResults.transportation/total*100).toFixed(1)}%)
- Home Energy: ${calculationResults.homeEnergy.toFixed(2)} tons CO₂e (${(calculationResults.homeEnergy/total*100).toFixed(1)}%)
- Food: ${calculationResults.food.toFixed(2)} tons CO₂e (${(calculationResults.food/total*100).toFixed(1)}%)
- Lifestyle: ${calculationResults.lifestyle.toFixed(2)} tons CO₂e (${(calculationResults.lifestyle/total*100).toFixed(1)}%)

COMPARISONS:
- Global Average: ${averages.global} tons CO₂e
- Target Goal: ${averages.target} tons CO₂e
- Your Status: ${total > averages.global ? 'Above' : 'Below'} average

RECOMMENDED ACTIONS:
`;

    // Add top 5 tips based on highest impact
    const topTips = sustainabilityTips
        .filter(tip => tip.impact === 'high')
        .slice(0, 5);
    
    topTips.forEach((tip, index) => {
        report += `\n${index + 1}. ${tip.title}
   ${tip.description}
   Potential Reduction: ${tip.co2Reduction}
`;
    });

    report += `\n\nFor more personalized recommendations, visit:
https://ewoc.org/carbon-calculator

Thank you for taking action on climate change!
`;

    return report;
}

// Reset calculator
function resetCalculator() {
    if (confirm('Are you sure you want to start over? All your data will be lost.')) {
        document.getElementById('carbonCalculatorForm').reset();
        currentStep = 1;
        calculationResults = {};
        
        // Reset all steps
        document.querySelectorAll('.calculator-step').forEach(step => {
            step.classList.remove('active');
        });
        document.querySelector('.calculator-step[data-step="1"]').classList.add('active');
        
        // Reset progress
        document.querySelectorAll('.progress-step').forEach(step => {
            step.classList.remove('active', 'completed');
        });
        document.querySelector('.progress-step[data-step="1"]').classList.add('active');
        
        updateProgressBar();
        updateNavigationButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Display tips
function displayTips(tips) {
    const grid = document.getElementById('tipsGrid');
    
    grid.innerHTML = tips.map(tip => `
        <div class="tip-card" data-category="${tip.category}" data-impact="${tip.impact}" data-difficulty="${tip.difficulty}">
            <div class="tip-header">
                <i class="fas ${tip.icon} tip-icon"></i>
                <h3 class="tip-title">${tip.title}</h3>
            </div>
            <p class="tip-description">${tip.description}</p>
            <div class="tip-badges">
                <span class="tip-badge badge-impact ${tip.impact}">${tip.impact.toUpperCase()} Impact</span>
                <span class="tip-badge badge-difficulty">${tip.difficulty}</span>
                <span class="tip-badge badge-category">${tip.category}</span>
            </div>
            <div class="tip-reduction">
                <i class="fas fa-arrow-down"></i>
                <span>${tip.co2Reduction}</span>
            </div>
        </div>
    `).join('');
}

// Setup tip filters
function setupTipFilters() {
    const impactFilter = document.getElementById('impactFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const difficultyFilter = document.getElementById('difficultyFilter');
    
    [impactFilter, categoryFilter, difficultyFilter].forEach(filter => {
        filter.addEventListener('change', filterTips);
    });
}

// Filter tips
function filterTips() {
    const impact = document.getElementById('impactFilter').value;
    const category = document.getElementById('categoryFilter').value;
    const difficulty = document.getElementById('difficultyFilter').value;
    
    const filtered = sustainabilityTips.filter(tip => {
        const matchesImpact = impact === 'all' || tip.impact === impact;
        const matchesCategory = category === 'all' || tip.category === category;
        const matchesDifficulty = difficulty === 'all' || tip.difficulty === difficulty;
        
        return matchesImpact && matchesCategory && matchesDifficulty;
    });
    
    displayTips(filtered);
}

// Export functions for HTML onclick handlers
window.changeStep = changeStep;
window.calculateFootprint = calculateFootprint;
window.downloadReport = downloadReport;
window.resetCalculator = resetCalculator;
