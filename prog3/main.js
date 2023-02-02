let spriteSheet;

let spriteX =0;
let spriteY = 0;
let spriteWidth = 80;
let spriteHeight = 80;

let animationLenght = 9;
let currentFrame = 0;

let xLocation = 200;
let xDirection = 1;

let isMoving = 0;



// Index of sprite on sprite sheet
let u = 0; v = 0;

function preload(){
    spriteSheet = loadImage("./assets/SpelunkyGuy.png")
}


function setup(){
    createCanvas(400,400);
    imageMode(CENTER);
}

function draw(){
    background(220);

    u = currentFrame % animationLenght;
    
    translate(xLocation,200);
    scale(xDirection,1);

    image(spriteSheet,0,0,80,80,u*spriteWidth,v*spriteHeight,spriteWidth,spriteHeight);
    if(frameCount % 6 == 0){
        currentFrame++;
    }

    xLocation += isMoving;

}

function keyPressed(){
    if (keyCode === RIGHT_ARROW){
        isMoving = 1;
        xDirection = 1;
    } 
    else if (keyCode === LEFT_ARROW){
        isMoving = -1;
        xDirection = -1;
    } 
}


function keyReleased(){
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW){
        isMoving = 0;
    } 

}