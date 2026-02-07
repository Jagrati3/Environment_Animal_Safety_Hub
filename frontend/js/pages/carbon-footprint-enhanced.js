/**
 * Enhanced Carbon Footprint Calculator
 * Issue #1855 Implementation
 * Features: Daily/Monthly tracking, AI recommendations, Goals, Community comparison, Offset calculator
 */

// ===== DATA STORAGE =====
class CarbonDataManager {
    constructor() {
        this.storageKey = 'carbon_footprint_data';
        this.goalsKey = 'carbon_goals';
        this.data = this.loadData();
        this.goals = this.loadGoals();
    }

    loadData() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : { entries: [], lastUpdated: null };
    }

    loadGoals() {
        const stored = localStorage.getItem(this.goalsKey);
        return stored ? JSON.parse(stored) : [];
    }

    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    saveGoals() {
        localStorage.setItem(this.goalsKey, JSON.stringify(this.goals));
    }

    addEntry(entry) {
        this.data.entries.push({
            id: Date.now(),
            date: entry.date || new Date().toISOString().split('T')[0],
            timestamp: Date.now(),
            ...entry
        });
        this.data.lastUpdated = new Date().toISOString();
        this.saveData();
    }

    getEntriesByDateRange(startDate, endDate) {
        return this.data.entries.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= startDate && entryDate <= endDate;
        });
    }

    getTodayEntry() {
        const today = new Date().toISOString().split('T')[0];
        return this.data.entries.filter(entry => entry.date === today);
    }

    getWeekEntries() {
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return this.getEntriesByDateRange(weekAgo, today);
    }

    getMonthEntries() {
        const today = new Date();
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        return this.getEntriesByDateRange(monthAgo, today);
    }

    addGoal(goal) {
        this.goals.push({
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: 'active',
            progress: 0,
            ...goal
        });
        this.saveGoals();
    }

    updateGoalProgress(goalId, progress) {
        const goal = this.goals.find(g => g.id === goalId);
        if (goal) {
            goal.progress = progress;
            if (progress >= 100) {
                goal.status = 'completed';
                goal.completedAt = new Date().toISOString();
            }
            this.saveGoals();
        }
    }

    deleteGoal(goalId) {
        this.goals = this.goals.filter(g => g.id !== goalId);
        this.saveGoals();
    }
}

// ===== CARBON CALCULATIONS =====
class CarbonCalculator {
    constructor() {
        // Emission factors (kg CO2 per unit)
        this.factors = {
            transport: {
                car: 0.2, // kg per km
                publicTransit: 0.05,
                motorcycle: 0.1,
                flight: 90, // kg per hour
                bike: 0,
                walk: 0
            },
            energy: {
                electricity: 0.5, // kg per kWh
                gas: 2.0, // kg per m³
                renewable: 0.05
            },
            food: {
                vegan: 4.0, // kg per day
                vegetarian: 5.5,
                pescatarian: 6.5,
                balanced: 7.5,
                'meat-heavy': 10.0
            },
            shopping: {
                clothing: 10, // kg per item
                electronics: 100 // kg per item
            },
            waste: {
                landfill: 0.5, // kg per kg waste
                recycled: 0.1,
                composted: 0.05
            }
        };
    }

    calculateTransport(data) {
        let emissions = 0;
        
        if (data.carDistance) {
            emissions += data.carDistance * this.factors.transport.car;
        }
        if (data.transitDistance) {
            emissions += data.transitDistance * this.factors.transport.publicTransit;
        }
        if (data.flightHours) {
            emissions += data.flightHours * this.factors.transport.flight;
        }
        
        return Number(emissions.toFixed(2));
    }

    calculateEnergy(data) {
        let emissions = 0;
        
        if (data.electricity) {
            const renewablePercent = data.renewablePercent || 0;
            const factor = this.factors.energy.electricity * (1 - renewablePercent / 100);
            emissions += data.electricity * factor;
        }
        if (data.gasUsage) {
            emissions += data.gasUsage * this.factors.energy.gas;
        }
        
        return Number(emissions.toFixed(2));
    }

    calculateFood(data) {
        const dietType = data.dietType || 'balanced';
        const dailyEmissions = this.factors.food[dietType];
        return Number(dailyEmissions.toFixed(2));
    }

    calculateShopping(data) {
        let emissions = 0;
        
        if (data.clothingItems) {
            emissions += data.clothingItems * this.factors.shopping.clothing;
        }
        if (data.electronicsItems) {
            emissions += data.electronicsItems * this.factors.shopping.electronics;
        }
        
        return Number(emissions.toFixed(2));
    }

    calculateWaste(data) {
        let emissions = 0;
        
        if (data.wasteAmount) {
            const recyclingRate = data.recyclingRate || 0;
            const compostingRate = data.compostingRate || 0;
            const landfillRate = 100 - recyclingRate - compostingRate;
            
            emissions += (data.wasteAmount * landfillRate / 100) * this.factors.waste.landfill;
            emissions += (data.wasteAmount * recyclingRate / 100) * this.factors.waste.recycled;
            emissions += (data.wasteAmount * compostingRate / 100) * this.factors.waste.composted;
        }
        
        return Number(emissions.toFixed(2));
    }

    calculateTotal(entry) {
        return {
            transport: this.calculateTransport(entry),
            energy: this.calculateEnergy(entry),
            food: this.calculateFood(entry),
            shopping: this.calculateShopping(entry),
            waste: this.calculateWaste(entry)
        };
    }
}

// ===== AI RECOMMENDATION ENGINE =====
class AIRecommendationEngine {
    constructor(calculator, dataManager) {
        this.calculator = calculator;
        this.dataManager = dataManager;
        this.recommendations = this.getRecommendationDatabase();
    }

    getRecommendationDatabase() {
        return [
            {
                id: 'transport-1',
                category: 'transport',
                title: 'Switch to Public Transportation',
                description: 'Replace 3 car trips per week with public transit to significantly reduce your carbon footprint.',
                impact: 'high',
                difficulty: 'Easy',
                co2Reduction: '450 kg/year',
                moneySaved: '$800',
                timeRequired: '2 weeks to form habit',
                icon: 'fa-bus'
            },
            {
                id: 'transport-2',
                category: 'transport',
                title: 'Bike for Short Distances',
                description: 'Use a bicycle for trips under 5km. Great for health and the environment.',
                impact: 'medium',
                difficulty: 'Easy',
                co2Reduction: '280 kg/year',
                moneySaved: '$500',
                timeRequired: '1 week',
                icon: 'fa-bicycle'
            },
            {
                id: 'transport-3',
                category: 'transport',
                title: 'Optimize Flight Travel',
                description: 'Reduce unnecessary flights by 50% and choose direct flights when possible.',
                impact: 'high',
                difficulty: 'Medium',
                co2Reduction: '1,200 kg/year',
                moneySaved: '$2,000',
                timeRequired: '1 month',
                icon: 'fa-plane'
            },
            {
                id: 'energy-1',
                category: 'energy',
                title: 'Install Solar Panels',
                description: 'Generate your own renewable energy and reduce grid dependency.',
                impact: 'high',
                difficulty: 'Hard',
                co2Reduction: '2,500 kg/year',
                moneySaved: '$1,500',
                timeRequired: '3 months',
                icon: 'fa-solar-panel'
            },
            {
                id: 'energy-2',
                category: 'energy',
                title: 'Upgrade to LED Bulbs',
                description: 'Replace all incandescent bulbs with energy-efficient LEDs.',
                impact: 'medium',
                difficulty: 'Easy',
                co2Reduction: '150 kg/year',
                moneySaved: '$200',
                timeRequired: '1 day',
                icon: 'fa-lightbulb'
            },
            {
                id: 'energy-3',
                category: 'energy',
                title: 'Smart Thermostat',
                description: 'Install a programmable thermostat to optimize heating and cooling.',
                impact: 'high',
                difficulty: 'Medium',
                co2Reduction: '850 kg/year',
                moneySaved: '$300',
                timeRequired: '1 week',
                icon: 'fa-temperature-half'
            },
            {
                id: 'food-1',
                category: 'food',
                title: 'Meatless Mondays',
                description: 'Go vegetarian one day per week to reduce food-related emissions.',
                impact: 'medium',
                difficulty: 'Easy',
                co2Reduction: '180 kg/year',
                moneySaved: '$250',
                timeRequired: '2 weeks',
                icon: 'fa-leaf'
            },
            {
                id: 'food-2',
                category: 'food',
                title: 'Buy Local Produce',
                description: 'Choose locally-sourced food to reduce transportation emissions.',
                impact: 'medium',
                difficulty: 'Easy',
                co2Reduction: '200 kg/year',
                moneySaved: '$150',
                timeRequired: '1 week',
                icon: 'fa-store'
            },
            {
                id: 'food-3',
                category: 'food',
                title: 'Reduce Food Waste',
                description: 'Plan meals better and compost scraps to minimize waste.',
                impact: 'high',
                difficulty: 'Medium',
                co2Reduction: '350 kg/year',
                moneySaved: '$400',
                timeRequired: '3 weeks',
                icon: 'fa-trash-can'
            },
            {
                id: 'shopping-1',
                category: 'shopping',
                title: 'Buy Second-Hand',
                description: 'Purchase pre-owned clothing and electronics when possible.',
                impact: 'medium',
                difficulty: 'Easy',
                co2Reduction: '300 kg/year',
                moneySaved: '$600',
                timeRequired: '1 week',
                icon: 'fa-recycle'
            },
            {
                id: 'shopping-2',
                category: 'shopping',
                title: 'Choose Quality Over Quantity',
                description: 'Invest in durable products that last longer.',
                impact: 'medium',
                difficulty: 'Medium',
                co2Reduction: '250 kg/year',
                moneySaved: '$350',
                timeRequired: '1 month',
                icon: 'fa-star'
            },
            {
                id: 'waste-1',
                category: 'waste',
                title: 'Start Composting',
                description: 'Compost organic waste to reduce methane emissions from landfills.',
                impact: 'medium',
                difficulty: 'Medium',
                co2Reduction: '180 kg/year',
                moneySaved: '$100',
                timeRequired: '2 weeks',
                icon: 'fa-seedling'
            }
        ];
    }

    analyzeFootprint() {
        const entries = this.dataManager.getMonthEntries();
        if (entries.length === 0) return null;

        const totals = { transport: 0, energy: 0, food: 0, shopping: 0, waste: 0 };
        
        entries.forEach(entry => {
            Object.keys(totals).forEach(category => {
                totals[category] += entry[category] || 0;
            });
        });

        // Find highest impact categories
        const categoryScores = Object.entries(totals)
            .map(([category, value]) => ({ category, value }))
            .sort((a, b) => b.value - a.value);

        return categoryScores;
    }

    getPersonalizedRecommendations(limit = 6) {
        const analysis = this.analyzeFootprint();
        if (!analysis) {
            // Return default recommendations
            return this.recommendations.slice(0, limit);
        }

        // Get top 2 categories with highest emissions
        const topCategories = analysis.slice(0, 2).map(c => c.category);
        
        // Filter recommendations for these categories
        let filtered = this.recommendations.filter(rec => 
            topCategories.includes(rec.category)
        );

        // Add some general recommendations
        const general = this.recommendations.filter(rec => 
            !topCategories.includes(rec.category)
        );

        // Mix them: 4 from top categories, 2 general
        return [...filtered.slice(0, 4), ...general.slice(0, 2)];
    }
}

// ===== COMMUNITY DATA (Simulated) =====
class CommunityData {
    constructor() {
        this.globalAverage = 4700; // kg CO2 per year
        this.communityAverage = 3800;
        this.targetGoal = 2000;
        this.totalUsers = 125487;
    }

    getUserRank(userFootprint) {
        // Simulate ranking (in real app, this would come from backend)
        const percentile = (userFootprint / this.globalAverage) * 100;
        const rank = Math.floor((percentile / 100) * this.totalUsers);
        return {
            rank: rank > 0 ? rank : 1,
            percentile: percentile.toFixed(1),
            totalUsers: this.totalUsers
        };
    }

    getLeaderboard() {
        // Simulated leaderboard data
        return [
            { rank: 1, name: 'EcoWarrior_2026', value: '1,245 kg', badge: '🏆' },
            { rank: 2, name: 'GreenGuru', value: '1,398 kg', badge: '🥈' },
            { rank: 3, name: 'ClimateHero', value: '1,502 kg', badge: '🥉' },
            { rank: 4, name: 'SustainableSam', value: '1,687 kg', badge: '⭐' },
            { rank: 5, name: 'ZeroWasteZoe', value: '1,789 kg', badge: '⭐' }
        ];
    }
}

// ===== CHART MANAGER =====
class ChartManager {
    constructor() {
        this.charts = {};
        this.colors = {
            transport: '#ef4444',
            energy: '#f59e0b',
            food: '#10b981',
            shopping: '#3b82f6',
            waste: '#8b5cf6'
        };
    }

    createTrendChart(canvas, data) {
        if (this.charts.trend) {
            this.charts.trend.destroy();
        }

        const ctx = canvas.getContext('2d');
        this.charts.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Daily CO₂',
                    data: data.values,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
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
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 13 },
                        callbacks: {
                            label: (context) => `${context.parsed.y.toFixed(1)} kg CO₂`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: (value) => `${value} kg`
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    createCategoryChart(canvas, data) {
        if (this.charts.category) {
            this.charts.category.destroy();
        }

        const ctx = canvas.getContext('2d');
        const colors = Object.keys(data).map(key => this.colors[key]);

        this.charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(data).map(k => k.charAt(0).toUpperCase() + k.slice(1)),
                datasets: [{
                    data: Object.values(data),
                    backgroundColor: colors,
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: { size: 12, weight: '600' },
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        callbacks: {
                            label: (context) => {
                                const label = context.label;
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percent = ((value / total) * 100).toFixed(1);
                                return `${label}: ${value.toFixed(1)} kg (${percent}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    updateCharts(dataManager, period = 'week') {
        let entries;
        let labels;

        if (period === 'week') {
            entries = dataManager.getWeekEntries();
            labels = this.getLast7Days();
        } else if (period === 'month') {
            entries = dataManager.getMonthEntries();
            labels = this.getLast30Days();
        } else {
            entries = dataManager.data.entries.slice(-365);
            labels = this.getLast365Days();
        }

        // Aggregate data by date
        const dailyTotals = {};
        labels.forEach(date => {
            dailyTotals[date] = 0;
        });

        entries.forEach(entry => {
            if (dailyTotals[entry.date] !== undefined) {
                const total = (entry.transport || 0) + (entry.energy || 0) + 
                             (entry.food || 0) + (entry.shopping || 0) + (entry.waste || 0);
                dailyTotals[entry.date] += total;
            }
        });

        const trendData = {
            labels: labels,
            values: labels.map(date => dailyTotals[date])
        };

        // Category totals
        const categoryTotals = {
            transport: 0,
            energy: 0,
            food: 0,
            shopping: 0,
            waste: 0
        };

        entries.forEach(entry => {
            Object.keys(categoryTotals).forEach(category => {
                categoryTotals[category] += entry[category] || 0;
            });
        });

        this.createTrendChart(document.getElementById('trendChart'), trendData);
        this.createCategoryChart(document.getElementById('categoryChart'), categoryTotals);
    }

    getLast7Days() {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toISOString().split('T')[0]);
        }
        return days;
    }

    getLast30Days() {
        const days = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toISOString().split('T')[0]);
        }
        return days;
    }

    getLast365Days() {
        const days = [];
        for (let i = 364; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toISOString().split('T')[0]);
        }
        return days;
    }
}

// ===== UI MANAGER =====
class UIManager {
    constructor(dataManager, calculator, aiEngine, community, chartManager) {
        this.dataManager = dataManager;
        this.calculator = calculator;
        this.aiEngine = aiEngine;
        this.community = community;
        this.chartManager = chartManager;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDashboard();
        this.animateStats();
    }

    setupEventListeners() {
        // Hero buttons
        document.getElementById('getDashboard')?.addEventListener('click', () => {
            document.getElementById('dashboardSection').scrollIntoView({ behavior: 'smooth' });
        });

        document.getElementById('startTracking')?.addEventListener('click', () => {
            this.openCalculatorModal();
        });

        // Add entry button
        document.getElementById('addEntryBtn')?.addEventListener('click', () => {
            this.openCalculatorModal();
        });

        // Calculator modal
        document.getElementById('closeCalculator')?.addEventListener('click', () => {
            this.closeModal('calculatorModal');
        });

        document.getElementById('cancelEntry')?.addEventListener('click', () => {
            this.closeModal('calculatorModal');
        });

        // Form tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Form submission
        document.getElementById('carbonEntryForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Goal modal
        document.getElementById('createGoalBtn')?.addEventListener('click', () => {
            this.openGoalModal();
        });

        document.getElementById('setFirstGoal')?.addEventListener('click', () => {
            this.openGoalModal();
        });

        document.getElementById('closeGoalModal')?.addEventListener('click', () => {
            this.closeModal('goalModal');
        });

        document.getElementById('cancelGoal')?.addEventListener('click', () => {
            this.closeModal('goalModal');
        });

        document.getElementById('goalForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleGoalSubmit();
        });

        // Chart period buttons
        document.querySelectorAll('.chart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.chartManager.updateCharts(this.dataManager, e.target.dataset.period);
            });
        });

        // Refresh recommendations
        document.getElementById('refreshRecommendations')?.addEventListener('click', () => {
            this.updateRecommendations();
        });

        // Range sliders
        document.querySelectorAll('.range-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const valueSpan = e.target.parentElement.querySelector('.range-value span');
                if (valueSpan) {
                    valueSpan.textContent = e.target.value;
                }
            });
        });

        // FAB
        document.querySelector('.fab-main')?.addEventListener('click', () => {
            document.querySelector('.quick-actions-fab').classList.toggle('active');
        });

        // FAB options
        document.querySelectorAll('.fab-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleFabAction(action);
            });
        });

        // Set today's date as default
        const dateInput = document.getElementById('entryDate');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
            dateInput.max = new Date().toISOString().split('T')[0];
        }
    }

    openCalculatorModal() {
        document.getElementById('calculatorModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    openGoalModal() {
        document.getElementById('goalModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
            if (content.id === tabName + 'Tab') {
                content.classList.add('active');
            }
        });
    }

    handleFormSubmit() {
        const activeTab = document.querySelector('.tab-content.active').id;
        
        let entry = {
            date: document.getElementById('entryDate').value,
            notes: document.getElementById('entryNotes').value
        };

        if (activeTab === 'quickTab') {
            entry.transport = parseFloat(document.getElementById('quickTransport').value) || 0;
            entry.energy = parseFloat(document.getElementById('quickEnergy').value) || 0;
            entry.food = parseFloat(document.getElementById('quickFood').value) || 0;
            entry.shopping = parseFloat(document.getElementById('quickShopping').value) || 0;
            entry.waste = parseFloat(document.getElementById('quickWaste').value) || 0;
        } else {
            // Detailed calculation
            const calculated = this.calculator.calculateTotal({
                carDistance: parseFloat(document.getElementById('carDistance').value) || 0,
                transitDistance: parseFloat(document.getElementById('transitDistance').value) || 0,
                flightHours: parseFloat(document.getElementById('flightHours').value) || 0,
                electricity: parseFloat(document.getElementById('electricity').value) || 0,
                gasUsage: parseFloat(document.getElementById('gasUsage').value) || 0,
                renewablePercent: parseFloat(document.getElementById('renewablePercent').value) || 0,
                dietType: document.getElementById('dietType').value
            });
            
            entry = { ...entry, ...calculated };
        }

        this.dataManager.addEntry(entry);
        this.updateDashboard();
        this.closeModal('calculatorModal');
        
        // Reset form
        document.getElementById('carbonEntryForm').reset();
        document.getElementById('entryDate').value = new Date().toISOString().split('T')[0];
        
        this.showNotification('Entry added successfully!', 'success');
    }

    handleGoalSubmit() {
        const goal = {
            name: document.getElementById('goalName').value,
            target: parseFloat(document.getElementById('goalTarget').value),
            duration: parseInt(document.getElementById('goalDuration').value),
            categories: Array.from(document.querySelectorAll('.checkbox-label input:checked')).map(cb => cb.value),
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + parseInt(document.getElementById('goalDuration').value) * 24 * 60 * 60 * 1000).toISOString()
        };

        this.dataManager.addGoal(goal);
        this.updateGoals();
        this.closeModal('goalModal');
        
        // Reset form
        document.getElementById('goalForm').reset();
        
        this.showNotification('Goal created successfully!', 'success');
    }

    handleFabAction(action) {
        switch(action) {
            case 'quick-entry':
                this.openCalculatorModal();
                this.switchTab('quick');
                break;
            case 'set-goal':
                this.openGoalModal();
                break;
            case 'view-history':
                document.getElementById('dashboardSection').scrollIntoView({ behavior: 'smooth' });
                break;
        }
        document.querySelector('.quick-actions-fab').classList.remove('active');
    }

    updateDashboard() {
        this.updateTodaySummary();
        this.updateQuickStats();
        this.updateGoals();
        this.updateCharts();
        this.updateRecommendations();
        this.updateCommunityComparison();
        this.updateOffsetCalculator();
        this.updateLastUpdated();
    }

    updateTodaySummary() {
        const todayEntries = this.dataManager.getTodayEntry();
        const totals = {
            transport: 0,
            energy: 0,
            food: 0,
            shopping: 0,
            waste: 0
        };

        todayEntries.forEach(entry => {
            Object.keys(totals).forEach(category => {
                totals[category] += entry[category] || 0;
            });
        });

        const totalToday = Object.values(totals).reduce((a, b) => a + b, 0);

        // Update values
        document.getElementById('todayEmissions').textContent = totalToday.toFixed(1);
        document.getElementById('todayTransport').textContent = `${totals.transport.toFixed(1)} kg`;
        document.getElementById('todayEnergy').textContent = `${totals.energy.toFixed(1)} kg`;
        document.getElementById('todayFood').textContent = `${totals.food.toFixed(1)} kg`;
        document.getElementById('todayShopping').textContent = `${totals.shopping.toFixed(1)} kg`;
        document.getElementById('todayWaste').textContent = `${totals.waste.toFixed(1)} kg`;

        // Update progress circle
        const targetDaily = 5.5; // kg (2000 kg/year ÷ 365)
        const progress = Math.min((totalToday / targetDaily) * 100, 100);
        const circle = document.getElementById('todayProgressCircle');
        const circumference = 2 * Math.PI * 85;
        const offset = circumference - (progress / 100) * circumference;
        circle.style.strokeDashoffset = offset;

        // Update status badge
        const statusBadge = document.getElementById('todayStatus');
        if (totalToday <= targetDaily) {
            statusBadge.innerHTML = '<i class="fas fa-check-circle"></i><span>On Track</span>';
            statusBadge.style.background = '#10b981';
        } else {
            statusBadge.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Over Target</span>';
            statusBadge.style.background = '#f59e0b';
        }
    }

    updateQuickStats() {
        const weekEntries = this.dataManager.getWeekEntries();
        
        // Calculate streak
        let streak = 0;
        const today = new Date();
        for (let i = 0; i < 365; i++) {
            const checkDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
            const dateStr = checkDate.toISOString().split('T')[0];
            const hasEntry = this.dataManager.data.entries.some(e => e.date === dateStr);
            if (hasEntry) {
                streak++;
            } else {
                break;
            }
        }

        document.getElementById('streakDays').textContent = `${streak} day${streak !== 1 ? 's' : ''}`;

        // Badge count (simplified)
        const badgeCount = Math.floor(this.dataManager.data.entries.length / 10);
        document.getElementById('badgeCount').textContent = badgeCount;

        // Weekly average
        if (weekEntries.length > 0) {
            const weekTotal = weekEntries.reduce((sum, entry) => {
                return sum + (entry.transport || 0) + (entry.energy || 0) + 
                       (entry.food || 0) + (entry.shopping || 0) + (entry.waste || 0);
            }, 0);
            const weekAvg = weekTotal / 7;
            document.getElementById('weeklyAvg').textContent = `${weekAvg.toFixed(1)} kg`;
        } else {
            document.getElementById('weeklyAvg').textContent = '0 kg';
        }

        // Goal progress
        const activeGoals = this.dataManager.goals.filter(g => g.status === 'active');
        if (activeGoals.length > 0) {
            const avgProgress = activeGoals.reduce((sum, g) => sum + g.progress, 0) / activeGoals.length;
            document.getElementById('goalProgress').textContent = `${avgProgress.toFixed(0)}%`;
        } else {
            document.getElementById('goalProgress').textContent = '0%';
        }
    }

    updateGoals() {
        const container = document.getElementById('goalsContainer');
        const activeGoals = this.dataManager.goals.filter(g => g.status === 'active');

        if (activeGoals.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bullseye"></i>
                    <p>No active goals yet</p>
                    <button class="btn btn-primary" id="setFirstGoal">Set Your First Goal</button>
                </div>
            `;
            document.getElementById('setFirstGoal').addEventListener('click', () => this.openGoalModal());
            return;
        }

        container.innerHTML = activeGoals.map(goal => `
            <div class="goal-card">
                <div class="goal-header">
                    <div class="goal-info">
                        <h4>${goal.name}</h4>
                        <div class="goal-meta">
                            <span>${goal.target}% reduction</span> • 
                            <span>${goal.duration} days</span> • 
                            <span>${this.getDaysRemaining(goal)} days left</span>
                        </div>
                    </div>
                    <div class="goal-actions">
                        <button class="goal-btn" onclick="uiManager.editGoal(${goal.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="goal-btn" onclick="uiManager.deleteGoalConfirm(${goal.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="goal-progress-bar">
                    <div class="goal-progress-fill" style="width: ${goal.progress}%"></div>
                </div>
                <div class="goal-stats">
                    <div class="goal-stat">
                        <span>Progress:</span>
                        <span>${goal.progress.toFixed(0)}%</span>
                    </div>
                    <div class="goal-stat">
                        <span>Categories:</span>
                        <span>${goal.categories.length}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getDaysRemaining(goal) {
        const endDate = new Date(goal.endDate);
        const today = new Date();
        const diff = endDate - today;
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    deleteGoalConfirm(goalId) {
        if (confirm('Are you sure you want to delete this goal?')) {
            this.dataManager.deleteGoal(goalId);
            this.updateGoals();
            this.showNotification('Goal deleted', 'info');
        }
    }

    updateCharts() {
        this.chartManager.updateCharts(this.dataManager, 'week');
    }

    updateRecommendations() {
        const recommendations = this.aiEngine.getPersonalizedRecommendations(6);
        const grid = document.getElementById('recommendationsGrid');

        grid.innerHTML = recommendations.map(rec => `
            <div class="recommendation-card">
                <div class="recommendation-header">
                    <div class="recommendation-icon">
                        <i class="fas ${rec.icon}"></i>
                    </div>
                    <div class="recommendation-title">
                        <h4>${rec.title}</h4>
                        <div class="recommendation-badges">
                            <span class="badge badge-impact">${rec.impact.toUpperCase()}</span>
                            <span class="badge badge-difficulty">${rec.difficulty}</span>
                        </div>
                    </div>
                </div>
                <div class="recommendation-content">
                    <p>${rec.description}</p>
                    <div class="recommendation-metrics">
                        <div class="metric">
                            <span class="metric-value">${rec.co2Reduction}</span>
                            <span class="metric-label">CO₂ Saved</span>
                        </div>
                        <div class="metric">
                            <span class="metric-value">${rec.moneySaved}</span>
                            <span class="metric-label">$ Saved</span>
                        </div>
                        <div class="metric">
                            <span class="metric-value">${rec.timeRequired}</span>
                            <span class="metric-label">Time</span>
                        </div>
                    </div>
                    <button class="recommendation-action">
                        <i class="fas fa-check"></i>
                        Commit to This
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateCommunityComparison() {
        const yearEntries = this.dataManager.data.entries.slice(-365);
        const yearTotal = yearEntries.reduce((sum, entry) => {
            return sum + (entry.transport || 0) + (entry.energy || 0) + 
                   (entry.food || 0) + (entry.shopping || 0) + (entry.waste || 0);
        }, 0);

        const userFootprint = yearTotal || 3500; // Default if no data
        const ranking = this.community.getUserRank(userFootprint);

        document.getElementById('userRank').textContent = ranking.rank.toLocaleString();
        document.getElementById('totalUsers').textContent = ranking.totalUsers.toLocaleString();
        document.getElementById('userPercentile').textContent = `Top ${ranking.percentile}%`;

        document.getElementById('yourFootprint').textContent = `${userFootprint.toFixed(0)} kg`;
        document.getElementById('communityAvg').textContent = `${this.community.communityAverage} kg`;

        // Update comparison bars
        const maxValue = Math.max(userFootprint, this.community.communityAverage, this.community.targetGoal);
        document.getElementById('yourBar').style.width = `${(userFootprint / maxValue) * 100}%`;
        document.getElementById('communityBar').style.width = `${(this.community.communityAverage / maxValue) * 100}%`;

        // Update leaderboard
        const leaderboard = this.community.getLeaderboard();
        document.getElementById('leaderboardList').innerHTML = leaderboard.map(leader => `
            <div class="leaderboard-item">
                <div class="leader-rank">${leader.rank}</div>
                <div class="leader-info">
                    <div class="leader-name">${leader.name}</div>
                    <div class="leader-value">${leader.value}</div>
                </div>
                <div class="leader-badge">${leader.badge}</div>
            </div>
        `).join('');
    }

    updateOffsetCalculator() {
        const yearEntries = this.dataManager.data.entries.slice(-365);
        const yearTotal = yearEntries.reduce((sum, entry) => {
            return sum + (entry.transport || 0) + (entry.energy || 0) + 
                   (entry.food || 0) + (entry.shopping || 0) + (entry.waste || 0);
        }, 0);

        const treesToPlant = Math.ceil(yearTotal / 22); // 1 tree absorbs ~22kg CO2/year
        const solarPanels = Math.ceil(yearTotal / 1000); // 1 solar panel saves ~1000kg CO2/year
        const offsetCost = Math.ceil(yearTotal * 0.015); // ~$15 per ton CO2

        document.getElementById('treesToPlant').textContent = treesToPlant.toLocaleString();
        document.getElementById('solarPanels').textContent = solarPanels;
        document.getElementById('offsetCost').textContent = `$${offsetCost.toLocaleString()}`;
    }

    updateLastUpdated() {
        const lastUpdated = this.dataManager.data.lastUpdated;
        const element = document.getElementById('lastUpdated');
        
        if (lastUpdated) {
            const date = new Date(lastUpdated);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            
            if (diffMins < 1) {
                element.textContent = 'Just now';
            } else if (diffMins < 60) {
                element.textContent = `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
            } else if (diffMins < 1440) {
                const hours = Math.floor(diffMins / 60);
                element.textContent = `${hours} hour${hours > 1 ? 's' : ''} ago`;
            } else {
                element.textContent = date.toLocaleDateString();
            }
        } else {
            element.textContent = 'Never';
        }
    }

    animateStats() {
        document.querySelectorAll('.stat-number[data-target]').forEach(stat => {
            const target = parseInt(stat.dataset.target);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 30);
        });
    }

    showNotification(message, type = 'success') {
        // Simple notification (can be enhanced with a library)
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ===== INITIALIZATION =====
let dataManager, calculator, aiEngine, community, chartManager, uiManager;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    dataManager = new CarbonDataManager();
    calculator = new CarbonCalculator();
    aiEngine = new AIRecommendationEngine(calculator, dataManager);
    community = new CommunityData();
    chartManager = new ChartManager();
    uiManager = new UIManager(dataManager, calculator, aiEngine, community, chartManager);

    // Add gradient to progress circles (SVG)
    document.querySelectorAll('.circular-progress').forEach(container => {
        const svg = container.querySelector('svg');
        if (svg && !svg.querySelector('#progressGradient')) {
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', 'progressGradient');
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', '#10b981');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', '#059669');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            svg.insertBefore(defs, svg.firstChild);
        }
    });

    console.log('Enhanced Carbon Footprint Calculator initialized!');
});

// Make uiManager globally accessible for inline event handlers
window.uiManager = null;
setTimeout(() => {
    window.uiManager = uiManager;
}, 100);
