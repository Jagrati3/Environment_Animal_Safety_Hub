/**
 * Pollinator Habitat Tracker - JavaScript Implementation
 * Comprehensive dashboard for monitoring pollinator activity and habitat health
 */

// Main Application Class
class PollinatorHabitatTracker {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.charts = {};
        this.map = null;
        this.pollinatorData = null;
        this.weatherData = null;
        this.alerts = [];
        this.recommendations = [];

        this.init();
    }

    async init() {
        this.setupTheme();
        this.setupEventListeners();
        this.updateCurrentDate();
        await this.loadData();
        this.initializeCharts();
        this.initializeMap();
        this.updateDashboard();
        this.startRealTimeUpdates();
    }

    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
    }

    setupEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Sidebar navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.getAttribute('href').substring(1);
                this.scrollToSection(section);
                this.updateActiveNavItem(section);
                // Close sidebar on mobile after navigation
                if (window.innerWidth <= 768) {
                    this.closeSidebar();
                }
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Map layer buttons
        const layerBtns = document.querySelectorAll('.layer-btn');
        layerBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchMapLayer(e.target));
        });

        // Export buttons
        const exportBtns = document.querySelectorAll('.export-btn');
        exportBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.exportData(e.target.dataset.format));
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.setupTheme();
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-toggle-btn i');
        const themeText = document.querySelector('.theme-toggle-btn span');
        if (themeIcon && themeText) {
            if (this.currentTheme === 'light') {
                themeIcon.className = 'fas fa-moon';
                themeText.textContent = 'Dark Mode';
            } else {
                themeIcon.className = 'fas fa-sun';
                themeText.textContent = 'Light Mode';
            }
        }
    }

    toggleSidebar() {
        const appContainer = document.querySelector('.app-container');
        const sidebar = document.querySelector('.sidebar');
        
        if (window.innerWidth <= 768) {
            // Mobile: toggle sidebar visibility
            appContainer.classList.toggle('sidebar-open');
        } else {
            // Desktop: toggle collapsed state
            sidebar.classList.toggle('collapsed');
            appContainer.classList.toggle('sidebar-collapsed');
        }
    }

    closeSidebar() {
        const appContainer = document.querySelector('.app-container');
        appContainer.classList.remove('sidebar-open');
    }

    updateActiveNavItem(sectionId) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    }

    updateCurrentDate() {
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            dateElement.textContent = now.toLocaleDateString('en-US', options);
        }
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }

        // Update active nav item
        this.updateActiveNavItem(sectionId);
    }

    async loadData() {
        try {
            // Simulate API calls for data loading
            this.pollinatorData = await this.generatePollinatorData();
            this.weatherData = await this.generateWeatherData();
            this.alerts = await this.generateAlerts();
            this.recommendations = await this.generateRecommendations();
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    async generatePollinatorData() {
        // Simulate real-time pollinator monitoring data
        const species = ['Honey Bee', 'Bumble Bee', 'Butterfly', 'Hoverfly', 'Solitary Bees'];
        const data = {};

        species.forEach(species => {
            data[species] = {
                count: Math.floor(Math.random() * 100) + 20,
                trend: ['increasing', 'stable', 'decreasing'][Math.floor(Math.random() * 3)],
                status: ['least-concern', 'near-threatened', 'endangered'][Math.floor(Math.random() * 3)],
                activity: Array.from({length: 24}, () => Math.floor(Math.random() * 50) + 10)
            };
        });

        return data;
    }

    async generateWeatherData() {
        return {
            temperature: 18 + Math.random() * 12, // 18-30°C
            humidity: 40 + Math.random() * 40, // 40-80%
            windSpeed: Math.random() * 15, // 0-15 km/h
            conditions: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
            forecast: 'Optimal conditions for pollinator activity expected for the next 2-3 hours.'
        };
    }

    async generateAlerts() {
        return [
            {
                type: 'urgent',
                icon: '🌸',
                category: 'Planting Alert',
                title: 'Spring Wildflower Planting Season',
                message: 'Optimal time to plant crocus, daffodils, and early blooming flowers. These provide essential early-season nectar for emerging queen bumblebees.',
                date: 'March 15, 2026',
                actions: ['View Planting Guide', 'Add to Calendar']
            },
            {
                type: 'info',
                icon: '🐝',
                category: 'Activity Alert',
                title: 'Bumblebee Emergence Peak',
                message: 'Queen bumblebees are emerging from hibernation. Ensure nesting sites are available and avoid pesticide application in flowering areas.',
                date: 'March 10, 2026',
                actions: ['Nesting Site Guide', 'Monitor Activity']
            },
            {
                type: 'warning',
                icon: '⚠️',
                category: 'Weather Alert',
                title: 'Cold Snap Warning',
                message: 'Temperatures dropping below 5°C may affect early-emerging pollinators. Consider providing supplemental feeding stations.',
                date: 'March 8, 2026',
                actions: ['Feeding Guide', 'Weather Details']
            },
            {
                type: 'success',
                icon: '✅',
                category: 'Success Alert',
                title: 'Habitat Improvement Complete',
                message: 'Wildflower meadow restoration in Zone A is complete. Pollinator activity has increased by 34% in the area.',
                date: 'March 5, 2026',
                actions: ['View Results', 'Share Success']
            }
        ];
    }

    async generateRecommendations() {
        return [
            {
                priority: 'high',
                title: 'Install Bee Hotels',
                description: 'Add solitary bee nesting sites to areas with limited natural cavities. Bee hotels provide safe nesting opportunities for mason bees and leafcutter bees.',
                impact: 'High',
                cost: 'Low',
                time: '1-2 hours',
                action: 'Get Installation Guide'
            },
            {
                priority: 'medium',
                title: 'Create Wildflower Meadow',
                description: 'Convert lawn areas to wildflower meadows using native pollinator-friendly plants. This provides diverse nectar sources throughout the season.',
                impact: 'Very High',
                cost: 'Medium',
                time: '2-3 weeks',
                action: 'View Seed Mix Guide'
            },
            {
                priority: 'medium',
                title: 'Reduce Pesticide Use',
                description: 'Implement integrated pest management practices and avoid broad-spectrum pesticides during bloom periods. Use targeted treatments when necessary.',
                impact: 'High',
                cost: 'Low',
                time: 'Ongoing',
                action: 'IPM Resources'
            },
            {
                priority: 'low',
                title: 'Install Water Features',
                description: 'Add shallow water sources with landing areas for pollinators. Clean water is essential for bee survival, especially during hot, dry periods.',
                impact: 'Medium',
                cost: 'Low',
                time: '2-4 hours',
                action: 'Water Feature Guide'
            },
            {
                priority: 'high',
                title: 'Plant Native Species',
                description: 'Focus on native plants that have co-evolved with local pollinators. These provide better nutrition and support more diverse pollinator communities.',
                impact: 'Very High',
                cost: 'Medium',
                time: 'Seasonal',
                action: 'Native Plant Database'
            },
            {
                priority: 'low',
                title: 'Monitor Pollinator Activity',
                description: 'Set up regular monitoring points to track pollinator populations and activity patterns. Use this data to measure the success of habitat improvements.',
                impact: 'Medium',
                cost: 'Low',
                time: '15-30 min/week',
                action: 'Monitoring Guide'
            }
        ];
    }

    initializeCharts() {
        this.initializeActivityChart();
        this.initializePopulationTrendsChart();
        this.initializeSpeciesDiversityChart();
        this.initializeHabitatQualityChart();
    }

    initializeActivityChart() {
        const ctx = document.getElementById('activity-chart');
        if (!ctx) return;

        const data = this.generateActivityData();

        this.charts.activity = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Pollinator Activity',
                    data: data.values,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }

    generateActivityData() {
        const hours = [];
        const values = [];

        for (let i = 0; i < 24; i++) {
            hours.push(`${i}:00`);
            // Simulate activity pattern (higher during day, lower at night)
            const baseActivity = i >= 6 && i <= 18 ? 30 + Math.random() * 40 : 5 + Math.random() * 15;
            values.push(Math.floor(baseActivity));
        }

        return { labels: hours, values };
    }

    initializePopulationTrendsChart() {
        const ctx = document.getElementById('population-trends-chart');
        if (!ctx) return;

        const data = this.generatePopulationTrendsData();

        this.charts.population = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: data.datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    generatePopulationTrendsData() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const datasets = [
            {
                label: 'Honey Bees',
                data: months.map(() => Math.floor(Math.random() * 50) + 70),
                borderColor: '#FF9800',
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                tension: 0.4
            },
            {
                label: 'Bumble Bees',
                data: months.map(() => Math.floor(Math.random() * 40) + 50),
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                tension: 0.4
            },
            {
                label: 'Butterflies',
                data: months.map(() => Math.floor(Math.random() * 30) + 30),
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4
            }
        ];

        return { labels: months, datasets };
    }

    initializeSpeciesDiversityChart() {
        const ctx = document.getElementById('species-diversity-chart');
        if (!ctx) return;

        const data = this.generateSpeciesDiversityData();

        this.charts.diversity = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: [
                        '#FF9800',
                        '#2196F3',
                        '#4CAF50',
                        '#9C27B0',
                        '#FF5722'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    generateSpeciesDiversityData() {
        return {
            labels: ['Honey Bees', 'Bumble Bees', 'Butterflies', 'Hoverflies', 'Other Species'],
            values: [35, 28, 18, 12, 7]
        };
    }

    initializeHabitatQualityChart() {
        const ctx = document.getElementById('habitat-quality-chart');
        if (!ctx) return;

        const data = this.generateHabitatQualityData();

        this.charts.habitat = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Habitat Quality Score',
                    data: data.values,
                    backgroundColor: data.colors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    generateHabitatQualityData() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const values = months.map(() => Math.floor(Math.random() * 30) + 60);
        const colors = values.map(value => {
            if (value >= 85) return '#4CAF50';
            if (value >= 70) return '#8BC34A';
            if (value >= 55) return '#FFC107';
            return '#FF5722';
        });

        return { labels: months, values, colors };
    }

    initializeMap() {
        const mapElement = document.getElementById('habitat-map');
        if (!mapElement || typeof L === 'undefined') return;

        // Initialize map centered on a sample location
        this.map = L.map('habitat-map').setView([40.7128, -74.0060], 12);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Add habitat zones
        this.addHabitatZones();

        // Add species markers
        this.addSpeciesMarkers();
    }

    addHabitatZones() {
        const zones = [
            {
                name: 'North Meadow',
                bounds: [[40.72, -74.01], [40.73, -74.00]],
                quality: 'excellent',
                description: 'High-quality wildflower meadow with diverse nectar sources'
            },
            {
                name: 'East Woodland',
                bounds: [[40.71, -73.99], [40.72, -73.98]],
                quality: 'good',
                description: 'Mixed woodland with native flowering trees'
            },
            {
                name: 'South Field',
                bounds: [[40.70, -74.01], [40.71, -74.00]],
                quality: 'moderate',
                description: 'Agricultural field with potential for improvement'
            }
        ];

        zones.forEach(zone => {
            const color = this.getQualityColor(zone.quality);
            const polygon = L.polygon(zone.bounds, {
                color: color,
                fillColor: color,
                fillOpacity: 0.3,
                weight: 2
            }).addTo(this.map);

            polygon.bindPopup(`
                <h3>${zone.name}</h3>
                <p>${zone.description}</p>
                <p><strong>Quality:</strong> ${zone.quality.charAt(0).toUpperCase() + zone.quality.slice(1)}</p>
            `);
        });
    }

    addSpeciesMarkers() {
        const species = [
            { name: 'Honey Bee Colony', lat: 40.715, lng: -74.005, type: 'bees' },
            { name: 'Bumble Bee Nest', lat: 40.718, lng: -74.008, type: 'bees' },
            { name: 'Monarch Butterfly', lat: 40.712, lng: -73.998, type: 'butterfly' },
            { name: 'Hoverfly Swarm', lat: 40.708, lng: -74.003, type: 'hoverfly' }
        ];

        species.forEach(specimen => {
            const icon = this.getSpeciesIcon(specimen.type);
            const marker = L.marker([specimen.lat, specimen.lng], { icon }).addTo(this.map);

            marker.bindPopup(`
                <h4>${specimen.name}</h4>
                <p>Species: ${specimen.type.charAt(0).toUpperCase() + specimen.type.slice(1)}</p>
                <p>Last observed: ${new Date().toLocaleDateString()}</p>
            `);
        });
    }

    getQualityColor(quality) {
        const colors = {
            excellent: '#4CAF50',
            good: '#8BC34A',
            moderate: '#FFC107',
            poor: '#FF5722'
        };
        return colors[quality] || '#9E9E9E';
    }

    getSpeciesIcon(type) {
        const icons = {
            bees: L.divIcon({
                html: '🐝',
                className: 'species-icon',
                iconSize: [30, 30]
            }),
            butterfly: L.divIcon({
                html: '🦋',
                className: 'species-icon',
                iconSize: [30, 30]
            }),
            hoverfly: L.divIcon({
                html: '🪰',
                className: 'species-icon',
                iconSize: [30, 30]
            })
        };
        return icons[type] || icons.bees;
    }

    switchMapLayer(button) {
        // Remove active class from all buttons
        document.querySelectorAll('.layer-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to clicked button
        button.classList.add('active');

        const layer = button.dataset.layer;

        // In a real implementation, this would switch map layers
        console.log(`Switched to layer: ${layer}`);
    }

    updateDashboard() {
        this.updateStats();
        this.updateSpeciesDistribution();
        this.updateHabitatHealth();
        this.updateWeatherInfo();
        this.updateAlerts();
        this.updateRecommendations();
        this.updateProgress();
    }

    updateStats() {
        const stats = {
            'active-pollinators': Math.floor(Math.random() * 100) + 200,
            'habitat-score': (Math.random() * 2 + 8).toFixed(1),
            'biodiversity-index': Math.floor(Math.random() * 20 + 80) + '%',
            'planted-species': Math.floor(Math.random() * 50) + 100
        };

        Object.entries(stats).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    updateSpeciesDistribution() {
        const species = document.querySelectorAll('.species-item');
        species.forEach(item => {
            const countElement = item.querySelector('.species-count');
            const barElement = item.querySelector('.species-bar-fill');

            if (countElement && barElement) {
                const count = Math.floor(Math.random() * 50) + 20;
                const percentage = (count / 100) * 100; // Assuming max 100 for scaling

                countElement.textContent = count;
                barElement.style.width = `${Math.min(percentage, 100)}%`;
            }
        });
    }

    updateHabitatHealth() {
        const indicators = [
            { id: 'flower-diversity', value: Math.floor(Math.random() * 20 + 75) },
            { id: 'nesting-sites', value: Math.floor(Math.random() * 20 + 60) },
            { id: 'water-sources', value: Math.floor(Math.random() * 20 + 55) },
            { id: 'pesticide-risk', value: Math.floor(Math.random() * 30 + 30) }
        ];

        indicators.forEach(indicator => {
            const bar = document.querySelector(`[data-indicator="${indicator.id}"] .indicator-fill`);
            const value = document.querySelector(`[data-indicator="${indicator.id}"] .indicator-value`);

            if (bar && value) {
                bar.style.width = `${indicator.value}%`;
                value.textContent = `${indicator.value}%`;
            }
        });
    }

    updateWeatherInfo() {
        if (!this.weatherData) return;

        const tempElement = document.querySelector('.metric-value');
        const humidityElement = document.querySelectorAll('.metric-value')[1];
        const windElement = document.querySelectorAll('.metric-value')[2];
        const conditionsElement = document.querySelectorAll('.metric-value')[3];
        const predictionElement = document.querySelector('.prediction-text');

        if (tempElement) tempElement.textContent = `${Math.round(this.weatherData.temperature)}°C`;
        if (humidityElement) humidityElement.textContent = `${Math.round(this.weatherData.humidity)}%`;
        if (windElement) windElement.textContent = `${Math.round(this.weatherData.windSpeed)} km/h`;
        if (conditionsElement) conditionsElement.textContent = this.weatherData.conditions;
        if (predictionElement) predictionElement.textContent = this.weatherData.forecast;
    }

    updateAlerts() {
        // Alerts are static in this implementation
        // In a real app, this would fetch from an API
    }

    updateRecommendations() {
        // Recommendations are static in this implementation
        // In a real app, this would be dynamic based on habitat analysis
    }

    updateProgress() {
        const progressItems = [
            { selector: '.progress-fill', values: [67, 82, 91] }
        ];

        progressItems.forEach(item => {
            const fills = document.querySelectorAll(item.selector);
            fills.forEach((fill, index) => {
                if (item.values[index]) {
                    fill.style.width = `${item.values[index]}%`;
                }
            });
        });
    }

    updateTimeRange(range) {
        // Update activity chart based on time range
        if (this.charts.activity) {
            let dataPoints = 24; // 1 hour
            if (range === '24h') dataPoints = 24;
            else if (range === '7d') dataPoints = 7 * 24;
            else if (range === '30d') dataPoints = 30 * 24;

            // Generate new data for the selected range
            const newData = this.generateActivityDataForRange(dataPoints);
            this.charts.activity.data.labels = newData.labels;
            this.charts.activity.data.datasets[0].data = newData.values;
            this.charts.activity.update();
        }
    }

    generateActivityDataForRange(points) {
        const labels = [];
        const values = [];

        for (let i = 0; i < points; i++) {
            if (points <= 24) {
                labels.push(`${i}:00`);
            } else if (points <= 168) { // 7 days
                labels.push(`Day ${Math.floor(i / 24) + 1} ${i % 24}:00`);
            } else {
                labels.push(`Day ${Math.floor(i / 24) + 1}`);
            }

            const baseActivity = (i % 24) >= 6 && (i % 24) <= 18 ? 30 + Math.random() * 40 : 5 + Math.random() * 15;
            values.push(Math.floor(baseActivity));
        }

        return { labels, values };
    }

    exportData(format) {
        const data = {
            timestamp: new Date().toISOString(),
            pollinatorData: this.pollinatorData,
            weatherData: this.weatherData,
            alerts: this.alerts,
            recommendations: this.recommendations
        };

        switch (format) {
            case 'csv':
                this.exportAsCSV(data);
                break;
            case 'json':
                this.exportAsJSON(data);
                break;
            case 'pdf':
                this.exportAsPDF(data);
                break;
            case 'api':
                this.showAPIInfo();
                break;
        }
    }

    exportAsCSV(data) {
        // Simple CSV export implementation
        let csv = 'Timestamp,Pollinator Type,Count,Trend,Status\n';

        Object.entries(data.pollinatorData).forEach(([species, info]) => {
            csv += `${data.timestamp},"${species}",${info.count},"${info.trend}","${info.status}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        this.downloadBlob(blob, 'pollinator-data.csv');
    }

    exportAsJSON(data) {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        this.downloadBlob(blob, 'pollinator-data.json');
    }

    exportAsPDF(data) {
        // In a real implementation, this would use a PDF library like jsPDF
        alert('PDF export functionality would be implemented with a PDF generation library.');
    }

    showAPIInfo() {
        alert('API endpoints:\n- GET /api/pollinator-data\n- GET /api/weather-data\n- GET /api/alerts\n- GET /api/recommendations');
    }

    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    startRealTimeUpdates() {
        // Update dashboard every 30 seconds
        setInterval(() => {
            this.updateStats();
            this.updateSpeciesDistribution();
            this.updateHabitatHealth();
        }, 30000);

        // Update weather every 5 minutes
        setInterval(async () => {
            this.weatherData = await this.generateWeatherData();
            this.updateWeatherInfo();
        }, 300000);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PollinatorHabitatTracker();
});

// Add CSS for species icons
const style = document.createElement('style');
style.textContent = `
    .species-icon {
        font-size: 24px;
        text-align: center;
        line-height: 30px;
    }
`;
document.head.appendChild(style);