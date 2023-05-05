class Storm{
    static fallingUpdateFreq = 1;
    static fallingStepSize = 5;
    static ranks = 5;
    static delayBetweenRanks = 75;

    constructor(maxNumDrops,pos, width,colliders){
        this.totalDrops = maxNumDrops;
        this.stormWidth = width;
        this.pos = pos;
        this.colliders = colliders;

        this.isRaining = false;

        this.drops = [];

        let dropOffset = this.stormWidth / Math.round(maxNumDrops / Storm.ranks);
        let variation = dropOffset / 2;
        let startX = this.pos.x - (this.stormWidth / 2);

        Raindrop.getStormPos = () =>{
            return this.pos;
        }

        for(let index = 0; index < this.totalDrops;index++){
            let newDrop = new Raindrop(new Position((((index % Storm.ranks) * dropOffset) - (this.stormWidth / 2)  + random(dropOffset)),0));
            newDrop.hiddenFrames = Math.floor(index / Storm.ranks) * Storm.delayBetweenRanks + random(-25,25);
            this.drops.push(newDrop);
        }
    }


    draw(){
        push();
        circle(this.pos.x, this.pos.y,50);
        // rect(100,100,250,250);
        pop();
        //&& frameCount % Storm.fallingUpdateFreq == 0
        if(this.isRaining ){
            this.drops.forEach((drop)=>{ 
                drop.updatePos(Storm.fallingStepSize);
                drop.checkCollisions(this.colliders);
            });
        } else {
            this.drops.forEach((drop)=>{ 
                // If a drop is still active I want it to continue to fall
                if(!drop.isHidden){
                    drop.updatePos(Storm.fallingStepSize);
                    drop.checkCollisions(this.colliders);
                }
            });
        }

        this.drops.forEach((drop)=> drop.draw());
    }

    toggleRain(){
        this.isRaining = !this.isRaining;
    }
}