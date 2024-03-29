YungTut.Preloader = function(game)  {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
    
};

YungTut.Preloader.prototype = {
	
	preload: function () {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
        this.titleText = this.add.image(this.world.centerX, this.world.centerY-220, 'titleimage');
		this.titleText.anchor.setTo(0.5, 0.5);
        this.load.image('titlescreen', 'images/TitleBG.png');
        this.load.bitmapFont('eightbitwonder', 'fonts/eightbitwonder.png', 'fonts/eightbitwonder.fnt');
        this.load.image('ground', 'images/scorched_earth.png');
        this.load.image('sky', 'images/sky.png');
        
        this.load.atlasXML('SpaceRock', 'images/spritesheets/SpaceRock.png', 'images/spritesheets/SpaceRock.xml');
        
        this.load.image('arrow', 'images/arrow.png');
        this.load.image('bullet', 'images/purple_ball.png');
        
        //this.load.atlasXML('bunny', 'images/spritesheets/bunny.png', 'images/spritesheets/bunny.xml');
        //this.load.atlasXML('spacerock', 'images/spritesheets/SpaceRock.png', 'images/spritesheets/SpaceRock.xml');
        //this.load.image('explosion', 'images/explosion.png');
        //this.load.image('ghost', 'images/ghost.png');
	},

	create: function () {
		this.preloadBar.cropEnabled = false; //force show the whole thing
	},

	update: function () {
	   	this.ready = true;
        this.state.start('StartMenu');
        
    }
        

};