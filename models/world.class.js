class World {
    sky = new Sky();
    character = new Character();
    statusBar = new StatusBar();
    healthBar = new HealthBar();
    explosions = [];
    coinBar = new CoinBar();
    appleBar = new AppleBar();
    healthBarEndboss = new HealthBarEndboss();
    endbossPic = new EndbossPic();
    characterPic = new CharacterPic();
    activeFireball;
    // singleFire;
    attack;

    immunitionBox = [];
    collectableObjects = [];
    // energy = 60;
    amount_apples;
    // apple;
    fire = [];
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    end = false;
    permissionToThrow = true;
    i = 0;
    // hitByEndboss = false;
    // runningInterval;
    // intervalIDs = [];

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
        this.run();
        this.checkCollisionsCollect();

        ;

    }

    setWorld() {
        this.character.world = this;
    }

    run() {

        setStoppableInterval(() => {

            this.checkCollisions();
            this.checkIfCharacterShoots();
            this.checkIfEndbossHitsCharacter();
            if (this.level.fireball.length == 1) {

                // this.checkIfFireballCollidesWithEndboss();

            }


        }, 100);

    }




   

    /**
     * Deletes the attack-Animation after 100 ms.
     */
    setTimer() {
        setTimeout(clearInterval, 100, this.attack);
    }
    showEndScreen() {
        if (this.level.endboss.endbossDead && this.level.endboss.energy == 0) {
            gameFinished = true;


            setTimeout(() => {

                gameEnd();

                if (mobileDevice) { document.getElementById('mobileButtonsLayer').classList.add('d-none'); }
                document.getElementById('youwon').classList.remove('d-none');
                document.getElementById('canvas').classList.add('d-none');
                document.getElementById('2').classList.add('d-none');
                document.getElementById('3').classList.add('d-none');
                document.getElementById('4').classList.add('d-none');
                document.getElementById('5').classList.add('d-none');
                document.getElementById('6').classList.remove('d-none');
                document.getElementById('0').classList.remove('d-none');
            }, 2000);
            setTimeout(() => {
                stopSoundAtTheEnd();
            }, 5000);


        }
        else if (this.character.characterDead && this.character.energy <= 0) {
            gameFinished = true;

            setTimeout(() => {

                gameEnd();

                if (mobileDevice) { document.getElementById('mobileButtonsLayer').classList.add('d-none'); }
                document.getElementById('youlost').classList.remove('d-none');
                document.getElementById('canvas').classList.add('d-none');
                document.getElementById('2').classList.add('d-none');
                document.getElementById('3').classList.add('d-none');
                document.getElementById('4').classList.add('d-none');
                document.getElementById('5').classList.add('d-none');
                document.getElementById('6').classList.remove('d-none');
                document.getElementById('0').classList.remove('d-none');
            }, 2000);
            setTimeout(() => {
                stopSoundAtTheEnd();
            }, 5000);
        }

    }

    setAppleAmount(amount) {
        this.appleBar.amount_apples = amount;
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, i) => {

            if (this.character.isColliding(enemy)) {

                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    // this.character.invulnerable = true;
                    if (enemy instanceof Chicken) {
                        if (sound) enemy.CHICKEN_SMASH.play();

                    }
                    if (enemy instanceof Spider) {
                        if (sound) enemy.SPIDER_DEAD.play();
                    }

                    if (enemy instanceof Mosquito) {
                        if (sound) enemy.MOSQUITO_CLAP.play();
                    }
                    this.enemyAlive = false;
                    this.enemyIsDying(enemy);
                    this.character.jump();
                    // this.character.loadImage(this.character.IMAGES_WALKING[0]);


                    setTimeout(() => {
                        if (!this.enemyAlive) {
                            this.level.enemies.splice(i, 1);
                        }
                        // this.character.invulnerable = false;
                    }, 200);

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
        // console.log('x - character: ', this.character.x + this.character.width + this.character.offset.right, 'x - endboss: ', this.level.endboss.x - this.level.endboss.offset.left);
        // console.log('x - character: ', this.character.x + this.character.offset.left, ' x - endboss: ', this.level.endboss.x + this.level.endboss.width - this.level.endboss.offset.right);

        if (this.character.isCollidingEndboss(this.level.endboss) && this.character.energy > 0) {

            this.character.endbossHit();
            this.character.energy -= 10;
            console.log('Marge wurde getroffen: Nur noch', this.character.energy, 'Energy übrig');
            this.character.playAnimation(this.character.IMAGES_HURT);
        }

        if (this.character.energy <= 0) {
            this.characterDead = true;
            this.end = true;
            this.character.energy = 0;
        }
        this.healthBar.setPercentage(this.character.energy);


    }


    enemyIsDying(enemy) {
        if (!this.enemyAlive) {
            enemy.height = 10;
            enemy.y = 400;
            enemy.speed = 0;

        }
    }


    checkIfCharacterShoots() {
        if (this.permissionToThrow && this.keyboard.SPACE && this.immunitionBox.length > 0) {
            this.permissionToThrow = false;
            console.log('character shoots!');
            this.character.CHAR_SHOOT.play();
            this.character.currentImage = 0;
            this.attack = setInterval(() => {
                this.character.playAnimation(this.character.IMAGES_ATTACK);
            }, 50);
            this.setTimer();

            this.activeFireball = new Fireball(this.character.x + 60, this.character.y);
            this.activeFireball.throw();
            this.checkIfFireballCollidesWithEndboss();
            this.activeFireball.fireAnimation();
            
            this.level.fireball.push(this.activeFireball);

            setTimeout(() => {
                this.permissionToThrow = true;
            }, 200);
            {
                this.immunitionBox.splice(0, 1);
                this.setAppleAmount(this.immunitionBox.length);
            }

            setTimeout(() => {
                this.level.fireball.splice(0, 1);
            }, 400);
           
        }
    }


    checkIfFireballCollidesWithEndboss() {
        
        console.log(this.activeFireball.x , world.level.endboss.x - 450 , this.activeFireball.y , world.level.endboss.y + 300);
        console.log(this.activeFireball.x > world.level.endboss.x - 450 && this.activeFireball.y < world.level.endboss.y + 300);
        // if(this.x > world.level.endboss.x - 250 && this.y < world.level.endboss.y + 300  && !this.level.endboss.dead && this.level.endboss.energy > 0 && !this.level.endboss.endboss_invulnerable) {
        if (this.activeFireball.x > world.level.endboss.x - 450 && this.activeFireball.y < world.level.endboss.y + 300 && !this.level.endboss.dead && this.level.endboss.energy > 0 && !this.level.endboss.endboss_invulnerable) {
            console.log('Fireball hits endboss');
           
            this.activeFireball.explosion = true;

            console.log(this.activeFireball);

            this.level.endboss.endboss_invulnerable = true;
            this.level.endboss.energy -= 15;
            console.log('Endboss wurde getroffen. Nur noch', this.level.endboss.energy, 'Energy übrig');

            // this.explosions.push(new Explosion(this.level.endboss.x -250 , this.level.endboss.y + 280));


            this.level.endboss.amountAppleHits = this.level.endboss.amountAppleHits + 1;

            this.level.endboss.playAnimation(this.level.endboss.IMAGES_HURT);

            this.healthBarEndboss.setPercentage(this.level.endboss.energy);
            if (this.level.endboss.amountAppleHits == 2) {
                this.level.endboss.currentImage = 0;
                let ouchi = setInterval(() => { this.level.endboss.playAnimation(this.level.endboss.IMAGES_MUCHHURT); }, 300);
                setTimeout(clearInterval, 2000, ouchi);
            }
            else if (this.level.endboss.energy == 0) {
                this.level.endboss.endbossDead = true;
                console.log('endbossDead = ', this.level.endboss.endbossDead);
            }
            setTimeout(() => {
                this.level.endboss.endboss_invulnerable = false;
            }, 120);
            world.activeFireball.explosion = false;

            this.level.fireball.splice(0, 1);

        }


    }


    checkCollisionsCollect() {
        setStoppableInterval(() => {
            this.level.immunition.forEach((ball, i) => {

                if (this.character.isColliding(ball)) {
                    if (sound) ball.APPLE_BITE.play();

                    this.immunitionBox.push(ball);
                    this.appleBar.amount_apples = this.immunitionBox.length;

                    ball.y = 800;
                    this.level.immunition.splice(i, 1);

                }
            });

            this.level.coin.forEach((co, i) => {
                if (this.character.isColliding(co)) {

                    if (sound) co.DIAMOND_COLLECT.play();

                    this.collectableObjects.push(co);
                    this.coinBar.amount_coins = this.collectableObjects.length;
                    co.y = 800;
                    this.level.coin.splice(i, 1);

                }
            });
        }, 200);
    }

    // checkIfEndbossIsDead() {
    //     if (!this.level.endboss.dead) {

    //         if (this.level.endboss.energy == 0) {
    //             this.level.endboss.dead = true;
    //             this.end = true;
    //             return true;
    //         }
    //     }
    //     return false;
    // }


    // checkIfCharacterIsDead(){
    //     if (!this.level.endboss.dead) {

    //         if (this.level.endboss.energy == 0) {
    //             this.level.endboss.dead = true;
    //             this.end = true;
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.sky);

        this.addObjectsToMap(this.level.clouds);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.immunition);
        this.addObjectsToMap(this.level.enemies);
        // this.addObjectsToMap(this.immunitionBox);
        // this.addObjectsToMap(this.level.fireball);




        this.addToMap(this.level.endboss);
        this.addObjectsToMap(this.level.fireball);
        if (this.explosions.length > 0) {
            try {
                this.addObjectsToMap(this.explosions);
            }
            catch (e) {
                console.log('draw-Fehler: ', this.explosions.length);
            }
        }
        // this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        // ----------- fixed elements --------->
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.healthBar);
        this.addToMap(this.characterPic);
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
        try {
            objects.forEach(obj => {
                this.addToMap(obj);
            });
        } catch (e) {
            console.log('Fehler ', obj);
        }
    }

    addToMap(moveObj) {
        try {
            if (moveObj.otherDirection) {
                this.flipImage(moveObj);
            }
        } catch (e) {
            console.log('Wieder Fehler ', moveobj);
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