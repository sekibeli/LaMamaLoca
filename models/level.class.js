class Level {

enemies;
clouds;
backgroundObjects;
coin;
apple;
level_end_x = 3600;

constructor(enemies, clouds, backgroundObjects, coin, apple){
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coin = coin;
    this.apple = apple;
}
}