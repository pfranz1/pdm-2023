let port;
let writer, reader;
let slider; 
let red, green, blue;
let sensorData = {};
const encoder = new TextEncoder();
const decorder = new TextDecoder();

let activationState = { led1: true, led2:true,led3:true };

function setup() {
  createCanvas(400, 400);

  

  if ("serial" in navigator) {
    // The Web Serial API is supported.
    let button = createButton("connect");
    button.position(175,75);
    button.mousePressed(connect);
  }
}

function toggleLedStatus(ledIndex){
  if(ledIndex == 1){
    activationState.led1 = !activationState.led1;
  } else if(ledIndex == 2){
    activationState.led2 = !activationState.led2;
  } else if(ledIndex == 3){
    activationState.led3 = !activationState.led3;
  }

  serialWrite(activationState);

}

function keyTyped() {
  if (key === 'a') {
    activationState.led1 = !activationState.led1;
    activationState.led2 = !activationState.led2;
    activationState.led3 = !activationState.led3;


    console.log("Writing json to serial", JSON.stringify(activationState));
    serialWrite(activationState);
  }
}

function draw() {
  background(220);

  if (reader) {
    serialRead();
  }

  // if (activationState.active) {
  //   text("cm: " + sensorData.cm, 10, 100);
  //   text("inches: " + sensorData.inches, 10, 150);
  // }

}

function serialWrite(jsonObject) {
  if (writer) {
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
  }
}

async function connect() {
  port = await navigator.serial.requestPort();

  await port.open({ baudRate: 9600 });

  writer = port.writable.getWriter();

  reader = port.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TransformStream(new LineBreakTransformer()))
    .getReader();

    let startY = 75;
    let startX = 75;
    let xSpacing = 100;
    
    button = createButton('toggle 1');
    button.position(startX , startY);
    button.mousePressed(()=>toggleLedStatus(1));


    button = createButton('toggle 2');
    button.position(startX + xSpacing, startY);
    button.mousePressed(()=>toggleLedStatus(2));

    button = createButton('toggle 3');
    button.position(startX + xSpacing * 2, startY);
    button.mousePressed(()=>toggleLedStatus(3));
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