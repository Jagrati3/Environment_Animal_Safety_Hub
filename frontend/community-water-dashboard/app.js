const usageForm = document.getElementById('usage-form');
const householdInput = document.getElementById('household');
const usageInput = document.getElementById('usage');
const tipsList = document.getElementById('tips-list');
const totalUsageValue = document.getElementById('total-usage-value');

let usageData = JSON.parse(localStorage.getItem('waterUsageData') || '[]');

const conservationTips = [
  'Fix leaky faucets and pipes promptly.',
  'Take shorter showers and turn off the tap while brushing teeth.',
  'Use full loads in dishwashers and washing machines.',
  'Collect rainwater for gardening.',
  'Water your garden during cooler hours to reduce evaporation.',
  'Install water-saving fixtures and appliances.'
];

function renderTips() {
  tipsList.innerHTML = '';
  conservationTips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    tipsList.appendChild(li);
  });
}

function renderChart() {
  const ctx = document.getElementById('usageChart').getContext('2d');
  if (window.usageChartInstance) {
    window.usageChartInstance.destroy();
  }
  const labels = usageData.map(entry => entry.household);
  const data = usageData.map(entry => entry.usage);
  window.usageChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Water Usage (liters)',
        data,
        backgroundColor: '#2196f3',
        borderRadius: 6,
        barPercentage: 0.7,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Household/Community Water Usage'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y} liters`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10
          }
        }
      }
    }
  });
  // Update total usage summary
  const total = usageData.reduce((sum, entry) => sum + entry.usage, 0);
  if (totalUsageValue) totalUsageValue.textContent = total;
}

usageForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const household = householdInput.value.trim();
  const usage = parseFloat(usageInput.value);
  if (!household || isNaN(usage) || usage < 0) return;
  usageData.push({ household, usage });
  localStorage.setItem('waterUsageData', JSON.stringify(usageData));
  renderChart();
  usageForm.reset();
});

// Initial render
renderTips();
renderChart();
