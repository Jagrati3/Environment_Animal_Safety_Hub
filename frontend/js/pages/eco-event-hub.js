// Storage Keys
const STORAGE_KEYS = {
  EVENTS: "ecoEvents",
  USER_EVENTS: "userEvents",
  DISCUSSIONS: "discussionThreads",
  USER_PROFILE: "ecoUserProfile"
};

// Current User
let currentUser = {
  id: 1,
  name: "Eco Warrior",
  email: "ecowarrior@example.com",
  joinDate: new Date(2023, 5, 15),
  avatar: "https://via.placeholder.com/100",
  bio: "Passionate about environmental conservation",
  badges: []
};

// Sample Events
let sampleEvents = [
  {
    id: 1,
    title: "Beach Cleanup Drive",
    category: "cleanup",
    date: new Date(2026, 1, 8),
    time: "08:00",
    duration: 3,
    location: "Sandy Beach, Eco City",
    latitude: 40.7128,
    longitude: -74.0060,
    maxAttendees: 50,
    currentAttendees: 24,
    organizer: { id: 2, name: "Green Team", avatar: "https://via.placeholder.com/40" },
    description: "Join us for a community beach cleanup. We'll be collecting trash, recyclables, and microplastics. All tools provided. Perfect for families!",
    image: "https://via.placeholder.com/300x200?text=Beach+Cleanup",
    attendees: [
      { id: 1, name: "Eco Warrior", avatar: "https://via.placeholder.com/30" },
      { id: 3, name: "Green Guardian", avatar: "https://via.placeholder.com/30" },
      { id: 4, name: "Nature Lover", avatar: "https://via.placeholder.com/30" }
    ],
    comments: [
      { id: 1, author: "Green Guardian", avatar: "https://via.placeholder.com/30", text: "Can't wait for this!", timestamp: Date.now() - 3600000 },
      { id: 2, author: "Nature Lover", avatar: "https://via.placeholder.com/30", text: "What should I bring?", timestamp: Date.now() - 1800000 }
    ],
    likes: 12,
    userLiked: true,
    userRegistered: true,
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000
  },
  {
    id: 2,
    title: "Sustainable Urban Gardening Workshop",
    category: "workshop",
    date: new Date(2026, 1, 15),
    time: "10:00",
    duration: 2,
    location: "Community Center, Main St",
    latitude: 40.7150,
    longitude: -74.0080,
    maxAttendees: 30,
    currentAttendees: 18,
    organizer: { id: 5, name: "Green Thumb Club", avatar: "https://via.placeholder.com/40" },
    description: "Learn how to create sustainable gardens in urban spaces. Topics: composting, vertical gardening, organic pest control, and water conservation. Bring notes!",
    image: "https://via.placeholder.com/300x200?text=Urban+Gardening",
    attendees: [
      { id: 3, name: "Green Guardian", avatar: "https://via.placeholder.com/30" },
      { id: 6, name: "Gardener Pro", avatar: "https://via.placeholder.com/30" }
    ],
    comments: [],
    likes: 8,
    userLiked: false,
    userRegistered: false,
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000
  },
  {
    id: 3,
    title: "Tree Planting Initiative - Spring 2026",
    category: "planting",
    date: new Date(2026, 2, 1),
    time: "09:00",
    duration: 4,
    location: "Greenfield Park",
    latitude: 40.7200,
    longitude: -74.0100,
    maxAttendees: 100,
    currentAttendees: 67,
    organizer: { id: 7, name: "Forest Friends", avatar: "https://via.placeholder.com/40" },
    description: "We're planting 500 native trees to restore our local ecosystem. This year we're focusing on oak, maple, and birch species. Great community event!",
    image: "https://via.placeholder.com/300x200?text=Tree+Planting",
    attendees: [
      { id: 1, name: "Eco Warrior", avatar: "https://via.placeholder.com/30" },
      { id: 4, name: "Nature Lover", avatar: "https://via.placeholder.com/30" },
      { id: 8, name: "Eco Champion", avatar: "https://via.placeholder.com/30" }
    ],
    comments: [
      { id: 1, author: "Eco Champion", avatar: "https://via.placeholder.com/30", text: "Excited to make a difference!", timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000 }
    ],
    likes: 35,
    userLiked: true,
    userRegistered: true,
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000
  },
  {
    id: 4,
    title: "Wildlife Photography Expedition",
    category: "volunteer",
    date: new Date(2026, 2, 10),
    time: "06:00",
    duration: 5,
    location: "Nature Reserve Trail",
    latitude: 40.6300,
    longitude: -74.0500,
    maxAttendees: 15,
    currentAttendees: 9,
    organizer: { id: 9, name: "Wildlife Watchers", avatar: "https://via.placeholder.com/40" },
    description: "Document wildlife in their natural habitat. No experience needed! We provide guidance. Bring cameras or phones. Help us build a wildlife database.",
    image: "https://via.placeholder.com/300x200?text=Wildlife+Photography",
    attendees: [
      { id: 4, name: "Nature Lover", avatar: "https://via.placeholder.com/30" }
    ],
    comments: [],
    likes: 6,
    userLiked: false,
    userRegistered: false,
    createdAt: Date.now() - 12 * 24 * 60 * 60 * 1000
  },
  {
    id: 5,
    title: "Green Careers Conference 2026",
    category: "conference",
    date: new Date(2026, 2, 20),
    time: "09:30",
    duration: 8,
    location: "Convention Center, Downtown",
    latitude: 40.7500,
    longitude: -73.9900,
    maxAttendees: 500,
    currentAttendees: 245,
    organizer: { id: 10, name: "Green Jobs Initiative", avatar: "https://via.placeholder.com/40" },
    description: "Network with environmental professionals. Learn about sustainability careers, green tech opportunities, and social impact ventures. Keynotes from industry leaders.",
    image: "https://via.placeholder.com/300x200?text=Green+Conference",
    attendees: [
      { id: 3, name: "Green Guardian", avatar: "https://via.placeholder.com/30" }
    ],
    comments: [
      { id: 1, author: "Green Guardian", avatar: "https://via.placeholder.com/30", text: "Perfect timing for my career change!", timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000 }
    ],
    likes: 42,
    userLiked: false,
    userRegistered: false,
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000
  },
  {
    id: 6,
    title: "Eco Meetup & Social Hour",
    category: "social",
    date: new Date(2026, 1, 12),
    time: "18:00",
    duration: 2,
    location: "Green Cafe, Downtown",
    latitude: 40.7100,
    longitude: -73.9900,
    maxAttendees: 40,
    currentAttendees: 22,
    organizer: { id: 2, name: "Green Team", avatar: "https://via.placeholder.com/40" },
    description: "Casual meetup for eco-conscious folks. Share ideas, network, and enjoy eco-friendly snacks. Great opportunity to connect with like-minded people!",
    image: "https://via.placeholder.com/300x200?text=Eco+Social",
    attendees: [
      { id: 1, name: "Eco Warrior", avatar: "https://via.placeholder.com/30" },
      { id: 5, name: "Sustainability Guru", avatar: "https://via.placeholder.com/30" }
    ],
    comments: [
      { id: 1, author: "Sustainability Guru", avatar: "https://via.placeholder.com/30", text: "See you there!", timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000 }
    ],
    likes: 18,
    userLiked: true,
    userRegistered: true,
    createdAt: Date.now() - 6 * 24 * 60 * 60 * 1000
  }
];

// Sample Discussion Threads
let sampleDiscussions = [
  {
    id: 1,
    author: "Green Guardian",
    avatar: "https://via.placeholder.com/40",
    title: "Best practices for community gardens",
    content: "What are the best practices for starting a community garden? Looking for tips on soil preparation and plant selection.",
    replies: 5,
    likes: 12,
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    comments: [
      { author: "Gardener Pro", text: "Raised beds work great!", timestamp: Date.now() - 48 * 60 * 60 * 1000 },
      { author: "Eco Champion", text: "Composting is key to soil health", timestamp: Date.now() - 24 * 60 * 60 * 1000 }
    ]
  },
  {
    id: 2,
    author: "Nature Lover",
    avatar: "https://via.placeholder.com/40",
    title: "Local conservation success stories",
    content: "I'd love to hear about conservation wins in our community. What's the most impactful project you've been part of?",
    replies: 3,
    likes: 8,
    timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
    comments: []
  },
  {
    id: 3,
    author: "Sustainability Guru",
    avatar: "https://via.placeholder.com/40",
    title: "Zero waste shopping tips",
    content: "How do you manage zero waste shopping? Share your favorite local stores and tips!",
    replies: 7,
    likes: 15,
    timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000,
    comments: []
  }
];

// Sample Leaderboard (Top Contributors)
let sampleContributors = [
  { rank: 1, name: "Green Guardian", score: 2850, badge: "🏆", events: 28 },
  { rank: 2, name: "Eco Champion", score: 2450, badge: "🥈", events: 24 },
  { rank: 3, name: "Sustainability Guru", score: 2100, badge: "🥉", events: 21 },
  { rank: 4, name: "Gardener Pro", score: 1950, badge: "", events: 18 },
  { rank: 5, name: "Nature Lover", score: 1850, badge: "", events: 16 }
];

// Initialize
function init() {
  loadOrCreateEvents();
  loadUserProfile();
  
  setupEventListeners();
  setupTabNavigation();
  
  renderDashboard();
  updateHeroStats();
  renderEvents();
  renderCommunity();
}

function setupEventListeners() {
  // Create event button
  document.getElementById("createEventBtn").addEventListener("click", openCreateEventModal);
  
  // Event search
  document.getElementById("eventSearch").addEventListener("input", debounce(filterEvents, 300));
  
  // Category filters
  document.querySelectorAll(".category-filter").forEach(checkbox => {
    checkbox.addEventListener("change", filterEvents);
  });
  
  // Distance filter
  document.getElementById("filterDistance").addEventListener("input", (e) => {
    document.getElementById("distanceValue").textContent = e.target.value + " km";
    filterEvents();
  });
  
  // Date filters
  document.getElementById("filterStartDate").addEventListener("change", filterEvents);
  document.getElementById("filterEndDate").addEventListener("change", filterEvents);
  
  // Reset filters
  document.getElementById("resetFilters").addEventListener("click", resetFilters);
  
  // View toggle
  document.querySelectorAll(".view-toggle").forEach(btn => {
    btn.addEventListener("click", toggleView);
  });
  
  // Calendar navigation
  document.getElementById("prevMonth").addEventListener("click", () => changeMonth(-1));
  document.getElementById("nextMonth").addEventListener("click", () => changeMonth(1));
  
  // My events tabs
  document.querySelectorAll(".event-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".event-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderMyEvents(tab.dataset.status);
    });
  });
  
  // Create event form
  document.getElementById("createEventForm").addEventListener("submit", handleCreateEvent);
  
  // Community
  document.getElementById("startDiscussionBtn").addEventListener("click", startDiscussion);
}

function setupTabNavigation() {
  document.querySelectorAll("[data-tab]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabName = e.target.closest("[data-tab]").dataset.tab;
      switchTab(tabName);
    });
  });
}

function switchTab(tabName) {
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.remove("active");
  });
  document.getElementById(`${tabName}-tab`)?.classList.add("active");
  
  // Re-render based on tab
  if (tabName === "calendar") renderCalendar();
  if (tabName === "community") renderCommunity();
}

// Dashboard
function renderDashboard() {
  const events = getEvents();
  const userEvents = events.filter(e => e.userRegistered);
  const upcomingCount = events.filter(e => new Date(e.date) > new Date()).length;
  
  document.getElementById("totalEvents").textContent = events.length;
  document.getElementById("upcomingCount").textContent = upcomingCount;
}

function updateHeroStats() {
  const events = getEvents();
  document.getElementById("totalEvents").textContent = events.length;
  document.getElementById("upcomingCount").textContent = events.filter(e => new Date(e.date) > new Date()).length;
}

// Events
function loadOrCreateEvents() {
  let events = localStorage.getItem(STORAGE_KEYS.EVENTS);
  if (!events) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(sampleEvents));
  }
}

function getEvents() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || "[]");
  } catch {
    return [];
  }
}

function saveEvents(events) {
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
}

function renderEvents(events = null) {
  const eventsToRender = events || getEvents();
  
  if (eventsToRender.length === 0) {
    document.getElementById("eventsContainer").innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-calendar-plus"></i>
        <h3>No events found</h3>
        <p>Try adjusting your filters or create a new event!</p>
      </div>
    `;
    return;
  }
  
  const cardsHtml = eventsToRender.map(event => createEventCard(event)).join("");
  document.getElementById("eventsContainer").innerHTML = cardsHtml;
  
  // Add click handlers
  document.querySelectorAll(".event-card").forEach(card => {
    card.addEventListener("click", () => openEventModal(card.dataset.eventId));
  });
  
  document.querySelectorAll(".action-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const eventId = btn.closest(".event-card").dataset.eventId;
      
      if (btn.classList.contains("like-btn")) {
        toggleLike(eventId);
      } else if (btn.classList.contains("save-btn")) {
        toggleSave(eventId);
      }
    });
  });
}

function createEventCard(event) {
  const icons = {
    cleanup: "🧹",
    workshop: "💡",
    planting: "🌱",
    volunteer: "🙌",
    conference: "🎤",
    social: "👥"
  };
  
  const categoryColors = {
    cleanup: "#0ea5e9",
    workshop: "#06b6d4",
    planting: "#10b981",
    volunteer: "#f59e0b",
    conference: "#8b5cf6",
    social: "#ec4899"
  };
  
  return `
    <div class="event-card" data-event-id="${event.id}">
      <img src="${event.image}" alt="${event.title}" class="event-card-image">
      <div class="event-card-body">
        <div class="event-card-header">
          <span class="badge" style="background: ${categoryColors[event.category]}">${icons[event.category]} ${event.category}</span>
          <div class="event-card-actions">
            <button class="action-btn like-btn ${event.userLiked ? 'active' : ''}">
              <i class="fas fa-heart"></i>
            </button>
            <button class="action-btn save-btn">
              <i class="fas fa-bookmark"></i>
            </button>
          </div>
        </div>
        <h3 class="event-card-title">${event.title}</h3>
        <div class="event-card-meta">
          <span><i class="fas fa-calendar"></i> ${new Date(event.date).toLocaleDateString()}</span>
          <span><i class="fas fa-clock"></i> ${event.time} (${event.duration}h)</span>
          <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
        </div>
        <div class="event-card-attendees">
          ${event.attendees.slice(0, 3).map(a => `<img src="${a.avatar}" class="attendee-avatar" title="${a.name}">`).join("")}
          ${event.attendees.length > 3 ? `<div style="padding: 0 5px; display: flex; align-items: center; color: #64748b;">+${event.attendees.length - 3}</div>` : ""}
        </div>
        <div class="event-card-footer">
          <span>${event.currentAttendees} / ${event.maxAttendees} attending</span>
          <button class="btn-primary" onclick="registerEvent(${event.id})">
            ${event.userRegistered ? "Registered" : "Register"}
          </button>
        </div>
      </div>
    </div>
  `;
}

function toggleLike(eventId) {
  let events = getEvents();
  const event = events.find(e => e.id === parseInt(eventId));
  if (event) {
    event.userLiked = !event.userLiked;
    event.likes += event.userLiked ? 1 : -1;
    saveEvents(events);
    renderEvents();
    showToast(event.userLiked ? "Added to favorites!" : "Removed from favorites");
  }
}

function toggleSave(eventId) {
  showToast("Event saved!");
}

function filterEvents() {
  let events = getEvents();
  
  // Category filter
  const activeCategories = Array.from(document.querySelectorAll(".category-filter:checked")).map(cb => cb.value);
  events = events.filter(e => activeCategories.includes(e.category));
  
  // Search filter
  const searchTerm = document.getElementById("eventSearch").value.toLowerCase();
  if (searchTerm) {
    events = events.filter(e => 
      e.title.toLowerCase().includes(searchTerm) ||
      e.location.toLowerCase().includes(searchTerm) ||
      e.category.toLowerCase().includes(searchTerm)
    );
  }
  
  // Date range filter
  const startDate = document.getElementById("filterStartDate").value;
  const endDate = document.getElementById("filterEndDate").value;
  if (startDate) {
    events = events.filter(e => new Date(e.date) >= new Date(startDate));
  }
  if (endDate) {
    events = events.filter(e => new Date(e.date) <= new Date(endDate));
  }
  
  renderEvents(events);
}

function resetFilters() {
  document.querySelectorAll(".category-filter").forEach(cb => cb.checked = true);
  document.getElementById("eventSearch").value = "";
  document.getElementById("filterStartDate").value = "";
  document.getElementById("filterEndDate").value = "";
  document.getElementById("filterDistance").value = 25;
  document.getElementById("distanceValue").textContent = "25 km";
  renderEvents();
}

function toggleView(e) {
  document.querySelectorAll(".view-toggle").forEach(btn => btn.classList.remove("active"));
  e.target.closest("button").classList.add("active");
  
  const viewType = e.target.closest("button").dataset.view;
  const container = document.getElementById("eventsContainer");
  
  if (viewType === "list") {
    container.classList.add("list-view");
  } else {
    container.classList.remove("list-view");
  }
}

function openEventModal(eventId) {
  const event = getEvents().find(e => e.id === parseInt(eventId));
  if (!event) return;
  
  document.getElementById("modalEventImage").src = event.image;
  document.getElementById("modalEventCategory").textContent = event.category;
  document.getElementById("modalEventCategory").style.background = getCategoryColor(event.category);
  document.getElementById("modalEventTitle").textContent = event.title;
  document.getElementById("modalEventOrganizer").textContent = `Organized by ${event.organizer.name}`;
  
  document.getElementById("modalEventDateTime").textContent = 
    `${new Date(event.date).toLocaleDateString()} at ${event.time}`;
  document.getElementById("modalEventLocation").textContent = event.location;
  document.getElementById("modalEventAttendees").textContent = `${event.currentAttendees} / ${event.maxAttendees}`;
  document.getElementById("modalEventDuration").textContent = `${event.duration} hours`;
  document.getElementById("modalEventDescription").textContent = event.description;
  
  // Attendees
  const attendeesHtml = event.attendees.map(a => `
    <div class="attendee-item">
      <img src="${a.avatar}" alt="${a.name}">
      <p>${a.name}</p>
    </div>
  `).join("");
  document.getElementById("modalEventAttendeesGrid").innerHTML = attendeesHtml;
  
  // Comments
  const commentsHtml = event.comments.map(c => `
    <div class="comment-item">
      <img src="${c.avatar}" alt="${c.author}" class="comment-avatar">
      <div class="comment-body">
        <div class="comment-author">${c.author}</div>
        <div class="comment-time">${formatTime(c.timestamp)}</div>
        <div class="comment-text">${c.text}</div>
      </div>
    </div>
  `).join("");
  document.getElementById("commentsContainer").innerHTML = commentsHtml;
  
  // Buttons
  document.getElementById("favoriteBtn").innerHTML = `
    <i class="fas fa-heart"></i> ${event.userLiked ? "Saved" : "Save"}
  `;
  document.getElementById("favoriteBtn").classList.toggle("btn-secondary", !event.userLiked);
  document.getElementById("favoriteBtn").classList.toggle("btn-primary", event.userLiked);
  document.getElementById("favoriteBtn").onclick = () => {
    event.userLiked = !event.userLiked;
    let events = getEvents();
    let e = events.find(ev => ev.id === event.id);
    e.userLiked = event.userLiked;
    saveEvents(events);
    openEventModal(eventId);
  };
  
  document.getElementById("registerBtn").innerHTML = event.userRegistered ? "Registered ✓" : "Register";
  document.getElementById("registerBtn").disabled = event.userRegistered;
  
  document.getElementById("eventModal").classList.add("active");
}

function closeEventModal() {
  document.getElementById("eventModal").classList.remove("active");
}

function registerEvent(eventId) {
  let events = getEvents();
  const event = events.find(e => e.id === parseInt(eventId));
  
  if (event && !event.userRegistered && event.currentAttendees < event.maxAttendees) {
    event.userRegistered = true;
    event.currentAttendees++;
    
    // Add current user to attendees if not already there
    if (!event.attendees.find(a => a.id === currentUser.id)) {
      event.attendees.push({
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar
      });
    }
    
    saveEvents(events);
    renderEvents();
    showToast("Successfully registered for event!");
    
    if (document.getElementById("eventModal").classList.contains("active")) {
      openEventModal(eventId);
    }
  }
}

function addComment() {
  showToast("Comment feature coming soon!");
}

// Calendar
let currentCalendarDate = new Date();

function renderCalendar() {
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  
  document.getElementById("currentMonth").textContent = 
    currentCalendarDate.toLocaleString("default", { month: "long", year: "numeric" });
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  
  const calendarDays = [];
  
  // Days of week header
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayNames.forEach(day => {
    const cell = document.createElement("div");
    cell.className = "calendar-day header";
    cell.textContent = day;
    calendarDays.push(cell);
  });
  
  // Previous month days
  for (let i = firstDay.getDay() - 1; i >= 0; i--) {
    const cell = document.createElement("div");
    cell.className = "calendar-day other-month";
    cell.textContent = prevLastDay.getDate() - i;
    calendarDays.push(cell);
  }
  
  // Current month days
  const events = getEvents();
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const cell = document.createElement("div");
    cell.className = "calendar-day";
    cell.textContent = day;
    
    const cellDate = new Date(year, month, day);
    const hasEvents = events.some(e => new Date(e.date).toDateString() === cellDate.toDateString());
    
    if (cellDate.toDateString() === new Date().toDateString()) {
      cell.classList.add("today");
    }
    if (hasEvents) {
      cell.classList.add("has-events");
    }
    
    calendarDays.push(cell);
  }
  
  // Next month days
  const totalCells = calendarDays.length - 7;
  const remainingCells = 42 - totalCells;
  for (let day = 1; day <= remainingCells; day++) {
    const cell = document.createElement("div");
    cell.className = "calendar-day other-month";
    cell.textContent = day;
    calendarDays.push(cell);
  }
  
  document.getElementById("calendarGrid").innerHTML = "";
  calendarDays.forEach(cell => {
    document.getElementById("calendarGrid").appendChild(cell);
  });
}

function changeMonth(offset) {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() + offset);
  renderCalendar();
}

// My Events
function renderMyEvents(status) {
  const events = getEvents();
  let filteredEvents = [];
  
  if (status === "registered") {
    filteredEvents = events.filter(e => e.userRegistered);
  } else if (status === "hosted") {
    filteredEvents = events.filter(e => e.organizer.id === currentUser.id);
  } else if (status === "interested") {
    filteredEvents = events.filter(e => e.userLiked);
  }
  
  document.getElementById("myEventsContainer").innerHTML = filteredEvents.length === 0 
    ? `<div class="empty-state" style="grid-column: 1/-1;"><i class="fas fa-calendar-times"></i><h3>No events</h3></div>`
    : filteredEvents.map(e => createEventCard(e)).join("");
  
  document.getElementById("registeredCount").textContent = events.filter(e => e.userRegistered).length;
  document.getElementById("hostedCount").textContent = events.filter(e => e.organizer.id === currentUser.id).length;
  document.getElementById("interestedCount").textContent = events.filter(e => e.userLiked).length;
}

// Community
function renderCommunity() {
  renderDiscussionThreads();
  renderContributorsLeaderboard();
}

function renderDiscussionThreads() {
  const discussionThreads = sampleDiscussions.map(thread => `
    <div class="discussion-item">
      <h4>${thread.title}</h4>
      <p>${thread.content}</p>
      <div class="discussion-meta">
        <span>👤 ${thread.author}</span>
        <span>💬 ${thread.replies} replies</span>
        <span>❤️ ${thread.likes} likes</span>
        <span>${formatTime(thread.timestamp)}</span>
      </div>
    </div>
  `).join("");
  
  document.getElementById("discussionThreads").innerHTML = discussionThreads;
}

function renderContributorsLeaderboard() {
  const leaderboardHtml = sampleContributors.map(contributor => `
    <div class="leaderboard-item">
      <div class="leaderboard-rank ${contributor.rank === 1 ? 'gold' : contributor.rank === 2 ? 'silver' : contributor.rank === 3 ? 'bronze' : ''}">
        ${contributor.rank}
      </div>
      <div class="leaderboard-name">${contributor.name}</div>
      <div class="leaderboard-score">${contributor.score} pts ${contributor.badge}</div>
    </div>
  `).join("");
  
  document.getElementById("contributorsLeaderboard").innerHTML = leaderboardHtml;
  document.getElementById("communityMembers").textContent = "1,250";
  document.getElementById("communityVolunteers").textContent = "425";
  document.getElementById("communityHours").textContent = "3,240+";
  document.getElementById("communityImpact").textContent = "$125K";
}

function startDiscussion() {
  const title = document.getElementById("newDiscussionTitle").value;
  if (title.trim()) {
    showToast("Discussion started! Coming soon in the community board.");
    document.getElementById("newDiscussionTitle").value = "";
  }
}

// Create Event Modal
function openCreateEventModal() {
  document.getElementById("createEventModal").classList.add("active");
}

function closeCreateEventModal() {
  document.getElementById("createEventModal").classList.remove("active");
}

function handleCreateEvent(e) {
  e.preventDefault();
  
  const newEvent = {
    id: getEvents().length + 1,
    title: document.getElementById("createEventTitle").value,
    category: document.getElementById("createEventCategory").value,
    date: new Date(document.getElementById("createEventDate").value),
    time: document.getElementById("createEventTime").value,
    duration: parseFloat(document.getElementById("createEventDuration").value),
    location: document.getElementById("createEventLocation").value,
    maxAttendees: parseInt(document.getElementById("createEventMaxAttendees").value) || 50,
    currentAttendees: 1,
    organizer: { id: currentUser.id, name: currentUser.name, avatar: currentUser.avatar },
    description: document.getElementById("createEventDescription").value,
    image: document.getElementById("createEventImage").value || "https://via.placeholder.com/300x200?text=Event",
    attendees: [{ id: currentUser.id, name: currentUser.name, avatar: currentUser.avatar }],
    comments: [],
    likes: 0,
    userLiked: false,
    userRegistered: true,
    createdAt: Date.now()
  };
  
  let events = getEvents();
  events.push(newEvent);
  saveEvents(events);
  
  document.getElementById("createEventForm").reset();
  closeCreateEventModal();
  showToast("Event created successfully! 🎉");
  renderEvents();
  updateHeroStats();
}

// User Profile
function loadUserProfile() {
  const saved = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  if (saved) {
    currentUser = JSON.parse(saved);
  } else {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(currentUser));
  }
  document.getElementById("currentUserName").textContent = currentUser.name;
}

// Utilities
function getCategoryColor(category) {
  const colors = {
    cleanup: "#0ea5e9",
    workshop: "#06b6d4",
    planting: "#10b981",
    volunteer: "#f59e0b",
    conference: "#8b5cf6",
    social: "#ec4899"
  };
  return colors[category] || "#10b981";
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) return "just now";
  if (diff < 3600000) return Math.floor(diff / 60000) + "m ago";
  if (diff < 86400000) return Math.floor(diff / 3600000) + "h ago";
  if (diff < 604800000) return Math.floor(diff / 86400000) + "d ago";
  
  return date.toLocaleDateString();
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
  toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Make functions globally accessible
window.openCreateEventModal = openCreateEventModal;
window.closeCreateEventModal = closeCreateEventModal;
window.closeEventModal = closeEventModal;
window.registerEvent = registerEvent;
window.addComment = addComment;

// Initialize on load
document.addEventListener("DOMContentLoaded", init);
