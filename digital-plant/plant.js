class Plant{
    constructor(numLeaves,xPos,yPos){
        this.leaves = numLeaves;
        this.xPos = xPos;
        this.yPos = yPos;

        this.leaves = [];

        for(let index = 0; index < numLeaves; index++){
            let newLeaf =  new Leaf(leafSprite,64,64,100,100,0,0, makeStructFromZRot(random(-75,75)));
            newLeaf.xPos = xPos + random(-150,150);
            newLeaf.yPos = yPos - random(50,250);

            this.leaves.push(newLeaf);
        }

        // this.leaves.forEach(element => {
        //     element.xPos = xPos + random(-150,150);
        //     element.yPos = yPos - random(50,250);
        // });
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