class HealthBarEndboss extends StatusBar {
    percentage = 60;
   
    IMAGES= [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ] 

    IMAGE_ENDBOSS = [
        'img/7_statusbars/3_icons/icon_health_endboss.png'
    ]

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png');
        console.log('constructor Health Endboss');
        this.setPercentage(60);
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height= 50;
    }

   
}