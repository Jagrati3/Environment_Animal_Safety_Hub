// Medication Pollution in Waterways - Interactive Features & Sample Data

const medicationPollutionMap = document.getElementById('medicationPollutionMap');
const visualSection = document.getElementById('medicationPollutionVisual');
const actionsSection = document.getElementById('medicationPollutionActions');
const impactSection = document.getElementById('medicationPollutionImpact');
const historySection = document.getElementById('medicationPollutionHistory');
const feedbackSection = document.getElementById('medicationPollutionFeedback');
const feedbackForm = document.getElementById('medicationPollutionFeedbackForm');
const feedbackInput = document.getElementById('medicationPollutionFeedbackInput');
const feedbackList = document.getElementById('medicationPollutionFeedbackList');

// Sample pollution data
const pollutionSources = [
  {
    source: 'Unused Medicines',
    entryRoute: 'Household drains',
    affectedWater: 'River Delta',
    aquaticImpact: 'Fish hormone disruption',
    waterSafety: 'Moderate risk',
    actions: ['Promote take-back programs', 'Educate on safe disposal'],
    impact: 'Reduced fish populations',
    history: [
      { year: 2025, event: 'Take-back program launched' },
      { year: 2026, event: 'Fish population study' }
    ]
  },
  {
    source: 'Human Pharmaceutical Residues',
    entryRoute: 'Wastewater treatment',
    affectedWater: 'Lakeview',
    aquaticImpact: 'Algae bloom',
    waterSafety: 'High risk',
    actions: ['Upgrade treatment plants', 'Monitor effluent'],
    impact: 'Algae bloom, water toxicity',
    history: [
      { year: 2024, event: 'Algae bloom detected' }
    ]
  },
  {
    source: 'Veterinary Medicines',
    entryRoute: 'Farm runoff',
    affectedWater: 'Streamside',
    aquaticImpact: 'Amphibian decline',
    waterSafety: 'Low risk',
    actions: ['Regulate farm disposal', 'Buffer zones'],
    impact: 'Amphibian population drop',
    history: [
      { year: 2026, event: 'Buffer zone created' }
    ]
  }
];

function renderMap() {
  medicationPollutionMap.innerHTML = '<b>Pharmaceutical Pollution Map Visualization</b><br>' +
    pollutionSources.map(p => `<span style="color:${p.waterSafety === 'High risk' ? '#d32f2f' : p.waterSafety === 'Moderate risk' ? '#ffab00' : '#388e3c'}">${p.affectedWater}</span>`).join(' | ');
}

function renderVisual() {
  visualSection.innerHTML = '<h2>Pollution Sources & Effects</h2>' +
    pollutionSources.map(p => `
      <div class="visual-row">
        <strong>${p.source}</strong>
        <span>Entry Route: ${p.entryRoute}</span>
        <span>Affected Water: ${p.affectedWater}</span>
        <span>Aquatic Impact: ${p.aquaticImpact}</span>
        <span>Water Safety: ${p.waterSafety}</span>
      </div>
    `).join('');
}

function renderActions() {
  actionsSection.innerHTML = '<h2>Intervention Actions</h2>' +
    pollutionSources.map(p => `
      <div class="action-row">
        <strong>${p.source}</strong>
        <ul>${p.actions.map(a => `<li>${a}</li>`).join('')}</ul>
      </div>
    `).join('');
}

function renderImpact() {
  impactSection.innerHTML = '<h2>Impact Tracking</h2>' +
    pollutionSources.map(p => `
      <div class="impact-row">
        <strong>${p.source}</strong>
        <span>${p.impact}</span>
      </div>
    `).join('');
}

function renderHistory() {
  historySection.innerHTML = '<h2>History</h2>' +
    pollutionSources.map(p => `
      <div class="history-row">
        <strong>${p.source}</strong>
        <span>${p.history.map(h => `${h.year}: ${h.event}`).join(' | ')}</span>
      </div>
    `).join('');
}

function renderFeedback() {
  feedbackList.innerHTML = '';
  const feedbacks = JSON.parse(localStorage.getItem('medicationPollutionFeedback') || '[]');
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
    let feedbacks = JSON.parse(localStorage.getItem('medicationPollutionFeedback') || '[]');
    feedbacks.push(val);
    localStorage.setItem('medicationPollutionFeedback', JSON.stringify(feedbacks));
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

// Example: Dynamic pollution source addition
const addSourceBtn = document.createElement('button');
addSourceBtn.textContent = 'Add New Pollution Source';
addSourceBtn.style.margin = '16px 0';
addSourceBtn.onclick = function() {
  const source = prompt('Pollution source name?');
  if (source) {
    pollutionSources.push({
      source,
      entryRoute: 'Unknown',
      affectedWater: 'Unknown',
      aquaticImpact: 'Unknown',
      waterSafety: 'Unknown',
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
visualSection.appendChild(addSourceBtn);

// Example: Pollution source details modal
function showSourceDetails(p) {
  alert(`Details for ${p.source}\nEntry Route: ${p.entryRoute}\nAffected Water: ${p.affectedWater}\nAquatic Impact: ${p.aquaticImpact}\nWater Safety: ${p.waterSafety}`);
}
visualSection.addEventListener('click', function(e) {
  if (e.target.closest('.visual-row')) {
    const source = e.target.closest('.visual-row').querySelector('strong').textContent;
    const p = pollutionSources.find(ps => ps.source === source);
    if (p) showSourceDetails(p);
  }
});

// Example: Action completion tracking
actionsSection.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    e.target.style.textDecoration = 'line-through';
    e.target.style.color = '#aaa';
  }
});

// Example: Pollution risk score calculation
function calculatePollutionRiskScore() {
  let score = 0;
  pollutionSources.forEach(p => {
    if (p.waterSafety === 'High risk') score += 10;
    if (p.waterSafety === 'Moderate risk') score += 5;
    if (p.actions.length > 0) score += p.actions.length * 2;
  });
  return score;
}
const pollutionScoreDiv = document.createElement('div');
pollutionScoreDiv.style.margin = '12px 0';
pollutionScoreDiv.style.fontWeight = 'bold';
pollutionScoreDiv.style.color = '#ffab00';
pollutionScoreDiv.textContent = 'Total Pollution Risk Score: ' + calculatePollutionRiskScore();
impactSection.appendChild(pollutionScoreDiv);

// Example: History timeline visualization
function renderHistoryTimeline() {
  const timeline = document.createElement('div');
  timeline.style.margin = '18px 0';
  timeline.style.borderLeft = '3px solid #1976d2';
  timeline.style.paddingLeft = '12px';
  pollutionSources.forEach(p => {
    p.history.forEach(h => {
      const eventDiv = document.createElement('div');
      eventDiv.textContent = `${p.source} (${h.year}): ${h.event}`;
      eventDiv.style.marginBottom = '6px';
      timeline.appendChild(eventDiv);
    });
  });
  historySection.appendChild(timeline);
}
renderHistoryTimeline();

// Example: Feedback analytics
function renderFeedbackAnalytics() {
  const feedbacks = JSON.parse(localStorage.getItem('medicationPollutionFeedback') || '[]');
  const analyticsDiv = document.createElement('div');
  analyticsDiv.style.margin = '12px 0';
  analyticsDiv.style.color = '#388e3c';
  analyticsDiv.textContent = `Feedback count: ${feedbacks.length}`;
  feedbackSection.appendChild(analyticsDiv);
}
renderFeedbackAnalytics();

// ... (continue adding more interactive features, impact tracking, history, and feedback for 500+ lines)
