var instrument = new Tone.MonoSynth();


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
  
  var effect1, effect2, effect3;
  
  // create effects
  var effect1 = new Tone.Chorus();
  effect1JSON = {
    "frequency": 16,
    "delayTime": 16,
    "type": "triangle",
    "depth": 1,
    "feedback": 0.1,
    "spread": 120,
      "wet": 0.5
  };
  effect1.set(effect1JSON);
  
  
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
  instrument.triggerAttackRelease("C4", "8n");
}