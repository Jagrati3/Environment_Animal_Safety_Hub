// Ecological Risks of Assisted Migration - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initRiskCalculator();
  initEcosystemSimulator();
  initMigrationQuiz();
  initScrollAnimations();
});

// Risk Assessment Calculator
function initRiskCalculator() {
  const speciesType = document.getElementById('species-type');
  const ecosystemSimilarity = document.getElementById('ecosystem-similarity');
  const nativeCompetitors = document.getElementById('native-competitors');
  const similarityValue = document.getElementById('similarity-value');
  const competitionRisk = document.getElementById('competition-risk');
  const invasionRisk = document.getElementById('invasion-risk');
  const disruptionRisk = document.getElementById('disruption-risk');
  const overallRisk = document.getElementById('overall-risk');

  function updateCalculator() {
    const species = speciesType.value;
    const similarity = parseInt(ecosystemSimilarity.value);
    const competitors = nativeCompetitors.value;

    // Calculate risks based on inputs
    let compRisk = 'Low';
    let invRisk = 'Low';
    let disRisk = 'Low';

    // Competition risk increases with more competitors and lower similarity
    if (competitors === 'many' || competitors === 'dominant') {
      compRisk = similarity < 5 ? 'High' : 'Medium';
    } else if (competitors === 'few') {
      compRisk = similarity < 3 ? 'Medium' : 'Low';
    }

    // Invasion risk higher for certain species types and low similarity
    const highRiskSpecies = ['mammal', 'bird', 'fish'];
    if (highRiskSpecies.includes(species) && similarity < 4) {
      invRisk = 'High';
    } else if (similarity < 6) {
      invRisk = 'Medium';
    }

    // Community disruption combines both risks
    if (compRisk === 'High' || invRisk === 'High') {
      disRisk = 'High';
    } else if (compRisk === 'Medium' || invRisk === 'Medium') {
      disRisk = 'Medium';
    }

    // Overall risk is the highest of the three
    let overall = 'Low';
    if (disRisk === 'High' || compRisk === 'High' || invRisk === 'High') {
      overall = 'High';
    } else if (disRisk === 'Medium' || compRisk === 'Medium' || invRisk === 'Medium') {
      overall = 'Medium';
    }

    competitionRisk.textContent = compRisk;
    competitionRisk.className = `risk-level ${compRisk.toLowerCase()}`;

    invasionRisk.textContent = invRisk;
    invasionRisk.className = `risk-level ${invRisk.toLowerCase()}`;

    disruptionRisk.textContent = disRisk;
    disruptionRisk.className = `risk-level ${disRisk.toLowerCase()}`;

    overallRisk.textContent = overall;
    overallRisk.className = `risk-level ${overall.toLowerCase()}`;
  }

  ecosystemSimilarity.addEventListener('input', function() {
    similarityValue.textContent = this.value;
    updateCalculator();
  });

  speciesType.addEventListener('change', updateCalculator);
  nativeCompetitors.addEventListener('change', updateCalculator);

  // Initialize
  updateCalculator();
}

// Ecosystem Disruption Simulator
function initEcosystemSimulator() {
  const introduceBtn = document.getElementById('introduce-species');
  const resetBtn = document.getElementById('reset-simulation');
  const impactDescription = document.getElementById('impact-description');

  const plantCount = document.getElementById('plant-count');
  const nativeHerbCount = document.getElementById('native-herb-count');
  const introHerbCount = document.getElementById('intro-herb-count');
  const carnivoreCount = document.getElementById('carnivore-count');

  let introduced = false;
  let simulationStep = 0;

  const initialState = {
    plants: 100,
    nativeHerbivores: 50,
    introHerbivores: 0,
    carnivores: 25
  };

  function resetSimulation() {
    plantCount.textContent = initialState.plants;
    nativeHerbCount.textContent = initialState.nativeHerbivores;
    introHerbCount.textContent = initialState.introHerbivores;
    carnivoreCount.textContent = initialState.carnivores;
    introduced = false;
    simulationStep = 0;
    impactDescription.textContent = 'Click "Introduce Species" to see how ecosystem balance changes.';
    introduceBtn.disabled = false;
  }

  function introduceSpecies() {
    if (introduced) return;

    introduced = true;
    simulationStep = 1;

    // Introduce 10 individuals of the new herbivore species
    introHerbCount.textContent = '10';
    impactDescription.textContent = 'Introduced species established. Initially, plants remain abundant but competition will increase over time.';

    introduceBtn.disabled = true;

    // Simulate ecological changes over time
    setTimeout(() => {
      simulationStep = 2;
      // Introduced species competes with natives, plants decrease
      plantCount.textContent = '75';
      nativeHerbCount.textContent = '35';
      introHerbCount.textContent = '25';
      impactDescription.textContent = 'Competition intensifies. Native herbivores decline as introduced species outcompetes them. Plant populations decrease from overgrazing.';
    }, 2000);

    setTimeout(() => {
      simulationStep = 3;
      // Trophic cascade: fewer plants mean fewer herbivores, carnivores decline
      plantCount.textContent = '50';
      nativeHerbCount.textContent = '20';
      introHerbCount.textContent = '40';
      carnivoreCount.textContent = '15';
      impactDescription.textContent = 'Trophic cascade effect: Reduced plant biomass leads to herbivore population crash, causing carnivore populations to decline. Introduced species dominates.';
    }, 4000);

    setTimeout(() => {
      simulationStep = 4;
      // Long-term: ecosystem destabilized
      plantCount.textContent = '30';
      nativeHerbCount.textContent = '10';
      introHerbCount.textContent = '55';
      carnivoreCount.textContent = '8';
      impactDescription.textContent = 'Long-term disruption: Native species nearly eliminated. Ecosystem simplified with lower biodiversity. Recovery may take decades.';
    }, 6000);
  }

  introduceBtn.addEventListener('click', introduceSpecies);
  resetBtn.addEventListener('click', resetSimulation);

  // Initialize
  resetSimulation();
}

// Migration Quiz
function initMigrationQuiz() {
  const quizOptions = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quiz-feedback');
  const nextButton = document.getElementById('next-question');

  let currentQuestion = 0;
  let score = 0;

  const questions = [
    {
      question: "What is the primary ecological risk of assisted migration?",
      options: ["Species extinction", "Unintended community disruption", "Climate change acceleration", "Habitat destruction"],
      correct: 1,
      explanation: "Assisted migration can disrupt recipient ecosystems through competition, predation, and other ecological interactions, even when intended to help species survive climate change."
    },
    {
      question: "Which of these is an example of a failed assisted migration?",
      options: ["Edith's Checkerspot Butterfly", "European Starlings in North America", "American Pika", "Coral species transplantation"],
      correct: 1,
      explanation: "European Starlings were introduced to North America and became a destructive invasive species, outcompeting native birds and causing agricultural damage."
    },
    {
      question: "What is 'genetic swamping' in the context of assisted migration?",
      options: ["Overbreeding leading to population collapse", "Dilution of local adaptations through interbreeding", "Complete replacement of native genes", "Loss of genetic diversity"],
      correct: 1,
      explanation: "Genetic swamping occurs when introduced populations interbreed with natives, potentially reducing fitness by mixing locally adapted gene pools with those from different environments."
    }
  ];

  function loadQuestion() {
    if (currentQuestion >= questions.length) {
      showFinalScore();
      return;
    }

    const question = questions[currentQuestion];
    document.querySelector('.quiz-question h3').textContent = `Question ${currentQuestion + 1}: ${question.question}`;

    quizOptions.forEach((option, index) => {
      option.textContent = question.options[index];
      option.classList.remove('correct', 'incorrect');
      option.style.pointerEvents = 'auto';
    });

    feedback.style.display = 'none';
    nextButton.style.display = 'none';
  }

  function showFinalScore() {
    document.querySelector('.quiz-question h3').textContent = `Quiz Complete! Your score: ${score}/${questions.length}`;
    document.querySelector('.quiz-options').style.display = 'none';
    feedback.innerHTML = `<p>You got ${score} out of ${questions.length} questions correct!</p><p>This shows how much you understand about the ecological risks of assisted migration.</p>`;
    feedback.style.display = 'block';
    nextButton.textContent = 'Restart Quiz';
    nextButton.style.display = 'block';
  }

  quizOptions.forEach((option, index) => {
    option.addEventListener('click', function() {
      const question = questions[currentQuestion];
      const isCorrect = index === question.correct;

      // Show correct/incorrect
      quizOptions.forEach((opt, i) => {
        if (i === question.correct) {
          opt.classList.add('correct');
        } else {
          opt.classList.add('incorrect');
        }
        opt.style.pointerEvents = 'none';
      });

      // Show feedback
      feedback.innerHTML = `<p>${isCorrect ? 'Correct!' : 'Incorrect.'} ${question.explanation}</p>`;
      feedback.style.display = 'block';

      if (isCorrect) score++;

      nextButton.style.display = 'block';
    });
  });

  nextButton.addEventListener('click', function() {
    if (currentQuestion >= questions.length) {
      // Restart quiz
      currentQuestion = 0;
      score = 0;
      document.querySelector('.quiz-options').style.display = 'grid';
      nextButton.textContent = 'Next Question';
    } else {
      currentQuestion++;
    }
    loadQuestion();
  });

  // Initialize first question
  loadQuestion();
}

// Scroll animations
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

  // Observe sections
  const sections = document.querySelectorAll('.overview-section, .tools-section, .education-section, .case-studies-section, .quiz-section, .cta-section');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);</content>
<parameter name="filePath">c:\Users\Gupta\Downloads\Environment_Animal_Safety_Hub\frontend\js\pages\ecological-risks-assisted-migration.js