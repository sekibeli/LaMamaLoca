class Apple extends MovableObject {
    width = 50;
height = 50;
speed = 0;
    constructor(){
        super();
        this.loadImage('images/apple.png');
        this.x = 300 + Math.random() * 2000;
        this.y = 200 + Math.random() * 200;
      
    }
}