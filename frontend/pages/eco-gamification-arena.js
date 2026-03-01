// Eco Gamification Arena JS
// Handles games, rewards, leaderboard, history, feedback

// --- Data Model ---
let games = [
  { id: 'quiz', name: 'Eco Quiz', desc: 'Test your eco knowledge!', points: 10 },
  { id: 'recycle', name: 'Recycling Puzzle', desc: 'Sort items correctly.', points: 15 },
  { id: 'energy', name: 'Energy Saver Challenge', desc: 'Reduce virtual energy usage.', points: 20 },
  { id: 'water', name: 'Water Conservation Game', desc: 'Save water in daily tasks.', points: 12 },
  { id: 'carbon', name: 'Carbon Footprint Race', desc: 'Lower your footprint fastest.', points: 18 }
];
let rewards = [
  { id: 'starter', label: 'Eco Starter', icon: '🌱', desc: 'Play your first game', earned: false },
  { id: 'pro', label: 'Eco Pro', icon: '🏅', desc: 'Earn 50 points', earned: false },
  { id: 'champ', label: 'Eco Champion', icon: '🌟', desc: 'Earn 100 points', earned: false },
  { id: 'legend', label: 'Eco Legend', icon: '💡', desc: 'Earn 200 points', earned: false }
];
let leaderboard = [];
let history = [];
let feedbacks = [];
let user = { id: 'user1', name: 'You', points: 0 };

// --- Game Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const gamesList = document.getElementById('gamesList');
  const rewardsList = document.getElementById('rewardsList');
  const arenaLeaderboard = document.getElementById('arenaLeaderboard');
  const gameHistory = document.getElementById('gameHistory');
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackInput = document.getElementById('feedbackInput');
  const feedbackList = document.getElementById('feedbackList');

  // Render games
  function renderGames() {
    gamesList.innerHTML = '';
    games.forEach((g, i) => {
      const div = document.createElement('div');
      div.className = 'game-card';
      div.innerHTML = `<strong>${g.name}</strong><span>${g.desc}</span><span>Points: ${g.points}</span><button onclick='window.playGame(${i})'>Play</button>`;
      gamesList.appendChild(div);
    });
  }

  // Play game (simulate)
  function playGame(index) {
    const g = games[index];
    user.points += g.points;
    history.push({ name: g.name, points: g.points, date: new Date().toLocaleString() });
    updateRewards();
    renderRewards();
    renderLeaderboard();
    renderHistory();
    renderGames();
  }

  // Rewards logic
  function updateRewards() {
    rewards.forEach(r => {
      if (r.id === 'starter' && history.length > 0) r.earned = true;
      if (r.id === 'pro' && user.points >= 50) r.earned = true;
      if (r.id === 'champ' && user.points >= 100) r.earned = true;
      if (r.id === 'legend' && user.points >= 200) r.earned = true;
    });
  }

  // Render rewards
  function renderRewards() {
    rewardsList.innerHTML = '';
    rewards.forEach(r => {
      const div = document.createElement('div');
      div.className = 'reward' + (r.earned ? ' earned' : '');
      div.innerHTML = `<span>${r.icon}</span><span>${r.label}</span><small>${r.desc}</small>`;
      rewardsList.appendChild(div);
    });
  }

  // Leaderboard logic
  function renderLeaderboard() {
    leaderboard = [user, { id: 'user2', name: 'Alex', points: Math.floor(Math.random()*200) }, { id: 'user3', name: 'Sam', points: Math.floor(Math.random()*200) }];
    leaderboard.sort((a,b) => b.points-a.points);
    arenaLeaderboard.innerHTML = '';
    leaderboard.forEach((u, i) => {
      arenaLeaderboard.innerHTML += `<div class='leaderboard-row'><span class='leaderboard-rank'>#${i+1}</span> <span>${u.name}</span> <span>${u.points} pts</span></div>`;
    });
  }

  // History logic
  function renderHistory() {
    gameHistory.innerHTML = '';
    history.slice(-10).reverse().forEach(h => {
      gameHistory.innerHTML += `<div class='history-row'><span>${h.name}</span><span>${h.points} pts</span><span>${h.date}</span></div>`;
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

  // Expose playGame globally
  window.playGame = playGame;

  // Initial render
  renderGames();
  renderRewards();
  renderLeaderboard();
  renderHistory();
  renderFeedbacks();
});
