class StatusBar extends DrawableObject {

    constructor() {
        super();
        this.x = 20;
        this.width = 200;
        this.height = 50;
    }

    /**
     * 
     * @param {*} percentage amount of energy left
     * This function gets the index of the pic which shoes the right amount of energy in the status-bar
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imgPath = this.IMAGES[this.getImageIndex()];
        this.img = this.imageCache[imgPath];
    }

    getImageIndex() {
        if (this.percentage == 90) {
            return 5;
        }
        else if (this.percentage > 67.5) {
            return 4;
        }
        else if (this.percentage > 45) {
            return 3;
        }
        else if (this.percentage > 22.5) {
            return 2;
        }
        else if (this.percentage > 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
}