class Storm{
    static fallingUpdateFreq = 1;
    static fallingStepSize = 5;
    static ranks = 8;

    static dropFreq = 25;

    constructor(maxNumDrops,pos, width,colliders,potCollider, canvasHeight){
        this.totalDrops = maxNumDrops;
        this.stormWidth = width;
        this.pos = pos;
        this.colliders = colliders;
        this.potCollider = potCollider;

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

        // for(let index = 0; index < this.totalDrops;index++){
        //     let indexInRank = index % dropsPerRank;
        //     let rankIndex = Math.floor(index / dropsPerRank);

        //     let newDrop = new Raindrop( new Position(((indexInRank * dropOffset) - (this.stormWidth / 2) + random(-dropXVariation,dropXVariation)),0), this.removeDropWithId,  this);
        //     newDrop.hiddenFrames = (rankIndex * delayBetweenRanks + random(0,hiddenFramesVarriation));
        //     this.drops.push(newDrop);
        // }
    }

    removeDropWithId(id){
        this.drops.filter(
            (value, index, arr)=>{
                if(value.id == id){
                    arr.splice(index,1);
                    return true;
                }
                return false;
            }
        );
    }

    draw(){
        if(this.isRaining && frameCount % Storm.dropFreq == 0){
            this.drops.push(new Raindrop(new Position(this.pos.x + random(-this.stormWidth / 2,this.stormWidth / 2),this.pos.y),this));
        }

        push();
        circle(this.pos.x, this.pos.y,50);
        // rect(100,100,250,250);
        pop();

        this.drops.forEach((drop)=>{ 
            drop.updatePos(Storm.fallingStepSize);
            drop.checkCollisions(this.colliders);
            drop.checkPotCollsion(this.potCollider);   
        });
        
        //&& frameCount % Storm.fallingUpdateFreq == 0
        // if(this.isRaining ){
        //     this.drops.forEach((drop)=>{ 
        //         drop.updatePos(Storm.fallingStepSize);
        //         drop.checkCollisions(this.colliders);
        //     });
        // } else {
        //     this.drops.forEach((drop)=>{ 
        //         // If a drop is still active I want it to continue to fall
        //         if(!drop.isHidden){
        //             drop.updatePos(Storm.fallingStepSize);
        //             drop.checkCollisions(this.colliders);
                    // drop.checkPotCollsion(this.potCollider.startY,this.potCollider.startX,this.potCollider.endX);   
        //         }
        //     });
        // }

        this.drops.forEach((drop)=> drop.draw());
    }

    toggleRain(){
        this.isRaining = !this.isRaining;
    }
}