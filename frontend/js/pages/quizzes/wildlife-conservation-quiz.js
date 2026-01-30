let currentIndex = 0;
let score = 0;
let questions = [];

const questionEl = document.getElementById("question");
const optionsEl = document.querySelector(".options");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

async function loadQuiz() {
  try {
    const res = await fetch(
      "/Environment_Animal_Safety_Hub/frontend/assets/data/quiz-data.json",
    );
    const data = await res.json();

    const quiz = data.quizzes.find((q) => q.id === "wildlife-conservation");
    questions = quiz.questions;
  } catch (e) {
    console.error(e);
    alert("Failed to load quiz data");
  }
}

function startQuiz() {
  document.getElementById("readyScreen").classList.add("hidden");
  document.getElementById("quizScreen").classList.remove("hidden");
  currentIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  feedbackEl.textContent = "";
  optionsEl.innerHTML = "";
  nextBtn.disabled = true;

  const q = questions[currentIndex];
  questionEl.textContent = q.q;

  q.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;

    btn.onclick = () => selectOption(i);
    optionsEl.appendChild(btn);
  });
}

function selectOption(index) {
  const correct = questions[currentIndex].a;
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((b, i) => {
    b.disabled = true;
    if (i === correct) b.style.background = "#a5d6a7";
    if (i === index && i !== correct) b.style.background = "#ef9a9a";
  });

  if (index === correct) {
    score++;
    feedbackEl.textContent = "✅ Correct!";
  } else {
    feedbackEl.textContent = "❌ Incorrect";
  }

  scoreEl.textContent = score;
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    questionEl.textContent = "🎉 Quiz Completed!";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = `Final Score: ${score}/${questions.length}`;
    nextBtn.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", loadQuiz);
