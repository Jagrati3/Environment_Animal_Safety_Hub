// Eco-Achievement Badges JS
const userStats = {
  events: 3,
  sightings: 2,
  reviews: 1
};

const badges = [
  {
    title: "Event Attendee",
    desc: "Participate in your first eco event.",
    icon: "fa-calendar-check",
    unlocked: userStats.events >= 1
  },
  {
    title: "Wildlife Watcher",
    desc: "Log your first wildlife sighting.",
    icon: "fa-binoculars",
    unlocked: userStats.sightings >= 1
  },
  {
    title: "Green Reviewer",
    desc: "Review an eco-friendly business.",
    icon: "fa-star",
    unlocked: userStats.reviews >= 1
  },
  {
    title: "Eco Champion",
    desc: "Attend 5 events.",
    icon: "fa-trophy",
    unlocked: userStats.events >= 5
  },
  {
    title: "Biodiversity Hero",
    desc: "Log 10 wildlife sightings.",
    icon: "fa-leaf",
    unlocked: userStats.sightings >= 10
  },
  {
    title: "Community Leader",
    desc: "Write 10 reviews.",
    icon: "fa-users",
    unlocked: userStats.reviews >= 10
  }
];

document.getElementById('badgeEventsCount').textContent = userStats.events;
document.getElementById('badgeSightingsCount').textContent = userStats.sightings;
document.getElementById('badgeReviewsCount').textContent = userStats.reviews;

function renderBadges() {
  const unlocked = badges.filter(b => b.unlocked);
  const locked = badges.filter(b => !b.unlocked);
  const unlockedList = document.getElementById('badgesList');
  const lockedList = document.getElementById('lockedBadgesList');
  unlockedList.innerHTML = '';
  lockedList.innerHTML = '';
  unlocked.forEach(b => {
    unlockedList.innerHTML += `
      <div class="badge-card">
        <div class="badge-icon"><i class="fa-solid ${b.icon}"></i></div>
        <div class="badge-title">${b.title}</div>
        <div class="badge-desc">${b.desc}</div>
      </div>
    `;
  });
  locked.forEach(b => {
    lockedList.innerHTML += `
      <div class="badge-card">
        <div class="badge-icon"><i class="fa-solid ${b.icon}"></i></div>
        <div class="badge-title">${b.title}</div>
        <div class="badge-desc">${b.desc}</div>
      </div>
    `;
  });
}

renderBadges();
