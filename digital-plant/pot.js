
class Pot{
    constructor(spriteSheet, size,  position){
        this.spriteSheet = spriteSheet;

        this.height = size;
        this.width = size * 1.5;
        this.pos = position;

        this.startX = this.pos.x - (this.width / 2);
        this.endX = this.pos.x + (this.width / 2);
        this.startY = this.pos.y - this.height + 150;
    }

    static tileSize = 128;

    draw(){

        push();

        translate(this.pos.x,this.pos.y);



        image(this.spriteSheet, 0,0,this.width,this.height,0,0,Pot.tileSize,Pot.tileSize);

        // rect(,0,this.width, this.height);

        pop();
    }

    doCollsionCheck(colliderPos,colliderSize){
        let isWithinPotBounds = colliderPos.x >= this.pos.x && colliderPos.x < this.pos.x + this.width;
        let isBellowPot = colliderPos.y >= this.pos.y - this.height;
        return isBellowPot && isWithinPotBounds;
    }

    isAbove(xPos){
        return true;
    }

    hydrate(){
        console.log("Hit pot");
    }
}