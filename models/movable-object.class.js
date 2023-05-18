class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    currentImage = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    lastHit = 0;

    /**
     * Simulation of the gravity
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this instanceof Character && this.y > 230) {
                this.y = 230;
            }
        }, 1000 / 25);
    }

    /**
     * 
     * @returns true, if the character is above ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 230;
        }
    }

    /**
     * 
     * @param {*} obj Objects to be collected
     * @returns boolean, if a object collided with the character
     */
    isColliding(obj) {
        return (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left &&
            this.x + this.offset.left <= (obj.x + obj.width - obj.offset.right) &&
            (this.y + this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom)
    }

    /**
     * 
     * @param {*} obj object to check if it collides with the endboss
     * @returns 
     */
    isCollidingEndboss(obj) {
        return this.x + this.width + this.offset.right >= obj.x - obj.offset.left
    }


    moveRight() {
        this.x += this.speed;

    }

    moveLeft() {
        this.x -= this.speed;
    }


/**
 * shows the walking animation
 */
    animate() {
        setStoppableInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);

    }

/**
 * 
 * @param {*} images array of pics
 * with each call the next pic will be shown
 */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

    }

/**
 * with each call the object will loose energy
 */
    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * 
     * @returns true if less than 1 second has passed after a hit
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000 // sec

        return timepassed < 1;
    }


    isDead() {
        return this.energy == 0;
    }

}