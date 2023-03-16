var synth = new Tone.PolySynth(3, Tone.Synth, {
  oscillator : {
    type : "sawtooth"
  }
});

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


// const CChord = ["C3", "E3", "G3"];
// const FChord = ["F2", "C3", "A3"];
// const GChord = ["G2", "D3", "B3"];


var chain;

melody = IVChord;

// const defaultChordProgression = [
//   ['IChordE', 10],
//   ['VChordE', 2],
//   ['IVChordE', 3],
//   ['VIChordE', 1],
//   ['FChord',1],
//   ['GChord',3],
//   ['AmChord',2],
// ];



// const IChordE = { nextChord: makeChooser(defaultChordProgression,"IChordE", 1), id:"IChordE",value:['A3', 'C4', 'E4']};
// const IVChordE = { nextChord: makeWeightedRandom(defaultChordProgression), id:"IVChordE",value:["G2", "D3", "B3"]};
// const VChordE = { nextChord: makeWeightedRandom(defaultChordProgression), id:"VChordE",value:["C3", "E3", "G3"]};
// const VIChordE = { nextChord: makeWeightedRandom(defaultChordProgression), id:"VIChordE",value:['F3', 'A3', 'C3']};
// const FChord = { nextChord: makeWeightedRandom(defaultChordProgression), id:"FChord",value:["F2", "C3", "A3"]};
// const GChord = { nextChord: makeWeightedRandom(defaultChordProgression), id:"GChord",value:["G2", "D3", "B3"]};
// const AmChord = { nextChord: makeWeightedRandom(defaultChordProgression), id:"AmChord",value:["A2", "C3", "E3"]};

// const chordsMap = {"IChordE":IChordE,"IVChordE":IVChordE,"VChordE":VChordE,"VIChordE":VIChordE,"FChord":FChord,"GChord":GChord,"AmChord":AmChord};


const balancedProgression = [['CChordE',1],
                             ['GChordE',1],
                             ['AmChordE',1],
                             ['FChordE',1],
                            ];

const CChordE = {nextChord:makeWeightedRandom([['CChordE',0],
                                              ['GChordE',2],
                                              ['AmChordE',1],
                                              ['FChordE',2],
                                              ]), id:"CChordE",value:['C4','E4','G4']};
const GChordE = {nextChord: makeWeightedRandom([['CChordE',1],
                                              ['GChordE',0],
                                              ['AmChordE',2],
                                              ['FChordE',2],
                                              ['EmChordE',3],
                                              ['restE',1],
                                              ]), id:"GChordE",value:['G3','B4','D4']};
const AmChordE = {nextChord: makeWeightedRandom([['CChordE',1],
                                              ['GChordE',2],
                                              ['AmChordE',0],
                                              ['FChordE',3],
                                              ['DChordE',1],
                                              ]), id:"AmChordE",value:['A4','C4','E4']};
const FChordE = {nextChord: makeWeightedRandom([['CChordE',2],
                                              ['GChordE',1],
                                              ['AmChordE',1],
                                              ['FChordE',0],
                                              ['restE',1],
                                              ]), id:"FChordE",value:['F3','A4','C4']};
                                              
const EmChordE = {nextChord: makeWeightedRandom([['CChordE',0],
                                                ['GChordE',0],
                                                ['AmChordE',1],
                                                ['FChordE',0],
                                                ['DChordE',1]
                                                ]), id:"EmChordE",value:['E3','G3','B4']};

const DChordE = {nextChord: makeWeightedRandom([['DChordE',0],
                                                ['GChordE',1],
                                                ['AmChordE',0],
                                                ['FChordE',0],
                                                ]), id:"DChordE",value:['D3','F#3','A4']};

const restE = {nextChord: makeWeightedRandom([['CChordE',1],
                                              ['GChordE',0],
                                              ['AmChordE',1],
                                              ['FChordE',0],
                                              ['DChordE',1],
                                              ]), id:"restE",value:[]};

const chordsMap = {'CChordE':CChordE,"GChordE":GChordE,"AmChordE":AmChordE,"FChordE":FChordE, "EmChordE":EmChordE,"DChordE":DChordE, "restE":restE};

function draw(){}

var currentChord;

function callNext(){
  currentChord = chordsMap[currentChord.nextChord()];

  return currentChord;
}



function setup() {

  // nextFun = makeWeightedRandom(fruits);
  currentChord = chordsMap["CChordE"];
  console.log(callNext());


  synth.toMaster();

  var playButton = new Nexus.RadioButton('#playButton',{
    'size': [120,25],
    'numberOfButtons': 1,
    'active': -1
  });

  sequence1 = new Tone.Sequence(function(time,note){
    synth.triggerAttackRelease(note,0.5);
  },melody,'4n');

  sequence2 = new Tone.Loop((time)=>{
    let next = callNext();
    synth.triggerAttackRelease(next.value,"2n",time)
    console.log(next.id);
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


function setValue(data, id, newVal,){
    dataCopy = [...data];
    
    let i = 0;
    // Linear search :D
    while (i < dataCopy.length){
      if(dataCopy[i][0] == id){
        dataCopy[i][1] = newVal;
        break;
      }
      i++;
    }
    
    return dataCopy;
}

function makeChooser(data, selfId, selfValue){
  return makeWeightedRandom(setValue(data,selfId,selfValue));
}


function makeWeightedRandom(data){
  function next(){
      //https://blobfolio.com/2019/randomizing-weighted-choices-in-javascript/
      const threshold = Math.random() * total;
  
     let runningTotal = 0;
      for (let i = 0; i < data.length - 1; ++i) {
      // Add the weight to our running total.
      runningTotal += data[i][1];
  
      // If this value falls within the threshold, we're done!
          if (runningTotal >= threshold) {
              return data[i][0];
          }
      }
  
      // Wouldn't you know it, we needed the very last entry!
      return data[data.length - 1][0];
  }

  var total = 0;
  for (let i = 0; i < data.length; ++i) {
      total += data[i][1];
  }

  return () => next();

}
