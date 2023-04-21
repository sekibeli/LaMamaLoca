let canvas;
let world;
let gameHight = 480;
let gameWidth = 720;
let keyboard = new Keyboard();


function init(){
    canvas = document.getElementById('canvas');
   
    world = new World(canvas, keyboard);
   
}


window.addEventListener('keydown', (e) => {
console.log(e);
if (e.keyCode == 38) keyboard.UP = true;
if (e.code == "ArrowDown") keyboard.DOWN = true;
if (e.code == "ArrowLeft") keyboard.LEFT = true;
if (e.code == "ArrowRight") keyboard.RIGHT = true;
if (e.keyCode == 32) keyboard.SPACE = true;
if (e.keyCode == 68) keyboard.D = true;

});

window.addEventListener('keyup', (e) => {
    console.log(e);
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.code == "ArrowDown") keyboard.DOWN = false;
    if (e.code == "ArrowLeft") keyboard.LEFT = false;
    if (e.code == "ArrowRight") keyboard.RIGHT = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
    
    });