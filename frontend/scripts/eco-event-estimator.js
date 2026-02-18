// eco-event-estimator.js
// Main logic for Eco-Event Footprint Estimator

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('event-form');
    const scorecardSection = document.getElementById('scorecard');
    const scorecardContent = document.getElementById('scorecard-content');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Gather input values
        const eventName = document.getElementById('eventName').value;
        const eventType = document.getElementById('eventType').value;
        const attendees = parseInt(document.getElementById('attendees').value);
        const wasteKg = parseFloat(document.getElementById('wasteKg').value) || 0;
        const recyclingPercent = parseFloat(document.getElementById('recyclingPercent').value) || 0;
        const energyKwh = parseFloat(document.getElementById('energyKwh').value) || 0;
        const renewablePercent = parseFloat(document.getElementById('renewablePercent').value) || 0;
        const avgDistance = parseFloat(document.getElementById('avgDistance').value) || 0;
        const carPercent = parseFloat(document.getElementById('carPercent').value) || 0;
        const publicPercent = parseFloat(document.getElementById('publicPercent').value) || 0;

        // Waste Impact Calculation
        const wastePerPerson = wasteKg / attendees;
        const recycledWaste = wasteKg * (recyclingPercent / 100);
        const landfillWaste = wasteKg - recycledWaste;

        // Energy Impact Calculation
        const energyPerPerson = energyKwh / attendees;
        const renewableEnergy = energyKwh * (renewablePercent / 100);
        const nonRenewableEnergy = energyKwh - renewableEnergy;

        // Transport Impact Calculation
        const carKm = avgDistance * attendees * (carPercent / 100);
        const publicKm = avgDistance * attendees * (publicPercent / 100);
        const carCO2 = carKm * 0.21; // kg CO2 per km (average car)
        const publicCO2 = publicKm * 0.09; // kg CO2 per km (average public transport)
        const totalCO2 = carCO2 + publicCO2;

        // Sustainability Score Calculation
        let score = 100;
        score -= landfillWaste * 0.5;
        score -= nonRenewableEnergy * 0.3;
        score -= totalCO2 * 0.2;
        score = Math.max(0, Math.round(score));

        // Generate Scorecard
        scorecardContent.innerHTML = `
            <h3>${eventName} (${eventType})</h3>
            <ul>
                <li><strong>Attendees:</strong> ${attendees}</li>
                <li><strong>Total Waste:</strong> ${wasteKg.toFixed(2)} kg</li>
                <li><strong>Recycled Waste:</strong> ${recycledWaste.toFixed(2)} kg (${recyclingPercent}%)</li>
                <li><strong>Landfill Waste:</strong> ${landfillWaste.toFixed(2)} kg</li>
                <li><strong>Total Energy:</strong> ${energyKwh.toFixed(2)} kWh</li>
                <li><strong>Renewable Energy:</strong> ${renewableEnergy.toFixed(2)} kWh (${renewablePercent}%)</li>
                <li><strong>Non-Renewable Energy:</strong> ${nonRenewableEnergy.toFixed(2)} kWh</li>
                <li><strong>Average Travel Distance:</strong> ${avgDistance.toFixed(2)} km</li>
                <li><strong>Car Usage:</strong> ${carPercent}%</li>
                <li><strong>Public Transport Usage:</strong> ${publicPercent}%</li>
                <li><strong>Transport CO₂ Emissions:</strong> ${totalCO2.toFixed(2)} kg</li>
                <li><strong>Sustainability Score:</strong> <span style="font-size:1.5em;color:${score>70?'green':score>40?'orange':'red'}">${score}/100</span></li>
            </ul>
        `;
        scorecardSection.style.display = 'block';
    });
});
