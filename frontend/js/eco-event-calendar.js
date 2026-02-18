// Community Eco-Event Calendar JS
// Simple in-memory event store for demo
let events = [
  {
    title: "River Cleanup Drive",
    date: "2026-02-10",
    time: "09:00",
    location: "Greenbank Park",
    description: "Join us to clean the riverbank and help local wildlife!",
    attendees: []
  },
  {
    title: "Plant Swap & Workshop",
    date: "2026-02-15",
    time: "14:00",
    location: "Eco Community Center",
    description: "Bring a plant, take a plant! Plus, learn about native species.",
    attendees: []
  }
];

const calendarEl = document.getElementById('eco-calendar');
const eventListEl = document.getElementById('eco-event-list');
const eventModal = document.getElementById('eco-event-modal');
const openEventModalBtn = document.getElementById('openEventModal');
const closeEventModalBtn = document.getElementById('closeEventModal');
const eventForm = document.getElementById('eco-event-form');
const rsvpModal = document.getElementById('eco-rsvp-modal');
const closeRSVPModalBtn = document.getElementById('closeRSVPModal');
const rsvpForm = document.getElementById('eco-rsvp-form');
let rsvpEventIndex = null;

function renderCalendar() {
  // Simple calendar: show current month, highlight event days
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let html = `<div class="eco-calendar-bar"><b>${now.toLocaleString('default', { month: 'long' })} ${year}</b></div>`;
  html += '<div class="eco-calendar-grid">';
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  days.forEach(d => html += `<div class="eco-calendar-day eco-calendar-day-label">${d}</div>`);
  for (let i = 0; i < firstDay.getDay(); i++) html += '<div></div>';
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hasEvent = events.some(e => e.date === dateStr);
    html += `<div class="eco-calendar-day${hasEvent ? ' eco-calendar-has-event' : ''}" data-date="${dateStr}">${d}</div>`;
  }
  html += '</div>';
  calendarEl.innerHTML = html;
  document.querySelectorAll('.eco-calendar-has-event').forEach(el => {
    el.onclick = () => showEventsOnDate(el.getAttribute('data-date'));
    el.title = 'View events on this day';
  });
}

function renderEventList() {
  eventListEl.innerHTML = '';
  if (events.length === 0) {
    eventListEl.innerHTML = '<li>No upcoming events.</li>';
    return;
  }
  events.sort((a,b) => a.date.localeCompare(b.date));
  events.forEach((e, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${e.title}</strong> <span style="font-size:0.95em;">(${e.date} ${e.time})</span><br>
      <span><i class="fa fa-map-marker-alt"></i> ${e.location}</span><br>
      <span>${e.description}</span>
      <div class="eco-event-actions">
        <button onclick="openRSVP(${idx})"><i class='fa fa-user-plus'></i> RSVP</button>
        <button onclick="setReminder('${e.title}','${e.date}','${e.time}')"><i class='fa fa-bell'></i> Reminder</button>
      </div>
      <div style="font-size:0.9em;color:#43cea2;">${e.attendees.length} attending</div>
    `;
    eventListEl.appendChild(li);
  });
}

function showEventsOnDate(dateStr) {
  const dayEvents = events.filter(e => e.date === dateStr);
  if (dayEvents.length === 0) {
    alert('No events on this day.');
    return;
  }
  let msg = `Events on ${dateStr}:\n`;
  dayEvents.forEach(e => {
    msg += `- ${e.title} at ${e.time} (${e.location})\n`;
  });
  alert(msg);
}

openEventModalBtn.onclick = () => { eventModal.style.display = 'flex'; };
closeEventModalBtn.onclick = () => { eventModal.style.display = 'none'; };
eventForm.onsubmit = function(e) {
  e.preventDefault();
  const newEvent = {
    title: this.eventTitle.value,
    date: this.eventDate.value,
    time: this.eventTime.value,
    location: this.eventLocation.value,
    description: this.eventDescription.value,
    attendees: []
  };
  events.push(newEvent);
  renderCalendar();
  renderEventList();
  eventModal.style.display = 'none';
  this.reset();
};

window.openRSVP = function(idx) {
  rsvpEventIndex = idx;
  rsvpModal.style.display = 'flex';
};
closeRSVPModalBtn.onclick = () => { rsvpModal.style.display = 'none'; };
rsvpForm.onsubmit = function(e) {
  e.preventDefault();
  if (rsvpEventIndex !== null) {
    const name = this.rsvpName.value;
    const email = this.rsvpEmail.value;
    events[rsvpEventIndex].attendees.push({ name, email });
    renderEventList();
    rsvpModal.style.display = 'none';
    this.reset();
    alert('RSVP successful!');
  }
};

window.setReminder = function(title, date, time) {
  alert(`Reminder set for ${title} on ${date} at ${time}! (Demo only)`);
};

// Calendar grid styles
const style = document.createElement('style');
style.innerHTML = `
.eco-calendar-bar { text-align:center; font-size:1.3rem; margin-bottom:0.7rem; color:#185a9d; font-family:'Montserrat',sans-serif; }
.eco-calendar-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:0.3rem; }
.eco-calendar-day { background:#e0ffe6; border-radius:8px; padding:0.7rem 0; text-align:center; font-size:1.1rem; color:#185a9d; cursor:pointer; transition:background 0.2s; }
.eco-calendar-day-label { background:none; color:#185a9d; font-weight:600; cursor:default; }
.eco-calendar-has-event { background:linear-gradient(90deg,#43cea2 0%,#b3e6ff 100%); color:#fff; font-weight:700; box-shadow:0 2px 8px rgba(67,206,162,0.10); }
.eco-calendar-has-event:hover { background:linear-gradient(90deg,#185a9d 0%,#43cea2 100%); }
`;
document.head.appendChild(style);

// Modal close on outside click
window.onclick = function(event) {
  if (event.target === eventModal) eventModal.style.display = 'none';
  if (event.target === rsvpModal) rsvpModal.style.display = 'none';
};

renderCalendar();
renderEventList();
