let mainGuySpriteSheet;
let walkers;
let bg;

let canvasWidth = 1000;
let canvasHeight = 1000;

let padding = 50;

let leafSprite;

let leaf;

let myFont;

let myLeafRots = [ new RotationStruct(0, 0 ,0 ), new RotationStruct(45,0,0), new RotationStruct(30,0,0), new RotationStruct(0,-45,0)];

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

    createLeavesFromRots();
}

let leafSize = 100;

function createLeavesFromRots(){
    let startY = canvasHeight / 2 * -1 + leafSize;
    let startX = canvasWidth  / 2 * -1 + leafSize
    let padding = 170;

    myLeafRots.forEach((rotStruct,index,_)=>{
        //spriteSheet, tileWidth, tileHeight, height,width,xPos,yPos, rotationStruct){
        leaves.push(new Leaf(leafSprite,32,32,leafSize,leafSize,startX,startY,rotStruct));
        startY += 100;

        if(index % 8 == 0 && index != 0){
            startX += leafSize + padding;
        }
    });
}

function draw(){


    background(200,100,100);
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