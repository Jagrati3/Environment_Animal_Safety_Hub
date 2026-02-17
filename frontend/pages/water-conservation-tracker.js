// Water Conservation Tracker JS
// Handles water usage tracking, goal progress, and education tips

document.addEventListener('DOMContentLoaded', function() {
  // --- Tracker ---
  const form = document.getElementById('waterTrackerForm');
  const resultDiv = document.getElementById('trackerResult');
  let lastTotal = null;

  function calculateWater(e) {
    if (e) e.preventDefault();
    const showers = parseInt(document.getElementById('showers').value) || 0;
    const laundry = parseInt(document.getElementById('laundry').value) || 0;
    const dishes = parseInt(document.getElementById('dishes').value) || 0;
    const toilet = parseInt(document.getElementById('toilet').value) || 0;
    const other = parseInt(document.getElementById('other').value) || 0;
    const total = showers + laundry + dishes + toilet + other;
    lastTotal = total;
    resultDiv.textContent = `Your estimated weekly water usage: ${total} liters`;
    updateGoal();
  }
  form.addEventListener('submit', calculateWater);

  // --- Goal Tracking ---
  const goalBar = document.getElementById('goalBar');
  const goalLabel = document.getElementById('goalLabel');
  const goalForm = document.getElementById('goalForm');
  const goalInput = document.getElementById('goal');
  let goal = parseInt(goalInput.value) || 700;

  function updateGoal() {
    if (lastTotal === null) return;
    if (!goal || goal <= 0) {
      goalLabel.textContent = 'Set a weekly water usage goal to start tracking!';
      goalBar.style.width = '0%';
      return;
    }
    const percent = Math.max(0, Math.min(100, 100 * (1 - lastTotal / goal)));
    goalBar.style.width = percent + '%';
    if (lastTotal <= goal) {
      goalLabel.textContent = `Great job! You met your goal (${lastTotal} / ${goal} liters)`;
      goalBar.style.background = 'linear-gradient(90deg, #43a047 0%, #00acc1 100%)';
    } else {
      goalLabel.textContent = `Current: ${lastTotal} / Goal: ${goal} liters`;
      goalBar.style.background = 'linear-gradient(90deg, #0288d1 0%, #00acc1 100%)';
    }
  }
  goalForm.addEventListener('submit', function(e) {
    e.preventDefault();
    goal = parseInt(goalInput.value) || 700;
    updateGoal();
  });

  // --- Education Tips ---
  const tips = [
    'Take shorter showers and turn off water while soaping.',
    'Fix leaks promptly to prevent water waste.',
    'Run dishwashers and washing machines only with full loads.',
    'Install low-flow showerheads and faucet aerators.',
    'Collect rainwater for garden use.',
    'Water your garden early or late to reduce evaporation.',
    'Use a broom instead of a hose to clean driveways and sidewalks.',
    'Educate your community about water conservation.'
  ];
  const educationList = document.getElementById('educationList');
  tips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    educationList.appendChild(li);
  });

  // Initial calculation
  calculateWater();
});
