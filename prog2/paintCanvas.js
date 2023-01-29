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

var myColorPickers;

var availableColors = [new ColorDefinition(0,100,100),new ColorDefinition(30,100,100),new ColorDefinition(60,100,100),new ColorDefinition(90,100,100)]

function setup() {
    createCanvas(canvasHeight, canvasWidth);
    colorMode('hsb');

    myColorPickers = availableColors.map((color,index,_)=>{return new ColorPicker(color,0,index*ColorPicker.size)});
    print(myColorPickers);
     
  }
  
  function draw() {
    background(220,123,214);
    ellipse(50,50,80,80);
    myColorPickers.map((colorPicker,_,__)=>{ colorPicker.doDraw()});
  }