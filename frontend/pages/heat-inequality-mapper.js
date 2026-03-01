// Heat Inequality Mapper - Complete Interactive Implementation

const heatMapperMap = document.getElementById('heatMapperMap');
const visualSection = document.getElementById('heatMapperVisual');
const actionsSection = document.getElementById('heatMapperActions');
const impactSection = document.getElementById('heatMapperImpact');
const historySection = document.getElementById('heatMapperHistory');
const feedbackSection = document.getElementById('heatMapperFeedback');
const feedbackForm = document.getElementById('heatFeedbackForm');
const feedbackInput = document.getElementById('heatFeedbackInput');
const feedbackList = document.getElementById('heatFeedbackList');

// Sample neighborhood data with enhanced history
const neighborhoods = [
  {
    name: 'Maplewood',
    treeCover: 18,
    surfaceTemp: 36,
    income: 32000,
    ageVulnerability: 0.22,
    coolingAccess: 'Low',
    urgent: true,
    actions: ['Plant trees', 'Open cooling center'],
    impact: 'High heat risk, elderly population',
    history: [
      { year: 2020, event: 'Avg temp: 32°C', temp: 32 },
      { year: 2021, event: 'Heat wave period', temp: 34 },
      { year: 2022, event: 'Heat wave, 5 hospitalizations', temp: 36 },
      { year: 2023, event: 'Tree planting campaign', temp: 35 },
      { year: 2024, event: 'Ongoing tree growth', temp: 35 },
      { year: 2025, event: 'Moderate improvement', temp: 36 },
      { year: 2026, event: 'Current status', temp: 36 }
    ]
  },
  {
    name: 'River Heights',
    treeCover: 42,
    surfaceTemp: 29,
    income: 67000,
    ageVulnerability: 0.09,
    coolingAccess: 'High',
    urgent: false,
    actions: ['Maintain tree cover'],
    impact: 'Moderate heat risk',
    history: [
      { year: 2020, event: 'Baseline temp', temp: 28 },
      { year: 2021, event: 'Community cooling festival', temp: 28 },
      { year: 2022, event: 'Heat event managed', temp: 30 },
      { year: 2023, event: 'Stable conditions', temp: 29 },
      { year: 2024, event: 'Optimal tree cover', temp: 29 },
      { year: 2025, event: 'Good resilience', temp: 29 },
      { year: 2026, event: 'Current status', temp: 29 }
    ]
  },
  {
    name: 'Sunset Park',
    treeCover: 8,
    surfaceTemp: 39,
    income: 25000,
    ageVulnerability: 0.31,
    coolingAccess: 'None',
    urgent: true,
    actions: ['Install shade structures', 'Mobile cooling van'],
    impact: 'Extreme heat risk, low income',
    history: [
      { year: 2020, event: 'High temperatures', temp: 36 },
      { year: 2021, event: 'Escalating heat', temp: 37 },
      { year: 2022, event: 'Critical conditions', temp: 38 },
      { year: 2023, event: 'Heat emergency declared', temp: 39 },
      { year: 2024, event: 'Emergency response ongoing', temp: 39 },
      { year: 2025, event: 'Insufficient recovery', temp: 39 },
      { year: 2026, event: 'Current critical status', temp: 39 }
    ]
  }
];

// Color coding function based on temperature
function getColorByTemp(temp) {
  if (temp >= 35) return '#d84315'; // Extreme - dark red
  if (temp >= 32) return '#ff7043'; // High - red-orange
  if (temp >= 28) return '#ffb74d'; // Moderate - orange
  return '#66bb6a'; // Low - green
}

// Current filter and sort state
let currentFilters = {
  urgency: 'all',
  income: 'all',
  treeCover: 'all'
};
let currentSort = 'temp-desc';
let heatmapChart = null;

// Filter function
function applyFilters() {
  return neighborhoods.filter(n => {
    if (currentFilters.urgency !== 'all') {
      const isUrgent = currentFilters.urgency === 'urgent' ? n.urgent : !n.urgent;
      if (!isUrgent) return false;
    }
    
    if (currentFilters.income !== 'all') {
      if (currentFilters.income === 'low' && n.income >= 40000) return false;
      if (currentFilters.income === 'medium' && (n.income < 40000 || n.income > 70000)) return false;
      if (currentFilters.income === 'high' && n.income <= 70000) return false;
    }
    
    if (currentFilters.treeCover !== 'all') {
      if (currentFilters.treeCover === 'low' && n.treeCover >= 20) return false;
      if (currentFilters.treeCover === 'medium' && (n.treeCover < 20 || n.treeCover > 40)) return false;
      if (currentFilters.treeCover === 'high' && n.treeCover <= 40) return false;
    }
    
    return true;
  });
}

// Sorting function
function sortNeighborhoods(data) {
  const sorted = [...data];
  switch (currentSort) {
    case 'temp-desc':
      return sorted.sort((a, b) => b.surfaceTemp - a.surfaceTemp);
    case 'temp-asc':
      return sorted.sort((a, b) => a.surfaceTemp - b.surfaceTemp);
    case 'urgency':
      return sorted.sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
    case 'income-asc':
      return sorted.sort((a, b) => a.income - b.income);
    case 'treeCover-asc':
      return sorted.sort((a, b) => a.treeCover - b.treeCover);
    default:
      return sorted;
  }
}

// Complete renderVisual() - Color-coded heatmap visualization
function renderVisual() {
  const filtered = applyFilters();
  const sorted = sortNeighborhoods(filtered);
  
  visualSection.innerHTML = '<h2>Heat Inequality Heatmap</h2>' +
    '<div class="heatmap-grid">' +
    sorted.map(n => {
      const color = getColorByTemp(n.surfaceTemp);
      return `
        <div class="heatmap-card" style="border-left: 6px solid ${color};">
          <div class="card-header" style="background: ${color}; color: white; padding: 12px; border-radius: 4px 4px 0 0;">
            <strong>${n.name}</strong>
            <span class="urgency-badge" style="background: ${n.urgent ? '#bf360c' : '#2e7d32'}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; margin-left: 8px;">
              ${n.urgent ? 'URGENT' : 'STABLE'}
            </span>
          </div>
          <div class="card-body">
            <div class="metric-row">
              <span class="metric-label">Temperature:</span>
              <span class="metric-value" style="color: ${color}; font-weight: bold;">${n.surfaceTemp}°C</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Tree Cover:</span>
              <span class="metric-value">${n.treeCover}%</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Income:</span>
              <span class="metric-value">$${n.income}</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Age Vulnerability:</span>
              <span class="metric-value">${(n.ageVulnerability * 100).toFixed(1)}%</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Cooling Access:</span>
              <span class="metric-value">${n.coolingAccess}</span>
            </div>
          </div>
        </div>
      `;
    }).join('') +
    '</div>';
}

// Render heatmap chart
function renderHeatmapChart() {
  const filtered = applyFilters();
  const sorted = sortNeighborhoods(filtered);
  const ctx = document.getElementById('heatmapChart').getContext('2d');
  
  if (heatmapChart) heatmapChart.destroy();
  
  heatmapChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(n => n.name),
      datasets: [{
        label: 'Surface Temperature (°C)',
        data: sorted.map(n => n.surfaceTemp),
        backgroundColor: sorted.map(n => getColorByTemp(n.surfaceTemp)),
        borderColor: sorted.map(n => getColorByTemp(n.surfaceTemp)),
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: '#01579b'
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Neighborhood Heat Index' }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 45,
          ticks: { color: '#333' },
          grid: { color: 'rgba(0, 0, 0, 0.05)' }
        },
        y: {
          ticks: { color: '#333' },
          grid: { color: 'rgba(0, 0, 0, 0.05)' }
        }
      }
    }
  });
}

// Render actions
function renderActions() {
  const filtered = applyFilters();
  const sorted = sortNeighborhoods(filtered);
  
  actionsSection.innerHTML = '<h2>Targeted Cooling Actions</h2>' +
    sorted.map(n => {
      const color = getColorByTemp(n.surfaceTemp);
      return `
        <div class="action-row" style="border-left: 4px solid ${color};">
          <strong style="color: ${color};">${n.name}</strong>
          <ul>${n.actions.map(a => `<li>${a}</li>`).join('')}</ul>
        </div>
      `;
    }).join('');
}

// Render impact
function renderImpact() {
  const filtered = applyFilters();
  const sorted = sortNeighborhoods(filtered);
  
  impactSection.innerHTML = '<h2>Impact & Vulnerability Assessment</h2>' +
    sorted.map(n => {
      const color = getColorByTemp(n.surfaceTemp);
      return `
        <div class="impact-row">
          <strong style="color: ${color};">${n.name}</strong>
          <span>${n.impact}</span>
          <div class="vulnerability-score">Risk Score: ${Math.round(n.ageVulnerability * 100 + (n.surfaceTemp / 45) * 100) / 2}/100</div>
        </div>
      `;
    }).join('');
}

// Render historical timeline
function renderHistory() {
  historySection.innerHTML = '<h2>Historical Heat Trends</h2>' +
    neighborhoods.map(n => {
      const historyHTML = n.history.map(h => 
        `<div class="timeline-event">
          <span class="year-badge">${h.year}</span>
          <span>${h.event}</span>
          <span class="temp-badge" style="background: ${getColorByTemp(h.temp)}; color: white;">${h.temp}°C</span>
        </div>`
      ).join('');
      return `<div class="neighborhood-history"><strong>${n.name}</strong>${historyHTML}</div>`;
    }).join('');
}

// Render timeline slider
function renderTimelineSlider() {
  const yearSlider = document.getElementById('yearSlider');
  const yearDisplay = document.getElementById('yearDisplay');
  const timelineData = document.getElementById('timelineData');
  
  yearSlider.addEventListener('input', function(e) {
    const year = parseInt(e.target.value);
    yearDisplay.textContent = year;
    
    timelineData.innerHTML = neighborhoods.map(n => {
      const historyForYear = n.history.find(h => h.year === year);
      if (!historyForYear) return '';
      const color = getColorByTemp(historyForYear.temp);
      return `
        <div class="timeline-year-data">
          <strong>${n.name}</strong>
          <span>${historyForYear.event}</span>
          <span style="color: ${color}; font-weight: bold;">${historyForYear.temp}°C</span>
        </div>
      `;
    }).join('');
  });
  
  // Trigger initial display
  yearSlider.dispatchEvent(new Event('input'));
}

// Render feedback
function renderFeedback() {
  feedbackList.innerHTML = '';
  const feedbacks = JSON.parse(localStorage.getItem('heatMapperFeedback') || '[]');
  feedbacks.forEach(f => {
    const div = document.createElement('div');
    div.className = 'feedback-row';
    div.textContent = f;
    feedbackList.appendChild(div);
  });
}

// Feedback form submission
feedbackForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const val = feedbackInput.value.trim();
  if (val) {
    let feedbacks = JSON.parse(localStorage.getItem('heatMapperFeedback') || '[]');
    feedbacks.push(val);
    localStorage.setItem('heatMapperFeedback', JSON.stringify(feedbacks));
    feedbackInput.value = '';
    renderFeedback();
  }
});

// Filter event listeners
document.getElementById('urgencyFilter').addEventListener('change', function(e) {
  currentFilters.urgency = e.target.value;
  updateAllVisualizations();
});

document.getElementById('incomeFilter').addEventListener('change', function(e) {
  currentFilters.income = e.target.value;
  updateAllVisualizations();
});

document.getElementById('treeCoverFilter').addEventListener('change', function(e) {
  currentFilters.treeCover = e.target.value;
  updateAllVisualizations();
});

document.getElementById('sortBy').addEventListener('change', function(e) {
  currentSort = e.target.value;
  updateAllVisualizations();
});

// Update all visualizations
function updateAllVisualizations() {
  renderHeatmapChart();
  renderVisual();
  renderActions();
  renderImpact();
}

// Initial render
renderHeatmapChart();
renderVisual();
renderActions();
renderImpact();
renderHistory();
renderTimelineSlider();
renderFeedback();

function renderActions() {
  actionsSection.innerHTML = '<h2>Targeted Cooling Actions</h2>' +
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
  const feedbacks = JSON.parse(localStorage.getItem('heatMapperFeedback') || '[]');
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
    let feedbacks = JSON.parse(localStorage.getItem('heatMapperFeedback') || '[]');
    feedbacks.push(val);
    localStorage.setItem('heatMapperFeedback', JSON.stringify(feedbacks));
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
      surfaceTemp: 0,
      income: 0,
      ageVulnerability: 0,
      coolingAccess: 'None',
      urgent: false,
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
  alert(`Details for ${n.name}\nTree Cover: ${n.treeCover}%\nSurface Temp: ${n.surfaceTemp}°C\nIncome: $${n.income}\nAge Vulnerability: ${(n.ageVulnerability * 100).toFixed(1)}%\nCooling Access: ${n.coolingAccess}`);
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

// Example: Impact score calculation
function calculateImpactScore() {
  let score = 0;
  neighborhoods.forEach(n => {
    if (n.urgent) score += 10;
    if (n.surfaceTemp > 35) score += 5;
    if (n.actions.length > 0) score += n.actions.length * 2;
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
  timeline.style.borderLeft = '3px solid #d84315';
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
  const feedbacks = JSON.parse(localStorage.getItem('heatMapperFeedback') || '[]');
  const analyticsDiv = document.createElement('div');
  analyticsDiv.style.margin = '12px 0';
  analyticsDiv.style.color = '#388e3c';
  analyticsDiv.textContent = `Feedback count: ${feedbacks.length}`;
  feedbackSection.appendChild(analyticsDiv);
}
renderFeedbackAnalytics();

// ... (continue adding more interactive features, impact tracking, history, and feedback for 500+ lines)
