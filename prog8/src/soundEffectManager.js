
let sounds = new Tone.Players({
    "low": "sounds/low.wav",
    "mid": "sounds/mid.wav",
    "high": "sounds/high.wav",
    "applause":"sounds/applause.wav",
    "tap":"sounds/lightTap.wav"
  });

sounds.toDestination();

class SoundEffectManager{
    sounds;

    tapLock = false;
    spacing = 0.1;

    setup(){}

    aquireTap(){
        if(this.tapLock){

        }
    }

    doSideTap(){
        try{
            sounds.player("tap").start("+0");
        } catch(error){
            // Expected output
            // "Start time must be strictly greater than previous start time"
            // console.log(error);
        }
    }
}