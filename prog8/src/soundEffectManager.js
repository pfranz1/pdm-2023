
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

    setup(){}

    doSideTap(){
        sounds.player("tap").start();
    }
}