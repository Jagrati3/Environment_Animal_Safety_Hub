// Water Conservation Leaderboard Logic
// Loads, ranks, and displays households/communities by water-saving performance

// --- Configurable Baseline Data (could be replaced by API or user input) ---
const BASELINE_DATA = [
  { name: 'Green Family', baseline: 1200 },
  { name: 'Blue Community', baseline: 5000 },
  { name: 'Riverdale', baseline: 3200 },
  { name: 'Eco Warriors', baseline: 900 },
  { name: 'Sunset Villas', baseline: 2100 },
  { name: 'Aqua Group', baseline: 1800 },
  { name: 'Oceanview', baseline: 4000 },
  { name: 'Hilltop', baseline: 1500 },
  { name: 'Lakeside', baseline: 2500 },
  { name: 'Urban Oasis', baseline: 3500 }
];

// --- Load current usage data from localStorage (shared with dashboard) ---
function loadUsageData() {
  let data = [];
  try {
    data = JSON.parse(localStorage.getItem('waterUsageData') || '[]');
  } catch (e) {
    data = [];
  }
  return data;
}

// --- Merge baseline and current usage, calculate savings ---
function getLeaderboardData() {
  const usageData = loadUsageData();
  // Map by name for quick lookup
  const usageMap = {};
  usageData.forEach(entry => {
    usageMap[entry.household] = entry.usage;
  });
  // Merge and calculate
  return BASELINE_DATA.map(b => {
    const usage = usageMap[b.name] !== undefined ? usageMap[b.name] : b.baseline;
    const saved = Math.max(0, b.baseline - usage);
    const progress = b.baseline > 0 ? Math.max(0, Math.min(100, Math.round((saved / b.baseline) * 100))) : 0;
    return {
      name: b.name,
      baseline: b.baseline,
      usage,
      saved,
      progress
    };
  });
}

// --- Render leaderboard table ---
function renderLeaderboard(sortBy = 'savings', filter = '') {
  const tbody = document.querySelector('#leaderboard-table tbody');
  let data = getLeaderboardData();
  // Filter
  if (filter) {
    data = data.filter(row => row.name.toLowerCase().includes(filter.toLowerCase()));
  }
  // Sort
  if (sortBy === 'savings') {
    data.sort((a, b) => b.saved - a.saved);
  } else if (sortBy === 'usage') {
    data.sort((a, b) => a.usage - b.usage);
  } else if (sortBy === 'name') {
    data.sort((a, b) => a.name.localeCompare(b.name));
  }
  // Render
  tbody.innerHTML = '';
  if (data.length === 0) {
    document.getElementById('no-results').style.display = '';
    return;
  } else {
    document.getElementById('no-results').style.display = 'none';
  }
  data.forEach((row, idx) => {
    const tr = document.createElement('tr');
    if (idx === 0 && row.saved > 0) tr.classList.add('highlight');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${row.name}</td>
      <td>${row.usage}</td>
      <td>${row.saved}</td>
      <td><div class="progress-bar"><div class="progress-bar-inner" style="width:${row.progress}%;"></div></div> <span style="font-size:0.95em;">${row.progress}%</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// --- Event listeners for controls ---
document.addEventListener('DOMContentLoaded', function() {
  const sortSelect = document.getElementById('sort-select');
  const filterInput = document.getElementById('filter-input');
  // Initial render
  renderLeaderboard(sortSelect.value, filterInput.value);
  // Sort change
  sortSelect.addEventListener('change', function() {
    renderLeaderboard(sortSelect.value, filterInput.value);
  });
  // Filter change
  filterInput.addEventListener('input', function() {
    renderLeaderboard(sortSelect.value, filterInput.value);
  });
  // Listen for localStorage changes (if dashboard is open in another tab)
  window.addEventListener('storage', function(e) {
    if (e.key === 'waterUsageData') {
      renderLeaderboard(sortSelect.value, filterInput.value);
    }
  });
});

// --- Demo: Add random data for testing (remove in production) ---
// Uncomment below to auto-populate with random usage for demo
/*
(function demoPopulate() {
  if (!localStorage.getItem('waterUsageData')) {
    const demo = BASELINE_DATA.map(b => ({
      household: b.name,
      usage: Math.max(0, b.baseline - Math.floor(Math.random() * (b.baseline * 0.6)))
    }));
    localStorage.setItem('waterUsageData', JSON.stringify(demo));
  }
})();
*/

// --- End of leaderboard.js ---
