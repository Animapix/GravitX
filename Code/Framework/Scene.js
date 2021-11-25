const LAYERS = 4;
const BACKGROUND_LAYER = 0;
const BULLETS_LAYER = 1;
const ENEMIES_LAYER = 2;
const PLAYER_LAYER = 3;

class Scene{
    constructor(){
        this.nodesLayers = [];
        this.colliders = [];
    }

    addNode(node, layerID = 0) {
        this.nodesLayers[layerID].push(node)
        if (node instanceof Collider) {
            this.colliders.push(node);
        }
        node.children.forEach(child => {
            if (child instanceof Collider) {
                this.colliders.push(child);
            }
        });
    }

    load() {
        for (let i = 0; i < LAYERS; i++) {
            this.nodesLayers.push([]);
        }
    }

    keyDown(key){
    }

    update(dt){
        this.nodesLayers.forEach(layer => {

            for (let i = layer.length - 1; i >= 0; i--) {
                const node = layer[i];
                if(node.isRemovable){
                    node.children.forEach(child => {
                        child.isRemovable = true;
                    });
                    layer.splice(i, 1);
                }
            }

            layer.forEach(node => {
                node.update(dt);
            });
        });




        for (let i = this.colliders.length - 1; i >= 0; i--) {
            const collider = this.colliders[i];
            if(collider.isRemovable){
                this.colliders.splice(i, 1);
            }
        }

        this.colliders.forEach(colliderA => {
            this.colliders.forEach(colliderB => {
                if (colliderA != colliderB && (colliderA.mask & colliderB.flag) != 0) {
                    if (colliderA.isCollide(colliderB)){
                        if(colliderA.onCollision != null){
                            colliderA.onCollision(colliderB);
                        }
                    }
                }
            });
        });
    }

    draw(ctx){
        this.nodesLayers.forEach(layer => {
            layer.forEach(node => {
                node.draw(ctx);
            });
        });
    }

    unload(){
        this.nodesLayers = [];
    }
}