// Public Space Thermal Comfort Index
class ThermalComfort {
    constructor() {
        this.map = null;
        this.spaces = [];
        this.threshold = 50;
        this.init();
    }

    init() {
        this.initMap();
        this.generateSpaces();
        this.setupEventListeners();
    }

    initMap() {
        this.map = L.map('comfort-map').setView([40.7128, -74.0060], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(this.map);
    }

    generateSpaces() {
        const types = ['park', 'market', 'busstop', 'plaza'];
        const names = {
            park: ['Central Park', 'Riverside Park', 'Green Park'],
            market: ['Farmers Market', 'Street Market', 'Craft Market'],
            busstop: ['Main St Stop', 'Oak Ave Stop', 'Park Stop'],
            plaza: ['City Plaza', 'Town Square', 'Community Plaza']
        };
        const base = [40.7128, -74.0060];

        types.forEach(type => {
            for (let i = 0; i < 5; i++) {
                const shade = Math.random() * 100;
                const ventilation = Math.random() * 100;
                const water = Math.random() * 100;
                const reflectivity = Math.random() * 100;
                
                const score = this.calculateScore(shade, ventilation, water, reflectivity);
                
                this.spaces.push({
                    id: `${type}_${i}`,
                    name: `${names[type][i % names[type].length]} ${Math.floor(i / names[type].length) + 1}`,
                    type: type,
                    lat: base[0] + (Math.random() - 0.5) * 0.04,
                    lng: base[1] + (Math.random() - 0.5) * 0.04,
                    shade: shade,
                    ventilation: ventilation,
                    waterAccess: water,
                    reflectivity: reflectivity,
                    score: score,
                    level: this.getLevel(score)
                });
            }
        });

        this.renderSpaces();
        this.updateStats();
    }

    calculateScore(shade, ventilation, water, reflectivity) {
        return Math.round(shade * 0.35 + ventilation * 0.25 + water * 0.2 + (100 - reflectivity) * 0.2);
    }

    getLevel(score) {
        if (score >= 80) return 'excellent';
        if (score >= 60) return 'good';
        if (score >= 40) return 'fair';
        return 'poor';
    }

    getColor(level) {
        const colors = {
            excellent: '#4CAF50',
            good: '#8BC34A',
            fair: '#FFC107',
            poor: '#F44336'
        };
        return colors[level] || '#999';
    }

    renderSpaces() {
        this.map.eachLayer(layer => {
            if (layer instanceof L.Marker) layer.remove();
        });

        const filtered = this.spaces.filter(s => 
            s.score >= this.threshold && this.shouldShow(s.type)
        );

        filtered.forEach(space => {
            const icon = L.divIcon({
                html: `<div style="background:${this.getColor(space.level)};width:30px;height:30px;border-radius:50%;border:3px solid white;box-shadow:0 0 6px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:12px;">${Math.round(space.score)}</div>`,
                className: '',
                iconSize: [30, 30]
            });

            const marker = L.marker([space.lat, space.lng], { icon });
            marker.on('click', () => this.showDetails(space));
            marker.bindPopup(`
                <strong>${space.name}</strong><br>
                Type: ${space.type}<br>
                Comfort Score: ${Math.round(space.score)}/100
            `);
            marker.addTo(this.map);
        });

        this.displaySpaceList(filtered);
    }

    shouldShow(type) {
        const filter = document.getElementById('type-filter').value;
        return filter === 'all' || filter === type;
    }

    displaySpaceList(spaces) {
        const container = document.getElementById('spaces');
        
        if (spaces.length === 0) {
            container.innerHTML = '<p class="placeholder">No spaces found</p>';
            return;
        }

        let html = '';
        spaces.forEach(space => {
            html += `
                <div class="space-card ${space.level}" onclick="thermalComfort.focusSpace(${space.lat}, ${space.lng})">
                    <h4>${space.name}</h4>
                    <p><i class="fas fa-map-marker-alt"></i> ${space.type}</p>
                    <p><span class="score-badge ${space.level}">${Math.round(space.score)}/100</span></p>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    showDetails(space) {
        const container = document.getElementById('details');
        
        container.innerHTML = `
            <div class="space-card ${space.level}">
                <h4>${space.name}</h4>
                <p><strong>Type:</strong> ${space.type}</p>
                <p><strong>Comfort Score:</strong> <span class="score-badge ${space.level}">${Math.round(space.score)}/100</span></p>
                
                <div class="factor-grid">
                    <div>
                        <div class="factor-item">
                            <span>Shade Coverage</span>
                            <strong>${Math.round(space.shade)}%</strong>
                        </div>
                        <div class="factor-bar">
                            <div class="factor-fill" style="width: ${space.shade}%"></div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="factor-item">
                            <span>Ventilation</span>
                            <strong>${Math.round(space.ventilation)}%</strong>
                        </div>
                        <div class="factor-bar">
                            <div class="factor-fill" style="width: ${space.ventilation}%"></div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="factor-item">
                            <span>Water Access</span>
                            <strong>${Math.round(space.waterAccess)}%</strong>
                        </div>
                        <div class="factor-bar">
                            <div class="factor-fill" style="width: ${space.waterAccess}%"></div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="factor-item">
                            <span>Cool Surfaces</span>
                            <strong>${Math.round(100 - space.reflectivity)}%</strong>
                        </div>
                        <div class="factor-bar">
                            <div class="factor-fill" style="width: ${100 - space.reflectivity}%"></div>
                        </div>
                    </div>
                </div>
                
                <p style="margin-top: 1rem;"><strong>Recommendations:</strong></p>
                <ul style="padding-left: 1.5rem; margin-top: 0.5rem;">
                    ${this.getRecommendations(space).map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>
        `;

        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.querySelector('[data-tab="details"]').classList.add('active');
        document.getElementById('details').classList.add('active');
    }

    getRecommendations(space) {
        const recs = [];
        
        if (space.shade < 50) {
            recs.push('Add shade structures or plant trees');
        }
        if (space.ventilation < 50) {
            recs.push('Improve airflow with strategic landscaping');
        }
        if (space.waterAccess < 50) {
            recs.push('Install water fountains or misting stations');
        }
        if (space.reflectivity > 50) {
            recs.push('Use cool pavement or lighter surface materials');
        }
        
        if (recs.length === 0) {
            recs.push('Maintain current comfort features');
        }
        
        return recs;
    }

    focusSpace(lat, lng) {
        this.map.setView([lat, lng], 16);
    }

    updateStats() {
        const filtered = this.spaces.filter(s => s.score >= this.threshold);
        const avgScore = filtered.length > 0 
            ? Math.round(filtered.reduce((sum, s) => sum + s.score, 0) / filtered.length)
            : 0;

        document.getElementById('total-spaces').textContent = filtered.length;
        document.getElementById('avg-score').textContent = avgScore;
    }

    setupEventListeners() {
        document.getElementById('assess-btn').addEventListener('click', () => {
            this.renderSpaces();
            this.updateStats();
        });

        document.getElementById('score-filter').addEventListener('input', (e) => {
            this.threshold = parseInt(e.target.value);
            document.getElementById('score-val').textContent = this.threshold + '+';
        });

        document.getElementById('type-filter').addEventListener('change', () => {
            this.renderSpaces();
        });

        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });
    }
}

let thermalComfort;
document.addEventListener('DOMContentLoaded', () => {
    thermalComfort = new ThermalComfort();
});
