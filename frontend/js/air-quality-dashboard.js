/**
 * Air Quality Dashboard - JavaScript
 * Issue #1101 - Real-Time Air Quality & Pollution Dashboard
 * 
 * Features:
 * - Real-time AQI data from OpenWeatherMap API
 * - Geolocation support for automatic location detection
 * - City search functionality
 * - Interactive pollution heatmap with Leaflet.js
 * - Dynamic health advisories based on AQI
 * - Activity recommendations
 */

// API Configuration
// Using OpenWeatherMap API (free tier)
const API_KEY = ''; // Users should add their own API key
const OPEN_WEATHER_API = 'https://api.openweathermap.org/data/2.5';
const GEO_API = 'https://api.openweathermap.org/geo/1.0';

// Demo mode for when API key is not available
const DEMO_MODE = !API_KEY;

// AQI Categories and their properties
const AQI_CATEGORIES = {
    good: {
        min: 0,
        max: 50,
        label: 'Good',
        color: '#00e400',
        class: 'good',
        description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
        advisory: 'Air quality is excellent! Perfect for outdoor activities.',
        icon: '😊'
    },
    moderate: {
        min: 51,
        max: 100,
        label: 'Moderate',
        color: '#ffff00',
        class: 'moderate',
        description: 'Air quality is acceptable. Some pollutants may pose moderate health concern.',
        advisory: 'Air quality is acceptable. Sensitive individuals should limit prolonged outdoor exertion.',
        icon: '😐'
    },
    unhealthySensitive: {
        min: 101,
        max: 150,
        label: 'Unhealthy for Sensitive Groups',
        color: '#ff7e00',
        class: 'unhealthy-sensitive',
        description: 'Members of sensitive groups may experience health effects.',
        advisory: 'People with respiratory issues, elderly, and children should reduce outdoor activities.',
        icon: '😷'
    },
    unhealthy: {
        min: 151,
        max: 200,
        label: 'Unhealthy',
        color: '#ff0000',
        class: 'unhealthy',
        description: 'Everyone may begin to experience health effects.',
        advisory: 'Everyone should reduce prolonged outdoor exertion. Consider wearing an N95 mask outdoors.',
        icon: '🤒'
    },
    veryUnhealthy: {
        min: 201,
        max: 300,
        label: 'Very Unhealthy',
        color: '#8f3f97',
        class: 'very-unhealthy',
        description: 'Health alert: everyone may experience more serious health effects.',
        advisory: 'Avoid outdoor activities. Wear N95 mask if going outside is necessary.',
        icon: '🚨'
    },
    hazardous: {
        min: 301,
        max: 500,
        label: 'Hazardous',
        color: '#7e0023',
        class: 'hazardous',
        description: 'Health warning of emergency conditions.',
        advisory: 'HEALTH EMERGENCY! Stay indoors with windows closed. Use air purifiers.',
        icon: '☠️'
    }
};

// Global variables
let map = null;
let currentMarker = null;
let pollutantChart = null;
let currentLocation = { lat: 28.6139, lon: 77.2090 }; // Default: New Delhi

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    setupEventListeners();
    checkGeolocationPermission();
    initializePollutantChart();

    if (DEMO_MODE) {
        console.log('Running in demo mode. Add your OpenWeatherMap API key for live data.');
        showDemoData();
    }
});

// Setup event listeners
function setupEventListeners() {
    // Search button click
    const searchBtn = document.getElementById('search-btn');
    searchBtn?.addEventListener('click', handleSearch);

    // Location button click
    const locationBtn = document.getElementById('location-btn');
    locationBtn?.addEventListener('click', getUserLocation);

    // Search input enter key
    const searchInput = document.getElementById('city-search');
    searchInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Search input for suggestions
    searchInput?.addEventListener('input', debounce(handleSearchInput, 300));

    // Close advisory button
    const advisoryClose = document.getElementById('advisory-close');
    advisoryClose?.addEventListener('click', () => {
        document.getElementById('health-advisory').style.display = 'none';
    });

    // Map layer controls
    document.querySelectorAll('.map-control-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.map-control-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            updateMapLayer(e.target.dataset.layer);
        });
    });
}

// Initialize Leaflet map
function initializeMap() {
    map = L.map('pollution-map').setView([currentLocation.lat, currentLocation.lon], 10);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add OpenWeatherMap tile layer for pollution visualization
    if (API_KEY) {
        const pollutionLayer = L.tileLayer(
            `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
            { opacity: 0.5 }
        );
        pollutionLayer.addTo(map);
    }
}

// Update map layer based on selection
function updateMapLayer(layer) {
    if (!API_KEY) {
        console.log('Map layers require API key');
        return;
    }

    const layerUrls = {
        aqi: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
        pm25: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
        temp: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`
    };

    // Remove existing overlay layers and add new one
    map.eachLayer((layer) => {
        if (layer._url && layer._url.includes('openweathermap.org/map')) {
            map.removeLayer(layer);
        }
    });

    L.tileLayer(layerUrls[layer], { opacity: 0.5 }).addTo(map);
}

// Check geolocation permission and get location
function checkGeolocationPermission() {
    if ('permissions' in navigator) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'granted') {
                getUserLocation();
            }
        });
    }
}

// Get user's current location
function getUserLocation() {
    showLoading(true);

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                currentLocation = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };

                if (DEMO_MODE) {
                    showDemoData();
                } else {
                    await fetchAirQualityData(currentLocation.lat, currentLocation.lon);
                }

                map.setView([currentLocation.lat, currentLocation.lon], 12);
                showLoading(false);
            },
            (error) => {
                console.error('Geolocation error:', error);
                showLoading(false);
                alert('Unable to get your location. Please search for a city manually.');
            }
        );
    } else {
        showLoading(false);
        alert('Geolocation is not supported by your browser.');
    }
}

// Handle search input for suggestions
async function handleSearchInput(e) {
    const query = e.target.value.trim();
    const suggestionsContainer = document.getElementById('search-suggestions');

    if (query.length < 2) {
        suggestionsContainer.classList.remove('active');
        return;
    }

    if (DEMO_MODE) {
        // Show demo suggestions
        const demoSuggestions = [
            { name: 'New Delhi', country: 'IN', lat: 28.6139, lon: 77.2090 },
            { name: 'Mumbai', country: 'IN', lat: 19.0760, lon: 72.8777 },
            { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
            { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
            { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 }
        ].filter(city => city.name.toLowerCase().includes(query.toLowerCase()));

        displaySuggestions(demoSuggestions, suggestionsContainer);
        return;
    }

    try {
        const response = await fetch(
            `${GEO_API}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
        );
        const cities = await response.json();
        displaySuggestions(cities, suggestionsContainer);
    } catch (error) {
        console.error('Error fetching city suggestions:', error);
    }
}

// Display search suggestions
function displaySuggestions(cities, container) {
    if (cities.length === 0) {
        container.classList.remove('active');
        return;
    }

    container.innerHTML = cities.map(city => `
        <div class="suggestion-item" data-lat="${city.lat}" data-lon="${city.lon}">
            <i class="fa-solid fa-location-dot"></i>
            <span>${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}</span>
        </div>
    `).join('');

    container.classList.add('active');

    // Add click handlers
    container.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            const lat = parseFloat(item.dataset.lat);
            const lon = parseFloat(item.dataset.lon);
            const cityName = item.querySelector('span').textContent;

            document.getElementById('city-search').value = cityName;
            container.classList.remove('active');

            currentLocation = { lat, lon };

            if (DEMO_MODE) {
                showDemoData(cityName);
            } else {
                fetchAirQualityData(lat, lon);
            }

            map.setView([lat, lon], 12);
        });
    });
}

// Handle search
async function handleSearch() {
    const query = document.getElementById('city-search').value.trim();

    if (!query) {
        alert('Please enter a city name');
        return;
    }

    showLoading(true);
    document.getElementById('search-suggestions').classList.remove('active');

    if (DEMO_MODE) {
        showDemoData(query);
        showLoading(false);
        return;
    }

    try {
        // Get coordinates from city name
        const geoResponse = await fetch(
            `${GEO_API}/direct?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
            alert('City not found. Please try another search.');
            showLoading(false);
            return;
        }

        const { lat, lon, name, country } = geoData[0];
        currentLocation = { lat, lon };

        await fetchAirQualityData(lat, lon, `${name}, ${country}`);
        map.setView([lat, lon], 12);

    } catch (error) {
        console.error('Error searching for city:', error);
        alert('Error searching for city. Please try again.');
    }

    showLoading(false);
}

// Fetch air quality and weather data
async function fetchAirQualityData(lat, lon, locationName = null) {
    showLoading(true);

    try {
        // Fetch air quality data
        const aqResponse = await fetch(
            `${OPEN_WEATHER_API}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const aqData = await aqResponse.json();

        // Fetch weather data
        const weatherResponse = await fetch(
            `${OPEN_WEATHER_API}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const weatherData = await weatherResponse.json();

        // Get location name if not provided
        if (!locationName) {
            locationName = weatherData.name || 'Unknown Location';
        }

        // Update UI with data
        updateDashboard(aqData, weatherData, locationName);
        updateMapMarker(lat, lon, aqData.list[0].main.aqi);

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching air quality data. Please try again.');
    }

    showLoading(false);
}

// Update the dashboard with fetched data
function updateDashboard(aqData, weatherData, locationName) {
    const aq = aqData.list[0];
    const components = aq.components;

    // Calculate US EPA AQI from PM2.5 (approximate conversion)
    const pm25 = components.pm2_5;
    const aqiValue = calculateAQI(pm25);
    const category = getAQICategory(aqiValue);

    // Update location
    document.getElementById('current-location').textContent = locationName;
    document.getElementById('last-updated').textContent = new Date().toLocaleString();

    // Update AQI gauge
    updateAQIGauge(aqiValue, category);

    // Update health advisory
    updateHealthAdvisory(category);

    // Update pollutant values
    document.getElementById('pm25-value').textContent = pm25.toFixed(1);
    document.getElementById('pm10-value').textContent = components.pm10.toFixed(1);
    document.getElementById('no2-value').textContent = components.no2.toFixed(1);
    document.getElementById('o3-value').textContent = components.o3.toFixed(1);
    document.getElementById('co-value').textContent = (components.co / 1000).toFixed(2); // Convert to mg/m³
    document.getElementById('so2-value').textContent = components.so2.toFixed(1);

    // Update pollutant indicators
    updatePollutantIndicators(components);

    // Update weather
    updateWeather(weatherData);

    // Update chart
    updatePollutantChart(components);

    // Update activity recommendations
    updateActivityRecommendations(aqiValue);
}

// Calculate US EPA AQI from PM2.5
function calculateAQI(pm25) {
    // US EPA AQI breakpoints for PM2.5
    const breakpoints = [
        { low: 0, high: 12, aqiLow: 0, aqiHigh: 50 },
        { low: 12.1, high: 35.4, aqiLow: 51, aqiHigh: 100 },
        { low: 35.5, high: 55.4, aqiLow: 101, aqiHigh: 150 },
        { low: 55.5, high: 150.4, aqiLow: 151, aqiHigh: 200 },
        { low: 150.5, high: 250.4, aqiLow: 201, aqiHigh: 300 },
        { low: 250.5, high: 500.4, aqiLow: 301, aqiHigh: 500 }
    ];

    for (const bp of breakpoints) {
        if (pm25 >= bp.low && pm25 <= bp.high) {
            return Math.round(
                ((bp.aqiHigh - bp.aqiLow) / (bp.high - bp.low)) * (pm25 - bp.low) + bp.aqiLow
            );
        }
    }

    return pm25 > 500.4 ? 500 : 0;
}

// Get AQI category based on value
function getAQICategory(aqi) {
    if (aqi <= 50) return AQI_CATEGORIES.good;
    if (aqi <= 100) return AQI_CATEGORIES.moderate;
    if (aqi <= 150) return AQI_CATEGORIES.unhealthySensitive;
    if (aqi <= 200) return AQI_CATEGORIES.unhealthy;
    if (aqi <= 300) return AQI_CATEGORIES.veryUnhealthy;
    return AQI_CATEGORIES.hazardous;
}

// Update AQI gauge visualization
function updateAQIGauge(aqi, category) {
    const gaugeFill = document.getElementById('gauge-fill');
    const aqiValue = document.getElementById('aqi-value');
    const statusBadge = document.getElementById('status-badge');
    const statusDescription = document.getElementById('status-description');

    // Update value
    animateNumber(aqiValue, 0, aqi, 1500);

    // Update gauge fill (circle has circumference of ~534 for r=85)
    const maxAqi = 500;
    const percentage = Math.min(aqi / maxAqi, 1);
    const dashOffset = 534 * (1 - percentage);
    gaugeFill.style.strokeDashoffset = dashOffset;
    gaugeFill.style.stroke = category.color;

    // Update status badge
    statusBadge.textContent = category.label;
    statusBadge.className = `status-badge ${category.class}`;

    // Update description
    statusDescription.textContent = category.description;
}

// Animate number from start to end
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic

        element.textContent = Math.round(start + range * easeProgress);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Update health advisory
function updateHealthAdvisory(category) {
    const advisory = document.getElementById('health-advisory');
    const title = document.getElementById('advisory-title');
    const message = document.getElementById('advisory-message');

    advisory.className = `health-advisory ${category.class}`;
    title.textContent = `${category.icon} Health Advisory - ${category.label}`;
    message.textContent = category.advisory;
    advisory.style.display = 'flex';
}

// Update pollutant indicators
function updatePollutantIndicators(components) {
    const indicators = {
        'pm25-indicator': getPollutantLevel(components.pm2_5, 'pm25'),
        'pm10-indicator': getPollutantLevel(components.pm10, 'pm10'),
        'no2-indicator': getPollutantLevel(components.no2, 'no2'),
        'o3-indicator': getPollutantLevel(components.o3, 'o3'),
        'co-indicator': getPollutantLevel(components.co, 'co'),
        'so2-indicator': getPollutantLevel(components.so2, 'so2')
    };

    Object.entries(indicators).forEach(([id, level]) => {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.style.background = level.color;
        }
    });
}

// Get pollutant level color based on concentration
function getPollutantLevel(value, type) {
    const thresholds = {
        pm25: [{ max: 12, color: '#00e400' }, { max: 35, color: '#ffff00' }, { max: 55, color: '#ff7e00' }, { max: 150, color: '#ff0000' }, { max: 250, color: '#8f3f97' }, { max: Infinity, color: '#7e0023' }],
        pm10: [{ max: 54, color: '#00e400' }, { max: 154, color: '#ffff00' }, { max: 254, color: '#ff7e00' }, { max: 354, color: '#ff0000' }, { max: 424, color: '#8f3f97' }, { max: Infinity, color: '#7e0023' }],
        no2: [{ max: 53, color: '#00e400' }, { max: 100, color: '#ffff00' }, { max: 360, color: '#ff7e00' }, { max: 649, color: '#ff0000' }, { max: 1249, color: '#8f3f97' }, { max: Infinity, color: '#7e0023' }],
        o3: [{ max: 54, color: '#00e400' }, { max: 70, color: '#ffff00' }, { max: 85, color: '#ff7e00' }, { max: 105, color: '#ff0000' }, { max: 200, color: '#8f3f97' }, { max: Infinity, color: '#7e0023' }],
        co: [{ max: 4400, color: '#00e400' }, { max: 9400, color: '#ffff00' }, { max: 12400, color: '#ff7e00' }, { max: 15400, color: '#ff0000' }, { max: 30400, color: '#8f3f97' }, { max: Infinity, color: '#7e0023' }],
        so2: [{ max: 35, color: '#00e400' }, { max: 75, color: '#ffff00' }, { max: 185, color: '#ff7e00' }, { max: 304, color: '#ff0000' }, { max: 604, color: '#8f3f97' }, { max: Infinity, color: '#7e0023' }]
    };

    const levels = thresholds[type] || thresholds.pm25;
    for (const level of levels) {
        if (value <= level.max) {
            return { color: level.color };
        }
    }
    return { color: '#7e0023' };
}

// Update weather section
function updateWeather(weatherData) {
    const iconMapping = {
        '01d': 'fa-sun',
        '01n': 'fa-moon',
        '02d': 'fa-cloud-sun',
        '02n': 'fa-cloud-moon',
        '03d': 'fa-cloud',
        '03n': 'fa-cloud',
        '04d': 'fa-cloud',
        '04n': 'fa-cloud',
        '09d': 'fa-cloud-showers-heavy',
        '09n': 'fa-cloud-showers-heavy',
        '10d': 'fa-cloud-sun-rain',
        '10n': 'fa-cloud-moon-rain',
        '11d': 'fa-cloud-bolt',
        '11n': 'fa-cloud-bolt',
        '13d': 'fa-snowflake',
        '13n': 'fa-snowflake',
        '50d': 'fa-smog',
        '50n': 'fa-smog'
    };

    const iconCode = weatherData.weather[0].icon;
    const iconClass = iconMapping[iconCode] || 'fa-cloud-sun';

    document.getElementById('weather-icon').innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
    document.getElementById('temp-value').textContent = Math.round(weatherData.main.temp);
    document.getElementById('weather-desc').textContent = weatherData.weather[0].description;
    document.getElementById('humidity-value').textContent = `${weatherData.main.humidity}%`;
    document.getElementById('wind-value').textContent = `${weatherData.wind.speed} m/s`;
    document.getElementById('visibility-value').textContent = `${(weatherData.visibility / 1000).toFixed(1)} km`;
    document.getElementById('pressure-value').textContent = `${weatherData.main.pressure} hPa`;
}

// Initialize pollutant chart
function initializePollutantChart() {
    const ctx = document.getElementById('pollutant-chart')?.getContext('2d');
    if (!ctx) return;

    pollutantChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['PM2.5', 'PM10', 'NO₂', 'O₃', 'CO', 'SO₂'],
            datasets: [{
                label: 'Current Levels',
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(17, 153, 142, 0.8)',
                    'rgba(240, 147, 251, 0.8)',
                    'rgba(255, 236, 210, 0.8)',
                    'rgba(168, 237, 234, 0.8)',
                    'rgba(210, 153, 194, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(17, 153, 142, 1)',
                    'rgba(240, 147, 251, 1)',
                    'rgba(252, 182, 159, 1)',
                    'rgba(168, 237, 234, 1)',
                    'rgba(210, 153, 194, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8
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
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    cornerRadius: 8,
                    callbacks: {
                        label: function (context) {
                            return `${context.parsed.y} µg/m³`;
                        }
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
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Update pollutant chart
function updatePollutantChart(components) {
    if (!pollutantChart) return;

    pollutantChart.data.datasets[0].data = [
        components.pm2_5,
        components.pm10,
        components.no2,
        components.o3,
        components.co / 100, // Scale down for visibility
        components.so2
    ];

    pollutantChart.update();
}

// Update activity recommendations
function updateActivityRecommendations(aqi) {
    const recommendations = getActivityRecommendations(aqi);

    Object.entries(recommendations).forEach(([activity, status]) => {
        const element = document.getElementById(`${activity}-status`);
        if (element) {
            element.textContent = status.text;
            element.className = `activity-status ${status.class}`;
        }
    });
}

// Get activity recommendations based on AQI
function getActivityRecommendations(aqi) {
    if (aqi <= 50) {
        return {
            walking: { text: 'Great conditions', class: 'safe' },
            jogging: { text: 'Perfect for running', class: 'safe' },
            cycling: { text: 'Ideal weather', class: 'safe' },
            playing: { text: 'Safe for kids', class: 'safe' },
            sensitive: { text: 'All clear', class: 'safe' },
            mask: { text: 'Not needed', class: 'safe' }
        };
    } else if (aqi <= 100) {
        return {
            walking: { text: 'Good conditions', class: 'safe' },
            jogging: { text: 'Acceptable', class: 'moderate' },
            cycling: { text: 'Light exposure OK', class: 'moderate' },
            playing: { text: 'Limited time', class: 'moderate' },
            sensitive: { text: 'Be cautious', class: 'moderate' },
            mask: { text: 'Optional', class: 'moderate' }
        };
    } else if (aqi <= 150) {
        return {
            walking: { text: 'Limit time', class: 'caution' },
            jogging: { text: 'Reduce intensity', class: 'caution' },
            cycling: { text: 'Short trips only', class: 'caution' },
            playing: { text: 'Limit outdoor play', class: 'caution' },
            sensitive: { text: 'Stay indoors', class: 'avoid' },
            mask: { text: 'Recommended', class: 'caution' }
        };
    } else if (aqi <= 200) {
        return {
            walking: { text: 'Avoid if possible', class: 'avoid' },
            jogging: { text: 'Not recommended', class: 'avoid' },
            cycling: { text: 'Avoid', class: 'avoid' },
            playing: { text: 'Keep indoors', class: 'avoid' },
            sensitive: { text: 'Must stay in', class: 'danger' },
            mask: { text: 'N95 required', class: 'avoid' }
        };
    } else if (aqi <= 300) {
        return {
            walking: { text: 'Avoid outdoors', class: 'danger' },
            jogging: { text: 'Do not exercise', class: 'danger' },
            cycling: { text: 'Dangerous', class: 'danger' },
            playing: { text: 'Indoor only', class: 'danger' },
            sensitive: { text: 'Health risk', class: 'danger' },
            mask: { text: 'Essential', class: 'danger' }
        };
    } else {
        return {
            walking: { text: 'STAY INDOORS', class: 'danger' },
            jogging: { text: 'DANGEROUS', class: 'danger' },
            cycling: { text: 'HAZARDOUS', class: 'danger' },
            playing: { text: 'EMERGENCY', class: 'danger' },
            sensitive: { text: 'EMERGENCY', class: 'danger' },
            mask: { text: 'CRITICAL', class: 'danger' }
        };
    }
}

// Update map marker
function updateMapMarker(lat, lon, aqiLevel) {
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    // Calculate AQI from level (OpenWeatherMap uses 1-5 scale)
    const aqiMapping = { 1: 25, 2: 75, 3: 125, 4: 175, 5: 250 };
    const aqi = aqiMapping[aqiLevel] || 50;
    const category = getAQICategory(aqi);

    // Create custom marker
    const markerHtml = `
        <div class="aqi-marker" style="background-color: ${category.color}">
            ${aqi}
        </div>
    `;

    const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-aqi-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });

    currentMarker = L.marker([lat, lon], { icon: customIcon }).addTo(map);

    // Add popup
    currentMarker.bindPopup(`
        <div style="text-align: center;">
            <strong>AQI: ${aqi}</strong><br>
            <span style="color: ${category.color}; font-weight: 600;">${category.label}</span>
        </div>
    `);
}

// Show loading overlay
function showLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.toggle('active', show);
    }
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Show demo data when API key is not available
function showDemoData(cityName = 'New Delhi, India') {
    // Generate realistic demo data
    const demoComponents = {
        pm2_5: Math.random() * 100 + 20,
        pm10: Math.random() * 150 + 30,
        no2: Math.random() * 80 + 10,
        o3: Math.random() * 60 + 20,
        co: Math.random() * 5000 + 500,
        so2: Math.random() * 40 + 5
    };

    const demoWeather = {
        name: cityName,
        main: {
            temp: Math.random() * 25 + 15,
            humidity: Math.random() * 40 + 40,
            pressure: Math.random() * 30 + 1000
        },
        weather: [{
            description: ['Clear sky', 'Partly cloudy', 'Scattered clouds', 'Hazy'][Math.floor(Math.random() * 4)],
            icon: ['01d', '02d', '03d', '50d'][Math.floor(Math.random() * 4)]
        }],
        wind: {
            speed: Math.random() * 5 + 1
        },
        visibility: Math.random() * 8000 + 2000
    };

    const demoAqData = {
        list: [{
            main: { aqi: Math.floor(Math.random() * 5) + 1 },
            components: demoComponents
        }]
    };

    updateDashboard(demoAqData, demoWeather, cityName);

    // Update map marker for demo
    const demoLocations = {
        'New Delhi': { lat: 28.6139, lon: 77.2090 },
        'Mumbai': { lat: 19.0760, lon: 72.8777 },
        'London': { lat: 51.5074, lon: -0.1278 },
        'New York': { lat: 40.7128, lon: -74.0060 },
        'Tokyo': { lat: 35.6762, lon: 139.6503 }
    };

    const loc = Object.values(demoLocations)[Math.floor(Math.random() * 5)];
    updateMapMarker(loc.lat, loc.lon, demoAqData.list[0].main.aqi);
    map.setView([loc.lat, loc.lon], 10);

    showLoading(false);
}

// Close suggestions on outside click
document.addEventListener('click', (e) => {
    const suggestionsContainer = document.getElementById('search-suggestions');
    const searchBox = document.querySelector('.search-box');

    if (!searchBox?.contains(e.target) && !suggestionsContainer?.contains(e.target)) {
        suggestionsContainer?.classList.remove('active');
    }
});

// Console message for developers
console.log(`
🌍 Air Quality Dashboard - Issue #1101
======================================
This dashboard provides real-time air quality and weather data.

To enable live data:
1. Get a free API key from https://openweathermap.org/api
2. Replace the empty API_KEY variable at the top of this file

Currently running in DEMO MODE with simulated data.
`);
