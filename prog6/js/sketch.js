var instrument = new Tone.MonoSynth();

let notes = {

  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'

}


function setup() {
  // create synth
  var synthJSON = {
      "oscillator": {
          "type": "fmsquare5",
      "modulationType" : "triangle",
          "modulationIndex" : 2,
          "harmonicity" : 0.501
      },
      "filter": {
          "Q": 1,
          "type": "lowpass",
          "rolloff": -24
      },
      "envelope": {
          "attack": 0.01,
          "decay": 0.1,
          "sustain": 0.4,
          "release": 2
      },
      "filterEnvelope": {
          "attack": 0.01,
          "decay": 0.1,
          "sustain": 0.8,
          "release": 1.5,
          "baseFrequency": 50,
          "octaves": 4.4
      }
  };
  
  instrument.set(synthJSON);



  var envelope = new Tone.Envelope({
		attack: 0.1,
		decay: 0.2,
		sustain: 0.5,
		release: 0.8,
	})
  
  var effect1, effect2, effect3;
  
  // create effects
  var effect1 = new Tone.Chorus();
  effect1JSON = {
    "frequency": 1000000,
    "delayTime": 24,
    "type": "triangle",
    "depth": 20,
    "feedback": 0.3,
    "spread": 10,
      "wet": 0.5
  };
  effect1.set(effect1JSON);


  dSlider = createSlider(0., 100., 1, 0.05);
  dSlider.position((width / 2) + 35, 125);
  dSlider.mouseReleased( () => {
    effect1.depth = dSlider.value();
  })

  fSlider = createSlider(0., 1., 0.5, 0.05);
  fSlider.position((width / 2) + 35, 200);

  fSlider.mouseReleased( () => {
    effect1.feedback.value = fSlider.value();
  })
  
  
  // make connections
  instrument.connect(effect1);
  effect1.toDestination();

  instrument.triggerAttackRelease("C4", "8n");

  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function keyPressed(){
  let whatNote = notes[key]
  
  instrument.triggerAttackRelease(whatNote, "8n");
}