// Animal Habitat Builder Game Logic

class HabitatBuilder {
    constructor() {
        this.selectedAnimal = null;
        this.placedResources = [];
        this.stars = 0;
        this.balance = 'Neutral';

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateStats();
    }

    bindEvents() {
        // Animal selection
        document.querySelectorAll('.animal-item').forEach(item => {
            item.addEventListener('click', () => this.selectAnimal(item));
            item.addEventListener('dragstart', (e) => this.handleDragStart(e, item));
        });

        // Resource dragging
        document.querySelectorAll('.resource-item').forEach(item => {
            item.addEventListener('dragstart', (e) => this.handleDragStart(e, item));
        });

        // Habitat zone drop
        const habitatZone = document.getElementById('habitatZone');
        habitatZone.addEventListener('dragover', (e) => this.handleDragOver(e));
        habitatZone.addEventListener('drop', (e) => this.handleDrop(e));

        // Controls
        document.getElementById('validateBtn').addEventListener('click', () => this.validateHabitat());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetHabitat());

        // Modal
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
    }

    selectAnimal(animalItem) {
        // Remove previous selection
        document.querySelectorAll('.animal-item').forEach(item => item.classList.remove('selected'));

        // Select new animal
        animalItem.classList.add('selected');
        this.selectedAnimal = animalItem.dataset.animal;

        this.updateStats();
    }

    handleDragStart(e, item) {
        e.dataTransfer.setData('text/plain', JSON.stringify({
            type: item.dataset.type || 'animal',
            animal: item.dataset.animal,
            src: item.querySelector('img').src,
            alt: item.querySelector('img').alt
        }));
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDrop(e) {
        e.preventDefault();

        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const habitatZone = document.getElementById('habitatZone');

        if (data.type === 'animal') {
            this.selectAnimal(document.querySelector(`[data-animal="${data.animal}"]`));
        } else {
            // Place resource in habitat
            const rect = habitatZone.getBoundingClientRect();
            const x = e.clientX - rect.left - 30; // Center the resource
            const y = e.clientY - rect.top - 30;

            this.placeResource(data, x, y);
        }
    }

    placeResource(data, x, y) {
        const resourceElement = document.createElement('div');
        resourceElement.className = 'placed-resource';
        resourceElement.style.left = `${x}px`;
        resourceElement.style.top = `${y}px`;
        resourceElement.dataset.type = data.type;

        const img = document.createElement('img');
        img.src = data.src;
        img.alt = data.alt;
        resourceElement.appendChild(img);

        document.getElementById('habitatZone').appendChild(resourceElement);
        this.placedResources.push(data);
    }

    validateHabitat() {
        if (!this.selectedAnimal) {
            this.showFeedback('Please select an animal first!', 'Choose an animal to build a habitat for.');
            return;
        }

        const plantCount = this.placedResources.filter(r => r.type === 'plant').length;
        const waterCount = this.placedResources.filter(r => r.type === 'water').length;
        const shelterCount = this.placedResources.filter(r => r.type === 'shelter').length;

        let score = 0;
        let balance = 'Neutral';
        let feedback = '';
        let tip = '';

        // Animal-specific requirements
        const requirements = {
            lion: { plant: 2, water: 1, shelter: 1 },
            deer: { plant: 3, water: 2, shelter: 1 },
            bear: { plant: 2, water: 1, shelter: 2 }
        };

        const req = requirements[this.selectedAnimal];

        if (plantCount >= req.plant && waterCount >= req.water && shelterCount >= req.shelter) {
            score = 3;
            balance = 'Perfect';
            feedback = `Excellent! You've created a perfect habitat for the ${this.selectedAnimal}!`;
            tip = `Great job balancing food, water, and shelter for this animal's needs.`;
        } else if (plantCount >= req.plant - 1 && waterCount >= req.water - 1 && shelterCount >= req.shelter - 1) {
            score = 2;
            balance = 'Good';
            feedback = `Good habitat for the ${this.selectedAnimal}, but it could be better!`;
            tip = `Try adding more ${plantCount < req.plant ? 'plants' : waterCount < req.water ? 'water sources' : 'shelters'} to make it perfect.`;
        } else {
            score = 1;
            balance = 'Poor';
            feedback = `This habitat isn't quite right for the ${this.selectedAnimal}.`;
            tip = `Animals need a balance of food (plants), water, and shelter. Check what ${this.selectedAnimal}s need in the wild!`;
        }

        this.stars += score;
        this.balance = balance;
        this.updateStats();
        this.showFeedback(feedback, tip);
    }

    resetHabitat() {
        this.selectedAnimal = null;
        this.placedResources = [];
        this.balance = 'Neutral';

        // Clear selections
        document.querySelectorAll('.animal-item').forEach(item => item.classList.remove('selected'));

        // Clear placed resources
        document.querySelectorAll('.placed-resource').forEach(el => el.remove());

        // Reset habitat zone text
        const habitatZone = document.getElementById('habitatZone');
        habitatZone.innerHTML = '<p>Drop resources here to build the habitat</p>';

        this.updateStats();
    }

    updateStats() {
        document.getElementById('stars').textContent = this.stars;
        document.getElementById('balance').textContent = this.balance;
        document.getElementById('selectedAnimal').textContent = this.selectedAnimal ? this.selectedAnimal.charAt(0).toUpperCase() + this.selectedAnimal.slice(1) : 'None';
    }

    showFeedback(title, text, tip = '') {
        document.getElementById('feedbackTitle').textContent = title;
        document.getElementById('feedbackText').textContent = text;
        document.getElementById('tipText').textContent = tip;
        document.getElementById('feedbackModal').style.display = 'block';
    }

    closeModal() {
        document.getElementById('feedbackModal').style.display = 'none';
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HabitatBuilder();
});
