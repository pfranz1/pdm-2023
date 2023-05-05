let canvasWidth = 750;
let canvasHeight = 1000;

let padding = 50;

let leafSprite;
let potSprite;

let myFont;

let button;


let leaves = [];

let plant;

let drop;
// let pot;

let storm;

let lastStormLocation = -1;
let stormLocation = 124;
let stormLocationSlider;

let doGrow  = false;
let doRain = false;


function preload(){
    myFont = loadFont('assets/NexaText-Trial-Regular.ttf');

    leafSprite = loadImage("./assets/large-leaf.png") ;

    potSprite = loadImage("./assets/pot2.png") ;

    rainSprite = loadImage("./assets/rain-drop.png") ;

}


let numLeaves = 2;

function setup(){
    createCanvas(canvasWidth,canvasHeight);
    textFont(myFont);
    imageMode(CENTER);
    colorMode('hsb');
    angleMode(DEGREES);

    button = createButton('Grow!!!');
    button.position(8, canvasHeight + 150);
    button.mousePressed(()=>{
        doGrow = !doGrow;
    });

    stormLocationSlider = createSlider(0, 255, 128,1,);
    stormLocationSlider.position(200, canvasHeight + 150);
    stormLocationSlider.style('width', '160px');

    rainButton = createButton('~~Rain~~');
    rainButton.position(100, canvasHeight + 150);
    rainButton.mousePressed(()=>{
        storm.toggleRain();
    });
     
    Leaf.startColor = color(123,41,39);
    Leaf.endColor = color(88,42,71);
    Leaf.dehydrationColor = color(88,42,60);

    FallingLeaf.killPlaneHeight = canvasHeight + 250;
    

    Raindrop.outOfBounds = canvasHeight;
    Raindrop.spriteSheet = rainSprite;

    let plantPosition = new Position(canvasWidth / 2,canvasHeight * 0.90);

    let pot = new Pot(potSprite,200,new Position(plantPosition.x,plantPosition.y));


    plant = new Plant(numLeaves,plantPosition, pot);

    // drop = new Raindrop(new Position(canvasWidth / 2 + 200,150));
    storm = new Storm(Storm.ranks * 8,new Position(canvasWidth/2,0),250, plant.leaves);

}


function draw(){



    background(240,27,95);


    plant.draw();

    // drop.draw();
    stormLocation = stormLocationSlider.value();
    if(lastStormLocation != stormLocation){
        let stormCenter = (stormLocation / 255) * canvasWidth;
        storm.pos = new Position(stormCenter,0);
        lastStormLocation = stormLocation;
    }
    // console.log(stormLocationPercent);

    storm.draw();


    if(doGrow && frameCount % 10 == 0){
        plant.doGrowTick();
    }

    if(frameCount % 3 == 0){
        plant.doGravityTick();
    }

    if(storm.isRaining){
        textSize(25);
        text("Raining...", 15 , 65 );
    }

    if(doGrow){
        textSize(25);
        text("Growing...", 15 ,30);
    }

}

function keyPressed(){
    if (key == 'a'){
        doGrow = !doGrow;
    }
}

function mousePressed(){
    plant.onTap(new Position(mouseX,mouseY));
}



