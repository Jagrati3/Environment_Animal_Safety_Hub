document.addEventListener('DOMContentLoaded', function() {
    // Game elements
    const startGameBtn = document.getElementById('startGameBtn');
    const pauseGameBtn = document.getElementById('pauseGameBtn');
    const resetGameBtn = document.getElementById('resetGameBtn');
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const timeElement = document.getElementById('time');
    const dropletsContainer = document.getElementById('dropletsContainer');
    const containersGrid = document.getElementById('containersGrid');
    const obstacles = document.getElementById('obstacles');
    const tipsSection = document.getElementById('tipsSection');
    const tipText = document.getElementById('tipText');
    const badgesSection = document.getElementById('badgesSection');
    const badges = document.getElementById('badges');
    const levelCompleteModal = document.getElementById('levelCompleteModal');
    const gameOverModal = document.getElementById('gameOverModal');
    const finalScore = document.getElementById('finalScore');
    const levelScore = document.getElementById('levelScore');
    const dropSound = document.getElementById('dropSound');
    const leakSound = document.getElementById('leakSound');

    // Game state
    let score = 0;
    let level = 1;
    let timeLeft = 60;
    let gameActive = false;
    let gamePaused = false;
    let timerInterval;
    let draggedDroplet = null;
    let droplets = [];
    let containers = [];
    let leaks = [];
    let badgesEarned = [];

    // Conservation tips
    const conservationTips = [
        "Fix leaky faucets to save up to 20 gallons of water per week!",
        "Take shorter showers - every minute counts!",
        "Turn off the tap while brushing your teeth.",
        "Use a dishwasher instead of washing dishes by hand.",
        "Water your lawn or garden during cooler parts of the day.",
        "Install water-efficient showerheads and faucets.",
        "Collect rainwater for outdoor use.",
        "Check for leaks in toilets by adding food coloring to the tank."
    ];

    // Badge system
    const badgeLevels = [
        { name: "Water Saver", threshold: 50, emoji: "💧" },
        { name: "Leak Fixer", threshold: 100, emoji: "🔧" },
        { name: "Conservation Hero", threshold: 200, emoji: "🦸‍♂️" },
        { name: "Eco Warrior", threshold: 300, emoji: "⚔️" },
        { name: "Water Master", threshold: 500, emoji: "🏆" }
    ];

    // Initialize game
    function initGame() {
        score = 0;
        level = 1;
        timeLeft = 60;
        gameActive = false;
        gamePaused = false;
        droplets = [];
        containers = [];
        leaks = [];
        badgesEarned = [];
        updateUI();
        clearContainers();
        clearDroplets();
        clearObstacles();
        tipsSection.style.display = 'none';
        badgesSection.style.display = 'none';
        levelCompleteModal.style.display = 'none';
        gameOverModal.style.display = 'none';
    }

    // Start game
    function startGame() {
        if (gameActive) return;
        gameActive = true;
        gamePaused = false;
        startGameBtn.disabled = true;
        pauseGameBtn.disabled = false;
        resetGameBtn.disabled = false;
        startTimer();
        generateLevel();
        showRandomTip();
    }

    // Pause game
    function pauseGame() {
        gamePaused = !gamePaused;
        pauseGameBtn.textContent = gamePaused ? 'Resume' : 'Pause';
        if (gamePaused) {
            clearInterval(timerInterval);
        } else {
            startTimer();
        }
    }

    // Reset game
    function resetGame() {
        clearInterval(timerInterval);
        initGame();
        startGameBtn.disabled = false;
        pauseGameBtn.disabled = true;
        resetGameBtn.disabled = true;
    }

    // Start timer
    function startTimer() {
        timerInterval = setInterval(() => {
            if (!gamePaused && gameActive) {
                timeLeft--;
                updateUI();
                if (timeLeft <= 0) {
                    endGame();
                }
            }
        }, 1000);
    }

    // Generate level
    function generateLevel() {
        clearContainers();
        clearDroplets();
        clearObstacles();

        // Generate containers (3-5 based on level)
        const numContainers = Math.min(3 + Math.floor(level / 2), 5);
        for (let i = 0; i < numContainers; i++) {
            createContainer();
        }

        // Generate droplets (more as level increases)
        const numDroplets = 8 + level * 2;
        for (let i = 0; i < numDroplets; i++) {
            createDroplet();
        }

        // Generate leaks (obstacles)
        const numLeaks = Math.min(Math.floor(level / 2), 3);
        for (let i = 0; i < numLeaks; i++) {
            createLeak();
        }
    }

    // Create container
    function createContainer() {
        const container = document.createElement('div');
        container.className = 'container';
        container.dataset.capacity = 10 + Math.floor(Math.random() * 20); // 10-30 capacity
        container.dataset.filled = 0;

        const label = document.createElement('div');
        label.className = 'container-label';
        label.textContent = `${container.dataset.capacity}L`;
        container.appendChild(label);

        const fill = document.createElement('div');
        fill.className = 'container-fill';
        container.appendChild(fill);

        containersGrid.appendChild(container);
        containers.push(container);
    }

    // Create droplet
    function createDroplet() {
        const droplet = document.createElement('div');
        droplet.className = 'droplet';
        droplet.draggable = true;
        droplet.textContent = '💧';
        droplet.dataset.value = 1 + Math.floor(Math.random() * 3); // 1-3 water units

        const valueSpan = document.createElement('span');
        valueSpan.textContent = droplet.dataset.value;
        droplet.appendChild(valueSpan);

        dropletsContainer.appendChild(droplet);
        droplets.push(droplet);

        // Add drag events
        droplet.addEventListener('dragstart', handleDragStart);
        droplet.addEventListener('dragend', handleDragEnd);
    }

    // Create leak (obstacle)
    function createLeak() {
        const leak = document.createElement('div');
        leak.className = 'leak';
        leak.textContent = '💦';
        leak.style.left = Math.random() * 80 + '%';
        leak.style.top = Math.random() * 60 + 20 + '%';

        obstacles.appendChild(leak);
        leaks.push(leak);
    }

    // Drag and drop handlers
    function handleDragStart(e) {
        draggedDroplet = e.target;
        e.dataTransfer.effectAllowed = 'move';
        e.target.style.opacity = '0.5';
    }

    function handleDragEnd(e) {
        e.target.style.opacity = '1';
        draggedDroplet = null;
    }

    // Drop handlers for containers
    containersGrid.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });

    // Drop handlers for the entire game area
    const gameArea = document.querySelector('.game-area');
    gameArea.addEventListener('drop', (e) => {
        e.preventDefault();
        if (!draggedDroplet || !gameActive || gamePaused) return;

        const dropX = e.clientX;
        const dropY = e.clientY;

        // Check if dropping on a leak (bad)
        let hitLeak = false;
        leaks.forEach(leak => {
            const leakRect = leak.getBoundingClientRect();
            if (dropX >= leakRect.left && dropX <= leakRect.right &&
                dropY >= leakRect.top && dropY <= leakRect.bottom) {
                hitLeak = true;
            }
        });

        if (hitLeak) {
            // Hit a leak - lose points
            score = Math.max(0, score - 5);
            leakSound.play();
            showLeakMessage();
            removeDroplet(draggedDroplet);
            updateUI();
            checkBadges();
            return;
        }

        // Check if dropping on a container
        const container = document.elementFromPoint(dropX, dropY).closest('.container');
        if (!container) {
            // Dropped outside containers - lose points
            score = Math.max(0, score - 1);
            updateUI();
            checkBadges();
            return;
        }

        // Successful drop on container
        const value = parseInt(draggedDroplet.dataset.value);
        const capacity = parseInt(container.dataset.capacity);
        let filled = parseInt(container.dataset.filled);

        if (filled + value <= capacity) {
            filled += value;
            container.dataset.filled = filled;
            score += value * 10;

            const fillPercent = (filled / capacity) * 100;
            container.querySelector('.container-fill').style.height = fillPercent + '%';

            if (filled >= capacity) {
                container.classList.add('full');
                score += 50; // Bonus for filling container
            }

            dropSound.play();
            removeDroplet(draggedDroplet);
            checkLevelComplete();
        } else {
            // Container would overflow - lose points
            score = Math.max(0, score - 2);
        }

        updateUI();
        checkBadges();
    });

    gameArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });

    // Remove droplet
    function removeDroplet(droplet) {
        const index = droplets.indexOf(droplet);
        if (index > -1) {
            droplets.splice(index, 1);
        }
        droplet.remove();
    }

    // Clear containers
    function clearContainers() {
        containersGrid.innerHTML = '';
        containers = [];
    }

    // Clear droplets
    function clearDroplets() {
        dropletsContainer.innerHTML = '';
        droplets = [];
    }

    // Clear obstacles
    function clearObstacles() {
        obstacles.innerHTML = '';
        leaks = [];
    }

    // Check if level is complete
    function checkLevelComplete() {
        const fullContainers = containers.filter(c => parseInt(c.dataset.filled) >= parseInt(c.dataset.capacity));
        if (fullContainers.length === containers.length && droplets.length === 0) {
            levelComplete();
        }
    }

    // Level complete
    function levelComplete() {
        gameActive = false;
        clearInterval(timerInterval);
        levelScore.textContent = score;
        levelCompleteModal.style.display = 'flex';
        score += 100; // Level completion bonus
        updateUI();
    }

    // Next level
    function nextLevel() {
        level++;
        timeLeft = Math.max(30, 60 - (level - 1) * 5); // Decrease time as levels increase
        levelCompleteModal.style.display = 'none';
        generateLevel();
        startGame();
    }

    // Make nextLevel global for onclick
    window.nextLevel = nextLevel;

    // End game
    function endGame() {
        gameActive = false;
        clearInterval(timerInterval);
        finalScore.textContent = score;
        gameOverModal.style.display = 'flex';
        showBadges();
    }

    // Show random tip
    function showRandomTip() {
        const randomTip = conservationTips[Math.floor(Math.random() * conservationTips.length)];
        tipText.textContent = randomTip;
        tipsSection.style.display = 'block';
    }

    // Show leak message
    function showLeakMessage() {
        tipText.textContent = "Oops! You hit a leak. Water is being wasted!";
        tipsSection.style.display = 'block';
        setTimeout(() => {
            showRandomTip();
        }, 3000);
    }

    // Check badges
    function checkBadges() {
        badgeLevels.forEach(badge => {
            if (score >= badge.threshold && !badgesEarned.includes(badge.name)) {
                badgesEarned.push(badge.name);
                showBadgeNotification(badge);
            }
        });
    }

    // Show badge notification
    function showBadgeNotification(badge) {
        const badgeElement = document.createElement('div');
        badgeElement.className = 'badge';
        badgeElement.textContent = `${badge.emoji} ${badge.name}`;
        badges.appendChild(badgeElement);

        // Animate badge
        badgeElement.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            badgeElement.style.animation = '';
        }, 500);
    }

    // Show badges
    function showBadges() {
        badgesSection.style.display = 'block';
    }

    // Update UI
    function updateUI() {
        scoreElement.textContent = score;
        levelElement.textContent = level;
        timeElement.textContent = timeLeft;
    }

    // Event listeners
    startGameBtn.addEventListener('click', startGame);
    pauseGameBtn.addEventListener('click', pauseGame);
    resetGameBtn.addEventListener('click', resetGame);

    // Initialize on load
    initGame();
});
