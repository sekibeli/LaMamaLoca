class Coin extends MovableObject {
    width = 50;
    height = 50;
    DIAMOND_COLLECT = new Audio('audio/collectDiamond.mp3');


    IMAGES = [
        'images/Crystal/crystal.png',
        'images/Crystal/crystal2.png',
        'images/Crystal/crystal3.png',
        'images/Crystal/crystal4.png',
        'images/Crystal/crystal5.png',
        'images/Crystal/crystal6.png',
        'images/Crystal/crystal7.png',
        'images/Crystal/crystal8.png',
        'images/Crystal/crystal9.png',
        'images/Crystal/crystal10.png'
    ]
    constructor() {
        super();

        this.loadImage('images/Crystal/crystal.png');
        this.loadImages(this.IMAGES);
        this.x = 500 + Math.random() * 2300;
        this.y = 200 + Math.random() * 200;
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (!paused) this.playAnimation(this.IMAGES);
        }, 200);
    }
}