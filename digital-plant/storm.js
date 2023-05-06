class Storm{
    static fallingUpdateFreq = 1;
    static fallingStepSize = 5;
    static ranks = 8;

    constructor(maxNumDrops,pos, width,colliders, canvasHeight){
        this.totalDrops = maxNumDrops;
        this.stormWidth = width;
        this.pos = pos;
        this.colliders = colliders;

        this.isRaining = false;

        this.drops = [];

        let dropsPerRank = Math.floor(this.totalDrops / Storm.ranks);
        let dropOffset = this.stormWidth / (dropsPerRank - 1);

        let dropXVariation = (dropOffset / 2) - Raindrop.size;
        // let dropXVariation = 0;

        let seperationBetweenRanks = canvasHeight / Storm.ranks;
        let delayBetweenRanks = seperationBetweenRanks / Storm.fallingStepSize;
        //Math.ceil(Raindrop.size / Storm.fallingStepSize)
        let hiddenFramesVarriation = delayBetweenRanks / 4;


        Raindrop.getStormPos = () =>{
            return this.pos;
        }

        for(let index = 0; index < this.totalDrops;index++){
            let indexInRank = index % dropsPerRank;
            let rankIndex = Math.floor(index / dropsPerRank);

            let newDrop = new Raindrop(new Position(((indexInRank * dropOffset) - (this.stormWidth / 2) + random(-dropXVariation,dropXVariation)),0));
            newDrop.hiddenFrames = (rankIndex * delayBetweenRanks + random(0,hiddenFramesVarriation));
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