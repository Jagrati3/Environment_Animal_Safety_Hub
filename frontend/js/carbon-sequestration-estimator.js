/**
 * Carbon Sequestration Estimator JavaScript
 * Comprehensive implementation with calculation engine, visualizations, and scenario simulation
 */

// Global configuration
const CONFIG = {
  // Carbon sequestration rates (tons CO₂/ha/year)
  RATES: {
    coverCropping: {
      legumes: 1.2,
      grasses: 0.8,
      brassicas: 1.0,
      mixed: 1.1
    },
    compostApplication: {
      high: 0.8,
      medium: 0.6,
      low: 0.4
    },
    reducedTillage: {
      'no-till': 0.5,
      minimum: 0.3,
      reduced: 0.2,
      conventional: 0.0
    },
    cropRotation: {
      low: 0.1,
      medium: 0.2,
      high: 0.3
    },
    agroforestry: {
      hardwood: 2.5,
      softwood: 1.8,
      fruit: 1.5,
      'nitrogen-fixing': 3.0
    }
  },

  // Soil type multipliers
  SOIL_MULTIPLIERS: {
    clay: 1.2,
    silt: 1.0,
    sand: 0.8,
    loam: 1.1
  },

  // Climate zone multipliers
  CLIMATE_MULTIPLIERS: {
    temperate: 1.0,
    tropical: 1.3,
    arid: 0.7,
    continental: 0.9
  },

  // Saturation limits (% of maximum capacity)
  SATURATION_LIMITS: {
    clay: 3.0,
    silt: 2.5,
    sand: 1.5,
    loam: 2.0
  },

  // Time constants
  DECOMPOSITION_RATE: 0.05, // Annual decomposition rate
  SATURATION_YEARS: 20,     // Years to reach saturation

  // Economic values
  CARBON_CREDIT_PRICE: 25,  // $/ton CO₂
  CAR_EQUIVALENT: 4.6       // tons CO₂ per car per year
};

// Carbon sequestration calculation engine
class CarbonCalculator {
  constructor() {
    this.baseRates = CONFIG.RATES;
    this.soilMultiplier = 1.0;
    this.climateMultiplier = 1.0;
    this.currentCarbon = 0;
    this.saturationLimit = 2.0;
  }

  setSoilType(soilType) {
    this.soilMultiplier = CONFIG.SOIL_MULTIPLIERS[soilType] || 1.0;
    this.saturationLimit = CONFIG.SATURATION_LIMITS[soilType] || 2.0;
  }

  setClimate(climate) {
    this.climateMultiplier = CONFIG.CLIMATE_MULTIPLIERS[climate] || 1.0;
  }

  calculateSequestration(practices, years = 10) {
    const annualRates = [];
    const cumulativeCarbon = [];
    let totalCarbon = 0;

    for (let year = 1; year <= years; year++) {
      let annualRate = 0;

      // Calculate sequestration from each practice
      if (practices.coverCropping && practices.coverCropping.enabled) {
        const rate = this.baseRates.coverCropping[practices.coverCropping.type] || 0;
        const duration = practices.coverCropping.duration / 12; // Convert months to years
        annualRate += rate * duration;
      }

      if (practices.compostApplication && practices.compostApplication.enabled) {
        const rate = this.baseRates.compostApplication[practices.compostApplication.quality] || 0;
        const application = practices.compostApplication.rate;
        annualRate += rate * (application / 5); // Normalized to 5 tons/ha baseline
      }

      if (practices.reducedTillage && practices.reducedTillage.enabled) {
        annualRate += this.baseRates.reducedTillage[practices.reducedTillage.intensity] || 0;
      }

      if (practices.cropRotation && practices.cropRotation.enabled) {
        annualRate += this.baseRates.cropRotation[practices.cropRotation.diversity] || 0;
      }

      if (practices.agroforestry && practices.agroforestry.enabled) {
        const rate = this.baseRates.agroforestry[practices.agroforestry.type] || 0;
        const density = practices.agroforestry.density / 50; // Normalized to 50 trees/ha baseline
        annualRate += rate * density;
      }

      // Apply environmental multipliers
      annualRate *= this.soilMultiplier * this.climateMultiplier;

      // Apply saturation curve (diminishing returns)
      const saturationFactor = Math.max(0, 1 - (totalCarbon / this.saturationLimit));
      annualRate *= saturationFactor;

      // Apply decomposition (carbon loss over time)
      const decomposition = totalCarbon * CONFIG.DECOMPOSITION_RATE;
      annualRate -= decomposition;

      // Ensure non-negative rate
      annualRate = Math.max(0, annualRate);

      totalCarbon += annualRate;
      annualRates.push(annualRate);
      cumulativeCarbon.push(totalCarbon);
    }

    return {
      annualRates,
      cumulativeCarbon,
      totalCarbon,
      averageRate: totalCarbon / years
    };
  }

  getPracticeBreakdown(practices) {
    const breakdown = {};

    if (practices.coverCropping?.enabled) {
      const rate = this.baseRates.coverCropping[practices.coverCropping.type] || 0;
      breakdown['Cover Cropping'] = rate * (practices.coverCropping.duration / 12);
    }

    if (practices.compostApplication?.enabled) {
      const rate = this.baseRates.compostApplication[practices.compostApplication.quality] || 0;
      breakdown['Compost Application'] = rate * (practices.compostApplication.rate / 5);
    }

    if (practices.reducedTillage?.enabled) {
      breakdown['Reduced Tillage'] = this.baseRates.reducedTillage[practices.reducedTillage.intensity] || 0;
    }

    if (practices.cropRotation?.enabled) {
      breakdown['Crop Rotation'] = this.baseRates.cropRotation[practices.cropRotation.diversity] || 0;
    }

    if (practices.agroforestry?.enabled) {
      const rate = this.baseRates.agroforestry[practices.agroforestry.type] || 0;
      breakdown['Agroforestry'] = rate * (practices.agroforestry.density / 50);
    }

    return breakdown;
  }
}

// Chart manager for visualizations
class ChartManager {
  constructor() {
    this.charts = new Map();
  }

  createGaugeChart(elementId, value, maxValue = 5) {
    const ctx = document.getElementById(elementId);
    if (!ctx) return null;

    const percentage = (value / maxValue) * 100;
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [percentage, 100 - percentage],
          backgroundColor: [
            this.getCarbonColor(value, maxValue),
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

  createBreakdownChart(elementId, breakdown) {
    const ctx = document.getElementById(elementId);
    if (!ctx) return null;

    const labels = Object.keys(breakdown);
    const data = Object.values(breakdown);

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: [
            '#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336'
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
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${context.label}: ${value.toFixed(2)} tons CO₂/ha/year (${percentage}%)`;
              }
            }
          }
        }
      }
    });

    this.charts.set(elementId, chart);
    return chart;
  }

  createTrendsChart(elementId, data, years) {
    const ctx = document.getElementById(elementId);
    if (!ctx) return null;

    const labels = Array.from({ length: years }, (_, i) => `Year ${i + 1}`);
    const datasets = [];

    if (data.cumulative) {
      datasets.push({
        label: 'Cumulative Carbon (tons CO₂)',
        data: data.cumulative,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        yAxisID: 'y',
        tension: 0.4
      });
    }

    if (data.annual) {
      datasets.push({
        label: 'Annual Rate (tons CO₂/ha/year)',
        data: data.annual,
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        yAxisID: 'y1',
        tension: 0.4
      });
    }

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets
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
              label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Years'
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Cumulative Carbon (tons CO₂)'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Annual Rate (tons CO₂/ha/year)'
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

  createScenarioChart(elementId, scenarios) {
    const ctx = document.getElementById(elementId);
    if (!ctx) return null;

    const colors = ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336', '#00bcd4'];
    const datasets = scenarios.map((scenario, index) => ({
      label: scenario.name,
      data: scenario.cumulative,
      borderColor: colors[index % colors.length],
      backgroundColor: 'transparent',
      tension: 0.4,
      borderWidth: 2
    }));

    const years = scenarios[0]?.cumulative.length || 10;
    const labels = Array.from({ length: years }, (_, i) => `Year ${i + 1}`);

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets
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
              label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(2)} tons CO₂`
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Years'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Cumulative Carbon Sequestration (tons CO₂)'
            }
          }
        }
      }
    });

    this.charts.set(elementId, chart);
    return chart;
  }

  updateGaugeChart(elementId, value, maxValue = 5) {
    const chart = this.charts.get(elementId);
    if (!chart) return;

    const percentage = Math.min(100, (value / maxValue) * 100);
    chart.data.datasets[0].data = [percentage, 100 - percentage];
    chart.data.datasets[0].backgroundColor[0] = this.getCarbonColor(value, maxValue);
    chart.update('none');
  }

  getCarbonColor(value, maxValue) {
    const ratio = value / maxValue;
    if (ratio < 0.3) return '#f44336';
    if (ratio < 0.6) return '#ff9800';
    if (ratio < 0.8) return '#4caf50';
    return '#2e7d32';
  }

  destroy() {
    this.charts.forEach(chart => chart.destroy());
    this.charts.clear();
  }
}

// Scenario manager
class ScenarioManager {
  constructor(calculator) {
    this.calculator = calculator;
    this.scenarios = [];
    this.presets = {
      'conventional': {
        name: 'Conventional',
        practices: {
          coverCropping: { enabled: false },
          compostApplication: { enabled: false },
          reducedTillage: { enabled: false, intensity: 'conventional' },
          cropRotation: { enabled: false },
          agroforestry: { enabled: false }
        }
      },
      'basic-regenerative': {
        name: 'Basic Regenerative',
        practices: {
          coverCropping: { enabled: true, type: 'legumes', duration: 6 },
          compostApplication: { enabled: false },
          reducedTillage: { enabled: true, intensity: 'minimum' },
          cropRotation: { enabled: false },
          agroforestry: { enabled: false }
        }
      },
      'advanced-regenerative': {
        name: 'Advanced Regenerative',
        practices: {
          coverCropping: { enabled: true, type: 'mixed', duration: 8 },
          compostApplication: { enabled: true, quality: 'high', rate: 5 },
          reducedTillage: { enabled: true, intensity: 'no-till' },
          cropRotation: { enabled: true, diversity: 'high' },
          agroforestry: { enabled: true, type: 'hardwood', density: 50 }
        }
      }
    };
  }

  addScenario(name, practices) {
    const result = this.calculator.calculateSequestration(practices);
    const scenario = {
      id: Date.now(),
      name,
      practices,
      ...result
    };

    this.scenarios.push(scenario);
    return scenario;
  }

  loadPreset(presetId) {
    const preset = this.presets[presetId];
    if (preset) {
      return this.addScenario(preset.name, preset.practices);
    }
    return null;
  }

  removeScenario(scenarioId) {
    this.scenarios = this.scenarios.filter(s => s.id !== scenarioId);
  }

  clearScenarios() {
    this.scenarios = [];
  }

  getScenarios() {
    return this.scenarios;
  }

  getScenarioSummary() {
    return this.scenarios.map(scenario => ({
      name: scenario.name,
      totalCarbon: scenario.totalCarbon,
      annualRate: scenario.averageRate,
      breakEvenYear: this.calculateBreakEvenYear(scenario)
    }));
  }

  calculateBreakEvenYear(scenario) {
    // Simplified break-even calculation
    // In reality, this would consider implementation costs vs carbon credits
    const implementationCost = this.estimateImplementationCost(scenario.practices);
    const annualRevenue = scenario.averageRate * CONFIG.CARBON_CREDIT_PRICE;
    if (annualRevenue === 0) return 'N/A';
    return Math.ceil(implementationCost / annualRevenue);
  }

  estimateImplementationCost(practices) {
    let cost = 0;

    if (practices.coverCropping?.enabled) cost += 200; // $/ha setup
    if (practices.compostApplication?.enabled) cost += practices.compostApplication.rate * 50; // $/ton
    if (practices.reducedTillage?.enabled) cost += 150; // Equipment cost
    if (practices.agroforestry?.enabled) cost += practices.agroforestry.density * 10; // Per tree

    return cost;
  }
}

// Main estimator application
class CarbonSequestrationEstimator {
  constructor() {
    this.calculator = new CarbonCalculator();
    this.chartManager = new ChartManager();
    this.scenarioManager = new ScenarioManager(this.calculator);
    this.currentPractices = this.getDefaultPractices();
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      this.setupEventListeners();
      this.initializeCharts();
      this.updateCalculator();
      this.isInitialized = true;

      console.log('Carbon Sequestration Estimator initialized');
    } catch (error) {
      console.error('Failed to initialize estimator:', error);
    }
  }

  getDefaultPractices() {
    return {
      coverCropping: { enabled: true, type: 'legumes', duration: 6 },
      compostApplication: { enabled: true, quality: 'high', rate: 5 },
      reducedTillage: { enabled: true, intensity: 'minimum' },
      cropRotation: { enabled: false },
      agroforestry: { enabled: false }
    };
  }

  setupEventListeners() {
    // Farm information inputs
    document.getElementById('farmSize')?.addEventListener('input', () => this.updateCalculator());
    document.getElementById('soilType')?.addEventListener('change', (e) => {
      this.calculator.setSoilType(e.target.value);
      this.updateCalculator();
    });
    document.getElementById('climate')?.addEventListener('change', (e) => {
      this.calculator.setClimate(e.target.value);
      this.updateCalculator();
    });
    document.getElementById('timeYears')?.addEventListener('input', () => this.updateCalculator());

    // Practice checkboxes
    document.querySelectorAll('.practice-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const practiceId = e.target.id;
        this.currentPractices[this.getPracticeKey(practiceId)].enabled = e.target.checked;
        this.updateCalculator();
      });
    });

    // Practice controls
    this.setupRangeInputs();
    this.setupSelectInputs();

    // Scenario presets
    document.querySelectorAll('.scenario-preset').forEach(preset => {
      preset.addEventListener('click', (e) => {
        const scenarioId = e.currentTarget.dataset.scenario;
        this.loadScenarioPreset(scenarioId);
      });
    });

    // Chart controls
    document.getElementById('trendView')?.addEventListener('change', (e) => {
      this.updateTrendsChart(e.target.value);
    });

    // Modal controls
    document.querySelector('.modal-close')?.addEventListener('click', () => this.hideModal());
    document.getElementById('methodologyModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'methodologyModal') this.hideModal();
    });
  }

  setupRangeInputs() {
    const ranges = [
      { id: 'coverCropDuration', key: 'coverCropping', subkey: 'duration', display: 'coverCropDurationValue' },
      { id: 'compostRate', key: 'compostApplication', subkey: 'rate', display: 'compostRateValue' },
      { id: 'tillageDepth', key: 'tillageDepth', display: 'tillageDepthValue' },
      { id: 'rotationYears', key: 'cropRotation', subkey: 'years', display: 'rotationYearsValue' },
      { id: 'treeDensity', key: 'agroforestry', subkey: 'density', display: 'treeDensityValue' }
    ];

    ranges.forEach(({ id, key, subkey, display }) => {
      const input = document.getElementById(id);
      const displayEl = document.getElementById(display);

      if (input && displayEl) {
        input.addEventListener('input', (e) => {
          displayEl.textContent = e.target.value;
          if (key && subkey) {
            this.currentPractices[key][subkey] = parseFloat(e.target.value);
          }
          this.updateCalculator();
        });
      }
    });
  }

  setupSelectInputs() {
    const selects = [
      { id: 'coverCropType', key: 'coverCropping', subkey: 'type' },
      { id: 'compostQuality', key: 'compostApplication', subkey: 'quality' },
      { id: 'tillageIntensity', key: 'reducedTillage', subkey: 'intensity' },
      { id: 'rotationDiversity', key: 'cropRotation', subkey: 'diversity' },
      { id: 'treeType', key: 'agroforestry', subkey: 'type' }
    ];

    selects.forEach(({ id, key, subkey }) => {
      const select = document.getElementById(id);
      if (select) {
        select.addEventListener('change', (e) => {
          this.currentPractices[key][subkey] = e.target.value;
          this.updateCalculator();
        });
      }
    });
  }

  getPracticeKey(checkboxId) {
    const mapping = {
      'coverCropping': 'coverCropping',
      'compostApplication': 'compostApplication',
      'reducedTillage': 'reducedTillage',
      'cropRotation': 'cropRotation',
      'agroforestry': 'agroforestry'
    };
    return mapping[checkboxId];
  }

  initializeCharts() {
    // Initialize hero gauge
    this.chartManager.createGaugeChart('heroGauge', 0);

    // Initialize breakdown chart
    this.chartManager.createBreakdownChart('practiceBreakdownChart', {});

    // Initialize trends chart
    this.chartManager.createTrendsChart('carbonTrendsChart', { cumulative: [], annual: [] }, 10);

    // Initialize scenario chart
    this.chartManager.createScenarioChart('scenarioComparisonChart', []);
  }

  updateCalculator() {
    const farmSize = parseFloat(document.getElementById('farmSize')?.value) || 10;
    const years = parseInt(document.getElementById('timeYears')?.value) || 10;

    const result = this.calculator.calculateSequestration(this.currentPractices, years);
    const breakdown = this.calculator.getPracticeBreakdown(this.currentPractices);

    this.updateResults(result, farmSize);
    this.updateBreakdownChart(breakdown);
    this.updateTrendsChart();
    this.updateImpactMetrics(result, farmSize);
  }

  updateResults(result, farmSize) {
    // Update summary values
    const totalCarbon = result.totalCarbon * farmSize;
    const annualRate = result.averageRate;

    document.getElementById('totalCarbon').textContent = totalCarbon.toFixed(2);
    document.getElementById('annualRate').textContent = annualRate.toFixed(2);
    document.getElementById('equivalentCars').textContent = Math.round(totalCarbon / CONFIG.CAR_EQUIVALENT);

    // Update hero gauge
    this.chartManager.updateGaugeChart('heroGauge', annualRate, 5);
    document.getElementById('heroCarbonValue').textContent = annualRate.toFixed(1);
  }

  updateBreakdownChart(breakdown) {
    this.chartManager.createBreakdownChart('practiceBreakdownChart', breakdown);
  }

  updateTrendsChart(view = 'cumulative') {
    const years = parseInt(document.getElementById('timeYears')?.value) || 10;
    const result = this.calculator.calculateSequestration(this.currentPractices, years);

    const data = {
      cumulative: result.cumulativeCarbon,
      annual: result.annualRates
    };

    this.chartManager.createTrendsChart('carbonTrendsChart', data, years);
  }

  updateImpactMetrics(result, farmSize) {
    const totalCarbon = result.totalCarbon * farmSize;

    // Climate impact
    document.getElementById('climateImpact').textContent = totalCarbon.toFixed(0);

    // Economic value
    const economicValue = totalCarbon * CONFIG.CARBON_CREDIT_PRICE;
    document.getElementById('economicValue').textContent = `$${economicValue.toLocaleString()}`;

    // Soil health (simplified metric)
    const soilHealthScore = Math.min(100, result.averageRate * 20);
    document.getElementById('soilHealthScore').textContent = Math.round(soilHealthScore);

    // Water retention (simplified)
    const waterRetention = result.averageRate * 5;
    document.getElementById('waterRetention').textContent = Math.round(waterRetention);
  }

  loadScenarioPreset(scenarioId) {
    // Update UI to show selected preset
    document.querySelectorAll('.scenario-preset').forEach(preset => {
      preset.classList.remove('active');
    });
    document.querySelector(`[data-scenario="${scenarioId}"]`).classList.add('active');

    // Load preset practices
    const preset = this.scenarioManager.presets[scenarioId];
    if (preset) {
      this.currentPractices = { ...preset.practices };
      this.updateUIFromPractices();
      this.updateCalculator();
    }
  }

  updateUIFromPractices() {
    // Update checkboxes
    Object.keys(this.currentPractices).forEach(key => {
      const checkbox = document.getElementById(key);
      if (checkbox) {
        checkbox.checked = this.currentPractices[key].enabled;
      }
    });

    // Update select inputs
    const selects = {
      'coverCropType': 'coverCropping.type',
      'compostQuality': 'compostApplication.quality',
      'tillageIntensity': 'reducedTillage.intensity',
      'rotationDiversity': 'cropRotation.diversity',
      'treeType': 'agroforestry.type'
    };

    Object.entries(selects).forEach(([selectId, path]) => {
      const [practice, property] = path.split('.');
      const select = document.getElementById(selectId);
      if (select && this.currentPractices[practice]) {
        select.value = this.currentPractices[practice][property] || '';
      }
    });

    // Update range inputs
    const ranges = {
      'coverCropDuration': 'coverCropping.duration',
      'compostRate': 'compostApplication.rate',
      'rotationYears': 'cropRotation.years',
      'treeDensity': 'agroforestry.density'
    };

    Object.entries(ranges).forEach(([inputId, path]) => {
      const [practice, property] = path.split('.');
      const input = document.getElementById(inputId);
      const display = document.getElementById(`${inputId}Value`);
      if (input && this.currentPractices[practice]) {
        const value = this.currentPractices[practice][property] || 0;
        input.value = value;
        if (display) display.textContent = value;
      }
    });
  }

  addScenario() {
    const scenarioName = prompt('Enter scenario name:');
    if (scenarioName) {
      this.scenarioManager.addScenario(scenarioName, { ...this.currentPractices });
      this.updateScenarioComparison();
    }
  }

  clearScenarios() {
    this.scenarioManager.clearScenarios();
    this.updateScenarioComparison();
  }

  updateScenarioComparison() {
    const scenarios = this.scenarioManager.getScenarios();
    this.chartManager.createScenarioChart('scenarioComparisonChart', scenarios);
    this.updateScenarioTable();
  }

  updateScenarioTable() {
    const summary = this.scenarioManager.getScenarioSummary();
    const tbody = document.getElementById('scenarioTableBody');

    if (!tbody) return;

    tbody.innerHTML = '';

    summary.forEach(scenario => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${scenario.name}</td>
        <td>${scenario.totalCarbon.toFixed(2)}</td>
        <td>${scenario.annualRate.toFixed(2)}</td>
        <td>${scenario.breakEvenYear}</td>
      `;
      tbody.appendChild(row);
    });
  }

  scrollToCalculator() {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  }

  showTutorial() {
    alert('Tutorial: Select your farming practices, adjust parameters, and see carbon sequestration estimates. Use scenarios to compare different approaches.');
  }

  showMethodology() {
    const modal = document.getElementById('methodologyModal');
    if (modal) {
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  hideModal() {
    const modal = document.getElementById('methodologyModal');
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  resetCalculator() {
    this.currentPractices = this.getDefaultPractices();
    this.updateUIFromPractices();
    this.updateCalculator();
  }

  destroy() {
    this.chartManager.destroy();
    this.isInitialized = false;
  }
}

// Initialize the estimator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Chart.js defaults
  if (typeof Chart !== 'undefined') {
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
    Chart.defaults.plugins.legend.display = true;
  }

  // Create and initialize estimator
  window.estimator = new CarbonSequestrationEstimator();
  window.estimator.initialize();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.estimator) {
    window.estimator.destroy();
  }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CarbonCalculator,
    ChartManager,
    ScenarioManager,
    CarbonSequestrationEstimator
  };
}

/* End of carbon-sequestration-estimator.js */