// Demo green projects
const demoProjects = [
  {
    id: 1,
    title: "Community Garden Revival",
    desc: "Restoring a local garden for food and pollinators.",
    location: "Maple Park",
    lat: 40.7128,
    lng: -74.006,
    progress: 60,
    photo: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    updates: [
      {text: "Planted new veggies!", photo: ""},
      {text: "Added pollinator flowers.", photo: ""}
    ],
    joined: false
  },
  {
    id: 2,
    title: "Neighborhood Cleanup Drive",
    desc: "Organizing a monthly litter cleanup in the area.",
    location: "Elm Street",
    lat: 40.7138,
    lng: -74.002,
    progress: 35,
    photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    updates: [
      {text: "First cleanup complete!", photo: ""}
    ],
    joined: false
  },
  {
    id: 3,
    title: "Tree Planting Initiative",
    desc: "Planting native trees in the community park.",
    location: "Oakwood Park",
    lat: 40.7158,
    lng: -74.008,
    progress: 80,
    photo: "https://images.unsplash.com/photo-1465101046530-73398c7f3b43?auto=format&fit=crop&w=400&q=80",
    updates: [
      {text: "20 trees planted!", photo: ""}
    ],
    joined: false
  }
];

let projects = [...demoProjects];
let currentUpdateProjectId = null;

function renderProjectsMap() {
  const map = L.map('projectsMap').setView([40.7138, -74.006], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  projects.forEach(project => {
    const marker = L.marker([project.lat, project.lng]).addTo(map);
    marker.bindPopup(`<b>${project.title}</b><br>${project.location}`);
  });
}

function renderProjectList() {
  const list = document.getElementById('projectList');
  list.innerHTML = '';
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="card-title">${project.title}</div>
      <div class="card-desc">${project.desc}</div>
      <div class="card-location"><i class="fa fa-map-marker-alt"></i> ${project.location}</div>
      <img src="${project.photo}" class="card-photo" alt="Project photo">
      <div class="card-progress">
        <span style="color:#43cea2;font-weight:600;">Progress:</span>
        <progress value="${project.progress}" max="100" style="vertical-align:middle;"></progress>
        <span style="font-size:0.95rem;">${project.progress}%</span>
      </div>
      <div class="card-actions">
        <button class="join-btn" onclick="joinProject(${project.id})">${project.joined ? 'Joined' : 'Join'}</button>
        <button class="update-btn" onclick="openUpdateModal(${project.id})"><i class="fa fa-edit"></i> Post Update</button>
      </div>
      <div class="card-updates">
        <strong>Updates:</strong>
        <ul>
          ${project.updates.map(u => `<li>${u.text}${u.photo ? `<br><img src='${u.photo}' style='max-width:80px;border-radius:8px;margin-top:4px;'>` : ''}</li>`).join('')}
        </ul>
      </div>
    `;
    list.appendChild(card);
  });
}

function joinProject(id) {
  projects = projects.map(p => p.id === id ? {...p, joined: true} : p);
  renderProjectList();
}

function openProjectModal() {
  document.getElementById('projectModal').style.display = 'block';
}
function closeProjectModal() {
  document.getElementById('projectModal').style.display = 'none';
}

document.getElementById('newProjectForm').onsubmit = function(e) {
  e.preventDefault();
  const title = document.getElementById('projectTitle').value;
  const desc = document.getElementById('projectDesc').value;
  const location = document.getElementById('projectLocation').value;
  const photoInput = document.getElementById('projectPhoto');
  let photo = '';
  if (photoInput.files && photoInput.files[0]) {
    photo = URL.createObjectURL(photoInput.files[0]);
  }
  const lat = 40.7138 + Math.random() * 0.01;
  const lng = -74.006 + Math.random() * 0.01;
  projects.push({
    id: Date.now(),
    title,
    desc,
    location,
    lat,
    lng,
    progress: 0,
    photo,
    updates: [],
    joined: false
  });
  closeProjectModal();
  renderProjectsMap();
  renderProjectList();
  this.reset();
};

function openUpdateModal(id) {
  currentUpdateProjectId = id;
  document.getElementById('updateModal').style.display = 'block';
}
function closeUpdateModal() {
  document.getElementById('updateModal').style.display = 'none';
}

document.getElementById('updateForm').onsubmit = function(e) {
  e.preventDefault();
  const text = document.getElementById('updateText').value;
  const photoInput = document.getElementById('updatePhoto');
  let photo = '';
  if (photoInput.files && photoInput.files[0]) {
    photo = URL.createObjectURL(photoInput.files[0]);
  }
  projects = projects.map(p => {
    if (p.id === currentUpdateProjectId) {
      return {...p, updates: [...p.updates, {text, photo}]};
    }
    return p;
  });
  closeUpdateModal();
  renderProjectList();
  this.reset();
};

// Initial render
renderProjectsMap();
renderProjectList();