class SpriteAnimationPlayer{
    constructor(target,loop = false){
        this.target = target;
        this.animations = [];
        this.currentAnimationID = 0;
        this.isPlaying = false;
        this.loop = loop;
    }

    update(deltaTime){
        
        if(this.animations.length == 0 || !this.isPlaying){ return; }

        let animation = this.animations[this.currentAnimationID];
        
        if(animation == null){ return; }

        animation.process(deltaTime, this.target);       
        if(animation.isFinished){
            this.currentAnimationID += 1;
            if( this.currentAnimationID == this.animations.length){
                if(!this.loop) {
                    this.isPlaying = false;
                }
                this.currentAnimationID = 0;
                this.animations[this.currentAnimationID].start(this.target);
            }else{
                this.animations[this.currentAnimationID].start(this.target);
            }
        }

    }

    play(){
        this.isPlaying = true;
    }

    pause(){
        this.isPlaying = false;
    }

    addAnimation(animation){
        this.animations.push(animation);
    }

    createSequence(animations){
        this.animations = [];
        animations.forEach(animation => {
            let newAnimation = new animation.cmd(animation.param[0]);
            this.addAnimation(newAnimation);
        });
    }
}