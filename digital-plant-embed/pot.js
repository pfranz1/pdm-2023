
class Pot{
    
    static tileHeight = 694;
    static tileWidth = 1024;


    constructor(spriteSheet,backSpriteSheet, height, width,  position){
        this.spriteSheet = spriteSheet;
        this.backSpriteSheet = backSpriteSheet;
        

        this.height = height;
        this.width = width;

        this.pos = position;
        this.startY = this.pos.y - this.height / 2;
        this.startX = this.pos.x - (this.width / 2);
        this.endX = this.pos.x + (this.width / 2);
    }

    draw(){

        push();
        
        translate(this.pos.x,this.pos.y);

        image(this.spriteSheet,0,0,this.width,this.height,0,0,Pot.tileWidth,Pot.tileHeight);
        // rect(0 - 128 / 2, 0 - Pot.tileHeight / 2,this.width, this.height);


        // rect(,0,this.width, this.height);

        pop();
    }

    drawBack(){
        push();
        
        translate(this.pos.x,this.pos.y);

        image(this.backSpriteSheet,0,0,this.width,this.height,0,0,Pot.tileWidth,Pot.tileHeight);

        pop();
    }


    move(xChange, yChange){
        this.pos.x += xChange;
        this.pos.y += yChange;

        this.startY += yChange;
        this.startX += xChange;
        this.endX += xChange
    }

    doCollsionCheck(colliderPos,colliderSize){
        let isWithinPotBounds = colliderPos.x >= this.startX && colliderPos.x < this.endX;

        let isBelowPot = colliderPos.y + (colliderSize / 2) >= this.startY;

        if(isBelowPot && isWithinPotBounds){
            console.log(this.height);
        }
        return isBelowPot && isWithinPotBounds;
    }

    isAbove(xPos){
        return true;
    }

    setOnHydrate(func){
        this.onHydrate = func;
    }

    hydrate(waterAmmount){
        this.onHydrate(waterAmmount);
    }
}