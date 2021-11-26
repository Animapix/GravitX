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
        this.scoring = 255;
        this.deadCallback = null;
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
            this.deadCallback();
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

class Enemy2 extends Enemy{
    constructor(x,y, animation) {
        let sprt = new Sprite(AssetLoader.getInstance().getImage("enemy2"));
        super(x,y,animation,sprt);
        this.life = 50;
        this.scoring = 500;
        this.shootTimer = 0.0;
        this.shootRate = 1;
    }

    update(deltaTime){
        super.update(deltaTime);
        if(this.shootTimer > 0){
            this.shootTimer -= deltaTime;
        }else{
            this.shoot();
        }
    }

    shoot(){
        if (this.shootTimer <= 0){
            let bulletSprite =  new Sprite(AssetLoader.getInstance().getImage("bullet2"));
            
            let angle = degrees_to_radians(rnd(200,160));
            let x = Math.cos(angle);
            let y = Math.sin(angle);
            let direction = new Vector2(x,y);
            let bullet = new Bullet(bulletSprite,direction,this.position.x,this.position.y,150,PLAYERS_FLAG);
            GAME.addNodeToCurrentScene(bullet,BULLETS_LAYER)
            this.shootTimer = this.shootRate;
        }
    }

}

const ENEMIES = {
    "Enemy1": Enemy1,
    "Enemy2": Enemy2
}