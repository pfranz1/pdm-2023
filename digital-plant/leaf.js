class Leaf {
    static maxHeight = 500;
    
    static maxAge = 2500;
    static matureAge = 500;

    static matureSize = 100;
    static startingSize = 50;

    //Defined in the startup method of main - need p5 to call color constructor
    static startColor;
    static endColor;

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

        this.currentFrame = 0;
        this.frameChangeCounter = Leaf.tickUntilFrameChange;
    }


    drawStems(){
        push();

        
        let controlPointOffset = 10;
        // curve(this.pos.x + controlPointOffset, this.pos.y + controlPointOffset, this.pos.x,this.pos.y, element.pos.x, element.pos.y, element.pos.x+ controlPointOffset, element.pos.y+ controlPointOffset);
        // curve (this.root.x, this.root.y,this.pos.x, (this.pos.y - this.root.y) / 2,this.root.x,(this.pos.y + this.root.y) / 2,this.pos.x,this.pos.y);

        let epsilon = 250;
        // curve(this.root.x, this.root.y, this.root.x + ((this.pos.x - this.root.x) / 2),this.root.y, this.pos.x + ((this.root.x - this.pos.x) / 2), this.pos.y, this.pos.x,this.pos.y);
        

        noFill();
        // fill(123,41,39);
        strokeWeight(10);
        let strokeColor = lerpColor(Leaf.endColor, Leaf.startColor, this.percentMature + 0.25);

        stroke(strokeColor);

        // ^4 distance between y values + distance between y vals
        // Creates a more pronounced droop for longer leaves, while also having the start of a droop for shorter leaves
        let yDistMult = ((this.root.y - this.pos.y) << 2) + ((this.root.y - this.pos.y));

        curve(this.root.x + ((this.pos.x - this.root.x) / 2),this.root.y - epsilon, this.root.x, this.root.y , this.pos.x,this.pos.y,  this.pos.x + ((this.root.x - this.pos.x) / 2), this.pos.y + yDistMult,);

        
        pop();
    }

    drawLeaves(){

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