// Energy Challenge Hub JS
// Handles challenge creation, joining, progress tracking, leaderboard, milestones

// --- Data Model ---
let challenges = [];
let user = { id: 'user1', name: 'You', progress: 0, milestones: [] };
let leaderboard = [];
let milestones = [
  { id: 'start', label: 'Joined Challenge', icon: '🎉', desc: 'Start your journey', achieved: false },
  { id: 'goal10', label: '10% Reduction', icon: '🏅', desc: 'Reduce by 10%', achieved: false },
  { id: 'goal25', label: '25% Reduction', icon: '🌟', desc: 'Reduce by 25%', achieved: false },
  { id: 'goal50', label: 'Energy Hero', icon: '💡', desc: 'Reduce by 50%', achieved: false },
  { id: 'community', label: 'Community Impact', icon: '🤝', desc: 'Group achieves goal', achieved: false }
];

// --- Challenge Creation ---
document.addEventListener('DOMContentLoaded', function() {
  const challengeForm = document.getElementById('challengeForm');
  const joinSection = document.getElementById('joinSection');
  const myProgress = document.getElementById('myProgress');
  const leaderboardDiv = document.getElementById('leaderboard');
  const milestonesDiv = document.getElementById('milestones');

  // Create challenge
  challengeForm.onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('challengeName').value;
    const goal = Number(document.getElementById('challengeGoal').value);
    const month = document.getElementById('challengeMonth').value;
    if (!name || !goal || !month) return;
    const challenge = {
      id: 'ch'+(challenges.length+1),
      name,
      goal,
      month,
      members: [user],
      progress: 0
    };
    challenges.push(challenge);
    renderJoinSection();
    renderProgress();
    renderLeaderboard();
    renderMilestones();
    challengeForm.reset();
  };

  // Join challenge
  function joinChallenge(index) {
    const challenge = challenges[index];
    if (!challenge.members.find(m => m.id === user.id)) {
      challenge.members.push(user);
      renderJoinSection();
      renderProgress();
      renderLeaderboard();
      renderMilestones();
    }
  }

  // Render join section
  function renderJoinSection() {
    joinSection.innerHTML = '';
    challenges.forEach((ch, i) => {
      joinSection.innerHTML += `<div><strong>${ch.name}</strong> (${ch.goal}% in ${ch.month}) <button onclick='window.joinChallenge(${i})'>Join</button></div>`;
    });
  }

  // Progress tracking
  function updateProgress(amount) {
    user.progress += amount;
    // Update milestones
    milestones.forEach(m => {
      if (m.id === 'start') m.achieved = true;
      if (m.id === 'goal10' && user.progress >= 10) m.achieved = true;
      if (m.id === 'goal25' && user.progress >= 25) m.achieved = true;
      if (m.id === 'goal50' && user.progress >= 50) m.achieved = true;
      if (m.id === 'community' && challenges.some(ch => ch.progress >= ch.goal)) m.achieved = true;
    });
    renderProgress();
    renderLeaderboard();
    renderMilestones();
  }

  // Render progress
  function renderProgress() {
    myProgress.innerHTML = `<div>Reduction: ${user.progress}%</div><div class='progress-bar'><div class='progress-bar-inner' style='width:${Math.min(100,user.progress)}%'></div></div><button onclick='window.updateProgress(5)'>Log 5% Reduction</button>`;
  }

  // Leaderboard
  function renderLeaderboard() {
    leaderboard = [user, { id: 'user2', name: 'Alex', progress: Math.floor(Math.random()*50) }, { id: 'user3', name: 'Sam', progress: Math.floor(Math.random()*50) }];
    leaderboard.sort((a,b) => b.progress-a.progress);
    leaderboardDiv.innerHTML = '';
    leaderboard.forEach((u, i) => {
      leaderboardDiv.innerHTML += `<div class='leaderboard-row'><span class='leaderboard-rank'>#${i+1}</span> <span>${u.name}</span> <span>${u.progress}%</span></div>`;
    });
  }

  // Milestones
  function renderMilestones() {
    milestonesDiv.innerHTML = '';
    milestones.forEach(m => {
      milestonesDiv.innerHTML += `<div class='milestone${m.achieved ? ' achieved' : ''}'><span>${m.icon}</span><span>${m.label}</span><small>${m.desc}</small></div>`;
    });
  }

  // Expose functions globally
  window.joinChallenge = joinChallenge;
  window.updateProgress = updateProgress;

  // Initial render
  renderJoinSection();
  renderProgress();
  renderLeaderboard();
  renderMilestones();
});
