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

this.speedY = 30;
this.applyGravity();

setInterval(() => {
    this.x += 10;
}, 25);

}


}