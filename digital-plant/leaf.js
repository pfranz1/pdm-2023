class Leaf {
    constructor(spriteSheet, tileWidth, tileHeight, myHeight,myWidth,xPos,yPos, rotationStruct){
        this.spriteSheet = spriteSheet;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.height = myHeight;
        this.width = myWidth;
        this.xPos = xPos;
        this.yPos = yPos;

        this.xRot = rotationStruct.xRot;
        this.yRot = rotationStruct.yRot;
        this.zRot = rotationStruct.zRot;

    }

    draw(){
        push();

        // rotateX(this.xRot);

        // translate(500,20);
        translate(this.xPos,this.yPos);

        textSize(15);
        fill(0,0,0);
        // // let startX = this.width / 2 * -1;
        // text(this.xRot,-30,this.height / 2 * -1);
        // text(this.yRot,0,this.height / 2 * -1);
        // text(this.zRot ,30,this.height / 2 * -1);



        // rotateX(this.xRot);
        // rotateY(this.yRot);
        // rotateZ(this.zRot);

        rotate(this.zRot);
        shearX(this.xRot);
        shearY(this.yRot);


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
}