// Urban Wind Corridor Loss - Interactive Features & Sample Data

const windCorridorMap = document.getElementById('windCorridorMap');
const visualSection = document.getElementById('windCorridorVisual');
const actionsSection = document.getElementById('windCorridorActions');
const impactSection = document.getElementById('windCorridorImpact');
const historySection = document.getElementById('windCorridorHistory');
const feedbackSection = document.getElementById('windCorridorFeedback');
const feedbackForm = document.getElementById('windCorridorFeedbackForm');
const feedbackInput = document.getElementById('windCorridorFeedbackInput');
const feedbackList = document.getElementById('windCorridorFeedbackList');

// Sample wind corridor data
const corridors = [
  {
    name: 'Central Avenue',
    blocked: true,
    heatStress: 'High',
    airQuality: 'Poor',
    simulation: 'Open corridor reduces temp by 3°C',
    actions: ['Remove dense barriers', 'Add green buffer'],
    impact: 'Improved ventilation, lower heat',
    history: [
      { year: 2025, event: 'Barrier construction' },
      { year: 2026, event: 'Heat stress event' }
    ]
  },
  {
    name: 'Riverfront Lane',
    blocked: false,
    heatStress: 'Low',
    airQuality: 'Good',
    simulation: 'Maintained corridor keeps temp stable',
    actions: ['Maintain open space'],
    impact: 'Healthy airflow',
    history: [
      { year: 2024, event: 'Corridor maintained' }
    ]
  },
  {
    name: 'Sunset Boulevard',
    blocked: true,
    heatStress: 'Medium',
    airQuality: 'Moderate',
    simulation: 'Partial opening reduces temp by 1°C',
    actions: ['Reduce building density', 'Create wind path'],
    impact: 'Moderate ventilation improvement',
    history: [
      { year: 2026, event: 'Partial corridor opened' }
    ]
  }
];

function renderMap() {
  windCorridorMap.innerHTML = '<b>Wind Corridor Map Visualization</b><br>' +
    corridors.map(c => `<span style="color:${c.blocked ? '#d32f2f' : '#388e3c'}">${c.name}</span>`).join(' | ');
}

function renderVisual() {
  visualSection.innerHTML = '<h2>Corridor Status & Simulation</h2>' +
    corridors.map(c => `
      <div class="visual-row">
        <strong>${c.name}</strong>
        <span>Blocked: ${c.blocked ? 'Yes' : 'No'}</span>
        <span>Heat Stress: ${c.heatStress}</span>
        <span>Air Quality: ${c.airQuality}</span>
        <span>Simulation: ${c.simulation}</span>
      </div>
    `).join('');
}

function renderActions() {
  actionsSection.innerHTML = '<h2>Intervention Actions</h2>' +
    corridors.map(c => `
      <div class="action-row">
        <strong>${c.name}</strong>
        <ul>${c.actions.map(a => `<li>${a}</li>`).join('')}</ul>
      </div>
    `).join('');
}

function renderImpact() {
  impactSection.innerHTML = '<h2>Impact Tracking</h2>' +
    corridors.map(c => `
      <div class="impact-row">
        <strong>${c.name}</strong>
        <span>${c.impact}</span>
      </div>
    `).join('');
}

function renderHistory() {
  historySection.innerHTML = '<h2>History</h2>' +
    corridors.map(c => `
      <div class="history-row">
        <strong>${c.name}</strong>
        <span>${c.history.map(h => `${h.year}: ${h.event}`).join(' | ')}</span>
      </div>
    `).join('');
}

function renderFeedback() {
  feedbackList.innerHTML = '';
  const feedbacks = JSON.parse(localStorage.getItem('windCorridorFeedback') || '[]');
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
    let feedbacks = JSON.parse(localStorage.getItem('windCorridorFeedback') || '[]');
    feedbacks.push(val);
    localStorage.setItem('windCorridorFeedback', JSON.stringify(feedbacks));
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

// Example: Dynamic corridor addition
const addCorridorBtn = document.createElement('button');
addCorridorBtn.textContent = 'Add New Corridor';
addCorridorBtn.style.margin = '16px 0';
addCorridorBtn.onclick = function() {
  const name = prompt('Corridor name?');
  if (name) {
    corridors.push({
      name,
      blocked: false,
      heatStress: 'Unknown',
      airQuality: 'Unknown',
      simulation: 'Unknown',
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
visualSection.appendChild(addCorridorBtn);

// Example: Corridor details modal
function showCorridorDetails(c) {
  alert(`Details for ${c.name}\nBlocked: ${c.blocked ? 'Yes' : 'No'}\nHeat Stress: ${c.heatStress}\nAir Quality: ${c.airQuality}\nSimulation: ${c.simulation}`);
}
visualSection.addEventListener('click', function(e) {
  if (e.target.closest('.visual-row')) {
    const name = e.target.closest('.visual-row').querySelector('strong').textContent;
    const c = corridors.find(co => co.name === name);
    if (c) showCorridorDetails(c);
  }
});

// Example: Action completion tracking
actionsSection.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    e.target.style.textDecoration = 'line-through';
    e.target.style.color = '#aaa';
  }
});

// Example: Blocked corridor score calculation
function calculateBlockedScore() {
  let score = 0;
  corridors.forEach(c => {
    if (c.blocked) score += 10;
    if (c.actions.length > 0) score += c.actions.length * 2;
  });
  return score;
}
const blockedScoreDiv = document.createElement('div');
blockedScoreDiv.style.margin = '12px 0';
blockedScoreDiv.style.fontWeight = 'bold';
blockedScoreDiv.style.color = '#ffab00';
blockedScoreDiv.textContent = 'Total Blocked Corridor Score: ' + calculateBlockedScore();
impactSection.appendChild(blockedScoreDiv);

// Example: History timeline visualization
function renderHistoryTimeline() {
  const timeline = document.createElement('div');
  timeline.style.margin = '18px 0';
  timeline.style.borderLeft = '3px solid #0288d1';
  timeline.style.paddingLeft = '12px';
  corridors.forEach(c => {
    c.history.forEach(h => {
      const eventDiv = document.createElement('div');
      eventDiv.textContent = `${c.name} (${h.year}): ${h.event}`;
      eventDiv.style.marginBottom = '6px';
      timeline.appendChild(eventDiv);
    });
  });
  historySection.appendChild(timeline);
}
renderHistoryTimeline();

// Example: Feedback analytics
function renderFeedbackAnalytics() {
  const feedbacks = JSON.parse(localStorage.getItem('windCorridorFeedback') || '[]');
  const analyticsDiv = document.createElement('div');
  analyticsDiv.style.margin = '12px 0';
  analyticsDiv.style.color = '#388e3c';
  analyticsDiv.textContent = `Feedback count: ${feedbacks.length}`;
  feedbackSection.appendChild(analyticsDiv);
}
renderFeedbackAnalytics();

// ... (continue adding more interactive features, impact tracking, history, and feedback for 500+ lines)
