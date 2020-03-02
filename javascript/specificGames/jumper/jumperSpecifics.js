const jumperLetterColor = 'red';
const jumperBackButtonRectangleColor = 'yellow';
const jumperBackButtonTextColor = 'green';

jumperGameClass.prototype = new GameClass();
function jumperGameClass()
{
  this.name = 'jumperGame';
  this.playerCharacter = undefined;
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = 'px Helvetica';

  const MAX_PLATFORMS = 7;

  this.arrayOfJumperPlatforms = [...Array(MAX_PLATFORMS).keys()].map(function(i) {
	return {x:0, y:i*100};
  });

  this.FRAME_RATE = 1000/30;

  this.initialize = function()
  {
    this.playerCharacter = new JumperClass();
    gameInterval.reset(this.FRAME_RATE);
    this.initializePromptAndAnswerObjects();
    this.shuffleAndResetPromptsAndAnswers();
		this.loadPromptsManager();
  };

  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame)
    {
      this.movePlayer();
      this.handlePlayerWrapping();
      this.handleCollisionsWithAnswers();
    }
  };

  this.handleLeftArrowDown = function()
  {
    this.playerCharacter.xSpeed = this.playerCharacter.LEFT_ARROW_DOWN_SPEED;
  }

  this.handleRightArrowDown = function()
  {
    this.playerCharacter.xSpeed = this.playerCharacter.RIGHT_ARROW_DOWN_SPEED;
  }

  this.handleRightArrowUp = function()
  {
    this.playerCharacter.xSpeed = this.playerCharacter.LEFT_OR_RIGHT_ARROW_UP_SPEED;
  }

  this.handleSpaceBarDown = function()
  {
	   this.playerCharacter.jump();
  }

  this.handleLeftArrowUp = function()
  {
    this.playerCharacter.xSpeed = this.playerCharacter.LEFT_OR_RIGHT_ARROW_UP_SPEED;
  }

  this.handlePlayerWrapping = function()
  {
    if (this.playerCharacter.x < -10)//if the player goes off the left side of the screen
    {
      this.playerCharacter.x = gameCanvas.width - 5;//put them on the right side
    }

    if (this.playerCharacter.x > gameCanvas.width - 5)//if the player goes off the right side of the screen
    {
      this.playerCharacter.x = -5;//put them on the left side of the screen
    }
  }

  this.movePlayer = function()
  {
	if (!inputManager.upArrowIsBeingHeld &&
		this.playerCharacter.y !== 30 && this.playerCharacter.y !== 130 &&
		this.playerCharacter.y !== 230 && this.playerCharacter.y !== 330 && this.playerCharacter.y !== 430 &&
		this.playerCharacter.y !== 530 && this.playerCharacter.y !== 630) //if not jumping and not contacting a platform
    {
      this.playerCharacter.y += 5;//apply GRAVITY
    }
  this.playerCharacter.x += this.playerCharacter.xSpeed;
  };

  this.handleUpArrowDown = function()
  {
	   this.playerCharacter.jump();
  };

  this.handleDownArrowDown = function()
  {
    this.playerCharacter.y += 100;
    if (this.playerCharacter.y > 700)//if the player goes below the screen
    {
      this.playerCharacter.y = 30;//put them at the top platform
    }
  }

  this.draw = function()
  {
    this.drawBackground();
    this.playerCharacter.draw();
    drawAnswersManager.draw();
		this.drawPromptsWhenAppropriate();
  };

  this.drawPromptsWhenAppropriate = function()
  {
    if (promptersManager.shouldBeDrawingAPrompt)
    {
      promptersManager.currentPrompter.updatePromptImage();
      promptersManager.currentPrompter.drawThePrompt();
    }
  }

  this.initializePromptAndAnswerObjects = function()
  {
    initializePromptAndAnswerObjects();
  }

  this.shuffleAndResetPromptsAndAnswers = function()
  {
    promptsAndAnswersManager.setOrResetPromptsAndAnswers();
  }

  this.loadPromptsManager = function()
  {
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
  }

  this.promptThePlayer = function()
  {
    promptersManager.promptThePlayer();
  }

  this.handleCollisionsWithAnswers = function()
	{
		collisionsWithAnswersManager.handleCollisionsWithAnswers();
	}

  this.drawBackground = function()
  {
  	gameCanvasContext.fillStyle = 'blue';
  	gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
  	gameCanvasContext.fillStyle = 'black';
  	for (let platformsIndex = 0; platformsIndex < this.arrayOfJumperPlatforms.length; platformsIndex++)
  	{
        gameCanvasContext.fillRect(this.arrayOfJumperPlatforms[platformsIndex].x, this.arrayOfJumperPlatforms[platformsIndex].y, gameCanvas.width, 50)
  	}
  };

  this.onSpaceBarKeyDown = function()
  {
  	this.playerCharacter.y += -7;
  };
}

const jumperGame = new jumperGameClass();
