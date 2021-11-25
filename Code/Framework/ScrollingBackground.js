class ScrollingBackground extends Node {
    constructor(image, direction, speed, x, y) {
        super(x,y);
        this.image = image;
        this.scale = {x:1,y:1};
        this.direction = direction;
        this.speed = speed;
        this.scrollPosition = new Vector2();
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.scrollPosition = this.scrollPosition.add(this.direction.mul(this.speed).mul(deltaTime));
        
        let x = this.direction.x * this.image.width
        let y = this.direction.y * this.image.height

        if(x < 0 &&  this.scrollPosition.x - this.position.x < x){
            this.scrollPosition.x -= x;
        } else if (x > 0 &&  this.scrollPosition.x + this.position.x > x) {
            this.scrollPosition.x -= x;
        }

        if(y < 0 &&  this.scrollPosition.y - this.position.y < y){
            this.scrollPosition.y -= y;
        } else if (y > 0 &&  this.scrollPosition.y + this.position.y > y) {
            this.scrollPosition.y -= y;
        }

    }

    draw(context) {
        let destinationWidth = this.image.width * this.scale.x;
        let destinationHeight = this.image.height * this.scale.y;
        let x = this.position.x + this.scrollPosition.x
        let y = this.position.y + this.scrollPosition.y
        
        context.drawImage(this.image, x - destinationWidth / 2, y - destinationHeight / 2, destinationWidth, destinationHeight);

        let directions = [UP, DOWN, LEFT, RIGHT, UP_LEFT, UP_RIGHT, DOWN_LEFT, DOWN_RIGHT];
        
        directions.forEach(dir => {
            context.drawImage(this.image, x - destinationWidth / 2 + dir.x * this.image.width, y - destinationHeight / 2 + dir.y * this.image.height,  destinationWidth,  destinationHeight);
        });
    }
}