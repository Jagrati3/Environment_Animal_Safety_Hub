/**
 * Climate Change Quiz
 *
 * An interactive quiz focused on climate change awareness and environmental impact.
 *
 * Now extends BaseQuiz for unified progress tracking.
 *
 * @author Environment Animal Safety Hub Team
 * @version 2.0.0
 * @since 2024
 */

// DOM elements
const elements = {
  startScreen: document.getElementById('startScreen'),
  quizScreen: document.getElementById('quizScreen'),
  resultScreen: document.getElementById('resultScreen'),
  questionEl: document.getElementById('question'),
  optionsEl: document.getElementById('options'),
  timeEl: document.getElementById('time'),
  scoreEl: document.getElementById('score'),
  remarkEl: document.getElementById('remark')
};

// Load quiz data and create instance
let climateChangeQuiz = null;

async function loadClimateChangeQuiz() {
  try {
    const response = await fetch('../../assets/data/quiz-data.json');
    if (!response.ok) {
      throw new Error('Failed to load quiz data');
    }
    const data = await response.json();
    const quizData = data.quizzes.find(q => q.id === 'climate-change');
    if (!quizData) {
      throw new Error('Climate change quiz data not found');
    }

    const quizConfig = {
      questions: quizData.questions,
      timeLimit: quizData.timeLimit,
      progressKey: quizData.progressKey,
      iconClass: quizData.iconClass,
      elements: elements
    };

    climateChangeQuiz = new BaseQuiz(quizConfig);

    // Override startQuiz to handle time selection
    climateChangeQuiz.startQuiz = function() {
      // Check for custom time selection
      const timeSelect = document.getElementById('timeSelect');
      if (timeSelect) {
        this.timeLimit = parseInt(timeSelect.value);
      }

      // Call parent method
      BaseQuiz.prototype.startQuiz.call(this);
    };

    // Override showResult for custom remarks
    climateChangeQuiz.showResult = function() {
      // Call parent method
      BaseQuiz.prototype.showResult.call(this);

      // Custom remarks for climate change
      let remark = "";
      if (this.score >= 8) {
        remark = "🌟 Climate Champion!";
      } else if (this.score >= 5) {
        remark = "👍 Good effort!";
      } else {
        remark = "🌱 Keep learning!";
      }

      if (this.config.elements.remarkEl) {
        this.config.elements.remarkEl.textContent = remark;
      }
    };

    climateChangeQuiz.initializeQuiz();

    // Add event listeners for quiz interactions
    setupEventListeners();
  } catch (error) {
    console.error('Error loading climate change quiz:', error);
    alert('Failed to load quiz data. Please try again later.');
  }
}

// Setup event listeners
function setupEventListeners() {
  // Start quiz button
  const startBtn = document.getElementById('startQuizBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => climateChangeQuiz.startQuiz());
  }

  // Resume quiz button
  const resumeBtn = document.getElementById('resumeQuizBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => climateChangeQuiz.resumeQuiz());
  }

  // Next question button
  const nextBtn = document.getElementById('nextQuestionBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => climateChangeQuiz.nextQuestion());
  }

  // Play again button
  const playAgainBtn = document.getElementById('playAgainBtn');
  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => location.reload());
  }

  // Back button
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => window.location.href = '../games/kids-zone.html');
  }
}

// Load quiz on page load
document.addEventListener('DOMContentLoaded', loadClimateChangeQuiz);
