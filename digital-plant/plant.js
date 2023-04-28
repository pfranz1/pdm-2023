const leafSize = 100;

function calcAngleBetweenPos(posA,posB){
    let result = Math.atan2(posA.y- posB.y, posA.x- posB.x) * 180 / Math.PI;
    console.log(result);
    return result;
}

class Plant{

    constructor(numLeaves,xPos,yPos){
        this.numLeaves = numLeaves;

        this.pos = new Position(xPos,yPos);

        this.leaves = [];


        for(let index = 0; index < numLeaves; index++){
            let randomPos = new Position(this.pos.x + random(-180,180),this.pos.y + random(-100,-250));

            let newLeaf =  new Leaf(leafSprite,64,64,leafSize,leafSize, (index + 4) * random(20,30), random(30,160), randomPos, new RotationStruct(0,0,0));
            this.leaves.push(newLeaf);
        }

        
        this.leaves.forEach((leaf)=>{
            leaf.updatePositionRelativeToRoot(this.pos);
        });
 

        this.seperateLeaves(this.leaves);

        this.sortLeavesTallestToShortest(this.leaves);

        this.leaves.forEach((leaf)=>{
            leaf.updateRotation(-1 * (this.calcAngleToPos(leaf.pos) - 90));
        });
    }

    calcAngleToPos(pos){
        let result = Math.atan2(this.pos.y- pos.y, this.pos.x- pos.x) * 180 / Math.PI;
        console.log(result);
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

                        let angleBetween = calcAngleBetweenPos(lowerLeaf.pos,higherLeaf.pos);



                        // The lower leaf is left of the higher leaf
                        if(angleBetween <= 90){
                            console.log("too the left");
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
                        lowerLeaf.updatePositionRelativeToRoot(this.pos);
                        higherLeaf.updatePositionRelativeToRoot(this.pos);
                        
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

    doGrowTick(){
        console.log("growing...");
        this.leaves.forEach((leaf)=>{
            leaf.elongateStem(10);
        });
    }
    
    draw(){
        let controlPointOffset = 30;
        push();
        fill(113,80,60);
        strokeWeight(10);
        stroke(113,80,40);
        // circle(this.pos.xPos,this.pos.yPos,40);

        this.leaves.forEach(element => {

            curve(this.pos.x + controlPointOffset, this.pos.y + controlPointOffset, this.pos.x,this.pos.y, element.pos.x, element.pos.y, element.pos.x+ controlPointOffset, element.pos.y+ controlPointOffset);
            element.draw();
            

        });
        
        pop();
    }
}

class Position{
    constructor(xPos,yPos){
        this.x = xPos;
        this.y = yPos;
    }

    distToOtherPos(other){
        let y = other.x - this.x;
        let x = other.y - this.y;
      
        return Math.sqrt(x * x + y * y);
    }

    movePosByAngle(angle,dist){
        this.x += dist * Math.cos(angle / 57.2958);
        this.y += dist * Math.sin(angle / 57.2958);
    }

    calcAngleBetween(other){
        let result = Math.atan2(this.y- other.y, this.x- other.x) * 180 / Math.PI;
        console.log(result);
        return result;
    }
}