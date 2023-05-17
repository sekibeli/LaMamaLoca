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
    explosionX;
    explosionY;
    AUDIO_EXPLOSION = new Audio('audio/explosion.mp3');
    IMAGES = [
        'images/fireCollect2.png'

    ];
    constructor(x, y) {
        super(x, y);
        // this.loadImage('images/fireCollect2.png');
        this.loadImages(this.IMAGES_EXPLOSION);
        // this.width = 50;
        // this.height = 50;
        this.x = x;
        this.y = y;
        this.throw();
        this.fireAnimation();



        // this.x = 300 + Math.random() * 2000;
        // this.y = 100 + Math.random() * 200;
        // this.throw();
        // this.fireAnimation();

    }


    // fireballExplosion(){
    //     let explode = setInterval(()=>{
    //         if(!paused) this.playAnimation(this.IMAGES_EXPLOSION);
    //     },100);
    //     setTimeout(()=> {
    //         clearInterval(explode);
    //         world.explosions.splice(0,1);
    //     },950);
    // }


    fireballExplosion() {
        this.explosionX = this.x - 380;
        this.explosionY = this.y - 100;
        console.log('fireballExplosion');
        this.currentImage = 0;
        let explode = setInterval(() => {
            this.x = this.explosionX;
            this.y = this.explosionY;
            this.width = 400
            this.height = 400;
            if (!paused) this.playAnimation(this.IMAGES_EXPLOSION);
        }, 80);
        this.AUDIO_EXPLOSION.play();
        // setTimeout(() => {
        //     clearInterval(explode);
        //     world.explosions.splice(0, 1);
        // }, 950);
    }

    fireAnimation() {


         this.animationFire = setInterval(() => {

            if (this.isCollidingWith(world.level.endboss) && Math.abs(world.level.endboss.x + world.level.endboss.offset.left - world.character.x + world.character.width - world.character.offset.right) < 1000) {
                world.checkIfFireballCollidesWithEndboss();
                // this.fireballExplosion();
                // clearInterval(this.flyingFire);
                clearInterval(this.animationFire);
                console.log('fireAnimation if-Zweig');

                // if(world.level.endboss.isCollidingEndboss(this.activeFireball)) {
                // if (this.isColliding(world.level.endboss) && !world.level.endboss.endboss_invulnerable) {
                // if(this.x > world.level.endboss.x - 300 && this.y < world.level.endboss.y + 300 ){  //hat funktioniert

               

                // this.explosionX = this.x - 80;
                // this.explosionY = this.y - 100;
                // this.explosionX = this.x - 380;
                // this.explosionY = this.y - 100;
               

                //   this.playAnimation(this.IMAGES_EXPLOSION)

            }
            else {
                console.log('fireAnimation else-Zweig');
                this.playAnimation(this.IMAGES_FIRE);

                setTimeout(() => {
                    clearInterval(this.animationFire);
                    clearInterval(this.flyingFire);

                }, 1000); // vorher 1000

            }


        }, 10)
    }


    // animate(){
    //     setInterval(()=> {
    //         this.playAnimation(this.IMAGES);
    //     },200);
    // }

    isCollidingWith(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left;
        // this.x + this.offset.left < obj.x + obj.width - obj.offset.right
    }



  
    

}