// let x = 0;
// let canvasWidth = 1000;

// function setup() {
//   var canvas = createCanvas(canvasWidth, 100);
//   canvas.parent('first')
//   background(100);
// }

// function draw() {
//   ellipse(x,height/2,20,20);
  
//   x = x + 1;
//   if (x > canvasWidth){
//     x = 0;
//   }
// }
const firstS = (p) => {
  // let x = 0;
  let canvasWidth = 500;
  let canvasHeight = canvasWidth / 2;
  let padding = canvasWidth * 1 / 50;


  let circleRadius;
  

  p.setup = function(){
    p.createCanvas(canvasWidth,canvasHeight);
    
    let maxWidth = canvasWidth * 0.25;
    let maxHeight = canvasHeight * 0.5;

    // Store circle radius, ensureing that it fits
    circleRadius = Math.min(maxWidth,maxHeight) - padding;
  };

  p.draw = function(){
    p.background(0,255,0);

    p.ellipse(canvasWidth * 0.25,canvasHeight * 0.5,circleRadius * 2,circleRadius * 2);

  }
}

let firstSketch = new p5(firstS, 'first')