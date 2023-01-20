const thirdS = (p) => {
    // let x = 0;
    let canvasWidth = 500;
    let canvasHeight = canvasWidth / 2;
    let padding = canvasWidth * 1 / 25;
  
    let circleRadius;
    let mouthOpenDeg = 90;
    let mouthMidPointRad = Math.PI;

    let increment = 0;
    let maxOpen = 90;
    let minOpen = 5;


    function convertDegToRadians(deg){
      return deg * Math.PI / 180;
    }

    function doWakaWaka(currentOpeningDeg){
      if(currentOpeningDeg >= maxOpen || currentOpeningDeg <= minOpen){
        increment = increment * -1;
      }
      return currentOpeningDeg + increment;
    }
    
    p.setup = function(){
      p.createCanvas(canvasWidth,canvasHeight);
      p.colorMode('hsb')
      
      let maxWidth = canvasWidth * 0.25;
      let maxHeight = canvasHeight * 0.5;
  
      // Store circle radius, ensuring that it fits
      circleRadius = Math.min(maxWidth,maxHeight) - padding;
    };
  
    p.draw = function(){
      // Update mouth opening
      mouthOpenDeg = doWakaWaka(mouthOpenDeg);

      p.background(0,0,0);
      
      // Pac-man
      p.push();
      p.fill(60,70,100,100);
      p.ellipse(canvasWidth * 0.25,canvasHeight * 0.5,circleRadius * 2,circleRadius * 2);

      // p.arc(canvasWidth * 0.25,canvasHeight * 0.5,circleRadius*2,0,PI,false)
      p.fill(0,0,0,100);

      // convert degrees to radians
      let openingRadians = convertDegToRadians(mouthOpenDeg);

      p.arc(canvasWidth * 0.25, canvasHeight * 0.5, circleRadius*2, circleRadius*2, mouthMidPointRad - openingRadians / 2,mouthMidPointRad + openingRadians / 2)

      p.pop();
      
      // Ghost
      p.push();
      p.fill(0,80,100,100);
      p.noStroke()


      p.rect(canvasWidth*0.75 - circleRadius,canvasHeight / 2,circleRadius* 2,circleRadius);

      p.arc(canvasWidth*0.75,canvasHeight * 0.5,circleRadius*2,circleRadius*2,Math.PI, 0);

      p.pop();
  
    }
  }
  
  let thirdSketch = new p5(thirdS, 'third')