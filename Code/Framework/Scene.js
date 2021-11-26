const LAYERS = 5;
const BACKGROUND_LAYER = 0;
const BULLETS_LAYER = 1;
const ENEMIES_LAYER = 2;
const PLAYER_LAYER = 3;
const GUI_LAYER = 4;

class Scene{
    constructor(){
        this.nodesLayers = [];
        this.colliders = [];
        this.timers = [];

        for (let i = 0; i < LAYERS; i++) {
            this.nodesLayers.push([]);
        }
    }

    addTimer(duration, repeat, callBack){
        this.timers.push(new Timer(duration,repeat,callBack));
    }

    addNode(node, layerID = 0) {
        this.nodesLayers[layerID].push(node);
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
        
    }

    keyDown(key){
    }

    update(dt){
        this.updateNodes(dt);
        this.updateColliders(dt);
        this.updateTimers(dt);
    }

    updateNodes(dt){
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
    }

    updateColliders(dt){
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

    updateTimers(dt){
        this.timers.forEach(timer => {
            timer.update(dt);
        });

        for (let i = this.timers.length - 1; i >= 0; i--) {
            const timer = this.timers[i];
            if(timer.isFinished){
                this.timers.splice(i, 1);
            }
        }
    }

    draw(ctx){
        this.nodesLayers.forEach(layer => {
            layer.forEach(node=> {
                node.draw(ctx);
            });
        });
    }

    getNodes(constructor){
        let result = []
        this.nodesLayers.forEach(nodes => {
            nodes.forEach(node => {
                if (node instanceof constructor) {
                    result.push(node);
                }
                node.children.forEach(child => {
                    if (child instanceof constructor) {
                        result.push(child);
                    }
                });
            });
        });

        return result;
    }

    unload(){
        this.nodesLayers = [];
        for (let i = 0; i < LAYERS; i++) {
            this.nodesLayers.push([]);
        }
        this.colliders = [];
        this.timers = [];
    }
}