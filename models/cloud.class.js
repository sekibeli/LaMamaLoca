class Cloud extends MovableObject{
y = 30;
    height = 300;
    width = 600;
    x =  Math.random() * 200;

    constructor(){
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.cloudsAreMoving();
        
    }

    cloudsAreMoving(){
       this.moveLeft();
    }


}