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
  let x = 0;
  let canvasWidth = 1000;

  p.setup = function(){
    p.createCanvas(canvasWidth,100);
  };

  p.draw = function(){
    p.background(0)
    p.ellipse(x,p.height/2,20,20);

    x = x + 1;
    if (x > canvasWidth){
      x = 0;
    }
  }
}

let firstSketch = new p5(firstS, 'first')