// Demo data and logic for UI preview
const demoAQI = {
  value: 72,
  status: 'Moderate',
  health: 'Unusually sensitive people should consider reducing prolonged or heavy exertion outdoors.'
};
const demoTrend = [
  { date: '2026-02-01', aqi: 65 },
  { date: '2026-02-02', aqi: 70 },
  { date: '2026-02-03', aqi: 80 },
  { date: '2026-02-04', aqi: 90 },
  { date: '2026-02-05', aqi: 60 },
  { date: '2026-02-06', aqi: 72 }
];
const demoAlerts = [
  'Air quality is moderate. Sensitive groups should limit outdoor activity.',
  'Check pollen levels if you have allergies.'
];
const improveTips = [
  'Use public transport or carpool to reduce emissions.',
  'Avoid burning trash or leaves.',
  'Plant trees and support green spaces.',
  'Maintain your vehicle for lower emissions.',
  'Use air purifiers indoors during high AQI days.'
];

document.addEventListener('DOMContentLoaded', () => {
  const aqiValue = document.getElementById('aqi-value');
  const aqiStatus = document.getElementById('aqi-status');
  const aqiHealth = document.getElementById('aqi-health');
  const alertsList = document.getElementById('alerts-list');
  const improveList = document.getElementById('improve-list');
  const fetchBtn = document.getElementById('fetch-btn');
  const locationInput = document.getElementById('location');

  // Show demo AQI
  function showAQI(data) {
    aqiValue.textContent = data.value;
    aqiStatus.textContent = data.status;
    aqiHealth.textContent = data.health;
  }
  showAQI(demoAQI);

  // Show demo alerts
  alertsList.innerHTML = '';
  demoAlerts.forEach(alert => {
    const div = document.createElement('div');
    div.textContent = alert;
    alertsList.appendChild(div);
  });

  // Show improvement tips
  improveTips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    improveList.appendChild(li);
  });

  // Show demo trend chart
  const ctx = document.getElementById('trend-chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: demoTrend.map(d => d.date),
      datasets: [{
        label: 'AQI',
        data: demoTrend.map(d => d.aqi),
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 150
        }
      }
    }
  });

  // Fetch button (future: connect to real API)
  fetchBtn.addEventListener('click', () => {
    const loc = locationInput.value.trim();
    if (!loc) {
      alert('Please enter a location.');
      return;
    }
    // TODO: Connect to backend/API for real data
    alert('Fetching real-time data for: ' + loc + '\n(Demo only)');
  });
});
