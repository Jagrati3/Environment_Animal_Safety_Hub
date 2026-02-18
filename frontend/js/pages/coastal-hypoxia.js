// Coastal Hypoxia - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initHypoxiaMap();
  initDisplacementSimulator();
  initOxygenVisualizer();
  initHypoxiaQuiz();
});

// Scroll animations for sections
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all major sections
  const sections = document.querySelectorAll('.overview-section, .interactive-section, .formation-section, .displacement-section, .oxygen-section, .impacts-section, .climate-section, .quiz-section, .solutions-section');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Animated counters for statistics
function initStatCounters() {
  const statCards = document.querySelectorAll('.stat-card h3');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const isNumber = /^\d+$/.test(text.replace(/,/g, '').replace(/km²/g, '').replace(/\+/g, ''));

        if (isNumber) {
          animateCounter(target, text);
        }
      }
    });
  }, { threshold: 0.5 });

  statCards.forEach(card => {
    counterObserver.observe(card);
  });
}

function animateCounter(element, finalText) {
  const isKm = finalText.includes('km²');
  const isNumber = /^\d+$/.test(finalText.replace(/,/g, ''));

  let finalValue;
  if (isKm) {
    finalValue = parseInt(finalText.replace('km²', '').replace(',', ''));
  } else {
    finalValue = parseInt(finalText.replace(/,/g, ''));
  }

  let currentValue = 0;
  const increment = finalValue / 50;
  const timer = setInterval(() => {
    currentValue += increment;
    if (currentValue >= finalValue) {
      currentValue = finalValue;
      clearInterval(timer);
    }

    let displayText;
    if (isKm) {
      displayText = Math.floor(currentValue).toLocaleString() + ' km²';
    } else {
      displayText = Math.floor(currentValue).toLocaleString();
    }

    element.textContent = displayText;
  }, 30);
}

// Interactive Hypoxia Zone Map
function initHypoxiaMap() {
  const mapContainer = document.getElementById('hypoxiaMap');
  const showCurrent = document.getElementById('showCurrent');
  const showExpansion = document.getElementById('showExpansion');
  const showImpacts = document.getElementById('showImpacts');

  let currentMode = 'current';

  // Create a simple world map representation
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", "0 0 800 400");

  // Add simplified continents
  const continents = [
    // North America
    "M 50 100 L 150 80 L 180 120 L 170 180 L 120 200 L 80 180 L 40 140 Z",
    // South America
    "M 200 200 L 250 220 L 270 280 L 260 350 L 220 360 L 180 320 L 170 260 Z",
    // Europe
    "M 380 80 L 420 70 L 440 90 L 430 110 L 400 120 L 370 100 Z",
    // Africa
    "M 350 150 L 400 180 L 420 220 L 410 280 L 380 320 L 340 300 L 320 250 L 330 200 Z",
    // Asia
    "M 450 60 L 650 40 L 680 80 L 670 120 L 620 140 L 580 130 L 520 110 L 470 90 Z"
  ];

  continents.forEach(path => {
    const continent = document.createElementNS(svgNS, "path");
    continent.setAttribute("d", path);
    continent.setAttribute("fill", "#e3f2fd");
    continent.setAttribute("stroke", "#2980b9");
    continent.setAttribute("stroke-width", "1");
    svg.appendChild(continent);
  });

  // Add hypoxia zones
  const hypoxiaZones = [
    { cx: 120, cy: 160, r: 25, id: "gulf-mexico", name: "Gulf of Mexico" },
    { cx: 400, cy: 120, r: 20, id: "baltic-sea", name: "Baltic Sea" },
    { cx: 380, cy: 140, r: 15, id: "chesapeake", name: "Chesapeake Bay" },
    { cx: 420, cy: 110, r: 12, id: "north-sea", name: "North Sea" },
    { cx: 580, cy: 110, r: 18, id: "east-china", name: "East China Sea" }
  ];

  hypoxiaZones.forEach(zone => {
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", zone.cx);
    circle.setAttribute("cy", zone.cy);
    circle.setAttribute("r", zone.r);
    circle.setAttribute("fill", "#e74c3c");
    circle.setAttribute("opacity", "0.7");
    circle.setAttribute("id", `zone-${zone.id}`);
    circle.setAttribute("class", "hypoxia-zone");
    svg.appendChild(circle);

    // Add label
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", zone.cx);
    text.setAttribute("y", zone.cy - zone.r - 5);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "10");
    text.setAttribute("fill", "#2c3e50");
    text.setAttribute("font-weight", "bold");
    text.textContent = zone.name;
    svg.appendChild(text);
  });

  mapContainer.appendChild(svg);

  // Control functions
  showCurrent.addEventListener('click', () => {
    setMapMode('current');
  });

  showExpansion.addEventListener('click', () => {
    setMapMode('expansion');
  });

  showImpacts.addEventListener('click', () => {
    setMapMode('impacts');
  });

  function setMapMode(mode) {
    // Update button states
    [showCurrent, showExpansion, showImpacts].forEach(btn => {
      btn.classList.remove('active');
    });

    if (mode === 'current') showCurrent.classList.add('active');
    else if (mode === 'expansion') showExpansion.classList.add('active');
    else if (mode === 'impacts') showImpacts.classList.add('active');

    currentMode = mode;

    // Update zone appearances
    const zones = document.querySelectorAll('.hypoxia-zone');
    zones.forEach((zone, index) => {
      if (mode === 'current') {
        zone.setAttribute("opacity", "0.7");
        zone.setAttribute("r", hypoxiaZones[index].r);
      } else if (mode === 'expansion') {
        zone.setAttribute("opacity", "0.8");
        zone.setAttribute("r", hypoxiaZones[index].r * 1.5);
      } else if (mode === 'impacts') {
        zone.setAttribute("opacity", "0.9");
        zone.setAttribute("r", hypoxiaZones[index].r * 1.2);
        zone.setAttribute("fill", "#f39c12");
      }
    });
  }

  // Initialize with current mode
  setMapMode('current');
}

// Predator Displacement Simulator
function initDisplacementSimulator() {
  const predatorType = document.getElementById('predatorType');
  const hypoxiaLevel = document.getElementById('hypoxiaLevel');
  const hypoxiaValue = document.getElementById('hypoxiaValue');

  const predator = document.getElementById('predator');
  const prey = document.getElementById('prey');
  const hypoxicZone = document.getElementById('hypoxicZone');

  const displacementDist = document.getElementById('displacementDist');
  const energyCost = document.getElementById('energyCost');
  const preyAvail = document.getElementById('preyAvail');

  function updateSimulator() {
    const type = predatorType.value;
    const level = parseInt(hypoxiaLevel.value);

    // Update hypoxia severity display
    const severityLabels = ['Mild', 'Moderate', 'Severe', 'Extreme', 'Critical'];
    hypoxiaValue.textContent = severityLabels[level - 1];

    // Update hypoxic zone size
    const zoneSizes = [20, 40, 60, 80, 100];
    hypoxicZone.style.width = zoneSizes[level - 1] + '%';

    // Update predator icon
    const predatorIcons = {
      'fish': 'fas fa-fish',
      'mammal': 'fas fa-dolphin',
      'bird': 'fas fa-crow',
      'turtle': 'fas fa-turtle'
    };
    predator.innerHTML = `<i class="${predatorIcons[type]}"></i>`;

    // Calculate displacement metrics
    const baseDisplacement = level * 10;
    const typeMultiplier = { 'fish': 1.2, 'mammal': 1.5, 'bird': 1.8, 'turtle': 1.0 };
    const displacement = Math.round(baseDisplacement * typeMultiplier[type]);

    const energyLoss = Math.min(level * 15, 80);
    const preyReduction = Math.max(100 - level * 20, 20);

    // Update metrics
    displacementDist.textContent = displacement + ' km';
    energyCost.textContent = energyLoss + '%';
    preyAvail.textContent = preyReduction + '%';

    // Animate predator movement
    const predatorX = level > 2 ? 60 : 20;
    const predatorY = level > 3 ? 60 : 20;
    predator.style.left = predatorX + '%';
    predator.style.top = predatorY + '%';

    // Move prey away from hypoxic zone
    const preyX = level > 1 ? 80 : 20;
    prey.style.right = preyX + '%';
  }

  predatorType.addEventListener('change', updateSimulator);
  hypoxiaLevel.addEventListener('input', updateSimulator);

  // Initial update
  updateSimulator();
}

// Oxygen Profile Visualizer
function initOxygenVisualizer() {
  const locationSelect = document.getElementById('locationSelect');
  const seasonSelect = document.getElementById('seasonSelect');

  const surfaceOxygen = document.getElementById('surfaceOxygen');
  const bottomOxygen = document.getElementById('bottomOxygen');
  const hypoxicVolume = document.getElementById('hypoxicVolume');

  const oxygenCurve = document.getElementById('oxygenCurve');

  const profiles = {
    'healthy': {
      surface: 8.5,
      bottom: 6.2,
      hypoxicPercent: 0
    },
    'moderate': {
      surface: 7.8,
      bottom: 2.8,
      hypoxicPercent: 35
    },
    'severe': {
      surface: 7.2,
      bottom: 1.5,
      hypoxicPercent: 65
    },
    'dead-zone': {
      surface: 6.8,
      bottom: 0.3,
      hypoxicPercent: 95
    }
  };

  const seasonalModifiers = {
    'spring': { surface: 0.5, bottom: 0.3, hypoxic: 10 },
    'summer': { surface: -0.2, bottom: -0.5, hypoxic: 20 },
    'fall': { surface: 0.3, bottom: 0.2, hypoxic: -5 },
    'winter': { surface: 0.8, bottom: 0.6, hypoxic: -15 }
  };

  function updateVisualizer() {
    const location = locationSelect.value;
    const season = seasonSelect.value;

    const baseProfile = profiles[location];
    const seasonalMod = seasonalModifiers[season];

    const finalSurface = Math.max(0, baseProfile.surface + seasonalMod.surface);
    const finalBottom = Math.max(0, baseProfile.bottom + seasonalMod.bottom);
    const finalHypoxic = Math.max(0, Math.min(100, baseProfile.hypoxicPercent + seasonalMod.hypoxic));

    // Update readings
    surfaceOxygen.textContent = finalSurface.toFixed(1) + ' mg/L';
    bottomOxygen.textContent = finalBottom.toFixed(1) + ' mg/L';
    hypoxicVolume.textContent = finalHypoxic.toFixed(0) + '%';

    // Update visual curve
    const gradientStops = [];
    const surfacePercent = (finalSurface / 10) * 100;
    const bottomPercent = (finalBottom / 10) * 100;

    oxygenCurve.style.background = `linear-gradient(180deg,
      rgba(39, 174, 96, ${surfacePercent / 100}) 0%,
      rgba(231, 76, 60, ${1 - bottomPercent / 100}) 100%)`;
  }

  locationSelect.addEventListener('change', updateVisualizer);
  seasonSelect.addEventListener('change', updateVisualizer);

  // Initial update
  updateVisualizer();
}

// Hypoxia Quiz
function initHypoxiaQuiz() {
  const quizData = [
    {
      question: "What is the primary cause of coastal hypoxia in most cases?",
      options: ["Overfishing", "Excess nutrient runoff from land", "Ocean acidification", "Rising sea temperatures"],
      correct: 1
    },
    {
      question: "Which U.S. coastal area has the largest hypoxic 'dead zone'?",
      options: ["Chesapeake Bay", "San Francisco Bay", "Gulf of Mexico", "Long Island Sound"],
      correct: 2
    },
    {
      question: "How do mobile predators typically respond to hypoxic conditions?",
      options: ["They stay in place and adapt", "They move to deeper water", "They migrate horizontally to better oxygenated areas", "They reduce their activity levels"],
      correct: 2
    },
    {
      question: "What is the oxygen threshold below which water is considered hypoxic for most marine life?",
      options: ["5 mg/L", "3 mg/L", "2 mg/L", "1 mg/L"],
      correct: 2
    },
    {
      question: "Which season typically sees the worst hypoxia in temperate coastal areas?",
      options: ["Winter", "Spring", "Summer", "Fall"],
      correct: 2
    },
    {
      question: "What type of marine organism is most affected by hypoxia?",
      options: ["Plankton", "Fish", "Corals", "All marine life is equally affected"],
      correct: 1
    },
    {
      question: "How does climate change exacerbate coastal hypoxia?",
      options: ["By increasing evaporation", "By warming surface waters and strengthening stratification", "By increasing wave action", "By changing ocean currents"],
      correct: 1
    },
    {
      question: "What is the main source of nutrients causing the Gulf of Mexico dead zone?",
      options: ["Industrial waste", "Sewage treatment plants", "Mississippi River agricultural runoff", "Urban stormwater"],
      correct: 2
    },
    {
      question: "Which European sea is chronically affected by hypoxia?",
      options: ["Mediterranean Sea", "Baltic Sea", "North Sea", "Black Sea"],
      correct: 1
    },
    {
      question: "What management strategy is most effective for reducing coastal hypoxia?",
      options: ["Building artificial reefs", "Reducing nutrient inputs from land", "Installing oxygen pumps", "Relocating affected species"],
      correct: 1
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let answers = [];

  const questionText = document.getElementById('questionText');
  const answerOptions = document.getElementById('answerOptions');
  const questionCounter = document.getElementById('questionCounter');
  const progressFill = document.getElementById('quizProgress');
  const prevBtn = document.getElementById('prevQuestion');
  const nextBtn = document.getElementById('nextQuestion');
  const submitBtn = document.getElementById('submitQuiz');
  const quizResults = document.getElementById('quizResults');
  const finalScore = document.getElementById('finalScore');
  const scoreMessage = document.getElementById('scoreMessage');
  const retakeBtn = document.getElementById('retakeQuiz');

  function loadQuestion() {
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;

    // Update progress bar
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = progress + '%';

    // Clear previous options
    answerOptions.innerHTML = '';

    // Add new options
    question.options.forEach((option, index) => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'answer-option';
      optionDiv.textContent = option;
      optionDiv.dataset.index = index;

      if (answers[currentQuestion] === index) {
        optionDiv.classList.add('selected');
      }

      optionDiv.addEventListener('click', () => selectAnswer(index));
      answerOptions.appendChild(optionDiv);
    });

    // Update button states
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = answers[currentQuestion] === undefined;

    if (currentQuestion === quizData.length - 1) {
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'inline-block';
    } else {
      nextBtn.style.display = 'inline-block';
      submitBtn.style.display = 'none';
    }
  }

  function selectAnswer(index) {
    answers[currentQuestion] = index;

    // Update UI
    document.querySelectorAll('.answer-option').forEach((option, i) => {
      option.classList.toggle('selected', i === index);
    });

    nextBtn.disabled = false;
  }

  function showResults() {
    // Calculate score
    score = answers.reduce((total, answer, index) => {
      return total + (answer === quizData[index].correct ? 1 : 0);
    }, 0);

    // Hide quiz, show results
    document.querySelector('.question-display').style.display = 'none';
    document.querySelector('.quiz-controls').style.display = 'none';
    quizResults.style.display = 'block';

    finalScore.textContent = score;
    scoreMessage.textContent = getScoreMessage(score);
  }

  function getScoreMessage(score) {
    if (score >= 9) return "Outstanding! You're a hypoxia expert!";
    if (score >= 7) return "Great job! You have a strong understanding.";
    if (score >= 5) return "Good effort! Keep learning about coastal hypoxia.";
    return "Keep studying! Hypoxia is a complex but important topic.";
  }

  // Event listeners
  nextBtn.addEventListener('click', () => {
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  });

  submitBtn.addEventListener('click', showResults);

  retakeBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    answers = [];

    document.querySelector('.question-display').style.display = 'block';
    document.querySelector('.quiz-controls').style.display = 'flex';
    quizResults.style.display = 'none';

    loadQuestion();
  });

  // Initialize quiz
  loadQuestion();
}

// Utility function to show references modal
function showReferences() {
  const references = [
    "Diaz, R. J., & Rosenberg, R. (2008). Spreading dead zones and consequences for marine ecosystems.",
    "Breitburg, D., et al. (2018). Declining oxygen in the global ocean and coastal waters.",
    "Vaquer-Sunyer, R., & Duarte, C. M. (2008). Thresholds of hypoxia for marine biodiversity.",
    "Rabalais, N. N., et al. (2010). Dynamics and distribution of natural and human-caused coastal hypoxia.",
    "Conley, D. J., et al. (2011). Hypoxia in the Baltic Sea and basin-scale changes in the biogeochemistry."
  ];

  let modalContent = '<h3>Scientific References</h3><ul>';
  references.forEach(ref => {
    modalContent += `<li>${ref}</li>`;
  });
  modalContent += '</ul>';

  // Create and show modal (simplified)
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8); z-index: 10000; display: flex;
    align-items: center; justify-content: center; color: white;
  `;
  modal.innerHTML = `
    <div style="background: var(--dark-color); padding: 30px; border-radius: 10px; max-width: 600px; max-height: 80vh; overflow-y: auto;">
      ${modalContent}
      <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 20px; padding: 10px 20px; background: var(--ocean-blue); border: none; border-radius: 5px; color: white; cursor: pointer;">Close</button>
    </div>
  `;

  document.body.appendChild(modal);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-in {
    animation: fadeIn 0.8s ease forwards;
  }

  .hypoxia-zone {
    transition: all 0.5s ease;
  }

  .hypoxia-zone:hover {
    stroke: #e74c3c;
    stroke-width: 3;
  }
`;
document.head.appendChild(style);