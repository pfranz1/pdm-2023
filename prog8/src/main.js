let mainGuySpriteSheet;
let walkers;
let bg;

let canvasWidth = 500;
let canvasHeight = 900;

let padding = 50;

let ripple;

let gameScore = 0;
let topScore = gameScore;

let startTime = 5;
let timeRemaining = startTime;


let sounds = new Tone.Players({
    "low": "sounds/low.wav",
    "mid": "sounds/mid.wav",
    "high": "sounds/high.wav",
    "applause":"sounds/applause.wav",
    "tap":"sounds/lightTap.wav"
  });

function incScore(){
    gameScore++;
    print("Game score:", gameScore);
}

function preload(){
    bugWalking = loadImage("./assets/Water-Skipper.png");
    bugTwitch = loadImage("./assets/dead-skipper.png");
    musicOn = loadImage("./assets/music-on.png");
    musicOff = loadImage("./assets/music-off.png");

    spawnBugs();
    ripple = new Ripple(-100,-100,0,10,0);
}


function spawnBugs(){
    // BugSprite(spiteSheet, tilingWidth, tilingHeight, numFramesInAnimation, drawingWidth, drawingHeight, xPos, yPos)
    let numBugs = 30;
    walkers = [];

    
    for (let i = 0; i < numBugs; i++) {
        walkers.push(new BugSprite(bugWalking,bugTwitch,32,32,9,3,75,75,random(padding,windowWidth - padding),random(padding,windowHeight - padding), incScore ));
    }
}


var musicManager;
var isMusicPlaying = false;

var soundEffectManager;

function setup(){
    musicManager = new MusicManager(isMusicPlaying);
    soundEffectManager = new SoundEffectManager();

    musicManager.setup();
    sounds.toDestination();

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
    textSize(50)
    fill(200,0,100);
    text(gameScore + "S", width-100,padding);

    text(ceil(timeRemaining) + "T",width-100,padding+50);
    

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
    text("Score: " + gameScore, (windowWidth / 2), (textStartY)+40)


    textSize(32);
    text("Top: " + topScore, (windowWidth / 2), (textStartY)+80)


    if(hasButtonInit == false){
        hasButtonInit = true;
        button = createButton('Again!');
        button.position((windowWidth / 2) - 75, (textStartY) + 240 );
        button.size(150);
        button.mousePressed( ()=>  { hasButtonInit = false; button.remove(); startGame();});
    }



    pop();
}

function mouseReleased(){
    //TODO: read from bugs if a tap occurred and dont do ripple if so
    walkers.forEach( function (item,index){
        item.tapOccurred(mouseX,mouseY);
    });

    if(mouseX < soundToggleSize && mouseY  < soundToggleSize){
        toggleMusic();
    } else {
        // print("new ripple created at ", mouseX,mouseY);
        ripple = new Ripple(mouseX,mouseY,50,150,50);
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
