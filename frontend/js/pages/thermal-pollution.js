// Thermal Pollution Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeThermalPollutionPage();
});

function initializeThermalPollutionPage() {
    // Initialize interactive elements
    setupTemperatureCalculator();
    setupSpeciesVulnerability();
    setupScrollAnimations();
    setupActionButtons();

    // Load initial species data
    showSpeciesGroup('fish');
}

// Temperature Impact Calculator
function setupTemperatureCalculator() {
    const ambientTemp = document.getElementById('ambientTemp');
    const dischargeTemp = document.getElementById('dischargeTemp');
    const flowRate = document.getElementById('flowRate');

    const ambientDisplay = document.getElementById('ambientDisplay');
    const dischargeDisplay = document.getElementById('dischargeDisplay');
    const flowDisplay = document.getElementById('flowDisplay');

    // Update displays and calculations
    function updateCalculator() {
        const ambient = parseFloat(ambientTemp.value);
        const discharge = parseFloat(dischargeTemp.value);
        const flow = parseFloat(flowRate.value);

        // Update displays
        ambientDisplay.textContent = ambient + '°C';
        dischargeDisplay.textContent = discharge + '°C';
        flowDisplay.textContent = flow + ' m³/s';

        // Calculate impacts
        calculateOxygenImpact(ambient, discharge);
        calculateMetabolicStress(ambient, discharge);
        updateSpeciesImpact(ambient, discharge);
    }

    // Event listeners
    ambientTemp.addEventListener('input', updateCalculator);
    dischargeTemp.addEventListener('input', updateCalculator);
    flowRate.addEventListener('input', updateCalculator);

    // Initial calculation
    updateCalculator();
}

function calculateOxygenImpact(ambientTemp, dischargeTemp) {
    // Simplified oxygen solubility calculation
    // Oxygen solubility decreases by about 1.5-2% per °C increase
    const baseOxygen = 9.2; // mg/L at 20°C
    const tempDiff = dischargeTemp - ambientTemp;
    const oxygenReduction = tempDiff * 0.015; // 1.5% per °C
    const finalOxygen = Math.max(0, baseOxygen * (1 - oxygenReduction));

    const oxygenLevel = document.getElementById('oxygenLevel');
    const oxygenValue = document.getElementById('oxygenValue');
    const oxygenDescription = document.getElementById('oxygenDescription');

    // Update visual
    const percentage = (finalOxygen / 9.2) * 100;
    oxygenLevel.style.width = percentage + '%';

    // Update color based on oxygen level
    if (finalOxygen < 3) {
        oxygenLevel.style.background = 'linear-gradient(to right, #7f1d1d, #dc2626)';
    } else if (finalOxygen < 5) {
        oxygenLevel.style.background = 'linear-gradient(to right, #92400e, #ea580c)';
    } else if (finalOxygen < 7) {
        oxygenLevel.style.background = 'linear-gradient(to right, #ca8a04, #eab308)';
    } else {
        oxygenLevel.style.background = 'linear-gradient(to right, #166534, #22c55e)';
    }

    oxygenValue.textContent = finalOxygen.toFixed(1) + ' mg/L';

    // Update description
    if (finalOxygen < 3) {
        oxygenDescription.textContent = 'Critical oxygen levels - fish mortality likely';
    } else if (finalOxygen < 5) {
        oxygenDescription.textContent = 'Severe oxygen stress - aquatic life at risk';
    } else if (finalOxygen < 7) {
        oxygenDescription.textContent = 'Moderate oxygen depletion - stress on aquatic organisms';
    } else {
        oxygenDescription.textContent = 'Acceptable oxygen levels for most aquatic species';
    }
}

function calculateMetabolicStress(ambientTemp, dischargeTemp) {
    // Metabolic rate increases exponentially with temperature
    // Q10 coefficient ≈ 2 (rate doubles every 10°C)
    const tempDiff = dischargeTemp - ambientTemp;
    const metabolicIncrease = Math.pow(2, tempDiff / 10) - 1; // Percentage increase

    const stressBar = document.getElementById('stressBar');
    const stressLevel = document.getElementById('stressLevel');
    const stressDescription = document.getElementById('stressDescription');

    // Update visual (cap at 100% for display)
    const stressPercentage = Math.min(100, metabolicIncrease * 100);
    stressBar.style.width = stressPercentage + '%';

    // Update color based on stress level
    if (stressPercentage > 80) {
        stressBar.style.background = 'linear-gradient(to right, #7f1d1d, #dc2626)';
        stressLevel.textContent = 'Critical';
        stressDescription.textContent = 'Extreme metabolic stress - immediate mortality risk';
    } else if (stressPercentage > 60) {
        stressBar.style.background = 'linear-gradient(to right, #92400e, #ea580c)';
        stressLevel.textContent = 'High';
        stressDescription.textContent = 'Severe metabolic stress - reproduction impaired';
    } else if (stressPercentage > 40) {
        stressBar.style.background = 'linear-gradient(to right, #ca8a04, #eab308)';
        stressLevel.textContent = 'Moderate';
        stressDescription.textContent = 'Elevated metabolic stress - growth reduced';
    } else if (stressPercentage > 20) {
        stressBar.style.background = 'linear-gradient(to right, #166534, #22c55e)';
        stressLevel.textContent = 'Low';
        stressDescription.textContent = 'Mild metabolic stress - minimal impact';
    } else {
        stressBar.style.background = 'linear-gradient(to right, #166534, #22c55e)';
        stressLevel.textContent = 'Normal';
        stressDescription.textContent = 'Normal metabolic rates - no significant stress';
    }
}

function updateSpeciesImpact(ambientTemp, dischargeTemp) {
    const tempDiff = dischargeTemp - ambientTemp;
    const speciesList = document.getElementById('speciesImpact');

    // Define species thermal tolerances
    const species = [
        { name: 'Cold-water trout', tolerance: 2, status: tempDiff <= 2 ? 'safe' : tempDiff <= 5 ? 'warning' : 'danger' },
        { name: 'Warm-water bass', tolerance: 5, status: tempDiff <= 5 ? 'safe' : tempDiff <= 8 ? 'warning' : 'danger' },
        { name: 'Sensitive invertebrates', tolerance: 3, status: tempDiff <= 3 ? 'safe' : tempDiff <= 6 ? 'warning' : 'danger' }
    ];

    speciesList.innerHTML = species.map(species => `
        <div class="species-item ${species.status}">
            <i class="fas fa-${species.status === 'safe' ? 'check-circle' : species.status === 'warning' ? 'exclamation-triangle' : 'times-circle'}"></i>
            <span>${species.name}</span>
        </div>
    `).join('');
}

// Species Vulnerability System
function setupSpeciesVulnerability() {
    // Event listeners are already set up in HTML
}

function showSpeciesGroup(group) {
    const display = document.getElementById('species-display');

    // Update button states
    document.querySelectorAll('.vulnerability-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const speciesData = {
        fish: [
            { name: 'Atlantic Salmon', range: '0-20°C', tolerance: 'Cold-water species, highly sensitive', status: 'endangered' },
            { name: 'Rainbow Trout', range: '0-25°C', tolerance: 'Cold to cool water, moderate tolerance', status: 'stable' },
            { name: 'Smallmouth Bass', range: '5-30°C', tolerance: 'Warm-water species, good tolerance', status: 'stable' },
            { name: 'Largemouth Bass', range: '10-35°C', tolerance: 'Warm-water species, high tolerance', status: 'stable' },
            { name: 'Bluegill', range: '15-35°C', tolerance: 'Warm-water species, very tolerant', status: 'stable' },
            { name: 'Carp', range: '0-40°C', tolerance: 'Highly tolerant, invasive in many systems', status: 'invasive' }
        ],
        invertebrates: [
            { name: 'Stoneflies', range: '0-15°C', tolerance: 'Cold-water indicators, very sensitive', status: 'declining' },
            { name: 'Mayflies', range: '5-25°C', tolerance: 'Cool to warm water, moderate sensitivity', status: 'declining' },
            { name: 'Caddisflies', range: '5-30°C', tolerance: 'Broad tolerance range', status: 'stable' },
            { name: 'Dragonflies', range: '10-35°C', tolerance: 'Warm-water species, tolerant', status: 'stable' },
            { name: 'Crayfish', range: '5-30°C', tolerance: 'Broad temperature tolerance', status: 'stable' },
            { name: 'Freshwater Mussels', range: '5-25°C', tolerance: 'Temperature sensitive, declining', status: 'endangered' }
        ],
        plants: [
            { name: 'Watercress', range: '5-20°C', tolerance: 'Cool water plant, sensitive to warming', status: 'declining' },
            { name: 'Elodea', range: '10-30°C', tolerance: 'Broad temperature range, invasive', status: 'invasive' },
            { name: 'Water Lilies', range: '15-35°C', tolerance: 'Warm-water plants, tolerant', status: 'stable' },
            { name: 'Duckweed', range: '10-35°C', tolerance: 'Very tolerant floating plant', status: 'stable' },
            { name: 'Cattails', range: '5-35°C', tolerance: 'Extremely tolerant emergent plant', status: 'stable' },
            { name: 'Stonewort', range: '5-25°C', tolerance: 'Cool to warm water algae, sensitive', status: 'declining' }
        ]
    };

    const species = speciesData[group] || [];
    display.innerHTML = `
        <div class="species-grid">
            ${species.map(species => `
                <div class="species-card ${species.status}">
                    <h4>${species.name}</h4>
                    <div class="species-info">
                        <span class="temp-range"><i class="fas fa-thermometer-half"></i> ${species.range}</span>
                        <p class="tolerance">${species.tolerance}</p>
                        <span class="status-badge ${species.status}">${species.status}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Modal System
function showMechanismDetail(type) {
    const mechanisms = {
        cooling: {
            title: 'Power Plant Cooling Systems',
            content: `
                <h3>Once-Through Cooling Systems</h3>
                <p>Traditional power plants use massive amounts of water drawn from nearby water bodies. This water passes through condensers to cool steam back into water, then is discharged at elevated temperatures.</p>

                <h4>Water Usage</h4>
                <ul>
                    <li><strong>Coal plants:</strong> 100-200 gallons per megawatt-hour</li>
                    <li><strong>Nuclear plants:</strong> 600-1,000 gallons per megawatt-hour</li>
                    <li><strong>Gas plants:</strong> 20-50 gallons per megawatt-hour</li>
                </ul>

                <h4>Environmental Impact</h4>
                <ul>
                    <li><strong>Thermal plume:</strong> Heated water spreads 1-5 miles from discharge</li>
                    <li><strong>Seasonal effects:</strong> Most severe in summer when ambient temperatures are highest</li>
                    <li><strong>Coastal impacts:</strong> Salinity changes affect mixing and dispersion</li>
                </ul>

                <h4>Regulatory Limits</h4>
                <p>Most countries limit discharge temperatures to 5-10°C above ambient water temperature, though enforcement varies.</p>
            `
        },
        transfer: {
            title: 'Heat Transfer in Aquatic Environments',
            content: `
                <h3>Thermal Dynamics</h3>
                <p>Heat transfer in water bodies depends on current patterns, depth, and stratification. Warm water can create stable thermal layers that persist for days or weeks.</p>

                <h4>Plume Characteristics</h4>
                <ul>
                    <li><strong>Surface spread:</strong> Warm water initially spreads horizontally</li>
                    <li><strong>Vertical mixing:</strong> Wind and currents distribute heat downward</li>
                    <li><strong>Thermal stratification:</strong> Creates barriers to mixing in lakes</li>
                    <li><strong>Groundwater influence:</strong> Can affect shallow aquifers</li>
                </ul>

                <h4>Seasonal Variations</h4>
                <ul>
                    <li><strong>Summer:</strong> Greatest impact due to high ambient temperatures</li>
                    <li><strong>Winter:</strong> May delay ice formation and affect aquatic life cycles</li>
                    <li><strong>Spring/Fall:</strong> Rapid changes can stress migrating species</li>
                </ul>

                <h4>Modeling Challenges</h4>
                <p>Predicting thermal plume behavior requires complex hydrodynamic models considering wind, currents, and bathymetry.</p>
            `
        },
        oxygen: {
            title: 'Oxygen Dynamics and Solubility',
            content: `
                <h3>Oxygen Solubility Principles</h3>
                <p>Oxygen dissolves in water through diffusion and is essential for aquatic respiration. Solubility decreases with increasing temperature and salinity.</p>

                <h4>Solubility Changes</h4>
                <ul>
                    <li><strong>10°C increase:</strong> ~20% reduction in oxygen solubility</li>
                    <li><strong>20°C increase:</strong> ~30% reduction in oxygen solubility</li>
                    <li><strong>30°C increase:</strong> ~35% reduction in oxygen solubility</li>
                </ul>

                <h4>Respiration Effects</h4>
                <ul>
                    <li><strong>Fish:</strong> Metabolic rate increases 2x for every 10°C rise</li>
                    <li><strong>Invertebrates:</strong> Respiration increases 1.5-2x per 10°C</li>
                    <li><strong>Bacteria:</strong> Decomposition rates accelerate significantly</li>
                </ul>

                <h4>Oxygen Sag Curve</h4>
                <p>Thermal discharges create oxygen sag curves where oxygen levels drop dramatically downstream, creating dead zones where aquatic life cannot survive.</p>

                <h4>Critical Thresholds</h4>
                <ul>
                    <li><strong>Fish:</strong> Need >5 mg/L dissolved oxygen</li>
                    <li><strong>Invertebrates:</strong> Need >3 mg/L dissolved oxygen</li>
                    <li><strong>Decomposition:</strong> Accelerates, consuming more oxygen</li>
                </ul>
            `
        },
        stress: {
            title: 'Biological Stress and Adaptation',
            content: `
                <h3>Physiological Responses</h3>
                <p>Aquatic organisms respond to thermal stress through physiological and behavioral adaptations, but these have limits beyond which survival is threatened.</p>

                <h4>Acute Stress Responses</h4>
                <ul>
                    <li><strong>Enzyme activity:</strong> Increases up to optimal temperature, then declines</li>
                    <li><strong>Heart rate:</strong> Accelerates to meet oxygen demands</li>
                    <li><strong>Gill function:</strong> Increases oxygen uptake but may damage tissues</li>
                    <li><strong>Hormone release:</strong> Stress hormones trigger emergency responses</li>
                </ul>

                <h4>Chronic Effects</h4>
                <ul>
                    <li><strong>Reproductive failure:</strong> Egg development disrupted</li>
                    <li><strong>Growth reduction:</strong> Energy diverted to stress responses</li>
                    <li><strong>Immune suppression:</strong> Increased disease susceptibility</li>
                    <li><strong>Behavioral changes:</strong> Altered migration and feeding patterns</li>
                </ul>

                <h4>Species-Specific Responses</h4>
                <ul>
                    <li><strong>Cold-water fish:</strong> Narrow thermal tolerance, high sensitivity</li>
                    <li><strong>Warm-water fish:</strong> Broader tolerance but still limited</li>
                    <li><strong>Invertebrates:</strong> Often more tolerant but critical for food webs</li>
                    <li><strong>Plants:</strong> Photosynthesis affected, algal blooms may result</li>
                </ul>

                <h4>Adaptation Limits</h4>
                <p>Most species cannot adapt quickly enough to rapid thermal changes. Evolutionary adaptation requires generations and stable environmental conditions.</p>
            `
        }
    };

    const mechanism = mechanisms[type];
    if (mechanism) {
        document.getElementById('mechanismContent').innerHTML = `
            <h2>${mechanism.title}</h2>
            ${mechanism.content}
        `;
        document.getElementById('mechanismModal').style.display = 'block';
    }
}

function showCaseStudy(study) {
    const studies = {
        hudson: {
            title: 'Hudson River - Indian Point Nuclear Plant',
            content: `
                <h3>Background</h3>
                <p>The Indian Point nuclear power plant on the Hudson River has been operating since 1962, discharging warm water that affects over 50 miles of river ecosystem.</p>

                <h4>Impact Assessment</h4>
                <ul>
                    <li><strong>Striped bass:</strong> Delayed spawning, reduced egg survival</li>
                    <li><strong>American shad:</strong> Altered migration timing</li>
                    <li><strong>Water temperature:</strong> Increased by 5-10°C in discharge area</li>
                    <li><strong>Dissolved oxygen:</strong> Reduced by 20-30% in summer months</li>
                </ul>

                <h4>Economic Effects</h4>
                <ul>
                    <li><strong>Fisheries:</strong> $10-20 million annual losses</li>
                    <li><strong>Recreational fishing:</strong> Reduced catch rates</li>
                    <li><strong>Commercial fishing:</strong> Changed species composition</li>
                </ul>

                <h4>Mitigation Efforts</h4>
                <p>The plant installed cooling towers in 2015, reducing thermal discharge by 90%. Monitoring continues to assess ecosystem recovery.</p>
            `
        },
        mile: {
            title: 'Three Mile Island - Post-Accident Recovery',
            content: `
                <h3>1979 Accident Context</h3>
                <p>The Three Mile Island accident led to shutdown of Unit 2, but Unit 1 continued operating, providing a unique opportunity to study thermal pollution effects.</p>

                <h4>Thermal Monitoring</h4>
                <ul>
                    <li><strong>Discharge temperature:</strong> 10-15°C above ambient</li>
                    <li><strong>Plume extent:</strong> 2-3 miles downstream</li>
                    <li><strong>Seasonal variation:</strong> Greatest impact in summer</li>
                </ul>

                <h4>Aquatic Community Changes</h4>
                <ul>
                    <li><strong>Fish species:</strong> Shift from cold-water to warm-water species</li>
                    <li><strong>Invertebrates:</strong> Reduced diversity in benthic communities</li>
                    <li><strong>Algae:</strong> Increased nuisance algal blooms</li>
                </ul>

                <h4>Recovery Studies</h4>
                <p>Long-term monitoring showed gradual ecosystem recovery after discharge reductions, though some changes persist in the river community structure.</p>
            `
        },
        rhine: {
            title: 'Rhine River - Multiple Power Plant Impacts',
            content: `
                <h3>European Context</h3>
                <p>The Rhine River hosts multiple power plants along its course, creating cumulative thermal impacts on one of Europe's most important waterways.</p>

                <h4>Cumulative Effects</h4>
                <ul>
                    <li><strong>Temperature increase:</strong> Up to 8°C in some sections</li>
                    <li><strong>Salmon migration:</strong> Severely impacted by thermal barriers</li>
                    <li><strong>Oxygen levels:</strong> Chronic depletion in summer months</li>
                </ul>

                <h4>International Cooperation</h4>
                <ul>
                    <li><strong>Rhine Commission:</strong> Coordinates environmental monitoring</li>
                    <li><strong>EU directives:</strong> Water Framework Directive compliance</li>
                    <li><strong>Cross-border management:</strong> Switzerland, France, Germany coordination</li>
                </ul>

                <h4>Restoration Success</h4>
                <p>Salmon reintroduction programs combined with thermal discharge reductions have led to partial recovery of migratory fish populations.</p>
            `
        },
        lakes: {
            title: 'Great Lakes - Nearshore Thermal Impacts',
            content: `
                <h3>Great Lakes Context</h3>
                <p>The Great Lakes contain numerous power plants affecting nearshore ecosystems, particularly important for commercial and recreational fisheries.</p>

                <h4>Stratification Effects</h4>
                <ul>
                    <li><strong>Thermal plumes:</strong> Alter natural lake stratification</li>
                    <li><strong>Nearshore warming:</strong> Affects fish spawning habitats</li>
                    <li><strong>Ice formation:</strong> Delayed winter ice cover</li>
                </ul>

                <h4>Species Impacts</h4>
                <ul>
                    <li><strong>Lake trout:</strong> Cold-water species particularly affected</li>
                    <li><strong>Whitefish:</strong> Spawning habitat degradation</li>
                    <li><strong>Yellow perch:</strong> Population shifts due to warming</li>
                </ul>

                <h4>Management Challenges</h4>
                <p>Large lake volumes provide some dilution, but nearshore effects are significant. Climate change complicates thermal pollution assessment.</p>
            `
        }
    };

    const studyData = studies[study];
    if (studyData) {
        document.getElementById('caseStudyContent').innerHTML = `
            <h2>${studyData.title}</h2>
            ${studyData.content}
        `;
        document.getElementById('caseStudyModal').style.display = 'block';
    }
}

function showSolutionDetail(type) {
    const solutions = {
        traditional: {
            title: 'Once-Through Cooling Systems',
            content: `
                <h3>How It Works</h3>
                <p>Water is drawn from a nearby source, passed through heat exchangers to cool steam, and discharged back to the source at elevated temperatures.</p>

                <h4>Advantages</h4>
                <ul>
                    <li><strong>Low capital cost:</strong> Simple design and construction</li>
                    <li><strong>High efficiency:</strong> Minimal energy loss in cooling process</li>
                    <li><strong>Established technology:</strong> Proven reliability</li>
                </ul>

                <h4>Disadvantages</h4>
                <ul>
                    <li><strong>High water usage:</strong> 20-100 gallons per kWh</li>
                    <li><strong>Major thermal pollution:</strong> Significant ecosystem impact</li>
                    <li><strong>Intake entrainment:</strong> Fish and organisms killed at intake</li>
                    <li><strong>Regulatory pressure:</strong> Increasing restrictions</li>
                </ul>

                <h4>Current Status</h4>
                <p>Many once-through systems are being phased out or retrofitted with cooling towers due to environmental regulations.</p>
            `
        },
        towers: {
            title: 'Closed-Loop Cooling Towers',
            content: `
                <h3>How It Works</h3>
                <p>Water circulates in a closed loop through the plant and cooling towers. Heat is dissipated through evaporation, and water is reused with minimal discharge.</p>

                <h4>Advantages</h4>
                <ul>
                    <li><strong>90% less water use:</strong> Dramatically reduced consumption</li>
                    <li><strong>Minimal thermal discharge:</strong> Only evaporation losses</li>
                    <li><strong>Year-round operation:</strong> Not affected by ambient temperatures</li>
                    <li><strong>Regulatory compliance:</strong> Meets modern environmental standards</li>
                </ul>

                <h4>Disadvantages</h4>
                <ul>
                    <li><strong>Higher capital cost:</strong> Significant construction investment</li>
                    <li><strong>Energy consumption:</strong> Fans and pumps require electricity</li>
                    <li><strong>Water treatment:</strong> Chemical treatment needed to prevent scaling</li>
                    <li><strong>Visual impact:</strong> Large structures visible from distance</li>
                </ul>

                <h4>Types of Cooling Towers</h4>
                <ul>
                    <li><strong>Natural draft:</strong> Uses convection, no fans needed</li>
                    <li><strong>Mechanical draft:</strong> Uses fans for air movement</li>
                    <li><strong>Wet cooling:</strong> Water evaporation for cooling</li>
                    <li><strong>Dry cooling:</strong> Air cooling without water loss</li>
                </ul>
            `
        },
        dry: {
            title: 'Dry Cooling Systems',
            content: `
                <h3>How It Works</h3>
                <p>Heat is transferred to air through radiators or heat exchangers, eliminating water use entirely. Used in water-scarce regions or for environmental protection.</p>

                <h4>Advantages</h4>
                <ul>
                    <li><strong>Zero water consumption:</strong> No water withdrawal or discharge</li>
                    <li><strong>No thermal pollution:</strong> No warm water release</li>
                    <li><strong>Environmental protection:</strong> Preserves aquatic ecosystems</li>
                    <li><strong>Drought resilience:</strong> Operates in water-scarce conditions</li>
                </ul>

                <h4>Disadvantages</h4>
                <ul>
                    <li><strong>Highest capital cost:</strong> Most expensive cooling option</li>
                    <li><strong>Lower efficiency:</strong> Reduced power plant efficiency</li>
                    <li><strong>Limited by climate:</strong> Less effective in hot, humid conditions</li>
                    <li><strong>Larger footprint:</strong> Requires more land area</li>
                </ul>

                <h4>Applications</h4>
                <ul>
                    <li><strong>Arid regions:</strong> Water-scarce areas like deserts</li>
                    <li><strong>Environmental protection:</strong> Sensitive aquatic habitats</li>
                    <li><strong>Hybrid systems:</strong> Combined with wet cooling for flexibility</li>
                </ul>

                <h4>Technologies</h4>
                <ul>
                    <li><strong>Air-cooled condensers:</strong> Direct air cooling of steam</li>
                    <li><strong>Heller systems:</strong> Indirect cooling with air</li>
                    <li><strong>Hybrid cooling:</strong> Combines wet and dry methods</li>
                </ul>
            `
        }
    };

    const solution = solutions[type];
    if (solution) {
        document.getElementById('solutionContent').innerHTML = `
            <h2>${solution.title}</h2>
            ${solution.content}
        `;
        document.getElementById('solutionModal').style.display = 'block';
    }
}

function closeModal() {
    document.getElementById('mechanismModal').style.display = 'none';
    document.getElementById('caseStudyModal').style.display = 'none';
    document.getElementById('solutionModal').style.display = 'none';
}

// Action button functions
function learnMore() {
    window.open('https://www.epa.gov/thermal-pollution', '_blank');
    showNotification('Opening EPA thermal pollution resources', 'info');
}

function supportConservation() {
    window.open('https://www.nrdc.org/issues/clean-water', '_blank');
    showNotification('Opening NRDC clean water conservation page', 'info');
}

function advocatePolicy() {
    window.open('https://www.edf.org/clean-energy', '_blank');
    showNotification('Opening EDF clean energy advocacy resources', 'info');
}

function learnTechnologies() {
    window.open('https://www.energy.gov/oe/articles/advanced-nuclear-reactors-and-fuel-cycles', '_blank');
    showNotification('Opening DOE advanced cooling technology information', 'info');
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const mechanismModal = document.getElementById('mechanismModal');
    const caseStudyModal = document.getElementById('caseStudyModal');
    const solutionModal = document.getElementById('solutionModal');

    if (event.target === mechanismModal) {
        mechanismModal.style.display = 'none';
    }
    if (event.target === caseStudyModal) {
        caseStudyModal.style.display = 'none';
    }
    if (event.target === solutionModal) {
        solutionModal.style.display = 'none';
    }
};