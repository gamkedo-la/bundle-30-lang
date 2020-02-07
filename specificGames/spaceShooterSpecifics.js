var spaceShooterStartingXCoordinate = 100;
var spaceShooterStartingYCoordinate = 100;
var spaceShooterPlayerSpeed = 15;
var spaceShooterFrameRate = 1000/30;
var spaceShooterLetterSpawnRate = 2000;
var spaceShooterLetterColor = 'red';

function spaceShooterGameClass() {
	let gameIsPlaying = false;
	//shots section
	var arrayOfBullets = [];
	var bulletDimensionX = 4;
	var bulletDimensionY = 4;
	var bulletSpeed = 7;

	this.isPlaying = function() {
		return gameIsPlaying;
	};

	this.initialize = function() {
	};

	this.startPlaying = function() {
		gameIsPlaying = true;
	};

	this.stopPlaying = function() {
		gameIsPlaying = false;
	};

	this.update = function() {
		for (var bulletIndex = 0; bulletIndex < arrayOfBullets.length; bulletIndex++)
		{
			arrayOfBullets[bulletIndex].x+=bulletSpeed;
		}
	};

	this.draw = function() {
		gameCanvasContext.fillStyle = 'white';
		for (var bulletIndex = 0; bulletIndex < arrayOfBullets.length; bulletIndex++)
		{
			gameCanvasContext.fillRect(arrayOfBullets[bulletIndex].x,arrayOfBullets[bulletIndex].y,
									   bulletDimensionX,bulletDimensionY);
		}
	};

	this.drawBackground = function() {
		gameCanvasContext.fillStyle = 'black';
		gameCanvasContext.fillRect(0,0, 640,700);
	};

	this.drawPlayer = function() {
		gameCanvasContext.fillStyle = 'white';
		gameCanvasContext.fillRect(playerXCoordinate,playerYCoordinate, 20,20);
	};

	this.movePlayer = function() {
		if (upArrowIsBeingHeld)
		{
			playerYCoordinate -= spaceShooterPlayerSpeed;
		}
		if (rightArrowIsBeingHeld)
		{
			playerXCoordinate += spaceShooterPlayerSpeed;
		}
		if (downArrowIsBeingHeld)
		{
			playerYCoordinate += spaceShooterPlayerSpeed;
		}
		if (leftArrowIsBeingHeld)
		{
			playerXCoordinate -= spaceShooterPlayerSpeed;
		}
	};
};

const spaceShooterGame = new spaceShooterGameClass();
