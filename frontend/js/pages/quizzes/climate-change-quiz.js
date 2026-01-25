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

// Quiz configuration
const quizConfig = {
  questions: [
    {q: "What is the greenhouse effect?", o: ["Plants growing in greenhouses", "Trapping heat in atmosphere", "Cooling the planet", "Creating oxygen"], a: 1},
    {q: "Which gas is primarily responsible for global warming?", o: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], a: 1},
    {q: "What is the main cause of rising sea levels?", o: ["Melting ice caps", "Earthquake", "Volcanic eruption", "Wind"], a: 0},
    {q: "Which renewable energy source uses wind?", o: ["Solar panels", "Wind turbines", "Coal", "Nuclear"], a: 1},
    {q: "What can individuals do to reduce carbon footprint?", o: ["Use public transport", "Leave lights on", "Use plastic bags", "Drive everywhere"], a: 0},
    {q: "What is deforestation?", o: ["Planting trees", "Cutting down forests", "Watering plants", "Building houses"], a: 1},
    {q: "Which activity contributes most to climate change?", o: ["Walking", "Cycling", "Driving cars", "Reading books"], a: 2},
    {q: "What is sustainable development?", o: ["Using resources quickly", "Meeting needs without compromising future", "Ignoring environment", "Building more factories"], a: 1},
    {q: "What happens when polar ice melts?", o: ["Sea levels rise", "Temperature drops", "More snow falls", "Earth gets colder"], a: 0},
    {q: "Which country is most affected by climate change?", o: ["Small island nations", "Large continents", "Desert countries", "Mountain regions"], a: 0}
  ],
  timeLimit: 180, // 3 minutes
  progressKey: 'climate-change-quiz',
  iconClass: 'fa-solid fa-globe',
  elements: {
    startScreen: document.getElementById('startScreen'),
    quizScreen: document.getElementById('quizScreen'),
    resultScreen: document.getElementById('resultScreen'),
    questionEl: document.getElementById('question'),
    optionsEl: document.getElementById('options'),
    timeEl: document.getElementById('time'),
    scoreEl: document.getElementById('score'),
    remarkEl: document.getElementById('remark')
  }
};

// Create quiz instance
const climateChangeQuiz = new BaseQuiz(quizConfig);

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

// Initialize quiz on page load
climateChangeQuiz.initializeQuiz();

// Add event listeners for quiz interactions
document.addEventListener('DOMContentLoaded', () => {
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
});
