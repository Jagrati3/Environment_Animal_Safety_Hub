// Eco-Friendly Business Directory JS
const ecoBizData = [
  {
    name: "Green Roots Zero-Waste Store",
    type: "Zero-Waste Store",
    lat: 40.7138,
    lng: -74.0065,
    address: "123 Greenway Ave",
    description: "Bulk groceries, eco products, and refill station.",
    reviews: [
      { name: "Ayaan", rating: 5, text: "Love the refill options!" },
      { name: "Sara", rating: 4, text: "Great selection, friendly staff." }
    ]
  },
  {
    name: "Earth's Bounty Organic Market",
    type: "Organic Market",
    lat: 40.7152,
    lng: -74.0021,
    address: "456 Orchard St",
    description: "Fresh organic produce and local goods.",
    reviews: [
      { name: "Liam", rating: 5, text: "Best organic veggies in town!" }
    ]
  },
  {
    name: "EcoBrew Green Cafe",
    type: "Green Cafe",
    lat: 40.7181,
    lng: -74.0123,
    address: "789 River Rd",
    description: "Plant-based menu, compostable packaging.",
    reviews: [
      { name: "Maya", rating: 4, text: "Tasty food, love the eco vibe." }
    ]
  }
];

let filteredBiz = ecoBizData;
let selectedBizIdx = null;

const map = L.map('ecoBizMap').setView([40.715, -74.006], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
let markers = [];

function renderBizList() {
  const list = document.getElementById('ecoBizList');
  list.innerHTML = '';
  if (filteredBiz.length === 0) {
    list.innerHTML = '<li>No businesses found.</li>';
    return;
  }
  filteredBiz.forEach((biz, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${biz.name}</strong> <span style="font-size:0.95em;">(${biz.type})</span><br>
      <span><i class="fa fa-map-marker-alt"></i> ${biz.address}</span><br>
      <span>${biz.description}</span>
      <div class="eco-biz-rating">${renderStars(avgRating(biz.reviews))} <span style='color:#43cea2;font-size:0.95em;'>(${biz.reviews.length} reviews)</span></div>
      <div class="eco-biz-actions">
        <button onclick="showBizProfile(${idx})"><i class='fa fa-info-circle'></i> Profile</button>
        <button onclick="openReviewModal(${idx})"><i class='fa fa-star'></i> Review</button>
      </div>
    `;
    li.onclick = () => {
      map.setView([biz.lat, biz.lng], 15);
      markers[idx].openPopup();
    };
    list.appendChild(li);
  });
}

function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fa${i <= rating ? 's' : 'r'} fa-star"></i>`;
  }
  return stars;
}

function avgRating(reviews) {
  if (!reviews.length) return 0;
  return Math.round(reviews.reduce((a, r) => a + r.rating, 0) / reviews.length);
}

function renderMapMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  filteredBiz.forEach((biz, idx) => {
    const marker = L.marker([biz.lat, biz.lng]).addTo(map);
    marker.bindPopup(`<b>${biz.name}</b><br>${biz.type}<br>${biz.address}`);
    marker.on('click', () => showBizProfile(idx));
    markers.push(marker);
  });
}

function filterBiz() {
  const search = document.getElementById('ecoBizSearch').value.toLowerCase();
  const type = document.getElementById('ecoBizTypeFilter').value;
  filteredBiz = ecoBizData.filter(biz =>
    (biz.name.toLowerCase().includes(search) || biz.description.toLowerCase().includes(search) || biz.address.toLowerCase().includes(search)) &&
    (type === '' || biz.type === type)
  );
  renderBizList();
  renderMapMarkers();
}

document.getElementById('ecoBizSearch').oninput = filterBiz;
document.getElementById('ecoBizTypeFilter').onchange = filterBiz;

window.showBizProfile = function(idx) {
  selectedBizIdx = idx;
  const biz = filteredBiz[idx];
  let html = `<h2>${biz.name}</h2>
    <div style='color:#185a9d;font-weight:500;'>${biz.type}</div>
    <div><i class='fa fa-map-marker-alt'></i> ${biz.address}</div>
    <div style='margin:0.7em 0;'>${biz.description}</div>
    <div class='eco-biz-rating'>${renderStars(avgRating(biz.reviews))} <span style='color:#43cea2;font-size:0.95em;'>(${biz.reviews.length} reviews)</span></div>
    <h3 style='margin-top:1.2em;'>Reviews</h3>`;
  if (biz.reviews.length === 0) html += '<div>No reviews yet.</div>';
  else biz.reviews.forEach(r => {
    html += `<div style='margin-bottom:0.7em;'><b>${r.name}</b>: ${renderStars(r.rating)}<br>${r.text}</div>`;
  });
  html += `<button class='eco-biz-submit-btn' style='margin-top:1em;' onclick='openReviewModal(${idx})'><i class='fa fa-star'></i> Add Review</button>`;
  document.getElementById('ecoBizProfileContent').innerHTML = html;
  document.getElementById('ecoBizProfileModal').style.display = 'flex';
};
document.getElementById('closeBizProfileModal').onclick = () => {
  document.getElementById('ecoBizProfileModal').style.display = 'none';
};

window.openReviewModal = function(idx) {
  selectedBizIdx = idx;
  document.getElementById('ecoBizReviewModal').style.display = 'flex';
};
document.getElementById('closeBizReviewModal').onclick = () => {
  document.getElementById('ecoBizReviewModal').style.display = 'none';
};
document.getElementById('ecoBizReviewForm').onsubmit = function(e) {
  e.preventDefault();
  const name = this.reviewerName.value;
  const rating = parseInt(this.reviewRating.value);
  const text = this.reviewText.value;
  if (selectedBizIdx !== null) {
    filteredBiz[selectedBizIdx].reviews.push({ name, rating, text });
    renderBizList();
    renderMapMarkers();
    document.getElementById('ecoBizReviewModal').style.display = 'none';
    this.reset();
    alert('Review submitted!');
  }
};

// Modal close on outside click
window.onclick = function(event) {
  if (event.target === document.getElementById('ecoBizProfileModal')) document.getElementById('ecoBizProfileModal').style.display = 'none';
  if (event.target === document.getElementById('ecoBizReviewModal')) document.getElementById('ecoBizReviewModal').style.display = 'none';
};

renderBizList();
renderMapMarkers();
