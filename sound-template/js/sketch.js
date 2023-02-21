
let sounds = new Tone.Players({

  "low": "sounds/low.wav",
  "mid": "sounds/mid.wav",
  "high": "sounds/high.wav",
  "applause":"sounds/applause.wav",

})

const delay = new Tone.FeedbackDelay("8n", 0.5);

let soundNames = ["low", "mid", "high", "applause"];
let buttons = [];

let dSlider;
let fSlider;

// let button1, button2, button3;

function setup() {
  createCanvas(400, 400);
  sounds.connect(delay);
  delay.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(((width / 2) - 166) ,25 +  index*75);
    buttons[index].mousePressed( () => buttonSound(word))
  })

  dSlider = createSlider(0., 1., 0.5, 0.05);
  dSlider.position((width / 2) + 35, 125);
  dSlider.mouseReleased( () => {
    delay.delayTime.value = dSlider.value();
  })

  fSlider = createSlider(0., 1., 0.5, 0.05);
  fSlider.position((width / 2) + 35, 200);

  fSlider.mouseReleased( () => {
    delay.feedback.value = fSlider.value();
  })


}

function draw() {
  background(100, 100, 100);

  rect(0,0,width/2,height)

  textAlign(CENTER);

  textSize(25);
  text('Tap To Play', (width / 4) * 1, height-25)


  text('Delay', (width / 4) * 3 , 105)


  text('Feedback', (width / 4) * 3 , 255)

}

function buttonSound(whichSound) {
    sounds.player(whichSound).start();
}