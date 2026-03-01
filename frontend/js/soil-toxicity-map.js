// Urban Soil Toxicity Exposure Map JS
// Handles map, risk zones, filters, and guidance

document.addEventListener('DOMContentLoaded', () => {
    initSoilMap();
    renderFilters();
    renderRiskDetails();
    renderGardeningGuidance();
});

function initSoilMap() {
    const map = L.map('soil-map').setView([28.6139, 77.2090], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    // Demo risk zones
    const riskZones = [
        {coords: [[28.62,77.21],[28.62,77.22],[28.61,77.22],[28.61,77.21]], type: 'traffic', risk: 'medium'},
        {coords: [[28.61,77.20],[28.61,77.21],[28.60,77.21],[28.60,77.20]], type: 'industrial', risk: 'high'},
        {coords: [[28.615,77.215],[28.615,77.225],[28.605,77.225],[28.605,77.215]], type: 'dumping', risk: 'high'}
    ];
    riskZones.forEach(zone => {
        L.polygon(zone.coords, {
            color: zone.risk === 'high' ? 'red' : 'orange',
            fillOpacity: zone.risk === 'high' ? 0.4 : 0.2
        }).bindPopup(`<b>${zone.type.charAt(0).toUpperCase()+zone.type.slice(1)} Area</b><br>Risk: ${zone.risk}`).addTo(map);
    });
}

function renderFilters() {
    const panel = document.getElementById('filters-panel');
    panel.innerHTML = `
        <h2>Filter Zones</h2>
        <label>Risk Type:
            <select id="risk-type-filter">
                <option value="all">All</option>
                <option value="traffic">Traffic Corridor</option>
                <option value="industrial">Old Industrial Site</option>
                <option value="dumping">Dumping Area</option>
            </select>
        </label>
        <label>Risk Level:
            <select id="risk-level-filter">
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
            </select>
        </label>
        <button id="apply-filters">Apply Filters</button>
    `;
    document.getElementById('apply-filters').onclick = () => {
        // For demo, just reload map (real: filter zones)
        document.getElementById('soil-map').innerHTML = '';
        initSoilMap();
    };
}

function renderRiskDetails() {
    const section = document.getElementById('risk-details');
    section.innerHTML = `
        <h2>Soil Risk Details</h2>
        <ul>
            <li><b>Traffic Corridors:</b> May have lead, PAHs, and heavy metals from vehicle emissions.</li>
            <li><b>Old Industrial Sites:</b> Risk of heavy metals, solvents, and persistent toxins.</li>
            <li><b>Dumping Areas:</b> Unpredictable mix of contaminants, often high risk.</li>
        </ul>
    `;
}

function renderGardeningGuidance() {
    const section = document.getElementById('gardening-guidance');
    section.innerHTML = `
        <h2>Safe Gardening & Remediation</h2>
        <ul>
            <li>Test soil before growing food crops.</li>
            <li>Use raised beds and clean soil in risk zones.</li>
            <li>Grow non-edible plants for initial remediation.</li>
            <li>Add organic matter to bind contaminants.</li>
            <li>Follow local guidelines for soil safety and remediation.</li>
        </ul>
    `;
}
