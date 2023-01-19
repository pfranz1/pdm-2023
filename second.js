const secondS = (p) => {
    let x = 0;
    let canvasWidth = 1000;
  
    p.setup = function(){
      p.createCanvas(canvasWidth,100);
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