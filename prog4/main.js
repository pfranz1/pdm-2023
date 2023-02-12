let mainGuySpriteSheet;
let walkers;
let bg;

let canvasWidth = 500;
let canvasHeight = 1000;

let padding = 50;

let ripple;

let gameScore = 0;

let startTime = 30;
let timeRemaining = startTime;


function incScore(){
    gameScore++;
    print("Game score:", gameScore);
}

function preload(){
    mainGuySpriteSheet = loadImage("./assets/SpelunkyGuy.png");
    blueGuySpriteSheet = loadImage("./assets/BlueGuy.png");
    robotSpriteSheet = loadImage("./assets/robot.png");

    bugwalk = loadImage("./assets/Water-Skipper.png");

    spawnBugs();
    ripple = new Ripple(-100,-100,0,10,0);
}


function spawnBugs(){
    // BugSprite(spiteSheet, tilingWidth, tilingHeight, numFramesInAnimation, drawingWidth, drawingHeight, xPos, yPos)
    let numBugs = 30;
    walkers = [];

    
    for (let i = 0; i < numBugs; i++) {
        walkers.push(new BugSprite(bugwalk,32,32,9,80,80,random(padding,canvasWidth - padding),random(padding,canvasHeight - padding), incScore ));
    }
}




function setup(){
    createCanvas(canvasWidth,canvasHeight);
    imageMode(CENTER);
    colorMode('hsb');
}


function endGame(){
    timeRemaining = startTime;
    gameScore = 0;
    spawnBugs();
}

function draw(){
    background(236,70,100);

    // text("Time: " + ceil(timeRemaining),width-120,50);
    timeRemaining -= deltaTime / 1000;

    if (timeRemaining < 0) {
        endGame();
    }

    // print('draw ripple');
    ripple.draw();

    // Want the ripple not to cover text, but want bugs to crawl on text
    textSize(50)
    fill(200,0,100);
    text("Score: " + gameScore, 10,padding);

    text("Time: " + ceil(timeRemaining),width-200,padding);
    

    walkers.forEach( function (item,index){
        item.draw();
    });


}

function mouseReleased(){
    //TODO: read from bugs if a tap occurred and dont do ripple if so
    walkers.forEach( function (item,index){
        item.tapOccurred(mouseX,mouseY);
    });

    // print("new ripple created at ", mouseX,mouseY);
    ripple = new Ripple(mouseX,mouseY,50,150,50);

}

function keyPressed(){
    // walkers.forEach( function (item,index){
    //     item.keyPressed();
    // });
}


function keyReleased(){
    // walkers.forEach( function (item,index){
    //     item.keyReleased();
    // });
}
