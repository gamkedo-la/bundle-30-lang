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
	// playerShouldSeeTitleScreen = false;
  //   fullGameStateMachine.playingAGameState = true;
  //   levelIsTransitioning = true;
  };

	this.superInitialize = function()
	{
		this.backgroundPic1XCoordinate = 0;
		this.backgroundPic2XCoordinate = gameCanvas.width;
		this.jupiter1XCoordinate = gameCanvas.width*0.2;
		this.jupiter2XCoordinate = gameCanvas.width*0.2 + gameCanvas.width;
	}

	this.update = function()
	{
		this.movePlayer();
		this.moveBullets();
		this.scrollBackgroundsFromRightToLeft();
		this.handleBackgroundPicsOffScreen();
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

	this.backgroundPic1XCoordinate = undefined;
	this.backgroundPic2XCoordinate = undefined;
	this.jupiter1XCoordinate = undefined;
	this.jupiter2XCoordinate = undefined;//defined in superInitialize to pull gameCanvas width/height

	this.drawBackground = function() {

		gameCanvasContext.drawImage(spaceShooterBackgroundImage, this.backgroundPic1XCoordinate,0, gameCanvas.width,gameCanvas.height);
		gameCanvasContext.drawImage(spaceShooterBackgroundImage2, this.backgroundPic2XCoordinate,0, gameCanvas.width,gameCanvas.height);

		//gameCanvasContext.drawImage(jupiterImage, this.jupiter1XCoordinate,gameCanvas.height*0.4, gameCanvas.width*0.3,gameCanvas.height*0.4);
		//gameCanvasContext.drawImage(jupiterImage, this.jupiter2XCoordinate,gameCanvas.height*0.4, gameCanvas.width*0.3,gameCanvas.height*0.4);
	};

	this.scrollBackgroundsFromRightToLeft = function()
	{
		this.backgroundPic1XCoordinate -= 5;
		this.backgroundPic2XCoordinate -= 5;
		this.jupiter1XCoordinate -= 5;
		this.jupiter2XCoordinate -= 5;
	}

	this.handleBackgroundPicsOffScreen = function()
	{
		if (this.backgroundPic1XCoordinate + gameCanvas.width < 0)
		{
			console.log('this.backgroundPic1XCoordinate: ' + this.backgroundPic1XCoordinate);
			this.backgroundPic1XCoordinate = gameCanvas.width;
		}
		if (this.backgroundPic2XCoordinate + gameCanvas.width < 0)
		{
			console.log('this.backgroundPic2XCoordinate: ' + this.backgroundPic2XCoordinate);
			this.backgroundPic2XCoordinate = gameCanvas.width;
		}

		// if (this.jupiter1XCoordinate + gameCanvas.width*0.3 < 0)
		// {
		// 	this.jupiter1XCoordinate = gameCanvas.width;
		// }
		// if (this.jupiter2XCoordinate + gameCanvas.width*0.3 < 0)
		// {
		// 	this.jupiter2XCoordinate = gameCanvas.width;
		// }
	}

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
