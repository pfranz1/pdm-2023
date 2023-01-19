const firstS = (p) => {
  // let x = 0;
  let canvasWidth = 500;
  let canvasHeight = canvasWidth / 2;
  let padding = canvasWidth * 1 / 25;

  let circleRadius;
  
  p.setup = function(){
    p.createCanvas(canvasWidth,canvasHeight);
    
    let maxWidth = canvasWidth * 0.25;
    let maxHeight = canvasHeight * 0.5;

    // Store circle radius, ensuring that it fits
    circleRadius = Math.min(maxWidth,maxHeight) - padding;
  };

  p.draw = function(){
    p.background(0,255,0);

    p.ellipse(canvasWidth * 0.25,canvasHeight * 0.5,circleRadius * 2,circleRadius * 2);
    p.rect(canvasWidth*0.75 - circleRadius, padding,circleRadius*2,circleRadius * 2);

  }
}

let firstSketch = new p5(firstS, 'first')