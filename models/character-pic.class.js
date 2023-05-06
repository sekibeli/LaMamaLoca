class CharacterPic extends StatusBar {
    
   

    IMAGE = [
        'images/icon_health_real_character.png'
    ]

    constructor(){
        super();
        this.loadImage(this.IMAGE);
       
        this.x = 10;
        this.y = 11;
        this.width = 60;
        this.height= 60;
    }

   
}