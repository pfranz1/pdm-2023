const secondS = (p) => {
    // let canvasWidth, canvasHeight;
    let canvasWidth = 500;
    let canvasHeight = 250;

    let padding = 10;

    let overlap = 12;

    let radius;
  
    p.setup = function(){
      p.createCanvas(canvasWidth,canvasHeight);
      p.colorMode("hsb")

      centerX = canvasWidth / 2;
      centerY = canvasHeight / 2;

      radius = ((Math.min(canvasHeight,canvasWidth) / 2 - padding) / 2);

      topCircleX = centerX;
      topCircleY = centerY - (radius-overlap);

      leftCircleX = centerX - ((radius-overlap) * Math.cos(Math.PI / 6));
      leftCircleY = centerY + ((radius-overlap) * Math.sin(Math.PI / 6));
        
    
      rightCircleX = centerX + ((radius-overlap) * Math.cos(Math.PI / 6));
      rightCircleY = centerY + ((radius-overlap) * Math.sin(Math.PI / 6));

      radius = radius + overlap / 2
    };
  
    p.draw = function(){
        p.background(255);
        p.strokeWeight(0);

        p.fill(0,755,100,0.5);
        p.ellipse(topCircleX,topCircleY,radius*2,radius*2);

        p.fill(250,75,100,0.5);
        p.ellipse(leftCircleX,leftCircleY,radius*2,radius*2);

        p.fill(120,75,100,0.5);
        p.ellipse(rightCircleX,rightCircleY,radius*2,radius*2);

        // p.ellipse(centerX,centerY,5,5)
    }
  }
  
  let secondSketch = new p5(secondS, 'second')