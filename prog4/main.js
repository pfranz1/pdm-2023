let mainGuySpriteSheet;
let walkers;
let bg;

let canvasWidth = 500;
let canvasHeight = 500;

let padding = 50;


function preload(){
    mainGuySpriteSheet = loadImage("./assets/SpelunkyGuy.png");
    blueGuySpriteSheet = loadImage("./assets/BlueGuy.png");
    robotSpriteSheet = loadImage("./assets/robot.png");

    bugwalk = loadImage("./assets/bug-walk.png");

    
    // BugSprite(spiteSheet, tilingWidth, tilingHeight, numFramesInAnimation, drawingWidth, drawingHeight, xPos, yPos)
    walkers = [ new BugSprite(bugwalk,32,32,4,80,80,random(padding,canvasWidth - padding),random(padding,canvasHeight - padding)),new BugSprite(bugwalk,32,32,4,80,80,random(padding,canvasWidth - padding),random(padding,canvasHeight - padding)),new BugSprite(bugwalk,32,32,4,80,80,random(padding,canvasWidth - padding),random(padding,canvasHeight - padding)),new BugSprite(bugwalk,32,32,4,80,80,random(padding,canvasWidth - padding),random(padding,canvasHeight - padding)),new BugSprite(bugwalk,32,32,4,80,80,random(padding,canvasWidth - padding),random(padding,canvasHeight - padding)), ]
}


function setup(){
    createCanvas(canvasWidth,canvasHeight);
    imageMode(CENTER);
    colorMode('hsb');
}

function draw(){
    background(200,100,100);

    walkers.forEach( function (item,index){
        item.draw();
    });

}

function mouseReleased(){
    walkers.forEach( function (item,index){
        item.tapOccurred(mouseX,mouseY);
    });
}

function keyPressed(){
    // walkers.forEach( function (item,index){
    //     item.keyPressed();
    // });
}


function keyReleased(){
    // walkers.forEach( function (item,index){
    //     item.keyReleased();
    // });
}

function degrees_to_radians(degrees) {
    return degrees * (Math.PI / 180);
  }

class BugSprite{

    static randomTurn = 5;
    static baseSpeed = 1;

    static maxFleeSpeed = 6;
    static fleeUpdateTick = 25;
    static fleeLength = 5;
    
    
    constructor(spriteSheet, tileWidth, tileHeight, numAnimationFrames, height, width,  xPos,yPos,  ){
        this.spriteSheet = spriteSheet;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.numAnimationFrames = numAnimationFrames;
        this.height = height;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;

        this.currentFrame = 0;

        this.fleeCounter = -1;
        

        // xDirection 1 means that the sprite is facing the right, -1 = left
        this.xDirection = 1;

        this.tileRowIterator = 0;
        this.tileColumnIterator = 0;

        this.moveSpeed = BugSprite.baseSpeed;
        this.facingDeg = random(0,360);

        this.radius = max(height,width) / 2;
    }


    willHitWall(xPosChange){
        return (this.xPos + xPosChange + this.radius > width) || (this.xPos + xPosChange - this.radius < 0);
    }

    willHitCeli(yPosChange){
        return (this.yPos - yPosChange + this.radius > height) || (this.yPos - yPosChange - this.radius < 0);
    }

    updateFleeState(){
        if  (this.fleeCounter >= 0){
            this.fleeCounter -= 1;
        } else{
            if(this.moveSpeed > BugSprite.baseSpeed){
                this.moveSpeed = max(BugSprite.baseSpeed , this.moveSpeed * 0.75);
                this.fleeCounter += BugSprite.fleeLength;
                print("MS",this.moveSpeed);
            }
        }
    }

    draw(){

        this.tileColumnIterator = this.currentFrame % this.numAnimationFrames;

        
        push();
        // Translating so that (0,0) corresponds to the sprites top left
        translate(this.xPos,this.yPos);
        
        // rotate to be facing correct direction 
        // (p5 rotates clock wise - thus mult -1 for counter clock wise)
        // (p5 starts at 12o clock - I want to start at three bc thats how I know the math)
        rotate(degrees_to_radians(-1 * (this.facingDeg - 90)));

        // // Scaling to flip sprite if xDirection == -1
        scale(this.xDirection,1);
        
        // Start at location 0 0 because of the translate  
        image(this.spriteSheet,0,0,this.height,this.width,this.tileColumnIterator*this.tileWidth,this.tileRowIterator*this.tileHeight,this.tileWidth, this.tileHeight);
        pop();
        
        // Only update frame every 6 p5 draw ticks and only if character moving
        if(frameCount % 6 == 0 && this.moveSpeed != 0){
            this.currentFrame++;
        }

        if(frameCount % BugSprite.fleeUpdateTick == 0){
            this.updateFleeState();
            print("flee ticks left:", this.fleeCounter)
        }

        // Calculate changes to make to location (cartesian units)
        var xChange = this.moveSpeed *  Math.cos(degrees_to_radians( this.facingDeg));
        var yChange = this.moveSpeed * Math.sin(degrees_to_radians( this.facingDeg));

        if(this.willHitWall(xChange) || this.willHitCeli(yChange)){
            // print("Going to hit the wall!");
            // print(this.facingDeg)

            this.facingDeg = (270 + this.facingDeg  + random(-1 * BugSprite.randomTurn, BugSprite.randomTurn)) % 360;
            
            // Recalculate values
            xChange = this.moveSpeed * Math.cos(degrees_to_radians( this.facingDeg));
            yChange = this.moveSpeed * Math.sin(degrees_to_radians( this.facingDeg));
        }

        this.xPos +=  xChange;
        this.yPos -= yChange;
    } 


    keyPressed(){
        if (keyCode === RIGHT_ARROW){
            this.moveSpeed = 2;
            this.xDirection = 1;
            this.currentFrame = 1;
        } 
        else if (keyCode === LEFT_ARROW){
            this.moveSpeed = -2;
            this.xDirection = -1;
            this.currentFrame = 1;
        } 
    }

    tapOccurred(tapX, tapY){
        var distToBug = dist(tapX,tapY, this.xPos, this.yPos);
        // IF withing bug radius
        if (distToBug < this.radius){
            if (this.moveSpeed == 0){
                this.moveSpeed = 1;
            } else {
                print("Squish!");
                this.moveSpeed = 0;
            }

        } else 
        // IF within flee range
        if (distToBug < this.radius * 5 && this.moveSpeed != 0){
            this.moveSpeed = min(BugSprite.maxFleeSpeed, this.moveSpeed + ((this.radius * 5 / distToBug) - 0.5));

            this.fleeCounter += BugSprite.fleeLength;
            // print("MS", this.moveSpeed);

            // print("x",this.xPos);
            // print("y",this.yPos);

            // print("xDist",tapX - this.xPos);
            // print("yDist", tapY - this.yPos);
            let angleBetween = Math.atan2(tapX - this.xPos, tapY - this.yPos) * 57.2958;
            // print("Angle Between",angleBetween);

            // Turn opposite direction of tap
            this.facingDeg = 180 + (angleBetween - 90);
        }
    }

    
    keyReleased(){
        if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW){
            this.moveSpeed = 0;
            this.currentFrame = 0;
        } 
    }
}