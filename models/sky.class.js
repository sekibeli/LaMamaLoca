class Sky extends MovableObject{
    width = 720;
    height = 480;
    x = 0;
    y = 0;
    constructor(){
       super();
       this.loadImage('img/5_background/layers/air.png', 0, 10);
    }
}