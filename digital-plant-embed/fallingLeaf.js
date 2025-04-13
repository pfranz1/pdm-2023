class FallingLeaf {


    static tileSize = 256;

    static killPlaneHeight = 1000;

    static oscilationPeriod = 5;


    constructor(spriteSheet, size, startPos, startRot, frame, hydration,){
        this.spriteSheet = spriteSheet;

        this.size = size;
        this.age = 0;
        this.pos = startPos;
        this.rot = startRot;

        this.hydration = hydration;

        this.currentFrame = frame;

        this.swapper = 1;
        this.swapCounter = FallingLeaf.oscilationPeriod;
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
        // tint(0, (1-this.hydration) * 20, 255, 1)
        image(this.spriteSheet,  0,0,this.size,this.size,offsetForFrame + 0,0,Leaf.tileSize,Leaf.tileSize);


        pop();

        // push();
        // translate(this.pos.x,this.pos.y);
        // circle(0,0,this.size);
        // pop();

    }

    doGravityTick(tickSize){
        this.pos.y += tickSize;
        // this.parameter += 0.5;

        this.pos.x = this.pos.x + this.swapper;

        this.swapCounter -= 1;
        if(this.swapCounter <= 0){
            this.swapper = this.swapper * -1;
            this.swapCounter = FallingLeaf.oscilationPeriod;
        }



    }

    draw(){

        this.drawLeaves();
        
    }
}