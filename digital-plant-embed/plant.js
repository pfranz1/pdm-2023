const leafSize = 75;

class Plant{
    // Ticks until a new leaf is spawned
    static newLeafSpawnFrequency = 20;
    static shareEfficiency = 0.25;
    static sharedHydration = 5.0;
    static maxHydration = 20;


    constructor(numLeaves,pos, pot){
        this.numLeaves = numLeaves;

        this.pos = pos;
        this.pot = pot;


        this.pot.setOnHydrate(this.hydratePlant);

        this.leaves = [];
        this.fallingLeaves = [];

        this.newLeafSpawnCounter = 0;

        this.averageHydration = 1.0;


        for(let index = 0; index < numLeaves; index++){

            // randomSeed(30);
            let newLeaf =  new Leaf(leafSprite,leafSize, (index) * random(10,50), index * 10 + random(100,150), this.hydratePlant);
            newLeaf.setRoot(this.pos);
            this.leaves.push(newLeaf);

            newLeaf.updatePositionAndTilt();
            newLeaf.incAge((newLeaf.stemLength / Leaf.maxHeight) * Leaf.maxHeight);
        }

        this.seperateLeaves(this.leaves);

        this.sortLeavesTallestToShortest(this.leaves);

        this.leaves.forEach((leaf)=>{
            leaf.updateRotation(-1 * (this.calcAngleToPos(leaf.pos) - 90));
        });
    }

    move(xChange, yChange){
        
        console.log("moving y by:", yChange);

        this.pos.x += xChange;
        this.pos.y += yChange;

        // this.leaves.forEach((leaf) =>{
        //     leaf.root.x += xChange;
        //     leaf.root.y += yChange;
        // });
    }

    

    onTap(mousePos){
        let tapTargetFound = false;
        let index = 0; 
        while(!tapTargetFound && index < this.leaves.length){
            tapTargetFound = this.leaves[index].doSnipCheck(mousePos);
            if(!tapTargetFound){
                index++;
            }
        }

        if(tapTargetFound){
            // console.log("removing index", index--);
            this.cullLeaf(index);
        }
    }

    calcAngleToPos(pos){
        let result = Math.atan2(this.pos.y- pos.y, this.pos.x- pos.x) * 180 / Math.PI;
        // console.log(result);
        return result;
    }

    // Have to use static variable because this. will reference the calling object and not the plant object that provided the lambda
    hydratePlant(hydrationToShare){
        Plant.sharedHydration = Plant.sharedHydration + hydrationToShare * Plant.shareEfficiency;
        // console.log("Plant hydration = ", Plant.sharedHydration);
    }


    seperateLeaves(leafList){
        let conflictsRemain = true;
        let isFirstLoop = true;

        let threashHold = leafSize + 10;
        let stepSize = 5;


        // console.log("seperating positions");

        while(isFirstLoop || conflictsRemain && threashHold > 1){
            // console.log("Threahold: ", threashHold);
            isFirstLoop = false;
            conflictsRemain = false;            
            for(let index = 0; index < leafList.length; index++){
                for(let itter = index + 1; itter < leafList.length; itter++){
                    // console.log("distance between", index, itter, leafList[index].pos.distToOtherPos(leafList[itter].pos));

                    if(leafList[index].pos.distToOtherPos(leafList[itter].pos) < threashHold){
                        // The points must be seperated
                        // console.log("Seperating leaves");

                        conflictsRemain = true;
                        let lowerLeaf = leafList[index].pos.y > leafList[itter].pos.y ? leafList[index] : leafList[itter];
                        let higherLeaf = leafList[index].pos.y <= leafList[itter].pos.y ? leafList[index] : leafList[itter];

                        let angleBetween = lowerLeaf.pos.calcAngleBetween(higherLeaf.pos);



                        // The lower leaf is left of the higher leaf
                        if(angleBetween <= 90){
                            // console.log("too the left");
                            lowerLeaf.stemAngle = lowerLeaf.stemAngle + stepSize;
                            higherLeaf.stemAngle = higherLeaf.stemAngle - stepSize;
                        } else {
                            lowerLeaf.stemAngle = lowerLeaf.stemAngle - stepSize;
                            higherLeaf.stemAngle = higherLeaf.stemAngle + stepSize;
                        }
                        
                        // // If lower pos is furthan to the root than the step size
                        // if(this.pos.y - lowerLeaf.y > leafSize){
                        //     // lowerLeaf.pos.movePosByAngle(180 - angleBetween,stepSize);

                        //     lowerLeaf.stemAngle = stepSize * lowerGoClockWise;


                        // }

                        // // higherLeaf.pos.movePosByAngle(angleBetween,stepSize * -1);
                        // higherLeaf.stemAngle = stepSize * lowerGoClockWise * -1;
                        lowerLeaf.updatePositionAndTilt();
                        higherLeaf.updatePositionAndTilt();
                        
                    }
                }
            }
            threashHold = threashHold * 0.95;
            stepSize = stepSize * 1.25;
        }
    }

    sortLeavesTallestToShortest(leafList){
        leafList.sort((a,b)=>{
            return a.pos.y - b.pos.y;
        });
    }

    static growStepSize = 5;
    static maxGrowingTilt = 1;

    doGravityTick(){
        if(this.fallingLeaves.length < 1){
            return false
        }

        // console.log("<<< gravity >>>");

        this.fallingLeaves.forEach((element,index)=>{
            element.doGravityTick(4);
            if(element.pos.y > FallingLeaf.killPlaneHeight){
                // console.log("falling leaf hit kill plane");
                this.fallingLeaves.splice(index,1);
            }
        });

    }

    doGrowTick(){
        // console.log("growing...");
        //TODO: Dont call sort every itteration
        this.sortLeavesTallestToShortest(this.leaves);

        let index = this.leaves.length - 1;
        while(Plant.sharedHydration > 0.5 && index >= 0){
            let currentLeaf = this.leaves[index];
            let ammountRequested = 1 - currentLeaf.hydration;
            // Only want to give water to leaves that need it most
            if(ammountRequested > 0.25){
                // Will create some water if requested is more than what the plant has
                // But that isnt big deal / game breaking
                Plant.sharedHydration -= ammountRequested;
                this.leaves[index].hydrate(ammountRequested);
            }
            index--;
        }

        this.newLeafSpawnCounter++;
        if(this.newLeafSpawnCounter > Plant.newLeafSpawnFrequency){
            this.newLeafSpawnCounter = 0;
            this.trySpawnNewLeaf();
        }


        this.leaves.forEach((leaf, index)=>{
            leaf.incAge(10);

            let canGrowUp = true;

            // For every other leaf that is higher than this leaf (list is sorted from high to low)
            for(let itter = 0; itter < index; itter++){
                if(leaf.pos.distToOtherPos(this.leaves[itter].pos) < leafSize + 25){
                    canGrowUp = false;
                    
                    let angleBetween = leaf.pos.calcAngleBetween(this.leaves[itter].pos);


                    // The lower leaf is left of the higher leaf
                    if(angleBetween <= 90){
                        // console.log("too the left");
                        leaf.stemAngle = leaf.stemAngle + Plant.maxGrowingTilt;
                    } else {
                        leaf.stemAngle = leaf.stemAngle - Plant.maxGrowingTilt;
                    }
                }
            }
            if(canGrowUp){
                leaf.elongateStem(Plant.growStepSize);
            } else {
                leaf.updatePositionAndTilt();
            }

            if(leaf.age >= Leaf.maxAge || leaf.hydration < 0.1 && Math.random() > 0.99 ){
                this.cullLeaf(index);
            }
        });
    }


    calcAverageHydration(){
        let hydrationAcumulator = 0;
        this.leaves.forEach((leaf, index)=>{
            hydrationAcumulator += leaf.hydration;
        });

        this.averageHydration = (hydrationAcumulator) / (this.leaves.length);
    }

    trySpawnNewLeaf(){
        // let onlyCheck = 5;
        let stemAngle = random(40,150);
        let stemLength = random(40,50);


        let newLeaf =  new Leaf(leafSprite,leafSize,stemAngle,stemLength, this.hydratePlant);
        newLeaf.setRoot(this.pos);
        newLeaf.updatePositionAndTilt();

        let i = this.leaves.length - 1;
        let hasFoundFarLeaf = false;
        
        while(!hasFoundFarLeaf && i >= 0){
            let dist = this.leaves[i].pos.distToOtherPos(newLeaf.pos);
            
            // If the purposed leaf location is too close to an existing leaf - exit
            if (dist < leafSize){
                // console.log("Failed to make new leaf");
                return;
            } else if(dist > leafSize * 2){
                // If the distances now are now so great is obvious that no other leaves will colide
                hasFoundFarLeaf = true;
            }

            i = i - 1;
        }
        // console.log("adding new leaf");

        // Accept the new leaf
        newLeaf.setRoot(this.pos);
        this.leaves.push(newLeaf);

    }
    

    static maxFallingLeaves = 8;

    cullLeaf(indexOfLeaf){

        let leaf = this.leaves[indexOfLeaf];


        this.fallingLeaves.push(new FallingLeaf(leafSprite,leaf.size,leaf.pos,leaf.rot,Math.min(leaf.currentFrame,Leaf.numOfFrames - 1),leaf.hydration));


        this.leaves.splice(indexOfLeaf,1);
        

    }
    
    draw(){

        this.pot.drawBack();

        this.leaves.forEach(element => {
            element.drawStems();
        });

        this.pot.draw();

        this.leaves.forEach(element => {
            element.drawLeaves();
        });


        this.fallingLeaves.forEach(element =>{
            element.draw();
        });
        
    }
}

