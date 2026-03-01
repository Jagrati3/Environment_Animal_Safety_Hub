// Energy Bill Predictor JS - Advanced ML Predictions & Visualizations

document.addEventListener('DOMContentLoaded', function() {
  const billForm = document.getElementById('billForm');
  const billUpload = document.getElementById('billUpload');
  const manualBills = document.getElementById('manualBills');
  const addBillRowBtn = document.getElementById('addBillRow');
  const predictionResults = document.getElementById('predictionResults');
  const exportCsvBtn = document.getElementById('exportCsvBtn');

  let currentBills = [];
  let billChart = null;

  // Add new manual bill row
  addBillRowBtn.onclick = function() {
    const row = document.createElement('div');
    row.className = 'bill-row';
    row.innerHTML = `<input type="month" class="bill-month" required><input type="number" class="bill-amount" placeholder="Amount ($)" min="0" required>`;
    manualBills.appendChild(row);
  };

  // Parse CSV file
  function parseCSV(text) {
    const lines = text.trim().split('\n');
    const bills = [];
    for (let line of lines) {
      const [month, amount] = line.split(',');
      if (month && amount) bills.push({ month: month.trim(), amount: parseFloat(amount) });
    }
    return bills;
  }

  // Get bills from manual entry
  function getManualBills() {
    const rows = manualBills.querySelectorAll('.bill-row');
    const bills = [];
    rows.forEach(row => {
      const month = row.querySelector('.bill-month').value;
      const amount = parseFloat(row.querySelector('.bill-amount').value);
      if (month && !isNaN(amount)) bills.push({ month, amount });
    });
    return bills;
  }

  // Linear Regression Prediction
  function linearRegression(amounts) {
    if (amounts.length < 2) return amounts[amounts.length - 1];
    const n = amounts.length;
    const x = Array.from({length: n}, (_, i) => i + 1);
    const y = amounts;
    
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return slope * (n + 1) + intercept;
  }

  // Moving Average (3-month)
  function movingAverage(amounts) {
    if (amounts.length < 3) return amounts[amounts.length - 1];
    const last3 = amounts.slice(-3);
    return last3.reduce((a, b) => a + b, 0) / 3;
  }

  // Get month name from date string
  function getMonthName(monthStr) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [year, month] = monthStr.split('-');
    return months[parseInt(month) - 1] + ' ' + year;
  }

  // Get season from month
  function getSeason(monthStr) {
    const month = parseInt(monthStr.split('-')[1]);
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Fall';
    return 'Winter';
  }

  // Predict bills with multiple algorithms
  function predictBills(bills) {
    if (bills.length < 2) return { error: 'Please provide at least 2 bills.' };
    
    bills.sort((a, b) => a.month.localeCompare(b.month));
    const amounts = bills.map(b => b.amount);
    
    const avg = amounts.reduce((a, b) => a + b, 0) / amounts.length;
    const last = amounts[amounts.length - 1];
    const linearPred = linearRegression(amounts);
    const movingAvgPred = movingAverage(amounts);
    
    // Seasonal analysis
    const seasonData = {};
    bills.forEach(bill => {
      const season = getSeason(bill.month);
      if (!seasonData[season]) seasonData[season] = [];
      seasonData[season].push(bill.amount);
    });
    
    const seasonalStats = {};
    for (const [season, amounts] of Object.entries(seasonData)) {
      const seasonAvg = amounts.reduce((a, b) => a + b, 0) / amounts.length;
      seasonalStats[season] = {
        avg: seasonAvg,
        count: amounts.length,
        trend: seasonAvg > avg ? 'Higher' : 'Lower'
      };
    }
    
    // Generate recommendations
    const recommendations = generateRecommendations(last, avg, linearPred, seasonalStats, getSeason(bills[bills.length - 1].month));
    
    return {
      nextBill: movingAvgPred.toFixed(2),
      avg: avg.toFixed(2),
      linearPred: linearPred.toFixed(2),
      movingAvgPred: movingAvgPred.toFixed(2),
      last: last.toFixed(2),
      amounts,
      bills,
      seasonalStats,
      recommendations
    };
  }

  // Generate actionable recommendations
  function generateRecommendations(lastBill, avgBill, linearPred, seasonalStats, currentSeason) {
    const recommendations = [];
    
    if (lastBill > avgBill * 1.2) {
      recommendations.push({
        title: '⚠️ High Usage Alert',
        description: 'Your last bill was 20%+ higher than average. Check for AC/heating overuse or appliance leaks.',
        urgency: 'high'
      });
    }
    
    if (lastBill < avgBill * 0.8) {
      recommendations.push({
        title: '✅ Great Job!',
        description: 'Your last bill was 20%+ lower than average. Keep up these energy-saving habits!',
        urgency: 'low'
      });
    }
    
    if (linearPred > avgBill * 1.15) {
      recommendations.push({
        title: '📈 Upward Trend Detected',
        description: 'Your bills are trending upward. Consider upgrading to energy-efficient appliances.',
        urgency: 'medium'
      });
    }
    
    if (currentSeason === 'Summer' || currentSeason === 'Winter') {
      recommendations.push({
        title: '❄️/☀️ Seasonal Peak',
        description: `Peak energy season (${currentSeason}). Use programmable thermostats to reduce usage.`,
        urgency: 'medium'
      });
    }
    
    recommendations.push({
      title: '💡 General Tips',
      description: 'Switch to LED bulbs, use power strips, and unplug unused devices to save 10-15% monthly.',
      urgency: 'low'
    });
    
    return recommendations;
  }

  // Render prediction chart
  function renderChart(predictions) {
    const ctx = document.getElementById('billChart').getContext('2d');
    const labels = predictions.bills.map(b => getMonthName(b.month));
    const historicalData = predictions.amounts;
    
    // Create predicted data (all historical + future prediction)
    const predictedData = [...historicalData];
    predictedData.push(parseFloat(predictions.movingAvgPred));
    
    const predictedLabels = [...labels];
    predictedLabels.push('Next Month');
    
    if (billChart) billChart.destroy();
    
    billChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: predictedLabels,
        datasets: [
          {
            label: 'Actual Bills',
            data: [...historicalData, null],
            borderColor: '#1976d2',
            backgroundColor: 'rgba(25, 118, 210, 0.1)',
            borderWidth: 3,
            pointRadius: 6,
            pointBackgroundColor: '#1976d2',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            tension: 0.4,
            fill: true
          },
          {
            label: 'Moving Avg Prediction',
            data: Array(historicalData.length).fill(null).concat([parseFloat(predictions.movingAvgPred)]),
            borderColor: '#ff9800',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 6,
            pointBackgroundColor: '#ff9800',
            tension: 0
          },
          {
            label: 'Linear Regression',
            data: [...historicalData, parseFloat(predictions.linearPred)],
            borderColor: '#388e3c',
            borderDash: [3, 3],
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            labels: { font: { size: 12, weight: 'bold' }, color: '#333' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#333', callback: function(v) { return '$' + v; } },
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          },
          x: {
            ticks: { color: '#333' },
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          }
        }
      }
    });
  }

  // Render seasonal breakdown
  function renderSeasonalBreakdown(predictions) {
    const seasonalGrid = document.getElementById('seasonalGrid');
    const seasonOrder = ['Winter', 'Spring', 'Summer', 'Fall'];
    const seasonEmojis = { Winter: '❄️', Spring: '🌸', Summer: '☀️', Fall: '🍂' };
    
    seasonalGrid.innerHTML = seasonOrder.map(season => {
      const data = predictions.seasonalStats[season];
      if (!data) return '';
      return `
        <div class="seasonal-card">
          <div class="seasonal-emoji">${seasonEmojis[season]}</div>
          <div class="seasonal-season">${season}</div>
          <div class="seasonal-avg">Avg: $${data.avg.toFixed(2)}</div>
          <div class="seasonal-trend trend-${data.trend.toLowerCase()}">
            ${data.trend === 'Higher' ? '↑' : '↓'} ${data.trend} than yearly avg
          </div>
          <div class="seasonal-count">${data.count} month${data.count > 1 ? 's' : ''}</div>
        </div>
      `;
    }).join('');
  }

  // Render recommendations
  function renderRecommendations(predictions) {
    const recommendationsGrid = document.getElementById('recommendationsGrid');
    recommendationsGrid.innerHTML = predictions.recommendations.map(rec => `
      <div class="recommendation-card urgency-${rec.urgency}">
        <div class="recommendation-title">${rec.title}</div>
        <div class="recommendation-description">${rec.description}</div>
      </div>
    `).join('');
  }

  // CSV Export
  exportCsvBtn.addEventListener('click', function() {
    const csv = ['Month,Amount'];
    currentBills.forEach(bill => {
      csv.push(`${bill.month},${bill.amount}`);
    });
    
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energy-bills-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  });

  // Handle form submit
  billForm.onsubmit = function(e) {
    e.preventDefault();
    let bills = [];
    
    if (billUpload.files.length) {
      const file = billUpload.files[0];
      const reader = new FileReader();
      reader.onload = function(evt) {
        bills = parseCSV(evt.target.result);
        showResults(bills);
      };
      reader.readAsText(file);
      return;
    }
    
    bills = getManualBills();
    showResults(bills);
  };

  function showResults(bills) {
    const predictions = predictBills(bills);
    
    if (predictions.error) {
      predictionResults.style.display = 'block';
      predictionResults.innerHTML = `<div style='color:#c62828;'>${predictions.error}</div>`;
      return;
    }
    
    currentBills = bills;
    predictionResults.style.display = 'block';
    
    // Update prediction cards
    document.getElementById('nextBillDisplay').textContent = '$' + predictions.movingAvgPred;
    document.getElementById('avgBillDisplay').textContent = '$' + predictions.avg;
    document.getElementById('regressionDisplay').textContent = '$' + predictions.linearPred;
    document.getElementById('movingAvgDisplay').textContent = '$' + predictions.movingAvgPred;
    
    // Render visualizations
    renderChart(predictions);
    renderSeasonalBreakdown(predictions);
    renderRecommendations(predictions);
  }
});
