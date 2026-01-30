// Agricultural Monocultures Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeAgriculturalMonoculturesPage();
});

function initializeAgriculturalMonoculturesPage() {
    // Initialize interactive elements
    setupActionButtons();
    setupScrollAnimations();
}

// Action button functions
function learnMore() {
    // Open educational resources about sustainable agriculture
    const learnUrl = 'https://www.fao.org/sustainable-agriculture/en/';
    window.open(learnUrl, '_blank');

    // Show information about learning
    showNotification('Opening FAO sustainable agriculture resources. Learn about wildlife-friendly farming!', 'info');
}

function supportConservation() {
    // Open conservation agriculture organizations
    const conservationUrl = 'https://www.worldwildlife.org/initiatives/sustainable-agriculture';
    window.open(conservationUrl, '_blank');

    // Show information about supporting conservation
    showNotification('Opening World Wildlife Fund sustainable agriculture page. Your support helps wildlife!', 'info');
}

function viewPractices() {
    // Open farming practices resources
    const practicesUrl = 'https://www.nrcs.usda.gov/wps/portal/nrcs/main/national/plantsanimals/farmbill/crp/';
    window.open(practicesUrl, '_blank');

    // Show information about practices
    showNotification('Opening USDA conservation practices resources. Learn about wildlife-friendly farming methods!', 'info');
}

// Interactive functions for nutrition details
function showNutritionDetails(nutritionType) {
    const nutritions = {
        'macronutrients': {
            title: 'Macronutrient Imbalances in Monoculture Landscapes',
            content: `
                <h4>Protein Deficiency</h4>
                <p>Many wildlife species require high-quality protein for growth, reproduction, and immune function. Monocultures often lack sufficient protein-rich food sources:</p>
                <ul>
                    <li><strong>Insect scarcity:</strong> Reduced insect populations due to pesticide use</li>
                    <li><strong>Seed limitation:</strong> Uniform crops provide limited seed diversity</li>
                    <li><strong>Nutrient timing:</strong> Seasonal protein availability mismatches wildlife needs</li>
                </ul>

                <h4>Energy Imbalances</h4>
                <ul>
                    <li><strong>Carbohydrate excess:</strong> Starch-heavy crops without balanced nutrients</li>
                    <li><strong>Fat deficiency:</strong> Essential fatty acids lacking in simplified diets</li>
                    <li><strong>Metabolic stress:</strong> Imbalanced energy intake affects body condition</li>
                </ul>

                <h4>Consequences for Wildlife</h4>
                <ul>
                    <li><strong>Growth retardation:</strong> Slower development and smaller body sizes</li>
                    <li><strong>Reproductive failure:</strong> Reduced fertility and offspring survival</li>
                    <li><strong>Energy deficits:</strong> Increased vulnerability to starvation and disease</li>
                    <li><strong>Behavioral changes:</strong> Altered foraging patterns and increased risk-taking</li>
                </ul>

                <h4>Examples</h4>
                <p>Songbirds in corn monocultures show reduced nestling growth rates due to insufficient protein. Deer in soybean fields develop metabolic disorders from carbohydrate overload without adequate fiber.</p>
            `
        },
        'micronutrients': {
            title: 'Micronutrient Deficiencies in Agricultural Landscapes',
            content: `
                <h4>Vitamin Deficiencies</h4>
                <p>Vitamins essential for enzyme function, immune response, and reproduction become scarce in monoculture systems:</p>
                <ul>
                    <li><strong>Vitamin A:</strong> Critical for vision, reproduction, and immune function</li>
                    <li><strong>B vitamins:</strong> Essential for energy metabolism and nervous system health</li>
                    <li><strong>Vitamin E:</strong> Antioxidant protection and immune system support</li>
                    <li><strong>Vitamin D:</strong> Calcium metabolism and bone health</li>
                </ul>

                <h4>Mineral Shortages</h4>
                <ul>
                    <li><strong>Calcium:</strong> Bone development and muscle function</li>
                    <li><strong>Phosphorus:</strong> Energy storage and bone formation</li>
                    <li><strong>Magnesium:</strong> Enzyme activation and nerve function</li>
                    <li><strong>Zinc:</strong> Immune function and wound healing</li>
                    <li><strong>Iron:</strong> Oxygen transport and enzyme function</li>
                </ul>

                <h4>Sources of Deficiency</h4>
                <ul>
                    <li><strong>Soil depletion:</strong> Intensive farming reduces mineral availability</li>
                    <li><strong>Crop selection:</strong> Modern varieties bred for yield, not nutrition</li>
                    <li><strong>Processing effects:</strong> Food processing reduces micronutrient content</li>
                    <li><strong>Seasonal variation:</strong> Limited year-round access to diverse foods</li>
                </ul>

                <h4>Health Impacts</h4>
                <ul>
                    <li><strong>Immune suppression:</strong> Increased disease susceptibility</li>
                    <li><strong>Reproductive disorders:</strong> Infertility and developmental abnormalities</li>
                    <li><strong>Metabolic diseases:</strong> Endocrine disruption and organ dysfunction</li>
                    <li><strong>Behavioral abnormalities:</strong> Neurological and cognitive impairments</li>
                </ul>

                <h4>Wildlife Examples</h4>
                <p>Birds in monoculture wheat fields develop vitamin deficiencies leading to poor feather quality and reduced flight ability. Mammals in corn-dominated landscapes show calcium deficiencies causing metabolic bone disease.</p>
            `
        },
        'toxins': {
            title: 'Toxin Accumulation in Monoculture Food Chains',
            content: `
                <h4>Pesticide Residues</h4>
                <p>Agricultural chemicals designed to control pests accumulate in wildlife through multiple pathways:</p>
                <ul>
                    <li><strong>Direct consumption:</strong> Eating treated plants or contaminated prey</li>
                    <li><strong>Bioaccumulation:</strong> Toxins concentrating through food chains</li>
                    <li><strong>Bioamplification:</strong> Higher concentrations at each trophic level</li>
                    <li><strong>Persistent chemicals:</strong> Long-lasting compounds that don't break down</li>
                </ul>

                <h4>Types of Agricultural Toxins</h4>
                <ul>
                    <li><strong>Organochlorines:</strong> DDT, dieldrin - persistent and fat-soluble</li>
                    <li><strong>Organophosphates:</strong> Malathion, parathion - nerve toxins</li>
                    <li><strong>Carbamates:</strong> Carbaryl, carbofuran - cholinesterase inhibitors</li>
                    <li><strong>Neonicotinoids:</strong> Imidacloprid - neurotoxic to insects</li>
                    <li><strong>Glyphosate:</strong> Herbicide residues in food chains</li>
                </ul>

                <h4>Physiological Effects</h4>
                <ul>
                    <li><strong>Endocrine disruption:</strong> Hormone system interference</li>
                    <li><strong>Reproductive toxicity:</strong> Reduced fertility and developmental effects</li>
                    <li><strong>Immunotoxicity:</strong> Suppressed immune responses</li>
                    <li><strong>Neurotoxicity:</strong> Nervous system damage and behavioral changes</li>
                    <li><strong>Carcinogenicity:</strong> Increased cancer risk</li>
                </ul>

                <h4>Sublethal Effects</h4>
                <ul>
                    <li><strong>Reduced reproduction:</strong> Lower egg/sperm production</li>
                    <li><strong>Developmental delays:</strong> Slower growth and maturation</li>
                    <li><strong>Behavioral changes:</strong> Altered foraging and social behaviors</li>
                    <li><strong>Physiological stress:</strong> Increased cortisol and reduced fitness</li>
                </ul>

                <h4>Ecosystem Consequences</h4>
                <p>Toxin accumulation affects entire food webs, with predators at highest risk. Sublethal effects on reproduction and behavior can cause population declines even when direct mortality is low.</p>

                <h4>Examples</h4>
                <p>Birds eating pesticide-contaminated insects show reduced reproductive success. Aquatic organisms in agricultural runoff areas develop endocrine disorders. Pollinators exposed to neonicotinoids exhibit colony collapse and navigation problems.</p>
            `
        }
    };

    const nutrition = nutritions[nutritionType];
    if (nutrition) {
        document.getElementById('nutritionContent').innerHTML = `
            <h3>${nutrition.title}</h3>
            ${nutrition.content}
        `;
        document.getElementById('nutritionModal').style.display = 'block';
    }
}

// Interactive functions for species studies
function showSpeciesStudy(species) {
    const studies = {
        'songbirds': {
            title: 'Songbirds: Nestling Nutrition and Parental Care in Monocultures',
            content: `
                <h4>Dietary Challenges</h4>
                <p>Songbirds require high-protein insect prey for nestling development. Monocultures drastically reduce insect availability:</p>
                <ul>
                    <li><strong>Insect biomass reduction:</strong> 70-90% decline in arthropod populations</li>
                    <li><strong>Protein deficiency:</strong> Insufficient amino acids for chick growth</li>
                    <li><strong>Calcium shortage:</strong> Poor eggshell quality and bone development</li>
                    <li><strong>Timing mismatch:</strong> Breeding cycles misaligned with food availability</li>
                </ul>

                <h4>Reproductive Consequences</h4>
                <ul>
                    <li><strong>Smaller clutch sizes:</strong> Fewer eggs per nesting attempt</li>
                    <li><strong>Reduced hatching success:</strong> Higher embryo mortality</li>
                    <li><strong>Slower nestling growth:</strong> Delayed fledging and reduced survival</li>
                    <li><strong>Lower parental survival:</strong> Increased energy expenditure</li>
                </ul>

                <h4>Behavioral Adaptations</h4>
                <ul>
                    <li><strong>Increased foraging range:</strong> Parents travel farther for food</li>
                    <li><strong>Extended feeding periods:</strong> More time spent provisioning young</li>
                    <li><strong>Alternative food sources:</strong> Consumption of suboptimal foods</li>
                    <li><strong>Nest site selection:</strong> Preference for field edges with more insects</li>
                </ul>

                <h4>Population Impacts</h4>
                <p>Species like bobolinks and meadowlarks have declined 40-60% in agricultural landscapes. Nest success rates drop from 80% in natural habitats to 20-30% in monocultures.</p>

                <h4>Conservation Solutions</h4>
                <ul>
                    <li><strong>Grassland set-asides:</strong> Uncultivated areas for insect production</li>
                    <li><strong>Organic farming:</strong> Reduced pesticide use preserves insect populations</li>
                    <li><strong>Hedgerow planting:</strong> Linear habitats connecting natural areas</li>
                    <li><strong>Integrated pest management:</strong> Targeted pesticide application</li>
                </ul>
            `
        },
        'mammals': {
            title: 'Small Mammals: Habitat Fragmentation and Dietary Diversity Loss',
            content: `
                <h4>Habitat Fragmentation Effects</h4>
                <p>Large agricultural fields create barriers and reduce habitat connectivity for small mammals:</p>
                <ul>
                    <li><strong>Population isolation:</strong> Reduced gene flow between populations</li>
                    <li><strong>Increased predation:</strong> Higher exposure to predators in open fields</li>
                    <li><strong>Limited dispersal:</strong> Difficulty moving between habitat patches</li>
                    <li><strong>Edge effects:</strong> Increased disturbance along field boundaries</li>
                </ul>

                <h4>Dietary Limitations</h4>
                <ul>
                    <li><strong>Seed specialization:</strong> Limited to crop seeds with poor nutritional balance</li>
                    <li><strong>Insect scarcity:</strong> Reduced arthropod prey availability</li>
                    <li><strong>Fungi reduction:</strong> Loss of mycorrhizal networks and fungal foods</li>
                    <li><strong>Seasonal food gaps:</strong> Harvesting creates periods of food scarcity</li>
                </ul>

                <h4>Physiological Stress</h4>
                <ul>
                    <li><strong>Energy deficits:</strong> Insufficient caloric intake for maintenance</li>
                    <li><strong>Nutrient imbalances:</strong> Protein and micronutrient deficiencies</li>
                    <li><strong>Toxin exposure:</strong> Pesticide residues in food and water</li>
                    <li><strong>Thermal stress:</strong> Reduced shade and shelter in open fields</li>
                </ul>

                <h4>Population Consequences</h4>
                <ul>
                    <li><strong>Reduced reproduction:</strong> Smaller litter sizes and fewer breeding attempts</li>
                    <li><strong>Higher mortality:</strong> Increased predation and starvation rates</li>
                    <li><strong>Altered behavior:</strong> Nocturnal activity and reduced home ranges</li>
                    <li><strong>Genetic effects:</strong> Reduced genetic diversity in isolated populations</li>
                </ul>

                <h4>Examples</h4>
                <p>Volcanic field mice in corn monocultures show 50% population reductions. Ground squirrels in wheat fields exhibit altered hibernation patterns due to nutritional stress.</p>
            `
        },
        'insects': {
            title: 'Pollinators: Floral Resource Simplification and Pesticide Exposure',
            content: `
                <h4>Floral Resource Loss</h4>
                <p>Monocultures eliminate diverse floral resources essential for pollinator nutrition:</p>
                <ul>
                    <li><strong>Nectar scarcity:</strong> Limited carbohydrate sources for energy</li>
                    <li><strong>Pollen diversity loss:</strong> Reduced protein and amino acid variety</li>
                    <li><strong>Seasonal gaps:</strong> No continuous bloom throughout the season</li>
                    <li><strong>Nutrient quality:</strong> Crop flowers often nutritionally inferior</li>
                </ul>

                <h4>Pesticide Impacts</h4>
                <ul>
                    <li><strong>Direct toxicity:</strong> Poisoning from pesticide residues on flowers</li>
                    <li><strong>Sublethal effects:</strong> Impaired navigation and foraging ability</li>
                    <li><strong>Colony collapse:</strong> Social insect population crashes</li>
                    <li><strong>Reproductive failure:</strong> Reduced queen and drone production</li>
                </ul>

                <h4>Physiological Effects</h4>
                <ul>
                    <li><strong>Immune suppression:</strong> Increased susceptibility to parasites</li>
                    <li><strong>Developmental delays:</strong> Slower larval growth and pupation</li>
                    <li><strong>Reproductive disorders:</strong> Reduced egg production and fertility</li>
                    <li><strong>Behavioral changes:</strong> Altered foraging and communication patterns</li>
                </ul>

                <h4>Ecosystem Consequences</h4>
                <ul>
                    <li><strong>Pollination deficits:</strong> Reduced crop yields and wild plant reproduction</li>
                    <li><strong>Food web disruption:</strong> Loss of pollinator-dependent species</li>
                    <li><strong>Biodiversity decline:</strong> Cascading effects through ecosystems</li>
                    <li><strong>Economic impacts:</strong> Agricultural productivity losses</li>
                </ul>

                <h4>Conservation Approaches</h4>
                <ul>
                    <li><strong>Wildflower strips:</strong> Planted borders providing diverse floral resources</li>
                    <li><strong>Organic farming:</strong> Reduced pesticide use and residue levels</li>
                    <li><strong>Crop rotation:</strong> Seasonal diversity in floral availability</li>
                    <li><strong>Hedgerow restoration:</strong> Native plant corridors for pollinators</li>
                </ul>
            `
        },
        'herbivores': {
            title: 'Large Herbivores: Forage Quality Changes in Pastoral Systems',
            content: `
                <h4>Forage Quality Issues</h4>
                <p>Monoculture grasslands and pastures often lack nutritional diversity and quality:</p>
                <ul>
                    <li><strong>Protein deficiency:</strong> Insufficient crude protein for maintenance</li>
                    <li><strong>Fiber imbalance:</strong> Poor digestibility and nutrient absorption</li>
                    <li><strong>Mineral shortages:</strong> Lack of essential minerals and trace elements</li>
                    <li><strong>Anti-nutritional factors:</strong> Plant compounds reducing nutrient availability</li>
                </ul>

                <h4>Seasonal Challenges</h4>
                <ul>
                    <li><strong>Winter forage gaps:</strong> Limited winter nutrition in temperate regions</li>
                    <li><strong>Drought effects:</strong> Reduced forage quality during dry periods</li>
                    <li><strong>Growth stage issues:</strong> Plants harvested at suboptimal nutritional stages</li>
                    <li><strong>Overgrazing pressure:</strong> Soil degradation and reduced plant productivity</li>
                </ul>

                <h4>Health Consequences</h4>
                <ul>
                    <li><strong>Metabolic disorders:</strong> Ketosis, milk fever, and grass tetany</li>
                    <li><strong>Reproductive failure:</strong> Poor conception rates and calf survival</li>
                    <li><strong>Immune suppression:</strong> Increased disease susceptibility</li>
                    <li><strong>Growth retardation:</strong> Reduced weight gains and development</li>
                    <li><strong>Lameness issues:</strong> Mineral deficiencies affecting bone health</li>
                </ul>

                <h4>Behavioral Adaptations</h4>
                <ul>
                    <li><strong>Increased grazing time:</strong> More hours spent foraging for adequate nutrition</li>
                    <li><strong>Selective feeding:</strong> Preference for nutritionally superior plants</li>
                    <li><strong>Migration patterns:</strong> Seasonal movements to find better forage</li>
                    <li><strong>Social structure changes:</strong> Altered dominance hierarchies</li>
                </ul>

                <h4>Management Solutions</h4>
                <ul>
                    <li><strong>Multi-species pastures:</strong> Diverse plant communities for better nutrition</li>
                    <li><strong>Supplemental feeding:</strong> Protein and mineral supplements when needed</li>
                    <li><strong>Rotational grazing:</strong> Allowing forage recovery and diversity</li>
                    <li><strong>Soil fertility management:</strong> Maintaining mineral availability in plants</li>
                </ul>
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
    document.getElementById('nutritionModal').style.display = 'none';
    document.getElementById('speciesModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const nutritionModal = document.getElementById('nutritionModal');
    const speciesModal = document.getElementById('speciesModal');

    if (event.target === nutritionModal) {
        nutritionModal.style.display = 'none';
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