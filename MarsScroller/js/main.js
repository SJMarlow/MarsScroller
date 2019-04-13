// Sebastian Marlow
// Mars Scroller
// Main Menu

'use strict';

var game = new Phaser.Game(600, 800, Phaser.AUTO, 'phaser');


var MainMenu = function(game) {};

MainMenu.prototype = {

	preload: function(){
		// Load in img Assets
		game.load.image('background', 'assets/img/background-blue.png');
		game.load.image('title', 'assets/img/title.png');
		game.load.image('playButton', 'assets/img/playButton.png');
		//game.load.audioSprite('music', '') // Load in audio
	},
	create: function(){
		// Add the background and scale it to fit
		var space = game.add.image(0, 0, 'background');
		space.scale.setTo(1.5, 2);
		// Add the title to the screen, centering it on X axis, and making it 1/3 from top in Y axis
		game.add.image((game.world.width - 331) / 2, (game.world.height - 139) / 3, 'title');
		// Add play button
		game.add.button((game.world.width - 150) / 2, (game.world.height * 2) / 3, 'playButton', playPressed);
	}

}

function playPressed(){

	game.state.start('GamePlay', true, true);

}

game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');