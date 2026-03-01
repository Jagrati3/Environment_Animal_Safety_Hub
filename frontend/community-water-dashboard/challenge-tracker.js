// Sample challenges
const challenges = [
  {
    id: 1,
    title: "Plastic-Free Week",
    description: "Avoid single-use plastics for 7 days.",
    progress: 0,
    goal: 7,
    badge: "Plastic-Free Champion"
  },
  {
    id: 2,
    title: "Bike to Work",
    description: "Commute by bike for 5 days.",
    progress: 0,
    goal: 5,
    badge: "Eco Cyclist"
  },
  {
    id: 3,
    title: "Community Cleanup",
    description: "Participate in 3 cleanup events.",
    progress: 0,
    goal: 3,
    badge: "Cleanup Hero"
  }
];

// Track joined challenges
let joined = {};

function renderChallenges() {
  const list = document.getElementById('challenge-list');
  list.innerHTML = '';
  challenges.forEach(ch => {
    const joinedChallenge = joined[ch.id];
    const progressPercent = Math.round((ch.progress / ch.goal) * 100);
    const challengeDiv = document.createElement('div');
    challengeDiv.className = 'challenge';
    challengeDiv.innerHTML = `
      <div class="challenge-title">${ch.title}</div>
      <div>${ch.description}</div>
      <div class="progress-bar"><div class="progress" style="width:${progressPercent}%;"></div></div>
      <div>Progress: ${ch.progress} / ${ch.goal}</div>
      ${joinedChallenge && ch.progress >= ch.goal ? `<span class="badge">${ch.badge}</span>` : ''}
      <button onclick="joinChallenge(${ch.id})" ${joinedChallenge ? 'disabled' : ''}>${joinedChallenge ? 'Joined' : 'Join Challenge'}</button>
      ${joinedChallenge && ch.progress < ch.goal ? `<button onclick="incrementProgress(${ch.id})">Log Activity</button>` : ''}
    `;
    list.appendChild(challengeDiv);
  });
}

window.joinChallenge = function(id) {
  joined[id] = true;
  renderChallenges();
};

window.incrementProgress = function(id) {
  const ch = challenges.find(c => c.id === id);
  if (ch && ch.progress < ch.goal) {
    ch.progress++;
    renderChallenges();
  }
};

renderChallenges();
