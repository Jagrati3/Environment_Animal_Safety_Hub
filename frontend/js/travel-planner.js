// Sustainable Travel Planner JS
// Emissions factors in grams CO2 per km (approximate)
const EMISSIONS = {
  car: 192,
  train: 41,
  bus: 105,
  flight: 255,
  bike: 0
};

function formatNumber(n) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

document.getElementById('travel-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const origin = document.getElementById('origin').value.trim();
  const destination = document.getElementById('destination').value.trim();
  const distance = parseFloat(document.getElementById('distance').value);
  const selectedMode = document.getElementById('mode').value;

  if (!origin || !destination || !distance || distance <= 0) {
    alert('Please fill in all fields with valid values.');
    return;
  }

  // Calculate emissions for all modes
  const results = Object.entries(EMISSIONS).map(([mode, factor]) => {
    return {
      mode,
      emissions: factor * distance
    };
  });

  // Find the most sustainable (lowest emissions)
  const best = results.reduce((min, curr) => curr.emissions < min.emissions ? curr : min, results[0]);

  // Show results
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '<h3>Estimated Emissions (one-way):</h3>' +
    results.map(r =>
      `<div class="mode-row"><span class="mode-label">${r.mode.charAt(0).toUpperCase() + r.mode.slice(1)}</span><span>${formatNumber(r.emissions)} g CO₂</span></div>`
    ).join('');
  resultsDiv.style.display = 'block';

  // Show summary
  const summaryDiv = document.getElementById('summary');
  summaryDiv.innerHTML = `<strong>Most Sustainable Option:</strong> <span style="color:#2e7d32;">${best.mode.charAt(0).toUpperCase() + best.mode.slice(1)}</span> <br> <small>(${formatNumber(best.emissions)} g CO₂ for ${distance} km)</small>`;
  summaryDiv.style.display = 'block';

  // Show tips
  document.getElementById('tips').style.display = 'block';
});
