class DrawableObject {
    x = 120;
    y = 290;
    height = 150;
    width = 120;
    img;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    /**
     * 
     * @param {*} ctx 
     * Draws the box around the pics
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Spider || this instanceof Endboss || this instanceof Coin || this instanceof Fireball || this instanceof Mosquito) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            if (this instanceof Chicken || this instanceof Character || this instanceof Spider || this instanceof Endboss || this instanceof Coin || this instanceof Fireball || this instanceof Mosquito) {
                ctx.rect(this.x, this.y, this.width, this.height);
            }
            ctx.stroke();
        }
    }

/**
 * 
 * @param {*} ctx 
 * @param {*} offset variable to eliminate space around element
 * Draws a box around the element in the pic
 */
    drawFrameOffset(ctx, offset) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Spider || this instanceof Endboss || this instanceof Coin || this instanceof Immunition || this instanceof Mosquito) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            if (this instanceof Chicken || this instanceof Character || this instanceof Spider || this instanceof Endboss || this instanceof Coin || this instanceof Immunition || this instanceof Mosquito) {
                ctx.rect(this.x + offset.left, this.y + offset.top, this.width - offset.left - offset.right, this.height - offset.top - offset.bottom);
            }
            ctx.stroke();
        }
    }
}