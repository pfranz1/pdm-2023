let hasToneInit = false;

let pitch = 500;

// Set up Tone
let osc = new Tone.AMOscillator(pitch, 'sine', 'sine').start()
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(pan);
osc.connect(ampEnv);

var elevatorGif;

function setup() {
  createCanvas(400, 400);
  background(100,100,100);

  imageMode("center");


  elevatorGif = createImg("assets/elevator.gif");

}

let showElevator = false;


function draw() {
  // rect(0,100,50,50);
  if (showElevator){
    elevatorGif.position(100,50 );

  } else {
    elevatorGif.position(-1000,-100 );
  }
}

function keyPressed(){
  if (keyCode === 32 && hasToneInit === false){
    console.log('Starting tone...');
    Tone.start();
    hasToneInit = true;
  }
}


function playChime(playOnce){
  osc.frequency.value = pitch;
  ampEnv.triggerAttackRelease('4t');
  osc.frequency.setValueAtTime(pitch - 60, '+0.25');
  ampEnv.triggerAttackRelease('4t', '+0.25');

  if (playOnce === false){
    osc.frequency.setValueAtTime(pitch, "+0.75");
    ampEnv.triggerAttackRelease('4t', "+0.75");
    osc.frequency.setValueAtTime(pitch - 60, '+1');
    ampEnv.triggerAttackRelease('4t', '+1');
  }
}



function mousePressed() {
  console.log('pressed');


  if (showElevator === false){
    showElevator = !showElevator;

    playChime(true);

    setTimeout(()=>{showElevator = false},5 * 1000);

  }


  // playChime();
}