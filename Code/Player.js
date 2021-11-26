class Player extends Node{
    constructor(x,y) {
        super(x,y);
        this.lifes = 3;
        this.velocity = new Vector2();
        this.speed = 200;
        this.sprite = new Sprite(AssetLoader.getInstance().getImage("ship"),0,0);
        this.addChild(this.sprite);

        let collider = new Collider(0,0,8, PLAYERS_FLAG);
        this.addChild(collider);

        this.shootTimer = 0.0;
        this.shootRate = 0.10;

        this.gameOverCallback = null;
    }

    move(direction){
        this.velocity = direction.mul(this.speed)
    }

    update(dt){
        this.position = this.position.add(this.velocity.mul(dt));
        this.checkOutOfScreen();
        this.updateChildren(dt);

        if(this.shootTimer > 0){
            this.shootTimer -= dt;
        }
    }

    checkOutOfScreen(){
        let size = this.sprite.getSize()
        size.width -= 10
        size.height -= 12
        if(this.position.x + size.width / 2 > SCREEN_WIDTH){
            this.velocity.x = 0;
            this.position.x = SCREEN_WIDTH - size.width / 2;
        }else if(this.position.x - size.width / 2 < 0){
            this.velocity.x = 0;
            this.position.x = 0 + size.width / 2;
        }

        if (this.position.y + size.height / 2 > SCREEN_HEIGHT ){
            this.velocity.y = 0;
            this.position.y = SCREEN_HEIGHT - size.height / 2;
        }else if(this.position.y - size.height / 2 < 0 ){
            this.velocity.y = 0;
            this.position.y = 0 + size.height / 2;
        }
    }

    takeDamages(amount){
        this.lifes--;
        if(this.lifes <= 0){
            this.gameOverCallback(this);
        }
    }


    shoot(){
        if (this.shootTimer <= 0){
            AssetLoader.getInstance().getSound("laserShoot").play();
            let bulletSprite =  new Sprite(AssetLoader.getInstance().getImage("bullet1"));
            let bullet = new Bullet(bulletSprite,RIGHT,this.position.x,this.position.y);
            this.shootTimer = this.shootRate;
            return bullet;
        }
        return null;
    }
}