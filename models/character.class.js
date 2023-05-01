class Character extends MovableObject {
    height = 220;
    width = 180;
    currentImage = 0;
    world;
    speed = 3;
    CHAR_WALKING = new Audio('audio/walk.mp3');
    CHAR_JUMPING = new Audio('audio/littlejump.mp3');
    check = 0;
    invulnerable = false;
    offset = {
        top: 100,
        bottom: 20,
        left: 30,
        right: 90
    }
    end = false;
    characterDead = false;
    energy = 60;
    hitByEndboss = false;



    IMAGES_WALKING = [
        'images/Mage/Walk/walk1.png',
        'images/Mage/Walk/walk2.png',
        'images/Mage/Walk/walk3.png',
        'images/Mage/Walk/walk4.png',
        'images/Mage/Walk/walk5.png',
        'images/Mage/Walk/walk6.png'
    ];

    IMAGES_JUMPING = [
        'images/Mage/Jump/jump1.png',
        'images/Mage/Jump/jump2.png',
        'images/Mage/Jump/jump3.png',
        'images/Mage/Jump/jump4.png',
        'images/Mage/Jump/jump5.png',
        'images/Mage/Jump/jump6.png',
        'images/Mage/Jump/jump7.png'

    ]

    IMAGES_HURT = [
        'images/Mage/Hurt/hurt1.png',
        'images/Mage/Hurt/hurt2.png',
        'images/Mage/Hurt/hurt3.png',
        'images/Mage/Hurt/hurt4.png'
    ]


    IMAGES_DEAD = [
        'images/Mage/Death/death1.png',
        'images/Mage/Death/death2.png',
        'images/Mage/Death/death3.png',
        'images/Mage/Death/death4.png',
        'images/Mage/Death/death5.png',
        'images/Mage/Death/death6.png',
        'images/Mage/Death/death7.png',
        'images/Mage/Death/death8.png',
        'images/Mage/Death/death9.png',
        'images/Mage/Death/death10.png'
    ]
    IMAGES_IDLING = [
        'images/Mage/Idle/idle1.png',
        'images/Mage/Idle/idle2.png',
        'images/Mage/Idle/idle3.png',
        'images/Mage/Idle/idle4.png',
        'images/Mage/Idle/idle5.png',
        'images/Mage/Idle/idle6.png',
        'images/Mage/Idle/idle7.png',
        'images/Mage/Idle/idle8.png',
        'images/Mage/Idle/idle9.png',
        'images/Mage/Idle/idle10.png',
        'images/Mage/Idle/idle11.png',
        'images/Mage/Idle/idle12.png',
        'images/Mage/Idle/idle13.png',
        'images/Mage/Idle/idle14.png',

    ]



    constructor() {
        super();
        this.x = 100;
        this.y = 230;

        this.loadImage('images/Mage/Walk/walk1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLING);

        this.applyGravity();
        this.animate();

    }


    animate() {
        setInterval(() => {
            this.CHAR_WALKING.pause();
            if (this.world.keyboard.RIGHT && this.x <= this.world.level.level_end_x && !this.characterDead) {
                this.moveRight();
                this.otherDirection = false;
                this.CHAR_WALKING.play();

            }

            if (this.world.keyboard.LEFT && this.x > 0 && !this.characterDead) {
                this.moveLeft();
                this.otherDirection = true;
                this.CHAR_WALKING.play();

            }

            if (this.world.keyboard.D && !this.isAboveGround() && !this.characterDead) {
                this.jump();
                // this.y = 230;
            }

            if (this.world.keyboard.SPACE) {
                this.loadImage('images/Mage/Walk_Attack/walk_attack1.png');
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);




        setInterval(() => {
            if (this.isDead() && !this.end) {
                world.stopGame();
                console.log('1');
                this.playAnimationDead(this.IMAGES_DEAD, 'images/Mage/Death/death9.png');
                console.log('2');

                this.end = true;
                //    console.log(this.check);

            }
            else if (this.isHurt() && !this.characterDead || this.hitByEndboss) {
                this.playAnimation(this.IMAGES_HURT);
                // this.loadImage('images/Mage/Walk/walk1.png');
                this.hitByEndboss = false;
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.CHAR_JUMPING.play();
            } else {

                if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.characterDead) {
                    // walk animation
                    
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    // this.playAnimation(this.IMAGES_IDLING);



                }
            }

        }, 100);
    }

    jump() {
        this.speedY = 28;
    }

    endbossHit() {
        this.speedY = 15;
        this.applyGravity();
       
       let pushback = setInterval(() => {
            this.x -= 25;
            if(this.y == 230) clearInterval(pushback);
        }
            , 10);

    }
} 
