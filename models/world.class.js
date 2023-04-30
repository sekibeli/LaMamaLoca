class World {
    sky = new Sky();
    character = new Character();
    statusBar = new StatusBar();
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    appleBar = new AppleBar();
    healthBarEndboss = new HealthBarEndboss();
    endbossPic = new EndbossPic();
    throwableObjects = [];
    collectableObjects = [];
// energy = 60;
    amount_apples;
    apple;
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    end = false;
    i = 0;
    // hitByEndboss = false;
    runningInterval;

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

       this.runningInterval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkIfEndbossHitsCharacter();

        }, 200);
    }

    checkThrowObjects() {

        if (this.keyboard.SPACE) {

            if (this.throwableObjects.length > 0) {
                this.throwableObjects[0].x = this.character.x + 100;
                this.throwableObjects[0].y = this.character.y;
                this.apple = this.throwableObjects[0];

                this.apple.throw();
                this.checkIfAppleCollidesWithEndboss(this.apple);
                setTimeout(() => {
                    this.throwableObjects.splice(0, 1);
                }, 500);
            }
        }
        this.setAppleAmount(this.throwableObjects.length);
    }



    setAppleAmount(amount) {
        this.appleBar.amount_apples = amount;
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, i) => {

            if (this.character.isColliding(enemy)) {
                console.log('inderLuft: ', this.character.isAboveGround(), 'speedY ', this.character.speedY);
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    // this.character.invulnerable = true;
                    if (enemy instanceof Chicken) enemy.CHICKEN_SMASH.play();
                    this.enemyAlive = false;
                    this.enemyIsDying(enemy);
                    this.character.jump();


                    setTimeout(() => {
                        if (!this.enemyAlive) {
                            this.level.enemies.splice(i, 1);
                        }
                        // this.character.invulnerable = false;
                    }, 500);

                } else {
                    this.character.hit();

                    if (this.character.energy == 0) {
                        this.character.characterDead = true;
                    }
                    this.healthBar.setPercentage(this.character.energy);

                }
            }

        });
    }

    checkIfEndbossHitsCharacter() {
        // console.log('endgame:' , this.character.isColliding(this.level.endboss));
        if (this.character.isColliding(this.level.endboss)) {

            this.character.hitByEndboss = true;
            if (this.character.energy > 20) {
                this.character.energy -= 20;
                if (this.character.energy < 0) this.character.energy = 0;
            }

            this.characterDead = true;
        }
        // setTimeout(() => {
        //     this.character.hitByEndboss = false;
        //     console.log('hit = false');
        // }, 1000);
    }


enemyIsDying(enemy) {
    if (!this.enemyAlive) {
        enemy.height = 10;
        enemy.y = 400;
        enemy.speed = 0;

    }
}

checkIfAppleCollidesWithEndboss(apple) {
   
   let checkCollisionApple = setInterval(() => {

        if (apple.isColliding(this.level.endboss) && !this.level.endboss.dead && this.level.endboss.energy > 0) {

            console.log('smasch', this.i);
            this.level.endboss.energy -= 15;

            this.level.endboss.hitWithApple = true;
            this.level.endboss.amountAppleHits = this.level.endboss.amountAppleHits + 1;

            this.level.endboss.playAnimation(this.level.endboss.IMAGES_HURT);
this.i++;
console.log('endboss energy: ',this.level.endboss.energy);

this.healthBarEndboss.setPercentage(this.level.endboss.energy);

if(this.level.endboss.energy == 0){

    console.log('futschijama');
    this.level.endboss.dead = true;
    // clearInterval(checkCollisionApple);
    // clearInterval(this.runningInterval);
    // this.playDeathAnimation();
}

        }
        

    }, 300);

}

playDeathAnimation(){
    this.level.endboss.playAnimation(this.level.endboss.IMAGES_DEATH); 

}

checkCollisionsCollect() {
    setInterval(() => {
        this.level.apple.forEach((ap, i) => {

            if (this.character.isColliding(ap)) {
                ap.APPLE_BITE.play();
               
                this.throwableObjects.push(ap);
                this.appleBar.amount_apples = this.throwableObjects.length;
              
                ap.y = 800;
                this.level.apple.splice(i, 1);
               
            }
        });

        this.level.coin.forEach((co, i) => {
            if (this.character.isColliding(co)) {
                co.MONEY_COLLECT.play();
             
                this.collectableObjects.push(co);
                this.coinBar.amount_coins = this.collectableObjects.length;
                co.y = 800;
                this.level.coin.splice(i, 1);
                
            }
        });
    }, 200);
}

checkIfEndbossIsDead() {
    if (!this.level.endboss.dead) {
     
        if (this.level.endboss.energy == 0) {
            this.level.endboss.dead = true;
            this.end = true;
            return true;
        }
    }
    return false;
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
   
    this.addToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);
    // ----------- fixed elements --------->
    this.ctx.translate(-this.camera_x, 0);
  
    this.addToMap(this.healthBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.appleBar);
    this.addToMap(this.healthBarEndboss);
    this.addToMap(this.endbossPic);
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

    moveObj.drawFrameOffset(this.ctx, moveObj.offset);



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