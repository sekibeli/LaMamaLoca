class World {
    character = new Character();
    sky = new Sky();
    level = level1;
  


    ctx;
    canvas;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
       
        this.addToMap(this.sky);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.backgroundObjects);


        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);


        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () { self.draw(); });
    }


    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    addToMap(moveObj) {
        if (moveObj.otherDirection) {
            this.ctx.save();
            this.ctx.translate(130, 0);
            this.ctx.scale(-1, 1);
            moveObj.x = moveObj.x * -1;
        }


        this.ctx.drawImage( moveObj.img, moveObj.x, moveObj.y, moveObj.width, moveObj.height);

        if (moveObj.otherDirection) {
            moveObj.x = moveObj.x * -1;
            this.ctx.restore();
        }
    }
}