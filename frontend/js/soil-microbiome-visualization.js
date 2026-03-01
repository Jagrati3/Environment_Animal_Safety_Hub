// Soil Microbiome Visualization JavaScript
// Comprehensive implementation with extensive demo data and interactive features

// Configuration constants
const CONFIG = {
  CHART_COLORS: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f093fb',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3'
  },
  ANIMATION_DURATION: 1000,
  RESPONSIVE_BREAKPOINTS: {
    mobile: 480,
    tablet: 768,
    desktop: 1024
  },
  DATA_REFRESH_INTERVAL: 30000, // 30 seconds
  MAX_DATA_POINTS: 1000
};

// Utility functions
const utils = {
  // Generate random data for demo purposes
  generateRandomData: (count, min, max) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  },

  // Format numbers with commas
  formatNumber: (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for performance
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Deep clone object
  deepClone: (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => utils.deepClone(item));
    if (typeof obj === 'object') {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = utils.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
  },

  // Validate data structure
  validateData: (data, schema) => {
    // Basic validation implementation
    if (!data || typeof data !== 'object') return false;
    for (const key in schema) {
      if (!(key in data)) return false;
      if (typeof data[key] !== schema[key]) return false;
    }
    return true;
  },

  // Export data to CSV
  exportToCSV: (data, filename) => {
    const csvContent = 'data:text/csv;charset=utf-8,' +
      Object.keys(data[0]).join(',') + '\n' +
      data.map(row => Object.values(row).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Show notification
  showNotification: (message, type = 'info', duration = 3000) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, duration);
  }
};

// Data management class
class DataManager {
  constructor() {
    this.data = {};
    this.listeners = [];
  }

  // Set data with validation
  setData(key, value, schema = null) {
    if (schema && !utils.validateData(value, schema)) {
      throw new Error(`Invalid data structure for ${key}`);
    }
    this.data[key] = utils.deepClone(value);
    this.notifyListeners(key, value);
  }

  // Get data
  getData(key) {
    return utils.deepClone(this.data[key]);
  }

  // Subscribe to data changes
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify listeners of data changes
  notifyListeners(key, value) {
    this.listeners.forEach(callback => callback(key, value));
  }

  // Load data from API (mock implementation)
  async loadData(endpoint) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return utils.generateRandomData(10, 50, 100);
    } catch (error) {
      console.error('Failed to load data:', error);
      throw error;
    }
  }
}

// Chart manager class
class ChartManager {
  constructor() {
    this.charts = {};
    this.chartConfigs = {};
  }

  // Create chart
  createChart(canvasId, config) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    this.charts[canvasId] = new Chart(ctx, config);
    this.chartConfigs[canvasId] = config;
  }

  // Update chart data
  updateChart(canvasId, newData) {
    if (this.charts[canvasId]) {
      this.charts[canvasId].data = newData;
      this.charts[canvasId].update();
    }
  }

  // Destroy chart
  destroyChart(canvasId) {
    if (this.charts[canvasId]) {
      this.charts[canvasId].destroy();
      delete this.charts[canvasId];
      delete this.chartConfigs[canvasId];
    }
  }

  // Resize all charts
  resizeCharts() {
    Object.values(this.charts).forEach(chart => {
      chart.resize();
    });
  }

  // Export chart as image
  exportChart(canvasId, filename) {
    const canvas = document.getElementById(canvasId);
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL();
    link.click();
  }
}

// UI manager class
class UIManager {
  constructor() {
    this.elements = {};
    this.eventListeners = {};
  }

  // Cache DOM elements
  cacheElements() {
    this.elements = {
      diversityChart: document.getElementById('diversity-chart'),
      healthChart: document.getElementById('health-chart'),
      impactChart: document.getElementById('impact-chart'),
      diversityData: document.getElementById('diversity-data'),
      healthData: document.getElementById('health-data'),
      impactData: document.getElementById('impact-data'),
      recommendationsList: document.getElementById('recommendations-list'),
      diversityPractice: document.getElementById('diversity-practice'),
      healthMetric: document.getElementById('health-metric'),
      impactComparison: document.getElementById('impact-comparison'),
      diversityTableBody: document.getElementById('diversity-table-body'),
      healthIndicators: document.getElementById('health-indicators'),
      impactSummary: document.getElementById('impact-summary')
    };
  }

  // Update UI element
  updateElement(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = content;
    }
  }

  // Add event listener
  addEventListener(elementId, event, callback) {
    const element = document.getElementById(elementId);
    if (element) {
      element.addEventListener(event, callback);
      if (!this.eventListeners[elementId]) {
        this.eventListeners[elementId] = {};
      }
      this.eventListeners[elementId][event] = callback;
    }
  }

  // Remove event listener
  removeEventListener(elementId, event) {
    const element = document.getElementById(elementId);
    if (element && this.eventListeners[elementId] && this.eventListeners[elementId][event]) {
      element.removeEventListener(event, this.eventListeners[elementId][event]);
      delete this.eventListeners[elementId][event];
    }
  }

  // Show loading state
  showLoading(elementId) {
    this.updateElement(elementId, '<div class="loading">Loading data...</div>');
  }

  // Hide loading state
  hideLoading(elementId) {
    // Implementation depends on specific element
  }

  // Toggle visibility
  toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
  }
}

// Demo data generators
const dataGenerators = {
  // Generate diversity data
  generateDiversityData: (practice = 'conventional') => {
    const baseData = {
      conventional: [80, 82, 78, 75, 72, 70, 68, 65, 63, 60, 58, 55],
      'no-till': [85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107],
      organic: [88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110],
      'cover-crops': [86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108]
    };

    return baseData[practice] || baseData.conventional;
  },

  // Generate health data
  generateHealthData: (metric = 'bacteria') => {
    const baseData = {
      bacteria: [5000, 5200, 5400, 5600, 5800, 6000, 6200, 6400, 6600, 6800, 7000, 7200],
      fungi: [800, 820, 840, 860, 880, 900, 920, 940, 960, 980, 1000, 1020],
      biomass: [1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750],
      activity: [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86]
    };

    return baseData[metric] || baseData.bacteria;
  },

  // Generate impact data
  generateImpactData: (comparison = 'all') => {
    const baseData = {
      all: [
        { practice: 'Conventional Tillage', diversity: 60, health: 55, activity: 50 },
        { practice: 'Minimal Tillage', diversity: 75, health: 70, activity: 65 },
        { practice: 'No-Till', diversity: 85, health: 80, activity: 75 },
        { practice: 'Cover Crops', diversity: 90, health: 85, activity: 80 },
        { practice: 'Compost Addition', diversity: 95, health: 90, activity: 85 },
        { practice: 'Organic Farming', diversity: 100, health: 95, activity: 90 }
      ],
      tillage: [
        { practice: 'Conventional Tillage', diversity: 60, health: 55, activity: 50 },
        { practice: 'Minimal Tillage', diversity: 75, health: 70, activity: 65 },
        { practice: 'No-Till', diversity: 85, health: 80, activity: 75 }
      ],
      amendments: [
        { practice: 'Compost Addition', diversity: 95, health: 90, activity: 85 },
        { practice: 'Biochar', diversity: 88, health: 83, activity: 78 },
        { practice: 'Manure', diversity: 82, health: 77, activity: 72 }
      ],
      rotation: [
        { practice: 'Monoculture', diversity: 65, health: 60, activity: 55 },
        { practice: 'Crop Rotation', diversity: 80, health: 75, activity: 70 },
        { practice: 'Diverse Rotation', diversity: 90, health: 85, activity: 80 }
      ]
    };

    return baseData[comparison] || baseData.all;
  }
};

// Main application class
class SoilMicrobiomeApp {
  constructor() {
    this.dataManager = new DataManager();
    this.chartManager = new ChartManager();
    this.uiManager = new UIManager();
    this.currentFilters = {
      diversityPractice: 'conventional',
      healthMetric: 'bacteria',
      impactComparison: 'all'
    };
    this.init();
  }

  // Initialize the application
  async init() {
    try {
      this.uiManager.cacheElements();
      this.setupEventListeners();
      await this.loadInitialData();
      this.createCharts();
      this.updateUI();
      this.setupPeriodicUpdates();
      utils.showNotification('Application initialized successfully', 'success');
    } catch (error) {
      console.error('Failed to initialize application:', error);
      utils.showNotification('Failed to initialize application', 'error');
    }
  }

  // Setup event listeners
  setupEventListeners() {
    this.uiManager.addEventListener('diversity-practice', 'change', (e) => {
      this.currentFilters.diversityPractice = e.target.value;
      this.updateDiversityChart();
      this.updateDiversityTable();
    });

    this.uiManager.addEventListener('health-metric', 'change', (e) => {
      this.currentFilters.healthMetric = e.target.value;
      this.updateHealthChart();
      this.updateHealthIndicators();
    });

    this.uiManager.addEventListener('impact-comparison', 'change', (e) => {
      this.currentFilters.impactComparison = e.target.value;
      this.updateImpactChart();
      this.updateImpactSummary();
    });

    // Window resize handler
    window.addEventListener('resize', utils.debounce(() => {
      this.chartManager.resizeCharts();
    }, 250));
  }

  // Load initial data
  async loadInitialData() {
    try {
      // Load diversity data
      const diversityData = dataGenerators.generateDiversityData();
      this.dataManager.setData('diversity', diversityData);

      // Load health data
      const healthData = dataGenerators.generateHealthData();
      this.dataManager.setData('health', healthData);

      // Load impact data
      const impactData = dataGenerators.generateImpactData();
      this.dataManager.setData('impact', impactData);

      // Load recommendations
      const recommendations = [
        'Add compost to increase microbial populations by up to 50%.',
        'Use cover crops to maintain soil moisture and microbial diversity.',
        'Practice minimal tillage to preserve soil structure and microbes.',
        'Incorporate natural amendments like biochar for long-term health.',
        'Monitor microbial health regularly to adjust farming practices.',
        'Implement crop rotation to prevent pathogen buildup.',
        'Use organic fertilizers to promote beneficial microbial communities.',
        'Maintain soil pH between 6.0-7.0 for optimal microbial activity.',
        'Avoid overuse of chemical pesticides that harm beneficial microbes.',
        'Encourage earthworm populations which enhance microbial habitats.'
      ];
      this.dataManager.setData('recommendations', recommendations);

    } catch (error) {
      console.error('Failed to load initial data:', error);
      throw error;
    }
  }

  // Create charts
  createCharts() {
    // Diversity chart
    const diversityData = this.dataManager.getData('diversity');
    const diversityConfig = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Microbial Diversity Index',
          data: diversityData,
          borderColor: CONFIG.CHART_COLORS.primary,
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Soil Microbial Diversity Over Time'
          },
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Diversity Index'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        },
        animation: {
          duration: CONFIG.ANIMATION_DURATION
        }
      }
    };
    this.chartManager.createChart('diversity-chart', diversityConfig);

    // Health chart
    const healthData = this.dataManager.getData('health');
    const healthConfig = {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Population Health',
          data: healthData,
          backgroundColor: CONFIG.CHART_COLORS.secondary,
          borderColor: CONFIG.CHART_COLORS.secondary,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Microbial Population Health Trends'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Health Score'
            }
          }
        },
        animation: {
          duration: CONFIG.ANIMATION_DURATION
        }
      }
    };
    this.chartManager.createChart('health-chart', healthConfig);

    // Impact chart
    const impactData = this.dataManager.getData('impact');
    const impactConfig = {
      type: 'radar',
      data: {
        labels: impactData.map(d => d.practice),
        datasets: [{
          label: 'Diversity Impact',
          data: impactData.map(d => d.diversity),
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderColor: CONFIG.CHART_COLORS.success,
          borderWidth: 2
        }, {
          label: 'Health Impact',
          data: impactData.map(d => d.health),
          backgroundColor: 'rgba(255, 152, 0, 0.2)',
          borderColor: CONFIG.CHART_COLORS.warning,
          borderWidth: 2
        }, {
          label: 'Activity Impact',
          data: impactData.map(d => d.activity),
          backgroundColor: 'rgba(244, 67, 54, 0.2)',
          borderColor: CONFIG.CHART_COLORS.error,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Impact of Farming Practices on Microbial Health'
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100
          }
        },
        animation: {
          duration: CONFIG.ANIMATION_DURATION
        }
      }
    };
    this.chartManager.createChart('impact-chart', impactConfig);
  }

  // Update diversity chart
  updateDiversityChart() {
    const newData = dataGenerators.generateDiversityData(this.currentFilters.diversityPractice);
    this.dataManager.setData('diversity', newData);
    this.chartManager.updateChart('diversity-chart', {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Microbial Diversity Index',
        data: newData,
        borderColor: CONFIG.CHART_COLORS.primary,
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        fill: true,
        tension: 0.4
      }]
    });
  }

  // Update health chart
  updateHealthChart() {
    const newData = dataGenerators.generateHealthData(this.currentFilters.healthMetric);
    this.dataManager.setData('health', newData);
    this.chartManager.updateChart('health-chart', {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Population Health',
        data: newData,
        backgroundColor: CONFIG.CHART_COLORS.secondary,
        borderColor: CONFIG.CHART_COLORS.secondary,
        borderWidth: 1
      }]
    });
  }

  // Update impact chart
  updateImpactChart() {
    const newData = dataGenerators.generateImpactData(this.currentFilters.impactComparison);
    this.dataManager.setData('impact', newData);
    this.chartManager.updateChart('impact-chart', {
      labels: newData.map(d => d.practice),
      datasets: [{
        label: 'Diversity Impact',
        data: newData.map(d => d.diversity),
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderColor: CONFIG.CHART_COLORS.success,
        borderWidth: 2
      }, {
        label: 'Health Impact',
        data: newData.map(d => d.health),
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
        borderColor: CONFIG.CHART_COLORS.warning,
        borderWidth: 2
      }, {
        label: 'Activity Impact',
        data: newData.map(d => d.activity),
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        borderColor: CONFIG.CHART_COLORS.error,
        borderWidth: 2
      }]
    });
  }

  // Update UI elements
  updateUI() {
    this.updateDiversityTable();
    this.updateHealthIndicators();
    this.updateImpactSummary();
    this.updateRecommendations();
  }

  // Update diversity table
  updateDiversityTable() {
    const diversityData = this.dataManager.getData('diversity');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const tableRows = months.map((month, index) => `
      <tr>
        <td>${month}</td>
        <td>${diversityData[index]}</td>
        <td>${(diversityData[index] * 0.8).toFixed(1)}</td>
        <td>${(diversityData[index] > 90 ? 'High' : diversityData[index] > 70 ? 'Medium' : 'Low')}</td>
      </tr>
    `).join('');
    this.uiManager.updateElement('diversity-table-body', tableRows);
  }

  // Update health indicators
  updateHealthIndicators() {
    const healthData = this.dataManager.getData('health');
    const latestValue = healthData[healthData.length - 1];
    const averageValue = healthData.reduce((a, b) => a + b, 0) / healthData.length;
    const trend = latestValue > averageValue ? 'Increasing' : 'Decreasing';

    const indicators = `
      <div class="health-indicator">
        <h4>Current Level</h4>
        <div class="value">${latestValue}</div>
        <div class="unit">units</div>
      </div>
      <div class="health-indicator">
        <h4>Average Level</h4>
        <div class="value">${averageValue.toFixed(1)}</div>
        <div class="unit">units</div>
      </div>
      <div class="health-indicator">
        <h4>Trend</h4>
        <div class="value">${trend}</div>
        <div class="unit">direction</div>
      </div>
    `;
    this.uiManager.updateElement('health-indicators', indicators);
  }

  // Update impact summary
  updateImpactSummary() {
    const impactData = this.dataManager.getData('impact');
    const summary = impactData.map(item => `
      <div class="impact-item">
        <h4>${item.practice}</h4>
        <div class="score">${item.diversity}%</div>
        <div class="description">Diversity impact score based on microbial community analysis.</div>
      </div>
    `).join('');
    this.uiManager.updateElement('impact-summary', summary);
  }

  // Update recommendations
  updateRecommendations() {
    const recommendations = this.dataManager.getData('recommendations');
    const listItems = recommendations.map(rec => `<li>${rec}</li>`).join('');
    this.uiManager.updateElement('recommendations-list', listItems);
  }

  // Setup periodic data updates
  setupPeriodicUpdates() {
    setInterval(() => {
      this.loadInitialData().then(() => {
        this.updateCharts();
        this.updateUI();
      }).catch(error => {
        console.error('Failed to update data:', error);
      });
    }, CONFIG.DATA_REFRESH_INTERVAL);
  }

  // Update all charts
  updateCharts() {
    this.updateDiversityChart();
    this.updateHealthChart();
    this.updateImpactChart();
  }

  // Export data
  exportData(type) {
    switch (type) {
      case 'diversity':
        utils.exportToCSV(
          this.dataManager.getData('diversity').map((value, index) => ({
            month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index],
            diversity: value
          })),
          'soil-microbiome-diversity.csv'
        );
        break;
      case 'health':
        utils.exportToCSV(
          this.dataManager.getData('health').map((value, index) => ({
            month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index],
            health: value
          })),
          'soil-microbiome-health.csv'
        );
        break;
      case 'impact':
        utils.exportToCSV(this.dataManager.getData('impact'), 'soil-microbiome-impact.csv');
        break;
    }
    utils.showNotification('Data exported successfully', 'success');
  }

  // Export chart
  exportChart(chartId) {
    this.chartManager.exportChart(chartId, `soil-microbiome-${chartId}.png`);
    utils.showNotification('Chart exported successfully', 'success');
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.soilMicrobiomeApp = new SoilMicrobiomeApp();
});

// Global functions for HTML event handlers
function exportData(type) {
  if (window.soilMicrobiomeApp) {
    window.soilMicrobiomeApp.exportData(type);
  }
}

function exportChart(chartId) {
  if (window.soilMicrobiomeApp) {
    window.soilMicrobiomeApp.exportChart(chartId);
  }
}

// Error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  utils.showNotification('An error occurred. Please refresh the page.', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  utils.showNotification('An unexpected error occurred.', 'error');
});

// Performance monitoring
if ('performance' in window && 'mark' in window.performance) {
  performance.mark('app-start');
}

// Service worker registration (for PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

// End of soil-microbiome-visualization.js