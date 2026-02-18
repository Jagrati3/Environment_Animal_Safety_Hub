// Community Cleanup Events Organizer JavaScript

// Sample Data
const events = [
  {
    id: 1,
    title: 'Central Park Spring Cleanup',
    date: '2026-02-15',
    time: '09:00',
    location: 'Central Park, Downtown',
    capacity: 50,
    registered: 42,
    duration: 3,
    description: 'Join us for a major spring cleanup of Central Park!',
    supplies: ['gloves', 'bags', 'rakes', 'water'],
    wasteCollected: 450,
    volunteersRequired: 50,
    expectedImpact: '450 kg waste diverted'
  },
  {
    id: 2,
    title: 'Riverside Trail Restoration',
    date: '2026-02-20',
    time: '10:00',
    location: 'Riverside Trail, North Side',
    capacity: 35,
    registered: 28,
    duration: 4,
    description: 'Help restore and clean our beautiful riverside trail.',
    supplies: ['gloves', 'bags', 'shovels', 'water', 'vests'],
    wasteCollected: 0,
    volunteersRequired: 35,
    expectedImpact: '500 kg waste diverted'
  },
  {
    id: 3,
    title: 'Beach Cleanup Initiative',
    date: '2026-02-22',
    time: '08:00',
    location: 'Silver Beach, Coastal Area',
    capacity: 60,
    registered: 35,
    duration: 3.5,
    description: 'Clean our beautiful beaches and protect marine life!',
    supplies: ['gloves', 'bags', 'rakes', 'water', 'vests'],
    wasteCollected: 0,
    volunteersRequired: 60,
    expectedImpact: '600 kg waste diverted'
  },
  {
    id: 4,
    title: 'Neighborhood Street Sweep',
    date: '2026-02-25',
    time: '14:00',
    location: 'Main Street & Surroundings',
    capacity: 25,
    registered: 18,
    duration: 2,
    description: 'Keep our main streets clean and beautiful.',
    supplies: ['gloves', 'bags', 'brooms'],
    wasteCollected: 0,
    volunteersRequired: 25,
    expectedImpact: '200 kg waste diverted'
  },
  {
    id: 5,
    title: 'Mountain Trail Cleanup',
    date: '2026-03-01',
    time: '09:00',
    location: 'Mountain Ridge Trail, Hiking Area',
    capacity: 40,
    registered: 22,
    duration: 5,
    description: 'Preserve our natural mountain trails for everyone.',
    supplies: ['gloves', 'bags', 'rakes', 'shovels', 'water'],
    wasteCollected: 0,
    volunteersRequired: 40,
    expectedImpact: '550 kg waste diverted'
  }
];

const volunteers = [
  { id: 1, name: 'Marcus Chen', hours: 68, events: 12, skills: ['heavy-lifting', 'training'] },
  { id: 2, name: 'Sarah Johnson', hours: 45, events: 8, skills: ['event-planning', 'photography'] },
  { id: 3, name: 'Elena Rodriguez', hours: 38, events: 7, skills: ['training', 'driving'] },
  { id: 4, name: 'James Williams', hours: 32, events: 6, skills: ['heavy-lifting'] },
  { id: 5, name: 'Priya Patel', hours: 28, events: 5, skills: ['photography', 'event-planning'] },
  { id: 6, name: 'David Kim', hours: 24, events: 4, skills: ['training', 'heavy-lifting'] },
  { id: 7, name: 'Emma Watson', hours: 20, events: 4, skills: ['driving', 'photography'] },
  { id: 8, name: 'Michael Brown', hours: 16, events: 3, skills: ['heavy-lifting'] }
];

const achievements = [
  { icon: '🌟', title: 'First Cleanup', desc: 'Attend your first event', unlocked: true },
  { icon: '🏆', title: 'Top Contributor', desc: 'Complete 10 events', unlocked: true },
  { icon: '🌱', title: 'Green Champion', desc: 'Divert 1 ton of waste', unlocked: true },
  { icon: '⏰', title: '100 Hours', desc: 'Log 100 volunteer hours', unlocked: false },
  { icon: '🎯', title: 'Event Organizer', desc: 'Create 5 events', unlocked: false },
  { icon: '👑', title: 'Legend', desc: 'Reach #1 on leaderboard', unlocked: false }
];

// State
let currentTab = 'events';
let currentFilter = 'all';
let currentMonth = new Date();
let userRegisteredEvents = [1, 3];
let charts = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
});

function initializeApp() {
  // Set header stats
  updateHeaderStats();
  
  // Load all tabs
  loadEvents();
  loadCalendar();
  loadVolunteers();
  loadLeaderboard();
  loadImpact();
}

function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll('.tab-link').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });
  
  // Header actions
  document.getElementById('createEventBtn').addEventListener('click', () => switchTab('events'));
  document.getElementById('calendarViewBtn').addEventListener('click', () => switchTab('calendar'));
  
  // Event filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => filterEvents(btn.dataset.filter));
  });
  
  // Event form
  document.getElementById('eventForm').addEventListener('submit', handleEventSubmit);
  
  // Volunteer form
  document.getElementById('volunteerForm').addEventListener('submit', handleVolunteerSubmit);
  
  // Calendar navigation
  document.getElementById('prevMonth').addEventListener('click', () => previousMonth());
  document.getElementById('nextMonth').addEventListener('click', () => nextMonth());
  
  // Leaderboard filter
  document.getElementById('leaderboardFilter').addEventListener('change', updateLeaderboard);
}

function updateHeaderStats() {
  document.getElementById('upcomingCount').textContent = events.filter(e => new Date(e.date) > new Date()).length;
  document.getElementById('volunteerCount').textContent = volunteers.length;
  const totalWaste = events.reduce((sum, e) => sum + e.wasteCollected, 0);
  document.getElementById('wasteCollected').textContent = (totalWaste / 1000).toFixed(1) + 'T';
}

// Tab Switching
function switchTab(tabName) {
  currentTab = tabName;
  
  // Update tab links
  document.querySelectorAll('.tab-link').forEach(link => {
    link.classList.toggle('active', link.dataset.tab === tabName);
  });
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === tabName);
  });
  
  // Trigger chart redraws if needed
  setTimeout(() => {
    Object.values(charts).forEach(chart => {
      if (chart && typeof chart.resize === 'function') {
        chart.resize();
      }
    });
  }, 100);
}

// Events Functions
function loadEvents() {
  renderEventsList();
}

function renderEventsList() {
  const container = document.getElementById('eventsList');
  
  let filteredEvents = events;
  if (currentFilter === 'this-week') {
    const today = new Date();
    const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    filteredEvents = events.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate >= today && eventDate <= weekLater;
    });
  } else if (currentFilter === 'this-month') {
    const today = new Date();
    const monthLater = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    filteredEvents = events.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate >= today && eventDate <= monthLater;
    });
  }
  
  container.innerHTML = filteredEvents.map(event => {
    const isRegistered = userRegisteredEvents.includes(event.id);
    const progress = (event.registered / event.capacity) * 100;
    const eventDate = new Date(event.date);
    const dateStr = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return `
      <div class="event-card">
        <div class="event-header">
          <h4 class="event-title">${event.title}</h4>
          <span class="event-badge">${event.registered}/${event.capacity}</span>
        </div>
        <div class="event-meta">
          <div class="event-meta-item">
            <i class="fa-solid fa-calendar"></i>
            <span>${dateStr} at ${event.time}</span>
          </div>
          <div class="event-meta-item">
            <i class="fa-solid fa-map-pin"></i>
            <span>${event.location}</span>
          </div>
          <div class="event-meta-item">
            <i class="fa-solid fa-clock"></i>
            <span>${event.duration} hours</span>
          </div>
        </div>
        <div class="event-progress">
          <div class="progress-text">
            <span>Volunteers Registered</span>
            <span>${progress.toFixed(0)}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        <div class="event-supplies">
          ${event.supplies.map(s => `<span class="supply-badge">${capitalizeFirst(s)}</span>`).join('')}
        </div>
        <div class="event-actions">
          <button class="join-btn" ${isRegistered ? 'style="opacity:0.5"' : ''} onclick="joinEvent(${event.id})">
            ${isRegistered ? '<i class="fa-solid fa-check"></i> Registered' : '<i class="fa-solid fa-user-plus"></i> Join Event'}
          </button>
          <button class="details-btn" onclick="viewEventDetails(${event.id})">
            <i class="fa-solid fa-info-circle"></i> Details
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function filterEvents(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderEventsList();
}

function joinEvent(eventId) {
  const event = events.find(e => e.id === eventId);
  if (!event) return;
  
  if (userRegisteredEvents.includes(eventId)) {
    userRegisteredEvents = userRegisteredEvents.filter(id => id !== eventId);
    event.registered--;
    showToast('Unregistered from event', 'info');
  } else {
    if (event.registered < event.capacity) {
      userRegisteredEvents.push(eventId);
      event.registered++;
      showToast('Successfully registered for event!', 'success');
    } else {
      showToast('Event is full', 'error');
      return;
    }
  }
  
  renderEventsList();
  updateHeaderStats();
}

function viewEventDetails(eventId) {
  const event = events.find(e => e.id === eventId);
  if (!event) return;
  
  const modal = document.getElementById('eventDetailsModal');
  const content = document.getElementById('eventDetailsContent');
  
  const eventDate = new Date(event.date);
  const dateStr = eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  content.innerHTML = `
    <div style="padding: 1.5rem;">
      <h4 style="font-size: 1.25rem; margin-bottom: 1rem; color: var(--text-primary);">${event.title}</h4>
      <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${event.description}</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px;">
          <strong style="display: block; font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">📅 Date & Time</strong>
          <span>${dateStr} at ${event.time}</span>
        </div>
        <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px;">
          <strong style="display: block; font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">📍 Location</strong>
          <span>${event.location}</span>
        </div>
        <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px;">
          <strong style="display: block; font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">👥 Volunteers</strong>
          <span>${event.registered}/${event.capacity} registered</span>
        </div>
        <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px;">
          <strong style="display: block; font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">⏱️ Duration</strong>
          <span>${event.duration} hours</span>
        </div>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <strong style="display: block; margin-bottom: 0.75rem;">🛠️ Supplies Needed</strong>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${event.supplies.map(s => `<span style="background: var(--info-color); color: white; padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.875rem;">${capitalizeFirst(s)}</span>`).join('')}
        </div>
      </div>
      
      <div style="background: #dcfce7; padding: 1rem; border-radius: 8px; border-left: 4px solid var(--success-color);">
        <strong style="color: #166534;">🌍 Expected Impact</strong>
        <p style="color: #166534; margin-top: 0.5rem;">${event.expectedImpact}</p>
      </div>
    </div>
  `;
  
  document.getElementById('modalEventTitle').textContent = event.title;
  modal.classList.add('active');
}

function handleEventSubmit(e) {
  e.preventDefault();
  
  const newEvent = {
    id: events.length + 1,
    title: document.getElementById('eventTitle').value,
    date: document.getElementById('eventDate').value,
    time: document.getElementById('eventTime').value,
    location: document.getElementById('eventLocation').value,
    capacity: parseInt(document.getElementById('eventCapacity').value),
    registered: 1,
    duration: parseFloat(document.getElementById('eventDuration').value),
    description: document.getElementById('eventDescription').value,
    supplies: Array.from(document.querySelectorAll('input[name*="eventSupplies"]:checked')).map(cb => cb.value),
    wasteCollected: 0,
    volunteersRequired: parseInt(document.getElementById('eventCapacity').value),
    expectedImpact: Math.floor(Math.random() * 400 + 200) + ' kg waste diverted'
  };
  
  events.push(newEvent);
  userRegisteredEvents.push(newEvent.id);
  
  e.target.reset();
  renderEventsList();
  updateHeaderStats();
  showToast('Event created successfully!', 'success');
}

// Calendar Functions
function loadCalendar() {
  renderCalendar();
  document.getElementById('monthYear').textContent = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function renderCalendar() {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const container = document.getElementById('calendarDays');
  container.innerHTML = '';
  
  let currentDate = new Date(startDate);
  
  for (let i = 0; i < 42; i++) {
    const day = currentDate.getDate();
    const isCurrentMonth = currentDate.getMonth() === month;
    const dateStr = currentDate.toISOString().split('T')[0];
    const hasEvent = events.some(e => e.date === dateStr);
    
    const dayEl = document.createElement('div');
    dayEl.className = `calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${hasEvent ? 'has-event' : ''}`;
    dayEl.textContent = day;
    
    if (hasEvent) {
      dayEl.title = events.filter(e => e.date === dateStr).map(e => e.title).join('\n');
    }
    
    container.appendChild(dayEl);
    currentDate.setDate(currentDate.getDate() + 1);
  }
}

function previousMonth() {
  currentMonth.setMonth(currentMonth.getMonth() - 1);
  document.getElementById('monthYear').textContent = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  renderCalendar();
}

function nextMonth() {
  currentMonth.setMonth(currentMonth.getMonth() + 1);
  document.getElementById('monthYear').textContent = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  renderCalendar();
}

// Volunteers Functions
function loadVolunteers() {
  renderVolunteersList();
  renderVolunteerStats();
}

function renderVolunteersList() {
  const container = document.getElementById('volunteersGrid');
  
  container.innerHTML = volunteers.map(vol => `
    <div class="volunteer-card">
      <div class="volunteer-avatar">
        <i class="fa-solid fa-user"></i>
      </div>
      <div class="volunteer-name">${vol.name}</div>
      <div class="volunteer-info">${vol.events} events • ${vol.hours} hours</div>
      <div style="margin-top: 0.75rem; font-size: 0.75rem; color: var(--text-secondary);">
        ${vol.skills.map(s => capitalizeFirst(s)).join(', ')}
      </div>
      <div class="volunteer-stats-small">
        <div class="stat-small">
          <div class="stat-small-value">${vol.hours}</div>
          <div class="stat-small-label">Hours</div>
        </div>
        <div class="stat-small">
          <div class="stat-small-value">${vol.events}</div>
          <div class="stat-small-label">Events</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderVolunteerStats() {
  const ctx = document.getElementById('volunteerStatsChart');
  if (!ctx) return;
  
  if (charts.volunteer) charts.volunteer.destroy();
  
  charts.volunteer = new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: {
      labels: volunteers.slice(0, 6).map(v => v.name.split(' ')[0]),
      datasets: [{
        label: 'Hours Volunteered',
        data: volunteers.slice(0, 6).map(v => v.hours),
        backgroundColor: '#10b981'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

function handleVolunteerSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('volName').value;
  
  const newVolunteer = {
    id: volunteers.length + 1,
    name: name,
    hours: 0,
    events: 0,
    skills: Array.from(document.querySelectorAll('input[name*="volSkills"]:checked')).map(cb => cb.value)
  };
  
  volunteers.push(newVolunteer);
  e.target.reset();
  renderVolunteersList();
  showToast(`Welcome, ${name}!`, 'success');
}

// Leaderboard Functions
function loadLeaderboard() {
  renderLeaderboard();
  renderAchievements();
}

function renderLeaderboard() {
  // Update podium
  document.getElementById('first-name').textContent = volunteers[0].name;
  document.getElementById('first-stat').textContent = volunteers[0].hours + ' hours';
  document.getElementById('second-name').textContent = volunteers[1].name;
  document.getElementById('second-stat').textContent = volunteers[1].hours + ' hours';
  document.getElementById('third-name').textContent = volunteers[2].name;
  document.getElementById('third-stat').textContent = volunteers[2].hours + ' hours';
  
  // Update list
  const container = document.getElementById('leaderboardList');
  
  container.innerHTML = volunteers.slice(3).map((vol, index) => `
    <div class="leaderboard-item">
      <div class="leaderboard-rank">${index + 4}</div>
      <div class="leaderboard-info">
        <div class="leaderboard-name">${vol.name}</div>
        <div class="leaderboard-stat">${vol.hours} hours • ${vol.events} events</div>
      </div>
    </div>
  `).join('');
}

function renderAchievements() {
  const container = document.getElementById('achievementsGrid');
  
  container.innerHTML = achievements.map(ach => `
    <div class="achievement-card ${ach.unlocked ? 'unlocked' : ''}">
      <div class="achievement-icon">${ach.icon}</div>
      <div class="achievement-title">${ach.title}</div>
      <div class="achievement-desc">${ach.desc}</div>
    </div>
  `).join('');
}

function updateLeaderboard() {
  const filter = document.getElementById('leaderboardFilter').value;
  const sortedVolunteers = [...volunteers].sort((a, b) => {
    if (filter === 'hours') return b.hours - a.hours;
    if (filter === 'events') return b.events - a.events;
    return b.hours - a.hours;
  });
  
  // Update with sorted data
  document.getElementById('first-name').textContent = sortedVolunteers[0].name;
  document.getElementById('first-stat').textContent = sortedVolunteers[0][filter === 'events' ? 'events' : 'hours'] + (filter === 'events' ? ' events' : ' hours');
  document.getElementById('second-name').textContent = sortedVolunteers[1].name;
  document.getElementById('second-stat').textContent = sortedVolunteers[1][filter === 'events' ? 'events' : 'hours'] + (filter === 'events' ? ' events' : ' hours');
  document.getElementById('third-name').textContent = sortedVolunteers[2].name;
  document.getElementById('third-stat').textContent = sortedVolunteers[2][filter === 'events' ? 'events' : 'hours'] + (filter === 'events' ? ' events' : ' hours');
}

// Impact Functions
function loadImpact() {
  renderWasteBreakdown();
  renderMonthlyTrend();
  renderTopImpactChart();
  renderWasteTypes();
}

function renderWasteBreakdown() {
  const ctx = document.getElementById('wasteBreakdownChart');
  if (!ctx) return;
  
  if (charts.waste) charts.waste.destroy();
  
  charts.waste = new Chart(ctx.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Plastic', 'Paper', 'Metal', 'Organic', 'Other'],
      datasets: [{
        data: [35, 25, 20, 15, 5],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'bottom', labels: { padding: 15 } }
      }
    }
  });
}

function renderWasteTypes() {
  const container = document.getElementById('wasteTypes');
  
  const wasteTypes = [
    { type: 'Plastic', amount: 1250, color: '#3b82f6' },
    { type: 'Paper', amount: 895, color: '#10b981' },
    { type: 'Metal', amount: 712, color: '#f59e0b' },
    { type: 'Organic', amount: 534, color: '#8b5cf6' },
    { type: 'Other', amount: 178, color: '#ec4899' }
  ];
  
  container.innerHTML = wasteTypes.map(w => `
    <div class="waste-item">
      <span class="waste-label">
        <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${w.color}; margin-right: 0.5rem;"></span>
        ${w.type}
      </span>
      <span class="waste-value">${w.amount} kg</span>
    </div>
  `).join('');
}

function renderMonthlyTrend() {
  const ctx = document.getElementById('monthlyTrendChart');
  if (!ctx) return;
  
  if (charts.trend) charts.trend.destroy();
  
  charts.trend = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Waste Collected (kg)',
        data: [450, 620, 890, 1156],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

function renderTopImpactChart() {
  const ctx = document.getElementById('topImpactChart');
  if (!ctx) return;
  
  if (charts.impact) charts.impact.destroy();
  
  charts.impact = new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: {
      labels: volunteers.slice(0, 5).map(v => v.name.split(' ')[0]),
      datasets: [{
        label: 'Waste Diverted (kg)',
        data: [156, 124, 98, 87, 72],
        backgroundColor: ['#fbbf24', '#cbd5e1', '#fdba74', '#3b82f6', '#10b981']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true } }
    }
  });
}

// Modal Functions
function closeEventModal() {
  document.getElementById('eventDetailsModal').classList.remove('active');
}

// Utility Functions
function capitalizeFirst(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
