// User Profile & Achievements Logic
// Demo: In-memory profile, stats, badges, and challenge history

// --- Demo Data ---
const DEMO_PROFILE = {
  name: 'You',
  avatar: '',
};
const DEMO_BADGES = [
  { title: 'February Water Saver', emoji: '🏅' },
  { title: 'Shower Power Challenge', emoji: '🚿' },
  { title: 'Garden Smart', emoji: '🌱' }
];
const DEMO_HISTORY = [
  { challenge: 'February Water Saver', result: 'Completed', date: '2026-02-29' },
  { challenge: 'Shower Power Challenge', result: 'Completed', date: '2026-02-21' },
  { challenge: 'Garden Smart', result: 'In Progress', date: '2026-03-10' }
];
const DEMO_STATS = {
  totalSaved: 890,
  challenges: 3,
  badges: 3
};

let profile = JSON.parse(localStorage.getItem('userProfile') || 'null') || DEMO_PROFILE;
let badges = JSON.parse(localStorage.getItem('userBadges') || 'null') || DEMO_BADGES;
let history = JSON.parse(localStorage.getItem('userHistory') || 'null') || DEMO_HISTORY;
let stats = JSON.parse(localStorage.getItem('userStats') || 'null') || DEMO_STATS;

function saveProfile() {
  localStorage.setItem('userProfile', JSON.stringify(profile));
}
function saveBadges() {
  localStorage.setItem('userBadges', JSON.stringify(badges));
}
function saveHistory() {
  localStorage.setItem('userHistory', JSON.stringify(history));
}
function saveStats() {
  localStorage.setItem('userStats', JSON.stringify(stats));
}

// --- Render Profile ---
function renderProfile() {
  document.getElementById('profile-name').value = profile.name;
  document.getElementById('profile-avatar').value = profile.avatar;
  document.getElementById('profile-name-display').textContent = profile.name;
  const img = document.getElementById('profile-avatar-img');
  if (profile.avatar && (profile.avatar.startsWith('http') || profile.avatar.startsWith('data:'))) {
    img.src = profile.avatar;
    img.style.display = '';
  } else {
    img.style.display = 'none';
  }
}

document.getElementById('profile-form').onsubmit = function(e) {
  e.preventDefault();
  profile.name = document.getElementById('profile-name').value.trim() || 'You';
  profile.avatar = document.getElementById('profile-avatar').value.trim();
  saveProfile();
  renderProfile();
};

// --- Render Stats ---
function renderStats() {
  document.getElementById('stats-summary').innerHTML = `
    <b>Total Water Saved:</b> ${stats.totalSaved} liters<br>
    <b>Challenges Participated:</b> ${stats.challenges}<br>
    <b>Badges Earned:</b> ${stats.badges}
  `;
}

// --- Render Badges ---
function renderBadges() {
  const list = document.getElementById('badges-list');
  list.innerHTML = '';
  if (!badges.length) {
    list.innerHTML = '<div>No badges yet. Join a challenge to earn badges!</div>';
    return;
  }
  badges.forEach(badge => {
    const div = document.createElement('div');
    div.className = 'badge';
    div.innerHTML = `<span class="emoji">${badge.emoji}</span> ${badge.title}`;
    list.appendChild(div);
  });
}

// --- Render History ---
function renderHistory() {
  const list = document.getElementById('history-list');
  list.innerHTML = '';
  if (!history.length) {
    list.innerHTML = '<div>No challenge history yet.</div>';
    return;
  }
  history.forEach(entry => {
    const div = document.createElement('div');
    div.className = 'history-entry';
    div.innerHTML = `<b>${entry.challenge}</b> - ${entry.result} <span style="color:#888;">(${entry.date})</span>`;
    list.appendChild(div);
  });
}

// --- Initial Render ---
document.addEventListener('DOMContentLoaded', function() {
  renderProfile();
  renderStats();
  renderBadges();
  renderHistory();
});
// --- End of profile.js ---
