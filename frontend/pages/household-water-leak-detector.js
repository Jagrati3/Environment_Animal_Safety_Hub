// Household Water Leak Detector - Interactive Features & Sample Data

const waterLeakMap = document.getElementById('waterLeakMap');
const visualSection = document.getElementById('waterLeakVisual');
const actionsSection = document.getElementById('waterLeakActions');
const impactSection = document.getElementById('waterLeakImpact');
const historySection = document.getElementById('waterLeakHistory');
const feedbackSection = document.getElementById('waterLeakFeedback');
const feedbackForm = document.getElementById('waterLeakFeedbackForm');
const feedbackInput = document.getElementById('waterLeakFeedbackInput');
const feedbackList = document.getElementById('waterLeakFeedbackList');

// Sample household water usage and leak data
const leakZones = [
  {
    zone: 'Bathroom',
    meterReadings: [120, 130, 145, 160],
    deviceUsage: ['Shower', 'Toilet', 'Sink'],
    seasonalTrend: 'Winter spike',
    probableLeak: true,
    fixPriority: 'High',
    actions: ['Check toilet flapper', 'Inspect showerhead'],
    impact: 'Significant water loss',
    history: [
      { month: 'Jan', event: 'Unusual spike detected' },
      { month: 'Feb', event: 'Leak confirmed' }
    ]
  },
  {
    zone: 'Kitchen',
    meterReadings: [80, 85, 90, 110],
    deviceUsage: ['Dishwasher', 'Sink'],
    seasonalTrend: 'Spring increase',
    probableLeak: false,
    fixPriority: 'Medium',
    actions: ['Check under sink', 'Inspect dishwasher hose'],
    impact: 'Minor water loss',
    history: [
      { month: 'Mar', event: 'Routine check' }
    ]
  },
  {
    zone: 'Outdoor Lines',
    meterReadings: [60, 65, 80, 120],
    deviceUsage: ['Sprinkler', 'Hose'],
    seasonalTrend: 'Summer surge',
    probableLeak: true,
    fixPriority: 'Urgent',
    actions: ['Inspect sprinkler valves', 'Check hose connections'],
    impact: 'Major water loss',
    history: [
      { month: 'Jul', event: 'Leak suspected' },
      { month: 'Aug', event: 'Repair scheduled' }
    ]
  }
];

function renderMap() {
  waterLeakMap.innerHTML = '<b>Leak Zone Visualization</b><br>' +
    leakZones.map(z => `<span style="color:${z.probableLeak ? '#d32f2f' : '#388e3c'}">${z.zone}</span>`).join(' | ');
}

function renderVisual() {
  visualSection.innerHTML = '<h2>Water Usage & Leak Patterns</h2>' +
    leakZones.map(z => `
      <div class="visual-row">
        <strong>${z.zone}</strong>
        <span>Meter Readings: ${z.meterReadings.join(', ')}</span>
        <span>Device Usage: ${z.deviceUsage.join(', ')}</span>
        <span>Seasonal Trend: ${z.seasonalTrend}</span>
        <span>Probable Leak: ${z.probableLeak ? 'Yes' : 'No'}</span>
        <span>Fix Priority: ${z.fixPriority}</span>
      </div>
    `).join('');
}

function renderActions() {
  actionsSection.innerHTML = '<h2>Suggested Fixes</h2>' +
    leakZones.map(z => `
      <div class="action-row">
        <strong>${z.zone}</strong>
        <ul>${z.actions.map(a => `<li>${a}</li>`).join('')}</ul>
      </div>
    `).join('');
}

function renderImpact() {
  impactSection.innerHTML = '<h2>Impact Tracking</h2>' +
    leakZones.map(z => `
      <div class="impact-row">
        <strong>${z.zone}</strong>
        <span>${z.impact}</span>
      </div>
    `).join('');
}

function renderHistory() {
  historySection.innerHTML = '<h2>History</h2>' +
    leakZones.map(z => `
      <div class="history-row">
        <strong>${z.zone}</strong>
        <span>${z.history.map(h => `${h.month}: ${h.event}`).join(' | ')}</span>
      </div>
    `).join('');
}

function renderFeedback() {
  feedbackList.innerHTML = '';
  const feedbacks = JSON.parse(localStorage.getItem('waterLeakFeedback') || '[]');
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
    let feedbacks = JSON.parse(localStorage.getItem('waterLeakFeedback') || '[]');
    feedbacks.push(val);
    localStorage.setItem('waterLeakFeedback', JSON.stringify(feedbacks));
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

// Example: Dynamic leak zone addition
const addZoneBtn = document.createElement('button');
addZoneBtn.textContent = 'Add New Leak Zone';
addZoneBtn.style.margin = '16px 0';
addZoneBtn.onclick = function() {
  const zone = prompt('Leak zone name?');
  if (zone) {
    leakZones.push({
      zone,
      meterReadings: [],
      deviceUsage: [],
      seasonalTrend: 'Unknown',
      probableLeak: false,
      fixPriority: 'Low',
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
visualSection.appendChild(addZoneBtn);

// Example: Leak zone details modal
function showZoneDetails(z) {
  alert(`Details for ${z.zone}\nMeter Readings: ${z.meterReadings.join(', ')}\nDevice Usage: ${z.deviceUsage.join(', ')}\nSeasonal Trend: ${z.seasonalTrend}\nProbable Leak: ${z.probableLeak ? 'Yes' : 'No'}\nFix Priority: ${z.fixPriority}`);
}
visualSection.addEventListener('click', function(e) {
  if (e.target.closest('.visual-row')) {
    const zone = e.target.closest('.visual-row').querySelector('strong').textContent;
    const z = leakZones.find(lz => lz.zone === zone);
    if (z) showZoneDetails(z);
  }
});

// Example: Action completion tracking
actionsSection.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    e.target.style.textDecoration = 'line-through';
    e.target.style.color = '#aaa';
  }
});

// Example: Leak score calculation
function calculateLeakScore() {
  let score = 0;
  leakZones.forEach(z => {
    if (z.probableLeak) score += 10;
    if (z.fixPriority === 'Urgent') score += 5;
    if (z.actions.length > 0) score += z.actions.length * 2;
  });
  return score;
}
const leakScoreDiv = document.createElement('div');
leakScoreDiv.style.margin = '12px 0';
leakScoreDiv.style.fontWeight = 'bold';
leakScoreDiv.style.color = '#ffab00';
leakScoreDiv.textContent = 'Total Leak Score: ' + calculateLeakScore();
impactSection.appendChild(leakScoreDiv);

// Example: History timeline visualization
function renderHistoryTimeline() {
  const timeline = document.createElement('div');
  timeline.style.margin = '18px 0';
  timeline.style.borderLeft = '3px solid #0288d1';
  timeline.style.paddingLeft = '12px';
  leakZones.forEach(z => {
    z.history.forEach(h => {
      const eventDiv = document.createElement('div');
      eventDiv.textContent = `${z.zone} (${h.month}): ${h.event}`;
      eventDiv.style.marginBottom = '6px';
      timeline.appendChild(eventDiv);
    });
  });
  historySection.appendChild(timeline);
}
renderHistoryTimeline();

// Example: Feedback analytics
function renderFeedbackAnalytics() {
  const feedbacks = JSON.parse(localStorage.getItem('waterLeakFeedback') || '[]');
  const analyticsDiv = document.createElement('div');
  analyticsDiv.style.margin = '12px 0';
  analyticsDiv.style.color = '#388e3c';
  analyticsDiv.textContent = `Feedback count: ${feedbacks.length}`;
  feedbackSection.appendChild(analyticsDiv);
}
renderFeedbackAnalytics();

// ... (continue adding more interactive features, impact tracking, history, and feedback for 500+ lines)
