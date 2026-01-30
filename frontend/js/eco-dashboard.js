// eco-dashboard.js
// Personal Eco Score Dashboard logic

// --- Config ---
const CATEGORIES = [
  { name: 'Transportation', color: '#00bcd4', icon: '🚲' },
  { name: 'Energy', color: '#ffb300', icon: '💡' },
  { name: 'Waste', color: '#43a047', icon: '🗑️' },
  { name: 'Water', color: '#1976d2', icon: '💧' },
  { name: 'Food', color: '#e57373', icon: '🥦' }
];
const ECO_TIPS = [
  'Take shorter showers to save water.',
  'Bike or walk instead of driving.',
  'Unplug devices when not in use.',
  'Compost your food scraps.',
  'Eat more plant-based meals.',
  'Use reusable bags and bottles.',
  'Turn off lights when leaving a room.',
  'Recycle paper, plastic, and glass.',
  'Collect rainwater for plants.',
  'Plan meals to reduce food waste.'
];
const BADGES = [
  { icon: '🌱', label: 'Starter', condition: score => score >= 10 },
  { icon: '🌿', label: 'Eco Enthusiast', condition: score => score >= 50 },
  { icon: '🌳', label: 'Green Hero', condition: score => score >= 100 },
  { icon: '🏆', label: 'Eco Champion', condition: score => score >= 200 }
];

// --- State ---
let state = {
  score: 0,
  categories: CATEGORIES.map(cat => ({ ...cat, value: 0 })),
  history: [], // [{week: 1, score: 10}, ...]
  goal: 100,
  ecoTipIndex: 0
};

// --- LocalStorage ---
function loadState() {
  const saved = localStorage.getItem('ecoDashboard');
  if (saved) {
    state = { ...state, ...JSON.parse(saved) };
  }
}
function saveState() {
  localStorage.setItem('ecoDashboard', JSON.stringify(state));
}

// --- UI Rendering ---
function animateScore(target) {
  const el = document.getElementById('eco-score');
  let current = +el.textContent;
  const step = () => {
    if (current === target) return;
    current += (target - current) / 8;
    if (Math.abs(target - current) < 1) current = target;
    el.textContent = Math.round(current);
    if (current !== target) requestAnimationFrame(step);
  };
  step();
}
function renderScore() {
  animateScore(state.score);
}
function renderCharts() {
  const container = document.getElementById('progress-charts');
  container.innerHTML = '';
  state.categories.forEach(cat => {
    const percent = state.score ? Math.round((cat.value / state.score) * 100) : 0;
    const chart = document.createElement('div');
    chart.className = 'progress-chart';
    chart.innerHTML = `
      <canvas width="90" height="90" id="chart-${cat.name}"></canvas>
      <div style="margin-top:8px;font-weight:bold;">${cat.icon} ${cat.name}</div>
      <div style="color:${cat.color};font-size:1.1rem;">${cat.value} pts</div>
    `;
    container.appendChild(chart);
    drawCircleChart(`chart-${cat.name}`, percent, cat.color);
  });
}
function drawCircleChart(id, percent, color) {
  const ctx = document.getElementById(id).getContext('2d');
  ctx.clearRect(0,0,90,90);
  ctx.beginPath();
  ctx.arc(45,45,38,0,2*Math.PI);
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(45,45,38,-Math.PI/2,2*Math.PI*(percent/100)-Math.PI/2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.font = 'bold 1.1rem Segoe UI, Arial';
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(percent + '%', 45, 45);
}
function renderBadges() {
  const container = document.getElementById('badges-section');
  container.innerHTML = '';
  BADGES.forEach(badge => {
    if (badge.condition(state.score)) {
      const el = document.createElement('div');
      el.className = 'badge';
      el.title = badge.label;
      el.textContent = badge.icon;
      container.appendChild(el);
    }
  });
}
function renderEcoTip() {
  const tip = ECO_TIPS[state.ecoTipIndex % ECO_TIPS.length];
  document.getElementById('eco-tip').textContent = tip;
}
function renderGoal() {
  const progress = state.goal ? Math.min(100, Math.round((state.score / state.goal) * 100)) : 0;
  document.getElementById('goal-progress').textContent = progress;
}
function renderComparisonGraph() {
  const ctx = document.getElementById('comparison-graph').getContext('2d');
  if (window.comparisonChart) window.comparisonChart.destroy();
  window.comparisonChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: state.history.map((h,i) => `W${i+1}`),
      datasets: [{
        label: 'Eco Score',
        data: state.history.map(h => h.score),
        borderColor: '#2ecc40',
        backgroundColor: 'rgba(46,204,64,0.1)',
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// --- Confetti ---
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const confetti = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    r: 6 + Math.random() * 8,
    d: 2 + Math.random() * 4,
    color: `hsl(${Math.random()*360},80%,60%)`,
    tilt: Math.random() * 10
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
      ctx.fillStyle = c.color;
      ctx.fill();
      c.y += c.d;
      c.x += Math.sin(frame/10 + c.tilt) * 2;
      if (c.y > canvas.height) c.y = -10;
    });
    frame++;
    if (frame < 120) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  draw();
}

// --- Event Handlers ---
function addPoints(categoryIdx, pts) {
  state.categories[categoryIdx].value += pts;
  state.score += pts;
  saveState();
  renderAll();
  if (BADGES.some(b => b.condition(state.score) && !b.condition(state.score-pts))) {
    launchConfetti();
  }
}
function setGoal() {
  const val = parseInt(document.getElementById('goal-input').value, 10);
  if (val > 0) {
    state.goal = val;
    saveState();
    renderGoal();
  }
}
function nextEcoTip() {
  state.ecoTipIndex = (state.ecoTipIndex + 1) % ECO_TIPS.length;
  saveState();
  renderEcoTip();
}
function exportAsImage() {
  html2canvas(document.getElementById('eco-dashboard')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'eco-score-dashboard.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

// --- Main Render ---
function renderAll() {
  renderScore();
  renderCharts();
  renderBadges();
  renderEcoTip();
  renderGoal();
  renderComparisonGraph();
}

// --- Setup ---
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderAll();
  // Add demo buttons for adding points (for demo only)
  const charts = document.getElementById('progress-charts');
  CATEGORIES.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.textContent = `+5 ${cat.name}`;
    btn.style = `margin:4px 8px 0 0; background:${cat.color}; color:#fff; border:none; border-radius:6px; padding:6px 12px; cursor:pointer;`;
    btn.onclick = () => addPoints(i, 5);
    charts.appendChild(btn);
  });
  document.getElementById('set-goal-btn').onclick = setGoal;
  document.getElementById('eco-tip').onclick = nextEcoTip;
  document.getElementById('export-btn').onclick = exportAsImage;
});

// --- html2canvas loader for export ---
(function loadHtml2Canvas() {
  if (!window.html2canvas) {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    document.head.appendChild(s);
  }
})();
