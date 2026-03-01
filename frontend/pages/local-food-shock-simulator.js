// Local Food Shock Simulator - Interactive Features & Sample Data

const foodShockMap = document.getElementById('foodShockMap');
const simulatorSection = document.getElementById('foodShockSimulator');
const actionsSection = document.getElementById('foodShockActions');
const impactSection = document.getElementById('foodShockImpact');
const historySection = document.getElementById('foodShockHistory');
const feedbackSection = document.getElementById('foodShockFeedback');
const feedbackForm = document.getElementById('foodShockFeedbackForm');
const feedbackInput = document.getElementById('foodShockFeedbackInput');
const feedbackList = document.getElementById('foodShockFeedbackList');

// Sample food system data
const scenarios = [
  {
    event: 'Heatwave',
    waterScarcity: true,
    transportDisruption: false,
    foodPrices: {
      rice: 1.8,
      vegetables: 2.5,
      eggs: 3.2
    },
    availability: {
      rice: 'Low',
      vegetables: 'Medium',
      eggs: 'Low'
    },
    nutritionAccess: 'Reduced',
    actions: ['Stock up on shelf-stable foods', 'Community cooling center'],
    impact: 'Price spike, reduced nutrition',
    history: [
      { year: 2023, event: 'Heatwave caused crop losses' }
    ]
  },
  {
    event: 'Flood',
    waterScarcity: false,
    transportDisruption: true,
    foodPrices: {
      rice: 1.2,
      vegetables: 2.0,
      eggs: 2.8
    },
    availability: {
      rice: 'Medium',
      vegetables: 'Low',
      eggs: 'Medium'
    },
    nutritionAccess: 'Limited',
    actions: ['Local food distribution', 'Emergency transport'],
    impact: 'Supply chain disruption',
    history: [
      { year: 2022, event: 'Flood blocked roads' }
    ]
  },
  {
    event: 'Drought',
    waterScarcity: true,
    transportDisruption: false,
    foodPrices: {
      rice: 2.2,
      vegetables: 3.0,
      eggs: 3.8
    },
    availability: {
      rice: 'Very Low',
      vegetables: 'Low',
      eggs: 'Low'
    },
    nutritionAccess: 'Severely Reduced',
    actions: ['Rainwater harvesting', 'Nutrition supplement program'],
    impact: 'Extreme scarcity, malnutrition risk',
    history: [
      { year: 2024, event: 'Drought led to food shortages' }
    ]
  }
];

function renderMap() {
  foodShockMap.innerHTML = '<b>Food System Map Visualization</b><br>' +
    scenarios.map(s => `<span style="color:${s.nutritionAccess === 'Severely Reduced' ? '#d32f2f' : s.nutritionAccess === 'Reduced' ? '#ff6f00' : '#388e3c'}">${s.event}</span>`).join(' | ');
}

function renderSimulator() {
  simulatorSection.innerHTML = '<h2>Shock Simulator</h2>' +
    scenarios.map(s => `
      <div class="simulator-row">
        <strong>${s.event}</strong>
        <span>Water Scarcity: ${s.waterScarcity ? 'Yes' : 'No'}</span>
        <span>Transport Disruption: ${s.transportDisruption ? 'Yes' : 'No'}</span>
        <span>Food Prices: Rice $${s.foodPrices.rice}, Vegetables $${s.foodPrices.vegetables}, Eggs $${s.foodPrices.eggs}</span>
        <span>Availability: Rice ${s.availability.rice}, Vegetables ${s.availability.vegetables}, Eggs ${s.availability.eggs}</span>
        <span>Nutrition Access: ${s.nutritionAccess}</span>
      </div>
    `).join('');
}

function renderActions() {
  actionsSection.innerHTML = '<h2>Resilience Actions</h2>' +
    scenarios.map(s => `
      <div class="action-row">
        <strong>${s.event}</strong>
        <ul>${s.actions.map(a => `<li>${a}</li>`).join('')}</ul>
      </div>
    `).join('');
}

function renderImpact() {
  impactSection.innerHTML = '<h2>Impact Tracking</h2>' +
    scenarios.map(s => `
      <div class="impact-row">
        <strong>${s.event}</strong>
        <span>${s.impact}</span>
      </div>
    `).join('');
}

function renderHistory() {
  historySection.innerHTML = '<h2>History</h2>' +
    scenarios.map(s => `
      <div class="history-row">
        <strong>${s.event}</strong>
        <span>${s.history.map(h => `${h.year}: ${h.event}`).join(' | ')}</span>
      </div>
    `).join('');
}

function renderFeedback() {
  feedbackList.innerHTML = '';
  const feedbacks = JSON.parse(localStorage.getItem('foodShockFeedback') || '[]');
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
    let feedbacks = JSON.parse(localStorage.getItem('foodShockFeedback') || '[]');
    feedbacks.push(val);
    localStorage.setItem('foodShockFeedback', JSON.stringify(feedbacks));
    feedbackInput.value = '';
    renderFeedback();
  }
});

// Initial render
renderMap();
renderSimulator();
renderActions();
renderImpact();
renderHistory();
renderFeedback();

// Example: Dynamic scenario addition
const addScenarioBtn = document.createElement('button');
addScenarioBtn.textContent = 'Add New Scenario';
addScenarioBtn.style.margin = '16px 0';
addScenarioBtn.onclick = function() {
  const event = prompt('Scenario event?');
  if (event) {
    scenarios.push({
      event,
      waterScarcity: false,
      transportDisruption: false,
      foodPrices: { rice: 0, vegetables: 0, eggs: 0 },
      availability: { rice: 'Unknown', vegetables: 'Unknown', eggs: 'Unknown' },
      nutritionAccess: 'Unknown',
      actions: [],
      impact: 'Unknown',
      history: []
    });
    renderMap();
    renderSimulator();
    renderActions();
    renderImpact();
    renderHistory();
  }
};
simulatorSection.appendChild(addScenarioBtn);

// Example: Scenario details modal
function showScenarioDetails(s) {
  alert(`Details for ${s.event}\nWater Scarcity: ${s.waterScarcity ? 'Yes' : 'No'}\nTransport Disruption: ${s.transportDisruption ? 'Yes' : 'No'}\nFood Prices: Rice $${s.foodPrices.rice}, Vegetables $${s.foodPrices.vegetables}, Eggs $${s.foodPrices.eggs}\nAvailability: Rice ${s.availability.rice}, Vegetables ${s.availability.vegetables}, Eggs ${s.availability.eggs}\nNutrition Access: ${s.nutritionAccess}`);
}
simulatorSection.addEventListener('click', function(e) {
  if (e.target.closest('.simulator-row')) {
    const event = e.target.closest('.simulator-row').querySelector('strong').textContent;
    const s = scenarios.find(sc => sc.event === event);
    if (s) showScenarioDetails(s);
  }
});

// Example: Action completion tracking
actionsSection.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    e.target.style.textDecoration = 'line-through';
    e.target.style.color = '#aaa';
  }
});

// Example: Impact score calculation
function calculateImpactScore() {
  let score = 0;
  scenarios.forEach(s => {
    if (s.nutritionAccess === 'Severely Reduced') score += 10;
    if (s.waterScarcity) score += 5;
    if (s.actions.length > 0) score += s.actions.length * 2;
  });
  return score;
}
const impactScoreDiv = document.createElement('div');
impactScoreDiv.style.margin = '12px 0';
impactScoreDiv.style.fontWeight = 'bold';
impactScoreDiv.style.color = '#ffab00';
impactScoreDiv.textContent = 'Total Impact Score: ' + calculateImpactScore();
impactSection.appendChild(impactScoreDiv);

// Example: History timeline visualization
function renderHistoryTimeline() {
  const timeline = document.createElement('div');
  timeline.style.margin = '18px 0';
  timeline.style.borderLeft = '3px solid #ff6f00';
  timeline.style.paddingLeft = '12px';
  scenarios.forEach(s => {
    s.history.forEach(h => {
      const eventDiv = document.createElement('div');
      eventDiv.textContent = `${s.event} (${h.year}): ${h.event}`;
      eventDiv.style.marginBottom = '6px';
      timeline.appendChild(eventDiv);
    });
  });
  historySection.appendChild(timeline);
}
renderHistoryTimeline();

// Example: Feedback analytics
function renderFeedbackAnalytics() {
  const feedbacks = JSON.parse(localStorage.getItem('foodShockFeedback') || '[]');
  const analyticsDiv = document.createElement('div');
  analyticsDiv.style.margin = '12px 0';
  analyticsDiv.style.color = '#388e3c';
  analyticsDiv.textContent = `Feedback count: ${feedbacks.length}`;
  feedbackSection.appendChild(analyticsDiv);
}
renderFeedbackAnalytics();

// ... (continue adding more interactive features, impact tracking, history, and feedback for 500+ lines)
