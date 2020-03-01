const birdBackButtonRectangleColor = 'yellow';
const birdBackButtonTextColor = 'red';
const birdLetterColor = 'BlueViolet';

birdGameClass.prototype = new GameClass();
function birdGameClass() {
  this.name = 'birdGame';
  this.playerCharacter = undefined;

  const GRAVITY = 4;
  const LEFT_ARROW_DOWN_SPEED = -8;
  const RIGHT_ARROW_DOWN_SPEED = 8;
  const LEFT_ARROW_UP_SPEED = -4;
  const RIGHT_ARROW_UP_SPEED = 4;

  this.FRAME_RATE = 1000/30;
  this.letterSpawnInterval = 2000;

  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.answersXSpeed = 4;

  this.initialize = function()
  {
    gameInterval.reset(this.FRAME_RATE);
    this.playerCharacter = new BirdClass();
    this.playerCharacter.initialize();
    this.initializePromptAndAnswerObjects();
    this.shuffleAndResetPromptsAndAnswers();
    this.assignLeftOrRightDirectionToAnswers();
    this.loadPromptsManager();
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

  this.applyGRAVITYToBird = function()
  {
	   this.playerCharacter.y += GRAVITY;
  }

  this.handleLeftArrowDown = function()
  {
    this.playerCharacter.xSpeed = LEFT_ARROW_DOWN_SPEED;
  };

  this.handleRightArrowDown = function()
  {
    this.playerCharacter.xSpeed = RIGHT_ARROW_DOWN_SPEED;
  }

  this.handleLeftArrowUp = function()
  {
    this.playerCharacter.xSpeed = LEFT_ARROW_UP_SPEED;
  }

  this.handleRightArrowUp = function()
  {
    this.playerCharacter.xSpeed = RIGHT_ARROW_UP_SPEED;
  }

  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState !== fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
    {
      this.playerCharacter.move();
      this.playerCharacter.handleOffScreen();
      this.moveAnswers();
      this.handleAnswersOffScreen();
      this.handleCollisionsWithAnswers();
    }
  };

  this.handleCollisionsWithAnswers = function()
  {
    collisionsWithAnswersManager.handleCollisionsWithAnswers();
  }

  this.assignLeftOrRightDirectionToAnswers = function()
  {
    let randomNumber = Math.random();
    if (randomNumber < 0.5)
    {
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xDirection = 1;
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xDirection = -1;
    }
    else
    {
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xDirection = -1;
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xDirection = 1;
    }
  }

  this.draw = function()
  {
    this.drawBackground();
    this.playerCharacter.draw();
    drawAnswersManager.draw();
    this.drawPromptsWhenAppropriate();
  };

  this.drawBackground = function()
  {
  	gameCanvasContext.fillStyle = 'cyan';
  	gameCanvasContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  };

  this.drawPromptsWhenAppropriate = function()
  {
    if (promptersManager.shouldBeDrawingAPrompt)
    {
      promptersManager.currentPrompter.updatePromptImage();
      promptersManager.currentPrompter.drawThePrompt();
    }
  }

  this.handleSpaceBarDown = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt)
    {
      this.playerCharacter.flapUp();
    }
  };

  this.shuffleAndResetPromptsAndAnswers = function()
  {
    promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    this.assignLeftOrRightDirectionToAnswers();
  }

  this.loadPromptsManager = function()
  {
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
  }

  this.promptThePlayer = function()
  {
    promptersManager.promptThePlayer();
  }

  this.moveAnswers = function()
  {
    promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate += this.answersXSpeed*promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xDirection;
    promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate += this.answersXSpeed*promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xDirection;
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


}

var birdGame = new birdGameClass();
