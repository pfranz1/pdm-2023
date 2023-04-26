const leafSize = 100;
class Plant{

    constructor(numLeaves,xPos,yPos){
        this.leaves = numLeaves;
        this.xPos = xPos;
        this.yPos = yPos;

        this.leaves = [];

        let positions = [];

        for(let index = 0; index < numLeaves; index++){
            positions.push(new Position(random(-90,90),random(-100,-250)));
        }

        // TODO: seperate positions

        positions.forEach((pos) => {
            let newLeaf =  new Leaf(leafSprite,64,64,leafSize,leafSize,this.xPos + pos.xPos, this.yPos + pos.yPos, makeStructFromZRot(random(-75,75)));
            this.leaves.push(newLeaf);
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
}