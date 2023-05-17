class Chicken extends MovableObject {

    height = 70;
    width = 80;
    y = 350;
    CHICKEN_SMASH = new Audio('audio/huhn.mp3');



    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 700 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
       
        this.animate();
    }

    animate() {
        
            
        setStoppableInterval(() => {
           if(!paused) this.moveLeft();
        }, 1000 / 60);
       
        setStoppableInterval(() => {
           if(!paused) this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    
}


}