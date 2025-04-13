let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

window.onresize = function() {
    // assigns new values for width and height variables
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;  
    canvas.size(canvasWidth,canvasHeight);

    Raindrop.outOfBounds = canvasHeight;
  }


let padding = 50;

let leafSprite;
let potSprite;
let cloudSprite;

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

let doGrow  = true;
let doRain = false;


function preload(){
    myFont = loadFont('assets/NexaText-Trial-Regular.ttf');

    leafSprite = loadImage("./assets/large-leaf.png") ;

    potSprite = loadImage("./assets/pot2.png") ;

    rainSprite = loadImage("./assets/rain-drop.png") ;

    cloudSprite = loadImage("./assets/cloud.png") ;
}


let numLeaves = 5;

let toneStarted = false;

function setup(){
    createCanvas(canvasWidth,canvasHeight);
    textFont(myFont);
    imageMode(CENTER);
    colorMode('hsb');
    angleMode(DEGREES);


    Leaf.startColor = color(123,41,39);
    Leaf.endColor = color(88,42,71);
    Leaf.dehydrationColor = color(88,42,60);

    FallingLeaf.killPlaneHeight = canvasHeight + 250;
    

    Raindrop.outOfBounds = canvasHeight;
    Raindrop.spriteSheet = rainSprite;

    let plantPosition = new Position(canvasWidth / 2,canvasHeight * 0.90);
    
    let pot = new Pot(potSprite,200,new Position(plantPosition.x,canvasHeight));


    plant = new Plant(numLeaves,plantPosition, pot);

    // drop = new Raindrop(new Position(canvasWidth / 2 + 200,150));
    storm = new Storm(cloudSprite,Storm.ranks * 3,new Position(canvasWidth/2,100),500, plant.leaves,pot, canvasHeight);

    hydrationLow = color(98,14,76);
    hydrationHigh = color(209,87,38);
}


let hydrationLow ;
let hydrationHigh;

let flipFlop = false;

function draw(){

    clear()


    plant.draw();

    stormLocation = 255 / 2;


    if(frameCount % 30 == 0 && (Math.random() > 0.2 && plant.averageHydration < 0.40 ) && !storm.isRaining){
        storm.isRaining = true;
    }

    if(plant.averageHydration > 0.95 ||  plant.averageHydration > 0.50 && frameCount % 240 == 0 && Math.random() > 0.8 && storm.isRaining ){
        storm.isRaining = false;
    }

    if(lastStormLocation != stormLocation){
        let stormCenter = (stormLocation / 255) * canvasWidth;
        storm.pos = new Position(stormCenter,storm.pos.y);
        lastStormLocation = stormLocation;
    }
    // console.log(stormLocationPercent);

    storm.draw();

    if(doGrow && frameCount % 10 == 0){
        plant.doGrowTick();
    }

    if(frameCount % 4 == 0){
        plant.doGravityTick();
    }



    if(frameCount % 30 == 0){
        plant.calcAverageHydration();

    }

}

function keyPressed(){
    if (key == 'g'){
        doGrow = !doGrow;
    }
}

function mousePressed(){
    plant.onTap(new Position(mouseX,mouseY));
}