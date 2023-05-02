class Raindrop{

    static tileSize = 64;
    static size = 32;

    static outOfBounds = 3000;
    static drawFramesPerAnimationFrame = 2;
    static totalFrameCount = 9;

    static hitAngleMin = -140;
    static hitAngleMax = -40;

    // Assignmed in main bc need to use P5 to load image
    static spriteSheet;

    constructor(position, spriteSheet){
        this.pos = position;
        this.spriteSheet = spriteSheet;
        this.collisionY = 1000 - (Raindrop.size / 2);
        this.isSplattered = false;
        this.currentFrame = 0;
        this.lastFrameChange = 0;
        // 90 = straight up and down
        this.zRot = 0;

        this.startingPos = new Position(position.x,position.y);

        this.hiddenFrames = 0;
        this.isHidden = true;
    }

    updatePos(yInc){
        if(this.isHidden){
            this.hiddenFrames--;
            if(this.hiddenFrames <= 0){
                this.isHidden = false;
            }
            return false;
        }

        if(!this.isSplattered){
            this.pos.y += yInc;
            if(this.pos.y >= this.collisionY){
                this.splatDrop();
            }
        }      

        if(this.pos.y > Raindrop.outOfBounds){
            this.resetDrop();
        }
    }

    checkCollisions(canidateColliders){
        if(this.isSplattered) return false;

        for(let index = 0; index < canidateColliders.length; index++){
            if(this.pos.distToOtherPos(canidateColliders[index].pos) <= (canidateColliders[index].size - (Raindrop.size))){
                let angleToHit = this.pos.calcAngleBetween(canidateColliders[index].pos);
                console.log("Hit angle",angleToHit);
                // Not a hit on the bottom of a leaf
                if(angleToHit < 0){
                    if(angleToHit < Raindrop.hitAngleMax && angleToHit > Raindrop.hitAngleMin){
                        this.zRot = 90 + angleToHit;
                        this.splatDrop();
                        return true;
                    }

                } else {
                    // this.splatDrop();
                    // return true;
                }

            }
        }
    }

    splatDrop(){
        this.isSplattered = true;
        this.lastFrameChange = frameCount;
        this.currentFrame++;
    }

    resetDrop(){
        console.log("resetting drop");
        this.pos.y = this.startingPos.y;
        this.pos.x = this.startingPos.x;
        this.isSplattered = false;
        this.currentFrame = 0;
        this.zRot = 0;
        this.isHidden = true;
        this.hiddenFrames = random(50,250);
    }

    draw(){
        if(this.isHidden) return false;

        if(this.isSplattered && (frameCount - this.lastFrameChange) >= Raindrop.drawFramesPerAnimationFrame ){
            this.currentFrame++;
            if(this.currentFrame >= Raindrop.totalFrameCount){
                this.resetDrop();
                return true;
            }
            else {
                this.lastFrameChange = frameCount;
            }
        }
        
        push();

        translate(this.pos.x,this.pos.y);
        rotate(this.zRot);


        let offsetForFrame = this.currentFrame * Raindrop.tileSize;
        
        image(Raindrop.spriteSheet,  0,0,Raindrop.size,Raindrop.size,offsetForFrame + 0,0,Raindrop.tileSize,Raindrop.tileSize);

        // circle(0,0, Raindrop.size);
        
        pop();
    }
}