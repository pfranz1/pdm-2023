var synth = new Tone.PolySynth();
var hasToneInit = false;

let sequence1, sequence2;

const AMinorScale = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const Cmajor = ['C','D','E','F','G','A','B'];

const Ebmajor = ['Eb4','F4','G4','Ab4','Bb4','C5','D5','Eb5'];

let melody = addOctaveNumbers(AMinorScale,4);

const IChord = constructMajorChord(AMinorScale, 4, 'A3');
// Output: ['A3', 'C4', 'E4']
// const VChord = constructMajorChord(AMinorScale, 4, 'E4');
const VChord = ["C3", "E3", "G3"];
// Output: ['E4', 'G4', 'B4']
const VIChord = constructMajorChord(AMinorScale, 3, 'F3');
// Output: ['F3', 'A3', 'C3']
const IVChord = constructMajorChord(AMinorScale, 3, 'D3');


const CChord = ["C3", "E3", "G3"];
const FChord = ["F2", "C3", "A3"];
const GChord = ["G2", "D3", "B3"];

const chordMap = {"IChord":IChord, "VChord":VChord,"VIChord":VIChord, "IVChord":IVChord};

var chain;

melody = IVChord;



function setup() {

  synth.toMaster();

  var playButton = new Nexus.RadioButton('#playButton',{
    'size': [120,25],
    'numberOfButtons': 1,
    'active': -1
  });

  var partFromFunction = null;

  let defaultToNeighbor = 0.3;
  let defaultToSelf = 0.1;

  var chain = new Tone.CtrlMarkov({
  "IChord": [{
    value: "IChord",
    probability: defaultToSelf
  }, {
    value: "IVChord",
    probability: defaultToNeighbor
  },
  {
    value: "VChord",
    probability: defaultToNeighbor
  },
  {
    value: "VIChord",
    probability: defaultToNeighbor
  }],
  "IVChord": [{
    value: "IChord",
    probability: defaultToNeighbor
  }, {
    value: "IVChord",
    probability: defaultToSelf
  },
  {
    value: "VChord",
    probability: defaultToNeighbor
  },
  {
    value: "VIChord",
    probability: defaultToNeighbor
  }],
  "VChord": [{
    value: "IChord",
    probability: defaultToNeighbor
  }, {
    value: "IVChord",
    probability: defaultToNeighbor
  },
  {
    value: "VChord",
    probability: defaultToSelf
  },
  {
    value: "VIChord",
    probability: defaultToNeighbor
  }],
  "VIChord": [{
    value: "IChord",
    probability: defaultToNeighbor
  }, {
    value: "IVChord",
    probability: defaultToNeighbor
  },
  {
    value: "VChord",
    probability: defaultToNeighbor
  },
  {
    value: "VIChord",
    probability: defaultToSelf
  }],
  });

  chain.value = "IVChord"


  sequence1 = new Tone.Sequence(function(time,note){
    synth.triggerAttackRelease(note,0.5);
  },melody,'4n');

  sequence2 = new Tone.Loop((time)=>{
    synth.triggerAttackRelease(chordMap[chain.next()],"2n",time)
    console.log(chain.value);
  },"1m");

  Tone.Transport.bpm.value = 150;

  Tone.Transport.start();

  playButton.on('change',(v) => {
      if(v != -1){
          // if(hasToneInit == false) {Tone.start(); hasToneInit = true};
          sequence2.start();
      } else {
        sequence2.stop();
      }    
  });
}

function draw() {
}

function addOctaveNumbers (scale, octaveNumber){
  return scale.map(note => {
    // Find Index of C or C# - this is the first note of an octave ( maybe ?)
    const firstOctaveNoteIndex = scale.indexOf('C') !== -1 ? scale.indexOf('C') : scale.indexOf('C#');
    // The note number should be 1 less than the passed parameter if it is before C, equal after
    const noteOctaveNumber = scale.indexOf(note) < firstOctaveNoteIndex ? octaveNumber - 1 : octaveNumber;
    return `${note}${noteOctaveNumber}`
  });
}

function constructMajorChord (scale, octave, rootNote) {
  const scaleWithOctave = addOctaveNumbers(scale, octave);

  const getNextChordNote = (note, nextNoteNumber) => {
    const nextNoteInScaleIndex = scaleWithOctave.indexOf(note) + nextNoteNumber - 1;
    let nextNote;
    if (typeof(scaleWithOctave[nextNoteInScaleIndex]) !== 'undefined') {
      nextNote = scaleWithOctave[nextNoteInScaleIndex];
    } else {
      nextNote = scaleWithOctave[nextNoteInScaleIndex - 7];
      const updatedOctave = parseInt(nextNote.slice(1)) + 1;
      nextNote = `${nextNote.slice(0,1)}${updatedOctave}`;
    }

    return nextNote;
  }

  const thirdNote = getNextChordNote(rootNote, 3)
  const fifthNote = getNextChordNote(rootNote, 5)
  const chord = [rootNote, thirdNote, fifthNote]

  return chord
}


function draw(){}


