// Urban Ventilation Dead-Zone Mapper
class VentilationMapper {
    constructor() {
        this.map = null;
        this.zones = [];
        this.windDir = 'N';
        this.windSpeed = 10;
        this.density = 'high';
        this.temp = 85;
        this.selectedZone = null;
        this.charts = {};
        this.init();
    }

    init() {
        this.initMap();
        this.generateZones();
        this.setupEventListeners();
        this.runAnalysis();
        this.initCharts();
    }

    initMap() {
        this.map = L.map('vent-map').setView([40.7128, -74.0060], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(this.map);
    }

    generateZones() {
        const base = [40.7128, -74.0060];
        for (let i = 0; i < 30; i++) {
            const lat = base[0] + (Math.random() - 0.5) * 0.03;
            const lng = base[1] + (Math.random() - 0.5) * 0.03;
            const buildingHeight = Math.random() * 100 + 20;
            const streetWidth = Math.random() * 30 + 10;
            
            this.zones.push({
                id: `zone_${i}`,
                name: `Zone ${i + 1}`,
                lat: lat,
                lng: lng,
                buildingHeight: buildingHeight,
                streetWidth: streetWidth,
                orientation: Math.random() * 360,
                ventilation: 0,
                risk: 'unknown'
            });
        }
    }

    runAnalysis() {
        this.zones.forEach(zone => {
            zone.ventilation = this.calculateVentilation(zone);
            zone.risk = this.getRiskLevel(zone.ventilation);
        });
        
        this.renderZones();
        this.updateStats();
        this.updateCharts();
        this.updateWindCompass();
    }

    calculateVentilation(zone) {
        const hwRatio = zone.buildingHeight / zone.streetWidth;
        const densityFactor = this.density === 'high' ? 0.6 : this.density === 'medium' ? 0.8 : 1.0;
        const windFactor = this.windSpeed / 30;
        const orientationFactor = Math.abs(Math.cos((zone.orientation - this.getWindAngle()) * Math.PI / 180));
        
        let ventilation = 100 * densityFactor * windFactor * orientationFactor;
        ventilation = ventilation / (1 + hwRatio * 0.5);
        
        return Math.max(0, Math.min(100, ventilation));
    }

    getWindAngle() {
        const angles = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 };
        return angles[this.windDir] || 0;
    }

    getRiskLevel(ventilation) {
        if (ventilation < 20) return 'critical';
        if (ventilation < 40) return 'poor';
        if (ventilation < 60) return 'moderate';
        if (ventilation < 80) return 'good';
        return 'excellent';
    }

    getColor(risk) {
        const colors = {
            critical: '#8B0000',
            poor: '#DC143C',
            moderate: '#FF8C00',
            good: '#FFD700',
            excellent: '#32CD32'
        };
        return colors[risk] || '#999';
    }

    renderZones() {
        this.map.eachLayer(layer => {
            if (layer instanceof L.Circle) layer.remove();
        });

        this.zones.forEach(zone => {
            if (!this.shouldShowZone(zone)) return;

            const radius = zone.risk === 'critical' ? 150 : 100;
            const circle = L.circle([zone.lat, zone.lng], {
                radius: radius,
                fillColor: this.getColor(zone.risk),
                color: '#fff',
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.6
            });

            circle.on('click', () => this.selectZone(zone));
            circle.bindPopup(this.createPopup(zone));
            circle.addTo(this.map);
        });
    }

    shouldShowZone(zone) {
        if (zone.risk === 'critical' && !document.getElementById('layer-deadzones').checked) return false;
        return true;
    }

    createPopup(zone) {
        return `
            <strong>${zone.name}</strong><br>
            Ventilation: ${zone.ventilation.toFixed(1)}%<br>
            Risk: ${zone.risk.toUpperCase()}<br>
            H/W Ratio: ${(zone.buildingHeight / zone.streetWidth).toFixed(2)}
        `;
    }

    selectZone(zone) {
        this.selectedZone = zone;
        this.displayZoneInfo(zone);
        this.displaySolutions(zone);
    }

    displayZoneInfo(zone) {
        const container = document.getElementById('zone-info');
        const hwRatio = (zone.buildingHeight / zone.streetWidth).toFixed(2);
        const heatRisk = this.calculateHeatRisk(zone);
        const pollutionRisk = this.calculatePollutionRisk(zone);

        container.innerHTML = `
            <div class="zone-detail">
                <h4>${zone.name}</h4>
                <span class="risk-badge ${zone.risk}">${zone.risk.toUpperCase()}</span>
                
                <div class="detail-row">
                    <span>Ventilation Index</span>
                    <strong>${zone.ventilation.toFixed(1)}%</strong>
                </div>
                <div class="detail-row">
                    <span>Building Height</span>
                    <span>${zone.buildingHeight.toFixed(0)}m</span>
                </div>
                <div class="detail-row">
                    <span>Street Width</span>
                    <span>${zone.streetWidth.toFixed(0)}m</span>
                </div>
                <div class="detail-row">
                    <span>H/W Ratio</span>
                    <span>${hwRatio}</span>
                </div>
                <div class="detail-row">
                    <span>Heat Trap Risk</span>
                    <span class="risk-badge ${heatRisk}">${heatRisk.toUpperCase()}</span>
                </div>
                <div class="detail-row">
                    <span>Pollution Risk</span>
                    <span class="risk-badge ${pollutionRisk}">${pollutionRisk.toUpperCase()}</span>
                </div>
            </div>
        `;
    }

    calculateHeatRisk(zone) {
        const tempFactor = (this.temp - 70) / 40;
        const ventFactor = (100 - zone.ventilation) / 100;
        const risk = (tempFactor + ventFactor) / 2;
        
        if (risk > 0.7) return 'critical';
        if (risk > 0.5) return 'poor';
        if (risk > 0.3) return 'moderate';
        return 'good';
    }

    calculatePollutionRisk(zone) {
        if (zone.ventilation < 30) return 'critical';
        if (zone.ventilation < 50) return 'poor';
        if (zone.ventilation < 70) return 'moderate';
        return 'good';
    }

    displaySolutions(zone) {
        const container = document.getElementById('solutions');
        const solutions = this.generateSolutions(zone);

        let html = '';
        solutions.forEach(sol => {
            html += `
                <div class="solution-card">
                    <h5><i class="fas fa-${sol.icon}"></i> ${sol.title}</h5>
                    <p>${sol.description}</p>
                    <span class="impact-tag">${sol.impact}</span>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    generateSolutions(zone) {
        const solutions = [];

        if (zone.ventilation < 40) {
            solutions.push({
                icon: 'building',
                title: 'Building Design Modifications',
                description: 'Implement wind corridors, setbacks, and permeable building designs to improve airflow.',
                impact: '+20-30% ventilation'
            });

            solutions.push({
                icon: 'tree',
                title: 'Strategic Green Infrastructure',
                description: 'Plant trees to channel wind and create vertical air mixing without blocking horizontal flow.',
                impact: '+15% airflow + cooling'
            });
        }

        if (zone.streetWidth < 20) {
            solutions.push({
                icon: 'road',
                title: 'Street Widening or Redesign',
                description: 'Increase street width or create pedestrian zones to improve H/W ratio.',
                impact: '+25% ventilation'
            });
        }

        solutions.push({
            icon: 'wind',
            title: 'Mechanical Ventilation',
            description: 'Install street-level fans or air circulation systems in critical dead zones.',
            impact: '+10-15% local airflow'
        });

        solutions.push({
            icon: 'paint-brush',
            title: 'Cool Surface Materials',
            description: 'Use reflective pavements and cool roofs to reduce heat accumulation.',
            impact: 'Reduces heat by 5-10°F'
        });

        return solutions;
    }

    updateStats() {
        const deadZones = this.zones.filter(z => z.risk === 'critical').length;
        const avgVent = this.zones.reduce((sum, z) => sum + z.ventilation, 0) / this.zones.length;
        const riskAreas = this.zones.filter(z => z.risk === 'critical' || z.risk === 'poor').length;

        document.getElementById('dead-zones').textContent = deadZones;
        document.getElementById('avg-airflow').textContent = avgVent.toFixed(1) + '%';
        document.getElementById('risk-areas').textContent = riskAreas;
    }

    updateWindCompass() {
        const angle = this.getWindAngle();
        const arrow = document.querySelector('.compass-arrow');
        arrow.style.transform = `rotate(${angle}deg)`;
    }

    initCharts() {
        const ventCtx = document.getElementById('vent-chart').getContext('2d');
        this.charts.vent = new Chart(ventCtx, {
            type: 'doughnut',
            data: {
                labels: ['Critical', 'Poor', 'Moderate', 'Good', 'Excellent'],
                datasets: [{
                    data: [0, 0, 0, 0, 0],
                    backgroundColor: ['#8B0000', '#DC143C', '#FF8C00', '#FFD700', '#32CD32']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });

        const dirCtx = document.getElementById('direction-chart').getContext('2d');
        this.charts.direction = new Chart(dirCtx, {
            type: 'bar',
            data: {
                labels: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
                datasets: [{
                    label: 'Avg Ventilation %',
                    data: [65, 58, 52, 48, 55, 62, 70, 68],
                    backgroundColor: '#1976D2'
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });

        this.updateCharts();
    }

    updateCharts() {
        const counts = {
            critical: this.zones.filter(z => z.risk === 'critical').length,
            poor: this.zones.filter(z => z.risk === 'poor').length,
            moderate: this.zones.filter(z => z.risk === 'moderate').length,
            good: this.zones.filter(z => z.risk === 'good').length,
            excellent: this.zones.filter(z => z.risk === 'excellent').length
        };

        this.charts.vent.data.datasets[0].data = [
            counts.critical, counts.poor, counts.moderate, counts.good, counts.excellent
        ];
        this.charts.vent.update();
    }

    setupEventListeners() {
        document.getElementById('analyze-btn').addEventListener('click', () => {
            this.windDir = document.getElementById('wind-direction').value;
            this.windSpeed = parseInt(document.getElementById('wind-speed').value);
            this.density = document.getElementById('density-level').value;
            this.temp = parseInt(document.getElementById('temp-input').value);
            this.runAnalysis();
        });

        document.getElementById('wind-speed').addEventListener('input', (e) => {
            document.getElementById('wind-speed-val').textContent = e.target.value + ' mph';
        });

        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });

        ['layer-deadzones', 'layer-airflow', 'layer-buildings', 'layer-pollution', 'layer-heat'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                this.renderZones();
            });
        });

        document.getElementById('info-btn').addEventListener('click', () => {
            document.getElementById('info-modal').classList.remove('hidden');
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('info-modal').classList.add('hidden');
        });

        document.getElementById('info-modal').addEventListener('click', (e) => {
            if (e.target.id === 'info-modal') {
                document.getElementById('info-modal').classList.add('hidden');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new VentilationMapper();
});
