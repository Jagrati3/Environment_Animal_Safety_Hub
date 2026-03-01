// Nature Negotiation Simulator JS
// Handles stakeholders, decisions, outcomes, history, feedback

let stakeholders = [
  { id: 'gov', name: 'Government', goals: 'Balance economy, jobs, and environment.' },
  { id: 'farm', name: 'Farmers', goals: 'Productivity, water access, land use.' },
  { id: 'ind', name: 'Industry', goals: 'Profit, jobs, emissions.' },
  { id: 'com', name: 'Communities', goals: 'Health, jobs, water security.' },
  { id: 'con', name: 'Conservation Groups', goals: 'Ecosystem health, biodiversity.' }
];
let decisions = [
  { id: 'subsidy', name: 'Subsidize Clean Tech', desc: 'Government funds clean energy for industry and farms.', effects: { economy: +2, jobs: +1, emissions: -3, water: 0, ecosystem: +2 } },
  { id: 'limit', name: 'Limit Water Extraction', desc: 'Restrict water use for farms and industry.', effects: { economy: -1, jobs: -1, emissions: 0, water: +3, ecosystem: +2 } },
  { id: 'restore', name: 'Restore Wetlands', desc: 'Conservation groups restore wetlands.', effects: { economy: -1, jobs: 0, emissions: -1, water: +2, ecosystem: +3 } },
  { id: 'tax', name: 'Carbon Tax', desc: 'Tax emissions for industry.', effects: { economy: -2, jobs: -1, emissions: -4, water: 0, ecosystem: +1 } },
  { id: 'expand', name: 'Expand Agriculture', desc: 'Increase farm land.', effects: { economy: +2, jobs: +2, emissions: +2, water: -2, ecosystem: -3 } }
];
let outcomes = { economy: 0, jobs: 0, emissions: 0, water: 0, ecosystem: 0 };
let history = [];
let feedbacks = [];

// --- Simulator Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const stakeholderList = document.getElementById('stakeholderList');
  const decisionList = document.getElementById('decisionList');
  const outcomeList = document.getElementById('outcomeList');
  const decisionHistory = document.getElementById('decisionHistory');
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackInput = document.getElementById('feedbackInput');
  const feedbackListDiv = document.getElementById('feedbackList');

  // Render stakeholders
  function renderStakeholders() {
    stakeholderList.innerHTML = '';
    stakeholders.forEach(s => {
      stakeholderList.innerHTML += `<div class='stakeholder-row'><strong>${s.name}</strong><span>${s.goals}</span></div>`;
    });
  }

  // Render decisions
  function renderDecisions() {
    decisionList.innerHTML = '';
    decisions.forEach((d, i) => {
      decisionList.innerHTML += `<div class='decision-row'><strong>${d.name}</strong><span>${d.desc}</span><button onclick='window.makeDecision(${i})'>Select</button></div>`;
    });
  }

  // Make decision
  function makeDecision(index) {
    const d = decisions[index];
    Object.keys(outcomes).forEach(k => {
      outcomes[k] += d.effects[k];
    });
    history.push({ name: d.name, effects: d.effects, date: new Date().toLocaleString() });
    renderOutcomes();
    renderHistory();
    renderDecisions();
  }

  // Render outcomes
  function renderOutcomes() {
    outcomeList.innerHTML = '';
    Object.keys(outcomes).forEach(k => {
      outcomeList.innerHTML += `<div class='outcome-row'><span>${k.charAt(0).toUpperCase()+k.slice(1)}</span><span>${outcomes[k]}</span></div>`;
    });
  }

  // Render history
  function renderHistory() {
    decisionHistory.innerHTML = '';
    history.slice(-10).reverse().forEach(h => {
      decisionHistory.innerHTML += `<div class='history-row'><span>${h.name}</span><span>${Object.entries(h.effects).map(([k,v])=>k+':'+v).join(', ')}</span><span>${h.date}</span></div>`;
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
    feedbackListDiv.innerHTML = '';
    feedbacks.slice(-10).reverse().forEach(f => {
      feedbackListDiv.innerHTML += `<div class='feedback-row'><span>${f.text}</span><small>${f.date}</small></div>`;
    });
  }

  // Expose makeDecision globally
  window.makeDecision = makeDecision;

  // Initial render
  renderStakeholders();
  renderDecisions();
  renderOutcomes();
  renderHistory();
  renderFeedbacks();
});
