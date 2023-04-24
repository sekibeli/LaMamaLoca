class HealthBar extends StatusBar {
    percentage = 50;
   
    IMAGES= [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ] 

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        console.log('constructor Health');
        this.setPercentage(50);
        this.x = 20;
        this.y = 10;
        this.width = 200;
        this.height= 50;
    }

   
}