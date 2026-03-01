// Repairability Score Explorer - Interactive Features & Sample Data

const repairScoreMap = document.getElementById('repairScoreMap');
const visualSection = document.getElementById('repairScoreVisual');
const actionsSection = document.getElementById('repairScoreActions');
const impactSection = document.getElementById('repairScoreImpact');
const historySection = document.getElementById('repairScoreHistory');
const feedbackSection = document.getElementById('repairScoreFeedback');
const feedbackForm = document.getElementById('repairScoreFeedbackForm');
const feedbackInput = document.getElementById('repairScoreFeedbackInput');
const feedbackList = document.getElementById('repairScoreFeedbackList');

// Sample product data
const products = [
  {
    name: 'EcoSmart Phone',
    partsAvailability: 'High',
    toolComplexity: 'Low',
    repairGuides: 'Available',
    expectedLifespan: 6,
    repairScore: 9.2,
    actions: ['Replace battery', 'Upgrade storage'],
    impact: 'Reduced e-waste',
    history: [
      { year: 2024, event: 'Battery replaced' },
      { year: 2025, event: 'Screen repaired' }
    ]
  },
  {
    name: 'GreenLaptop X',
    partsAvailability: 'Medium',
    toolComplexity: 'Medium',
    repairGuides: 'Partial',
    expectedLifespan: 8,
    repairScore: 7.5,
    actions: ['Upgrade RAM', 'Replace keyboard'],
    impact: 'Longer device life',
    history: [
      { year: 2023, event: 'RAM upgraded' }
    ]
  },
  {
    name: 'Solar Blender',
    partsAvailability: 'Low',
    toolComplexity: 'High',
    repairGuides: 'None',
    expectedLifespan: 3,
    repairScore: 4.1,
    actions: ['Replace motor'],
    impact: 'Short lifespan, high e-waste',
    history: [
      { year: 2025, event: 'Motor failed' }
    ]
  }
];

function renderMap() {
  repairScoreMap.innerHTML = '<b>Product Comparison Visualization</b><br>' +
    products.map(p => `<span style="color:${p.repairScore > 8 ? '#388e3c' : p.repairScore > 6 ? '#ff6f00' : '#d32f2f'}">${p.name}</span>`).join(' | ');
}

function renderVisual() {
  visualSection.innerHTML = '<h2>Repairability Scores</h2>' +
    products.map(p => `
      <div class="visual-row">
        <strong>${p.name}</strong>
        <span>Parts Availability: ${p.partsAvailability}</span>
        <span>Tool Complexity: ${p.toolComplexity}</span>
        <span>Repair Guides: ${p.repairGuides}</span>
        <span>Expected Lifespan: ${p.expectedLifespan} years</span>
        <span>Repair Score: ${p.repairScore}</span>
      </div>
    `).join('');
}

function renderActions() {
  actionsSection.innerHTML = '<h2>Repair Actions</h2>' +
    products.map(p => `
      <div class="action-row">
        <strong>${p.name}</strong>
        <ul>${p.actions.map(a => `<li>${a}</li>`).join('')}</ul>
      </div>
    `).join('');
}

function renderImpact() {
  impactSection.innerHTML = '<h2>Impact Tracking</h2>' +
    products.map(p => `
      <div class="impact-row">
        <strong>${p.name}</strong>
        <span>${p.impact}</span>
      </div>
    `).join('');
}

function renderHistory() {
  historySection.innerHTML = '<h2>History</h2>' +
    products.map(p => `
      <div class="history-row">
        <strong>${p.name}</strong>
        <span>${p.history.map(h => `${h.year}: ${h.event}`).join(' | ')}</span>
      </div>
    `).join('');
}

function renderFeedback() {
  feedbackList.innerHTML = '';
  const feedbacks = JSON.parse(localStorage.getItem('repairScoreFeedback') || '[]');
  feedbacks.forEach(f => {
    const div = document.createElement('div');
    div.className = 'feedback-row';
    div.textContent = f;
    feedbackList.appendChild(div);
  });
}

feedbackForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const val = feedbackInput.value.trim();
  if (val) {
    let feedbacks = JSON.parse(localStorage.getItem('repairScoreFeedback') || '[]');
    feedbacks.push(val);
    localStorage.setItem('repairScoreFeedback', JSON.stringify(feedbacks));
    feedbackInput.value = '';
    renderFeedback();
  }
});

// Initial render
renderMap();
renderVisual();
renderActions();
renderImpact();
renderHistory();
renderFeedback();

// Example: Dynamic product addition
const addProductBtn = document.createElement('button');
addProductBtn.textContent = 'Add New Product';
addProductBtn.style.margin = '16px 0';
addProductBtn.onclick = function() {
  const name = prompt('Product name?');
  if (name) {
    products.push({
      name,
      partsAvailability: 'Unknown',
      toolComplexity: 'Unknown',
      repairGuides: 'Unknown',
      expectedLifespan: 0,
      repairScore: 0,
      actions: [],
      impact: 'Unknown',
      history: []
    });
    renderMap();
    renderVisual();
    renderActions();
    renderImpact();
    renderHistory();
  }
};
visualSection.appendChild(addProductBtn);

// Example: Product details modal
function showProductDetails(p) {
  alert(`Details for ${p.name}\nParts Availability: ${p.partsAvailability}\nTool Complexity: ${p.toolComplexity}\nRepair Guides: ${p.repairGuides}\nExpected Lifespan: ${p.expectedLifespan} years\nRepair Score: ${p.repairScore}`);
}
visualSection.addEventListener('click', function(e) {
  if (e.target.closest('.visual-row')) {
    const name = e.target.closest('.visual-row').querySelector('strong').textContent;
    const p = products.find(pr => pr.name === name);
    if (p) showProductDetails(p);
  }
});

// Example: Action completion tracking
actionsSection.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    e.target.style.textDecoration = 'line-through';
    e.target.style.color = '#aaa';
  }
});

// Example: Repairability score calculation
function calculateRepairScore() {
  let score = 0;
  products.forEach(p => {
    score += p.repairScore;
  });
  return score.toFixed(2);
}
const repairScoreDiv = document.createElement('div');
repairScoreDiv.style.margin = '12px 0';
repairScoreDiv.style.fontWeight = 'bold';
repairScoreDiv.style.color = '#ffab00';
repairScoreDiv.textContent = 'Total Repairability Score: ' + calculateRepairScore();
impactSection.appendChild(repairScoreDiv);

// Example: History timeline visualization
function renderHistoryTimeline() {
  const timeline = document.createElement('div');
  timeline.style.margin = '18px 0';
  timeline.style.borderLeft = '3px solid #ff6f00';
  timeline.style.paddingLeft = '12px';
  products.forEach(p => {
    p.history.forEach(h => {
      const eventDiv = document.createElement('div');
      eventDiv.textContent = `${p.name} (${h.year}): ${h.event}`;
      eventDiv.style.marginBottom = '6px';
      timeline.appendChild(eventDiv);
    });
  });
  historySection.appendChild(timeline);
}
renderHistoryTimeline();

// Example: Feedback analytics
function renderFeedbackAnalytics() {
  const feedbacks = JSON.parse(localStorage.getItem('repairScoreFeedback') || '[]');
  const analyticsDiv = document.createElement('div');
  analyticsDiv.style.margin = '12px 0';
  analyticsDiv.style.color = '#388e3c';
  analyticsDiv.textContent = `Feedback count: ${feedbacks.length}`;
  feedbackSection.appendChild(analyticsDiv);
}
renderFeedbackAnalytics();

// ... (continue adding more interactive features, impact tracking, history, and feedback for 500+ lines)
