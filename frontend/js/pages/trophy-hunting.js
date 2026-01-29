// Trophy Hunting Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeTrophyHuntingPage();
});

function initializeTrophyHuntingPage() {
    // Initialize interactive elements
    setupActionButtons();
    setupScrollAnimations();
}

// Action button functions
function learnMore() {
    // Open educational resources about trophy hunting impacts
    const learnUrl = 'https://www.iucn.org/theme/species/our-work/sustainable-trophy-hunting';
    window.open(learnUrl, '_blank');

    // Show information about learning
    showNotification('Opening IUCN resources on sustainable trophy hunting. Learn about conservation impacts!', 'info');
}

function supportConservation() {
    // Open conservation organizations
    const conservationUrl = 'https://www.worldwildlife.org/initiatives/sustainable-hunting';
    window.open(conservationUrl, '_blank');

    // Show information about supporting conservation
    showNotification('Opening World Wildlife Fund sustainable hunting resources. Your support helps protect wildlife!', 'info');
}

function viewRegulations() {
    // Open hunting regulation resources
    const regulationsUrl = 'https://www.fws.gov/hunting/regulations';
    window.open(regulationsUrl, '_blank');

    // Show information about regulations
    showNotification('Opening hunting regulation resources. Learn about responsible trophy hunting practices!', 'info');
}

// Interactive functions for genetic details
function showGeneticDetails(geneticType) {
    const genetics = {
        'diversity': {
            title: 'Reduced Genetic Diversity in Hunted Populations',
            content: `
                <h4>Mechanisms of Diversity Loss</h4>
                <p>Selective removal of large individuals disproportionately affects genetic diversity by targeting phenotypes linked to specific alleles:</p>
                <ul>
                    <li><strong>Allele frequency changes:</strong> Genes associated with large body size become less common</li>
                    <li><strong>Heterozygosity reduction:</strong> Loss of genetic variation within populations</li>
                    <li><strong>Founder effects:</strong> Small surviving populations have limited genetic pools</li>
                    <li><strong>Genetic drift:</strong> Random changes in allele frequencies amplified in small populations</li>
                </ul>

                <h4>Long-term Consequences</h4>
                <ul>
                    <li><strong>Reduced adaptability:</strong> Populations less able to respond to environmental changes</li>
                    <li><strong>Increased disease susceptibility:</strong> Lower genetic resistance to pathogens</li>
                    <li><strong>Lower reproductive fitness:</strong> Reduced overall population health</li>
                    <li><strong>Extinction risk:</strong> Inability to recover from additional stressors</li>
                </ul>

                <h4>Evidence from Studies</h4>
                <p>Research on hunted populations shows 20-50% reduction in genetic diversity compared to protected populations. This loss can occur rapidly, within 2-3 generations of intensive hunting.</p>

                <h4>Conservation Implications</h4>
                <p>Genetic monitoring is essential for sustainable trophy hunting programs. Populations with critically low genetic diversity may require hunting moratoriums or genetic rescue programs.</p>
            `
        },
        'inbreeding': {
            title: 'Inbreeding Depression in Trophy-Hunted Populations',
            content: `
                <h4>What is Inbreeding Depression?</h4>
                <p>Inbreeding depression occurs when closely related individuals mate, increasing homozygosity and exposing harmful recessive alleles. Trophy hunting accelerates this process by:</p>
                <ul>
                    <li><strong>Removing unrelated individuals:</strong> Reducing genetic mixing opportunities</li>
                    <li><strong>Altering social structures:</strong> Changing mating patterns and partner availability</li>
                    <li><strong>Creating population bottlenecks:</strong> Dramatic reductions in population size</li>
                    <li><strong>Disrupting gene flow:</strong> Isolation of remaining population segments</li>
                </ul>

                <h4>Manifestations in Wildlife</h4>
                <ul>
                    <li><strong>Reduced fertility:</strong> Lower conception rates and litter sizes</li>
                    <li><strong>Increased juvenile mortality:</strong> Higher death rates among offspring</li>
                    <li><strong>Immune system weakness:</strong> Greater susceptibility to diseases</li>
                    <li><strong>Developmental abnormalities:</strong> Physical and behavioral defects</li>
                    <li><strong>Reduced longevity:</strong> Shorter lifespan and poorer health</li>
                </ul>

                <h4>Examples from Trophy-Hunted Species</h4>
                <p>Bighorn sheep populations with high inbreeding show reduced horn growth, lower reproductive success, and increased disease prevalence. Similar patterns observed in deer and elk populations.</p>

                <h4>Management Strategies</h4>
                <p>Genetic rescue through translocation of unrelated individuals can reverse inbreeding depression. Regular genetic monitoring helps identify populations at risk.</p>
            `
        },
        'evolution': {
            title: 'Evolutionary Changes Due to Trophy Hunting',
            content: `
                <h4>Rapid Evolutionary Responses</h4>
                <p>Trophy hunting creates intense selective pressure, driving evolutionary changes within 5-10 generations:</p>
                <ul>
                    <li><strong>Body size reduction:</strong> Smaller individuals have higher survival rates</li>
                    <li><strong>Earlier maturation:</strong> Reproduction at younger ages to compensate for shorter lifespan</li>
                    <li><strong>Reduced secondary sexual characteristics:</strong> Smaller horns, antlers, manes</li>
                    <li><strong>Behavioral changes:</strong> Altered mating strategies and social behaviors</li>
                </ul>

                <h4>Case Study: Bighorn Sheep</h4>
                <p>In intensively hunted populations, horn length decreased by 25% over 30 years. This represents one of the fastest evolutionary changes documented in mammals.</p>

                <h4>Evolutionary Trade-offs</h4>
                <ul>
                    <li><strong>Survival vs. reproduction:</strong> Smaller size improves survival but reduces reproductive success</li>
                    <li><strong>Quality vs. quantity:</strong> Fewer, smaller offspring vs. more, larger ones</li>
                    <li><strong>Current vs. future fitness:</strong> Immediate survival benefits vs. long-term population health</li>
                </ul>

                <h4>Reversibility</h4>
                <p>Evolutionary changes can be reversed if hunting pressure is reduced. Protected populations often show rapid recovery of original traits, though complete reversal may take multiple generations.</p>

                <h4>Conservation Considerations</h4>
                <p>Evolutionary changes complicate conservation goals. Trophy hunting may create populations that are no longer suitable for reintroduction programs or that have reduced ecological roles.</p>
            `
        }
    };

    const genetic = genetics[geneticType];
    if (genetic) {
        document.getElementById('geneticContent').innerHTML = `
            <h3>${genetic.title}</h3>
            ${genetic.content}
        `;
        document.getElementById('geneticModal').style.display = 'block';
    }
}

// Interactive functions for species studies
function showSpeciesStudy(species) {
    const studies = {
        'elephants': {
            title: 'African Elephants: Tusk Size Evolution and Social Disruption',
            content: `
                <h4>Historical Context</h4>
                <p>African elephants have been hunted for ivory for centuries, but modern trophy hunting and poaching have accelerated selective pressure on tusk size.</p>

                <h4>Tusk Size Evolution</h4>
                <ul>
                    <li><strong>Tuskless elephants:</strong> Up to 30% of females in some populations are tuskless</li>
                    <li><strong>Genetic basis:</strong> Tusklessness is heritable, linked to X-chromosome</li>
                    <li><strong>Selection pressure:</strong> Tuskless females have 3x higher survival rate</li>
                    <li><strong>Generational change:</strong> Rapid increase in tuskless individuals over 3-4 generations</li>
                </ul>

                <h4>Social Structure Impacts</h4>
                <ul>
                    <li><strong>Matriarchal society disruption:</strong> Loss of experienced leaders</li>
                    <li><strong>Knowledge transmission:</strong> Reduced cultural learning opportunities</li>
                    <li><strong>Group cohesion:</strong> Changes in social bonding and cooperation</li>
                    <li><strong>Reproductive strategies:</strong> Altered mating and calf-rearing patterns</li>
                </ul>

                <h4>Ecosystem Consequences</h4>
                <p>Changes in elephant behavior affect forest structure, seed dispersal, and water availability for other species.</p>

                <h4>Conservation Challenges</h4>
                <p>Trophy hunting bans in many areas, but poaching continues. Genetic monitoring shows ongoing evolution toward smaller tusks.</p>
            `
        },
        'bighorn': {
            title: 'Bighorn Sheep: Horn Size Reduction and Mating Success',
            content: `
                <h4>The Horn Size Dilemma</h4>
                <p>Bighorn sheep horns are crucial for mating success but make individuals more vulnerable to trophy hunters. This creates conflicting selection pressures.</p>

                <h4>Evolutionary Changes</h4>
                <ul>
                    <li><strong>Horn length reduction:</strong> 25% decrease in intensively hunted populations</li>
                    <li><strong>Horn curvature changes:</strong> Less curved horns in hunted rams</li>
                    <li><strong>Body size reduction:</strong> Smaller overall body size in hunted populations</li>
                    <li><strong>Age at maturity:</strong> Rams maturing at younger ages</li>
                </ul>

                <h4>Mating System Disruption</h4>
                <ul>
                    <li><strong>Dominance hierarchy:</strong> Smaller-horned rams have reduced mating success</li>
                    <li><strong>Alternative strategies:</strong> Increased sneak mating and satellite behavior</li>
                    <li><strong>Female choice:</strong> Changes in female mate selection criteria</li>
                    <li><strong>Population dynamics:</strong> Altered age structure and sex ratios</li>
                </ul>

                <h4>Management Implications</h4>
                <p>Hunters prefer large-horned individuals, but conservation requires maintaining genetic diversity. Size limits may help preserve evolutionary potential.</p>

                <h4>Research Findings</h4>
                <p>Studies show hunted populations evolve faster than non-hunted ones. Horn size is highly heritable, making rapid evolutionary response possible.</p>
            `
        },
        'deer': {
            title: 'Tropical Deer: Antler Size and Competitive Dynamics',
            content: `
                <h4>Antler Evolution Under Hunting Pressure</h4>
                <p>Tropical deer species show rapid antler size reduction in response to trophy hunting, affecting competitive dynamics and mating systems.</p>

                <h4>Observed Changes</h4>
                <ul>
                    <li><strong>Antler size reduction:</strong> 15-30% decrease in hunted populations</li>
                    <li><strong>Antler complexity:</strong> Fewer points and simpler structure</li>
                    <li><strong>Body size changes:</strong> Smaller overall body dimensions</li>
                    <li><strong>Reproductive timing:</strong> Earlier breeding seasons</li>
                </ul>

                <h4>Social and Behavioral Impacts</h4>
                <ul>
                    <li><strong>Mating competition:</strong> Reduced dominance displays and fights</li>
                    <li><strong>Territory defense:</strong> Smaller territories with less conflict</li>
                    <li><strong>Group structure:</strong> Changes in bachelor group dynamics</li>
                    <li><strong>Energy allocation:</strong> Less energy invested in secondary sexual traits</li>
                </ul>

                <h4>Ecosystem Effects</h4>
                <p>Changes in deer behavior affect vegetation patterns, predator-prey dynamics, and nutrient cycling in tropical forests.</p>

                <h4>Conservation Strategies</h4>
                <p>Minimum size requirements for trophies help maintain genetic diversity. Protected areas show recovery of original antler sizes.</p>
            `
        },
        'lions': {
            title: 'African Lions: Mane Size and Social Behavior Changes',
            content: `
                <h4>Mane Size Evolution</h4>
                <p>Lion manes are sexually selected traits that signal quality but make individuals more conspicuous to hunters.</p>

                <h4>Evolutionary Responses</h4>
                <ul>
                    <li><strong>Mane reduction:</strong> Shorter, less dense manes in hunted populations</li>
                    <li><strong>Mane color changes:</strong> Lighter coloration in some populations</li>
                    <li><strong>Body size reduction:</strong> Smaller overall size in males</li>
                    <li><strong>Behavioral shifts:</strong> Changes in territorial and mating behavior</li>
                </ul>

                <h4>Social Structure Impacts</h4>
                <ul>
                    <li><strong>Pride dynamics:</strong> Changes in coalition formation and leadership</li>
                    <li><strong>Mating strategies:</strong> Increased infanticide and mate competition</li>
                    <li><strong>Territory size:</strong> Smaller territories with more boundary disputes</li>
                    <li><strong>Cooperative behavior:</strong> Reduced group hunting efficiency</li>
                </ul>

                <h4>Conservation Concerns</h4>
                <p>Lions are particularly vulnerable due to their social structure. Loss of dominant males can lead to pride instability and increased human-lion conflict.</p>

                <h4>Management Approaches</h4>
                <p>Quota systems and size limits help maintain genetic diversity. Community-based conservation programs show promise for lion protection.</p>
            `
        }
    };

    const study = studies[species];
    if (study) {
        document.getElementById('speciesContent').innerHTML = `
            <h3>${study.title}</h3>
            ${study.content}
        `;
        document.getElementById('speciesModal').style.display = 'block';
    }
}

// Modal management
function closeModal() {
    document.getElementById('geneticModal').style.display = 'none';
    document.getElementById('speciesModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const geneticModal = document.getElementById('geneticModal');
    const speciesModal = document.getElementById('speciesModal');

    if (event.target === geneticModal) {
        geneticModal.style.display = 'none';
    }
    if (event.target === speciesModal) {
        speciesModal.style.display = 'none';
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
    .notification.error { border-left-color: var(--danger-color); }
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