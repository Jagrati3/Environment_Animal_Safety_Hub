// Urban Shade Equity Planner - Interactive Features & Sample Data

const shadePlannerMap = document.getElementById('shadePlannerMap');
const visualSection = document.getElementById('shadePlannerVisual');
const actionsSection = document.getElementById('shadePlannerActions');
const impactSection = document.getElementById('shadePlannerImpact');
const historySection = document.getElementById('shadePlannerHistory');
const feedbackSection = document.getElementById('shadePlannerFeedback');
const feedbackForm = document.getElementById('shadePlannerFeedbackForm');
const feedbackInput = document.getElementById('shadePlannerFeedbackInput');
const feedbackList = document.getElementById('shadePlannerFeedbackList');

// Sample shade data
const neighborhoods = [
  {
    name: 'Elm Street',
    treeCover: 22,
    canopies: 3,
    reflectiveSurfaces: 2,
    shadeScore: 27,
    shadeDesert: false,
    actions: ['Plant more trees', 'Install new canopy'],
    impact: 'Moderate cooling',
    history: [
      { year: 2023, event: 'Canopy installed' }
    ]
  },
  {
    name: 'Sunrise Avenue',
    treeCover: 5,
    canopies: 0,
    reflectiveSurfaces: 1,
    shadeScore: 6,
    shadeDesert: true,
    actions: ['Add reflective paint', 'Community tree planting'],
    impact: 'High heat risk',
    history: [
      { year: 2022, event: 'Shade desert identified' }
    ]
  },
  {
    name: 'Maple Park',
    treeCover: 35,
    canopies: 5,
    reflectiveSurfaces: 4,
    shadeScore: 44,
    shadeDesert: false,
    actions: ['Maintain tree cover'],
    impact: 'Low heat risk',
    history: [
      { year: 2021, event: 'Tree maintenance' }
    ]
  }
];

function renderMap() {
  shadePlannerMap.innerHTML = '<b>Shade Map Visualization</b><br>' +
    neighborhoods.map(n => `<span style="color:${n.shadeDesert ? '#d32f2f' : '#388e3c'}">${n.name}</span>`).join(' | ');
}

function renderVisual() {
  visualSection.innerHTML = '<h2>Shade Availability</h2>' +
    neighborhoods.map(n => `
      <div class="visual-row">
        <strong>${n.name}</strong>
        <span>Tree Cover: ${n.treeCover}%</span>
        <span>Canopies: ${n.canopies}</span>
        <span>Reflective Surfaces: ${n.reflectiveSurfaces}</span>
        <span>Shade Score: ${n.shadeScore}</span>
        <span>Shade Desert: ${n.shadeDesert ? 'Yes' : 'No'}</span>
      </div>
    `).join('');
}

function renderActions() {
  actionsSection.innerHTML = '<h2>Intervention Actions</h2>' +
    neighborhoods.map(n => `
      <div class="action-row">
        <strong>${n.name}</strong>
        <ul>${n.actions.map(a => `<li>${a}</li>`).join('')}</ul>
      </div>
    `).join('');
}

function renderImpact() {
  impactSection.innerHTML = '<h2>Impact Tracking</h2>' +
    neighborhoods.map(n => `
      <div class="impact-row">
        <strong>${n.name}</strong>
        <span>${n.impact}</span>
      </div>
    `).join('');
}

function renderHistory() {
  historySection.innerHTML = '<h2>History</h2>' +
    neighborhoods.map(n => `
      <div class="history-row">
        <strong>${n.name}</strong>
        <span>${n.history.map(h => `${h.year}: ${h.event}`).join(' | ')}</span>
      </div>
    `).join('');
}

function renderFeedback() {
  feedbackList.innerHTML = '';
  const feedbacks = JSON.parse(localStorage.getItem('shadePlannerFeedback') || '[]');
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
    let feedbacks = JSON.parse(localStorage.getItem('shadePlannerFeedback') || '[]');
    feedbacks.push(val);
    localStorage.setItem('shadePlannerFeedback', JSON.stringify(feedbacks));
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

// Example: Dynamic neighborhood addition
const addNeighborhoodBtn = document.createElement('button');
addNeighborhoodBtn.textContent = 'Add New Neighborhood';
addNeighborhoodBtn.style.margin = '16px 0';
addNeighborhoodBtn.onclick = function() {
  const name = prompt('Neighborhood name?');
  if (name) {
    neighborhoods.push({
      name,
      treeCover: 0,
      canopies: 0,
      reflectiveSurfaces: 0,
      shadeScore: 0,
      shadeDesert: false,
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
visualSection.appendChild(addNeighborhoodBtn);

// Example: Neighborhood details modal
function showNeighborhoodDetails(n) {
  alert(`Details for ${n.name}\nTree Cover: ${n.treeCover}%\nCanopies: ${n.canopies}\nReflective Surfaces: ${n.reflectiveSurfaces}\nShade Score: ${n.shadeScore}\nShade Desert: ${n.shadeDesert ? 'Yes' : 'No'}`);
}
visualSection.addEventListener('click', function(e) {
  if (e.target.closest('.visual-row')) {
    const name = e.target.closest('.visual-row').querySelector('strong').textContent;
    const n = neighborhoods.find(nb => nb.name === name);
    if (n) showNeighborhoodDetails(n);
  }
});

// Example: Action completion tracking
actionsSection.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    e.target.style.textDecoration = 'line-through';
    e.target.style.color = '#aaa';
  }
});

// Example: Shade desert score calculation
function calculateShadeDesertScore() {
  let score = 0;
  neighborhoods.forEach(n => {
    if (n.shadeDesert) score += 10;
    if (n.actions.length > 0) score += n.actions.length * 2;
  });
  return score;
}
const shadeScoreDiv = document.createElement('div');
shadeScoreDiv.style.margin = '12px 0';
shadeScoreDiv.style.fontWeight = 'bold';
shadeScoreDiv.style.color = '#ffab00';
shadeScoreDiv.textContent = 'Total Shade Desert Score: ' + calculateShadeDesertScore();
impactSection.appendChild(shadeScoreDiv);

// Example: History timeline visualization
function renderHistoryTimeline() {
  const timeline = document.createElement('div');
  timeline.style.margin = '18px 0';
  timeline.style.borderLeft = '3px solid #388e3c';
  timeline.style.paddingLeft = '12px';
  neighborhoods.forEach(n => {
    n.history.forEach(h => {
      const eventDiv = document.createElement('div');
      eventDiv.textContent = `${n.name} (${h.year}): ${h.event}`;
      eventDiv.style.marginBottom = '6px';
      timeline.appendChild(eventDiv);
    });
  });
  historySection.appendChild(timeline);
}
renderHistoryTimeline();

// Example: Feedback analytics
function renderFeedbackAnalytics() {
  const feedbacks = JSON.parse(localStorage.getItem('shadePlannerFeedback') || '[]');
  const analyticsDiv = document.createElement('div');
  analyticsDiv.style.margin = '12px 0';
  analyticsDiv.style.color = '#388e3c';
  analyticsDiv.textContent = `Feedback count: ${feedbacks.length}`;
  feedbackSection.appendChild(analyticsDiv);
}
renderFeedbackAnalytics();

// ... (continue adding more interactive features, impact tracking, history, and feedback for 500+ lines)
