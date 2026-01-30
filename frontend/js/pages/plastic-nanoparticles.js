// Plastic Nanoparticles and Cellular Toxicity Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initializeScrollAnimations();
    initializeUptakeSimulator();
    initializeToxicityCalculator();
    initializeTissueDistribution();
    initializeBiomarkersDashboard();
    initializeModalSystem();
    initializeCaseStudies();
});

// Scroll animations for content sections
function initializeScrollAnimations() {
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

    // Observe all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });
}

// Cellular Uptake Simulator
function initializeUptakeSimulator() {
    const nanoparticleType = document.getElementById('nanoparticle-type');
    const concentration = document.getElementById('concentration');
    const exposureTime = document.getElementById('exposure-time');
    const temperature = document.getElementById('temperature');
    const ph = document.getElementById('ph');

    const mechanismDisplay = document.getElementById('uptake-mechanism');
    const toxicityIndicator = document.getElementById('toxicity-indicator');
    const uptakeMetrics = document.querySelectorAll('.bar-fill');

    // Nanoparticle properties database
    const nanoparticleData = {
        ps: {
            name: 'Polystyrene',
            color: '#7c3aed',
            uptakeRate: 0.8,
            toxicity: 0.7,
            mechanisms: ['Endocytosis', 'Diffusion', 'Adsorption']
        },
        pe: {
            name: 'Polyethylene',
            color: '#059669',
            uptakeRate: 0.6,
            toxicity: 0.5,
            mechanisms: ['Passive diffusion', 'Carrier-mediated']
        },
        pvc: {
            name: 'PVC',
            color: '#dc2626',
            uptakeRate: 0.9,
            toxicity: 0.9,
            mechanisms: ['Active transport', 'Receptor-mediated']
        },
        pet: {
            name: 'PET',
            color: '#ea580c',
            uptakeRate: 0.4,
            toxicity: 0.6,
            mechanisms: ['Diffusion', 'Pinocytosis']
        }
    };

    function updateUptakeSimulation() {
        const type = nanoparticleType.value;
        const conc = parseFloat(concentration.value);
        const time = parseFloat(exposureTime.value);
        const temp = parseFloat(temperature.value);
        const pH = parseFloat(ph.value);

        const data = nanoparticleData[type];

        // Calculate uptake rate based on environmental factors
        let uptakeRate = data.uptakeRate;
        uptakeRate *= (1 + (conc - 1) * 0.1); // Concentration effect
        uptakeRate *= (1 + (time - 24) * 0.02); // Time effect
        uptakeRate *= (1 + (temp - 25) * 0.01); // Temperature effect
        uptakeRate *= (1 + Math.abs(pH - 7) * -0.05); // pH effect

        uptakeRate = Math.max(0, Math.min(1, uptakeRate));

        // Update visual elements
        updateParticleAnimation(type, uptakeRate);
        updateUptakeMetrics(uptakeRate, data.toxicity);
        updateMechanismDisplay(data.mechanisms, uptakeRate);
        updateToxicityIndicator(uptakeRate * data.toxicity);
    }

    function updateParticleAnimation(type, rate) {
        const particles = document.querySelectorAll('.nanoparticle-particle');
        const color = nanoparticleData[type].color;

        particles.forEach(particle => {
            particle.style.background = color;
            particle.style.animationDuration = `${6 / rate}s`;
        });
    }

    function updateUptakeMetrics(uptake, toxicity) {
        const metrics = [
            { element: document.getElementById('uptake-bar'), value: uptake },
            { element: document.getElementById('toxicity-bar'), value: toxicity },
            { element: document.getElementById('accumulation-bar'), value: uptake * 0.8 }
        ];

        metrics.forEach(metric => {
            metric.element.style.width = `${metric.value * 100}%`;
        });
    }

    function updateMechanismDisplay(mechanisms, rate) {
        const primaryMechanism = mechanisms[Math.floor(rate * mechanisms.length)];
        mechanismDisplay.textContent = `Primary Uptake: ${primaryMechanism}`;
    }

    function updateToxicityIndicator(level) {
        let toxicityLevel, color;

        if (level < 0.3) {
            toxicityLevel = 'Low';
            color = '#22c55e';
        } else if (level < 0.6) {
            toxicityLevel = 'Moderate';
            color = '#f59e0b';
        } else if (level < 0.8) {
            toxicityLevel = 'High';
            color = '#ea580c';
        } else {
            toxicityLevel = 'Critical';
            color = '#dc2626';
        }

        toxicityIndicator.textContent = `Toxicity Level: ${toxicityLevel}`;
        toxicityIndicator.style.color = color;
    }

    // Event listeners
    nanoparticleType.addEventListener('change', updateUptakeSimulation);
    concentration.addEventListener('input', updateUptakeSimulation);
    exposureTime.addEventListener('input', updateUptakeSimulation);
    temperature.addEventListener('input', updateUptakeSimulation);
    ph.addEventListener('input', updateUptakeSimulation);

    // Initialize with default values
    updateUptakeSimulation();
}

// Cellular Toxicity Calculator
function initializeToxicityCalculator() {
    const nanoparticleType = document.getElementById('toxicity-nanoparticle-type');
    const concentration = document.getElementById('toxicity-concentration');
    const exposureDuration = document.getElementById('exposure-duration');
    const cellType = document.getElementById('cell-type');
    const checkboxes = document.querySelectorAll('.toxicity-checkboxes input');

    const oxidativeStress = document.getElementById('oxidative-stress');
    const membraneDamage = document.getElementById('membrane-damage');
    const dnaDamage = document.getElementById('dna-damage');
    const inflammation = document.getElementById('inflammation');
    const toxicityDescription = document.getElementById('toxicity-description');

    // Toxicity calculation parameters
    const toxicityFactors = {
        ps: { oxidative: 0.8, membrane: 0.6, dna: 0.4, inflammation: 0.7 },
        pe: { oxidative: 0.5, membrane: 0.4, dna: 0.3, inflammation: 0.5 },
        pvc: { oxidative: 0.9, membrane: 0.8, dna: 0.6, inflammation: 0.8 },
        pet: { oxidative: 0.6, membrane: 0.5, dna: 0.5, inflammation: 0.6 }
    };

    const cellTypeModifiers = {
        epithelial: 1.0,
        immune: 1.2,
        neuronal: 1.5,
        hepatic: 1.3,
        renal: 1.1
    };

    function calculateToxicity() {
        const type = nanoparticleType.value;
        const conc = parseFloat(concentration.value);
        const duration = parseFloat(exposureDuration.value);
        const cell = cellType.value;

        const baseFactors = toxicityFactors[type];
        const cellModifier = cellTypeModifiers[cell];

        // Calculate exposure modifiers
        const concentrationModifier = Math.log10(conc + 1) / 2;
        const durationModifier = Math.log10(duration + 1) / 2;

        // Calculate individual toxicity levels
        const toxicities = {
            oxidative: baseFactors.oxidative * cellModifier * concentrationModifier * durationModifier,
            membrane: baseFactors.membrane * cellModifier * concentrationModifier * durationModifier,
            dna: baseFactors.dna * cellModifier * concentrationModifier * durationModifier,
            inflammation: baseFactors.inflammation * cellModifier * concentrationModifier * durationModifier
        };

        // Apply checkbox modifiers
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const factor = checkbox.dataset.factor;
                const multiplier = parseFloat(checkbox.dataset.multiplier);
                Object.keys(toxicities).forEach(key => {
                    toxicities[key] *= multiplier;
                });
            }
        });

        // Normalize values
        Object.keys(toxicities).forEach(key => {
            toxicities[key] = Math.max(0, Math.min(1, toxicities[key]));
        });

        updateToxicityDisplay(toxicities);
        updateToxicityDescription(toxicities);
    }

    function updateToxicityDisplay(toxicities) {
        const metrics = [
            { element: oxidativeStress, value: toxicities.oxidative },
            { element: membraneDamage, value: toxicities.membrane },
            { element: dnaDamage, value: toxicities.dna },
            { element: inflammation, value: toxicities.inflammation }
        ];

        metrics.forEach(metric => {
            const bar = metric.element.querySelector('.toxicity-bar-fill');
            const value = metric.element.querySelector('.metric-value');
            const percentage = Math.round(metric.value * 100);

            bar.style.width = `${percentage}%`;
            value.textContent = `${percentage}%`;
        });
    }

    function updateToxicityDescription(toxicities) {
        const maxToxicity = Math.max(...Object.values(toxicities));
        const dominantType = Object.keys(toxicities).reduce((a, b) =>
            toxicities[a] > toxicities[b] ? a : b
        );

        let description = '';

        if (maxToxicity < 0.3) {
            description = 'Low toxicity levels detected. Cellular functions appear normal.';
        } else if (maxToxicity < 0.6) {
            description = `Moderate ${dominantType} stress observed. Monitor cellular health closely.`;
        } else if (maxToxicity < 0.8) {
            description = `High ${dominantType} damage detected. Significant cellular stress present.`;
        } else {
            description = `Critical ${dominantType} toxicity. Severe cellular damage and potential cell death.`;
        }

        toxicityDescription.textContent = description;
    }

    // Event listeners
    nanoparticleType.addEventListener('change', calculateToxicity);
    concentration.addEventListener('input', calculateToxicity);
    exposureDuration.addEventListener('input', calculateToxicity);
    cellType.addEventListener('change', calculateToxicity);
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateToxicity);
    });

    // Initialize with default values
    calculateToxicity();
}

// Tissue Distribution Analyzer
function initializeTissueDistribution() {
    const nanoparticleType = document.getElementById('distribution-nanoparticle-type');
    const exposureRoute = document.getElementById('exposure-route');
    const timeAfterExposure = document.getElementById('time-after-exposure');
    const organismType = document.getElementById('organism-type');

    const bioaccumulationDisplay = document.getElementById('bioaccumulation-level');
    const organs = document.querySelectorAll('.organ');

    // Distribution patterns by nanoparticle type and exposure route
    const distributionPatterns = {
        ps: {
            oral: { liver: 0.8, gut: 0.6, kidney: 0.4, brain: 0.2, gill: 0.1, muscle: 0.3 },
            water: { gill: 0.9, liver: 0.7, kidney: 0.5, brain: 0.3, gut: 0.2, muscle: 0.4 }
        },
        pe: {
            oral: { liver: 0.6, gut: 0.8, kidney: 0.3, brain: 0.1, gill: 0.2, muscle: 0.4 },
            water: { gill: 0.8, liver: 0.5, kidney: 0.4, brain: 0.2, gut: 0.3, muscle: 0.5 }
        },
        pvc: {
            oral: { liver: 0.9, gut: 0.7, kidney: 0.6, brain: 0.4, gill: 0.1, muscle: 0.2 },
            water: { gill: 0.95, liver: 0.8, kidney: 0.7, brain: 0.5, gut: 0.2, muscle: 0.3 }
        },
        pet: {
            oral: { liver: 0.7, gut: 0.9, kidney: 0.5, brain: 0.3, gill: 0.1, muscle: 0.4 },
            water: { gill: 0.7, liver: 0.6, kidney: 0.5, brain: 0.4, gut: 0.3, muscle: 0.6 }
        }
    };

    function updateDistribution() {
        const type = nanoparticleType.value;
        const route = exposureRoute.value;
        const time = parseFloat(timeAfterExposure.value);
        const organism = organismType.value;

        const pattern = distributionPatterns[type][route];

        // Calculate time-based accumulation
        const timeFactor = Math.min(1, time / 168); // Peak at 1 week (168 hours)

        // Update organ accumulation levels
        organs.forEach(organ => {
            const organName = organ.classList[1]; // liver, brain, etc.
            const baseLevel = pattern[organName] || 0;
            const accumulationLevel = baseLevel * timeFactor;

            const accumulationBar = organ.querySelector('.accumulation-level::after');
            if (accumulationBar) {
                accumulationBar.style.width = `${accumulationLevel * 100}%`;
            }
        });

        // Calculate overall bioaccumulation
        const totalAccumulation = Object.values(pattern).reduce((sum, level) => sum + level, 0) / Object.values(pattern).length;
        const bioaccumulationFactor = totalAccumulation * timeFactor;

        updateBioaccumulationDisplay(bioaccumulationFactor);
    }

    function updateBioaccumulationDisplay(factor) {
        const level = Math.round(factor * 100);
        bioaccumulationDisplay.textContent = `Bioaccumulation Factor: ${level}x baseline`;
    }

    // Event listeners
    nanoparticleType.addEventListener('change', updateDistribution);
    exposureRoute.addEventListener('change', updateDistribution);
    timeAfterExposure.addEventListener('input', updateDistribution);
    organismType.addEventListener('change', updateDistribution);

    // Initialize with default values
    updateDistribution();
}

// Biomarkers Dashboard
function initializeBiomarkersDashboard() {
    const nanoparticleType = document.getElementById('biomarker-nanoparticle-type');
    const concentration = document.getElementById('biomarker-concentration');
    const exposureTime = document.getElementById('biomarker-exposure-time');
    const tissueType = document.getElementById('biomarker-tissue-type');

    const biomarkerItems = document.querySelectorAll('.biomarker-item');

    // Biomarker response patterns
    const biomarkerData = {
        ps: {
            oxidative: { baseline: 1.0, maxResponse: 3.5, sensitivity: 0.8 },
            inflammation: { baseline: 1.0, maxResponse: 4.2, sensitivity: 0.9 },
            apoptosis: { baseline: 1.0, maxResponse: 2.8, sensitivity: 0.6 },
            genotoxicity: { baseline: 1.0, maxResponse: 3.1, sensitivity: 0.7 }
        },
        pe: {
            oxidative: { baseline: 1.0, maxResponse: 2.8, sensitivity: 0.6 },
            inflammation: { baseline: 1.0, maxResponse: 3.5, sensitivity: 0.7 },
            apoptosis: { baseline: 1.0, maxResponse: 2.2, sensitivity: 0.5 },
            genotoxicity: { baseline: 1.0, maxResponse: 2.5, sensitivity: 0.6 }
        },
        pvc: {
            oxidative: { baseline: 1.0, maxResponse: 4.8, sensitivity: 0.95 },
            inflammation: { baseline: 1.0, maxResponse: 5.2, sensitivity: 0.98 },
            apoptosis: { baseline: 1.0, maxResponse: 3.8, sensitivity: 0.8 },
            genotoxicity: { baseline: 1.0, maxResponse: 4.5, sensitivity: 0.85 }
        },
        pet: {
            oxidative: { baseline: 1.0, maxResponse: 3.2, sensitivity: 0.75 },
            inflammation: { baseline: 1.0, maxResponse: 3.8, sensitivity: 0.8 },
            apoptosis: { baseline: 1.0, maxResponse: 2.9, sensitivity: 0.65 },
            genotoxicity: { baseline: 1.0, maxResponse: 3.5, sensitivity: 0.75 }
        }
    };

    const tissueModifiers = {
        liver: 1.3,
        kidney: 1.1,
        brain: 1.5,
        gill: 1.0,
        muscle: 0.8
    };

    function updateBiomarkers() {
        const type = nanoparticleType.value;
        const conc = parseFloat(concentration.value);
        const time = parseFloat(exposureTime.value);
        const tissue = tissueType.value;

        const data = biomarkerData[type];
        const tissueModifier = tissueModifiers[tissue];

        // Calculate biomarker responses
        const biomarkers = {
            oxidative: calculateBiomarkerResponse(data.oxidative, conc, time, tissueModifier),
            inflammation: calculateBiomarkerResponse(data.inflammation, conc, time, tissueModifier),
            apoptosis: calculateBiomarkerResponse(data.apoptosis, conc, time, tissueModifier),
            genotoxicity: calculateBiomarkerResponse(data.genotoxicity, conc, time, tissueModifier)
        };

        updateBiomarkerDisplay(biomarkers);
        updateBiomarkerChart(biomarkers);
    }

    function calculateBiomarkerResponse(biomarker, concentration, time, tissueModifier) {
        const concFactor = Math.log10(concentration + 1) / 2;
        const timeFactor = Math.min(1, time / 72); // Peak at 72 hours
        const sensitivity = biomarker.sensitivity;

        const response = biomarker.baseline +
            (biomarker.maxResponse - biomarker.baseline) *
            concFactor * timeFactor * sensitivity * tissueModifier;

        return Math.max(biomarker.baseline, response);
    }

    function updateBiomarkerDisplay(biomarkers) {
        const biomarkerTypes = ['oxidative', 'inflammation', 'apoptosis', 'genotoxicity'];

        biomarkerItems.forEach((item, index) => {
            const type = biomarkerTypes[index];
            const value = biomarkers[type];
            const valueElement = item.querySelector('.biomarker-value');

            valueElement.textContent = value.toFixed(1) + 'x';
            valueElement.style.color = getBiomarkerColor(value);
        });
    }

    function getBiomarkerColor(value) {
        if (value < 1.5) return '#22c55e';
        if (value < 2.5) return '#f59e0b';
        if (value < 3.5) return '#ea580c';
        return '#dc2626';
    }

    function updateBiomarkerChart(biomarkers) {
        // Simple chart update - in a real implementation, this would use Chart.js
        const chartContainer = document.querySelector('.biomarker-chart');
        if (chartContainer) {
            // Update chart visualization here
            console.log('Updating biomarker chart:', biomarkers);
        }
    }

    // Event listeners
    nanoparticleType.addEventListener('change', updateBiomarkers);
    concentration.addEventListener('input', updateBiomarkers);
    exposureTime.addEventListener('input', updateBiomarkers);
    tissueType.addEventListener('change', updateBiomarkers);

    // Initialize with default values
    updateBiomarkers();
}

// Modal System
function initializeModalSystem() {
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeButtons = document.querySelectorAll('.close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Case Studies
function initializeCaseStudies() {
    const caseStudyCards = document.querySelectorAll('.case-study-card');

    caseStudyCards.forEach(card => {
        card.addEventListener('click', () => {
            const studyId = card.dataset.study;
            // In a real implementation, this would load detailed case study content
            console.log('Loading case study:', studyId);
        });
    });
}

// Utility Functions
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

// Export functions for potential use in other scripts
window.PlasticNanoparticles = {
    initializeUptakeSimulator,
    initializeToxicityCalculator,
    initializeTissueDistribution,
    initializeBiomarkersDashboard
};