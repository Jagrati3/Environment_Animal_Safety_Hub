// Silent Ecological Grief JS
// Handles emotion selection, action plans, progress, history, feedback

let actionPlans = {
  fear: [
    'Learn about local climate solutions.',
    'Join a community group for support.',
    'Take one small action: plant a tree, reduce energy use.'
  ],
  sadness: [
    'Connect with others feeling the same.',
    'Volunteer for a restoration project.',
    'Write or share your story.'
  ],
  guilt: [
    'Offset your footprint with a donation.',
    'Switch to eco-friendly products.',
    'Mentor someone on sustainability.'
  ],
  helplessness: [
    'Start a daily eco-habit tracker.',
    'Celebrate small wins and share progress.',
    'Ask for help or join a challenge.'
  ],
  overwhelmed: [
    'Limit news intake, focus on action.',
    'Break goals into tiny steps.',
    'Reward yourself for each completed action.'
  ]
};
let progress = {
  completed: 0,
  total: 0,
  sevenDayReturn: 0,
  overwhelmedReports: 0
};
let planHistory = [];
let feedbacks = [];

// --- App Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const emotionForm = document.getElementById('emotionForm');
  const emotionSelect = document.getElementById('emotionSelect');
  const actionPlan = document.getElementById('actionPlan');
  const progressTracker = document.getElementById('progressTracker');
  const planHistoryDiv = document.getElementById('planHistory');
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackInput = document.getElementById('feedbackInput');
  const feedbackList = document.getElementById('feedbackList');

  // Get action plan
  emotionForm.onsubmit = function(e) {
    e.preventDefault();
    const emotion = emotionSelect.value;
    if (!emotion || !actionPlans[emotion]) return;
    renderActionPlan(emotion);
    progress.total += actionPlans[emotion].length;
    planHistory.push({ emotion, date: new Date().toLocaleString() });
    renderHistory();
    emotionForm.reset();
  };

  // Render action plan
  function renderActionPlan(emotion) {
    actionPlan.innerHTML = '';
    actionPlans[emotion].forEach((a, idx) => {
      actionPlan.innerHTML += `<div class='action-row'><span>${a}</span><button onclick='window.completeAction(${idx})'>Complete</button></div>`;
    });
  }

  // Complete action
  function completeAction(idx) {
    progress.completed++;
    renderProgress();
    actionPlan.querySelectorAll('.action-row')[idx].style.opacity = 0.5;
    actionPlan.querySelectorAll('.action-row')[idx].querySelector('button').disabled = true;
  }

  // Render progress
  function renderProgress() {
    progressTracker.innerHTML = '';
    progressTracker.innerHTML += `<div class='progress-row'><span>Completed Actions</span><span>${progress.completed}</span></div>`;
    progressTracker.innerHTML += `<div class='progress-row'><span>Total Actions</span><span>${progress.total}</span></div>`;
    progressTracker.innerHTML += `<div class='progress-row'><span>7-Day Return Rate</span><span>${progress.sevenDayReturn}</span></div>`;
    progressTracker.innerHTML += `<div class='progress-row'><span>Overwhelmed Reports</span><span>${progress.overwhelmedReports}</span></div>`;
  }

  // History
  function renderHistory() {
    planHistoryDiv.innerHTML = '';
    planHistory.slice(-10).reverse().forEach(h => {
      planHistoryDiv.innerHTML += `<div class='history-row'><span>${h.emotion}</span><span>${h.date}</span></div>`;
    });
  }

  // Feedback logic
  feedbackForm.onsubmit = function(e) {
    e.preventDefault();
    const text = feedbackInput.value.trim();
    if (!text) return;
    feedbacks.push({ text, date: new Date().toLocaleString() });
    renderFeedbacks();
    feedbackForm.reset();
  };
  function renderFeedbacks() {
    feedbackList.innerHTML = '';
    feedbacks.slice(-10).reverse().forEach(f => {
      feedbackList.innerHTML += `<div class='feedback-row'><span>${f.text}</span><small>${f.date}</small></div>`;
    });
  }

  // Expose completeAction globally
  window.completeAction = completeAction;

  // Initial render
  renderProgress();
  renderHistory();
  renderFeedbacks();
});
