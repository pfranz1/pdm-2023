const thirdS = (p) => {
    // let x = 0;
    let canvasWidth = 500;
    let canvasHeight = canvasWidth / 2;
    let padding = canvasWidth * 1 / 25;

    let circleRadius;
    
    // Pacman 
    let mouthOpenDeg = 90;
    let mouthMidPointRad = Math.PI;

    let increment = 0;
    let maxOpen = 90;
    let minOpen = 5;

    let pacManX;
    let pacManY;


    // Ghost
    let ghostX;
    let ghostY;

    let ghostEyeRadius;


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
      
      // Max radius and still fit with the other character - each can have all the height, and half the width
      let maxWidth = canvasWidth * 0.25;
      let maxHeight = canvasHeight * 0.5;
  
      // Store circle radius, ensuring that it fits
      circleRadius = Math.min(maxWidth,maxHeight) - padding;

      // Calculate and cache mid points of both characters
      pacManX = canvasWidth * 0.25;
      pacManY = canvasHeight * 0.5;

      ghostX = canvasWidth * 0.75;
      ghostY = canvasHeight * 0.5;
      
      // I feel bad making it multiply a float by float later to decide the iris
      // so here I do floor because I don't care about the precision loss
      ghostEyeRadius = Math.floor(circleRadius * 0.60);
    };
  
    p.draw = function(){
      // Update mouth opening
      mouthOpenDeg = doWakaWaka(mouthOpenDeg);

      p.background(0,0,0);
      
      // Pac-man
      p.push();
      p.fill(60,70,100,100);
      p.ellipse(pacManX,pacManY,circleRadius * 2,circleRadius * 2);

      // p.arc(canvasWidth * 0.25,canvasHeight * 0.5,circleRadius*2,0,PI,false)
      p.fill(0,0,0,100);

      // convert degrees to radians
      let openingRadians = convertDegToRadians(mouthOpenDeg);

      p.arc(pacManX, pacManY, circleRadius*2, circleRadius*2, mouthMidPointRad - openingRadians / 2,mouthMidPointRad + openingRadians / 2)

      p.pop();
      
      // Ghost
      p.push();
      p.fill(0,80,100,100);
      p.noStroke()


      // Rects are described from their top left corner
      // Hence subtracting circle radius to move to left corner
      p.rect(ghostX- circleRadius,ghostY,circleRadius* 2,circleRadius);

      p.arc(ghostX,canvasHeight * 0.5,circleRadius*2,circleRadius*2,Math.PI, 0);

      p.fill(0,0,100,1);


      p.ellipse(ghostX - circleRadius / 2, ghostY,ghostEyeRadius,ghostEyeRadius);

      p.ellipse(ghostX + circleRadius / 2, ghostY,ghostEyeRadius,ghostEyeRadius);

      p.fill(240,100,100,1);

      p.ellipse(ghostX - circleRadius / 2, ghostY,ghostEyeRadius*0.66,ghostEyeRadius*0.66);

      p.ellipse(ghostX + circleRadius / 2, ghostY,ghostEyeRadius*0.66,ghostEyeRadius*0.66);

      p.pop();
  
    }
  }
  
  let thirdSketch = new p5(thirdS, 'third')