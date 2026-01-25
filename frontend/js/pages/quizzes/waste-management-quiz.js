/**
 * Waste Management Quiz - Environmental Education Assessment
 *
 * An interactive quiz focused on proper waste disposal, recycling practices,
 * and environmental awareness. Designed to educate users about waste segregation,
 * recycling, and sustainable waste management practices.
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
    {q: "Where should vegetable peels go?", o: ["Dry Waste", "Wet Waste", "Plastic", "Glass"], a: 1},
    {q: "Which item is recyclable?", o: ["Food waste", "Plastic bottle", "Used tissue", "Leaves"], a: 1},
    {q: "Where does broken glass go?", o: ["Wet", "Dry", "Hazardous", "Plastic"], a: 2},
    {q: "Best way to reduce waste?", o: ["Burn it", "Reuse items", "Throw away", "Ignore"], a: 1},
    {q: "Which bin for paper?", o: ["Wet", "Dry", "Hazardous", "Medical"], a: 1},
    {q: "Plastic bags harm because?", o: ["They dissolve", "They pollute", "They help soil", "They vanish"], a: 1},
    {q: "What is composting?", o: ["Burning waste", "Recycling plastic", "Turning waste to manure", "Dumping trash"], a: 2},
    {q: "Used batteries go to?", o: ["Wet", "Dry", "Hazardous", "Recycle bin"], a: 2},
    {q: "Which helps environment?", o: ["Littering", "Segregation", "Burning trash", "Plastic use"], a: 1},
    {q: "Wet waste mainly comes from?", o: ["Kitchen", "Bathroom", "Road", "Factory"], a: 0}
  ],
  timeLimit: 180, // 3 minutes
  progressKey: 'waste-management-quiz',
  iconClass: 'fa-solid fa-trash',
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
const wasteManagementQuiz = new BaseQuiz(quizConfig);

// Override loadQuestion to include custom progress metrics
wasteManagementQuiz.loadQuestion = function() {
  // Call parent method
  BaseQuiz.prototype.loadQuestion.call(this);

  // Update custom progress metrics
  if (this.config.elements.progressText) {
    const timeSpent = this.config.timeLimit - this.time;
    this.config.elements.progressText.textContent = `Time Spent: ${timeSpent}s`;
  }

  const questionsCompleted = document.querySelector('.progress-metrics span:last-child');
  if (questionsCompleted) {
    questionsCompleted.textContent = `Completed: ${this.index + 1}/${this.questions.length}`;
  }
};

// Override showResult for custom remarks
wasteManagementQuiz.showResult = function() {
  // Call parent method
  BaseQuiz.prototype.showResult.call(this);

  // Custom remarks for waste management
  let remark = "";
  if (this.score >= 8) {
    remark = "🌟 Waste Warrior!";
  } else if (this.score >= 5) {
    remark = "👍 Good Effort!";
  } else {
    remark = "🌱 Keep Learning!";
  }

  if (this.config.elements.remarkEl) {
    this.config.elements.remarkEl.textContent = remark;
  }
};

// Initialize quiz on page load
wasteManagementQuiz.initializeQuiz();

// Add event listeners for quiz interactions
document.addEventListener('DOMContentLoaded', () => {
  // Start quiz button
  const startBtn = document.getElementById('startQuizBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => wasteManagementQuiz.startQuiz());
  }

  // Resume saved quiz button
  const resumeSavedBtn = document.getElementById('resumeSavedQuizBtn');
  if (resumeSavedBtn) {
    resumeSavedBtn.addEventListener('click', () => wasteManagementQuiz.resumeQuiz());
  }

  // Next question button
  const nextBtn = document.getElementById('nextQuestionBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => wasteManagementQuiz.nextQuestion());
  }

  // Pause button
  const pauseBtn = document.getElementById('pauseBtn');
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      clearInterval(wasteManagementQuiz.timer);
      wasteManagementQuiz.timer = null;
      wasteManagementQuiz.saveProgress();
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
      wasteManagementQuiz.startTimer();
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
