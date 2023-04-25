let mainGuySpriteSheet;
let walkers;
let bg;

let canvasWidth = 7500;
let canvasHeight = 5000;

let padding = 50;

let leafSprite;

let leaf;

let myFont;

let myLeafRots = [
    new RotationStruct(0, -30, -30),
new RotationStruct(0, -30, 10),
new RotationStruct(0, -30, 50),
new RotationStruct(0, -10, -30),
new RotationStruct(0, -10, -10),
new RotationStruct(0, -10, 10),
new RotationStruct(0, -10, 30),
new RotationStruct(0, 10, -70),
new RotationStruct(0, 10, -50),
new RotationStruct(0, 10, -30),
new RotationStruct(0, 10, -10),
new RotationStruct(0, 10, 10),
new RotationStruct(0, 10, 30),
new RotationStruct(0, 10, 50),
new RotationStruct(0, 10, 70),
new RotationStruct(0, 30, -40),
new RotationStruct(0, 30, -10),
new RotationStruct(0, 30, 10),
new RotationStruct(0, 50, -30),
new RotationStruct(0, 50, -10),
new RotationStruct(0, 50, 10),
new RotationStruct(0, 50, 30),
new RotationStruct(0, 50, 50),
new RotationStruct(0, 70, -50),
new RotationStruct(0, 70, -30),
new RotationStruct(10, 10, 10),
new RotationStruct(10, 10, 30),
new RotationStruct(10, 30, 30),
new RotationStruct(10, 50, -30),
new RotationStruct(10, 70, -30),
new RotationStruct(10, 70, 10),
new RotationStruct(10, 70, 30),
new RotationStruct(20, -30, 50),
new RotationStruct(20, -10, 10),
new RotationStruct(20, -10, 30),
new RotationStruct(20, -10, 50),
new RotationStruct(20, 10, 30),
new RotationStruct(20, 30, -70),
new RotationStruct(20, 30, -50),
new RotationStruct(20, 30, -30),
new RotationStruct(20, 50, -30),
new RotationStruct(20, 50, -10),
new RotationStruct(20, 50, 50),
new RotationStruct(30, -10, 10),
new RotationStruct(30, 10, -50),
new RotationStruct(30, 10, -10),
new RotationStruct(30, 10, 10),
new RotationStruct(30, 10, 30),
new RotationStruct(30, 10, 50),
new RotationStruct(30, 30, -10),
new RotationStruct(40, -30, 30),
new RotationStruct(40, -10, 30),
new RotationStruct(40, -10, 50),
new RotationStruct(40, 10, -50),
new RotationStruct(40, 10, -30),
new RotationStruct(40, 10, -10),
new RotationStruct(40, 10, 10),
new RotationStruct(40, 10, 30),
new RotationStruct(50, -10, 30),
new RotationStruct(60, -30, 70),
new RotationStruct(60, 10, -90),
new RotationStruct(80, -30, 70),
new RotationStruct(80, 30, -90),
new RotationStruct(80, 50, -70)
];




let leaves = [];


function preload(){
    myFont = loadFont('assets/NexaText-Trial-Regular.ttf');

    leafSprite = loadImage("./assets/leaf.png") ;
    leaf = new Leaf(leafSprite,32,32,100,100,0,0, new RotationStruct(0,0,0));  
}


let xRotSlider;
let yRotSlider;
let zRotSlider;

function setup(){
    createCanvas(canvasWidth,canvasHeight,WEBGL);
    textFont(myFont);
    imageMode(CENTER);
    colorMode('hsb');
    angleMode(DEGREES);

    createRotationSliders();

    // createRots();

    createLeavesFromRots();
}

let leafSize = 100;

let numOfSteps = 9;


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
    let startY = canvasHeight / 2 * -1 + leafSize;
    let startX = canvasWidth  / 2 * -1 + leafSize
    let padding = 50;

    myLeafRots.forEach((rotStruct,index,_)=>{

        if(index % (numOfSteps *  2)== 0 && index != 0){
            startX += leafSize + padding;
            startY = canvasHeight / 2 * -1 + leafSize;
        }


        //spriteSheet, tileWidth, tileHeight, height,width,xPos,yPos, rotationStruct){
        leaves.push(new Leaf(leafSprite,32,32,leafSize,leafSize,startX,startY,rotStruct));
        startY += 100 + padding;


    });
}

function draw(){


    background(66,66,66);
    leaf.draw();

    leaves.forEach((value,index,_)=>{
        value.draw();
    })

    textSize(32);
    text('XROT:' + xRotSlider.value(),250,-100);
    text('YROT:' + yRotSlider.value(),250,0);
    text('ZROT:' + zRotSlider.value(),250,100);


    fill(100,100,100)
    circle(0,0,10)

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

class Leaf {
    constructor(spriteSheet, tileWidth, tileHeight, myHeight,myWidth,xPos,yPos, rotationStruct){
        this.spriteSheet = spriteSheet;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.height = myHeight;
        this.width = myWidth;
        this.xPos = xPos;
        this.yPos = yPos;

        this.xRot = rotationStruct.xRot;
        this.yRot = rotationStruct.yRot;
        this.zRot = rotationStruct.zRot;

    }

    draw(){
        push();

        // rotateX(this.xRot);

        // translate(500,20);
        translate(this.xPos,this.yPos);

        textSize(15);
        fill(0,0,0);
        // let startX = this.width / 2 * -1;
        text(this.xRot,-30,this.height / 2 * -1);
        text(this.yRot,0,this.height / 2 * -1);
        text(this.zRot ,30,this.height / 2 * -1);



        rotateX(this.xRot);
        rotateY(this.yRot);
        rotateZ(this.zRot);


        image(this.spriteSheet, 0,0,this.width,this.height,0,0,this.tileWidth,this.tileHeight);

        // rotateX(this.xRot);
        // rotateY(this.yRot);
        // rotateZ(this.zRot);


        // translate(this.xPos,this.yPos);

        // // square(this.xPos - this.width / 2,this.yPos, this.height);

        // translate(0, (this.height / 2) * 0.90);

        // // console.log(this.xRot, this.yRot,this.zRot);


        pop();
    }
}