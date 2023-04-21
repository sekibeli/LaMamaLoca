class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    

    sky = new Sky();

    backgroundObjects = [
        // new BackgroundObject('img/5_background/layers/air.png', 0, 10),
        // new BackgroundObject('img/5_background/layers/3_third_layer/1.png',0,10),
        // new BackgroundObject('img/5_background/layers/2_second_layer/1.png',0,10),
        // new BackgroundObject('img/5_background/layers/1_first_layer/1.png',0,10),
        new BackgroundObject('images/nature/3.png', 0, 10),
        new BackgroundObject('images/nature/5.png', 0, 10),
        new BackgroundObject('images/nature/6.png', 0, 10),
        new BackgroundObject('images/nature/7.png', 0, 10),
        new BackgroundObject('images/nature/8.png', 0, 10)
    ]


    ctx;
    canvas;
keyboard;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addToMap(this.sky);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.backgroundObjects);
        
       
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

        let self = this;
        requestAnimationFrame(function () { self.draw(); });
    }


    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    addToMap(moveObj) {
        this.ctx.drawImage(moveObj.img, moveObj.x, moveObj.y, moveObj.width, moveObj.height);

    }
}