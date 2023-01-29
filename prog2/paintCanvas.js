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

    isInside(tapX,tapY){
        let inX = tapX >= this.xPos && tapX <= this.xPos + ColorPicker.size;
        let inY = tapY >= this.yPos && tapY <= this.yPos + ColorPicker.size;

        return inX && inY;
    }

    checkTap(tapX,tapY){
        if (this.isInside(tapX,tapY)){
            this.onTap();
        }
    }
    
    constructor(color, xPos,yPos, onTap){
        this.color = color;
        this.xPos = xPos;
        this.yPos = yPos;
        this.onTap = onTap;
    }

    doDraw(){
        this.color.doSetFill();
        square(this.xPos,this.yPos,ColorPicker.size);
    }
}

var myColorPickers;

var availableColors = [new ColorDefinition(0,100,100),new ColorDefinition(30,100,100),new ColorDefinition(60,100,100),new ColorDefinition(90,100,100)]

var currentlySelected = new ColorDefinition(0,0,0);
var selectedIndex = -1;

function setup() {
    createCanvas(canvasHeight, canvasWidth);
    colorMode('hsb');

    myColorPickers = availableColors.map((color,index,_)=>{
            let onTap = () => {currentlySelected = color; selectedIndex=index;};
            return new ColorPicker(color,0,index*ColorPicker.size,onTap);
        });

    print(myColorPickers);
     
}

function mouseClicked(){
    myColorPickers.map((colorPicker,_,__)=>{ colorPicker.checkTap(mouseX,mouseY)});
    print(selectedIndex);
}
  
function draw() {
    background(220,123,214);
    ellipse(50,50,80,80);
    myColorPickers.map((colorPicker,_,__)=>{ colorPicker.doDraw()});
}