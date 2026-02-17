document.addEventListener('DOMContentLoaded', function() {
    const startGameBtn = document.getElementById('startGameBtn');
    const submitAnswerBtn = document.getElementById('submitAnswer');
    const answerInput = document.getElementById('answerInput');
    const riddleText = document.getElementById('riddleText');
    const scoreElement = document.getElementById('score');
    const currentLocationElement = document.getElementById('currentLocation');
    const progressElement = document.getElementById('progress');
    const funFact = document.getElementById('funFact');
    const factText = document.getElementById('factText');
    const gameOverModal = document.getElementById('gameOverModal');
    const finalScore = document.getElementById('finalScore');
    const treasuresCollected = document.getElementById('treasuresCollected');
    const treasureSound = document.getElementById('treasureSound');

    let score = 0;
    let currentLocationIndex = 0;
    let treasuresFound = 0;
    let gameStarted = false;

    const locations = ['forest', 'ocean', 'city'];
    const riddles = [
        {
            question: "I have roots that nobody sees, I am taller than trees, Up, up I go, and yet I never grow. What am I?",
            answer: "mountain",
            fact: "Mountains are formed by tectonic plates colliding and volcanic activity. They help regulate the Earth's climate by influencing weather patterns."
        },
        {
            question: "I'm blue and vast, home to fish and coral, I can be calm or stormy, and I reflect the sky. What am I?",
            answer: "ocean",
            fact: "Oceans cover 71% of Earth's surface and produce over half of the world's oxygen through phytoplankton."
        },
        {
            question: "I'm made by humans, full of buildings tall, I have streets and lights, and people in a thrall. What am I?",
            answer: "city",
            fact: "Cities are responsible for about 70% of global CO2 emissions, but sustainable urban planning can make them eco-friendly."
        }
    ];

    function startGame() {
        gameStarted = true;
        startGameBtn.style.display = 'none';
        loadRiddle();
        updateUI();
    }

    function loadRiddle() {
        if (currentLocationIndex < riddles.length) {
            riddleText.textContent = riddles[currentLocationIndex].question;
            currentLocationElement.textContent = locations[currentLocationIndex].charAt(0).toUpperCase() + locations[currentLocationIndex].slice(1);
            answerInput.value = '';
            funFact.style.display = 'none';
        } else {
            endGame();
        }
    }

    function checkAnswer() {
        const userAnswer = answerInput.value.toLowerCase().trim();
        const correctAnswer = riddles[currentLocationIndex].answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            score += 10;
            treasuresFound++;
            treasureSound.play();
            showFunFact();
            setTimeout(() => {
                currentLocationIndex++;
                loadRiddle();
                updateUI();
            }, 3000);
        } else {
            alert('Wrong answer! Try again.');
        }
    }

    function showFunFact() {
        factText.textContent = riddles[currentLocationIndex].fact;
        funFact.style.display = 'block';
    }

    function updateUI() {
        scoreElement.textContent = score;
        progressElement.textContent = `${treasuresFound}/${riddles.length}`;
    }

    function endGame() {
        finalScore.textContent = score;
        treasuresCollected.textContent = treasuresFound;
        gameOverModal.style.display = 'flex';
    }

    startGameBtn.addEventListener('click', startGame);
    submitAnswerBtn.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
});
