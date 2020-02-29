var spaceShooterStartingXCoordinate = 100;
var spaceShooterStartingYCoordinate = 100;
var spaceShooterPlayerSpeed = 15;

var spaceShooterLetterSpawnRate = 2000;
var spaceShooterLetterColor = 'red';

function spaceShooterGameClass() {
	this.name = 'spaceShooter';
	let gameIsPlaying = false;
	//shots section
	var arrayOfBullets = [];
	var bulletDimensionX = 4;
	var bulletDimensionY = 4;
	var bulletSpeed = 7;

	this.frameRate = 1000/30;

	this.isPlaying = function() {
		return gameIsPlaying;
	};

	this.initialize = function()
	{
		gameInterval.reset(this.frameRate);
	};

	this.startPlaying = function()
	{
		gameIsPlaying = true;
	};

	this.stopPlaying = function()
	{
		gameIsPlaying = false;
	};

	this.update = function()
	{
		this.movePlayer();
		this.moveBullets();
	};

	this.moveBullets = function()
	{
		for (var bulletIndex = 0; bulletIndex < arrayOfBullets.length; bulletIndex++)
		{
			arrayOfBullets[bulletIndex].x+=bulletSpeed;
		}
	}

	this.draw = function()
	{
		this.drawBackground();
		this.drawPlayer();
		this.drawBullets();
	};

	this.drawBullets = function()
	{
		gameCanvasContext.fillStyle = 'white';
		for (var bulletIndex = 0; bulletIndex < arrayOfBullets.length; bulletIndex++)
		{
			gameCanvasContext.fillRect(arrayOfBullets[bulletIndex].x,arrayOfBullets[bulletIndex].y,
									   bulletDimensionX,bulletDimensionY);
		}
	}

	this.drawBackground = function() {
		gameCanvasContext.fillStyle = 'black';
		gameCanvasContext.fillRect(0,0, 640,700);
	};

	this.drawPlayer = function() {
		gameCanvasContext.fillStyle = 'white';
		gameCanvasContext.fillRect(gameClassManager.currentGame.playerCharacter.x,gameClassManager.currentGame.playerCharacter.y, 20,20);
	};

	this.movePlayer = function() {
		if (inputManager.upArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.y -= spaceShooterPlayerSpeed;
		}
		if (inputManager.rightArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.x += spaceShooterPlayerSpeed;
		}
		if (inputManager.downArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.y += spaceShooterPlayerSpeed;
		}
		if (inputManager.leftArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.x -= spaceShooterPlayerSpeed;
		}
	};

	this.handleSpaceBarDown = function()
	{
		arrayOfBullets.push({x:gameClassManager.currentGame.playerCharacter.x,y:gameClassManager.currentGame.playerCharacter.y});
	}
};

const spaceShooterGame = new spaceShooterGameClass();
