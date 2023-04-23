class Spider extends MovableObject {
    height = 70;
    width = 80;
    y = 390;

    IMAGES_WALKING = [
        'images/spider/walk1.png',
        'images/spider/walk2.png',
        'images/spider/walk3.png',
        'images/spider/walk4.png',
        'images/spider/walk5.png',
        'images/spider/walk6.png',
    ]


    constructor() {
        super();
        this.loadImage('images/spider/walk1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 1600 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        // this.moveLeft();
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}