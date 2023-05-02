class Raindrop{

    static tileSize = 64;
    static size = 32;

    static outOfBounds = 3000;
    static drawFramesPerAnimationFrame = 2;
    static totalFrameCount = 9;

    constructor(position, spriteSheet){
        this.pos = position;
        this.spriteSheet = spriteSheet;
        this.collisionY = 1000 - (Raindrop.size / 2);
        this.isSplattered = false;
        this.currentFrame = 0;
        this.lastFrameChange = 0;
    }

    updatePos(yInc){
        if(this.isSplattered){
            // no op, stay in same position to allow animation to continue
        } else {
            this.pos.y += yInc;
            if(this.pos.y >= this.collisionY){
                this.isSplattered = true;
                this.lastFrameChange = frameCount;
                this.currentFrame++;
            }
        }

        if(this.pos.y > Raindrop.outOfBounds){
            this.resetDrop();
        }
    }

    resetDrop(){
        this.pos.y = -50;
        this.isSplattered = false;
        this.currentFrame = 0;
    }

    draw(){
        if(this.isSplattered && (frameCount - this.lastFrameChange) >= Raindrop.drawFramesPerAnimationFrame ){
            this.currentFrame++;
            if(this.currentFrame >= Raindrop.totalFrameCount){
                this.resetDrop();
            }
            else {
                this.lastFrameChange = frameCount;
            }
        }
        
        push();

        translate(this.pos.x,this.pos.y);


        let offsetForFrame = this.currentFrame * Raindrop.tileSize;
        
        image(this.spriteSheet,  0,0,Raindrop.size,Raindrop.size,offsetForFrame + 0,0,Raindrop.tileSize,Raindrop.tileSize);

        
        pop();
    }
}