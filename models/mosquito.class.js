class Mosquito extends MovableObject {
    MOSQUITO_CLAP = new Audio('audio/mosquitoClap.mp3');
    height = 110;
    width = 120;

    offset = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    }
    IMAGES_WALKING = [
        'images/mosquito/flight1.png',
        'images/mosquito/flight2.png',
        'images/mosquito/flight3.png',
    ]

    constructor() {
        super();
        this.loadImage('images/mosquito/flight1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 3000;
        this.y = 350;
        this.speed = 0.55 + Math.random() * 0.5;
        this.animate(this.randomDirection());
    }


    animate(direction) {
        setStoppableInterval(() => {
            if(!paused){
            if (direction == 'goleft') {
                this.otherDirection = true;
                this.moveLeft();
            }
            else { this.moveRight(); }}
        }, 1000 / 60);
    
        setStoppableInterval(() => {
            if (!paused) this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }


    randomDirection() {
        if (Math.random() < 0.5) {
            return 'goleft';
        }
        else {
            return 'goright';
        }
    }
}