class World {
    character = new Character();
     statusBar = new StatusBar();
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
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

checkCollisions(){
    setInterval(() => {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                console.log('Collision with Character', this.character.energy );
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                
            }
            
    });
    },200);
}

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.sky);
        
        this.addObjectsToMap(this.level.clouds);
        
        this.addObjectsToMap(this.level.backgroundObjects);


        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
// ----------- fixed elements --------->
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        // this.addToMap(this.health);
        this.ctx.translate(this.camera_x, 0);
//--------------------------------------->
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
          this.flipImage(moveObj);
        }


       moveObj.draw(this.ctx);
moveObj.drawFrame(this.ctx);

        

        if (moveObj.otherDirection) {
           this.flipImageBack(moveObj);
        }
    }

    flipImage(moveObj){
        this.ctx.save();
        this.ctx.translate(130, 0);
        this.ctx.scale(-1, 1);
        moveObj.x = moveObj.x * -1;
    }

    flipImageBack(moveObj){
        moveObj.x = moveObj.x * -1;
        this.ctx.restore();
    }
}