// Eco-Friendly Home Audit Tool JS
// Handles audit calculation, progress tracking, and suggestions

document.addEventListener('DOMContentLoaded', function() {
  // --- Audit ---
  const form = document.getElementById('homeAuditForm');
  const resultDiv = document.getElementById('auditResult');
  let lastAudit = { energy: null, water: null, waste: null };

  function calculateAudit(e) {
    if (e) e.preventDefault();
    const energy = parseInt(document.getElementById('energy').value) || 0;
    const water = parseInt(document.getElementById('water').value) || 0;
    const waste = parseInt(document.getElementById('waste').value) || 0;
    lastAudit = { energy, water, waste };
    resultDiv.textContent = `Your monthly usage: ${energy} kWh energy, ${water} liters water, ${waste} kg waste.`;
    updateProgress();
    updateSuggestions();
  }
  form.addEventListener('submit', calculateAudit);

  // --- Progress Tracking ---
  const progressBar = document.getElementById('progressBar');
  const progressLabel = document.getElementById('progressLabel');
  const goalForm = document.getElementById('goalForm');
  const goalEnergy = document.getElementById('goalEnergy');
  const goalWater = document.getElementById('goalWater');
  const goalWaste = document.getElementById('goalWaste');
  let goals = { energy: parseInt(goalEnergy.value) || 300, water: parseInt(goalWater.value) || 2500, waste: parseInt(goalWaste.value) || 15 };

  function updateProgress() {
    if (!lastAudit.energy || !lastAudit.water || !lastAudit.waste) return;
    const energyPct = Math.max(0, Math.min(100, 100 * (1 - lastAudit.energy / goals.energy)));
    const waterPct = Math.max(0, Math.min(100, 100 * (1 - lastAudit.water / goals.water)));
    const wastePct = Math.max(0, Math.min(100, 100 * (1 - lastAudit.waste / goals.waste)));
    const avgPct = Math.round((energyPct + waterPct + wastePct) / 3);
    progressBar.style.width = avgPct + '%';
    if (lastAudit.energy <= goals.energy && lastAudit.water <= goals.water && lastAudit.waste <= goals.waste) {
      progressLabel.textContent = `Excellent! You met all your goals.`;
      progressBar.style.background = 'linear-gradient(90deg, #43a047 0%, #fbc02d 100%)';
    } else {
      progressLabel.textContent = `Progress: Energy ${energyPct.toFixed(0)}%, Water ${waterPct.toFixed(0)}%, Waste ${wastePct.toFixed(0)}%`;
      progressBar.style.background = 'linear-gradient(90deg, #388e3c 0%, #fbc02d 100%)';
    }
  }
  goalForm.addEventListener('submit', function(e) {
    e.preventDefault();
    goals = {
      energy: parseInt(goalEnergy.value) || 300,
      water: parseInt(goalWater.value) || 2500,
      waste: parseInt(goalWaste.value) || 15
    };
    updateProgress();
  });

  // --- Suggestions ---
  function updateSuggestions() {
    const suggestions = [];
    if (lastAudit.energy > goals.energy) {
      suggestions.push('Reduce energy use: switch to LED bulbs, unplug devices, and use smart thermostats.');
    }
    if (lastAudit.water > goals.water) {
      suggestions.push('Save water: fix leaks, install low-flow fixtures, and run appliances with full loads.');
    }
    if (lastAudit.waste > goals.waste) {
      suggestions.push('Minimize waste: compost, recycle, and avoid single-use products.');
    }
    if (suggestions.length === 0) {
      suggestions.push('Your home is performing sustainably! Keep up the good work.');
    }
    const suggestList = document.getElementById('suggestList');
    suggestList.innerHTML = '';
    suggestions.forEach(s => {
      const li = document.createElement('li');
      li.textContent = s;
      suggestList.appendChild(li);
    });
  }

  // Initial calculation
  calculateAudit();
});
