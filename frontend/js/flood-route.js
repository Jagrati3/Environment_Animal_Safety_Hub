// Flood-Safe Route Predictor
class FloodRoutePredictor {
    constructor() {
        this.map = null;
        this.rainfall = 20;
        this.duration = 2;
        this.floodPoints = [];
        this.routes = [];
        this.init();
    }

    init() {
        this.initMap();
        this.generateFloodData();
        this.setupEventListeners();
    }

    initMap() {
        this.map = L.map('flood-map').setView([40.7128, -74.0060], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(this.map);
    }

    generateFloodData() {
        const base = [40.7128, -74.0060];
        for (let i = 0; i < 50; i++) {
            const lat = base[0] + (Math.random() - 0.5) * 0.05;
            const lng = base[1] + (Math.random() - 0.5) * 0.05;
            this.floodPoints.push({
                lat, lng,
                elevation: Math.random() * 50,
                drainageCapacity: Math.random() * 100,
                historicalFloods: Math.floor(Math.random() * 10),
                risk: 'unknown'
            });
        }
        this.updateFloodRisk();
        this.renderFloodPoints();
    }

    updateFloodRisk() {
        this.floodPoints.forEach(point => {
            const elevationFactor = (50 - point.elevation) / 50;
            const drainageFactor = (100 - point.drainageCapacity) / 100;
            const rainfallFactor = this.rainfall / 100;
            const historyFactor = point.historicalFloods / 10;
            
            const riskScore = (elevationFactor * 0.3 + drainageFactor * 0.3 + 
                             rainfallFactor * 0.25 + historyFactor * 0.15) * 100;
            
            point.riskScore = riskScore;
            point.risk = this.getRiskLevel(riskScore);
        });
    }

    getRiskLevel(score) {
        if (score < 20) return 'safe';
        if (score < 40) return 'low';
        if (score < 60) return 'moderate';
        if (score < 80) return 'high';
        return 'critical';
    }

    getColor(risk) {
        const colors = {
            safe: '#32CD32',
            low: '#FFD700',
            moderate: '#FF8C00',
            high: '#DC143C',
            critical: '#8B0000'
        };
        return colors[risk] || '#999';
    }

    renderFloodPoints() {
        this.map.eachLayer(layer => {
            if (layer instanceof L.Circle) layer.remove();
        });

        this.floodPoints.forEach(point => {
            const circle = L.circle([point.lat, point.lng], {
                radius: 100,
                fillColor: this.getColor(point.risk),
                color: '#fff',
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.6
            });

            circle.bindPopup(`
                <strong>Risk: ${point.risk.toUpperCase()}</strong><br>
                Elevation: ${point.elevation.toFixed(1)}m<br>
                Drainage: ${point.drainageCapacity.toFixed(0)}%<br>
                Historical Floods: ${point.historicalFloods}
            `);

            circle.addTo(this.map);
        });
    }

    findRoute() {
        const start = document.getElementById('start-location').value;
        const end = document.getElementById('end-location').value;

        if (!start || !end) {
            alert('Please enter both start and end locations');
            return;
        }

        this.calculateRoutes(start, end);
    }

    calculateRoutes(start, end) {
        const routes = [
            { name: 'Safest Route', distance: 8.5, time: 22, risk: 15, floodPoints: 1 },
            { name: 'Fastest Route', distance: 6.2, time: 15, risk: 65, floodPoints: 4 },
            { name: 'Balanced Route', distance: 7.3, time: 18, risk: 35, floodPoints: 2 }
        ];

        this.routes = routes;
        this.displayRouteDetails(routes[0]);
        this.displayAlternatives(routes);
        this.updateStats(routes[0]);
    }

    displayRouteDetails(route) {
        const container = document.getElementById('route-details');
        container.innerHTML = `
            <div class="route-step">
                <h4>${route.name}</h4>
                <p>Distance: ${route.distance} km</p>
                <p>Est. Time: ${route.time} min</p>
                <p>Risk Score: ${route.risk}/100</p>
            </div>
            <div class="route-step ${route.risk > 50 ? 'warning' : ''}">
                <h4>Route Analysis</h4>
                <p>This route passes through ${route.floodPoints} flood-prone area(s).</p>
                <p>${route.risk < 30 ? 'Safe to travel' : route.risk < 60 ? 'Exercise caution' : 'High risk - consider alternatives'}</p>
            </div>
        `;
    }

    displayAlternatives(routes) {
        const container = document.getElementById('alternatives');
        let html = '';
        routes.forEach((route, i) => {
            html += `
                <div class="route-step ${route.risk > 60 ? 'danger' : route.risk > 40 ? 'warning' : ''}">
                    <h4>${route.name}</h4>
                    <p>Distance: ${route.distance} km | Time: ${route.time} min</p>
                    <p>Risk: ${route.risk}/100 | Flood Points: ${route.floodPoints}</p>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    updateStats(route) {
        document.getElementById('route-distance').textContent = route.distance + ' km';
        document.getElementById('route-time').textContent = route.time + ' min';
        document.getElementById('risk-score').textContent = route.risk + '/100';
        document.getElementById('flood-points').textContent = route.floodPoints;
    }

    showWarnings() {
        const container = document.getElementById('warnings');
        const criticalPoints = this.floodPoints.filter(p => p.risk === 'critical' || p.risk === 'high');
        
        if (criticalPoints.length === 0) {
            container.innerHTML = '<p class="placeholder">No critical warnings</p>';
            return;
        }

        let html = '';
        criticalPoints.slice(0, 5).forEach(point => {
            html += `
                <div class="warning-card">
                    <h4>⚠️ ${point.risk.toUpperCase()} Risk Area</h4>
                    <p>Elevation: ${point.elevation.toFixed(1)}m</p>
                    <p>Historical floods: ${point.historicalFloods} times</p>
                    <p>Avoid this area during heavy rain</p>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    setupEventListeners() {
        document.getElementById('find-route').addEventListener('click', () => {
            this.findRoute();
        });

        document.getElementById('rainfall').addEventListener('input', (e) => {
            this.rainfall = parseInt(e.target.value);
            document.getElementById('rainfall-val').textContent = this.rainfall + ' mm/hr';
            this.updateFloodRisk();
            this.renderFloodPoints();
        });

        document.getElementById('duration').addEventListener('change', (e) => {
            this.duration = parseInt(e.target.value);
        });

        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
                if (tab.dataset.tab === 'warnings') this.showWarnings();
            });
        });

        document.getElementById('alert-btn').addEventListener('click', () => {
            this.showAlerts();
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('alert-modal').classList.add('hidden');
        });
    }

    showAlerts() {
        const modal = document.getElementById('alert-modal');
        const list = document.getElementById('alerts-list');
        
        list.innerHTML = `
            <div class="warning-card">
                <h4>🌧️ Heavy Rain Alert</h4>
                <p>Expected rainfall: 40-60 mm/hr</p>
                <p>Duration: 2-4 hours</p>
            </div>
            <div class="warning-card">
                <h4>⚠️ Flood Warning</h4>
                <p>Low-lying areas at risk</p>
                <p>Avoid Main St and Oak Ave</p>
            </div>
        `;
        
        modal.classList.remove('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FloodRoutePredictor();
});
