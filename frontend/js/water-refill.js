// Water Refill Access Map
class WaterRefillMap {
    constructor() {
        this.map = null;
        this.stations = [];
        this.gaps = [];
        this.init();
    }

    init() {
        this.initMap();
        this.generateStations();
        this.identifyGaps();
        this.setupEventListeners();
    }

    initMap() {
        this.map = L.map('water-map').setView([40.7128, -74.0060], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(this.map);
    }

    generateStations() {
        const types = ['fountain', 'tap', 'cooler', 'dispenser'];
        const statuses = ['working', 'working', 'working', 'limited', 'broken'];
        const base = [40.7128, -74.0060];

        for (let i = 0; i < 25; i++) {
            this.stations.push({
                id: `station_${i}`,
                name: `Water Station ${i + 1}`,
                type: types[Math.floor(Math.random() * types.length)],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                lat: base[0] + (Math.random() - 0.5) * 0.04,
                lng: base[1] + (Math.random() - 0.5) * 0.04,
                walkTime: Math.floor(Math.random() * 15 + 2),
                hours: Math.random() > 0.3 ? '24/7' : '6 AM - 10 PM',
                free: Math.random() > 0.1
            });
        }

        this.renderStations();
        this.updateStats();
    }

    identifyGaps() {
        const base = [40.7128, -74.0060];
        this.gaps = [
            { name: 'Downtown East', lat: base[0] + 0.015, lng: base[1] + 0.015, population: 5000 },
            { name: 'Industrial Zone', lat: base[0] - 0.012, lng: base[1] - 0.018, population: 3200 },
            { name: 'Residential North', lat: base[0] + 0.020, lng: base[1] - 0.010, population: 4500 }
        ];

        this.displayGaps();
    }

    getColor(status) {
        const colors = {
            working: '#4CAF50',
            limited: '#FF9800',
            broken: '#DC143C'
        };
        return colors[status] || '#999';
    }

    renderStations() {
        this.map.eachLayer(layer => {
            if (layer instanceof L.Marker || layer instanceof L.Circle) layer.remove();
        });

        const filtered = this.stations.filter(s => this.shouldShow(s));

        filtered.forEach(station => {
            const icon = L.divIcon({
                html: `<div style="background:${this.getColor(station.status)};width:28px;height:28px;border-radius:50%;border:3px solid white;box-shadow:0 0 6px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;color:white;font-size:14px;"><i class="fas fa-tint"></i></div>`,
                className: '',
                iconSize: [28, 28]
            });

            const marker = L.marker([station.lat, station.lng], { icon });
            marker.on('click', () => this.showDetails(station));
            marker.bindPopup(`
                <strong>${station.name}</strong><br>
                Status: ${station.status}<br>
                Walk: ${station.walkTime} min<br>
                Hours: ${station.hours}
            `);
            marker.addTo(this.map);
        });

        this.gaps.forEach(gap => {
            const circle = L.circle([gap.lat, gap.lng], {
                radius: 300,
                fillColor: '#9C27B0',
                color: '#fff',
                weight: 2,
                opacity: 0.6,
                fillOpacity: 0.3
            });
            circle.bindPopup(`<strong>High-Need Gap</strong><br>${gap.name}<br>Population: ${gap.population}`);
            circle.addTo(this.map);
        });

        this.displayStationList(filtered);
    }

    shouldShow(station) {
        const checks = {
            working: document.getElementById('filter-working').checked,
            limited: document.getElementById('filter-limited').checked,
            broken: document.getElementById('filter-broken').checked
        };
        if (!checks[station.status]) return false;
        if (document.getElementById('filter-free').checked && !station.free) return false;
        return true;
    }

    displayStationList(stations) {
        const container = document.getElementById('stations');
        
        if (stations.length === 0) {
            container.innerHTML = '<p class="placeholder">No stations found</p>';
            return;
        }

        let html = '';
        stations.forEach(station => {
            html += `
                <div class="station-card ${station.status}" onclick="waterMap.focusStation(${station.lat}, ${station.lng})">
                    <h4>${station.name}</h4>
                    <p><i class="fas fa-walking"></i> ${station.walkTime} min walk</p>
                    <p><i class="fas fa-clock"></i> ${station.hours}</p>
                    <p><span class="status-badge ${station.status}">${station.status.toUpperCase()}</span> ${station.free ? '🆓 Free' : ''}</p>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    showDetails(station) {
        const container = document.getElementById('details');
        
        container.innerHTML = `
            <div class="station-card ${station.status}">
                <h4>${station.name}</h4>
                <p><strong>Type:</strong> ${station.type}</p>
                <p><strong>Status:</strong> <span class="status-badge ${station.status}">${station.status.toUpperCase()}</span></p>
                <p><strong>Walking Time:</strong> ${station.walkTime} minutes</p>
                <p><strong>Hours:</strong> ${station.hours}</p>
                <p><strong>Access:</strong> ${station.free ? 'Free' : 'May require payment'}</p>
            </div>
        `;

        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.querySelector('[data-tab="details"]').classList.add('active');
        document.getElementById('details').classList.add('active');
    }

    displayGaps() {
        const container = document.getElementById('gaps-list');
        let html = '';
        
        this.gaps.forEach(gap => {
            html += `
                <div class="gap-card" onclick="waterMap.focusStation(${gap.lat}, ${gap.lng})">
                    <h5>${gap.name}</h5>
                    <p>Population: ${gap.population}</p>
                    <p>No stations within 15 min walk</p>
                    <p><strong>Action needed:</strong> Install public water access</p>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }

    focusStation(lat, lng) {
        this.map.setView([lat, lng], 16);
    }

    updateStats() {
        const working = this.stations.filter(s => s.status === 'working').length;
        document.getElementById('total-stations').textContent = this.stations.length;
        document.getElementById('working-count').textContent = working;
        document.getElementById('gap-areas').textContent = this.gaps.length;
    }

    closeModal() {
        document.getElementById('add-modal').classList.add('hidden');
    }

    setupEventListeners() {
        document.getElementById('find-btn').addEventListener('click', () => {
            this.renderStations();
        });

        ['filter-working', 'filter-limited', 'filter-broken', 'filter-free'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                this.renderStations();
            });
        });

        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });

        document.getElementById('add-station-btn').addEventListener('click', () => {
            document.getElementById('add-modal').classList.remove('hidden');
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('add-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Station added successfully!');
            this.closeModal();
        });
    }
}

let waterMap;
document.addEventListener('DOMContentLoaded', () => {
    waterMap = new WaterRefillMap();
});
