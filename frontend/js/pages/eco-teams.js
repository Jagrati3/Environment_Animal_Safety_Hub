/**
 * Eco-Teams JavaScript
 * Handles team creation, joining, leaderboards, and challenges
 */

// ===== DATA STORE =====
const EcoTeamsData = {
  // Sample teams data
  teams: [
    { id: 1, name: "Grade 5-B Eco Squad", type: "school", icon: "fa-school", members: 32, co2Saved: 3500, trees: 120, rank: 1 },
    { id: 2, name: "TechCorp Employees", type: "company", icon: "fa-building", members: 45, co2Saved: 2100, trees: 85, rank: 2 },
    { id: 3, name: "Smith Family", type: "family", icon: "fa-house-chimney", members: 6, co2Saved: 1800, trees: 42, rank: 3 },
    { id: 4, name: "Green Warriors", type: "family", icon: "fa-leaf", members: 12, co2Saved: 1250, trees: 87, rank: 4 },
    { id: 5, name: "Maple Street Neighbors", type: "neighborhood", icon: "fa-map-marker-alt", members: 28, co2Saved: 980, trees: 65, rank: 5 },
    { id: 6, name: "Riverside High Eco Club", type: "school", icon: "fa-school", members: 50, co2Saved: 890, trees: 55, rank: 6 },
    { id: 7, name: "EcoWarriors United", type: "friends", icon: "fa-users", members: 15, co2Saved: 750, trees: 38, rank: 7 },
    { id: 8, name: "Johnson Family", type: "family", icon: "fa-house-chimney", members: 4, co2Saved: 620, trees: 22, rank: 8 },
    { id: 9, name: "GreenTech Inc.", type: "company", icon: "fa-building", members: 35, co2Saved: 580, trees: 30, rank: 9 },
    { id: 10, name: "Oak Valley Community", type: "neighborhood", icon: "fa-map-marker-alt", members: 40, co2Saved: 520, trees: 45, rank: 10 }
  ],
  
  // Sample team members
  members: [
    { id: 1, name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=1", role: "Team Leader", badge: "leader", contribution: 320 },
    { id: 2, name: "Mike Chen", avatar: "https://i.pravatar.cc/150?img=2", role: "Member", badge: "tree-planter", contribution: 280 },
    { id: 3, name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=3", role: "Member", badge: "eco-warrior", contribution: 245 },
    { id: 4, name: "James Brown", avatar: "https://i.pravatar.cc/150?img=4", role: "Member", badge: "newcomer", contribution: 190 },
    { id: 5, name: "Lisa Davis", avatar: "https://i.pravatar.cc/150?img=5", role: "Member", badge: "streak-master", contribution: 175 },
    { id: 6, name: "David Kim", avatar: "https://i.pravatar.cc/150?img=6", role: "Member", badge: "eco-warrior", contribution: 160 },
    { id: 7, name: "Anna Martinez", avatar: "https://i.pravatar.cc/150?img=7", role: "Member", badge: "tree-planter", contribution: 145 },
    { id: 8, name: "Chris Taylor", avatar: "https://i.pravatar.cc/150?img=8", role: "Member", badge: "newcomer", contribution: 120 }
  ],
  
  // User's current team (null if not in a team)
  currentTeam: {
    id: 4,
    name: "Green Warriors",
    type: "Family Team",
    members: 12,
    rank: 4,
    co2Saved: 1250,
    treesPlanted: 87,
    challengesWon: 15,
    streak: 21,
    inviteCode: "ECO-GW2024-XYZ"
  }
};

// ===== DOM ELEMENTS =====
const elements = {
  createTeamBtn: document.getElementById('createTeamBtn'),
  joinTeamBtn: document.getElementById('joinTeamBtn'),
  createTeamModal: document.getElementById('createTeamModal'),
  joinTeamModal: document.getElementById('joinTeamModal'),
  inviteModal: document.getElementById('inviteModal'),
  createTeamForm: document.getElementById('createTeamForm'),
  joinByCodeForm: document.getElementById('joinByCodeForm'),
  inviteMembersBtn: document.getElementById('inviteMembersBtn'),
  viewChallengesBtn: document.getElementById('viewChallengesBtn'),
  teamSettingsBtn: document.getElementById('teamSettingsBtn'),
  myTeamCard: document.getElementById('myTeamCard'),
  noTeamCard: document.getElementById('noTeamCard'),
  leaderboardList: document.getElementById('leaderboardList'),
  membersGrid: document.getElementById('membersGrid'),
  teamSearchInput: document.getElementById('teamSearchInput'),
  teamSearchResults: document.getElementById('teamSearchResults'),
  toastContainer: document.getElementById('toastContainer')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Setup event listeners
  setupEventListeners();
  
  // Check if user has a team
  checkUserTeam();
  
  // Populate leaderboard
  populateLeaderboard('all');
  
  // Populate team members
  populateMembers();
  
  // Initialize chart
  initializeChart();
  
  // Animate stats
  animateStats();
  
  // Create hero particles
  createHeroParticles();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Modal triggers
  elements.createTeamBtn?.addEventListener('click', openCreateTeamModal);
  elements.joinTeamBtn?.addEventListener('click', openJoinTeamModal);
  elements.inviteMembersBtn?.addEventListener('click', openInviteModal);
  
  // Form submissions
  elements.createTeamForm?.addEventListener('submit', handleCreateTeam);
  elements.joinByCodeForm?.addEventListener('submit', handleJoinByCode);
  
  // Modal tabs
  document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => switchModalTab(tab));
  });
  
  // Leaderboard tabs
  document.querySelectorAll('.leaderboard-tab').forEach(tab => {
    tab.addEventListener('click', () => switchLeaderboardTab(tab));
  });
  
  // Team search
  elements.teamSearchInput?.addEventListener('input', (e) => searchTeams(e.target.value));
  
  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });
  
  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
  
  // Challenge buttons
  document.querySelectorAll('.challenge-card .btn').forEach(btn => {
    btn.addEventListener('click', handleLogProgress);
  });
}

// ===== MODAL FUNCTIONS =====
function openCreateTeamModal() {
  elements.createTeamModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCreateTeamModal() {
  elements.createTeamModal.classList.remove('active');
  document.body.style.overflow = '';
}

function openJoinTeamModal() {
  elements.joinTeamModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  // Load initial search results
  searchTeams('');
}

function closeJoinTeamModal() {
  elements.joinTeamModal.classList.remove('active');
  document.body.style.overflow = '';
}

function openInviteModal() {
  elements.inviteModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeInviteModal() {
  elements.inviteModal.classList.remove('active');
  document.body.style.overflow = '';
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = '';
}

function switchModalTab(tab) {
  const tabId = tab.dataset.tab;
  
  // Update active tab
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  
  // Show corresponding content
  document.querySelectorAll('.modal-tab-content').forEach(content => {
    content.style.display = 'none';
  });
  document.getElementById(`${tabId}Tab`).style.display = 'block';
}

// ===== TEAM FUNCTIONS =====
function checkUserTeam() {
  if (EcoTeamsData.currentTeam) {
    elements.myTeamCard.style.display = 'block';
    elements.noTeamCard.style.display = 'none';
    updateTeamDashboard();
  } else {
    elements.myTeamCard.style.display = 'none';
    elements.noTeamCard.style.display = 'block';
  }
}

function updateTeamDashboard() {
  const team = EcoTeamsData.currentTeam;
  
  document.getElementById('myTeamName').textContent = team.name;
  document.getElementById('myTeamType').textContent = team.type;
  document.getElementById('myTeamMembers').textContent = team.members;
  document.getElementById('myTeamRank').textContent = team.rank;
  document.getElementById('teamCO2Saved').textContent = formatNumber(team.co2Saved);
  document.getElementById('teamTreesPlanted').textContent = team.treesPlanted;
  document.getElementById('teamChallengesWon').textContent = team.challengesWon;
  document.getElementById('teamStreak').textContent = team.streak;
  document.getElementById('teamInviteCode').textContent = team.inviteCode;
  document.getElementById('teamInviteLink').value = `https://ecolife.com/join/${team.inviteCode}`;
}

function handleCreateTeam(e) {
  e.preventDefault();
  
  const teamName = document.getElementById('teamName').value;
  const teamType = document.getElementById('teamType').value;
  const teamDescription = document.getElementById('teamDescription').value;
  const privacy = document.querySelector('input[name="privacy"]:checked').value;
  
  // Simulate team creation
  const newTeam = {
    id: Date.now(),
    name: teamName,
    type: getTeamTypeLabel(teamType),
    members: 1,
    rank: 0,
    co2Saved: 0,
    treesPlanted: 0,
    challengesWon: 0,
    streak: 0,
    inviteCode: generateInviteCode()
  };
  
  EcoTeamsData.currentTeam = newTeam;
  
  // Close modal and show success
  closeCreateTeamModal();
  showToast('success', `Team "${teamName}" created successfully!`);
  
  // Celebrate with confetti
  celebrateWithConfetti();
  
  // Update dashboard
  checkUserTeam();
  
  // Reset form
  e.target.reset();
}

function handleJoinByCode(e) {
  e.preventDefault();
  
  const inviteCode = document.getElementById('inviteCode').value.trim().toUpperCase();
  
  // Simulate joining team
  if (inviteCode.startsWith('ECO-')) {
    EcoTeamsData.currentTeam = {
      ...EcoTeamsData.teams[0],
      inviteCode: inviteCode
    };
    
    closeJoinTeamModal();
    showToast('success', 'Successfully joined the team!');
    celebrateWithConfetti();
    checkUserTeam();
    
    e.target.reset();
  } else {
    showToast('error', 'Invalid invite code. Please try again.');
  }
}

function searchTeams(query) {
  const results = EcoTeamsData.teams.filter(team => 
    team.name.toLowerCase().includes(query.toLowerCase()) ||
    team.type.toLowerCase().includes(query.toLowerCase())
  );
  
  renderSearchResults(results);
}

function renderSearchResults(results) {
  elements.teamSearchResults.innerHTML = results.map(team => `
    <div class="search-result-item" onclick="joinTeamById(${team.id})">
      <div class="search-result-avatar">
        <i class="fa-solid ${team.icon}"></i>
      </div>
      <div class="search-result-info">
        <div class="search-result-name">${team.name}</div>
        <div class="search-result-meta">
          <i class="fa-solid fa-users"></i> ${team.members} members • 
          <i class="fa-solid fa-cloud"></i> ${formatNumber(team.co2Saved)} kg CO₂
        </div>
      </div>
    </div>
  `).join('');
}

function joinTeamById(teamId) {
  const team = EcoTeamsData.teams.find(t => t.id === teamId);
  
  if (team) {
    EcoTeamsData.currentTeam = {
      ...team,
      type: getTeamTypeLabel(team.type),
      treesPlanted: team.trees,
      challengesWon: Math.floor(Math.random() * 20),
      streak: Math.floor(Math.random() * 30),
      inviteCode: generateInviteCode()
    };
    
    closeJoinTeamModal();
    showToast('success', `Successfully joined ${team.name}!`);
    celebrateWithConfetti();
    checkUserTeam();
    populateMembers();
    initializeChart();
  }
}

// ===== LEADERBOARD FUNCTIONS =====
function switchLeaderboardTab(tab) {
  const category = tab.dataset.category;
  
  // Update active tab
  document.querySelectorAll('.leaderboard-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  
  // Populate leaderboard with filtered data
  populateLeaderboard(category);
}

function populateLeaderboard(category) {
  let filteredTeams = EcoTeamsData.teams;
  
  if (category !== 'all') {
    const categoryMap = {
      'schools': 'school',
      'companies': 'company',
      'families': 'family',
      'neighborhoods': 'neighborhood'
    };
    filteredTeams = EcoTeamsData.teams.filter(team => team.type === categoryMap[category]);
  }
  
  // Skip first 3 (they're in the podium)
  const listTeams = filteredTeams.slice(3, 10);
  
  elements.leaderboardList.innerHTML = listTeams.map((team, index) => `
    <div class="leaderboard-item" data-aos="fade-up" data-aos-delay="${index * 50}">
      <span class="leaderboard-rank">#${team.rank}</span>
      <div class="leaderboard-avatar">
        <i class="fa-solid ${team.icon}"></i>
      </div>
      <div class="leaderboard-info">
        <div class="leaderboard-name">${team.name}</div>
        <div class="leaderboard-type">${getTeamTypeLabel(team.type)}</div>
      </div>
      <div class="leaderboard-stats">
        <span><i class="fa-solid fa-cloud"></i> ${formatNumber(team.co2Saved)} kg</span>
        <span><i class="fa-solid fa-users"></i> ${team.members}</span>
      </div>
    </div>
  `).join('');
}

// ===== MEMBERS FUNCTIONS =====
function populateMembers() {
  elements.membersGrid.innerHTML = EcoTeamsData.members.map(member => `
    <div class="member-card" data-aos="fade-up">
      <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
      <div class="member-name">${member.name}</div>
      <div class="member-role">${member.role}</div>
      <span class="member-badge ${member.badge === 'leader' ? 'leader' : ''}">
        <i class="fa-solid ${getBadgeIcon(member.badge)}"></i>
        ${getBadgeLabel(member.badge)}
      </span>
    </div>
  `).join('');
}

// ===== CHART FUNCTIONS =====
function initializeChart() {
  const ctx = document.getElementById('teamProgressChart');
  
  if (!ctx) return;
  
  // Destroy existing chart if any
  if (window.teamChart) {
    window.teamChart.destroy();
  }
  
  const isDarkMode = document.documentElement.dataset.theme === 'dark';
  const textColor = isDarkMode ? '#e0e0e0' : '#333333';
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  
  window.teamChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'CO₂ Saved (kg)',
          data: [180, 320, 480, 650],
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#22c55e',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 5
        },
        {
          label: 'Trees Planted',
          data: [12, 28, 45, 67],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: textColor,
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: gridColor,
          borderWidth: 1,
          cornerRadius: 12,
          padding: 12
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: gridColor
          },
          ticks: {
            color: textColor
          }
        },
        x: {
          grid: {
            color: gridColor
          },
          ticks: {
            color: textColor
          }
        }
      }
    }
  });
}

// ===== ANIMATION FUNCTIONS =====
function animateStats() {
  const statElements = document.querySelectorAll('.stat-number, .stat-value');
  
  statElements.forEach(el => {
    const finalValue = el.textContent;
    const isNumeric = /^\d/.test(finalValue);
    
    if (isNumeric) {
      const numericPart = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
      const suffix = finalValue.replace(/[0-9.,]/g, '');
      
      animateValue(el, 0, numericPart, 1500, suffix);
    }
  });
}

function animateValue(element, start, end, duration, suffix = '') {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = start + (end - start) * easeOutQuart;
    
    // Format number
    if (end >= 1000) {
      element.textContent = formatNumber(Math.round(current)) + suffix;
    } else if (Number.isInteger(end)) {
      element.textContent = Math.round(current) + suffix;
    } else {
      element.textContent = current.toFixed(1) + suffix;
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

function createHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 5}px;
      background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: particle-float ${Math.random() * 10 + 10}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    container.appendChild(particle);
  }
}

// ===== UTILITY FUNCTIONS =====
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function generateInviteCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'ECO-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  code += '-';
  for (let i = 0; i < 3; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function getTeamTypeLabel(type) {
  const labels = {
    'family': 'Family Team',
    'school': 'School/Class',
    'company': 'Company',
    'neighborhood': 'Neighborhood',
    'friends': 'Friends Group'
  };
  return labels[type] || type;
}

function getBadgeIcon(badge) {
  const icons = {
    'leader': 'fa-crown',
    'tree-planter': 'fa-tree',
    'eco-warrior': 'fa-leaf',
    'streak-master': 'fa-fire',
    'newcomer': 'fa-star'
  };
  return icons[badge] || 'fa-medal';
}

function getBadgeLabel(badge) {
  const labels = {
    'leader': 'Leader',
    'tree-planter': 'Tree Planter',
    'eco-warrior': 'Eco Warrior',
    'streak-master': 'Streak Master',
    'newcomer': 'Newcomer'
  };
  return labels[badge] || badge;
}

// ===== TOAST NOTIFICATIONS =====
function showToast(type, message) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fa-solid ${type === 'success' ? 'fa-check' : type === 'error' ? 'fa-times' : 'fa-info'}"></i>
    </div>
    <span class="toast-message">${message}</span>
  `;
  
  elements.toastContainer.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'toast-slide 0.3s ease reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== CELEBRATION =====
function celebrateWithConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#16a34a', '#fbbf24', '#3b82f6']
    });
  }
}

// ===== SHARE FUNCTIONS =====
function copyInviteCode() {
  const code = document.getElementById('teamInviteCode').textContent;
  navigator.clipboard.writeText(code).then(() => {
    showToast('success', 'Invite code copied to clipboard!');
  });
}

function copyInviteLink() {
  const link = document.getElementById('teamInviteLink').value;
  navigator.clipboard.writeText(link).then(() => {
    showToast('success', 'Invite link copied to clipboard!');
  });
}

function shareWhatsApp() {
  const link = document.getElementById('teamInviteLink').value;
  const text = `Join my Eco-Team on EcoLife! Click here: ${link}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

function shareTwitter() {
  const link = document.getElementById('teamInviteLink').value;
  const text = `Join my Eco-Team and let's save the planet together! 🌍💚`;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(link)}`, '_blank');
}

function shareEmail() {
  const link = document.getElementById('teamInviteLink').value;
  const subject = 'Join My Eco-Team on EcoLife!';
  const body = `Hi!\n\nI'd like to invite you to join my Eco-Team on EcoLife. Together, we can make a difference for our planet!\n\nClick here to join: ${link}\n\nLet's save the Earth together! 🌍💚`;
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ===== CHALLENGE FUNCTIONS =====
function handleLogProgress() {
  const challengeCard = this.closest('.challenge-card');
  const progressFill = challengeCard.querySelector('.progress-fill');
  const progressText = challengeCard.querySelector('.progress-text');
  
  // Simulate progress update
  const currentWidth = parseInt(progressFill.style.width);
  const newWidth = Math.min(currentWidth + 10, 100);
  progressFill.style.width = `${newWidth}%`;
  
  showToast('success', 'Progress logged! Keep up the great work! 🌱');
  
  // Check if challenge completed
  if (newWidth >= 100) {
    celebrateWithConfetti();
    showToast('success', '🎉 Challenge Completed! You earned a badge!');
    challengeCard.classList.add('completed');
  }
}

// Make functions globally available for onclick handlers
window.openCreateTeamModal = openCreateTeamModal;
window.closeCreateTeamModal = closeCreateTeamModal;
window.openJoinTeamModal = openJoinTeamModal;
window.closeJoinTeamModal = closeJoinTeamModal;
window.openInviteModal = openInviteModal;
window.closeInviteModal = closeInviteModal;
window.joinTeamById = joinTeamById;
window.copyInviteCode = copyInviteCode;
window.copyInviteLink = copyInviteLink;
window.shareWhatsApp = shareWhatsApp;
window.shareTwitter = shareTwitter;
window.shareEmail = shareEmail;

// Add CSS for particles animation
const particleStyles = document.createElement('style');
particleStyles.textContent = `
  @keyframes particle-float {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translate(${Math.random() * 100 - 50}px, -100px) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(particleStyles);
