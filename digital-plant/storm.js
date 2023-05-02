class Storm{
    static fallingUpdateFreq = 1;
    static fallingStepSize = 5;

    constructor(maxNumDrops,pos, width,colliders){
        this.totalDrops = maxNumDrops;
        this.stormWidth = width;
        this.pos = pos;
        this.colliders = colliders;

        this.isRaining = false;

        this.drops = [];

        let dropOffset = width / maxNumDrops;
        let startX = pos.x - (width / 2);
        for(let index = 0; index < this.totalDrops;index++){
             this.drops.push(new Raindrop(new Position(startX + (index * dropOffset),this.pos.y)));
        }
    }


    draw(){
        //&& frameCount % Storm.fallingUpdateFreq == 0
        if(this.isRaining ){
            this.drops.forEach((drop)=>{ 
                drop.updatePos(Storm.fallingStepSize);
                drop.checkCollisions(this.colliders);
            });
        }

        this.drops.forEach((drop)=> drop.draw());
    }

    toggleRain(){
        this.isRaining = !this.isRaining;
    }
}