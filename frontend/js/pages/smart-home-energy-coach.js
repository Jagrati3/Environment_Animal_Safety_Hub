// Smart Home Energy Coach JavaScript

// Sample Data
const appliancesData = [
  { id: 1, name: 'HVAC System', icon: 'fa-snowflake', usage: 450, cost: 67.5, status: 'on', efficiency: 72, trend: -5, avgDaily: 15 },
  { id: 2, name: 'Water Heater', icon: 'fa-fire-flame-curved', usage: 320, cost: 48, status: 'on', efficiency: 85, trend: 2, avgDaily: 10.7 },
  { id: 3, name: 'Refrigerator', icon: 'fa-cube-ice', usage: 180, cost: 27, status: 'on', efficiency: 90, trend: -3, avgDaily: 6 },
  { id: 4, name: 'Washer/Dryer', icon: 'fa-washing-machine', usage: 280, cost: 42, status: 'off', efficiency: 78, trend: -8, avgDaily: 9.3 },
  { id: 5, name: 'Lighting', icon: 'fa-lightbulb', usage: 150, cost: 22.5, status: 'on', efficiency: 88, trend: -12, avgDaily: 5 },
  { id: 6, name: 'TV/Electronics', icon: 'fa-tv', usage: 120, cost: 18, status: 'on', efficiency: 82, trend: 0, avgDaily: 4 },
  { id: 7, name: 'Dishwasher', icon: 'fa-dishwasher', usage: 95, cost: 14.25, status: 'off', efficiency: 86, trend: -4, avgDaily: 3.2 },
  { id: 8, name: 'Oven/Stove', icon: 'fa-fire-burner', usage: 110, cost: 16.5, status: 'off', efficiency: 75, trend: 1, avgDaily: 3.7 },
];

const personalizedTips = [
  {
    id: 1,
    title: 'Optimize Your AC Temperature',
    description: 'Set your thermostat to 78°F when home and 85°F when away. Each degree higher can save 3-5% on cooling costs.',
    category: 'high-impact',
    savings: '135 kWh/month',
    difficulty: 'Easy',
    impact: 'High',
    appliance: 'HVAC System'
  },
  {
    id: 2,
    title: 'Use Cold Water for Laundry',
    description: 'Washing clothes in cold water can reduce energy usage by up to 90% per load while still getting clothes clean.',
    category: 'easy',
    savings: '50 kWh/month',
    difficulty: 'Easy',
    impact: 'Medium',
    appliance: 'Washer/Dryer'
  },
  {
    id: 3,
    title: 'Enable Smart Power Strips',
    description: 'Phantom power from electronics costs $100-200/year. Smart power strips eliminate this standby consumption.',
    category: 'easy',
    savings: '40 kWh/month',
    difficulty: 'Easy',
    impact: 'Medium',
    appliance: 'TV/Electronics'
  },
  {
    id: 4,
    title: 'Switch to LED Bulbs',
    description: 'LEDs use 75% less energy and last 25x longer than incandescent bulbs. Replace your most-used lights first.',
    category: 'high-impact',
    savings: '90 kWh/month',
    difficulty: 'Easy',
    impact: 'High',
    appliance: 'Lighting'
  },
  {
    id: 5,
    title: 'Lower Water Heater Temperature',
    description: 'Set your water heater to 120°F. This prevents scalding and reduces standby heat loss by 10-15%.',
    category: 'easy',
    savings: '48 kWh/month',
    difficulty: 'Easy',
    impact: 'Medium',
    appliance: 'Water Heater'
  },
  {
    id: 6,
    title: 'Clean AC Filters Monthly',
    description: 'Dirty filters reduce efficiency by 15%. Clean or replace monthly during peak cooling season.',
    category: 'seasonal',
    savings: '67 kWh/month',
    difficulty: 'Easy',
    impact: 'High',
    appliance: 'HVAC System'
  },
  {
    id: 7,
    title: 'Run Dishwasher Only When Full',
    description: 'Wait until the dishwasher is completely full before running. Use the energy-saver dry cycle.',
    category: 'easy',
    savings: '30 kWh/month',
    difficulty: 'Easy',
    impact: 'Low',
    appliance: 'Dishwasher'
  },
  {
    id: 8,
    title: 'Install Ceiling Fans',
    description: 'Ceiling fans use 90% less energy than AC. They make rooms feel 4°F cooler, letting you raise the thermostat.',
    category: 'high-impact',
    savings: '120 kWh/month',
    difficulty: 'Medium',
    impact: 'High',
    appliance: 'HVAC System'
  },
  {
    id: 9,
    title: 'Seal Air Leaks',
    description: 'Weatherstrip doors and windows. Seal leaks can reduce heating/cooling costs by 20%.',
    category: 'seasonal',
    savings: '150 kWh/month',
    difficulty: 'Medium',
    impact: 'High',
    appliance: 'HVAC System'
  },
  {
    id: 10,
    title: 'Use Microwave for Small Meals',
    description: 'Microwaves use 80% less energy than ovens for small portions. Save the oven for larger meals.',
    category: 'easy',
    savings: '25 kWh/month',
    difficulty: 'Easy',
    impact: 'Low',
    appliance: 'Oven/Stove'
  },
];

let goals = [
  {
    id: 1,
    title: 'Reduce HVAC Usage by 20%',
    type: 'appliance',
    target: 20,
    unit: 'percent',
    current: 15,
    startDate: '2026-02-01',
    endDate: '2026-02-28',
    appliance: 'HVAC System',
    status: 'active'
  },
  {
    id: 2,
    title: 'Save 100 kWh This Month',
    type: 'reduction',
    target: 100,
    unit: 'kwh',
    current: 68,
    startDate: '2026-02-01',
    endDate: '2026-02-28',
    appliance: null,
    status: 'active'
  }
];

// State Management
let currentTab = 'appliances';
let currentFilter = 'all';
let energyScore = 78;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
  loadDashboard();
  loadAppliances();
  loadTips();
  loadGoals();
  loadInsights();
});

function initializeApp() {
  // Set initial energy score
  updateEnergyScore(energyScore);
  
  // Set initial stats
  document.getElementById('weekSavings').textContent = '245 kWh';
  document.getElementById('goalProgress').textContent = '68%';
  
  // Load quick tips
  loadQuickTips();
  
  // Set today's date for form
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('goalStart').value = today;
}

function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll('.tab-link').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });
  
  // Header actions
  document.getElementById('refreshBtn').addEventListener('click', refreshData);
  document.getElementById('setGoalBtn').addEventListener('click', () => openModal());
  
  // Goal modal
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => selectTemplate(card.dataset.template));
  });
  
  // Goal form
  document.getElementById('goalForm').addEventListener('submit', handleGoalSubmit);
  
  // Tips filters
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => filterTips(chip.dataset.filter));
  });
  
  // Appliance actions
  document.getElementById('sortByUsage').addEventListener('click', sortAppliances);
  
  // Quick action buttons
  document.getElementById('addGoalBtn').addEventListener('click', () => switchTab('goals'));
  
  // Close modal on outside click
  document.getElementById('goalModal').addEventListener('click', (e) => {
    if (e.target.id === 'goalModal') closeModal();
  });
}

// Dashboard Functions
function loadDashboard() {
  updateEnergyScore(energyScore);
  loadActiveGoals();
}

function updateEnergyScore(score) {
  const scoreProgress = document.getElementById('scoreProgress');
  const scoreValue = document.getElementById('scoreValue');
  const circumference = 283; // 2 * PI * radius (45)
  const offset = circumference - (score / 100) * circumference;
  
  scoreProgress.style.strokeDashoffset = offset;
  scoreValue.textContent = score;
  
  // Update sub-scores
  document.getElementById('efficiencyScore').textContent = `${score - 8}%`;
  document.getElementById('improvementScore').textContent = `+${Math.floor(score / 5)}%`;
  document.getElementById('ecoScore').textContent = `${score + 5}%`;
}

function loadActiveGoals() {
  const activeGoalsContainer = document.getElementById('activeGoals');
  const activeGoals = goals.filter(g => g.status === 'active').slice(0, 2);
  
  if (activeGoals.length === 0) {
    activeGoalsContainer.innerHTML = `
      <p style="color: var(--text-secondary); text-align: center; padding: 2rem;">
        No active goals. Create one to start tracking your progress!
      </p>
    `;
    return;
  }
  
  activeGoalsContainer.innerHTML = activeGoals.map(goal => `
    <div class="goal-item">
      <div class="goal-header">
        <h4>${goal.title}</h4>
        <span class="goal-badge">${goal.current}/${goal.target}${goal.unit === 'percent' ? '%' : goal.unit}</span>
      </div>
      <div class="goal-progress">
        <div class="goal-progress-text">
          <span>${Math.round((goal.current / goal.target) * 100)}% complete</span>
          <span>${getDaysRemaining(goal.endDate)} days left</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${(goal.current / goal.target) * 100}%"></div>
        </div>
      </div>
    </div>
  `).join('');
}

function loadQuickTips() {
  const quickTipsContainer = document.getElementById('quickTips');
  const tips = personalizedTips.filter(t => t.category === 'high-impact').slice(0, 2);
  
  quickTipsContainer.innerHTML = tips.map(tip => `
    <div class="tip-card">
      <div class="tip-card-content">
        <div class="tip-icon"><i class="fa-solid fa-lightbulb"></i></div>
        <h4>${tip.title}</h4>
        <p>${tip.description.substring(0, 80)}...</p>
        <div class="tip-impact">
          <i class="fa-solid fa-arrow-down"></i>
          <span>Save ${tip.savings}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Appliances Functions
function loadAppliances() {
  renderApplianceChart();
  renderApplianceGrid();
}

function renderApplianceChart() {
  const ctx = document.getElementById('applianceChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: appliancesData.map(a => a.name),
      datasets: [{
        data: appliancesData.map(a => a.usage),
        backgroundColor: [
          '#10b981', '#3b82f6', '#f59e0b', '#ef4444',
          '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: { size: 12 }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} kWh (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

function renderApplianceGrid() {
  const grid = document.getElementById('applianceGrid');
  
  grid.innerHTML = appliancesData.map(appliance => `
    <div class="appliance-card" data-id="${appliance.id}">
      <div class="appliance-header">
        <div class="appliance-icon">
          <i class="fa-solid ${appliance.icon}"></i>
        </div>
        <span class="appliance-status ${appliance.status}">${appliance.status.toUpperCase()}</span>
      </div>
      <h4 class="appliance-name">${appliance.name}</h4>
      <div class="appliance-usage">${appliance.usage} kWh</div>
      <div class="appliance-cost">$${appliance.cost.toFixed(2)}/month</div>
      <div class="appliance-stats">
        <div class="stat">
          <div class="stat-label">Efficiency</div>
          <div class="stat-value">${appliance.efficiency}%</div>
        </div>
        <div class="stat">
          <div class="stat-label">Trend</div>
          <div class="stat-value ${appliance.trend < 0 ? 'positive' : appliance.trend > 0 ? 'negative' : ''}">
            ${appliance.trend > 0 ? '+' : ''}${appliance.trend}%
          </div>
        </div>
        <div class="stat">
          <div class="stat-label">Daily Avg</div>
          <div class="stat-value">${appliance.avgDaily} kWh</div>
        </div>
      </div>
    </div>
  `).join('');
}

function sortAppliances() {
  appliancesData.sort((a, b) => b.usage - a.usage);
  renderApplianceGrid();
  showToast('Appliances sorted by usage', 'success');
}

// Tips Functions
function loadTips() {
  renderTipsGrid(personalizedTips);
}

function renderTipsGrid(tips) {
  const grid = document.getElementById('tipsGrid');
  
  grid.innerHTML = tips.map(tip => `
    <div class="tip-card-full" data-category="${tip.category}">
      <div class="tip-header">
        <span class="tip-category ${tip.category}">${tip.category.replace('-', ' ')}</span>
      </div>
      <h4 class="tip-title">${tip.title}</h4>
      <p class="tip-description">${tip.description}</p>
      <div class="tip-metrics">
        <div class="tip-metric">
          <i class="fa-solid fa-bolt"></i>
          <span>Savings: <strong>${tip.savings}</strong></span>
        </div>
        <div class="tip-metric">
          <i class="fa-solid fa-gauge-simple"></i>
          <span>${tip.difficulty}</span>
        </div>
        <div class="tip-metric">
          <i class="fa-solid fa-star"></i>
          <span>${tip.impact} Impact</span>
        </div>
      </div>
    </div>
  `).join('');
}

function filterTips(filter) {
  currentFilter = filter;
  
  // Update active filter chip
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.filter === filter);
  });
  
  // Filter tips
  const filteredTips = filter === 'all' 
    ? personalizedTips 
    : personalizedTips.filter(tip => tip.category === filter);
  
  renderTipsGrid(filteredTips);
}

// Goals Functions
function loadGoals() {
  renderGoalsList();
}

function renderGoalsList() {
  const container = document.getElementById('goalsListFull');
  
  if (goals.length === 0) {
    container.innerHTML = `
      <p style="color: var(--text-secondary); text-align: center; padding: 2rem;">
        No goals yet. Create your first goal to start tracking!
      </p>
    `;
    return;
  }
  
  container.innerHTML = goals.map(goal => {
    const progress = (goal.current / goal.target) * 100;
    const daysLeft = getDaysRemaining(goal.endDate);
    
    return `
      <div class="goal-item">
        <div class="goal-header">
          <h4>${goal.title}</h4>
          <span class="goal-badge">${Math.round(progress)}%</span>
        </div>
        <div style="display: flex; gap: 1rem; margin: 0.5rem 0; font-size: 0.875rem; color: var(--text-secondary);">
          <span><i class="fa-solid fa-calendar"></i> ${daysLeft} days remaining</span>
          ${goal.appliance ? `<span><i class="fa-solid fa-plug"></i> ${goal.appliance}</span>` : ''}
        </div>
        <div class="goal-progress">
          <div class="goal-progress-text">
            <span>${goal.current} / ${goal.target} ${goal.unit}</span>
            <span>${progress.toFixed(1)}% complete</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function handleGoalSubmit(e) {
  e.preventDefault();
  
  const newGoal = {
    id: goals.length + 1,
    title: document.getElementById('goalTitle').value,
    type: document.getElementById('goalType').value,
    target: parseFloat(document.getElementById('goalTarget').value),
    unit: document.getElementById('goalUnit').value,
    current: 0,
    startDate: document.getElementById('goalStart').value,
    endDate: document.getElementById('goalEnd').value,
    appliance: document.getElementById('goalAppliance').value || null,
    status: 'active'
  };
  
  goals.push(newGoal);
  
  // Reset form
  e.target.reset();
  
  // Update displays
  renderGoalsList();
  loadActiveGoals();
  
  showToast(`Goal "${newGoal.title}" created successfully!`, 'success');
}

// Insights Functions
function loadInsights() {
  renderUsagePatternChart();
  renderCostChart();
  renderComparisonChart();
  renderPeakTimes();
  renderOpportunities();
}

function renderUsagePatternChart() {
  const ctx = document.getElementById('usagePatternChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
      datasets: [{
        label: 'Today',
        data: [12, 8, 15, 35, 42, 48, 65, 52],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'kWh' }
        }
      }
    }
  });
  
  document.getElementById('patternSummary').innerHTML = `
    <div class="insight-item">
      <span class="insight-label">Peak Hour</span>
      <span class="insight-value">6-7 PM</span>
    </div>
    <div class="insight-item">
      <span class="insight-label">Lowest Usage</span>
      <span class="insight-value">3-4 AM</span>
    </div>
    <div class="insight-item">
      <span class="insight-label">Average Hourly</span>
      <span class="insight-value">34.6 kWh</span>
    </div>
  `;
}

function renderCostChart() {
  const ctx = document.getElementById('costChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Weekly Cost',
        data: [87, 82, 79, 73],
        backgroundColor: '#3b82f6'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Cost ($)' }
        }
      }
    }
  });
  
  document.getElementById('costBreakdown').innerHTML = `
    <div class="insight-item">
      <span class="insight-label">This Month</span>
      <span class="insight-value">$321</span>
    </div>
    <div class="insight-item">
      <span class="insight-label">Last Month</span>
      <span class="insight-value">$356</span>
    </div>
    <div class="insight-item">
      <span class="insight-label">Savings</span>
      <span class="insight-value" style="color: var(--success-color);">-$35 (9.8%)</span>
    </div>
  `;
}

function renderComparisonChart() {
  const ctx = document.getElementById('comparisonChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'This Week',
          data: [45, 42, 48, 43, 46, 52, 49],
          backgroundColor: '#10b981'
        },
        {
          label: 'Last Week',
          data: [52, 48, 54, 51, 53, 58, 55],
          backgroundColor: '#e5e7eb'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Daily Usage (kWh)' }
        }
      }
    }
  });
}

function renderPeakTimes() {
  const container = document.getElementById('peakTimes');
  
  container.innerHTML = `
    <div class="insight-item">
      <span class="insight-label">Morning Peak</span>
      <span class="insight-value">7-9 AM</span>
    </div>
    <div class="insight-item">
      <span class="insight-label">Evening Peak</span>
      <span class="insight-value">6-8 PM</span>
    </div>
    <div class="insight-item">
      <span class="insight-label">Weekend Peak</span>
      <span class="insight-value">1-4 PM</span>
    </div>
    <div class="insight-item">
      <span class="insight-label">Off-Peak Rate</span>
      <span class="insight-value">$0.08/kWh</span>
    </div>
  `;
}

function renderOpportunities() {
  const container = document.getElementById('opportunitiesList');
  
  const opportunities = [
    {
      title: 'Shift EV Charging to Off-Peak',
      description: 'Charge your electric vehicle between 11 PM and 6 AM to save 40% on electricity rates.',
      savings: '$28/month'
    },
    {
      title: 'Upgrade to Smart Thermostat',
      description: 'A programmable thermostat can reduce HVAC costs by 20-30% through optimized scheduling.',
      savings: '$45/month'
    },
    {
      title: 'Install Solar Panels',
      description: 'Based on your usage patterns, solar could offset 65% of your electricity bill.',
      savings: '$180/month'
    }
  ];
  
  container.innerHTML = opportunities.map(opp => `
    <div class="opportunity-card">
      <div class="opportunity-header">
        <h4 class="opportunity-title">${opp.title}</h4>
        <span class="opportunity-savings">${opp.savings}</span>
      </div>
      <p class="opportunity-description">${opp.description}</p>
    </div>
  `).join('');
}

// Utility Functions
function switchTab(tabName) {
  currentTab = tabName;
  
  // Update tab links
  document.querySelectorAll('.tab-link').forEach(link => {
    link.classList.toggle('active', link.dataset.tab === tabName);
  });
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === tabName);
  });
}

function openModal() {
  document.getElementById('goalModal').classList.add('active');
}

function closeModal() {
  document.getElementById('goalModal').classList.remove('active');
}

function selectTemplate(template) {
  closeModal();
  
  switch(template) {
    case 'quick':
      fillGoalForm('Reduce Usage by 10% This Week', 'reduction', 10, 'percent', 7);
      break;
    case 'monthly':
      fillGoalForm('Save 100 kWh This Month', 'reduction', 100, 'kwh', 30);
      break;
    case 'appliance':
      fillGoalForm('Optimize HVAC Efficiency', 'appliance', 20, 'percent', 30);
      document.getElementById('goalAppliance').value = 'hvac';
      break;
    case 'custom':
      switchTab('goals');
      document.getElementById('goalTitle').focus();
      return;
  }
  
  switchTab('goals');
  showToast('Goal template loaded! Adjust and submit.', 'info');
}

function fillGoalForm(title, type, target, unit, days) {
  document.getElementById('goalTitle').value = title;
  document.getElementById('goalType').value = type;
  document.getElementById('goalTarget').value = target;
  document.getElementById('goalUnit').value = unit;
  
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + days);
  
  document.getElementById('goalStart').value = today.toISOString().split('T')[0];
  document.getElementById('goalEnd').value = endDate.toISOString().split('T')[0];
}

function refreshData() {
  showToast('Refreshing energy data...', 'info');
  
  // Simulate data refresh
  setTimeout(() => {
    // Update random values
    energyScore = Math.min(100, energyScore + Math.floor(Math.random() * 5));
    updateEnergyScore(energyScore);
    
    // Update goals progress
    goals = goals.map(goal => ({
      ...goal,
      current: Math.min(goal.target, goal.current + Math.floor(Math.random() * 5))
    }));
    
    loadActiveGoals();
    renderGoalsList();
    
    showToast('Data refreshed successfully!', 'success');
  }, 1000);
}

function getDaysRemaining(endDate) {
  const end = new Date(endDate);
  const today = new Date();
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Export functions for external use
window.energyCoach = {
  switchTab,
  loadAppliances,
  loadTips,
  loadGoals,
  refreshData
};
