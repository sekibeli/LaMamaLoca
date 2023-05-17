let canvas;
let world;
let gameHight = 480;
let gameWidth = 720;
let keyboard = new Keyboard();
let intervalIDs = [];
let mobileDevice;
let backgroundBirds = new Audio('audio/backgroundbirds.mp3');
let sound = true;
let paused = false;
let gameFinished = false;
let idle;
let timer;
let keyup;
let touchstart;
let clickdrauf;

function createWorld() {
  document.getElementById('canvas').classList.remove('d-none');
  document.getElementById('startScreen').classList.add('d-none');

  initLevel();

  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);

}

function checkIfMobileDeviceIsUsed(){
  if (detectMobileDevice() || isIpadOS()) {
    document.getElementById('mobileButtonsLayer').classList.remove('d-none');
    document.getElementById('explanation').classList.add('d-none');
    document.getElementById('7').classList.add('d-none');
    console.log('Mobiles Gerät erkannt');
  }
}

function init() {
  if (!sound) sound = true;
  clearInterval(idle);
  createWorld();
  showInGameMenue();
  checkIfMusicShouldPlay();
  checkIfMobileDeviceIsUsed();
  bindBtsPressEvents();


  if (!document.getElementById('youlost').classList.contains('d-none')) document.getElementById('youlost').classList.add('d-none');
  if (!document.getElementById('youwon').classList.contains('d-none')) document.getElementById('youwon').classList.add('d-none');
 
  listenerOn();
}

function listenerOn(){
  addEventListener("keyup", debounce(doNothing, 3500));
  addEventListener("touchstart", debounce(doNothing, 3500));
  addEventListener("click", debounce(doNothing, 3500));
}

function togglePause() {
  if (paused) paused = false;

  else {
    paused = true;
  }

}

function checkIfMusicShouldPlay() {
  setInterval(() => {
    if (!paused && sound) backgroundBirds.play();
    else {
      backgroundBirds.pause();
    }
  }, 500);
}


function showInGameMenue() {
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
}


function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


function detectMobileDevice() {
  mobileDevice = false;
  if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)) {
    document.getElementById('explanation').classList.add('d-none');
    document.getElementById('7').classList.add('d-none');
    mobileDevice = true;
  }
  return mobileDevice;
}


function isIpadOS() {
  return navigator.maxTouchPoints &&
    navigator.maxTouchPoints > 2 &&
    /MacIntel/.test(navigator.platform);
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


function bindBtsPressEvents() {
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


function showInfo() {
  document.getElementById('infoLayer').classList.remove('d-none');
}


function closeInfo() {
  document.getElementById('infoLayer').classList.add('d-none');
}


function fullscreen() {
  if (!mobileDevice) {

    let fullscreen = document.getElementById('main');
           enterFullscreen(fullscreen);
     }
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {  // iOS Safari
    element.webkitRequestFullscreen();
  }
  adjustFullscreen();
}


function adjustFullscreen(){
  document.getElementById('canvas').style.height = "100vh";
  document.getElementById('7').classList.add('d-none');
  document.getElementById('8').classList.remove('d-none');
}


function stopFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  adjustExitFullscreen();
 }


function adjustExitFullscreen(){
  document.getElementById('canvas').style.height = "";
  document.getElementById('7').classList.remove('d-none');
  document.getElementById('8').classList.add('d-none');
}


function stopSoundAtTheEnd() {
  if (sound) backgroundBirds.pause();
  sound = false;
}


function toggleSound() {
  console.log(sound);
  if (sound) {
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


function stopGame() {
  document.getElementById('startScreen').classList.remove('d-none');
  gameEnd();
  setMenuStartScreen();
  stopSoundAtTheEnd();
  if (!document.getElementById('youlost').classList.contains('d-none')) document.getElementById('youlost').classList.add('d-none');
  if (!document.getElementById('youwon').classList.contains('d-none')) document.getElementById('youwon').classList.add('d-none');
  listenerOff();
  clearInterval(idle);
  clearAllIntervals();
   
}


function listenerOff(){
  removeEventListener("keyup", debounce(doNothing, 3500));
  removeEventListener("touchstart", debounce(doNothing, 3500));
  removeEventListener("click", debounce(doNothing, 3500));
}


function setMenuStartScreen() {
  document.getElementById('0').classList.remove('d-none');
  document.getElementById('canvas').classList.add('d-none');
  document.getElementById('1').classList.remove('d-none');
  document.getElementById('2').classList.add('d-none');
  document.getElementById('3').classList.add('d-none');
  document.getElementById('4').classList.add('d-none');
  document.getElementById('5').classList.add('d-none');
  document.getElementById('6').classList.add('d-none');
  detectFullscreenModus();
  if (detectMobileDevice() || isIpadOS()) {
    document.getElementById('7').classList.add('d-none');
    document.getElementById('mobileButtonsLayer').classList.add('d-none');
  }
 }


function detectFullscreenModus(){
  if (window.innerHeight == screen.height && !(mobileDevice || isIpadOS())) {
    document.getElementById('7').classList.add('d-none');
    document.getElementById('8').classList.remove('d-none');
   
  }
}


function debounce(func, timeout) {
  timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}


function checkIfPlayerPlays() {
  return keyboard.LEFT || keyboard.RIGHT || keyboard.D || keyboard.SPACE;
}


const doNothing = () => {
  console.log("Inaktivität");
  idle = setInterval(() => {
    // world.character.waiting = true;
    if (paused) {
      clearInterval(idle);
      return;
    }
    else { world.character.playAnimation(world.character.IMAGES_IDLING); }
  }, 150);
};

