class Endboss extends MovableObject {
width = 550;
height = 850;


    IMAGES_WALKING = [
        'images/Imp/Imp_walk1.png',
        'images/Imp/Imp_walk2.png',
        'images/Imp/Imp_walk3.png',
        'images/Imp/Imp_walk4.png',
        'images/Imp/Imp_walk5.png',
        'images/Imp/Imp_walk6.png',
        'images/Imp/Imp_attack1.png',
        'images/Imp/Imp_attack2.png',
        'images/Imp/Imp_attack3.png',
        'images/Imp/Imp_attack4.png'
       
    ]

    IMAGES_IDLE = [
        'images/Imp/Imp_idle1.png',
        'images/Imp/Imp_idle2.png',
        'images/Imp/Imp_idle3.png',
    ]

   


    constructor(){
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.x = 3500;
        this.y = -100;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.otherDirection = true;
            this.playAnimation(this.IMAGES_IDLE);
        }, 200);
    }
}