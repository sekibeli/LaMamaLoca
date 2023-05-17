class Explosion extends MovableObject {

    width = 200;
    height = 200;

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
        super();
        this.loadImages(this.IMAGES_EXPLOSION);
        this.x = x;
        this.y = y;
        this.animate();
    }


    animate(){
        let explode = setInterval(()=>{
            if(!paused) this.playAnimation(this.IMAGES_EXPLOSION);
        },100);
        setTimeout(()=> {
            clearInterval(explode);
            world.explosions.splice(0,1);
        },950);
    }

}