// Storm Drain Blockage Watch System
class DrainageWatch {
    constructor() {
        this.map = null;
        this.drains = [];
        this.reports = [];
        this.selectedDrain = null;
        this.markers = {};
        this.init();
    }

    init() {
        this.initMap();
        this.generateMockDrains();
        this.setupEventListeners();
        this.updateStats();
        this.updateHotspots();
    }

    initMap() {
        this.map = L.map('drain-map').setView([40.7128, -74.0060], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        this.map.on('click', (e) => {
            if (document.getElementById('report-modal').classList.contains('active-location-select')) {
                document.getElementById('location-input').value = 
                    `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;
            }
        });
    }

    generateMockDrains() {
        const locations = [
            { name: 'Main St & 5th Ave', lat: 40.7158, lng: -74.0090 },
            { name: 'Park Ave & Oak St', lat: 40.7098, lng: -74.0030 },
            { name: 'Elm St & Broadway', lat: 40.7148, lng: -74.0020 },
            { name: 'Maple Dr & Pine St', lat: 40.7108, lng: -74.0070 },
            { name: 'Cedar Ln & Birch Rd', lat: 40.7138, lng: -74.0050 },
            { name: 'Willow Way & Sunset Blvd', lat: 40.7118, lng: -74.0040 },
            { name: 'Washington St & Lincoln Ave', lat: 40.7088, lng: -74.0080 },
            { name: 'Jefferson Rd & Madison Dr', lat: 40.7168, lng: -74.0010 }
        ];

        locations.forEach((loc, i) => {
            const reportCount = Math.floor(Math.random() * 5);
            const drain = {
                id: `drain_${i}`,
                name: loc.name,
                lat: loc.lat,
                lng: loc.lng,
                reportCount: reportCount,
                status: reportCount >= 3 ? 'critical' : reportCount >= 2 ? 'high' : reportCount >= 1 ? 'low' : 'normal',
                lastReported: new Date(Date.now() - Math.random() * 86400000 * 7),
                cleaned: false,
                lastCleaned: null
            };
            this.drains.push(drain);
            
            for (let j = 0; j < reportCount; j++) {
                this.reports.push({
                    drainId: drain.id,
                    severity: ['minor', 'moderate', 'severe'][Math.floor(Math.random() * 3)],
                    description: ['Leaves and debris', 'Trash accumulation', 'Complete blockage', 'Partial obstruction'][Math.floor(Math.random() * 4)],
                    reporter: 'Community Member',
                    timestamp: new Date(Date.now() - Math.random() * 86400000 * 3)
                });
            }
        });

        this.renderDrains();
    }

    renderDrains() {
        Object.values(this.markers).forEach(marker => marker.remove());
        this.markers = {};

        this.drains.forEach(drain => {
            if (!this.shouldShowDrain(drain)) return;

            const color = this.getDrainColor(drain);
            const icon = L.divIcon({
                html: `<div style="background:${color};width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 0 6px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:11px;">${drain.reportCount || ''}</div>`,
                className: '',
                iconSize: [24, 24]
            });

            const marker = L.marker([drain.lat, drain.lng], { icon });
            marker.on('click', () => this.selectDrain(drain));
            marker.bindPopup(this.createPopup(drain));
            marker.addTo(this.map);
            this.markers[drain.id] = marker;
        });
    }

    getDrainColor(drain) {
        if (drain.cleaned) return '#32CD32';
        if (drain.status === 'critical') return '#DC143C';
        if (drain.status === 'high') return '#FF8C00';
        if (drain.status === 'low') return '#FFD700';
        return '#999';
    }

    shouldShowDrain(drain) {
        if (drain.cleaned && !document.getElementById('filter-cleaned').checked) return false;
        if (drain.status === 'critical' && !document.getElementById('filter-critical').checked) return false;
        if (drain.status === 'high' && !document.getElementById('filter-high').checked) return false;
        if (drain.status === 'low' && !document.getElementById('filter-low').checked) return false;
        return true;
    }

    createPopup(drain) {
        const statusBadge = `<span class="severity-badge ${drain.status}">${drain.status.toUpperCase()}</span>`;
        return `
            <div class="popup-content">
                <h4>${drain.name}</h4>
                ${statusBadge}
                <p><strong>Reports:</strong> ${drain.reportCount}</p>
                <p><strong>Status:</strong> ${drain.cleaned ? 'Cleaned' : 'Needs attention'}</p>
            </div>
        `;
    }

    selectDrain(drain) {
        this.selectedDrain = drain;
        this.displayDrainInfo(drain);
        this.displayReports(drain);
        this.displayCleanupOptions(drain);
    }

    displayDrainInfo(drain) {
        const container = document.getElementById('drain-info');
        container.innerHTML = `
            <div class="drain-detail">
                <h4>${drain.name}</h4>
                <div class="detail-row">
                    <span>Status</span>
                    <span class="severity-badge ${drain.status}">${drain.status.toUpperCase()}</span>
                </div>
                <div class="detail-row">
                    <span>Total Reports</span>
                    <strong>${drain.reportCount}</strong>
                </div>
                <div class="detail-row">
                    <span>Last Reported</span>
                    <span>${drain.lastReported.toLocaleDateString()}</span>
                </div>
                <div class="detail-row">
                    <span>Coordinates</span>
                    <span>${drain.lat.toFixed(4)}, ${drain.lng.toFixed(4)}</span>
                </div>
                <div class="detail-row">
                    <span>Cleaned</span>
                    <span>${drain.cleaned ? '✅ Yes' : '❌ No'}</span>
                </div>
            </div>
        `;
    }

    displayReports(drain) {
        const container = document.getElementById('reports');
        const drainReports = this.reports.filter(r => r.drainId === drain.id);
        
        if (drainReports.length === 0) {
            container.innerHTML = '<p class="placeholder">No reports for this drain</p>';
            return;
        }

        let html = '';
        drainReports.forEach(report => {
            html += `
                <div class="report-card ${report.severity}">
                    <div class="report-header">
                        <span>${report.severity.toUpperCase()}</span>
                        <span class="report-time">${this.timeAgo(report.timestamp)}</span>
                    </div>
                    <p>${report.description}</p>
                    <small>Reported by: ${report.reporter}</small>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    displayCleanupOptions(drain) {
        const container = document.getElementById('cleanup');
        container.innerHTML = `
            <div class="drain-detail">
                <h4>Cleanup Status</h4>
                <p><strong>Drain:</strong> ${drain.name}</p>
                <p><strong>Priority:</strong> ${drain.status.toUpperCase()}</p>
                <p><strong>Reports:</strong> ${drain.reportCount}</p>
                ${drain.cleaned ? 
                    `<p style="color:#32CD32;font-weight:600;">✅ Cleaned on ${drain.lastCleaned?.toLocaleDateString()}</p>` :
                    `<button class="cleanup-btn" onclick="drainWatch.openCleanupModal('${drain.id}')">
                        <i class="fas fa-broom"></i> Schedule Cleanup
                    </button>
                    <button class="cleanup-btn" onclick="drainWatch.markCleaned('${drain.id}')" style="background:#32CD32;">
                        <i class="fas fa-check"></i> Mark as Cleaned
                    </button>`
                }
            </div>
        `;
    }

    timeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (let [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
            }
        }
        return 'Just now';
    }

    updateStats() {
        const total = this.reports.length;
        const critical = this.drains.filter(d => d.status === 'critical').length;
        const cleaned = this.drains.filter(d => d.cleaned).length;

        document.getElementById('total-reports').textContent = total;
        document.getElementById('critical-drains').textContent = critical;
        document.getElementById('cleaned-today').textContent = cleaned;
    }

    updateHotspots() {
        const hotspots = this.drains
            .filter(d => d.reportCount >= 2 && !d.cleaned)
            .sort((a, b) => b.reportCount - a.reportCount)
            .slice(0, 5);

        const container = document.getElementById('hotspot-list');
        if (hotspots.length === 0) {
            container.innerHTML = '<p style="color:#999;font-size:0.9rem;">No critical hotspots</p>';
            return;
        }

        let html = '';
        hotspots.forEach(drain => {
            html += `
                <div class="hotspot-item" onclick="drainWatch.focusDrain('${drain.id}')">
                    <strong>${drain.name}</strong>
                    <small>${drain.reportCount} reports - ${drain.status.toUpperCase()}</small>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    focusDrain(drainId) {
        const drain = this.drains.find(d => d.id === drainId);
        if (drain) {
            this.map.setView([drain.lat, drain.lng], 16);
            this.selectDrain(drain);
            this.markers[drainId].openPopup();
        }
    }

    openCleanupModal(drainId) {
        const drain = this.drains.find(d => d.id === drainId);
        document.getElementById('cleanup-drain-id').textContent = drain.name;
        document.getElementById('cleanup-modal').classList.remove('hidden');
        document.getElementById('cleanup-modal').dataset.drainId = drainId;
    }

    markCleaned(drainId) {
        const drain = this.drains.find(d => d.id === drainId);
        drain.cleaned = true;
        drain.lastCleaned = new Date();
        drain.reportCount = 0;
        drain.status = 'normal';
        
        this.renderDrains();
        this.updateStats();
        this.updateHotspots();
        this.displayCleanupOptions(drain);
        alert(`✅ ${drain.name} marked as cleaned!`);
    }

    setupEventListeners() {
        document.getElementById('report-btn').addEventListener('click', () => {
            document.getElementById('report-modal').classList.remove('hidden');
            document.getElementById('report-modal').classList.add('active-location-select');
        });

        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.add('hidden');
                document.getElementById('report-modal').classList.remove('active-location-select');
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    document.getElementById('report-modal').classList.remove('active-location-select');
                }
            });
        });

        document.getElementById('report-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitReport();
        });

        document.getElementById('cleanup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.scheduleCleanup();
        });

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(btn.dataset.tab).classList.add('active');
            });
        });

        ['filter-critical', 'filter-high', 'filter-low', 'filter-cleaned'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                this.renderDrains();
            });
        });
    }

    submitReport() {
        const location = document.getElementById('location-input').value;
        const severity = document.getElementById('severity-select').value;
        const description = document.getElementById('description-input').value;
        const reporter = document.getElementById('reporter-name').value || 'Anonymous';

        const coords = location.split(',').map(c => parseFloat(c.trim()));
        
        let nearestDrain = this.drains[0];
        let minDist = Infinity;
        
        this.drains.forEach(drain => {
            const dist = Math.sqrt(Math.pow(drain.lat - coords[0], 2) + Math.pow(drain.lng - coords[1], 2));
            if (dist < minDist) {
                minDist = dist;
                nearestDrain = drain;
            }
        });

        nearestDrain.reportCount++;
        nearestDrain.lastReported = new Date();
        nearestDrain.status = nearestDrain.reportCount >= 3 ? 'critical' : 
                             nearestDrain.reportCount >= 2 ? 'high' : 'low';

        this.reports.push({
            drainId: nearestDrain.id,
            severity: severity,
            description: description || 'Blockage reported',
            reporter: reporter,
            timestamp: new Date()
        });

        this.renderDrains();
        this.updateStats();
        this.updateHotspots();

        document.getElementById('report-modal').classList.add('hidden');
        document.getElementById('report-form').reset();
        
        alert(`✅ Report submitted for ${nearestDrain.name}!`);
        this.focusDrain(nearestDrain.id);
    }

    scheduleCleanup() {
        const drainId = document.getElementById('cleanup-modal').dataset.drainId;
        const date = document.getElementById('cleanup-date').value;
        const team = document.getElementById('cleanup-team').value;
        
        alert(`✅ Cleanup scheduled for ${date} with ${team}!`);
        document.getElementById('cleanup-modal').classList.add('hidden');
        document.getElementById('cleanup-form').reset();
    }
}

let drainWatch;
document.addEventListener('DOMContentLoaded', () => {
    drainWatch = new DrainageWatch();
});
