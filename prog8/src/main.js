let mainGuySpriteSheet;
let walkers;
let bg;

let canvasWidth = 500;
let canvasHeight = 900;

let padding = 50;

let ripple;

let gameScore = 2;
let topScore = gameScore;

let startTime = 30;
let timeRemaining = startTime;



function incScore(){
    gameScore++;
    print("Game score:", gameScore);
}
var soundEffectManager;

function preload(){
    bugWalking = loadImage("./assets/Water-Skipper.png");
    bugTwitch = loadImage("./assets/dead-skipper.png");
    scoreIcon = loadImage("./assets/crossed-skipper.png");
    timeIcon = loadImage("./assets/time-icon.png");
    musicOn = loadImage("./assets/music-on.png");
    musicOff = loadImage("./assets/music-off.png");

    soundEffectManager = new SoundEffectManager();


    spawnBugs();
    ripple = new Ripple(-100,-100,0,10,0);
}


function spawnBugs(){
    // BugSprite(spiteSheet, tilingWidth, tilingHeight, numFramesInAnimation, drawingWidth, drawingHeight, xPos, yPos)
    let numBugs = 30;
    walkers = [];

    
    for (let i = 0; i < numBugs; i++) {
        walkers.push(new BugSprite(bugWalking,bugTwitch,32,32,9,3,75,75,random(padding,windowWidth - padding),random(padding,windowHeight - padding), incScore, soundEffectManager ));
    }
}


var musicManager;
var isMusicPlaying = false;

var showStartScreen = true;

function setup(){
    musicManager = new MusicManager(isMusicPlaying);

    musicManager.setup();

    cnv = createCanvas(windowWidth,windowHeight);
    cnv.style('display', 'block');

    centerCanvas();
    imageMode(CENTER);
    colorMode('hsb');
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    cnv.style('display', 'block');

  }


function windowResized() {
    if(hasButtonInit){
        button.remove();
        hasButtonInit = false;
    }

    resizeCanvas(windowWidth, windowHeight);
    centerCanvas();
  }

function endGame(){
    timeRemaining = -1;
    print("end game");
    topScore = max(gameScore, topScore);
    musicManager.onGameEnd();
    drawScoreScreen();
    // spawnBugs();
}

function startGame(){
    gameScore = 0;
    timeRemaining = startTime;
    musicManager.onGameStart();
    spawnBugs();
}

function draw(){
    if(showStartScreen){
        drawStartScreen();
        drawMusicIcon();
    } 
    else if(timeRemaining == -1){
        drawScoreScreen();
        drawMusicIcon();

    } else {
        background(236,70,100);
        drawMusicIcon();


        timeRemaining -= deltaTime / 1000;
        if (timeRemaining < 0) {
            endGame();
        } else {
            drawGame();
        }
    }

}

var soundToggleSize = 50;

function drawMusicIcon(){
    push();
    imageMode("corner");
    image(isMusicPlaying ? musicOn : musicOff,0,0,soundToggleSize,soundToggleSize);
    pop();
}

function toggleMusic(){
    isMusicPlaying = !isMusicPlaying;
    musicManager.onPlayMusicToggle();
}

function drawGame(){
    // print('draw ripple');
    ripple.draw();

    // Want the ripple not to cover text, but want bugs to crawl on text
    textSize(50);
    fill(200,0,100);
    textAlign("RIGHT");
    text(gameScore, width-110,padding);

    push();

    imageMode('corner');
    let iconPadding = 50;
    // Magic numbers <3
    translate(width-iconPadding - 32, -20);
    scale(0.5);
    image(scoreIcon,48,48);
    pop();

    push();
    textAlign(RIGHT);
    imageMode('corner');

    translate(width-iconPadding - 20, 40);
    scale(0.4);
    image(timeIcon,48,48);
    pop();

    text(ceil(timeRemaining),width-110,padding+50);
    

    walkers.forEach( function (item,index){
        item.draw();
    });
}

var button;

var hasButtonInit = false;

function drawScoreScreen(){
    background(236,70,100);

    push();

    let textStartY = canvasHeight * 0.30; 

    textAlign('center');

    textSize(48);
    text("Game Over!", windowWidth / 2, textStartY);

    textSize(32);
    text("Score: " + gameScore, (windowWidth / 2), (textStartY)+60)


    textSize(32);
    text("Top: " + topScore, (windowWidth / 2), (textStartY)+100)


    if(hasButtonInit == false){
        hasButtonInit = true;
        button = createButton('Again!');
        button.position((windowWidth / 2) - 75, (textStartY) + 240 );
        button.size(150);
        button.mousePressed( ()=>  { hasButtonInit = false; button.remove(); startGame();});
    }



    pop();
}

function drawStartScreen(){
    background(236,70,100);

    push();
    fill(200,0,100);

    let textStartY = canvasHeight * 0.30; 

    textAlign('center');

    textSize(48);
    text("Bug Squish", windowWidth / 2, textStartY);

    textSize(32);
    text("By: Peter Franz ", (windowWidth / 2), (textStartY)+60)

    if(hasButtonInit == false){
        hasButtonInit = true;
        button = createButton('Start');
        button.position((windowWidth / 2) - 75, (textStartY) + 240 );
        button.size(150);
        button.mousePressed( ()=>  { hasButtonInit = false; button.remove(); showStartScreen = false; startGame();});
    }

    walkers.forEach( function (item,index){
        item.draw();
    });

    pop();
}
// This function has the side effect of toggling the music on or off
function checkMusicToggle(){
    if(mouseX < soundToggleSize && mouseY  < soundToggleSize){
        toggleMusic();
        return true;
    } 

    return false;
}

function mouseReleased(){
    if(timeRemaining > 0 && showStartScreen == false){
        //TODO: read from bugs if a tap occurred and dont do ripple if so
        
        let squishedCounter = 0; 
        walkers.forEach( function (item,index){
            squishedCounter += item.tapOccurred(mouseX,mouseY) ? 1 : 0;
        });

        // If it wasn't the music being toggled and no bugs were squished
        if(checkMusicToggle() == false && squishedCounter <=  0) {
            // Create new ripple
            // print("new ripple created at ", mouseX,mouseY);
            ripple = new Ripple(mouseX,mouseY,50,150,50);
            soundEffectManager.doSplash();
        }
    } else {
        checkMusicToggle();
    }

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
