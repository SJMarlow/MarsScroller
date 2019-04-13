// Sebastian Marlow
// MarsScroller
// GamePlay

'use strict';

var GamePlay = function(game) {};
var player;
var asteroids;
var health;
var healthBar;
GamePlay.prototype = {

	preload: function(){
		// Load in assets for gameplay
		game.load.image('player', 'assets/img/spacepixels-0.1.0/pixel_ship_red.png');
		game.load.image('background', 'assets/img/background-purple.png');
		game.load.image('asteroid', 'assets/img/spacepixels-0.1.0/asteroid_grey.png');
		game.load.image('thruster', 'assets/img/spacepixels-0.1.0/thruster-4.png');
		game.load.image('healthBar', 'assets/img/spacepixels-0.1.0/horizontal_bar_red.png');

	},

	create: function(){
		// Add physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Create background and player
		var space = game.add.image(0, 0, 'background');
		space.scale.setTo(1.5, 2);

		player = game.add.sprite((game.world.width) / 2, (game.world.height) * 8.5 / 10, 'player');

		// Give the player physics, and keep them inside of the play area
		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;
		player.body.immovable = true;

		// Define pivot for player, the point which they will rotate around
		player.pivot.x = 50;
		player.pivot.y = 45;

		// Define the asteroids group
		asteroids = game.add.group();
		asteroids.enableBody = true;

		// Health shown in the top right
		health = 5;
		healthBar = game.add.image(50, 50, 'healthBar');
		healthBar.scale.setTo(health * 0.75, 1);


	},

	update: function(){
		// Get input from the Keyboard
		var cursors = game.input.keyboard.createCursorKeys();

		// Collision Test between asteroids and player
		game.physics.arcade.collide(player, asteroids, BOOM, null, this);

		// Resets the players angle when they aren't moving
		if (player.body.velocity.x < 30 && player.body.velocity.x > -30){
			player.rotation = 0;
		}

		// Test for player input
		if (cursors.left.isDown){
			// Move left and tilt left
			player.body.velocity.x = -200;
			player.rotation = -0.262;
		}

		else if (cursors.right.isDown){
			// Move right and tilt right
			player.body.velocity.x = 200;
			player.rotation = 0.262;
		}

		else{
			// Slow player down when not trying to move
			player.body.velocity.x = player.body.velocity.x * 97 / 100;
		}

		// Every tick there is a 1 percent chance that an asteroid will spawn
		if (Math.random() * 100 < 1){
			//Spawn an asteroid
			spawnAsteroid();
		}

	}
}

function spawnAsteroid(){
	// Spawn an asteroid at the top of the screen at a random X val
	var asteroid = asteroids.create(Math.random() * game.world.width, 0, 'asteroid');

	asteroid.rotation = Math.random() * Math.PI2;

	// Give the asteroid some velocity
	asteroid.body.velocity.y = Math.random() * (150) + 50;
}

function BOOM(player, asteroid){
	// Destroys asteroid and lowers players health by 1
	asteroid.kill();
	health -= 1;

	// Redraws healthBar
	healthBar.kill();
	healthBar = game.add.image(50, 50, 'healthBar');
	healthBar.scale.setTo(health * 0.75, 1);

	// Checks to see if player is dead
	if (health <= 0){
		// GameOver :(
		game.state.start('GameOver', true, true);
	}
}