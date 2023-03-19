class MusicManager{
    constructor(isMusicOn){
        this.isMusicOn = isMusicOn;
    }


    setup(){
        var playButton = new Nexus.RadioButton('#playButton',{
            'size': [120,25],
            'numberOfButtons': 1,
            'active': this.isMusicOn ? 0 : -1,
          });
    }
}