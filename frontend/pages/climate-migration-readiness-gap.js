// Climate Migration Readiness Gap JS
// Handles migration pressure map, preparedness actions, impact tracker, history, feedback

let migrationPressure = [
  { region: 'Coastal Zone', risk: 'Sea-level rise', migrants: 12000 },
  { region: 'Drought Belt', risk: 'Water scarcity', migrants: 9000 },
  { region: 'Urban Fringe', risk: 'Heat waves', migrants: 7000 },
  { region: 'Rural Farmland', risk: 'Crop failure', migrants: 5000 }
];
let preparednessActions = [
  { name: 'Expand Housing', desc: 'Build affordable homes for incoming migrants.' },
  { name: 'Water Security', desc: 'Upgrade water infrastructure and storage.' },
  { name: 'Health Services', desc: 'Increase clinics and mental health support.' },
  { name: 'Job Creation', desc: 'Launch job training and placement programs.' }
];
let impact = {
  migrantsHelped: 0,
  actionsTaken: 0,
  infrastructureScore: 100,
  monthlyImprovement: 0
};
let actionHistory = [];
let feedbacks = [];

// --- App Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const pressureMap = document.getElementById('pressureMap');
  const preparednessActionsDiv = document.getElementById('preparednessActions');
  const impactTracker = document.getElementById('impactTracker');
  const actionHistoryDiv = document.getElementById('actionHistory');
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackInput = document.getElementById('feedbackInput');
  const feedbackList = document.getElementById('feedbackList');

  // Render migration pressure map
  function renderPressureMap() {
    pressureMap.innerHTML = '';
    migrationPressure.forEach(p => {
      pressureMap.innerHTML += `<div class='impact-row'><strong>${p.region}</strong><span>Risk: ${p.risk}</span><span>Migrants: ${p.migrants}</span></div>`;
    });
  }

  // Render preparedness actions
  function renderActions() {
    preparednessActionsDiv.innerHTML = '';
    preparednessActions.forEach((a, idx) => {
      preparednessActionsDiv.innerHTML += `<div class='action-row'><strong>${a.name}</strong><span>${a.desc}</span><button onclick='window.takeAction(${idx})'>Take Action</button></div>`;
    });
  }

  // Take action
  function takeAction(idx) {
    const a = preparednessActions[idx];
    impact.actionsTaken++;
    impact.infrastructureScore += 5;
    impact.monthlyImprovement = Math.max(0, impact.infrastructureScore - 100);
    impact.migrantsHelped += Math.floor(Math.random()*2000);
    actionHistory.push({ name: a.name, date: new Date().toLocaleString() });
    renderImpact();
    renderHistory();
  }

  // Render impact tracker
  function renderImpact() {
    impactTracker.innerHTML = '';
    impactTracker.innerHTML += `<div class='impact-row'><span>Migrants Helped</span><span>${impact.migrantsHelped}</span></div>`;
    impactTracker.innerHTML += `<div class='impact-row'><span>Actions Taken</span><span>${impact.actionsTaken}</span></div>`;
    impactTracker.innerHTML += `<div class='impact-row'><span>Infrastructure Score</span><span>${impact.infrastructureScore}</span></div>`;
    impactTracker.innerHTML += `<div class='impact-row'><span>Monthly Improvement</span><span>${impact.monthlyImprovement}</span></div>`;
  }

  // History
  function renderHistory() {
    actionHistoryDiv.innerHTML = '';
    actionHistory.slice(-10).reverse().forEach(h => {
      actionHistoryDiv.innerHTML += `<div class='history-row'><span>${h.name}</span><span>${h.date}</span></div>`;
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

  // Expose takeAction globally
  window.takeAction = takeAction;

  // Initial render
  renderPressureMap();
  renderActions();
  renderImpact();
  renderHistory();
  renderFeedbacks();
});
