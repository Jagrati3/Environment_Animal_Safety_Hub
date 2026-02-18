// Personal Carbon Footprint Tracker - JavaScript

class CarbonFootprintTracker {
  constructor() {
    this.activities = [];
    this.goals = {
      daily: 5,
      weekly: 35,
      monthly: 150,
    };
    this.emissionFactors = {
      car: 0.21, // kg CO2 per km
      'car-electric': 0.05,
      'public-transport': 0.05,
      flight: 0.255, // kg CO2 per km
      bike: 0,
      electricity: 0.29, // kg CO2 per kwh
      gas: 2.04, // kg CO2 per cubic meter
      water: 0.2, // kg CO2 per liter
      meat: 27, // kg CO2 per kg
      dairy: 1.3, // kg CO2 per liter
      vegetables: 0.5, // kg CO2 per kg
      shopping: 5, // kg CO2 per item
      waste: 0.5, // kg CO2 per kg
      recycling: -0.2, // kg CO2 per kg (offset)
    };
    this.tips = [
      {
        title: 'Reduce Car Usage',
        description: 'Use public transport or carpool to reduce emissions by up to 50%',
        impact: '2.1 kg CO₂ saved',
        icon: 'fas fa-bus',
      },
      {
        title: 'Switch to Plant-Based',
        description: 'Eating plant-based meals can reduce your food-related emissions by 75%',
        impact: '26.5 kg CO₂ saved',
        icon: 'fas fa-leaf',
      },
      {
        title: 'Energy Efficiency',
        description: 'Use LED bulbs and energy-efficient appliances to cut energy use by 40%',
        impact: '0.12 kg CO₂ saved',
        icon: 'fas fa-lightbulb',
      },
      {
        title: 'Reduce Water Usage',
        description: 'Take shorter showers and fix leaks to save water and emissions',
        impact: '0.2 kg CO₂ per 1L saved',
        icon: 'fas fa-tint',
      },
      {
        title: 'Buy Local Products',
        description: 'Reduce transportation emissions by buying locally produced goods',
        impact: '1.5 kg CO₂ saved',
        icon: 'fas fa-store',
      },
      {
        title: 'Recycle & Compost',
        description: 'Proper waste management prevents methane emissions from landfills',
        impact: '0.5-2 kg CO₂ per item',
        icon: 'fas fa-recycle',
      },
    ];
    this.achievements = [
      { id: 1, name: 'First Step', icon: '👣', condition: 'Log 1 activity' },
      { id: 2, name: 'Green Warrior', icon: '⚔️', condition: 'Log 10 activities' },
      { id: 3, name: 'Daily Legend', icon: '🏆', condition: 'Stay under daily goal for 7 days' },
      { id: 4, name: 'Eco Champion', icon: '🌍', condition: 'Reach 30-day streak' },
      { id: 5, name: 'Zero Waste', icon: '♻️', condition: 'Log 10 recycling activities' },
      { id: 6, name: 'Green Commuter', icon: '🚴', condition: 'Log 20 bike/walk activities' },
    ];
    this.init();
  }

  init() {
    this.loadFromStorage();
    this.setupEventListeners();
    this.updateAllMetrics();
    this.renderActivityLog();
    this.renderTips();
    this.setupCharts();
    this.setDefaultDates();
  }

  setupEventListeners() {
    // Activity Form
    document.getElementById('activityForm').addEventListener('submit', (e) =>
      this.handleActivitySubmit(e)
    );
    document.getElementById('activityValue').addEventListener('input', () =>
      this.updateEstimatedEmissions()
    );
    document.getElementById('activityType').addEventListener('change', () =>
      this.updateEstimatedEmissions()
    );
    document.getElementById('activityUnit').addEventListener('change', () =>
      this.updateEstimatedEmissions()
    );

    // Goal Modal
    document.getElementById('editGoalBtn').addEventListener('click', () => this.openGoalModal());
    document.getElementById('closeGoalModal').addEventListener('click', () =>
      this.closeGoalModal()
    );
    document.getElementById('cancelGoalBtn').addEventListener('click', () =>
      this.closeGoalModal()
    );
    document.getElementById('goalForm').addEventListener('submit', (e) =>
      this.handleGoalSubmit(e)
    );

    // Filter Modal
    document.getElementById('filterActivityBtn').addEventListener('click', () =>
      this.openFilterModal()
    );
    document.getElementById('closeFilterModal').addEventListener('click', () =>
      this.closeFilterModal()
    );
    document.getElementById('cancelFilterBtn').addEventListener('click', () =>
      this.closeFilterModal()
    );
    document.getElementById('filterForm').addEventListener('submit', (e) =>
      this.handleFilterSubmit(e)
    );

    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });
  }

  setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('activityDate').value = today;
  }

  handleActivitySubmit(e) {
    e.preventDefault();

    const date = document.getElementById('activityDate').value;
    const type = document.getElementById('activityType').value;
    const value = parseFloat(document.getElementById('activityValue').value);
    const unit = document.getElementById('activityUnit').value;
    const notes = document.getElementById('activityNotes').value;
    const emissions = this.calculateEmissions(type, value, unit);

    const activity = {
      id: Date.now(),
      date,
      type,
      value,
      unit,
      emissions,
      notes,
      timestamp: new Date().toISOString(),
    };

    this.activities.unshift(activity);
    this.saveToStorage();
    this.updateAllMetrics();
    this.renderActivityLog();
    this.setupCharts();

    // Reset form
    e.target.reset();
    this.setDefaultDates();
    this.updateEstimatedEmissions();
  }

  calculateEmissions(type, value, unit) {
    const factor = this.emissionFactors[type] || 0;

    // Convert units if needed
    if (unit === 'miles') {
      value = value * 1.60934; // Convert miles to km
    } else if (unit === 'gallons') {
      value = value * 3.78541; // Convert gallons to liters
    }

    return parseFloat((value * factor).toFixed(2));
  }

  updateEstimatedEmissions() {
    const type = document.getElementById('activityType').value;
    const value = parseFloat(document.getElementById('activityValue').value) || 0;
    const unit = document.getElementById('activityUnit').value;

    const emissions = this.calculateEmissions(type, value, unit);
    document.getElementById('estimatedEmissions').textContent = emissions.toFixed(2);
  }

  updateAllMetrics() {
    this.updateDailyMetrics();
    this.updateWeeklyMetrics();
    this.updateMonthlyMetrics();
    this.updateGoalProgress();
    this.updateComparisons();
    this.renderAchievements();
  }

  updateDailyMetrics() {
    const today = new Date().toISOString().split('T')[0];
    const todayActivities = this.activities.filter(
      (a) => a.date === today
    );
    const todayEmissions = todayActivities.reduce((sum, a) => sum + a.emissions, 0);

    document.getElementById('todayEmissions').textContent = todayEmissions.toFixed(2);
    document.getElementById('totalEmissions').textContent = todayEmissions.toFixed(2);

    // Update meter
    const maxEmissions = Math.max(this.goals.daily * 2, todayEmissions * 1.2);
    const percentage = (todayEmissions / maxEmissions) * 100;
    const circumference = 565;
    const dashoffset = circumference - (percentage / 100) * circumference;
    document.getElementById('meterProgress').style.strokeDashoffset = dashoffset;

    // Update change indicator
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .split('T')[0];
    const yesterdayActivities = this.activities.filter((a) => a.date === yesterday);
    const yesterdayEmissions = yesterdayActivities.reduce((sum, a) => sum + a.emissions, 0);

    const change =
      yesterdayEmissions > 0
        ? (((todayEmissions - yesterdayEmissions) / yesterdayEmissions) * 100).toFixed(1)
        : 0;
    const changeEl = document.getElementById('todayChange');
    changeEl.textContent = (change > 0 ? '+' : '') + change + '%';
    changeEl.className = 'stat-change ' + (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral');
  }

  updateWeeklyMetrics() {
    const weekEmissions = this.getWeekEmissions();
    document.getElementById('weekEmissions').textContent = weekEmissions.toFixed(2);

    const previousWeekEmissions = this.getPreviousWeekEmissions();
    const change =
      previousWeekEmissions > 0
        ? (((weekEmissions - previousWeekEmissions) / previousWeekEmissions) * 100).toFixed(1)
        : 0;
    const changeEl = document.getElementById('weekChange');
    changeEl.textContent = (change > 0 ? '+' : '') + change + '%';
    changeEl.className = 'stat-change ' + (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral');
  }

  updateMonthlyMetrics() {
    const monthEmissions = this.getMonthEmissions();
    document.getElementById('monthEmissions').textContent = monthEmissions.toFixed(2);

    const previousMonthEmissions = this.getPreviousMonthEmissions();
    const change =
      previousMonthEmissions > 0
        ? (((monthEmissions - previousMonthEmissions) / previousMonthEmissions) * 100).toFixed(1)
        : 0;
    const changeEl = document.getElementById('monthChange');
    changeEl.textContent = (change > 0 ? '+' : '') + change + '%';
    changeEl.className = 'stat-change ' + (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral');
  }

  updateGoalProgress() {
    const monthEmissions = this.getMonthEmissions();
    const progress = (monthEmissions / this.goals.monthly) * 100;
    document.getElementById('goalProgress').textContent = Math.round(progress);

    const status =
      monthEmissions <= this.goals.monthly
        ? 'On Track'
        : monthEmissions <= this.goals.monthly * 1.2
          ? 'Slightly Over'
          : 'Over Goal';
    const statusEl = document.getElementById('goalStatus');
    statusEl.textContent = status;
    statusEl.className = 'stat-change ' + (status === 'On Track' ? 'down' : 'up');

    // Update goal progress bar
    const progressPercent = Math.min((monthEmissions / this.goals.monthly) * 100, 100);
    document.getElementById('monthlyProgressPercent').textContent = Math.round(progressPercent) + '%';
    document.getElementById('monthlyProgressBar').style.width = progressPercent + '%';

    // Update goal inputs
    document.getElementById('dailyTarget').textContent = this.goals.daily;
    document.getElementById('weeklyTarget').textContent = this.goals.weekly;
    document.getElementById('monthlyTarget').textContent = this.goals.monthly;
    document.getElementById('dailyGoalInput').value = this.goals.daily;
    document.getElementById('weeklyGoalInput').value = this.goals.weekly;
    document.getElementById('monthlyGoalInput').value = this.goals.monthly;
  }

  updateComparisons() {
    const monthEmissions = this.getMonthEmissions();

    // Trees needed
    const treesPerMonth = Math.ceil(monthEmissions / 20);
    document.getElementById('treesNeeded').textContent = treesPerMonth;

    // Car emissions equivalent
    const carEquivalent = (monthEmissions / 0.21).toFixed(0);
    document.getElementById('carEmissions').textContent = carEquivalent;

    // Global average (average person emits ~4000kg CO2/year)
    const globalAverage = 4000 / 12;
    const globalPercent = ((monthEmissions / globalAverage) * 100).toFixed(1);
    document.getElementById('globalComparison').textContent = globalPercent;

    // National average (varies by country, using US avg ~5600kg/year)
    const nationalAverage = 5600 / 12;
    const nationalPercent = ((monthEmissions / nationalAverage) * 100).toFixed(1);
    document.getElementById('personComparison').textContent = nationalPercent;
  }

  renderActivityLog() {
    const logContainer = document.getElementById('activityLog');

    if (this.activities.length === 0) {
      logContainer.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-inbox"></i>
          <p>No activities logged yet. Start tracking your carbon footprint!</p>
        </div>
      `;
      return;
    }

    const activitiesHTML = this.activities
      .map((activity) => this.createActivityLogItem(activity))
      .join('');
    logContainer.innerHTML = activitiesHTML;

    // Add delete listeners
    logContainer.querySelectorAll('.activity-delete').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.closest('.activity-log-item').dataset.id);
        this.deleteActivity(id);
      });
    });
  }

  createActivityLogItem(activity) {
    const categoryMap = {
      transportation: { icon: 'fas fa-car', label: 'Transportation' },
      car: { icon: 'fas fa-car', label: 'Car' },
      'car-electric': { icon: 'fas fa-charging-station', label: 'Electric Car' },
      'public-transport': { icon: 'fas fa-bus', label: 'Public Transport' },
      flight: { icon: 'fas fa-plane', label: 'Flight' },
      bike: { icon: 'fas fa-bicycle', label: 'Cycling/Walking' },
      energy: { icon: 'fas fa-bolt', label: 'Energy' },
      electricity: { icon: 'fas fa-lightbulb', label: 'Electricity' },
      gas: { icon: 'fas fa-fire', label: 'Natural Gas' },
      water: { icon: 'fas fa-tint', label: 'Water' },
      consumption: { icon: 'fas fa-shopping-bag', label: 'Consumption' },
      meat: { icon: 'fas fa-drumstick-bite', label: 'Meat' },
      dairy: { icon: 'fas fa-cheese', label: 'Dairy' },
      vegetables: { icon: 'fas fa-leaf', label: 'Plant-based' },
      shopping: { icon: 'fas fa-shopping-bag', label: 'Shopping' },
      waste: { icon: 'fas fa-trash', label: 'Waste' },
      recycling: { icon: 'fas fa-recycle', label: 'Recycling' },
    };

    const categoryInfo = categoryMap[activity.type] || { icon: 'fas fa-circle', label: activity.type };

    const date = new Date(activity.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return `
      <div class="activity-log-item" data-id="${activity.id}">
        <div class="activity-icon ${activity.type.split('-')[0]}">
          <i class="${categoryInfo.icon}"></i>
        </div>
        <div class="activity-details">
          <div class="activity-type">${categoryInfo.label}</div>
          <div class="activity-meta">${activity.value} ${activity.unit} • ${formattedDate}</div>
          ${activity.notes ? `<div class="activity-meta" style="color: #6b7280; margin-top: 4px;">${activity.notes}</div>` : ''}
        </div>
        <div class="activity-emissions">${activity.emissions.toFixed(2)} kg</div>
        <button class="activity-delete" title="Delete">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
  }

  deleteActivity(id) {
    if (confirm('Are you sure you want to delete this activity?')) {
      this.activities = this.activities.filter((a) => a.id !== id);
      this.saveToStorage();
      this.updateAllMetrics();
      this.renderActivityLog();
      this.setupCharts();
    }
  }

  renderTips() {
    const container = document.getElementById('tipsContainer');
    const tipsHTML = this.tips
      .map(
        (tip) => `
      <div class="tip-item">
        <div class="tip-icon">
          <i class="${tip.icon}"></i>
        </div>
        <div class="tip-content">
          <h4>${tip.title}</h4>
          <p>${tip.description}</p>
          <div class="tip-impact">
            <i class="fas fa-leaf"></i>
            <span>${tip.impact}</span>
          </div>
        </div>
      </div>
    `
      )
      .join('');
    container.innerHTML = tipsHTML;
  }

  renderAchievements() {
    const container = document.getElementById('achievementsGrid');
    const achievementsHTML = this.achievements
      .map((achievement) => {
        const unlocked = this.checkAchievement(achievement.id);
        return `
        <div class="achievement ${unlocked ? 'unlocked' : ''}">
          <div class="achievement-icon">${achievement.icon}</div>
          <p class="achievement-name">${achievement.name}</p>
        </div>
      `;
      })
      .join('');
    container.innerHTML = achievementsHTML;
  }

  checkAchievement(id) {
    const activityCount = this.activities.length;

    switch (id) {
      case 1:
        return activityCount >= 1;
      case 2:
        return activityCount >= 10;
      case 3:
        return this.checkDailyStreak(7);
      case 4:
        return this.checkDailyStreak(30);
      case 5:
        return this.activities.filter((a) => a.type === 'recycling').length >= 10;
      case 6:
        return (
          this.activities.filter((a) => a.type === 'bike').length >= 20
        );
      default:
        return false;
    }
  }

  checkDailyStreak(days) {
    let streak = 0;
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      if (this.activities.some((a) => a.date === dateStr)) {
        streak++;
      } else {
        break;
      }
    }
    return streak >= days;
  }

  setupCharts() {
    this.setupCategoryChart();
    this.setupTrendChart();
  }

  setupCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    const categories = {};
    this.activities.forEach((activity) => {
      const category = activity.type.split('-')[0];
      categories[category] = (categories[category] || 0) + activity.emissions;
    });

    const labels = Object.keys(categories);
    const data = Object.values(categories);
    const colors = [
      '#0284c7',
      '#d97706',
      '#ec4899',
      '#7c3aed',
      '#06b6d4',
      '#f59e0b',
    ];

    // Destroy existing chart if it exists
    if (this.categoryChartInstance) {
      this.categoryChartInstance.destroy();
    }

    this.categoryChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels.map((l) => l.charAt(0).toUpperCase() + l.slice(1)),
        datasets: [
          {
            data: data,
            backgroundColor: colors.slice(0, labels.length),
            borderColor: 'white',
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    // Render legend
    const legend = document.getElementById('categoryLegend');
    legend.innerHTML = labels
      .map(
        (label, i) => `
      <div class="legend-item">
        <div class="legend-dot" style="background-color: ${colors[i]}"></div>
        <span>${label.charAt(0).toUpperCase() + label.slice(1)}: ${data[i].toFixed(2)} kg</span>
      </div>
    `
      )
      .join('');
  }

  setupTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;

    const last7Days = [];
    const emissions = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayEmissions = this.activities
        .filter((a) => a.date === dateStr)
        .reduce((sum, a) => sum + a.emissions, 0);

      last7Days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      emissions.push(dayEmissions);
    }

    // Destroy existing chart if it exists
    if (this.trendChartInstance) {
      this.trendChartInstance.destroy();
    }

    this.trendChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: last7Days,
        datasets: [
          {
            label: 'Daily Emissions',
            data: emissions,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#10b981',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
          {
            label: 'Daily Goal',
            data: Array(7).fill(this.goals.daily),
            borderColor: '#f59e0b',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value.toFixed(1);
              },
            },
          },
        },
      },
    });
  }

  openGoalModal() {
    document.getElementById('goalModal').classList.add('active');
  }

  closeGoalModal() {
    document.getElementById('goalModal').classList.remove('active');
  }

  handleGoalSubmit(e) {
    e.preventDefault();

    this.goals.daily = parseFloat(document.getElementById('dailyGoalInput').value);
    this.goals.weekly = parseFloat(document.getElementById('weeklyGoalInput').value);
    this.goals.monthly = parseFloat(document.getElementById('monthlyGoalInput').value);

    this.saveToStorage();
    this.updateAllMetrics();
    this.setupCharts();
    this.closeGoalModal();
  }

  openFilterModal() {
    document.getElementById('filterModal').classList.add('active');
  }

  closeFilterModal() {
    document.getElementById('filterModal').classList.remove('active');
  }

  handleFilterSubmit(e) {
    e.preventDefault();
    // Filter logic would go here
    this.closeFilterModal();
  }

  getWeekEmissions() {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return this.activities
      .filter((a) => new Date(a.date) >= weekAgo)
      .reduce((sum, a) => sum + a.emissions, 0);
  }

  getPreviousWeekEmissions() {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return this.activities
      .filter((a) => {
        const date = new Date(a.date);
        return date >= twoWeeksAgo && date < weekAgo;
      })
      .reduce((sum, a) => sum + a.emissions, 0);
  }

  getMonthEmissions() {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return this.activities
      .filter((a) => new Date(a.date) >= monthAgo)
      .reduce((sum, a) => sum + a.emissions, 0);
  }

  getPreviousMonthEmissions() {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return this.activities
      .filter((a) => {
        const date = new Date(a.date);
        return date >= twoMonthsAgo && date < monthAgo;
      })
      .reduce((sum, a) => sum + a.emissions, 0);
  }

  saveToStorage() {
    localStorage.setItem(
      'carbonFootprintData',
      JSON.stringify({
        activities: this.activities,
        goals: this.goals,
      })
    );
  }

  loadFromStorage() {
    const stored = localStorage.getItem('carbonFootprintData');
    if (stored) {
      const data = JSON.parse(stored);
      this.activities = data.activities || [];
      this.goals = data.goals || this.goals;
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CarbonFootprintTracker();
});
