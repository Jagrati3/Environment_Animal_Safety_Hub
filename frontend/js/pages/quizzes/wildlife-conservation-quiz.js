// -----------------------------------
// Wildlife Conservation Quiz
// -----------------------------------

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;


// -----------------------------------
// QUESTIONS
// -----------------------------------
const questions = [
{
question: "What does wildlife conservation aim to protect?",
options: ["Animals and habitats","Buildings","Roads","Machines"],
answer: 0
},
{
question: "Which of the following is an endangered animal?",
options: ["Tiger","Dog","Cow","Goat"],
answer: 0
},
{
question: "What causes wildlife extinction?",
options: ["Habitat destruction","Tree planting","Water conservation","Recycling"],
answer: 0
},
{
question: "Which place protects wild animals?",
options: ["National Parks","Shopping malls","Schools","Factories"],
answer: 0
},
{
question: "Poaching means:",
options: ["Illegal hunting","Animal rescue","Tree planting","Farming"],
answer: 0
},
{
question: "Which organization works for wildlife protection?",
options: ["WWF","NASA","FIFA","UNESCO"],
answer: 0
},
{
question: "Deforestation affects wildlife by:",
options: ["Destroying habitats","Improving habitats","Creating oceans","Reducing rainfall only"],
answer: 0
},
{
question: "Which animal is known as the king of the jungle?",
options: ["Lion","Elephant","Tiger","Leopard"],
answer: 0
},
{
question: "Biodiversity means:",
options: ["Variety of living species","Only animals","Only plants","Only forests"],
answer: 0
},
{
question: "How can we help wildlife?",
options: ["Protect forests","Pollute rivers","Cut trees","Burn waste"],
answer: 0
}
];


// -----------------------------------
// ELEMENTS
// -----------------------------------
const readyScreen = document.getElementById("readyScreen");
const quizScreen = document.getElementById("quizScreen");

const questionEl = document.getElementById("question");
const optionBtns = document.querySelectorAll(".option-btn");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");


// -----------------------------------
// START QUIZ
// -----------------------------------
function startQuiz(){

readyScreen.classList.add("hidden");
quizScreen.classList.remove("hidden");

loadQuestion();
}


// -----------------------------------
// LOAD QUESTION
// -----------------------------------
function loadQuestion(){

selectedAnswer = null;

const q = questions[currentQuestion];

questionEl.innerText =
`${currentQuestion+1}. ${q.question}`;

feedbackEl.innerText = "";

optionBtns.forEach((btn,index)=>{
btn.innerText = q.options[index];
btn.style.background="";
});
}


// -----------------------------------
// OPTION CLICK
// -----------------------------------
optionBtns.forEach((btn,index)=>{

btn.addEventListener("click",()=>{

selectedAnswer=index;

optionBtns.forEach(b=>b.style.background="");
btn.style.background="#d4edda";

});
});


// -----------------------------------
// NEXT BUTTON
// -----------------------------------
nextBtn.addEventListener("click",()=>{

if(selectedAnswer===null){
alert("Select an option");
return;
}

const correct = questions[currentQuestion].answer;

if(selectedAnswer === correct){
score++;
feedbackEl.innerText="Correct!";
}
else{
feedbackEl.innerText="Wrong!";
}

scoreEl.innerText = score;

currentQuestion++;

if(currentQuestion < questions.length){
setTimeout(loadQuestion,700);
}
else{
showResult();
}

});


// -----------------------------------
// RESULT
// -----------------------------------
function showResult(){

quizScreen.innerHTML = `
<div class="quiz-card">
<h2>Quiz Completed</h2>
<p>Your Score: ${score} / ${questions.length}</p>
<p>${
score>=8 ? "Wildlife Protector 🦁"
: score>=5 ? "Good Knowledge 🌿"
: "Learn More About Wildlife 🌍"
}</p>
<button onclick="location.reload()">Restart</button>
</div>
`;

}


// -----------------------------------
// GLOBAL EXPORT (IMPORTANT)
// -----------------------------------
window.startQuiz = startQuiz;