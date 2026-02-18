// Water Footprint Tracker - Sample Data & UI Logic

document.addEventListener('DOMContentLoaded', function () {
    // Sample data for charts and activities
    const sampleDaily = [120, 110, 130, 100, 90, 115, 125];
    const sampleCategories = [60, 40, 15, 5]; // household, food, products, garden
    const sampleLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Daily Water Chart
    if (window.Chart) {
        new Chart(document.getElementById('dailyWaterChart'), {
            type: 'line',
            data: {
                labels: sampleLabels,
                datasets: [{
                    label: 'Liters Used',
                    data: sampleDaily,
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56,189,248,0.15)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } }
            }
        });
        // Category Breakdown
        new Chart(document.getElementById('categoryBreakdownChart'), {
            type: 'doughnut',
            data: {
                labels: ['Household', 'Food', 'Products', 'Garden'],
                datasets: [{
                    data: sampleCategories,
                    backgroundColor: ['#38bdf8', '#f59e42', '#a78bfa', '#22c55e']
                }]
            },
            options: { cutout: '70%', plugins: { legend: { position: 'bottom' } } }
        });
        // Water Types
        new Chart(document.getElementById('waterTypesChart'), {
            type: 'pie',
            data: {
                labels: ['Direct', 'Virtual'],
                datasets: [{
                    data: [70, 30],
                    backgroundColor: ['#0ea5e9', '#f59e42']
                }]
            },
            options: { plugins: { legend: { position: 'bottom' } } }
        });
    }

    // Fill quick stats with sample data
    document.getElementById('todayUsage').textContent = 120;
    document.getElementById('weeklyAverage').textContent = 113;
    document.getElementById('goalProgress').textContent = '80';
    document.getElementById('waterSaved').textContent = 45;
    document.getElementById('householdTotal').textContent = '60 L';
    document.getElementById('foodTotal').textContent = '40 L';
    document.getElementById('productsTotal').textContent = '15 L';
    document.getElementById('gardenTotal').textContent = '5 L';
    document.getElementById('householdBar').style.width = '60%';
    document.getElementById('foodBar').style.width = '40%';
    document.getElementById('productsBar').style.width = '15%';
    document.getElementById('gardenBar').style.width = '5%';
    document.getElementById('yourUsageBar').style.width = '35%';
    document.getElementById('yourUsageValue').textContent = '120 L/day';
    document.getElementById('waterSavings').textContent = '1200 L';
    document.getElementById('moneySavings').textContent = '$8';
    document.getElementById('carbonSavings').textContent = '2.5 kg';

    // Sample activities
    document.getElementById('activitiesList').innerHTML = `
        <div>Shower: 50L</div>
        <div>Dishwasher: 15L</div>
        <div>Drinking: 2L</div>
    `;

    // Sample badges
    document.getElementById('waterBadgesGrid').innerHTML = `
        <div class="badge-card"><span>💧</span><div>First Log</div></div>
        <div class="badge-card"><span>🌱</span><div>Saved 100L</div></div>
        <div class="badge-card"><span>🏆</span><div>Weekly Goal</div></div>
    `;
});
