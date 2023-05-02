class Spider extends MovableObject {
    speed = 0.35;
    height =90;
    width = 100;
    y = 350;
    spiderAlive = true;
    offset = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    }

    IMAGES_WALKING = [
        'images/spider/walk1.png',
        'images/spider/walk2.png',
        'images/spider/walk3.png',
        'images/spider/walk4.png',
        'images/spider/walk5.png',
        'images/spider/walk6.png',
    ]

    IMAGES_DEATH = [
        'images/spider/death1.png',
        'images/spider/death2.png',
        'images/spider/death3.png',
        'images/spider/death4.png'
    ]


    constructor() {
        super();
        this.loadImage('images/spider/walk1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEATH);
        this.x = 1000 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.8;
        this.animate();
    }


    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);


        setStoppableInterval(() => {
              this.playAnimation(this.IMAGES_WALKING);

             
            
        }, 100);
    }
// enemyIsDying(enemy){
//     if(!this.enemyAlive){
//         console.log('Enemy wird spider flach');
//        enemy.width = 0;
//     //    if (enemy.y < 0) enemy.y = 0;
        
//       }
//     }

   
}