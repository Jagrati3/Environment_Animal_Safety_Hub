// Demo local average (kWh)
const localAverage = {
  solar: 120,
  wind: 80,
  hydro: 60,
  other: 40
};

let energyEntries = [];

function renderEnergyChart() {
  const chart = document.getElementById('energyChart');
  chart.innerHTML = '';
  if (energyEntries.length === 0) {
    chart.innerHTML = '<p style="color:#888;text-align:center;">No entries yet. Log your renewable energy usage above!</p>';
    return;
  }
  // Group by type
  const grouped = energyEntries.reduce((acc, entry) => {
    acc[entry.type] = (acc[entry.type] || 0) + entry.amount;
    return acc;
  }, {});
  // Render bars
  Object.keys(grouped).forEach(type => {
    const bar = document.createElement('div');
    bar.style.margin = '1rem 0';
    bar.innerHTML = `
      <div style="font-weight:600;color:#43cea2;">${capitalize(type)}: ${grouped[type]} kWh</div>
      <div style="background:#eafaf1;border-radius:8px;height:28px;width:100%;position:relative;">
        <div style="background:#43cea2;height:28px;border-radius:8px;width:${Math.min(grouped[type]/2,100)}%;transition:width 0.3s;"></div>
      </div>
    `;
    chart.appendChild(bar);
  });
}

function renderSavingsInfo() {
  const info = document.getElementById('savingsInfo');
  if (energyEntries.length === 0) {
    info.innerHTML = '<p style="color:#888;">No data to compare yet.</p>';
    return;
  }
  // Group by type
  const grouped = energyEntries.reduce((acc, entry) => {
    acc[entry.type] = (acc[entry.type] || 0) + entry.amount;
    return acc;
  }, {});
  let html = '';
  Object.keys(localAverage).forEach(type => {
    const userVal = grouped[type] || 0;
    const avgVal = localAverage[type];
    const savings = userVal - avgVal;
    html += `<div style="margin-bottom:0.7rem;">
      <strong>${capitalize(type)}:</strong> You: <span style="color:#43cea2;font-weight:600;">${userVal} kWh</span> | Local Avg: <span style="color:#185a9d;font-weight:600;">${avgVal} kWh</span><br>
      <span style="color:${savings>=0?'#43cea2':'#d9534f'};font-weight:600;">${savings>=0?'Above':'Below'} average by ${Math.abs(savings)} kWh</span>
    </div>`;
  });
  info.innerHTML = html;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

document.getElementById('energyForm').onsubmit = function(e) {
  e.preventDefault();
  const type = document.getElementById('energyType').value;
  const amount = parseFloat(document.getElementById('energyAmount').value);
  if (!type || isNaN(amount) || amount < 0) return;
  energyEntries.push({type, amount});
  renderEnergyChart();
  renderSavingsInfo();
  this.reset();
};

// Initial render
renderEnergyChart();
renderSavingsInfo();