// Urban Noise Refuge Locator
class NoiseRefugeLocator {
    constructor() {
        this.map = null;
        this.refuges = [];
        this.threshold = 50;
        this.init();
    }

    init() {
        this.initMap();
        this.generateRefuges();
        this.setupEventListeners();
    }

    initMap() {
        this.map = L.map('noise-map').setView([40.7128, -74.0060], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(this.map);
    }

    generateRefuges() {
        const types = [
            { name: 'Central Park', type: 'park', noise: 35 },
            { name: 'City Library', type: 'library', noise: 30 },
            { name: 'Riverside Walk', type: 'street', noise: 42 },
            { name: 'Botanical Garden', type: 'park', noise: 38 },
            { name: 'Community Center', type: 'indoor', noise: 40 },
            { name: 'Quiet Lane', type: 'street', noise: 45 },
            { name: 'Memorial Park', type: 'park', noise: 36 },
            { name: 'Public Library Branch', type: 'library', noise: 28 },
            { name: 'Green Street', type: 'street', noise: 48 },
            { name: 'Meditation Center', type: 'indoor', noise: 25 }
        ];

        const base = [40.7128, -74.0060];
        types.forEach((refuge, i) => {
            this.refuges.push({
                ...refuge,
                lat: base[0] + (Math.random() - 0.5) * 0.03,
                lng: base[1] + (Math.random() - 0.5) * 0.03,
                distance: (Math.random() * 3 + 0.5).toFixed(1),
                hours: this.getHours(refuge.type),
                features: this.getFeatures(refuge.type)
            });
        });

        this.renderRefuges();
        this.updateStats();
    }

    getHours(type) {
        const hours = {
            park: '24 hours',
            library: '9 AM - 8 PM',
            street: '24 hours',
            indoor: '8 AM - 10 PM'
        };
        return hours[type] || '24 hours';
    }

    getFeatures(type) {
        const features = {
            park: ['Benches', 'Trees', 'Walking paths'],
            library: ['Reading rooms', 'Study areas', 'WiFi'],
            street: ['Low traffic', 'Tree-lined', 'Pedestrian-friendly'],
            indoor: ['Climate controlled', 'Seating', 'Restrooms']
        };
        return features[type] || [];
    }

    getNoiseLevel(noise) {
        if (noise < 40) return 'quiet';
        if (noise < 55) return 'moderate';
        if (noise < 70) return 'loud';
        return 'noisy';
    }

    getColor(level) {
        const colors = {
            quiet: '#4CAF50',
            moderate: '#FFD700',
            loud: '#FF8C00',
            noisy: '#DC143C'
        };
        return colors[level] || '#999';
    }

    renderRefuges() {
        this.map.eachLayer(layer => {
            if (layer instanceof L.Marker) layer.remove();
        });

        const filtered = this.refuges.filter(r => r.noise <= this.threshold);

        filtered.forEach(refuge => {
            if (!this.shouldShow(refuge.type)) return;

            const level = this.getNoiseLevel(refuge.noise);
            const icon = L.divIcon({
                html: `<div style="background:${this.getColor(level)};width:30px;height:30px;border-radius:50%;border:3px solid white;box-shadow:0 0 6px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;">${refuge.noise}</div>`,
                className: '',
                iconSize: [30, 30]
            });

            const marker = L.marker([refuge.lat, refuge.lng], { icon });
            marker.on('click', () => this.showDetails(refuge));
            marker.bindPopup(`
                <strong>${refuge.name}</strong><br>
                Type: ${refuge.type}<br>
                Noise: ${refuge.noise} dB<br>
                Distance: ${refuge.distance} km
            `);
            marker.addTo(this.map);
        });

        this.displayRefugeList(filtered);
    }

    shouldShow(type) {
        const checks = {
            park: document.getElementById('show-parks').checked,
            library: document.getElementById('show-libraries').checked,
            street: document.getElementById('show-streets').checked,
            indoor: document.getElementById('show-indoor').checked
        };
        return checks[type] !== false;
    }

    displayRefugeList(refuges) {
        const container = document.getElementById('refuges');
        
        if (refuges.length === 0) {
            container.innerHTML = '<p class="placeholder">No refuges found. Try adjusting filters.</p>';
            return;
        }

        let html = '';
        refuges.forEach(refuge => {
            const level = this.getNoiseLevel(refuge.noise);
            html += `
                <div class="refuge-card" onclick="noiseRefuge.focusRefuge(${refuge.lat}, ${refuge.lng})">
                    <h4>${refuge.name}</h4>
                    <p><i class="fas fa-map-marker-alt"></i> ${refuge.distance} km away</p>
                    <p><i class="fas fa-volume-down"></i> ${refuge.noise} dB <span class="noise-badge ${level}">${level.toUpperCase()}</span></p>
                    <p><i class="fas fa-clock"></i> ${refuge.hours}</p>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    showDetails(refuge) {
        const container = document.getElementById('details');
        const level = this.getNoiseLevel(refuge.noise);
        
        container.innerHTML = `
            <div class="refuge-card">
                <h4>${refuge.name}</h4>
                <p><strong>Type:</strong> ${refuge.type}</p>
                <p><strong>Noise Level:</strong> ${refuge.noise} dB <span class="noise-badge ${level}">${level.toUpperCase()}</span></p>
                <p><strong>Distance:</strong> ${refuge.distance} km</p>
                <p><strong>Hours:</strong> ${refuge.hours}</p>
                <p><strong>Features:</strong></p>
                <ul style="padding-left: 1.5rem;">
                    ${refuge.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
        `;

        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.querySelector('[data-tab="details"]').classList.add('active');
        document.getElementById('details').classList.add('active');
    }

    focusRefuge(lat, lng) {
        this.map.setView([lat, lng], 16);
    }

    updateStats() {
        const filtered = this.refuges.filter(r => r.noise <= this.threshold);
        const avgNoise = filtered.length > 0 
            ? (filtered.reduce((sum, r) => sum + r.noise, 0) / filtered.length).toFixed(0)
            : '--';

        document.getElementById('refuge-count').textContent = filtered.length;
        document.getElementById('avg-noise').textContent = avgNoise + (avgNoise !== '--' ? ' dB' : '');
    }

    setupEventListeners() {
        document.getElementById('find-refuges').addEventListener('click', () => {
            this.renderRefuges();
            this.updateStats();
        });

        document.getElementById('noise-threshold').addEventListener('input', (e) => {
            this.threshold = parseInt(e.target.value);
            document.getElementById('noise-val').textContent = this.threshold + ' dB';
        });

        ['show-parks', 'show-libraries', 'show-streets', 'show-indoor'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                this.renderRefuges();
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

        document.getElementById('locate-btn').addEventListener('click', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.map.setView([position.coords.latitude, position.coords.longitude], 15);
                    },
                    () => alert('Unable to get location')
                );
            }
        });
    }
}

let noiseRefuge;
document.addEventListener('DOMContentLoaded', () => {
    noiseRefuge = new NoiseRefugeLocator();
});
