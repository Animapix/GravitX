var Game = (function () {
    var constructor = function () {

        this.update = function(dt){
        }

        this.draw = function(ctx){
        }

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