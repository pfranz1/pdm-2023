var synth = new Tone.PolySynth();
var hasToneInit = false;

function setup() {

  synth.toDestination();

  var playButton = new Nexus.RadioButton('#playButton',{
    'size': [120,25],
    'numberOfButtons': 1,
    'active': -1
  });

var partFromFunction = null;

playButton.on('change',(v) => {
    if(v != -1){
        if(hasToneInit == false) {Tone.start(); hasToneInit = true};
        Tone.Transport.start();
        partFromFunction = partFromScale();
        partFromFunction.start();
    } else {
        partFromFunction.stop();
    }    
});
}

function draw() {
}

const AMinorScale = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const addOctaveNumbers = (scale, octaveNumber) => scale.map(note => {
    // Find Index of C or C# - this is the first note of an octave ( maybe ?)
    const firstOctaveNoteIndex = scale.indexOf('C') !== -1 ? scale.indexOf('C') : scale.indexOf('C#');
    // The note number should be 1 less than the passed parameter if it is before C, equal after
    const noteOctaveNumber = scale.indexOf(note) < firstOctaveNoteIndex ? octaveNumber - 1 : octaveNumber;
    return `${note}${noteOctaveNumber}`
  });


function playScale(scale){
    scale.forEach((note, index) => {
        synth.triggerAttackRelease(note, "4n", `+${index}`);
      });
}


function partFromScale(){
  const part = new Tone.Part(((time, note) => {
    synth.triggerAttackRelease(note, "8n", time);
  }), [[0, "C2"], ["0:2", "C3"], ["0:3:2", "G2"]]);

  part.loopStart = "0";

  part.loopEnd =  "1m";

  part.loop = true;

  return part;
}

function draw(){}


