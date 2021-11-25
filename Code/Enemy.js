class Enemy extends Node {
    constructor(x,y,animation,sprite){
        super(x,y);
        this.sprite = sprite;
        this.life = 20;
        this.addChild(this.sprite);

        let collider = new Collider(0,0,8, ENEMIES_FLAG);
        collider.setMask(PLAYERS_FLAG);
        collider.onCollision = this.onCollision;
        this.addChild(collider);

        this.animationPlayer = animation;
        this.animationPlayer.target = this;
        this.animationPlayer.play();
        this.rotation = Math.PI;
    }

    update(deltaTime){
        this.animationPlayer.update(deltaTime);
        super.update(deltaTime)
        if(this.position.x + this.sprite.getSize().width < 0 ){
            this.isRemovable = true;
        }
    }

    takeDamages(amount){
        this.life -= amount;
        if (this.life <= 0){
            this.life = 0;
            this.isRemovable = true;
        }
    }

    onCollision(other){
        this.parent.isRemovable = true;
        other.parent.takeDamages(20);
    }
}

class Enemy1 extends Enemy{
    constructor(x,y, animation) {
        let sprt = new Sprite(AssetLoader.getInstance().getImage("enemy1"))
        sprt.setSpriteSheet(2, 1);
        sprt.addAnimation("Idle", [0, 1], 10);
        sprt.startAnimation("Idle");
        super(x,y,animation,sprt);
    }
}

const ENEMIES = {
    "Enemy1": Enemy1
}