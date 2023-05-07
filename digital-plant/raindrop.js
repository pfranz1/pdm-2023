class Raindrop{
    static count = 0;

    static tileSize = 64;
    static size = 32;

    static outOfBounds = 3000;
    static drawFramesPerAnimationFrame = 2;
    static totalFrameCount = 9;

    static hitAngleMin = -140;
    static hitAngleMax = -40;

    // Assignmed in main bc need to use P5 to load image
    static spriteSheet;


    static getStormPos;

    // Position is relative to the storms middle i.e pos = (10,20) where rain pos should be 10 + stormX
    constructor(position, parentStorm){

        this.pos = position;
        this.collisionY = 1000 - (Raindrop.size / 2);
        this.isSplattered = false;
        this.currentFrame = 0;
        this.lastFrameChange = 0;
        // 90 = straight up and down
        this.zRot = 0;

        this.startingPos = new Position(position.x,position.y);

        this.hiddenFrames = 0;
        this.isHidden = true;

        this.id = Raindrop.count;
        Raindrop.count++;

        this.parentStorm = parentStorm;
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
                this.splatDrop(null);
            }
        }      

        if(this.pos.y > Raindrop.outOfBounds){
            this.resetDrop();
        }
    }

    checkCollisions(canidateColliders){
        if(this.isSplattered) return false;

        for(let index = 0; index < canidateColliders.length; index++){
            // let isWaterDropAboveCollider = Math.abs(this.pos.x - canidateColliders[index].pos.x) < Raindrop.size;
            if(canidateColliders[index].isAbove(this.pos.x) && canidateColliders[index].doCollsionCheck(this.pos,Raindrop.size)){
                let angleToHit = this.pos.calcAngleBetween(canidateColliders[index].pos);
                // console.log("Hit angle",angleToHit);
                // Not a hit on the bottom of a leaf
                if(angleToHit < 0){
                    if(angleToHit < Raindrop.hitAngleMax && angleToHit > Raindrop.hitAngleMin){
                        this.zRot = 90 + angleToHit;
                        this.splatDrop(canidateColliders[index]);
                        return true;
                    }

                } else {
                    // this.splatDrop();
                    // return true;
                }

            }
        }
    }

    checkPotCollsion(potHeight,potStartX,potEndX){
        if(!this.isSplattered && this.pos.y > potHeight && this.pos.x > potStartX && this.pos.x <= potEndX){
            console.log("Pot hit");
            this.splatDrop(null);
        }
    }

    splatDrop(colliderHit){
        this.isSplattered = true;
        this.lastFrameChange = frameCount;
        this.currentFrame++;

        if(colliderHit != null){
            // this will always be a plant for now so Im not bothering with type checking
            colliderHit.hydrate(0.25);
        }
    }

    resetDrop(){
        // // console.log("resetting drop");
        // let parentPos = Raindrop.getStormPos();
        // this.pos = new Position(this.startingPos.x + parentPos.x, this.startingPos.y + parentPos.y);
        // this.isSplattered = false;
        // this.currentFrame = 0;
        // this.zRot = 0;
        // this.isHidden = true;
        // this.hiddenFrames = random(0,50);

        this.parentStorm.removeDropWithId(this.id);
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