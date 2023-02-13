
function degrees_to_radians(degrees) {
    return degrees * (Math.PI / 180);
}

class BugSprite{

    static randomTurn = 5;
    static baseSpeed = 1;

    static maxFleeSpeed = 6;
    static fleeUpdateTick = 25;
    static fleeLength = 5;

    static squishTimeout = 50;

    static glideTimeout = 5;

    static minScale = 0.8;

    
    
    constructor(livingAnimation, squishedAnimation, tileWidth, tileHeight, numAnimationFramesLiving, numAnimationFramesSquished, height, width,  xPos,yPos, onSquish ){
        this.livingAnimation = livingAnimation;
        this.squishedAnimation = squishedAnimation;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.numAnimationFramesLiving = numAnimationFramesLiving;
        this.numAnimationFramesSquished= numAnimationFramesSquished;
        this.height = height;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;

        this.onSquish = onSquish;
        
        this.currentFrame = Math.floor(random(0,numAnimationFramesLiving)) ;

        this.fleeCounter = -1;
        

        // xDirection 1 means that the sprite is facing the right, -1 = left
        this.xDirection = 1;

        this.tileRowIterator = 0;
        this.tileColumnIterator = 0;

        this.moveSpeed = BugSprite.baseSpeed;
        this.facingDeg = random(0,360);

        this.radius = max(height,width) / 2;
        this.detectionRadius = this.radius * 8;

        this.isSquished = false;
        this.squishTimer = BugSprite.squishTimeout;

        this.glideTimer = 0;
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
                // print("MS",this.moveSpeed);
            }
        }
    }

    drawSquished(){
        if (this.squishTimer > 0){
            this.squishTimer -= 1;

            this.tileColumnIterator = this.currentFrame % this.numAnimationFramesSquished;

            // Have a slower frame rate for the squish twitching animation
            if(frameCount % 10 == 0){
                this.currentFrame++;
            }

            push();
            // Translating so that (0,0) corresponds to the sprites top left
            translate(this.xPos,this.yPos);
            
            // rotate to be facing correct direction 
            // (p5 rotates clock wise - thus mult -1 for counter clock wise)
            // (p5 starts at 12o clock - I want to start at three bc thats how I know the math)
            rotate(degrees_to_radians(-1 * (this.facingDeg - 90)));
    
            // TBH I dont like it fading under the water - but im leaving the code incase i like it later
            // let scaling = Math.min(1, Math.max(BugSprite.minScale, this.squishTimer / BugSprite.squishTimeout + 0.25));
            // // scale(scaling,scaling);
            

            // Make the sprite fade away
            tint(225,255,255,(this.squishTimer / BugSprite.squishTimeout));
            
            // Start at location 0 0 because of the translate  
            image(this.squishedAnimation,0,0,this.height,this.width,this.tileColumnIterator*this.tileWidth,this.tileRowIterator*this.tileHeight,this.tileWidth, this.tileHeight);
            pop();
        }
    }

    drawWalking(){
        this.tileColumnIterator = this.currentFrame % this.numAnimationFramesLiving;
        push();
        // Translating so that (0,0) corresponds to the sprites top left
        translate(this.xPos,this.yPos);
        
        // rotate to be facing correct direction 
        // (p5 rotates clock wise - thus mult -1 for counter clock wise)
        // (p5 starts at 12o clock - I want to start at three bc thats how I know the math)
        rotate(degrees_to_radians(-1 * (this.facingDeg - 90)));

        // Scaling to flip sprite if xDirection == -1
        scale(this.xDirection,1);
        
        // Start at location 0 0 because of the translate  
        image(this.livingAnimation,0,0,this.height,this.width,this.tileColumnIterator*this.tileWidth,this.tileRowIterator*this.tileHeight,this.tileWidth, this.tileHeight);
        pop();
        
        // Only update frame every 6 p5 draw ticks and only if character moving
        if(frameCount % 5 == 0 && this.isSquished != true){
            // If the timeout for gliding hasn't finished
            if(this.glideTimer > 0){
                this.glideTimer -= 1;
            } else {
                this.currentFrame++;
                if(this.currentFrame % this.numAnimationFramesLiving == 0){
                    this.glideTimer = BugSprite.glideTimeout;
                }
            }
        }
    }


    updatePos(){
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


    draw(){
        if (this.isSquished){
            this.drawSquished();
        } else {
            this.drawWalking();
        }

        // If moving
        if(this.moveSpeed > 0){
            // Update flee logic
            if(frameCount % BugSprite.fleeUpdateTick == 0){
                this.updateFleeState();
            }
            // Update position
            this.updatePos();
        }
    } 

    kill(){
        print("kill");
        this.isSquished = true;
        this.moveSpeed = 0;
        this.squishTimer = BugSprite.squishTimeout;
        
        this.onSquish();
    }

    revive(){
        print("res");
        this.isSquished = false;
        this.moveSpeed = BugSprite.baseSpeed;
    }

    tapOccurred(tapX, tapY){
        var distToBug = dist(tapX,tapY, this.xPos, this.yPos);
        // IF withing bug radius
        if (distToBug < this.radius){
            if (this.moveSpeed == 0){
                // this.revive();
            } else {
                this.kill()
            }

        } else 
        // IF within flee range
        
        if (distToBug < this.detectionRadius && this.moveSpeed != 0){
            this.moveSpeed = min(BugSprite.maxFleeSpeed, this.moveSpeed +  BugSprite.maxFleeSpeed* max(0.25,1 - distToBug / this.detectionRadius));

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
}