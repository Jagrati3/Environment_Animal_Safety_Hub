// Water Usage Insights & Analytics Logic
// Demo data and chart rendering for trends and breakdowns

// --- Demo Data: Array of usage records ---
// Each record: { date, category, usage }
const DEMO_USAGE_DATA = [
  { date: '2026-02-01', category: 'indoor', usage: 120 },
  { date: '2026-02-01', category: 'outdoor', usage: 60 },
  { date: '2026-02-01', category: 'other', usage: 20 },
  { date: '2026-02-02', category: 'indoor', usage: 110 },
  { date: '2026-02-02', category: 'outdoor', usage: 50 },
  { date: '2026-02-02', category: 'other', usage: 15 },
  { date: '2026-02-03', category: 'indoor', usage: 130 },
  { date: '2026-02-03', category: 'outdoor', usage: 70 },
  { date: '2026-02-03', category: 'other', usage: 25 },
  { date: '2026-02-04', category: 'indoor', usage: 100 },
  { date: '2026-02-04', category: 'outdoor', usage: 40 },
  { date: '2026-02-04', category: 'other', usage: 10 },
  { date: '2026-02-05', category: 'indoor', usage: 115 },
  { date: '2026-02-05', category: 'outdoor', usage: 55 },
  { date: '2026-02-05', category: 'other', usage: 18 },
  { date: '2026-02-06', category: 'indoor', usage: 125 },
  { date: '2026-02-06', category: 'outdoor', usage: 65 },
  { date: '2026-02-06', category: 'other', usage: 22 },
  { date: '2026-02-07', category: 'indoor', usage: 105 },
  { date: '2026-02-07', category: 'outdoor', usage: 45 },
  { date: '2026-02-07', category: 'other', usage: 12 }
];

// --- Utility: Parse date string to Date object ---
function parseDate(str) {
  const [y, m, d] = str.split('-');
  return new Date(Number(y), Number(m) - 1, Number(d));
}

// --- Filter and group data ---
function filterData(data, from, to, category) {
  return data.filter(row => {
    const dt = parseDate(row.date);
    if (from && dt < from) return false;
    if (to && dt > to) return false;
    if (category && category !== 'all' && row.category !== category) return false;
    return true;
  });
}

// --- Prepare data for trend chart (sum by date) ---
function getTrendData(data) {
  const byDate = {};
  data.forEach(row => {
    if (!byDate[row.date]) byDate[row.date] = 0;
    byDate[row.date] += row.usage;
  });
  const labels = Object.keys(byDate).sort();
  const values = labels.map(date => byDate[date]);
  return { labels, values };
}

// --- Prepare data for breakdown chart (sum by category) ---
function getBreakdownData(data) {
  const byCat = { indoor: 0, outdoor: 0, other: 0 };
  data.forEach(row => {
    if (byCat[row.category] !== undefined) byCat[row.category] += row.usage;
  });
  return {
    labels: Object.keys(byCat),
    values: Object.values(byCat)
  };
}

// --- Render charts ---
let trendChartInstance = null;
let breakdownChartInstance = null;
function renderCharts(data) {
  // Trend chart
  const trend = getTrendData(data);
  const ctx1 = document.getElementById('trendChart').getContext('2d');
  if (trendChartInstance) trendChartInstance.destroy();
  trendChartInstance = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: trend.labels,
      datasets: [{
        label: 'Total Usage (liters)',
        data: trend.values,
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33,150,243,0.08)',
        tension: 0.3,
        pointRadius: 4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Water Usage Trend'
        }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
  // Breakdown chart
  const breakdown = getBreakdownData(data);
  const ctx2 = document.getElementById('breakdownChart').getContext('2d');
  if (breakdownChartInstance) breakdownChartInstance.destroy();
  breakdownChartInstance = new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: breakdown.labels.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)),
      datasets: [{
        label: 'Usage by Category',
        data: breakdown.values,
        backgroundColor: ['#2196f3', '#43a047', '#ffb300']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        title: {
          display: true,
          text: 'Usage Breakdown by Category'
        }
      }
    }
  });
}

// --- Render insights ---
function renderInsights(data) {
  const list = document.getElementById('insights-list');
  list.innerHTML = '';
  if (data.length === 0) {
    list.innerHTML = '<li>No data for selected filters.</li>';
    return;
  }
  // Example insights
  const total = data.reduce((sum, row) => sum + row.usage, 0);
  const indoor = data.filter(r => r.category === 'indoor').reduce((s, r) => s + r.usage, 0);
  const outdoor = data.filter(r => r.category === 'outdoor').reduce((s, r) => s + r.usage, 0);
  const other = data.filter(r => r.category === 'other').reduce((s, r) => s + r.usage, 0);
  const maxDay = data.reduce((max, row) => row.usage > max.usage ? row : max, data[0]);
  list.innerHTML += `<li><b>Total usage:</b> ${total} liters</li>`;
  list.innerHTML += `<li><b>Indoor:</b> ${indoor} L, <b>Outdoor:</b> ${outdoor} L, <b>Other:</b> ${other} L</li>`;
  list.innerHTML += `<li><b>Highest single entry:</b> ${maxDay.usage} L on ${maxDay.date} (${maxDay.category})</li>`;
  if (indoor > outdoor) {
    list.innerHTML += '<li>Most water is used indoors. Consider checking for leaks or reducing shower time.</li>';
  } else {
    list.innerHTML += '<li>Outdoor usage is significant. Try watering garden in early morning or using rainwater.</li>';
  }
}

// --- Handle filters ---
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('filters-form');
  const fromInput = document.getElementById('date-from');
  const toInput = document.getElementById('date-to');
  const catSelect = document.getElementById('category-select');
  // Set default dates
  fromInput.value = '2026-02-01';
  toInput.value = '2026-02-07';
  function update() {
    const from = fromInput.value ? parseDate(fromInput.value) : null;
    const to = toInput.value ? parseDate(toInput.value) : null;
    const cat = catSelect.value;
    const filtered = filterData(DEMO_USAGE_DATA, from, to, cat);
    renderCharts(filtered);
    renderInsights(filtered);
  }
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    update();
  });
  // Initial render
  update();
});
// --- End of analytics.js ---
