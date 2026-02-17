// Decline of Native Pollinators from Pathogen Spillover - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initTransmissionNetwork();
  initPathogenCards();
  initPopulationSimulator();
  initEconomicCalculator();
  initPollinatorQuiz();
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
  const sections = document.querySelectorAll('.overview-section, .transmission-section, .pathogen-section, .simulator-section, .mitigation-section, .economic-section, .quiz-section, .resources-section');
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
        const isNumber = /^\d+$/.test(text.replace(/,/g, '').replace(/%/g, '').replace(/\$/g, '').replace(/B/g, ''));

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
  const isPercent = finalText.includes('%');
  const isDollar = finalText.includes('$');
  const isBillion = finalText.includes('B');

  let finalValue;
  if (isPercent) {
    finalValue = parseInt(finalText.replace('%', ''));
  } else if (isDollar) {
    finalValue = parseInt(finalText.replace(/[$,B]/g, ''));
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
    if (isPercent) {
      displayText = Math.floor(currentValue) + '%';
    } else if (isDollar) {
      if (isBillion) {
        displayText = '$' + Math.floor(currentValue).toLocaleString() + 'B';
      } else {
        displayText = '$' + Math.floor(currentValue).toLocaleString();
      }
    } else {
      displayText = Math.floor(currentValue).toLocaleString();
    }

    element.textContent = displayText;
  }, 30);
}

// Interactive Transmission Network
function initTransmissionNetwork() {
  const networkContainer = document.getElementById('transmissionNetwork');
  const showManaged = document.getElementById('showManagedBees');
  const showWild = document.getElementById('showWildBees');
  const showTransmission = document.getElementById('showTransmission');
  const animateSpread = document.getElementById('animateSpread');

  let managedVisible = true;
  let wildVisible = false;
  let transmissionVisible = false;
  let animationPlaying = false;

  // Create SVG network visualization
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", "0 0 600 300");

  // Add background
  const background = document.createElementNS(svgNS, "rect");
  background.setAttribute("width", "100%");
  background.setAttribute("height", "100%");
  background.setAttribute("fill", "#e8f5e8");
  svg.appendChild(background);

  // Add managed bee colonies
  const managedColonies = [
    { x: 100, y: 100, id: "colony1" },
    { x: 150, y: 150, id: "colony2" },
    { x: 80, y: 200, id: "colony3" }
  ];

  managedColonies.forEach(colony => {
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", colony.x);
    circle.setAttribute("cy", colony.y);
    circle.setAttribute("r", "15");
    circle.setAttribute("fill", "#f39c12");
    circle.setAttribute("stroke", "#e67e22");
    circle.setAttribute("stroke-width", "2");
    circle.setAttribute("id", `managed-${colony.id}`);
    svg.appendChild(circle);

    // Add label
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", colony.x);
    text.setAttribute("y", colony.y + 25);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "10");
    text.setAttribute("fill", "#2c3e50");
    text.textContent = "Apiary";
    svg.appendChild(text);
  });

  // Add wild bee populations
  const wildPopulations = [
    { x: 400, y: 80, id: "bumblebees" },
    { x: 450, y: 150, id: "solitary" },
    { x: 380, y: 220, id: "butterflies" }
  ];

  wildPopulations.forEach(pop => {
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", pop.x);
    circle.setAttribute("cy", pop.y);
    circle.setAttribute("r", "12");
    circle.setAttribute("fill", "#27ae60");
    circle.setAttribute("stroke", "#229954");
    circle.setAttribute("stroke-width", "2");
    circle.setAttribute("opacity", "0");
    circle.setAttribute("id", `wild-${pop.id}`);
    svg.appendChild(circle);

    // Add label
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", pop.x);
    text.setAttribute("y", pop.y + 20);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "9");
    text.setAttribute("fill", "#2c3e50");
    text.setAttribute("opacity", "0");
    text.setAttribute("id", `wild-label-${pop.id}`);
    text.textContent = pop.id.charAt(0).toUpperCase() + pop.id.slice(1);
    svg.appendChild(text);
  });

  // Add transmission routes
  const routes = [
    { from: { x: 100, y: 100 }, to: { x: 400, y: 80 }, id: "route1" },
    { from: { x: 150, y: 150 }, to: { x: 450, y: 150 }, id: "route2" },
    { from: { x: 80, y: 200 }, to: { x: 380, y: 220 }, id: "route3" }
  ];

  routes.forEach(route => {
    const path = document.createElementNS(svgNS, "path");
    const pathData = `M ${route.from.x} ${route.from.y} Q ${(route.from.x + route.to.x) / 2} ${(route.from.y + route.to.y) / 2 - 30} ${route.to.x} ${route.to.y}`;
    path.setAttribute("d", pathData);
    path.setAttribute("stroke", "#e74c3c");
    path.setAttribute("stroke-width", "3");
    path.setAttribute("fill", "none");
    path.setAttribute("opacity", "0");
    path.setAttribute("stroke-dasharray", "8,4");
    path.setAttribute("id", `transmission-${route.id}`);
    svg.appendChild(path);
  });

  networkContainer.appendChild(svg);

  // Control functions
  showManaged.addEventListener('click', () => {
    managedVisible = !managedVisible;
    managedColonies.forEach(colony => {
      const element = document.getElementById(`managed-${colony.id}`);
      element.setAttribute("opacity", managedVisible ? "1" : "0.3");
    });
    updateButtonState(showManaged, managedVisible);
  });

  showWild.addEventListener('click', () => {
    wildVisible = !wildVisible;
    wildPopulations.forEach(pop => {
      document.getElementById(`wild-${pop.id}`).setAttribute("opacity", wildVisible ? "1" : "0");
      document.getElementById(`wild-label-${pop.id}`).setAttribute("opacity", wildVisible ? "1" : "0");
    });
    updateButtonState(showWild, wildVisible);
  });

  showTransmission.addEventListener('click', () => {
    transmissionVisible = !transmissionVisible;
    routes.forEach(route => {
      document.getElementById(`transmission-${route.id}`).setAttribute("opacity", transmissionVisible ? "1" : "0");
    });
    updateButtonState(showTransmission, transmissionVisible);
  });

  animateSpread.addEventListener('click', () => {
    if (animationPlaying) return;

    animationPlaying = true;
    animateSpread.textContent = 'Animating...';
    animateSpread.disabled = true;

    // Show all elements
    showManaged.click();
    showWild.click();
    showTransmission.click();

    // Animate pathogen spread
    animatePathogenSpread();

    setTimeout(() => {
      animationPlaying = false;
      animateSpread.innerHTML = '<i class="fas fa-play"></i> Animate Spread';
      animateSpread.disabled = false;
    }, 4000);
  });

  function updateButtonState(button, active) {
    if (active) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  }
}

function animatePathogenSpread() {
  const svg = document.querySelector('#transmissionNetwork svg');
  const particles = [];

  // Create animated particles along transmission routes
  for (let i = 0; i < 8; i++) {
    const particle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    particle.setAttribute("r", "3");
    particle.setAttribute("fill", "#e74c3c");
    particle.setAttribute("opacity", "0.8");

    // Start at managed colonies
    const startX = 80 + Math.random() * 80;
    const startY = 100 + Math.random() * 120;
    particle.setAttribute("cx", startX);
    particle.setAttribute("cy", startY);

    svg.appendChild(particle);
    particles.push(particle);
  }

  // Animate particles moving to wild populations
  particles.forEach((particle, index) => {
    const endX = 380 + Math.random() * 80;
    const endY = 80 + Math.random() * 160;

    particle.animate([
      { cx: particle.getAttribute("cx"), cy: particle.getAttribute("cy") },
      { cx: endX, cy: endY }
    ], {
      duration: 2500 + Math.random() * 1000,
      delay: index * 200,
      easing: 'ease-in-out'
    });

    setTimeout(() => {
      particle.remove();
    }, 3500);
  });
}

// Pathogen Cards Interaction
function initPathogenCards() {
  const pathogenCards = document.querySelectorAll('.pathogen-card');
  const detailView = document.getElementById('pathogenDetailView');

  const pathogenDetails = {
    varroa: {
      title: "Varroa Destructor Mite",
      description: "An external parasitic mite that feeds on bee hemolymph (blood). Originally from Asia, it has spread globally and is considered one of the most damaging pests to honeybee colonies.",
      symptoms: "Reduced colony strength, deformed wings in emerging bees, increased susceptibility to viruses",
      transmission: "Direct contact between bees, drifting, robbing, shared equipment",
      impact: "Vectors over 20 viruses, can cause colony collapse within 2-3 years if untreated"
    },
    nosema: {
      title: "Nosema Parasites",
      description: "Microsporidian parasites that infect bee intestines. Two main species affect honeybees: Nosema apis and Nosema ceranae.",
      symptoms: "Dysentery, reduced foraging activity, shortened lifespan, colony weakening",
      transmission: "Fecal contamination of food stores, shared water sources, trophallaxis",
      impact: "Reduces colony productivity by 20-50%, increases winter mortality"
    },
    dvw: {
      title: "Deformed Wing Virus",
      description: "A RNA virus that causes physical deformities in honeybees. Often asymptomatic until Varroa mite infestation stresses the colony.",
      symptoms: "Crippled wings, shortened abdomens, discoloration, trembling",
      transmission: "Primarily through Varroa mites, also direct contact and food sharing",
      impact: "Can kill up to 90% of infected bees, major contributor to colony losses"
    },
    afv: {
      title: "Acute Bee Paralysis Virus",
      description: "A RNA virus that affects the nervous system of honeybees, causing paralysis and death.",
      symptoms: "Trembling, flightlessness, paralysis, dark discoloration",
      transmission: "Direct contact, contaminated food, Varroa mite vectors",
      impact: "Rapidly fatal, can spread through entire apiary within weeks"
    }
  };

  pathogenCards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove active class from all cards
      pathogenCards.forEach(c => c.classList.remove('active'));
      // Add active class to clicked card
      card.classList.add('active');

      const pathogenId = card.dataset.pathogen;
      const details = pathogenDetails[pathogenId];

      detailView.innerHTML = `
        <h4>${details.title}</h4>
        <p><strong>Description:</strong> ${details.description}</p>
        <p><strong>Symptoms:</strong> ${details.symptoms}</p>
        <p><strong>Transmission:</strong> ${details.transmission}</p>
        <p><strong>Ecological Impact:</strong> ${details.impact}</p>
      `;
    });
  });
}

// Population Impact Simulator
function initPopulationSimulator() {
  const pathogenLoadInput = document.getElementById('pathogenLoad');
  const transmissionRateInput = document.getElementById('transmissionRate');
  const colonyDensityInput = document.getElementById('colonyDensity');
  const resistanceLevelInput = document.getElementById('resistanceLevel');

  const pathogenValue = document.getElementById('pathogenValue');
  const transmissionValue = document.getElementById('transmissionValue');
  const densityValue = document.getElementById('densityValue');
  const resistanceValue = document.getElementById('resistanceValue');

  const declineRate = document.getElementById('declineRate');
  const timeToDecline = document.getElementById('timeToDecline');
  const ecosystemImpact = document.getElementById('ecosystemImpact');

  let populationData = [];
  let chart = null;

  function updateSimulator() {
    const pathogenLoad = parseInt(pathogenLoadInput.value);
    const transmissionRate = parseInt(transmissionRateInput.value);
    const colonyDensity = parseInt(colonyDensityInput.value);
    const resistanceLevel = parseInt(resistanceLevelInput.value);

    // Update display values
    pathogenValue.textContent = pathogenLoad + '%';
    transmissionValue.textContent = transmissionRate + '%';
    densityValue.textContent = colonyDensity + ' colonies/km²';
    resistanceValue.textContent = resistanceLevel + '%';

    // Calculate population dynamics
    simulatePopulation(pathogenLoad, transmissionRate, colonyDensity, resistanceLevel);
    updateChart();
  }

  function simulatePopulation(pathogenLoad, transmissionRate, colonyDensity, resistanceLevel) {
    populationData = [];
    let population = 100; // Starting population (100%)

    // Calculate infection probability
    const infectionProb = (pathogenLoad / 100) * (transmissionRate / 100) * (colonyDensity / 10);
    const resistanceFactor = resistanceLevel / 100;

    for (let year = 0; year <= 10; year++) {
      populationData.push({ year, population: Math.max(0, population) });

      // Population decline model
      const declineRate = infectionProb * (1 - resistanceFactor) * 0.15; // 15% max annual decline
      population *= (1 - declineRate);

      if (population < 1) break;
    }
  }

  function updateChart() {
    const ctx = document.getElementById('populationCanvas').getContext('2d');

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: populationData.map(d => `Year ${d.year}`),
        datasets: [{
          label: 'Population (%)',
          data: populationData.map(d => d.population),
          borderColor: '#f39c12',
          backgroundColor: 'rgba(243, 156, 18, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Population (%)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time (Years)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    // Update metrics
    const finalPopulation = populationData[populationData.length - 1].population;
    const decline = 100 - finalPopulation;
    declineRate.textContent = decline.toFixed(1) + '%';

    // Calculate time to 50% decline
    const time50 = populationData.findIndex(d => d.population <= 50);
    timeToDecline.textContent = time50 >= 0 ? time50 + ' years' : '∞';

    // Determine ecosystem impact
    let impact = 'Low';
    if (decline > 70) impact = 'Severe';
    else if (decline > 50) impact = 'High';
    else if (decline > 30) impact = 'Moderate';

    ecosystemImpact.textContent = impact;
    ecosystemImpact.style.color = impact === 'Severe' ? '#e74c3c' :
                                  impact === 'High' ? '#e67e22' :
                                  impact === 'Moderate' ? '#f39c12' : '#27ae60';
  }

  // Event listeners
  pathogenLoadInput.addEventListener('input', updateSimulator);
  transmissionRateInput.addEventListener('input', updateSimulator);
  colonyDensityInput.addEventListener('input', updateSimulator);
  resistanceLevelInput.addEventListener('input', updateSimulator);

  // Initial simulation
  updateSimulator();
}

// Economic Impact Calculator
function initEconomicCalculator() {
  const calculateBtn = document.getElementById('calculateEconomicImpact');
  const cropArea = document.getElementById('cropArea');
  const pollinatorDependence = document.getElementById('pollinatorDependence');
  const yieldLoss = document.getElementById('yieldLoss');
  const cropValue = document.getElementById('cropValue');
  const wildPollination = document.getElementById('wildPollination');
  const biodiversityValue = document.getElementById('biodiversityValue');

  const agriculturalLoss = document.getElementById('agriculturalLoss');
  const ecosystemLoss = document.getElementById('ecosystemLoss');
  const totalCost = document.getElementById('totalCost');
  const preventionValue = document.getElementById('preventionValue');

  calculateBtn.addEventListener('click', () => {
    const area = parseFloat(cropArea.value) || 0;
    const dependence = parseFloat(pollinatorDependence.value) / 100 || 0;
    const loss = parseFloat(yieldLoss.value) / 100 || 0;
    const value = parseFloat(cropValue.value) || 0;
    const wild = parseFloat(wildPollination.value) / 100 || 0;
    const biodiversity = parseFloat(biodiversityValue.value) || 0;

    // Calculate agricultural losses
    const totalYieldValue = area * value;
    const pollinatorYieldValue = totalYieldValue * dependence;
    const lostYieldValue = pollinatorYieldValue * loss;
    const wildLostYieldValue = lostYieldValue * wild;

    // Calculate ecosystem service losses
    const ecosystemServiceLoss = biodiversity * loss;

    // Total costs
    const totalAnnualCost = wildLostYieldValue + ecosystemServiceLoss;

    // Prevention value (rough estimate: 20% of total cost for effective biosecurity)
    const preventionCost = totalAnnualCost * 0.2;

    // Update results
    agriculturalLoss.textContent = '$' + wildLostYieldValue.toLocaleString();
    ecosystemLoss.textContent = '$' + ecosystemServiceLoss.toLocaleString();
    totalCost.textContent = '$' + totalAnnualCost.toLocaleString();
    preventionValue.textContent = '$' + preventionCost.toLocaleString() + ' (est. annual cost)';
  });
}

// Pollinator Conservation Quiz
function initPollinatorQuiz() {
  const quizData = [
    {
      question: "Which pathogen is primarily responsible for spreading viruses among honeybee colonies?",
      options: ["Nosema parasites", "Varroa destructor mite", "Chalkbrood fungus", "American foulbrood bacteria"],
      correct: 1
    },
    {
      question: "What is the main transmission route for pathogens from managed bees to wild pollinators?",
      options: ["Direct stinging", "Shared hibernation sites", "Competition for nesting sites", "Shared floral resources"],
      correct: 3
    },
    {
      question: "Which wild pollinator group is most susceptible to Nosema infections?",
      options: ["Butterflies", "Bumblebees", "Hoverflies", "Birds"],
      correct: 1
    },
    {
      question: "What percentage of global crop production depends on animal pollination?",
      options: ["10-15%", "25-30%", "35-40%", "75-80%"],
      correct: 3
    },
    {
      question: "Which management practice can help prevent pathogen spillover?",
      options: ["Increasing colony density", "Regular equipment sterilization", "Reducing floral diversity", "Extending foraging seasons"],
      correct: 1
    },
    {
      question: "What is the primary ecological consequence of pollinator declines?",
      options: ["Increased soil erosion", "Reduced plant reproduction", "Enhanced pest control", "Improved water quality"],
      correct: 1
    },
    {
      question: "Which continent has seen the most severe bumblebee population declines due to pathogens?",
      options: ["Africa", "Asia", "Europe", "North America"],
      correct: 3
    },
    {
      question: "What is 'integrated pest management' in beekeeping?",
      options: ["Using only chemical treatments", "Combining multiple control methods", "Removing all colonies annually", "Breeding resistant bees only"],
      correct: 1
    },
    {
      question: "How can habitat corridors help prevent pathogen spillover?",
      options: ["By concentrating bee populations", "By separating managed and wild bees", "By increasing floral resources", "By reducing genetic diversity"],
      correct: 1
    },
    {
      question: "What is the estimated annual economic value of insect pollination worldwide?",
      options: ["$50 billion", "$153 billion", "$235 billion", "$500 billion"],
      correct: 2
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
    if (score >= 9) return "Outstanding! You're a pollinator conservation expert!";
    if (score >= 7) return "Great job! You have strong knowledge of pathogen spillover.";
    if (score >= 5) return "Good effort! Keep learning about pollinator health.";
    return "Keep studying! Pollinator conservation is crucial.";
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

  .pathogen-card.active {
    border-color: #e74c3c;
    background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
    transform: scale(1.02);
  }
`;
document.head.appendChild(style);