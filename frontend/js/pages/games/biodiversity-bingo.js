// Biodiversity Bingo Game Logic

class BiodiversityBingo {
    constructor() {
        this.grid = Array(5).fill().map(() => Array(5).fill(null));
        this.selectedCard = null;
        this.selectedCardElement = null;
        this.points = 0;
        this.lines = 0;
        this.facts = 0;
        this.gameStarted = false;

        // Biodiversity cards data
        this.cards = [
            { name: "Panda", emoji: "🐼", habitat: "Forest", fact: "Pandas eat bamboo and help spread bamboo seeds through their droppings!" },
            { name: "Tiger", emoji: "🐯", habitat: "Forest", fact: "Tigers are excellent swimmers and can cross rivers up to 7km wide!" },
            { name: "Elephant", emoji: "🐘", habitat: "Savanna", fact: "Elephants use their trunks to drink up to 200 liters of water at once!" },
            { name: "Lion", emoji: "🦁", habitat: "Savanna", fact: "Lions live in groups called prides, led by a dominant male." },
            { name: "Giraffe", emoji: "🦒", habitat: "Savanna", fact: "Giraffes have the same number of neck vertebrae as humans - just longer ones!" },
            { name: "Dolphin", emoji: "🐬", habitat: "Ocean", fact: "Dolphins sleep with one eye open to watch for predators!" },
            { name: "Turtle", emoji: "🐢", habitat: "Ocean", fact: "Sea turtles can hold their breath underwater for up to 7 hours!" },
            { name: "Shark", emoji: "🦈", habitat: "Ocean", fact: "Sharks have been around for over 400 million years - longer than dinosaurs!" },
            { name: "Butterfly", emoji: "🦋", habitat: "Garden", fact: "Butterflies taste with their feet and can see ultraviolet colors!" },
            { name: "Bee", emoji: "🐝", habitat: "Garden", fact: "Bees visit over 2,000 flowers a day to collect nectar for honey!" },
            { name: "Ladybug", emoji: "🐞", habitat: "Garden", fact: "Ladybugs can eat up to 5,000 insects in their lifetime!" },
            { name: "Frog", emoji: "🐸", habitat: "Wetland", fact: "Frogs absorb water through their skin and don't need to drink!" },
            { name: "Duck", emoji: "🦆", habitat: "Wetland", fact: "Ducks have waterproof feathers thanks to a special oil they produce!" },
            { name: "Alligator", emoji: "🐊", habitat: "Wetland", fact: "Alligators have a special valve in their throat to keep water out while breathing underwater!" },
            { name: "Owl", emoji: "🦉", habitat: "Forest", fact: "Owls can rotate their heads up to 270 degrees to see in all directions!" },
            { name: "Deer", emoji: "🦌", habitat: "Forest", fact: "Deer can jump up to 10 feet high and run at speeds of 30 mph!" },
            { name: "Zebra", emoji: "🦓", habitat: "Savanna", fact: "No two zebras have the same stripe pattern - like human fingerprints!" },
            { name: "Whale", emoji: "🐋", habitat: "Ocean", fact: "Blue whales are the largest animals ever - bigger than any dinosaur!" },
            { name: "Octopus", emoji: "🐙", habitat: "Ocean", fact: "Octopuses have three hearts and blue blood!" },
            { name: "Rabbit", emoji: "🐰", habitat: "Garden", fact: "Rabbits can see almost 360 degrees around them without moving their heads!" },
            { name: "Bird", emoji: "🐦", habitat: "Garden", fact: "Some birds can fly as high as 29,000 feet - higher than Mount Everest!" },
            { name: "Snail", emoji: "🐌", habitat: "Garden", fact: "Snails can sleep for up to 3 years during dry periods!" },
            { name: "Fish", emoji: "🐠", habitat: "Wetland", fact: "Some fish can change color to camouflage themselves from predators!" },
            { name: "Crane", emoji: "🦜", habitat: "Wetland", fact: "Cranes can live for over 20 years in the wild!" },
            { name: "Salamander", emoji: "🦎", habitat: "Wetland", fact: "Salamanders can regrow lost limbs and even parts of their hearts!" }
        ];

        this.habitats = ["Forest", "Savanna", "Ocean", "Garden", "Wetland"];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        console.log('Initializing event listeners');
        const startBtn = document.getElementById('startGameBtn');
        const resetBtn = document.getElementById('resetGameBtn');
        const closeBtn = document.getElementById('closeFactBtn');

        console.log('Buttons found:', { startBtn, resetBtn, closeBtn });

        if (startBtn) startBtn.addEventListener('click', () => this.startGame());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetGame());
        if (closeBtn) closeBtn.addEventListener('click', () => this.hideFact());
    }

    startGame() {
        console.log('Start game clicked');
        this.gameStarted = true;
        this.resetGame();
        this.generateGrid();
        this.generateCardList();
        document.getElementById('startGameBtn').disabled = true;
        document.getElementById('resetGameBtn').disabled = false;
    }

    resetGame() {
        this.grid = Array(5).fill().map(() => Array(5).fill(null));
        this.selectedCard = null;
        this.points = 0;
        this.lines = 0;
        this.facts = 0;
        this.gameStarted = false;
        this.updateStats();
        this.clearGrid();
        this.clearCardList();
        document.getElementById('factSection').style.display = 'none';
        document.getElementById('startGameBtn').disabled = false;
        document.getElementById('resetGameBtn').disabled = true;
        document.getElementById('progressFill').style.width = '0%';
        document.getElementById('progressText').textContent = 'Complete rows or columns to win!';
    }

    generateGrid() {
        const gridElement = document.getElementById('bingoGrid');
        gridElement.innerHTML = '';

        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.dataset.habitat = this.habitats[col]; // Each column represents a habitat
                cell.addEventListener('click', () => this.placeCard(row, col));
                gridElement.appendChild(cell);
            }
        }
    }

    generateCardList() {
        const cardList = document.getElementById('cardList');
        cardList.innerHTML = '';

        // Shuffle and select 15 cards for the game
        const shuffledCards = [...this.cards].sort(() => Math.random() - 0.5).slice(0, 15);

        shuffledCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card-item';
            cardElement.dataset.card = JSON.stringify(card);
            cardElement.innerHTML = `
                <span class="card-emoji">${card.emoji}</span>
                <span class="card-name">${card.name}</span>
                <span class="card-habitat">${card.habitat}</span>
            `;
            cardElement.addEventListener('click', () => this.selectCard(card, cardElement));
            cardList.appendChild(cardElement);
        });
    }

    selectCard(card, element) {
        if (!this.gameStarted) return;

        // Remove previous selection
        document.querySelectorAll('.card-item.selected').forEach(el => el.classList.remove('selected'));

        // Select new card
        this.selectedCard = card;
        element.classList.add('selected');
    }

    placeCard(row, col) {
        if (!this.gameStarted || !this.selectedCard || this.grid[row][col]) return;

        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const cellHabitat = cell.dataset.habitat;

        // Check if card matches habitat
        if (this.selectedCard.habitat === cellHabitat) {
            // Place the card
            this.grid[row][col] = this.selectedCard;
            cell.innerHTML = `<span class="cell-emoji">${this.selectedCard.emoji}</span>`;
            cell.classList.add('placed');

            // Remove from card list
            document.querySelector(`[data-card='${JSON.stringify(this.selectedCard).replace(/'/g, "\\'")}']`).remove();

            // Show fact
            this.showFact(this.selectedCard.fact);
            this.facts++;

            // Award points
            this.points += 10;

            // Check for bingo
            this.checkBingo();

            // Clear selection
            this.selectedCard = null;
            document.querySelectorAll('.card-item.selected').forEach(el => el.classList.remove('selected'));

            this.updateStats();
        } else {
            // Wrong habitat - show brief error
            cell.style.backgroundColor = '#ffcccc';
            setTimeout(() => {
                cell.style.backgroundColor = '';
            }, 500);
        }
    }

    checkBingo() {
        let newLines = 0;

        // Check rows
        for (let row = 0; row < 5; row++) {
            if (this.grid[row].every(cell => cell !== null)) {
                newLines++;
                this.markBingoLine('row', row);
            }
        }

        // Check columns
        for (let col = 0; col < 5; col++) {
            if (this.grid.every(row => row[col] !== null)) {
                newLines++;
                this.markBingoLine('col', col);
            }
        }

        // Check diagonals
        const diagonal1 = this.grid.every((row, i) => row[i] !== null);
        const diagonal2 = this.grid.every((row, i) => row[4 - i] !== null);

        if (diagonal1) {
            newLines++;
            this.markBingoLine('diagonal', 0);
        }
        if (diagonal2) {
            newLines++;
            this.markBingoLine('diagonal', 1);
        }

        if (newLines > this.lines) {
            const addedLines = newLines - this.lines;
            this.lines = newLines;
            this.points += addedLines * 50; // Bonus points for lines
            this.showBingoModal();
            document.getElementById('matchSound').play();
        }

        this.updateProgress();
    }

    markBingoLine(type, index) {
        let cells = [];
        if (type === 'row') {
            cells = document.querySelectorAll(`[data-row="${index}"]`);
        } else if (type === 'col') {
            cells = document.querySelectorAll(`[data-col="${index}"]`);
        } else if (type === 'diagonal') {
            if (index === 0) {
                for (let i = 0; i < 5; i++) {
                    cells.push(document.querySelector(`[data-row="${i}"][data-col="${i}"]`));
                }
            } else {
                for (let i = 0; i < 5; i++) {
                    cells.push(document.querySelector(`[data-row="${i}"][data-col="${4 - i}"]`));
                }
            }
        }

        cells.forEach(cell => cell.classList.add('bingo-line'));
    }

    showFact(fact) {
        document.getElementById('factText').textContent = fact;
        document.getElementById('factSection').style.display = 'block';
    }

    hideFact() {
        document.getElementById('factSection').style.display = 'none';
    }

    showBingoModal() {
        document.getElementById('bingoScore').textContent = `Points: ${this.points}`;
        document.getElementById('bingoModal').style.display = 'flex';
        document.getElementById('bingoSound').play();
    }

    continueGame() {
        document.getElementById('bingoModal').style.display = 'none';
    }

    updateStats() {
        document.getElementById('points').textContent = this.points;
        document.getElementById('lines').textContent = this.lines;
        document.getElementById('facts').textContent = this.facts;
    }

    updateProgress() {
        const totalCells = 25;
        const filledCells = this.grid.flat().filter(cell => cell !== null).length;
        const progress = (filledCells / totalCells) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;

        if (this.lines > 0) {
            document.getElementById('progressText').textContent = `Great job! You've completed ${this.lines} line${this.lines > 1 ? 's' : ''}!`;
        }
    }

    clearGrid() {
        document.getElementById('bingoGrid').innerHTML = '';
    }

    clearCardList() {
        document.getElementById('cardList').innerHTML = '';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Biodiversity Bingo');
    window.biodiversityBingo = new BiodiversityBingo();
    console.log('Biodiversity Bingo initialized:', window.biodiversityBingo);
});

// Global function for modal button
function continueGame() {
    if (window.biodiversityBingo) {
        window.biodiversityBingo.continueGame();
    }
}
