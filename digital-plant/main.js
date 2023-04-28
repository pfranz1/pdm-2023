let canvasWidth = 1200;
let canvasHeight = 1200;

let padding = 50;

let leafSprite;

let myFont;


let leaves = [];

let plant;


function preload(){
    myFont = loadFont('assets/NexaText-Trial-Regular.ttf');

    leafSprite = loadImage("./assets/large-leaf.png") ;

}


let numLeaves = 5;

function setup(){
    createCanvas(canvasWidth,canvasHeight);
    textFont(myFont);
    imageMode(CENTER);
    colorMode('hsb');
    angleMode(DEGREES);


    plant = new Plant(numLeaves,500,500);

}


function draw(){


    background(240,27,95);

    plant.draw();

}



