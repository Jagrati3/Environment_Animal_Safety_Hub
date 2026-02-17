// Green Home Energy Dashboard Sample Data and Logic
const energyData = {
  // More realistic and varied sample data
  daily: [14, 13, 15, 12, 11, 16, 10],
  weekly: [92, 88, 95, 90, 85, 98, 80],
  monthly: [340, 325, 310, 355, 330, 320, 315],
  appliances: [
    { name: 'Refrigerator', usage: 110 },
    { name: 'Air Conditioner', usage: 70 },
    { name: 'Washing Machine', usage: 35 },
    { name: 'Lighting', usage: 55 },
    { name: 'TV', usage: 22 },
    { name: 'Computer', usage: 18 },
    { name: 'Microwave', usage: 12 },
    { name: 'Others', usage: 13 }
  ],
  goal: 320,
  tips: [
    'Unplug chargers and electronics when not in use.',
    'Switch to LED or smart lighting.',
    'Use cold water for laundry.',
    'Set your AC to 24°C or higher.',
    'Run appliances during off-peak hours.',
    'Seal windows and doors to prevent leaks.',
    'Defrost your freezer regularly.',
    'Dry clothes naturally instead of using a dryer.'
  ]
};

function renderEnergyDashboard() {
  // Render goal progress
  const goal = energyData.goal;
  const monthly = energyData.monthly[energyData.monthly.length - 1];
  const percent = Math.min(100, Math.round((monthly / goal) * 100));
  if (document.getElementById('goal-value'))
    document.getElementById('goal-value').textContent = goal;
  if (document.getElementById('goal-progress-bar'))
    document.getElementById('goal-progress-bar').style.width = percent + '%';
  if (document.getElementById('goal-status')) {
    document.getElementById('goal-status').textContent = monthly <= goal ? 'On Track! 🎉' : 'Over Goal! ⚠️';
    document.getElementById('goal-status').style.color = monthly <= goal ? '#228B22' : '#d32f2f';
  }
  if (document.getElementById('eco-score')) {
    document.getElementById('eco-score').textContent = monthly <= goal ? 'A' : 'B';
  }

  // Render appliance breakdown
  const applianceList = document.getElementById('appliance-list');
  if (applianceList) {
    applianceList.innerHTML = '';
    energyData.appliances.forEach(a => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${a.name}</span><span>${a.usage} kWh</span>`;
      applianceList.appendChild(li);
    });
  }

  // Render tips
  const tipsList = document.getElementById('energy-tips');
  if (tipsList) {
    tipsList.innerHTML = '';
    energyData.tips.forEach(tip => {
      const li = document.createElement('li');
      li.textContent = tip;
      tipsList.appendChild(li);
    });
  }

  // Render charts
  if (window.Chart) {
    const chartColors = ['#43e97b', '#38f9d7', '#228B22', '#b2f7ef', '#f6fff6'];
    if (document.getElementById('dailyChart')) {
      new Chart(document.getElementById('dailyChart').getContext('2d'), {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'kWh',
            data: energyData.daily,
            backgroundColor: 'rgba(67,233,123,0.15)',
            borderColor: chartColors[0],
            borderWidth: 3,
            pointRadius: 5,
            fill: true,
            tension: 0.4
          }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
      });
    }
    if (document.getElementById('weeklyChart')) {
      new Chart(document.getElementById('weeklyChart').getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
          datasets: [{
            label: 'kWh',
            data: energyData.weekly,
            backgroundColor: chartColors[1],
            borderRadius: 8
          }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
      });
    }
    if (document.getElementById('monthlyChart')) {
      new Chart(document.getElementById('monthlyChart').getContext('2d'), {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'kWh',
            data: energyData.monthly,
            backgroundColor: 'rgba(56,249,215,0.15)',
            borderColor: chartColors[2],
            borderWidth: 3,
            pointRadius: 5,
            fill: true,
            tension: 0.4
          }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
      });
    }
  }
}
}

document.addEventListener('DOMContentLoaded', renderEnergyDashboard);
