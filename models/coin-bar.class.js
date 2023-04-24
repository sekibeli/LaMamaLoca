class CoinBar extends StatusBar {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png'
    ]


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        console.log('constructor CoinBar');
        this.setPercentage(50);
        this.x = 20;
        this.y = 75;
        this.width = 200;
        this.height = 50;
    }
}

