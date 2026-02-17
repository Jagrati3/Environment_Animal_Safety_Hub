/**
 * QuizLoader Utility - Handles common quiz initialization and event listeners
 *
 * This utility centralizes the common setup logic for quiz pages, reducing
 * code duplication across individual quiz implementations.
 *
 * @author Environment Animal Safety Hub Team
 * @version 1.0.0
 * @since 2024
 */

class QuizLoader {
  /**
   * Load quiz data from JSON and create quiz instance
   * @param {string} quizId - The ID of the quiz to load
   * @param {Object} elements - DOM element references
   * @param {Object} customOverrides - Optional custom method overrides
   * @returns {Promise<BaseQuiz|null>} The quiz instance or null if failed
   */
  static async loadQuiz(quizId, elements, customOverrides = {}) {
    try {
      const response = await fetch('../../assets/data/quiz-data.json');
      if (!response.ok) {
        throw new Error('Failed to load quiz data');
      }
      const data = await response.json();
      const quizData = data.quizzes.find(q => q.id === quizId);
      if (!quizData) {
        throw new Error(`${quizId} quiz data not found`);
      }

      const quizConfig = {
        id: quizData.id,
        questions: quizData.questions,
        timeLimit: quizData.timeLimit,
        progressKey: quizData.progressKey,
        iconClass: quizData.iconClass,
        scoring: quizData.scoring,
        progressType: quizData.progressType || 'standard',
        elements: elements
      };

      const quiz = new BaseQuiz(quizConfig);

      // Apply custom overrides if provided
      if (customOverrides.startQuiz) {
        quiz.startQuiz = customOverrides.startQuiz.bind(quiz);
      }
      if (customOverrides.loadQuestion) {
        quiz.loadQuestion = customOverrides.loadQuestion.bind(quiz);
      }
      if (customOverrides.nextQuestion) {
        quiz.nextQuestion = customOverrides.nextQuestion.bind(quiz);
      }
      if (customOverrides.showResult) {
        quiz.showResult = customOverrides.showResult.bind(quiz);
      }

      // Initialize quiz
      quiz.initializeQuiz();

      // Setup common event listeners
      this.setupEventListeners(quiz, elements);

      return quiz;
    } catch (error) {
      console.error(`Error loading ${quizId} quiz:`, error);
      alert('Failed to load quiz data. Please try again later.');
      return null;
    }
  }

  /**
   * Setup common event listeners for quiz interactions
   * @param {BaseQuiz} quiz - The quiz instance
   * @param {Object} elements - DOM element references
   */
  static setupEventListeners(quiz, elements) {
    // Start quiz button
    const startBtn = document.getElementById('startQuizBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => quiz.startQuiz());
    }

    // Resume saved quiz button
    const resumeSavedBtn = document.getElementById('resumeSavedQuizBtn');
    if (resumeSavedBtn) {
      resumeSavedBtn.addEventListener('click', () => quiz.resumeQuiz());
    }

    // Next question button
    const nextBtn = document.getElementById('nextQuestionBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => quiz.nextQuestion());
    }

    // Pause button
    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        clearInterval(quiz.timer);
        quiz.timer = null;
        quiz.saveProgress();
        pauseBtn.style.display = 'none';
        document.getElementById('resumeBtn').style.display = 'inline-block';
        alert("Quiz paused! Click resume to continue.");
      });
    }

    // Resume button
    const resumeBtn = document.getElementById('resumeBtn');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => {
        resumeBtn.style.display = 'none';
        document.getElementById('pauseBtn').style.display = 'inline-block';
        quiz.startTimer();
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
      backBtn.addEventListener('click', () => window.location.href = '../games/kids-zone.html');
    }
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuizLoader;
}
