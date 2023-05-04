class Leaf {
    static maxHeight = 500;
    
    static maxAge = 2500;
    static matureAge = 500;

    static matureSize = 100;
    static startingSize = 50;

    //Defined in the startup method of main - need p5 to call color constructor
    static startColor;
    static endColor;
    static dehydrationColor;

    static tileSize = 256;
    static numOfFrames = 8;

    static tickUntilFrameChange = Leaf.maxAge / (Leaf.numOfFrames - 1);

    constructor(spriteSheet, size, stemAngle,stemLength){
        this.spriteSheet = spriteSheet;

        this.size = size;
        this.age = 0;
        this.percentMature = 0;
        this.pos = new Position(0,0);
        this.rot = new RotationStruct(0,0,0);

        this.stemLength = stemLength;
        this.stemAngle = stemAngle;
        this.hydration = 1.0;


        this.currentFrame = 0;
        this.frameChangeCounter = Leaf.tickUntilFrameChange;
    }

    static maxControlPointRaise = 0.5;
    static maxControlPointShift = 0.5;
    // static 

    drawStems(){
        push();

        
        noFill();
        // fill(123,41,39);
        strokeWeight(10);
        let strokeColor = lerpColor(Leaf.endColor, Leaf.startColor, this.percentMature + 0.25);
        strokeColor = lerpColor(Leaf.dehydrationColor,strokeColor, this.hydration + 0.25 );

        stroke(strokeColor);

        // ^4 distance between y values + distance between y vals
        // Creates a more pronounced droop for longer leaves, while also having the start of a droop for shorter leaves
        let yDistMult = ((this.root.y - this.pos.y) << 2) + ((this.root.y - this.pos.y));

        let startAnchor = new Position(this.root.x,this.root.y );
        let endAnchor = new Position( this.pos.x,this.pos.y);

        let dx = this.pos.x - this.root.x;
        let dy = this.pos.y - this.root.y;

        // Expermentation lead me to find this was the best mapping for making nice shape change
        // f(x) = 2x -1 , where x [0,1], f(x) in [-1,1]
        let hydrationParameter = 2 * this.hydration -1;

        let controlPointRaise = hydrationParameter * (dy * Leaf.maxControlPointRaise);
        let controlPointShift = hydrationParameter * (dx * Leaf.maxControlPointShift);

        let startControl = new Position(this.root.x + controlPointShift*2, this.root.y - (controlPointRaise>>2),);
        let endControl = new Position(this.pos.x - (controlPointShift / 2), this.pos.y - controlPointRaise + yDistMult);


        curve(startControl.x,startControl.y, startAnchor.x, startAnchor.y ,endAnchor.x,endAnchor.y,  endControl.x, endControl.y,);

        
        pop();
    }

    drawLeaves(){
        // this.hydration -= 0.01;
        // if(this.hydration < -2){
        //     this.hydration = 0.5;
        // }

        // text(Math.round(this.hydration * 10) / 10,25,150);

        push();

        translate(this.pos.x,this.pos.y);

        // textSize(15);
        fill(0,0,0);
        // // let startX = this.width / 2 * -1;
        // text(this.xRot,-30,this.height / 2 * -1);
        // text(this.yRot,0,this.height / 2 * -1);
        // text(this.zRot ,30,this.height / 2 * -1);

        rotate(this.rot.z);
        shearX(this.rot.x);
        shearY(this.rot.y);


        let offsetForFrame = this.currentFrame * Leaf.tileSize;
        tint(0, (1-this.hydration) * 10, 255, 1)
        image(this.spriteSheet,  0,0,this.size,this.size,offsetForFrame + 0,0,Leaf.tileSize,Leaf.tileSize);


        pop();

        // push();
        // translate(this.pos.x,this.pos.y);
        // circle(0,0,this.size);
        // pop();

    }

    draw(){

        this.drawStems();

        this.drawLeaves();
        
    }

    setRoot(rootPos){
        this.root = rootPos;
    }

    incAge(ticks){
        this.age += ticks;

        this.percentMature = Math.min(this.age / Leaf.matureAge, 1);

        this.size = (Leaf.matureSize - Leaf.startingSize) * this.percentMature + Leaf.startingSize;

        this.frameChangeCounter += ticks;

        while(this.frameChangeCounter > Leaf.tickUntilFrameChange){
            this.frameChangeCounter -= Leaf.tickUntilFrameChange;
            this.currentFrame++;
        }
    }

    elongateStem(growthAmmount){
        // linearly less growth the longer the stem gets longer

        if(this.stemAngle < Leaf.maxHeight){

            let ammount  = growthAmmount * (1 - (this.stemLength / Leaf.maxHeight));

            this.stemLength += Math.floor(ammount);

            this.updatePositionAndTilt();
        }


    }


    rotateBasedOnAngleToRoot(angle){
        let yRot = angle * 0.65 * -1;
        let xRot = angle * (2/6);
        return new RotationStruct(xRot,yRot,angle);
    }


    updateRotation(){
        this.rot = this.rotateBasedOnAngleToRoot(-(this.root.calcAngleBetween(this.pos) - 90));
    }


    maxAngle = 140;
    minAngle = 40;

    updatePositionAndTilt(){
        if(this.stemAngle > this.maxAngle){
            this.stemAngle = this.maxAngle;
        } else if(this.stemAngle < this.minAngle) {
            this.stemAngle = this.minAngle;            
        }


        this.pos.y = this.root.y - this.stemLength * Math.sin(this.stemAngle * 0.0174);
        this.pos.x = this.root.x - this.stemLength * Math.cos(this.stemAngle * 0.0174);

        this.updateRotation();
    }
}