const KEYBOARD = Keyboard.getInstance();

var Game = (function () {
    var constructor = function () {

        let scenes = []
        let currentScene = null;
        let assetLoader = AssetLoader.getInstance();

        this.keyDown = function(key){
            if(currentScene != null){
                currentScene.keyDown(key);
            }
        }

        this.update = function(dt){
            if(currentScene != null){
                currentScene.update(dt);
            }
        }

        this.draw = function(ctx){
            if(currentScene != null && assetLoader.isCompleted()){
                currentScene.draw(ctx);
            }else {
                drawSpashScreen(ctx,assetLoader.getLoadedRatio());
            }
        }

        this.addScene = function(sceneName, scene){
            scenes[sceneName] = scene;
        }

        this.setScene = function(sceneName){
            if(currentScene != null){
                currentScene.unload();
            }
            currentScene = scenes[sceneName];
            currentScene.load();
        }

        this.addImage = function(name, path){
            assetLoader.addImage(name,path);
        }

        this.addSound = function(name, path){
            assetLoader.addSound(name,path);
        }

        this.addFont = function(name, path){
            assetLoader.addFont(name,path);
        }

        this.loadAssets = function(callBack){
            assetLoader.load(callBack);
        }

        function drawSpashScreen(ctx, ratio) {
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillRect(1, 1, 400, 100);
            ctx.fillStyle = "rgb(0,255,0)";
            ctx.fillRect(1, 1, 400 * ratio, 100);
            ctx.fillStyle = "rgb(255,255,255)";
        }

        KEYBOARD.setCallBack(this.keyDown);
	}
	
	var instance = null;
	return new function() {
		this.getInstance = function() {
			if (instance == null) {
                instance = new constructor();
                instance.constructor = null;
			}

			return instance;
		}
	}
})();