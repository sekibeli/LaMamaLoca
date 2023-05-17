class EndbossPic extends StatusBar {



    IMAGE = [
        'images/Imp/icon_health_real_endboss.png'
    ]

    constructor() {
        super();
        this.loadImage(this.IMAGE);
        this.x = 10;
        this.y = 50;
        this.width = 60;
        this.height = 60;
    }


}