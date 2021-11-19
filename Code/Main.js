const CANVAS = document.getElementById("canvas");
const CONTEXT = canvas.getContext("2d");

const PIXEL_SCALE = 3;
const SCREEN_WIDTH = CANVAS.width / PIXEL_SCALE;
const SCREEN_HEIGHT = CANVAS.height / PIXEL_SCALE;

const game = Game.getInstance();

let lastUpdateTime = 0;

function run(time){
    requestAnimationFrame(run);
    let deltaTime = (time - lastUpdateTime) / 1000;
    lastUpdateTime = time;

    CONTEXT.clearRect(0, 0, canvas.width, canvas.height);
    CONTEXT.save();
    CONTEXT.scale(PIXEL_SCALE, PIXEL_SCALE);
    
    game.update(deltaTime);
    game.draw(CONTEXT);

    CONTEXT.restore();
}   

function init(){
    CONTEXT.imageSmoothingEnabled = false;
    CONTEXT.msImageSmoothingEnabled = false;
    CONTEXT.webkitImageSmoothingEnabled = false;
    CONTEXT.mozImageSmoothingEnabled = false;

    requestAnimationFrame(run);
}

init();