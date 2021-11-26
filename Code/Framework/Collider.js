const BULLETS_FLAG = 0x001
const PLAYERS_FLAG = 0x010
const ENEMIES_FLAG = 0x100

class Collider extends Node{
    constructor(x,y,radius, flag) {
        super(x, y);
        this.flag = flag;
        this.mask = 0;
        this.radius = radius;
        this.color = 'green'
        this.onCollision = null
        this.isRemovable = false;
    }

    setMask(bits){
        this.mask |= bits;
    }

    isCollide(otherCollider) {
        return this.getGlobalPosition().distance(otherCollider.getGlobalPosition()) < this.radius + otherCollider.radius
    }

    draw(context) {
        return;
        context.strokeStyle = this.color;
        context.beginPath();
        context.arc(this.getGlobalPosition().x, this.getGlobalPosition().y, this.radius, 0, 2 * Math.PI, true);
        context.stroke();
    }

}
