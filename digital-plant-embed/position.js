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
        // console.log(result);
        return result;
    }
}