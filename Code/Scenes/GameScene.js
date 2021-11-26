class GameScene extends Scene{
    constructor(name){
        super(name);
        
        this.music = AssetLoader.getInstance().getSound("music");
        this.music.setLoop();
        this.music.setVolume(0.4);

        this.player = null;
        this.waves = [];
        this.gameOver = false;

        this.state = "Start";

        this.currentLevel = 1;
        this.score = 0;
        this.infoLabel  = null;
        this.scoreLabel = null;
    }

    load(){
        super.load();
        
        this.waves = [];
        this.gameOver = false;
        this.state = "Start";

        this.music.play();
        let assets = AssetLoader.getInstance();
        let backgroundX = SCREEN_WIDTH/2;
        let backgroundY = SCREEN_HEIGHT/2;
        this.addNode(new ScrollingBackground(assets.getImage("background-layer-1"),LEFT,100,backgroundX, backgroundY));
        this.addNode(new ScrollingBackground(assets.getImage("background-layer-2"),LEFT,115,backgroundX, backgroundY));
        this.addNode(new ScrollingBackground(assets.getImage("background-layer-3"),LEFT,130,backgroundX, backgroundY));

        this.player = new Player();
        this.player.gameOverCallback = (player)=> {
            player.isRemovable = true;
            this.state = "end";
            this.infoLabel.visible = true;
            this.infoLabel.text = "GAMEOVER";
            this.addTimer(4,false, (timer)=>{
                GAME.setScene("MainMenu");
            });
        };
        
        this.player.position = new Vector2(0,SCREEN_HEIGHT/2);
        this.addNode(this.player, PLAYER_LAYER);

        levelsData["level" + this.currentLevel].waves.forEach(waveJson => {

            let sequence = [];

            waveJson.sequence.forEach(cue => {
                sequence.push( {
                    cmd:MOVES[cue.cmd],
                    param:cue.param
                })
            });

            let newWave = {
                constr: ENEMIES[waveJson.enemy],
                amount: waveJson.amount,
                rate: waveJson.rate,
                delay: waveJson.delay,
                timer: 0,
                startPosition: new Vector2(waveJson.startPosition.x, waveJson.startPosition.y),
                sequence: sequence
            }

            this.waves.push(newWave);
            
        });
        
        this.infoLabel = new Label(0,0,400,240,"LEVEL " + this.currentLevel, "pixeled", 32 ,{r:255,g:255,b:255},ALIGN_TYPE.CENTER)
        this.addNode(this.infoLabel , GUI_LAYER);

        this.scoreLabel = new Label(0,0,400,20,this.score, "pixeled", 10 ,{r:255,g:255,b:255},ALIGN_TYPE.CENTER)
        this.addNode(this.scoreLabel , GUI_LAYER);
        this.scoreLabel.visible = false;
        

        this.addTimer(1,false, (timer)=>{
            this.state = "Game";
            this.infoLabel.visible = false;
            this.scoreLabel.visible = true;
        });
    }

    update(dt){

        if (this.getNodes(Enemy).length == 0 && this.waves.length == 0 && !this.gameOver  && this.getNodes(Player).length > 0){
            this.gameOver = true;
            this.currentLevel++;
            this.state == "End"
            if(this.currentLevel > 2){
                this.infoLabel.visible = true;
                this.infoLabel.text = "WINNER";
            }
            

            this.addTimer(4, false, (timer) => {
                if(this.currentLevel > 2){
                    GAME.setScene("MainMenu");
                    this.currentLevel = 1;
                }else{
                    GAME.setScene("Game");
                }
                
            });
        }

        super.update(dt);
        this.updateWaves(dt);
        
        if( this.state == "Start"){
            this.player.move(RIGHT);
        }else if (this.state == "Game") {
            this.updatePlayerControls(dt)
        }else if (this.state == "End") {
            this.player.move(RIGHT);
        }

    }

    updatePlayerControls(dt){
        
        // Move player
        let direction = new Vector2();
        if( KEYBOARD.isKeyDown(KEY_LEFT) ){
            direction = direction.add(LEFT);
        }
        if( KEYBOARD.isKeyDown(KEY_RIGHT) ){
            direction = direction.add(RIGHT);
        }
        if( KEYBOARD.isKeyDown(KEY_UP) ){
            direction = direction.add(UP);
        }
        if( KEYBOARD.isKeyDown(KEY_DOWN) ){
            direction = direction.add(DOWN);
        }

        if( KEYBOARD.isKeyDown(KEY_X) ){
            let bullet = this.player.shoot();
            if (bullet != null){
                this.addNode(bullet, BULLETS_LAYER)
            }
        }

        direction.normalize();
        this.player.move(direction);
    }

    updateWaves(dt){
        this.waves.forEach(wave => {
            // Wave delay is out, we can spawn enemies
            if(wave.delay <= 0){
                // Checking wave timer to spawn enemy
                if(wave.timer <= 0){
                    wave.timer = wave.rate;
                    wave.amount--;
                    // Create animation and spawn an enemy
                    let animation = new SpriteAnimationPlayer();
                    animation.createSequence(wave.sequence);
                    this.spawnEnemy(wave.constr,wave.startPosition.x ,wave.startPosition.y , animation );
                }else {
                    wave.timer -= dt; // Update timer
                }
            }else{
                wave.delay -= dt; // Update delay
            }
        });

        // Checking the waves to remove the ones that are finished
        for (let i = this.waves.length; i >= 0; i--) {
            const wave = this.waves[i];
            if( wave != null){
                if(wave.amount <= 0){
                    this.waves.splice(i,1);
                }
            }
        }
    }

    spawnEnemy(constructor,x,y,animation){
        let enemy = new constructor(x,y,animation);
        this.addNode(enemy,ENEMIES_LAYER);
        enemy.deadCallback = () => {
            this.score += enemy.scoring;
            this.scoreLabel.text = this.score;
        }
    }

    unload(){
        super.unload();
        //this.player = null;
        this.waves = [];
        this.gameOver = false;

        this.music.stop();
        
    }

}