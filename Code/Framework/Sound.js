class Sound{
    constructor(src){
        this.soundObject = document.createElement("audio");
        this.soundObject.src = src;
        this.soundObject.setAttribute("preload", "auto");
        this.soundObject.setAttribute("controls", "none");
        this.soundObject.style.display = "none";
        document.body.appendChild(this.soundObject);
    }
    
    play(){
        this.soundObject.currentTime = 0;
        this.stop();
        this.soundObject.play();
    }

    stop() {
        this.soundObject.pause();
    }

    setVolume(volume){
        this.soundObject.volume = volume;
    }

    setLoop(loop = true){
        this.soundObject.loop = loop;
    }

}