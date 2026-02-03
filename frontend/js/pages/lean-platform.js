// Storage Keys
const STORAGE_KEYS = {
  ISSUES: "leanIssues",
  USER_REPORTS: "userReports",
  USER_PROFILE: "leanUserProfile"
};

let currentUser = {
  id: 1,
  name: "Eco Reporter",
  reports: 5,
  resolved: 2,
  votes: 187,
  rank: 28,
  avatar: "https://via.placeholder.com/40"
};

// Sample Issues with diverse data
let sampleIssues = [
  {
    id: 1,
    title: "Heavy Pollution Near Industrial Park",
    category: "pollution",
    severity: "critical",
    status: "progress",
    description: "Dark smoke and chemical smell coming from the industrial complex. Air quality seems hazardous.",
    latitude: 40.7128,
    longitude: -74.0060,
    photo: "https://via.placeholder.com/400x300?text=Industrial+Pollution",
    reporter: { name: "Green Guardian", avatar: "https://via.placeholder.com/30" },
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    votes: 156,
    comments: 23,
    shares: 12,
    upvoted: true,
    comments_list: [
      { author: "Eco Champion", text: "This is urgent! Government should investigate.", time: "2 days ago" },
      { author: "Nature Lover", text: "I've noticed this too. Air quality app shows dangerous levels.", time: "1 day ago" }
    ]
  },
  {
    id: 2,
    title: "Massive Littering at Beach",
    category: "litter",
    severity: "high",
    status: "reported",
    description: "Tons of plastic waste accumulated on the beach. Mostly food packaging and single-use plastics.",
    latitude: 40.5731,
    longitude: -73.9712,
    photo: "https://via.placeholder.com/400x300?text=Beach+Litter",
    reporter: { name: "Ocean Friend", avatar: "https://via.placeholder.com/30" },
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    votes: 234,
    comments: 45,
    shares: 28,
    upvoted: false,
    comments_list: []
  },
  {
    id: 3,
    title: "Illegal Dumping Site in Forest",
    category: "dumping",
    severity: "critical",
    status: "review",
    description: "Abandoned construction waste, old furniture, and electronics dumped in protected forest area.",
    latitude: 40.8141,
    longitude: -73.9486,
    photo: "https://via.placeholder.com/400x300?text=Illegal+Dumping",
    reporter: { name: "Forest Protector", avatar: "https://via.placeholder.com/30" },
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    votes: 89,
    comments: 15,
    shares: 8,
    upvoted: false,
    comments_list: []
  },
  {
    id: 4,
    title: "Habitat Destruction - Wetland Filled",
    category: "habitat",
    severity: "high",
    status: "progress",
    description: "Local wetland being filled with soil for unauthorized construction. Important bird sanctuary threatened.",
    latitude: 40.6501,
    longitude: -73.9496,
    photo: "https://via.placeholder.com/400x300?text=Habitat+Damage",
    reporter: { name: "Wildlife Guardian", avatar: "https://via.placeholder.com/30" },
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    votes: 145,
    comments: 31,
    shares: 19,
    upvoted: true,
    comments_list: []
  },
  {
    id: 5,
    title: "Water Pollution in City River",
    category: "water",
    severity: "critical",
    status: "progress",
    description: "Chemical discharge turning river water purple. Fish die-off reported. Likely industrial leak.",
    latitude: 40.7282,
    longitude: -73.7949,
    photo: "https://via.placeholder.com/400x300?text=Water+Pollution",
    reporter: { name: "Water Watch", avatar: "https://via.placeholder.com/30" },
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    votes: 312,
    comments: 67,
    shares: 45,
    upvoted: true,
    comments_list: []
  },
  {
    id: 6,
    title: "Park Maintenance Neglect",
    category: "other",
    severity: "medium",
    status: "resolved",
    description: "Park benches destroyed, paths overgrown, no maintenance for months. Now cleaned up!",
    latitude: 40.7829,
    longitude: -73.9654,
    photo: "https://via.placeholder.com/400x300?text=Park+Neglect",
    reporter: { name: "Community Care", avatar: "https://via.placeholder.com/30" },
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    votes: 67,
    comments: 12,
    shares: 5,
    upvoted: false,
    comments_list: []
  }
];

// Sample Leaderboard
let sampleLeaderboard = {
  month: [
    { rank: 1, name: "Green Guardian", reports: 18, resolved: 12, badge: "🥇" },
    { rank: 2, name: "Ocean Friend", reports: 15, resolved: 9, badge: "🥈" },
    { rank: 3, name: "Wildlife Guardian", reports: 14, resolved: 8, badge: "🥉" },
    { rank: 4, name: "Forest Protector", reports: 12, resolved: 7, badge: "" },
    { rank: 5, name: "Water Watch", reports: 11, resolved: 6, badge: "" }
  ],
  alltime: [
    { rank: 1, name: "Green Guardian", reports: 87, resolved: 62, badge: "🥇" },
    { rank: 2, name: "Environmental Hero", reports: 76, resolved: 54, badge: "🥈" },
    { rank: 3, name: "Ocean Friend", reports: 69, resolved: 48, badge: "🥉" },
    { rank: 4, name: "Wildlife Guardian", reports: 58, resolved: 41, badge: "" },
    { rank: 5, name: "Community Care", reports: 52, resolved: 37, badge: "" }
  ]
};

let map;
let markers = [];
let currentIssueDetail = null;

// Initialize
function init() {
  loadOrCreateData();
  setupEventListeners();
  setupTabNavigation();
  initMap();
  renderMap();
  renderIssuesList();
  updateStats();
}

function loadOrCreateData() {
  if (!localStorage.getItem(STORAGE_KEYS.ISSUES)) {
    localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify(sampleIssues));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.USER_PROFILE)) {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(currentUser));
  }
  
  document.getElementById("userName").textContent = currentUser.name;
}

function setupEventListeners() {
  document.getElementById("reportIssueBtn").addEventListener("click", openReportModal);
  document.getElementById("reportForm").addEventListener("submit", handleReportSubmit);
  
  document.getElementById("issuePhoto").addEventListener("change", (e) => {
    const fileName = e.target.files[0]?.name || "";
    document.getElementById("fileName").textContent = fileName;
  });
  
  // Filters
  document.getElementById("searchIssues").addEventListener("input", debounce(filterAndRenderIssues, 300));
  document.getElementById("filterStatus").addEventListener("change", filterAndRenderIssues);
  document.getElementById("filterCategory").addEventListener("change", filterAndRenderIssues);
  document.getElementById("sortBy").addEventListener("change", filterAndRenderIssues);
  
  // Leaderboard tabs
  document.querySelectorAll(".leaderboard-tab").forEach(tab => {
    tab.addEventListener("click", (e) => {
      document.querySelectorAll(".leaderboard-tab").forEach(t => t.classList.remove("active"));
      e.target.classList.add("active");
      renderLeaderboard(e.target.dataset.period);
    });
  });
  
  // Get user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      document.getElementById("issueLatitude").placeholder = pos.coords.latitude;
      document.getElementById("issueLongitude").placeholder = pos.coords.longitude;
    });
  }
}

function setupTabNavigation() {
  document.querySelectorAll(".tab-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabName = e.target.dataset.tab;
      
      document.querySelectorAll(".tab-link").forEach(l => l.classList.remove("active"));
      e.target.classList.add("active");
      
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      document.getElementById(tabName).classList.add("active");
      
      if (tabName === "map") {
        setTimeout(() => map?.invalidateSize(), 100);
      }
      if (tabName === "myReports") renderMyReports();
      if (tabName === "leaderboard") renderLeaderboard("month");
      if (tabName === "stats") renderStatistics();
    });
  });
}

// Map Functions
function initMap() {
  map = L.map("leafletMap").setView([40.7128, -74.0060], 12);
  
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19
  }).addTo(map);
  
  // Map controls
  document.getElementById("zoomInBtn").addEventListener("click", () => map.zoomIn());
  document.getElementById("zoomOutBtn").addEventListener("click", () => map.zoomOut());
  document.getElementById("centerBtn").addEventListener("click", () => map.setView([40.7128, -74.0060], 12));
}

function renderMap() {
  markers.forEach(m => m.remove());
  markers = [];
  
  const issues = getIssues();
  
  issues.forEach(issue => {
    const colors = {
      critical: "#ef4444",
      high: "#f59e0b",
      medium: "#06b6d4",
      low: "#10b981",
      progress: "#06b6d4",
      resolved: "#10b981"
    };
    
    const color = colors[issue.severity] || colors[issue.status];
    
    const marker = L.circleMarker([issue.latitude, issue.longitude], {
      radius: issue.severity === "critical" ? 10 : 7,
      fillColor: color,
      color: "white",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    }).addTo(map);
    
    marker.bindPopup(`<b>${issue.title}</b><br>${issue.category}<br><a href="#" onclick="openIssueDetail(${issue.id}); return false;">View Details</a>`);
    
    markers.push(marker);
  });
}

// Issues Functions
function getIssues() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ISSUES) || "[]");
  } catch {
    return [];
  }
}

function saveIssues(issues) {
  localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify(issues));
}

function renderIssuesList(issues = null) {
  const issuesToRender = issues || getIssues();
  
  if (issuesToRender.length === 0) {
    document.getElementById("issuesList").innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-search"></i>
        <h3>No issues found</h3>
        <p>Try adjusting your filters</p>
      </div>
    `;
    return;
  }
  
  const cardsHtml = issuesToRender.map(issue => createIssueCard(issue)).join("");
  document.getElementById("issuesList").innerHTML = cardsHtml;
  
  // Add click handlers
  document.querySelectorAll(".issue-card").forEach(card => {
    card.addEventListener("click", () => {
      openIssueDetail(parseInt(card.dataset.issueId));
    });
  });
}

function createIssueCard(issue) {
  const categoryIcons = {
    pollution: "💨",
    litter: "🗑️",
    dumping: "🚛",
    habitat: "🌿",
    water: "💧",
    other: "⚠️"
  };
  
  return `
    <div class="issue-card" data-issue-id="${issue.id}">
      <img src="${issue.photo}" alt="${issue.title}" class="issue-card-image">
      <div class="issue-card-body">
        <div class="issue-card-header">
          <span class="category-badge ${issue.category}">${categoryIcons[issue.category]} ${issue.category}</span>
          <span class="severity-indicator severity-${issue.severity}"></span>
        </div>
        <h3 class="issue-card-title">${issue.title}</h3>
        <div class="issue-card-meta">
          <span><i class="fas fa-user"></i> ${issue.reporter.name}</span>
          <span><i class="fas fa-calendar"></i> ${formatDate(issue.date)}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${issue.latitude.toFixed(4)}, ${issue.longitude.toFixed(4)}</span>
        </div>
        <span class="issue-card-status ${issue.status}">${formatStatus(issue.status)}</span>
        <div class="issue-card-footer">
          <div class="issue-stats">
            <div class="stat">
              <strong>${issue.votes}</strong>
              <span>Votes</span>
            </div>
            <div class="stat">
              <strong>${issue.comments}</strong>
              <span>Comments</span>
            </div>
            <div class="stat">
              <strong>${issue.shares}</strong>
              <span>Shares</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function filterAndRenderIssues() {
  let issues = getIssues();
  
  // Search filter
  const searchTerm = document.getElementById("searchIssues").value.toLowerCase();
  if (searchTerm) {
    issues = issues.filter(i => 
      i.title.toLowerCase().includes(searchTerm) ||
      i.description.toLowerCase().includes(searchTerm)
    );
  }
  
  // Status filter
  const statusFilter = document.getElementById("filterStatus").value;
  if (statusFilter) {
    issues = issues.filter(i => i.status === statusFilter);
  }
  
  // Category filter
  const categoryFilter = document.getElementById("filterCategory").value;
  if (categoryFilter) {
    issues = issues.filter(i => i.category === categoryFilter);
  }
  
  // Sort
  const sortBy = document.getElementById("sortBy").value;
  if (sortBy === "urgent") {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    issues.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
  } else if (sortBy === "votes") {
    issues.sort((a, b) => b.votes - a.votes);
  } else if (sortBy === "comments") {
    issues.sort((a, b) => b.comments - a.comments);
  } else {
    issues.sort((a, b) => b.date - a.date);
  }
  
  renderIssuesList(issues);
}

// Report Modal
function openReportModal() {
  document.getElementById("reportModal").classList.add("active");
}

function closeReportModal() {
  document.getElementById("reportModal").classList.remove("active");
}

function handleReportSubmit(e) {
  e.preventDefault();
  
  const newIssue = {
    id: getIssues().length + 1,
    title: document.getElementById("issueTitle").value,
    category: document.getElementById("issueCategory").value,
    severity: document.getElementById("issueSeverity").value,
    status: "reported",
    description: document.getElementById("issueDescription").value,
    latitude: parseFloat(document.getElementById("issueLatitude").value),
    longitude: parseFloat(document.getElementById("issueLongitude").value),
    photo: "https://via.placeholder.com/400x300?text=User+Report",
    reporter: { name: currentUser.name, avatar: currentUser.avatar },
    date: new Date(),
    votes: 0,
    comments: 0,
    shares: 0,
    upvoted: false,
    comments_list: []
  };
  
  let issues = getIssues();
  issues.push(newIssue);
  saveIssues(issues);
  
  currentUser.reports++;
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(currentUser));
  
  document.getElementById("reportForm").reset();
  document.getElementById("fileName").textContent = "";
  closeReportModal();
  
  showToast("🚩 Issue reported successfully!");
  renderIssuesList();
  renderMap();
  updateStats();
}

// Issue Detail Modal
function openIssueDetail(issueId) {
  const issue = getIssues().find(i => i.id === issueId);
  if (!issue) return;
  
  currentIssueDetail = issue;
  
  document.getElementById("detailPhoto").src = issue.photo;
  document.getElementById("detailCategory").textContent = issue.category;
  document.getElementById("detailCategory").className = `category-badge ${issue.category}`;
  document.getElementById("detailTitle").textContent = issue.title;
  document.getElementById("detailReporter").textContent = `Reported by ${issue.reporter.name}`;
  document.getElementById("detailDate").textContent = formatDate(issue.date);
  document.getElementById("detailDescription").textContent = issue.description;
  
  document.getElementById("detailVotes").textContent = issue.votes;
  document.getElementById("detailComments").textContent = issue.comments;
  document.getElementById("detailShares").textContent = issue.shares;
  
  // Status tracker
  const statuses = ["reported", "review", "progress", "resolved"];
  const currentIndex = statuses.indexOf(issue.status);
  statuses.forEach((status, idx) => {
    const step = document.getElementById(`step-${status}`);
    if (idx <= currentIndex) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
  
  // Comments
  const commentsHtml = issue.comments_list.map(c => `
    <div class="comment">
      <div class="comment-author">${c.author}</div>
      <div class="comment-time">${c.time}</div>
      <div class="comment-text">${c.text}</div>
    </div>
  `).join("");
  document.getElementById("commentsList").innerHTML = commentsHtml;
  
  // Upvote button
  document.getElementById("upvoteBtn").innerHTML = issue.upvoted ? "✓ Upvoted" : "👍 Upvote";
  document.getElementById("upvoteBtn").onclick = () => upvoteIssue(issueId);
  
  document.getElementById("detailModal").classList.add("active");
}

function closeDetailModal() {
  document.getElementById("detailModal").classList.remove("active");
}

function upvoteIssue(issueId) {
  let issues = getIssues();
  const issue = issues.find(i => i.id === issueId);
  
  if (issue && !issue.upvoted) {
    issue.upvoted = true;
    issue.votes++;
    saveIssues(issues);
    openIssueDetail(issueId);
    showToast("Upvote added!");
  }
}

function addComment() {
  const text = document.getElementById("commentText").value;
  if (text.trim()) {
    showToast("Comment posted! 💬");
    document.getElementById("commentText").value = "";
  }
}

// My Reports
function renderMyReports() {
  const allIssues = getIssues();
  const myReports = allIssues.filter(i => i.reporter.name === currentUser.name);
  
  document.getElementById("totalReports").textContent = myReports.length;
  document.getElementById("resolvedReports").textContent = myReports.filter(i => i.status === "resolved").length;
  document.getElementById("totalVotes").textContent = myReports.reduce((sum, i) => sum + i.votes, 0);
  
  renderIssuesList(myReports);
}

// Leaderboard
function renderLeaderboard(period = "month") {
  const leaderboard = sampleLeaderboard[period];
  
  const html = leaderboard.map(person => `
    <div class="leaderboard-item">
      <div class="leaderboard-rank ${person.rank === 1 ? 'gold' : person.rank === 2 ? 'silver' : person.rank === 3 ? 'bronze' : ''}">
        ${person.rank}
      </div>
      <div class="leaderboard-info">
        <div class="leaderboard-name">${person.name}</div>
        <div class="leaderboard-detail">${person.reports} reports • ${person.resolved} resolved</div>
      </div>
      <div class="leaderboard-score">${person.badge}</div>
    </div>
  `).join("");
  
  document.getElementById("leaderboardList").innerHTML = html;
}

// Statistics
function renderStatistics() {
  const issues = getIssues();
  
  document.getElementById("totalIssuesCount").textContent = issues.length;
  document.getElementById("resolvedCount").textContent = issues.filter(i => i.status === "resolved").length;
  document.getElementById("totalCleanups").textContent = 34;
  
  renderCategoryChart();
  renderStatusChart();
  renderTimelineChart();
}

function renderCategoryChart() {
  const issues = getIssues();
  const categories = {
    pollution: 0,
    litter: 0,
    dumping: 0,
    habitat: 0,
    water: 0,
    other: 0
  };
  
  issues.forEach(i => categories[i.category]++);
  
  const canvas = document.getElementById("categoryChart");
  if (!canvas.chart) {
    canvas.chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: Object.keys(categories).map(k => k.charAt(0).toUpperCase() + k.slice(1)),
        datasets: [{
          data: Object.values(categories),
          backgroundColor: ["#ef4444", "#f59e0b", "#8b5cf6", "#06b6d4", "#0891b2", "#64748b"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { position: "bottom", labels: { font: { size: 12 } } } }
      }
    });
  }
}

function renderStatusChart() {
  const issues = getIssues();
  const statuses = {
    reported: issues.filter(i => i.status === "reported").length,
    review: issues.filter(i => i.status === "review").length,
    progress: issues.filter(i => i.status === "progress").length,
    resolved: issues.filter(i => i.status === "resolved").length
  };
  
  const canvas = document.getElementById("statusChart");
  if (!canvas.chart) {
    canvas.chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: ["Reported", "Under Review", "In Progress", "Resolved"],
        datasets: [{
          label: "Issues",
          data: Object.values(statuses),
          backgroundColor: ["#94a3b8", "#f59e0b", "#06b6d4", "#10b981"],
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: "y",
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true } }
      }
    });
  }
}

function renderTimelineChart() {
  const dates = [];
  const counts = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
    counts.push(Math.floor(Math.random() * 5) + 1);
  }
  
  const canvas = document.getElementById("timelineChart");
  if (!canvas.chart) {
    canvas.chart = new Chart(canvas, {
      type: "line",
      data: {
        labels: dates,
        datasets: [{
          label: "Issues Reported",
          data: counts,
          borderColor: "#059669",
          backgroundColor: "rgba(5, 150, 105, 0.1)",
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: "#059669"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true },
          x: { grid: { display: false } }
        }
      }
    });
  }
}

// Utilities
function updateStats() {
  const allIssues = getIssues();
  document.getElementById("activeReporters").textContent = 156;
}

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatStatus(status) {
  const map = { reported: "Reported", review: "Under Review", progress: "In Progress", resolved: "Resolved" };
  return map[status] || status;
}

function debounce(func, delay) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Make functions globally accessible
window.openReportModal = openReportModal;
window.closeReportModal = closeReportModal;
window.closeDetailModal = closeDetailModal;
window.openIssueDetail = openIssueDetail;
window.upvoteIssue = upvoteIssue;
window.addComment = addComment;

// Initialize on load
document.addEventListener("DOMContentLoaded", init);
