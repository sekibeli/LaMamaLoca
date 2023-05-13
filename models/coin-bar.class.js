class CoinBar extends StatusBar {
    // IMAGES = [
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png'
    // ]

    amount_coins = 0;
    IMAGE = [
        // 'img/8_coin/coin_1.png'
      'images/Crystal/crystal.png'
    ]

    constructor() {
        super();
        this.loadImage(this.IMAGE);
        console.log('constructor CoinsAnzeige');
        // this.setPercentage(50);
        // this.x = 20;
        // this.y = 75;
        // this.width = 200;
        // this.height = 50;
        // this.x = 310;
        // this.y = -30;
        this.x = 340;
        this.y = 15;
        // this.width= 150;
        // this.height= 150;
        this.width = 50;
        this.height = 50;

    }

    draw(ctx) {
        super.draw(ctx);
        ctx.font = "50px goofy";
     
        // ctx.fillText(this.amount_coins, this.x + 110, this.y + 80);
        ctx.fillText(this.amount_coins, this.x + 57, this.y + 37);

    }
}

