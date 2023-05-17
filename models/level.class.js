class Level {

    enemies;
    clouds;
    backgroundObjects;
    coin;
//    throwableObject;
    immunition;
    fireball;
    endboss;

    level_end_x = 3600;

    constructor(enemies, clouds, backgroundObjects, coin, immunition, fireball, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.immunition = immunition;
        this.fireball = fireball;
        this.endboss = endboss;

    }
}