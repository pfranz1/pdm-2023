const leafSize = 100;

function calcAngleBetweenPos(posA,posB){
    let result = Math.atan2(posA.y- posB.y, posA.x- posB.x) * 180 / Math.PI;
    console.log(result);
    return result;
}

class Plant{

    constructor(numLeaves,xPos,yPos){
        this.leaves = numLeaves;

        this.pos = new Position(xPos,yPos);

        this.leaves = [];

        let positions = [];

        for(let index = 0; index < numLeaves; index++){
            positions.push(new Position(this.pos.x + random(-180,180),this.pos.y + random(-100,-250)));
        }

        // TODO: seperate positions
        this.seperatePositions(positions);

        // this.cullCloseLeaves(positions);

        this.sortPositionsTallestToShortest(positions);

        positions.forEach((pos) => {
            let newLeaf =  new Leaf(leafSprite,64,64,leafSize,leafSize, pos, this.makeStructFromZRot((this.calcAngleToPos(pos) - 90) * -1));
            this.leaves.push(newLeaf);
        });
    }

    calcAngleToPos(pos){
        let result = Math.atan2(this.pos.y- pos.y, this.pos.x- pos.x) * 180 / Math.PI;
        console.log(result);
        return result;
    }

    seperatePositions(positionList){
        let conflictsRemain = true;
        let isFirstLoop = true;

        let threashHold = leafSize + 10;
        let stepSize = 40;


        console.log("seperating positions");

        while(isFirstLoop || conflictsRemain){
            isFirstLoop = false;
            conflictsRemain = false;            
            for(let index = 0; index < positionList.length; index++){
                for(let itter = index + 1; itter < positionList.length; itter++){
                    console.log("distance between", index, itter, positionList[index].distToOtherPos(positionList[itter]));

                    if(positionList[index].distToOtherPos(positionList[itter]) < threashHold){
                        // The points must be seperated
                        console.log("Seperating leaves");

                        conflictsRemain = true;
                        let lowerPosition = positionList[index].y > positionList[itter].y ? positionList[index] : positionList[itter];
                        let higherPos = positionList[index].y <= positionList[itter].y ? positionList[index] : positionList[itter];

                        let angleBetween = calcAngleBetweenPos(lowerPosition,higherPos);
                        
                        // If lower pos is furthan to the root than the step size
                        if(this.pos.y - lowerPosition.y > leafSize){
                            lowerPosition.movePosByAngle(180 - angleBetween,stepSize);
                        }

                        higherPos.movePosByAngle(angleBetween,stepSize * -1);
                    }
                }
            }
            threashHold = threashHold * (2/3);
        }
    }

    cullCloseLeaves(positionList){
        let rootPos = new Position(this.pos.x,this.pos.y);

        for(let index = 0; index < positionList.length; index++){
            if(positionList[index].distToOtherPos(rootPos) < leafSize){
                console.log("Culled leaf ", index);
                positionList.splice(index,1);
            }
        }
    }

    sortPositionsTallestToShortest(positionList){
        positionList.sort((a,b)=>{
            return a.y - b.y;
        });
    }


    makeStructFromZRot(iZRot){
        let zRot = iZRot;
        let yRot = zRot * 0.65 * -1;
        let xRot = zRot * (2/6);
        // leaf = new Leaf(leafSprite,64,64,100,100,250,250, new RotationStruct(xRot-10,yRot-15,zRot));  
        return new  RotationStruct(xRot,yRot,iZRot);
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
}