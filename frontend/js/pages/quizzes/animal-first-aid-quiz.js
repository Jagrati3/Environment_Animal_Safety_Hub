/* ---------------- QUESTIONS ---------------- */

const questions = [
{
  question: "What should you do first if an animal is bleeding heavily?",
  options: ["Apply pressure", "Give food", "Ignore", "Wash with hot water"],
  answer: 0
},
{
  question: "If an animal is unconscious, what should you check first?",
  options: ["Weight", "Breathing", "Color", "Age"],
  answer: 1
},
{
  question: "How should you approach an injured animal?",
  options: ["Run quickly", "Slowly and calmly", "Shout", "Touch immediately"],
  answer: 1
},
{
  question: "If an animal has a broken limb?",
  options: ["Move it", "Keep it stable", "Massage", "Let it run"],
  answer: 1
},
{
  question: "If an animal is choking?",
  options: ["Check mouth carefully", "Give water", "Ignore", "Make sleep"],
  answer: 0
},
{
  question: "If an animal is burned?",
  options: ["Apply ice", "Cool with water", "Apply oil", "Cover cloth"],
  answer: 1
},
{
  question: "Serious injury requires?",
  options: ["Immediate vet help", "Ignore", "Wait days", "Home rest"],
  answer: 0
},
{
  question: "Animal shock treatment?",
  options: ["Keep warm", "Feed heavy", "Make walk", "Pour water"],
  answer: 0
},
{
  question: "Dog bite first step?",
  options: ["Clean wound", "Ignore", "Cover dirty", "Apply mud"],
  answer: 0
},
{
  question: "Why stay calm?",
  options: ["Reduces stress", "No effect", "Slower", "Confuses animal"],
  answer: 0
}
];


/* ---------------- QUIZ LOGIC ---------------- */

let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");

window.startQuiz = function () {
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  loadQuestion();
};

function loadQuestion() {
  const q = questions[currentQuestion];

  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    btn.onclick = () => {
      if (index === q.answer) score++;
      nextQuestion();
    };

    optionsEl.appendChild(btn);
  });
}

window.nextQuestion = function () {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";

  scoreEl.textContent = `Score: ${score} / ${questions.length}`;
}