class AppleBar extends StatusBar {
    percentage = 0;
   
    IMAGES= [
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ] 

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        console.log('constructor AppleBar');
        this.setPercentage(0);
        this.x = 20;
        this.y = 43;
        this.width = 200;
        this.height= 50;
    }
}