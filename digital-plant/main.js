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
    leaf = new Leaf(leafSprite,32,32,250,250,250,250);  
}


function setup(){
    createCanvas(canvasWidth,canvasHeight);
    imageMode(CENTER);
    colorMode('hsb');
}

function draw(){
    background(200,100,100);
    leaf.draw();


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


    }

    draw(){
        push();

        translate(this.xPos, this.yPos);

        image(this.spriteSheet, 0,0,this.height,this.width,0,0,this.tileWidth,this.tileHeight);

        pop();
    }
}