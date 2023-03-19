/// Helper functions
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


/// Chord Progression chain

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

/// Pattern Chain



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



/// Synth declaration

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

let gainMax = 0.65;
let gainMin = 0.25;

let gainNode = new Tone.Gain(gainMax).toDestination();

lowpassFilter.set(lowpassJSON);

lowpassFilter.connect(gainNode);
synth.connect(lowpassFilter);

var hasToneInit = false;

class MusicManager{

    currentChord = chordsMap["CChordE"];

    mainLoop;

    constructor(isMusicOn){
        this.isMusicOn = isMusicOn;
    }

    getNextChord(){
        this.currentChord = chordsMap[this.currentChord.nextChord()];
      
        return this.currentChord;
    }
    
    currentPattern = patternMap["TTT"];
    currentPatternRepeat = 3;


    getNextPattern(){

        if(this.currentPatternRepeat > 0){
          this.currentPatternRepeat = this.currentPatternRepeat - 2;
        } else {
          this.currentPattern = patternMap[this.currentPattern.next()];
          this.currentPatternRepeat = random([1,1,1,1,1,2,2,2,2]);
        }
      
        return this.currentPattern; 
      };


    onUserTouch(){
        if(hasToneInit == false){
            Tone.Transport.start();
            hasToneInit = true;
        }
    }

    onGameEnd(){
      gainNode.gain.rampTo(gainMin,0.1);
    }

    onGameStart(){
      gainNode.gain.rampTo(gainMax,0.1);
    }


    setup(){
        // var playButton = new Nexus.RadioButton('#playButton',{
        //     'size': [120,25],
        //     'numberOfButtons': 1,
        //     'active': this.isMusicOn ? 0 : -1,
        //   });

        this.mainLoop = new Tone.Loop((time)=>{
            console.log(`=======Chord at ${time}=======`)
        
            let next = this.getNextChord();
        
            let nextPattern = this.getNextPattern().value;
            console.log(nextPattern);
        
            let swapAtOne = nextPattern[0];
            let swapAtTwo = nextPattern[1];
            let swapAtThree = nextPattern[2];
        
            // Subdivide measure into four choices
            // Hard coded with love - if it was eight notes I would have figured out a better way
            if(swapAtOne){
              synth.triggerAttackRelease(next.value,"4n","+0"); 
              console.log("Chord",next.value,"D:4n" );
              next = this.getNextChord();
              if(swapAtTwo){
                synth.triggerAttackRelease(next.value,"4n","+4n");
                console.log("Chord",next.value, "D:4n" );
        
                next = this.getNextChord();
                if(swapAtThree){
                  synth.triggerAttackRelease(next.value,"4n","+2n");
                  console.log("Chord",next.value,"D:4n" );
        
                  next = this.getNextChord();
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
                    next = this.getNextChord();
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
                next = this.getNextChord();
                if(swapAtThree){
                  console.log("Chord",next.value, "D:4n" );
                  synth.triggerAttackRelease(next.value,"4n","+2n");
                  next = this.getNextChord();
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

          Tone.Transport.bpm.value = 150;


        //   playButton.on('change',(v) => {
        //     if(v != -1){
        //         this.onUserTouch();
        //         this.mainLoop.start();
        //         // mainMelodyPart.start();
        //     } else {
        //         this.mainLoop.stop();
        //       // mainMelodyPart.stop();
      
        //     }    
        // });
    }

    onPlayMusicToggle(){
        if(this.isMusicOn){
            // stop playing music
            this.mainLoop.stop();
        } else {
            //start playing music
            this.onUserTouch();
            this.mainLoop.start();
        }

        this.isMusicOn = !this.isMusicOn;
    }
}