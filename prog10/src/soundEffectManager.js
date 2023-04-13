
let sounds = new Tone.Players({
    "low": "sounds/low.wav",
    "mid": "sounds/mid.wav",
    "high": "sounds/high.wav",
    "applause":"sounds/applause.wav",
    "tap":"sounds/lightTap.wav",
    "splash":"sounds/big-splash.wav",
    "death":"sounds/final-squeak.wav",
    "escape":"sounds/escape-squeak.wav"
  });

sounds.toDestination();

class SoundEffectManager{
    sounds;

    tapLock = false;

    setup(){}


    doSideTap(){
        try{
            sounds.player("tap").start("+0");
        } catch(error){
            // Expected output
            // "Start time must be strictly greater than previous start time"
            // console.log(error);
        }
    }

    doSplash(){
        sounds.player("splash").start("+0");
    }


    doDeathSound(){
        try{
            sounds.player("death").start("+0");
        } catch(error){
            // Expected output
            // "Start time must be strictly greater than previous start time"
            // console.log(error);
        }
    }

    doEscapeSound(){
        try{
            sounds.player("escape").start("+0");
        } catch(error){
            // Expected output
            // "Start time must be strictly greater than previous start time"
            // console.log(error);
        }
    }
}