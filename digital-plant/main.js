let canvasWidth = 750;
let canvasHeight = 1000;

let padding = 50;

let leafSprite;
let potSprite;

let myFont;

let button;


let leaves = [];

let plant;
// let pot;

let doGrow  = false;


function preload(){
    myFont = loadFont('assets/NexaText-Trial-Regular.ttf');

    leafSprite = loadImage("./assets/large-leaf.png") ;

    potSprite = loadImage("./assets/pot2.png") ;

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
     
    Leaf.startColor = color(123,41,39);
    Leaf.endColor = color(88,42,71);

    let plantPosition = new Position(canvasWidth / 2,canvasHeight * 0.90);

    let pot = new Pot(potSprite,200,new Position(plantPosition.x,plantPosition.y));


    plant = new Plant(numLeaves,plantPosition, pot);


}


function draw(){


    background(240,27,95);

    plant.draw();


    if(doGrow && frameCount % 10 == 0){
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



