let sound1 = new Tone.Player("sounds/110011__tuberatanka__cat-meow.wav");


let sounds = new Tone.Players({
  "meow":"sounds/110011__tuberatanka__cat-meow.wav",
  "bark" : "163459__littlebigsounds__lbs_fx-dog-small-alert-bark001.wav",
  "quack":"242664__reitanna__quack.wav"
});


let button1,button2,button3;


function setup() {
  createCanvas(400, 400);

  sound1.toDestination();

  button1 = createButton("Meow");
  button1.position(50,50);
  button1.mousePressed(()=>playSound("meow"));

  button2 = createButton("Bark");
  button2.position(150,50);
  button2.mousePressed(()=>playSound("bark"));

  button3 = createButton("Quack");
  button3.position(250,50);
  button3.mousePressed(()=>playSound("quack"));
  

}

function draw() {
  background(220);
}


function keyPressed(){
  if(key === "1"){
    sound1.playbackRate = 2 * (mouseY / width) + 0.5;
    sound1.start();
  } else{}

}


function playSound(soundName){
  sounds.player(soundName).start();
}