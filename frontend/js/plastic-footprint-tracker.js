// Plastic Footprint Tracker JS
let plasticLog = [];

document.getElementById('plasticLogForm').onsubmit = function(e) {
  e.preventDefault();
  const bottles = +document.getElementById('bottles').value;
  const bags = +document.getElementById('bags').value;
  const foodPackaging = +document.getElementById('foodPackaging').value;
  const otherPlastic = +document.getElementById('otherPlastic').value;
  const goal = +document.getElementById('plasticGoal').value;
  const total = bottles + bags + foodPackaging + otherPlastic;
  // Log for trend (simulate weekly log)
  plasticLog.push({ week: plasticLog.length + 1, total });
  if (plasticLog.length > 6) plasticLog.shift(); // keep last 6 weeks
  renderPlasticResults(total, bottles, bags, foodPackaging, otherPlastic, goal);
};

function renderPlasticResults(total, bottles, bags, foodPackaging, otherPlastic, goal) {
  const results = document.getElementById('plasticResults');
  results.style.display = 'flex';
  // Progress bar
  const percent = Math.min(100, Math.round((total / goal) * 100));
  // Trend chart (simple bar)
  let trendHtml = '';
  if (plasticLog.length > 1) {
    trendHtml = '<div style="margin:1.2em 0 0.5em 0; color:#185a9d; font-weight:600;">Last 6 Weeks Trend</div><div style="display:flex; gap:0.5em; align-items:end; height:60px;">';
    const max = Math.max(...plasticLog.map(l => l.total), goal);
    plasticLog.forEach(l => {
      const h = Math.round((l.total / max) * 55) + 5;
      trendHtml += `<div style='width:22px; height:${h}px; background:linear-gradient(135deg,#43cea2,#ffe066); border-radius:6px 6px 0 0; display:flex; align-items:flex-end; justify-content:center;'><span style='font-size:0.9em; color:#185a9d;'>${l.total}</span></div>`;
    });
    trendHtml += '</div>';
  }
  // Suggestions
  let suggestion = 'Great job! Try to keep reducing single-use plastics.';
  if (total > goal) suggestion = 'Try reusable bottles, bags, and bulk food to lower your plastic use.';
  else if (total > goal * 0.8) suggestion = 'You are close to your goal! Consider skipping packaged snacks or using cloth bags.';
  results.innerHTML = `
    <h2>This Week's Plastic Footprint</h2>
    <div style='font-size:2.2rem; color:#43cea2; font-weight:700;'>${total} items</div>
    <div class='plastic-breakdown'>
      <b>Breakdown:</b><br>
      Bottles: ${bottles}<br>
      Bags: ${bags}<br>
      Food Packaging: ${foodPackaging}<br>
      Other: ${otherPlastic}
    </div>
    <div class='plastic-progress'>
      <div class='plastic-progress-bar' style='width:${percent}%;'></div>
      <div class='plastic-progress-label'>${total}/${goal} items</div>
    </div>
    ${trendHtml}
    <div style='font-size:1.05rem; color:#185a9d; margin-top:1.2em;'>
      <i class='fa fa-lightbulb'></i> <b>Tip:</b> ${suggestion}
    </div>
  `;
}
