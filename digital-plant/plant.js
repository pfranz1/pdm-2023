const leafSize = 75;

class Plant{
    // Ticks until a new leaf is spawned
    static newLeafSpawnFrequency = 10;


    constructor(numLeaves,pos, pot){
        this.numLeaves = numLeaves;

        this.pos = pos;
        this.pot = pot;

        this.leaves = [];

        this.newLeafSpawnCounter = 0;


        for(let index = 0; index < numLeaves; index++){

            let newLeaf =  new Leaf(leafSprite,leafSize, (index + 4) * random(20,40), random(30,160));
            newLeaf.setRoot(this.pos);
            this.leaves.push(newLeaf);
        }

        
        this.leaves.forEach((leaf)=>{
            leaf.updatePositionAndTilt();
            leaf.incAge((leaf.stemLength / Leaf.maxHeight) * Leaf.matureSize);
        });
 

        this.seperateLeaves(this.leaves);

        this.sortLeavesTallestToShortest(this.leaves);

        this.leaves.forEach((leaf)=>{
            leaf.updateRotation(-1 * (this.calcAngleToPos(leaf.pos) - 90));
        });
    }

    calcAngleToPos(pos){
        let result = Math.atan2(this.pos.y- pos.y, this.pos.x- pos.x) * 180 / Math.PI;
        // console.log(result);
        return result;
    }


    seperateLeaves(leafList){
        let conflictsRemain = true;
        let isFirstLoop = true;

        let threashHold = leafSize + 10;
        let stepSize = 5;


        console.log("seperating positions");

        while(isFirstLoop || conflictsRemain && threashHold > 1){
            console.log("Threahold: ", threashHold);
            isFirstLoop = false;
            conflictsRemain = false;            
            for(let index = 0; index < leafList.length; index++){
                for(let itter = index + 1; itter < leafList.length; itter++){
                    console.log("distance between", index, itter, leafList[index].pos.distToOtherPos(leafList[itter].pos));

                    if(leafList[index].pos.distToOtherPos(leafList[itter].pos) < threashHold){
                        // The points must be seperated
                        console.log("Seperating leaves");

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

    doGrowTick(){
        console.log("growing...");
        //TODO: Dont call sort every itteration
        this.sortLeavesTallestToShortest(this.leaves);

        this.newLeafSpawnCounter++;
        if(this.newLeafSpawnCounter > Plant.newLeafSpawnFrequency){
            this.newLeafSpawnCounter = 0;
            this.trySpawnNewLeaf();
        }


        this.leaves.forEach((leaf, index)=>{
            leaf.incAge(10);

            if(leaf.age >= Leaf.maxAge){
                this.cullLeaf(index);
            }

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
        });
    }

    trySpawnNewLeaf(){
        // let onlyCheck = 5;
        
        let newLeaf =  new Leaf(leafSprite,leafSize,random(40,150),random(25,30));
        newLeaf.setRoot(this.pos);
        newLeaf.updatePositionAndTilt();

        let i = this.leaves.length - 1;
        let hasFoundFarLeaf = false;
        
        while(!hasFoundFarLeaf && i >= 0){
            let dist = this.leaves[i].pos.distToOtherPos(newLeaf.pos);
            
            // If the purposed leaf location is too close to an existing leaf - exit
            if (dist < leafSize){
                console.log("Failed to make new leaf");
                return;
            } else if(dist > leafSize * 2){
                // If the distances now are now so great is obvious that no other leaves will colide
                hasFoundFarLeaf = true;
            }

            i = i - 1;
        }
        console.log("adding new leaf");

        // Accept the new leaf
        newLeaf.setRoot(this.pos);
        this.leaves.push(newLeaf);

    }

    cullLeaf(indexOfLeaf){
        this.leaves.splice(indexOfLeaf,1);
    }
    
    draw(){

        this.leaves.forEach(element => {
            element.drawStems();
        });

        this.pot.draw();

        this.leaves.forEach(element => {
            element.drawLeaves();
        });
        
    }
}

