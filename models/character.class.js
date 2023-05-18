class Character extends MovableObject {
    height = 220;
    width = 180;
    currentImage = 0;
    world;
    speed = 3;
    CHAR_WALKING = new Audio('audio/walk.mp3');
    CHAR_JUMPING = new Audio('audio/littlejump.mp3');
    CHAR_DYING = new Audio('audio/characterDies.mp3');
    CHAR_HURT = new Audio('audio/characterOuchlong.mp3');
    CHAR_SHOOT = new Audio('audio/shoot1.mp3');
    invulnerable = false;
    offset = {
        top: 100,
        bottom: 20,
        left: 30,
        right: 90
    }
    end = false;
    characterDead = false;
    energy = 90;
    hitByEndboss = false;
    animations;

    IMAGES_WALKING = [
        'images/Mage/Walk/walk1.png',
        'images/Mage/Walk/walk2.png',
        'images/Mage/Walk/walk3.png',
        'images/Mage/Walk/walk4.png',
        'images/Mage/Walk/walk5.png',
        'images/Mage/Walk/walk6.png'
    ];

    IMAGES_ATTACK = [

        'images/Mage/Attack/attack5.png',
        'images/Mage/Attack/attack1.png'
    ]

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
        this.loadImages(this.IMAGES_ATTACK);
        this.applyGravity();
        this.animate();
    }

    /**
     * Clears the character idle-Interval when the Player plays the game
     * Moves the character
     */
    characterMove() {
        if (checkIfPlayerPlays()) {
            clearInterval(idle);
        }
        if (this.world.keyboard.RIGHT && this.x <= this.world.level.level_end_x && !this.characterDead && !paused) {
            this.moveRight();
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > 0 && !this.characterDead && !paused) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.world.keyboard.D && !this.isAboveGround() && !this.characterDead) {
            this.characterJumps();
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Jump animation character and play jump sound
     */
    characterJumps() {
        this.jump();
        setTimeout(() => {
            this.loadImage(this.IMAGES_WALKING[0]);
        }, 1000);
        if (sound) this.CHAR_JUMPING.play();
    }

    /**
     * Shows the animations when character dies, is hurt, jumps or is walking
     */
    characterAnimation() {
        this.clearIdleInterval();
        if (this.characterDead && !this.end && this.world.level.endboss.energy > 0) {
            this.characterDies();
        }
        else if (this.isHurt() && !this.characterDead || this.hitByEndboss) {
            this.characterIsHurt();
        }
        else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
        else {
            this.characterIsWalking();
        }
    }

    /**
     * Clears the character idle-Interval when the Player plays the game
     */
    clearIdleInterval() {
        if (checkIfPlayerPlays() || this.isHurt()) {
            clearInterval(idle);
        }
    }


    characterIsWalking() {
        if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.characterDead && !paused) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    characterDies() {
        if (sound) this.CHAR_DYING.play();
        this.currentImage = 0;
        setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 200);
        this.end = true;
        world.showEndScreen();
    }


    characterIsHurt() {
        this.CHAR_HURT.loop = false;
        if (sound) this.CHAR_HURT.play();
        this.playAnimation(this.IMAGES_HURT);
        this.hitByEndboss = false;
    }

    /**
     * starts the animation-Intervals
     */
    animate() {
        setStoppableInterval(() => {
            this.characterMove();
        }, 1000 / 60);
        setStoppableInterval(() => {
            this.characterAnimation();
            this.checkIfCharacterIsDead();
        }, 100);
    }

    /**
     * 
     * @returns nothing
     * plays the characterDead-animation if the character has no energy left.
     */
    checkIfCharacterIsDead() {
        if (this.energy <= 0) {
            this.characterAnimation();
            return;
        }
    }

    /**
     * acceleration for jump
     */
    jump() {
        this.speedY = 28;
    }

    /**
     * character dead if endboss hits and pushes him to the left
     */
    endbossHit() {
        this.speedY = 15;
        this.applyGravity();
        let pushback = setInterval(() => {
            this.x -= 25;
            if (this.y == 230) clearInterval(pushback);
        }, 10);
        this.energy = 0;
        this.characterDead = true;
    }
} 
