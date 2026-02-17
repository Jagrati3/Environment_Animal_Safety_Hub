// Smart Energy Usage Tracker JS
// Handles energy tracking, goal progress, and recommendations

document.addEventListener('DOMContentLoaded', function() {
  // --- Tracker ---
  const form = document.getElementById('energyTrackerForm');
  const resultDiv = document.getElementById('trackerResult');
  let lastTotal = null;

  function calculateEnergy(e) {
    if (e) e.preventDefault();
    const lighting = parseInt(document.getElementById('lighting').value) || 0;
    const appliances = parseInt(document.getElementById('appliances').value) || 0;
    const heating = parseInt(document.getElementById('heating').value) || 0;
    const other = parseInt(document.getElementById('other').value) || 0;
    const total = lighting + appliances + heating + other;
    lastTotal = total;
    resultDiv.textContent = `Your estimated monthly energy usage: ${total} kWh`;
    updateGoal();
    updateRecommendations();
  }
  form.addEventListener('submit', calculateEnergy);

  // --- Goal Tracking ---
  const goalBar = document.getElementById('goalBar');
  const goalLabel = document.getElementById('goalLabel');
  const goalForm = document.getElementById('goalForm');
  const goalInput = document.getElementById('goal');
  let goal = parseInt(goalInput.value) || 250;

  function updateGoal() {
    if (lastTotal === null) return;
    if (!goal || goal <= 0) {
      goalLabel.textContent = 'Set a monthly energy usage goal to start tracking!';
      goalBar.style.width = '0%';
      return;
    }
    const percent = Math.max(0, Math.min(100, 100 * (1 - lastTotal / goal)));
    goalBar.style.width = percent + '%';
    if (lastTotal <= goal) {
      goalLabel.textContent = `Great job! You met your goal (${lastTotal} / ${goal} kWh)`;
      goalBar.style.background = 'linear-gradient(90deg, #43a047 0%, #00acc1 100%)';
    } else {
      goalLabel.textContent = `Current: ${lastTotal} / Goal: ${goal} kWh`;
      goalBar.style.background = 'linear-gradient(90deg, #0288d1 0%, #00acc1 100%)';
    }
  }
  goalForm.addEventListener('submit', function(e) {
    e.preventDefault();
    goal = parseInt(goalInput.value) || 250;
    updateGoal();
    updateRecommendations();
  });

  // --- Recommendations ---
  function updateRecommendations() {
    const recs = [];
    if (lastTotal === null) {
      recs.push('Enter your energy usage to see recommendations.');
    } else {
      if (lastTotal > goal) {
        recs.push('Switch to LED bulbs and turn off lights when not needed.');
        recs.push('Unplug appliances and use smart power strips.');
        recs.push('Set thermostat efficiently and maintain HVAC systems.');
        recs.push('Use energy-efficient appliances and limit standby power.');
        recs.push('Consider solar panels or green energy providers.');
      } else {
        recs.push('Your energy usage is within your goal! Keep up the good work.');
      }
    }
    const recommendList = document.getElementById('recommendList');
    recommendList.innerHTML = '';
    recs.forEach(r => {
      const li = document.createElement('li');
      li.textContent = r;
      recommendList.appendChild(li);
    });
  }

  // Initial calculation
  calculateEnergy();
});
