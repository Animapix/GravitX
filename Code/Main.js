const CANVAS = document.getElementById("canvas");
const CONTEXT = canvas.getContext("2d");

const PIXEL_SCALE = 3;
const SCREEN_WIDTH = CANVAS.width / PIXEL_SCALE;
const SCREEN_HEIGHT = CANVAS.height / PIXEL_SCALE;

const GAME = Game.getInstance();

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

function init(){
    CONTEXT.imageSmoothingEnabled = false;
    CONTEXT.msImageSmoothingEnabled = false;
    CONTEXT.webkitImageSmoothingEnabled = false;
    CONTEXT.mozImageSmoothingEnabled = false;
    
    GAME.addScene("MainMenu", new MenuScene());
    GAME.addScene("Game", new GameScene());
    GAME.setScene("MainMenu");
            
    GAME.addImage("ship","Assets/Images/ship.png")
    GAME.addImage("enemy1", "Assets/Images/enemy-1.png")
    GAME.addImage("enemy2", "Assets/Images/enemy-2.png")
    GAME.addImage("background-layer-1", "Assets/Images/Background-layer-1.png")
    GAME.addImage("background-layer-2", "Assets/Images/Background-layer-2.png")
    GAME.addImage("background-layer-3", "Assets/Images/Background-layer-3.png")
    GAME.addImage("bullet1", "Assets/Images/bullet-1.png")
    GAME.addImage("bullet2", "Assets/Images/bullet-2.png")

    GAME.addSound("music", "Assets/Sounds/Revenge MissionREM.wav");
    GAME.addSound("laserShoot", "Assets/Sounds/laserShoot.wav");

    GAME.addFont('pixeled', 'Assets/Fonts/Pixeled.ttf')

    GAME.loadAssets();
    
    requestAnimationFrame(run);
}

init();