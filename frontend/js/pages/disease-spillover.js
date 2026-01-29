// Disease Spillover Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeDiseaseSpilloverPage();
});

function initializeDiseaseSpilloverPage() {
    // Initialize any interactive elements
    setupActionButtons();
}

function setupActionButtons() {
    // Action buttons are already in HTML with onclick
}

// Action button functions
function learnMore() {
    // Open educational resources about zoonotic diseases
    const learnUrl = 'https://www.cdc.gov/zoonotic/index.html';
    window.open(learnUrl, '_blank');

    // Show information about learning
    showNotification('Opening CDC zoonotic diseases page. Learn about disease prevention!', 'info');
}

function supportConservation() {
    // Open conservation organizations
    const conservationUrl = 'https://www.worldwildlife.org/initiatives/wildlife-conservation';
    window.open(conservationUrl, '_blank');

    // Show information about supporting conservation
    showNotification('Opening World Wildlife Fund conservation page. Your support helps prevent disease spillover!', 'info');
}

function reportWildlife() {
    // Open wildlife reporting resources
    const reportUrl = 'https://www.fws.gov/reportwildlife';
    window.open(reportUrl, '_blank');

    // Show information about reporting
    showNotification('Opening wildlife reporting page. Help monitor and protect wildlife health!', 'info');
}

// Interactive functions for detailed information
function showDiseaseDetails(diseaseName) {
    const diseases = {
        'covid19': {
            title: 'COVID-19 Spillover Analysis',
            content: `
                <h4>Epidemiological Context</h4>
                <p>COVID-19 emerged in Wuhan, China in late 2019, with evidence suggesting a wildlife origin, likely from bats.</p>

                <h4>Habitat Destruction Link</h4>
                <p>Deforestation in Southeast Asia has destroyed bat habitats, forcing them into closer contact with human populations and livestock. Wet markets provided the perfect environment for spillover.</p>

                <h4>Prevention Through Conservation</h4>
                <ul>
                    <li>Protect bat habitats to reduce human-wildlife contact</li>
                    <li>Regulate wildlife trade and wet markets</li>
                    <li>Implement wildlife health monitoring programs</li>
                    <li>Promote sustainable land use practices</li>
                </ul>

                <p><strong>Impact:</strong> Over 700 million cases and 7 million deaths worldwide, with massive economic and social consequences.</p>
            `
        },
        'ebola': {
            title: 'Ebola Spillover Patterns',
            content: `
                <h4>Ebola Virus Ecology</h4>
                <p>Ebola viruses are maintained in bat populations and can spill over to primates and humans through contact with infected bushmeat or bodily fluids.</p>

                <h4>Habitat Destruction Factors</h4>
                <p>Mining operations and deforestation in Central Africa have increased human encroachment into bat habitats. Population growth and urbanization have further increased exposure risks.</p>

                <h4>Conservation Prevention Strategies</h4>
                <ul>
                    <li>Create wildlife corridors to maintain natural habitats</li>
                    <li>Implement sustainable mining practices</li>
                    <li>Educate communities about bushmeat risks</li>
                    <li>Develop wildlife health surveillance systems</li>
                </ul>

                <p><strong>Impact:</strong> Multiple outbreaks with case fatality rates up to 90%, affecting thousands in West and Central Africa.</p>
            `
        },
        'nipah': {
            title: 'Nipah Virus Emergence',
            content: `
                <h4>Virus Characteristics</h4>
                <p>Nipah virus is carried by fruit bats (Pteropus species) and can cause severe respiratory illness and encephalitis in humans.</p>

                <h4>Habitat Loss Connection</h4>
                <p>Palm oil plantations in Southeast Asia have destroyed vast areas of bat habitat, forcing bats to forage closer to human settlements and date palm plantations.</p>

                <h4>Conservation Solutions</h4>
                <ul>
                    <li>Protect remaining bat habitats and create wildlife corridors</li>
                    <li>Implement sustainable palm oil certification</li>
                    <li>Monitor bat populations and virus prevalence</li>
                    <li>Develop human vaccines and treatments</li>
                </ul>

                <p><strong>Impact:</strong> Outbreaks in Malaysia, Singapore, Bangladesh, and India with fatality rates of 40-75%.</p>
            `
        }
    };

    const disease = diseases[diseaseName];
    if (disease) {
        showModal(disease.title, disease.content);
    }
}

function showPreventionStrategy(strategyName) {
    const strategies = {
        'surveillance': {
            title: 'Wildlife Disease Surveillance',
            content: `
                <h4>Program Components</h4>
                <ul>
                    <li><strong>Wildlife Health Monitoring:</strong> Regular sampling of wildlife populations for pathogens</li>
                    <li><strong>Early Warning Systems:</strong> Rapid detection of disease emergence</li>
                    <li><strong>Human-Wildlife Interface Monitoring:</strong> Tracking contact points between species</li>
                    <li><strong>Data Integration:</strong> Combining wildlife, domestic animal, and human health data</li>
                </ul>

                <h4>Implementation Examples</h4>
                <p>Programs like PREDICT and USAID's Emerging Pandemic Threats program have successfully identified thousands of viruses with zoonotic potential before they spill over to humans.</p>

                <h4>Benefits</h4>
                <p>Early detection allows for rapid response, preventing major outbreaks and saving lives and resources.</p>
            `
        },
        'vaccines': {
            title: 'Wildlife Vaccination Programs',
            content: `
                <h4>Vaccine Development Challenges</h4>
                <p>Developing vaccines for wildlife is complex due to species diversity, delivery methods, and ethical considerations.</p>

                <h4>Successful Examples</h4>
                <ul>
                    <li><strong>Rabies Vaccination:</strong> Oral vaccines delivered via baits for foxes, raccoons, and bats</li>
                    <li><strong>Devil Facial Tumor Disease:</strong> Vaccine trials for Tasmanian devils</li>
                    <li><strong>Chronic Wasting Disease:</strong> Research into vaccines for deer populations</li>
                </ul>

                <h4>Future Applications</h4>
                <p>Vaccines could prevent disease amplification in wildlife reservoirs, reducing spillover risk for diseases like Ebola and Nipah.</p>
            `
        },
        'one-health': {
            title: 'One Health Approach',
            content: `
                <h4>Core Principles</h4>
                <p>One Health recognizes that human, animal, and environmental health are interconnected and must be addressed together.</p>

                <h4>Implementation</h4>
                <ul>
                    <li><strong>Interdisciplinary Teams:</strong> Collaboration between veterinarians, physicians, and environmental scientists</li>
                    <li><strong>Integrated Surveillance:</strong> Combined monitoring systems for all three domains</li>
                    <li><strong>Policy Coordination:</strong> Unified policies addressing health across sectors</li>
                    <li><strong>Community Engagement:</strong> Local communities as key partners in health protection</li>
                </ul>

                <h4>Success Stories</h4>
                <p>The One Health approach has been successfully applied to control rabies, Ebola, and other zoonotic diseases through coordinated global efforts.</p>
            `
        }
    };

    const strategy = strategies[strategyName];
    if (strategy) {
        showModal(strategy.title, strategy.content);
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'info' ? '#4A90A4' : '#27AE60',
        color: 'white',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: '1000',
        maxWidth: '300px',
        fontSize: '0.9rem'
    });

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function showModal(title, content) {
    // Create modal for detailed information
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${title}</h3>
            <div class="modal-body">
                ${content}
            </div>
            <button class="close-modal" onclick="this.closest('.modal-overlay').remove()">Close</button>
        </div>
    `;

    // Style the modal
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000'
    });

    const modalContent = modal.querySelector('.modal-content');
    Object.assign(modalContent.style, {
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        maxWidth: '700px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
    });

    const closeBtn = modal.querySelector('.close-modal');
    Object.assign(closeBtn.style, {
        background: '#2D5F2D',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '1rem'
    });

    const modalBody = modal.querySelector('.modal-body');
    Object.assign(modalBody.style, {
        margin: '1rem 0',
        lineHeight: '1.6'
    });

    document.body.appendChild(modal);
}