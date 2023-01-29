let canvasHeight = 200;
let canvasWidth = 200;

let colorBarWidth  = Math.min(canvasWidth * 0.20,100);

function setup() {
    createCanvas(canvasHeight, canvasWidth);
  }
  
  function draw() {
    background(220);
    ellipse(50,50,80,80);
  }