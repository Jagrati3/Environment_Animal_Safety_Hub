const questionBank = [
  {
    q: "Which action best reduces carbon emissions?",
    o: ["Using LED bulbs", "Driving short trips alone", "Burning leaves", "Keeping AC at 16°C"],
    a: 0,
    fact: "LED bulbs use up to 80% less energy than traditional bulbs.",
    tip: "Combine errands or carpool to cut emissions."
  },
  {
    q: "What is the most eco-friendly way to dispose of kitchen scraps?",
    o: ["Throw in landfill", "Compost them", "Burn them", "Flush down sink"],
    a: 1,
    fact: "Composting can reduce household waste by up to 30%.",
    tip: "Start a small compost bin for fruit peels and veggies."
  },
  {
    q: "Which material is endlessly recyclable?",
    o: ["Glass", "Tissue paper", "Styrofoam", "Plastic bags"],
    a: 0,
    fact: "Glass can be recycled without losing quality.",
    tip: "Rinse and separate glass before recycling."
  },
  {
    q: "What helps conserve water at home?",
    o: ["Fixing leaky taps", "Long showers", "Over-watering plants", "Running half loads"],
    a: 0,
    fact: "A dripping tap can waste thousands of liters a year.",
    tip: "Check faucets monthly for leaks."
  },
  {
    q: "Which energy source is renewable?",
    o: ["Coal", "Natural gas", "Solar", "Diesel"],
    a: 2,
    fact: "Solar power produces zero direct emissions.",
    tip: "Use solar chargers for small gadgets."
  },
  {
    q: "What is the best choice for reusable shopping?",
    o: ["Cloth tote", "Single-use plastic", "Foil bag", "Paper every time"],
    a: 0,
    fact: "Reusable bags can offset hundreds of single-use bags per year.",
    tip: "Keep a foldable tote in your backpack."
  },
  {
    q: "Why are pollinators important?",
    o: ["They clean water", "They help plants reproduce", "They reduce noise", "They prevent fires"],
    a: 1,
    fact: "About 75% of food crops depend on pollinators.",
    tip: "Plant native flowers to attract bees and butterflies."
  },
  {
    q: "Which practice improves soil health?",
    o: ["Overusing pesticides", "Crop rotation", "Leaving soil bare", "Burning stubble"],
    a: 1,
    fact: "Crop rotation boosts soil nutrients naturally.",
    tip: "Mix legumes with vegetables in your garden plan."
  },
  {
    q: "What is the cleanest transportation option for short trips?",
    o: ["Cycling or walking", "Motorbike", "Taxi", "Private car"],
    a: 0,
    fact: "Walking produces zero emissions and improves health.",
    tip: "Try a bike ride for trips under 2 km."
  },
  {
    q: "Which action supports wildlife conservation?",
    o: ["Buying illegal wildlife products", "Supporting protected areas", "Littering in parks", "Feeding wild animals"],
    a: 1,
    fact: "Protected areas help preserve habitats and biodiversity.",
    tip: "Follow park rules to keep wildlife safe."
  },
  {
    q: "How can you reduce food waste?",
    o: ["Plan meals", "Overbuy groceries", "Ignore leftovers", "Throw away extras"],
    a: 0,
    fact: "About one-third of food produced is wasted globally.",
    tip: "Store leftovers in clear containers to remember them."
  },
  {
    q: "Which item belongs in the e-waste bin?",
    o: ["Old phone", "Banana peel", "Paper towel", "Glass jar"],
    a: 0,
    fact: "E-waste contains valuable metals that can be recovered.",
    tip: "Locate a certified e-waste drop-off center nearby."
  }
];

const TIME_LIMIT = 180;
const PROGRESS_KEY = "ecoQuizChallengeProgress";
const LEADERBOARD_KEY = "ecoQuizChallengeLeaderboard";

const elements = {
  startScreen: document.getElementById("startScreen"),
  quizScreen: document.getElementById("quizScreen"),
  resultScreen: document.getElementById("resultScreen"),
  playerNameInput: document.getElementById("playerName"),
  startQuizBtn: document.getElementById("startQuizBtn"),
  resumeQuizBtn: document.getElementById("resumeQuizBtn"),
  resumeBannerBtn: document.getElementById("resumeBannerBtn"),
  resumeSection: document.getElementById("resumeSection"),
  resetQuizBtn: document.getElementById("resetQuizBtn"),
  saveExitBtn: document.getElementById("saveExitBtn"),
  nextQuestionBtn: document.getElementById("nextQuestionBtn"),
  timeLeft: document.getElementById("timeLeft"),
  currentScore: document.getElementById("currentScore"),
  questionCounter: document.getElementById("questionCounter"),
  progressFill: document.getElementById("progressFill"),
  questionText: document.getElementById("questionText"),
  optionsGrid: document.getElementById("optionsGrid"),
  feedbackBox: document.getElementById("feedbackBox"),
  unlockList: document.getElementById("unlockList"),
  unlockCount: document.getElementById("unlockCount"),
  finalScore: document.getElementById("finalScore"),
  resultRemark: document.getElementById("resultRemark"),
  accuracyValue: document.getElementById("accuracyValue"),
  timeUsedValue: document.getElementById("timeUsedValue"),
  factsUnlockedValue: document.getElementById("factsUnlockedValue"),
  playAgainBtn: document.getElementById("playAgainBtn"),
  leaderboardTable: document.getElementById("leaderboardTable"),
  resultLeaderboardTable: document.getElementById("resultLeaderboardTable"),
  clearLeaderboardBtn: document.getElementById("clearLeaderboardBtn"),
  certificatePanel: document.getElementById("certificatePanel"),
  certificateCard: document.getElementById("certificateCard"),
  certificateName: document.getElementById("certificateName"),
  certificateScore: document.getElementById("certificateScore"),
  certificateDate: document.getElementById("certificateDate"),
  downloadCertificateBtn: document.getElementById("downloadCertificateBtn"),
  shareCertificateBtn: document.getElementById("shareCertificateBtn"),
  scrollToQuizBtn: document.getElementById("scrollToQuizBtn")
};

let state = {
  index: 0,
  score: 0,
  remainingTime: TIME_LIMIT,
  answers: [],
  unlocked: [],
  playerName: "",
  completed: false
};

let timer = null;

function init() {
  elements.scrollToQuizBtn?.addEventListener("click", () => {
    document.getElementById("ecoQuizWrapper").scrollIntoView({ behavior: "smooth" });
  });

  elements.startQuizBtn.addEventListener("click", () => startNewQuiz());
  elements.resumeQuizBtn.addEventListener("click", () => resumeQuiz());
  elements.resumeBannerBtn.addEventListener("click", () => resumeQuiz());
  elements.resetQuizBtn.addEventListener("click", () => resetProgress(true));
  elements.saveExitBtn.addEventListener("click", () => saveAndExit());
  elements.nextQuestionBtn.addEventListener("click", () => nextQuestion());
  elements.playAgainBtn.addEventListener("click", () => startNewQuiz());
  elements.clearLeaderboardBtn.addEventListener("click", () => clearLeaderboard());
  elements.downloadCertificateBtn.addEventListener("click", () => downloadCertificate());
  elements.shareCertificateBtn.addEventListener("click", () => shareCertificate());

  renderLeaderboard();
  checkResume();
}

function startNewQuiz() {
  stopTimer();
  const name = elements.playerNameInput.value.trim();
  if (!name) {
    alert("Please enter your name to start.");
    return;
  }

  state = {
    index: 0,
    score: 0,
    remainingTime: TIME_LIMIT,
    answers: new Array(questionBank.length).fill(null),
    unlocked: [],
    playerName: name,
    completed: false
  };

  saveProgress();
  showScreen("quiz");
  renderQuestion();
  startTimer();
}

function resumeQuiz() {
  const loaded = loadProgress();
  if (!loaded || state.completed) {
    alert("No resumable quiz found.");
    return;
  }

  elements.playerNameInput.value = state.playerName || "";
  showScreen("quiz");
  renderQuestion();
  startTimer();
}

function saveAndExit() {
  saveProgress();
  stopTimer();
  showScreen("start");
}

function showScreen(screen) {
  elements.startScreen.style.display = screen === "start" ? "block" : "none";
  elements.quizScreen.style.display = screen === "quiz" ? "block" : "none";
  elements.resultScreen.style.display = screen === "result" ? "block" : "none";
}

function renderQuestion() {
  const current = questionBank[state.index];

  elements.questionText.textContent = `Q${state.index + 1}. ${current.q}`;
  elements.currentScore.textContent = state.score;
  elements.questionCounter.textContent = `${state.index + 1}/${questionBank.length}`;
  elements.progressFill.style.width = `${((state.index + 1) / questionBank.length) * 100}%`;
  elements.feedbackBox.textContent = "Select an option to get instant feedback.";
  elements.nextQuestionBtn.textContent = state.index === questionBank.length - 1 ? "Finish Quiz" : "Next Question";
  elements.optionsGrid.innerHTML = "";

  current.o.forEach((option, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleSelection(idx));
    elements.optionsGrid.appendChild(btn);
  });

  const existingAnswer = state.answers[state.index];
  if (existingAnswer !== null && existingAnswer !== undefined) {
    showFeedback(existingAnswer, current.a);
  }

  updateUnlocks();
  updateTimerDisplay();
}

function handleSelection(selectedIdx) {
  if (state.answers[state.index] !== null && state.answers[state.index] !== undefined) {
    return;
  }

  state.answers[state.index] = selectedIdx;
  showFeedback(selectedIdx, questionBank[state.index].a);

  if (selectedIdx === questionBank[state.index].a) {
    state.score += 1;
    addUnlock("Fun Fact", questionBank[state.index].fact);
  } else {
    addUnlock("Eco Tip", questionBank[state.index].tip);
  }

  elements.currentScore.textContent = state.score;
  saveProgress();
}

function showFeedback(selectedIdx, correctIdx) {
  const options = elements.optionsGrid.querySelectorAll(".option-btn");
  options.forEach((btn, idx) => {
    btn.classList.add("disabled");
    if (idx === correctIdx) {
      btn.classList.add("correct");
    }
    if (idx === selectedIdx && selectedIdx !== correctIdx) {
      btn.classList.add("incorrect");
    }
  });

  if (selectedIdx === correctIdx) {
    elements.feedbackBox.textContent = "✅ Correct! Great job.";
  } else {
    const correctAnswer = questionBank[state.index].o[correctIdx];
    elements.feedbackBox.textContent = `❌ Not quite. Correct answer: ${correctAnswer}`;
  }
}

function nextQuestion() {
  if (state.answers[state.index] === null || state.answers[state.index] === undefined) {
    alert("Please select an option first.");
    return;
  }

  if (state.index < questionBank.length - 1) {
    state.index += 1;
    saveProgress();
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function startTimer() {
  stopTimer();
  timer = setInterval(() => {
    state.remainingTime -= 1;
    updateTimerDisplay();

    if (state.remainingTime <= 0) {
      state.remainingTime = 0;
      finishQuiz();
    }
  }, 1000);
}

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(state.remainingTime / 60);
  const seconds = state.remainingTime % 60;
  elements.timeLeft.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function finishQuiz() {
  stopTimer();
  state.completed = true;
  state.index = questionBank.length;
  saveProgress();
  updateLeaderboard();
  renderResult();
  showScreen("result");
}

function renderResult() {
  const total = questionBank.length;
  const accuracy = Math.round((state.score / total) * 100);
  const timeUsed = TIME_LIMIT - state.remainingTime;

  elements.finalScore.textContent = `${state.score}/${total}`;
  elements.accuracyValue.textContent = `${accuracy}%`;
  elements.timeUsedValue.textContent = `${timeUsed}s`;
  elements.factsUnlockedValue.textContent = state.unlocked.length;
  elements.playerNameInput.value = state.playerName || "";

  if (accuracy >= 85) {
    elements.resultRemark.textContent = "🌟 Eco Champion! You really know your stuff.";
  } else if (accuracy >= 60) {
    elements.resultRemark.textContent = "👍 Great effort! Keep growing your eco-knowledge.";
  } else {
    elements.resultRemark.textContent = "🌱 Nice start! Review the tips and try again.";
  }

  renderLeaderboard();
  renderCertificate(accuracy);
}

function renderCertificate(accuracy) {
  const eligible = accuracy >= 80;
  elements.certificatePanel.style.display = eligible ? "block" : "none";
  if (!eligible) return;

  const now = new Date();
  elements.certificateName.textContent = state.playerName || "Eco Explorer";
  elements.certificateScore.textContent = `Score: ${state.score}/${questionBank.length}`;
  elements.certificateDate.textContent = now.toLocaleDateString();
}

function addUnlock(type, text) {
  const exists = state.unlocked.some(item => item.text === text);
  if (!exists) {
    state.unlocked.unshift({ type, text });
  }
  updateUnlocks();
}

function updateUnlocks() {
  elements.unlockList.innerHTML = "";
  if (state.unlocked.length === 0) {
    elements.unlockList.innerHTML = '<div class="unlock-item">Unlock facts by answering questions!</div>';
  } else {
    state.unlocked.slice(0, 6).forEach(item => {
      const div = document.createElement("div");
      div.className = "unlock-item";
      div.textContent = `${item.type}: ${item.text}`;
      elements.unlockList.appendChild(div);
    });
  }
  elements.unlockCount.textContent = `${state.unlocked.length} unlocked`;
}

function saveProgress() {
  const progress = {
    currentIndex: state.index,
    answers: state.answers,
    score: state.score,
    remainingTime: state.remainingTime,
    playerName: state.playerName,
    unlocked: state.unlocked,
    completed: state.completed,
    timestamp: Date.now(),
    quizId: "eco-quiz-challenge"
  };

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function loadProgress() {
  const saved = localStorage.getItem(PROGRESS_KEY);
  if (!saved) return false;

  try {
    const progress = JSON.parse(saved);
    state.index = progress.currentIndex ?? 0;
    state.answers = progress.answers ?? [];
    state.score = progress.score ?? 0;
    state.remainingTime = progress.remainingTime ?? TIME_LIMIT;
    state.playerName = progress.playerName ?? "";
    state.unlocked = progress.unlocked ?? [];
    state.completed = progress.completed ?? false;
    return true;
  } catch (error) {
    return false;
  }
}

function checkResume() {
  if (loadProgress() && !state.completed && state.index < questionBank.length) {
    elements.resumeSection.style.display = "flex";
    elements.resumeQuizBtn.style.display = "inline-flex";
    elements.playerNameInput.value = state.playerName || "";
  }
}

function resetProgress(showAlert) {
  stopTimer();
  localStorage.removeItem(PROGRESS_KEY);
  if (showAlert) {
    alert("Quiz progress cleared.");
  }
  state = {
    index: 0,
    score: 0,
    remainingTime: TIME_LIMIT,
    answers: [],
    unlocked: [],
    playerName: "",
    completed: false
  };
  elements.resumeSection.style.display = "none";
  elements.resumeQuizBtn.style.display = "none";
  elements.playerNameInput.value = "";
  showScreen("start");
}

function getLeaderboard() {
  const saved = localStorage.getItem(LEADERBOARD_KEY);
  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

function updateLeaderboard() {
  const leaderboard = getLeaderboard();
  const entry = {
    name: state.playerName || "Eco Explorer",
    score: state.score,
    total: questionBank.length,
    timeUsed: TIME_LIMIT - state.remainingTime,
    date: new Date().toLocaleDateString()
  };

  leaderboard.push(entry);
  leaderboard.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeUsed - b.timeUsed;
  });

  const trimmed = leaderboard.slice(0, 10);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
}

function renderLeaderboard() {
  const leaderboard = getLeaderboard();
  const targetTables = [elements.leaderboardTable, elements.resultLeaderboardTable];

  targetTables.forEach(table => {
    if (!table) return;
    table.innerHTML = "";

    if (leaderboard.length === 0) {
      table.innerHTML = '<div class="leaderboard-row"><strong>#</strong><span>No scores yet</span><span>--</span><span>--</span></div>';
      return;
    }

    leaderboard.forEach((entry, idx) => {
      const row = document.createElement("div");
      row.className = "leaderboard-row";
      row.innerHTML = `
        <strong>${idx + 1}</strong>
        <span>${entry.name}</span>
        <span>${entry.score}/${entry.total}</span>
        <span>${entry.timeUsed}s</span>
      `;
      table.appendChild(row);
    });
  });
}

function clearLeaderboard() {
  if (!confirm("Clear the leaderboard?")) return;
  localStorage.removeItem(LEADERBOARD_KEY);
  renderLeaderboard();
}

async function downloadCertificate() {
  if (!elements.certificateCard) return;
  const canvas = await html2canvas(elements.certificateCard, { scale: 2 });
  const link = document.createElement("a");
  link.download = "eco-quiz-certificate.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

async function shareCertificate() {
  if (!elements.certificateCard) return;

  const canvas = await html2canvas(elements.certificateCard, { scale: 2 });
  const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
  if (!blob) return;

  const file = new File([blob], "eco-quiz-certificate.png", { type: "image/png" });
  const shareData = {
    title: "Eco Quiz Challenge Certificate",
    text: `I scored ${state.score}/${questionBank.length} in the Eco Quiz Challenge!`,
    files: [file]
  };

  if (navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      await downloadCertificate();
    }
  } else {
    await downloadCertificate();
  }
}

init();
