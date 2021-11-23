const ASSET_TYPE = {
    IMAGE: "image",
    SOUND: "sound",
    FONT: "font"
}

var AssetLoader = (function () {
    var constructeur = function () {

        var assets = [];
        var images = [];
        var sounds = [];
        var callBack = null;
        var loadedAssets = 0;
        
        var isCompleted = false;
        
        this.addImage = function (name,path) {
            add(name, path, ASSET_TYPE.IMAGE);
        }

        this.addSound = function (name, path) {
            add(name, path, ASSET_TYPE.SOUND);
        }

        this.addFont = function (name, path) {
            add(name, path, ASSET_TYPE.FONT);
        }

        this.getImage = function(name){
            return images[name];
        }

        this.getSound = function(name){
            return sounds[name];
        }

        this.getTotalAssets = function() {
            return assets.length;
        }

        this.getTotalLoadedAssets = function() {
            return loadedAssets;
        }

        this.getLoadedRatio = function () {
            return loadedAssets / assets.length ;
        }

        this.load = function(cb){
            callBack = cb;
            assets.forEach(asset => {
                if (asset.type == ASSET_TYPE.IMAGE) {
                    let image = new Image();
                    image.src = asset.path;
                    image.onload = assetLoaded;
                    images[asset.name] = image;
                } else if (asset.type == ASSET_TYPE.SOUND) {
                    let snd = new Sound(asset.path);
                    assetLoaded();
                    sounds[asset.name] = snd;
                } else if (asset.type == ASSET_TYPE.FONT) {
                    let newFont = new FontFace(asset.name, 'url(' + asset.path + ')');
                    newFont.load().then(function(font){
                        document.fonts.add(font);
                        assetLoaded();
                    });
                }
            });
        }

        this.isCompleted = function(){
            return isCompleted;
        }

        var assetLoaded = function(e){
            loadedAssets++;
            if (loadedAssets == assets.length) {
                isCompleted = true;
                console.log("Assets loaded");
                if(callBack != null){
                    callBack();
                }
            }
        }

        var add = function (name, path, type) {
            assets.push({
                name: name,
                path: path,
                type: type
            });
        }

	}
	
	var instance = null;
	return new function() {
		this.getInstance = function() {
			if (instance == null) {
                instance = new constructeur();
                instance.constructeur = null;
			}
			
			return instance;
		}
	}
})();