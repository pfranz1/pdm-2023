let sounds = new Tone.Players({
    "splash": "sounds/splash.wav",
  });


let whiteNoiseOn = false;


// initialize the noise and start
const noise = new Tone.Noise("pink").start();

const gainNode = new Tone.Gain(0.0).toDestination();



// make an autofilter to shape the noise
const autoFilter = new Tone.AutoFilter({
	frequency: "8n",
	baseFrequency: 200,
	octaves: 8
});
// connect the noise
noise.connect(autoFilter);

autoFilter.connect(gainNode);
// start the autofilter LFO

noise.mute = false;






sounds.toDestination();

class SoundEffectManager{

    static doSplash(){
        
        sounds.player("splash").start("+0");
    }

    static toggleWhiteNoise(){
        whiteNoiseOn = !whiteNoiseOn;

        if(whiteNoiseOn){
            gainNode.gain.rampTo(0.5,1);
        }
        else {
            gainNode.gain.rampTo(0,1);

            // noise.mute = !whiteNoiseOn;

        }
    }
}