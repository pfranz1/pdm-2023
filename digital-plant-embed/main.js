

let padding = 50;

let leafSprite;
let potSprite;
let cloudSprite;

let myFont;

let button;


let leaves = [];

let plant;

let drop;
let pot;

let storm;

let lastStormLocation = -1;
let stormLocation = 124;
let stormLocationSlider;

let doGrow  = true;
let doRain = true;


function preload(){
    myFont = loadFont('assets/NexaText-Trial-Regular.ttf');

    leafSprite = loadImage("./assets/large-leaf.png") ;

    potSprite = loadImage("./assets/real-pot-front.png");
    backPotSprite = loadImage("./assets/real-pot-back.png")

    rainSprite = loadImage("./assets/rain-drop.png") ;

    // cloudSprite = loadImage("./assets/cloud.png") ;
}


let numLeaves = 5;

let toneStarted = false;

let canvas;

// Init in setup
let lastCanvasWidth;
let lastCanvasHeight;


function setup(){
    canvas = createCanvas(canvasWidth,canvasHeight);
    textFont(myFont);
    imageMode(CENTER);
    colorMode('hsb');
    angleMode(DEGREES);


    Leaf.startColor = color(123,41,39);
    Leaf.endColor = color(88,42,71);
    Leaf.dehydrationColor = color(88,42,60);

    
    Raindrop.spriteSheet = rainSprite;

    Raindrop.outOfBounds = canvasHeight;

    lastCanvasHeight = canvasHeight;
    lastCanvasWidth = canvasWidth;

    let scale = 0.25;
    let potHeight = Pot.tileHeight * scale;
    let potWidth = Pot.tileWidth * scale;
    
    let potPos = new Position(canvasWidth / 2, canvasHeight - potHeight  / 2);


    pot = new Pot(potSprite, backPotSprite,potHeight, potWidth, potPos);

    let plantPosition = new Position(canvasWidth / 2, canvasHeight - potHeight  / 2);

    plant = new Plant(numLeaves,plantPosition, pot);

    // drop = new Raindrop(new Position(canvasWidth / 2 + 200,150));
    storm = new Storm(cloudSprite,Storm.ranks * 5,new Position(canvasWidth/2,-Raindrop.size * 2),500, plant.leaves,pot, canvasHeight);
    storm.isRaining = true;

    FallingLeaf.killPlaneHeight = canvasHeight + 100;

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

    if( frameCount > 200 && plant.averageHydration > 0.95 && storm.isRaining ){
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

let canvasWidth = window.innerWidth - 5;
let canvasHeight = window.innerHeight - 5;

window.onresize = function() {
    canvasWidth = window.innerWidth - 5;
    canvasHeight = window.innerHeight - 5;  

    updateForSize(canvasWidth, canvasHeight);
  }



function updateForSize(w, h){
    resizeCanvas(w, h);
    FallingLeaf.killPlaneHeight = h + 250;

    let xChange = w - lastCanvasWidth;
    let yChange = h - lastCanvasHeight;

    lastCanvasWidth = w;
    lastCanvasHeight = h;


    Raindrop.outOfBounds += yChange;
    FallingLeaf.killPlaneHeight += yChange;


    pot.move(xChange / 2, yChange);
    plant.move(xChange / 2, yChange);
    storm.move(xChange / 2);

    draw();
}

function keyPressed(){
    if (key == 'g'){
        doGrow = !doGrow;
    }
}

function mousePressed(){
    plant.onTap(new Position(mouseX,mouseY));
}