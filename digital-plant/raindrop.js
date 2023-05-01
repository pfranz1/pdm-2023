class Raindrop{

    static tileSize = 64;
    static size = 32;

    constructor(position, spriteSheet){
        this.pos = position;
        this.spriteSheet = spriteSheet;
    }

    draw(){ 
        
        this.pos.y += 10;

        if(this.pos.y > 2500){
            this.pos.y = 0;
        }

        push();

        translate(this.pos.x,this.pos.y);


        let offsetForFrame = this.currentFrame * Leaf.tileSize;
        image(this.spriteSheet,  0,0,Raindrop.size,Raindrop.size,offsetForFrame + 0,0,Raindrop.tileSize,Raindrop.tileSize);

        
        pop();
    }
}