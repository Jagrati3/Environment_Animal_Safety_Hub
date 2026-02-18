// Waste Audit & Reduction Challenge JavaScript

// Sample Data
const wasteLogs = [
  { id: 1, date: '2026-02-04', category: 'plastic', amount: 0.15, disposal: 'recycling', notes: 'Plastic bottles' },
  { id: 2, date: '2026-02-03', category: 'food', amount: 0.3, disposal: 'composting', notes: 'Organic waste' },
  { id: 3, date: '2026-02-02', category: 'paper', amount: 0.1, disposal: 'recycling', notes: 'Cardboard boxes' },
  { id: 4, date: '2026-02-01', category: 'plastic', amount: 0.2, disposal: 'landfill', notes: 'Packaging' },
  { id: 5, date: '2026-01-31', category: 'glass', amount: 0.5, disposal: 'recycling', notes: 'Glass containers' },
];

const leaderboardUsers = [
  { rank: 1, name: 'Alex Johnson', reduction: 42, savings: 385, consistency: 95 },
  { rank: 2, name: 'Sarah Williams', reduction: 35, savings: 298, consistency: 88 },
  { rank: 3, name: 'Maria Chen', reduction: 28, savings: 245, consistency: 82 },
  { rank: 4, name: 'James Brown', reduction: 25, savings: 210, consistency: 78 },
  { rank: 5, name: 'Emma Davis', reduction: 22, savings: 195, consistency: 75 },
];

const challenges = [
  {
    id: 1,
    title: 'Zero-Waste Week',
    icon: '🌱',
    description: 'Achieve zero waste to landfill for an entire week',
    participants: 234,
    prize: '$50 Gift Card',
    endDate: '2026-02-11',
    difficulty: 'Hard'
  },
  {
    id: 2,
    title: 'Plastic-Free February',
    icon: '♻️',
    description: 'Reduce plastic waste by 75% this month',
    participants: 456,
    prize: '$100 Amazon Card',
    endDate: '2026-02-28',
    difficulty: 'Medium'
  },
  {
    id: 3,
    title: 'Composting Champion',
    icon: '🥬',
    description: 'Compost 5kg of organic waste',
    participants: 189,
    prize: 'Eco Kit Bundle',
    endDate: '2026-02-18',
    difficulty: 'Easy'
  },
  {
    id: 4,
    title: '50% Reduction Challenge',
    icon: '📉',
    description: 'Cut your waste in half compared to last month',
    participants: 345,
    prize: '$75 Store Credit',
    endDate: '2026-02-25',
    difficulty: 'Hard'
  }
];

const badges = [
  { icon: '🌟', title: 'First Log', desc: 'Log your first waste item', unlocked: true },
  { icon: '📊', title: 'Data Collector', desc: 'Log waste 10 times', unlocked: true },
  { icon: '♻️', title: 'Recycling Expert', desc: 'Recycle 10kg of waste', unlocked: true },
  { icon: '🌱', title: 'Zero-Waste Week', desc: 'Achieve zero waste to landfill', unlocked: true },
  { icon: '📉', title: '50% Reduction', desc: 'Reduce waste by 50%', unlocked: true },
  { icon: '💚', title: 'Green Hero', desc: 'Divert 20kg of waste', unlocked: false },
  { icon: '🏆', title: 'Top Contributor', desc: 'Rank in top 10 leaderboard', unlocked: false },
  { icon: '⭐', title: 'Legend', desc: 'Achieve 75% reduction', unlocked: false }
];

const aiTips = [
  {
    category: 'Plastic Reduction',
    title: 'Switch to Reusable Alternatives',
    content: 'Your top waste category is plastic. Try using reusable shopping bags, water bottles, and containers to reduce plastic consumption by up to 30%.',
    impact: 'Could save 3-5kg per month'
  },
  {
    category: 'Food Waste',
    title: 'Start Meal Planning',
    content: 'Based on your logs, you generate significant food waste. Plan meals weekly and store food properly to reduce organic waste.',
    impact: 'Could save 2-3kg per month'
  },
  {
    category: 'Packaging',
    title: 'Buy in Bulk',
    content: 'Shop at bulk stores to reduce packaging waste. Your waste patterns show high packaging material.',
    impact: 'Could save 1-2kg per month'
  },
  {
    category: 'Composting',
    title: 'Start Home Composting',
    content: 'You have enough organic waste to benefit from composting. A simple compost bin can divert 40% of waste.',
    impact: 'Could save 2-4kg per month'
  }
];

// State
let currentTab = 'dashboard';
let userGoals = [
  { id: 1, type: 'percentage', target: 25, deadline: '2026-03-04', category: 'plastic', progress: 18 },
  { id: 2, type: 'weight', target: 15, deadline: '2026-02-28', category: '', progress: 12 }
];
let joinedChallenges = [1, 3];
let charts = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
});

function initializeApp() {
  updateHeaderStats();
  loadDashboard();
  loadLogs();
  loadGoals();
  loadLeaderboard();
  loadChallenges();
  loadBadges();
  loadTips();
}

function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll('.tab-link').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });
  
  // Forms
  document.getElementById('wasteLogForm').addEventListener('submit', handleWasteLogSubmit);
  document.getElementById('goalsForm').addEventListener('submit', handleGoalsSubmit);
  
  // Leaderboard filter
  document.getElementById('leaderboardFilter').addEventListener('change', updateLeaderboard);
  
  // Quick log buttons
  document.querySelectorAll('.quick-log-btn').forEach(btn => {
    btn.addEventListener('click', quickLogWaste);
  });
}

function updateHeaderStats() {
  const weeklyWaste = wasteLogs
    .filter(log => {
      const logDate = new Date(log.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return logDate >= weekAgo;
    })
    .reduce((sum, log) => sum + log.amount, 0);
  
  document.getElementById('weeklyWaste').textContent = weeklyWaste.toFixed(1);
  document.getElementById('reductionPercent').textContent = '18%';
  document.getElementById('costSavings').textContent = '$' + (weeklyWaste * 15).toFixed(0);
}

// Tab Switching
function switchTab(tabName) {
  currentTab = tabName;
  
  document.querySelectorAll('.tab-link').forEach(link => {
    link.classList.toggle('active', link.dataset.tab === tabName);
  });
  
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === tabName);
  });
  
  setTimeout(() => {
    Object.values(charts).forEach(chart => {
      if (chart && typeof chart.resize === 'function') {
        chart.resize();
      }
    });
  }, 100);
}

// Dashboard
function loadDashboard() {
  renderWasteComposition();
  renderWeeklyTrend();
  renderMonthlyCostChart();
  renderRecentLogs();
}

function renderWasteComposition() {
  const wasteByCategory = {};
  wasteLogs.forEach(log => {
    wasteByCategory[log.category] = (wasteByCategory[log.category] || 0) + log.amount;
  });
  
  const categoryLabels = {
    plastic: 'Plastic',
    paper: 'Paper',
    food: 'Food',
    glass: 'Glass',
    electronics: 'Electronics',
    textiles: 'Textiles',
    metal: 'Metal',
    hazardous: 'Hazardous',
    other: 'Other'
  };
  
  // Chart
  const ctx = document.getElementById('wasteCompositionChart');
  if (charts.composition) charts.composition.destroy();
  
  charts.composition = new Chart(ctx.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(wasteByCategory).map(k => categoryLabels[k]),
      datasets: [{
        data: Object.values(wasteByCategory),
        backgroundColor: ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4', '#ec4899', '#6b7280', '#14b8a6']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { position: 'bottom', labels: { padding: 15 } } }
    }
  });
  
  // Breakdown items
  const container = document.getElementById('wasteBreakdownItems');
  container.innerHTML = Object.entries(wasteByCategory).map(([cat, amount]) => {
    const percent = ((amount / Object.values(wasteByCategory).reduce((a, b) => a + b, 0)) * 100).toFixed(0);
    return `
      <div class="breakdown-item">
        <div class="breakdown-item-label">${categoryLabels[cat]}</div>
        <div>
          <div class="breakdown-item-value">${amount.toFixed(2)} kg</div>
          <div class="breakdown-item-percent">${percent}%</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderWeeklyTrend() {
  const ctx = document.getElementById('weeklyTrendChart');
  if (charts.trend) charts.trend.destroy();
  
  charts.trend = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Waste (kg)',
        data: [2.1, 1.8, 2.4, 1.9, 2.2, 1.5, 1.6],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

function renderMonthlyCostChart() {
  const ctx = document.getElementById('monthlyCostChart');
  if (charts.cost) charts.cost.destroy();
  
  charts.cost = new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March (est)'],
      datasets: [{
        label: 'Disposal Cost ($)',
        data: [120, 98, 82],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
  
  // Savings info
  document.getElementById('totalSavings').textContent = '$285';
  document.getElementById('landfillDiverted').textContent = '12.4 kg';
  document.getElementById('co2Prevented').textContent = '3.1 kg';
}

function renderRecentLogs() {
  const container = document.getElementById('recentLogsList');
  
  const categoryNames = {
    plastic: 'Plastic',
    paper: 'Paper & Cardboard',
    food: 'Food & Organic',
    electronics: 'Electronics',
    textiles: 'Textiles',
    metal: 'Metal',
    glass: 'Glass',
    hazardous: 'Hazardous',
    other: 'Other'
  };
  
  container.innerHTML = wasteLogs.slice(0, 5).map(log => {
    const date = new Date(log.date);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return `
      <div class="log-item">
        <div class="log-header">
          <div class="log-category">${categoryNames[log.category]}</div>
          <div class="log-amount">${log.amount.toFixed(2)} kg</div>
        </div>
        <div class="log-meta">
          <span>${dateStr}</span>
          <span class="log-disposal">${log.disposal}</span>
          ${log.notes ? `<span>${log.notes}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// Log Waste
function handleWasteLogSubmit(e) {
  e.preventDefault();
  
  const newLog = {
    id: wasteLogs.length + 1,
    date: document.getElementById('wasteDate').value,
    category: document.getElementById('wasteCategory').value,
    amount: parseFloat(document.getElementById('wasteAmount').value),
    disposal: document.getElementById('wasteDisposal').value,
    notes: document.getElementById('wasteNotes').value
  };
  
  wasteLogs.push(newLog);
  e.target.reset();
  loadDashboard();
  loadLogs();
  updateHeaderStats();
  showToast('Waste logged successfully!', 'success');
}

function quickLogWaste(e) {
  const btn = e.currentTarget;
  const category = btn.dataset.category;
  const amount = parseFloat(btn.dataset.amount);
  
  const newLog = {
    id: wasteLogs.length + 1,
    date: new Date().toISOString().split('T')[0],
    category: category,
    amount: amount,
    disposal: 'landfill',
    notes: ''
  };
  
  wasteLogs.push(newLog);
  loadDashboard();
  updateHeaderStats();
  showToast(`${amount}kg of ${category} logged!`, 'success');
}

function loadLogs() {
  // Logs are displayed in dashboard
}

// Goals
function handleGoalsSubmit(e) {
  e.preventDefault();
  
  const newGoal = {
    id: userGoals.length + 1,
    type: document.getElementById('goalType').value,
    target: parseFloat(document.getElementById('goalTarget').value),
    deadline: document.getElementById('goalDeadline').value,
    category: document.getElementById('goalCategory').value,
    progress: Math.floor(Math.random() * 50)
  };
  
  userGoals.push(newGoal);
  e.target.reset();
  loadGoals();
  showToast('Goal created successfully!', 'success');
}

function updateGoalDisplay() {
  const goalType = document.getElementById('goalType').value;
  const label = document.querySelector('label[for="goalTarget"]');
  
  if (goalType === 'percentage') {
    label.textContent = 'Reduction Percentage (%)';
  } else if (goalType === 'weight') {
    label.textContent = 'Target Weight (kg)';
  } else {
    label.textContent = 'Target Value';
  }
}

function loadGoals() {
  const container = document.getElementById('activeGoalsList');
  
  const goalTypeLabels = {
    percentage: 'Reduce by %',
    weight: 'Weight Target',
    zeroWaste: 'Zero-Waste Week'
  };
  
  if (userGoals.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No active goals yet. Create one above!</p>';
    return;
  }
  
  container.innerHTML = userGoals.map(goal => {
    const deadline = new Date(goal.deadline);
    const daysLeft = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));
    
    return `
      <div class="goal-item">
        <div class="goal-header">
          <div class="goal-title">${goalTypeLabels[goal.type]}: ${goal.target}${goal.type === 'percentage' ? '%' : goal.type === 'weight' ? 'kg' : ''}</div>
          <div class="goal-deadline">${daysLeft} days left</div>
        </div>
        <div class="goal-progress">
          <div class="progress-text">
            <span>Progress</span>
            <span>${goal.progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${goal.progress}%"></div>
          </div>
        </div>
        <div class="goal-meta">
          ${goal.category ? `<span class="goal-tag">${goal.category}</span>` : ''}
          <span class="goal-tag">Created recently</span>
        </div>
      </div>
    `;
  }).join('');
}

// Leaderboard
function loadLeaderboard() {
  updateLeaderboard();
}

function updateLeaderboard() {
  const filter = document.getElementById('leaderboardFilter').value;
  const sorted = [...leaderboardUsers].sort((a, b) => b[filter] - a[filter]);
  
  // Update podium
  document.getElementById('lb-first-name').textContent = sorted[0].name;
  document.getElementById('lb-first-stat').textContent = sorted[0][filter] + (filter === 'reduction' ? '% reduction' : filter === 'savings' ? '% savings' : '% consistency');
  
  document.getElementById('lb-second-name').textContent = sorted[1].name;
  document.getElementById('lb-second-stat').textContent = sorted[1][filter] + (filter === 'reduction' ? '% reduction' : filter === 'savings' ? '% savings' : '% consistency');
  
  document.getElementById('lb-third-name').textContent = sorted[2].name;
  document.getElementById('lb-third-stat').textContent = sorted[2][filter] + (filter === 'reduction' ? '% reduction' : filter === 'savings' ? '% savings' : '% consistency');
  
  // Update list
  const container = document.getElementById('leaderboardList');
  container.innerHTML = sorted.slice(3).map((user, idx) => {
    const statValue = user[filter];
    const statLabel = filter === 'reduction' ? '% reduced' : filter === 'savings' ? '$ saved' : '% consistent';
    
    return `
      <div class="leaderboard-item">
        <div class="leaderboard-rank">#${idx + 4}</div>
        <div class="leaderboard-info">
          <div class="leaderboard-name">${user.name}</div>
          <div class="leaderboard-stat">${statValue} ${statLabel}</div>
        </div>
      </div>
    `;
  }).join('');
}

// Challenges
function loadChallenges() {
  const container = document.getElementById('challengesList');
  
  container.innerHTML = challenges.map(challenge => {
    const isJoined = joinedChallenges.includes(challenge.id);
    const endDate = new Date(challenge.endDate);
    const daysLeft = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24));
    
    return `
      <div class="challenge-card">
        <div class="challenge-header">
          <div class="challenge-icon">${challenge.icon}</div>
          <div>
            <div class="challenge-title">${challenge.title}</div>
          </div>
        </div>
        <div class="challenge-desc">${challenge.description}</div>
        <div class="challenge-details">
          <div class="challenge-detail-item">
            <span class="challenge-detail-label">Difficulty</span>
            <span class="challenge-detail-value">${challenge.difficulty}</span>
          </div>
          <div class="challenge-detail-item">
            <span class="challenge-detail-label">Participants</span>
            <span class="challenge-detail-value">${challenge.participants}</span>
          </div>
          <div class="challenge-detail-item">
            <span class="challenge-detail-label">Days Left</span>
            <span class="challenge-detail-value">${daysLeft}</span>
          </div>
        </div>
        <div class="challenge-prize">
          <div class="challenge-prize-label">Prize</div>
          <div class="challenge-prize-value">${challenge.prize}</div>
        </div>
        <button class="challenge-btn ${isJoined ? 'joined' : ''}" onclick="toggleChallenge(${challenge.id})">
          <i class="fa-solid ${isJoined ? 'fa-check' : 'fa-fire'}"></i> ${isJoined ? 'Joined' : 'Join Challenge'}
        </button>
      </div>
    `;
  }).join('');
}

function toggleChallenge(challengeId) {
  if (joinedChallenges.includes(challengeId)) {
    joinedChallenges = joinedChallenges.filter(id => id !== challengeId);
    showToast('Challenge removed', 'info');
  } else {
    joinedChallenges.push(challengeId);
    showToast('Joined challenge! Good luck!', 'success');
  }
  loadChallenges();
}

// Badges
function loadBadges() {
  const container = document.getElementById('badgesGrid');
  
  container.innerHTML = badges.map((badge, idx) => {
    return `
      <div class="badge-card ${badge.unlocked ? 'unlocked' : ''}">
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-title">${badge.title}</div>
        <div class="badge-desc">${badge.desc}</div>
        ${!badge.unlocked ? `<div class="badge-progress">${Math.floor(Math.random() * 50) + 50}%</div>` : ''}
      </div>
    `;
  }).join('');
}

// Tips
function loadTips() {
  renderTips();
}

function renderTips() {
  const container = document.getElementById('tipsList');
  
  container.innerHTML = aiTips.map((tip, idx) => {
    const icons = ['💡', '♻️', '🌱', '📊', '💰'];
    return `
      <div class="tip-card">
        <div class="tip-header">
          <div class="tip-icon">${icons[idx] || '💡'}</div>
          <div>
            <div class="tip-category">${tip.category}</div>
            <div class="tip-title">${tip.title}</div>
          </div>
        </div>
        <div class="tip-content">${tip.content}</div>
        <div class="tip-impact">
          <div class="tip-impact-item">
            <span class="tip-impact-label">Potential Impact</span>
            <span class="tip-impact-value">${tip.impact}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function generateNewTips() {
  showToast('Generating personalized tips...', 'info');
  setTimeout(() => {
    renderTips();
    showToast('New tips generated!', 'success');
  }, 1000);
}

// Utility Functions
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function closeModal() {
  document.getElementById('wasteModal').classList.remove('active');
}
