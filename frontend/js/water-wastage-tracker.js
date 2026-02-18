// Water Wastage Tracker JavaScript

// State Management
let waterData = {
  activities: [],
  dailyGoal: 300, // liters
  settings: {
    alerts: true,
    threshold: 0.8 // 80% of goal
  }
};

// Activity water usage estimates (liters per minute or per use)
const activityEstimates = {
  shower: 8, // liters per minute
  laundry: 50, // liters per load
  garden: 15, // liters per minute
  toilet: 6, // liters per flush
  dishes: 2, // liters per minute
  cooking: 5, // liters per usage
  'car-wash': 150, // liters per wash
  other: 10 // liters estimate
};

// Conservation tips database
const conservationTips = [
  {
    title: "Take Shorter Showers",
    description: "Reduce shower time by 2 minutes to save up to 16 liters per shower.",
    savings: "16L/shower"
  },
  {
    title: "Fix Leaky Faucets",
    description: "A dripping faucet can waste up to 15 liters per day. Fix those leaks!",
    savings: "15L/day"
  },
  {
    title: "Install Low-Flow Fixtures",
    description: "Low-flow showerheads can reduce water usage by 50% without sacrificing pressure.",
    savings: "50% reduction"
  },
  {
    title: "Run Full Loads Only",
    description: "Wait until you have a full load before running the washing machine or dishwasher.",
    savings: "40L/load"
  },
  {
    title: "Turn Off Tap While Brushing",
    description: "Don't let water run while brushing teeth. Save up to 6 liters each time.",
    savings: "6L/brush"
  },
  {
    title: "Collect Rain Water",
    description: "Set up a rain barrel to collect water for watering plants and gardens.",
    savings: "100L/week"
  },
  {
    title: "Use Mulch in Garden",
    description: "Mulch helps soil retain moisture, reducing the need for frequent watering.",
    savings: "25% less watering"
  },
  {
    title: "Water Plants in Morning",
    description: "Water early morning to minimize evaporation and maximize absorption.",
    savings: "30% more efficient"
  },
  {
    title: "Install Dual-Flush Toilet",
    description: "Use less water for liquid waste with a dual-flush system.",
    savings: "3L/flush"
  },
  {
    title: "Reuse Pasta Water",
    description: "Use cooled pasta water for watering plants - it contains nutrients!",
    savings: "5L/meal"
  },
  {
    title: "Wash Car with Bucket",
    description: "Use a bucket instead of running hose to wash your car.",
    savings: "100L/wash"
  },
  {
    title: "Defrost Food in Fridge",
    description: "Don't use running water to defrost food. Plan ahead and use the fridge.",
    savings: "8L/defrost"
  }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  initializeEventListeners();
  updateDashboard();
  loadTips();
  initializeHeatmap();
  initializeChart();
  setupVirtualWaterCalculator();
  
  // Set current time as default
  const now = new Date();
  const dateTimeInput = document.getElementById('usageTime');
  if (dateTimeInput) {
    const localDateTime = now.toISOString().slice(0, 16);
    dateTimeInput.value = localDateTime;
  }
});

// Load data from localStorage
function loadData() {
  const saved = localStorage.getItem('waterTrackerData');
  if (saved) {
    waterData = JSON.parse(saved);
  }
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('waterTrackerData', JSON.stringify(waterData));
}

// Initialize event listeners
function initializeEventListeners() {
  // Usage form submission
  const usageForm = document.getElementById('usageForm');
  if (usageForm) {
    usageForm.addEventListener('submit', handleUsageSubmit);
  }

  // Activity type change - auto-calculate water amount
  const activityType = document.getElementById('activityType');
  const duration = document.getElementById('duration');
  
  if (activityType && duration) {
    activityType.addEventListener('change', autoCalculateWater);
    duration.addEventListener('input', autoCalculateWater);
  }
}

// Auto-calculate water usage
function autoCalculateWater() {
  const activityType = document.getElementById('activityType').value;
  const duration = parseFloat(document.getElementById('duration').value) || 0;
  const waterAmountInput = document.getElementById('waterAmount');
  
  if (activityType && duration > 0) {
    const estimate = activityEstimates[activityType];
    let calculatedAmount;
    
    if (activityType === 'laundry' || activityType === 'car-wash' || activityType === 'cooking') {
      calculatedAmount = estimate; // Fixed amount
    } else {
      calculatedAmount = estimate * duration; // Per minute
    }
    
    waterAmountInput.value = calculatedAmount.toFixed(1);
  }
}

// Handle usage form submission
function handleUsageSubmit(e) {
  e.preventDefault();
  
  const activityType = document.getElementById('activityType').value;
  const duration = parseFloat(document.getElementById('duration').value) || 0;
  const waterAmount = parseFloat(document.getElementById('waterAmount').value);
  const usageTime = document.getElementById('usageTime').value;
  const notes = document.getElementById('notes').value;
  
  if (!activityType || !waterAmount || !usageTime) {
    showAlert('Please fill in all required fields', 'warning');
    return;
  }
  
  const activity = {
    id: Date.now(),
    type: activityType,
    duration: duration,
    amount: waterAmount,
    time: new Date(usageTime),
    notes: notes,
    addedAt: new Date()
  };
  
  waterData.activities.push(activity);
  saveData();
  updateDashboard();
  checkThreshold();
  
  // Reset form
  document.getElementById('usageForm').reset();
  const now = new Date();
  document.getElementById('usageTime').value = now.toISOString().slice(0, 16);
  
  showAlert('Water usage logged successfully!', 'success');
}

// Quick add functionality
function quickAdd(type, duration) {
  const estimate = activityEstimates[type];
  let amount;
  
  if (type === 'laundry' || type === 'car-wash') {
    amount = estimate;
  } else {
    amount = estimate * duration;
  }
  
  const activity = {
    id: Date.now(),
    type: type,
    duration: duration,
    amount: amount,
    time: new Date(),
    notes: 'Quick add',
    addedAt: new Date()
  };
  
  waterData.activities.push(activity);
  saveData();
  updateDashboard();
  checkThreshold();
  
  showAlert(`${getActivityName(type)} logged: ${amount}L`, 'success');
}

// Update dashboard statistics
function updateDashboard() {
  const today = getTodayActivities();
  const week = getWeekActivities();
  const month = getMonthActivities();
  
  // Today's usage
  const todayUsage = today.reduce((sum, act) => sum + act.amount, 0);
  document.getElementById('todayUsage').textContent = Math.round(todayUsage);
  document.getElementById('totalWaterUsed').textContent = Math.round(todayUsage);
  
  // Week's usage
  const weekUsage = week.reduce((sum, act) => sum + act.amount, 0);
  document.getElementById('weekUsage').textContent = Math.round(weekUsage);
  
  // Month average
  const monthUsage = month.reduce((sum, act) => sum + act.amount, 0);
  const daysInMonth = new Date().getDate();
  const monthAverage = daysInMonth > 0 ? monthUsage / daysInMonth : 0;
  document.getElementById('monthAverage').textContent = Math.round(monthAverage);
  
  // Update status badges
  updateStatusBadges(todayUsage);
  
  // Update goal progress
  updateGoalProgress(todayUsage);
  
  // Update comparison
  updateComparison(monthAverage);
  
  // Update activity log
  updateActivityLog();
  
  // Update breakdown chart
  updateBreakdownChart();
  
  // Update footer stats
  updateFooterStats();
}

// Update status badges
function updateStatusBadges(todayUsage) {
  const todayStatus = document.getElementById('todayStatus');
  const goal = waterData.dailyGoal;
  
  if (todayUsage < goal * 0.7) {
    todayStatus.textContent = 'Excellent!';
    todayStatus.style.background = '#d1fae5';
    todayStatus.style.color = '#059669';
  } else if (todayUsage < goal) {
    todayStatus.textContent = 'On Track';
    todayStatus.style.background = '#dbeafe';
    todayStatus.style.color = '#0369a1';
  } else if (todayUsage < goal * 1.2) {
    todayStatus.textContent = 'Near Limit';
    todayStatus.style.background = '#fef3c7';
    todayStatus.style.color = '#92400e';
  } else {
    todayStatus.textContent = 'Over Limit';
    todayStatus.style.background = '#fee2e2';
    todayStatus.style.color = '#991b1b';
  }
}

// Update goal progress
function updateGoalProgress(todayUsage) {
  const goal = waterData.dailyGoal;
  const percentage = Math.min((todayUsage / goal) * 100, 100);
  
  document.getElementById('goalValue').textContent = goal;
  document.getElementById('currentGoalDisplay').textContent = `${goal} L`;
  
  const progressBar = document.getElementById('goalProgressBar');
  const progressFill = document.getElementById('goalProgressFill');
  const progressText = document.getElementById('goalProgressText');
  
  if (progressBar) progressBar.style.width = `${percentage}%`;
  if (progressFill) progressFill.style.width = `${percentage}%`;
  if (progressText) progressText.textContent = `${Math.round(percentage)}% of daily goal used`;
  
  // Change color based on percentage
  if (progressFill) {
    if (percentage < 70) {
      progressFill.style.background = 'linear-gradient(90deg, #10b981, #059669)';
    } else if (percentage < 100) {
      progressFill.style.background = 'linear-gradient(90deg, #f59e0b, #d97706)';
    } else {
      progressFill.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
    }
  }
}

// Update comparison chart
function updateComparison(yourAverage) {
  const cityAverage = 350;
  const nationalAverage = 425;
  const maxValue = Math.max(yourAverage, nationalAverage);
  
  const yourPercentage = (yourAverage / maxValue) * 100;
  
  const yourBar = document.getElementById('yourUsageBar');
  const yourValue = document.getElementById('yourUsageValue');
  const comparisonInsight = document.getElementById('comparisonInsight');
  const comparisonBadge = document.getElementById('comparisonBadge');
  
  if (yourBar && yourValue) {
    yourBar.style.width = `${yourPercentage}%`;
    yourValue.textContent = `${Math.round(yourAverage)}L`;
  }
  
  // Update insight message
  if (comparisonInsight) {
    const difference = cityAverage - yourAverage;
    if (difference > 0) {
      comparisonInsight.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Great job! You're using ${Math.round(difference)}L less than the city average daily.</p>
      `;
      if (comparisonBadge) {
        comparisonBadge.textContent = 'Below Average';
        comparisonBadge.style.background = '#d1fae5';
        comparisonBadge.style.color = '#059669';
      }
    } else if (difference < 0) {
      comparisonInsight.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <p>You're using ${Math.round(Math.abs(difference))}L more than the city average. Try to reduce!</p>
      `;
      if (comparisonBadge) {
        comparisonBadge.textContent = 'Above Average';
        comparisonBadge.style.background = '#fee2e2';
        comparisonBadge.style.color = '#991b1b';
      }
    } else {
      comparisonInsight.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <p>You're right at the city average. Keep it up!</p>
      `;
    }
  }
}

// Update activity log
function updateActivityLog() {
  const activityLog = document.getElementById('activityLog');
  const activities = [...waterData.activities].reverse().slice(0, 20); // Show last 20
  
  if (activities.length === 0) {
    activityLog.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-droplet"></i>
        <p>No water usage logged yet</p>
        <small>Start tracking your water consumption to see your activity here</small>
      </div>
    `;
    return;
  }
  
  activityLog.innerHTML = activities.map(activity => `
    <div class="activity-item">
      <div class="activity-icon">
        ${getActivityIcon(activity.type)}
      </div>
      <div class="activity-details">
        <h4>${getActivityName(activity.type)}</h4>
        <p>${formatDate(activity.time)}${activity.notes ? ` • ${activity.notes}` : ''}</p>
      </div>
      <div class="activity-amount">${Math.round(activity.amount)}L</div>
      <div class="activity-actions">
        <button class="btn-action" onclick="editActivity(${activity.id})" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-action delete" onclick="deleteActivity(${activity.id})" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// Update breakdown chart
let breakdownChart = null;

function updateBreakdownChart() {
  const canvas = document.getElementById('usageBreakdownChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const activities = getMonthActivities();
  
  // Group by type
  const breakdown = {};
  activities.forEach(activity => {
    if (!breakdown[activity.type]) {
      breakdown[activity.type] = 0;
    }
    breakdown[activity.type] += activity.amount;
  });
  
  const labels = Object.keys(breakdown).map(type => getActivityName(type));
  const data = Object.values(breakdown);
  const colors = [
    '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', 
    '#ef4444', '#ec4899', '#6366f1', '#14b8a6'
  ];
  
  if (breakdownChart) {
    breakdownChart.destroy();
  }
  
  breakdownChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, labels.length),
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${Math.round(value)}L (${percentage}%)`;
            }
          }
        }
      }
    }
  });
  
  // Update legend
  updateBreakdownLegend(breakdown, colors);
}

function updateBreakdownLegend(breakdown, colors) {
  const legend = document.getElementById('breakdownLegend');
  if (!legend) return;
  
  const entries = Object.entries(breakdown);
  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
  
  legend.innerHTML = entries.map(([type, amount], index) => `
    <div class="legend-item">
      <div class="legend-color" style="background: ${colors[index]}"></div>
      <span class="legend-text">${getActivityName(type)}</span>
      <span class="legend-value">${Math.round(amount)}L</span>
    </div>
  `).join('');
}

// Initialize chart placeholder
function initializeChart() {
  const canvas = document.getElementById('usageBreakdownChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  breakdownChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['No Data'],
      datasets: [{
        data: [1],
        backgroundColor: ['#e5e7eb'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

// Initialize and update heatmap
function initializeHeatmap() {
  changeHeatmapView('week');
}

function changeHeatmapView(view) {
  // Update button states
  document.querySelectorAll('.heatmap-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  const container = document.getElementById('heatmapContainer');
  if (!container) return;
  
  const activities = view === 'week' ? getWeekActivities() : getMonthActivities();
  
  // Create heatmap grid
  const days = view === 'week' ? 7 : 30;
  const hours = 24;
  
  // Initialize data structure
  const heatmapData = {};
  const today = new Date();
  
  for (let d = 0; d < days; d++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (days - 1 - d));
    const dayKey = date.toISOString().split('T')[0];
    heatmapData[dayKey] = new Array(hours).fill(0);
  }
  
  // Populate with activity data
  activities.forEach(activity => {
    const date = new Date(activity.time);
    const dayKey = date.toISOString().split('T')[0];
    const hour = date.getHours();
    
    if (heatmapData[dayKey]) {
      heatmapData[dayKey][hour] += activity.amount;
    }
  });
  
  // Find max value for scaling
  const maxValue = Math.max(...Object.values(heatmapData).flat());
  
  // Generate HTML
  let html = '<div class="heatmap-grid">';
  
  // Header row (hours)
  html += '<div class="heatmap-label"></div>';
  for (let h = 0; h < hours; h++) {
    html += `<div class="heatmap-label">${h}</div>`;
  }
  
  // Data rows
  Object.entries(heatmapData).forEach(([day, values]) => {
    const date = new Date(day);
    const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    html += `<div class="heatmap-label">${dayLabel}</div>`;
    
    values.forEach((value, hour) => {
      const intensity = maxValue > 0 ? value / maxValue : 0;
      let level = 'none';
      
      if (intensity === 0) level = '0';
      else if (intensity < 0.25) level = 'low';
      else if (intensity < 0.5) level = 'medium';
      else if (intensity < 0.75) level = 'high';
      else level = 'very-high';
      
      html += `
        <div class="heatmap-cell" data-value="${level}" 
             title="${dayLabel} ${hour}:00 - ${Math.round(value)}L">
        </div>
      `;
    });
  });
  
  html += '</div>';
  container.innerHTML = html;
}

// Load conservation tips
function loadTips() {
  const container = document.getElementById('tipsContainer');
  if (!container) return;
  
  // Show 4 random tips initially
  const randomTips = shuffleArray([...conservationTips]).slice(0, 4);
  displayTips(randomTips);
}

function loadMoreTips() {
  const container = document.getElementById('tipsContainer');
  if (!container) return;
  
  const randomTips = shuffleArray([...conservationTips]).slice(0, 4);
  displayTips(randomTips);
}

function displayTips(tips) {
  const container = document.getElementById('tipsContainer');
  container.innerHTML = tips.map(tip => `
    <div class="tip-item">
      <h4>💡 ${tip.title}</h4>
      <p>${tip.description}</p>
      <span class="tip-savings">Save: ${tip.savings}</span>
    </div>
  `).join('');
}

// Virtual water footprint calculator
function setupVirtualWaterCalculator() {
  const inputs = document.querySelectorAll('.footprint-input');
  
  inputs.forEach(input => {
    input.addEventListener('input', calculateVirtualWater);
  });
  
  calculateVirtualWater();
}

function calculateVirtualWater() {
  const inputs = document.querySelectorAll('.footprint-input');
  let total = 0;
  
  inputs.forEach(input => {
    const quantity = parseFloat(input.value) || 0;
    const waterPerUnit = parseFloat(input.dataset.water);
    const itemTotal = quantity * waterPerUnit;
    
    total += itemTotal;
    
    // Update individual display
    const waterEquiv = input.parentElement.querySelector('.water-equiv');
    if (waterEquiv) {
      waterEquiv.textContent = `${Math.round(itemTotal)}L`;
    }
  });
  
  document.getElementById('virtualWaterTotal').textContent = `${Math.round(total)} L`;
}

// Goal management
function toggleGoalEdit() {
  const form = document.getElementById('goalEditForm');
  form.classList.toggle('hidden');
}

function setGoalPreset(value) {
  document.getElementById('newGoal').value = value;
}

function saveGoal() {
  const newGoal = parseFloat(document.getElementById('newGoal').value);
  
  if (newGoal < 50 || newGoal > 1000) {
    showAlert('Goal must be between 50 and 1000 liters', 'warning');
    return;
  }
  
  waterData.dailyGoal = newGoal;
  saveData();
  updateDashboard();
  toggleGoalEdit();
  showAlert('Goal updated successfully!', 'success');
}

// Social challenge
function joinNewChallenge() {
  showAlert('Challenge feature coming soon! Invite your neighbors to compete.', 'info');
}

// Filter functionality
function toggleFilter() {
  const filterPanel = document.getElementById('filterPanel');
  filterPanel.classList.toggle('hidden');
}

function applyFilter() {
  const activityFilter = document.getElementById('activityFilter').value;
  const dateFilter = document.getElementById('dateFilter').value;
  
  let filtered = [...waterData.activities];
  
  // Apply activity filter
  if (activityFilter !== 'all') {
    filtered = filtered.filter(act => act.type === activityFilter);
  }
  
  // Apply date filter
  const now = new Date();
  if (dateFilter === 'today') {
    filtered = filtered.filter(act => isSameDay(new Date(act.time), now));
  } else if (dateFilter === 'week') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    filtered = filtered.filter(act => new Date(act.time) >= weekAgo);
  } else if (dateFilter === 'month') {
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    filtered = filtered.filter(act => new Date(act.time) >= monthAgo);
  }
  
  // Update display with filtered data
  updateActivityLogWithData(filtered);
  showAlert(`Showing ${filtered.length} activities`, 'info');
}

function updateActivityLogWithData(activities) {
  const activityLog = document.getElementById('activityLog');
  const displayActivities = [...activities].reverse();
  
  if (displayActivities.length === 0) {
    activityLog.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-filter"></i>
        <p>No activities match your filters</p>
        <small>Try adjusting your filter criteria</small>
      </div>
    `;
    return;
  }
  
  activityLog.innerHTML = displayActivities.map(activity => `
    <div class="activity-item">
      <div class="activity-icon">
        ${getActivityIcon(activity.type)}
      </div>
      <div class="activity-details">
        <h4>${getActivityName(activity.type)}</h4>
        <p>${formatDate(activity.time)}${activity.notes ? ` • ${activity.notes}` : ''}</p>
      </div>
      <div class="activity-amount">${Math.round(activity.amount)}L</div>
      <div class="activity-actions">
        <button class="btn-action" onclick="editActivity(${activity.id})" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-action delete" onclick="deleteActivity(${activity.id})" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// Export data
function exportData() {
  const csv = generateCSV();
  downloadCSV(csv, 'water-usage-data.csv');
  showAlert('Data exported successfully!', 'success');
}

function generateCSV() {
  const headers = ['Date', 'Time', 'Activity', 'Duration (min)', 'Water Used (L)', 'Notes'];
  const rows = waterData.activities.map(act => {
    const date = new Date(act.time);
    return [
      date.toLocaleDateString(),
      date.toLocaleTimeString(),
      getActivityName(act.type),
      act.duration,
      act.amount,
      act.notes || ''
    ];
  });
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  return csvContent;
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Activity management
function editActivity(id) {
  const activity = waterData.activities.find(act => act.id === id);
  if (!activity) return;
  
  // Populate form
  document.getElementById('activityType').value = activity.type;
  document.getElementById('duration').value = activity.duration;
  document.getElementById('waterAmount').value = activity.amount;
  document.getElementById('usageTime').value = new Date(activity.time).toISOString().slice(0, 16);
  document.getElementById('notes').value = activity.notes || '';
  
  // Delete old entry
  deleteActivity(id, false);
  
  // Scroll to form
  document.querySelector('.usage-form-card').scrollIntoView({ behavior: 'smooth' });
  showAlert('Edit the activity and submit to save changes', 'info');
}

function deleteActivity(id, showMessage = true) {
  waterData.activities = waterData.activities.filter(act => act.id !== id);
  saveData();
  updateDashboard();
  
  if (showMessage) {
    showAlert('Activity deleted', 'success');
  }
}

// Alert system
function showAlert(message, type = 'info') {
  const banner = document.getElementById('alertBanner');
  const messageEl = document.getElementById('alertMessage');
  
  messageEl.textContent = message;
  banner.className = `alert-banner ${type}`;
  banner.classList.remove('hidden');
  
  // Auto-hide after 4 seconds
  setTimeout(() => {
    banner.classList.add('hidden');
  }, 4000);
}

function closeAlert() {
  document.getElementById('alertBanner').classList.add('hidden');
}

// Check threshold and show alerts
function checkThreshold() {
  if (!waterData.settings.alerts) return;
  
  const todayUsage = getTodayActivities().reduce((sum, act) => sum + act.amount, 0);
  const threshold = waterData.dailyGoal * waterData.settings.threshold;
  
  if (todayUsage >= waterData.dailyGoal) {
    showAlert('⚠️ You have exceeded your daily water goal!', 'danger');
  } else if (todayUsage >= threshold) {
    showAlert(`⚠️ You have used ${Math.round((todayUsage / waterData.dailyGoal) * 100)}% of your daily goal!`, 'warning');
  }
}

// Update footer stats
function updateFooterStats() {
  const allActivities = waterData.activities;
  const totalUsed = allActivities.reduce((sum, act) => sum + act.amount, 0);
  
  // Calculate savings (compared to average)
  const daysTracking = getUniqueDays(allActivities).length;
  const avgPerDay = daysTracking > 0 ? totalUsed / daysTracking : 0;
  const nationalAverage = 425;
  const totalSaved = Math.max(0, (nationalAverage - avgPerDay) * daysTracking);
  
  document.getElementById('totalSaved').textContent = `${Math.round(totalSaved)} L`;
  
  // Trees equivalent (approx 50L per tree per day)
  const treesWatered = Math.floor(totalSaved / 50);
  document.getElementById('treesEquivalent').textContent = treesWatered;
  
  // Streak calculation
  const streak = calculateStreak();
  document.getElementById('daysStreak').textContent = streak;
}

function calculateStreak() {
  if (waterData.activities.length === 0) return 0;
  
  const sortedDays = getUniqueDays(waterData.activities).sort((a, b) => b - a);
  const today = new Date().toDateString();
  
  let streak = 0;
  let currentDate = new Date();
  
  for (let i = 0; i < sortedDays.length; i++) {
    const dayStr = new Date(sortedDays[i]).toDateString();
    const expectedDay = new Date(currentDate).toDateString();
    
    if (dayStr === expectedDay) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
}

function getUniqueDays(activities) {
  const days = [...new Set(activities.map(act => 
    new Date(act.time).toDateString()
  ))];
  return days.map(d => new Date(d).getTime());
}

// Utility functions
function getTodayActivities() {
  const today = new Date();
  return waterData.activities.filter(act => 
    isSameDay(new Date(act.time), today)
  );
}

function getWeekActivities() {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return waterData.activities.filter(act => 
    new Date(act.time) >= weekAgo
  );
}

function getMonthActivities() {
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  return waterData.activities.filter(act => 
    new Date(act.time) >= monthAgo
  );
}

function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

function getActivityName(type) {
  const names = {
    'shower': 'Shower',
    'laundry': 'Laundry',
    'garden': 'Watering Garden',
    'toilet': 'Toilet Flush',
    'dishes': 'Washing Dishes',
    'cooking': 'Cooking',
    'car-wash': 'Car Wash',
    'other': 'Other'
  };
  return names[type] || type;
}

function getActivityIcon(type) {
  const icons = {
    'shower': '<i class="fas fa-shower"></i>',
    'laundry': '<i class="fas fa-tshirt"></i>',
    'garden': '<i class="fas fa-leaf"></i>',
    'toilet': '<i class="fas fa-toilet"></i>',
    'dishes': '<i class="fas fa-utensils"></i>',
    'cooking': '<i class="fas fa-fire"></i>',
    'car-wash': '<i class="fas fa-car"></i>',
    'other': '<i class="fas fa-droplet"></i>'
  };
  return icons[type] || '<i class="fas fa-droplet"></i>';
}

function formatDate(date) {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return d.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Update social challenge ranking
function updateChallengeSavings() {
  const weekActivities = getWeekActivities();
  const avgDaily = weekActivities.reduce((sum, act) => sum + act.amount, 0) / 7;
  const nationalAverage = 425;
  const savings = Math.round(nationalAverage - avgDaily);
  
  const savingsEl = document.getElementById('yourSavings');
  if (savingsEl) {
    savingsEl.textContent = savings > 0 ? `-${savings}L/day` : `+${Math.abs(savings)}L/day`;
  }
}

// Periodic updates
setInterval(() => {
  updateChallengeSavings();
}, 5000);
