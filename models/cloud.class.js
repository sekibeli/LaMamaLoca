class Cloud extends MovableObject {
    y = 30;
    height = 300;
    width = 600;

    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.cloudsAreMoving();
        this.x = Math.random() * 3000;
        this.y = Math.random() * 30;
    }

    /**
     * Animates the clouds to move left
     */
    cloudsAreMoving() {
        setStoppableInterval(() => {
            if (!paused) this.moveLeft();
        }, 1000 / 60);
    }
}