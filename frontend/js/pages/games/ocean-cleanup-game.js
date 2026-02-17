document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const startScreen = document.getElementById('startScreen');
  const gameContainer = document.getElementById('gameContainer');
  const boat = document.getElementById('boat');
  const timerEl = document.getElementById('timer');
  const scoreEl = document.getElementById('score');

  let score = 0, time = 120, trashInterval, obstacleInterval, gameTimer;
  let boatX = window.innerWidth / 2 - 30;

  const wasteEmojis = ['🗑️','🥤','🍼','🥡','🍕','🍔','🛍️'];
  const obstacleEmoji = '🪨';

  function moveBoat(e){
    if(e.key==='ArrowLeft') boatX-=40;
    if(e.key==='ArrowRight') boatX+=40;
    if(boatX<0) boatX=0;
    if(boatX>window.innerWidth-60) boatX=window.innerWidth-60;
    boat.style.left = boatX+'px';
  }

  function createWaste(){
    const waste = document.createElement('div');
    waste.classList.add('waste');
    waste.style.left = Math.random()*(window.innerWidth-40)+'px';
    waste.style.top = '-50px';
    waste.textContent = wasteEmojis[Math.floor(Math.random()*wasteEmojis.length)];
    gameContainer.appendChild(waste);

    const moveWaste = setInterval(()=>{
      let top = parseInt(waste.style.top);
      top+=1; // slower falling
      waste.style.top = top+'px';

      const boatRect = boat.getBoundingClientRect();
      const wasteRect = waste.getBoundingClientRect();
      if(boatRect.x<wasteRect.x+wasteRect.width && boatRect.x+boatRect.width>wasteRect.x &&
         boatRect.y<wasteRect.y+wasteRect.height && boatRect.height+boatRect.y>wasteRect.y){
        score++; scoreEl.textContent=score;
        waste.remove(); clearInterval(moveWaste);
      }

      if(top>window.innerHeight){ waste.remove(); clearInterval(moveWaste); }
    },20);
  }

  function createObstacle(){
    const obs = document.createElement('div');
    obs.classList.add('obstacle');
    obs.style.left = Math.random()*(window.innerWidth-50)+'px';
    obs.style.top='-50px';
    obs.textContent = obstacleEmoji;
    gameContainer.appendChild(obs);

    const moveObs = setInterval(()=>{
      let top = parseInt(obs.style.top);
      top+=2; // slower obstacles
      obs.style.top = top+'px';

      const boatRect = boat.getBoundingClientRect();
      const obsRect = obs.getBoundingClientRect();
      if(boatRect.x<obsRect.x+obsRect.width && boatRect.x+boatRect.width>obsRect.x &&
         boatRect.y<obsRect.y+obsRect.height && boatRect.height+boatRect.y>obsRect.y){
        endGame(); alert('💥 You hit debris! Final Score: '+score);
      }

      if(top>window.innerHeight){ obs.remove(); clearInterval(moveObs); }
    },20);
  }

  function startGame(){
    startScreen.style.display='none';
    document.addEventListener('keydown', moveBoat);
    trashInterval = setInterval(createWaste,2000); // longer delay between waste
    obstacleInterval = setInterval(createObstacle,5000); // longer delay for obstacles
    gameTimer = setInterval(()=>{
      time--;
      const minutes = String(Math.floor(time/60)).padStart(2,'0');
      const seconds = String(time%60).padStart(2,'0');
      timerEl.textContent=`${minutes}:${seconds}`;
      if(time<=0) endGame();
    },1000);
  }

  function endGame(){
    clearInterval(trashInterval);
    clearInterval(obstacleInterval);
    clearInterval(gameTimer);
    document.removeEventListener('keydown',moveBoat);
    alert('⏰ Time Up! Your Score: '+score);
    location.reload();
  }

  startBtn.addEventListener('click', startGame);
});