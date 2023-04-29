let canvasWidth = 750;
let canvasHeight = 1000;

let padding = 50;

let leafSprite;
let potSprite;

let myFont;


let leaves = [];

let plant;
let pot;

let doGrow  = false;


function preload(){
    myFont = loadFont('assets/NexaText-Trial-Regular.ttf');

    leafSprite = loadImage("./assets/large-leaf.png") ;

    potSprite = loadImage("./assets/Pot2.png") ;

}


let numLeaves = 14;

function setup(){
    createCanvas(canvasWidth,canvasHeight);
    textFont(myFont);
    imageMode(CENTER);
    colorMode('hsb');
    angleMode(DEGREES);

    let plantPosition = new Position(canvasWidth / 2,canvasHeight * 0.90);

    plant = new Plant(numLeaves,plantPosition);

    pot = new Pot(potSprite,200,new Position(plantPosition.x,plantPosition.y));

}


function draw(){


    background(240,27,95);

    plant.draw();

    pot.draw();

    if(doGrow && frameCount % 30 == 0){
        plant.doGrowTick();
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



