class Fireball extends ThrowableObject {
    width = 150;
    height = 150;
    speed = 0;
    APPLE_BITE = new Audio('audio/appleBite.mp3');
    offset = {
        top: 80,
        bottom: 30,
        right: 50,
        left: 60
    }
    

    IMAGES = [
        'images/fireCollect2.png'

    ];
    constructor(x, y) {
        super(x,y);
        // this.loadImage('images/fireCollect2.png');
        this.loadImages(this.IMAGES_EXPLOSION);
        // this.width = 50;
        // this.height = 50;
        this.x = x;
        this.y = y;
       
        // this.x = 300 + Math.random() * 2000;
        // this.y = 100 + Math.random() * 200;
        this.throw();
        this.fireAnimation();
        
    }



    // animate(){
    //     setInterval(()=> {
    //         this.playAnimation(this.IMAGES);
    //     },200);
    // }


}