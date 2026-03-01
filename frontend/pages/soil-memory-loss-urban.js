// Soil Memory Loss in Urban Landscapes JS
// Handles soil map, health visualization, restoration actions, impact, history, feedback

let soilHealthData = [
  { area: 'City Park', microbes: 80, carbon: 60, water: 70, status: 'Healthy', biodiversity: 'High' },
  { area: 'Industrial Zone', microbes: 20, carbon: 15, water: 30, status: 'Degraded', biodiversity: 'Low' },
  { area: 'Residential Block', microbes: 40, carbon: 35, water: 50, status: 'Moderate', biodiversity: 'Medium' },
  { area: 'Roadside', microbes: 10, carbon: 5, water: 15, status: 'Dead', biodiversity: 'Minimal' }
];
let restorationActions = [
  { name: 'Add Compost', desc: 'Restore carbon and microbes with organic compost.' },
  { name: 'Plant Native Species', desc: 'Increase biodiversity and soil cover.' },
  { name: 'Reduce Chemicals', desc: 'Limit fertilizer and pesticide use.' },
  { name: 'Permeable Paving', desc: 'Allow water infiltration and root growth.' }
];
let impact = {
  restoredSites: 0,
  actionsTaken: 0,
  coolingScore: 100,
  stormwaterScore: 100,
  biodiversityScore: 100,
  monthlyImprovement: 0
};
let restorationHistory = [];
let feedbacks = [];

// --- App Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const soilMap = document.getElementById('soilMap');
  const soilVisualization = document.getElementById('soilVisualization');
  const restorationActionsDiv = document.getElementById('restorationActions');
  const impactTracker = document.getElementById('impactTracker');
  const restorationHistoryDiv = document.getElementById('restorationHistory');
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackInput = document.getElementById('feedbackInput');
  const feedbackList = document.getElementById('feedbackList');

  // Render soil map (placeholder)
  function renderSoilMap() {
    soilMap.innerHTML = 'Urban soil health map coming soon.';
  }

  // Render soil health visualization
  function renderSoilVisualization() {
    soilVisualization.innerHTML = '';
    soilHealthData.forEach(d => {
      soilVisualization.innerHTML += `<div class='visual-row'><strong>${d.area}</strong><span>Microbes: ${d.microbes}</span><span>Carbon: ${d.carbon}</span><span>Water: ${d.water}</span><span>Status: ${d.status}</span><span>Biodiversity: ${d.biodiversity}</span></div>`;
    });
  }

  // Render restoration actions
  function renderActions() {
    restorationActionsDiv.innerHTML = '';
    restorationActions.forEach((a, idx) => {
      restorationActionsDiv.innerHTML += `<div class='action-row'><strong>${a.name}</strong><span>${a.desc}</span><button onclick='window.applyRestoration(${idx})'>Apply</button></div>`;
    });
  }

  // Apply restoration
  function applyRestoration(idx) {
    const a = restorationActions[idx];
    impact.actionsTaken++;
    impact.restoredSites++;
    impact.coolingScore += 5;
    impact.stormwaterScore += 5;
    impact.biodiversityScore += 10;
    impact.monthlyImprovement = Math.max(0, impact.coolingScore + impact.stormwaterScore + impact.biodiversityScore - 300);
    restorationHistory.push({ name: a.name, date: new Date().toLocaleString() });
    renderImpact();
    renderHistory();
  }

  // Render impact tracker
  function renderImpact() {
    impactTracker.innerHTML = '';
    impactTracker.innerHTML += `<div class='impact-row'><span>Restored Sites</span><span>${impact.restoredSites}</span></div>`;
    impactTracker.innerHTML += `<div class='impact-row'><span>Actions Taken</span><span>${impact.actionsTaken}</span></div>`;
    impactTracker.innerHTML += `<div class='impact-row'><span>Cooling Score</span><span>${impact.coolingScore}</span></div>`;
    impactTracker.innerHTML += `<div class='impact-row'><span>Stormwater Score</span><span>${impact.stormwaterScore}</span></div>`;
    impactTracker.innerHTML += `<div class='impact-row'><span>Biodiversity Score</span><span>${impact.biodiversityScore}</span></div>`;
    impactTracker.innerHTML += `<div class='impact-row'><span>Monthly Improvement</span><span>${impact.monthlyImprovement}</span></div>`;
  }

  // History
  function renderHistory() {
    restorationHistoryDiv.innerHTML = '';
    restorationHistory.slice(-10).reverse().forEach(h => {
      restorationHistoryDiv.innerHTML += `<div class='history-row'><span>${h.name}</span><span>${h.date}</span></div>`;
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

  // Expose applyRestoration globally
  window.applyRestoration = applyRestoration;

  // Initial render
  renderSoilMap();
  renderSoilVisualization();
  renderActions();
  renderImpact();
  renderHistory();
  renderFeedbacks();
});
