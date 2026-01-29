document.addEventListener('DOMContentLoaded', () => {
    // Initialize Map
    const map = L.map('map').setView([51.505, -0.09], 13); // Default to London for demo

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const searchBtn = document.getElementById('searchBtn');
    const resultsContainer = document.getElementById('resultsContainer');

    searchBtn.addEventListener('click', () => {
        const start = document.getElementById('startLocation').value;
        const end = document.getElementById('endLocation').value;

        if (!start || !end) {
            alert('Please enter both start and end locations.');
            return;
        }

        // Mock Calculation Logic
        calculateAndDisplayRoutes(start, end);
    });

    function calculateAndDisplayRoutes(start, end) {
        // Clear previous results
        resultsContainer.innerHTML = '';

        // Simulate Loading
        resultsContainer.innerHTML = '<div style="text-align:center; padding: 20px;"><i class="fa-solid fa-spinner fa-spin fa-2x"></i><p>Calculating eco-routes...</p></div>';

        // Mock Data Generator
        setTimeout(() => {
            // Mock distance: randomly between 2 and 15 km
            const distance = (Math.random() * 13 + 2).toFixed(1);

            const routes = [
                {
                    mode: 'Biking',
                    icon: 'fa-bicycle',
                    color: '#27ae60', // Green
                    time: Math.round(distance * 4), // ~15km/h -> 4 min/km
                    co2: 0,
                    calories: Math.round(distance * 30), // ~30 cal/km
                    recommended: true,
                    details: 'Zero emissions + Great cardio!'
                },
                {
                    mode: 'Walking',
                    icon: 'fa-person-walking',
                    color: '#2ecc71',
                    time: Math.round(distance * 12), // ~5km/h -> 12 min/km
                    co2: 0,
                    calories: Math.round(distance * 50), // ~50 cal/km
                    recommended: false,
                    details: 'Best for health, zero cost.'
                },
                {
                    mode: 'Public Transit',
                    icon: 'fa-bus',
                    color: '#f39c12',
                    time: Math.round(distance * 3) + 5, // Include wait time
                    co2: (distance * 0.04).toFixed(2), // ~40g/km
                    calories: Math.round(distance * 5), // Walking to/from stop
                    recommended: false,
                    details: 'Low carbon footprint.'
                },
                {
                    mode: 'Car Driving',
                    icon: 'fa-car',
                    color: '#e74c3c',
                    time: Math.round(distance * 2), // ~30km/h city driving
                    co2: (distance * 0.2).toFixed(2), // ~200g/km
                    calories: 0,
                    recommended: false,
                    details: 'Highest emissions. Avoid if possible.'
                }
            ];

            renderResults(routes, distance);

            // Update Map (Mock Re-center)
            // In a real app, this would use geocoding results
            map.invalidateSize();
        }, 1500);
    }

    function renderResults(routes, distance) {
        resultsContainer.innerHTML = `<h3 style="margin-bottom:15px;">Routes for ${distance} km</h3>`;

        routes.forEach(route => {
            const card = document.createElement('div');
            card.className = `route-card ${route.recommended ? 'recommended' : ''}`;

            card.innerHTML = `
        <div class="mode-header">
          <div style="display:flex; align-items:center; gap:10px;">
            <div class="mode-icon"><i class="fa-solid ${route.icon}"></i></div>
            <h4 style="margin:0;">${route.mode}</h4>
          </div>
          <span style="font-weight:bold; color:${route.color}">${route.time} min</span>
        </div>
        
        <div class="route-stats">
          <div class="stat-item">
            <span class="stat-label">CO2 Emitted</span>
            <span class="stat-value co2-tag ${route.co2 == 0 ? 'low' : ''}">${route.co2} kg</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Calories</span>
            <span class="stat-value calories-tag">${route.calories} kcal</span>
          </div>
        </div>
        
        <p style="margin-top:10px; font-size:0.9rem; color:#666;">${route.details}</p>
      `;

            // Click event to "select" route
            card.addEventListener('click', () => {
                document.querySelectorAll('.route-card').forEach(c => c.style.border = '1px solid rgba(255,255,255,0.3)');
                card.style.border = `2px solid ${route.color}`;
            });

            resultsContainer.appendChild(card);
        });
    }
});
