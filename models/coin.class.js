class Coin extends MovableObject {
width = 100;
height = 100;
MONEY_COLLECT = new Audio('audio/money.mp3');
    constructor(){
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.x = 500 + Math.random() * 2300;
        this.y = 200 + Math.random() * 200;
      
    }
}