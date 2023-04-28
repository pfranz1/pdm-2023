let canvasWidth = 750;
let canvasHeight = 1000;

let padding = 50;

let leafSprite;

let myFont;


let leaves = [];

let plant;

let doGrow  = false;


function preload(){
    myFont = loadFont('assets/NexaText-Trial-Regular.ttf');

    leafSprite = loadImage("./assets/large-leaf.png") ;

}


let numLeaves = 10;

function setup(){
    createCanvas(canvasWidth,canvasHeight);
    textFont(myFont);
    imageMode(CENTER);
    colorMode('hsb');
    angleMode(DEGREES);


    plant = new Plant(numLeaves,canvasWidth / 2,canvasHeight * 0.90);

}


function draw(){


    background(240,27,95);

    plant.draw();

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



