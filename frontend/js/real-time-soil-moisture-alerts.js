/**
 * Real-Time Soil Moisture Alerts Dashboard JavaScript
 * Comprehensive implementation with sensor monitoring, alerts, and data visualization
 */

// Global variables and configuration
const CONFIG = {
  // Update intervals
  SENSOR_UPDATE_INTERVAL: 30000, // 30 seconds
  ALERT_CHECK_INTERVAL: 10000,   // 10 seconds
  CHART_UPDATE_INTERVAL: 60000,  // 1 minute

  // Thresholds (in percentage)
  OPTIMAL_MIN: 40,
  OPTIMAL_MAX: 70,
  MODERATE_MIN: 25,
  MODERATE_MAX: 85,
  LOW_THRESHOLD: 25,
  HIGH_THRESHOLD: 85,

  // Alert settings
  ALERT_COOLDOWN: 300000, // 5 minutes
  MAX_ALERTS_DISPLAY: 10,

  // Chart configuration
  CHART_HEIGHT: 400,
  TREND_POINTS: 24, // 24 hours of data

  // Animation settings
  ANIMATION_DURATION: 1000,
  TRANSITION_DELAY: 100
};

// Sensor data structure
class SensorData {
  constructor(id, name, location, type = 'capacitive') {
    this.id = id;
    this.name = name;
    this.location = location;
    this.type = type;
    this.moisture = 0;
    this.temperature = 0;
    this.status = 'offline';
    this.lastUpdate = null;
    this.battery = 100;
    this.calibration = 0;
  }

  updateData(moisture, temperature, battery = null) {
    this.moisture = Math.max(0, Math.min(100, moisture));
    this.temperature = temperature;
    this.lastUpdate = new Date();
    this.status = 'online';

    if (battery !== null) {
      this.battery = Math.max(0, Math.min(100, battery));
    }

    // Simulate battery drain
    if (Math.random() < 0.1) {
      this.battery = Math.max(0, this.battery - Math.random() * 2);
    }
  }

  getStatus() {
    if (!this.lastUpdate || Date.now() - this.lastUpdate.getTime() > 300000) {
      return 'offline';
    }
    if (this.battery < 20) {
      return 'low-battery';
    }
    return 'online';
  }

  getMoistureStatus() {
    const moisture = this.moisture;
    if (moisture < CONFIG.LOW_THRESHOLD) return 'low';
    if (moisture > CONFIG.HIGH_THRESHOLD) return 'high';
    if (moisture >= CONFIG.OPTIMAL_MIN && moisture <= CONFIG.OPTIMAL_MAX) return 'optimal';
    return 'moderate';
  }
}

// Alert system
class AlertSystem {
  constructor() {
    this.alerts = [];
    this.lastAlertTimes = new Map();
  }

  createAlert(type, title, message, sensorId = null, priority = 'normal') {
    const alertId = Date.now() + Math.random();
    const alert = {
      id: alertId,
      type,
      title,
      message,
      sensorId,
      priority,
      timestamp: new Date(),
      acknowledged: false
    };

    // Check cooldown
    const cooldownKey = `${type}-${sensorId}`;
    const lastAlert = this.lastAlertTimes.get(cooldownKey);
    if (lastAlert && Date.now() - lastAlert < CONFIG.ALERT_COOLDOWN) {
      return null;
    }

    this.lastAlertTimes.set(cooldownKey, Date.now());
    this.alerts.unshift(alert);

    // Keep only recent alerts
    if (this.alerts.length > CONFIG.MAX_ALERTS_DISPLAY) {
      this.alerts = this.alerts.slice(0, CONFIG.MAX_ALERTS_DISPLAY);
    }

    return alert;
  }

  acknowledgeAlert(alertId) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
    }
  }

  getActiveAlerts() {
    return this.alerts.filter(alert => !alert.acknowledged);
  }

  getAllAlerts() {
    return this.alerts;
  }
}

// Chart manager
class ChartManager {
  constructor() {
    this.charts = new Map();
    this.trendData = {
      moisture: [],
      temperature: [],
      timestamps: []
    };
  }

  createGaugeChart(elementId, sensor) {
    const ctx = document.getElementById(elementId);
    if (!ctx) return null;

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [sensor.moisture, 100 - sensor.moisture],
          backgroundColor: [
            this.getMoistureColor(sensor.moisture),
            '#e0e0e0'
          ],
          borderWidth: 0,
          cutout: '70%'
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
            enabled: false
          }
        }
      }
    });

    this.charts.set(elementId, chart);
    return chart;
  }

  createTrendChart(elementId) {
    const ctx = document.getElementById(elementId);
    if (!ctx) return null;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Soil Moisture (%)',
          data: [],
          borderColor: '#2e7d32',
          backgroundColor: 'rgba(46, 125, 50, 0.1)',
          tension: 0.4,
          fill: true
        }, {
          label: 'Temperature (°C)',
          data: [],
          borderColor: '#ff9800',
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
          tension: 0.4,
          yAxisID: 'y1'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}`;
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Moisture (%)'
            },
            min: 0,
            max: 100
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Temperature (°C)'
            },
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });

    this.charts.set(elementId, chart);
    return chart;
  }

  updateGaugeChart(elementId, sensor) {
    const chart = this.charts.get(elementId);
    if (!chart) return;

    chart.data.datasets[0].data = [sensor.moisture, 100 - sensor.moisture];
    chart.data.datasets[0].backgroundColor[0] = this.getMoistureColor(sensor.moisture);
    chart.update('none');
  }

  updateTrendChart(elementId, newData) {
    const chart = this.charts.get(elementId);
    if (!chart) return;

    // Add new data point
    const now = new Date();
    const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    chart.data.labels.push(timeLabel);
    chart.data.datasets[0].data.push(newData.moisture);
    chart.data.datasets[1].data.push(newData.temperature);

    // Keep only recent data
    if (chart.data.labels.length > CONFIG.TREND_POINTS) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
      chart.data.datasets[1].data.shift();
    }

    chart.update();
  }

  getMoistureColor(moisture) {
    if (moisture < CONFIG.LOW_THRESHOLD) return '#f44336';
    if (moisture > CONFIG.HIGH_THRESHOLD) return '#2196f3';
    if (moisture >= CONFIG.OPTIMAL_MIN && moisture <= CONFIG.OPTIMAL_MAX) return '#4caf50';
    return '#ff9800';
  }

  destroy() {
    this.charts.forEach(chart => chart.destroy());
    this.charts.clear();
  }
}

// Dashboard controller
class DashboardController {
  constructor() {
    this.sensors = new Map();
    this.alertSystem = new AlertSystem();
    this.chartManager = new ChartManager();
    this.thresholds = {
      low: CONFIG.LOW_THRESHOLD,
      high: CONFIG.HIGH_THRESHOLD,
      optimalMin: CONFIG.OPTIMAL_MIN,
      optimalMax: CONFIG.OPTIMAL_MAX
    };
    this.intervals = new Map();
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      this.initializeSensors();
      this.setupEventListeners();
      this.startDataUpdates();
      this.renderDashboard();
      this.isInitialized = true;

      console.log('Dashboard initialized successfully');
    } catch (error) {
      console.error('Failed to initialize dashboard:', error);
    }
  }

  initializeSensors() {
    // Create sample sensors
    const sensors = [
      new SensorData('sensor-1', 'North Field Sensor', 'North Field, Zone A'),
      new SensorData('sensor-2', 'South Field Sensor', 'South Field, Zone B'),
      new SensorData('sensor-3', 'East Field Sensor', 'East Field, Zone C'),
      new SensorData('sensor-4', 'West Field Sensor', 'West Field, Zone D'),
      new SensorData('sensor-5', 'Central Field Sensor', 'Central Field, Zone E')
    ];

    sensors.forEach(sensor => {
      this.sensors.set(sensor.id, sensor);
    });
  }

  setupEventListeners() {
    // Threshold controls
    document.querySelectorAll('.threshold-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const type = e.target.dataset.type;
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
          this.thresholds[type] = value;
          this.checkAllSensorsForAlerts();
        }
      });
    });

    // Alert actions
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('alert-action')) {
        const alertId = parseInt(e.target.dataset.alertId);
        this.alertSystem.acknowledgeAlert(alertId);
        this.renderAlerts();
      }
    });

    // Sensor controls
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('sensor-calibrate')) {
        const sensorId = e.target.dataset.sensorId;
        this.calibrateSensor(sensorId);
      }
    });

    // Add sensor button
    const addSensorBtn = document.querySelector('.add-sensor');
    if (addSensorBtn) {
      addSensorBtn.addEventListener('click', () => this.showAddSensorModal());
    }

    // Chart controls
    const timeRangeSelect = document.getElementById('timeRange');
    if (timeRangeSelect) {
      timeRangeSelect.addEventListener('change', (e) => {
        this.updateChartTimeRange(e.target.value);
      });
    }
  }

  startDataUpdates() {
    // Sensor data updates
    const sensorInterval = setInterval(() => {
      this.updateSensorData();
    }, CONFIG.SENSOR_UPDATE_INTERVAL);

    // Alert checking
    const alertInterval = setInterval(() => {
      this.checkAllSensorsForAlerts();
    }, CONFIG.ALERT_CHECK_INTERVAL);

    // Chart updates
    const chartInterval = setInterval(() => {
      this.updateCharts();
    }, CONFIG.CHART_UPDATE_INTERVAL);

    this.intervals.set('sensors', sensorInterval);
    this.intervals.set('alerts', alertInterval);
    this.intervals.set('charts', chartInterval);
  }

  updateSensorData() {
    this.sensors.forEach(sensor => {
      // Simulate realistic sensor readings
      const baseMoisture = this.getBaseMoistureForLocation(sensor.location);
      const variation = (Math.random() - 0.5) * 20; // ±10% variation
      const moisture = Math.max(0, Math.min(100, baseMoisture + variation));

      const temperature = 15 + Math.random() * 20; // 15-35°C
      const battery = sensor.battery - Math.random() * 0.5; // Slow drain

      sensor.updateData(moisture, temperature, battery);
    });

    this.renderDashboard();
  }

  getBaseMoistureForLocation(location) {
    // Simulate different moisture levels for different locations
    const locationMoisture = {
      'North Field': 45,
      'South Field': 55,
      'East Field': 35,
      'West Field': 65,
      'Central Field': 50
    };

    const baseLocation = Object.keys(locationMoisture).find(loc =>
      location.includes(loc)
    );

    return locationMoisture[baseLocation] || 50;
  }

  checkAllSensorsForAlerts() {
    this.sensors.forEach(sensor => {
      this.checkSensorAlerts(sensor);
    });
    this.renderAlerts();
  }

  checkSensorAlerts(sensor) {
    const moisture = sensor.moisture;
    const status = sensor.getStatus();

    // Offline alert
    if (status === 'offline') {
      this.alertSystem.createAlert(
        'sensor-offline',
        'Sensor Offline',
        `${sensor.name} has gone offline. Please check the connection.`,
        sensor.id,
        'high'
      );
    }

    // Low battery alert
    if (sensor.battery < 20) {
      this.alertSystem.createAlert(
        'low-battery',
        'Low Battery Warning',
        `${sensor.name} battery is at ${sensor.battery.toFixed(1)}%. Please replace or recharge.`,
        sensor.id,
        'medium'
      );
    }

    // Moisture alerts
    if (moisture < this.thresholds.low) {
      this.alertSystem.createAlert(
        'moisture-low',
        'Low Soil Moisture',
        `${sensor.name}: Soil moisture is critically low at ${moisture.toFixed(1)}%. Immediate irrigation recommended.`,
        sensor.id,
        'high'
      );
    } else if (moisture > this.thresholds.high) {
      this.alertSystem.createAlert(
        'moisture-high',
        'High Soil Moisture',
        `${sensor.name}: Soil moisture is too high at ${moisture.toFixed(1)}%. Consider drainage or reduced irrigation.`,
        sensor.id,
        'medium'
      );
    } else if (moisture < this.thresholds.optimalMin || moisture > this.thresholds.optimalMax) {
      this.alertSystem.createAlert(
        'moisture-suboptimal',
        'Suboptimal Soil Moisture',
        `${sensor.name}: Soil moisture (${moisture.toFixed(1)}%) is outside optimal range. Adjust irrigation schedule.`,
        sensor.id,
        'low'
      );
    }
  }

  updateCharts() {
    // Update trend chart with average sensor data
    const avgMoisture = Array.from(this.sensors.values())
      .reduce((sum, sensor) => sum + sensor.moisture, 0) / this.sensors.size;

    const avgTemperature = Array.from(this.sensors.values())
      .reduce((sum, sensor) => sum + sensor.temperature, 0) / this.sensors.size;

    this.chartManager.updateTrendChart('trendsChart', {
      moisture: avgMoisture,
      temperature: avgTemperature
    });
  }

  renderDashboard() {
    this.renderMainGauge();
    this.renderFieldStatus();
    this.renderSensors();
    this.renderAlerts();
    this.renderRecommendations();
  }

  renderMainGauge() {
    const avgMoisture = Array.from(this.sensors.values())
      .reduce((sum, sensor) => sum + sensor.moisture, 0) / this.sensors.size;

    // Update gauge display
    const gaugeValue = document.querySelector('.gauge-value');
    const gaugeStatus = document.querySelector('.gauge-status');

    if (gaugeValue) {
      gaugeValue.textContent = `${avgMoisture.toFixed(1)}%`;
    }

    if (gaugeStatus) {
      const status = this.getMoistureStatusText(avgMoisture);
      gaugeStatus.textContent = status.text;
      gaugeStatus.className = `gauge-status ${status.class}`;
    }

    // Update circular gauge
    this.chartManager.updateGaugeChart('mainGauge', {
      moisture: avgMoisture,
      getMoistureColor: (m) => this.chartManager.getMoistureColor(m)
    });
  }

  renderFieldStatus() {
    const fieldGrid = document.querySelector('.field-grid');
    if (!fieldGrid) return;

    fieldGrid.innerHTML = '';

    this.sensors.forEach(sensor => {
      const fieldItem = document.createElement('div');
      fieldItem.className = 'field-item';

      const status = sensor.getMoistureStatus();

      fieldItem.innerHTML = `
        <div class="field-name">${sensor.name.split(' ')[0]}</div>
        <div class="field-moisture">${sensor.moisture.toFixed(1)}%</div>
        <span class="field-status ${status}">${status}</span>
      `;

      fieldGrid.appendChild(fieldItem);
    });
  }

  renderSensors() {
    const sensorsGrid = document.querySelector('.sensors-grid');
    if (!sensorsGrid) return;

    // Clear existing sensors (keep add sensor button)
    const addSensorBtn = sensorsGrid.querySelector('.add-sensor');
    sensorsGrid.innerHTML = '';
    if (addSensorBtn) sensorsGrid.appendChild(addSensorBtn);

    this.sensors.forEach(sensor => {
      const sensorCard = this.createSensorCard(sensor);
      sensorsGrid.appendChild(sensorCard);
    });
  }

  createSensorCard(sensor) {
    const card = document.createElement('div');
    card.className = 'sensor-card';
    card.dataset.sensorId = sensor.id;

    const status = sensor.getStatus();
    const moistureStatus = sensor.getMoistureStatus();

    card.innerHTML = `
      <div class="sensor-header">
        <div class="sensor-icon">📡</div>
        <div class="sensor-name">${sensor.name}</div>
        <span class="sensor-status ${status}">${status.replace('-', ' ')}</span>
      </div>
      <div class="sensor-details">
        <div class="sensor-info">
          <span class="info-label">Moisture:</span>
          <span class="info-value">${sensor.moisture.toFixed(1)}%</span>
        </div>
        <div class="sensor-info">
          <span class="info-label">Temperature:</span>
          <span class="info-value">${sensor.temperature.toFixed(1)}°C</span>
        </div>
        <div class="sensor-info">
          <span class="info-label">Battery:</span>
          <span class="info-value">${sensor.battery.toFixed(1)}%</span>
        </div>
        <div class="sensor-info">
          <span class="info-label">Last Update:</span>
          <span class="info-value">${sensor.lastUpdate ? sensor.lastUpdate.toLocaleTimeString() : 'Never'}</span>
        </div>
      </div>
      <div class="sensor-controls">
        <button class="btn btn-sm btn-secondary sensor-calibrate" data-sensor-id="${sensor.id}">
          Calibrate
        </button>
        <button class="btn btn-sm btn-outline" onclick="dashboard.showSensorDetails('${sensor.id}')">
          Details
        </button>
      </div>
    `;

    return card;
  }

  renderAlerts() {
    const alertsList = document.querySelector('.alerts-list');
    if (!alertsList) return;

    const activeAlerts = this.alertSystem.getActiveAlerts();

    if (activeAlerts.length === 0) {
      alertsList.innerHTML = '<p class="no-alerts">No active alerts</p>';
      return;
    }

    alertsList.innerHTML = '';

    activeAlerts.slice(0, 5).forEach(alert => {
      const alertItem = document.createElement('div');
      alertItem.className = `alert-item ${alert.priority}`;

      const icon = this.getAlertIcon(alert.type);
      const timeAgo = this.getTimeAgo(alert.timestamp);

      alertItem.innerHTML = `
        <div class="alert-icon">${icon}</div>
        <div class="alert-content">
          <div class="alert-title">${alert.title}</div>
          <div class="alert-message">${alert.message}</div>
          <div class="alert-time">${timeAgo}</div>
        </div>
        <button class="alert-action" data-alert-id="${alert.id}">Acknowledge</button>
      `;

      alertsList.appendChild(alertItem);
    });
  }

  renderRecommendations() {
    const recommendationsGrid = document.querySelector('.recommendations-grid');
    if (!recommendationsGrid) return;

    const recommendations = this.generateRecommendations();
    recommendationsGrid.innerHTML = '';

    recommendations.forEach(rec => {
      const recCard = document.createElement('div');
      recCard.className = `recommendation-card ${rec.priority}`;

      recCard.innerHTML = `
        <div class="rec-header">
          <div class="rec-icon">${rec.icon}</div>
          <div class="rec-title">${rec.title}</div>
          <span class="rec-priority">${rec.priority}</span>
        </div>
        <div class="rec-content">
          <div class="rec-description">${rec.description}</div>
          <div class="rec-benefits">
            ${rec.benefits.map(benefit => `<span class="benefit">${benefit}</span>`).join('')}
          </div>
        </div>
        <div class="rec-actions">
          <button class="btn btn-sm btn-primary" onclick="dashboard.applyRecommendation('${rec.id}')">
            Apply
          </button>
          <button class="btn btn-sm btn-outline" onclick="dashboard.showRecommendationDetails('${rec.id}')">
            Learn More
          </button>
        </div>
      `;

      recommendationsGrid.appendChild(recCard);
    });
  }

  generateRecommendations() {
    const recommendations = [];
    const avgMoisture = Array.from(this.sensors.values())
      .reduce((sum, sensor) => sum + sensor.moisture, 0) / this.sensors.size;

    const lowSensors = Array.from(this.sensors.values()).filter(s => s.moisture < this.thresholds.low);
    const highSensors = Array.from(this.sensors.values()).filter(s => s.moisture > this.thresholds.high);

    if (lowSensors.length > 0) {
      recommendations.push({
        id: 'irrigation',
        title: 'Immediate Irrigation Required',
        description: `${lowSensors.length} sensor(s) show critically low soil moisture. Start irrigation immediately to prevent crop stress.`,
        icon: '💧',
        priority: 'urgent',
        benefits: ['Prevents crop wilting', 'Maintains yield potential', 'Reduces plant stress']
      });
    }

    if (avgMoisture < this.thresholds.optimalMin) {
      recommendations.push({
        id: 'mulching',
        title: 'Apply Organic Mulch',
        description: 'Add 2-3 inches of organic mulch around plants to retain soil moisture and regulate temperature.',
        icon: '🌿',
        priority: 'irrigation',
        benefits: ['Reduces evaporation', 'Improves soil structure', 'Suppresses weeds']
      });
    }

    recommendations.push({
      id: 'rainwater',
      title: 'Install Rainwater Harvesting',
      description: 'Set up rain barrels or collection systems to capture and store rainwater for irrigation use.',
      icon: '🌧️',
      priority: 'rainwater',
      benefits: ['Conserves water resources', 'Reduces utility costs', 'Provides chemical-free water']
    });

    recommendations.push({
      id: 'scheduling',
      title: 'Optimize Irrigation Schedule',
      description: 'Adjust irrigation timing based on weather forecasts, soil conditions, and crop water requirements.',
      icon: '⏰',
      priority: 'scheduling',
      benefits: ['Reduces water waste', 'Improves efficiency', 'Lowers operational costs']
    });

    recommendations.push({
      id: 'soil',
      title: 'Improve Soil Structure',
      description: 'Add organic matter and practice no-till farming to improve water retention capacity.',
      icon: '🌱',
      priority: 'soil',
      benefits: ['Increases water holding capacity', 'Enhances soil health', 'Reduces erosion']
    });

    return recommendations.slice(0, 6); // Show top 6 recommendations
  }

  getMoistureStatusText(moisture) {
    if (moisture < CONFIG.LOW_THRESHOLD) {
      return { text: 'CRITICALLY LOW', class: 'low' };
    }
    if (moisture > CONFIG.HIGH_THRESHOLD) {
      return { text: 'TOO HIGH', class: 'high' };
    }
    if (moisture >= CONFIG.OPTIMAL_MIN && moisture <= CONFIG.OPTIMAL_MAX) {
      return { text: 'OPTIMAL', class: 'optimal' };
    }
    return { text: 'MODERATE', class: 'moderate' };
  }

  getAlertIcon(type) {
    const icons = {
      'sensor-offline': '📡',
      'low-battery': '🔋',
      'moisture-low': '💧',
      'moisture-high': '🌊',
      'moisture-suboptimal': '⚠️'
    };
    return icons[type] || '⚠️';
  }

  getTimeAgo(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  }

  calibrateSensor(sensorId) {
    const sensor = this.sensors.get(sensorId);
    if (sensor) {
      // Simulate calibration
      sensor.calibration = Math.random() * 5 - 2.5; // ±2.5% calibration
      this.showNotification(`Sensor ${sensor.name} calibrated successfully`, 'success');
    }
  }

  showSensorDetails(sensorId) {
    const sensor = this.sensors.get(sensorId);
    if (!sensor) return;

    // Create modal with sensor details
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${sensor.name} Details</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="sensor-detail-grid">
            <div class="detail-item">
              <label>Location:</label>
              <span>${sensor.location}</span>
            </div>
            <div class="detail-item">
              <label>Type:</label>
              <span>${sensor.type}</span>
            </div>
            <div class="detail-item">
              <label>Current Moisture:</label>
              <span>${sensor.moisture.toFixed(1)}%</span>
            </div>
            <div class="detail-item">
              <label>Temperature:</label>
              <span>${sensor.temperature.toFixed(1)}°C</span>
            </div>
            <div class="detail-item">
              <label>Battery Level:</label>
              <span>${sensor.battery.toFixed(1)}%</span>
            </div>
            <div class="detail-item">
              <label>Status:</label>
              <span>${sensor.getStatus()}</span>
            </div>
            <div class="detail-item">
              <label>Last Update:</label>
              <span>${sensor.lastUpdate ? sensor.lastUpdate.toLocaleString() : 'Never'}</span>
            </div>
            <div class="detail-item">
              <label>Calibration Offset:</label>
              <span>${sensor.calibration.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Close modal functionality
    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    // Add to page
    const container = document.querySelector('.notifications-container') || document.body;
    container.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });
  }

  applyRecommendation(recId) {
    this.showNotification(`Recommendation "${recId}" applied successfully`, 'success');
  }

  showRecommendationDetails(recId) {
    // Show detailed information about the recommendation
    const details = {
      irrigation: {
        title: 'Immediate Irrigation',
        content: 'When soil moisture drops below critical thresholds, immediate action is required...'
      },
      mulching: {
        title: 'Organic Mulching',
        content: 'Mulching is one of the most effective ways to conserve soil moisture...'
      }
      // Add more details as needed
    };

    const detail = details[recId];
    if (detail) {
      this.showNotification(`Showing details for: ${detail.title}`, 'info');
    }
  }

  updateChartTimeRange(range) {
    // Update chart to show different time ranges
    console.log('Updating chart time range to:', range);
  }

  showAddSensorModal() {
    // Show modal to add new sensor
    this.showNotification('Add sensor functionality coming soon!', 'info');
  }

  destroy() {
    // Clear all intervals
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();

    // Destroy charts
    this.chartManager.destroy();

    this.isInitialized = false;
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Chart.js if available
  if (typeof Chart !== 'undefined') {
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
  }

  // Create and initialize dashboard
  window.dashboard = new DashboardController();
  window.dashboard.initialize();

  // Initialize charts after dashboard
  setTimeout(() => {
    if (window.dashboard.chartManager) {
      window.dashboard.chartManager.createGaugeChart('mainGauge', { moisture: 50 });
      window.dashboard.chartManager.createTrendChart('trendsChart');
    }
  }, 100);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.dashboard) {
    window.dashboard.destroy();
  }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DashboardController, SensorData, AlertSystem, ChartManager };
}

/* End of real-time-soil-moisture-alerts.js */