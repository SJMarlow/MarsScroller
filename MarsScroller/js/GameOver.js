// Sebastian Marlow
// MarsScroller
// GameOver

var GameOver = function(game) {};

GameOver.prototype = {

	preload: function(){
		// Load in img Assets
		game.load.image('background', 'assets/img/background-blue.png');
		game.load.image('gameOver', 'assets/img/gameOver.png');
		game.load.image('playButton', 'assets/img/playButton.png');
	},
	create: function(){
		// Add the background and scale it to fit
		var space = game.add.image(0, 0, 'background');
		space.scale.setTo(1.5, 2);
		// Add the title to the screen, centering it on X axis, and making it 1/3 from top in Y axis
		game.add.image((game.world.width - 331) / 2, (game.world.height - 139) / 3, 'gameOver');
		// Add play button
		game.add.button((game.world.width - 150) / 2, (game.world.height * 2) / 3, 'playButton', playPressed);
	}

}

function playPressed(){

	game.state.start('GamePlay', true, true);

}