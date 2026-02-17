// ===========================
// Refill Station Finder App
// ===========================

class RefillStationFinder {
    constructor() {
        this.stations = [];
        this.filteredStations = [];
        this.favorites = this.loadFavorites();
        this.refillHistory = this.loadRefillHistory();
        this.currentView = 'grid';
        this.map = null;
        this.markers = [];
        
        // Filter state
        this.filters = {
            search: '',
            category: 'all',
            distance: 10,
            openNow: false
        };

        this.init();
    }

    init() {
        this.generateSampleStations();
        this.setupEventListeners();
        this.updateStats();
        this.renderStations();
        this.updateResultsCount();
    }

    // Generate sample station data
    generateSampleStations() {
        const stationNames = [
            'Green Earth Refill Hub', 'EcoFill Station', 'Zero Waste Market',
            'Sustainable Living Store', 'Refill Revolution', 'Pure & Simple Refills',
            'Nature\'s Refill Point', 'Clean Conscience Co.', 'Bare Necessities',
            'The Refillery', 'Eco Essentials', 'Planet Positive Refills',
            'Mindful Market', 'Green Goods Station', 'Refill & Reuse Hub'
        ];

        const addresses = [
            '123 Oak Street', '456 Maple Avenue', '789 Pine Road',
            '321 Elm Drive', '654 Cedar Lane', '987 Birch Boulevard',
            '147 Spruce Way', '258 Willow Court', '369 Ash Street',
            '741 Walnut Avenue', '852 Cherry Road', '963 Poplar Drive',
            '159 Hickory Lane', '357 Magnolia Way', '486 Sycamore Court'
        ];

        const itemTypes = [
            { name: 'Dish Soap', category: 'cleaning' },
            { name: 'Laundry Detergent', category: 'cleaning' },
            { name: 'All-Purpose Cleaner', category: 'cleaning' },
            { name: 'Shampoo', category: 'personal-care' },
            { name: 'Conditioner', category: 'personal-care' },
            { name: 'Body Wash', category: 'personal-care' },
            { name: 'Hand Soap', category: 'personal-care' },
            { name: 'Olive Oil', category: 'pantry' },
            { name: 'Vinegar', category: 'pantry' },
            { name: 'Honey', category: 'pantry' },
            { name: 'Rice', category: 'bulk' },
            { name: 'Pasta', category: 'bulk' },
            { name: 'Nuts', category: 'bulk' },
            { name: 'Coffee', category: 'beverages' },
            { name: 'Tea', category: 'beverages' }
        ];

        this.stations = stationNames.map((name, index) => {
            const randomItems = this.getRandomItems(itemTypes, 5, 12);
            const lat = 40.7128 + (Math.random() - 0.5) * 0.2;
            const lng = -74.006 + (Math.random() - 0.5) * 0.2;
            
            return {
                id: index + 1,
                name: name,
                address: `${addresses[index]}, New York, NY 10001`,
                distance: (Math.random() * 15 + 0.5).toFixed(1),
                lat: lat,
                lng: lng,
                phone: this.generatePhone(),
                rating: (Math.random() * 1.5 + 3.5).toFixed(1),
                reviews: Math.floor(Math.random() * 200 + 20),
                items: randomItems,
                hours: this.generateHours(),
                isOpen: Math.random() > 0.3,
                image: `https://source.unsplash.com/400x300/?refill,store,eco,${index}`
            };
        });

        this.filteredStations = [...this.stations];
    }

    getRandomItems(items, min, max) {
        const count = Math.floor(Math.random() * (max - min + 1)) + min;
        const shuffled = [...items].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    generatePhone() {
        const area = Math.floor(Math.random() * 900) + 100;
        const first = Math.floor(Math.random() * 900) + 100;
        const last = Math.floor(Math.random() * 9000) + 1000;
        return `(${area}) ${first}-${last}`;
    }

    generateHours() {
        const opens = Math.floor(Math.random() * 4) + 8; // 8-11 AM
        const closes = Math.floor(Math.random() * 3) + 18; // 6-8 PM
        return {
            weekday: `${opens}:00 AM - ${closes % 12 || 12}:00 PM`,
            weekend: `${opens + 1}:00 AM - ${(closes - 2) % 12 || 12}:00 PM`
        };
    }

    setupEventListeners() {
        // Search
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');
        
        searchInput.addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            clearSearch.style.display = e.target.value ? 'block' : 'none';
            this.applyFilters();
        });

        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            this.filters.search = '';
            clearSearch.style.display = 'none';
            this.applyFilters();
        });

        // Toggle filters
        const toggleFilters = document.getElementById('toggleFilters');
        const filterPanel = document.getElementById('filterPanel');
        
        toggleFilters.addEventListener('click', () => {
            filterPanel.classList.toggle('active');
        });

        // Category chips
        document.querySelectorAll('.chip[data-category]').forEach(chip => {
            chip.addEventListener('click', (e) => {
                document.querySelectorAll('.chip[data-category]').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                this.filters.category = e.target.dataset.category;
            });
        });

        // Distance slider
        const distanceRange = document.getElementById('distanceRange');
        const distanceValue = document.getElementById('distanceValue');
        
        distanceRange.addEventListener('input', (e) => {
            distanceValue.textContent = e.target.value;
            this.filters.distance = parseInt(e.target.value);
        });

        // Open now filter
        const openNowFilter = document.getElementById('openNowFilter');
        openNowFilter.addEventListener('change', (e) => {
            this.filters.openNow = e.target.checked;
        });

        // Filter actions
        document.getElementById('applyFilters').addEventListener('click', () => {
            this.applyFilters();
            filterPanel.classList.remove('active');
        });

        document.getElementById('resetFilters').addEventListener('click', () => {
            this.resetFilters();
        });

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });

        // Favorites button
        document.getElementById('showFavoritesBtn').addEventListener('click', () => {
            this.showFavorites();
        });

        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal('logRefillModal');
        });

        document.getElementById('closeDetailsModal').addEventListener('click', () => {
            this.closeModal('stationDetailsModal');
        });

        document.getElementById('cancelRefill').addEventListener('click', () => {
            this.closeModal('logRefillModal');
        });

        document.getElementById('submitRefill').addEventListener('click', () => {
            this.logRefill();
        });

        // Close modals on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    applyFilters() {
        this.filteredStations = this.stations.filter(station => {
            // Search filter
            if (this.filters.search) {
                const searchLower = this.filters.search.toLowerCase();
                const matchesSearch = 
                    station.name.toLowerCase().includes(searchLower) ||
                    station.address.toLowerCase().includes(searchLower) ||
                    station.items.some(item => item.name.toLowerCase().includes(searchLower));
                
                if (!matchesSearch) return false;
            }

            // Category filter
            if (this.filters.category !== 'all') {
                const hasCategory = station.items.some(item => item.category === this.filters.category);
                if (!hasCategory) return false;
            }

            // Distance filter
            if (parseFloat(station.distance) > this.filters.distance) {
                return false;
            }

            // Open now filter
            if (this.filters.openNow && !station.isOpen) {
                return false;
            }

            return true;
        });

        this.renderStations();
        this.updateResultsCount();
        
        if (this.currentView === 'map' && this.map) {
            this.updateMapMarkers();
        }
    }

    resetFilters() {
        this.filters = {
            search: '',
            category: 'all',
            distance: 10,
            openNow: false
        };

        document.getElementById('searchInput').value = '';
        document.getElementById('clearSearch').style.display = 'none';
        document.getElementById('distanceRange').value = 10;
        document.getElementById('distanceValue').textContent = '10';
        document.getElementById('openNowFilter').checked = false;
        
        document.querySelectorAll('.chip[data-category]').forEach(c => c.classList.remove('active'));
        document.querySelector('.chip[data-category="all"]').classList.add('active');

        this.applyFilters();
    }

    renderStations() {
        const container = document.getElementById('stationsContainer');
        const emptyState = document.getElementById('emptyState');

        if (this.filteredStations.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        container.style.display = 'grid';
        emptyState.style.display = 'none';

        container.innerHTML = this.filteredStations.map(station => this.createStationCard(station)).join('');

        // Add event listeners
        this.attachStationEventListeners();
    }

    createStationCard(station) {
        const isFavorite = this.favorites.includes(station.id);
        const isListView = this.currentView === 'list';

        return `
            <div class="station-card ${isListView ? 'list-view' : ''}" data-id="${station.id}">
                <img src="${station.image}" alt="${station.name}" class="station-image">
                <div class="station-content">
                    <div class="station-header">
                        <div>
                            <h3 class="station-name">${station.name}</h3>
                            <div class="station-distance">
                                <i class="fas fa-location-dot"></i>
                                ${station.distance} miles away
                            </div>
                        </div>
                        <button class="btn-favorite ${isFavorite ? 'active' : ''}" data-id="${station.id}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                    
                    <div class="station-address">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${station.address}</span>
                    </div>
                    
                    <div class="station-status ${station.isOpen ? 'status-open' : 'status-closed'}">
                        <i class="fas fa-circle"></i>
                        ${station.isOpen ? 'Open Now' : 'Closed'}
                    </div>
                    
                    <div class="station-items">
                        ${station.items.slice(0, 5).map(item => `
                            <span class="item-tag">${item.name}</span>
                        `).join('')}
                        ${station.items.length > 5 ? `<span class="item-tag">+${station.items.length - 5} more</span>` : ''}
                    </div>
                    
                    <div class="station-meta">
                        <div class="station-rating">
                            <i class="fas fa-star"></i>
                            ${station.rating} (${station.reviews})
                        </div>
                        <div class="station-actions">
                            <button class="btn-icon btn-directions" data-id="${station.id}" title="Get Directions">
                                <i class="fas fa-directions"></i>
                            </button>
                            <button class="btn-icon btn-info" data-id="${station.id}" title="More Info">
                                <i class="fas fa-info-circle"></i>
                            </button>
                            <button class="btn-log-refill" data-id="${station.id}">
                                <i class="fas fa-check"></i>
                                Log Refill
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    attachStationEventListeners() {
        // Favorite buttons
        document.querySelectorAll('.btn-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const stationId = parseInt(btn.dataset.id);
                this.toggleFavorite(stationId);
            });
        });

        // Station cards (show details)
        document.querySelectorAll('.station-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const stationId = parseInt(card.dataset.id);
                    this.showStationDetails(stationId);
                }
            });
        });

        // Log refill buttons
        document.querySelectorAll('.btn-log-refill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const stationId = parseInt(btn.dataset.id);
                this.openLogRefillModal(stationId);
            });
        });

        // Directions buttons
        document.querySelectorAll('.btn-directions').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const stationId = parseInt(btn.dataset.id);
                this.getDirections(stationId);
            });
        });

        // Info buttons
        document.querySelectorAll('.btn-info').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const stationId = parseInt(btn.dataset.id);
                this.showStationDetails(stationId);
            });
        });
    }

    switchView(view) {
        this.currentView = view;
        
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        const container = document.getElementById('stationsContainer');
        const mapContainer = document.getElementById('mapContainer');

        if (view === 'map') {
            container.style.display = 'none';
            mapContainer.style.display = 'block';
            this.initializeMap();
        } else {
            container.style.display = 'grid';
            mapContainer.style.display = 'none';
            
            if (view === 'list') {
                container.classList.add('list-view');
            } else {
                container.classList.remove('list-view');
            }
            
            this.renderStations();
        }
    }

    initializeMap() {
        if (this.map) {
            this.updateMapMarkers();
            return;
        }

        // Initialize Leaflet map
        this.map = L.map('map').setView([40.7128, -74.006], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        this.updateMapMarkers();
    }

    updateMapMarkers() {
        // Clear existing markers
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        // Add markers for filtered stations
        this.filteredStations.forEach(station => {
            const marker = L.marker([station.lat, station.lng]).addTo(this.map);
            
            const popupContent = `
                <div class="map-popup">
                    <h3>${station.name}</h3>
                    <p><strong>${station.distance} miles away</strong></p>
                    <p>${station.address}</p>
                    <p style="color: ${station.isOpen ? '#10b981' : '#ef4444'};">
                        ${station.isOpen ? '● Open Now' : '● Closed'}
                    </p>
                </div>
            `;
            
            marker.bindPopup(popupContent);
            this.markers.push(marker);
        });

        // Fit bounds to show all markers
        if (this.markers.length > 0) {
            const group = L.featureGroup(this.markers);
            this.map.fitBounds(group.getBounds().pad(0.1));
        }
    }

    toggleFavorite(stationId) {
        const index = this.favorites.indexOf(stationId);
        
        if (index > -1) {
            this.favorites.splice(index, 1);
            this.showToast('Removed from favorites');
        } else {
            this.favorites.push(stationId);
            this.showToast('Added to favorites');
        }

        this.saveFavorites();
        this.updateFavoritesCount();
        this.renderStations();
    }

    showFavorites() {
        if (this.favorites.length === 0) {
            this.showToast('No favorites yet. Add some stations!');
            return;
        }

        this.filteredStations = this.stations.filter(station => 
            this.favorites.includes(station.id)
        );

        this.renderStations();
        this.updateResultsCount();
        this.showToast(`Showing ${this.favorites.length} favorite stations`);
    }

    openLogRefillModal(stationId) {
        const station = this.stations.find(s => s.id === stationId);
        if (!station) return;

        document.getElementById('refillStation').value = station.name;
        document.getElementById('refillStation').dataset.stationId = stationId;
        document.getElementById('refillItemType').value = 'cleaning';
        document.getElementById('refillContainers').value = 1;
        document.getElementById('refillNotes').value = '';

        this.openModal('logRefillModal');
    }

    logRefill() {
        const stationId = parseInt(document.getElementById('refillStation').dataset.stationId);
        const itemType = document.getElementById('refillItemType').value;
        const containers = parseInt(document.getElementById('refillContainers').value);
        const notes = document.getElementById('refillNotes').value;

        const refill = {
            id: Date.now(),
            stationId: stationId,
            date: new Date().toISOString(),
            itemType: itemType,
            containers: containers,
            notes: notes
        };

        this.refillHistory.push(refill);
        this.saveRefillHistory();
        this.updateStats();
        
        this.closeModal('logRefillModal');
        this.showToast(`Refill logged! +${containers} plastic container${containers > 1 ? 's' : ''} avoided!`);
    }

    showStationDetails(stationId) {
        const station = this.stations.find(s => s.id === stationId);
        if (!station) return;

        const modalName = document.getElementById('modalStationName');
        const modalContent = document.getElementById('stationDetailsContent');

        modalName.textContent = station.name;
        
        const categories = [...new Set(station.items.map(item => item.category))];
        
        modalContent.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <img src="${station.image}" alt="${station.name}" 
                     style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px;">
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                <div>
                    <strong style="color: var(--text-secondary); font-size: 0.875rem;">Distance</strong>
                    <p style="font-size: 1.125rem; margin-top: 0.25rem;">${station.distance} miles</p>
                </div>
                <div>
                    <strong style="color: var(--text-secondary); font-size: 0.875rem;">Rating</strong>
                    <p style="font-size: 1.125rem; margin-top: 0.25rem;">⭐ ${station.rating} (${station.reviews} reviews)</p>
                </div>
                <div>
                    <strong style="color: var(--text-secondary); font-size: 0.875rem;">Status</strong>
                    <p style="font-size: 1.125rem; margin-top: 0.25rem; color: ${station.isOpen ? '#10b981' : '#ef4444'};">
                        ${station.isOpen ? '● Open Now' : '● Closed'}
                    </p>
                </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <strong style="color: var(--text-secondary); font-size: 0.875rem;">Address</strong>
                <p style="margin-top: 0.25rem;">${station.address}</p>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <strong style="color: var(--text-secondary); font-size: 0.875rem;">Phone</strong>
                <p style="margin-top: 0.25rem;">${station.phone}</p>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <strong style="color: var(--text-secondary); font-size: 0.875rem;">Hours</strong>
                <p style="margin-top: 0.25rem;">Mon-Fri: ${station.hours.weekday}</p>
                <p>Sat-Sun: ${station.hours.weekend}</p>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <strong style="color: var(--text-secondary); font-size: 0.875rem;">Available Items (${station.items.length})</strong>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem;">
                    ${station.items.map(item => `
                        <span class="item-tag">${item.name}</span>
                    `).join('')}
                </div>
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button class="btn-primary" onclick="app.getDirections(${station.id})" style="flex: 1;">
                    <i class="fas fa-directions"></i> Get Directions
                </button>
                <button class="btn-primary" onclick="app.openLogRefillModal(${station.id}); app.closeModal('stationDetailsModal');" style="flex: 1;">
                    <i class="fas fa-check"></i> Log Refill
                </button>
            </div>
        `;

        this.openModal('stationDetailsModal');
    }

    getDirections(stationId) {
        const station = this.stations.find(s => s.id === stationId);
        if (!station) return;

        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(station.address)}`;
        window.open(url, '_blank');
    }

    updateStats() {
        // Calculate streak
        const streak = this.calculateStreak();
        document.getElementById('streakCount').textContent = streak;

        // Calculate plastic avoided
        const plasticAvoided = this.refillHistory.reduce((sum, refill) => sum + refill.containers, 0);
        document.getElementById('plasticAvoided').textContent = plasticAvoided;

        // Calculate CO2 saved (approximately 82g CO2 per plastic bottle)
        const co2Saved = (plasticAvoided * 0.082).toFixed(1);
        document.getElementById('co2Saved').textContent = co2Saved;
    }

    calculateStreak() {
        if (this.refillHistory.length === 0) return 0;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let streak = 0;
        let currentDate = new Date(today);

        while (true) {
            const hasRefillOnDate = this.refillHistory.some(refill => {
                const refillDate = new Date(refill.date);
                refillDate.setHours(0, 0, 0, 0);
                return refillDate.getTime() === currentDate.getTime();
            });

            if (hasRefillOnDate) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }

    updateResultsCount() {
        const count = this.filteredStations.length;
        document.getElementById('resultsCount').textContent = 
            `Found ${count} station${count !== 1 ? 's' : ''}`;
    }

    updateFavoritesCount() {
        document.querySelector('.favorites-count').textContent = this.favorites.length;
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Local Storage methods
    loadFavorites() {
        const saved = localStorage.getItem('refillStationFavorites');
        return saved ? JSON.parse(saved) : [];
    }

    saveFavorites() {
        localStorage.setItem('refillStationFavorites', JSON.stringify(this.favorites));
    }

    loadRefillHistory() {
        const saved = localStorage.getItem('refillHistory');
        return saved ? JSON.parse(saved) : [];
    }

    saveRefillHistory() {
        localStorage.setItem('refillHistory', JSON.stringify(this.refillHistory));
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new RefillStationFinder();
});
