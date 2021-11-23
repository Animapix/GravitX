class Vector2 {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    sub(vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    mul(value) {
        return new Vector2(this.x * value, this.y * value);
    }

    norm() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        let norm = this.norm();
        if(norm != 0){
            this.x /= norm;
            this.y /= norm;
        }
        return this;
    }

    distance(vector){
        let a = vector.x - this.x;
        let b = vector.y - this.y;
        return Math.sqrt( a*a + b*b );
    }
}

const DOWN = new Vector2(0, 1);
const UP = new Vector2(0, -1);
const RIGHT = new Vector2(1, 0);
const LEFT = new Vector2(-1, 0);
const DOWN_LEFT = DOWN.add(LEFT);
const DOWN_RIGHT = DOWN.add(RIGHT);
const UP_LEFT = UP.add(LEFT);
const UP_RIGHT = UP.add(RIGHT);