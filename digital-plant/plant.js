class Plant{
    constructor(leaves,xPos,yPos){
        this.leaves = leaves;
        this.xPos = xPos;
        this.yPos = yPos;

        this.leaves.forEach(element => {
            element.xPos = xPos + random(-150,150);
            element.yPos = yPos - random(50,250);
        });
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