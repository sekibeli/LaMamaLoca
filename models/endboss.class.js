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
    energy = 60;
    animationStop;


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
        // 'img/4_enemie_boss_chicken/2_alert/G5.png',
        // 'img/4_enemie_boss_chicken/2_alert/G6.png',
        // 'img/4_enemie_boss_chicken/2_alert/G7.png',
        // 'img/4_enemie_boss_chicken/2_alert/G8.png',
        // 'img/4_enemie_boss_chicken/2_alert/G9.png',
        // 'img/4_enemie_boss_chicken/2_alert/G10.png',
        // 'img/4_enemie_boss_chicken/2_alert/G11.png',
        // 'img/4_enemie_boss_chicken/2_alert/G12.png',
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

    IMAGES_DEATH = [
        // 'images/Imp/Impdeath1.png',
        // 'images/Imp/Impdeath2.png',
        // 'images/Imp/Impdeath3.png',
        // 'images/Imp/Impdeath4.png',
        // 'images/Imp/Impdeath5.png',
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
        console.log('constructor Endboss');
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.hitWithApple = false;
        this.amountAppleHits = 0;
        this.x = 3500;
        this.y = -50;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.endbossMoves();
            // world.checkIfEndbossIsDead();


        }, 250);
    }

    endbossMoves() {
        if (this.endbossDead) {
            this.currentImage = 0;
            console.log('play dead endboss:');
            let playEndbossAnimation = setInterval(() => { this.playAnimation(this.IMAGES_DEATH) }, 250)
            // setTimeout(() => {
            //     clearInterval(playEndbossAnimation);
            // }, 1000);


            world.showEndScreen();

        }

        else if (!this.hitWithApple && !this.endbossDead) {
            this.otherDirection = true;
            this.playAnimation(this.IMAGES_IDLE);


        }
        else if (this.seeEndboss() && !this.endbossDead) {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
            //    this.playAnimation(this.IMAGES_ATTACK);


        }

        //   else if (world.character.x < this.x && !this.dead) {
        //     console.log(world.character.x < this.x && !this.dead);
        //     this.playAnimation(this.IMAGES_WALKING);



        //   }
        //   else if (world.character.x > this.x && !this.dead) {
        //     this.playAnimation(this.IMAGES_WALKING);
        //     this.moveLeft();
        //     console.log('2');

        //   }

        //   else if 

        //      (world.checkIfEndbossIsDead()){
        //     console.log('endboss erledigt');
        //     this.playAnimationDead(this.IMAGES_DEATH, 'images/Imp/Imp_death8.png');
        //     this.end = true;
        //     return;
        //   }




    }



    seeEndboss() {
        return (world.character.x > 3000 || this.hitWithApple)
    }


}