class GameScene extends Scene{
    constructor(name){
        super(name);
    }

    load(){
        super.load();
        let music = AssetLoader.getInstance().getSound("music")
        music.setLoop();
        music.setVolume(0.4);
        music.play();
    }

    keyDown(key){

        switch (key) {
            case KEY_X:
                GAME.setScene("MainMenu");
                break;
        
            default:
                break;
        }

    }

    update(dt){
        //console.log("update");
    }

    draw(ctx){
        //console.log("draw");
    }

    unload(){
        let music = AssetLoader.getInstance().getSound("music")
        music.stop();
    }
}