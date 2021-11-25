class Node {
    constructor(x,y){
        this.position = new Vector2(x,y);
        this.rotation = 0;
        this.parent = null;
        this.children = [];
        this.isRemovable = false;
    }

    update(dt) {
        this.updateChildren(dt);
    }

    updateChildren(dt){
        this.children.forEach(child => {
            child.update(dt);
        });
    }

    draw(ctx) {
        this.drawChildren(ctx);
    }

    drawChildren(ctx){
        this.children.forEach(child => {
            child.draw(ctx);
        });
    }

    addChild(child){
        child.parent = this;
        this.children.push(child);
    }

    getGlobalPosition() {
        if (this.parent != null) {
            let parentGlobalPosition = this.parent.getGlobalPosition();
            let x = parentGlobalPosition.x + this.position.norm() * Math.cos(this.parent.getGlobalRotation() + Math.atan2(this.position.y,this.position.x))
            let y = parentGlobalPosition.y + this.position.norm() * Math.sin(this.parent.getGlobalRotation() + Math.atan2(this.position.y,this.position.x))
            return new Vector2(x, y);
        } else {
            return this.position;
        }
    }

    getGlobalRotation() {
        return this.parent != null ? this.rotation + this.parent.getGlobalRotation() : this.rotation;
    }
}