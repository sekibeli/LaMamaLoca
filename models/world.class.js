class World {
    sky = new Sky();
    character = new Character();
    statusBar = new StatusBar();
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    appleBar = new AppleBar();
    throwableObjects = [];

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
        this.run();
        this.checkCollisionsCollect();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {

        //check collisions
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 300);
    }

    checkThrowObjects() {
    
        if (this.keyboard.SPACE) {

            console.log(this.character.x);
            console.log(this.throwableObjects.length);
            // let apple = new ThrowableObject(this.character.x + 80, this.character.y + 100);
            // this.throwableObjects.push(apple);
            if (this.throwableObjects.length > 0) {
                this.throwableObjects[this.throwableObjects.length - 1].x = this.character.x +100;
                this.throwableObjects[this.throwableObjects.length - 1].y = this.character.y;
                this.throwableObjects[this.throwableObjects.length - 1].throw();
                setTimeout(() => {
                    this.throwableObjects.splice(this.throwableObjects.length - 1, 1);
                }, 3000)


            }

        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isColliding(enemy) && !this.character.invulnerable) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    this.character.invulnerable = true;
                    this.enemyAlive = false;
                    this.enemyIsDying(enemy);
                    this.character.jump();
                      
                   
                      setTimeout(() => {
                        if (!this.enemyAlive) {
                            this.level.enemies.splice(i, 1);
                        }
                        this.character.invulnerable = false;
                    }, 2000);

                } else {
                    this.character.hit();
                    console.log('hit');
                    this.healthBar.setPercentage(this.character.energy);
                }
            }

        });
    }

    enemyIsDying(enemy) {
        if (!this.enemyAlive) {
            console.log('Enemy wird world flach');
            enemy.height = 10;
           enemy.y = 400;
           enemy.speed = 0;

        }
    }

    checkCollisionsCollect() {
        setInterval(() => {
            this.level.apple.forEach((ap, i) => {
                if (this.character.isColliding(ap)) {
                    // console.log('Collision with Character', this.character.energy );
                    this.character.collect(ap);
                    console.log('apple found', ap);
                    this.throwableObjects.push(ap);
                    ap.y = 800;
                    this.level.apple.splice(i, 1);


                     this.appleBar.setPercentage(this.throwableObjects.length);

                }

            });
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.sky);

        this.addObjectsToMap(this.level.clouds);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.apple);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        // ----------- fixed elements --------->
        this.ctx.translate(-this.camera_x, 0);
        // this.addToMap(this.statusBar);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.appleBar);
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
        // moveObj.drawFrame(this.ctx);



        if (moveObj.otherDirection) {
            this.flipImageBack(moveObj);
        }
    }

    flipImage(moveObj) {
        this.ctx.save();
        this.ctx.translate(130, 0);
        this.ctx.scale(-1, 1);
        moveObj.x = moveObj.x * -1;
    }

    flipImageBack(moveObj) {
        moveObj.x = moveObj.x * -1;
        this.ctx.restore();
    }
}