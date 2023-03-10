
let hasToneInit = false;

function setup(){
    var playButton = new Nexus.RadioButton('#playButton',{
        'size': [120,25],
        'numberOfButtons': 1,
        'active': -1
      });

    playButton.on('change',(v) => {
        if(v > -1){
            if(hasToneInit == false) {Tone.start(); hasToneInit = true};
            Tone.Transport.start();
        }else {
            Tone.Transport.stop();
        }    
    });
}


const synth = new Tone.Synth().toDestination();
synth.triggerAttackRelease('C4', '8n')

function draw(){}


