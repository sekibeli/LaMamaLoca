class World {
    sky = new Sky();
    character = new Character();
    statusBar = new StatusBar();
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    appleBar = new AppleBar();
    endboss = new Endboss();
    throwableObjects = [];
    collectableObjects = [];
    amount_apples;
    apple;

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

        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkEndbossAppleCollision();
        }, 200);
    }

    checkThrowObjects() {

        if (this.keyboard.SPACE) {

            if (this.throwableObjects.length > 0) {
                this.throwableObjects[0].x = this.character.x + 100;
                this.throwableObjects[0].y = this.character.y;
                this.apple = this.throwableObjects[0];
               
                this.apple.throw();
                setTimeout(() => {
                    this.throwableObjects.splice(0, 1);
                }, 500);
            }
         }
        this.setAppleAmount(this.throwableObjects.length);
    }

    checkEndbossAppleCollision(){
        
      if(true)
      {
       console.log('getroffen');
      }
    }

    setAppleAmount(amount) {
        this.appleBar.amount_apples = amount;
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
                    // this.character.collect(ap);
                    console.log('apple found', ap);
                    this.throwableObjects.push(ap);
                    this.appleBar.amount_apples = this.throwableObjects.length;
                    console.log('gesammelt: ', this.appleBar.amount_apples);
                    ap.y = 800;
                    this.level.apple.splice(i, 1);
                    //  this.appleBar.setPercentage(this.throwableObjects.length);
                }
            });

            this.level.coin.forEach((co, i) => {
                if (this.character.isColliding(co)) {
                    // this.character.collect(co);
                    console.log('coin found', co);
                    this.collectableObjects.push(co);
                    this.coinBar.amount_coins = this.collectableObjects.length;
                    co.y = 800;
                    this.level.coin.splice(i, 1);
                    //  this.appleBar.setPercentage(this.throwableObjects.length);
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