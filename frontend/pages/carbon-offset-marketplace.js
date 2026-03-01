// Carbon Offset Marketplace JS
// Handles project browsing, offset purchase, history, impact, feedback

let projects = [
  { id: 'forest', name: 'Forest Restoration', desc: 'Plant trees to restore forests.', price: 5 },
  { id: 'solar', name: 'Solar Energy Expansion', desc: 'Support solar farms.', price: 7 },
  { id: 'cookstove', name: 'Clean Cookstoves', desc: 'Provide clean stoves to families.', price: 4 },
  { id: 'wind', name: 'Wind Power Project', desc: 'Build wind turbines.', price: 6 },
  { id: 'wetland', name: 'Wetland Conservation', desc: 'Protect wetlands.', price: 8 }
];
let history = [];
let feedbacks = [];
let user = { id: 'user1', name: 'You', totalOffset: 0 };

// --- Marketplace Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const projectList = document.getElementById('projectList');
  const projectSelect = document.getElementById('projectSelect');
  const purchaseForm = document.getElementById('purchaseForm');
  const offsetAmount = document.getElementById('offsetAmount');
  const offsetHistory = document.getElementById('offsetHistory');
  const impactSummary = document.getElementById('impactSummary');
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackInput = document.getElementById('feedbackInput');
  const feedbackList = document.getElementById('feedbackList');

  // Render projects
  function renderProjects() {
    projectList.innerHTML = '';
    projectSelect.innerHTML = '';
    projects.forEach((p, i) => {
      const div = document.createElement('div');
      div.className = 'project-row';
      div.innerHTML = `<strong>${p.name}</strong><span>${p.desc}</span><span>Price: $${p.price}/kg CO₂</span>`;
      projectList.appendChild(div);
      projectSelect.innerHTML += `<option value='${p.id}'>${p.name}</option>`;
    });
  }

  // Purchase offset
  purchaseForm.onsubmit = function(e) {
    e.preventDefault();
    const amount = Number(offsetAmount.value);
    const projectId = projectSelect.value;
    if (!amount || !projectId) return;
    const project = projects.find(p => p.id === projectId);
    const cost = amount * project.price;
    user.totalOffset += amount;
    history.push({ project: project.name, amount, cost, date: new Date().toLocaleString() });
    renderHistory();
    renderImpact();
    purchaseForm.reset();
  };

  // Render history
  function renderHistory() {
    offsetHistory.innerHTML = '';
    history.slice(-10).reverse().forEach(h => {
      offsetHistory.innerHTML += `<div class='history-row'><span>${h.project}</span><span>${h.amount} kg CO₂</span><span>$${h.cost}</span><span>${h.date}</span></div>`;
    });
  }

  // Render impact summary
  function renderImpact() {
    impactSummary.innerHTML = '';
    impactSummary.innerHTML += `<div class='impact-summary-row'><span>Total Offset</span><span>${user.totalOffset} kg CO₂</span></div>`;
    impactSummary.innerHTML += `<div class='impact-summary-row'><span>Projects Supported</span><span>${[...new Set(history.map(h=>h.project))].length}</span></div>`;
    impactSummary.innerHTML += `<div class='impact-summary-row'><span>Total Spent</span><span>$${history.reduce((sum,h)=>sum+h.cost,0)}</span></div>`;
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

  // Initial render
  renderProjects();
  renderHistory();
  renderImpact();
  renderFeedbacks();
});
