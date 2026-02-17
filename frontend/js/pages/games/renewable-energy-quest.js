// Renewable Energy Quest Game Logic

class RenewableEnergyQuest {
    constructor() {
        this.grid = [];
        this.energy = 0;
        this.pollution = 0;
        this.score = 0;
        this.level = 1;
        this.selectedSource = null;
        this.quizActive = false;
        this.quizCount = 0;
        this.maxQuizCount = 3;

        // Energy sources configuration
        this.sources = {
            solar: { cost: 50, energy: 20, pollution: 5, emoji: '☀️' },
            wind: { cost: 75, energy: 30, pollution: 10, emoji: '🌬️' },
            hydro: { cost: 100, energy: 40, pollution: 15, emoji: '💧' }
        };

        // Quiz questions
        this.quizQuestions = [
            {
                question: "What is the main advantage of solar energy?",
                options: ["It's free from the sun", "It doesn't produce pollution", "It works at night", "It needs coal"],
                correct: 1
            },
            {
                question: "Which renewable energy source uses moving water?",
                options: ["Solar panels", "Wind turbines", "Hydroelectric dams", "Geothermal vents"],
                correct: 2
            },
            {
                question: "Why is renewable energy better than fossil fuels?",
                options: ["It's cheaper", "It doesn't run out", "It's louder", "It pollutes more"],
                correct: 1
            },
            {
                question: "What do wind turbines convert into electricity?",
                options: ["Sunlight", "Water flow", "Wind energy", "Heat from earth"],
                correct: 2
            },
            {
                question: "Which energy source produces the least pollution?",
                options: ["Coal power", "Solar panels", "Oil plants", "Nuclear power"],
                correct: 1
            }
        ];

        this.init();
    }

    init() {
        this.createGrid();
        this.setupEventListeners();
        this.updateDisplay();
    }

    createGrid() {
        const gridElement = document.getElementById('cityGrid');
        gridElement.innerHTML = '';

        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.index = i;
            cell.addEventListener('click', () => this.placeElement(i));
            gridElement.appendChild(cell);
        }
    }

    setupEventListeners() {
        document.getElementById('startGameBtn').addEventListener('click', () => this.startGame());
        document.getElementById('resetGameBtn').addEventListener('click', () => this.resetGame());

        // Source selection
        document.querySelectorAll('.source-item').forEach(item => {
            item.addEventListener('click', () => this.selectSource(item.dataset.type));
        });

        // Quiz
        document.getElementById('submitQuizBtn').addEventListener('click', () => this.submitQuiz());
    }

    selectSource(type) {
        this.selectedSource = type;
        document.querySelectorAll('.source-item').forEach(item => {
            item.classList.toggle('selected', item.dataset.type === type);
        });
    }

    placeElement(index) {
        if (!this.selectedSource || this.grid[index]) return;

        const source = this.sources[this.selectedSource];
        this.grid[index] = this.selectedSource;

        const cell = document.querySelector(`[data-index="${index}"]`);
        cell.textContent = source.emoji;
        cell.className = `grid-cell ${this.selectedSource}`;

        this.energy += source.energy;
        this.pollution += source.pollution;
        this.score += source.energy - source.pollution;

        this.updateDisplay();
        this.checkQuizTrigger();
        this.checkWinCondition();

        // Play sound
        document.getElementById('placeSound').play();
    }

    updateDisplay() {
        document.getElementById('energy').textContent = `${this.energy} MW`;
        document.getElementById('pollution').textContent = `${this.pollution}%`;
        document.getElementById('score').textContent = this.score;

        const progress = Math.min((this.energy / (this.pollution + 1)) * 50, 100);
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = `Complete objectives to achieve Green City status!`;
    }

    checkQuizTrigger() {
        if (this.quizCount < this.maxQuizCount && Math.random() < 0.3) {
            this.showQuiz();
        }
    }

    showQuiz() {
        this.quizActive = true;
        const question = this.quizQuestions[Math.floor(Math.random() * this.quizQuestions.length)];

        document.getElementById('quizQuestion').textContent = question.question;
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => this.selectQuizOption(index, question.correct));
            optionsContainer.appendChild(optionElement);
        });

        document.getElementById('quizSection').style.display = 'block';
    }

    selectQuizOption(selectedIndex, correctIndex) {
        document.querySelectorAll('.quiz-option').forEach((option, index) => {
            option.classList.toggle('selected', index === selectedIndex);
        });
    }

    submitQuiz() {
        const selectedOption = document.querySelector('.quiz-option.selected');
        if (!selectedOption) return;

        const selectedIndex = Array.from(document.querySelectorAll('.quiz-option')).indexOf(selectedOption);
        const question = this.quizQuestions.find(q => q.question === document.getElementById('quizQuestion').textContent);

        if (selectedIndex === question.correct) {
            this.score += 50;
            this.showQuizResult('Correct! +50 points', true);
        } else {
            this.pollution += 5;
            this.showQuizResult('Wrong! Pollution increased', false);
        }

        this.quizCount++;
        this.quizActive = false;
        document.getElementById('quizSection').style.display = 'none';
        this.updateDisplay();
    }

    showQuizResult(message, isCorrect) {
        document.getElementById('quizResult').textContent = message;
        document.getElementById('quizModal').style.display = 'flex';

        setTimeout(() => {
            document.getElementById('quizModal').style.display = 'none';
        }, 2000);

        const sound = isCorrect ? document.getElementById('quizSound') : document.getElementById('wrongSound');
        sound.play();
    }

    checkWinCondition() {
        if (this.energy >= 200 && this.pollution <= 50) {
            this.showLevelComplete();
        }
    }

    showLevelComplete() {
        document.getElementById('levelScore').textContent = this.score;
        document.getElementById('levelCompleteModal').style.display = 'flex';
    }

    nextLevel() {
        this.level++;
        this.resetGame();
        document.getElementById('levelCompleteModal').style.display = 'none';
    }

    startGame() {
        this.resetGame();
    }

    resetGame() {
        this.grid = [];
        this.energy = 0;
        this.pollution = 0;
        this.score = 0;
        this.quizCount = 0;
        this.selectedSource = null;

        this.createGrid();
        this.updateDisplay();

        document.querySelectorAll('.source-item').forEach(item => {
            item.classList.remove('selected');
        });

        document.getElementById('quizSection').style.display = 'none';
    }
}

// Close quiz modal
function closeQuizModal() {
    document.getElementById('quizModal').style.display = 'none';
}

// Global functions for modal buttons
function nextLevel() {
    if (window.gameInstance) {
        window.gameInstance.nextLevel();
    }
}

function closeQuizModal() {
    document.getElementById('quizModal').style.display = 'none';
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.gameInstance = new RenewableEnergyQuest();
});
