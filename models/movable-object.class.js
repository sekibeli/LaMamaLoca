class MovableObject extends DrawableObject{
       speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    amount_apples = 0;
    amount_coins = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

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
 
    // isColliding(obj) {
    //     return this.x + 25 + this.width - 100 > obj.x &&
    //         this.y + 35 + this.height - 50 > obj.y &&
    //         this.x + 25 < obj.x &&
    //         this.y + 35 < obj.y + obj.height
    // }




        isColliding(obj) {
            return  (this.x  + this.width - this.offset.right) >= obj.x + obj.offset.left && 
                    this.x + this.offset.left <= (obj.x + obj.width - obj.offset.right) && 
                    (this.y + this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
                    (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom) 
                    // && obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

    }
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

    // collect(item){
    //     item++;
    //             // this.amount_apples++;
    //             console.log('einer mehr: ',item);
    // }

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
      
        return timepassed < 2;
    }
    isDead() {
        return this.energy == 0;
    }

    enemyIsDying(enemy){
        if(!this.enemyAlive){
            enemy.y -= 50;
           if (enemy.y < 0) enemy.y = 0;
            
          }
        }
}