// ---------------------------
// Pollution Awareness Quiz
// Standalone Version (No dependencies)
// ---------------------------

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let timer;
let timeLeft = 180;

// Questions
const questions = [
{
question: "Which type of pollution is caused by vehicle emissions?",
options: ["Water Pollution","Air Pollution","Soil Pollution","Noise Pollution"],
answer: 1
},
{
question: "Which gas is the major contributor to global warming?",
options: ["Oxygen","Carbon Dioxide","Nitrogen","Hydrogen"],
answer: 1
},
{
question: "What is the main cause of water pollution?",
options: ["Industrial waste","Solar energy","Wind energy","Plant growth"],
answer: 0
},
{
question: "Noise pollution mainly affects which organ?",
options: ["Eyes","Ears","Heart","Skin"],
answer: 1
},
{
question: "Plastic waste mostly causes which type of pollution?",
options: ["Soil Pollution","Air Pollution","Light Pollution","Thermal Pollution"],
answer: 0
},
{
question: "Which helps reduce air pollution?",
options: ["Planting trees","Burning waste","Using more cars","Cutting forests"],
answer: 0
},
{
question: "Which pollution affects marine life most?",
options: ["Water Pollution","Noise Pollution","Air Pollution","Light Pollution"],
answer: 0
},
{
question: "Acid rain is caused by?",
options: ["Sulfur dioxide & Nitrogen oxides","Oxygen & Hydrogen","Carbon & Helium","Methane & Neon"],
answer: 0
},
{
question: "Major source of soil pollution?",
options: ["Chemical fertilizers","Rainwater","Sunlight","Wind"],
answer: 0
},
{
question: "Best method to reduce pollution?",
options: ["Reduce Reuse Recycle","Burn fuel","Cut trees","Increase plastic"],
answer: 0
}
];


// ---------------------------
// START QUIZ
// ---------------------------
function startQuiz(){
document.getElementById("startScreen").style.display="none";
document.getElementById("quizScreen").style.display="block";

startTimer();
loadQuestion();
}


// ---------------------------
// TIMER
// ---------------------------
function startTimer(){
timer = setInterval(()=>{
timeLeft--;

let min = Math.floor(timeLeft/60);
let sec = timeLeft%60;

document.getElementById("time").innerText =
`${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;

if(timeLeft<=0){
clearInterval(timer);
showResult();
}
},1000);
}


// ---------------------------
// LOAD QUESTION
// ---------------------------
function loadQuestion(){

selectedAnswer=null;

const q = questions[currentQuestion];

document.getElementById("question").innerText =
`${currentQuestion+1}. ${q.question}`;

const optionsHTML = q.options.map((opt,i)=>`
<div class="option" onclick="selectOption(${i},this)">
${opt}
</div>
`).join("");

document.getElementById("options").innerHTML = optionsHTML;

updateProgress();
}


// ---------------------------
// SELECT OPTION
// ---------------------------
function selectOption(index,element){

selectedAnswer=index;

document.querySelectorAll(".option")
.forEach(opt=>opt.classList.remove("selected"));

element.classList.add("selected");
}


// ---------------------------
// NEXT QUESTION
// ---------------------------
function nextQuestion(){

if(selectedAnswer===null){
alert("Please select an answer");
return;
}

if(selectedAnswer === questions[currentQuestion].answer){
score++;
}

currentQuestion++;

if(currentQuestion < questions.length){
loadQuestion();
}else{
showResult();
}
}


// ---------------------------
// RESULT
// ---------------------------
function showResult(){

clearInterval(timer);

document.getElementById("quizScreen").style.display="none";
document.getElementById("resultScreen").style.display="block";

document.getElementById("score").innerText =
`${score} / ${questions.length}`;

let remark="Good!";
if(score==questions.length) remark="Excellent!";
else if(score<5) remark="Keep Learning!";

document.getElementById("remark").innerText = remark;
}


// ---------------------------
// PROGRESS BAR
// ---------------------------
function updateProgress(){

let percent = ((currentQuestion)/questions.length)*100;

document.getElementById("progressFill").style.width = percent+"%";

document.getElementById("questionsCompleted").innerText =
`Completed: ${currentQuestion}/${questions.length}`;
}