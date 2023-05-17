class ThrowableObject extends MovableObject {
    i = 1;
    flyingFire;
    animationFire;
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
//    explosion = false;
currentImage = 0;
    constructor(x, y) {
        super();
        this.loadImage('images/fire/fire1.png');

        this.loadImages(this.IMAGES_FIRE);
        this.loadImages(this.IMAGES_EXPLOSION);
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        this.flyingFire = setInterval(() => {
                         if (!world.character.otherDirection) {
                    this.x += 25;
                }
                else {
                    this.x -= 25;
                }
                  }, 10);
    }


}



