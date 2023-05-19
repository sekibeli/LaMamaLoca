class World {
    sky = new Sky();
    character = new Character();
    statusBar = new StatusBar();
    healthBar = new HealthBar();
    explosions = [];
    coinBar = new CoinBar();
    fireBar = new FireBar();
    healthBarEndboss = new HealthBarEndboss();
    endbossPic = new EndbossPic();
    characterPic = new CharacterPic();
    activeFireball;
    attack;
    immunitionBox = [];
    collectableObjects = [];
    fire = [];
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    end = false;
    permissionToThrow = true;
    i = 0;

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

    /**
     * Start intervals
     */
    run() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkIfCharacterShoots();
            this.checkIfEndbossHitsCharacter();
        }, 100);
    }

    /**
     * Deletes the character attack-Animation after 100 ms.
     */
    setTimer() {
        setTimeout(clearInterval, 100, this.attack);
    }


    showEndScreen() {
        gameFinished = true;
        if (this.level.endboss.endbossDead && this.level.endboss.energy == 0) {
            this.theWinnerIs('youwon');
        }
        else if (this.character.characterDead && this.character.energy <= 0) {
            this.theWinnerIs('youlost');
        }
    }


    theWinnerIs(winner) {
        setTimeout(() => {
            gameEnd();
            this.showCorrectEndpic(`${winner}`);
        }, 2000);
        setTimeout(() => {
            stopSoundAtTheEnd();
        }, 5000);
    }

    /**
     * 
     * @param {*} param won or loose
     * 
     */
    showCorrectEndpic(param) {
        if (mobileDevice) { document.getElementById('mobileButtonsLayer').classList.add('d-none'); }
        document.getElementById(`${param}`).classList.remove('d-none');
        document.getElementById('canvas').classList.add('d-none');
        this.showMenuItems();
    }

    showMenuItems() {
        document.getElementById('2').classList.add('d-none');
        document.getElementById('3').classList.add('d-none');
        document.getElementById('4').classList.add('d-none');
        document.getElementById('5').classList.add('d-none');
        document.getElementById('6').classList.remove('d-none');
        document.getElementById('0').classList.remove('d-none');
    }

    setFireAmount(amount) {
        this.fireBar.amount_fire = amount;
    }

    /**
     * Checks, if character jumps on enemy and kills it, or loose energy by collision
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    this.hitEnemy(enemy, i);
                    setTimeout(() => {
                        if (!this.enemyAlive) {
                            this.level.enemies.splice(i, 1);
                        }
                    }, 200);
                } else {
                    this.characterLoosesEnergy();
                }
            }
        });
    }


    hitEnemy(enemy, i) {
        this.playCollitionMusik(enemy);
        this.enemyAlive = false;
        this.enemyIsDying(enemy);
        this.character.jump();
    }


    characterLoosesEnergy() {
        this.character.hit();
        if (this.character.energy == 0) {
            this.character.characterDead = true;
        }
        this.healthBar.setPercentage(this.character.energy);
    }


    playCollitionMusik(enemy) {
        if (enemy instanceof Chicken) {
            if (sound) enemy.CHICKEN_SMASH.play();
        }
        if (enemy instanceof Spider) {
            if (sound) enemy.SPIDER_DEAD.play();
        }
        if (enemy instanceof Mosquito) {
            if (sound) enemy.MOSQUITO_CLAP.play();
        }
    }

    /**
     * checks if endboss hits character
     */
    checkIfEndbossHitsCharacter() {
        if (this.character.isCollidingEndboss(this.level.endboss) && this.character.energy > 0) {
            this.endbossHitsCharacter();
        }
        if (this.character.energy <= 0) {
            this.characterIsDead();
        }
        this.healthBar.setPercentage(this.character.energy);
    }


    endbossHitsCharacter() {
        this.character.endbossHit();
        this.character.energy -= 10;
        this.character.playAnimation(this.character.IMAGES_HURT);
    }


    characterIsDead() {
        this.immunitionBox.length = 0;
        this.characterDead = true;
        this.end = true;
        this.character.energy = 0;
    }

    enemyIsDying(enemy) {
        if (!this.enemyAlive) {
            enemy.height = 10;
            enemy.y = 400;
            enemy.speed = 0;
        }
    }

    /**
     * character shoots Fireball
     */
    checkIfCharacterShoots() {
        if (this.permissionToThrow && this.keyboard.SPACE && this.immunitionBox.length > 0) {
            this.characterShoots();
            this.throwFireball();
            setTimeout(() => {
                this.permissionToThrow = true;
            }, 200);
            setTimeout(() => {
                this.level.fireball.splice(0, 1);
            }, 400);
        }
    }

    /**
     * Shows character shootanimation and sound
     */
    characterShoots() {
        this.permissionToThrow = false;
        this.character.CHAR_SHOOT.play();
        this.character.currentImage = 0;
        this.attack = setInterval(() => {
            this.character.playAnimation(this.character.IMAGES_ATTACK);
        }, 50);
        this.setTimer();
    }


    collectDiamonds(co, i) {
        if (this.character.isColliding(co)) {
            if (sound) co.DIAMOND_COLLECT.play();
            this.collectableObjects.push(co);
            this.coinBar.amount_coins = this.collectableObjects.length;
            co.y = 800;
            this.level.coin.splice(i, 1);

        }
    }

    /**
     * creates new fireball to shoot
     */
    throwFireball() {
        this.activeFireball = new Fireball(this.character.x + 60, this.character.y);
        this.activeFireball.throw();
        this.checkIfFireballCollidesWithEndboss();
        this.activeFireball.shootAnimation();
        this.level.fireball.push(this.activeFireball);
        this.immunitionBox.splice(0, 1);
        this.setFireAmount(this.immunitionBox.length);
    }

    /**
     * checks if the fireball collides with endboss and if true endboss will loose energy
     */
    checkIfFireballCollidesWithEndboss() {
        if (Math.abs(world.level.endboss.x + world.level.endboss.offset.left - this.character.x + this.character.width - this.character.offset.right) < 1000 &&
            !this.character.otherDirection && this.activeFireball.y < 340) {
            this.level.endboss.endboss_invulnerable = true;
            this.level.endboss.energy -= 15;
            this.level.endboss.amountAppleHits = this.level.endboss.amountAppleHits + 1;
            this.playVariableHurtAnimations();
            this.healthBarEndboss.setPercentage(this.level.endboss.energy);
            setTimeout(() => {
                this.level.endboss.endboss_invulnerable = false;
            }, 120);
            this.level.fireball.splice(0, 1);
        }
    }

    /**
     * shows different endboss hurt-animations
     */
    playVariableHurtAnimations() {
        this.level.endboss.playAnimation(this.level.endboss.IMAGES_HURT);
        if (this.level.endboss.amountAppleHits == 2 || this.level.endboss.amountAppleHits == 4) {
            this.level.endboss.currentImage = 0;
            let ouchi = setInterval(() => { this.level.endboss.playAnimation(this.level.endboss.IMAGES_MUCHHURT); }, 300);
            setTimeout(clearInterval, 2000, ouchi);
        }
        else if (this.level.endboss.energy == 0) {
            this.level.endboss.endbossDead = true;
        }
    }

    /**
     * checks if fireball or diamond collides with character
     */
    checkCollisionsCollect() {
        setStoppableInterval(() => {
            this.level.immunition.forEach((ball, i) => {
                this.collectFire(ball, i);
            });

            this.level.coin.forEach((co, i) => {
                this.collectDiamonds(co, i);
            });
        }, 200);
    }


    collectFire(ball, i) {
        if (this.character.isColliding(ball)) {
            if (sound) ball.FIRE_COLLECT.play();
            this.immunitionBox.push(ball);
            this.fireBar.amount_fire = this.immunitionBox.length;
            ball.y = 800;
            this.level.immunition.splice(i, 1);
        }
    }

    /**
    * Draws all the elements on the canvas
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawLandscape();
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.immunition);
        this.drawAllEnemies();
        this.addObjectsToMap(this.level.fireball);
        this.drawExplosion();
        this.addToMap(this.character);
        // ----------- fixed elements --------->
        this.ctx.translate(-this.camera_x, 0);
        this.drawFixedElements();
        this.ctx.translate(this.camera_x, 0);
        //--------------------------------------->
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () { self.draw(); });
    }

    /**
     * Draws the enemies
     */
    drawAllEnemies() {
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
    }

    /**
     * draws the explosions
     */
    drawExplosion() {
        if (this.explosions.length > 0) {
            this.addObjectsToMap(this.explosions);
        }
    }

    /**
     * Draws the landscape
     */
    drawLandscape() {
        this.addToMap(this.sky);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    /**
     * Draws the fixed menubars
     */
    drawFixedElements() {
        this.addToMap(this.healthBar);
        this.addToMap(this.characterPic);
        this.addToMap(this.coinBar);
        this.addToMap(this.fireBar);
        this.addToMap(this.healthBarEndboss);
        this.addToMap(this.endbossPic);
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
        // moveObj.drawFrameOffset(this.ctx, moveObj.offset);
        if (moveObj.otherDirection) {
            this.flipImageBack(moveObj);
        }
    }

    /**
     * 
     * @param {*} moveObj object which should be drawn
     * flips the object
     */
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