// Plastic Footprint Calculator JS - Complete with Charts, Comparison & Tracking

document.addEventListener('DOMContentLoaded', function() {
  const NATIONAL_AVG = 45; // items per week
  const STORAGE_KEY = 'plasticFootprintData';
  
  let plasticChart = null;
  let monthlyData = loadMonthlyData();

  // Load monthly data from localStorage
  function loadMonthlyData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  // Save monthly data
  function saveMonthlyData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(monthlyData));
  }

  // Add current month entry
  function addMonthlyEntry(total, breakdown) {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    const existingIndex = monthlyData.findIndex(entry => entry.month === monthKey);
    if (existingIndex >= 0) {
      monthlyData[existingIndex] = { month: monthKey, total, breakdown, date: now.toISOString() };
    } else {
      monthlyData.push({ month: monthKey, total, breakdown, date: now.toISOString() });
    }
    
    if (monthlyData.length > 12) {
      monthlyData = monthlyData.slice(-12);
    }
    
    saveMonthlyData();
  }

  // --- Calculator ---
  const form = document.getElementById('plasticCalcForm');
  const resultDiv = document.getElementById('calcResult');
  let lastTotal = null;
  let lastBreakdown = null;

  function calculatePlastic(e) {
    if (e) e.preventDefault();
    const bottles = parseInt(document.getElementById('bottles').value) || 0;
    const bags = parseInt(document.getElementById('bags').value) || 0;
    const packaging = parseInt(document.getElementById('packaging').value) || 0;
    const cups = parseInt(document.getElementById('cups').value) || 0;
    const utensils = parseInt(document.getElementById('utensils').value) || 0;
    const total = bottles + bags + packaging + cups + utensils;
    
    lastTotal = total;
    lastBreakdown = { bottles, bags, packaging, cups, utensils };
    
    resultDiv.textContent = `Your estimated weekly plastic usage: ${total} items`;
    
    // Save to history
    addMonthlyEntry(total, lastBreakdown);
    
    // Update all visualizations
    updateChart();
    updateComparison();
    updateBadges();
    updateTimeline();
    updateProgress();
    checkMilestones(total);
  }
  form.addEventListener('submit', calculatePlastic);

  // --- Pie Chart ---
  function updateChart() {
    if (!lastBreakdown) return;
    
    const ctx = document.getElementById('plasticChart').getContext('2d');
    const data = [
      lastBreakdown.bottles,
      lastBreakdown.bags,
      lastBreakdown.packaging,
      lastBreakdown.cups,
      lastBreakdown.utensils
    ];
    
    if (plasticChart) plasticChart.destroy();
    
    plasticChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Bottles', 'Bags', 'Packaging', 'Cups', 'Utensils'],
        datasets: [{
          data: data,
          backgroundColor: [
            '#2196F3',
            '#4CAF50',
            '#FF9800',
            '#F44336',
            '#9C27B0'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { size: 12, weight: 'bold' }, padding: 15 }
          }
        }
      }
    });
  }

  // --- Comparison ---
  function updateComparison() {
    if (lastTotal === null) return;
    
    document.getElementById('yourUsage').textContent = lastTotal;
    const diff = lastTotal - NATIONAL_AVG;
    const diffText = diff > 0 ? `+${diff} above` : `${Math.abs(diff)} below`;
    document.getElementById('difference').textContent = diffText;
    
    const diffCard = document.querySelector('.comparison-card:nth-child(3)');
    if (diff > 0) {
      diffCard.style.borderColor = '#f44336';
    } else {
      diffCard.style.borderColor = '#4caf50';
    }
  }

  // --- Badges ---
  const badges = [
    { name: '🌟 First Steps', condition: (total) => total <= 50, unlocked: false },
    { name: '🏆 Eco Champion', condition: (total) => total <= 30, unlocked: false },
    { name: '💚 Plastic Hero', condition: (total) => total <= 20, unlocked: false },
    { name: '🌍 Planet Saver', condition: (total) => total <= 10, unlocked: false },
    { name: '⭐ Plastic Free', condition: (total) => total === 0, unlocked: false }
  ];

  function updateBadges() {
    if (lastTotal === null) return;
    
    const badgesGrid = document.getElementById('badgesGrid');
    badgesGrid.innerHTML = badges.map(badge => {
      const isUnlocked = badge.condition(lastTotal);
      if (isUnlocked && !badge.unlocked) {
        badge.unlocked = true;
        showNotification(`🎉 Badge Unlocked: ${badge.name}!`);
      }
      return `
        <div class="badge ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="badge-icon">${isUnlocked ? badge.name.split(' ')[0] : '🔒'}</div>
          <div class="badge-name">${badge.name.split(' ').slice(1).join(' ')}</div>
        </div>
      `;
    }).join('');
  }

  // --- Timeline ---
  function updateTimeline() {
    const timelineGrid = document.getElementById('timelineGrid');
    if (monthlyData.length === 0) {
      timelineGrid.innerHTML = '<p>No history yet. Start tracking to see your progress!</p>';
      return;
    }
    
    timelineGrid.innerHTML = monthlyData.slice(-6).reverse().map(entry => {
      const date = new Date(entry.date);
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const comparison = entry.total <= NATIONAL_AVG ? 'below' : 'above';
      return `
        <div class="timeline-card ${comparison}">
          <div class="timeline-month">${monthName}</div>
          <div class="timeline-value">${entry.total} items</div>
          <div class="timeline-status">${comparison} average</div>
        </div>
      `;
    }).join('');
  }

  // --- Milestone Notifications ---
  function checkMilestones(total) {
    if (total <= NATIONAL_AVG && monthlyData.length >= 3) {
      const last3 = monthlyData.slice(-3);
      const allBelow = last3.every(entry => entry.total <= NATIONAL_AVG);
      if (allBelow) {
        showNotification('🎊 Amazing! 3 months below national average!');
      }
    }
  }

  function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 5000);
  }

  // --- Progress Tracking ---
  const progressBar = document.getElementById('progressBar');
  const progressLabel = document.getElementById('progressLabel');
  const goalForm = document.getElementById('goalForm');
  const goalInput = document.getElementById('goal');
  let goal = parseInt(goalInput.value) || 10;

  function updateProgress() {
    if (lastTotal === null) return;
    if (!goal || goal <= 0) {
      progressLabel.textContent = 'Set a reduction goal to start tracking!';
      progressBar.style.width = '0%';
      return;
    }
    const percent = Math.max(0, Math.min(100, 100 * (1 - lastTotal / goal)));
    progressBar.style.width = percent + '%';
    if (lastTotal <= goal) {
      progressLabel.textContent = `🎉 Congratulations! You met your goal (${lastTotal} / ${goal} items)`;
      progressBar.style.background = 'linear-gradient(90deg, #43a047 0%, #fbc02d 100%)';
      showNotification('🏆 Goal Achieved! Keep up the great work!');
    } else {
      progressLabel.textContent = `Current: ${lastTotal} / Goal: ${goal} items`;
      progressBar.style.background = 'linear-gradient(90deg, #0288d1 0%, #fbc02d 100%)';
    }
  }
  
  goalForm.addEventListener('submit', function(e) {
    e.preventDefault();
    goal = parseInt(goalInput.value) || 10;
    updateProgress();
  });

  // --- Tips ---
  const tips = [
    'Carry a reusable water bottle and coffee cup.',
    'Use cloth bags instead of plastic bags.',
    'Buy products with minimal or recyclable packaging.',
    'Say no to single-use straws and utensils.',
    'Choose bar soap over liquid soap in plastic bottles.',
    'Shop at bulk stores to reduce packaging.',
    'Store food in glass or metal containers.',
    'Participate in local plastic clean-up events.'
  ];
  const tipsList = document.getElementById('tipsList');
  tips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    tipsList.appendChild(li);
  });

  // Initial calculation and visualization
  calculatePlastic();
  updateTimeline();
});
