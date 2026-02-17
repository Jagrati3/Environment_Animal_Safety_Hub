// Community Challenges Logic
// Demo: In-memory challenge data, join/log savings, badges

const DEMO_CHALLENGES = [
  {
    id: 1,
    title: 'February Water Saver',
    desc: 'Save 500 liters of water this month! Log your savings daily and help the community reach the goal.',
    goal: 500,
    end: '2026-02-29',
    participants: [
      { name: 'Green Family', saved: 120 },
      { name: 'Blue Community', saved: 180 },
      { name: 'Riverdale', saved: 90 }
    ]
  },
  {
    id: 2,
    title: 'Shower Power Challenge',
    desc: 'Take shorter showers for a week. Log your savings and earn the Shower Star badge!',
    goal: 200,
    end: '2026-02-21',
    participants: [
      { name: 'Eco Warriors', saved: 60 },
      { name: 'Sunset Villas', saved: 80 }
    ]
  },
  {
    id: 3,
    title: 'Garden Smart',
    desc: 'Reduce outdoor watering. Log your savings and compete for the Green Thumb badge.',
    goal: 300,
    end: '2026-03-10',
    participants: [
      { name: 'Aqua Group', saved: 100 },
      { name: 'Hilltop', saved: 70 }
    ]
  }
];

let challenges = JSON.parse(localStorage.getItem('challengesData') || 'null') || DEMO_CHALLENGES;
let myName = localStorage.getItem('challengeUserName') || 'You';
let myBadges = JSON.parse(localStorage.getItem('challengeBadges') || '[]');

function saveChallenges() {
  localStorage.setItem('challengesData', JSON.stringify(challenges));
}
function saveBadges() {
  localStorage.setItem('challengeBadges', JSON.stringify(myBadges));
}

// --- Render Challenge List ---
function renderChallengeList() {
  document.getElementById('challenge-list-section').style.display = '';
  document.getElementById('challenge-details-section').style.display = 'none';
  const list = document.getElementById('challenge-list');
  list.innerHTML = '';
  challenges.forEach(chal => {
    const totalSaved = chal.participants.reduce((s, p) => s + p.saved, 0);
    const percent = Math.min(100, Math.round((totalSaved / chal.goal) * 100));
    const card = document.createElement('div');
    card.className = 'challenge-card';
    card.innerHTML = `
      <div class="challenge-title">${chal.title}</div>
      <div class="challenge-desc">${chal.desc}</div>
      <div class="challenge-meta">Goal: <b>${chal.goal}L</b> &nbsp;|&nbsp; Ends: ${chal.end}</div>
      <div class="challenge-progress">
        <div class="progress-bar"><div class="progress-bar-inner" style="width:${percent}%;"></div></div>
        <span style="font-size:0.95em;">${totalSaved} / ${chal.goal}L (${percent}%)</span>
      </div>
    `;
    card.onclick = () => showChallengeDetails(chal.id);
    list.appendChild(card);
  });
}

// --- Show Challenge Details ---
function showChallengeDetails(id) {
  const chal = challenges.find(c => c.id === id);
  if (!chal) return;
  document.getElementById('challenge-list-section').style.display = 'none';
  document.getElementById('challenge-details-section').style.display = '';
  const details = document.getElementById('challenge-details');
  const totalSaved = chal.participants.reduce((s, p) => s + p.saved, 0);
  const percent = Math.min(100, Math.round((totalSaved / chal.goal) * 100));
  let myEntry = chal.participants.find(p => p.name === myName);
  if (!myEntry) myEntry = { name: myName, saved: 0 };
  details.innerHTML = `
    <h3>${chal.title}</h3>
    <div>${chal.desc}</div>
    <div class="challenge-meta">Goal: <b>${chal.goal}L</b> &nbsp;|&nbsp; Ends: ${chal.end}</div>
    <div class="challenge-progress">
      <div class="progress-bar"><div class="progress-bar-inner" style="width:${percent}%;"></div></div>
      <span style="font-size:0.95em;">${totalSaved} / ${chal.goal}L (${percent}%)</span>
    </div>
    <div style="margin-top:14px;">
      <b>Your savings:</b> ${myEntry.saved}L
      <form class="log-form">
        <input type="number" min="1" placeholder="Add liters" required>
        <button type="submit">Log Savings</button>
      </form>
    </div>
    <div style="margin-top:18px;">
      <b>Participants:</b>
      <ul style="margin:8px 0 0 0; padding-left:18px;">
        ${chal.participants.map(p => `<li>${p.name}: ${p.saved}L</li>`).join('')}
      </ul>
    </div>
  `;
  // Log form
  details.querySelector('.log-form').onsubmit = function(e) {
    e.preventDefault();
    const val = parseInt(this.querySelector('input').value);
    if (!val || val < 1) return;
    let entry = chal.participants.find(p => p.name === myName);
    if (!entry) {
      entry = { name: myName, saved: 0 };
      chal.participants.push(entry);
    }
    entry.saved += val;
    // Badge logic
    if (entry.saved >= chal.goal && !myBadges.includes(chal.title)) {
      myBadges.push(chal.title);
      saveBadges();
      renderBadges();
      alert('Congratulations! You earned a badge: ' + chal.title);
    }
    saveChallenges();
    showChallengeDetails(chal.id);
  };
}

document.getElementById('back-to-list').onclick = renderChallengeList;

document.getElementById('create-challenge-btn').onclick = function() {
  document.getElementById('challenge-modal').style.display = '';
};
document.getElementById('close-modal').onclick = function() {
  document.getElementById('challenge-modal').style.display = 'none';
};
document.getElementById('challenge-form').onsubmit = function(e) {
  e.preventDefault();
  const title = document.getElementById('challenge-title').value.trim();
  const desc = document.getElementById('challenge-desc').value.trim();
  const goal = parseInt(document.getElementById('challenge-goal').value);
  const end = document.getElementById('challenge-end').value;
  if (!title || !desc || !goal || !end) return;
  const newChal = {
    id: Date.now(),
    title,
    desc,
    goal,
    end,
    participants: []
  };
  challenges.push(newChal);
  saveChallenges();
  document.getElementById('challenge-modal').style.display = 'none';
  renderChallengeList();
  this.reset();
};

// --- Render Badges ---
function renderBadges() {
  const list = document.getElementById('badges-list');
  list.innerHTML = '';
  if (myBadges.length === 0) {
    list.innerHTML = '<div>No badges yet. Join a challenge and log your savings!</div>';
    return;
  }
  myBadges.forEach(badge => {
    const div = document.createElement('div');
    div.className = 'badge';
    div.innerHTML = `<span class="emoji">🏅</span> ${badge}`;
    list.appendChild(div);
  });
}

// --- Initial Render ---
document.addEventListener('DOMContentLoaded', function() {
  renderChallengeList();
  renderBadges();
});
// --- End of challenges.js ---
