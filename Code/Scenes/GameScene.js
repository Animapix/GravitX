class GameScene extends Scene{
    constructor(name){
        super(name);
        
        this.music = AssetLoader.getInstance().getSound("music");
        this.music.setLoop();
        this.music.setVolume(0.4);

        this.player = new Player();
        

        this.waves = [];
    }

    load(){
        super.load();
        
        //this.music.play();
        let assets = AssetLoader.getInstance();
        let backgroundX = SCREEN_WIDTH/2;
        let backgroundY = SCREEN_HEIGHT/2;
        this.addNode(new ScrollingBackground(assets.getImage("background-layer-1"),LEFT,100,backgroundX, backgroundY));
        this.addNode(new ScrollingBackground(assets.getImage("background-layer-2"),LEFT,115,backgroundX, backgroundY));
        this.addNode(new ScrollingBackground(assets.getImage("background-layer-3"),LEFT,130,backgroundX, backgroundY));


        this.player.position = new Vector2(50,SCREEN_HEIGHT/2);
        this.addNode(this.player, PLAYER_LAYER);

        levelsData.level1.waves.forEach(waveJson => {
            new MOVES["Turn"];

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
        console.log("load");
        
    }

    update(dt){
        this.updateWaves(dt);
        this.updatePlayerControls(dt)
        super.update(dt);
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
    }

    unload(){
        this.music.stop();
    }

}