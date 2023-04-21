class MovableObject {
    x = 120;
    y = 290;
    img;
    height = 150;
    width = 120;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
constructor(x,y,){}


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    moveRight(){
        console.log('movingRight');
    }

    moveLeft(){
        setInterval( () => {
            this.x = this.x - this.speed;
        }, 1000/60);
    }
    
    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);

    }
}