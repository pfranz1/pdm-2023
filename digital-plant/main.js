let mainGuySpriteSheet;
let walkers;
let bg;

let canvasWidth = 1000;
let canvasHeight = 500;

let padding = 50;

let leafSprite;

let leaf;


function preload(){
    leafSprite = loadImage("./assets/leaf.png") ;
    leaf = new Leaf(leafSprite,32,32,250,250,0,0);  
}


let xRotSlider;
let yRotSlider;
let zRotSlider;

function setup(){
    createCanvas(canvasWidth,canvasHeight,WEBGL);
    imageMode(CENTER);
    colorMode('hsb');
    angleMode(DEGREES);

    createRotationSliders();
}

function draw(){
    background(200,100,100);
    leaf.draw();


}

function createRotationSliders(){
    
    xRotSlider = createSlider(0, 360, 0, 1);
    xRotSlider.position(0,canvasHeight * 1.5);
  
    xRotSlider.mouseReleased( () => {
        leaf.xRot = xRotSlider.value();
    })

    yRotSlider = createSlider(0, 360, 0, 1);
    yRotSlider.position(150,canvasHeight * 1.5);
  
    yRotSlider.mouseReleased( () => {
        leaf.yRot = yRotSlider.value();
    })

    zRotSlider = createSlider(0, 360, 0, 1);
    zRotSlider.position(300,canvasHeight * 1.5);
  
    zRotSlider.mouseReleased( () => {
        leaf.zRot = zRotSlider.value();
    })

}

function keyPressed(){

}


function keyReleased(){

}

class Leaf {
    constructor(spriteSheet, tileWidth, tileHeight, height,width,xPos,yPos){
        this.spriteSheet = spriteSheet;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.height = height;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;

        this.xRot = 0;
        this.yRot = 0;
        this.zRot = 0;

    }

    draw(){
        push();

        translate(this.xPos, this.yPos);

        rotateX(this.xRot);
        rotateY(this.yRot);
        rotateZ(this.zRot);

        console.log(this.xRot, this.yRot,this.zRot);

        image(this.spriteSheet, 0,0,this.height,this.width,0,0,this.tileWidth,this.tileHeight);

        pop();
    }
}