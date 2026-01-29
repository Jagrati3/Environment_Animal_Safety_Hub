/**
 * QuizLoader Class - Generic Quiz Loading and Initialization
 *
 * Handles common quiz functionality including DOM element selection,
 * async data loading, event listener setup, and quiz initialization.
 * Eliminates code duplication across individual quiz files.
 *
 * @author Environment Animal Safety Hub Team
 * @version 1.0.0
 * @since 2024
 */

class QuizLoader {
  /**
   * Create a new QuizLoader instance
   * @param {string} quizId - The ID of the quiz to load
   * @param {Object} options - Optional configuration overrides
   */
  constructor(quizId, options = {}) {
    this.quizId = quizId;
    this.options = {
      dataPath: '../../assets/data/quiz-data.json',
      backUrl: '../games/kids-zone.html',
      customElements: {},
      customOverrides: {},
      ...options
    };

    this.quiz = null;
    this.elements = this.getDefaultElements();
  }

  /**
   * Get default DOM elements for quiz
   * @returns {Object} Default element references
   */
  getDefaultElements() {
    return {
      startScreen: document.getElementById('startScreen'),
      quizScreen: document.getElementById('quizScreen'),
      resultScreen: document.getElementById('resultScreen'),
      questionEl: document.getElementById('question'),
      optionsEl: document.getElementById('options'),
      timeEl: document.getElementById('time'),
      scoreEl: document.getElementById('score'),
      remarkEl: document.getElementById('remark'),
      progressText: document.querySelector('.progress-metrics span:first-child'),
      progressFill: document.getElementById('progressFill'),
      ...this.options.customElements
    };
  }

  /**
   * Load quiz data from JSON and initialize quiz
   * @returns {Promise<BaseQuiz|null>} The initialized quiz instance
   */
  async loadQuiz() {
    try {
      const response = await fetch(this.options.dataPath);
      if (!response.ok) {
        throw new Error(`Failed to load quiz data: ${response.status}`);
      }

      const data = await response.json();
      const quizData = data.quizzes.find(q => q.id === this.quizId);
      if (!quizData) {
        throw new Error(`${this.quizId} quiz data not found`);
      }

      const quizConfig = {
        questions: quizData.questions,
        timeLimit: quizData.timeLimit,
        progressKey: quizData.progressKey,
        iconClass: quizData.iconClass,
        scoring: quizData.scoring,
        elements: this.elements
      };

      this.quiz = new BaseQuiz(quizConfig);

      // Apply custom overrides if provided
      this.applyCustomOverrides();

      // Initialize the quiz
      this.quiz.initializeQuiz();

      // Setup event listeners
      this.setupEventListeners();

      return this.quiz;
    } catch (error) {
      console.error(`Error loading ${this.quizId} quiz:`, error);
      alert('Failed to load quiz data. Please try again later.');
      return null;
    }
  }

  /**
   * Apply custom method overrides to the quiz instance
   */
  applyCustomOverrides() {
    if (this.options.customOverrides) {
      Object.keys(this.options.customOverrides).forEach(methodName => {
        if (typeof this.options.customOverrides[methodName] === 'function') {
          this.quiz[methodName] = this.options.customOverrides[methodName].bind(this.quiz);
        }
      });
    }
  }

  /**
   * Setup common event listeners for quiz interactions
   */
  setupEventListeners() {
    // Start quiz button
    const startBtn = document.getElementById('startQuizBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.quiz?.startQuiz());
    }

    // Resume saved quiz button
    const resumeSavedBtn = document.getElementById('resumeSavedQuizBtn');
    if (resumeSavedBtn) {
      resumeSavedBtn.addEventListener('click', () => this.quiz?.resumeQuiz());
    }

    // Next question button
    const nextBtn = document.getElementById('nextQuestionBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.quiz?.nextQuestion());
    }

    // Pause button
    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        if (this.quiz) {
          clearInterval(this.quiz.timer);
          this.quiz.timer = null;
          this.quiz.saveProgress();
          pauseBtn.style.display = 'none';
          document.getElementById('resumeBtn').style.display = 'inline-block';
          alert("Quiz paused! Click resume to continue.");
        }
      });
    }

    // Resume button
    const resumeBtn = document.getElementById('resumeBtn');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => {
        if (this.quiz) {
          resumeBtn.style.display = 'none';
          document.getElementById('pauseBtn').style.display = 'inline-block';
          this.quiz.startTimer();
        }
      });
    }

    // Play again button
    const playAgainBtn = document.getElementById('playAgainBtn');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => location.reload());
    }

    // Back button
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => window.location.href = this.options.backUrl);
    }
  }

  /**
   * Get the loaded quiz instance
   * @returns {BaseQuiz|null} The quiz instance
   */
  getQuiz() {
    return this.quiz;
  }
}

// Global functions for HTML onclick handlers (maintained for backward compatibility)
window.startQuiz = function() {
  // This will be overridden by specific quiz loaders
};

window.resumeQuiz = function() {
  // This will be overridden by specific quiz loaders
};

window.nextQuestion = function() {
  // This will be overridden by specific quiz loaders
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuizLoader;
}
