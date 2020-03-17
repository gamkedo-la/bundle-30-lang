var spaceShooterStartingXCoordinate = 100;
var spaceShooterStartingYCoordinate = 100;
var spaceShooterPlayerSpeed = 15;

var spaceShooterLetterSpawnRate = 2000;
var spaceShooterLetterColor = 'red';

spaceShooterGameClass.prototype = new GameClass();
function spaceShooterGameClass() {
	this.name = 'spaceShooter';
	//shots section
	var arrayOfBullets = [];
	var bulletDimensionX = 4;
	var bulletDimensionY = 4;
	var bulletSpeed = 7;
	this.titleScreenData = [
	  {name: "Space", fontSize: 25, spacing: 12, x: 130, y: 270},
	  {name: "Shooter", fontSize: 17, spacing: 10, x: 129, y: 305}
	];
	this.FRAME_RATE = 1000/30;

  this.pregameSpecialCode = function()
  {
    console.log("pregame special code for space shooter");
	playerShouldSeeTitleScreen = false;
    fullGameStateMachine.playingAGameState = true;
    levelIsTransitioning = true;
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
		gameCanvasContext.drawImage(spaceShooterBackgroundImage, 0,0, gameCanvas.width,gameCanvas.height);
		gameCanvasContext.drawImage(jupiterImage, gameCanvas.width*0.2,gameCanvas.height*0.4, gameCanvas.width*0.3,gameCanvas.height*0.4);
	};

	this.drawPlayer = function() {
		gameCanvasContext.drawImage(spaceshipImage,
					gameClassManager.currentGame.playerCharacter.x,gameClassManager.currentGame.playerCharacter.y,
					gameCanvas.width/10,gameCanvas.height/10);
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
