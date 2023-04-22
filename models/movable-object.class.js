class MovableObject {
    x = 120;
    y = 290;
    img;
    height = 150;
    width = 120;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;



    constructor(x, y,) { }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);

    }

    isAboveGround() {
        return this.y < 230;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            if(this instanceof Character){
            ctx.rect(this.x+25, this.y+35, this.width - 100, this.height -50);
            }
            if(this instanceof Chicken){
                ctx.rect(this.x, this.y, this.width, this.height);
                }
            ctx.stroke();
        }
    }



    isColliding(obj) {
        return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
                (this.Y + this.offsetY + this.height) >= obj.Y &&
                (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
                obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

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
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}