const leafSize = 100;
class Plant{

    constructor(numLeaves,xPos,yPos){
        this.leaves = numLeaves;
        this.xPos = xPos;
        this.yPos = yPos;

        this.leaves = [];

        let positions = [];

        for(let index = 0; index < numLeaves; index++){
            positions.push(new Position(this.xPos+ random(-180,180),this.yPos + random(-100,-250)));
        }

        // TODO: seperate positions
        this.seperatePositions(positions);

        this.cullCloseLeaves(positions);

        positions.forEach((pos) => {
            let newLeaf =  new Leaf(leafSprite,64,64,leafSize,leafSize, pos.xPos,pos.yPos, makeStructFromZRot((this.calcAngleToPos(pos) - 90) * -1));
            this.leaves.push(newLeaf);
        });
    }

    calcAngleToPos(pos){
        // Subtract 90 because directly above should be 0

        let result = Math.atan2(this.yPos - pos.yPos, this.xPos - pos.xPos) * 180 / Math.PI;
        console.log(result);
        return result;
    }

    seperatePositions(positionList){
        let conflictsRemain = true;
        let isFirstLoop = true;

        let threashHold = leafSize;
        let stepSize = 20;

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
                        let lowerPosition = positionList[index].yPos <= positionList[itter].yPos ? positionList[index] : positionList[itter];
                        let higherPos = positionList[index].yPos > positionList[itter].yPos ? positionList[index] : positionList[itter];

                        let tempX = lowerPosition.xPos;
                        let tempY = lowerPosition.yPos;

                        lowerPosition.movePosByAngle(this.calcAngleToPos(lowerPosition),stepSize * -1);
                        higherPos.movePosByAngle(this.calcAngleToPos(higherPos),stepSize);
                    }
                }
            }
            threashHold = threashHold * 2/3;
        }
    }

    cullCloseLeaves(positionList){
        let rootPos = new Position(this.xPos,this.yPos);

        for(let index = 0; index < positionList.length; index++){
            if(positionList[index].distToOtherPos(rootPos) < leafSize){
                console.log("Culled leaf ", index);
                positionList.splice(index,1);
            }
        }
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
        // circle(this.xPos,this.yPos,40);

        this.leaves.forEach(element => {

            curve(this.xPos + controlPointOffset, this.yPos + controlPointOffset, this.xPos,this.yPos, element.xPos , element.yPos, element.xPos + controlPointOffset, element.yPos + controlPointOffset);
            element.draw();
            

        });
        
        pop();
    }
}

class Position{
    constructor(xPos,yPos){
        this.xPos = xPos;
        this.yPos = yPos;
    }

    distToOtherPos(other){
        let y = other.xPos - this.xPos;
        let x = other.yPos - this.yPos;
      
        return Math.sqrt(x * x + y * y);
    }

    movePosByAngle(angle,dist){
        this.xPos += dist * Math.cos(angle / 57.2958);
        this.yPos += dist * Math.sin(angle / 57.2958);
    }
}