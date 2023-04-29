class Apple extends ThrowableObject {
    width = 50;
height = 50;
speed = 0;
APPLE_BITE = new Audio('audio/appleBite.mp3');
    constructor(){
        super();
        this.loadImage('images/apple.png');
        this.x = 300 + Math.random() * 2000;
        this.y = 200 + Math.random() * 200;
      
    }
}