class FireBar extends DrawableObject {
      amount_fire = 0;;

    IMAGE = [
        'images/fireCollect2.png'
    ]

    constructor() {
        super();
        this.loadImage(this.IMAGE);
        console.log('constructor AppleAnzeige');
        this.x = 210;
        this.y = -30;
        this.width = 120;
        this.height = 120;
    }


    pullOff(count) {
        count--;
    }

    putOn(count) {
        count++;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.font = "50px goofy";
        ctx.fillText(this.amount_fire, this.x + 90, this.y + 80);
    }
}