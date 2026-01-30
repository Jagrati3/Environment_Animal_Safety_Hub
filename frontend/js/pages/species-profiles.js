// Species Profiles - JavaScript

// Sample species data
const speciesDatabase = [
    {
        id: 1,
        name: 'Bengal Tiger',
        scientificName: 'Panthera tigris tigris',
        image: 'tiger.jpg',
        conservationStatus: 'endangered',
        habitat: 'Tropical and subtropical forests',
        region: 'asia',
        habitatType: 'forest',
        description: 'The Bengal tiger is a tiger subspecies that lives in South and Southeast Asia.',
        population: {
            current: 2500,
            trend: 'stable',
            lastCensus: 2023,
            data: [
                { year: 2010, count: 1900 },
                { year: 2013, count: 2200 },
                { year: 2016, count: 2400 },
                { year: 2019, count: 2500 },
                { year: 2022, count: 2500 }
            ]
        },
        threats: [
            { name: 'Habitat Loss', severity: 'critical', description: 'Forest fragmentation and conversion for agriculture' },
            { name: 'Poaching', severity: 'critical', description: 'Illegal hunting for fur and body parts' },
            { name: 'Prey Depletion', severity: 'high', description: 'Loss of natural prey species' },
            { name: 'Human-Wildlife Conflict', severity: 'high', description: 'Attacks on livestock and humans near settlements' }
        ],
        conservation: {
            status: 'Endangered (EN)',
            protectionLevel: 'Schedule I (India)',
            strategies: [
                { title: 'Tiger Reserves', description: 'Establishment and management of 50+ tiger reserves across Asia' },
                { title: 'Anti-Poaching Operations', description: 'Ranger patrols and technology deployment' },
                { title: 'Corridor Creation', description: 'Creating protected corridors for tiger movement' },
                { title: 'Community Programs', description: 'Supporting local communities through eco-tourism' }
            ]
        }
    },
    {
        id: 2,
        name: 'Giant Panda',
        scientificName: 'Ailuropoda melanoleuca',
        image: 'panda.jpg',
        conservationStatus: 'vulnerable',
        habitat: 'Bamboo forests in mountains',
        region: 'asia',
        habitatType: 'forest',
        description: 'The giant panda is a black and white bear native to central China, known for its bamboo diet.',
        population: {
            current: 1864,
            trend: 'increasing',
            lastCensus: 2021,
            data: [
                { year: 1980, count: 1000 },
                { year: 1995, count: 1200 },
                { year: 2010, count: 1600 },
                { year: 2015, count: 1800 },
                { year: 2021, count: 1864 }
            ]
        },
        threats: [
            { name: 'Habitat Fragmentation', severity: 'high', description: 'Forest fragmentation isolates populations' },
            { name: 'Low Birth Rate', severity: 'medium', description: 'Breeding challenges in captivity and wild' },
            { name: 'Climate Change', severity: 'medium', description: 'Affects bamboo growth and availability' }
        ],
        conservation: {
            status: 'Vulnerable (VU)',
            protectionLevel: 'First-class protected animal (China)',
            strategies: [
                { title: 'Breeding Programs', description: 'International captive breeding and reintroduction' },
                { title: 'Habitat Protection', description: 'Creation of 33 nature reserves' },
                { title: 'Corridor Restoration', description: 'Creating bamboo forest corridors' }
            ]
        }
    },
    {
        id: 3,
        name: 'African Elephant',
        scientificName: 'Loxodonta africana',
        image: 'elephant.jpg',
        conservationStatus: 'vulnerable',
        habitat: 'Savannas and woodlands',
        region: 'africa',
        habitatType: 'grassland',
        description: 'The African elephant is the largest land animal, inhabiting sub-Saharan Africa.',
        population: {
            current: 400000,
            trend: 'declining',
            lastCensus: 2023,
            data: [
                { year: 1980, count: 1300000 },
                { year: 1995, count: 600000 },
                { year: 2010, count: 500000 },
                { year: 2018, count: 415000 },
                { year: 2023, count: 400000 }
            ]
        },
        threats: [
            { name: 'Poaching', severity: 'critical', description: 'Illegal hunting for ivory' },
            { name: 'Habitat Loss', severity: 'high', description: 'Land conversion and urbanization' },
            { name: 'Human-Wildlife Conflict', severity: 'high', description: 'Crop raiding and property damage' }
        ],
        conservation: {
            status: 'Vulnerable (VU)',
            protectionLevel: 'Listed on CITES Appendix I/II',
            strategies: [
                { title: 'Protected Areas', description: 'Management of national parks and reserves' },
                { title: 'Ivory Trade Ban', description: 'International ban on ivory trade' },
                { title: 'Anti-Poaching', description: 'Increased ranger patrols and technology' }
            ]
        }
    },
    {
        id: 4,
        name: 'Mountain Gorilla',
        scientificName: 'Gorilla beringei beringei',
        image: 'gorilla.jpg',
        conservationStatus: 'critically-endangered',
        habitat: 'Montane rainforests',
        region: 'africa',
        habitatType: 'forest',
        description: 'The mountain gorilla is a subspecies of eastern gorilla found in Central Africa.',
        population: {
            current: 1100,
            trend: 'stable',
            lastCensus: 2021,
            data: [
                { year: 1981, count: 242 },
                { year: 1995, count: 320 },
                { year: 2010, count: 880 },
                { year: 2015, count: 1000 },
                { year: 2021, count: 1100 }
            ]
        },
        threats: [
            { name: 'Habitat Loss', severity: 'critical', description: 'Agricultural expansion and settlements' },
            { name: 'Poaching', severity: 'high', description: 'Illegal hunting and snaring' },
            { name: 'Disease', severity: 'high', description: 'Respiratory infections from human contact' },
            { name: 'Civil Unrest', severity: 'high', description: 'Armed conflict disrupting protection' }
        ],
        conservation: {
            status: 'Critically Endangered (CR)',
            protectionLevel: 'Schedule I protection',
            strategies: [
                { title: 'Protected Areas', description: '2 major national parks with strict protection' },
                { title: 'Community Programs', description: 'Eco-tourism and livelihood projects' },
                { title: 'Research', description: 'Population monitoring and health studies' }
            ]
        }
    },
    {
        id: 5,
        name: 'Sea Turtle',
        scientificName: 'Cheloniidae & Dermochelyidae',
        image: 'turtle.jpg',
        conservationStatus: 'vulnerable',
        habitat: 'Tropical and subtropical oceans',
        region: 'oceania',
        habitatType: 'marine',
        description: 'Sea turtles are marine reptiles found in tropical and subtropical waters worldwide.',
        population: {
            current: 200000,
            trend: 'declining',
            lastCensus: 2022,
            data: [
                { year: 1990, count: 500000 },
                { year: 2000, count: 350000 },
                { year: 2010, count: 250000 },
                { year: 2018, count: 200000 },
                { year: 2022, count: 200000 }
            ]
        },
        threats: [
            { name: 'Plastic Pollution', severity: 'critical', description: 'Ingestion of plastic bags and debris' },
            { name: 'Fishing Nets', severity: 'critical', description: 'Entanglement in commercial fishing gear' },
            { name: 'Climate Change', severity: 'high', description: 'Rising sea levels and changing nesting beaches' },
            { name: 'Egg Poaching', severity: 'high', description: 'Collection of eggs for food and trade' }
        ],
        conservation: {
            status: 'Vulnerable (VU)',
            protectionLevel: 'CITES Appendix I/II',
            strategies: [
                { title: 'Beach Protection', description: 'Protection of nesting beaches and hatcheries' },
                { title: 'Fishing Regulations', description: 'Use of turtle excluder devices (TEDs)' },
                { title: 'Cleanup Programs', description: 'Ocean plastic removal initiatives' }
            ]
        }
    }
];

// DOM Elements
const speciesGrid = document.getElementById('speciesGrid');
const speciesSearch = document.getElementById('speciesSearch');
const conservationFilter = document.getElementById('conservationFilter');
const habitatFilter = document.getElementById('habitatFilter');
const regionFilter = document.getElementById('regionFilter');
const resetFilters = document.getElementById('resetFilters');
const speciesModal = document.getElementById('speciesModal');
const modalClose = document.getElementById('modalClose');
const modalTabButtons = document.querySelectorAll('.modal-tab-button');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displaySpecies(speciesDatabase);
    animateCounters();
    setupEventListeners();
});

// Display Species Cards
function displaySpecies(species) {
    speciesGrid.innerHTML = species.map(s => `
        <div class="species-card" onclick="openSpeciesModal(${s.id})">
            <div class="species-card-image">
                <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                    <i class="fas fa-paw"></i>
                </div>
                <div class="conservation-badge badge-${s.conservationStatus}">
                    ${getConservationLabel(s.conservationStatus)}
                </div>
            </div>
            <div class="species-card-content">
                <div class="species-name">${s.name}</div>
                <div class="species-scientific">${s.scientificName}</div>
                <div class="species-description">${s.description}</div>
                <div class="species-quick-info">
                    <div class="info-item">
                        <div class="info-label">Population</div>
                        <div class="info-value">${s.population.current.toLocaleString()}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Trend</div>
                        <div class="info-value">${capitalize(s.population.trend)}</div>
                    </div>
                </div>
                <button class="view-details-button" onclick="event.stopPropagation();">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    View Details
                </button>
            </div>
        </div>
    `).join('');
}

// Setup Event Listeners
function setupEventListeners() {
    // Search
    speciesSearch.addEventListener('input', filterSpecies);
    
    // Filters
    conservationFilter.addEventListener('change', filterSpecies);
    habitatFilter.addEventListener('change', filterSpecies);
    regionFilter.addEventListener('change', filterSpecies);
    resetFilters.addEventListener('click', resetAllFilters);
    
    // Modal
    modalClose.addEventListener('click', closeSpeciesModal);
    speciesModal.addEventListener('click', (e) => {
        if (e.target === speciesModal) closeSpeciesModal();
    });
    
    // Modal Tabs
    modalTabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            openModalTab(button.dataset.tab);
        });
    });
}

// Filter Species
function filterSpecies() {
    const searchTerm = speciesSearch.value.toLowerCase();
    const conservationStatus = conservationFilter.value;
    const habitat = habitatFilter.value;
    const region = regionFilter.value;
    
    const filtered = speciesDatabase.filter(species => {
        const matchesSearch = species.name.toLowerCase().includes(searchTerm) ||
                            species.scientificName.toLowerCase().includes(searchTerm);
        const matchesConservation = !conservationStatus || species.conservationStatus === conservationStatus;
        const matchesHabitat = !habitat || species.habitatType === habitat;
        const matchesRegion = !region || species.region === region;
        
        return matchesSearch && matchesConservation && matchesHabitat && matchesRegion;
    });
    
    displaySpecies(filtered);
    
    if (filtered.length === 0) {
        speciesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                <p style="color: #999; font-size: 1.1rem;">No species found matching your filters</p>
            </div>
        `;
    }
}

// Reset Filters
function resetAllFilters() {
    speciesSearch.value = '';
    conservationFilter.value = '';
    habitatFilter.value = '';
    regionFilter.value = '';
    displaySpecies(speciesDatabase);
}

// Get Conservation Label
function getConservationLabel(status) {
    const labels = {
        'extinct': 'EX',
        'extinct-wild': 'EW',
        'critically-endangered': 'CR',
        'endangered': 'EN',
        'vulnerable': 'VU',
        'near-threatened': 'NT',
        'least-concern': 'LC'
    };
    return labels[status] || status;
}

// Capitalize Helper
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Open Species Modal
function openSpeciesModal(speciesId) {
    const species = speciesDatabase.find(s => s.id === speciesId);
    if (!species) return;
    
    // Set header
    const modalHeader = document.getElementById('modalHeader');
    modalHeader.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start;">
            <div>
                <div class="modal-species-name">${species.name}</div>
                <div class="modal-species-scientific">${species.scientificName}</div>
                <div class="modal-header-info">
                    <div class="header-info-item">
                        <i class="fa-solid fa-dna"></i>
                        <div class="header-info-text">
                            <span class="header-info-label">Population</span>
                            <span class="header-info-value">${species.population.current.toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="header-info-item">
                        <i class="fa-solid fa-arrow-trend-${species.population.trend === 'increasing' ? 'up' : species.population.trend === 'stable' ? 'down' : 'down'}"></i>
                        <div class="header-info-text">
                            <span class="header-info-label">Trend</span>
                            <span class="header-info-value">${capitalize(species.population.trend)}</span>
                        </div>
                    </div>
                    <div class="header-info-item">
                        <i class="fa-solid fa-shield"></i>
                        <div class="header-info-text">
                            <span class="header-info-label">Status</span>
                            <span class="header-info-value">${species.conservation.status}</span>
                        </div>
                    </div>
                    <div class="header-info-item">
                        <i class="fa-solid fa-location-dot"></i>
                        <div class="header-info-text">
                            <span class="header-info-label">Region</span>
                            <span class="header-info-value">${capitalize(species.region)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Set tab contents
    setupTabContents(species);
    
    // Reset to overview tab
    openModalTab('overview');
    
    // Show modal
    speciesModal.classList.add('active');
}

// Setup Tab Contents
function setupTabContents(species) {
    // Overview Tab
    document.getElementById('overviewTab').innerHTML = `
        <div class="info-section">
            <h3><i class="fa-solid fa-info-circle"></i> About</h3>
            <p style="color: #666; line-height: 1.8;">${species.description}</p>
        </div>
        
        <div class="info-section">
            <h3><i class="fa-solid fa-layer-group"></i> Classification</h3>
            <div class="info-grid">
                <div class="info-card">
                    <div class="info-card-title">Scientific Name</div>
                    <div class="info-card-value">${species.scientificName}</div>
                </div>
                <div class="info-card">
                    <div class="info-card-title">Habitat Type</div>
                    <div class="info-card-value">${capitalize(species.habitatType)}</div>
                </div>
                <div class="info-card">
                    <div class="info-card-title">Geographic Region</div>
                    <div class="info-card-value">${capitalize(species.region)}</div>
                </div>
                <div class="info-card">
                    <div class="info-card-title">Current Population</div>
                    <div class="info-card-value">${species.population.current.toLocaleString()}</div>
                </div>
            </div>
        </div>
    `;
    
    // Habitat Tab
    document.getElementById('habitatTab').innerHTML = `
        <div class="info-section">
            <h3><i class="fa-solid fa-tree"></i> Habitat Description</h3>
            <div class="info-card">
                <div class="info-card-title">Primary Habitat</div>
                <div class="info-card-value">${species.habitat}</div>
            </div>
        </div>
        
        <div class="info-section">
            <h3><i class="fa-solid fa-earth-americas"></i> Geographic Distribution</h3>
            <div class="info-card">
                <div class="info-card-title">Region</div>
                <div class="info-card-value">${capitalize(species.region)}</div>
            </div>
            <div class="info-card" style="margin-top: 15px;">
                <div class="info-card-title">Habitat Type</div>
                <div class="info-card-value">${capitalize(species.habitatType)}</div>
            </div>
        </div>
    `;
    
    // Threats Tab
    document.getElementById('threatsTab').innerHTML = `
        <div class="info-section">
            <h3><i class="fa-solid fa-exclamation-triangle"></i> Major Threats</h3>
            <div style="display: grid; gap: 15px;">
                ${species.threats.map(threat => `
                    <div class="threat-item">
                        <div class="threat-level ${threat.severity}">${capitalize(threat.severity)}</div>
                        <div style="font-weight: 700; color: #333; margin-bottom: 8px;">${threat.name}</div>
                        <div style="color: #666; line-height: 1.6;">${threat.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Conservation Tab
    document.getElementById('conservationTab').innerHTML = `
        <div class="info-section">
            <h3><i class="fa-solid fa-shield"></i> Conservation Status</h3>
            <div class="info-grid">
                <div class="info-card">
                    <div class="info-card-title">IUCN Status</div>
                    <div class="info-card-value">${species.conservation.status}</div>
                </div>
                <div class="info-card">
                    <div class="info-card-title">Protection Level</div>
                    <div class="info-card-value">${species.conservation.protectionLevel}</div>
                </div>
            </div>
        </div>
        
        <div class="info-section">
            <h3><i class="fa-solid fa-heart"></i> Conservation Strategies</h3>
            <div style="display: grid; gap: 15px;">
                ${species.conservation.strategies.map(strategy => `
                    <div class="conservation-strategy">
                        <div class="conservation-strategy-title">
                            <i class="fa-solid fa-check-circle"></i> ${strategy.title}
                        </div>
                        <div class="conservation-strategy-desc">${strategy.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Population Tab
    document.getElementById('populationTab').innerHTML = `
        <div class="info-section">
            <h3><i class="fa-solid fa-chart-line"></i> Population Trends</h3>
            <div style="margin-bottom: 20px;">
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-card-title">Current Population</div>
                        <div class="info-card-value">${species.population.current.toLocaleString()}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-card-title">Population Trend</div>
                        <div class="info-card-value">${capitalize(species.population.trend)}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-card-title">Last Census</div>
                        <div class="info-card-value">${species.population.lastCensus}</div>
                    </div>
                </div>
            </div>
            
            <div class="population-chart">
                <canvas id="populationChart"></canvas>
            </div>
        </div>
    `;
    
    // Render chart after content is added
    setTimeout(() => {
        renderPopulationChart(species);
    }, 100);
}

// Open Modal Tab
function openModalTab(tabName) {
    // Deactivate all tabs
    document.querySelectorAll('.modal-tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.modal-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Activate selected tab
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(capitalize(tabName) + 'Tab').classList.add('active');
}

// Render Population Chart
function renderPopulationChart(species) {
    const canvas = document.getElementById('populationChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: species.population.data.map(d => d.year),
            datasets: [{
                label: 'Population Count',
                data: species.population.data.map(d => d.count),
                borderColor: '#2a5298',
                backgroundColor: 'rgba(42, 82, 152, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2a5298',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: { size: 12, weight: 'bold' }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Close Modal
function closeSpeciesModal() {
    speciesModal.classList.remove('active');
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-count');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// Share Species
document.getElementById('shareSpeciesButton').addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'Species Profile',
            text: 'Check out this endangered species profile!',
            url: window.location.href
        });
    } else {
        alert('Sharing not supported on this device');
    }
});

// Save Species
document.getElementById('saveSpeciesButton').addEventListener('click', () => {
    alert('Species saved to your favorites!');
});
