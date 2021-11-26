class Timer{
    constructor(duration, repeat = false, callback = function(timer){}){
        this.duration = duration;
        this.currentTime = duration;
        this.callback = callback;
        this.repeat = repeat;
        this.isFinished = false;
    }

    update(dt){
        if(this.isFinished){
            return;
        }

        this.currentTime -= dt;
        
        if(this.currentTime <= 0){
            this.callback(this);
            if(this.repeat){
                this.currentTime = this.duration;
            }else {
                this.isFinished = true;
            }
        }
    }

    stop(dt){
        this.isFinished = true;
    }
}