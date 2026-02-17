// home-energy-analyzer.js
// Main logic for Home Energy Efficiency Analyzer

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('analyzer-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Gather input values
        const homeType = document.getElementById('homeType').value;
        const area = parseFloat(document.getElementById('area').value) || 0;
        const occupants = parseInt(document.getElementById('occupants').value) || 1;
        const yearBuilt = parseInt(document.getElementById('yearBuilt').value) || 2000;
        const electricityKwh = parseFloat(document.getElementById('electricityKwh').value) || 0;
        const gasKwh = parseFloat(document.getElementById('gasKwh').value) || 0;
        const renewablePercent = parseFloat(document.getElementById('renewablePercent').value) || 0;
        const insulation = document.getElementById('insulation').value;
        const windows = document.getElementById('windows').value;
        const heatingType = document.getElementById('heatingType').value;
        const lighting = document.getElementById('lighting').value;
        const appliances = parseFloat(document.getElementById('appliances').value) || 0;
        const solarPanels = document.getElementById('solarPanels').value;
        const smartMeter = document.getElementById('smartMeter').value;

        // Efficiency Score Calculation
        let score = 100;
        score -= (electricityKwh + gasKwh) / area * 2;
        score += renewablePercent * 0.3;
        score += appliances * 0.2;
        if (insulation === 'excellent') score += 10;
        else if (insulation === 'good') score += 5;
        else if (insulation === 'average') score += 2;
        else if (insulation === 'poor') score -= 5;
        if (windows === 'triple') score += 8;
        else if (windows === 'double') score += 4;
        if (solarPanels === 'yes') score += 10;
        if (smartMeter === 'yes') score += 5;
        if (lighting === 'led') score += 5;
        else if (lighting === 'cfl') score += 2;
        if (heatingType === 'heatpump') score += 7;
        else if (heatingType === 'solar') score += 5;
        score = Math.max(0, Math.round(score));

        // Display result
        alert(`Efficiency Score: ${score}/100\n\nPersonalized Tips:\n- Upgrade insulation if possible.\n- Switch to LED lighting.\n- Install solar panels.\n- Use efficient appliances.\n- Monitor usage with a smart meter.\n- Consider heat pumps for heating.`);
    });
});
