/**
 * Citizen Science - Local Flora & Fauna Database
 * JavaScript functionality for sightings, map, and wiki
 */

// ==========================================
// Global State & Configuration
// ==========================================
const AppState = {
    sightings: [],
    species: [],
    users: [],
    currentStep: 1,
    selectedPhotos: [],
    userLocation: null,
    map: null,
    locationMap: null,
    markers: null,
    filters: {
        category: 'all',
        time: 'all',
        status: 'all'
    }
};

const CategoryColors = {
    plants: '#22c55e',
    birds: '#3b82f6',
    mammals: '#f59e0b',
    insects: '#ec4899',
    reptiles: '#8b5cf6',
    aquatic: '#06b6d4'
};

const CategoryIcons = {
    plants: 'fa-leaf',
    birds: 'fa-dove',
    mammals: 'fa-paw',
    insects: 'fa-bug',
    reptiles: 'fa-dragon',
    aquatic: 'fa-fish'
};

// ==========================================
// Sample Data
// ==========================================
const sampleSightings = [
    {
        id: 1,
        species: 'House Sparrow',
        scientificName: 'Passer domesticus',
        category: 'birds',
        image: 'https://images.unsplash.com/photo-1555169062-013468b47731?w=400',
        location: { lat: 28.6139, lng: 77.2090, name: 'Central Park, Delhi' },
        date: '2024-01-20',
        time: '08:30',
        quantity: 5,
        behavior: 'feeding',
        description: 'Group of sparrows feeding on seeds near the fountain.',
        observer: { name: 'Priya S.', avatar: 'https://i.pravatar.cc/100?img=1' },
        status: 'verified',
        verifiedBy: 'Dr. Ramesh K.',
        likes: 24,
        comments: 8
    },
    {
        id: 2,
        species: 'Indian Peacock',
        scientificName: 'Pavo cristatus',
        category: 'birds',
        image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=400',
        location: { lat: 28.5245, lng: 77.1855, name: 'Qutub Minar Gardens' },
        date: '2024-01-19',
        time: '06:45',
        quantity: 2,
        behavior: 'displaying',
        description: 'Male peacock displaying beautiful feathers.',
        observer: { name: 'Amit K.', avatar: 'https://i.pravatar.cc/100?img=3' },
        status: 'verified',
        likes: 56,
        comments: 15
    },
    {
        id: 3,
        species: 'Neem Tree',
        scientificName: 'Azadirachta indica',
        category: 'plants',
        image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400',
        location: { lat: 28.6304, lng: 77.2177, name: 'Lodhi Garden' },
        date: '2024-01-18',
        time: '10:00',
        quantity: 1,
        behavior: 'blooming',
        description: 'Large neem tree with white flowers blooming.',
        observer: { name: 'Sara M.', avatar: 'https://i.pravatar.cc/100?img=5' },
        status: 'verified',
        likes: 18,
        comments: 4
    },
    {
        id: 4,
        species: 'Rhesus Macaque',
        scientificName: 'Macaca mulatta',
        category: 'mammals',
        image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400',
        location: { lat: 28.6562, lng: 77.2410, name: 'Delhi Ridge Forest' },
        date: '2024-01-17',
        time: '14:20',
        quantity: 8,
        behavior: 'resting',
        description: 'Troop of monkeys resting on trees.',
        observer: { name: 'Raj P.', avatar: 'https://i.pravatar.cc/100?img=8' },
        status: 'pending',
        likes: 32,
        comments: 12
    },
    {
        id: 5,
        species: 'Common Mormon Butterfly',
        scientificName: 'Papilio polytes',
        category: 'insects',
        image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400',
        location: { lat: 28.5933, lng: 77.2507, name: 'Humayun Garden' },
        date: '2024-01-16',
        time: '11:15',
        quantity: 3,
        behavior: 'feeding',
        description: 'Beautiful butterflies on lantana flowers.',
        observer: { name: 'Neha T.', avatar: 'https://i.pravatar.cc/100?img=9' },
        status: 'verified',
        likes: 45,
        comments: 9
    },
    {
        id: 6,
        species: 'Unknown Species',
        scientificName: null,
        category: 'reptiles',
        image: 'https://images.unsplash.com/photo-1567540061621-c2c53d0a0f12?w=400',
        location: { lat: 28.5672, lng: 77.2100, name: 'Sanjay Van' },
        date: '2024-01-15',
        time: '16:30',
        quantity: 1,
        behavior: 'resting',
        description: 'Small lizard on a rock. Need help identifying!',
        observer: { name: 'Vikram S.', avatar: 'https://i.pravatar.cc/100?img=12' },
        status: 'needs-id',
        likes: 8,
        comments: 15
    }
];

const sampleSpecies = [
    {
        id: 1,
        name: 'House Sparrow',
        scientificName: 'Passer domesticus',
        category: 'birds',
        image: 'https://images.unsplash.com/photo-1555169062-013468b47731?w=400',
        description: 'The house sparrow is a bird of the sparrow family found in most parts of the world. It is a small bird that has adapted extremely well to living with humans.',
        diet: 'Seeds, grains, and insects',
        habitat: 'Urban and suburban areas',
        conservation: 'Least Concern',
        sightings: 145,
        contributors: 42
    },
    {
        id: 2,
        name: 'Indian Peacock',
        scientificName: 'Pavo cristatus',
        category: 'birds',
        image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=400',
        description: 'The Indian peafowl is the national bird of India. The male is known for its stunning iridescent blue-green plumage and elaborate tail feathers.',
        diet: 'Seeds, fruits, insects, small reptiles',
        habitat: 'Forests, gardens, parks',
        conservation: 'Least Concern',
        sightings: 89,
        contributors: 28
    },
    {
        id: 3,
        name: 'Neem Tree',
        scientificName: 'Azadirachta indica',
        category: 'plants',
        image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400',
        description: 'Neem is a fast-growing evergreen tree native to India. It is known for its medicinal properties and is widely used in traditional medicine.',
        uses: 'Medicinal, pesticide, cosmetics',
        habitat: 'Tropical and subtropical regions',
        conservation: 'Not Evaluated',
        sightings: 234,
        contributors: 67
    },
    {
        id: 4,
        name: 'Rhesus Macaque',
        scientificName: 'Macaca mulatta',
        category: 'mammals',
        image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400',
        description: 'The rhesus macaque is one of the best-known species of Old World monkeys. They are highly adaptable and live in a variety of habitats.',
        diet: 'Omnivore - fruits, seeds, roots, insects',
        habitat: 'Forests, urban areas, temples',
        conservation: 'Least Concern',
        sightings: 178,
        contributors: 53
    },
    {
        id: 5,
        name: 'Common Mormon',
        scientificName: 'Papilio polytes',
        category: 'insects',
        image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400',
        description: 'A common species of swallowtail butterfly found in Asia. Known for female-limited mimicry of unpalatable butterflies.',
        diet: 'Nectar from various flowers',
        habitat: 'Gardens, forests, urban areas',
        conservation: 'Least Concern',
        sightings: 112,
        contributors: 35
    },
    {
        id: 6,
        name: 'Garden Lizard',
        scientificName: 'Calotes versicolor',
        category: 'reptiles',
        image: 'https://images.unsplash.com/photo-1567540061621-c2c53d0a0f12?w=400',
        description: 'Also known as the Oriental garden lizard or changeable lizard. Males turn bright red and black during breeding season.',
        diet: 'Insects and small invertebrates',
        habitat: 'Gardens, forests, urban areas',
        conservation: 'Least Concern',
        sightings: 98,
        contributors: 29
    }
];

const sampleUsers = [
    { id: 1, name: 'Priya S.', avatar: 'https://i.pravatar.cc/100?img=1', sightings: 145, identifications: 89 },
    { id: 2, name: 'Amit K.', avatar: 'https://i.pravatar.cc/100?img=3', sightings: 132, identifications: 156 },
    { id: 3, name: 'Sara M.', avatar: 'https://i.pravatar.cc/100?img=5', sightings: 98, identifications: 45 },
    { id: 4, name: 'Raj P.', avatar: 'https://i.pravatar.cc/100?img=8', sightings: 87, identifications: 234 },
    { id: 5, name: 'Neha T.', avatar: 'https://i.pravatar.cc/100?img=9', sightings: 76, identifications: 67 }
];

const badges = [
    { icon: '🦅', name: 'Bird Watcher', user: 'Priya S.' },
    { icon: '🌿', name: 'Plant Expert', user: 'Sara M.' },
    { icon: '📸', name: '100 Sightings', user: 'Amit K.' },
    { icon: '🔬', name: 'Top Identifier', user: 'Raj P.' },
    { icon: '⭐', name: 'First Sighting', user: 'Neha T.' }
];

// ==========================================
// Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    AppState.sightings = sampleSightings;
    AppState.species = sampleSpecies;
    AppState.users = sampleUsers;

    initializeMap();
    renderSightings();
    renderWikiEntries();
    renderLeaderboard();
    updateStats();
    updateCategoryCounts();
    setupEventListeners();
    setDefaultDateTime();
    animateCounters();
}

// ==========================================
// Map Functions
// ==========================================
function initializeMap() {
    AppState.map = L.map('biodiversityMap').setView([28.6139, 77.2090], 11);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        maxZoom: 19
    }).addTo(AppState.map);

    AppState.markers = L.markerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        maxClusterRadius: 50
    });

    addSightingMarkers();
    AppState.map.addLayer(AppState.markers);
}

function addSightingMarkers() {
    AppState.markers.clearLayers();

    const filteredSightings = filterSightings(AppState.sightings);

    filteredSightings.forEach(sighting => {
        const color = CategoryColors[sighting.category];
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"><i class="fas ${CategoryIcons[sighting.category]}"></i></div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });

        const marker = L.marker([sighting.location.lat, sighting.location.lng], { icon });

        marker.bindPopup(`
            <div style="min-width: 200px; padding: 8px;">
                <img src="${sighting.image}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;">
                <h4 style="margin: 0 0 4px; color: #10b981;">${sighting.species}</h4>
                <p style="margin: 0 0 8px; font-size: 12px; color: #666;">${sighting.location.name}</p>
                <p style="margin: 0; font-size: 11px; color: #888;">${formatDate(sighting.date)} at ${sighting.time}</p>
                <button onclick="openSightingDetail(${sighting.id})" style="margin-top: 8px; padding: 6px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; width: 100%;">View Details</button>
            </div>
        `);

        AppState.markers.addLayer(marker);
    });
}

function filterSightings(sightings) {
    return sightings.filter(s => {
        if (AppState.filters.category !== 'all' && s.category !== AppState.filters.category) return false;
        if (AppState.filters.status !== 'all' && s.status !== AppState.filters.status) return false;
        if (AppState.filters.time !== 'all') {
            const sDate = new Date(s.date);
            const now = new Date();
            if (AppState.filters.time === 'today' && sDate.toDateString() !== now.toDateString()) return false;
            if (AppState.filters.time === 'week' && (now - sDate) > 7 * 24 * 60 * 60 * 1000) return false;
            if (AppState.filters.time === 'month' && (now - sDate) > 30 * 24 * 60 * 60 * 1000) return false;
            if (AppState.filters.time === 'year' && (now - sDate) > 365 * 24 * 60 * 60 * 1000) return false;
        }
        return true;
    });
}

function applyMapFilters() {
    AppState.filters.category = document.getElementById('categoryFilter').value;
    AppState.filters.time = document.getElementById('timeFilter').value;
    AppState.filters.status = document.getElementById('statusFilter').value;
    addSightingMarkers();
    renderSightings();
}

function centerMapOnUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                AppState.map.setView([latitude, longitude], 14);
                showToast('Map centered on your location', 'success');
            },
            () => showToast('Could not get your location', 'error')
        );
    }
}

// ==========================================
// Sightings Rendering
// ==========================================
function renderSightings() {
    const grid = document.getElementById('sightingsGrid');
    const filtered = filterSightings(AppState.sightings);

    grid.innerHTML = filtered.map(sighting => `
        <div class="sighting-card" onclick="openSightingDetail(${sighting.id})">
            <div class="sighting-image">
                <img src="${sighting.image}" alt="${sighting.species}" loading="lazy">
                <span class="sighting-category-badge">
                    <i class="fas ${CategoryIcons[sighting.category]}"></i>
                    ${capitalizeFirst(sighting.category)}
                </span>
                <span class="verification-badge ${sighting.status}">${getStatusLabel(sighting.status)}</span>
            </div>
            <div class="sighting-info">
                <h3 class="sighting-species">${sighting.species}</h3>
                <div class="sighting-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${sighting.location.name}</span>
                    <span><i class="fas fa-calendar"></i> ${formatDate(sighting.date)}</span>
                    <span><i class="fas fa-user"></i> ${sighting.observer.name}</span>
                </div>
                <div class="sighting-actions">
                    <button class="action-btn" onclick="event.stopPropagation(); likeSighting(${sighting.id})">
                        <i class="fas fa-heart"></i> ${sighting.likes}
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation();">
                        <i class="fas fa-comment"></i> ${sighting.comments}
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation(); shareSighting(${sighting.id})">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getStatusLabel(status) {
    const labels = { 'verified': '✓ Verified', 'pending': 'Pending', 'needs-id': 'Needs ID' };
    return labels[status] || status;
}

// ==========================================
// Wiki Rendering
// ==========================================
function renderWikiEntries(filter = 'all') {
    const grid = document.getElementById('wikiGrid');
    let species = AppState.species;

    if (filter !== 'all') {
        species = species.filter(s => s.name.charAt(0).toUpperCase() === filter);
    }

    grid.innerHTML = species.map(entry => `
        <div class="wiki-card" onclick="openSpeciesDetail(${entry.id})">
            <div class="wiki-image">
                <img src="${entry.image}" alt="${entry.name}" loading="lazy">
            </div>
            <div class="wiki-content">
                <h3 class="wiki-title">${entry.name}</h3>
                <p class="wiki-scientific">${entry.scientificName}</p>
                <p class="wiki-description">${entry.description}</p>
                <div class="wiki-stats">
                    <span class="wiki-stat"><i class="fas fa-binoculars"></i> ${entry.sightings} sightings</span>
                    <span class="wiki-stat"><i class="fas fa-users"></i> ${entry.contributors} contributors</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ==========================================
// Leaderboard
// ==========================================
function renderLeaderboard() {
    const observersEl = document.getElementById('topObservers');
    const identifiersEl = document.getElementById('topIdentifiers');
    const badgesEl = document.getElementById('recentBadges');

    const sortedObservers = [...AppState.users].sort((a, b) => b.sightings - a.sightings);
    const sortedIdentifiers = [...AppState.users].sort((a, b) => b.identifications - a.identifications);

    observersEl.innerHTML = sortedObservers.slice(0, 5).map((user, i) => `
        <div class="leaderboard-item">
            <span class="rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}">${i + 1}</span>
            <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
            <div class="user-info">
                <div class="user-name">${user.name}</div>
                <div class="user-stat">${user.sightings} sightings</div>
            </div>
        </div>
    `).join('');

    identifiersEl.innerHTML = sortedIdentifiers.slice(0, 5).map((user, i) => `
        <div class="leaderboard-item">
            <span class="rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}">${i + 1}</span>
            <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
            <div class="user-info">
                <div class="user-name">${user.name}</div>
                <div class="user-stat">${user.identifications} IDs</div>
            </div>
        </div>
    `).join('');

    badgesEl.innerHTML = badges.map(badge => `
        <div class="badge-item">
            <span class="badge-icon">${badge.icon}</span>
            <div class="badge-info">
                <span class="badge-name">${badge.name}</span>
                <span class="badge-user">${badge.user}</span>
            </div>
        </div>
    `).join('');
}

// ==========================================
// Stats & Counters
// ==========================================
function updateStats() {
    document.getElementById('totalSightings').textContent = AppState.sightings.length;
    document.getElementById('totalSpecies').textContent = AppState.species.length;
    document.getElementById('totalContributors').textContent = AppState.users.length;
    document.getElementById('totalLocations').textContent = new Set(AppState.sightings.map(s => s.location.name)).size;
}

function updateCategoryCounts() {
    const counts = {};
    AppState.sightings.forEach(s => {
        counts[s.category] = (counts[s.category] || 0) + 1;
    });

    Object.keys(counts).forEach(cat => {
        const el = document.getElementById(`${cat}Count`);
        if (el) el.textContent = `${counts[cat]} sightings`;
    });
}

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.textContent);
        let current = 0;
        const increment = Math.ceil(target / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = current;
            }
        }, 30);
    });
}

// ==========================================
// Modal Functions
// ==========================================
function openSubmissionModal() {
    document.getElementById('submissionModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    initLocationMap();
}

function closeSubmissionModal() {
    document.getElementById('submissionModal').classList.remove('active');
    document.body.style.overflow = '';
    resetForm();
}

function openSpeciesDetail(id) {
    const species = AppState.species.find(s => s.id === id);
    if (!species) return;

    const content = document.getElementById('speciesContent');
    content.innerHTML = `
        <div class="species-header">
            <img src="${species.image}" alt="${species.name}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px;">
        </div>
        <div style="padding: 24px;">
            <h2 style="color: white; margin-bottom: 4px;">${species.name}</h2>
            <p style="font-style: italic; color: #6b7280; margin-bottom: 16px;">${species.scientificName}</p>
            <span style="display: inline-block; padding: 6px 16px; background: rgba(16, 185, 129, 0.1); color: #10b981; border-radius: 50px; font-size: 0.875rem; margin-bottom: 20px;">
                <i class="fas ${CategoryIcons[species.category]}"></i> ${capitalizeFirst(species.category)}
            </span>
            <p style="color: #9ca3af; line-height: 1.7; margin-bottom: 24px;">${species.description}</p>
            <div style="display: grid; gap: 16px;">
                ${species.diet ? `<div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 8px;"><strong style="color: #10b981;">Diet:</strong><p style="color: #9ca3af; margin: 8px 0 0;">${species.diet}</p></div>` : ''}
                ${species.habitat ? `<div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 8px;"><strong style="color: #10b981;">Habitat:</strong><p style="color: #9ca3af; margin: 8px 0 0;">${species.habitat}</p></div>` : ''}
                <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 8px;"><strong style="color: #10b981;">Conservation Status:</strong><p style="color: #9ca3af; margin: 8px 0 0;">${species.conservation}</p></div>
            </div>
            <div style="display: flex; gap: 24px; margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
                <div><span style="font-size: 1.5rem; font-weight: 700; color: white;">${species.sightings}</span><span style="color: #6b7280; font-size: 0.875rem; display: block;">Sightings</span></div>
                <div><span style="font-size: 1.5rem; font-weight: 700; color: white;">${species.contributors}</span><span style="color: #6b7280; font-size: 0.875rem; display: block;">Contributors</span></div>
            </div>
        </div>
    `;

    document.getElementById('speciesModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSpeciesModal() {
    document.getElementById('speciesModal').classList.remove('active');
    document.body.style.overflow = '';
}

function openSightingDetail(id) {
    const sighting = AppState.sightings.find(s => s.id === id);
    if (!sighting) return;

    const content = document.getElementById('sightingDetailContent');
    content.innerHTML = `
        <img src="${sighting.image}" alt="${sighting.species}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px 12px 0 0;">
        <div style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
                <div>
                    <h2 style="color: white; margin-bottom: 4px;">${sighting.species}</h2>
                    ${sighting.scientificName ? `<p style="font-style: italic; color: #6b7280;">${sighting.scientificName}</p>` : ''}
                </div>
                <span class="verification-badge ${sighting.status}" style="position: static;">${getStatusLabel(sighting.status)}</span>
            </div>
            <div style="display: grid; gap: 12px; margin-bottom: 24px;">
                <p style="color: #9ca3af;"><i class="fas fa-map-marker-alt" style="color: #10b981; width: 20px;"></i> ${sighting.location.name}</p>
                <p style="color: #9ca3af;"><i class="fas fa-calendar" style="color: #10b981; width: 20px;"></i> ${formatDate(sighting.date)} at ${sighting.time}</p>
                <p style="color: #9ca3af;"><i class="fas fa-hashtag" style="color: #10b981; width: 20px;"></i> Quantity: ${sighting.quantity}</p>
                <p style="color: #9ca3af;"><i class="fas fa-running" style="color: #10b981; width: 20px;"></i> Behavior: ${capitalizeFirst(sighting.behavior)}</p>
            </div>
            <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                <p style="color: #d1d5db;">${sighting.description}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; padding: 16px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                <img src="${sighting.observer.avatar}" alt="${sighting.observer.name}" style="width: 48px; height: 48px; border-radius: 50%;">
                <div>
                    <p style="color: white; font-weight: 500;">${sighting.observer.name}</p>
                    <p style="color: #6b7280; font-size: 0.875rem;">Observer</p>
                </div>
            </div>
            ${sighting.status === 'needs-id' ? `
                <button onclick="openIdentificationModal(${sighting.id})" style="margin-top: 20px; width: 100%; padding: 14px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border: none; border-radius: 8px; color: white; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-microscope"></i> Suggest Identification
                </button>
            ` : ''}
        </div>
    `;

    document.getElementById('sightingDetailModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSightingDetailModal() {
    document.getElementById('sightingDetailModal').classList.remove('active');
    document.body.style.overflow = '';
}

function openIdentificationModal(sightingId) {
    const content = document.getElementById('identificationContent');
    content.innerHTML = `
        <div style="padding: 32px;">
            <h2 style="color: white; margin-bottom: 24px;"><i class="fas fa-microscope" style="color: #6366f1;"></i> Suggest Species</h2>
            <div class="form-group">
                <label>Species Name</label>
                <input type="text" id="suggestedSpecies" placeholder="Enter species name">
            </div>
            <div class="form-group">
                <label>Confidence Level</label>
                <select id="confidence">
                    <option value="high">High - I'm certain</option>
                    <option value="medium">Medium - Fairly sure</option>
                    <option value="low">Low - Best guess</option>
                </select>
            </div>
            <div class="form-group">
                <label>Notes</label>
                <textarea id="idNotes" rows="3" placeholder="Explain your identification..."></textarea>
            </div>
            <button onclick="submitIdentification(${sightingId})" style="width: 100%; padding: 14px; background: linear-gradient(135deg, #10b981, #059669); border: none; border-radius: 8px; color: white; font-weight: 600; cursor: pointer;">
                Submit Suggestion
            </button>
        </div>
    `;

    closeSightingDetailModal();
    document.getElementById('identificationModal').classList.add('active');
}

function closeIdentificationModal() {
    document.getElementById('identificationModal').classList.remove('active');
    document.body.style.overflow = '';
}

function submitIdentification(sightingId) {
    const species = document.getElementById('suggestedSpecies').value;
    if (!species) {
        showToast('Please enter a species name', 'warning');
        return;
    }
    showToast('Identification submitted for review!', 'success');
    closeIdentificationModal();
}

// ==========================================
// Form Functions
// ==========================================
function nextStep() {
    if (!validateCurrentStep()) return;

    if (AppState.currentStep < 4) {
        document.querySelector(`.form-step[data-step="${AppState.currentStep}"]`).classList.remove('active');
        document.querySelector(`.progress-step[data-step="${AppState.currentStep}"]`).classList.add('completed');
        AppState.currentStep++;
        document.querySelector(`.form-step[data-step="${AppState.currentStep}"]`).classList.add('active');
        document.querySelector(`.progress-step[data-step="${AppState.currentStep}"]`).classList.add('active');
        updateFormNavigation();

        if (AppState.currentStep === 4) updateReviewPreview();
    }
}

function prevStep() {
    if (AppState.currentStep > 1) {
        document.querySelector(`.form-step[data-step="${AppState.currentStep}"]`).classList.remove('active');
        document.querySelector(`.progress-step[data-step="${AppState.currentStep}"]`).classList.remove('active');
        AppState.currentStep--;
        document.querySelector(`.form-step[data-step="${AppState.currentStep}"]`).classList.add('active');
        updateFormNavigation();
    }
}

function validateCurrentStep() {
    if (AppState.currentStep === 2) {
        if (!document.getElementById('speciesCategory').value) {
            showToast('Please select a category', 'warning');
            return false;
        }
    }
    if (AppState.currentStep === 3) {
        if (!document.getElementById('latitude').value) {
            showToast('Please select a location', 'warning');
            return false;
        }
    }
    return true;
}

function updateFormNavigation() {
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const submitBtn = document.querySelector('.btn-submit');

    prevBtn.style.display = AppState.currentStep === 1 ? 'none' : 'flex';
    nextBtn.style.display = AppState.currentStep === 4 ? 'none' : 'flex';
    submitBtn.style.display = AppState.currentStep === 4 ? 'flex' : 'none';
}

function updateReviewPreview() {
    const preview = document.getElementById('reviewPreview');
    const category = document.getElementById('speciesCategory').value;
    const species = document.getElementById('speciesName').value || 'Unknown (needs identification)';
    const date = document.getElementById('sightingDate').value;
    const time = document.getElementById('sightingTime').value;
    const location = document.getElementById('locationDisplay').textContent;

    preview.innerHTML = `
        <div style="display: grid; gap: 12px;">
            <div style="display: flex; justify-content: space-between;"><span style="color: #6b7280;">Category:</span><span style="color: white;">${capitalizeFirst(category)}</span></div>
            <div style="display: flex; justify-content: space-between;"><span style="color: #6b7280;">Species:</span><span style="color: white;">${species}</span></div>
            <div style="display: flex; justify-content: space-between;"><span style="color: #6b7280;">Date & Time:</span><span style="color: white;">${formatDate(date)} at ${time}</span></div>
            <div style="display: flex; justify-content: space-between;"><span style="color: #6b7280;">Location:</span><span style="color: white;">${location}</span></div>
            ${AppState.selectedPhotos.length > 0 ? `<div style="margin-top: 12px;"><span style="color: #6b7280;">Photos:</span> ${AppState.selectedPhotos.length} selected</div>` : ''}
        </div>
    `;
}

function resetForm() {
    AppState.currentStep = 1;
    AppState.selectedPhotos = [];
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.progress-step').forEach(s => { s.classList.remove('active', 'completed'); });
    document.querySelector('.form-step[data-step="1"]').classList.add('active');
    document.querySelector('.progress-step[data-step="1"]').classList.add('active');
    document.getElementById('sightingForm').reset();
    document.getElementById('uploadPreview').innerHTML = '';
    document.getElementById('locationDisplay').textContent = 'No location selected';
    setDefaultDateTime();
    updateFormNavigation();
}

function setDefaultDateTime() {
    const now = new Date();
    document.getElementById('sightingDate').value = now.toISOString().split('T')[0];
    document.getElementById('sightingTime').value = now.toTimeString().slice(0, 5);
}

// ==========================================
// Location Functions
// ==========================================
function initLocationMap() {
    if (AppState.locationMap) return;

    setTimeout(() => {
        AppState.locationMap = L.map('locationMap').setView([28.6139, 77.2090], 10);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(AppState.locationMap);

        let marker = null;
        AppState.locationMap.on('click', e => {
            const { lat, lng } = e.latlng;
            if (marker) AppState.locationMap.removeLayer(marker);
            marker = L.marker([lat, lng]).addTo(AppState.locationMap);
            document.getElementById('latitude').value = lat;
            document.getElementById('longitude').value = lng;
            document.getElementById('locationDisplay').textContent = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        });
    }, 300);
}

function getCurrentLocation() {
    if (!navigator.geolocation) {
        showToast('Geolocation not supported', 'error');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        pos => {
            const { latitude, longitude } = pos.coords;
            document.getElementById('latitude').value = latitude;
            document.getElementById('longitude').value = longitude;
            document.getElementById('locationDisplay').textContent = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            if (AppState.locationMap) {
                AppState.locationMap.setView([latitude, longitude], 15);
                L.marker([latitude, longitude]).addTo(AppState.locationMap);
            }
            showToast('Location captured!', 'success');
        },
        () => showToast('Could not get location', 'error')
    );
}

// ==========================================
// Photo Upload Functions
// ==========================================
function setupEventListeners() {
    // Upload area
    const uploadArea = document.getElementById('uploadArea');
    const photoInput = document.getElementById('photoInput');

    uploadArea.addEventListener('click', () => photoInput.click());
    uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.classList.add('dragover'); });
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
    uploadArea.addEventListener('drop', e => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    photoInput.addEventListener('change', e => handleFiles(e.target.files));

    // Search
    document.getElementById('searchSightings').addEventListener('input', e => {
        const query = e.target.value.toLowerCase();
        const filtered = AppState.sightings.filter(s =>
            s.species.toLowerCase().includes(query) || s.location.name.toLowerCase().includes(query)
        );
        renderFilteredSightings(filtered);
    });

    // Wiki alphabet filter
    document.querySelectorAll('.alpha-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderWikiEntries(btn.dataset.letter);
        });
    });

    // Form submission
    document.getElementById('sightingForm').addEventListener('submit', e => {
        e.preventDefault();
        if (!document.getElementById('agreeTerms').checked) {
            showToast('Please confirm your observation', 'warning');
            return;
        }
        submitSighting();
    });

    // Navbar toggle
    document.getElementById('navToggle').addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('active');
    });
}

function handleFiles(files) {
    const preview = document.getElementById('uploadPreview');
    Array.from(files).slice(0, 5).forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = e => {
            AppState.selectedPhotos.push(e.target.result);
            preview.innerHTML += `
                <div class="preview-item">
                    <img src="${e.target.result}" alt="Preview">
                    <button class="preview-remove" onclick="removePhoto(${AppState.selectedPhotos.length - 1})"><i class="fas fa-times"></i></button>
                </div>
            `;
        };
        reader.readAsDataURL(file);
    });
}

function removePhoto(index) {
    AppState.selectedPhotos.splice(index, 1);
    document.getElementById('uploadPreview').innerHTML = AppState.selectedPhotos.map((src, i) => `
        <div class="preview-item">
            <img src="${src}" alt="Preview">
            <button class="preview-remove" onclick="removePhoto(${i})"><i class="fas fa-times"></i></button>
        </div>
    `).join('');
}

// ==========================================
// Submission
// ==========================================
function submitSighting() {
    const newSighting = {
        id: AppState.sightings.length + 1,
        species: document.getElementById('speciesName').value || 'Unknown Species',
        category: document.getElementById('speciesCategory').value,
        image: AppState.selectedPhotos[0] || 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
        location: {
            lat: parseFloat(document.getElementById('latitude').value),
            lng: parseFloat(document.getElementById('longitude').value),
            name: document.getElementById('locationDisplay').textContent
        },
        date: document.getElementById('sightingDate').value,
        time: document.getElementById('sightingTime').value,
        quantity: parseInt(document.getElementById('quantity').value) || 1,
        behavior: document.getElementById('behavior').value,
        description: document.getElementById('description').value,
        observer: { name: 'You', avatar: 'https://i.pravatar.cc/100?img=7' },
        status: document.getElementById('speciesName').value ? 'pending' : 'needs-id',
        likes: 0,
        comments: 0
    };

    AppState.sightings.unshift(newSighting);
    renderSightings();
    addSightingMarkers();
    updateStats();
    updateCategoryCounts();
    closeSubmissionModal();
    showToast('Sighting submitted successfully!', 'success');
}

// ==========================================
// Utility Functions
// ==========================================
function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function capitalizeFirst(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function filterByCategory(category) {
    document.getElementById('categoryFilter').value = category;
    applyMapFilters();
    scrollToSection('sightings');
}

function toggleView(view) {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.view-btn[data-view="${view}"]`).classList.add('active');
    const grid = document.getElementById('sightingsGrid');
    grid.style.gridTemplateColumns = view === 'list' ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))';
}

function sortSightings() {
    const value = document.getElementById('sortSightings').value;
    if (value === 'newest') AppState.sightings.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (value === 'oldest') AppState.sightings.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (value === 'popular') AppState.sightings.sort((a, b) => b.likes - a.likes);
    renderSightings();
}

function likeSighting(id) {
    const sighting = AppState.sightings.find(s => s.id === id);
    if (sighting) {
        sighting.likes++;
        renderSightings();
        showToast('Liked!', 'success');
    }
}

function shareSighting(id) {
    showToast('Link copied to clipboard!', 'success');
}

function loadMoreSightings() {
    showToast('All sightings loaded', 'success');
}

function renderFilteredSightings(sightings) {
    const grid = document.getElementById('sightingsGrid');
    if (sightings.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #6b7280; grid-column: 1/-1;">No sightings found</p>';
        return;
    }
    AppState.sightings = sightings;
    renderSightings();
}
