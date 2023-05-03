// offset = {
//     top: 50,
//     bottom: 50,
//     left: 50,
//     right: 50
// }


class Coin extends MovableObject {
width = 50;
height = 50;
MONEY_COLLECT = new Audio('audio/money.mp3');
    constructor(){
        super();
        this.loadImage('img/8_coin/coin_3.png');
        this.x = 500 + Math.random() * 2300;
        this.y = 200 + Math.random() * 200;
      
    }
}