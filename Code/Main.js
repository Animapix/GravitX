const CANVAS = document.getElementById("canvas");
const CONTEXT = canvas.getContext("2d");

const PIXEL_SCALE = 3;
const SCREEN_WIDTH = CANVAS.width / PIXEL_SCALE;
const SCREEN_HEIGHT = CANVAS.height / PIXEL_SCALE;

console.log("Screen size: " + SCREEN_WIDTH + "x" + SCREEN_HEIGHT);

const GAME = Game.getInstance();
var levelsData = null;

let lastUpdateTime = 0;

function run(time){

    requestAnimationFrame(run);
    let deltaTime = (time - lastUpdateTime) / 1000;
    lastUpdateTime = time;

    CONTEXT.clearRect(0, 0, canvas.width, canvas.height);
    CONTEXT.save();
    CONTEXT.scale(PIXEL_SCALE, PIXEL_SCALE);

    GAME.update(deltaTime);
    GAME.draw(CONTEXT);

    CONTEXT.restore();
}   

function loadLevels(jsonData){
    levelsData = JSON.parse(jsonData);
}

function loadGame(jsonData){
    
    var assets = JSON.parse(jsonData);

    assets.images.forEach(image => {
        GAME.addImage(image.name,image.path);
    });

    assets.sounds.forEach(sound => {
        GAME.addSound(sound.name,sound.path);
    });

    assets.fonts.forEach(font => {
        GAME.addFont(font.name,font.path);
    });

    GAME.loadAssets(function(){
        GAME.addScene("MainMenu", new MenuScene());
        GAME.addScene("Game", new GameScene());
        GAME.setScene("MainMenu");
    });

}

function init(){

    CONTEXT.imageSmoothingEnabled = false;
    CONTEXT.msImageSmoothingEnabled = false;
    CONTEXT.webkitImageSmoothingEnabled = false;
    CONTEXT.mozImageSmoothingEnabled = false;
    
    loadJSON("Data/Levels.json", loadLevels);
    loadJSON("Data/Assets.json", loadGame);

    requestAnimationFrame(run);
}



init();