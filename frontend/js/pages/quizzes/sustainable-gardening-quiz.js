// -----------------------------------
// Sustainable Gardening Quiz (Standalone)
// -----------------------------------

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

let timer;
let timeLeft = 180;
let timeSpent = 0;
let paused = false;


// -----------------------------------
// QUESTIONS
// -----------------------------------
const questions = [
{
question: "What is the best natural fertilizer?",
options: ["Compost","Plastic","Sand","Paint"],
answer: 0
},
{
question: "Which method saves water in gardening?",
options: ["Drip irrigation","Flood irrigation","Overflow watering","Daily heavy watering"],
answer: 0
},
{
question: "Which waste can be composted?",
options: ["Vegetable peels","Plastic bottles","Glass","Metal"],
answer: 0
},
{
question: "Why should we mulch soil?",
options: ["Retain moisture","Dry soil","Increase pollution","Kill plants"],
answer: 0
},
{
question: "Which plant type needs less water?",
options: ["Native plants","Exotic plants","Artificial plants","Plastic plants"],
answer: 0
},
{
question: "Which practice reduces chemical use?",
options: ["Organic gardening","Chemical spraying","Plastic covering","Burning leaves"],
answer: 0
},
{
question: "What helps attract pollinators?",
options: ["Flowers","Plastic","Smoke","Chemicals"],
answer: 0
},
{
question: "Which tool is eco-friendly?",
options: ["Manual tools","Electric waste tools","Plastic tools","Broken tools"],
answer: 0
},
{
question: "Rainwater harvesting helps in?",
options: ["Saving water","Wasting water","Soil pollution","Noise pollution"],
answer: 0
},
{
question: "Best way to protect soil health?",
options: ["Crop rotation","Chemical overload","Plastic mixing","Burning soil"],
answer: 0
}
];


// -----------------------------------
// START QUIZ
// -----------------------------------
function startQuiz(){

document.getElementById("startScreen").style.display="none";
document.getElementById("quizScreen").style.display="block";

startTimer();
loadQuestion();
}


// -----------------------------------
// TIMER
// -----------------------------------
function startTimer(){

timer = setInterval(()=>{

if(paused) return;

timeLeft--;
timeSpent++;

let min = Math.floor(timeLeft/60);
let sec = timeLeft%60;

document.getElementById("time").innerText =
`${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;

document.getElementById("timeSpent").innerText =
`Time Spent: ${timeSpent}s`;

if(timeLeft<=0){
clearInterval(timer);
showResult();
}

},1000);
}


// -----------------------------------
// LOAD QUESTION
// -----------------------------------
function loadQuestion(){

selectedAnswer=null;

const q = questions[currentQuestion];

document.getElementById("question").innerText =
`${currentQuestion+1}. ${q.question}`;

document.getElementById("questionsCompleted").innerText =
`Completed: ${currentQuestion}/${questions.length}`;

document.getElementById("progressFill").style.width =
((currentQuestion)/questions.length)*100 + "%";

const optionsHTML = q.options.map((opt,i)=>`
<div class="option" onclick="selectOption(${i},this)">
${opt}
</div>
`).join("");

document.getElementById("options").innerHTML = optionsHTML;
}


// -----------------------------------
// SELECT OPTION
// -----------------------------------
function selectOption(index,el){

selectedAnswer=index;

document.querySelectorAll(".option")
.forEach(o=>o.classList.remove("selected"));

el.classList.add("selected");
}


// -----------------------------------
// NEXT
// -----------------------------------
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


// -----------------------------------
// RESULT
// -----------------------------------
function showResult(){

clearInterval(timer);

document.getElementById("quizScreen").style.display="none";
document.getElementById("resultScreen").style.display="block";

document.getElementById("score").innerText =
`${score} / ${questions.length}`;

let remark="Good Gardening Skills!";
if(score==10) remark="Eco Gardening Expert 🌿";
else if(score<5) remark="Keep Learning 🌱";

document.getElementById("remark").innerText = remark;
}


// -----------------------------------
// PAUSE / RESUME
// -----------------------------------
function pauseQuiz(){
paused=true;
document.getElementById("pauseBtn").style.display="none";
document.getElementById("resumeBtn").style.display="inline-block";
}

function resumeQuiz(){
paused=false;
document.getElementById("pauseBtn").style.display="inline-block";
document.getElementById("resumeBtn").style.display="none";
}


// -----------------------------------
// GLOBAL EXPORT (IMPORTANT)
// -----------------------------------
window.startQuiz = startQuiz;
window.nextQuestion = nextQuestion;
window.pauseQuiz = pauseQuiz;
window.resumeQuiz = resumeQuiz;