document.addEventListener("DOMContentLoaded", () => {

initTabs()

initChart()

initCalculator()

})


/* Tabs */

function initTabs(){

const tabs=document.querySelectorAll(".tab-btn")

const contents=document.querySelectorAll(".tab-content")

tabs.forEach(tab=>{

tab.addEventListener("click",()=>{

tabs.forEach(btn=>btn.classList.remove("active"))

contents.forEach(c=>c.classList.remove("active"))

tab.classList.add("active")

document.getElementById(tab.dataset.tab).classList.add("active")

})

})

}


/* Chart */

function initChart(){

const ctx=document.getElementById("metabolicSuppressionChart")

if(!ctx) return

new Chart(ctx,{

type:"line",

data:{

labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],

datasets:[

{

label:"Normal Metabolism",

data:[120,115,110,105,100,95,90,85,80,75,70,65],

borderColor:"#2e7d32",

backgroundColor:"rgba(76,175,80,0.2)",

fill:true,

tension:0.4

},

{

label:"Suppressed Metabolism",

data:[100,95,90,85,80,75,70,65,60,55,50,45],

borderColor:"#ff9800",

backgroundColor:"rgba(255,152,0,0.2)",

fill:true,

tension:0.4

}

]

},

options:{

responsive:true,

plugins:{legend:{position:"top"}}

}

})

}


/* Calculator */

function initCalculator(){

const btn=document.getElementById("calculateBtn")

if(!btn) return

btn.addEventListener("click",calculate)

}


function calculate(){

const mass=parseFloat(document.getElementById("bodyMass").value)

const temp=parseFloat(document.getElementById("temperature").value)

const duration=parseFloat(document.getElementById("duration").value)


const suppression=Math.max(0,Math.min(90,(temp+20)*2))

const energy=70*Math.pow(mass,0.75)

const survival=Math.max(0,100-suppression-duration*0.5)


document.getElementById("suppressionResult").innerText=suppression.toFixed(1)+" %"

document.getElementById("energyDeficitResult").innerText=energy.toFixed(0)+" kcal/day"

document.getElementById("survivalResult").innerText=survival.toFixed(1)+" %"

}