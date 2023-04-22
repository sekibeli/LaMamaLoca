class Character extends MovableObject {
    height = 220;
    width = 180;
    currentImage = 0;
    world;
    speed = 3;
    CHAR_WALKING = new Audio('audio/walk.mp3');
    CHAR_JUMPING = new Audio('audio/littlejump.mp3');


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



    constructor() {
        super();
        this.x = 100;
        this.y = 230;

        this.loadImage('images/Mage/Walk/walk1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();

    }

   
    animate() {
        setInterval(() => {
            this.CHAR_WALKING.pause();
            if (this.world.keyboard.RIGHT && this.x <= this.world.level.level_end_x) {
              this.moveRight();
              this.otherDirection = false;
              this.CHAR_WALKING.play();

            }

            if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
                this.CHAR_WALKING.play();

            }
            
            if (this.world.keyboard.D && !this.isAboveGround()){
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);




        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.CHAR_JUMPING.play();
            } else {


            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // walk animation
                this.playAnimation(this.IMAGES_WALKING);
            }
        }

        }, 100);
    }

    jump(){
        this.speedY = 25;
    }
} 
