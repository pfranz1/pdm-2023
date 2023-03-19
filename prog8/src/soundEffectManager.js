


class SoundEffectManager{
    sounds;

    setup(){
        this.sounds = new Tone.Players({
            "tap": "sounds/dull-tap.wav",  
          });
        
          this.sounds.toDestination();
    }

    doSideTap(){

        this.sounds.player("tap").start();
    }
}