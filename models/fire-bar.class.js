class FireBar extends DrawableObject {
    amount_fire = 0;;

    IMAGE = [
        'images/fireCollect2.png'
    ]

    constructor() {
        super();
        this.loadImage(this.IMAGE);
        this.x = 210;
        this.y = -30;
        this.width = 120;
        this.height = 120;
    }


    // pullOff(count) {
    //     count--;
    // }

    // putOn(count) {
    //     count++;
    // }

    /**
     * 
     * @param {*} ctx 
     * Draws the amount of fire at the top of the page
     */
    draw(ctx) {
        super.draw(ctx);
        ctx.font = "50px goofy";
        ctx.fillText(this.amount_fire, this.x + 90, this.y + 80);
    }
}