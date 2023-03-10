var synth = new Tone.PolySynth();
var hasToneInit = false;

function setup() {

  synth.toDestination();

  var playButton = new Nexus.RadioButton('#playButton',{
    'size': [120,25],
    'numberOfButtons': 1,
    'active': -1
  });

playButton.on('change',(v) => {
    if(v != -1){
        if(hasToneInit == false) {Tone.start(); hasToneInit = true};
        Tone.Transport.start();
        console.log('Playing scale');
        playScale(addOctaveNumbers(AMinorScale,4));
    } else {
        // TODO: Figure out how to pause music generation - this is not working????
        Tone.Transport.stop();
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

function draw(){}


