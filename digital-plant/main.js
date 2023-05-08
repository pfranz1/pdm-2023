let canvasWidth = 750;
let canvasHeight = 1000;

let padding = 50;

let leafSprite;
let potSprite;

let myFont;

let button;


let leaves = [];

let plant;

let drop;
// let pot;

let storm;

let lastStormLocation = -1;
let stormLocation = 124;
let stormLocationSlider;

let doGrow  = false;
let doRain = false;


function preload(){
    myFont = loadFont('assets/NexaText-Trial-Regular.ttf');

    leafSprite = loadImage("./assets/large-leaf.png") ;

    potSprite = loadImage("./assets/pot2.png") ;

    rainSprite = loadImage("./assets/rain-drop.png") ;

}


let numLeaves = 2;

let toneStarted = false;

function setup(){
    createCanvas(canvasWidth,canvasHeight);
    textFont(myFont);
    imageMode(CENTER);
    colorMode('hsb');
    angleMode(DEGREES);

    button = createButton('Grow!!!');
    button.position(8, canvasHeight + 150);
    button.mousePressed(()=>{
        doGrow = !doGrow;
    });

    if ("serial" in navigator && connected == false) {
        // The Web Serial API is supported.
        let connectButton = createButton("Connect Aurdino");
        connectButton.position( 100, canvasHeight + 250 );
        connectButton.mousePressed(()=>{connectButton.remove();connect();});
    }

    stormLocationSlider = createSlider(0, 255, 128,1,);
    stormLocationSlider.position(200, canvasHeight + 150);
    stormLocationSlider.style('width', '160px');

    rainButton = createButton('~~Rain~~');
    rainButton.position(100, canvasHeight + 150);
    rainButton.mousePressed(()=>{
        storm.toggleRain();
        SoundEffectManager.toggleWhiteNoise();
    });


    toneButton = createButton('Start Tone!');
    toneButton.position(8, canvasHeight + 250);
    toneButton.mousePressed(()=>{
        toneStarted = true;
        Tone.start();
        console.log("Tone Started");
        toneButton.remove();
    });
     
    Leaf.startColor = color(123,41,39);
    Leaf.endColor = color(88,42,71);
    Leaf.dehydrationColor = color(88,42,60);

    FallingLeaf.killPlaneHeight = canvasHeight + 250;
    

    Raindrop.outOfBounds = canvasHeight;
    Raindrop.spriteSheet = rainSprite;

    let plantPosition = new Position(canvasWidth / 2,canvasHeight * 0.90);

    let pot = new Pot(potSprite,200,new Position(plantPosition.x,plantPosition.y));


    plant = new Plant(numLeaves,plantPosition, pot);

    // drop = new Raindrop(new Position(canvasWidth / 2 + 200,150));
    storm = new Storm(Storm.ranks * 3,new Position(canvasWidth/2,0),150, plant.leaves,pot, canvasHeight);

    hydrationLow = color(98,14,76);
    hydrationHigh = color(209,87,38);
}


let hydrationLow ;
let hydrationHigh;

function draw(){

    background(240,27,95);

    if (reader) {
        serialRead();
    }


    plant.draw();

    // drop.draw();
    stormLocation = stormLocationSlider.value();
    if(lastStormLocation != stormLocation){
        let stormCenter = (stormLocation / 255) * canvasWidth;
        storm.pos = new Position(stormCenter,0);
        lastStormLocation = stormLocation;
    }
    // console.log(stormLocationPercent);

    push();
    c = lerpColor(hydrationLow,hydrationHigh, plant.averageHydration);
    fill(c);
    circle(canvasWidth - 25, canvasHeight - 25 , 25);
    pop();

    storm.draw();


    if(doGrow && frameCount % 10 == 0){
        plant.doGrowTick();
    }

    if(frameCount % 3 == 0){
        plant.doGravityTick();
    }

    if(frameCount % 30 == 0){
        plant.calcAverageHydration();
        let mappedVal = Math.floor(plant.averageHydration * 255);
        console.log(mappedVal);
        serialWrite({led1:mappedVal});   
    }

    if(storm.isRaining){
        textSize(25);
        text("Raining...", 15 , 65 );
    }

    if(doGrow){
        textSize(25);
        text("Growing...", 15 ,30);
    }

}

function keyPressed(){
    if (key == 'a'){
        doGrow = !doGrow;
    }
    if(key == "s"){
        SoundEffectManager.toggleWhiteNoise();
    }
}

function mousePressed(){
    plant.onTap(new Position(mouseX,mouseY));
}

let connected = false;
const encoder = new TextEncoder();
const decorder = new TextDecoder();
let writer, reader;
let sensorData = {};

async function connect() {
    port = await navigator.serial.requestPort();

    await port.open({ baudRate: 9600 });

    writer = port.writable.getWriter();

    reader = port.readable
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new TransformStream(new LineBreakTransformer()))
        .getReader();
    
    connected = true;
}

function serialWrite(jsonObject) {
    if (writer) {
      console.log("Writing value: ", JSON.stringify(jsonObject));
      writer.write(encoder.encode(JSON.stringify(jsonObject)+"\n"));
    }
}

async function serialRead() {
    while(true) {
      const { value, done } = await reader.read();
      if (done) {
        reader.releaseLock();
        break;
      }
      console.log(value);
      sensorData = JSON.parse(value);

      console.log("reading:", sensorData);
    }
}


class LineBreakTransformer {
    constructor() {
      // A container for holding stream data until a new line.
      this.chunks = "";
    }
  
    transform(chunk, controller) {
      // Append new chunks to existing chunks.
      this.chunks += chunk;
      // For each line breaks in chunks, send the parsed lines out.
      const lines = this.chunks.split("\n");
      this.chunks = lines.pop();
      lines.forEach((line) => controller.enqueue(line));
    }
  
    flush(controller) {
      // When the stream is closed, flush any remaining chunks out.
      controller.enqueue(this.chunks);
    }
  }



