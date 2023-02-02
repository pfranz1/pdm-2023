let spriteSheet;

let spriteX =0;
let spriteY = 0;
let spriteWidth = 80;
let spriteHeight = 80;

let animationLenght = 9;
let currentFrame = 0;



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
    

    image(spriteSheet,200,200,80,80,u*spriteWidth,v*spriteHeight,spriteWidth,spriteHeight);
    if(frameCount % 6 == 0){
        currentFrame++;
    }
    


}