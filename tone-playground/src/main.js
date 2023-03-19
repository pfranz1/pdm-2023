var synth = new Tone.PolySynth(Tone.Synth, {
  oscillator : {
    type : "sawtooth"
  }
});

// create effects
var lowpassFilter = new Tone.AutoFilter();

const lowpassJSON = {
	"frequency" : 1,
	"type" : "sine",
	"depth" : 0.5,
	"baseFrequency" : 200,
	"octaves" : 2.6,
	"filter" : {
		"type" : "lowpass",
		"rolloff" : -12,
		"Q" : 1
	},
    "wet": 0.75
};

lowpassFilter.set(lowpassJSON);

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
                                              ]), id:"CChordE",value:['C3','C4','E4','G4','B5']};
const GChordE = {nextChord: makeWeightedRandom([['CChordE',1],
                                              ['GChordE',0],
                                              ['AmChordE',2],
                                              ['FChordE',2],
                                              ['EmChordE',3],
                                              ['restE',0],
                                              ]), id:"GChordE",value:['G2','G3','B4','D4','F4']};
const AmChordE = {nextChord: makeWeightedRandom([['CChordE',1],
                                              ['GChordE',2],
                                              ['AmChordE',0],
                                              ['FChordE',3],
                                              ['DChordE',1],
                                              ]), id:"AmChordE",value:['A3','A4','C4','E4','G4']};
const FChordE = {nextChord: makeWeightedRandom([['CChordE',2],
                                              ['GChordE',1],
                                              ['AmChordE',1],
                                              ['FChordE',0],
                                              ['restE',0],
                                              ]), id:"FChordE",value:['F2','F3','A4','C4','E4']};
                                              
const EmChordE = {nextChord: makeWeightedRandom([['CChordE',0],
                                                ['GChordE',0],
                                                ['AmChordE',1],
                                                ['FChordE',0],
                                                ['DChordE',1]
                                                ]), id:"EmChordE",value:['E2','E3','G3','B4','D4']};

const DChordE = {nextChord: makeWeightedRandom([['DChordE',0],
                                                ['GChordE',1],
                                                ['AmChordE',0],
                                                ['FChordE',0],
                                                ['CChordE',1],
                                                ]), id:"DChordE",value:['D2','D3','F#3','A4','C4']};

const restE = {nextChord: makeWeightedRandom([['CChordE',1],
                                              ['GChordE',0],
                                              ['AmChordE',1],
                                              ['FChordE',0],
                                              ['DChordE',1],
                                              ]), id:"restE",value:[]};

const chordsMap = {'CChordE':CChordE,"GChordE":GChordE,"AmChordE":AmChordE,"FChordE":FChordE, "EmChordE":EmChordE,"DChordE":DChordE, "restE":restE};

function draw(){}

var currentChord;

function getNextChord(){
  currentChord = chordsMap[currentChord.nextChord()];

  return currentChord;
}

var currentPattern;
var currentPatternRepeat;

const TTT = {next: makeWeightedRandom([
['TTT',0],
['TTF',1],
['TFT',2],
['TFF',0],
['FTT',2],
['FTF',0],
['FFT',0],
['FFF',0],
]), id:"TTT",value:[true,true,true]};
const TTF = {next: makeWeightedRandom([
['TTT',2],
['TTF',0],
['TFT',0],
['TFF',1],
['FTT',1],
['FTF',1],
['FFT',0],
['FFF',0],
]), id:"TTF",value:[true,true,false]};
const TFT = {next: makeWeightedRandom([
['TTT',2],
['TTF',0],
['TFT',0],
['TFF',1],
['FTT',1],
['FTF',0],
['FFT',1],
['FFF',0],
]), id:"TFT",value:[true,false,true]};
const TFF = {next: makeWeightedRandom([
['TTT',2],
['TTF',0],
['TFT',0],
['TFF',1],
['FTT',0],
['FTF',0],
['FFT',1],
['FFF',0],
]), id:"TFF",value:[true,false,false]};
const FTT = {next: makeWeightedRandom([
['TTT',2],
['TTF',2],
['TFT',2],
['TFF',0],
['FTT',0],
['FTF',0],
['FFT',0],
['FFF',1],
]), id:"FTT",value:[false,true,true]};
const FTF = {next: makeWeightedRandom([
['TTT',2],
['TTF',0],
['TFT',0],
['TFF',0],
['FTT',0],
['FTF',1],
['FFT',1],
['FFF',0],
]), id:"FTF",value:[false,true,false]};
const FFT = {next: makeWeightedRandom([
['TTT',0],
['TTF',1],
['TFT',0],
['TFF',0],
['FTT',2],
['FTF',0],
['FFT',0],
['FFF',1],
]), id:"FFT",value:[false,false,true]};
const FFF = {next: makeWeightedRandom([
['TTT',1],
['TTF',0],
['TFT',1],
['TFF',0],
['FTT',2],
['FTF',0],
['FFT',1],
['FFF',0],
]), id:"FFF",value:[false,false,false]};

const patternMap = {"TTT":TTT,"TTF":TTF,"TFT":TFT,"TFF":TFF,"FTT":FTT,"FTF":FTF,"FFT":FFT,"FFF":FFF};

function getNextPattern(){

  if(currentPatternRepeat > 0){
    currentPatternRepeat = currentPatternRepeat - 2;
  } else {
    currentPattern = patternMap[currentPattern.next()];
    currentPatternRepeat = random([1,1,1,1,1,2,2,2,2]);
  }

  return currentPattern;
};

const mainMelody = [
  {'time': 0, 'note': 'G4', 'duration': '8n'},
  {'time': '0:0:2', 'note': 'F4', 'duration': '8n'},
  {'time': '0:1', 'note': 'D4', 'duration': '8n.'},
  {'time': '0:2', 'note': 'D4', 'duration': '8n'},
  {'time': '0:2:2', 'note': 'F4', 'duration': '8n.'},
  {'time': '0:3', 'note': 'G4', 'duration': '8n'},
  {'time': '0:3:2', 'note': 'A4', 'duration': '2n'},
  {'time': '2:0', 'note': 'A4', 'duration': '8n'},
  {'time': '2:0:2', 'note': 'G4', 'duration': '8n'},
  {'time': '2:1', 'note': 'F4', 'duration': '8n'},
  {'time': '2:2', 'note': 'A4', 'duration': '8n'},
  {'time': '2:2:2', 'note': 'G4', 'duration': '8n'},
  {'time': '2:3', 'note': 'E4', 'duration': '8n'},
  {'time': '2:3:2', 'note': 'F4', 'duration': '2n'},
  {'time': '4:0', 'note': 'G4', 'duration': '8n'},
  {'time': '4:0:2', 'note': 'F4', 'duration': '8n'},
  {'time': '4:1', 'note': 'D4', 'duration': '8n'},
  {'time': '4:2', 'note': 'F4', 'duration': '8n'},
  {'time': '4:2:2', 'note': 'A4', 'duration': '8n'},
  {'time': '4:3', 'note': 'G4', 'duration': '8n'},
  {'time': '4:3:2', 'note': 'A4', 'duration': '2n'},
  {'time': '5:2:2', 'note': 'G4', 'duration': '8n'},
  {'time': '5:3', 'note': 'A4', 'duration': '8n'},
  {'time': '5:3:2', 'note': 'B4', 'duration': '8n'},
  {'time': '6:0', 'note': 'C5', 'duration': '8n'},
  {'time': '6:1', 'note': 'B4', 'duration': '8n'},
  {'time': '6:1:2', 'note': 'A4', 'duration': '8n'},
  {'time': '6:2', 'note': 'B4', 'duration': '8n'},
  {'time': '6:2:2', 'note': 'A4', 'duration': '8n'},
  {'time': '6:3', 'note': 'G4', 'duration': '8n'},
  {'time': '6:3:2', 'note': 'A4', 'duration': '1n'},
];

const melodySynth = new Tone.Synth({
  oscillator : {
    volume: 5,
    count: 3,
    spread: 40,
    type : "fatsawtooth"
  }
}).toMaster();

function setup() {

  // nextFun = makeWeightedRandom(fruits);


  synth.connect(lowpassFilter);
  lowpassFilter.toMaster();

  var playButton = new Nexus.RadioButton('#playButton',{
    'size': [120,25],
    'numberOfButtons': 1,
    'active': -1
  });

  sequence1 = new Tone.Sequence(function(time,note){
    synth.triggerAttackRelease(note,0.5);
  },melody,'4n');

  currentChord = chordsMap["CChordE"];
  currentPattern = patternMap["TTT"]

  sequence2 = new Tone.Loop((time)=>{
    console.log(`=======Chord at ${time}=======`)

    let next = getNextChord();

    let nextPattern = getNextPattern().value;
    console.log(nextPattern);

    let swapAtOne = nextPattern[0];
    let swapAtTwo = nextPattern[1];
    let swapAtThree = nextPattern[2];

    // Subdivide measure into four choices
    // Hard coded with love - if it was eight notes I would have figured out a better way
    if(swapAtOne){
      synth.triggerAttackRelease(next.value,"4n","+0"); 
      console.log("Chord",next.value,"D:4n" );
      next = getNextChord();
      if(swapAtTwo){
        synth.triggerAttackRelease(next.value,"4n","+4n");
        console.log("Chord",next.value, "D:4n" );

        next = getNextChord();
        if(swapAtThree){
          synth.triggerAttackRelease(next.value,"4n","+2n");
          console.log("Chord",next.value,"D:4n" );

          next = getNextChord();
          synth.triggerAttackRelease(next.value,"4n","+2n.");
          console.log("Chord",next.value, "D:4n" );

        } else {

          synth.triggerAttackRelease(next.value,"2n","+2n");
          console.log("Chord",next.value,"D:2n" );

        }
      } else {
          if(swapAtThree){
            console.log("Chord",next.value, "D:2n" );
            synth.triggerAttackRelease(next.value,"2n","+4n");
            next = getNextChord();
            console.log("Chord",next.value, "D:4n" );
            synth.triggerAttackRelease(next.value,"4n","+2n.");
          } else {
            console.log("Chord",next.value, "D:2n." );
            synth.triggerAttackRelease(next.value,"2n.","+4n");
          }
      }
    } else {
      if(swapAtTwo){
        console.log("Chord",next.value, "D:2n" );
        synth.triggerAttackRelease(next.value,"2n","+0");
        next = getNextChord();
        if(swapAtThree){
          console.log("Chord",next.value, "D:4n" );
          synth.triggerAttackRelease(next.value,"4n","+2n");
          next = getNextChord();
          console.log("Chord",next.value, "D:4n" );
          synth.triggerAttackRelease(next.value,"4n","+2n.");
        } else {
          console.log("Chord", next.value, "D:2n");
          synth.triggerAttackRelease(next.value,"2n","+2n");
        }
      } else {
        if(swapAtThree){
          console.log("Chord",next.value, "D:2n.");
          synth.triggerAttackRelease(next.value,"2n.","+0");
          console.log("Chord", next.value,"D:4n");
          synth.triggerAttackRelease(next.value,"4n","+2n.");
        } else{
          console.log("Chord" ,next.value,"D:1m");
          synth.triggerAttackRelease(next.value,"1m","+0");
        }
      }
    }
    // synth.triggerAttackRelease(next.value,"4n","+2n.")
    // console.log(next.id);
  },"1m");


  var mainMelodyPart = new Tone.Part(function(time, note) {
    melodySynth.triggerAttackRelease(note.note, note.duration, time);
  }, mainMelody);

  mainMelodyPart.loop = true;
  mainMelodyPart.loopEnd = "7m";

  Tone.Transport.bpm.value = 150;

  Tone.Transport.start();

  playButton.on('change',(v) => {
      if(v != -1){
          // if(hasToneInit == false) {Tone.start(); hasToneInit = true};
          sequence2.start();
          // mainMelodyPart.start();
      } else {
        sequence2.stop();
        // mainMelodyPart.stop();

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
