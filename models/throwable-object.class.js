class ThrowableObject extends MovableObject {

    constructor(x, y){
        super();
        this.loadImage('images/apple.png');
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
     
        
    }

speedX = 30;
    

throw(){

this.speedY = 25;
this.applyGravity();

setInterval(() => {
    if (!this.otherDirection) {
        this.x += 15;
    }
    else {
        this.x -= 15;
    }
}, 25);

}


}