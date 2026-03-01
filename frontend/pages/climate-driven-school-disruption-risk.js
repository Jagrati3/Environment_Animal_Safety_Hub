// Climate-Driven School Disruption Risk - Interactive Features & Sample Data

const schoolDisruptionMap = document.getElementById('schoolDisruptionMap');
const visualSection = document.getElementById('schoolDisruptionVisual');
const actionsSection = document.getElementById('schoolDisruptionActions');
const impactSection = document.getElementById('schoolDisruptionImpact');
const historySection = document.getElementById('schoolDisruptionHistory');
const feedbackSection = document.getElementById('schoolDisruptionFeedback');
const feedbackForm = document.getElementById('schoolDisruptionFeedbackForm');
const feedbackInput = document.getElementById('schoolDisruptionFeedbackInput');
const feedbackList = document.getElementById('schoolDisruptionFeedbackList');

// Sample region school disruption data
const regions = [
  {
    name: 'River Valley',
    heatwaveDays: 12,
    floodDays: 5,
    smokeDays: 8,
    waterShortageDays: 3,
    schoolDaysLost: 15,
    attendanceImpact: 'High',
    learningOutcome: 'Moderate decline',
    actions: ['Install air filters', 'Emergency water supply'],
    impact: 'Attendance drop, learning loss',
    history: [
      { year: 2025, event: 'Smoke event closed schools' },
      { year: 2026, event: 'Heatwave led to early dismissal' }
    ]
  },
  {
    name: 'Sunrise District',
    heatwaveDays: 7,
    floodDays: 2,
    smokeDays: 0,
    waterShortageDays: 6,
    schoolDaysLost: 8,
    attendanceImpact: 'Medium',
    learningOutcome: 'Minor decline',
    actions: ['Shade structures', 'Water conservation program'],
    impact: 'Reduced school days',
    history: [
      { year: 2024, event: 'Water shortage closed schools' }
    ]
  },
  {
    name: 'Green Meadows',
    heatwaveDays: 3,
    floodDays: 0,
    smokeDays: 2,
    waterShortageDays: 1,
    schoolDaysLost: 3,
    attendanceImpact: 'Low',
    learningOutcome: 'Stable',
    actions: ['Heatwave drills', 'Smoke event protocol'],
    impact: 'Minimal disruption',
    history: [
      { year: 2026, event: 'Smoke event managed' }
    ]
  }
];

function renderMap() {
  schoolDisruptionMap.innerHTML = '<b>School Disruption Map Visualization</b><br>' +
    regions.map(r => `<span style="color:${r.schoolDaysLost > 10 ? '#d84315' : r.schoolDaysLost > 5 ? '#ff6f00' : '#388e3c'}">${r.name}</span>`).join(' | ');
}

function renderVisual() {
  visualSection.innerHTML = '<h2>Disruption Risk Overview</h2>' +
    regions.map(r => `
      <div class="visual-row">
        <strong>${r.name}</strong>
        <span>Heatwave Days: ${r.heatwaveDays}</span>
        <span>Flood Days: ${r.floodDays}</span>
        <span>Smoke Days: ${r.smokeDays}</span>
        <span>Water Shortage Days: ${r.waterShortageDays}</span>
        <span>School Days Lost: ${r.schoolDaysLost}</span>
        <span>Attendance Impact: ${r.attendanceImpact}</span>
        <span>Learning Outcome: ${r.learningOutcome}</span>
      </div>
    `).join('');
}

function renderActions() {
  actionsSection.innerHTML = '<h2>Resilience Actions</h2>' +
    regions.map(r => `
      <div class="action-row">
        <strong>${r.name}</strong>
        <ul>${r.actions.map(a => `<li>${a}</li>`).join('')}</ul>
      </div>
    `).join('');
}

function renderImpact() {
  impactSection.innerHTML = '<h2>Impact Tracking</h2>' +
    regions.map(r => `
      <div class="impact-row">
        <strong>${r.name}</strong>
        <span>${r.impact}</span>
      </div>
    `).join('');
}

function renderHistory() {
  historySection.innerHTML = '<h2>History</h2>' +
    regions.map(r => `
      <div class="history-row">
        <strong>${r.name}</strong>
        <span>${r.history.map(h => `${h.year}: ${h.event}`).join(' | ')}</span>
      </div>
    `).join('');
}

function renderFeedback() {
  feedbackList.innerHTML = '';
  const feedbacks = JSON.parse(localStorage.getItem('schoolDisruptionFeedback') || '[]');
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
    let feedbacks = JSON.parse(localStorage.getItem('schoolDisruptionFeedback') || '[]');
    feedbacks.push(val);
    localStorage.setItem('schoolDisruptionFeedback', JSON.stringify(feedbacks));
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

// Example: Dynamic region addition
const addRegionBtn = document.createElement('button');
addRegionBtn.textContent = 'Add New Region';
addRegionBtn.style.margin = '16px 0';
addRegionBtn.onclick = function() {
  const name = prompt('Region name?');
  if (name) {
    regions.push({
      name,
      heatwaveDays: 0,
      floodDays: 0,
      smokeDays: 0,
      waterShortageDays: 0,
      schoolDaysLost: 0,
      attendanceImpact: 'Unknown',
      learningOutcome: 'Unknown',
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
visualSection.appendChild(addRegionBtn);

// Example: Region details modal
function showRegionDetails(r) {
  alert(`Details for ${r.name}\nHeatwave Days: ${r.heatwaveDays}\nFlood Days: ${r.floodDays}\nSmoke Days: ${r.smokeDays}\nWater Shortage Days: ${r.waterShortageDays}\nSchool Days Lost: ${r.schoolDaysLost}\nAttendance Impact: ${r.attendanceImpact}\nLearning Outcome: ${r.learningOutcome}`);
}
visualSection.addEventListener('click', function(e) {
  if (e.target.closest('.visual-row')) {
    const name = e.target.closest('.visual-row').querySelector('strong').textContent;
    const r = regions.find(reg => reg.name === name);
    if (r) showRegionDetails(r);
  }
});

// Example: Action completion tracking
actionsSection.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    e.target.style.textDecoration = 'line-through';
    e.target.style.color = '#aaa';
  }
});

// Example: Disruption score calculation
function calculateDisruptionScore() {
  let score = 0;
  regions.forEach(r => {
    score += r.schoolDaysLost;
  });
  return score;
}
const disruptionScoreDiv = document.createElement('div');
disruptionScoreDiv.style.margin = '12px 0';
disruptionScoreDiv.style.fontWeight = 'bold';
disruptionScoreDiv.style.color = '#ffab00';
disruptionScoreDiv.textContent = 'Total School Days Lost: ' + calculateDisruptionScore();
impactSection.appendChild(disruptionScoreDiv);

// Example: History timeline visualization
function renderHistoryTimeline() {
  const timeline = document.createElement('div');
  timeline.style.margin = '18px 0';
  timeline.style.borderLeft = '3px solid #d84315';
  timeline.style.paddingLeft = '12px';
  regions.forEach(r => {
    r.history.forEach(h => {
      const eventDiv = document.createElement('div');
      eventDiv.textContent = `${r.name} (${h.year}): ${h.event}`;
      eventDiv.style.marginBottom = '6px';
      timeline.appendChild(eventDiv);
    });
  });
  historySection.appendChild(timeline);
}
renderHistoryTimeline();

// Example: Feedback analytics
function renderFeedbackAnalytics() {
  const feedbacks = JSON.parse(localStorage.getItem('schoolDisruptionFeedback') || '[]');
  const analyticsDiv = document.createElement('div');
  analyticsDiv.style.margin = '12px 0';
  analyticsDiv.style.color = '#388e3c';
  analyticsDiv.textContent = `Feedback count: ${feedbacks.length}`;
  feedbackSection.appendChild(analyticsDiv);
}
renderFeedbackAnalytics();

// ... (continue adding more interactive features, impact tracking, history, and feedback for 500+ lines)
