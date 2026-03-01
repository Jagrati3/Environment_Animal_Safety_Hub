// Environmental Impact Calculator JS
// Calculates carbon footprint, water usage, and waste generation

document.getElementById('impact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Get values
    const carKm = parseFloat(document.getElementById('car-km').value) || 0;
    const publicKm = parseFloat(document.getElementById('public-km').value) || 0;
    const electricityKwh = parseFloat(document.getElementById('electricity-kwh').value) || 0;
    const waterLiters = parseFloat(document.getElementById('water-liters').value) || 0;
    const wasteKg = parseFloat(document.getElementById('waste-kg').value) || 0;
    const meatMeals = parseFloat(document.getElementById('meat-meals').value) || 0;

    // Simple estimation factors
    const carCO2 = carKm * 0.21; // kg CO2/km
    const publicCO2 = publicKm * 0.09; // kg CO2/km
    const electricityCO2 = electricityKwh * 0.475; // kg CO2/kWh
    const meatCO2 = meatMeals * 2.5; // kg CO2/meal
    const totalCO2 = carCO2 + publicCO2 + electricityCO2 + meatCO2;

    const waterImpact = waterLiters; // liters
    const wasteImpact = wasteKg; // kg

    // Display results
    document.getElementById('carbon-result').textContent = `Carbon Footprint: ${totalCO2.toFixed(2)} kg CO₂/day`;
    document.getElementById('water-result').textContent = `Water Usage: ${waterImpact.toFixed(0)} liters/day`;
    document.getElementById('waste-result').textContent = `Waste Generation: ${wasteImpact.toFixed(2)} kg/day`;

    // Tips
    let tips = [];
    if (carKm > 20) tips.push("Try carpooling or using public transport to reduce emissions.");
    if (electricityKwh > 10) tips.push("Switch to energy-efficient appliances or renewable energy sources.");
    if (waterLiters > 150) tips.push("Reduce shower time and fix leaks to save water.");
    if (wasteKg > 2) tips.push("Compost organic waste and recycle more.");
    if (meatMeals > 1) tips.push("Consider more plant-based meals to lower your carbon footprint.");
    if (tips.length === 0) tips.push("Great job! Your impact is below average.");
    document.getElementById('tips').innerHTML = '<h3>Tips for Improvement</h3><ul>' + tips.map(t => `<li>${t}</li>`).join('') + '</ul>';

    document.getElementById('results').classList.remove('hidden');
});

// Sample data presets
const samplePresets = [
    {
        name: "Urban Commuter",
        data: { carKm: 10, publicKm: 15, electricityKwh: 8, waterLiters: 120, wasteKg: 1.5, meatMeals: 1 }
    },
    {
        name: "Eco-Conscious Household",
        data: { carKm: 2, publicKm: 5, electricityKwh: 6, waterLiters: 90, wasteKg: 0.8, meatMeals: 0 }
    },
    {
        name: "High Consumption Family",
        data: { carKm: 40, publicKm: 0, electricityKwh: 18, waterLiters: 220, wasteKg: 3.5, meatMeals: 3 }
    },
    {
        name: "Student Living Alone",
        data: { carKm: 0, publicKm: 2, electricityKwh: 4, waterLiters: 70, wasteKg: 0.5, meatMeals: 0 }
    }
];

// Render sample preset buttons
window.addEventListener('DOMContentLoaded', () => {
    const presetContainer = document.createElement('div');
    presetContainer.id = 'preset-container';
    presetContainer.innerHTML = '<h3>Sample Data Presets</h3>';
    samplePresets.forEach((preset, idx) => {
        const btn = document.createElement('button');
        btn.textContent = preset.name;
        btn.className = 'preset-btn';
        btn.onclick = () => {
            document.getElementById('car-km').value = preset.data.carKm;
            document.getElementById('public-km').value = preset.data.publicKm;
            document.getElementById('electricity-kwh').value = preset.data.electricityKwh;
            document.getElementById('water-liters').value = preset.data.waterLiters;
            document.getElementById('waste-kg').value = preset.data.wasteKg;
            document.getElementById('meat-meals').value = preset.data.meatMeals;
        };
        presetContainer.appendChild(btn);
    });
    document.getElementById('calculator-section').insertBefore(presetContainer, document.getElementById('impact-form'));
});
