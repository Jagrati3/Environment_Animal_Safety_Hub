// Scavenger Decline Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeScavengerDeclinePage();
});

function initializeScavengerDeclinePage() {
    // Initialize interactive elements
    setupActionButtons();
    setupScrollAnimations();
}

// Action button functions
function learnMore() {
    // Open educational resources about scavenger species
    const learnUrl = 'https://www.iucn.org/theme/species/our-work/vulture-conservation';
    window.open(learnUrl, '_blank');

    // Show information about learning
    showNotification('Opening IUCN vulture conservation resources. Learn about scavenger ecology!', 'info');
}

function supportConservation() {
    // Open conservation organizations
    const conservationUrl = 'https://www.birdlife.org/worldwide/partnership/vulture-conservation';
    window.open(conservationUrl, '_blank');

    // Show information about supporting conservation
    showNotification('Opening BirdLife International vulture conservation page. Your support helps protect scavengers!', 'info');
}

function reportIncidents() {
    // Open wildlife poisoning reporting resources
    const reportUrl = 'https://www.rspb.org.uk/our-work/conservation/conservation-and-sustainability/wildlife-crime/';
    window.open(reportUrl, '_blank');

    // Show information about reporting
    showNotification('Opening wildlife crime reporting resources. Help combat poisoning incidents!', 'info');
}

// Interactive functions for disease details
function showDiseaseDetails(diseaseName) {
    const diseases = {
        'anthrax': {
            title: 'Anthrax Transmission Through Scavenger Decline',
            content: `
                <h4>Epidemiological Context</h4>
                <p>Anthrax is a bacterial disease caused by <em>Bacillus anthracis</em>. The bacteria form spores that can survive in the environment for decades, particularly in the soil and on animal remains.</p>

                <h4>Scavenger Role in Prevention</h4>
                <p>Vultures and other scavengers rapidly consume carcasses, preventing anthrax spores from accumulating in the environment. When scavenger populations decline, carcasses persist longer, allowing spores to contaminate soil and water sources.</p>

                <h4>Transmission Pathways</h4>
                <ul>
                    <li><strong>Direct contact:</strong> Humans and animals contacting contaminated carcasses</li>
                    <li><strong>Soil contamination:</strong> Spores persisting in soil for years</li>
                    <li><strong>Water sources:</strong> Runoff carrying spores to water bodies</li>
                    <li><strong>Livestock exposure:</strong> Grazing animals ingesting contaminated vegetation</li>
                </ul>

                <h4>Economic Impact</h4>
                <p>Anthrax outbreaks can cause significant livestock losses and restrict access to grazing lands. In some regions, entire herds have been lost to the disease following scavenger declines.</p>

                <h4>Prevention Strategies</h4>
                <p>Vaccination programs, proper carcass disposal, and scavenger conservation are key to preventing anthrax transmission.</p>
            `
        },
        'rabies': {
            title: 'Rabies Amplification Due to Scavenger Loss',
            content: `
                <h4>Epidemiological Context</h4>
                <p>Rabies is a viral disease that affects the central nervous system. It is transmitted through the saliva of infected animals, typically through bites or scratches.</p>

                <h4>Scavenger Role in Control</h4>
                <p>Scavengers play a crucial role in rabies control by rapidly removing infected carcasses. This prevents the virus from persisting in the environment and reduces transmission opportunities for other carnivores.</p>

                <h4>Transmission Dynamics</h4>
                <ul>
                    <li><strong>Carnivore consumption:</strong> Predators feeding on infected carcasses become rabid</li>
                    <li><strong>Population spillover:</strong> Increased rabies incidence in mesopredator populations</li>
                    <li><strong>Human exposure:</strong> Higher risk to communities living near wildlife areas</li>
                    <li><strong>Livestock impact:</strong> Increased rabies cases in domestic animals</li>
                </ul>

                <h4>Regional Examples</h4>
                <p>In South Asia, rabies cases in wild dogs and other carnivores increased dramatically following vulture declines. Similar patterns have been observed in Africa and Europe.</p>

                <h4>Public Health Implications</h4>
                <p>Rabies is 100% fatal if untreated. Increased incidence due to scavenger loss poses significant public health risks, particularly in rural communities.</p>
            `
        },
        'influenza': {
            title: 'Avian Influenza and Poultry Carcass Management',
            content: `
                <h4>Epidemiological Context</h4>
                <p>Avian influenza viruses circulate naturally among wild birds. Some strains can infect poultry and, rarely, humans. The viruses can mutate and become more virulent.</p>

                <h4>Scavenger Role in Biosecurity</h4>
                <p>Vultures provide natural biosecurity by rapidly consuming poultry carcasses. This prevents the accumulation of potentially infected material and reduces opportunities for virus mutation and spread.</p>

                <h4>Transmission Risks</h4>
                <ul>
                    <li><strong>Carcass persistence:</strong> Infected poultry remains available for virus replication</li>
                    <li><strong>Vector attraction:</strong> Flies and rodents spreading contaminated material</li>
                    <li><strong>Wild bird contact:</strong> Increased interaction between wild and domestic birds</li>
                    <li><strong>Environmental contamination:</strong> Virus persistence in soil and water</li>
                </ul>

                <h4>Economic Consequences</h4>
                <p>Avian influenza outbreaks can devastate poultry industries, leading to massive culling operations and trade restrictions. The economic impact can reach billions of dollars.</p>

                <h4>Mutation Potential</h4>
                <p>Persistent carcasses create ideal conditions for virus mutation. Different influenza strains can mix and reassort, potentially creating more dangerous variants.</p>

                <h4>Management Strategies</h4>
                <p>Proper carcass disposal, vulture conservation, and biosecurity measures are essential for preventing avian influenza spread.</p>
            `
        }
    };

    const disease = diseases[diseaseName];
    if (disease) {
        document.getElementById('diseaseContent').innerHTML = `
            <h3>${disease.title}</h3>
            ${disease.content}
        `;
        document.getElementById('diseaseModal').style.display = 'block';
    }
}

// Interactive functions for case studies
function showCaseStudy(region) {
    const cases = {
        'indian-subcontinent': {
            title: 'The Indian Subcontinent Vulture Crisis',
            content: `
                <h4>Historical Context</h4>
                <p>The vulture crisis in South Asia began in the 1990s when diclofenac, a non-steroidal anti-inflammatory drug, was introduced for veterinary use in livestock. Vultures feeding on treated cattle carcasses suffered kidney failure and died.</p>

                <h4>Population Impact</h4>
                <p>Three vulture species declined by 95-99%:</p>
                <ul>
                    <li><strong>White-rumped vulture:</strong> From millions to a few thousand individuals</li>
                    <li><strong>Indian vulture:</strong> Critically endangered, population crashed</li>
                    <li><strong>Slender-billed vulture:</strong> Near extinction in the wild</li>
                </ul>

                <h4>Ecosystem Consequences</h4>
                <p>The loss of vultures led to:</p>
                <ul>
                    <li>Dramatic increase in visible carcasses</li>
                    <li>Explosion in feral dog populations</li>
                    <li>Rise in rabies and other diseases</li>
                    <li>Changes in nutrient cycling</li>
                </ul>

                <h4>Economic Cost</h4>
                <p>The crisis has cost India over $1 billion annually in livestock losses, human health costs, and environmental damage. Rabies cases increased significantly due to higher feral dog populations.</p>

                <h4>Recovery Efforts</h4>
                <p>Diclofenac was banned in 2006, and meloxicam (vulture-safe) was introduced as an alternative. Vulture breeding programs and safe zones have been established, showing promising recovery signs.</p>
            `
        },
        'africa': {
            title: 'Africa\'s Continental Vulture Crisis',
            content: `
                <h4>Multiple Threats</h4>
                <p>African vultures face numerous threats across the continent:</p>
                <ul>
                    <li><strong>Intentional poisoning:</strong> Deliberate poisoning for bushmeat or belief-based practices</li>
                    <li><strong>Accidental poisoning:</strong> Contaminated baits and veterinary drugs</li>
                    <li><strong>Habitat loss:</strong> Agricultural expansion and urbanization</li>
                    <li><strong>Persecution:</strong> Human-wildlife conflict and traditional beliefs</li>
                </ul>

                <h4>Species Affected</h4>
                <p>Eleven vulture species are found in Africa, with six currently threatened:</p>
                <ul>
                    <li><strong>White-headed vulture:</strong> Critically endangered</li>
                    <li><strong>Hooded vulture:</strong> Critically endangered</li>
                    <li><strong>Rüppell's vulture:</strong> Critically endangered</li>
                    <li><strong>White-backed vulture:</strong> Critically endangered</li>
                    <li><strong>Lappet-faced vulture:</strong> Vulnerable</li>
                    <li><strong>African white-backed vulture:</strong> Vulnerable</li>
                </ul>

                <h4>Regional Hotspots</h4>
                <p>Severe declines have been documented in:</p>
                <ul>
                    <li><strong>West Africa:</strong> 92% decline in some species</li>
                    <li><strong>Southern Africa:</strong> Poisoning from ranching conflicts</li>
                    <li><strong>East Africa:</strong> Habitat loss and urbanization</li>
                </ul>

                <h4>Conservation Response</h4>
                <p>African vulture conservation efforts include:</p>
                <ul>
                    <li>Regional action plans</li>
                    <li>Anti-poisoning campaigns</li>
                    <li>Community education programs</li>
                    <li>Transboundary conservation initiatives</li>
                </ul>
            `
        },
        'europe': {
            title: 'European Scavenger Species Challenges',
            content: `
                <h4>Infrastructure Impacts</h4>
                <p>European scavengers face significant threats from modern infrastructure:</p>
                <ul>
                    <li><strong>Wind turbines:</strong> Collision mortality for large soaring birds</li>
                    <li><strong>Power lines:</strong> Electrocution on distribution lines</li>
                    <li><strong>Roads and railways:</strong> Habitat fragmentation and collision risks</li>
                    <li><strong>Urban expansion:</strong> Loss of foraging and breeding habitats</li>
                </ul>

                <h4>Species of Concern</h4>
                <p>Seven scavenger species breed in Europe:</p>
                <ul>
                    <li><strong>Griffon vulture:</strong> Stable but locally threatened</li>
                    <li><strong>Egyptian vulture:</strong> Declining across range</li>
                    <li><strong>Bearded vulture:</strong> Vulnerable to poisoning</li>
                    <li><strong>Cinereous vulture:</strong> Expanding but threatened</li>
                    <li><strong>Eurasian black vulture:</strong> Rare and localized</li>
                    <li><strong>Red kite:</strong> Recovering but still threatened</li>
                    <li><strong>White-tailed eagle:</strong> Recovering from persecution</li>
                </ul>

                <h4>Persecution Issues</h4>
                <p>Illegal poisoning remains a significant threat:</p>
                <ul>
                    <li><strong>Deliberate poisoning:</strong> For predator control or traditional practices</li>
                    <li><strong>Secondary poisoning:</strong> From baits targeting other species</li>
                    <li><strong>Lead ammunition:</strong> Toxic effects from hunting</li>
                </ul>

                <h4>Conservation Success</h4>
                <p>Some European countries have shown remarkable recovery:</p>
                <ul>
                    <li><strong>Spain:</strong> Vulture populations increased through protection</li>
                    <li><strong>France:</strong> Successful reintroduction programs</li>
                    <li><strong>Portugal:</strong> Griffon vulture recovery</li>
                </ul>

                <h4>Future Challenges</h4>
                <p>Climate change and renewable energy development pose new threats to European scavengers.</p>
            `
        }
    };

    const caseStudy = cases[region];
    if (caseStudy) {
        document.getElementById('caseContent').innerHTML = `
            <h3>${caseStudy.title}</h3>
            ${caseStudy.content}
        `;
        document.getElementById('caseModal').style.display = 'block';
    }
}

// Modal management
function closeModal() {
    document.getElementById('diseaseModal').style.display = 'none';
    document.getElementById('caseModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const diseaseModal = document.getElementById('diseaseModal');
    const caseModal = document.getElementById('caseModal');

    if (event.target === diseaseModal) {
        diseaseModal.style.display = 'none';
    }
    if (event.target === caseModal) {
        caseModal.style.display = 'none';
    }
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

    // Observe all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add notification styles dynamically
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-primary);
        border-left: 4px solid var(--secondary-color);
        padding: 1rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-hover);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 400px;
    }

    .notification.success { border-left-color: var(--secondary-color); }
    .notification.error { border-left-color: var(--health-red); }
    .notification.info { border-left-color: var(--primary-color); }

    .notification button {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: var(--text-secondary);
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);