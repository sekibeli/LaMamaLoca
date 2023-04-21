class Character extends MovableObject {
    height = 220;
    width = 180;
    IMAGES_WALKING = [
        'images/Mage/Walk/walk1.png',
        'images/Mage/Walk/walk2.png',
        'images/Mage/Walk/walk3.png',
        'images/Mage/Walk/walk4.png',
        'images/Mage/Walk/walk5.png',
        'images/Mage/Walk/walk6.png'
    ];
    currentImage = 0;
    world;
    speed = 3;
    CHAR_WALKING = new Audio('audio/walk.mp3');

    constructor() {
        super();
        this.x = 100;
        this.y = 230;

        this.loadImage('images/Mage/Walk/walk1.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate() {
         setInterval(() => {
            this.CHAR_WALKING.pause();
            if(this.world.keyboard.RIGHT && this.x <= this.world.level.level_end_x){
                this.otherDirection = false;
                this.x += this.speed;
                this.CHAR_WALKING.play();
                
            }

            if(this.world.keyboard.LEFT && this.x > 0){
                this.otherDirection = true;
                this.x -= this.speed;
                this.CHAR_WALKING.play();
                
            }
            this.world.camera_x = -this.x  +100;
        }, 1000/60);
        
        
        
        
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // walk animation
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }

            
        }, 100);
    }

} 
