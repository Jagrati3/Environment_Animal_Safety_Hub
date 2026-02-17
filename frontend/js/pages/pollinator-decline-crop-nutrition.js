// Pollinator Decline and Crop Nutritional Quality - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initNutrientCalculator();
  initCropComparison();
  initNutritionQuiz();
  initScrollAnimations();
});

// Nutrient Deficiency Calculator
function initNutrientCalculator() {
  const cropSelect = document.getElementById('crop-select');
  const pollinationRate = document.getElementById('pollination-rate');
  const pollinationValue = document.getElementById('pollination-value');
  const vitaminCLoss = document.getElementById('vitamin-c-loss');
  const antioxidantLoss = document.getElementById('antioxidant-loss');
  const mineralLoss = document.getElementById('mineral-loss');

  // Crop nutrient data
  const cropData = {
    strawberry: { vitaminC: 0.25, antioxidants: 0.20, minerals: 0.15 },
    tomato: { vitaminC: 0.15, antioxidants: 0.30, minerals: 0.10 },
    apple: { vitaminC: 0.20, antioxidants: 0.25, minerals: 0.12 },
    pepper: { vitaminC: 0.18, antioxidants: 0.15, minerals: 0.08 },
    blueberry: { vitaminC: 0.12, antioxidants: 0.28, minerals: 0.14 }
  };

  function updateCalculator() {
    const selectedCrop = cropSelect.value;
    const rate = parseInt(pollinationRate.value) / 100;
    const data = cropData[selectedCrop];

    // Calculate losses (lower pollination = higher loss)
    const vitaminCLossPercent = Math.round((1 - rate) * data.vitaminC * 100);
    const antioxidantLossPercent = Math.round((1 - rate) * data.antioxidants * 100);
    const mineralLossPercent = Math.round((1 - rate) * data.minerals * 100);

    vitaminCLoss.textContent = `-${vitaminCLossPercent}%`;
    antioxidantLoss.textContent = `-${antioxidantLossPercent}%`;
    mineralLoss.textContent = `-${mineralLossPercent}%`;
  }

  pollinationRate.addEventListener('input', function() {
    pollinationValue.textContent = this.value + '%';
    updateCalculator();
  });

  cropSelect.addEventListener('change', updateCalculator);

  // Initialize
  updateCalculator();
}

// Crop Comparison Tool
function initCropComparison() {
  // This could be enhanced with more dynamic features
  // For now, the static comparison is displayed
  console.log('Crop comparison tool initialized');
}

// Nutrition Quiz
function initNutritionQuiz() {
  const quizOptions = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quiz-feedback');
  const nextButton = document.getElementById('next-question');

  let currentQuestion = 0;
  let score = 0;

  const questions = [
    {
      question: "Which nutrient is most affected by poor pollination in strawberries?",
      options: ["Iron", "Vitamin C", "Protein", "Fiber"],
      correct: 1,
      explanation: "Vitamin C content in strawberries can decrease by 20-30% with poor pollination."
    },
    {
      question: "What powerful antioxidant is significantly reduced in poorly pollinated tomatoes?",
      options: ["Vitamin E", "Lycopene", "Beta-carotene", "Vitamin K"],
      correct: 1,
      explanation: "Lycopene, responsible for tomatoes' red color, is greatly reduced in poorly pollinated fruit."
    },
    {
      question: "Which mineral accumulation is affected by insufficient pollination in leafy greens?",
      options: ["Sodium", "Calcium", "Iron", "Zinc"],
      correct: 1,
      explanation: "Calcium content in leafy vegetables decreases when pollination is inadequate."
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
    feedback.innerHTML = `<p>You got ${score} out of ${questions.length} questions correct!</p><p>This shows how much you know about the nutritional impacts of pollinator decline.</p>`;
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
  const sections = document.querySelectorAll('.overview-section, .tools-section, .education-section, .quiz-section, .cta-section');
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
<parameter name="filePath">c:\Users\Gupta\Downloads\Environment_Animal_Safety_Hub\frontend\js\pages\pollinator-decline-crop-nutrition.js