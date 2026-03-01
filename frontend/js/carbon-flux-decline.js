// Demo data for Carbon Flux Decline Dashboard
const demoFluxData = [
  { depth: 100, flux: 120 },
  { depth: 500, flux: 80 },
  { depth: 1000, flux: 50 },
  { depth: 1500, flux: 30 },
  { depth: 2000, flux: 15 }
];

const demoPopulationData = [
  { depth: 100, population: 5000, metabolicActivity: 85 },
  { depth: 500, population: 3000, metabolicActivity: 70 },
  { depth: 1000, population: 1500, metabolicActivity: 55 },
  { depth: 1500, population: 800, metabolicActivity: 40 },
  { depth: 2000, population: 300, metabolicActivity: 25 }
];

const demoCorrelationData = [
  { flux: 120, survival: 90 },
  { flux: 80, survival: 75 },
  { flux: 50, survival: 60 },
  { flux: 30, survival: 45 },
  { flux: 15, survival: 30 }
];

const thresholds = [
  'Critical POC flux threshold: Below 20 mg/m²/day leads to significant population decline.',
  'Metabolic activity drops below 50% when flux is under 40 mg/m²/day.',
  'Conservation recommendation: Monitor flux rates during winter months.',
  'Model implication: Reduced carbon cycling affects deep-sea ecosystem resilience.'
];

document.addEventListener('DOMContentLoaded', () => {
  const fluxDataDiv = document.getElementById('flux-data');
  const populationDataDiv = document.getElementById('population-data');
  const correlationDataDiv = document.getElementById('correlation-data');
  const thresholdsList = document.getElementById('thresholds-list');

  // Display flux data
  fluxDataDiv.innerHTML = '<h3>POC Flux Rates (mg/m²/day)</h3>' +
    demoFluxData.map(d => `<p>Depth ${d.depth}m: ${d.flux}</p>`).join('');

  // Display population data
  populationDataDiv.innerHTML = '<h3>Organism Populations & Activity</h3>' +
    demoPopulationData.map(d => `<p>Depth ${d.depth}m: Population ${d.population}, Activity ${d.metabolicActivity}%</p>`).join('');

  // Display correlation data
  correlationDataDiv.innerHTML = '<h3>Survival vs. Flux Correlation</h3>' +
    demoCorrelationData.map(d => `<p>Flux ${d.flux}: Survival ${d.survival}%</p>`).join('');

  // Display thresholds
  thresholdsList.innerHTML = thresholds.map(t => `<li>${t}</li>`).join('');

  // Charts using Chart.js
  const fluxCtx = document.getElementById('flux-chart').getContext('2d');
  new Chart(fluxCtx, {
    type: 'line',
    data: {
      labels: demoFluxData.map(d => d.depth + 'm'),
      datasets: [{
        label: 'POC Flux (mg/m²/day)',
        data: demoFluxData.map(d => d.flux),
        borderColor: '#2e7d32',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
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

  const populationCtx = document.getElementById('population-chart').getContext('2d');
  new Chart(populationCtx, {
    type: 'bar',
    data: {
      labels: demoPopulationData.map(d => d.depth + 'm'),
      datasets: [{
        label: 'Population',
        data: demoPopulationData.map(d => d.population),
        backgroundColor: '#4caf50'
      }, {
        label: 'Metabolic Activity (%)',
        data: demoPopulationData.map(d => d.metabolicActivity),
        backgroundColor: '#81c784'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  const correlationCtx = document.getElementById('correlation-chart').getContext('2d');
  new Chart(correlationCtx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Survival vs. Flux',
        data: demoCorrelationData.map(d => ({ x: d.flux, y: d.survival })),
        backgroundColor: '#2e7d32'
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { type: 'linear', position: 'bottom', title: { display: true, text: 'POC Flux (mg/m²/day)' } },
        y: { beginAtZero: true, title: { display: true, text: 'Survival Rate (%)' } }
      }
    }
  });
});