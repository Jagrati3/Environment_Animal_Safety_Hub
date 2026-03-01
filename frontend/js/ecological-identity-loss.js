// Ecological Identity Loss Page JS

document.addEventListener('DOMContentLoaded', () => {
    // Nature Exposure Tracker
    const exposureLog = [];
    const exposureLogUl = document.getElementById('exposure-log');
    document.getElementById('add-exposure').addEventListener('click', () => {
        const name = document.getElementById('child-name').value.trim();
        const days = parseInt(document.getElementById('exposure-days').value);
        const activity = document.getElementById('activity').value.trim();
        if (!name || isNaN(days) || !activity) return;
        exposureLog.push({ name, days, activity, date: new Date().toLocaleDateString() });
        renderExposureLog();
        document.getElementById('child-name').value = '';
        document.getElementById('exposure-days').value = '';
        document.getElementById('activity').value = '';
    });
    function renderExposureLog() {
        exposureLogUl.innerHTML = '';
        exposureLog.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `${entry.date}: ${entry.name} - ${entry.days} days - ${entry.activity}`;
            exposureLogUl.appendChild(li);
        });
    }

    // Family/School Plan
    let currentPlan = null;
    document.getElementById('save-plan').addEventListener('click', (e) => {
        e.preventDefault();
        const type = document.getElementById('plan-type').value;
        const goal = parseInt(document.getElementById('plan-goal').value);
        const activities = document.getElementById('plan-activities').value.trim();
        if (!goal || !activities) return;
        currentPlan = { type, goal, activities, date: new Date().toLocaleDateString() };
        renderCurrentPlan();
        document.getElementById('plan-goal').value = '';
        document.getElementById('plan-activities').value = '';
    });
    function renderCurrentPlan() {
        const planDiv = document.getElementById('current-plan');
        if (!currentPlan) {
            planDiv.textContent = 'No plan saved yet.';
            return;
        }
        planDiv.innerHTML = `<strong>${currentPlan.type.charAt(0).toUpperCase() + currentPlan.type.slice(1)} Plan</strong><br>
            Goal: ${currentPlan.goal} hours/week<br>
            Activities: ${currentPlan.activities}<br>
            Date: ${currentPlan.date}`;
    }

    // Progress Journey Visualization
    const journeyChart = document.getElementById('journey-chart');
    function renderJourneyChart() {
        journeyChart.innerHTML = '';
        if (exposureLog.length === 0) {
            journeyChart.textContent = 'No exposure data yet.';
            return;
        }
        // Simple bar chart visualization
        const chart = document.createElement('div');
        chart.style.display = 'flex';
        chart.style.gap = '8px';
        exposureLog.forEach(entry => {
            const bar = document.createElement('div');
            bar.style.height = `${entry.days * 20}px`;
            bar.style.width = '32px';
            bar.style.background = '#388e3c';
            bar.style.borderRadius = '4px';
            bar.title = `${entry.name}: ${entry.days} days`;
            chart.appendChild(bar);
        });
        journeyChart.appendChild(chart);
    }
    // Re-render chart when log changes
    const observer = new MutationObserver(renderJourneyChart);
    observer.observe(exposureLogUl, { childList: true });

    // Emotional & Ecological Identity Metrics
    let metrics = null;
    document.getElementById('save-metrics').addEventListener('click', (e) => {
        e.preventDefault();
        const curiosity = parseInt(document.getElementById('curiosity').value);
        const connection = parseInt(document.getElementById('connection').value);
        const stewardship = parseInt(document.getElementById('stewardship').value);
        metrics = { curiosity, connection, stewardship, date: new Date().toLocaleDateString() };
        renderMetricsOverview();
    });
    function renderMetricsOverview() {
        const metricsDiv = document.getElementById('metrics-overview');
        if (!metrics) {
            metricsDiv.textContent = 'No metrics recorded yet.';
            return;
        }
        metricsDiv.innerHTML = `Curiosity: ${metrics.curiosity}/10<br>
            Connection: ${metrics.connection}/10<br>
            Stewardship: ${metrics.stewardship}/10<br>
            Date: ${metrics.date}`;
    }
});
