// School Heat Safety Dashboard JS
// Handles overview, classroom status, hydration, play area, timetable

document.addEventListener('DOMContentLoaded', () => {
    renderDashboardOverview();
    renderClassroomStatus();
    renderHydrationReadiness();
    renderPlayAreaAccess();
    renderTimetableRecommendations();
});

function renderDashboardOverview() {
    const section = document.getElementById('dashboard-overview');
    section.innerHTML = `
        <h2>Heat Risk Summary</h2>
        <div class="alert">Heatwave Alert: Outdoor activities limited, hydration breaks every 30 min recommended.</div>
        <ul>
            <li>Current outdoor temp: <b>39°C</b></li>
            <li>Classrooms at risk: <b>3</b></li>
            <li>Hydration points ready: <b>5/6</b></li>
            <li>Shaded play areas: <b>2</b></li>
        </ul>
    `;
}

function renderClassroomStatus() {
    const section = document.getElementById('classroom-status');
    section.innerHTML = `
        <h2>Classroom Heat & Ventilation</h2>
        <table class="status-table">
            <tr><th>Room</th><th>Temp (°C)</th><th>Ventilation</th><th>Status</th></tr>
            <tr><td>101</td><td>37</td><td>Open windows</td><td style="color:#b71c1c;">At Risk</td></tr>
            <tr><td>102</td><td>35</td><td>Fans</td><td>Safe</td></tr>
            <tr><td>103</td><td>38</td><td>Closed</td><td style="color:#b71c1c;">At Risk</td></tr>
            <tr><td>104</td><td>36</td><td>Open windows</td><td>Safe</td></tr>
            <tr><td>105</td><td>39</td><td>Closed</td><td style="color:#b71c1c;">At Risk</td></tr>
        </table>
    `;
}

function renderHydrationReadiness() {
    const section = document.getElementById('hydration-readiness');
    section.innerHTML = `
        <h2>Hydration Points</h2>
        <ul>
            <li>Water Fountain (Main Hall): Ready</li>
            <li>Water Cooler (Staff Room): Ready</li>
            <li>Water Dispenser (Play Area): Ready</li>
            <li>Water Tap (Cafeteria): Ready</li>
            <li>Water Tap (Block B): Ready</li>
            <li>Water Tap (Block C): <span style="color:#b71c1c;">Needs Maintenance</span></li>
        </ul>
    `;
}

function renderPlayAreaAccess() {
    const section = document.getElementById('play-area-access');
    section.innerHTML = `
        <h2>Shaded Play Area Access</h2>
        <ul>
            <li>Playground: <span style="color:#b71c1c;">Limited shade</span></li>
            <li>Courtyard: Good shade</li>
            <li>Sports Field: <span style="color:#b71c1c;">No shade</span></li>
            <li>Covered Walkway: Good shade</li>
        </ul>
    `;
}

function renderTimetableRecommendations() {
    const section = document.getElementById('timetable-recommendations');
    section.innerHTML = `
        <h2>Heat-Safe Timetable Recommendations</h2>
        <ul>
            <li>Outdoor activities before 10am or after 4pm</li>
            <li>Hydration breaks every 30 min</li>
            <li>Indoor classes during peak heat (11am-3pm)</li>
            <li>Rotate classrooms to avoid prolonged exposure</li>
        </ul>
    `;
}
