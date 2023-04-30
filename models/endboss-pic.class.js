class EndbossPic extends StatusBar {
    
   

    IMAGE = [
        'img/7_statusbars/3_icons/icon_health_endboss.png'
    ]

    constructor(){
        super();
        this.loadImage(this.IMAGE);
       
        this.x = 490;
        this.y = 10;
        this.width = 60;
        this.height= 60;
    }

   
}