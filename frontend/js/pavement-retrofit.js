// Pavement Heat Retrofit Planner
class PavementRetrofit {
    constructor() {
        this.map = null;
        this.sites = [];
        this.threshold = 140;
        this.init();
    }

    init() {
        this.initMap();
        this.generateSites();
        this.setupEventListeners();
    }

    initMap() {
        this.map = L.map('heat-map').setView([40.7128, -74.0060], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(this.map);
    }

    generateSites() {
        const types = ['road', 'sidewalk', 'parking'];
        const base = [40.7128, -74.0060];

        for (let i = 0; i < 30; i++) {
            const temp = Math.floor(Math.random() * 80 + 100);
            this.sites.push({
                id: `site_${i}`,
                name: `Site ${i + 1}`,
                type: types[Math.floor(Math.random() * types.length)],
                temp: temp,
                priority: this.getPriority(temp),
                lat: base[0] + (Math.random() - 0.5) * 0.04,
                lng: base[1] + (Math.random() - 0.5) * 0.04,
                area: Math.floor(Math.random() * 5000 + 1000),
                material: 'asphalt'
            });
        }

        this.renderSites();
        this.updateStats();
    }

    getPriority(temp) {
        if (temp >= 160) return 'critical';
        if (temp >= 140) return 'high';
        if (temp >= 120) return 'moderate';
        return 'low';
    }

    getColor(priority) {
        const colors = {
            critical: '#8B0000',
            high: '#DC143C',
            moderate: '#FF8C00',
            low: '#FFD700'
        };
        return colors[priority] || '#999';
    }

    renderSites() {
        this.map.eachLayer(layer => {
            if (layer instanceof L.Circle) layer.remove();
        });

        const filtered = this.sites.filter(s => s.temp >= this.threshold && this.shouldShow(s));

        filtered.forEach(site => {
            const circle = L.circle([site.lat, site.lng], {
                radius: 100,
                fillColor: this.getColor(site.priority),
                color: '#fff',
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.6
            });

            circle.on('click', () => this.showDetails(site));
            circle.bindPopup(`
                <strong>${site.name}</strong><br>
                Type: ${site.type}<br>
                Temp: ${site.temp}°F<br>
                Priority: ${site.priority.toUpperCase()}
            `);
            circle.addTo(this.map);
        });

        this.displaySiteList(filtered);
    }

    shouldShow(site) {
        const checks = {
            road: document.getElementById('layer-roads').checked,
            sidewalk: document.getElementById('layer-sidewalks').checked,
            parking: document.getElementById('layer-parking').checked
        };
        return checks[site.type] !== false;
    }

    displaySiteList(sites) {
        const container = document.getElementById('sites');
        
        if (sites.length === 0) {
            container.innerHTML = '<p class="placeholder">No sites found</p>';
            return;
        }

        let html = '';
        sites.forEach(site => {
            html += `
                <div class="site-card ${site.priority}" onclick="pavementRetrofit.focusSite(${site.lat}, ${site.lng})">
                    <h4>${site.name}</h4>
                    <p><i class="fas fa-thermometer-full"></i> ${site.temp}°F</p>
                    <p><i class="fas fa-ruler-combined"></i> ${site.area.toLocaleString()} sq ft</p>
                    <p><span class="priority-badge ${site.priority}">${site.priority.toUpperCase()}</span></p>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    showDetails(site) {
        const container = document.getElementById('details');
        const cost = this.calculateCost(site);
        
        container.innerHTML = `
            <div class="site-card ${site.priority}">
                <h4>${site.name}</h4>
                <p><strong>Type:</strong> ${site.type}</p>
                <p><strong>Temperature:</strong> ${site.temp}°F</p>
                <p><strong>Priority:</strong> <span class="priority-badge ${site.priority}">${site.priority.toUpperCase()}</span></p>
                <p><strong>Area:</strong> ${site.area.toLocaleString()} sq ft</p>
                <p><strong>Material:</strong> ${site.material}</p>
                <p><strong>Est. Cost:</strong> $${cost.toLocaleString()}</p>
                <p><strong>Recommended:</strong> ${this.getRecommendation(site)}</p>
            </div>
        `;

        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.querySelector('[data-tab="details"]').classList.add('active');
        document.getElementById('details').classList.add('active');
    }

    getRecommendation(site) {
        if (site.priority === 'critical') return 'Permeable pavement + tree shading';
        if (site.priority === 'high') return 'Cool pavement coating';
        return 'Monitor and plan for future retrofit';
    }

    calculateCost(site) {
        const costPerSqFt = site.priority === 'critical' ? 10 : site.priority === 'high' ? 3 : 2;
        return site.area * costPerSqFt;
    }

    focusSite(lat, lng) {
        this.map.setView([lat, lng], 16);
    }

    updateStats() {
        const critical = this.sites.filter(s => s.priority === 'critical').length;
        const totalArea = this.sites.reduce((sum, s) => sum + s.area, 0);
        const totalCost = this.sites.reduce((sum, s) => sum + this.calculateCost(s), 0);

        document.getElementById('critical-count').textContent = critical;
        document.getElementById('total-area').textContent = totalArea.toLocaleString();
        document.getElementById('est-cost').textContent = '$' + totalCost.toLocaleString();
    }

    setupEventListeners() {
        document.getElementById('analyze-btn').addEventListener('click', () => {
            this.renderSites();
        });

        document.getElementById('temp-threshold').addEventListener('input', (e) => {
            this.threshold = parseInt(e.target.value);
            document.getElementById('temp-val').textContent = this.threshold + '°F';
        });

        ['layer-roads', 'layer-sidewalks', 'layer-parking'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                this.renderSites();
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

        document.getElementById('export-btn').addEventListener('click', () => {
            alert('Export functionality - Download retrofit priority report');
        });
    }
}

let pavementRetrofit;
document.addEventListener('DOMContentLoaded', () => {
    pavementRetrofit = new PavementRetrofit();
});
