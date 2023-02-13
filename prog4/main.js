let mainGuySpriteSheet;
let walkers;
let bg;

let canvasWidth = 500;
let canvasHeight = 1000;

let padding = 50;

let ripple;

let gameScore = 0;
let topScore = gameScore;

let startTime = 30;
let timeRemaining = startTime;


function incScore(){
    gameScore++;
    print("Game score:", gameScore);
}

function preload(){
    bugWalking = loadImage("./assets/Water-Skipper.png");
    bugTwitch = loadImage("./assets/dead-skipper.png");

    spawnBugs();
    ripple = new Ripple(-100,-100,0,10,0);
}


function spawnBugs(){
    // BugSprite(spiteSheet, tilingWidth, tilingHeight, numFramesInAnimation, drawingWidth, drawingHeight, xPos, yPos)
    let numBugs = 30;
    walkers = [];

    
    for (let i = 0; i < numBugs; i++) {
        walkers.push(new BugSprite(bugWalking,bugTwitch,32,32,9,3,80,80,random(padding,canvasWidth - padding),random(padding,canvasHeight - padding), incScore ));
    }
}




function setup(){
    createCanvas(canvasWidth,canvasHeight);
    imageMode(CENTER);
    colorMode('hsb');
}


function endGame(){
    timeRemaining = -1;
    print("end game");
    topScore = max(gameScore, topScore);
    drawScoreScreen();
    // spawnBugs();
}

function startGame(){
    gameScore = 0;
    timeRemaining = startTime;
    spawnBugs();
}

function draw(){

    if(timeRemaining == -1){
        // drawScoreScreen();
    } else {
        background(236,70,100);


        timeRemaining -= deltaTime / 1000;
        if (timeRemaining < 0) {
            endGame();
        } else {
            drawGame();
        }
    }
}


function drawGame(){
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

function drawScoreScreen(){
    background(236,70,100);

    push();

    let textStartY = canvasHeight * 0.30; 

    textAlign('center');

    textSize(48);
    text("Game Over!", canvasWidth / 2, textStartY);

    textSize(32);
    text("Score: " + gameScore, (canvasWidth / 2), (textStartY)+40)


    textSize(32);
    text("Top: " + topScore, (canvasWidth / 2), (textStartY)+80)


    button = createButton('Again!');
    button.position((canvasWidth / 2) - 75, (textStartY) + 240 );
    button.size(150);
    button.mousePressed( ()=>  {button.remove(); startGame();});


    pop();
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
