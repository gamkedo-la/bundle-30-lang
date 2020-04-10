var spaceShooterStartingXCoordinate = 100;
var spaceShooterStartingYCoordinate = 100;
var spaceShooterPlayerSpeed = 7;

var spaceShooterLetterSpawnRate = 2000;
var spaceShooterLetterColor = 'red';

spaceShooterGameClass.prototype = new GameClass();
function spaceShooterGameClass() {
	this.name = 'spaceShooter';
	//shots section
	this.arrayOfBullets = [];
	var bulletDimensionX = 4;
	var bulletDimensionY = 4;
	var bulletSpeed = 7;
	this.playerCharacter = undefined;
	this.defineAndInitializePlayerCharacter = function()
	{
		this.playerCharacter = new Spaceship();
		this.playerCharacter.initialize();
	}

	this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';
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

		// initializePromptAndAnswerObjects();
    // promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
	}

	this.update = function()
	{
		this.playerCharacter.move();
		this.moveBullets();
		this.scrollBackgroundsFromRightToLeft();
		this.handleBackgroundPicsOffScreen();

		this.moveAnswers();
		this.handleAnswersOffScreen();
		this.handleBulletCollisionsWithAnswers();
		this.handleBulletsOffScreen();
	};

	this.moveBullets = function()
	{
		for (var bulletIndex = 0; bulletIndex < this.arrayOfBullets.length; bulletIndex++)
		{
			this.arrayOfBullets[bulletIndex].x+=bulletSpeed;
		}
	}

	this.draw = function()
	{
		this.drawBackground();
		this.playerCharacter.draw();
		this.drawBullets();

		drawAnswersManager.draw();
    promptersManager.drawPromptsWhenAppropriate();
	};

	this.answersXSpeed = -3;

	this.moveAnswers = function()
  {
    promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate += this.answersXSpeed;
    promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate += this.answersXSpeed;
  }

	this.handleAnswersOffScreen = function()
  {
    if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate > gameCanvas.width)
    {
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate = -10;
    }
    else if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate < -10)
    {
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate = gameCanvas.width;
    }

    if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate > gameCanvas.width)
    {
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate = -10;
    }
    else if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate < -10)
    {
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate = gameCanvas.width;
    }
  }

	this.drawBullets = function()
	{
		gameCanvasContext.fillStyle = 'white';
		for (var bulletIndex = 0; bulletIndex < this.arrayOfBullets.length; bulletIndex++)
		{
			gameCanvasContext.fillRect(this.arrayOfBullets[bulletIndex].x,this.arrayOfBullets[bulletIndex].y,
									   bulletDimensionX,bulletDimensionY);
		}
	}

	this.backgroundPic1XCoordinate = undefined;
	this.backgroundPic2XCoordinate = undefined;
	this.jupiter1XCoordinate = undefined;
	this.jupiter2XCoordinate = undefined;//defined in superInitialize to pull gameCanvas width/height

	this.drawBackground = function()
	{
		gameCanvasContext.drawImage(spaceShooterBackgroundImage, this.backgroundPic1XCoordinate,0, gameCanvas.width,gameCanvas.height);
		gameCanvasContext.drawImage(spaceShooterBackgroundImage2, this.backgroundPic2XCoordinate,0, gameCanvas.width,gameCanvas.height);
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
			this.backgroundPic1XCoordinate = gameCanvas.width;
		}
		if (this.backgroundPic2XCoordinate + gameCanvas.width < 0)
		{
			this.backgroundPic2XCoordinate = gameCanvas.width;
		}
	}

	this.handleLeftArrowDown = function()
	{
		inputManager.leftArrowIsBeingHeld = true;
	}

	this.handleUpArrowDown = function()
	{
		inputManager.upArrowIsBeingHeld = true;
	}

	this.handleRightArrowDown = function()
	{
		inputManager.rightArrowIsBeingHeld = true;
	}

	this.handleDownArrowDown = function()
	{
		inputManager.downArrowIsBeingHeld = true;
	}

	this.handleLeftArrowUp = function()
	{
		inputManager.leftArrowIsBeingHeld = false;
	}

	this.handleUpArrowUp = function()
	{
		inputManager.upArrowIsBeingHeld = false;
	}

	this.handleRightArrowUp = function()
	{
		inputManager.rightArrowIsBeingHeld = false;
	}

	this.handleDownArrowUp = function()
	{
		inputManager.downArrowIsBeingHeld = false;
	}

	this.handleSpaceBarDown = function()
	{
		this.arrayOfBullets.push({x:this.playerCharacter.x + this.playerCharacter.width,
												 y:this.playerCharacter.y + this.playerCharacter.height/2 - 2,
											 	 width: bulletDimensionX, height: bulletDimensionY});
		console.log('this.arrayOfBullets:' + this.arrayOfBullets);
	}

	this.handleBulletCollisionsWithAnswers = function()
	{
		if (this.arrayOfBullets.length !== 0)
		{
			for (let bulletIndex = 0; bulletIndex < this.arrayOfBullets.length; bulletIndex++)
			{
				this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.arrayOfBullets[bulletIndex]);
			}
		}
	}

	this.handleBulletsOffScreen = function()
	{
		for (let bulletIndex = 0; bulletIndex < this.arrayOfBullets.length; bulletIndex++)
		{
			if (this.arrayOfBullets[bulletIndex].x > gameCanvas.width)
			{
				this.arrayOfBullets.splice(this.arrayOfBullets[bulletIndex],1);
			}
		}
	}
};

const spaceShooterGame = new spaceShooterGameClass();
