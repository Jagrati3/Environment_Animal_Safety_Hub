// Urban Night Ecology Collapse JS
// Handles map, damage visualization, interventions, history, feedback

let cityNightData = [
  { area: 'Central Park', light: 90, noise: 70, impact: 'High', species: ['Bats', 'Owls', 'Moths'] },
  { area: 'Downtown', light: 100, noise: 85, impact: 'Severe', species: ['Pollinators', 'Birds'] },
  { area: 'Suburbs', light: 60, noise: 40, impact: 'Moderate', species: ['Frogs', 'Beetles'] },
  { area: 'Riverfront', light: 50, noise: 30, impact: 'Low', species: ['Fireflies', 'Otters'] }
];
let interventions = [
  { name: 'Dark Corridor', desc: 'Create unlit paths for wildlife movement.' },
  { name: 'Shielded Lighting', desc: 'Install fixtures that direct light downward.' },
  { name: 'Quiet Windows', desc: 'Use soundproofing to reduce noise.' },
  { name: 'Timing Controls', desc: 'Turn off lights during critical hours.' }
];
let interventionHistory = [];
let feedbacks = [];

// --- App Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const cityMap = document.getElementById('cityMap');
  const damageVisualization = document.getElementById('damageVisualization');
  const interventionList = document.getElementById('interventionList');
  const interventionHistoryDiv = document.getElementById('interventionHistory');
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackInput = document.getElementById('feedbackInput');
  const feedbackList = document.getElementById('feedbackList');

  // Render map (placeholder)
  function renderMap() {
    cityMap.innerHTML = 'Night map visualization coming soon.';
  }

  // Render damage visualization
  function renderDamage() {
    damageVisualization.innerHTML = '';
    cityNightData.forEach(d => {
      damageVisualization.innerHTML += `<div class='damage-row'><strong>${d.area}</strong><span>Light: ${d.light}</span><span>Noise: ${d.noise}</span><span>Impact: ${d.impact}</span><span>Species affected: ${d.species.join(', ')}</span></div>`;
    });
  }

  // Render interventions
  function renderInterventions() {
    interventionList.innerHTML = '';
    interventions.forEach((i, idx) => {
      interventionList.innerHTML += `<div class='intervention-row'><strong>${i.name}</strong><span>${i.desc}</span><button onclick='window.applyIntervention(${idx})'>Apply</button></div>`;
    });
  }

  // Apply intervention
  function applyIntervention(idx) {
    const i = interventions[idx];
    interventionHistory.push({ name: i.name, date: new Date().toLocaleString() });
    renderHistory();
  }

  // Render history
  function renderHistory() {
    interventionHistoryDiv.innerHTML = '';
    interventionHistory.slice(-10).reverse().forEach(h => {
      interventionHistoryDiv.innerHTML += `<div class='history-row'><span>${h.name}</span><span>${h.date}</span></div>`;
    });
  }

  // Feedback logic
  feedbackForm.onsubmit = function(e) {
    e.preventDefault();
    const text = feedbackInput.value.trim();
    if (!text) return;
    feedbacks.push({ text, date: new Date().toLocaleString() });
    renderFeedbacks();
    feedbackForm.reset();
  };
  function renderFeedbacks() {
    feedbackList.innerHTML = '';
    feedbacks.slice(-10).reverse().forEach(f => {
      feedbackList.innerHTML += `<div class='feedback-row'><span>${f.text}</span><small>${f.date}</small></div>`;
    });
  }

  // Expose applyIntervention globally
  window.applyIntervention = applyIntervention;

  // Initial render
  renderMap();
  renderDamage();
  renderInterventions();
  renderHistory();
  renderFeedbacks();
});
