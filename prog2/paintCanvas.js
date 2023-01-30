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

var currentlySelectedColor = new ColorDefinition(0,0,0);
var selectedIndex = -1;

var padding = 5;


function setup() {
    createCanvas(canvasHeight, canvasWidth);
    colorMode('hsb');

    background(220,123,214);



    myColorPickers = availableColors.map((color,index,_)=>{
            let onTap = () => {currentlySelectedColor = color; selectedIndex=index;};
            return new ColorPicker(color,padding,index*ColorPicker.size + padding*(index+1),onTap,index == selectedIndex);
        });

    // print(myColorPickers);
     
}

function mouseClicked(){

    // Check where the tap is on
    if (isInsideColorBar(mouseX, mouseY)){
        // If inside the color bar, 
        // store the currently selected color
        let cachedSelectedIndex = selectedIndex;

        // itterate through all color pickers and update state with checkTap calling onTap if it was a tap
        myColorPickers.map((colorPicker,_,__)=>{ colorPicker.checkTap(mouseX,mouseY)});
        
        // If state changed
        if (cachedSelectedIndex != selectedIndex){
            // Create new color pickers
            myColorPickers = availableColors.map((color,index,_)=>{
                let onTap = () => {currentlySelectedColor = color; selectedIndex=index;};
                return new ColorPicker(color,padding,index*ColorPicker.size + padding*(index+1),onTap,index == selectedIndex);
            });
            // print(myColorPickers);
        }
    } else {
        // Else, meaning it was on the canvas
        // Pass here because painting is done in the draw loop
    }

    // print(selectedIndex);
}

function isInsideColorBar(xPos,yPos){
    insideX = xPos >= 0 && xPos <= ColorPicker.size + padding * 2;
    insideY = yPos >= 0 && yPos <= padding + myColorPickers.length * (padding + ColorPicker.size);

    // print("inside X:", insideX);
    // print( "inside Y:",insideY);
    // print("----------")
    return insideX && insideY;
}
  
function draw() {
    // Backplate for 
    rect(0,0,ColorPicker.size + padding * 2,padding + myColorPickers.length * (padding + ColorPicker.size));

    myColorPickers.map((colorPicker,_,__)=>{ colorPicker.doDraw()});

    if (mouseIsPressed && !isInsideColorBar(mouseX,mouseY)){
        push();
        currentlySelectedColor.doSetFill();
        strokeWeight(0);
        ellipse(mouseX,mouseY, 30);
        pop();
    }
}