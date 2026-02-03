// Storage keys
const STORAGE_KEY = "wildlifeSightings";
const SPECIES_DB_KEY = "speciesDatabase";

// DOM Elements
const elements = {
  sightingForm: document.getElementById("sightingForm"),
  observerName: document.getElementById("observerName"),
  speciesName: document.getElementById("speciesName"),
  speciesCategory: document.getElementById("speciesCategory"),
  sightingDate: document.getElementById("sightingDate"),
  quantity: document.getElementById("quantity"),
  locationName: document.getElementById("locationName"),
  detectLocationBtn: document.getElementById("detectLocationBtn"),
  coordinatesDisplay: document.getElementById("coordinatesDisplay"),
  behaviorNotes: document.getElementById("behaviorNotes"),
  habitat: document.getElementById("habitat"),
  photoUpload: document.getElementById("photoUpload"),
  photoPreview: document.getElementById("photoPreview"),
  postsGrid: document.getElementById("postsGrid"),
  tabBtns: document.querySelectorAll(".tab-btn"),
  tabContents: document.querySelectorAll(".tab-content"),
  galleryGrid: document.getElementById("galleryGrid"),
  speciesGrid: document.getElementById("speciesGrid"),
  feedContainer: document.getElementById("feedContainer"),
  totalSightings: document.getElementById("totalSightings"),
  uniqueSpecies: document.getElementById("uniqueSpecies"),
  endangeredAlerts: document.getElementById("endangeredAlerts"),
  endangeredSpeciesList: document.getElementById("endangeredSpeciesList"),
  speciesSearch: document.getElementById("speciesSearch"),
  galleryCategoryFilter: document.getElementById("galleryCategoryFilter"),
  gallerySortFilter: document.getElementById("gallerySortFilter"),
  mapCategoryFilter: document.getElementById("mapCategoryFilter"),
  mapTimeFilter: document.getElementById("mapTimeFilter"),
  clearMapFilters: document.getElementById("clearMapFilters"),
  sightingModal: document.getElementById("sightingModal"),
  closeModal: document.getElementById("closeModal"),
  modalBody: document.getElementById("modalBody")
};

// Species Database
const speciesDatabase = [
  {
    id: 1,
    name: "Red-tailed Hawk",
    scientificName: "Buteo jamaicensis",
    category: "Birds",
    icon: "🦅",
    description: "Large bird of prey with distinctive reddish-brown tail. Common in open areas.",
    habitat: "Grassland, Forest",
    status: "Least Concern",
    endangered: false
  },
  {
    id: 2,
    name: "White-tailed Deer",
    scientificName: "Odocoileus virginianus",
    category: "Mammals",
    icon: "🦌",
    description: "Medium-sized deer native to North America with characteristic white underside of tail.",
    habitat: "Forest, Grassland",
    status: "Least Concern",
    endangered: false
  },
  {
    id: 3,
    name: "Monarch Butterfly",
    scientificName: "Danaus plexippus",
    category: "Insects",
    icon: "🦋",
    description: "Iconic orange and black butterfly known for long-distance migrations.",
    habitat: "Grassland, Urban",
    status: "Near Threatened",
    endangered: true
  },
  {
    id: 4,
    name: "Eastern Box Turtle",
    scientificName: "Terrapene carolina",
    category: "Reptiles",
    icon: "🐢",
    description: "Small terrestrial turtle with distinctive hinged shell allowing complete closure.",
    habitat: "Forest, Wetland",
    status: "Vulnerable",
    endangered: true
  },
  {
    id: 5,
    name: "Blue Jay",
    scientificName: "Cyanocitta cristata",
    category: "Birds",
    icon: "🐦",
    description: "Vibrant blue bird with distinctive crest and loud calls. Intelligent and social.",
    habitat: "Forest, Urban",
    status: "Least Concern",
    endangered: false
  },
  {
    id: 6,
    name: "Gray Wolf",
    scientificName: "Canis lupus",
    category: "Mammals",
    icon: "🐺",
    description: "Large carnivore that lives and hunts in packs. Key species in ecosystem balance.",
    habitat: "Forest, Mountain",
    status: "Endangered",
    endangered: true
  },
  {
    id: 7,
    name: "American Bullfrog",
    scientificName: "Lithobates catesbeianus",
    category: "Amphibians",
    icon: "🐸",
    description: "Large aquatic frog with distinctive deep call. Found near permanent water bodies.",
    habitat: "Wetland",
    status: "Least Concern",
    endangered: false
  },
  {
    id: 8,
    name: "Bald Eagle",
    scientificName: "Haliaeetus leucocephalus",
    category: "Birds",
    icon: "🦅",
    description: "National bird of USA. Large raptor with distinctive white head and tail.",
    habitat: "Forest, Marine",
    status: "Least Concern",
    endangered: false
  },
  {
    id: 9,
    name: "Sea Turtle",
    scientificName: "Cheloniidae",
    category: "Marine Life",
    icon: "🐢",
    description: "Marine reptile with streamlined shell. Several species are endangered.",
    habitat: "Marine",
    status: "Endangered",
    endangered: true
  },
  {
    id: 10,
    name: "Ruby-throated Hummingbird",
    scientificName: "Archilochus colubris",
    category: "Birds",
    icon: "🐦",
    description: "Tiny bird with iridescent green back and ruby-red throat. Excellent hovering ability.",
    habitat: "Forest, Urban",
    status: "Least Concern",
    endangered: false
  },
  {
    id: 11,
    name: "Black Bear",
    scientificName: "Ursus americanus",
    category: "Mammals",
    icon: "🐻",
    description: "Medium-sized bear found across North America. Mostly herbivorous diet.",
    habitat: "Forest, Mountain",
    status: "Least Concern",
    endangered: false
  },
  {
    id: 12,
    name: "Honeybee",
    scientificName: "Apis mellifera",
    category: "Insects",
    icon: "🐝",
    description: "Critical pollinator for agriculture and wild plants. Lives in complex colonies.",
    habitat: "Grassland, Urban",
    status: "Threatened",
    endangered: true
  }
];

// Demo sightings
const demoSightings = [
  {
    id: "demo-1",
    observerName: "Ayaan",
    speciesName: "Red-tailed Hawk",
    category: "Birds",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    location: "Central Park, New York",
    coordinates: { lat: 40.7829, lng: -73.9654 },
    quantity: 1,
    behaviorNotes: "Soaring over meadow, hunting for prey",
    habitat: "Grassland",
    photos: [],
    endangered: false,
    timestamp: Date.now() - 2 * 60 * 60 * 1000
  },
  {
    id: "demo-2",
    observerName: "Jagrati",
    speciesName: "Monarch Butterfly",
    category: "Insects",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    location: "Garden Grove",
    coordinates: { lat: 40.7580, lng: -73.9855 },
    quantity: 12,
    behaviorNotes: "Feeding on milkweed flowers",
    habitat: "Urban",
    photos: [],
    endangered: true,
    timestamp: Date.now() - 5 * 60 * 60 * 1000
  },
  {
    id: "demo-3",
    observerName: "Maya",
    speciesName: "White-tailed Deer",
    category: "Mammals",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    location: "Forest Trail",
    coordinates: { lat: 40.7489, lng: -73.9680 },
    quantity: 3,
    behaviorNotes: "Family group grazing at dawn",
    habitat: "Forest",
    photos: [],
    endangered: false,
    timestamp: Date.now() - 24 * 60 * 60 * 1000
  }
];

// Map variable
let map = null;
let markers = [];
let currentLocation = null;
let uploadedPhotos = [];

// Initialize
function init() {
  // Set default date to now
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  elements.sightingDate.value = now.toISOString().slice(0, 16);

  // Load demo data if empty
  if (getSightings().length === 0) {
    saveSightings(demoSightings);
  }

  if (!localStorage.getItem(SPECIES_DB_KEY)) {
    localStorage.setItem(SPECIES_DB_KEY, JSON.stringify(speciesDatabase));
  }

  // Event listeners
  elements.sightingForm.addEventListener("submit", handleSubmit);
  elements.detectLocationBtn.addEventListener("click", detectLocation);
  elements.photoUpload.addEventListener("change", handlePhotoUpload);
  elements.closeModal.addEventListener("click", closeModal);
  elements.sightingModal.addEventListener("click", (e) => {
    if (e.target === elements.sightingModal) closeModal();
  });

  // Tab navigation
  elements.tabBtns.forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Filters
  elements.galleryCategoryFilter?.addEventListener("change", renderGallery);
  elements.gallerySortFilter?.addEventListener("change", renderGallery);
  elements.mapCategoryFilter?.addEventListener("change", updateMapMarkers);
  elements.mapTimeFilter?.addEventListener("change", updateMapMarkers);
  elements.clearMapFilters?.addEventListener("click", clearMapFilters);
  elements.speciesSearch?.addEventListener("input", filterSpeciesDatabase);

  // Species filter chips
  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      filterSpeciesDatabase();
    });
  });

  // Populate species datalist
  populateSpeciesDatalist();

  // Render initial content
  updateStats();
  renderEndangeredList();
  renderGallery();
  renderSpeciesDatabase();
  renderFeed();
}

// Tab switching
function switchTab(tabName) {
  elements.tabBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  elements.tabContents.forEach(content => {
    content.classList.toggle("active", content.id === `${tabName}-tab`);
  });

  // Initialize map when map tab is opened
  if (tabName === "map" && !map) {
    setTimeout(initMap, 100);
  }
}

// Form submission
function handleSubmit(e) {
  e.preventDefault();

  const speciesData = speciesDatabase.find(s => 
    s.name.toLowerCase() === elements.speciesName.value.toLowerCase()
  );

  const sighting = {
    id: `sighting-${Date.now()}`,
    observerName: elements.observerName.value.trim(),
    speciesName: elements.speciesName.value.trim(),
    category: elements.speciesCategory.value,
    date: elements.sightingDate.value,
    location: elements.locationName.value.trim(),
    coordinates: currentLocation || { lat: 40.7589, lng: -73.9851 },
    quantity: parseInt(elements.quantity.value) || 1,
    behaviorNotes: elements.behaviorNotes.value.trim(),
    habitat: elements.habitat.value,
    photos: uploadedPhotos,
    endangered: speciesData?.endangered || false,
    timestamp: Date.now()
  };

  const sightings = getSightings();
  sightings.unshift(sighting);
  saveSightings(sightings);

  // Show success message
  showSuccessMessage();

  // Reset form
  elements.sightingForm.reset();
  elements.photoPreview.innerHTML = "";
  elements.coordinatesDisplay.classList.remove("active");
  uploadedPhotos = [];
  currentLocation = null;

  // Update displays
  updateStats();
  renderGallery();
  renderFeed();
  if (map) updateMapMarkers();
}

// Location detection
function detectLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  elements.detectLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Detecting...';
  elements.detectLocationBtn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      elements.coordinatesDisplay.innerHTML = `
        <i class="fas fa-map-pin"></i> 
        Coordinates: ${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}
      `;
      elements.coordinatesDisplay.classList.add("active");

      elements.detectLocationBtn.innerHTML = '<i class="fas fa-check"></i> Location Detected';
      setTimeout(() => {
        elements.detectLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i> Detect Location';
        elements.detectLocationBtn.disabled = false;
      }, 2000);
    },
    (error) => {
      alert("Unable to detect location: " + error.message);
      elements.detectLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i> Detect Location';
      elements.detectLocationBtn.disabled = false;
    }
  );
}

// Photo upload
function handlePhotoUpload(e) {
  const files = Array.from(e.target.files);
  
  files.forEach(file => {
    if (file.size > 5 * 1024 * 1024) {
      alert(`${file.name} is too large. Maximum size is 5MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      uploadedPhotos.push(event.target.result);
      renderPhotoPreview();
    };
    reader.readAsDataURL(file);
  });
}

function renderPhotoPreview() {
  elements.photoPreview.innerHTML = uploadedPhotos.map((photo, index) => `
    <div class="preview-item">
      <img src="${photo}" alt="Preview ${index + 1}" />
      <button type="button" class="remove-photo" onclick="removePhoto(${index})">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join("");
}

function removePhoto(index) {
  uploadedPhotos.splice(index, 1);
  renderPhotoPreview();
}

// Map functions
function initMap() {
  map = L.map("sightingMap").setView([40.7589, -73.9851], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  updateMapMarkers();
}

function updateMapMarkers() {
  if (!map) return;

  // Clear existing markers
  markers.forEach(marker => marker.remove());
  markers = [];

  const sightings = getFilteredSightings();

  sightings.forEach(sighting => {
    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background: ${sighting.endangered ? '#dc2626' : '#059669'}; 
             color: white; width: 32px; height: 32px; border-radius: 50%; 
             display: flex; align-items: center; justify-content: center; 
             font-size: 16px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
             ${getCategoryIcon(sighting.category)}
           </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const marker = L.marker([sighting.coordinates.lat, sighting.coordinates.lng], { icon })
      .addTo(map)
      .bindPopup(`
        <div style="padding: 8px; min-width: 200px;">
          <h4 style="margin: 0 0 8px 0; color: #059669; font-size: 1.1rem;">
            ${sighting.speciesName}
          </h4>
          ${sighting.endangered ? '<div style="color: #dc2626; font-weight: 600; margin-bottom: 8px;"><i class="fas fa-exclamation-triangle"></i> Endangered</div>' : ''}
          <p style="margin: 4px 0; color: #6b7280;">
            <i class="fas fa-user"></i> ${sighting.observerName}
          </p>
          <p style="margin: 4px 0; color: #6b7280;">
            <i class="fas fa-map-marker-alt"></i> ${sighting.location}
          </p>
          <p style="margin: 4px 0; color: #6b7280;">
            <i class="fas fa-clock"></i> ${formatDate(sighting.date)}
          </p>
          <button onclick="viewSightingDetails('${sighting.id}')" 
                  style="margin-top: 12px; padding: 8px 16px; background: #059669; 
                  color: white; border: none; border-radius: 8px; cursor: pointer; 
                  font-weight: 600; width: 100%;">
            View Details
          </button>
        </div>
      `);

    markers.push(marker);
  });

  // Fit bounds if markers exist
  if (markers.length > 0) {
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));
  }
}

function getFilteredSightings() {
  let sightings = getSightings();

  // Category filter
  const categoryFilter = elements.mapCategoryFilter?.value;
  if (categoryFilter && categoryFilter !== "all") {
    sightings = sightings.filter(s => s.category === categoryFilter);
  }

  // Time filter
  const timeFilter = elements.mapTimeFilter?.value;
  if (timeFilter && timeFilter !== "all") {
    const now = Date.now();
    const cutoff = {
      today: now - 24 * 60 * 60 * 1000,
      week: now - 7 * 24 * 60 * 60 * 1000,
      month: now - 30 * 24 * 60 * 60 * 1000
    }[timeFilter];

    sightings = sightings.filter(s => s.timestamp >= cutoff);
  }

  return sightings;
}

function clearMapFilters() {
  if (elements.mapCategoryFilter) elements.mapCategoryFilter.value = "all";
  if (elements.mapTimeFilter) elements.mapTimeFilter.value = "all";
  updateMapMarkers();
}

// Gallery
function renderGallery() {
  let sightings = getSightings();

  // Category filter
  const category = elements.galleryCategoryFilter?.value;
  if (category && category !== "all") {
    sightings = sightings.filter(s => s.category === category);
  }

  // Sort
  const sort = elements.gallerySortFilter?.value;
  if (sort === "oldest") {
    sightings.reverse();
  } else if (sort === "species") {
    sightings.sort((a, b) => a.speciesName.localeCompare(b.speciesName));
  }

  if (sightings.length === 0) {
    elements.galleryGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-binoculars"></i>
        <h3>No Sightings Found</h3>
        <p>Be the first to report a wildlife sighting!</p>
      </div>
    `;
    return;
  }

  elements.galleryGrid.innerHTML = sightings.map(sighting => `
    <div class="gallery-card" onclick="viewSightingDetails('${sighting.id}')">
      <div class="gallery-card-image">
        ${sighting.photos && sighting.photos.length > 0 
          ? `<img src="${sighting.photos[0]}" alt="${sighting.speciesName}" />`
          : `<i class="fas fa-image"></i>`
        }
      </div>
      <div class="gallery-card-content">
        <div class="gallery-card-header">
          <div>
            <h3>${sighting.speciesName}</h3>
          </div>
          <span class="category-badge">${sighting.category}</span>
        </div>
        ${sighting.endangered ? '<div class="endangered-badge"><i class="fas fa-exclamation-triangle"></i> Endangered</div>' : ''}
        <div class="gallery-card-meta">
          <div class="meta-item">
            <i class="fas fa-user"></i>
            <span>${sighting.observerName}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>${sighting.location}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-clock"></i>
            <span>${formatDate(sighting.date)}</span>
          </div>
          ${sighting.quantity > 1 ? `
            <div class="meta-item">
              <i class="fas fa-hashtag"></i>
              <span>${sighting.quantity} observed</span>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `).join("");
}

// Species Database
function populateSpeciesDatalist() {
  const datalist = document.getElementById("speciesList");
  if (!datalist) return;
  
  datalist.innerHTML = speciesDatabase.map(species => 
    `<option value="${species.name}">${species.scientificName}</option>`
  ).join("");
}

function renderSpeciesDatabase() {
  const activeCategory = document.querySelector(".filter-chip.active")?.dataset.category || "all";
  const searchTerm = elements.speciesSearch?.value.toLowerCase() || "";

  let filtered = speciesDatabase;

  if (activeCategory !== "all") {
    filtered = filtered.filter(s => s.category === activeCategory);
  }

  if (searchTerm) {
    filtered = filtered.filter(s => 
      s.name.toLowerCase().includes(searchTerm) ||
      s.scientificName.toLowerCase().includes(searchTerm) ||
      s.description.toLowerCase().includes(searchTerm)
    );
  }

  if (filtered.length === 0) {
    elements.speciesGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-search"></i>
        <h3>No Species Found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    `;
    return;
  }

  elements.speciesGrid.innerHTML = filtered.map(species => `
    <div class="species-card">
      <div class="species-card-header">
        <div class="species-icon">${species.icon}</div>
        ${species.endangered ? '<div class="endangered-badge"><i class="fas fa-exclamation-triangle"></i> At Risk</div>' : ''}
      </div>
      <h3>${species.name}</h3>
      <p class="scientific-name">${species.scientificName}</p>
      <p class="description">${species.description}</p>
      <div class="species-info">
        <div class="info-row">
          <span class="label">Category:</span>
          <span class="value">${species.category}</span>
        </div>
        <div class="info-row">
          <span class="label">Habitat:</span>
          <span class="value">${species.habitat}</span>
        </div>
        <div class="info-row">
          <span class="label">Status:</span>
          <span class="value" style="color: ${species.endangered ? '#dc2626' : '#059669'};">
            ${species.status}
          </span>
        </div>
      </div>
    </div>
  `).join("");
}

function filterSpeciesDatabase() {
  renderSpeciesDatabase();
}

// Community Feed
function renderFeed() {
  const sightings = getSightings().slice(0, 20);

  if (sightings.length === 0) {
    elements.feedContainer.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-stream"></i>
        <h3>No Activity Yet</h3>
        <p>Start reporting wildlife sightings to see the community feed</p>
      </div>
    `;
    return;
  }

  elements.feedContainer.innerHTML = sightings.map(sighting => `
    <div class="feed-item">
      <div class="feed-item-header">
        <div class="observer-avatar">
          ${sighting.observerName.charAt(0).toUpperCase()}
        </div>
        <div class="feed-item-info">
          <h4>${sighting.observerName} spotted wildlife</h4>
          <span class="feed-item-time">${getTimeAgo(sighting.timestamp)}</span>
        </div>
      </div>
      <div class="feed-item-content">
        <div class="feed-species">${sighting.speciesName}</div>
        ${sighting.behaviorNotes ? `<p>${sighting.behaviorNotes}</p>` : ''}
        ${sighting.endangered ? '<div class="endangered-badge"><i class="fas fa-exclamation-triangle"></i> Endangered Species Alert</div>' : ''}
        <div class="feed-details">
          <div class="feed-detail">
            <i class="fas fa-tag"></i>
            <span>${sighting.category}</span>
          </div>
          <div class="feed-detail">
            <i class="fas fa-map-marker-alt"></i>
            <span>${sighting.location}</span>
          </div>
          <div class="feed-detail">
            <i class="fas fa-hashtag"></i>
            <span>${sighting.quantity} observed</span>
          </div>
          ${sighting.habitat ? `
            <div class="feed-detail">
              <i class="fas fa-tree"></i>
              <span>${sighting.habitat}</span>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `).join("");
}

// Modal
function viewSightingDetails(id) {
  const sighting = getSightings().find(s => s.id === id);
  if (!sighting) return;

  const modalContent = `
    <div class="modal-body">
      <h2 style="color: #059669; margin-bottom: 12px; font-size: 2rem;">
        ${sighting.speciesName}
      </h2>
      ${sighting.endangered ? '<div class="endangered-badge" style="margin-bottom: 16px;"><i class="fas fa-exclamation-triangle"></i> Endangered Species</div>' : ''}
      
      ${sighting.photos && sighting.photos.length > 0 ? `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 20px 0;">
          ${sighting.photos.map(photo => `
            <img src="${photo}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px;" />
          `).join("")}
        </div>
      ` : ''}

      <div style="display: grid; gap: 16px; margin-top: 24px;">
        <div>
          <h4 style="color: #6b7280; font-size: 0.9rem; margin-bottom: 4px;">Observer</h4>
          <p style="font-size: 1.1rem; font-weight: 600;"><i class="fas fa-user" style="color: #059669; margin-right: 8px;"></i>${sighting.observerName}</p>
        </div>

        <div>
          <h4 style="color: #6b7280; font-size: 0.9rem; margin-bottom: 4px;">Category</h4>
          <p style="font-size: 1.1rem; font-weight: 600;"><i class="fas fa-tag" style="color: #059669; margin-right: 8px;"></i>${sighting.category}</p>
        </div>

        <div>
          <h4 style="color: #6b7280; font-size: 0.9rem; margin-bottom: 4px;">Location</h4>
          <p style="font-size: 1.1rem; font-weight: 600;"><i class="fas fa-map-marker-alt" style="color: #059669; margin-right: 8px;"></i>${sighting.location}</p>
          <p style="color: #9ca3af; font-size: 0.9rem; margin-top: 4px;">
            Coordinates: ${sighting.coordinates.lat.toFixed(6)}, ${sighting.coordinates.lng.toFixed(6)}
          </p>
        </div>

        <div>
          <h4 style="color: #6b7280; font-size: 0.9rem; margin-bottom: 4px;">Date & Time</h4>
          <p style="font-size: 1.1rem; font-weight: 600;"><i class="fas fa-clock" style="color: #059669; margin-right: 8px;"></i>${formatDate(sighting.date)}</p>
        </div>

        <div>
          <h4 style="color: #6b7280; font-size: 0.9rem; margin-bottom: 4px;">Quantity Observed</h4>
          <p style="font-size: 1.1rem; font-weight: 600;"><i class="fas fa-hashtag" style="color: #059669; margin-right: 8px;"></i>${sighting.quantity}</p>
        </div>

        ${sighting.habitat ? `
          <div>
            <h4 style="color: #6b7280; font-size: 0.9rem; margin-bottom: 4px;">Habitat</h4>
            <p style="font-size: 1.1rem; font-weight: 600;"><i class="fas fa-tree" style="color: #059669; margin-right: 8px;"></i>${sighting.habitat}</p>
          </div>
        ` : ''}

        ${sighting.behaviorNotes ? `
          <div>
            <h4 style="color: #6b7280; font-size: 0.9rem; margin-bottom: 4px;">Behavior Notes</h4>
            <p style="font-size: 1rem; line-height: 1.6; padding: 16px; background: #f9fafb; border-radius: 8px;">
              ${sighting.behaviorNotes}
            </p>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  elements.modalBody.innerHTML = modalContent;
  elements.sightingModal.classList.add("active");
}

function closeModal() {
  elements.sightingModal.classList.remove("active");
}

// Update stats
function updateStats() {
  const sightings = getSightings();
  const uniqueSpeciesSet = new Set(sightings.map(s => s.speciesName));
  const endangeredCount = sightings.filter(s => s.endangered).length;

  elements.totalSightings.textContent = sightings.length;
  elements.uniqueSpecies.textContent = uniqueSpeciesSet.size;
  elements.endangeredAlerts.textContent = endangeredCount;
}

// Render endangered list
function renderEndangeredList() {
  const endangered = speciesDatabase.filter(s => s.endangered);
  
  elements.endangeredSpeciesList.innerHTML = endangered.slice(0, 5).map(species => `
    <div class="endangered-item">
      <span>${species.icon}</span>
      <span>${species.name}</span>
    </div>
  `).join("");
}

// Utility functions
function getSightings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveSightings(sightings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sightings));
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return `${Math.floor(seconds / 604800)} weeks ago`;
}

function getCategoryIcon(category) {
  const icons = {
    Mammals: "🦌",
    Birds: "🐦",
    Reptiles: "🦎",
    Amphibians: "🐸",
    Insects: "🦋",
    "Marine Life": "🐠"
  };
  return icons[category] || "🐾";
}

function showSuccessMessage() {
  const message = document.createElement("div");
  message.style.cssText = `
    position: fixed;
    top: 100px;
    right: 24px;
    background: #059669;
    color: white;
    padding: 20px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 12px;
  `;
  message.innerHTML = `
    <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
    <span>Sighting reported successfully!</span>
  `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.style.animation = "slideOut 0.3s ease";
    setTimeout(() => message.remove(), 300);
  }, 3000);
}

// Initialize on load
document.addEventListener("DOMContentLoaded", init);

// Make functions globally accessible
window.viewSightingDetails = viewSightingDetails;
window.removePhoto = removePhoto;
