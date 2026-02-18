// Energy Consumption Tracker JavaScript

// ===== CONFIGURATION =====
const COST_PER_KWH = 0.12; // USD per kWh (adjust based on local rates)
const CO2_PER_KWH = 0.92; // kg CO2 per kWh (average)

// ===== DATA STORAGE =====
let applianceData = JSON.parse(localStorage.getItem('energyApplianceData')) || [];
let dailyChart = null;
let applianceChart = null;

// ===== DEFAULT POWER RATINGS (WATTS) =====
const defaultPowerRatings = {
  'ac': 1500,
  'refrigerator': 150,
  'tv': 100,
  'lights': 60,
  'washing-machine': 500,
  'water-heater': 2000,
  'microwave': 1200,
  'fan': 75,
  'computer': 200,
  'dishwasher': 1800,
  'dryer': 3000,
  'other': 100
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  initializePage();
  setupFormHandlers();
  setupApplianceTypeChange();
  initializeCharts();
  updateDashboard();
  renderApplianceList();
  detectWastage();
  updateSummary();
  setDefaultDate();
});

// ===== SET DEFAULT DATE =====
function setDefaultDate() {
  const dateInput = document.getElementById('usageDate');
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
  dateInput.max = today;
}

// ===== AUTO-FILL POWER RATING =====
function setupApplianceTypeChange() {
  const applianceType = document.getElementById('applianceType');
  const powerRating = document.getElementById('powerRating');
  
  applianceType.addEventListener('change', function() {
    const selectedType = this.value;
    if (selectedType && defaultPowerRatings[selectedType]) {
      powerRating.value = defaultPowerRatings[selectedType];
    }
  });
}

// ===== PAGE INITIALIZATION =====
function initializePage() {
  // Set today's date as max for date input
  const dateInput = document.getElementById('usageDate');
  const today = new Date().toISOString().split('T')[0];
  dateInput.max = today;
}

// ===== FORM HANDLERS =====
function setupFormHandlers() {
  const form = document.getElementById('applianceForm');
  form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const applianceType = document.getElementById('applianceType').value;
  const powerRating = parseFloat(document.getElementById('powerRating').value);
  const hoursUsed = parseFloat(document.getElementById('hoursUsed').value);
  const usageDate = document.getElementById('usageDate').value;
  
  // Validate inputs
  if (!applianceType || !powerRating || !hoursUsed || !usageDate) {
    showAlert('Please fill all fields!', 'warning');
    return;
  }
  
  if (hoursUsed > 24) {
    showAlert('Hours used cannot exceed 24 hours per day!', 'warning');
    return;
  }
  
  // Calculate energy consumption (kWh)
  const energyKwh = (powerRating * hoursUsed) / 1000;
  
  // Create appliance entry
  const appliance = {
    id: Date.now(),
    type: applianceType,
    typeName: getApplianceName(applianceType),
    powerRating: powerRating,
    hoursUsed: hoursUsed,
    energyKwh: energyKwh,
    cost: energyKwh * COST_PER_KWH,
    co2: energyKwh * CO2_PER_KWH,
    date: usageDate,
    timestamp: Date.now()
  };
  
  // Add to data
  applianceData.push(appliance);
  saveData();
  
  // Update UI
  updateDashboard();
  renderApplianceList();
  updateCharts();
  detectWastage();
  updateSummary();
  
  // Reset form
  document.getElementById('applianceForm').reset();
  setDefaultDate();
  
  showAlert(`${appliance.typeName} added successfully! Energy: ${energyKwh.toFixed(2)} kWh`, 'success');
}

// ===== GET APPLIANCE NAME =====
function getApplianceName(type) {
  const names = {
    'ac': 'Air Conditioner',
    'refrigerator': 'Refrigerator',
    'tv': 'Television',
    'lights': 'Lights',
    'washing-machine': 'Washing Machine',
    'water-heater': 'Water Heater',
    'microwave': 'Microwave',
    'fan': 'Ceiling Fan',
    'computer': 'Computer/Laptop',
    'dishwasher': 'Dishwasher',
    'dryer': 'Clothes Dryer',
    'other': 'Other Appliance'
  };
  return names[type] || type;
}

// ===== RESET FORM =====
function resetForm() {
  document.getElementById('applianceForm').reset();
  setDefaultDate();
}

// ===== DATA PERSISTENCE =====
function saveData() {
  localStorage.setItem('energyApplianceData', JSON.stringify(applianceData));
}

// ===== UPDATE DASHBOARD STATS =====
function updateDashboard() {
  const today = new Date().toISOString().split('T')[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  // Today's usage
  const todayData = applianceData.filter(a => a.date === today);
  const todayUsage = todayData.reduce((sum, a) => sum + a.energyKwh, 0);
  document.getElementById('todayUsage').textContent = todayUsage.toFixed(2);
  
  // Status badge
  const todayStatus = document.getElementById('todayStatus');
  if (todayUsage < 10) {
    todayStatus.textContent = 'Excellent';
    todayStatus.style.background = '#d1fae5';
    todayStatus.style.color = '#059669';
  } else if (todayUsage < 20) {
    todayStatus.textContent = 'Normal';
    todayStatus.style.background = '#dbeafe';
    todayStatus.style.color = '#1e40af';
  } else {
    todayStatus.textContent = 'High';
    todayStatus.style.background = '#fee2e2';
    todayStatus.style.color = '#dc2626';
  }
  
  // Week usage
  const weekData = applianceData.filter(a => a.date >= weekAgo);
  const weekUsage = weekData.reduce((sum, a) => sum + a.energyKwh, 0);
  document.getElementById('weekUsage').textContent = weekUsage.toFixed(2);
  
  // Week change (mock calculation - compare with previous week)
  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const prevWeekData = applianceData.filter(a => a.date >= twoWeeksAgo && a.date < weekAgo);
  const prevWeekUsage = prevWeekData.reduce((sum, a) => sum + a.energyKwh, 0);
  const weekChange = prevWeekUsage > 0 ? ((weekUsage - prevWeekUsage) / prevWeekUsage * 100) : 0;
  
  const weekChangeEl = document.getElementById('weekChange');
  weekChangeEl.textContent = `${weekChange > 0 ? '+' : ''}${weekChange.toFixed(1)}%`;
  weekChangeEl.style.background = weekChange > 0 ? '#fee2e2' : '#d1fae5';
  weekChangeEl.style.color = weekChange > 0 ? '#dc2626' : '#059669';
  
  // Month cost
  const monthData = applianceData.filter(a => a.date >= monthAgo);
  const monthCost = monthData.reduce((sum, a) => sum + a.cost, 0);
  document.getElementById('energyCost').textContent = `$${monthCost.toFixed(2)}`;
  
  // Total energy this month
  const monthEnergy = monthData.reduce((sum, a) => sum + a.energyKwh, 0);
  document.getElementById('totalEnergyKwh').textContent = monthEnergy.toFixed(1);
  
  // CO2 emissions
  const monthCO2 = monthData.reduce((sum, a) => sum + a.co2, 0);
  document.getElementById('co2Emissions').textContent = monthCO2.toFixed(2);
  
  // Progress bar for emissions (goal: under 200kg per month)
  const emissionGoal = 200;
  const emissionProgress = Math.min((monthCO2 / emissionGoal) * 100, 100);
  document.getElementById('emissionProgressBar').style.width = `${emissionProgress}%`;
}

// ===== RENDER APPLIANCE LIST =====
function renderApplianceList() {
  const listContainer = document.getElementById('applianceList');
  
  if (applianceData.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-plug"></i>
        <p>No appliances logged yet</p>
        <span>Start tracking your energy consumption above!</span>
      </div>
    `;
    return;
  }
  
  // Sort by date (newest first)
  const sortedData = [...applianceData].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  listContainer.innerHTML = sortedData.map(appliance => `
    <div class="appliance-item" data-id="${appliance.id}" data-type="${appliance.type}">
      <div class="appliance-icon-box ${appliance.type}">
        <i class="${getApplianceIcon(appliance.type)}"></i>
      </div>
      <div class="appliance-details">
        <h4>${appliance.typeName}</h4>
        <div class="appliance-meta">
          <span><i class="fas fa-calendar"></i> ${formatDate(appliance.date)}</span>
          <span><i class="fas fa-plug"></i> ${appliance.powerRating}W</span>
          <span><i class="fas fa-clock"></i> ${appliance.hoursUsed}h</span>
        </div>
      </div>
      <div class="energy-badge">
        ${appliance.energyKwh.toFixed(2)} kWh
        <small>$${appliance.cost.toFixed(2)}</small>
      </div>
      <div class="appliance-actions">
        <button class="btn-icon btn-delete" onclick="deleteAppliance(${appliance.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// ===== GET APPLIANCE ICON =====
function getApplianceIcon(type) {
  const icons = {
    'ac': 'fas fa-snowflake',
    'refrigerator': 'fas fa-mug-hot',
    'tv': 'fas fa-tv',
    'lights': 'fas fa-lightbulb',
    'washing-machine': 'fas fa-soap',
    'water-heater': 'fas fa-fire',
    'microwave': 'fas fa-temperature-high',
    'fan': 'fas fa-fan',
    'computer': 'fas fa-laptop',
    'dishwasher': 'fas fa-utensils',
    'dryer': 'fas fa-wind',
    'other': 'fas fa-plug'
  };
  return icons[type] || 'fas fa-plug';
}

// ===== FORMAT DATE =====
function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (dateString === today.toISOString().split('T')[0]) {
    return 'Today';
  } else if (dateString === yesterday.toISOString().split('T')[0]) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}

// ===== DELETE APPLIANCE =====
function deleteAppliance(id) {
  if (confirm('Are you sure you want to delete this appliance entry?')) {
    applianceData = applianceData.filter(a => a.id !== id);
    saveData();
    updateDashboard();
    renderApplianceList();
    updateCharts();
    detectWastage();
    updateSummary();
    showAlert('Appliance entry deleted', 'success');
  }
}

// ===== FILTER APPLIANCES =====
function filterAppliances() {
  const searchTerm = document.getElementById('searchAppliance').value.toLowerCase();
  const filterType = document.getElementById('filterAppliance').value;
  
  const items = document.querySelectorAll('.appliance-item');
  
  items.forEach(item => {
    const type = item.getAttribute('data-type');
    const text = item.textContent.toLowerCase();
    
    const matchesSearch = text.includes(searchTerm);
    const matchesFilter = filterType === 'all' || type === filterType;
    
    if (matchesSearch && matchesFilter) {
      item.style.display = 'grid';
    } else {
      item.style.display = 'none';
    }
  });
}

// ===== INITIALIZE CHARTS =====
function initializeCharts() {
  createDailyChart();
  createApplianceChart();
}

// ===== CREATE DAILY CHART =====
function createDailyChart() {
  const ctx = document.getElementById('dailyChart').getContext('2d');
  
  // Get last 7 days data
  const last7Days = getLast7Days();
  const dailyData = last7Days.map(date => {
    const dayData = applianceData.filter(a => a.date === date);
    return dayData.reduce((sum, a) => sum + a.energyKwh, 0);
  });
  
  dailyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: last7Days.map(date => {
        const d = new Date(date);
        return `${d.getMonth() + 1}/${d.getDate()}`;
      }),
      datasets: [{
        label: 'Energy (kWh)',
        data: dailyData,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 8
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
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          callbacks: {
            label: function(context) {
              return `Energy: ${context.parsed.y.toFixed(2)} kWh`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + ' kWh';
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
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

// ===== CREATE APPLIANCE CHART =====
function createApplianceChart() {
  const ctx = document.getElementById('applianceChart').getContext('2d');
  
  // Aggregate data by appliance type
  const applianceTypes = {};
  applianceData.forEach(appliance => {
    if (!applianceTypes[appliance.typeName]) {
      applianceTypes[appliance.typeName] = 0;
    }
    applianceTypes[appliance.typeName] += appliance.energyKwh;
  });
  
  const labels = Object.keys(applianceTypes);
  const data = Object.values(applianceTypes);
  
  const colors = [
    'rgba(59, 130, 246, 0.8)',
    'rgba(251, 191, 36, 0.8)',
    'rgba(16, 185, 129, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(139, 92, 246, 0.8)',
    'rgba(236, 72, 153, 0.8)',
    'rgba(234, 88, 12, 0.8)',
    'rgba(14, 165, 233, 0.8)'
  ];
  
  applianceChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: '#fff',
        borderWidth: 3
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
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleColor: '#fff',
          bodyColor: '#fff',
          borderWidth: 2,
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value.toFixed(2)} kWh (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

// ===== UPDATE CHARTS =====
function updateCharts() {
  if (dailyChart) {
    dailyChart.destroy();
  }
  if (applianceChart) {
    applianceChart.destroy();
  }
  createDailyChart();
  createApplianceChart();
}

// ===== UPDATE CHART PERIOD =====
function updateChartPeriod(period) {
  // Update button states
  document.querySelectorAll('.chart-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Recreate chart with new period
  if (dailyChart) {
    dailyChart.destroy();
  }
  
  const ctx = document.getElementById('dailyChart').getContext('2d');
  const days = period === 'week' ? 7 : 30;
  const lastNDays = getLastNDays(days);
  const dailyData = lastNDays.map(date => {
    const dayData = applianceData.filter(a => a.date === date);
    return dayData.reduce((sum, a) => sum + a.energyKwh, 0);
  });
  
  dailyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: lastNDays.map(date => {
        const d = new Date(date);
        return `${d.getMonth() + 1}/${d.getDate()}`;
      }),
      datasets: [{
        label: 'Energy (kWh)',
        data: dailyData,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 8
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
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          callbacks: {
            label: function(context) {
              return `Energy: ${context.parsed.y.toFixed(2)} kWh`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + ' kWh';
            }
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

// ===== GET LAST N DAYS =====
function getLast7Days() {
  return getLastNDays(7);
}

function getLastNDays(n) {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
}

// ===== DETECT WASTAGE =====
function detectWastage() {
  const wastageGrid = document.getElementById('wastageGrid');
  const wastageIssues = [];
  
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const monthData = applianceData.filter(a => a.date >= monthAgo);
  
  // Group by appliance type
  const byType = {};
  monthData.forEach(appliance => {
    if (!byType[appliance.type]) {
      byType[appliance.type] = {
        typeName: appliance.typeName,
        totalEnergy: 0,
        totalHours: 0,
        count: 0,
        avgPower: 0
      };
    }
    byType[appliance.type].totalEnergy += appliance.energyKwh;
    byType[appliance.type].totalHours += appliance.hoursUsed;
    byType[appliance.type].count += 1;
    byType[appliance.type].avgPower += appliance.powerRating;
  });
  
  // Calculate averages and detect issues
  Object.keys(byType).forEach(type => {
    const data = byType[type];
    data.avgPower = data.avgPower / data.count;
    const avgHoursPerDay = data.totalHours / data.count;
    
    // AC running more than 12 hours per day
    if (type === 'ac' && avgHoursPerDay > 12) {
      wastageIssues.push({
        type: 'ac',
        title: 'AC Overuse Detected',
        severity: 'high',
        icon: 'fas fa-snowflake',
        description: `Your AC runs ${avgHoursPerDay.toFixed(1)} hours/day on average. This is significantly high.`,
        energy: data.totalEnergy.toFixed(2),
        cost: (data.totalEnergy * COST_PER_KWH).toFixed(2),
        recommendation: 'Set temperature to 24-26°C and use a timer. Consider using fans alongside AC.'
      });
    }
    
    // Refrigerator high consumption
    if (type === 'refrigerator' && data.totalEnergy > 150) {
      wastageIssues.push({
        type: 'refrigerator',
        title: 'High Refrigerator Consumption',
        severity: 'medium',
        icon: 'fas fa-mug-hot',
        description: 'Your refrigerator is consuming more energy than expected.',
        energy: data.totalEnergy.toFixed(2),
        cost: (data.totalEnergy * COST_PER_KWH).toFixed(2),
        recommendation: 'Check door seals, maintain proper temperature (3-5°C), and ensure proper ventilation.'
      });
    }
    
    // Lights running too long
    if (type === 'lights' && avgHoursPerDay > 8) {
      wastageIssues.push({
        type: 'lights',
        title: 'Excessive Lighting Usage',
        severity: 'medium',
        icon: 'fas fa-lightbulb',
        description: `Lights run ${avgHoursPerDay.toFixed(1)} hours/day. Consider energy-efficient alternatives.`,
        energy: data.totalEnergy.toFixed(2),
        cost: (data.totalEnergy * COST_PER_KWH).toFixed(2),
        recommendation: 'Switch to LED bulbs, use natural light, and install motion sensors.'
      });
    }
    
    // Water heater high usage
    if (type === 'water-heater' && avgHoursPerDay > 4) {
      wastageIssues.push({
        type: 'water-heater',
        title: 'Water Heater Overuse',
        severity: 'high',
        icon: 'fas fa-fire',
        description: 'Water heater is running longer than recommended.',
        energy: data.totalEnergy.toFixed(2),
        cost: (data.totalEnergy * COST_PER_KWH).toFixed(2),
        recommendation: 'Use a timer, lower temperature to 50-60°C, and insulate the tank.'
      });
    }
  });
  
  // Render wastage cards
  if (wastageIssues.length === 0) {
    wastageGrid.innerHTML = `
      <div class="no-wastage">
        <div class="no-wastage-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3>Great Job!</h3>
        <p>No significant energy wastage detected. Keep up the good work!</p>
      </div>
    `;
  } else {
    wastageGrid.innerHTML = wastageIssues.map(issue => `
      <div class="wastage-card">
        <div class="wastage-header">
          <div class="wastage-icon">
            <i class="${issue.icon}"></i>
          </div>
          <div class="wastage-title">
            <h4>${issue.title}</h4>
            <span class="wastage-severity ${issue.severity}">${issue.severity.toUpperCase()}</span>
          </div>
        </div>
        <p class="wastage-description">${issue.description}</p>
        <div class="wastage-stats">
          <div class="wastage-stat">
            <div class="wastage-stat-value">${issue.energy}</div>
            <div class="wastage-stat-label">kWh wasted</div>
          </div>
          <div class="wastage-stat">
            <div class="wastage-stat-value">$${issue.cost}</div>
            <div class="wastage-stat-label">Cost impact</div>
          </div>
        </div>
        <div class="wastage-recommendation">
          <strong>Recommendation:</strong>
          <span>${issue.recommendation}</span>
        </div>
      </div>
    `).join('');
  }
}

// ===== UPDATE SUMMARY =====
function updateSummary() {
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const monthData = applianceData.filter(a => a.date >= monthAgo);
  
  // Total energy
  const totalEnergy = monthData.reduce((sum, a) => sum + a.energyKwh, 0);
  document.getElementById('summaryTotalEnergy').textContent = `${totalEnergy.toFixed(2)} kWh`;
  
  // Total cost
  const totalCost = monthData.reduce((sum, a) => sum + a.cost, 0);
  document.getElementById('summaryTotalCost').textContent = `$${totalCost.toFixed(2)}`;
  
  // CO2 emissions
  const totalCO2 = monthData.reduce((sum, a) => sum + a.co2, 0);
  document.getElementById('summaryCO2').textContent = `${totalCO2.toFixed(2)} kg`;
  
  // Trees equivalent (1 tree absorbs ~21 kg CO2 per year, or 1.75 kg per month)
  const treesEquivalent = (totalCO2 / 1.75).toFixed(1);
  document.getElementById('summaryCO2Trend').innerHTML = `
    <i class="fas fa-leaf"></i> Equivalent to ${treesEquivalent} trees
  `;
  
  // Efficiency score (0-100, based on daily average)
  const daysInMonth = 30;
  const avgDailyEnergy = totalEnergy / daysInMonth;
  const efficiencyScore = Math.max(0, Math.min(100, 100 - (avgDailyEnergy * 2)));
  document.getElementById('summaryEfficiency').textContent = `${efficiencyScore.toFixed(0)}/100`;
  document.getElementById('efficiencyFill').style.width = `${efficiencyScore}%`;
}

// ===== EXPORT DATA =====
function exportData() {
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const monthData = applianceData.filter(a => a.date >= monthAgo);
  
  if (monthData.length === 0) {
    showAlert('No data to export!', 'warning');
    return;
  }
  
  // Create CSV content
  let csvContent = 'Date,Appliance,Power (W),Hours Used,Energy (kWh),Cost ($),CO2 (kg)\n';
  
  monthData.forEach(appliance => {
    csvContent += `${appliance.date},${appliance.typeName},${appliance.powerRating},${appliance.hoursUsed},${appliance.energyKwh.toFixed(2)},${appliance.cost.toFixed(2)},${appliance.co2.toFixed(2)}\n`;
  });
  
  // Add summary
  const totalEnergy = monthData.reduce((sum, a) => sum + a.energyKwh, 0);
  const totalCost = monthData.reduce((sum, a) => sum + a.cost, 0);
  const totalCO2 = monthData.reduce((sum, a) => sum + a.co2, 0);
  
  csvContent += `\nSummary\n`;
  csvContent += `Total Energy,${totalEnergy.toFixed(2)} kWh\n`;
  csvContent += `Total Cost,$${totalCost.toFixed(2)}\n`;
  csvContent += `Total CO2,${totalCO2.toFixed(2)} kg\n`;
  
  // Download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `energy-report-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showAlert('Report exported successfully!', 'success');
}

// ===== ALERT SYSTEM =====
function showAlert(message, type = 'info') {
  const banner = document.getElementById('alertBanner');
  const messageEl = document.getElementById('alertMessage');
  
  messageEl.textContent = message;
  banner.classList.remove('hidden');
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    closeAlert();
  }, 5000);
}

function closeAlert() {
  const banner = document.getElementById('alertBanner');
  banner.classList.add('hidden');
}
