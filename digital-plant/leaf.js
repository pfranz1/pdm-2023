class Leaf {
    static maxHeight = 500;

    constructor(spriteSheet, tileWidth, tileHeight, myHeight,myWidth,stemLength, stemAngle, position, rotationStruct){
        this.spriteSheet = spriteSheet;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.height = myHeight;
        this.width = myWidth;
        this.pos = position;

        this.rot = rotationStruct;

        this.stemLength = stemLength;
        this.stemAngle = stemAngle;

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
        stroke(123,41,39);

        // ^4 distance between y values + distance between y vals
        // Creates a more pronounced droop for longer leaves, while also having the start of a droop for shorter leaves
        let yDistMult = ((this.root.y - this.pos.y) << 2) + ((this.root.y - this.pos.y));

        curve(this.root.x + ((this.pos.x - this.root.x) / 2),this.root.y - epsilon, this.root.x, this.root.y , this.pos.x,this.pos.y,  this.pos.x + ((this.root.x - this.pos.x) / 2), this.pos.y + yDistMult,);

        
        pop();
    }

    drawLeaves(){

        push();

        // rotateX(this.xRot);

        // translate(500,20);
        translate(this.pos.x,this.pos.y);

        textSize(15);
        fill(0,0,0);
        // // let startX = this.width / 2 * -1;
        // text(this.xRot,-30,this.height / 2 * -1);
        // text(this.yRot,0,this.height / 2 * -1);
        // text(this.zRot ,30,this.height / 2 * -1);



        // rotateX(this.xRot);
        // rotateY(this.yRot);
        // rotateZ(this.zRot);

        rotate(this.rot.z);
        shearX(this.rot.x);
        shearY(this.rot.y);


        image(this.spriteSheet, 0,0,this.width,this.height,0,0,this.tileWidth,this.tileHeight);

        // rotateX(this.xRot);
        // rotateY(this.yRot);
        // rotateZ(this.zRot);


        // translate(this.xPos,this.yPos);

        // // square(this.xPos - this.width / 2,this.yPos, this.height);

        // translate(0, (this.height / 2) * 0.90);

        // // console.log(this.xRot, this.yRot,this.zRot);

        pop();

    }

    draw(){

        this.drawStems();

        this.drawLeaves();
        
    }

    setRoot(rootPos){
        this.root = rootPos;
    }

    elongateStem(growthAmmount){
        // linearly less growth the longer the stem gets longer

        if(this.height < Leaf.maxHeight){

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