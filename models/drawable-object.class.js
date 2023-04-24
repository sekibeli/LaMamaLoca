class DrawableObject {
   
    x = 120;
    y = 290;
    height = 150;
    width = 120;
    img;
    imageCache = {};
    currentImage = 0;

    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // console.log('draw Image', this.img.src);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
          
        });

    }
    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            // if(this instanceof Character){
            // ctx.rect(this.x+25, this.y+35, this.width - 100, this.height -50);
            // }
            if (this instanceof Chicken || this instanceof Character) {
                ctx.rect(this.x, this.y, this.width, this.height);
            }
            ctx.stroke();
        }
    }
}