// Microbial Community Shifts Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeMicrobialShiftsPage();
});

function initializeMicrobialShiftsPage() {
    // Initialize interactive elements
    setupPollutionSimulator();
    setupDiversityCalculator();
    setupNutrientCycling();
    setupScrollAnimations();

    // Initialize charts
    initializeCharts();
}

// Pollution Impact Simulator
function setupPollutionSimulator() {
    const pollutantType = document.getElementById('pollutantType');
    const concentration = document.getElementById('concentration');
    const concentrationValue = document.getElementById('concentrationValue');
    const exposureTime = document.getElementById('exposureTime');
    const environmentType = document.getElementById('environmentType');

    // Update concentration display
    concentration.addEventListener('input', function() {
        concentrationValue.textContent = this.value + ' mg/L';
        updatePollutionImpact();
    });

    // Update on any change
    [pollutantType, exposureTime, environmentType].forEach(element => {
        element.addEventListener('change', updatePollutionImpact);
    });

    // Initial calculation
    updatePollutionImpact();
}

function updatePollutionImpact() {
    const pollutantType = document.getElementById('pollutantType').value;
    const concentration = parseFloat(document.getElementById('concentration').value);
    const exposureTime = document.getElementById('exposureTime').value;
    const environmentType = document.getElementById('environmentType').value;

    // Calculate impact based on pollutant type and conditions
    const impact = calculatePollutionImpact(pollutantType, concentration, exposureTime, environmentType);

    // Update UI elements
    updateImpactDisplay(impact);
    updateImpactChart(impact);
}

function calculatePollutionImpact(pollutantType, concentration, exposureTime, environmentType) {
    // Base impact calculations for different pollutants
    const baseImpacts = {
        'heavy-metals': {
            threshold: 10,
            diversityImpact: 0.8,
            functionImpact: 0.9,
            recoveryMonths: 24
        },
        'organic': {
            threshold: 50,
            diversityImpact: 0.6,
            functionImpact: 0.7,
            recoveryMonths: 12
        },
        'nutrients': {
            threshold: 100,
            diversityImpact: 0.4,
            functionImpact: 0.5,
            recoveryMonths: 6
        },
        'plastics': {
            threshold: 1,
            diversityImpact: 0.3,
            functionImpact: 0.4,
            recoveryMonths: 36
        },
        'acid': {
            threshold: 20,
            diversityImpact: 0.7,
            functionImpact: 0.8,
            recoveryMonths: 18
        }
    };

    const baseImpact = baseImpacts[pollutantType];

    // Adjust for concentration
    const concentrationMultiplier = Math.min(1, concentration / baseImpact.threshold);

    // Adjust for exposure time
    const timeMultipliers = {
        'acute': 0.5,
        'chronic': 1.0,
        'long-term': 1.5
    };
    const timeMultiplier = timeMultipliers[exposureTime];

    // Adjust for environment
    const environmentMultipliers = {
        'soil': 1.2,
        'freshwater': 1.0,
        'marine': 0.8,
        'sediment': 1.5
    };
    const environmentMultiplier = environmentMultipliers[environmentType];

    // Calculate final impacts
    const diversityImpact = Math.min(1, baseImpact.diversityImpact * concentrationMultiplier * timeMultiplier * environmentMultiplier);
    const functionImpact = Math.min(1, baseImpact.functionImpact * concentrationMultiplier * timeMultiplier * environmentMultiplier);
    const recoveryMonths = Math.round(baseImpact.recoveryMonths * (1 + concentrationMultiplier) * timeMultiplier);

    return {
        diversityImpact,
        functionImpact,
        recoveryMonths,
        pollutantType,
        concentration,
        exposureTime,
        environmentType
    };
}

function updateImpactDisplay(impact) {
    // Update diversity bar
    const diversityBar = document.getElementById('diversityBar');
    const diversityValue = document.getElementById('diversityValue');
    const diversityPercent = (1 - impact.diversityImpact) * 100;
    diversityBar.style.width = diversityPercent + '%';
    diversityValue.textContent = diversityPercent.toFixed(0) + '%';

    // Update function bar
    const functionBar = document.getElementById('functionBar');
    const functionValue = document.getElementById('functionValue');
    const functionPercent = (1 - impact.functionImpact) * 100;
    functionBar.style.width = functionPercent + '%';
    functionValue.textContent = functionPercent.toFixed(0) + '%';

    // Update recovery time
    const recoveryTime = document.getElementById('recoveryTime');
    recoveryTime.textContent = impact.recoveryMonths + ' months';

    // Update description
    const impactDescription = document.getElementById('impactDescription');
    impactDescription.innerHTML = `<h4>Predicted Effects:</h4><p>${getImpactDescription(impact)}</p>`;
}

function getImpactDescription(impact) {
    const severity = impact.diversityImpact > 0.7 ? 'Severe' :
                    impact.diversityImpact > 0.5 ? 'Moderate' :
                    impact.diversityImpact > 0.3 ? 'Mild' : 'Minimal';

    const descriptions = {
        'heavy-metals': `${severity} impact from heavy metal toxicity affecting metal-resistant species and disrupting enzymatic processes.`,
        'organic': `${severity} impact from organic pollutants favoring pollutant-degrading bacteria while eliminating sensitive species.`,
        'nutrients': `${severity} impact from nutrient enrichment causing eutrophication and algal blooms that alter microbial community structure.`,
        'plastics': `${severity} impact from microplastics providing new habitats for some microbes while releasing toxic compounds.`,
        'acid': `${severity} impact from acidification reducing microbial diversity and altering biogeochemical cycles.`
    };

    return descriptions[impact.pollutantType];
}

// Microbial Diversity Calculator
function setupDiversityCalculator() {
    // Initial species item
    addSpecies();
}

function addSpecies() {
    const speciesList = document.getElementById('speciesList');
    const speciesItem = document.createElement('div');
    speciesItem.className = 'species-item';

    speciesItem.innerHTML = `
        <input type="text" placeholder="Species name" class="species-name">
        <input type="number" placeholder="0" class="species-count" min="0">
        <button class="remove-species" onclick="removeSpecies(this)">×</button>
    `;

    speciesList.appendChild(speciesItem);
}

function removeSpecies(button) {
    const speciesItem = button.parentElement;
    speciesItem.remove();
}

function calculateDiversity() {
    const speciesItems = document.querySelectorAll('.species-item');
    const speciesData = [];

    // Collect species data
    speciesItems.forEach(item => {
        const name = item.querySelector('.species-name').value.trim();
        const count = parseInt(item.querySelector('.species-count').value) || 0;

        if (name && count > 0) {
            speciesData.push({ name, count });
        }
    });

    if (speciesData.length === 0) {
        showNotification('Please add at least one species with a count greater than 0', 'error');
        return;
    }

    // Calculate diversity indices
    const diversityMetrics = calculateDiversityIndices(speciesData);

    // Update display
    updateDiversityDisplay(diversityMetrics);

    // Update chart
    updateDiversityChart(speciesData);

    showNotification('Diversity indices calculated successfully', 'success');
}

function calculateDiversityIndices(speciesData) {
    const totalIndividuals = speciesData.reduce((sum, species) => sum + species.count, 0);
    const speciesCount = speciesData.length;

    // Species richness
    const richness = speciesCount;

    // Shannon diversity index
    let shannonSum = 0;
    speciesData.forEach(species => {
        const proportion = species.count / totalIndividuals;
        if (proportion > 0) {
            shannonSum += proportion * Math.log2(proportion);
        }
    });
    const shannon = -shannonSum;

    // Simpson diversity index (1-D)
    let simpsonSum = 0;
    speciesData.forEach(species => {
        const proportion = species.count / totalIndividuals;
        simpsonSum += proportion * proportion;
    });
    const simpson = 1 - simpsonSum;

    // Evenness (Pielou's evenness)
    const maxShannon = Math.log2(speciesCount);
    const evenness = maxShannon > 0 ? shannon / maxShannon : 0;

    return {
        richness,
        shannon,
        simpson,
        evenness,
        totalIndividuals
    };
}

function updateDiversityDisplay(metrics) {
    document.getElementById('richnessValue').textContent = metrics.richness;
    document.getElementById('shannonValue').textContent = metrics.shannon.toFixed(3);
    document.getElementById('simpsonValue').textContent = metrics.simpson.toFixed(3);
    document.getElementById('evennessValue').textContent = metrics.evenness.toFixed(3);
}

function resetCalculator() {
    const speciesList = document.getElementById('speciesList');
    speciesList.innerHTML = '';

    // Reset display values
    document.getElementById('richnessValue').textContent = '0';
    document.getElementById('shannonValue').textContent = '0.00';
    document.getElementById('simpsonValue').textContent = '0.00';
    document.getElementById('evennessValue').textContent = '0.00';

    // Reset chart
    if (diversityChart) {
        diversityChart.data.labels = [];
        diversityChart.data.datasets[0].data = [];
        diversityChart.update();
    }

    // Add one empty species item
    addSpecies();

    showNotification('Calculator reset', 'info');
}

// Nutrient Cycling Simulator
function setupNutrientCycling() {
    const pollutionLevel = document.getElementById('pollutionLevel');
    const pollutionLevelValue = document.getElementById('pollutionLevelValue');

    pollutionLevel.addEventListener('input', function() {
        pollutionLevelValue.textContent = this.value + '%';
        updateNutrientCycling();
    });

    // Initial update
    updateNutrientCycling();
}

function updateNutrientCycling() {
    const pollutionLevel = parseInt(document.getElementById('pollutionLevel').value) / 100;

    // Update decomposition rate
    const decompRate = Math.max(0, 100 - (pollutionLevel * 80));
    document.getElementById('decompRate').textContent = decompRate.toFixed(0) + '%';

    // Update nutrient cycle impacts
    updateNutrientImpact('nitrogen', pollutionLevel);
    updateNutrientImpact('carbon', pollutionLevel);
    updateNutrientImpact('phosphorus', pollutionLevel);

    // Update cycling chart
    updateCyclingChart(pollutionLevel);
}

function updateNutrientImpact(nutrient, pollutionLevel) {
    const impacts = {
        nitrogen: { normal: 'Normal', moderate: 'Reduced fixation', high: 'Severely impaired' },
        carbon: { normal: 'Normal', moderate: 'Altered sequestration', high: 'Disrupted cycle' },
        phosphorus: { normal: 'Normal', moderate: 'Limited availability', high: 'Cycle breakdown' }
    };

    const bar = document.getElementById(`${nutrient}Bar`);
    const impact = document.getElementById(`${nutrient}Impact`);

    // Calculate impact level
    const impactLevel = pollutionLevel < 0.3 ? 0 : pollutionLevel < 0.7 ? 50 : 100;
    bar.style.width = (100 - impactLevel) + '%';

    // Update description
    if (pollutionLevel < 0.3) {
        impact.textContent = impacts[nutrient].normal;
    } else if (pollutionLevel < 0.7) {
        impact.textContent = impacts[nutrient].moderate;
    } else {
        impact.textContent = impacts[nutrient].high;
    }
}

// Chart Management
let diversityChart, impactChart, cyclingChart;

function initializeCharts() {
    // Initialize Chart.js if available
    if (typeof Chart !== 'undefined') {
        initializeDiversityChart();
        initializeImpactChart();
        initializeCyclingChart();
    }
}

function initializeDiversityChart() {
    const ctx = document.getElementById('diversityChart');
    if (!ctx) return;

    diversityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Abundance',
                data: [],
                backgroundColor: 'rgba(45, 90, 39, 0.8)',
                borderColor: 'rgba(45, 90, 39, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function initializeImpactChart() {
    // Impact chart initialization would go here if needed
}

function initializeCyclingChart() {
    // Cycling chart initialization would go here if needed
}

function updateDiversityChart(speciesData) {
    if (!diversityChart) return;

    const labels = speciesData.map(species => species.name || `Species ${speciesData.indexOf(species) + 1}`);
    const data = speciesData.map(species => species.count);

    diversityChart.data.labels = labels;
    diversityChart.data.datasets[0].data = data;
    diversityChart.update();
}

function updateImpactChart(impact) {
    // Update impact visualization if needed
}

function updateCyclingChart(pollutionLevel) {
    // Update cycling visualization if needed
}

// Modal System
function showCaseStudy(study) {
    const studies = {
        minamata: {
            title: 'Minamata Bay - Mercury Pollution Legacy',
            content: `
                <h3>Historical Context</h3>
                <p>Minamata Bay, Japan, experienced one of the most severe cases of mercury pollution from industrial wastewater discharged by the Chisso Corporation between 1932 and 1968.</p>

                <h4>Microbial Community Impacts</h4>
                <ul>
                    <li><strong>Methylmercury production:</strong> Anaerobic bacteria converted inorganic mercury to toxic methylmercury</li>
                    <li><strong>Sulfate-reducing bacteria:</strong> Increased activity in contaminated sediments</li>
                    <li><strong>Diversity loss:</strong> Elimination of mercury-sensitive microbial species</li>
                    <li><strong>Functional shifts:</strong> Changes in decomposition and nutrient cycling</li>
                </ul>

                <h4>Ecosystem Consequences</h4>
                <ul>
                    <li><strong>Bioaccumulation:</strong> Mercury concentrated through the food web</li>
                    <li><strong>Human health crisis:</strong> Minamata disease affected thousands</li>
                    <li><strong>Fish population collapse:</strong> Commercial fisheries destroyed</li>
                    <li><strong>Long-term contamination:</strong> Mercury persists in sediments for decades</li>
                </ul>

                <h4>Recovery and Remediation</h4>
                <ul>
                    <li><strong>Cleanup efforts:</strong> Dredging of contaminated sediments (1977-1990)</li>
                    <li><strong>Microbial monitoring:</strong> Ongoing assessment of community recovery</li>
                    <li><strong>Functional restoration:</strong> Gradual return of ecosystem services</li>
                    <li><strong>Lessons learned:</strong> Importance of pollution prevention</li>
                </ul>

                <h4>Current Status</h4>
                <p>While mercury levels have decreased significantly, the bay continues to be monitored for microbial community recovery and ecosystem restoration.</p>
            `
        },
        'gulf-oil': {
            title: 'Deepwater Horizon Oil Spill - Microbial Response',
            content: `
                <h3>The Largest Oil Spill in History</h3>
                <p>The 2010 Deepwater Horizon oil spill released approximately 4.9 million barrels of crude oil into the Gulf of Mexico, creating a massive marine pollution event.</p>

                <h4>Microbial Community Response</h4>
                <ul>
                    <li><strong>Hydrocarbon degraders:</strong> Rapid proliferation of oil-eating bacteria</li>
                    <li><strong>Community succession:</strong> Shift from diverse to oil-specialist communities</li>
                    <li><strong>Functional changes:</strong> Enhanced oil degradation capabilities</li>
                    <li><strong>Secondary effects:</strong> Oxygen depletion and toxic byproducts</li>
                </ul>

                <h4>Key Microbial Players</h4>
                <ul>
                    <li><strong>Alcanivorax:</strong> Specialized alkane-degrading bacteria</li>
                    <li><strong>Marinobacter:</strong> Hydrocarbon-utilizing marine bacteria</li>
                    <li><strong>Cycloclasticus:</strong> PAH-degrading specialists</li>
                    <li><strong>Thalassolituus:</strong> Oil-tolerant oligotrophs</li>
                </ul>

                <h4>Ecosystem Impacts</h4>
                <ul>
                    <li><strong>Marine food web disruption:</strong> Loss of plankton and fish populations</li>
                    <li><strong>Coastal wetland damage:</strong> Destruction of nursery habitats</li>
                    <li><strong>Long-term contamination:</strong> Oil residues persist in sediments</li>
                    <li><strong>Recovery timeline:</strong> Some areas still recovering after 10+ years</li>
                </ul>

                <h4>Microbial Remediation</h4>
                <ul>
                    <li><strong>Natural attenuation:</strong> Indigenous microbes degraded ~50% of spilled oil</li>
                    <li><strong>Biostimulation:</strong> Nutrient addition enhanced microbial activity</li>
                    <li><strong>Bioaugmentation:</strong> Addition of specialized oil-degrading strains</li>
                    <li><strong>Monitoring programs:</strong> Long-term microbial community tracking</li>
                </ul>

                <h4>Scientific Insights</h4>
                <p>The spill provided unprecedented data on microbial responses to large-scale pollution, demonstrating both the resilience and vulnerability of marine microbial communities.</p>
            `
        },
        'dead-zone': {
            title: 'Gulf of Mexico Dead Zone - Nutrient Pollution Effects',
            content: `
                <h3>Eutrophication and Hypoxia</h3>
                <p>The Gulf of Mexico dead zone is a large area of hypoxic (low oxygen) bottom water that occurs every summer, caused by excess nutrient runoff from the Mississippi River watershed.</p>

                <h4>Microbial Community Changes</h4>
                <ul>
                    <li><strong>Algal blooms:</strong> Massive phytoplankton growth depletes oxygen</li>
                    <li><strong>Bacterial respiration:</strong> Increased oxygen consumption during decomposition</li>
                    <li><strong>Community shifts:</strong> From aerobic to anaerobic microbial processes</li>
                    <li><strong>Sulfate reduction:</strong> Increased production of toxic hydrogen sulfide</li>
                </ul>

                <h4>Nutrient Dynamics</h4>
                <ul>
                    <li><strong>Nitrogen loading:</strong> Agricultural fertilizers drive eutrophication</li>
                    <li><strong>Phosphorus enrichment:</strong> Additional nutrient limiting algal growth</li>
                    <li><strong>Silica depletion:</strong> Reduced diatom populations</li>
                    <li><strong>Carbon cycling:</strong> Altered organic matter decomposition</li>
                </ul>

                <h4>Ecosystem Consequences</h4>
                <ul>
                    <li><strong>Benthic communities:</strong> Loss of bottom-dwelling organisms</li>
                    <li><strong>Fish populations:</strong> Avoidance of hypoxic areas</li>
                    <li><strong>Commercial fisheries:</strong> Reduced catches and economic losses</li>
                    <li><strong>Food web disruption:</strong> Changes in predator-prey relationships</li>
                </ul>

                <h4>Management Strategies</h4>
                <ul>
                    <li><strong>Nutrient reduction:</strong> Agricultural best management practices</li>
                    <li><strong>Watershed management:</strong> Conservation programs in Mississippi basin</li>
                    <li><strong>Monitoring networks:</strong> Annual dead zone measurements</li>
                    <li><strong>Climate considerations:</strong> Warming waters exacerbate hypoxia</li>
                </ul>

                <h4>Recovery Progress</h4>
                <ul>
                    <li><strong>Size fluctuations:</strong> Dead zone varies annually (5,000-9,000 km²)</li>
                    <li><strong>Nutrient trends:</strong> Some reduction in nitrogen loading</li>
                    <li><strong>Microbial adaptation:</strong> Communities show seasonal resilience</li>
                    <li><strong>Long-term outlook:</strong> Continued monitoring and management needed</li>
                </ul>

                <h4>Global Implications</h4>
                <p>The Gulf dead zone serves as a model for understanding eutrophication worldwide, with over 500 dead zones now identified in coastal waters globally.</p>
            `
        },
        'great-lakes': {
            title: 'Great Lakes Microplastics - Emerging Threat',
            content: `
                <h3>Microplastics in Freshwater Ecosystems</h3>
                <p>Microplastics have been detected throughout the Great Lakes, with concentrations ranging from 0 to 4.6 particles per cubic meter, representing an emerging pollutant threat.</p>

                <h4>Microbial Colonization</h4>
                <ul>
                    <li><strong>Biofilm formation:</strong> Microbes colonize plastic surfaces</li>
                    <li><strong>Plastic-associated communities:</strong> Unique microbial assemblages</li>
                    <li><strong>Degradation potential:</strong> Some microbes may break down plastics</li>
                    <li><strong>Toxin release:</strong> Plastics leach harmful chemicals</li>
                </ul>

                <h4>Ecological Impacts</h4>
                <ul>
                    <li><strong>Transport vectors:</strong> Microplastics carry microbes across ecosystems</li>
                    <li><strong>Pathogen reservoirs:</strong> Potential for disease transmission</li>
                    <li><strong>Food web integration:</strong> Plastics consumed by aquatic organisms</li>
                    <li><strong>Sedimentation:</strong> Plastics accumulate in lake bottoms</li>
                </ul>

                <h4>Microbial Community Effects</h4>
                <ul>
                    <li><strong>Diversity changes:</strong> Altered community composition in sediments</li>
                    <li><strong>Functional shifts:</strong> Changes in decomposition and nutrient cycling</li>
                    <li><strong>Antibiotic resistance:</strong> Plastics may harbor resistant bacteria</li>
                    <li><strong>Bioaccumulation:</strong> Toxins concentrate in microbial biofilms</li>
                </ul>

                <h4>Research Challenges</h4>
                <ul>
                    <li><strong>Detection methods:</strong> Difficult to quantify small plastic particles</li>
                    <li><strong>Source identification:</strong> Multiple sources (wastewater, fragmentation, etc.)</li>
                    <li><strong>Long-term effects:</strong> Unknown chronic impacts on ecosystems</li>
                    <li><strong>Global distribution:</strong> Plastics found in remote freshwater systems</li>
                </ul>

                <h4>Management Approaches</h4>
                <ul>
                    <li><strong>Source reduction:</strong> Reduce plastic production and waste</li>
                    <li><strong>Wastewater treatment:</strong> Improve filtration systems</li>
                    <li><strong>Monitoring programs:</strong> Track plastic distribution and effects</li>
                    <li><strong>Bioremediation research:</strong> Study plastic-degrading microbes</li>
                </ul>

                <h4>Future Concerns</h4>
                <p>As plastic pollution continues to increase, understanding microbial responses to microplastics will be crucial for managing freshwater ecosystem health.</p>
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

function showRemediationDetail(type) {
    const remediations = {
        bioremediation: {
            title: 'Bioremediation: Using Microbes to Clean Up Pollution',
            content: `
                <h3>Principles of Bioremediation</h3>
                <p>Bioremediation uses microorganisms to degrade or transform pollutants into less harmful substances through natural metabolic processes.</p>

                <h4>Microbial Mechanisms</h4>
                <ul>
                    <li><strong>Mineralization:</strong> Complete breakdown to CO₂, water, and minerals</li>
                    <li><strong>Transformation:</strong> Conversion to less toxic compounds</li>
                    <li><strong>Immobilization:</strong> Binding pollutants to reduce bioavailability</li>
                    <li><strong>Volatilization:</strong> Conversion to gaseous forms for removal</li>
                </ul>

                <h4>Types of Bioremediation</h4>
                <ul>
                    <li><strong>In situ:</strong> Treatment at the contaminated site</li>
                    <li><strong>Ex situ:</strong> Removal and treatment elsewhere</li>
                    <li><strong>Biostimulation:</strong> Addition of nutrients to enhance microbial activity</li>
                    <li><strong>Bioaugmentation:</strong> Addition of specific microbial strains</li>
                </ul>

                <h4>Pollutant-Specific Applications</h4>
                <ul>
                    <li><strong>Hydrocarbons:</strong> Alcanivorax and Marinobacter species</li>
                    <li><strong>Heavy metals:</strong> Metal-accumulating and -transforming bacteria</li>
                    <li><strong>Pesticides:</strong> Organophosphate and carbamate degraders</li>
                    <li><strong>Nutrients:</strong> Enhanced denitrification for nitrogen removal</li>
                </ul>

                <h4>Success Factors</h4>
                <ul>
                    <li><strong>Microbial populations:</strong> Sufficient numbers of appropriate microbes</li>
                    <li><strong>Environmental conditions:</strong> Optimal pH, temperature, oxygen, nutrients</li>
                    <li><strong>Pollutant characteristics:</strong> Bioavailability and biodegradability</li>
                    <li><strong>Site conditions:</strong> Soil type, groundwater flow, accessibility</li>
                </ul>

                <h4>Advantages</h4>
                <ul>
                    <li><strong>Cost-effective:</strong> Often cheaper than physical/chemical methods</li>
                    <li><strong>Environmentally friendly:</strong> Minimal secondary pollution</li>
                    <li><strong>Complete degradation:</strong> Converts pollutants to harmless products</li>
                    <li><strong>In situ treatment:</strong> No need to excavate contaminated material</li>
                </ul>

                <h4>Limitations</h4>
                <ul>
                    <li><strong>Time requirements:</strong> Can take months to years for completion</li>
                    <li><strong>Site-specific:</strong> Effectiveness varies by location and conditions</li>
                    <li><strong>Monitoring needs:</strong> Requires ongoing assessment of progress</li>
                    <li><strong>Regulatory approval:</strong> May require permits and documentation</li>
                </ul>

                <h4>Case Studies</h4>
                <ul>
                    <li><strong>Chernobyl cleanup:</strong> Mycorrhizal fungi for radionuclide immobilization</li>
                    <li><strong>Oil spill response:</strong> Marine bacteria for hydrocarbon degradation</li>
                    <li><strong>Mine site remediation:</strong> Acid-tolerant microbes for metal removal</li>
                    <li><strong>Agricultural runoff:</strong> Denitrifying bacteria for nitrate removal</li>
                </ul>
            `
        },
        bioaugmentation: {
            title: 'Bioaugmentation: Adding Specialized Microbial Strains',
            content: `
                <h3>Enhancing Microbial Communities</h3>
                <p>Bioaugmentation involves adding specific microbial strains or consortia to contaminated sites to enhance pollutant degradation capabilities.</p>

                <h4>Application Methods</h4>
                <ul>
                    <li><strong>Liquid cultures:</strong> Direct addition of microbial suspensions</li>
                    <li><strong>Immobilized cells:</strong> Microbes attached to carriers for stability</li>
                    <li><strong>Genetically modified:</strong> Engineered strains with enhanced capabilities</li>
                    <li><strong>Consortia:</strong> Mixed cultures with complementary functions</li>
                </ul>

                <h4>Strain Selection Criteria</h4>
                <ul>
                    <li><strong>Degradation capability:</strong> Proven ability to break down target pollutants</li>
                    <li><strong>Environmental tolerance:</strong> Survival under site conditions</li>
                    <li><strong>Competitive ability:</strong> Ability to establish and persist</li>
                    <li><strong>Safety:</strong> Non-pathogenic and environmentally safe</li>
                </ul>

                <h4>Success Factors</h4>
                <ul>
                    <li><strong>Survival:</strong> Microbes must survive introduction and establishment</li>
                    <li><strong>Activity:</strong> Maintained metabolic activity under field conditions</li>
                    <li><strong>Integration:</strong> Compatibility with indigenous microbial community</li>
                    <li><strong>Monitoring:</strong> Tracking of introduced strains and degradation progress</li>
                </ul>

                <h4>Challenges</h4>
                <ul>
                    <li><strong>Competition:</strong> Indigenous microbes may outcompete introduced strains</li>
                    <li><strong>Environmental stress:</strong> Site conditions may inhibit microbial activity</li>
                    <li><strong>Genetic stability:</strong> Maintained degradation capabilities over time</li>
                    <li><strong>Regulatory issues:</strong> Approval for release of modified organisms</li>
                </ul>

                <h4>Examples</h4>
                <ul>
                    <li><strong>Oil spills:</strong> Addition of hydrocarbon-degrading bacteria</li>
                    <li><strong>Pesticide contamination:</strong> Specialized pesticide-degrading strains</li>
                    <li><strong>Heavy metals:</strong> Metal-accumulating bacterial strains</li>
                    <li><strong>Industrial solvents:</strong> Chlorinated solvent degraders</li>
                </ul>

                <h4>Future Developments</h4>
                <ul>
                    <li><strong>Metagenomic screening:</strong> Discovery of novel degradation genes</li>
                    <li><strong>Synthetic biology:</strong> Engineered pathways for complex pollutants</li>
                    <li><strong>Microbial consortia:</strong> Optimized mixed cultures</li>
                    <li><strong>Smart delivery:</strong> Controlled release systems</li>
                </ul>
            `
        },
        phytoremediation: {
            title: 'Phytoremediation: Plant-Microbe Partnerships',
            content: `
                <h3>Harnessing Plant-Microbe Interactions</h3>
                <p>Phytoremediation uses plants and their associated microorganisms to remove, stabilize, or degrade pollutants in soil and water.</p>

                <h4>Plant-Microbe Mechanisms</h4>
                <ul>
                    <li><strong>Mycorrhizal fungi:</strong> Enhanced nutrient uptake and pollutant immobilization</li>
                    <li><strong>Rhizosphere bacteria:</strong> Degradation of pollutants in root zone</li>
                    <li><strong>Endophytic microbes:</strong> Internal colonization and detoxification</li>
                    <li><strong>Root exudates:</strong> Stimulation of beneficial microbial activity</li>
                </ul>

                <h4>Types of Phytoremediation</h4>
                <ul>
                    <li><strong>Phytoextraction:</strong> Plants accumulate pollutants in harvestable biomass</li>
                    <li><strong>Phytostabilization:</strong> Plants immobilize pollutants in soil</li>
                    <li><strong>Phytodegradation:</strong> Plants break down pollutants</li>
                    <li><strong>Rhizodegradation:</strong> Microbes in root zone degrade pollutants</li>
                </ul>

                <h4>Microbial Roles</h4>
                <ul>
                    <li><strong>Nutrient supply:</strong> Mycorrhizae provide nutrients to stressed plants</li>
                    <li><strong>Pollutant degradation:</strong> Bacteria break down organic contaminants</li>
                    <li><strong>Stress tolerance:</strong> Microbes enhance plant survival in polluted soils</li>
                    <li><strong>Metal tolerance:</strong> Microbes help plants tolerate heavy metals</li>
                </ul>

                <h4>Plant Selection</h4>
                <ul>
                    <li><strong>Hyperaccumulators:</strong> Plants that concentrate pollutants (e.g., Thlaspi for zinc)</li>
                    <li><strong>Fast-growing species:</strong> High biomass for phytoextraction</li>
                    <li><strong>Deep-rooted plants:</strong> Access to groundwater contaminants</li>
                    <li><strong>Native species:</strong> Better adaptation to local conditions</li>
                </ul>

                <h4>Advantages</h4>
                <ul>
                    <li><strong>In situ treatment:</strong> No soil removal or transport required</li>
                    <li><strong>Cost-effective:</strong> Lower costs than traditional remediation</li>
                    <li><strong>Aesthetic benefits:</strong> Landscaping and habitat restoration</li>
                    <li><strong>Sustainable:</strong> Uses natural processes and solar energy</li>
                </ul>

                <h4>Limitations</h4>
                <ul>
                    <li><strong>Time requirements:</strong> Several growing seasons for effectiveness</li>
                    <li><strong>Depth limitations:</strong> Primarily effective in surface soils</li>
                    <li><strong>Plant disposal:</strong> Harvested biomass may be hazardous waste</li>
                    <li><strong>Site conditions:</strong> Requires suitable climate and soil conditions</li>
                </ul>

                <h4>Case Studies</h4>
                <ul>
                    <li><strong>Mine tailings:</strong> Willows and poplars for heavy metal stabilization</li>
                    <li><strong>Oil-contaminated soil:</strong> Grasses with petroleum-degrading rhizobacteria</li>
                    <li><strong>Pesticide sites:</strong> Alfalfa with atrazine-degrading microbes</li>
                    <li><strong>Salt-affected soils:</strong> Salt-tolerant plants with associated microbes</li>
                </ul>
            `
        },
        'natural-attenuation': {
            title: 'Natural Attenuation: Letting Nature Heal',
            content: `
                <h3>Monitored Natural Recovery</h3>
                <p>Natural attenuation relies on indigenous microbial communities and natural processes to reduce pollutant concentrations without human intervention.</p>

                <h4>Natural Processes</h4>
                <ul>
                    <li><strong>Biodegradation:</strong> Microbial breakdown of organic pollutants</li>
                    <li><strong>Dilution:</strong> Spreading of contaminants through groundwater flow</li>
                <li><strong>Dispersion:</strong> Physical spreading and mixing processes</li>
                    <li><strong>Sorption:</strong> Binding of pollutants to soil particles</li>
                    <li><strong>Volatilization:</strong> Evaporation of volatile compounds</li>
                    <li><strong>Radioactive decay:</strong> Natural decay of radioactive isotopes</li>
                </ul>

                <h4>Microbial Contributions</h4>
                <ul>
                    <li><strong>Indigenous populations:</strong> Naturally occurring pollutant-degrading microbes</li>
                    <li><strong>Community adaptation:</strong> Selection for pollutant-tolerant species</li>
                    <li><strong>Functional redundancy:</strong> Multiple species capable of same degradation</li>
                    <li><strong>Horizontal gene transfer:</strong> Spread of degradation genes between microbes</li>
                </ul>

                <h4>Assessment Framework</h4>
                <ul>
                    <li><strong>Lines of evidence:</strong> Multiple indicators of natural attenuation</li>
                    <li><strong>Historical data:</strong> Long-term monitoring of pollutant trends</li>
                    <li><strong>Microbial indicators:</strong> Community composition and activity measurements</li>
                    <li><strong>Geochemical evidence:</strong> Changes in redox conditions and metabolites</li>
                </ul>

                <h4>Site Suitability</h4>
                <ul>
                    <li><strong>Low-risk sites:</strong> Where human exposure is minimal</li>
                    <li><strong>Stable conditions:</strong> Consistent environmental parameters</li>
                    <li><strong>Adequate microbes:</strong> Sufficient microbial biomass and diversity</li>
                    <li><strong>Long timeframes:</strong> Where cleanup speed is not critical</li>
                </ul>

                <h4>Monitoring Requirements</h4>
                <ul>
                    <li><strong>Pollutant concentrations:</strong> Regular sampling and analysis</li>
                    <li><strong>Microbial activity:</strong> Measurement of degradation rates</li>
                    <li><strong>Groundwater flow:</strong> Understanding transport pathways</li>
                    <li><strong>Geochemical parameters:</strong> pH, redox, nutrients, metabolites</li>
                </ul>

                <h4>Advantages</h4>
                <ul>
                    <li><strong>Cost-effective:</strong> No active treatment costs</li>
                    <li><strong>Non-invasive:</strong> No disturbance of site or ecosystems</li>
                    <li><strong>Sustainable:</strong> Uses natural ecosystem processes</li>
                    <li><strong>Complete restoration:</strong> Allows full ecosystem recovery</li>
                </ul>

                <h4>Limitations</h4>
                <ul>
                    <li><strong>Time requirements:</strong> May take decades for complete cleanup</li>
                    <li><strong>Uncertain outcomes:</strong> Natural processes may be slow or incomplete</li>
                    <li><strong>Regulatory acceptance:</strong> Requires demonstration of effectiveness</li>
                    <li><strong>Risk assessment:</strong> Need to ensure no unacceptable risks during cleanup</li>
                </ul>

                <h4>Examples</h4>
                <ul>
                    <li><strong>Petroleum spills:</strong> Natural biodegradation in subsurface aquifers</li>
                    <li><strong>Chlorinated solvents:</strong> Reductive dechlorination by indigenous microbes</li>
                    <li><strong>Heavy metals:</strong> Natural immobilization in soil minerals</li>
                    <li><strong>Nutrients:</strong> Natural denitrification in groundwater</li>
                </ul>

                <h4>Regulatory Framework</h4>
                <p>Natural attenuation is accepted by EPA and other agencies when properly demonstrated and monitored, often as part of risk-based corrective action.</p>
            `
        }
    };

    const remediation = remediations[type];
    if (remediation) {
        document.getElementById('remediationContent').innerHTML = `
            <h2>${remediation.title}</h2>
            ${remediation.content}
        `;
        document.getElementById('remediationModal').style.display = 'block';
    }
}

function closeModal() {
    document.getElementById('caseStudyModal').style.display = 'none';
    document.getElementById('remediationModal').style.display = 'none';
}

// Action button functions
function learnMore() {
    window.open('https://www.epa.gov/microbes/microorganisms-and-risk-assessment', '_blank');
    showNotification('Opening EPA microbial risk assessment resources', 'info');
}

function supportResearch() {
    window.open('https://www.nsf.gov/funding/pgm_summ.jsp?pims_id=12830', '_blank');
    showNotification('Opening NSF microbial ecology funding opportunities', 'info');
}

function joinMonitoring() {
    window.open('https://www.earthwatch.org/expeditions/microbial-diversity', '_blank');
    showNotification('Opening citizen science microbial monitoring programs', 'info');
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
    const caseStudyModal = document.getElementById('caseStudyModal');
    const remediationModal = document.getElementById('remediationModal');

    if (event.target === caseStudyModal) {
        caseStudyModal.style.display = 'none';
    }
    if (event.target === remediationModal) {
        remediationModal.style.display = 'none';
    }
}