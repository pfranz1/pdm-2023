
class Pot{
    constructor(spriteSheet, size,  position){
        this.spriteSheet = spriteSheet;

        this.height = size;
        this.width = size;
        this.pos = position;
    }

    static tileSize = 128;

    draw(){

        push();

        translate(this.pos.x,this.pos.y);


        image(this.spriteSheet, 0,0,this.width,this.height,0,0,Pot.tileSize,Pot.tileSize);


        pop();
    }
}