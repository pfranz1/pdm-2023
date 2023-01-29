let canvasHeight = 200;
let canvasWidth = 200;

let colorBarWidth  = Math.min(canvasWidth * 0.20,100);

class ColorDefinition{
    hue;
    saturation;
    brilliance;

    constructor(hue,saturation,brilliance){
        this.hue = hue;
        this.saturation = saturation;
        this.brilliance = brilliance;
    }

    doSetFill(){
        fill(this.hue,this.saturation,this.brilliance);
    }
}

class ColorPicker{

    static size = 25;

    color;
    isSelected;
    onTap;

    xPos;
    yPos;
    
    constructor(color, xPos,yPos){
        this.color = color;
        this.xPos = xPos;
        this.yPos = yPos;
    }

    doDraw(){
        this.color.doSetFill();
        square(this.xPos,this.yPos,ColorPicker.size);
    }
}

var mySquare;

function setup() {
    createCanvas(canvasHeight, canvasWidth);
    colorMode('hsb');

    mySquare = new ColorPicker(new ColorDefinition(23,123,231),50,50)
     
  }
  
  function draw() {
    background(220,123,214);
    ellipse(50,50,80,80);
    mySquare.doDraw();
  }