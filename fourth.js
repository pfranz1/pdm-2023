const fourthS = (p) => {
    // let x = 0;
    let canvasWidth = 500;
    let canvasHeight = 500;
    let padding = canvasWidth * 1 / 25;

    let centerX;
    let centerY;
  
    let circleDiameter;
    let strokeWeight;

    let starArms = 5;
    let innerStarRadius;
    let outerStarRadius;
    let topPointAngle = Math.PI / 2;

    
    p.setup = function(){
      p.createCanvas(canvasWidth,canvasHeight);
      p.colorMode('hsb');
      
      centerX = canvasWidth / 2;
      centerY = canvasHeight / 2;
    
      circleDiameter = Math.max(canvasWidth,canvasHeight) * 0.66;
      strokeWeight = Math.floor(circleDiameter * 0.025);
      
      outerStarRadius = circleDiameter / 2;
      innerStarRadius = outerStarRadius * 0.40;
    };
  
    p.draw = function(){
    
    // Animation :D
    //   starArms = starArms + 0.005;
    //   if (starArms > 16){
    //     starArms = 5;
    //   }

    //   topPointAngle = topPointAngle + (Math.PI / 180)

      p.background(240,100,40,100);
      
      p.stroke(0,0,100,100);
      p.strokeWeight(strokeWeight)

      p.fill(120,100,50,100)

      p.ellipse(canvasWidth * 0.5,canvasHeight * 0.5,circleDiameter,circleDiameter);
      
      p.fill(0,90,100,100)
      
      // Draw star
      var angle = (Math.PI + Math.PI) / (Math.floor(starArms) * 2);
      let isMajor = false;
      p.beginShape();
      for (let a = topPointAngle; a < (Math.PI + Math.PI) + topPointAngle; a += angle) {
        let radius = (isMajor ? outerStarRadius : innerStarRadius);
        let sx = centerX + Math.cos(a) * radius;
        let sy = centerY + Math.sin(a) * radius;

        p.vertex(sx, sy);

        isMajor = !isMajor;
      }
      p.endShape("close")
  
    }
  }
  
  let fourthSketch = new p5(fourthS, 'fourth')