class Explosion extends MovableObject {

    width = 150;
    height = 150;

    IMAGES_EXPLOSION = [
        'images/Explosion/Explosion1.png',
        'images/Explosion/Explosion2.png',
        'images/Explosion/Explosion3.png',
        'images/Explosion/Explosion4.png',
        'images/Explosion/Explosion5.png',
        'images/Explosion/Explosion6.png',
        'images/Explosion/Explosion7.png',
        'images/Explosion/Explosion8.png',
        'images/Explosion/Explosion9.png'


    ]

    constructor(x,y){
        this.x = x;
        this.y = y;

    }


    animate(){
        setInterval(()=>{
            if(!paused) this.playAnimation(this.IMAGES);
        },200);
    }

}