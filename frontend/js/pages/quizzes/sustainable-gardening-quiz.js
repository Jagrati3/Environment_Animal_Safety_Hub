/**
 * Sustainable Gardening Quiz
 *
 * An interactive quiz focused on sustainable gardening practices and environmental awareness.
 * Features randomized questions and customizable time limits.
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
let sustainableGardeningQuiz = null;

async function loadSustainableGardeningQuiz() {
  try {
    const response = await fetch('../../assets/data/quiz-data.json');
    if (!response.ok) {
      throw new Error('Failed to load quiz data');
    }
    const data = await response.json();
    const quizData = data.quizzes.find(q => q.id === 'sustainable-gardening');
    if (!quizData) {
      throw new Error('Sustainable gardening quiz data not found');
    }

    // Randomize and select 7 questions for the quiz
    const questions = [...quizData.questions].sort(() => 0.5 - Math.random()).slice(0, 7);

    const quizConfig = {
      questions: questions,
      timeLimit: quizData.timeLimit,
      progressKey: quizData.progressKey,
      iconClass: quizData.iconClass,
      elements: elements
    };

    sustainableGardeningQuiz = new BaseQuiz(quizConfig);

    // Override startQuiz to handle time selection
    sustainableGardeningQuiz.startQuiz = function() {
      // Check for custom time selection
      const timeSelect = document.getElementById('timeSelect');
      if (timeSelect) {
        this.timeLimit = parseInt(timeSelect.value);
      }

      // Call parent method
      BaseQuiz.prototype.startQuiz.call(this);
    };

    // Override showResult for custom remarks
    sustainableGardeningQuiz.showResult = function() {
      // Call parent method
      BaseQuiz.prototype.showResult.call(this);

      // Custom remarks for sustainable gardening
      let remark = "";
      if (this.score >= 6) {
        remark = "🌟 Sustainable Gardening Expert!";
      } else if (this.score >= 4) {
        remark = "👍 Good Job!";
      } else {
        remark = "🌱 Keep Learning!";
      }

      if (this.config.elements.remarkEl) {
        this.config.elements.remarkEl.textContent = remark;
      }
    };

    sustainableGardeningQuiz.initializeQuiz();
  } catch (error) {
    console.error('Error loading sustainable gardening quiz:', error);
    alert('Failed to load quiz data. Please try again later.');
  }
}

// Global functions for HTML onclick handlers
window.startQuiz = () => {
  if (sustainableGardeningQuiz) sustainableGardeningQuiz.startQuiz();
};
window.resumeQuiz = () => {
  if (sustainableGardeningQuiz) sustainableGardeningQuiz.resumeQuiz();
};
window.nextQuestion = () => {
  if (sustainableGardeningQuiz) sustainableGardeningQuiz.nextQuestion();
};

// Load quiz on page load
document.addEventListener('DOMContentLoaded', loadSustainableGardeningQuiz);
