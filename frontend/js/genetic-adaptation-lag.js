// Demo data for Genetic Adaptation Lag Dashboard
const demoAdaptationData = [
  { year: 2000, rate: 0.5 },
  { year: 2005, rate: 0.7 },
  { year: 2010, rate: 0.9 },
  { year: 2015, rate: 1.2 },
  { year: 2020, rate: 1.5 },
  { year: 2025, rate: 1.8 }
];

const demoChangeData = [
  { year: 2000, speed: 0.2 },
  { year: 2005, speed: 0.4 },
  { year: 2010, speed: 0.8 },
  { year: 2015, speed: 1.5 },
  { year: 2020, speed: 2.0 },
  { year: 2025, speed: 2.5 }
];

const demoLagData = [
  { changeSpeed: 0.2, lag: 0.1 },
  { changeSpeed: 0.4, lag: 0.3 },
  { changeSpeed: 0.8, lag: 0.6 },
  { changeSpeed: 1.5, lag: 1.0 },
  { changeSpeed: 2.0, lag: 1.5 },
  { changeSpeed: 2.5, lag: 2.0 }
];

const demoVulnerableData = [
  { population: 'Species A', risk: 30 },
  { population: 'Species B', risk: 50 },
  { population: 'Species C', risk: 70 },
  { population: 'Species D', risk: 90 }
];

const recommendations = [
  'Adaptation lag increases significantly when environmental change speed exceeds 1.0 units/year.',
  'Species with slow genetic response rates are most vulnerable.',
  'Conservation priority: Protect populations with high adaptation lag risk.',
  'Model implication: Rapid climate shifts may lead to evolutionary mismatches in ecosystems.'
];

document.addEventListener('DOMContentLoaded', () => {
  const adaptationDataDiv = document.getElementById('adaptation-data');
  const changeDataDiv = document.getElementById('change-data');
  const lagDataDiv = document.getElementById('lag-data');
  const vulnerableDataDiv = document.getElementById('vulnerable-data');
  const recommendationsList = document.getElementById('recommendations-list');

  // Display adaptation data
  adaptationDataDiv.innerHTML = '<h3>Adaptation Rate (units/year)</h3>' +
    demoAdaptationData.map(d => `<p>${d.year}: ${d.rate}</p>`).join('');

  // Display change data
  changeDataDiv.innerHTML = '<h3>Change Speed (units/year)</h3>' +
    demoChangeData.map(d => `<p>${d.year}: ${d.speed}</p>`).join('');

  // Display lag data
  lagDataDiv.innerHTML = '<h3>Lag (years)</h3>' +
    demoLagData.map(d => `<p>Change Speed ${d.changeSpeed}: Lag ${d.lag}</p>`).join('');

  // Display vulnerable data
  vulnerableDataDiv.innerHTML = '<h3>Risk Level (%)</h3>' +
    demoVulnerableData.map(d => `<p>${d.population}: ${d.risk}%</p>`).join('');

  // Display recommendations
  recommendationsList.innerHTML = recommendations.map(r => `<li>${r}</li>`).join('');

  // Charts using Chart.js
  const adaptationCtx = document.getElementById('adaptation-chart').getContext('2d');
  new Chart(adaptationCtx, {
    type: 'line',
    data: {
      labels: demoAdaptationData.map(d => d.year),
      datasets: [{
        label: 'Adaptation Rate',
        data: demoAdaptationData.map(d => d.rate),
        borderColor: '#7b1fa2',
        backgroundColor: 'rgba(123, 31, 162, 0.1)',
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  const changeCtx = document.getElementById('change-chart').getContext('2d');
  new Chart(changeCtx, {
    type: 'line',
    data: {
      labels: demoChangeData.map(d => d.year),
      datasets: [{
        label: 'Environmental Change Speed',
        data: demoChangeData.map(d => d.speed),
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  const lagCtx = document.getElementById('lag-chart').getContext('2d');
  new Chart(lagCtx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Adaptation Lag',
        data: demoLagData.map(d => ({ x: d.changeSpeed, y: d.lag })),
        backgroundColor: '#7b1fa2'
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { type: 'linear', position: 'bottom', title: { display: true, text: 'Change Speed' } },
        y: { beginAtZero: true, title: { display: true, text: 'Lag (years)' } }
      }
    }
  });

  const vulnerableCtx = document.getElementById('vulnerable-chart').getContext('2d');
  new Chart(vulnerableCtx, {
    type: 'bar',
    data: {
      labels: demoVulnerableData.map(d => d.population),
      datasets: [{
        label: 'Vulnerability Risk (%)',
        data: demoVulnerableData.map(d => d.risk),
        backgroundColor: '#f44336'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
});