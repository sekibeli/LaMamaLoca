let level1;

function initLevel() {
 level1 = new Level(

   
    [
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Spider(),
      
        // new Spider(),
        // new Mosquito(),
        // new Mosquito(),
        // new Mosquito(),
        // new Mosquito(),
        // new Mosquito(),
        // new Spider(),
       
       
       
    ],
    
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],
    [

        new BackgroundObject('images/nature/3.png', -100),
        new BackgroundObject('images/nature/5.png', -100),
        new BackgroundObject('images/nature/6.png', -100),
        new BackgroundObject('images/nature/7.png', -100),
        new BackgroundObject('images/nature/8.png', -100),
        new BackgroundObject('images/nature/3.png', 620),
        new BackgroundObject('images/nature/5.png', 620),
        new BackgroundObject('images/nature/6.png', 620),

        new BackgroundObject('images/nature/8.png', 620),
        new BackgroundObject('images/nature/3.png', 1340),
        new BackgroundObject('images/nature/5.png', 1340),
        new BackgroundObject('images/nature/6.png', 1340),
        new BackgroundObject('images/nature/7.png', 1340),
        new BackgroundObject('images/nature/8.png', 1340),
        new BackgroundObject('images/nature/7.png', 1340),
        new BackgroundObject('images/nature/3.png', 2060),
        new BackgroundObject('images/nature/5.png', 2060),
        new BackgroundObject('images/nature/8.png', 2060),
        new BackgroundObject('images/nature/3.png', 2780),
        new BackgroundObject('images/nature/5.png', 2780),
        new BackgroundObject('images/nature/6.png', 2780),
        new BackgroundObject('images/nature/7.png', 2780),
        new BackgroundObject('images/nature/8.png', 2780),
        new BackgroundObject('images/nature/3.png', 3500),
        new BackgroundObject('images/nature/5.png', 3500),
        new BackgroundObject('images/nature/6.png', 3500),
        new BackgroundObject('images/nature/8.png', 3500)
    ],
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()

    ],
    [
        new Immunition(),
        new Immunition(),
        new Immunition(),
        new Immunition(),
        new Immunition(),
        new Immunition(),
        new Immunition(),
        new Immunition(),
        new Immunition(),
        new Immunition(),
        new Immunition(),
        new Immunition()

        
    ],
   [
    // leeres Array für gesammelte fireballs
   ],

    
        new Endboss()
  
    


);
}