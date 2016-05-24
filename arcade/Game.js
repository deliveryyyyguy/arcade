YungTut.Game = function(game) {
    
    this.sprite;
    this.bullets;
    
    this.fireRate;
    this.nextFire;
    
    this.totalSpacerocks;
    this.spacerockgroup;
    

};

YungTut.Game.prototype = {

    create: function() {
        
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.fireRate = 150;
        this.nextFire = 0;

        this.totalSpacerocks = 300;

        this.buildWorld();
        
    },
    
    buildWorld: function(){
        
        this.add.image(0, 0, 'sky');
        this.add.image(0, 800, 'ground');
        this.buildSprite();
        this.buildBullets();
        this.buildSpaceRocks();
    },
    
    buildSprite: function() {
        
        sprite = this.add.sprite(250, 800, 'arrow');
        sprite.anchor.set(0.5);      
        this.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.allowRotation = false;   
    },
    
    buildBullets: function() {
        
        this.bullets = this.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(50, 'bullet');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        
    },
    
    buildSpaceRocks: function() {
        this.spacerockgroup = this.add.group();
        for(var i=0; i<this.totalSpacerocks; i++) {
            var r = this.spacerockgroup.create(this.rnd.integerInRange(0, this.world.width), this.rnd.realInRange(-3000, 0), 'SpaceRock', 'SpaceRock0000');
            var scale = this.rnd.realInRange(0.5, 1.5);
            r.scale.x = scale;
            r.scale.y = scale;
            this.physics.enable(r, Phaser.Physics.ARCADE);
            r.enableBody = true;
            r.body.velocity.y = this.rnd.integerInRange(200, 400);
            r.animations.add('Fall');
            r.animations.play('Fall', 24, true);
            r.checkWorldBounds = true;
            r.events.onOutOfBounds.add(this.resetRock, this);
        }
    },
    
    
    resetRock: function(r) {
        if(r.y > this.world.height) {
            this.respawnRock(r);   
        }
    },
    
    respawnRock: function(r) {
        if(this.gameover == false){
            r.reset(this.rnd.integerInRange(0, this.world.width), this.rnd.realInRange(-1500, 0));
            r.body.velocity.y = this.rnd.integerInRange(200, 400);
        }
    },
    
    
    fire: function() {
        
       if (this.time.now > this.nextFire && this.bullets.countDead() > 0)
        {
            this.nextFire = this.time.now + this.fireRate;
            
            //changing to b
            
            var bullet = this.bullets.getFirstDead();
            
            bullet.reset(sprite.x - 8, sprite.y - 8);
            
            this.physics.arcade.moveToPointer(bullet, 600);
        }
        
    },
    
    burstCollision: function(r, b)  {
        if(r.exists){
            
            //this.respawnRock(r);
            
            r.kill();

        }
    },
    
 
    update: function() {
        
        this.physics.arcade.overlap(this.spacerockgroup, this.bullets, this.burstCollision, null, this);
        
        sprite.rotation = this.physics.arcade.angleToPointer(sprite);

        if (this.input.activePointer.isDown)
        {
            this.fire();
        }
        
    }
};