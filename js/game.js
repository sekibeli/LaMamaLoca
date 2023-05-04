let canvas;
let world;
let gameHight = 480;
let gameWidth = 720;
let keyboard = new Keyboard();
let intervalIDs = [];
let mobileDevice;


function init() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    detectMobileDevice();
    if ( mobileDevice){
        document.getElementById('menueLayer').classList.remove('d-none');
    }


}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
}

function stopGame() {
    intervalIDs.forEach(clearInterval);
    // clearAllIntervals();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

//   function detectMobileDevice(){
//     if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
//         document.getElementById('explanation').classList.add('d-none');
//      }
//   }

  function detectMobileDevice(){
 mobileDevice = false;
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        document.getElementById('explanation').classList.add('d-none');
      mobileDevice = true;
     }
     return mobileDevice;
  }

 

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 38) keyboard.UP = true;
    if (e.code == "ArrowDown") keyboard.DOWN = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.code == "ArrowDown") keyboard.DOWN = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
});