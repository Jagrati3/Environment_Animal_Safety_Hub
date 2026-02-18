// Genetic Erosion - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initScrollAnimations();
  initStatCounters();
  initGeneticSimulator();
  initInbreedingCalculator();
  initGeneticsQuiz();
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
  const sections = document.querySelectorAll('.overview-section, .simulator-section, .calculator-section, .case-studies-section, .strategies-section, .quiz-section, .resources-section');
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
        const isNumber = /^\d+$/.test(text.replace(/,/g, '').replace(/%/g, ''));

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

  let finalValue;
  if (isPercent) {
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
    if (isPercent) {
      displayText = Math.floor(currentValue) + '%';
    } else {
      displayText = Math.floor(currentValue).toLocaleString();
    }

    element.textContent = displayText;
  }, 30);
}

// Genetic Diversity Simulator
function initGeneticSimulator() {
  const populationSize = document.getElementById('populationSize');
  const generations = document.getElementById('generations');
  const isolationLevel = document.getElementById('isolationLevel');
  const runSimulation = document.getElementById('runSimulation');
  const resetSimulation = document.getElementById('resetSimulation');

  const popSizeValue = document.getElementById('popSizeValue');
  const genValue = document.getElementById('genValue');
  const isoValue = document.getElementById('isoValue');

  const finalHeterozygosity = document.getElementById('finalHeterozygosity');
  const allelesLost = document.getElementById('allelesLost');
  const inbreedingRisk = document.getElementById('inbreedingRisk');

  let simulationData = [];
  let chartCanvas = null;

  // Update display values
  function updateValues() {
    popSizeValue.textContent = populationSize.value + ' individuals';
    genValue.textContent = generations.value + ' generations';
    isoValue.textContent = isolationLevel.value + '% isolated';
  }

  populationSize.addEventListener('input', updateValues);
  generations.addEventListener('input', updateValues);
  isolationLevel.addEventListener('input', updateValues);

  updateValues();

  runSimulation.addEventListener('click', () => {
    const popSize = parseInt(populationSize.value);
    const numGenerations = parseInt(generations.value);
    const isolation = parseInt(isolationLevel.value) / 100;

    simulationData = runGeneticSimulation(popSize, numGenerations, isolation);
    displaySimulationResults(simulationData);
    drawDiversityChart(simulationData);
  });

  resetSimulation.addEventListener('click', () => {
    simulationData = [];
    finalHeterozygosity.textContent = '--';
    allelesLost.textContent = '--';
    inbreedingRisk.textContent = '--';

    const chartContainer = document.getElementById('diversityChart');
    chartContainer.innerHTML = `
      <div class="chart-placeholder">
        <i class="fas fa-chart-area"></i>
        <p>Click "Run Simulation" to see genetic diversity changes over time</p>
      </div>
    `;
  });
}

function runGeneticSimulation(initialPop, generations, isolation) {
  const data = [];
  let currentHeterozygosity = 0.5; // Starting heterozygosity
  let allelesRemaining = 100; // Starting number of alleles

  for (let gen = 0; gen <= generations; gen++) {
    data.push({
      generation: gen,
      heterozygosity: currentHeterozygosity,
      alleles: allelesRemaining,
      inbreeding: 1 - currentHeterozygosity
    });

    // Simulate genetic erosion
    const driftEffect = 1 / (2 * initialPop * (1 - isolation));
    const erosionRate = Math.sqrt(driftEffect);

    currentHeterozygosity *= (1 - erosionRate * 0.1);
    currentHeterozygosity = Math.max(currentHeterozygosity, 0.01);

    allelesRemaining *= (1 - erosionRate * 0.05);
    allelesRemaining = Math.max(allelesRemaining, 1);
  }

  return data;
}

function displaySimulationResults(data) {
  const finalData = data[data.length - 1];

  document.getElementById('finalHeterozygosity').textContent = finalData.heterozygosity.toFixed(3);
  document.getElementById('allelesLost').textContent = Math.round(100 - finalData.alleles);
  document.getElementById('inbreedingRisk').textContent = (finalData.inbreeding * 100).toFixed(1) + '%';
}

function drawDiversityChart(data) {
  const chartContainer = document.getElementById('diversityChart');
  chartContainer.innerHTML = '';

  const canvas = document.createElement('canvas');
  canvas.width = chartContainer.offsetWidth;
  canvas.height = chartContainer.offsetHeight;
  chartContainer.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  // Chart dimensions
  const padding = 40;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;

  // Draw axes
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  // Draw grid lines
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 10; i++) {
    const x = padding + (chartWidth * i) / 10;
    const y = padding + (chartHeight * i) / 10;

    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, canvas.height - padding);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(canvas.width - padding, y);
    ctx.stroke();
  }

  // Draw heterozygosity line
  ctx.strokeStyle = '#8e44ad';
  ctx.lineWidth = 3;
  ctx.beginPath();

  data.forEach((point, index) => {
    const x = padding + (chartWidth * index) / data.length;
    const y = padding + chartHeight - (chartHeight * point.heterozygosity);

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();

  // Add labels
  ctx.fillStyle = '#333';
  ctx.font = '12px Poppins';
  ctx.fillText('Generations', canvas.width / 2, canvas.height - 10);
  ctx.save();
  ctx.translate(15, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Heterozygosity', 0, 0);
  ctx.restore();
}

// Inbreeding Calculator
function initInbreedingCalculator() {
  const totalPopulation = document.getElementById('totalPopulation');
  const breedingPopulation = document.getElementById('breedingPopulation');
  const generationsIsolated = document.getElementById('generationsIsolated');
  const relationshipType = document.getElementById('relationshipType');
  const calculateBtn = document.getElementById('calculateInbreeding');

  const inbreedingCoefficient = document.getElementById('inbreedingCoefficient');
  const inbreedingInterpretation = document.getElementById('inbreedingInterpretation');

  const survivalBar = document.getElementById('survivalBar');
  const reproductionBar = document.getElementById('reproductionBar');
  const diseaseBar = document.getElementById('diseaseBar');

  const survivalPercent = document.getElementById('survivalPercent');
  const reproductionPercent = document.getElementById('reproductionPercent');
  const diseasePercent = document.getElementById('diseasePercent');

  calculateBtn.addEventListener('click', () => {
    const N = parseInt(totalPopulation.value);
    const Ne = parseInt(breedingPopulation.value);
    const t = parseInt(generationsIsolated.value);
    const relationship = relationshipType.value;

    // Calculate inbreeding coefficient
    let F_relationship = 0;
    switch (relationship) {
      case 'parent-offspring':
        F_relationship = 0.25;
        break;
      case 'full-siblings':
        F_relationship = 0.25;
        break;
      case 'half-siblings':
        F_relationship = 0.125;
        break;
      case 'first-cousins':
        F_relationship = 0.0625;
        break;
      case 'second-cousins':
        F_relationship = 0.015625;
        break;
    }

    // Calculate population inbreeding
    const F_population = 1 - Math.pow(1 - 1/(2*Ne), t);
    const F_total = Math.min(F_relationship + F_population, 1);

    // Display results
    inbreedingCoefficient.textContent = F_total.toFixed(4);

    let interpretation = '';
    if (F_total < 0.05) {
      interpretation = 'Low inbreeding - minimal genetic concerns';
    } else if (F_total < 0.15) {
      interpretation = 'Moderate inbreeding - monitor for effects';
    } else if (F_total < 0.25) {
      interpretation = 'High inbreeding - significant fitness reduction expected';
    } else {
      interpretation = 'Extreme inbreeding - severe genetic problems likely';
    }

    inbreedingInterpretation.textContent = interpretation;

    // Calculate fitness effects (simplified)
    const fitnessReduction = F_total * 0.5; // Approximate inbreeding depression

    const survivalRate = Math.max(0, 100 - fitnessReduction * 40);
    const reproductionRate = Math.max(0, 100 - fitnessReduction * 60);
    const diseaseResistance = Math.max(0, 100 - fitnessReduction * 30);

    // Update bars with animation
    animateBar(survivalBar, survivalRate);
    animateBar(reproductionBar, reproductionRate);
    animateBar(diseaseBar, diseaseResistance);

    survivalPercent.textContent = survivalRate.toFixed(1) + '%';
    reproductionPercent.textContent = reproductionRate.toFixed(1) + '%';
    diseasePercent.textContent = diseaseResistance.toFixed(1) + '%';
  });
}

function animateBar(bar, targetWidth) {
  bar.style.width = '0%';
  setTimeout(() => {
    bar.style.width = targetWidth + '%';
  }, 100);
}

// Genetics Quiz
function initGeneticsQuiz() {
  const quizData = [
    {
      question: "What is the primary mechanism causing genetic erosion in small populations?",
      options: ["Natural Selection", "Genetic Drift", "Gene Flow", "Mutation"],
      correct: 1
    },
    {
      question: "What is the minimum effective population size needed to maintain genetic diversity?",
      options: ["50 individuals", "500 individuals", "1000 individuals", "5000 individuals"],
      correct: 2
    },
    {
      question: "Which of the following is a consequence of inbreeding depression?",
      options: ["Increased genetic diversity", "Reduced fitness and survival", "Enhanced disease resistance", "Improved reproductive success"],
      correct: 1
    },
    {
      question: "What does heterozygosity measure in a population?",
      options: ["Number of different alleles", "Proportion of heterozygous individuals", "Rate of genetic drift", "Level of inbreeding"],
      correct: 1
    },
    {
      question: "Which conservation strategy helps prevent genetic erosion?",
      options: ["Population isolation", "Habitat corridors", "Population reduction", "Genetic purging"],
      correct: 1
    },
    {
      question: "What is the '50/500' rule in conservation genetics?",
      options: ["50% heterozygosity needed for 500 years", "50 individuals for short-term, 500 for long-term survival", "500 alleles needed for 50 generations", "50% gene flow required for 500 populations"],
      correct: 1
    },
    {
      question: "Which species suffered severe inbreeding depression before genetic rescue?",
      options: ["African Elephant", "Florida Panther", "Giant Panda", "Snow Leopard"],
      correct: 1
    },
    {
      question: "What is the main benefit of genetic rescue in small populations?",
      options: ["Reducing population size", "Increasing genetic diversity", "Eliminating harmful mutations", "Preventing natural selection"],
      correct: 1
    },
    {
      question: "Which factor does NOT contribute to genetic erosion?",
      options: ["Small population size", "Geographic isolation", "High gene flow", "Bottleneck events"],
      correct: 2
    },
    {
      question: "What is the effective population size (Ne) compared to census size (N)?",
      options: ["Always equal to N", "Usually smaller than N", "Always larger than N", "Not related to N"],
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
    if (score >= 9) return "Outstanding! You're a conservation genetics expert!";
    if (score >= 7) return "Excellent! You have strong knowledge of genetic erosion.";
    if (score >= 5) return "Good job! Keep learning about population genetics.";
    return "Keep studying! Genetic conservation is fascinating.";
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
`;
document.head.appendChild(style);