const secondS = (p) => {
    let x = 0;
    let canvasWidth, canvasHeight;
    canvasWidth = canvasHeight = 100;

    let overlap = 20;
  
    p.setup = function(){
      p.createCanvas(canvasWidth,canvasHeight);

      centerX = canvasHeight / 2;
      centerY = canvasWidth / 2;

      topCircleX = centerX;
      topCircleY = centerY 


    };
  
    p.draw = function(){
      p.background(0)
      p.ellipse(x,p.height/2,20,20);
  
      x = x + 2;
      if (x > canvasWidth){
        x = 0;
      }
    }
  }
  
  let secondSketch = new p5(secondS, 'second')