class CoinBar extends StatusBar {
   
    amount_coins = 0;
    IMAGE = [
        'images/Crystal/crystal.png'
    ]

    constructor() {
        super();
        this.loadImage(this.IMAGE);
        console.log('constructor CoinsAnzeige');
        this.x = 340;
        this.y = 15;
        this.width = 50;
        this.height = 50;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.font = "50px goofy";
        ctx.fillText(this.amount_coins, this.x + 57, this.y + 37);

    }
}

