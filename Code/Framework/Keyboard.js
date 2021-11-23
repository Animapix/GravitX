const KEY_LEFT = "ArrowLeft";
const KEY_RIGHT = "ArrowRight";
const KEY_UP = "ArrowUp";
const KEY_DOWN = "ArrowDown";
const KEY_X = "KeyX";

// Pattern singleton
// Use https://keycode.info/ to get key code
var Keyboard = (function () {
    var constructor = function () {

        var keys = [];
        var keyDownCallback = null; 
        
        this.setCallBack = function(callBack){
            keyDownCallback = callBack;
        }

        this.isKeyDown = function (key) {
            if (keys[key] == null) {
                return false
            }
            return keys[key];
		}
		
        var keyDown = function (t) {
            keys[t.code] = true;
            t.preventDefault();
            if (keyDownCallback != null){
                keyDownCallback(t.code);
            }
        }
        
        var keyUp = function (t) {
            keys[t.code] = false;
            t.preventDefault();
        }


        
		document.addEventListener("keydown", keyDown, false);
        document.addEventListener("keyup", keyUp, false);
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