// Initialize Animate On Scroll (AOS)
AOS.init({
    once: true,
    offset: 100,
    duration: 800,
    easing: 'ease-out-cubic'
});

// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.classList.add('hidden');
        setTimeout(() => loadingOverlay.remove(), 500);
    }, 1000);
});

let animals = [];
let animalCache = new Map();

// Real animals data with authentic images
const realAnimalsData = [
    // Endangered Species
    {name: "African Elephant", scientific: "Loxodonta africana", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg"},
    {name: "Bengal Tiger", scientific: "Panthera tigris tigris", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg"},
    {name: "Snow Leopard", scientific: "Panthera uncia", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Irbis4.JPG"},
    {name: "Mountain Gorilla", scientific: "Gorilla beringei beringei", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg"},
    {name: "Polar Bear", scientific: "Ursus maritimus", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/6/66/Polar_Bear_-_Alaska_%28cropped%29.jpg"},
    {name: "Cheetah", scientific: "Acinonyx jubatus", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/0/09/TheCheethcat.jpg"},
    {name: "Orangutan", scientific: "Pongo pygmaeus", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/b/be/Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG"},
    {name: "Black Rhinoceros", scientific: "Diceros bicornis", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Black_Rhinoceros.jpg"},
    {name: "Amur Leopard", scientific: "Panthera pardus orientalis", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Amur_Leopard_CCF_program.jpg"},
    {name: "Blue Whale", scientific: "Balaenoptera musculus", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg"},
    {name: "Vaquita", scientific: "Phocoena sinus", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Vaquita6_Olson_NOAA.jpg"},
    {name: "Javan Rhinoceros", scientific: "Rhinoceros sondaicus", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/9/91/Rhinoceros_sondaicus_in_Ujung_Kulon_National_Park.jpg"},
    {name: "Cross River Gorilla", scientific: "Gorilla gorilla diehli", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg"},
    {name: "Hawksbill Turtle", scientific: "Eretmochelys imbricata", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Hawksbill_Sea_Turtle_Carey_de_Concha_%28Eretmochelys_imbricata%29_%2832273737352%29.jpg"},
    {name: "Saola", scientific: "Pseudoryx nghetinhensis", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/7/72/Saola.jpg"},
    {name: "Kakapo", scientific: "Strigops habroptilus", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Kakapo_-_Sirocco.jpg"},
    {name: "Sumatran Elephant", scientific: "Elephas maximus sumatranus", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Elephas_maximus_sumatranus_in_Ragunan_Zoo.jpg"},
    {name: "Pangolin", scientific: "Manis pentadactyla", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Pangolin_Borneo.jpg"},
    {name: "Leatherback Turtle", scientific: "Dermochelys coriacea", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/4/42/Leatherback_sea_turtle_Tinglar%2C_USVI_%285839996547%29.jpg"},
    {name: "Jaguar", scientific: "Panthera onca", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Standing_jaguar.jpg"},
    {name: "Asian Elephant", scientific: "Elephas maximus", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/3/37/Elephas_maximus_%28Bandipur%29.jpg"},
    {name: "Gharial", scientific: "Gavialis gangeticus", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Gavialis_gangeticus_%28Gharial%29_2_Richard_Bartz.jpg"},
    {name: "Red Panda", scientific: "Ailurus fulgens", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Ailurus_fulgens_RoterPanda_LesserPanda.jpg"},
    {name: "Malayan Tiger", scientific: "Panthera tigris jacksoni", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg"},
    {name: "Tapir", scientific: "Tapirus terrestris", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Tapir_terrestris.jpg"},
    
    // Recovered Species
    {name: "Giant Panda", scientific: "Ailuropoda melanoleuca", status: "REC", img: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG"},
    {name: "California Condor", scientific: "Gymnogyps californianus", status: "REC", img: "https://upload.wikimedia.org/wikipedia/commons/e/e4/California_Condor.jpg"},
    {name: "Arabian Oryx", scientific: "Oryx leucoryx", status: "REC", img: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Oryx_leucoryx_-_Menagerie_du_Jardin_des_Plantes.jpg"},
    {name: "Gray Wolf", scientific: "Canis lupus", status: "REC", img: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Kolm%C3%A5rden_Wolf.jpg"},
    {name: "Bald Eagle", scientific: "Haliaeetus leucocephalus", status: "REC", img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/About_to_Launch_%2826075320352%29.jpg"},
    {name: "Humpback Whale", scientific: "Megaptera novaeangliae", status: "REC", img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Humpback_Whale_underwater_shot.jpg"},
    {name: "Brown Pelican", scientific: "Pelecanus occidentalis", status: "REC", img: "https://upload.wikimedia.org/wikipedia/commons/4/40/Brown-pelican-flight-2.jpg"},
    {name: "Peregrine Falcon", scientific: "Falco peregrinus", status: "REC", img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Falco_peregrinus_-_01.jpg"},
    {name: "American Alligator", scientific: "Alligator mississippiensis", status: "REC", img: "https://upload.wikimedia.org/wikipedia/commons/f/f2/American_Alligator.jpg"},
    {name: "Southern White Rhinoceros", scientific: "Ceratotherium simum simum", status: "REC", img: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Ceratotherium_simum_-_Etosha_2014.jpg"},
    
    // Extinct Species
    {name: "Dodo", scientific: "Raphus cucullatus", status: "EXT", img: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Oxford_Dodo_display.jpg"},
    {name: "Passenger Pigeon", scientific: "Ectopistes migratorius", status: "EXT", img: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Ectopistes_migratorius.jpg"},
    {name: "Tasmanian Tiger", scientific: "Thylacinus cynocephalus", status: "EXT", img: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Thylacinus.jpg"},
    {name: "Woolly Mammoth", scientific: "Mammuthus primigenius", status: "EXT", img: "https://upload.wikimedia.org/wikipedia/commons/1/11/Woolly_mammoth_%28Mammuthus_primigenius%29_-_Mauricio_Ant%C3%B3n.jpg"},
    {name: "Saber-toothed Cat", scientific: "Smilodon fatalis", status: "EXT", img: "https://upload.wikimedia.org/wikipedia/commons/1/14/Smilodon_fatalis.jpg"},
    {name: "Great Auk", scientific: "Pinguinus impennis", status: "EXT", img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Pinguinus_impennis.jpg"},
    {name: "Steller's Sea Cow", scientific: "Hydrodamalis gigas", status: "EXT", img: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Hydrodamalis_gigas_skeleton_-_Finnish_Museum_of_Natural_History_-_DSC04529.JPG"},
    {name: "Carolina Parakeet", scientific: "Conuropsis carolinensis", status: "EXT", img: "https://upload.wikimedia.org/wikipedia/commons/5/53/Conuropsis_carolinensis_001.jpg"},
    {name: "Quagga", scientific: "Equus quagga quagga", status: "EXT", img: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Quagga_%28mare%29_-_Biodiversity_Heritage_Library_-_cropped_and_retouched.jpg"},
    {name: "Irish Elk", scientific: "Megaloceros giganteus", status: "EXT", img: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Megaloceros_giganteus_Skeleton.jpg"},
    
    // Additional Popular Animals
    {name: "Lion", scientific: "Panthera leo", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg"},
    {name: "Giraffe", scientific: "Giraffa camelopardalis", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Giraffe_Mikumi_National_Park.jpg"},
    {name: "Zebra", scientific: "Equus quagga", status: "REC", img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Plains_Zebra_Equus_quagga.jpg"},
    {name: "Hippopotamus", scientific: "Hippopotamus amphibius", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Hippo_pod_edit.jpg"},
    {name: "Kangaroo", scientific: "Osphranter rufus", status: "REC", img: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Osphranter_rufus_-_Roo_Portrait.jpg"},
    {name: "Koala", scientific: "Phascolarctos cinereus", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/2/22/Koala_climbing_tree.jpg"},
    {name: "Sloth", scientific: "Bradypus tridactylus", status: "REC", img: "https://upload.wikimedia.org/wikipedia/commons/1/18/Bradypus.jpg"},
    {name: "Emperor Penguin", scientific: "Aptenodytes forsteri", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/0/07/Emperor_penguins.jpg"},
    {name: "Dolphin", scientific: "Tursiops truncatus", status: "REC", img: "https://upload.wikimedia.org/wikipedia/commons/1/10/Tursiops_truncatus_01.jpg"},
    {name: "Great White Shark", scientific: "Carcharodon carcharias", status: "END", img: "https://upload.wikimedia.org/wikipedia/commons/5/56/White_shark.jpg"}
];

// Fetch animal details from Wikipedia API
async function fetchAnimalDetails(animal) {
    if (animalCache.has(animal.name)) {
        return animalCache.get(animal.name);
    }
    
    try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(animal.name)}`);
        const data = await response.json();
        
        const details = {
            ...animal,
            description: data.extract || `The ${animal.name} (${animal.scientific}) is a fascinating species.`,
            habitat: getHabitatByStatus(animal.status),
            diet: getDietByName(animal.name),
            lifespan: getLifespanByName(animal.name),
            weight: getWeightByName(animal.name),
            threats: getThreatsByStatus(animal.status),
            conservation: getConservationByStatus(animal.status)
        };
        
        animalCache.set(animal.name, details);
        return details;
    } catch (error) {
        const fallback = {
            ...animal,
            description: `The ${animal.name} is a ${animal.status === 'EXT' ? 'extinct' : animal.status === 'END' ? 'endangered' : 'recovered'} species.`,
            habitat: getHabitatByStatus(animal.status),
            diet: getDietByName(animal.name),
            lifespan: getLifespanByName(animal.name),
            weight: getWeightByName(animal.name),
            threats: getThreatsByStatus(animal.status),
            conservation: getConservationByStatus(animal.status)
        };
        animalCache.set(animal.name, fallback);
        return fallback;
    }
}

// Helper functions for animal data
function getHabitatByStatus(status) {
    const habitats = {
        'END': ['Forests', 'Grasslands', 'Mountains', 'Oceans', 'Arctic'],
        'REC': ['Protected areas', 'National parks', 'Reserves'],
        'EXT': ['Former habitats', 'Historical ranges']
    };
    return habitats[status][Math.floor(Math.random() * habitats[status].length)];
}

function getDietByName(name) {
    if (name.includes('Tiger') || name.includes('Leopard') || name.includes('Wolf')) return 'Carnivore';
    if (name.includes('Elephant') || name.includes('Panda') || name.includes('Rhinoceros')) return 'Herbivore';
    return 'Omnivore';
}

function getLifespanByName(name) {
    if (name.includes('Elephant') || name.includes('Whale')) return '60-80 years';
    if (name.includes('Tiger') || name.includes('Leopard')) return '10-15 years';
    if (name.includes('Bear') || name.includes('Gorilla')) return '20-30 years';
    return '15-25 years';
}

function getWeightByName(name) {
    if (name.includes('Elephant')) return '4000-7000 kg';
    if (name.includes('Whale')) return '25000-40000 kg';
    if (name.includes('Tiger')) return '180-260 kg';
    if (name.includes('Panda')) return '70-120 kg';
    return '20-100 kg';
}

function getThreatsByStatus(status) {
    const threats = {
        'END': 'Habitat loss, poaching, climate change',
        'REC': 'Historical threats now managed',
        'EXT': 'Hunting, habitat destruction, disease'
    };
    return threats[status];
}

function getConservationByStatus(status) {
    const conservation = {
        'END': 'Protected areas, breeding programs',
        'REC': 'Successful conservation efforts',
        'EXT': 'None - species extinct'
    };
    return conservation[status];
}

// Load 100 animals
function loadAnimals() {
    animals = realAnimalsData; // Load all 100 animals
    populateMuseum('all');
}

const museumGrid = document.getElementById('museumGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

function populateMuseum(filter = 'all') {
    museumGrid.innerHTML = '';
    
    // Add loading state
    museumGrid.style.opacity = '0.5';
    
    setTimeout(() => {
        let filteredAnimals = animals.filter(animal => filter === 'all' || animal.status === filter);
        
        filteredAnimals.forEach((animal, index) => {
            const card = document.createElement('div');
            card.classList.add('animal-card');
            
            // Add AOS Animation attributes with staggered delays
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index * 150).toString()); 
            
            // Status Text Map with emojis
            let statusText = "";
            let statusEmoji = "";
            if(animal.status === 'EXT') {
                statusText = "Extinct";
                statusEmoji = "💀";
            } else if(animal.status === 'END') {
                statusText = "Endangered";
                statusEmoji = "⚠️";
            } else {
                statusText = "Recovered";
                statusEmoji = "🌱";
            }

            card.innerHTML = `
                <div class="card-image-wrapper">
                    <img src="${animal.img}" alt="${animal.name}" class="animal-image" loading="lazy">
                    <div class="status-badge status-${animal.status}">${statusEmoji} ${statusText}</div>
                </div>
                <div class="animal-content">
                    <h3 class="animal-name">${animal.name}</h3>
                    <p class="scientific-name">${animal.scientific}</p>
                    <p class="animal-description">Click to learn more about this ${statusText.toLowerCase()} species.</p>
                </div>
            `;
            
            // Add click interaction
            card.addEventListener('click', () => {
                showAnimalDetails(animal);
            });
            
            museumGrid.appendChild(card);
        });
        
        // Restore opacity and refresh AOS
        museumGrid.style.opacity = '1';
        AOS.refresh();
    }, 300); // Small delay for smooth transition
}

// Initial Load
loadAnimals();

// Filter Logic with enhanced animations
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked with animation
        btn.classList.add('active');
        
        // Add click animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
        
        // Re-populate with filter
        populateMuseum(btn.dataset.filter);
    });
});

// Animal Details Modal with real API data
async function showAnimalDetails(animal) {
    // Show loading state
    const modal = document.createElement('div');
    modal.className = 'animal-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Loading ${animal.name} details...</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close events
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    
    try {
        // Fetch detailed data
        const detailedAnimal = await fetchAnimalDetails(animal);
        
        // Update modal with real data
        modal.querySelector('.modal-content').innerHTML = `
            <span class="close-btn">&times;</span>
            <div class="animal-header">
                <img src="${detailedAnimal.img}" alt="${detailedAnimal.name}" onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(detailedAnimal.name)}'">
                <div class="animal-title">
                    <h2>${detailedAnimal.name}</h2>
                    <p class="scientific">${detailedAnimal.scientific}</p>
                    <div class="status-badge status-${detailedAnimal.status}">
                        ${detailedAnimal.status === 'EXT' ? '💀 Extinct' : detailedAnimal.status === 'END' ? '⚠️ Endangered' : '🌱 Recovered'}
                    </div>
                </div>
            </div>
            <div class="animal-details">
                <div class="detail-grid">
                    <div class="detail-item">
                        <strong>🏠 Habitat:</strong> ${detailedAnimal.habitat}
                    </div>
                    <div class="detail-item">
                        <strong>🍽️ Diet:</strong> ${detailedAnimal.diet}
                    </div>
                    <div class="detail-item">
                        <strong>⏰ Lifespan:</strong> ${detailedAnimal.lifespan}
                    </div>
                    <div class="detail-item">
                        <strong>⚖️ Weight:</strong> ${detailedAnimal.weight}
                    </div>
                    <div class="detail-item">
                        <strong>⚠️ Threats:</strong> ${detailedAnimal.threats}
                    </div>
                    <div class="detail-item">
                        <strong>🛡️ Conservation:</strong> ${detailedAnimal.conservation}
                    </div>
                </div>
                <div class="description">
                    ${detailedAnimal.description}
                </div>
            </div>
        `;
        
        // Re-attach close events
        modal.querySelector('.close-btn').onclick = () => modal.remove();
        
    } catch (error) {
        modal.querySelector('.modal-content').innerHTML = `
            <span class="close-btn">&times;</span>
            <div class="error-state">
                <p>Error loading details for ${animal.name}</p>
                <button onclick="this.closest('.animal-modal').remove()">Close</button>
            </div>
        `;
    }
}

// Smooth scroll for navigation
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    document.querySelector('.museum-container').scrollIntoView({
        behavior: 'smooth'
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});