/**
 * Compost Quality Analyzer - JavaScript Implementation
 * Comprehensive tool for assessing compost quality using scientific parameters
 * Features: C:N ratio calculator, parameter analysis, quality tracking, and educational content
 */

// Compost Quality Analyzer Main Class
class CompostAnalyzer {
    constructor() {
        this.parameters = {
            moisture: { min: 40, max: 60, optimal: 50, unit: '%' },
            temperature: { min: 55, max: 77, optimal: 65, unit: '°C' },
            ph: { min: 6.0, max: 7.5, optimal: 6.8, unit: 'pH' },
            cnRatio: { min: 20, max: 40, optimal: 30, unit: 'ratio' },
            oxygen: { min: 5, max: 20, optimal: 10, unit: '%' },
            ammonia: { max: 0.5, optimal: 0.1, unit: 'ppm' }
        };

        this.qualityThresholds = {
            excellent: { min: 85, color: '#4CAF50' },
            good: { min: 70, color: '#8BC34A' },
            fair: { min: 50, color: '#FFC107' },
            poor: { min: 0, color: '#FF5722' }
        };

        this.decompositionStages = [
            { name: 'Mesophilic', temp: '20-45°C', duration: '2-4 days', description: 'Initial heating phase with beneficial bacteria' },
            { name: 'Thermophilic', temp: '45-77°C', duration: '3-7 days', description: 'High temperature phase killing pathogens and weed seeds' },
            { name: 'Cooling', temp: '45-20°C', duration: '2-4 weeks', description: 'Temperature drops as easily decomposed materials are used up' },
            { name: 'Maturation', temp: 'Ambient', duration: '1-6 months', description: 'Final stabilization and humus formation' }
        ];

        this.currentData = {};
        this.history = [];
        this.init();
    }

    init() {
        this.loadStoredData();
        this.setupEventListeners();
        this.updateDashboard();
        this.initializeCharts();
    }

    loadStoredData() {
        const stored = localStorage.getItem('compostData');
        if (stored) {
            this.currentData = JSON.parse(stored);
        } else {
            this.currentData = this.generateSampleData();
        }

        const history = localStorage.getItem('compostHistory');
        if (history) {
            this.history = JSON.parse(history);
        }
    }

    generateSampleData() {
        return {
            moisture: 52,
            temperature: 62,
            ph: 6.8,
            cnRatio: 28,
            oxygen: 12,
            ammonia: 0.2,
            lastUpdate: new Date().toISOString(),
            quality: 78
        };
    }

    setupEventListeners() {
        // Parameter input changes
        document.querySelectorAll('.parameter-input').forEach(input => {
            input.addEventListener('input', (e) => this.updateParameter(e.target.name, parseFloat(e.target.value)));
        });

        // Quick action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleQuickAction(e.target.closest('.action-btn').dataset.action));
        });

        // Time selector buttons
        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeTimeRange(e.target.dataset.range));
        });

        // Export button
        const exportBtn = document.querySelector('.export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }

        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    updateParameter(name, value) {
        if (isNaN(value)) return;

        this.currentData[name] = value;
        this.currentData.lastUpdate = new Date().toISOString();
        this.calculateQuality();
        this.saveData();
        this.updateDashboard();
    }

    calculateQuality() {
        let totalScore = 0;
        let maxScore = 0;

        Object.keys(this.parameters).forEach(param => {
            const spec = this.parameters[param];
            const value = this.currentData[param];
            let score = 0;

            if (param === 'ammonia') {
                // Lower is better for ammonia
                score = Math.max(0, 100 - (value / spec.max) * 100);
            } else if (param === 'cnRatio') {
                // C:N ratio scoring
                if (value >= spec.min && value <= spec.max) {
                    score = 100;
                } else if (value < spec.min) {
                    score = Math.max(0, 50 - (spec.min - value) * 5);
                } else {
                    score = Math.max(0, 50 - (value - spec.max) * 2);
                }
            } else {
                // Normal range scoring
                if (value >= spec.min && value <= spec.max) {
                    score = 100;
                } else {
                    const distance = Math.min(Math.abs(value - spec.min), Math.abs(value - spec.max));
                    score = Math.max(0, 100 - distance * 10);
                }
            }

            totalScore += score;
            maxScore += 100;
        });

        this.currentData.quality = Math.round((totalScore / maxScore) * 100);
    }

    saveData() {
        localStorage.setItem('compostData', JSON.stringify(this.currentData));

        // Add to history
        this.history.push({
            ...this.currentData,
            timestamp: new Date().toISOString()
        });

        // Keep only last 100 entries
        if (this.history.length > 100) {
            this.history = this.history.slice(-100);
        }

        localStorage.setItem('compostHistory', JSON.stringify(this.history));
    }

    updateDashboard() {
        this.updateQualityGauge();
        this.updateParameterBars();
        this.updateDecompositionStage();
        this.updateStats();
        this.updateCharts();
    }

    updateQualityGauge() {
        const gauge = document.querySelector('.gauge-fill');
        const value = document.querySelector('.gauge-value');
        const quality = this.currentData.quality;

        if (gauge && value) {
            gauge.style.width = `${quality}%`;
            value.textContent = quality;

            // Update color based on quality
            let color = this.qualityThresholds.poor.color;
            if (quality >= this.qualityThresholds.excellent.min) {
                color = this.qualityThresholds.excellent.color;
            } else if (quality >= this.qualityThresholds.good.min) {
                color = this.qualityThresholds.good.color;
            } else if (quality >= this.qualityThresholds.fair.min) {
                color = this.qualityThresholds.fair.color;
            }

            gauge.style.backgroundColor = color;
        }
    }

    updateParameterBars() {
        Object.keys(this.parameters).forEach(param => {
            const value = this.currentData[param];
            const spec = this.parameters[param];
            const bar = document.querySelector(`.parameter-fill[data-param="${param}"]`);
            const status = document.querySelector(`.parameter-status[data-param="${param}"]`);
            const valueDisplay = document.querySelector(`.parameter-value[data-param="${param}"]`);

            if (bar && status && valueDisplay) {
                // Calculate percentage for bar
                let percentage = 0;
                if (param === 'ammonia') {
                    percentage = Math.max(0, 100 - (value / spec.max) * 100);
                } else {
                    const range = spec.max - spec.min;
                    percentage = Math.min(100, Math.max(0, ((value - spec.min) / range) * 100));
                }

                bar.style.width = `${percentage}%`;

                // Determine status
                let statusText = 'Poor';
                let statusClass = 'poor';

                if (param === 'ammonia') {
                    if (value <= spec.optimal) {
                        statusText = 'Optimal';
                        statusClass = 'optimal';
                    } else if (value <= spec.max) {
                        statusText = 'Good';
                        statusClass = 'good';
                    } else {
                        statusText = 'Poor';
                        statusClass = 'poor';
                    }
                } else if (param === 'cnRatio') {
                    if (value >= spec.min && value <= spec.max) {
                        statusText = 'Optimal';
                        statusClass = 'optimal';
                    } else if (value >= spec.min * 0.8 && value <= spec.max * 1.2) {
                        statusText = 'Good';
                        statusClass = 'good';
                    } else {
                        statusText = 'Poor';
                        statusClass = 'poor';
                    }
                } else {
                    if (value >= spec.min && value <= spec.max) {
                        statusText = 'Optimal';
                        statusClass = 'optimal';
                    } else if (value >= spec.min * 0.9 && value <= spec.max * 1.1) {
                        statusText = 'Good';
                        statusClass = 'good';
                    } else {
                        statusText = 'Poor';
                        statusClass = 'poor';
                    }
                }

                status.textContent = statusText;
                status.className = `parameter-status ${statusClass}`;
                valueDisplay.textContent = `${value}${spec.unit}`;
            }
        });
    }

    updateDecompositionStage() {
        const temp = this.currentData.temperature;
        let activeStage = 0;

        if (temp >= 55) {
            activeStage = 1; // Thermophilic
        } else if (temp >= 45) {
            activeStage = 2; // Cooling
        } else if (temp >= 20) {
            activeStage = 0; // Mesophilic
        } else {
            activeStage = 3; // Maturation
        }

        // Update timeline
        document.querySelectorAll('.stage-point').forEach((point, index) => {
            point.classList.toggle('active', index === activeStage);
        });

        // Update description
        const description = document.querySelector('.stage-description');
        if (description) {
            const stage = this.decompositionStages[activeStage];
            description.querySelector('h4').textContent = stage.name;
            description.querySelector('p').textContent = stage.description;
        }
    }

    updateStats() {
        const stats = document.querySelectorAll('.stat-value');
        if (stats.length >= 4) {
            stats[0].textContent = this.currentData.quality;
            stats[1].textContent = this.currentData.temperature + '°C';
            stats[2].textContent = this.currentData.moisture + '%';
            stats[3].textContent = this.currentData.cnRatio + ':1';
        }
    }

    initializeCharts() {
        this.charts = {};
        this.createQualityChart();
        this.createParameterChart();
        this.createTrendChart();
    }

    createQualityChart() {
        const ctx = document.getElementById('qualityChart');
        if (!ctx) return;

        this.charts.quality = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Quality Score', 'Remaining'],
                datasets: [{
                    data: [this.currentData.quality, 100 - this.currentData.quality],
                    backgroundColor: [
                        this.getQualityColor(this.currentData.quality),
                        '#E0E0E0'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.parsed}%`
                        }
                    }
                }
            }
        });
    }

    createParameterChart() {
        const ctx = document.getElementById('parameterChart');
        if (!ctx) return;

        const labels = Object.keys(this.parameters).map(param => {
            return param.charAt(0).toUpperCase() + param.slice(1).replace(/([A-Z])/g, ' $1');
        });

        const data = Object.keys(this.parameters).map(param => this.currentData[param]);

        this.charts.parameter = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Current Values',
                    data: data,
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    borderColor: 'rgba(76, 175, 80, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(76, 175, 80, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(76, 175, 80, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createTrendChart() {
        const ctx = document.getElementById('trendChart');
        if (!ctx) return;

        const recentData = this.history.slice(-30); // Last 30 entries
        const labels = recentData.map(entry => new Date(entry.timestamp).toLocaleDateString());
        const qualityData = recentData.map(entry => entry.quality);

        this.charts.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Quality Score',
                    data: qualityData,
                    borderColor: 'rgba(76, 175, 80, 1)',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true
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
                }
            }
        });
    }

    updateCharts() {
        if (this.charts.quality) {
            this.charts.quality.data.datasets[0].data = [this.currentData.quality, 100 - this.currentData.quality];
            this.charts.quality.data.datasets[0].backgroundColor[0] = this.getQualityColor(this.currentData.quality);
            this.charts.quality.update();
        }

        if (this.charts.parameter) {
            const data = Object.keys(this.parameters).map(param => this.currentData[param]);
            this.charts.parameter.data.datasets[0].data = data;
            this.charts.parameter.update();
        }

        if (this.charts.trend) {
            const recentData = this.history.slice(-30);
            const labels = recentData.map(entry => new Date(entry.timestamp).toLocaleDateString());
            const qualityData = recentData.map(entry => entry.quality);
            this.charts.trend.data.labels = labels;
            this.charts.trend.data.datasets[0].data = qualityData;
            this.charts.trend.update();
        }
    }

    getQualityColor(quality) {
        if (quality >= this.qualityThresholds.excellent.min) {
            return this.qualityThresholds.excellent.color;
        } else if (quality >= this.qualityThresholds.good.min) {
            return this.qualityThresholds.good.color;
        } else if (quality >= this.qualityThresholds.fair.min) {
            return this.qualityThresholds.fair.color;
        } else {
            return this.qualityThresholds.poor.color;
        }
    }

    handleQuickAction(action) {
        switch (action) {
            case 'scan':
                this.performScan();
                break;
            case 'analyze':
                this.showAnalysis();
                break;
            case 'optimize':
                this.showOptimizationTips();
                break;
            case 'export':
                this.exportData();
                break;
        }
    }

    performScan() {
        // Simulate scanning process
        const scanBtn = document.querySelector('.action-btn[data-action="scan"]');
        const originalText = scanBtn.textContent;

        scanBtn.textContent = 'Scanning...';
        scanBtn.disabled = true;

        setTimeout(() => {
            // Generate new random data within reasonable ranges
            this.currentData = {
                moisture: Math.round((40 + Math.random() * 20) * 10) / 10,
                temperature: Math.round((50 + Math.random() * 25) * 10) / 10,
                ph: Math.round((6.0 + Math.random() * 1.5) * 10) / 10,
                cnRatio: Math.round((20 + Math.random() * 20) * 10) / 10,
                oxygen: Math.round((5 + Math.random() * 15) * 10) / 10,
                ammonia: Math.round((Math.random() * 0.5) * 100) / 100,
                lastUpdate: new Date().toISOString()
            };

            this.calculateQuality();
            this.saveData();
            this.updateDashboard();

            scanBtn.textContent = originalText;
            scanBtn.disabled = false;

            this.showNotification('Scan completed! New data loaded.', 'success');
        }, 2000);
    }

    showAnalysis() {
        const analysisSection = document.querySelector('.analysis-results');
        if (analysisSection) {
            analysisSection.scrollIntoView({ behavior: 'smooth' });
            this.showNotification('Analysis results displayed below.', 'info');
        }
    }

    showOptimizationTips() {
        const tipsSection = document.querySelector('.tips-section');
        if (tipsSection) {
            tipsSection.scrollIntoView({ behavior: 'smooth' });
            this.showNotification('Optimization tips displayed below.', 'info');
        }
    }

    exportData() {
        const data = {
            currentData: this.currentData,
            history: this.history,
            parameters: this.parameters,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `compost-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Data exported successfully!', 'success');
    }

    changeTimeRange(range) {
        // Update active button
        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-range="${range}"]`).classList.add('active');

        // Update trend chart based on range
        let days = 7;
        switch (range) {
            case '7d': days = 7; break;
            case '30d': days = 30; break;
            case '90d': days = 90; break;
        }

        const recentData = this.history.slice(-days);
        if (this.charts.trend && recentData.length > 0) {
            const labels = recentData.map(entry => new Date(entry.timestamp).toLocaleDateString());
            const qualityData = recentData.map(entry => entry.quality);
            this.charts.trend.data.labels = labels;
            this.charts.trend.data.datasets[0].data = qualityData;
            this.charts.trend.update();
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update theme icon
        const icon = document.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Hide and remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }
}

// C:N Ratio Calculator Class
class CNCalculator {
    constructor() {
        this.materials = {
            // High Carbon (Browns)
            'straw': { cn: 80, category: 'brown' },
            'sawdust': { cn: 400, category: 'brown' },
            'dry_leaves': { cn: 60, category: 'brown' },
            'cardboard': { cn: 350, category: 'brown' },
            'newspaper': { cn: 175, category: 'brown' },
            'pine_needles': { cn: 80, category: 'brown' },

            // High Nitrogen (Greens)
            'grass_clippings': { cn: 20, category: 'green' },
            'vegetable_scraps': { cn: 15, category: 'green' },
            'fruit_waste': { cn: 35, category: 'green' },
            'coffee_grounds': { cn: 20, category: 'green' },
            'manure_fresh': { cn: 15, category: 'green' },
            'alfalfa_meal': { cn: 12, category: 'green' },

            // Balanced
            'compost': { cn: 20, category: 'balanced' },
            'topsoil': { cn: 10, category: 'balanced' }
        };

        this.init();
    }

    init() {
        this.setupCalculator();
        this.populateMaterialDatabase();
    }

    setupCalculator() {
        const calculateBtn = document.querySelector('.calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateRatio());
        }

        // Auto-calculate on input change
        document.querySelectorAll('.material-input').forEach(input => {
            input.addEventListener('input', () => this.calculateRatio());
        });
    }

    calculateRatio() {
        const materials = {};
        let totalCarbon = 0;
        let totalNitrogen = 0;
        let totalWeight = 0;

        // Collect input values
        document.querySelectorAll('.material-item').forEach(item => {
            const material = item.dataset.material;
            const input = item.querySelector('.material-input');
            const weight = parseFloat(input.value) || 0;

            if (weight > 0 && this.materials[material]) {
                const cn = this.materials[material].cn;
                const carbon = weight * (cn / (cn + 1));
                const nitrogen = weight * (1 / (cn + 1));

                materials[material] = {
                    weight: weight,
                    cn: cn,
                    carbon: carbon,
                    nitrogen: nitrogen
                };

                totalCarbon += carbon;
                totalNitrogen += nitrogen;
                totalWeight += weight;
            }
        });

        if (totalWeight === 0) {
            this.displayResults(null);
            return;
        }

        const overallCN = totalCarbon / totalNitrogen;
        const results = {
            overallCN: overallCN,
            totalWeight: totalWeight,
            totalCarbon: totalCarbon,
            totalNitrogen: totalNitrogen,
            materials: materials,
            assessment: this.assessRatio(overallCN)
        };

        this.displayResults(results);
    }

    assessRatio(ratio) {
        if (ratio >= 25 && ratio <= 35) {
            return { status: 'optimal', message: 'Perfect ratio for composting!', color: '#4CAF50' };
        } else if (ratio >= 20 && ratio <= 40) {
            return { status: 'good', message: 'Good ratio, may need minor adjustments.', color: '#8BC34A' };
        } else if (ratio >= 15 && ratio <= 50) {
            return { status: 'fair', message: 'Fair ratio, monitor closely and adjust as needed.', color: '#FFC107' };
        } else {
            return { status: 'poor', message: 'Poor ratio, significant adjustments needed.', color: '#FF5722' };
        }
    }

    displayResults(results) {
        const resultsContainer = document.querySelector('.calculator-results');
        if (!resultsContainer) return;

        if (!results) {
            resultsContainer.innerHTML = `
                <h3>C:N Ratio Results</h3>
                <p class="no-data">Add materials and weights to calculate C:N ratio</p>
            `;
            return;
        }

        const assessment = results.assessment;
        const gaugeFill = document.querySelector('.gauge-fill');
        const ratioValue = document.querySelector('.result-value[data-result="ratio"]');
        const statusValue = document.querySelector('.result-value[data-result="status"]');

        if (gaugeFill) {
            const percentage = Math.min(100, Math.max(0, (results.overallCN / 50) * 100));
            gaugeFill.style.width = `${percentage}%`;
            gaugeFill.style.backgroundColor = assessment.color;
        }

        if (ratioValue) {
            ratioValue.textContent = results.overallCN.toFixed(1) + ':1';
        }

        if (statusValue) {
            statusValue.textContent = assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1);
            statusValue.style.color = assessment.color;
        }

        // Update recommendations
        const recommendations = this.generateRecommendations(results);
        const recList = document.querySelector('.recommendations-panel ul');
        if (recList) {
            recList.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
        }
    }

    generateRecommendations(results) {
        const ratio = results.overallCN;
        const recommendations = [];

        if (ratio < 25) {
            recommendations.push('Add more carbon-rich materials (browns) like straw, leaves, or cardboard');
            recommendations.push('Reduce nitrogen-rich materials (greens) in future batches');
        } else if (ratio > 35) {
            recommendations.push('Add more nitrogen-rich materials (greens) like grass clippings or vegetable scraps');
            recommendations.push('Reduce carbon-rich materials (browns) in future batches');
        } else {
            recommendations.push('Maintain current material balance - ratio is optimal!');
        }

        if (ratio < 20) {
            recommendations.push('Consider adding alfalfa meal or fresh manure to boost nitrogen');
        } else if (ratio > 40) {
            recommendations.push('Add more greens or reduce dry materials to improve decomposition');
        }

        return recommendations;
    }

    populateMaterialDatabase() {
        const tableBody = document.querySelector('.material-table');
        if (!tableBody) return;

        const rows = Object.entries(this.materials).map(([key, data]) => {
            const name = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
            return `
                <div class="table-row">
                    <div>${name}</div>
                    <div>${category}</div>
                    <div>${data.cn}:1</div>
                </div>
            `;
        }).join('');

        tableBody.innerHTML = `
            <div class="table-header">
                <div>Material</div>
                <div>Category</div>
                <div>C:N Ratio</div>
            </div>
            ${rows}
        `;
    }
}

// Quality Tracker Class
class QualityTracker {
    constructor() {
        this.milestones = [
            { id: 1, name: 'Initial Setup', description: 'Compost pile established with proper layering', completed: true },
            { id: 2, name: 'Heating Phase', description: 'Temperature reached 55°C (131°F) for thermophilic composting', completed: false },
            { id: 3, name: 'Pathogen Kill', description: 'Maintained high temperature for 3+ days to eliminate pathogens', completed: false },
            { id: 4, name: 'Cooling Phase', description: 'Temperature dropped below 45°C indicating primary decomposition complete', completed: false },
            { id: 5, name: 'Maturation', description: 'Compost fully stabilized and ready for use (6+ weeks)', completed: false },
            { id: 6, name: 'Quality Test', description: 'Final quality assessment shows optimal parameters', completed: false }
        ];

        this.init();
    }

    init() {
        this.loadProgress();
        this.updateMilestones();
    }

    loadProgress() {
        const stored = localStorage.getItem('compostProgress');
        if (stored) {
            const progress = JSON.parse(stored);
            this.milestones.forEach(milestone => {
                milestone.completed = progress[milestone.id] || false;
            });
        }
    }

    updateMilestones() {
        const timeline = document.querySelector('.milestones-timeline');
        if (!timeline) return;

        timeline.innerHTML = this.milestones.map((milestone, index) => `
            <div class="milestone ${milestone.completed ? 'completed' : ''} ${index === this.getCurrentMilestone() ? 'active' : ''}">
                <div class="milestone-marker"></div>
                <div class="milestone-content">
                    <h4>${milestone.name}</h4>
                    <p>${milestone.description}</p>
                    <div class="milestone-date">${milestone.completed ? 'Completed' : 'Pending'}</div>
                </div>
            </div>
        `).join('');
    }

    getCurrentMilestone() {
        const lastCompleted = this.milestones.filter(m => m.completed).length;
        return Math.min(lastCompleted, this.milestones.length - 1);
    }

    markMilestoneComplete(id) {
        const milestone = this.milestones.find(m => m.id === id);
        if (milestone) {
            milestone.completed = true;
            this.saveProgress();
            this.updateMilestones();
        }
    }

    saveProgress() {
        const progress = {};
        this.milestones.forEach(milestone => {
            progress[milestone.id] = milestone.completed;
        });
        localStorage.setItem('compostProgress', JSON.stringify(progress));
    }
}

// Dashboard Controller
class DashboardController {
    constructor() {
        this.analyzer = new CompostAnalyzer();
        this.calculator = new CNCalculator();
        this.tracker = new QualityTracker();
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupRealTimeUpdates();
        this.showWelcomeMessage();
    }

    setupTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        const icon = document.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        }
    }

    setupRealTimeUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance of update
                this.simulateSensorUpdate();
            }
        }, 30000);
    }

    simulateSensorUpdate() {
        // Small random changes to simulate sensor readings
        const changes = {
            moisture: (Math.random() - 0.5) * 2,
            temperature: (Math.random() - 0.5) * 1,
            ph: (Math.random() - 0.5) * 0.1,
            oxygen: (Math.random() - 0.5) * 1
        };

        Object.keys(changes).forEach(param => {
            const newValue = Math.max(0, this.analyzer.currentData[param] + changes[param]);
            this.analyzer.updateParameter(param, Math.round(newValue * 10) / 10);
        });

        this.analyzer.showNotification('Sensor data updated', 'info');
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.analyzer.showNotification('Welcome to Compost Quality Analyzer! Start by scanning your compost or entering parameters manually.', 'info');
        }, 1000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DashboardController();
});

// Add notification styles dynamically
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    font-weight: 500;
    max-width: 300px;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    background: #4CAF50;
}

.notification-error {
    background: #F44336;
}

.notification-warning {
    background: #FF9800;
}

.notification-info {
    background: #2196F3;
}

.no-data {
    text-align: center;
    color: #757575;
    font-style: italic;
    padding: 2rem;
}
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);