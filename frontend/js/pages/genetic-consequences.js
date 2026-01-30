// Genetic Consequences Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeGeneticConsequencesPage();
});

function initializeGeneticConsequencesPage() {
    // Initialize interactive elements
    setupGeneticCalculator();
    setupInbreedingSimulator();
    setupScrollAnimations();
    setupActionButtons();

    // Initialize charts
    initializeCharts();
}

// Genetic Diversity Calculator
function setupGeneticCalculator() {
    const founderCount = document.getElementById('founderCount');
    const generations = document.getElementById('generations');
    const breedingStrategy = document.getElementById('breedingStrategy');
    const populationSize = document.getElementById('populationSize');

    const founderDisplay = document.getElementById('founderDisplay');
    const generationDisplay = document.getElementById('generationDisplay');
    const populationDisplay = document.getElementById('populationDisplay');

    // Update displays and calculations
    function updateCalculator() {
        const founders = parseInt(founderCount.value);
        const gens = parseInt(generations.value);
        const strategy = breedingStrategy.value;
        const popSize = parseInt(populationSize.value);

        // Update displays
        founderDisplay.textContent = founders + ' founders';
        generationDisplay.textContent = gens + ' generations';
        populationDisplay.textContent = popSize + ' individuals';

        // Calculate genetic parameters
        calculateGeneticDiversity(founders, gens, strategy, popSize);
    }

    // Event listeners
    founderCount.addEventListener('input', updateCalculator);
    generations.addEventListener('input', updateCalculator);
    breedingStrategy.addEventListener('change', updateCalculator);
    populationSize.addEventListener('input', updateCalculator);

    // Initial calculation
    updateCalculator();
}

function calculateGeneticDiversity(founders, generations, strategy, popSize) {
    // Calculate heterozygosity using simplified model
    // H_t = H_0 * (1 - 1/(2N))^t where N is effective population size

    // Effective population size based on strategy
    let Ne;
    switch(strategy) {
        case 'random':
            Ne = popSize * 0.8; // Random mating
            break;
        case 'minimize':
            Ne = popSize * 0.9; // Managed breeding
            break;
        case 'maximize':
            Ne = popSize * 0.95; // Optimized diversity
            break;
        case 'line':
            Ne = popSize * 0.6; // Line breeding reduces Ne
            break;
        default:
            Ne = popSize * 0.8;
    }

    // Initial heterozygosity based on founders
    const H0 = Math.min(0.95, founders / 50); // Simplified founder effect

    // Calculate current heterozygosity
    const heterozygosity = H0 * Math.pow((1 - 1/(2*Ne)), generations);
    const finalHeterozygosity = Math.max(0, heterozygosity);

    // Calculate inbreeding coefficient
    const inbreedingCoeff = 1 - finalHeterozygosity;

    // Update displays
    updateDiversityMeter(finalHeterozygosity);
    updateInbreedingGauge(inbreedingCoeff);
    updateEffectivePopulation(Ne);

    // Update chart
    updateDiversityChart(founders, generations, strategy, Ne);
}

function updateDiversityMeter(heterozygosity) {
    const level = document.getElementById('diversityLevel');
    const value = document.getElementById('diversityValue');
    const description = document.getElementById('heterozygosityDescription');

    const percentage = heterozygosity * 100;
    level.style.width = percentage + '%';
    value.textContent = percentage.toFixed(1) + '%';

    // Update color and description
    if (percentage > 80) {
        level.style.background = 'linear-gradient(to right, #10b981, #22c55e)';
        description.textContent = 'High genetic diversity maintained';
    } else if (percentage > 60) {
        level.style.background = 'linear-gradient(to right, #eab308, #f59e0b)';
        description.textContent = 'Moderate diversity - monitor closely';
    } else if (percentage > 40) {
        level.style.background = 'linear-gradient(to right, #f97316, #ea580c)';
        description.textContent = 'Low diversity - intervention needed';
    } else {
        level.style.background = 'linear-gradient(to right, #dc2626, #ef4444)';
        description.textContent = 'Critical diversity loss - urgent action required';
    }
}

function updateInbreedingGauge(inbreedingCoeff) {
    const level = document.getElementById('inbreedingLevel');
    const value = document.getElementById('inbreedingValue');
    const description = document.getElementById('inbreedingDescription');

    const percentage = inbreedingCoeff * 100;
    level.style.width = percentage + '%';
    value.textContent = 'F = ' + inbreedingCoeff.toFixed(3);

    // Update description
    if (percentage < 10) {
        description.textContent = 'Low inbreeding risk - good management';
    } else if (percentage < 25) {
        description.textContent = 'Moderate inbreeding - monitor fitness';
    } else if (percentage < 50) {
        description.textContent = 'High inbreeding - fitness impacts likely';
    } else {
        description.textContent = 'Severe inbreeding - major fitness decline';
    }
}

function updateEffectivePopulation(Ne) {
    const bar = document.getElementById('effectivePopulationBar');
    const value = document.getElementById('effectivePopulationValue');
    const description = document.getElementById('effectivePopulationDescription');

    // Assuming max Ne of 500 for scaling
    const percentage = Math.min(100, (Ne / 500) * 100);
    bar.style.width = percentage + '%';
    value.textContent = 'Ne = ' + Math.round(Ne);

    // Update description
    if (Ne > 100) {
        description.textContent = 'Excellent effective population size';
    } else if (Ne > 50) {
        description.textContent = 'Good population size for conservation';
    } else if (Ne > 25) {
        description.textContent = 'Adequate but monitor genetic diversity';
    } else {
        description.textContent = 'Small population - high genetic risk';
    }
}

// Inbreeding Depression Simulator
function setupInbreedingSimulator() {
    const inbreedingLevel = document.getElementById('inbreedingLevel');
    const inbreedingDisplay = document.getElementById('inbreedingDisplay');

    // Trait checkboxes
    const survivalCheckbox = document.getElementById('survival');
    const fecundityCheckbox = document.getElementById('fecundity');
    const growthCheckbox = document.getElementById('growth');
    const immunityCheckbox = document.getElementById('immunity');

    function updateSimulator() {
        const F = parseFloat(inbreedingLevel.value);
        inbreedingDisplay.textContent = 'F = ' + F.toFixed(2);

        // Calculate fitness impacts
        updateFitnessImpacts(F);
        updateFitnessChart(F);
    }

    // Event listeners
    inbreedingLevel.addEventListener('input', updateSimulator);
    [survivalCheckbox, fecundityCheckbox, growthCheckbox, immunityCheckbox].forEach(checkbox => {
        checkbox.addEventListener('change', updateSimulator);
    });

    // Initial update
    updateSimulator();
}

function updateFitnessImpacts(F) {
    // Simplified inbreeding depression model
    // Fitness = 1 - (F * d) where d is the dominance coefficient

    const traits = {
        survival: { d: 0.3, element: 'survivalImpact', value: 'survivalValue' },
        fecundity: { d: 0.4, element: 'fecundityImpact', value: 'fecundityValue' },
        growth: { d: 0.2, element: 'growthImpact', value: 'growthValue' },
        immunity: { d: 0.35, element: 'immunityImpact', value: 'immunityValue' }
    };

    Object.keys(traits).forEach(trait => {
        const traitData = traits[trait];
        const checkbox = document.getElementById(trait);

        if (checkbox && checkbox.checked) {
            const fitness = Math.max(0, 1 - (F * traitData.d));
            const percentage = fitness * 100;

            const impactBar = document.getElementById(traitData.element);
            const valueElement = document.getElementById(traitData.value);

            if (impactBar) {
                impactBar.style.width = percentage + '%';
            }
            if (valueElement) {
                valueElement.textContent = percentage.toFixed(0) + '%';
            }
        } else {
            // Hide or reset unchecked traits
            const impactBar = document.getElementById(traitData.element);
            const valueElement = document.getElementById(traitData.value);

            if (impactBar) {
                impactBar.style.width = '0%';
            }
            if (valueElement) {
                valueElement.textContent = 'N/A';
            }
        }
    });
}

// Chart Management
let diversityChart, fitnessChart;

function initializeCharts() {
    // Initialize Chart.js if available
    if (typeof Chart !== 'undefined') {
        initializeDiversityChart();
        initializeFitnessChart();
    }
}

function initializeDiversityChart() {
    const ctx = document.getElementById('diversityChart');
    if (!ctx) return;

    diversityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Heterozygosity',
                data: [],
                borderColor: '#7c3aed',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1,
                    ticks: {
                        callback: function(value) {
                            return (value * 100) + '%';
                        }
                    }
                }
            }
        }
    });
}

function initializeFitnessChart() {
    const ctx = document.getElementById('fitnessChart');
    if (!ctx) return;

    fitnessChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Survival', 'Reproduction', 'Growth', 'Immunity'],
            datasets: [{
                label: 'Fitness Impact',
                data: [1, 1, 1, 1],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1,
                    ticks: {
                        callback: function(value) {
                            return (value * 100) + '%';
                        }
                    }
                }
            }
        }
    });
}

function updateDiversityChart(founders, generations, strategy, Ne) {
    if (!diversityChart) return;

    const labels = [];
    const data = [];

    for (let gen = 0; gen <= generations; gen++) {
        labels.push('Gen ' + gen);
        const H0 = Math.min(0.95, founders / 50);
        const heterozygosity = H0 * Math.pow((1 - 1/(2*Ne)), gen);
        data.push(Math.max(0, heterozygosity));
    }

    diversityChart.data.labels = labels;
    diversityChart.data.datasets[0].data = data;
    diversityChart.update();
}

function updateFitnessChart(F) {
    if (!fitnessChart) return;

    const traits = ['survival', 'fecundity', 'growth', 'immunity'];
    const fitnessData = traits.map(trait => {
        const checkbox = document.getElementById(trait);
        if (checkbox && checkbox.checked) {
            const d = trait === 'survival' ? 0.3 :
                     trait === 'fecundity' ? 0.4 :
                     trait === 'growth' ? 0.2 : 0.35;
            return Math.max(0, 1 - (F * d));
        }
        return 1; // Full fitness if not selected
    });

    fitnessChart.data.datasets[0].data = fitnessData;
    fitnessChart.update();
}

// Modal System
function showGeneticDetail(type) {
    const details = {
        founder: {
            title: 'Founder Effects in Captive Populations',
            content: `
                <h3>What are Founder Effects?</h3>
                <p>Founder effects occur when a small number of individuals establish a new population, leading to reduced genetic diversity compared to the source population.</p>

                <h4>Mechanisms</h4>
                <ul>
                    <li><strong>Genetic bottleneck:</strong> Only a subset of alleles from the source population</li>
                    <li><strong>Allele frequency changes:</strong> Random sampling leads to non-representative frequencies</li>
                    <li><strong>Loss of rare alleles:</strong> Low-frequency beneficial alleles may be lost</li>
                    <li><strong>Increased homozygosity:</strong> Reduced heterozygosity in the founding population</li>
                </ul>

                <h4>Consequences for Captive Breeding</h4>
                <ul>
                    <li><strong>Reduced adaptability:</strong> Limited genetic variation for future environmental changes</li>
                    <li><strong>Inbreeding depression:</strong> Higher risk due to already reduced diversity</li>
                    <li><strong>Genetic drift:</strong> More rapid allele frequency changes in small populations</li>
                    <li><strong>Population viability:</strong> Lower long-term survival probability</li>
                </ul>

                <h4>Mitigation Strategies</h4>
                <ul>
                    <li><strong>Maximize founders:</strong> Capture as many individuals as possible</li>
                    <li><strong>Genetic assessment:</strong> Evaluate genetic diversity before breeding</li>
                    <li><strong>Supplementation:</strong> Add individuals from wild populations when possible</li>
                    <li><strong>Genetic monitoring:</strong> Regular assessment of genetic diversity</li>
                </ul>

                <h4>Examples</h4>
                <p>The Mauritius kestrel recovery program captured all remaining individuals (4 males, 4 females), creating a founder population with minimal genetic diversity that required careful management.</p>
            `
        },
        drift: {
            title: 'Genetic Drift in Small Populations',
            content: `
                <h3>Understanding Genetic Drift</h3>
                <p>Genetic drift is the random change in allele frequencies that occurs in small populations due to sampling error in reproduction.</p>

                <h4>How Drift Works</h4>
                <ul>
                    <li><strong>Random sampling:</strong> Not all individuals reproduce equally</li>
                    <li><strong>Allele loss:</strong> Some alleles may be lost by chance</li>
                    <li><strong>Frequency changes:</strong> Neutral evolution affects allele frequencies</li>
                    <li><strong>Fixation:</strong> Alleles can become fixed (frequency = 1.0) or lost (frequency = 0)</li>
                </ul>

                <h4>Impact on Captive Populations</h4>
                <ul>
                    <li><strong>Loss of diversity:</strong> More rapid loss than in large populations</li>
                    <li><strong>Deleterious alleles:</strong> Harmful recessive alleles may become fixed</li>
                    <li><strong>Reduced fitness:</strong> Accumulation of genetic load</li>
                    <li><strong>Adaptability loss:</strong> Reduced ability to respond to environmental change</li>
                </ul>

                <h4>Factors Influencing Drift</h4>
                <ul>
                    <li><strong>Population size:</strong> Smaller populations experience more drift</li>
                    <li><strong>Generation time:</strong> Shorter generations increase drift rate</li>
                    <li><strong>Reproductive variance:</strong> Unequal reproduction increases drift</li>
                    <li><strong>Mutation rate:</strong> New mutations can counteract drift</li>
                </ul>

                <h4>Management Implications</h4>
                <ul>
                    <li><strong>Effective population size:</strong> Maintain Ne > 50 to minimize drift</li>
                    <li><strong>Equal reproduction:</strong> Minimize variance in family sizes</li>
                    <li><strong>Genetic monitoring:</strong> Track changes in allele frequencies</li>
                    <li><strong>Supplementation:</strong> Add genetic variation when possible</li>
                </ul>
            `
        },
        inbreeding: {
            title: 'Inbreeding Depression Mechanisms',
            content: `
                <h3>What is Inbreeding Depression?</h3>
                <p>Inbreeding depression is the reduced fitness and health of offspring from closely related parents, caused by increased homozygosity of deleterious alleles.</p>

                <h4>Genetic Basis</h4>
                <ul>
                    <li><strong>Deleterious recessives:</strong> Harmful alleles expressed in homozygous state</li>
                    <li><strong>Overdominance:</strong> Heterozygote advantage lost in inbred individuals</li>
                    <li><strong>Purging:</strong> Removal of deleterious alleles through selection</li>
                    <li><strong>Genetic load:</strong> Accumulation of harmful mutations</li>
                </ul>

                <h4>Fitness Consequences</h4>
                <ul>
                    <li><strong>Survival reduction:</strong> Higher juvenile mortality rates</li>
                    <li><strong>Growth impairment:</strong> Slower development and smaller adult size</li>
                    <li><strong>Reproductive failure:</strong> Reduced fertility and fecundity</li>
                    <li><strong>Disease susceptibility:</strong> Weakened immune system</li>
                    <li><strong>Developmental abnormalities:</strong> Increased congenital defects</li>
                </ul>

                <h4>Measuring Inbreeding Depression</h4>
                <ul>
                    <li><strong>Inbreeding coefficient (F):</strong> Probability of homozygosity</li>
                    <li><strong>Fitness traits:</strong> Survival, reproduction, growth rates</li>
                    <li><strong>Lethal equivalents:</strong> Number of lethal alleles per individual</li>
                    <li><strong>Purifying selection:</strong> Strength of selection against inbred individuals</li>
                </ul>

                <h4>Management Strategies</h4>
                <ul>
                    <li><strong>Pedigree analysis:</strong> Track relatedness and avoid close matings</li>
                    <li><strong>Minimum viable population:</strong> Maintain adequate population size</li>
                    <li><strong>Genetic rescue:</strong> Introduce unrelated individuals</li>
                    <li><strong>Outbreeding:</strong> Balance inbreeding avoidance with local adaptation</li>
                </ul>

                <h4>Examples</h4>
                <p>The California condor experienced severe inbreeding depression with fertility rates dropping to 20% in highly inbred individuals. Genetic management increased fertility to over 50%.</p>
            `
        },
        domestication: {
            title: 'Domestication Selection in Captivity',
            content: `
                <h3>Unintentional Artificial Selection</h3>
                <p>Domestication selection occurs when captive conditions favor traits that differ from those needed for wild survival, leading to maladaptation.</p>

                <h4>Selection Pressures in Captivity</h4>
                <ul>
                    <li><strong>Food availability:</strong> Reduced need for foraging skills</li>
                    <li><strong>Predator absence:</strong> Decreased anti-predator behaviors</li>
                    <li><strong>Human interaction:</strong> Tolerance of humans over fear responses</li>
                    <li><strong>Medical care:</strong> Reduced natural disease resistance</li>
                    <li><strong>Controlled environment:</strong> Adaptation to artificial conditions</li>
                </ul>

                <h4>Behavioral Changes</h4>
                <ul>
                    <li><strong>Reduced wariness:</strong> Loss of predator avoidance behaviors</li>
                    <li><strong>Altered social structure:</strong> Changes in mating and dominance behaviors</li>
                    <li><strong>Foraging inefficiency:</strong> Poor hunting and food-finding skills</li>
                    <li><strong>Reproductive timing:</strong> Mismatch with natural breeding seasons</li>
                    <li><strong>Parenting skills:</strong> Reduced parental care abilities</li>
                </ul>

                <h4>Physiological Changes</h4>
                <ul>
                    <li><strong>Metabolic rate:</strong> Changes in energy requirements</li>
                    <li><strong>Immune function:</strong> Altered disease resistance</li>
                    <li><strong>Stress response:</strong> Modified hormonal responses</li>
                    <li><strong>Growth patterns:</strong> Different developmental trajectories</li>
                </ul>

                <h4>Post-Release Consequences</h4>
                <ul>
                    <li><strong>Predation risk:</strong> Lack of predator avoidance increases mortality</li>
                    <li><strong>Foraging failure:</strong> Inability to find natural food sources</li>
                    <li><strong>Social dysfunction:</strong> Poor integration with wild populations</li>
                    <li><strong>Reproductive isolation:</strong> Difficulty finding mates or breeding</li>
                </ul>

                <h4>Mitigation Approaches</h4>
                <ul>
                    <li><strong>Wild-like conditions:</strong> Maximize natural behaviors in captivity</li>
                    <li><strong>Pre-release training:</strong> Teach essential survival skills</li>
                    <li><strong>Soft release:</strong> Gradual transition to wild conditions</li>
                    <li><strong>Head-starting:</strong> Release at younger ages before domestication</li>
                    <li><strong>Behavioral conditioning:</strong> Reinforce wild-appropriate behaviors</li>
                </ul>

                <h4>Examples</h4>
                <p>Black-footed ferrets raised in captivity showed reduced hunting success and higher predation rates when released. Training programs improved post-release survival from 30% to 60%.</p>
            `
        }
    };

    const detail = details[type];
    if (detail) {
        document.getElementById('geneticContent').innerHTML = `
            <h2>${detail.title}</h2>
            ${detail.content}
        `;
        document.getElementById('geneticModal').style.display = 'block';
    }
}

function showCaseStudy(study) {
    const studies = {
        condor: {
            title: 'California Condor - Genetic Rescue Success',
            content: `
                <h3>Background</h3>
                <p>The California condor was reduced to 22 individuals in 1982, all highly inbred with an average inbreeding coefficient of 0.25.</p>

                <h4>Genetic Challenges</h4>
                <ul>
                    <li><strong>Severe inbreeding depression:</strong> Fertility rates below 20%</li>
                    <li><strong>Developmental abnormalities:</strong> High chick mortality from birth defects</li>
                    <li><strong>Low genetic diversity:</strong> Heterozygosity reduced to critical levels</li>
                    <li><strong>Population bottleneck:</strong> All individuals descended from 14 founders</li>
                </ul>

                <h4>Genetic Management</h4>
                <ul>
                    <li><strong>Captive breeding program:</strong> Started in 1983 with all remaining individuals</li>
                    <li><strong>Pedigree analysis:</strong> Complete tracking of all breeding relationships</li>
                    <li><strong>Genetic rescue:</strong> Cross-fostering with Andean condors (different species)</li>
                    <li><strong>Population supplementation:</strong> Release of captive-bred individuals</li>
                </ul>

                <h4>Results</h4>
                <ul>
                    <li><strong>Population recovery:</strong> Over 500 individuals now exist</li>
                    <li><strong>Fertility improvement:</strong> Hatch rates increased from 20% to over 50%</li>
                    <li><strong>Genetic diversity:</strong> Maintained through careful breeding management</li>
                    <li><strong>Reintroduction success:</strong> Multiple populations established in wild</li>
                </ul>

                <h4>Lessons Learned</h4>
                <p>The California condor demonstrates that even severely inbred populations can be recovered with intensive genetic management and captive breeding programs.</p>
            `
        },
        ferret: {
            title: 'Black-footed Ferret - Reintroduction Challenges',
            content: `
                <h3>Extinction and Recovery</h3>
                <p>The black-footed ferret was declared extinct in 1979 but rediscovered in 1981. A captive breeding program was established from 18 individuals.</p>

                <h4>Genetic Issues</h4>
                <ul>
                    <li><strong>Founder bottleneck:</strong> Only 18 individuals captured</li>
                    <li><strong>Low genetic diversity:</strong> Very limited allelic variation</li>
                    <li><strong>Inbreeding depression:</strong> Reduced fertility and survival</li>
                    <li><strong>Domestication effects:</strong> Loss of hunting and social behaviors</li>
                </ul>

                <h4>Reintroduction Problems</h4>
                <ul>
                    <li><strong>Post-release survival:</strong> Only 30% survived first year</li>
                    <li><strong>Hunting inefficiency:</strong> Poor prairie dog hunting skills</li>
                    <li><strong>Disease susceptibility:</strong> High mortality from canine distemper</li>
                    <li><strong>Social dysfunction:</strong> Difficulty forming wild family groups</li>
                </ul>

                <h4>Management Solutions</h4>
                <ul>
                    <li><strong>Pre-release training:</strong> Live prey training programs</li>
                    <li><strong>Vaccination:</strong> Protection against common diseases</li>
                    <li><strong>Soft release:</strong> Gradual transition with supplemental feeding</li>
                    <li><strong>Genetic supplementation:</strong> Addition of new genetic material</li>
                </ul>

                <h4>Current Status</h4>
                <ul>
                    <li><strong>Population size:</strong> Over 300 individuals in wild populations</li>
                    <li><strong>Survival improvement:</strong> 60% first-year survival with training</li>
                    <li><strong>Genetic monitoring:</strong> Ongoing assessment of diversity</li>
                    <li><strong>Multiple sites:</strong> Reintroduced to 18 different locations</li>
                </ul>
            `
        },
        horse: {
            title: 'Przewalski\'s Horse - Behavioral Challenges',
            content: `
                <h3>Wild Horse Conservation</h3>
                <p>Przewalski's horse, the world's last truly wild horse, was extinct in the wild by 1969. Captive breeding began with 12 founders from zoos.</p>

                <h4>Genetic Management</h4>
                <ul>
                    <li><strong>Founder population:</strong> 12 individuals from captive collections</li>
                    <li><strong>Breeding success:</strong> Population grew to over 1,500 individuals</li>
                    <li><strong>Genetic diversity:</strong> Maintained through international cooperation</li>
                    <li><strong>Reintroduction:</strong> First release in 1992 in Mongolia</li>
                </ul>

                <h4>Behavioral Issues</h4>
                <ul>
                    <li><strong>Social structure:</strong> Altered harem formation and dominance behaviors</li>
                    <li><strong>Foraging patterns:</strong> Reduced ability to find sparse food resources</li>
                    <li><strong>Migration behavior:</strong> Loss of traditional migration routes</li>
                    <li><strong>Predator response:</strong> Inadequate avoidance of wolves and predators</li>
                </ul>

                <h4>Post-Release Performance</h4>
                <ul>
                    <li><strong>Survival rates:</strong> 60-70% first-year survival</li>
                    <li><strong>Reproductive success:</strong> Lower than expected foaling rates</li>
                    <li><strong>Range establishment:</strong> Smaller territories than wild ancestors</li>
                    <li><strong>Genetic contribution:</strong> Limited gene flow to wild populations</li>
                </ul>

                <h4>Management Approaches</h4>
                <ul>
                    <li><strong>Wild-like enclosures:</strong> Large enclosures to maintain natural behaviors</li>
                    <li><strong>Minimal human contact:</strong> Reduce domestication effects</li>
                    <li><strong>Predator exposure:</strong> Controlled exposure to maintain wariness</li>
                    <li><strong>Genetic monitoring:</strong> Track genetic diversity and inbreeding</li>
                </ul>

                <h4>Conservation Success</h4>
                <p>Despite behavioral challenges, Przewalski's horse has been successfully reintroduced to Mongolia with self-sustaining populations. The program demonstrates the importance of maintaining natural behaviors in captivity.</p>
            `
        },
        takahe: {
            title: 'Takahe - Behavioral Domestication',
            content: `
                <h3>New Zealand Takahe</h3>
                <p>The takahe, a large flightless rail, was thought extinct until rediscovered in 1948. Captive breeding began in 1988 to save the remaining 112 individuals.</p>

                <h4>Genetic Context</h4>
                <ul>
                    <li><strong>Small population:</strong> Only 112 individuals found in 1988</li>
                    <li><strong>Breeding success:</strong> Population increased to over 400 individuals</li>
                    <li><strong>Island isolation:</strong> No natural predators in historic range</li>
                    <li><strong>Habitat loss:</strong> 99% of original habitat destroyed</li>
                </ul>

                <h4>Domestication Effects</h4>
                <ul>
                    <li><strong>Predator naivety:</strong> Lack of response to introduced predators</li>
                    <li><strong>Human tolerance:</strong> Reduced fear of humans and vehicles</li>
                    <li><strong>Foraging changes:</strong> Preference for supplemental food</li>
                    <li><strong>Social behavior:</strong> Altered breeding and territorial behaviors</li>
                </ul>

                <h4>Reintroduction Challenges</h4>
                <ul>
                    <li><strong>Predation losses:</strong> High mortality from introduced mammals</li>
                    <li><strong>Hunting inefficiency:</strong> Poor natural food foraging skills</li>
                    <li><strong>Habitat adaptation:</strong> Difficulty in rugged terrain</li>
                    <li><strong>Breeding success:</strong> Lower reproductive rates in wild</li>
                </ul>

                <h4>Management Strategies</h4>
                <ul>
                    <li><strong>Fencing:</strong> Predator-proof sanctuaries for reintroduction</li>
                    <li><strong>Behavioral training:</strong> Exposure to predator cues</li>
                    <li><strong>Soft release:</strong> Gradual transition with supplemental feeding</li>
                    <li><strong>Habitat management:</strong> Maintenance of suitable breeding areas</li>
                </ul>

                <h4>Current Status</h4>
                <ul>
                    <li><strong>Population growth:</strong> Stable populations in predator-free zones</li>
                    <li><strong>Breeding success:</strong> Natural reproduction occurring</li>
                    <li><strong>Genetic diversity:</strong> Maintained through managed breeding</li>
                    <li><strong>Conservation success:</strong> No longer critically endangered</li>
                </ul>
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

function showStrategyDetail(type) {
    const strategies = {
        pedigree: {
            title: 'Pedigree Analysis and Management',
            content: `
                <h3>Understanding Pedigree Management</h3>
                <p>Pedigree analysis tracks breeding relationships to minimize inbreeding and maintain genetic diversity in captive populations.</p>

                <h4>Pedigree Components</h4>
                <ul>
                    <li><strong>Ancestry tracking:</strong> Complete family trees for all individuals</li>
                    <li><strong>Inbreeding coefficients:</strong> Calculation of relatedness between potential mates</li>
                    <li><strong>Genetic contributions:</strong> Monitoring founder representation</li>
                    <li><strong>Mean kinship:</strong> Average relatedness to the population</li>
                </ul>

                <h4>Management Tools</h4>
                <ul>
                    <li><strong>Breeding recommendations:</strong> Software to suggest optimal pairings</li>
                    <li><strong>Inbreeding avoidance:</strong> Prevent matings above threshold F values</li>
                    <li><strong>Genetic diversity maximization:</strong> Balance founder contributions</li>
                    <li><strong>Population subdivision:</strong> Manage separate breeding lines</li>
                </ul>

                <h4>Software Applications</h4>
                <ul>
                    <li><strong>PMx:</strong> Population management software for zoos</li>
                    <li><strong>SPARKS:</strong> Single population analysis and recording system</li>
                    <li><strong>GenSys:</strong> Genetic management system for captive breeding</li>
                    <li><strong>ZooRisk:</strong> Population viability analysis tool</li>
                </ul>

                <h4>Implementation Challenges</h4>
                <ul>
                    <li><strong>Data accuracy:</strong> Ensuring complete and correct pedigree records</li>
                    <li><strong>Sample identification:</strong> Reliable individual identification</li>
                    <li><strong>Genetic verification:</strong> DNA testing to confirm relationships</li>
                    <li><strong>International coordination:</strong> Sharing data across institutions</li>
                </ul>

                <h4>Success Examples</h4>
                <p>Species Survival Plans use pedigree management to maintain 90% of founder genetic diversity in many captive populations over multiple generations.</p>
            `
        },
        rescue: {
            title: 'Genetic Rescue Techniques',
            content: `
                <h3>Genetic Rescue Principles</h3>
                <p>Genetic rescue involves introducing new genetic material into inbred populations to restore genetic diversity and reduce inbreeding depression.</p>

                <h4>Methods of Genetic Rescue</h4>
                <ul>
                    <li><strong>Translocation:</strong> Moving individuals between populations</li>
                    <li><strong>Supplementation:</strong> Adding individuals from related populations</li>
                    <li><strong>Cross-fostering:</strong> Raising offspring of one species by another</li>
                    <li><strong>Artificial insemination:</strong> Using sperm from distant populations</li>
                    <li><strong>Cloning:</strong> Experimental technique for genetic restoration</li>
                </ul>

                <h4>Benefits</h4>
                <ul>
                    <li><strong>Increased heterozygosity:</strong> Immediate boost in genetic diversity</li>
                    <li><strong>Reduced inbreeding:</strong> Lower inbreeding coefficients</li>
                    <li><strong>Fitness improvement:</strong> Reduction in inbreeding depression</li>
                    <li><strong>Adaptability enhancement:</strong> New genetic variation for environmental change</li>
                </ul>

                <h4>Risks and Challenges</h4>
                <ul>
                    <li><strong>Outbreeding depression:</strong> Reduced fitness from breaking coadapted gene complexes</li>
                    <li><strong>Genetic swamping:</strong> Loss of local adaptations</li>
                    <li><strong>Disease introduction:</strong> Pathogens from introduced individuals</li>
                    <li><strong>Social disruption:</strong> Behavioral conflicts in recipient populations</li>
                </ul>

                <h4>Case Studies</h4>
                <ul>
                    <li><strong>Florida panther:</strong> Crossbreeding with Texas cougars improved genetic diversity</li>
                    <li><strong>California condor:</strong> Andean condor cross-fostering increased fertility</li>
                    <li><strong>Chacoan peccary:</strong> Translocation restored genetic variation</li>
                </ul>

                <h4>Guidelines for Implementation</h4>
                <ul>
                    <li><strong>Genetic assessment:</strong> Evaluate genetic status before intervention</li>
                    <li><strong>Source selection:</strong> Choose genetically compatible populations</li>
                    <li><strong>Monitoring:</strong> Track genetic and fitness changes post-rescue</li>
                    <li><strong>Adaptive management:</strong> Adjust based on outcomes</li>
                </ul>
            `
        },
        training: {
            title: 'Behavioral Training for Captive-Bred Animals',
            content: `
                <h3>Pre-Release Behavioral Training</h3>
                <p>Behavioral training programs teach captive-bred animals essential survival skills before release into the wild.</p>

                <h4>Training Components</h4>
                <ul>
                    <li><strong>Anti-predator training:</strong> Recognition and avoidance of predators</li>
                    <li><strong>Foraging skills:</strong> Location and capture of natural food sources</li>
                    <li><strong>Social behavior:</strong> Appropriate interactions with conspecifics</li>
                    <li><strong>Habitat navigation:</strong> Movement through natural terrain</li>
                    <li><strong>Reproductive behavior:</strong> Courtship and mating behaviors</li>
                </ul>

                <h4>Training Methods</h4>
                <ul>
                    <li><strong>Operant conditioning:</strong> Positive reinforcement for desired behaviors</li>
                    <li><strong>Social learning:</strong> Learning from experienced individuals</li>
                    <li><strong>Environmental enrichment:</strong> Promoting natural behaviors in captivity</li>
                    <li><strong>Prey exposure:</strong> Familiarization with natural food items</li>
                    <li><strong>Predator simulation:</strong> Controlled exposure to predator cues</li>
                </ul>

                <h4>Species-Specific Programs</h4>
                <ul>
                    <li><strong>Carnivores:</strong> Hunting skills and prey recognition</li>
                    <li><strong>Herbivores:</strong> Foraging and anti-predator behaviors</li>
                    <li><strong>Birds:</strong> Flight skills and migration behaviors</li>
                    <li><strong>Reptiles:</strong> Thermoregulation and habitat selection</li>
                    <li><strong>Amphibians:</strong> Aquatic-terrestrial transitions</li>
                </ul>

                <h4>Success Metrics</h4>
                <ul>
                    <li><strong>Skill acquisition:</strong> Demonstration of trained behaviors</li>
                    <li><strong>Post-release survival:</strong> Comparison of trained vs. untrained animals</li>
                    <li><strong>Reproductive success:</strong> Breeding rates in wild populations</li>
                    <li><strong>Population contribution:</strong> Genetic contribution to wild gene pool</li>
                </ul>

                <h4>Examples</h4>
                <ul>
                    <li><strong>Black-footed ferret:</strong> Live prey training improved hunting success</li>
                    <li><strong>Whooping crane:</strong> Ultralight aircraft taught migration routes</li>
                    <li><strong>Swift fox:</strong> Den excavation and digging skills training</li>
                    <li><strong>Golden lion tamarin:</strong> Foraging and social behavior programs</li>
                </ul>

                <h4>Challenges and Limitations</h4>
                <ul>
                    <li><strong>Time constraints:</strong> Limited training period before release</li>
                    <li><strong>Individual variation:</strong> Different learning abilities</li>
                    <li><strong>Stress effects:</strong> Training may increase captive stress</li>
                    <li><strong>Cost considerations:</strong> Expensive specialized training programs</li>
                </ul>
            `
        },
        supplementation: {
            title: 'Population Supplementation Strategies',
            content: `
                <h3>Strategic Release Programs</h3>
                <p>Population supplementation involves releasing captive-bred individuals to support or establish wild populations while minimizing genetic and ecological risks.</p>

                <h4>Supplementation Types</h4>
                <ul>
                    <li><strong>Population enhancement:</strong> Adding individuals to existing populations</li>
                    <li><strong>Reintroduction:</strong> Establishing populations in historic range</li>
                    <li><strong>Translocation:</strong> Moving individuals between populations</li>
                    <li><strong>Reinforcement:</strong> Supporting declining populations</li>
                </ul>

                <h4>Genetic Considerations</h4>
                <ul>
                    <li><strong>Source population genetics:</strong> Match genetic background to recipient</li>
                    <li><strong>Adaptive potential:</strong> Ensure genetic variation for local adaptation</li>
                    <li><strong>Inbreeding avoidance:</strong> Minimize relatedness to resident individuals</li>
                    <li><strong>Genetic monitoring:</strong> Track gene flow and diversity changes</li>
                </ul>

                <h4>Release Strategies</h4>
                <ul>
                    <li><strong>Hard release:</strong> Direct release into wild habitat</li>
                    <li><strong>Soft release:</strong> Gradual transition with support</li>
                    <li><strong>Head-starting:</strong> Release of captive-reared young</li>
                    <li><strong>Captive breeding:</strong> Ongoing supplementation source</li>
                </ul>

                <h4>Ecological Considerations</h4>
                <ul>
                    <li><strong>Carrying capacity:</strong> Habitat can support additional individuals</li>
                    <li><strong>Competition effects:</strong> Impact on resident wildlife</li>
                    <li><strong>Disease transmission:</strong> Pathogen introduction risks</li>
                    <li><strong>Behavioral integration:</strong> Social acceptance by wild individuals</li>
                </ul>

                <h4>Monitoring and Evaluation</h4>
                <ul>
                    <li><strong>Survival tracking:</strong> Radio telemetry and direct observation</li>
                    <li><strong>Reproductive success:</strong> Breeding and offspring production</li>
                    <li><strong>Genetic contribution:</strong> DNA analysis of population changes</li>
                    <li><strong>Population viability:</strong> Long-term demographic trends</li>
                </ul>

                <h4>Success Criteria</h4>
                <ul>
                    <li><strong>Individual survival:</strong> >50% first-year survival rate</li>
                    <li><strong>Population establishment:</strong> Self-sustaining populations</li>
                    <li><strong>Genetic integration:</strong> Successful gene flow to wild populations</li>
                    <li><strong>Ecological compatibility:</strong> No negative impacts on ecosystem</li>
                </ul>

                <h4>Case Studies</h4>
                <ul>
                    <li><strong>Red wolf:</strong> Supplementation program in North Carolina</li>
                    <li><strong>Gray wolf:</strong> Reintroduction to Yellowstone ecosystem</li>
                    <li><strong>California condor:</strong> Multiple release sites with monitoring</li>
                    <li><strong>Black rhino:</strong> Reinforcement of wild populations</li>
                </ul>
            `
        }
    };

    const strategy = strategies[type];
    if (strategy) {
        document.getElementById('strategyContent').innerHTML = `
            <h2>${strategy.title}</h2>
            ${strategy.content}
        `;
        document.getElementById('strategyModal').style.display = 'block';
    }
}

function closeModal() {
    document.getElementById('geneticModal').style.display = 'none';
    document.getElementById('caseStudyModal').style.display = 'none';
    document.getElementById('strategyModal').style.display = 'none';
}

// Action button functions
function learnMore() {
    window.open('https://www.iucn.org/theme/species/our-work/conservation-breeding', '_blank');
    showNotification('Opening IUCN conservation breeding resources', 'info');
}

function supportResearch() {
    window.open('https://www.conservation.org/act', '_blank');
    showNotification('Opening Conservation International donation page', 'info');
}

function learnTechniques() {
    window.open('https://www.cbsg.org/', '_blank');
    showNotification('Opening Conservation Breeding Specialist Group resources', 'info');
}

function joinPrograms() {
    window.open('https://www.volunteermatch.org/search?l=&q=wildlife+conservation', '_blank');
    showNotification('Opening volunteer opportunities in wildlife conservation', 'info');
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
    const geneticModal = document.getElementById('geneticModal');
    const caseStudyModal = document.getElementById('caseStudyModal');
    const strategyModal = document.getElementById('strategyModal');

    if (event.target === geneticModal) {
        geneticModal.style.display = 'none';
    }
    if (event.target === caseStudyModal) {
        caseStudyModal.style.display = 'none';
    }
    if (event.target === strategyModal) {
        strategyModal.style.display = 'none';
    }
}