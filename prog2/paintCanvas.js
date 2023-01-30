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
    
    constructor(color, xPos,yPos, onTap, isSelected){
        this.color = color;
        this.xPos = xPos;
        this.yPos = yPos;
        this.onTap = onTap;
        this.isSelected = isSelected;
    }

    doDraw(){
        push();
        this.color.doSetFill();
        if(this.isSelected){
            strokeWeight(padding / 2)
        }
        square(this.xPos,this.yPos,ColorPicker.size);
        pop();
    }
}

var myColorPickers;

var availableColors = [new ColorDefinition(0,100,100),new ColorDefinition(30,100,100),new ColorDefinition(60,100,100),new ColorDefinition(90,100,100)]

var currentlySelected = new ColorDefinition(0,0,0);
var selectedIndex = -1;

var padding = 5;


function setup() {
    createCanvas(canvasHeight, canvasWidth);
    colorMode('hsb');


    myColorPickers = availableColors.map((color,index,_)=>{
            let onTap = () => {currentlySelected = color; selectedIndex=index;};
            return new ColorPicker(color,padding,index*ColorPicker.size + padding*(index+1),onTap,index == selectedIndex);
        });

    // print(myColorPickers);
     
}

function mouseClicked(){
    let cachedSelectedIndex = selectedIndex;
    
    myColorPickers.map((colorPicker,_,__)=>{ colorPicker.checkTap(mouseX,mouseY)});
    
    if (cachedSelectedIndex != selectedIndex){
        myColorPickers = availableColors.map((color,index,_)=>{
            let onTap = () => {currentlySelected = color; selectedIndex=index;};
            return new ColorPicker(color,padding,index*ColorPicker.size + padding*(index+1),onTap,index == selectedIndex);
        });
        // print(myColorPickers);
    }
    // print(selectedIndex);
}
  
function draw() {
    background(220,123,214);
    myColorPickers.map((colorPicker,_,__)=>{ colorPicker.doDraw()});
}