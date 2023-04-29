class StatusBar extends DrawableObject {
   
   
    // IMAGES_HEALTH = [
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    // ] 

    // IMAGES_COIN = [
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png'
    // ]

//  percentage = 50;

// constructor(){
//     console.log('constructor statusBar');
//     super();
    
//     this.loadImages(this.IMAGES_HEALTH);
//        this.setPercentage(100);
//        this.x = 20;
//     this.y = 10;
//     this.width = 200;
//     this.height= 50;
// }
constructor(){
    super();
    this.x = 20;
    this.width = 200;
    this.height = 50;
}

    setPercentage(percentage){
        this.percentage = percentage;
        let imgPath = this.IMAGES[this.getImageIndex()];
        this.img = this.imageCache[imgPath];

       
    }

    getImageIndex(){
        if(this.percentage == 50){
            return 5;
        }
        else if(this.percentage > 40 ){
            return 4;
        }
        else if (this.percentage > 30){
            return 3;
        }
        else if (this.percentage > 15){
            return 2;
        }
        else if (this.percentage > 0){
            return 1;
        }
        else {
            return 0;
        }
    }
}