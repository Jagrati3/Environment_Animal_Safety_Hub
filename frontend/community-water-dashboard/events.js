// Local Events & Workshops Logic
// Demo: In-memory event data, RSVP, and badge system

const DEMO_EVENTS = [
  {
    id: 1,
    title: 'Rainwater Harvesting Workshop',
    desc: 'Learn how to set up a rainwater harvesting system at home. Includes hands-on demo and Q&A.',
    date: '2026-02-20',
    time: '15:00',
    location: 'Community Center Hall',
    rsvps: [ { name: 'Green Family' }, { name: 'Blue Community' } ]
  },
  {
    id: 2,
    title: 'Waterwise Gardening Meetup',
    desc: 'Tips and tricks for creating a beautiful, drought-resistant garden. Free starter kits for attendees.',
    date: '2026-02-25',
    time: '10:00',
    location: 'Botanical Gardens',
    rsvps: [ { name: 'Riverdale' } ]
  },
  {
    id: 3,
    title: 'Fix-a-Leak Family Day',
    desc: 'Bring the whole family and learn how to find and fix leaks in your home. Prizes for kids!',
    date: '2026-03-02',
    time: '13:30',
    location: 'Library Auditorium',
    rsvps: []
  }
];

let events = JSON.parse(localStorage.getItem('eventsData') || 'null') || DEMO_EVENTS;
let myName = localStorage.getItem('eventUserName') || 'You';
let myRSVPs = JSON.parse(localStorage.getItem('eventRSVPs') || '[]');

function saveEvents() {
  localStorage.setItem('eventsData', JSON.stringify(events));
}
function saveRSVPs() {
  localStorage.setItem('eventRSVPs', JSON.stringify(myRSVPs));
}

// --- Render Events List ---
function renderEventsList() {
  document.getElementById('events-section').style.display = '';
  document.getElementById('event-details-section').style.display = 'none';
  const list = document.getElementById('events-list');
  list.innerHTML = '';
  events.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <div class="event-title">${ev.title}</div>
      <div class="event-desc">${ev.desc}</div>
      <div class="event-meta">Date: <b>${ev.date}</b> &nbsp;|&nbsp; Time: ${ev.time} &nbsp;|&nbsp; Location: ${ev.location}</div>
      <div class="event-meta">RSVPs: ${ev.rsvps.length}</div>
    `;
    card.onclick = () => showEventDetails(ev.id);
    list.appendChild(card);
  });
}

// --- Show Event Details ---
function showEventDetails(id) {
  const ev = events.find(e => e.id === id);
  if (!ev) return;
  document.getElementById('events-section').style.display = 'none';
  document.getElementById('event-details-section').style.display = '';
  const details = document.getElementById('event-details');
  const isRSVPed = ev.rsvps.some(r => r.name === myName);
  details.innerHTML = `
    <h3>${ev.title}</h3>
    <div>${ev.desc}</div>
    <div class="event-meta">Date: <b>${ev.date}</b> &nbsp;|&nbsp; Time: ${ev.time} &nbsp;|&nbsp; Location: ${ev.location}</div>
    <div class="event-meta">RSVPs: ${ev.rsvps.length}</div>
    <form class="rsvp-form">
      <input type="text" placeholder="Your Name" value="${myName}" required ${isRSVPed ? 'readonly' : ''}>
      <button type="submit" ${isRSVPed ? 'disabled' : ''}>${isRSVPed ? 'RSVPed' : 'RSVP'}</button>
    </form>
    <div style="margin-top:18px;">
      <b>Attendees:</b>
      <ul style="margin:8px 0 0 0; padding-left:18px;">
        ${ev.rsvps.map(r => `<li>${r.name}</li>`).join('')}
      </ul>
    </div>
  `;
  // RSVP form
  details.querySelector('.rsvp-form').onsubmit = function(e) {
    e.preventDefault();
    if (isRSVPed) return;
    const name = this.querySelector('input').value.trim() || 'You';
    if (!ev.rsvps.some(r => r.name === name)) {
      ev.rsvps.push({ name });
      if (!myRSVPs.includes(ev.id)) myRSVPs.push(ev.id);
      myName = name;
      localStorage.setItem('eventUserName', myName);
      saveEvents();
      saveRSVPs();
      renderRSVPs();
      showEventDetails(ev.id);
      alert('RSVP successful!');
    }
  };
}

document.getElementById('back-to-events').onclick = renderEventsList;

document.getElementById('create-event-btn').onclick = function() {
  document.getElementById('event-modal').style.display = '';
};
document.getElementById('close-event-modal').onclick = function() {
  document.getElementById('event-modal').style.display = 'none';
};
document.getElementById('event-form').onsubmit = function(e) {
  e.preventDefault();
  const title = document.getElementById('event-title').value.trim();
  const desc = document.getElementById('event-desc').value.trim();
  const date = document.getElementById('event-date').value;
  const time = document.getElementById('event-time').value;
  const location = document.getElementById('event-location').value.trim();
  if (!title || !desc || !date || !time || !location) return;
  const newEvent = {
    id: Date.now(),
    title,
    desc,
    date,
    time,
    location,
    rsvps: []
  };
  events.push(newEvent);
  saveEvents();
  document.getElementById('event-modal').style.display = 'none';
  renderEventsList();
  this.reset();
};

// --- Render My RSVPs ---
function renderRSVPs() {
  const list = document.getElementById('rsvps-list');
  list.innerHTML = '';
  const myEvents = events.filter(ev => myRSVPs.includes(ev.id));
  if (myEvents.length === 0) {
    list.innerHTML = '<div>No RSVPs yet. RSVP to an event to see it here!</div>';
    return;
  }
  myEvents.forEach(ev => {
    const div = document.createElement('div');
    div.className = 'rsvp-badge';
    div.innerHTML = `<span class="emoji">🎟️</span> ${ev.title} <span style="font-size:0.9em; color:#888;">(${ev.date})</span>`;
    list.appendChild(div);
  });
}

// --- Initial Render ---
document.addEventListener('DOMContentLoaded', function() {
  renderEventsList();
  renderRSVPs();
});
// --- End of events.js ---
