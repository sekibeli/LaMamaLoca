class ThrowableObject extends MovableObject {
    i = 1;
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

    IMAGES_EXPLOSION = [
        'images/Explosion/Explosion1.png',
        'images/Explosion/Explosion2.png',
        'images/Explosion/Explosion3.png',
        'images/Explosion/Explosion4.png',
        'images/Explosion/Explosion5.png',
        'images/Explosion/Explosion6.png',
        'images/Explosion/Explosion7.png',
        'images/Explosion/Explosion8.png',
        'images/Explosion/Explosion9.png'


    ]

    constructor(x, y) {
        super();
        this.loadImage('images/fire/fire1.png');

        this.loadImages(this.IMAGES_FIRE);
        this.loadImages(this.IMAGES_EXPLOSION);
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;

        this.throw();
        this.fireAnimation();
       


    }

    // speedX = 30;



    throw() {
        this.speedY = 15;
        this.applyGravity();
        let flyingFire = setInterval(() => {
            if (!world.character.otherDirection) {
                this.x += 15;
            }
            else {
                this.x -= 15;
            }
           
        }, 10);


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


    fireAnimation() {
        let animationFire = setInterval(() => {

            // if (this.isColliding(world.level.endboss) && !world.level.endboss.endboss_invulnerable) {
            //     console.log('buuuuum');
               
            // }
            // else { 
                this.playAnimation(this.IMAGES_FIRE); 
            // }


        }, 30)
    }


}



