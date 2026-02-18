// Plastic Footprint Calculator JS
// Handles calculation, progress tracking, and tips

document.addEventListener('DOMContentLoaded', function() {
  // --- Calculator ---
  const form = document.getElementById('plasticCalcForm');
  const resultDiv = document.getElementById('calcResult');
  let lastTotal = null;

  function calculatePlastic(e) {
    if (e) e.preventDefault();
    const bottles = parseInt(document.getElementById('bottles').value) || 0;
    const bags = parseInt(document.getElementById('bags').value) || 0;
    const packaging = parseInt(document.getElementById('packaging').value) || 0;
    const cups = parseInt(document.getElementById('cups').value) || 0;
    const utensils = parseInt(document.getElementById('utensils').value) || 0;
    const total = bottles + bags + packaging + cups + utensils;
    lastTotal = total;
    resultDiv.textContent = `Your estimated weekly plastic usage: ${total} items`;
    updateProgress();
  }
  form.addEventListener('submit', calculatePlastic);

  // --- Progress Tracking ---
  const progressBar = document.getElementById('progressBar');
  const progressLabel = document.getElementById('progressLabel');
  const goalForm = document.getElementById('goalForm');
  const goalInput = document.getElementById('goal');
  let goal = parseInt(goalInput.value) || 10;

  function updateProgress() {
    if (lastTotal === null) return;
    if (!goal || goal <= 0) {
      progressLabel.textContent = 'Set a reduction goal to start tracking!';
      progressBar.style.width = '0%';
      return;
    }
    const percent = Math.max(0, Math.min(100, 100 * (1 - lastTotal / goal)));
    progressBar.style.width = percent + '%';
    if (lastTotal <= goal) {
      progressLabel.textContent = `Congratulations! You met your goal (${lastTotal} / ${goal} items)`;
      progressBar.style.background = 'linear-gradient(90deg, #43a047 0%, #fbc02d 100%)';
    } else {
      progressLabel.textContent = `Current: ${lastTotal} / Goal: ${goal} items`;
      progressBar.style.background = 'linear-gradient(90deg, #0288d1 0%, #fbc02d 100%)';
    }
  }
  goalForm.addEventListener('submit', function(e) {
    e.preventDefault();
    goal = parseInt(goalInput.value) || 10;
    updateProgress();
  });

  // --- Tips ---
  const tips = [
    'Carry a reusable water bottle and coffee cup.',
    'Use cloth bags instead of plastic bags.',
    'Buy products with minimal or recyclable packaging.',
    'Say no to single-use straws and utensils.',
    'Choose bar soap over liquid soap in plastic bottles.',
    'Shop at bulk stores to reduce packaging.',
    'Store food in glass or metal containers.',
    'Participate in local plastic clean-up events.'
  ];
  const tipsList = document.getElementById('tipsList');
  tips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    tipsList.appendChild(li);
  });

  // Initial calculation
  calculatePlastic();
});
