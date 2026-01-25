/**
 * Pollution Awareness Quiz - Environmental Education Assessment
 *
 * An interactive quiz focused on different types of pollution, their impacts,
 * and ways to reduce pollution. Designed to educate users about air, water,
 * soil, and noise pollution and promote sustainable practices.
 *
 * Now extends BaseQuiz for unified progress tracking.
 *
 * @author Environment Animal Safety Hub Team
 * @version 2.0.0
 * @since 2024
 */

// Quiz configuration
const quizConfig = {
  questions: [
    {q: "What is air pollution?", o: ["Clean air with no particles", "Contamination of air by harmful substances", "Air with only oxygen", "Wind blowing dust"], a: 1},
    {q: "Which of these is a major source of water pollution?", o: ["Rain water", "Industrial waste discharge", "Pure drinking water", "Ocean waves"], a: 1},
    {q: "What type of pollution affects soil quality?", o: ["Air pollution", "Chemical fertilizers and pesticides", "Noise pollution", "Light pollution"], a: 1},
    {q: "Which gas is primarily responsible for air pollution from vehicles?", o: ["Oxygen", "Carbon dioxide", "Nitrogen dioxide", "Helium"], a: 2},
    {q: "What can you do to reduce noise pollution?", o: ["Play loud music", "Use headphones at high volume", "Keep music at reasonable levels", "Ignore noise complaints"], a: 2},
    {q: "Plastic waste in oceans affects marine life by?", o: ["Making water cleaner", "Being mistaken for food and causing death", "Helping fish breathe", "Creating new habitats"], a: 1},
    {q: "Which pollution type is caused by excessive use of chemical pesticides?", o: ["Air pollution", "Water pollution", "Soil pollution", "Light pollution"], a: 2},
    {q: "What is the main cause of indoor air pollution?", o: ["Fresh air from outside", "Poor ventilation and household chemicals", "Too much oxygen", "Natural gas leaks only"], a: 1},
    {q: "Which of these helps reduce pollution?", o: ["Burning more fossil fuels", "Using public transport", "Throwing trash in rivers", "Cutting down trees"], a: 1},
    {q: "What is acid rain caused by?", o: ["Too much water", "Sulfur dioxide and nitrogen oxides in air", "Natural rainfall", "Cloud formation"], a: 1}
  ],
  timeLimit: 180, // 3 minutes
  progressKey: 'pollution-awareness-quiz',
  iconClass: 'fa-solid fa-smog',
  elements: {
    startScreen: document.getElementById('startScreen'),
    quizScreen: document.getElementById('quizScreen'),
    resultScreen: document.getElementById('resultScreen'),
    questionEl: document.getElementById('question'),
    optionsEl: document.getElementById('options'),
    timeEl: document.getElementById('time'),
    scoreEl: document.getElementById('score'),
    remarkEl: document.getElementById('remark'),
    progressText: document.querySelector('.progress-metrics span:first-child'),
    progressFill: document.getElementById('progressFill')
  }
};

// Create quiz instance
const pollutionAwarenessQuiz = new BaseQuiz(quizConfig);

// Override loadQuestion to include custom progress metrics
pollutionAwarenessQuiz.loadQuestion = function() {
  // Call parent method
  BaseQuiz.prototype.loadQuestion.call(this);

  // Update custom progress metrics
  const timeSpentEl = document.getElementById('timeSpent');
  if (timeSpentEl) {
    const timeSpent = this.config.timeLimit - this.time;
    timeSpentEl.textContent = `Time Spent: ${timeSpent}s`;
  }

  const questionsCompleted = document.getElementById('questionsCompleted');
  if (questionsCompleted) {
    questionsCompleted.textContent = `Completed: ${this.index + 1}/${this.questions.length}`;
  }
};

// Override showResult for custom remarks
pollutionAwarenessQuiz.showResult = function() {
  // Call parent method
  BaseQuiz.prototype.showResult.call(this);

  // Custom remarks for pollution awareness
  let remark = "";
  if (this.score >= 8) {
    remark = "🌟 Pollution Fighter!";
  } else if (this.score >= 5) {
    remark = "👍 Good Awareness!";
  } else {
    remark = "🌱 Keep Learning!";
  }

  if (this.config.elements.remarkEl) {
    this.config.elements.remarkEl.textContent = remark;
  }
};

// Initialize quiz on page load
pollutionAwarenessQuiz.initializeQuiz();

// Add event listeners for quiz interactions
document.addEventListener('DOMContentLoaded', () => {
  // Start quiz button
  const startBtn = document.getElementById('startQuizBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => pollutionAwarenessQuiz.startQuiz());
  }

  // Resume saved quiz button
  const resumeSavedBtn = document.getElementById('resumeSavedQuizBtn');
  if (resumeSavedBtn) {
    resumeSavedBtn.addEventListener('click', () => pollutionAwarenessQuiz.resumeQuiz());
  }

  // Next question button
  const nextBtn = document.getElementById('nextQuestionBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => pollutionAwarenessQuiz.nextQuestion());
  }

  // Pause button
  const pauseBtn = document.getElementById('pauseBtn');
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      clearInterval(pollutionAwarenessQuiz.timer);
      pollutionAwarenessQuiz.timer = null;
      pollutionAwarenessQuiz.saveProgress();
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
      pollutionAwarenessQuiz.startTimer();
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
});
