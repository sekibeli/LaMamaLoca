class Sky extends MovableObject{
    width = 4000;
    height = 480;
    x = -720;
    y = 0;
    constructor(){
       super();
       this.loadImage('img/5_background/layers/air.png', -720, 10);
    
    }
}