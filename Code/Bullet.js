class Bullet extends Node{
    constructor(sprite,direction,x,y,speed = 400, collisionFlag = ENEMIES_FLAG) {
        super(x,y);
        this.speed = speed;
        this.sprite = sprite;
        
        //this.sprite.setSpriteSheet(5, 7);
        //this.sprite.currentFrame = 11

        this.sprite.rotation = Math.PI/2;
        this.addChild(this.sprite);
        this.velocity = direction.mul(this.speed);

        let collider = new Collider(0,0,2, BULLETS_FLAG);
        collider.setMask(collisionFlag);
        collider.onCollision = this.onCollision;
        this.addChild(collider);
    }

    update(dt){
        this.position = this.position.add(this.velocity.mul(dt));
        if(this.position.x > SCREEN_WIDTH|| this.position.x < 0 || this.position.y > SCREEN_HEIGHT|| this.position.y < 0 ){
            this.isRemovable = true;
        }
    }

    onCollision(other){
        this.parent.isRemovable = true;
        other.parent.takeDamages(20);
    }
}