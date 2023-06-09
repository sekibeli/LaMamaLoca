class Endboss extends MovableObject {
    width = 600;
    height = 700;
    offset = {
        top: 150,
        bottom: 190,
        left: 80,
        right: 180
    }
    speed = 25;
    amountAppleHits = 0;
    endbossDead = false;
    end = false;
    energy = 90;
    // animationStop = false;
    endboss_invulnerable = false;
    ENDBOSS_DIES = new Audio('audio/youWoncuttedShort.mp3');
    // endbossHit = false;

    IMAGES_WALKING = [
        'images/Imp/Impwalk1.png',
        'images/Imp/Impwalk2.png',
        'images/Imp/Impwalk3.png',
        'images/Imp/Impwalk4.png',
        'images/Imp/Impwalk5.png',
        'images/Imp/Impwalk6.png',
        'images/Imp/Impattack1.png',
        'images/Imp/Impattack2.png',
        'images/Imp/Impattack3.png',
        'images/Imp/Impattack4.png'
    ]

    IMAGES_ATTACK = [
        'images/Imp/Impattack1.png',
        'images/Imp/Impattack2.png',
        'images/Imp/Impattack3.png',
        'images/Imp/Impattack4.png'
    ]

    IMAGES_IDLE = [
        'images/Imp/Impidle1.png',
        'images/Imp/Impidle2.png',
        'images/Imp/Impidle3.png'
    ]

    IMAGES_HURT = [
        'images/Imp/Imphurt1.png',
        'images/Imp/Imphurt2.png',
        'images/Imp/Imphurt3.png',
        'images/Imp/Imphurt4.png',
    ]

    IMAGES_MUCHHURT = [
        // 'images/Imp/Imphurt4.png',
        'images/Imp/Impliohurt1.png',
        'images/Imp/Impliohurt2.png',
        'images/Imp/Impliohurt3.png'
    ]

    IMAGES_DEATH = [
        'images/Imp/Impdeath6.png',
        'images/Imp/Impdeath7.png',
        'images/Imp/Impdeath8.png',
        'images/Imp/Impdeath9.png',
        'images/Imp/Impdeath10.png',
        'images/Imp/Impdeath11.png',
        'images/Imp/Impdeath12.png',
        'images/Imp/Impdeath13.png'
    ]


    constructor() {
        super();
               this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_MUCHHURT);
        this.hitWithApple = false;
        this.amountAppleHits = 0;
        this.x = 3500;
        this.y = -50;
        this.animate();
    }

    /**
     * Starts the intervals witch moves the endboss
     */
    animate() {
        setStoppableInterval(() => {
            this.endbossMoves();
        }, 250);
    }

    /**
     * Behaviour of endboss
     */
    endbossMoves() {
        if (this.endbossDead && world.character.energy > 0) {
           this. endbossDies();
        }
        else if (this.hitWithApple || Math.abs(world.character.x - this.x) <= 1000 && !this.endbossDead && !paused ) {
            if (world.character.x < this.x && !world.character.characterDead) {
              this.endbossWalking();
            }
            else if (0 < Math.abs(world.character.x - this.x) < 300 && world.character.energy <= 0 && !paused) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }
        // else if (this.hitWithApple || world.character.x > 2720 && world.character.x < this.x) {
        //    this.endbossWalking();
        // }
        // else {
        //     this.otherDirection = true;
        //     this.playAnimation(this.IMAGES_IDLE);
        // }
    }

/**
 * Animation endboss walks left
 */
endbossWalking(){
    this.otherDirection = true;
    if(!paused){
    this.playAnimation(this.IMAGES_WALKING);
    this.moveLeft();
    }
}

/**
 * Animation endboss dies
 */
    endbossDies(){
        if (sound) this.ENDBOSS_DIES.play();
        this.currentImage = 0;
        let playEndbossAnimation = setInterval(() => { this.playAnimation(this.IMAGES_DEATH) }, 250)
        world.showEndScreen();
    }

}