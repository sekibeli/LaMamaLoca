class MovableObject extends DrawableObject{
       speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    amount_apples = 0;
    amount_coins = 0;

lastHit = 0;

    // constructor(x, y,) { }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);

    }

    isAboveGround() {
        if(this instanceof ThrowableObject){
            return true;
        } else {
        return this.y < 230;
        }
    }
 
    isColliding(obj) {
        return this.x + 25 + this.width - 100 > obj.x &&
            this.y + 35 + this.height - 50 > obj.y &&
            this.x + 25 < obj.x &&
            this.y + 35 < obj.y + obj.height
    }




    //     isColliding(obj) {
    //         return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
    //                 (this.y + this.offsetY + this.height) >= obj.y &&
    //                 (this.y + this.offsetY) <= (obj.y + obj.height) && 
    //                 obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

    // }
    moveRight() {
        this.x += this.speed;

    }

    moveLeft() {
        this.x -= this.speed;
    }



    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);

    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        
        this.currentImage++;
        
    }

    playAnimationDead(images) {
        for (let i = 0; i <images.length; i++){
        let path = images[i];
        this.img = this.imageCache[path];
        console.log(this.img);
        }
        
        
    }

    collect(){
                this.amount_apples++;
                console.log('einer mehr: ', this.amount_apples);
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
           this.energy = 0; 
        } else {
            this.lastHit = new Date().getTime();

        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000 // sec
      
        return timepassed < 1;
    }
    isDead() {
        return this.energy == 0;
    }
}