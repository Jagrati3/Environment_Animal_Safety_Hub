// Fungal Pathogen Emergence JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeCounters();
    initializeEpidemicSimulation();
    initializeLifecycleStages();
    initializeRiskAssessment();
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Animated counters for hero stats
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

// Epidemic simulation
function initializeEpidemicSimulation() {
    const forestGrid = document.querySelector('.forest-grid');
    const trees = forestGrid.querySelectorAll('.tree');
    const startBtn = document.getElementById('start-simulation');
    const resetBtn = document.getElementById('reset-simulation');
    const infectionCount = document.getElementById('infection-count');

    let simulationRunning = false;
    let infectedCount = 1;

    function getAdjacentTrees(index) {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const adjacent = [];

        // Check all 8 possible adjacent positions
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const newRow = row + dr;
                const newCol = col + dc;
                if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
                    adjacent.push(newRow * 3 + newCol);
                }
            }
        }
        return adjacent;
    }

    function spreadInfection() {
        if (!simulationRunning) return;

        const healthyTrees = Array.from(trees).filter(tree => !tree.classList.contains('infected'));
        if (healthyTrees.length === 0) {
            simulationRunning = false;
            return;
        }

        // Find infected trees and spread to adjacent healthy trees
        trees.forEach((tree, index) => {
            if (tree.classList.contains('infected')) {
                const adjacentIndices = getAdjacentTrees(index);
                adjacentIndices.forEach(adjIndex => {
                    const adjTree = trees[adjIndex];
                    if (!adjTree.classList.contains('infected') && Math.random() < 0.3) {
                        adjTree.classList.add('infected');
                        infectedCount++;
                        infectionCount.textContent = infectedCount;
                    }
                });
            }
        });

        // Continue simulation
        setTimeout(spreadInfection, 1000);
    }

    startBtn.addEventListener('click', () => {
        if (!simulationRunning) {
            simulationRunning = true;
            spreadInfection();
        }
    });

    resetBtn.addEventListener('click', () => {
        simulationRunning = false;
        trees.forEach((tree, index) => {
            tree.classList.remove('infected');
            if (index === 3) { // Center tree starts infected
                tree.classList.add('infected');
            }
        });
        infectedCount = 1;
        infectionCount.textContent = infectedCount;
    });
}

// Pathogen lifecycle stages
function initializeLifecycleStages() {
    const stages = document.querySelectorAll('.lifecycle-stage');
    const description = document.getElementById('stage-desc');

    const stageDescriptions = {
        1: "Pathogen spores land on susceptible host tissue and germinate, penetrating through natural openings or wounds.",
        2: "Fungal hyphae grow and colonize host tissues, producing enzymes that break down cell walls and extract nutrients.",
        3: "Pathogen produces reproductive structures (spores, fruiting bodies) in response to environmental cues and host stress.",
        4: "Spores are dispersed through wind, water, animals, or human activity to new susceptible hosts."
    };

    stages.forEach(stage => {
        stage.addEventListener('click', () => {
            stages.forEach(s => s.classList.remove('active'));
            stage.classList.add('active');

            const stageNum = stage.getAttribute('data-stage');
            description.textContent = stageDescriptions[stageNum];
        });
    });
}

// Risk assessment tool
function initializeRiskAssessment() {
    const speciesSelect = document.getElementById('species-select');
    const ageSlider = document.getElementById('age-slider');
    const ageValue = document.getElementById('age-value');
    const diversitySlider = document.getElementById('diversity-slider');
    const diversityValue = document.getElementById('diversity-value');
    const riskLevel = document.getElementById('risk-level');
    const riskFill = document.getElementById('risk-fill');

    const diversityLevels = ['Very Low', 'Low', 'Low', 'Medium', 'Medium', 'Medium', 'High', 'High', 'Very High', 'Very High'];

    function calculateRisk() {
        const species = speciesSelect.value;
        const age = parseInt(ageSlider.value);
        const diversity = parseInt(diversitySlider.value);

        // Base risk by species
        let riskScore = 0;
        switch(species) {
            case 'pine': riskScore = 80; break;
            case 'oak': riskScore = 70; break;
            case 'spruce': riskScore = 75; break;
            case 'eucalyptus': riskScore = 90; break;
        }

        // Age factor (young plantations more vulnerable)
        if (age < 10) riskScore += 15;
        else if (age > 30) riskScore -= 10;

        // Diversity factor (lower diversity = higher risk)
        riskScore += (11 - diversity) * 5;

        // Cap at 100
        riskScore = Math.min(100, Math.max(0, riskScore));

        // Determine risk level
        let level;
        if (riskScore < 30) level = 'Low';
        else if (riskScore < 60) level = 'Medium';
        else if (riskScore < 80) level = 'High';
        else level = 'Very High';

        riskLevel.textContent = level;
        riskFill.style.width = riskScore + '%';

        // Color coding
        if (riskScore < 30) riskFill.style.background = 'var(--secondary-color)';
        else if (riskScore < 60) riskFill.style.background = 'var(--warning-color)';
        else riskFill.style.background = 'var(--danger-color)';
    }

    // Event listeners
    speciesSelect.addEventListener('change', calculateRisk);
    ageSlider.addEventListener('input', function() {
        ageValue.textContent = this.value + ' years';
        calculateRisk();
    });
    diversitySlider.addEventListener('input', function() {
        diversityValue.textContent = diversityLevels[this.value - 1];
        calculateRisk();
    });

    // Initial calculation
    calculateRisk();
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.vulnerability-card, .pathogen-item, .case-study-card, .solution-category').forEach(card => {
    observer.observe(card);
});

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideUp 0.6s ease-out forwards;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .vulnerability-card, .pathogen-item, .case-study-card, .solution-category {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .vulnerability-card.animate-in, .pathogen-item.animate-in,
    .case-study-card.animate-in, .solution-category.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Vulnerability card interactions
document.querySelectorAll('.vulnerability-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.vulnerability-icon');
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.vulnerability-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Case study card interactions
document.querySelectorAll('.case-study-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderLeft = '5px solid var(--accent-color)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.borderLeft = 'none';
    });
});

// Lifecycle stage hover effects
document.querySelectorAll('.lifecycle-stage').forEach(stage => {
    stage.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            this.style.borderColor = var(--primary-color);
            this.style.transform = 'scale(1.05)';
        }
    });

    stage.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.borderColor = var(--border-color);
            this.style.transform = 'scale(1)';
        }
    });
});

// Performance monitoring
function logPerformance() {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Fungal Pathogen Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    }
}

window.addEventListener('load', logPerformance);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Fungal Pathogen page error:', e.error);
});

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels
    document.querySelectorAll('.tab-button').forEach(button => {
        const tabId = button.getAttribute('data-tab');
        button.setAttribute('aria-controls', tabId);
        button.setAttribute('aria-selected', button.classList.contains('active'));
    });

    // Update ARIA when tabs change
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-button')) {
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.setAttribute('aria-selected', 'false');
            });
            e.target.setAttribute('aria-selected', 'true');
        }
    });

    // Add alt text for icons
    document.querySelectorAll('.vulnerability-icon').forEach(icon => {
        const altText = icon.textContent;
        icon.setAttribute('aria-label', altText);
        icon.setAttribute('role', 'img');
    });

    // Form accessibility
    document.querySelectorAll('input[type="range"]').forEach(slider => {
        slider.setAttribute('aria-valuemin', slider.min);
        slider.setAttribute('aria-valuemax', slider.max);
        slider.setAttribute('aria-valuenow', slider.value);
    });
}

improveAccessibility();

// Keyboard navigation for lifecycle stages
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const stages = Array.from(document.querySelectorAll('.lifecycle-stage'));
        const activeStage = document.querySelector('.lifecycle-stage.active');
        const currentIndex = stages.indexOf(activeStage);

        let newIndex;
        if (e.key === 'ArrowLeft') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : stages.length - 1;
        } else {
            newIndex = currentIndex < stages.length - 1 ? currentIndex + 1 : 0;
        }

        stages[newIndex].click();
    }
});

// Export functions for potential reuse
window.FungalPathogenInterface = {
    initializeTabs,
    initializeCounters,
    initializeEpidemicSimulation,
    initializeLifecycleStages,
    initializeRiskAssessment
};