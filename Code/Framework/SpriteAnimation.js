

class SpriteAnimation{
    constructor(duration, name = "Idle"){
        this.name = name;
        this.duration = duration;
        this.isFinished = false;
        this.timer = duration;
    }

    process(deltaTime, target){
        if (this.finished) {
            return;
        }
        this.timer -= deltaTime;
        if(this.timer <= 0){
            this.isFinished = true;
        }
    }

    start(){
        this.isFinished = false;
        this.timer = this.duration;
    }

}

class Move extends SpriteAnimation{
    constructor(duration, speed = 100){
        super(duration,"Move");
        this.speed = speed;
    }

    process(deltaTime, target){
        if (this.finished) {
            return;
        }
        let direction = new Vector2(Math.cos(target.rotation),Math.sin(target.rotation))
        target.position = target.position.add(direction.mul(deltaTime * this.speed));
        super.process(deltaTime);
    }
}

class Turn extends SpriteAnimation{
    constructor(endAngle = 0, size = 2, speed = 100){
        super(2,"Turn");
        this.speed = speed;
        this.startAngle = 0;
        this.endAngle = degrees_to_radians(endAngle);
        this.currentAngle = 0;
        this.turnSize = size;
    }

    process(deltaTime, target){
        if (this.finished) {
            return;
        }
        if (this.endAngle >= 0){
            this.currentAngle +=  deltaTime * this.speed * this.turnSize  * (Math.PI/180);
            if(this.currentAngle >= this.endAngle){
                target.rotation = this.startAngle + this.endAngle;
                this.isFinished = true;
            }else {
                target.rotation += deltaTime * this.speed * this.turnSize  * (Math.PI/180);
                let direction = new Vector2(Math.cos(target.rotation),Math.sin(target.rotation))
                target.position = target.position.add(direction.mul(deltaTime * this.speed));
            }
        }else {
            this.currentAngle -=  deltaTime * this.speed * this.turnSize  * (Math.PI/180);
            if(this.currentAngle <= this.endAngle){
                target.rotation = this.startAngle + this.endAngle;
                this.isFinished = true;
            }else {
                target.rotation -= deltaTime * this.speed * this.turnSize  * (Math.PI/180);
                let direction = new Vector2(Math.cos(target.rotation),Math.sin(target.rotation))
                target.position = target.position.add(direction.mul(deltaTime * this.speed));
            }
        }
    
    }

    start(target){
        this.isFinished = false;
        this.timer = this.duration;
        this.startAngle = target.rotation;
        this.currentAngle = 0;
    }
}


const MOVES = {
    "Move": Move,
    "Turn": Turn
}