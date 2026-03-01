// Water Conservation Tracker JS
// Handles water usage tracking, goal progress, education tips, historical data, and analytics

document.addEventListener('DOMContentLoaded', function() {
  // --- Constants ---
  const NATIONAL_AVG_USAGE = 500; // liters/week
  const MAX_WEEKS_STORED = 52; // Store up to 1 year of data
  const STORAGE_KEY = 'waterConservationData';

  // --- Data Management (localStorage) ---
  class WaterDataManager {
    constructor() {
      this.data = this.loadData();
    }

    loadData() {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : { entries: [] };
    }

    saveData() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    }

    addEntry(usage, date = new Date()) {
      const week = this.getWeekKey(date);
      const existingIndex = this.data.entries.findIndex(e => e.week === week);
      
      if (existingIndex >= 0) {
        this.data.entries[existingIndex].usage = usage;
        this.data.entries[existingIndex].lastUpdated = date.toISOString();
      } else {
        this.data.entries.push({
          week,
          usage,
          date: date.toISOString(),
          lastUpdated: date.toISOString()
        });
      }
      
      // Keep only last MAX_WEEKS_STORED entries
      if (this.data.entries.length > MAX_WEEKS_STORED) {
        this.data.entries = this.data.entries.slice(-MAX_WEEKS_STORED);
      }
      
      this.saveData();
    }

    getWeekKey(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const weekNum = this.getWeekNumber(d);
      return `${year}-W${String(weekNum).padStart(2, '0')}`;
    }

    getWeekNumber(date) {
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

    getRecentEntries(weeks = 12) {
      return this.data.entries.slice(-weeks);
    }

    getAverageUsage() {
      if (this.data.entries.length === 0) return 0;
      const sum = this.data.entries.reduce((acc, e) => acc + e.usage, 0);
      return Math.round(sum / this.data.entries.length);
    }

    exportData() {
      return {
        exportDate: new Date().toISOString(),
        totalEntries: this.data.entries.length,
        averageUsage: this.getAverageUsage(),
        entries: this.data.entries
      };
    }
  }

  // --- Chart Management ---
  let chart = null;
  let chartView = 'weekly';
  const dataManager = new WaterDataManager();

  function initializeChart() {
    const ctx = document.getElementById('waterTrendChart').getContext('2d');
    const entries = dataManager.getRecentEntries(12);

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: entries.map(e => {
          const date = new Date(e.date);
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }),
        datasets: [{
          label: 'Weekly Usage (liters)',
          data: entries.map(e => e.usage),
          borderColor: '#0288d1',
          backgroundColor: 'rgba(2, 136, 209, 0.1)',
          borderWidth: 2,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: '#0288d1',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          tension: 0.4,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#01579b'
        }, {
          label: 'National Average',
          data: Array(entries.length).fill(NATIONAL_AVG_USAGE),
          borderColor: '#ff9800',
          borderDash: [5, 5],
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              font: { size: 12, weight: 'bold' },
              color: '#263238'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#263238' },
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          },
          x: {
            ticks: { color: '#263238' },
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          }
        }
      }
    });

    updateDateRange();
  }

  function updateDateRange() {
    const entries = dataManager.getRecentEntries(12);
    if (entries.length === 0) {
      document.getElementById('dateRange').textContent = 'No data recorded yet';
      return;
    }
    const firstDate = new Date(entries[0].date);
    const lastDate = new Date(entries[entries.length - 1].date);
    const rangeText = `${firstDate.toLocaleDateString()} - ${lastDate.toLocaleDateString()}`;
    document.getElementById('dateRange').textContent = rangeText;
  }

  // --- Tracker ---
  const form = document.getElementById('waterTrackerForm');
  const resultDiv = document.getElementById('trackerResult');
  let lastTotal = null;

  function calculateWater(e) {
    if (e) e.preventDefault();
    const showers = parseInt(document.getElementById('showers').value) || 0;
    const laundry = parseInt(document.getElementById('laundry').value) || 0;
    const dishes = parseInt(document.getElementById('dishes').value) || 0;
    const toilet = parseInt(document.getElementById('toilet').value) || 0;
    const other = parseInt(document.getElementById('other').value) || 0;
    const total = showers + laundry + dishes + toilet + other;
    lastTotal = total;
    resultDiv.textContent = `Your estimated weekly water usage: ${total} liters`;
    
    // Save to localStorage
    dataManager.addEntry(total);
    
    // Update chart and metrics
    if (chart) {
      updateChartData();
    }
    updateMetrics();
    updateGoal();
  }
  form.addEventListener('submit', calculateWater);

  function updateChartData() {
    const entries = dataManager.getRecentEntries(12);
    chart.data.labels = entries.map(e => {
      const date = new Date(e.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    chart.data.datasets[0].data = entries.map(e => e.usage);
    chart.data.datasets[1].data = Array(entries.length).fill(NATIONAL_AVG_USAGE);
    chart.update();
    updateDateRange();
  }

  // --- View Toggle ---
  document.querySelectorAll('.view-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.view-toggle').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      chartView = this.dataset.view;
      // Functionality for monthly view can be expanded in the future
    });
  });

  // --- Data Export ---
  document.getElementById('exportDataBtn').addEventListener('click', function() {
    const exportData = dataManager.exportData();
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `water-conservation-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });

  // --- Metrics Update ---
  function updateMetrics() {
    const avgUsage = dataManager.getAverageUsage();
    const comparison = avgUsage - NATIONAL_AVG_USAGE;
    const comparisonText = comparison <= 0 
      ? `${Math.abs(comparison)} below avg`
      : `${comparison} above avg`;

    document.getElementById('avgUsage').textContent = avgUsage;
    document.getElementById('comparison').textContent = comparisonText;
    
    if (avgUsage > 0 && NATIONAL_AVG_USAGE > 0) {
      const totalEntries = dataManager.data.entries.length;
      const potentialSavings = (NATIONAL_AVG_USAGE - avgUsage) * totalEntries;
      document.getElementById('totalSavings').textContent = potentialSavings > 0 ? Math.round(potentialSavings) : '0';
    }
  }

  // --- Goal Tracking ---
  const goalBar = document.getElementById('goalBar');
  const goalLabel = document.getElementById('goalLabel');
  const goalForm = document.getElementById('goalForm');
  const goalInput = document.getElementById('goal');
  let goal = parseInt(goalInput.value) || 700;

  function updateGoal() {
    if (lastTotal === null) return;
    if (!goal || goal <= 0) {
      goalLabel.textContent = 'Set a weekly water usage goal to start tracking!';
      goalBar.style.width = '0%';
      return;
    }
    const percent = Math.max(0, Math.min(100, 100 * (1 - lastTotal / goal)));
    goalBar.style.width = percent + '%';
    if (lastTotal <= goal) {
      goalLabel.textContent = `Great job! You met your goal (${lastTotal} / ${goal} liters)`;
      goalBar.style.background = 'linear-gradient(90deg, #43a047 0%, #00acc1 100%)';
    } else {
      goalLabel.textContent = `Current: ${lastTotal} / Goal: ${goal} liters`;
      goalBar.style.background = 'linear-gradient(90deg, #0288d1 0%, #00acc1 100%)';
    }
  }
  goalForm.addEventListener('submit', function(e) {
    e.preventDefault();
    goal = parseInt(goalInput.value) || 700;
    updateGoal();
  });

  // --- Education Tips ---
  const tips = [
    'Take shorter showers and turn off water while soaping.',
    'Fix leaks promptly to prevent water waste.',
    'Run dishwashers and washing machines only with full loads.',
    'Install low-flow showerheads and faucet aerators.',
    'Collect rainwater for garden use.',
    'Water your garden early or late to reduce evaporation.',
    'Use a broom instead of a hose to clean driveways and sidewalks.',
    'Educate your community about water conservation.'
  ];
  const educationList = document.getElementById('educationList');
  tips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    educationList.appendChild(li);
  });

  // --- Initialization ---
  initializeChart();
  calculateWater();
  updateMetrics();
});
