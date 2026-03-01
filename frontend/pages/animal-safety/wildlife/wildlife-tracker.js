// Wildlife Sighting Tracker JS
// Handles logging and displaying wildlife sightings

const sightings = [];

function renderSightings() {
    const list = document.getElementById('sighting-list');
    list.innerHTML = '';
    if (sightings.length === 0) {
        list.innerHTML = '<li>No sightings logged yet.</li>';
        return;
    }
    sightings.forEach((s, idx) => {
        const li = document.createElement('li');
        li.className = 'sighting-card';
        li.innerHTML = `
            <strong>${s.species}</strong> <span style="color:#388e3c;">(${s.location})</span><br>
            <span style="color:#888;font-size:0.9em;">${s.date}</span><br>
            ${s.photo ? `<img src="${s.photo}" alt="${s.species}" class="sighting-photo">` : ''}
            ${s.notes ? `<div class="sighting-notes">${s.notes}</div>` : ''}
        `;
        list.appendChild(li);
    });
}

document.getElementById('sighting-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const species = document.getElementById('species').value;
    const location = document.getElementById('location').value;
    const date = new Date(document.getElementById('date').value).toLocaleString();
    const notes = document.getElementById('notes').value;
    let photo = '';
    const fileInput = document.getElementById('photo');
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            photo = evt.target.result;
            sightings.unshift({ species, location, date, photo, notes });
            renderSightings();
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        sightings.unshift({ species, location, date, photo, notes });
        renderSightings();
    }
    this.reset();
});

// Initial render
renderSightings();
