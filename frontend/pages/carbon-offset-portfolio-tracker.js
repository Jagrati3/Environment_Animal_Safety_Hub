// Carbon Offset Portfolio Tracker - Complete with Chart.js, localStorage & Impact Metrics

document.addEventListener('DOMContentLoaded', function() {
  const STORAGE_KEY = 'carbonOffsetPortfolio';
  const AVG_FOOTPRINT = 16; // tons per year for US adult
  
  let portfolioChart = null;
  let timelineChart = null;
  let portfolioData = loadPortfolioData();

  // Load data from localStorage
  function loadPortfolioData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      investments: [],
      goal: 20,
      history: []
    };
  }

  // Save data to localStorage
  function savePortfolioData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
  }

  // Initialize on load
  updateAllMetrics();
  updateCharts();
  updateHistory();
  updateComparison();
  updateGoalProgress();

  // --- Investment Form ---
  const investmentForm = document.getElementById('investmentForm');
  const investmentResult = document.getElementById('investmentResult');

  investmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const offsetType = document.getElementById('offsetType').value;
    const amount = parseFloat(document.getElementById('investmentAmount').value);
    const co2 = parseFloat(document.getElementById('co2Offset').value);
    
    const investment = {
      id: Date.now(),
      type: offsetType,
      amount: amount,
      co2: co2,
      date: new Date().toISOString(),
      month: getMonthKey(new Date())
    };
    
    portfolioData.investments.push(investment);
    savePortfolioData();
    
    // Show success message
    investmentResult.textContent = `✅ Added ${co2} tons CO₂ offset via ${formatOffsetType(offsetType)}!`;
    investmentResult.style.color = '#4caf50';
    setTimeout(() => { investmentResult.textContent = ''; }, 3000);
    
    // Reset form
    document.getElementById('investmentAmount').value = '50';
    document.getElementById('co2Offset').value = '2.5';
    
    // Update all visualizations
    updateAllMetrics();
    updateCharts();
    updateHistory();
    updateComparison();
    updateGoalProgress();
  });

  // --- Goal Form ---
  const goalForm = document.getElementById('goalForm');
  goalForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const goal = parseFloat(document.getElementById('goalAmount').value);
    portfolioData.goal = goal;
    savePortfolioData();
    updateGoalProgress();
  });

  // --- Update All Metrics ---
  function updateAllMetrics() {
    const totalCO2 = portfolioData.investments.reduce((sum, inv) => sum + inv.co2, 0);
    const totalInvestment = portfolioData.investments.reduce((sum, inv) => sum + inv.amount, 0);
    const treesEquivalent = Math.round(totalCO2 * 40); // 1 ton CO2 = ~40 trees
    const carsOffRoad = (totalCO2 / 4.6).toFixed(1); // Average car emits 4.6 tons/year
    
    document.getElementById('totalCO2').textContent = totalCO2.toFixed(1);
    document.getElementById('treesEquivalent').textContent = treesEquivalent.toLocaleString();
    document.getElementById('carsOffRoad').textContent = carsOffRoad;
    document.getElementById('totalInvestment').textContent = `$${totalInvestment.toLocaleString()}`;
  }

  // --- Portfolio Breakdown Chart (Doughnut) ---
  function updateCharts() {
    updatePortfolioChart();
    updateTimelineChart();
  }

  function updatePortfolioChart() {
    const ctx = document.getElementById('portfolioChart').getContext('2d');
    
    // Aggregate by type
    const typeData = {
      'tree-planting': 0,
      'renewable-energy': 0,
      'ocean-cleanup': 0,
      'carbon-capture': 0
    };
    
    portfolioData.investments.forEach(inv => {
      typeData[inv.type] = (typeData[inv.type] || 0) + inv.co2;
    });
    
    const labels = [];
    const data = [];
    const colors = ['#4caf50', '#ffeb3b', '#2196f3', '#ff5722'];
    const typeNames = {
      'tree-planting': '🌳 Tree Planting',
      'renewable-energy': '⚡ Renewable Energy',
      'ocean-cleanup': '🌊 Ocean Cleanup',
      'carbon-capture': '🏭 Carbon Capture'
    };
    
    Object.keys(typeData).forEach((key, idx) => {
      if (typeData[key] > 0) {
        labels.push(typeNames[key]);
        data.push(typeData[key]);
      }
    });
    
    if (portfolioChart) portfolioChart.destroy();
    
    if (data.length === 0) {
      // Show empty state
      ctx.font = '16px Montserrat';
      ctx.fillStyle = '#999';
      ctx.textAlign = 'center';
      ctx.fillText('No investments yet', ctx.canvas.width / 2, ctx.canvas.height / 2);
      return;
    }
    
    portfolioChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors.slice(0, data.length),
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
            labels: {
              padding: 15,
              font: { size: 13, family: 'Montserrat' }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed.toFixed(1) + ' tons CO₂';
              }
            }
          }
        }
      }
    });
  }

  // --- Timeline Chart (Mixed: Line + Bar) ---
  function updateTimelineChart() {
    const ctx = document.getElementById('timelineChart').getContext('2d');
    
    // Group by month
    const monthlyData = {};
    portfolioData.investments.forEach(inv => {
      const month = inv.month;
      if (!monthlyData[month]) {
        monthlyData[month] = { co2: 0, investment: 0 };
      }
      monthlyData[month].co2 += inv.co2;
      monthlyData[month].investment += inv.amount;
    });
    
    // Get last 12 months
    const months = generateLast12Months();
    const labels = months.map(m => formatMonthLabel(m));
    const co2Data = [];
    const investmentData = [];
    let accumulated = 0;
    
    months.forEach(month => {
      if (monthlyData[month]) {
        accumulated += monthlyData[month].co2;
        co2Data.push(accumulated);
        investmentData.push(monthlyData[month].investment);
      } else {
        co2Data.push(accumulated);
        investmentData.push(0);
      }
    });
    
    if (timelineChart) timelineChart.destroy();
    
    if (portfolioData.investments.length === 0) {
      ctx.font = '16px Montserrat';
      ctx.fillStyle = '#999';
      ctx.textAlign = 'center';
      ctx.fillText('No investment history yet', ctx.canvas.width / 2, ctx.canvas.height / 2);
      return;
    }
    
    timelineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            type: 'line',
            label: 'Accumulated CO₂ Offset (tons)',
            data: co2Data,
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            yAxisID: 'y'
          },
          {
            type: 'bar',
            label: 'Monthly Investment ($)',
            data: investmentData,
            backgroundColor: '#2196f3',
            borderColor: '#1976d2',
            borderWidth: 1,
            yAxisID: 'y1'
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
            position: 'top',
            labels: {
              padding: 15,
              font: { size: 13, family: 'Montserrat' }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) label += ': ';
                if (context.datasetIndex === 0) {
                  label += context.parsed.y.toFixed(1) + ' tons';
                } else {
                  label += '$' + context.parsed.y.toFixed(0);
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'CO₂ Offset (tons)',
              font: { size: 12, family: 'Montserrat' }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Investment ($)',
              font: { size: 12, family: 'Montserrat' }
            },
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });
  }

  // --- Goal Progress ---
  function updateGoalProgress() {
    const totalCO2 = portfolioData.investments.reduce((sum, inv) => sum + inv.co2, 0);
    const goal = portfolioData.goal || 20;
    const progress = Math.min((totalCO2 / goal) * 100, 100);
    
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressPercent').textContent = progress.toFixed(0) + '%';
    document.getElementById('progressText').textContent = 
      `${totalCO2.toFixed(1)} / ${goal} tons CO₂`;
    
    if (progress >= 100) {
      document.getElementById('progressBar').style.background = 'linear-gradient(90deg, #4caf50, #8bc34a)';
    } else {
      document.getElementById('progressBar').style.background = 'linear-gradient(90deg, #2196f3, #03a9f4)';
    }
  }

  // --- Footprint Comparison ---
  function updateComparison() {
    const totalCO2 = portfolioData.investments.reduce((sum, inv) => sum + inv.co2, 0);
    const netImpact = totalCO2 - AVG_FOOTPRINT;
    
    document.getElementById('offsetValue').textContent = totalCO2.toFixed(1) + ' tons';
    document.getElementById('netImpact').textContent = 
      (netImpact >= 0 ? '+' : '') + netImpact.toFixed(1) + ' tons';
    
    const statusEl = document.getElementById('impactStatus');
    if (netImpact >= 0) {
      statusEl.textContent = '✅ Carbon Positive!';
      statusEl.style.color = '#4caf50';
    } else if (totalCO2 >= AVG_FOOTPRINT * 0.5) {
      statusEl.textContent = '🟡 Halfway There!';
      statusEl.style.color = '#ff9800';
    } else {
      statusEl.textContent = '🔴 Keep Going!';
      statusEl.style.color = '#f44336';
    }
  }

  // --- Investment History ---
  function updateHistory() {
    const container = document.getElementById('historyContainer');
    
    if (portfolioData.investments.length === 0) {
      container.innerHTML = '<p class="empty-state">No investment history yet. Start adding offsets above!</p>';
      return;
    }
    
    // Sort by date descending
    const sorted = [...portfolioData.investments].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    let html = '<div class="history-list">';
    sorted.forEach(inv => {
      html += `
        <div class="history-item">
          <div class="history-icon">${getOffsetIcon(inv.type)}</div>
          <div class="history-details">
            <div class="history-type">${formatOffsetType(inv.type)}</div>
            <div class="history-date">${formatDate(inv.date)}</div>
          </div>
          <div class="history-metrics">
            <div class="history-co2">${inv.co2} tons CO₂</div>
            <div class="history-amount">$${inv.amount}</div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    
    container.innerHTML = html;
  }

  // --- Export CSV ---
  document.getElementById('exportBtn').addEventListener('click', function() {
    if (portfolioData.investments.length === 0) {
      alert('No data to export yet!');
      return;
    }
    
    let csv = 'Date,Offset Type,Amount ($),CO2 Offset (tons)\n';
    portfolioData.investments.forEach(inv => {
      csv += `${formatDate(inv.date)},${formatOffsetType(inv.type)},${inv.amount},${inv.co2}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carbon-offset-portfolio.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  });

  // --- Share Report ---
  const shareModal = document.getElementById('shareModal');
  const shareBtn = document.getElementById('shareBtn');
  const closeModal = document.querySelector('.close');

  shareBtn.addEventListener('click', function() {
    generateShareReport();
    shareModal.style.display = 'block';
  });

  closeModal.addEventListener('click', function() {
    shareModal.style.display = 'none';
  });

  window.addEventListener('click', function(e) {
    if (e.target == shareModal) {
      shareModal.style.display = 'none';
    }
  });

  function generateShareReport() {
    const totalCO2 = portfolioData.investments.reduce((sum, inv) => sum + inv.co2, 0);
    const totalInvestment = portfolioData.investments.reduce((sum, inv) => sum + inv.amount, 0);
    const treesEquivalent = Math.round(totalCO2 * 40);
    const carsOffRoad = (totalCO2 / 4.6).toFixed(1);
    
    const html = `
      <div class="share-stats">
        <h3>🌍 My Carbon Offset Impact</h3>
        <p><strong>Total CO₂ Offset:</strong> ${totalCO2.toFixed(1)} tons</p>
        <p><strong>Equivalent to:</strong> ${treesEquivalent.toLocaleString()} trees planted</p>
        <p><strong>Or:</strong> ${carsOffRoad} cars off the road for 1 year</p>
        <p><strong>Total Investment:</strong> $${totalInvestment.toLocaleString()}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p class="share-note">💚 Every offset counts toward a sustainable future!</p>
      </div>
    `;
    
    document.getElementById('shareContent').innerHTML = html;
  }

  document.getElementById('copyReportBtn').addEventListener('click', function() {
    const totalCO2 = portfolioData.investments.reduce((sum, inv) => sum + inv.co2, 0);
    const totalInvestment = portfolioData.investments.reduce((sum, inv) => sum + inv.amount, 0);
    const treesEquivalent = Math.round(totalCO2 * 40);
    
    const text = `🌍 My Carbon Offset Impact\n\nTotal CO₂ Offset: ${totalCO2.toFixed(1)} tons\nEquivalent to: ${treesEquivalent.toLocaleString()} trees planted\nTotal Investment: $${totalInvestment.toLocaleString()}\n\n💚 Every offset counts toward a sustainable future!`;
    
    navigator.clipboard.writeText(text).then(() => {
      alert('✅ Report copied to clipboard!');
    });
  });

  // --- Helper Functions ---
  function getMonthKey(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }

  function formatMonthLabel(monthKey) {
    const [year, month] = monthKey.split('-');
    const date = new Date(year, parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  }

  function generateLast12Months() {
    const months = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(getMonthKey(d));
    }
    return months;
  }

  function formatOffsetType(type) {
    const names = {
      'tree-planting': 'Tree Planting',
      'renewable-energy': 'Renewable Energy',
      'ocean-cleanup': 'Ocean Cleanup',
      'carbon-capture': 'Carbon Capture'
    };
    return names[type] || type;
  }

  function getOffsetIcon(type) {
    const icons = {
      'tree-planting': '🌳',
      'renewable-energy': '⚡',
      'ocean-cleanup': '🌊',
      'carbon-capture': '🏭'
    };
    return icons[type] || '💚';
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
});
