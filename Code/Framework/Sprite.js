class Sprite extends Node {
    constructor(img,x,y) {
        super(x, y);
        this.img = img;
        this.scale = {x:1,y:1};
        this.splitH = 1;
        this.splitV = 1;
        this.currentFrame = 0;
        this.animations = [];
        this.currentAnimation = null;
    }

    setSpriteSheet(splitH, splitV) {
        this.splitH = splitH;
        this.splitV = splitV;
    }

    addAnimation(name, frames, frameRate = 60, loop = true, callBack) {
        let animation = {
            name: name,
            frames: frames,
            frameRate: frameRate,
            currentFrame: 0,
            loop: loop,
            isPlaying: false,
            callBack: callBack
        };
        this.animations[name] = animation;
    }

    startAnimation(name) {
        if (this.currentAnimation != null){
            if (this.currentAnimation.name == name) {
                return;
            }
        }
        if (this.animations[name] != null) {
            this.currentAnimation = this.animations[name];
            this.currentFrame = 0;
            this.currentAnimation.isPlaying = true;
        }
    }

    updateAnimation(deltaTime) {
       
        if (this.currentAnimation != null && this.currentAnimation.isPlaying) {
            this.currentFrame += deltaTime * this.currentAnimation.frameRate;
            if (this.currentFrame > this.currentAnimation.frames.length) {
                if (this.currentAnimation.loop) {
                    this.currentFrame = 0;
                } else {
                    this.currentFrame = this.currentAnimation.frames[this.currentAnimation.frames.length - 1];
                    this.currentAnimation.isPlaying = false;
                    if (this.currentAnimation.callBack != null) {
                        this.currentAnimation.callBack(this, this.currentAnimation);
                    }
                }
            }

        }
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.updateAnimation(deltaTime);
    }

    draw(context) {
        context.save();
        let destinationWidth = this.img.width * this.scale.x;
        let destinationHeight = this.img.height * this.scale.y;
        let x = this.getGlobalPosition().x
        let y = this.getGlobalPosition().y

        if (this.splitH == 1 && this.splitV == 1) {
            context.translate(x, y);
            context.rotate(this.getGlobalRotation());
            context.drawImage(this.img, - destinationWidth / 2 , - destinationHeight / 2,  destinationWidth,  destinationHeight);
        } else {
            let quad = this.getQuad(Math.floor(this.currentFrame));
            if (this.currentAnimation != null) {
                quad = this.getQuad(this.currentAnimation.frames[Math.floor(this.currentFrame)]);
            }
            destinationWidth = quad.width * this.scale.x;
            destinationHeight = quad.height * this.scale.y;
            x = this.getGlobalPosition().x
            y = this.getGlobalPosition().y 
            context.translate(x, y);
            context.rotate(this.getGlobalRotation());
            context.drawImage(this.img, quad.x, quad.y, quad.width, quad.height,  - destinationWidth / 2 ,- destinationHeight / 2, destinationWidth, destinationHeight);
        }
        context.restore();
        super.draw(context);
    }

    getQuad(frame) {
        let row = Math.ceil((frame + 1) / this.splitH);
        let column = (frame + 1) - row * this.splitH + this.splitH;
        let width = this.img.width / this.splitH;
        let height = this.img.height / this.splitV;
    
        let x = (column - 1) * width;
        let y = (row - 1) * height;
    
        return { x: x, y: y, width: width, height: height };
    }

    getSize(){
        let width = this.img.width / this.splitH;
        let height = this.img.height / this.splitV;
        return {width:width, height:height};
    }
}