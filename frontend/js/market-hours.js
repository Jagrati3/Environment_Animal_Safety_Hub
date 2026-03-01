// Heat-Safe Market Hours Optimizer
class MarketHoursOptimizer {
    constructor() {
        this.chart = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        document.getElementById('market-date').valueAsDate = new Date();
    }

    optimize() {
        const crowd = document.getElementById('crowd-level').value;
        const shade = document.getElementById('shade-coverage').value;
        
        const hourlyData = this.generateHourlyData(crowd, shade);
        const currentRisk = this.calculateRisk(9, 17, hourlyData);
        const optimized = this.findOptimalHours(hourlyData);
        
        this.displayResults(currentRisk, optimized, hourlyData);
        this.renderChart(hourlyData);
        this.displayHourlyBreakdown(hourlyData);
        this.generateRecommendations(optimized, shade, crowd);
    }

    generateHourlyData(crowd, shade) {
        const hours = [];
        const crowdFactor = { low: 0.8, medium: 1.0, high: 1.2 }[crowd];
        const shadeFactor = { none: 1.3, partial: 1.0, good: 0.8, full: 0.6 }[shade];
        
        for (let h = 6; h <= 20; h++) {
            const baseTemp = 70 + Math.abs(h - 13) * -2 + 25;
            const temp = baseTemp * shadeFactor;
            const heatIndex = temp + (crowdFactor - 1) * 10;
            
            hours.push({
                hour: h,
                temp: Math.round(temp),
                heatIndex: Math.round(heatIndex),
                crowd: this.getCrowdLevel(h, crowd),
                risk: this.getRiskLevel(heatIndex)
            });
        }
        
        return hours;
    }

    getCrowdLevel(hour, baseCrowd) {
        if (hour < 8 || hour > 18) return 'low';
        if (hour >= 10 && hour <= 14) return baseCrowd;
        return 'medium';
    }

    getRiskLevel(heatIndex) {
        if (heatIndex < 80) return 'safe';
        if (heatIndex < 90) return 'caution';
        return 'danger';
    }

    calculateRisk(startHour, endHour, hourlyData) {
        const relevantHours = hourlyData.filter(h => h.hour >= startHour && h.hour <= endHour);
        const avgHeatIndex = relevantHours.reduce((sum, h) => sum + h.heatIndex, 0) / relevantHours.length;
        const maxHeatIndex = Math.max(...relevantHours.map(h => h.heatIndex));
        const dangerHours = relevantHours.filter(h => h.risk === 'danger').length;
        
        return {
            score: Math.round(avgHeatIndex),
            max: maxHeatIndex,
            dangerHours: dangerHours,
            hours: `${startHour}:00 - ${endHour}:00`
        };
    }

    findOptimalHours(hourlyData) {
        const safeHours = hourlyData.filter(h => h.risk !== 'danger');
        
        if (safeHours.length >= 8) {
            const morning = safeHours.filter(h => h.hour < 12);
            const evening = safeHours.filter(h => h.hour >= 16);
            
            if (morning.length >= 4 && evening.length >= 4) {
                return {
                    start: morning[0].hour,
                    end: evening[Math.min(3, evening.length - 1)].hour,
                    split: true
                };
            }
            
            return {
                start: safeHours[0].hour,
                end: safeHours[Math.min(7, safeHours.length - 1)].hour,
                split: false
            };
        }
        
        return {
            start: 6,
            end: 10,
            split: false
        };
    }

    displayResults(current, optimized, hourlyData) {
        document.getElementById('current-risk').textContent = current.score;
        document.getElementById('current-details').innerHTML = `
            <p>Peak Heat: ${current.max}°F</p>
            <p>Danger Hours: ${current.dangerHours}</p>
        `;
        
        const optStart = optimized.split ? `${optimized.start}:00 AM & 4:00 PM` : `${optimized.start}:00 AM`;
        const optEnd = optimized.split ? `8:00 PM` : `${optimized.end}:00 ${optimized.end >= 12 ? 'PM' : 'AM'}`;
        
        document.getElementById('recommended-hours').textContent = `${optStart} - ${optEnd}`;
        
        const optRisk = this.calculateRisk(optimized.start, optimized.end, hourlyData);
        document.getElementById('optimized-risk').textContent = optRisk.score;
        
        const improvement = Math.round(((current.score - optRisk.score) / current.score) * 100);
        document.getElementById('improvement').textContent = `${improvement}% Risk Reduction`;
    }

    renderChart(hourlyData) {
        const ctx = document.getElementById('heat-chart').getContext('2d');
        
        if (this.chart) this.chart.destroy();
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: hourlyData.map(h => `${h.hour}:00`),
                datasets: [{
                    label: 'Heat Index (°F)',
                    data: hourlyData.map(h => h.heatIndex),
                    borderColor: '#FF6F00',
                    backgroundColor: 'rgba(255, 111, 0, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Safe Threshold',
                    data: Array(hourlyData.length).fill(80),
                    borderColor: '#4CAF50',
                    borderDash: [5, 5],
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 60,
                        title: { display: true, text: 'Heat Index (°F)' }
                    }
                }
            }
        });
    }

    displayHourlyBreakdown(hourlyData) {
        const container = document.getElementById('hourly-breakdown');
        let html = '';
        
        hourlyData.forEach(hour => {
            const period = hour.hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour.hour > 12 ? hour.hour - 12 : hour.hour;
            
            html += `
                <div class="hour-card ${hour.risk}">
                    <div class="hour-time">${displayHour}:00 ${period}</div>
                    <div class="hour-info">
                        <div class="hour-temp">${hour.heatIndex}°F</div>
                        <div class="hour-status">Crowd: ${hour.crowd} | Temp: ${hour.temp}°F</div>
                    </div>
                    <span class="hour-badge ${hour.risk}">${hour.risk.toUpperCase()}</span>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }

    generateRecommendations(optimized, shade, crowd) {
        const container = document.getElementById('recommendations-list');
        const recs = [];
        
        recs.push({
            icon: 'clock',
            title: 'Optimal Operating Hours',
            text: optimized.split 
                ? 'Split schedule recommended: Early morning (6-10 AM) and evening (4-8 PM) to avoid peak heat.'
                : `Operate during cooler hours: ${optimized.start}:00 - ${optimized.end}:00 to minimize heat exposure.`
        });
        
        if (shade === 'none' || shade === 'partial') {
            recs.push({
                icon: 'umbrella',
                title: 'Increase Shade Coverage',
                text: 'Install temporary canopies, umbrellas, or shade sails. Target 60%+ coverage to reduce heat by 10-15°F.'
            });
        }
        
        if (crowd === 'high') {
            recs.push({
                icon: 'users',
                title: 'Manage Crowd Density',
                text: 'Implement timed entry or expand market area to reduce crowding. High density increases perceived temperature by 5-10°F.'
            });
        }
        
        recs.push({
            icon: 'tint',
            title: 'Hydration Stations',
            text: 'Set up free water refill stations every 50 meters. Ensure vendors and visitors have easy access to drinking water.'
        });
        
        recs.push({
            icon: 'thermometer-half',
            title: 'Heat Monitoring',
            text: 'Use real-time temperature sensors. Cancel or postpone if heat index exceeds 105°F for safety.'
        });
        
        let html = '';
        recs.forEach(rec => {
            html += `
                <div class="rec-card">
                    <h4><i class="fas fa-${rec.icon}"></i> ${rec.title}</h4>
                    <p>${rec.text}</p>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }

    setupEventListeners() {
        document.getElementById('optimize-btn').addEventListener('click', () => {
            this.optimize();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MarketHoursOptimizer();
});
