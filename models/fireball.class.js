class Fireball extends ThrowableObject {
    width = 150;
    height = 150;
    speed = 0;
    FIRE_COLLECT = new Audio('audio/appleBite.mp3');
    offset = {
        top: 80,
        bottom: 30,
        right: 50,
        left: 60
    }
    explode;
    explosionX;
    explosionY;
    animationFire;
    AUDIO_EXPLOSION = new Audio('audio/explosion.mp3');
    IMAGES = [
        'images/fireCollect2.png'
    ];


    constructor(x, y) {
        super(x, y);
        this.loadImages(this.IMAGES_EXPLOSION);
        this.x = x;
        this.y = y;
    }

/**
 * Calls the explosion-Animation and clears it after 905 ms
 */
    fireballExplosion() {
        this.explosionAnimation();
        setTimeout(() => {
            clearInterval(this.explode);
            world.explosions.splice(0, 1);
        }, 950);
    }

/**
 * Shows the explosion-animation with sound
 */
    explosionAnimation() {
        this.currentImage = 0;
        this.explode = setInterval(() => {
            this.x = this.explosionX;
            this.y = this.explosionY;
            this.width = 400
            this.height = 400;
            if (!paused) this.playAnimation(this.IMAGES_EXPLOSION);
        }, 60);
        this.AUDIO_EXPLOSION.play();
    }

/**
 * Shows the fire-flight and calls the explosion when character is hitten
 */
    shootAnimation() {
        this.animationFire = setInterval(() => {
            if (this.x > world.level.endboss.x - 300 && this.y < world.level.endboss.y + 300) {  //hat funktioniert
                this.showExplosion();
            }
            else {
                this.showFireFlightAnimation();
            }
        }, 10)
    }

    /**
     * clears the flying animations and calls the fireball explosion animation.
     */
    showExplosion() {
        clearInterval(this.flyingFire);
        clearInterval(this.animationFire);
        this.explosionX = this.x - 80;
        this.explosionY = this.y - 100;
        this.fireballExplosion();
    }

    /**
     * Shows the flight of the fire and clears it after 400 ms
     */
    showFireFlightAnimation() {
        this.playAnimation(this.IMAGES_FIRE);
        setTimeout(() => {
            clearInterval(this.animationFire);
            clearInterval(this.flyingFire);
        }, 400);
    }

    // isCollidingWith(obj) {
    //     return this.x + this.width - this.offset.right > obj.x + obj.offset.left;
    //     // this.x + this.offset.left < obj.x + obj.width - obj.offset.right
    // }

}