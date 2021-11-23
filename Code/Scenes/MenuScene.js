class MenuScene extends Scene{
    constructor(name){
        super(name);

        this.menu = new Menu(SCREEN_WIDTH/2 - 50,120, 100 ,20);
        this.menu.addItem("Start", this.start);
    }

    keyDown(key){

        switch (key) {
            case KEY_DOWN:
                this.menu.next();
                break;
            case KEY_UP:
                this.menu.previous();
                break;
            case KEY_X:
                this.menu.select();
                break;
        
            default:
                break;
        }

    }

    start(){
        GAME.setScene("Game");
    }

    draw(ctx){
        this.menu.draw(ctx);
    }
}