let mainGuySpriteSheet;
let walkers;
let bg;

let canvasWidth = 1200;
let canvasHeight = 1200;

let padding = 50;

let leafSprite;

let leaf;

let myFont;

let myLeafRots = [
    makeStructFromZRot(0),
    makeStructFromZRot(45),
];




let leaves = [];

let plant;


function preload(){
    myFont = loadFont('assets/NexaText-Trial-Regular.ttf');

    leafSprite = loadImage("./assets/large-leaf.png") ;


    let zRot = -30;
    // leaf = new Leaf(leafSprite,64,64,100,100,250,250, new RotationStruct(xRot-10,yRot-15,zRot));  
    // leaf = new Leaf(leafSprite,64,64,100,100,250,250, makeStructFromZRot(zRot));  

}


let xRotSlider;
let yRotSlider;
let zRotSlider;

let numLeaves = 3;

function setup(){
    createCanvas(canvasWidth,canvasHeight);
    textFont(myFont);
    imageMode(CENTER);
    colorMode('hsb');
    angleMode(DEGREES);

    createRotationSliders();

    // createRots();

    createLeavesFromRots();

    plant = new Plant(numLeaves,500,500);
}

// let leafSize = 100;

let numOfSteps = 9;

function makeStructFromZRot(iZRot){
    let zRot = iZRot;
    let yRot = zRot * 0.65 * -1;
    let xRot = zRot * (2/6);
    // leaf = new Leaf(leafSprite,64,64,100,100,250,250, new RotationStruct(xRot-10,yRot-15,zRot));  
    return new  RotationStruct(xRot,yRot,iZRot);
}


function createRots(){
    let xLow = 0;
    let xHigh = 90;

    let yLow = -90;
    let yHigh = 90;

    let zLow = -90;
    let zHigh = 90;

    let xStepSize = (abs(xLow) + abs(xHigh)) / numOfSteps;
    let yStepSize = (abs(yLow) + abs(yHigh)) / numOfSteps;
    let zStepSize = (abs(zLow) + abs(zHigh)) / numOfSteps;


    for(let i = 0; i < numOfSteps; i++){
        for(let j = 0; j < numOfSteps; j++){
            for(let k = 0; k < numOfSteps; k++){
                myLeafRots.push(new RotationStruct(xLow + (i * xStepSize), yLow + (j * yStepSize), zLow + (k * zStepSize)));
                console.log("added rot: ", xLow + i * xStepSize,  yLow + j * yStepSize, zLow + k * zStepSize);
            }
        }
    }
}

function createLeavesFromRots(){
    let startY = 0 + leafSize;
    let startX = leafSize;
    let padding = 50;

    myLeafRots.forEach((rotStruct,index,_)=>{

        if(index % 8== 0 && index != 0){
            startX += leafSize + padding;
            startY = canvasHeight / 2 * -1 + leafSize;
        }


        //spriteSheet, tileWidth, tileHeight, height,width,xPos,yPos, rotationStruct){
        leaves.push(new Leaf(leafSprite,64,64,leafSize,leafSize,startX,startY,rotStruct));
        startY += 100 + padding;


    });
}

function draw(){


    background(240,27,95);
    // leaf.draw();

    // leaves.forEach((value,index,_)=>{
    //     value.draw();
    // })

    plant.draw();

    textSize(32);
    text('XROT:' + xRotSlider.value(),250,-100);
    text('YROT:' + yRotSlider.value(),250,0);
    text('ZROT:' + zRotSlider.value(),250,100);



}


function createRotationSliders(){
    
    xRotSlider = createSlider(0, 90, 0, 1);
    xRotSlider.position(0,canvasHeight * 1.5);
  
    xRotSlider.mouseReleased( () => {
        leaf.xRot = xRotSlider.value();
    })

    yRotSlider = createSlider(-90, 90, 0, 1);
    yRotSlider.position(150,canvasHeight * 1.5);
  
    yRotSlider.mouseReleased( () => {
        leaf.yRot = yRotSlider.value();
    })

    zRotSlider = createSlider(-90,90, 0, 1);
    zRotSlider.position(300,canvasHeight * 1.5);
  
    zRotSlider.mouseReleased( () => {
        leaf.zRot = zRotSlider.value();
    })

}

function keyPressed(){
    if(keyCode  == ENTER){
        console.log( xRotSlider.value(), yRotSlider.value(),zRotSlider.value() );
    }
}


function keyReleased(){

}

