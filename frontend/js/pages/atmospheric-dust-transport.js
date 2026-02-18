// Atmospheric Dust Transport - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initDustMap();
  initNutrientCalculator();
  initMarineSimulation();
  initDustQuiz();
  initRouteCards();
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
  const sections = document.querySelectorAll('.overview-section, .interactive-section, .nutrient-section, .marine-section, .terrestrial-section, .climate-section, .quiz-section, .resources-section');
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
        const isNumber = /^\d+$/.test(text.replace(/,/g, '').replace(/km/g, '').replace(/tons/g, '').replace(/%/g, ''));

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
  const isKm = finalText.includes('km');
  const isTons = finalText.includes('tons');
  const isPercent = finalText.includes('%');

  let finalValue;
  if (isKm) {
    finalValue = parseInt(finalText.replace('km', '').replace(',', ''));
  } else if (isTons) {
    finalValue = parseInt(finalText.replace('tons', '').replace(',', ''));
  } else if (isPercent) {
    finalValue = parseInt(finalText.replace('%', ''));
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
      displayText = Math.floor(currentValue).toLocaleString() + ' km';
    } else if (isTons) {
      displayText = Math.floor(currentValue).toLocaleString() + ' tons';
    } else if (isPercent) {
      displayText = Math.floor(currentValue) + '%';
    } else {
      displayText = Math.floor(currentValue).toLocaleString();
    }

    element.textContent = displayText;
  }, 30);
}

// Interactive Dust Transport Map
function initDustMap() {
  const mapContainer = document.getElementById('dustMap');
  const toggleRoutes = document.getElementById('toggleRoutes');
  const toggleDeposits = document.getElementById('toggleDeposits');
  const playAnimation = document.getElementById('playAnimation');

  let routesVisible = false;
  let depositsVisible = false;
  let animationPlaying = false;

  // Create a simple SVG world map representation
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", "0 0 800 400");

  // Add continents (simplified)
  const continents = [
    // Africa
    "M 350 150 L 400 180 L 420 220 L 410 280 L 380 320 L 340 300 L 320 250 L 330 200 Z",
    // South America
    "M 200 200 L 250 220 L 270 280 L 260 350 L 220 360 L 180 320 L 170 260 Z",
    // North America
    "M 50 100 L 150 80 L 180 120 L 170 180 L 120 200 L 80 180 L 40 140 Z",
    // Europe
    "M 380 80 L 420 70 L 440 90 L 430 110 L 400 120 L 370 100 Z",
    // Asia
    "M 450 60 L 650 40 L 680 80 L 670 120 L 620 140 L 580 130 L 520 110 L 470 90 Z"
  ];

  continents.forEach(path => {
    const continent = document.createElementNS(svgNS, "path");
    continent.setAttribute("d", path);
    continent.setAttribute("fill", "#e8f4f8");
    continent.setAttribute("stroke", "#3498db");
    continent.setAttribute("stroke-width", "1");
    svg.appendChild(continent);
  });

  // Add dust transport routes
  const routes = [
    // Transatlantic: Africa to Amazon
    { path: "M 380 220 Q 300 200 220 240", id: "transatlantic" },
    // Transpacific: Asia to Pacific
    { path: "M 580 100 Q 400 120 150 140", id: "transpacific" },
    // Mediterranean: Africa to Europe
    { path: "M 380 150 Q 380 120 400 100", id: "mediterranean" }
  ];

  routes.forEach(route => {
    const routePath = document.createElementNS(svgNS, "path");
    routePath.setAttribute("d", route.path);
    routePath.setAttribute("stroke", "#d35400");
    routePath.setAttribute("stroke-width", "3");
    routePath.setAttribute("fill", "none");
    routePath.setAttribute("opacity", "0");
    routePath.setAttribute("id", `route-${route.id}`);
    routePath.setAttribute("stroke-dasharray", "10,5");
    svg.appendChild(routePath);
  });

  // Add deposition zones
  const deposits = [
    { cx: 220, cy: 240, r: 15, id: "amazon" },
    { cx: 150, cy: 140, r: 12, id: "pacific" },
    { cx: 400, cy: 100, r: 10, id: "europe" }
  ];

  deposits.forEach(deposit => {
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", deposit.cx);
    circle.setAttribute("cy", deposit.cy);
    circle.setAttribute("r", deposit.r);
    circle.setAttribute("fill", "#f39c12");
    circle.setAttribute("opacity", "0");
    circle.setAttribute("id", `deposit-${deposit.id}`);
    svg.appendChild(circle);
  });

  mapContainer.appendChild(svg);

  // Control functions
  toggleRoutes.addEventListener('click', () => {
    routesVisible = !routesVisible;
    routes.forEach(route => {
      const routeElement = document.getElementById(`route-${route.id}`);
      routeElement.setAttribute("opacity", routesVisible ? "1" : "0");
    });
    toggleRoutes.innerHTML = routesVisible ?
      '<i class="fas fa-route"></i> Hide Routes' :
      '<i class="fas fa-route"></i> Show Routes';
  });

  toggleDeposits.addEventListener('click', () => {
    depositsVisible = !depositsVisible;
    deposits.forEach(deposit => {
      const depositElement = document.getElementById(`deposit-${deposit.id}`);
      depositElement.setAttribute("opacity", depositsVisible ? "0.7" : "0");
    });
    toggleDeposits.innerHTML = depositsVisible ?
      '<i class="fas fa-cloud-download-alt"></i> Hide Deposits' :
      '<i class="fas fa-cloud-download-alt"></i> Show Deposits';
  });

  playAnimation.addEventListener('click', () => {
    if (animationPlaying) return;

    animationPlaying = true;
    playAnimation.innerHTML = '<i class="fas fa-pause"></i> Animating...';
    playAnimation.disabled = true;

    // Show routes and deposits
    routes.forEach(route => {
      document.getElementById(`route-${route.id}`).setAttribute("opacity", "1");
    });
    deposits.forEach(deposit => {
      document.getElementById(`deposit-${deposit.id}`).setAttribute("opacity", "0.7");
    });

    // Animate dust particles
    animateDustParticles();

    setTimeout(() => {
      animationPlaying = false;
      playAnimation.innerHTML = '<i class="fas fa-play"></i> Animate Dust Flow';
      playAnimation.disabled = false;
    }, 5000);
  });
}

function animateDustParticles() {
  const svg = document.querySelector('#dustMap svg');
  const particles = [];

  // Create animated particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    particle.setAttribute("r", "2");
    particle.setAttribute("fill", "#d35400");
    particle.setAttribute("opacity", "0.8");

    // Start from Africa
    particle.setAttribute("cx", 380 + Math.random() * 20);
    particle.setAttribute("cy", 220 + Math.random() * 20);

    svg.appendChild(particle);
    particles.push(particle);
  }

  // Animate particles moving westward
  particles.forEach((particle, index) => {
    const animation = particle.animate([
      { cx: particle.getAttribute("cx"), cy: particle.getAttribute("cy") },
      { cx: parseFloat(particle.getAttribute("cx")) - 200, cy: parseFloat(particle.getAttribute("cy")) - 20 }
    ], {
      duration: 3000 + Math.random() * 2000,
      delay: index * 100,
      easing: 'ease-out'
    });

    animation.onfinish = () => {
      particle.remove();
    };
  });
}

// Nutrient Deposition Calculator
function initNutrientCalculator() {
  const calculateBtn = document.getElementById('calculateNutrients');
  const concentrationInput = document.getElementById('dustConcentration');
  const areaInput = document.getElementById('areaSize');
  const timeInput = document.getElementById('depositionTime');

  const ironResult = document.getElementById('ironResult');
  const phosphorusResult = document.getElementById('phosphorusResult');
  const fertilizerValue = document.getElementById('fertilizerValue');

  calculateBtn.addEventListener('click', () => {
    const concentration = parseFloat(concentrationInput.value) || 0;
    const area = parseFloat(areaInput.value) || 0;
    const time = parseFloat(timeInput.value) || 0;

    // Calculate total dust deposition (μg/m²)
    const totalDust = concentration * time; // μg/m²

    // Convert to kg for the area
    const totalDustKg = (totalDust * area * 1000000) / 1000000000; // kg

    // Calculate nutrients (approximate percentages)
    const ironKg = totalDustKg * 0.035; // 3.5% iron
    const phosphorusKg = totalDustKg * 0.008; // 0.8% phosphorus

    // Estimate fertilizer value (rough approximation)
    const fertilizerValueUSD = phosphorusKg * 2.5; // $2.50 per kg of phosphorus

    // Update results
    ironResult.textContent = ironKg.toFixed(2) + ' kg';
    phosphorusResult.textContent = phosphorusKg.toFixed(2) + ' kg';
    fertilizerValue.textContent = '$' + fertilizerValueUSD.toFixed(2);

    // Add animation
    const results = document.getElementById('calculationResults');
    results.style.animation = 'none';
    setTimeout(() => {
      results.style.animation = 'fadeIn 0.5s ease';
    }, 10);
  });
}

// Marine Productivity Simulation
function initMarineSimulation() {
  const ironInput = document.getElementById('ironInput');
  const lightInput = document.getElementById('lightInput');
  const tempInput = document.getElementById('tempInput');

  const ironValue = document.getElementById('ironValue');
  const lightValue = document.getElementById('lightValue');
  const tempValue = document.getElementById('tempValue');

  const primaryProd = document.getElementById('primaryProd');
  const biomass = document.getElementById('biomass');
  const carbonSeq = document.getElementById('carbonSeq');

  function updateSimulation() {
    const iron = parseInt(ironInput.value);
    const light = parseInt(lightInput.value);
    const temp = parseInt(tempInput.value);

    // Update display values
    ironValue.textContent = iron + ' μg/L';
    lightValue.textContent = light + '%';
    tempValue.textContent = temp + '°C';

    // Calculate productivity (simplified model)
    const ironFactor = Math.min(iron / 50, 1); // Max at 50 μg/L
    const lightFactor = light / 100;
    const tempFactor = temp >= 15 && temp <= 25 ? 1 : 0.5; // Optimal range

    const productivity = ironFactor * lightFactor * tempFactor * 1000; // gC/m²/day
    const biomassValue = productivity * 0.1; // mg/L approximation
    const carbonSequestered = productivity * 365 * 0.001; // tons CO₂/year approximation

    primaryProd.textContent = productivity.toFixed(1) + ' gC/m²/day';
    biomass.textContent = biomassValue.toFixed(1) + ' mg/L';
    carbonSeq.textContent = carbonSequestered.toFixed(1) + ' tons CO₂/year';

    // Update visualization
    updatePhytoplanktonVisualization(productivity);
  }

  ironInput.addEventListener('input', updateSimulation);
  lightInput.addEventListener('input', updateSimulation);
  tempInput.addEventListener('input', updateSimulation);

  // Initial calculation
  updateSimulation();
}

function updatePhytoplanktonVisualization(productivity) {
  const container = document.querySelector('.phytoplankton-particles');
  container.innerHTML = '';

  const particleCount = Math.min(Math.floor(productivity / 50), 50);

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'phytoplankton-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 2 + 's';
    particle.style.opacity = 0.6 + Math.random() * 0.4;
    container.appendChild(particle);
  }
}

// Route Cards Interaction
function initRouteCards() {
  const routeCards = document.querySelectorAll('.route-card');

  routeCards.forEach(card => {
    card.addEventListener('click', () => {
      const routeId = card.dataset.route;

      // Highlight the corresponding route on map
      const routeElement = document.getElementById(`route-${routeId}`);
      if (routeElement) {
        // Remove previous highlights
        document.querySelectorAll('#dustMap path').forEach(path => {
          path.setAttribute('stroke-width', '3');
        });

        // Highlight selected route
        routeElement.setAttribute('stroke-width', '5');
        routeElement.setAttribute('opacity', '1');
      }

      // Update card styles
      routeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

// Dust Transport Quiz
function initDustQuiz() {
  const quizData = [
    {
      question: "What is the primary source of intercontinental dust storms that fertilize the Amazon rainforest?",
      options: ["Gobi Desert", "Sahara Desert", "Australian Outback", "Patagonian Desert"],
      correct: 1
    },
    {
      question: "Which essential nutrient is most critical for marine phytoplankton growth and is often limiting in ocean gyres?",
      options: ["Nitrogen", "Phosphorus", "Iron", "Potassium"],
      correct: 2
    },
    {
      question: "Approximately how far can dust from the Sahara Desert travel to reach the Amazon?",
      options: ["1,000 km", "3,000 km", "5,000 km", "8,000 km"],
      correct: 3
    },
    {
      question: "What percentage of phosphorus in Amazon rainforest soils comes from atmospheric dust deposition?",
      options: ["5-10%", "15-25%", "30-40%", "50-60%"],
      correct: 2
    },
    {
      question: "How can dust deposition increase marine productivity?",
      options: ["By blocking sunlight", "By providing iron for photosynthesis", "By increasing water temperature", "By adding salt to the ocean"],
      correct: 1
    },
    {
      question: "Which ocean region benefits most from Asian dust transport?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      correct: 2
    },
    {
      question: "What is the main mineral component of atmospheric dust particles?",
      options: ["Quartz", "Feldspar", "Clay minerals", "All of the above"],
      correct: 3
    },
    {
      question: "How might climate change affect dust transport patterns?",
      options: ["Increase dust storms due to desertification", "Decrease dust storms due to more vegetation", "No significant change", "Redirect dust to different continents"],
      correct: 0
    },
    {
      question: "What is the estimated annual dust transport from Africa to the Americas?",
      options: ["50 million tons", "120 million tons", "240 million tons", "500 million tons"],
      correct: 2
    },
    {
      question: "Which ecosystem relies most heavily on atmospheric dust for soil fertility?",
      options: ["Temperate forests", "Grasslands", "Tropical rainforests", "Remote islands"],
      correct: 3
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
    if (score >= 9) return "Outstanding! You're a dust transport expert!";
    if (score >= 7) return "Great job! You have a solid understanding.";
    if (score >= 5) return "Good effort! Keep learning about dust transport.";
    return "Keep studying! Dust transport is fascinating.";
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
    "Jickells, T. D., et al. (2005). Global iron connections between desert dust, ocean biogeochemistry, and climate.",
    "Mahowald, N. M., et al. (2009). Atmospheric iron deposition: Global distribution, variability, and human perturbations.",
    "Okin, G. S., et al. (2011). Impacts of atmospheric nutrient deposition on marine productivity.",
    "Swap, R., et al. (1992). Saharan dust in the Amazon Basin.",
    "Prospero, J. M. (1999). Long-range transport of mineral dust in the global atmosphere."
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
      <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 20px; padding: 10px 20px; background: var(--dust-orange); border: none; border-radius: 5px; color: white; cursor: pointer;">Close</button>
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

  .phytoplankton-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #27ae60;
    border-radius: 50%;
    animation: float 3s infinite ease-in-out;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .route-card.active {
    border-color: var(--dust-orange);
    background: linear-gradient(135deg, #ffeaa7 0%, #ffecb3 100%);
    transform: scale(1.02);
  }
`;
document.head.appendChild(style);