class Raindrop{

    static tileSize = 64;
    static size = 32;

    static outOfBounds = 3000;

    constructor(position, spriteSheet){
        this.pos = position;
        this.spriteSheet = spriteSheet;
    }

    updatePos(yInc){
        this.pos.y += yInc;

        if(this.pos.y > Raindrop.outOfBounds){
            this.pos.y = -50;
        }
    }

    draw(){ 
        push();

        translate(this.pos.x,this.pos.y);


        let offsetForFrame = this.currentFrame * Leaf.tileSize;
        image(this.spriteSheet,  0,0,Raindrop.size,Raindrop.size,offsetForFrame + 0,0,Raindrop.tileSize,Raindrop.tileSize);

        
        pop();
    }
}