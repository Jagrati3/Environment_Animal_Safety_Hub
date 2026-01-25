/**
 * Animal First Aid Quiz - Emergency Animal Care Assessment
 *
 * An interactive quiz focused on proper first aid procedures for injured animals.
 * Tests knowledge of emergency response, wound treatment, and when to seek professional help.
 *
 * Extends BaseQuiz for common functionality while providing animal-specific questions and configuration.
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
let animalFirstAidQuiz = null;

async function loadAnimalFirstAidQuiz() {
  try {
    const response = await fetch('../../assets/data/quiz-data.json');
    if (!response.ok) {
      throw new Error('Failed to load quiz data');
    }
    const data = await response.json();
    const quizData = data.quizzes.find(q => q.id === 'animal-first-aid');
    if (!quizData) {
      throw new Error('Animal first aid quiz data not found');
    }

    const quizConfig = {
      questions: quizData.questions,
      timeLimit: quizData.timeLimit,
      progressKey: quizData.progressKey,
      iconClass: quizData.iconClass,
      elements: elements
    };

    animalFirstAidQuiz = new BaseQuiz(quizConfig);

    // Override showResult for custom remarks
    animalFirstAidQuiz.showResult = function() {
      // Call parent method
      BaseQuiz.prototype.showResult.call(this);

      // Custom remarks for animal first aid
      let remark = "";
      if (this.score >= 8) {
        remark = "🌟 Animal Hero!";
      } else if (this.score >= 5) {
        remark = "👍 Good Effort!";
      } else {
        remark = "🐾 Keep Learning!";
      }

      if (this.elements.remarkEl) {
        this.elements.remarkEl.textContent = remark;
      }
    };

    animalFirstAidQuiz.initializeQuiz();
  } catch (error) {
    console.error('Error loading animal first aid quiz:', error);
    alert('Failed to load quiz data. Please try again later.');
  }
}

// Global functions for HTML onclick handlers
window.startQuiz = () => {
  if (animalFirstAidQuiz) animalFirstAidQuiz.startQuiz();
};
window.resumeQuiz = () => {
  if (animalFirstAidQuiz) animalFirstAidQuiz.resumeQuiz();
};
window.nextQuestion = () => {
  if (animalFirstAidQuiz) animalFirstAidQuiz.nextQuestion();
};

// Load quiz on page load
document.addEventListener('DOMContentLoaded', loadAnimalFirstAidQuiz);
