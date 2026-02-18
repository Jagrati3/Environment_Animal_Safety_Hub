/**
 * Wetland Drainage and Amphibian Immune Collapse - Interactive Features
 * Handles immune system simulator, disease modals, and restoration tabs
 */

class WetlandImmuneSimulator {
    constructor() {
        this.drainageLevel = 0;
        this.stressDuration = 0;
        this.initializeElements();
        this.bindEvents();
        this.updateSimulation();
    }

    initializeElements() {
        // Simulator controls
        this.drainageSlider = document.getElementById('drainage-level');
        this.stressSlider = document.getElementById('stress-duration');
        this.drainageValue = document.getElementById('drainage-value');
        this.stressValue = document.getElementById('stress-value');

        // Immune metrics
        this.lymphocyteBar = document.getElementById('lymphocyte-bar');
        this.antibodyBar = document.getElementById('antibody-bar');
        this.stressBar = document.getElementById('stress-bar');
        this.diseaseBar = document.getElementById('disease-bar');

        this.lymphocyteValue = document.getElementById('lymphocyte-value');
        this.antibodyValue = document.getElementById('antibody-value');
        this.stressValueDisplay = document.getElementById('stress-value-display');
        this.diseaseValue = document.getElementById('disease-value');
    }

    bindEvents() {
        this.drainageSlider.addEventListener('input', () => this.updateDrainage());
        this.stressSlider.addEventListener('input', () => this.updateStress());
    }

    updateDrainage() {
        this.drainageLevel = parseInt(this.drainageSlider.value);
        this.drainageValue.textContent = `${this.drainageLevel}%`;
        this.updateSimulation();
    }

    updateStress() {
        this.stressDuration = parseInt(this.stressSlider.value);
        this.stressValue.textContent = `${this.stressDuration} days`;
        this.updateSimulation();
    }

    updateSimulation() {
        // Calculate immune function based on drainage and stress
        const drainageImpact = this.drainageLevel / 100;
        const stressImpact = Math.min(this.stressDuration / 30, 1); // Max impact after 30 days

        // Lymphocyte count decreases with drainage and stress
        const lymphocytePercent = Math.max(0, 100 - (drainageImpact * 60) - (stressImpact * 40));
        this.updateMetric(this.lymphocyteBar, lymphocytePercent, this.lymphocyteValue, lymphocytePercent.toFixed(0));

        // Antibody production decreases more severely
        const antibodyPercent = Math.max(0, 100 - (drainageImpact * 80) - (stressImpact * 50));
        this.updateMetric(this.antibodyBar, antibodyPercent, this.antibodyValue, antibodyPercent.toFixed(0));

        // Stress hormones increase
        const stressPercent = Math.min(100, (drainageImpact * 70) + (stressImpact * 80));
        this.updateMetric(this.stressBar, stressPercent, this.stressValueDisplay, stressPercent.toFixed(0));

        // Disease susceptibility increases dramatically
        const diseasePercent = Math.min(100, (drainageImpact * 90) + (stressImpact * 60));
        this.updateMetric(this.diseaseBar, diseasePercent, this.diseaseValue, diseasePercent.toFixed(0));
    }

    updateMetric(bar, percent, valueElement, displayValue) {
        bar.style.width = `${percent}%`;
        valueElement.textContent = `${displayValue}%`;
    }
}

// Disease Modal System
class DiseaseModalSystem {
    constructor() {
        this.modal = document.getElementById('disease-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalContent = document.getElementById('modal-content');
        this.closeBtn = document.querySelector('.modal-close');

        this.diseaseData = {
            chytrid: {
                title: 'Chytridiomycosis (Bd Infection)',
                content: `
                    <div class="disease-detail">
                        <h4>Pathogen Characteristics</h4>
                        <p><strong>Causal Agent:</strong> Batrachochytrium dendrobatidis, a chytrid fungus</p>
                        <p><strong>Transmission:</strong> Waterborne zoospores, direct contact, contaminated substrates</p>
                        <p><strong>Host Range:</strong> Over 500 amphibian species worldwide</p>

                        <h4>Immune System Impact</h4>
                        <ul>
                            <li>Disrupts skin keratinization and barrier function</li>
                            <li>Exploits corticosteroid-induced immunosuppression</li>
                            <li>Reduces antimicrobial peptide production</li>
                            <li>Causes electrolyte imbalance and osmotic stress</li>
                        </ul>

                        <h4>Environmental Factors</h4>
                        <ul>
                            <li>Optimal growth: 17-25°C</li>
                            <li>pH range: 4-8</li>
                            <li>Thrives in disturbed habitats</li>
                            <li>Enhanced transmission in fragmented landscapes</li>
                        </ul>

                        <h4>Management Strategies</h4>
                        <ul>
                            <li>Habitat restoration to reduce stress</li>
                            <li>Antifungal treatments (itraconazole, voriconazole)</li>
                            <li>Biosecurity protocols for captive breeding</li>
                            <li>Probiotic skin treatments</li>
                        </ul>
                    </div>
                `
            },
            ranavirus: {
                title: 'Ranavirus Infections',
                content: `
                    <div class="disease-detail">
                        <h4>Pathogen Characteristics</h4>
                        <p><strong>Causal Agent:</strong> Iridoviruses in the genus Ranavirus</p>
                        <p><strong>Transmission:</strong> Waterborne, direct contact, cannibalism, contaminated food</p>
                        <p><strong>Host Range:</strong> Fish, amphibians, reptiles</p>

                        <h4>Immune System Impact</h4>
                        <ul>
                            <li>Causes systemic immunosuppression</li>
                            <li>Induces apoptosis of immune cells</li>
                            <li>Disrupts cytokine production</li>
                            <li>Compromises both innate and adaptive immunity</li>
                        </ul>

                        <h4>Environmental Factors</h4>
                        <ul>
                            <li>Temperature-dependent replication (22-28°C optimal)</li>
                            <li>Enhanced virulence in stressed populations</li>
                            <li>Seasonal die-offs following environmental changes</li>
                            <li>Co-infection with Bd increases mortality</li>
                        </ul>

                        <h4>Management Strategies</h4>
                        <ul>
                            <li>Water quality management</li>
                            <li>Temperature control in captive facilities</li>
                            <li>Vaccination development</li>
                            <li>Stress reduction through habitat protection</li>
                        </ul>
                    </div>
                `
            },
            bacterial: {
                title: 'Bacterial Pathogens',
                content: `
                    <div class="disease-detail">
                        <h4>Common Pathogens</h4>
                        <p><strong>Aeromonas spp.:</strong> Opportunistic gram-negative bacteria</p>
                        <p><strong>Flavobacterium columnare:</strong> Columnaris disease agent</p>
                        <p><strong>Mycobacterium spp.:</strong> Chronic granulomatous infections</p>

                        <h4>Immune System Impact</h4>
                        <ul>
                            <li>Exploits compromised skin barrier</li>
                            <li>Overwhelms reduced phagocytosis capacity</li>
                            <li>Causes secondary infections in immunocompromised hosts</li>
                            <li>Biofilm formation on damaged tissues</li>
                        </ul>

                        <h4>Environmental Factors</h4>
                        <ul>
                            <li>Proliferation in eutrophic waters</li>
                            <li>Enhanced growth in warm temperatures</li>
                            <li>Antibiotic resistance in agricultural runoff</li>
                            <li>Competition with beneficial skin microbiota</li>
                        </ul>

                        <h4>Management Strategies</h4>
                        <ul>
                            <li>Water quality improvement</li>
                            <li>Probiotic treatments for skin microbiome</li>
                            <li>Antibiotic stewardship</li>
                            <li>Environmental contaminant reduction</li>
                        </ul>
                    </div>
                `
            }
        };

        this.bindEvents();
    }

    bindEvents() {
        // Bind learn more buttons
        document.querySelectorAll('.learn-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const disease = e.target.dataset.disease;
                this.openModal(disease);
            });
        });

        // Close modal events
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(disease) {
        const data = this.diseaseData[disease];
        if (!data) return;

        this.modalTitle.textContent = data.title;
        this.modalContent.innerHTML = data.content;
        this.modal.classList.add('active');

        // Focus management
        this.closeBtn.focus();

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';

        // Return focus to triggering button
        const activeBtn = document.querySelector('.learn-more-btn:focus');
        if (activeBtn) activeBtn.focus();
    }
}

// Restoration Solutions Tabs
class RestorationTabs {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabPanels = document.querySelectorAll('.tab-panel');
        this.bindEvents();
    }

    bindEvents() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.dataset.tab;
                this.switchTab(tabName);
            });
        });
    }

    switchTab(tabName) {
        // Update button states
        this.tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Update panel visibility
        this.tabPanels.forEach(panel => {
            panel.classList.toggle('active', panel.id === `${tabName}-panel`);
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.disease-card, .case-study-card, .solution-item');
        this.init();
    }

    init() {
        this.checkScroll();
        window.addEventListener('scroll', () => this.checkScroll());
    }

    checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;

        this.animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoadTime: 0,
            interactionCount: 0,
            simulatorUpdates: 0
        };
        this.init();
    }

    init() {
        // Measure page load time
        window.addEventListener('load', () => {
            this.metrics.pageLoadTime = performance.now();
            console.log(`Page loaded in ${this.metrics.pageLoadTime.toFixed(2)}ms`);
        });

        // Track interactions
        document.addEventListener('click', () => {
            this.metrics.interactionCount++;
        });
    }

    trackSimulatorUpdate() {
        this.metrics.simulatorUpdates++;
    }

    getMetrics() {
        return this.metrics;
    }
}

// Accessibility Enhancements
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        // High contrast mode detection
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.body.classList.add('high-contrast');
        }

        // Reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }

        // Focus management for modals
        this.setupFocusTraps();

        // Keyboard navigation for custom controls
        this.setupKeyboardNavigation();
    }

    setupFocusTraps() {
        // Focus trap for modal
        const modal = document.getElementById('disease-modal');
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    setupKeyboardNavigation() {
        // Custom range slider keyboard support
        const sliders = document.querySelectorAll('input[type="range"]');
        sliders.forEach(slider => {
            slider.addEventListener('keydown', (e) => {
                const step = parseInt(slider.step) || 1;
                const currentValue = parseInt(slider.value);

                switch (e.key) {
                    case 'ArrowUp':
                    case 'ArrowRight':
                        e.preventDefault();
                        slider.value = Math.min(parseInt(slider.max), currentValue + step);
                        slider.dispatchEvent(new Event('input'));
                        break;
                    case 'ArrowDown':
                    case 'ArrowLeft':
                        e.preventDefault();
                        slider.value = Math.max(parseInt(slider.min), currentValue - step);
                        slider.dispatchEvent(new Event('input'));
                        break;
                    case 'Home':
                        e.preventDefault();
                        slider.value = slider.min;
                        slider.dispatchEvent(new Event('input'));
                        break;
                    case 'End':
                        e.preventDefault();
                        slider.value = slider.max;
                        slider.dispatchEvent(new Event('input'));
                        break;
                }
            });
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize core components
    const immuneSimulator = new WetlandImmuneSimulator();
    const diseaseModal = new DiseaseModalSystem();
    const restorationTabs = new RestorationTabs();

    // Initialize enhancements
    const scrollAnimations = new ScrollAnimations();
    const performanceMonitor = new PerformanceMonitor();
    const accessibilityManager = new AccessibilityManager();

    // Set up initial animations
    document.querySelectorAll('.disease-card, .case-study-card, .solution-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Performance tracking for simulator
    const originalUpdateSimulation = immuneSimulator.updateSimulation;
    immuneSimulator.updateSimulation = function() {
        originalUpdateSimulation.call(this);
        performanceMonitor.trackSimulatorUpdate();
    };

    console.log('Wetland Drainage and Amphibian Immune Collapse page initialized');
});