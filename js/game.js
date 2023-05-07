let canvas;
let world;
let gameHight = 480;
let gameWidth = 720;
let keyboard = new Keyboard();
let intervalIDs = [];
let mobileDevice;
let backgroundBirds = new Audio('audio/backgroundbirds.mp3');
// let idScreens = ['startScreen','canvas-Container'];
let sound = true;
let paused = false;
let gameFinished = false;


function init() {
  if(!sound) sound = true;
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
   
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    showInGameMenue();
   // if (sound) backgroundBirds.play();
    checkIfMusicShouldPlay();
  
    detectMobileDevice();
    if (mobileDevice){
        document.getElementById('mobileButtonsLayer').classList.remove('d-none');
        document.getElementById('explanation').classList.add('d-none');
        document.getElementById('7').classList.add('d-none');
        console.log('Mobiles Gerät erkannt');
      
    }
    bindBtsPressEvents();


    if(!document.getElementById('youlost').classList.contains('d-none'))  document.getElementById('youlost').classList.add('d-none');
   if(!document.getElementById('youwon').classList.contains('d-none')) document.getElementById('youwon').classList.add('d-none');
}

function togglePause(){
  if(paused) paused = false;
  
  else {
    paused = true;
      }
  
}

function checkIfMusicShouldPlay(){
  setInterval(()=> {
    if (!paused && sound) backgroundBirds.play();
    else {
      backgroundBirds.pause();
          }
  },500);
}
function showInGameMenue(){
  document.getElementById('0').classList.add('d-none');
  document.getElementById('2').classList.remove('d-none')
  document.getElementById('4').classList.remove('d-none');
  document.getElementById('5').classList.remove('d-none');
  document.getElementById('6').classList.add('d-none');
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
}

function gameEnd() {
    intervalIDs.forEach(clearInterval);
    // clearAllIntervals();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }


  function detectMobileDevice(){
 mobileDevice = false;
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        document.getElementById('explanation').classList.add('d-none');
        document.getElementById('7').classList.add('d-none');
      mobileDevice = true;
     }
     return mobileDevice;
  }
  
 

window.addEventListener('keydown', (e) => {
    // if (e.keyCode == 38) keyboard.UP = true;
    // if (e.code == "ArrowDown") keyboard.DOWN = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
});

window.addEventListener('keyup', (e) => {
    // if (e.keyCode == 38) keyboard.UP = false;
    // if (e.code == "ArrowDown") keyboard.DOWN = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
});


function bindBtsPressEvents(){
    console.log('mobile Tasten');
    document.getElementById('btnMoveLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
   document.getElementById('btnMoveLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnMoveRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnMoveRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnJumpUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('btnJumpUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });

    document.getElementById('btnMobileThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
       keyboard.SPACE = true;
    });

    document.getElementById('btnMobileThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

function showInfo(){
  document.getElementById('infoLayer').classList.remove('d-none');
}

function closeInfo(){
  document.getElementById('infoLayer').classList.add('d-none');
}

function fullscreen(){
  if (!mobileDevice){
 
  let fullscreen = document.getElementById('main');
  // let startScreen = document.getElementById('startScreen');
   enterFullscreen(fullscreen);
  //  enterFullscreen(startScreen);
  
  
}
}

function enterFullscreen(element) {

    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
    document.getElementById('7').classList.add('d-none');
    document.getElementById('8').classList.remove('d-none');
  }

  function exitFullscreen() {
   
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    document.getElementById('7').classList.remove('d-none');
    document.getElementById('8').classList.add('d-none');
  }

function stopSoundAtTheEnd(){
  console.log('ende aus');
  if(sound) backgroundBirds.pause();
  sound = false;
}

  function toggleSound(){
    console.log(sound);
    if(sound) {
      backgroundBirds.pause();

      sound = false;
      document.getElementById('2').classList.add('d-none');
      document.getElementById('3').classList.remove('d-none');

      
    }
    else {
      backgroundBirds.play();
      
      sound = true;
      
      document.getElementById('2').classList.remove('d-none');
      document.getElementById('3').classList.add('d-none');
    }
    
  }

  function stopGame(){
    document.getElementById('startScreen').classList.remove('d-none');
    gameEnd();
    setMenuStartScreen();
    stopSoundAtTheEnd();
    if(!document.getElementById('youlost').classList.contains('d-none'))  document.getElementById('youlost').classList.add('d-none');
    if(!document.getElementById('youwon').classList.contains('d-none')) document.getElementById('youwon').classList.add('d-none');
   
  }

  function setMenuStartScreen(){
    document.getElementById('0').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('1').classList.remove('d-none');
    document.getElementById('2').classList.add('d-none');
    document.getElementById('3').classList.add('d-none');
    document.getElementById('4').classList.add('d-none');
    document.getElementById('5').classList.add('d-none');
    document.getElementById('6').classList.add('d-none');
    document.getElementById('7').classList.remove('d-none');
    document.getElementById('8').classList.add('d-none');

  }

  
  