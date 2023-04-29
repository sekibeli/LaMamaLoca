class Endboss extends MovableObject {
width = 550;
height = 850;
offset = {
    top: 270,
    bottom: 270,
    left: 180,
    right: 180
}
speed = 15;
amountAppleHits = 0;
dead = false;
end = false;



    IMAGES_WALKING = [
        'images/Imp/Imp_walk1.png',
        'images/Imp/Imp_walk2.png',
        'images/Imp/Imp_walk3.png',
        'images/Imp/Imp_walk4.png',
        'images/Imp/Imp_walk5.png',
        'images/Imp/Imp_walk6.png'
       
       
    ]

    IMAGES_ATTACK = [
        'images/Imp/Imp_attack1.png',
        'images/Imp/Imp_attack2.png',
        'images/Imp/Imp_attack3.png',
        'images/Imp/Imp_attack4.png'
    ]

    IMAGES_IDLE = [
        'images/Imp/Imp_idle1.png',
        'images/Imp/Imp_idle2.png',
        'images/Imp/Imp_idle3.png'
    ]
    IMAGES_HURT = [
        'images/Imp/Imp_hurt1.png',
        'images/Imp/Imp_hurt2.png',
        'images/Imp/Imp_hurt3.png',
        'images/Imp/Imp_hurt4.png',
        
    ]

    IMAGES_DEATH = [
        'images/Imp/Imp_death1.png',
        'images/Imp/Imp_death2.png',
        'images/Imp/Imp_death3.png',
        'images/Imp/Imp_death4.png',
        'images/Imp/Imp_death5.png',
        'images/Imp/Imp_death6.png',
        'images/Imp/Imp_death7.png',
        'images/Imp/Imp_death8.png'
    ]
   


    constructor(){
        super();
        console.log('constructor Endboss');
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.hitWithApple = false;
        this.amountAppleHits = 0;
        this.x = 3500;
        this.y = -100;
        this.animate();
    }

    animate(){
        setInterval(() => {
           this.endbossMoves();
           world.checkIfEndbossIsDead();
         
            
        }, 200);
    }

    endbossMoves(){
        if (!this.hitWithApple){
            this.otherDirection = true;
            this.playAnimation(this.IMAGES_IDLE);
            
        }
        else if(this.seeEndboss()){
               this.playAnimation(this.IMAGES_ATTACK);
               
          }

          else if (world.character.x < this.x && !this.dead) {
            console.log(world.character.x < this.x && !this.dead);
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
            console.log('2');
            
          }
        //   else if (world.character.x > this.x && !this.dead) {
        //     this.playAnimation(this.IMAGES_WALKING);
        //     this.moveLeft();
        //     console.log('2');
            
        //   }

          else { 
            
            if (this.dead && !this.end){
            console.log('endboss erledigt');
            this.playAnimationDead(this.IMAGES_DEATH, 'images/Imp/Imp_death8.png');
            this.end = true;
            return;
          }
          }
    }



    seeEndboss(){
        return (world.character.x > 3000 && this.hitWithApple)
    }

    
}