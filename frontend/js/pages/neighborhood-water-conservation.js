// Neighborhood Water Conservation Dashboard JavaScript

// Sample Data
const dailyUsageData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  userUsage: [295, 280, 310, 275, 265, 340, 325],
  neighborhoodAvg: [350, 345, 360, 340, 335, 380, 370],
  target: [300, 300, 300, 300, 300, 300, 300]
};

const leakAlerts = [
  {
    id: 1,
    title: 'Unusual Overnight Usage',
    description: 'Detected 45 gallons used between 2-4 AM',
    time: '2 hours ago',
    status: 'active',
    severity: 'moderate'
  },
  {
    id: 2,
    title: 'Possible Toilet Leak',
    description: 'Continuous low flow detected for 6 hours',
    time: '1 day ago',
    status: 'resolved',
    severity: 'minor'
  },
  {
    id: 3,
    title: 'High Flow Alert',
    description: 'Spike of 120 gallons in 1 hour detected',
    time: '3 days ago',
    status: 'resolved',
    severity: 'major'
  }
];

const leaderboardData = [
  { rank: 1, name: 'Johnson Family', savings: 1567, avatar: '👨‍👩‍👧‍👦' },
  { rank: 2, name: 'Garcia Family', savings: 1245, avatar: '👨‍👩‍👧' },
  { rank: 3, name: 'Chen Family', savings: 1089, avatar: '👨‍👩‍👦' },
  { rank: 4, name: 'Smith Family', savings: 987, avatar: '👨‍👩‍👧‍👦' },
  { rank: 5, name: 'Martinez Family', savings: 876, avatar: '👨‍👩‍👦‍👦' },
  { rank: 6, name: 'Lee Family', savings: 765, avatar: '👨‍👩‍👧' },
  { rank: 7, name: 'Brown Family', savings: 654, avatar: '👨‍👩‍👦' },
  { rank: 8, name: 'Taylor Family', savings: 543, avatar: '👨‍👩‍👧‍👦' }
];

const achievements = [
  { id: 1, icon: '💧', title: 'Water Saver', desc: 'Save 100 gallons', unlocked: true },
  { id: 2, icon: '🏆', title: 'Top 10', desc: 'Reach top 10 rank', unlocked: true },
  { id: 3, icon: '🌟', title: 'Week Streak', desc: '7 days below target', unlocked: true },
  { id: 4, icon: '🎯', title: 'Goal Master', desc: 'Complete 5 goals', unlocked: false },
  { id: 5, icon: '🔧', title: 'Leak Hunter', desc: 'Fix 3 leaks', unlocked: true },
  { id: 6, icon: '👑', title: '#1 Spot', desc: 'Reach #1 rank', unlocked: false }
];

const activeChallenges = [
  {
    id: 1,
    name: 'Week Water Saver',
    goal: 500,
    current: 345,
    duration: 7,
    daysLeft: 3,
    participants: 24,
    icon: 'fa-droplet'
  },
  {
    id: 2,
    name: 'Outdoor Conservation',
    goal: 300,
    current: 180,
    duration: 14,
    daysLeft: 8,
    participants: 18,
    icon: 'fa-seedling'
  }
];

const waterTips = [
  {
    icon: 'fa-shower',
    title: 'Take Shorter Showers',
    description: 'Reduce shower time by 2-3 minutes. A 5-minute shower uses about 10-25 gallons.',
    savings: 'Save 50-75 gal/week'
  },
  {
    icon: 'fa-faucet',
    title: 'Fix Leaky Faucets',
    description: 'A dripping faucet can waste 3,000+ gallons per year. Fix leaks immediately.',
    savings: 'Save 250 gal/month'
  },
  {
    icon: 'fa-toilet',
    title: 'Upgrade to Low-Flow Toilets',
    description: 'Modern toilets use 1.6 gallons per flush vs. old models using 3-5 gallons.',
    savings: 'Save 400 gal/month'
  },
  {
    icon: 'fa-washing-machine',
    title: 'Full Loads Only',
    description: 'Only run washing machines and dishwashers when completely full.',
    savings: 'Save 150 gal/month'
  },
  {
    icon: 'fa-cloud-rain',
    title: 'Collect Rainwater',
    description: 'Use rain barrels to collect water for plants and gardens.',
    savings: 'Save 200 gal/month'
  },
  {
    icon: 'fa-plant-wilt',
    title: 'Water Plants Wisely',
    description: 'Water early morning or evening to reduce evaporation. Use drip irrigation.',
    savings: 'Save 180 gal/month'
  },
  {
    icon: 'fa-sink',
    title: 'Turn Off Tap While Brushing',
    description: 'Don\'t let water run while brushing teeth or washing hands.',
    savings: 'Save 40 gal/week'
  },
  {
    icon: 'fa-broom',
    title: 'Use Broom, Not Hose',
    description: 'Sweep driveways and sidewalks instead of hosing them down.',
    savings: 'Save 150 gal/month'
  },
  {
    icon: 'fa-car',
    title: 'Efficient Car Washing',
    description: 'Use a bucket and sponge instead of running hose. Or use commercial car wash.',
    savings: 'Save 100 gal/wash'
  }
];

// State Management
let currentTab = 'usage';
let currentPeriod = 7;
let usageChart, breakdownChart, hourlyChart, topPerformersChart;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
  loadDashboard();
  loadUsageTab();
  loadLeaksTab();
  loadLeaderboardTab();
  loadChallengesTab();
  loadTipsTab();
});

function initializeApp() {
  // Set initial stats
  document.getElementById('todayUsage').textContent = '287 gal';
  document.getElementById('userRank').textContent = '#4';
  document.getElementById('weeklyGoal').textContent = '85%';
  document.getElementById('totalUsage').textContent = '8,456 gal';
  document.getElementById('savedWater').textContent = '245 gal';
  document.getElementById('activeAlerts').textContent = leakAlerts.filter(a => a.status === 'active').length;
  document.getElementById('communityTotal').textContent = '12.4k gal';
  
  // Check for active leak alerts
  checkLeakAlerts();
}

function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll('.tab-link').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });
  
  // Header actions
  document.getElementById('refreshBtn').addEventListener('click', refreshData);
  document.getElementById('reportLeakBtn').addEventListener('click', openReportModal);
  
  // Time period filters
  document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', () => changePeriod(parseInt(btn.dataset.period)));
  });
  
  // Leak detection
  document.getElementById('runCheckBtn').addEventListener('click', runLeakCheck);
  
  // Leaderboard filter
  document.getElementById('leaderboardPeriod').addEventListener('change', updateLeaderboard);
  
  // Challenge form
  document.getElementById('challengeForm').addEventListener('submit', handleChallengeSubmit);
  
  // Leak report form
  document.getElementById('leakReportForm').addEventListener('submit', handleLeakReport);
}

// Dashboard Functions
function loadDashboard() {
  updateOverviewStats();
}

function updateOverviewStats() {
  // Animate numbers
  animateValue('totalUsage', 0, 8456, 1000, ' gal');
  animateValue('savedWater', 0, 245, 1000, ' gal');
  animateValue('communityTotal', 0, 12450, 1000, ' gal');
}

function animateValue(id, start, end, duration, suffix = '') {
  const element = document.getElementById(id);
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}

function checkLeakAlerts() {
  const activeLeaks = leakAlerts.filter(a => a.status === 'active');
  if (activeLeaks.length > 0) {
    document.getElementById('leakAlertBanner').classList.remove('hidden');
  }
}

function dismissAlert() {
  document.getElementById('leakAlertBanner').classList.add('hidden');
}

// Usage Tab Functions
function loadUsageTab() {
  renderUsageChart();
  renderBreakdownChart();
  renderHourlyChart();
  renderBreakdownStats();
}

function renderUsageChart() {
  const ctx = document.getElementById('usageChart').getContext('2d');
  
  if (usageChart) usageChart.destroy();
  
  usageChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dailyUsageData.labels,
      datasets: [
        {
          label: 'Your Usage',
          data: dailyUsageData.userUsage,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 3
        },
        {
          label: 'Neighborhood Average',
          data: dailyUsageData.neighborhoodAvg,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 3
        },
        {
          label: 'Target Goal',
          data: dailyUsageData.target,
          borderColor: '#f59e0b',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          tension: 0,
          fill: false,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          padding: 12,
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          displayColors: true,
          callbacks: {
            label: (context) => {
              return `${context.dataset.label}: ${context.parsed.y} gal`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Gallons',
            font: { weight: 'bold' }
          },
          grid: {
            color: '#f1f5f9'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

function renderBreakdownChart() {
  const ctx = document.getElementById('breakdownChart').getContext('2d');
  
  if (breakdownChart) breakdownChart.destroy();
  
  breakdownChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Bathroom', 'Kitchen', 'Laundry', 'Outdoor', 'Other'],
      datasets: [{
        data: [35, 25, 20, 15, 5],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
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
              return `${label}: ${value}%`;
            }
          }
        }
      }
    }
  });
}

function renderHourlyChart() {
  const ctx = document.getElementById('hourlyChart').getContext('2d');
  
  if (hourlyChart) hourlyChart.destroy();
  
  hourlyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
      datasets: [{
        label: 'Hourly Usage',
        data: [5, 3, 12, 25, 18, 15, 32, 22],
        backgroundColor: '#0ea5e9',
        borderRadius: 8
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
          title: {
            display: true,
            text: 'Gallons',
            font: { weight: 'bold' }
          }
        }
      }
    }
  });
}

function renderBreakdownStats() {
  const container = document.getElementById('breakdownStats');
  const breakdown = [
    { label: 'Bathroom (35%)', value: '2,960 gal', icon: 'fa-shower' },
    { label: 'Kitchen (25%)', value: '2,114 gal', icon: 'fa-kitchen-set' },
    { label: 'Laundry (20%)', value: '1,691 gal', icon: 'fa-washing-machine' },
    { label: 'Outdoor (15%)', value: '1,268 gal', icon: 'fa-seedling' },
    { label: 'Other (5%)', value: '423 gal', icon: 'fa-ellipsis' }
  ];
  
  container.innerHTML = breakdown.map(item => `
    <div class="breakdown-item">
      <span class="breakdown-label">
        <i class="fa-solid ${item.icon}"></i>
        ${item.label}
      </span>
      <span class="breakdown-value">${item.value}</span>
    </div>
  `).join('');
}

function changePeriod(days) {
  currentPeriod = days;
  
  // Update active button
  document.querySelectorAll('.time-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.period) === days);
  });
  
  // Update chart (would fetch new data in real app)
  showToast(`Viewing ${days} day period`, 'info');
}

// Leak Detection Functions
function loadLeaksTab() {
  renderLeakAlerts();
  updateLeakIndicators();
}

function renderLeakAlerts() {
  const container = document.getElementById('leakAlertsList');
  
  if (leakAlerts.length === 0) {
    container.innerHTML = `
      <p style="text-align: center; color: var(--text-secondary); padding: 2rem;">
        No leak alerts. Great job!
      </p>
    `;
    return;
  }
  
  container.innerHTML = leakAlerts.map(alert => `
    <div class="leak-alert-item ${alert.status}">
      <div class="alert-item-header">
        <span class="alert-item-title">${alert.title}</span>
        <span class="alert-badge ${alert.status}">${alert.status}</span>
      </div>
      <p class="alert-item-desc">${alert.description}</p>
      <span class="alert-item-time"><i class="fa-solid fa-clock"></i> ${alert.time}</span>
    </div>
  `).join('');
}

function updateLeakIndicators() {
  document.getElementById('overnightUsage').textContent = '12 gal';
  document.getElementById('continuousFlow').textContent = '0 min';
  document.getElementById('unusualSpike').textContent = 'None';
  document.getElementById('peakUsage').textContent = '45 gal/hr';
}

function runLeakCheck() {
  const statusCircle = document.getElementById('leakStatus');
  const statusText = document.getElementById('statusText');
  const statusDesc = document.getElementById('statusDesc');
  const lastCheck = document.getElementById('lastCheck');
  
  showToast('Running leak detection...', 'info');
  
  // Simulate check
  setTimeout(() => {
    const hasLeak = Math.random() > 0.7;
    
    if (hasLeak) {
      statusCircle.className = 'status-circle warning';
      statusCircle.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i>';
      statusText.textContent = 'Leak Detected';
      statusDesc.textContent = 'Possible leak detected. Please investigate.';
      showToast('Leak detected! Check your property.', 'warning');
    } else {
      statusCircle.className = 'status-circle';
      statusCircle.innerHTML = '<i class="fa-solid fa-check-circle"></i>';
      statusText.textContent = 'All Clear';
      statusDesc.textContent = 'No unusual water usage detected';
      showToast('No leaks detected. All clear!', 'success');
    }
    
    lastCheck.querySelector('strong').textContent = 'Just now';
  }, 2000);
}

// Leaderboard Functions
function loadLeaderboardTab() {
  renderLeaderboard();
  renderAchievements();
  renderTopPerformersChart();
}

function renderLeaderboard() {
  const container = document.getElementById('leaderboardList');
  
  // Skip top 3 as they're in the podium
  const list = leaderboardData.slice(3);
  
  container.innerHTML = list.map(item => `
    <div class="leaderboard-item">
      <div class="leaderboard-rank">${item.rank}</div>
      <div class="leaderboard-info">
        <div class="leaderboard-name">${item.name}</div>
        <div class="leaderboard-savings">${item.savings.toLocaleString()} gallons saved</div>
      </div>
    </div>
  `).join('');
}

function renderAchievements() {
  const container = document.getElementById('achievementsList');
  
  container.innerHTML = achievements.map(achievement => `
    <div class="achievement-card ${achievement.unlocked ? 'unlocked' : ''}">
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-title">${achievement.title}</div>
      <div class="achievement-desc">${achievement.desc}</div>
    </div>
  `).join('');
}

function renderTopPerformersChart() {
  const ctx = document.getElementById('topPerformersChart').getContext('2d');
  
  if (topPerformersChart) topPerformersChart.destroy();
  
  const top5 = leaderboardData.slice(0, 5);
  
  topPerformersChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: top5.map(item => item.name.split(' ')[0]),
      datasets: [{
        label: 'Water Saved (gal)',
        data: top5.map(item => item.savings),
        backgroundColor: [
          '#fbbf24',
          '#cbd5e1',
          '#fdba74',
          '#0ea5e9',
          '#10b981'
        ],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: 'y',
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          beginAtZero: true
        }
      }
    }
  });
}

function updateLeaderboard() {
  const period = document.getElementById('leaderboardPeriod').value;
  showToast(`Showing ${period} leaderboard`, 'info');
  // Would fetch new data based on period
}

// Challenges Functions
function loadChallengesTab() {
  renderActiveChallenges();
  renderCommunityChallenges();
}

function renderActiveChallenges() {
  const container = document.getElementById('activeChallenges');
  
  container.innerHTML = activeChallenges.map(challenge => {
    const progress = (challenge.current / challenge.goal) * 100;
    
    return `
      <div class="challenge-card">
        <div class="challenge-header">
          <div class="challenge-icon">
            <i class="fa-solid ${challenge.icon}"></i>
          </div>
          <span class="challenge-badge">Active</span>
        </div>
        <h4 class="challenge-title">${challenge.name}</h4>
        <p class="challenge-desc">Goal: Save ${challenge.goal} gallons in ${challenge.duration} days</p>
        <div class="challenge-progress">
          <div class="challenge-progress-text">
            <span>${challenge.current} / ${challenge.goal} gal</span>
            <span>${progress.toFixed(0)}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        <div class="challenge-footer">
          <span><i class="fa-solid fa-users"></i> ${challenge.participants} participants</span>
          <span><i class="fa-solid fa-calendar"></i> ${challenge.daysLeft} days left</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderCommunityChallenges() {
  const container = document.getElementById('communityChallenges');
  
  const communityChallenges = [
    { name: 'Month-Long Conservation', goal: 1000, participants: 42, icon: 'fa-medal' },
    { name: 'Lawn Watering Challenge', goal: 600, participants: 28, icon: 'fa-droplet' }
  ];
  
  container.innerHTML = communityChallenges.map(challenge => `
    <div class="challenge-card">
      <div class="challenge-header">
        <div class="challenge-icon">
          <i class="fa-solid ${challenge.icon}"></i>
        </div>
      </div>
      <h4 class="challenge-title">${challenge.name}</h4>
      <p class="challenge-desc">Goal: ${challenge.goal} gallons • ${challenge.participants} participants</p>
      <button class="primary-button" onclick="joinChallenge('${challenge.name}')">
        <i class="fa-solid fa-user-plus"></i> Join Challenge
      </button>
    </div>
  `).join('');
}

function handleChallengeSubmit(e) {
  e.preventDefault();
  
  const challengeName = document.getElementById('challengeName').value;
  const goal = document.getElementById('challengeGoal').value;
  const duration = document.getElementById('challengeDuration').value;
  
  showToast(`Challenge "${challengeName}" created successfully!`, 'success');
  
  // Reset form
  e.target.reset();
  
  // Add to active challenges (would normally save to backend)
  activeChallenges.push({
    id: activeChallenges.length + 1,
    name: challengeName,
    goal: parseInt(goal),
    current: 0,
    duration: parseInt(duration),
    daysLeft: parseInt(duration),
    participants: 1,
    icon: 'fa-flag'
  });
  
  renderActiveChallenges();
}

function joinChallenge(name) {
  showToast(`You joined "${name}"!`, 'success');
}

// Water Tips Functions
function loadTipsTab() {
  renderWaterTips();
}

function renderWaterTips() {
  const container = document.getElementById('waterTipsGrid');
  
  container.innerHTML = waterTips.map(tip => `
    <div class="water-tip-card">
      <div class="tip-card-header">
        <div class="tip-card-icon">
          <i class="fa-solid ${tip.icon}"></i>
        </div>
        <h4 class="tip-card-title">${tip.title}</h4>
      </div>
      <p class="tip-card-desc">${tip.description}</p>
      <div class="tip-card-savings">
        <i class="fa-solid fa-droplet"></i>
        <span>${tip.savings}</span>
      </div>
    </div>
  `).join('');
}

// Modal Functions
function openReportModal() {
  document.getElementById('reportLeakModal').classList.add('active');
}

function closeReportModal() {
  document.getElementById('reportLeakModal').classList.remove('active');
}

function handleLeakReport(e) {
  e.preventDefault();
  
  const location = document.getElementById('leakLocation').value;
  const type = document.getElementById('leakType').value;
  const severity = document.getElementById('leakSeverity').value;
  
  showToast('Leak report submitted successfully!', 'success');
  closeReportModal();
  
  // Reset form
  e.target.reset();
  
  // Add to leak alerts
  leakAlerts.unshift({
    id: leakAlerts.length + 1,
    title: `${type} - ${location}`,
    description: `${severity} severity leak reported`,
    time: 'Just now',
    status: 'active',
    severity: severity
  });
  
  renderLeakAlerts();
  document.getElementById('activeAlerts').textContent = leakAlerts.filter(a => a.status === 'active').length;
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

function refreshData() {
  showToast('Refreshing water data...', 'info');
  
  setTimeout(() => {
    // Update random values
    const newUsage = Math.floor(Math.random() * 50) + 260;
    document.getElementById('todayUsage').textContent = `${newUsage} gal`;
    
    showToast('Data refreshed successfully!', 'success');
  }, 1000);
}

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Export for external use
window.waterDashboard = {
  switchTab,
  refreshData,
  runLeakCheck,
  openReportModal,
  closeReportModal
};
