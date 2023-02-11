class Ripple{

    constructor(xPos,yPos, startRadius,endRadius, timeToLive){
        this.xPos = xPos;
        this.yPos = yPos;
        this.startRadius = startRadius;
        this.endRadius = endRadius;
        this.timeToLive = timeToLive;
        this.life = timeToLive;

    
    }

    

    draw(){
        if(this.life < 0) return;

        this.life -= 1;
        print(this.life);
        print(this.timeToLive);

        push();
        //TODO: Put into some function to turn into non-linear curve
        let driverValue = (this.life / this.timeToLive)**4;
        print("driverVal",driverValue);



        let radius = (1 - driverValue) * this.endRadius + this.startRadius * driverValue;

        stroke(0,0,0,0);

        // Outer Rings
        fill(color(200,60,100));

        // print("radius",radius);
        ellipse(this.xPos,this.yPos, radius, radius);

        fill(color(200,80,100));

        ellipse(this.xPos,this.yPos, radius - 10, radius- 10);

        // Trailing rings

        fill(color(200,60,100));
;
        ellipse(this.xPos,this.yPos, max(20,radius - 25 - (radius * driverValue)));

        fill(color(200,80,100));

        ellipse(this.xPos,this.yPos, max(radius - 35 -  (radius * driverValue), 20));


        // // Central dot

        let rippleColor = color(200,50,50);
        rippleColor.setAlpha(driverValue -0.2)
        
        fill(rippleColor);

        ellipse(this.xPos,this.yPos, radius - (radius * driverValue));



        // ellipse(100,100,100,100);
        pop();
    };
}