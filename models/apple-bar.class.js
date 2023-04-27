class AppleBar extends DrawableObject {
    // percentage = 0;
    amount_apples = 0;

    // IMAGES= [
    //    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    //    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    //    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    //    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    //    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    //    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    // ] 

    IMAGE = [
        'images/apple.png'
    ]

    constructor() {
        super();
        this.loadImage(this.IMAGE);
        console.log('constructor AppleAnzeige');
        // this.setPercentage(0);
        // this.x = 20;
        // this.y = 43;
        // this.width = 200;
        // this.height= 50;
        this.x = 250;
        this.y = 12;
        this.width = 50;
        this.height = 50;

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
        ctx.fillText(this.amount_apples, this.x + 50, this.y + 40);

    } 

    // setPercentage(percentage){
    //     this.percentage = percentage;
    //     let imgPath = this.IMAGES[this.getImageIndex()];
    //     this.img = this.imageCache[imgPath];


    // }

    // getImageIndex(){
    //     if(this.percentage == 12){
    //         return 5;
    //     }
    //     else if(this.percentage >= 10 ){
    //         return 4;
    //     }
    //     else if (this.percentage >= 7){
    //         return 3;
    //     }
    //     else if (this.percentage >= 3){
    //         return 2;
    //     }
    //     else if (this.percentage >= 2){
    //         return 1;
    //     }
    //     else {
    //         return 0;
    //     }
    // }
}