class MenuScene extends Scene{
    constructor(name){
        super(name);

        this.menu = new Menu(SCREEN_WIDTH/2 - 50,120, 100 ,20);
        this.menu.addItem("Start", this.start);

    }

    load(){
        
        this.addNode(this.menu, GUI_LAYER);
        this.addNode(new Label(0,0,400,100,"GRAVIT-X", "pixeled", 32 ,{r:255,g:255,b:255},ALIGN_TYPE.CENTER));
        this.addNode(new Label(0,140,400,100,"X - FIRE / SELECTION", "pixeled", 4 ,{r:255,g:255,b:255},ALIGN_TYPE.CENTER));
        this.addNode(new Label(0,160,400,100,"ARROWS - MOVES", "pixeled", 4 ,{r:255,g:255,b:255},ALIGN_TYPE.CENTER));
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

}