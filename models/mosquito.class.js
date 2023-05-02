class Mosquito extends MovableObject {
    height = 110;
    width = 120;
    // y = 190;
    IMAGES_WALKING = [
        'images/mosquito/flight1.png',
        'images/mosquito/flight2.png',
        'images/mosquito/flight3.png',
    ]

    constructor() {
        super();
        this.loadImage('images/mosquito/flight1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 500;
        this.y = 200 + Math.random() * 500;
        this.speed = 0.55 + Math.random() * 0.5;
        // this.moveLeft();
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.moveRight();
        }, 1000 / 60);


        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

}