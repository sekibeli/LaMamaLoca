class ThrowableObject extends MovableObject {

    IMAGES_FIRE = [
        'images/fire/fire1.png',
        'images/fire/fire2.png',
        'images/fire/fire3.png',
        'images/fire/fire4.png',
        'images/fire/fire5.png',
        'images/fire/fire6.png',
        'images/fire/fire7.png',
        'images/fire/fire8.png',
        'images/fire/fire9.png',
        'images/fire/fire10.png',
    ];
    constructor(x, y){
        super();
        this.loadImage('images/fire/fire1.png');
          
       this.loadImages(this.IMAGES_FIRE);
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
      
      this.throw();
      this.fireAnimation();
        
      
        
    }

speedX = 30;
    


throw(){
    this.speedY = 15;
this.applyGravity();
let flyingApple = setInterval(()=> {
    if(!world.character.otherDirection)
    {
        this.x += 15;
    }
    else {
        this.x -= 15;
    }
},10);

}


// fire() {
//     if (world.keyboard.SPACE)
//     this.playAnimation(this.IMAGES_FIRE);
        

// }

// fireAnimation() {
//     setInterval(() => {
//         this.fire();
//     }, 20);
// }


fireAnimation(){
    setInterval(()=>{
            this.playAnimation(this.IMAGES_FIRE);
            },30)
}


}



