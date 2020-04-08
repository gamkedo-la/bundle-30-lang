const birdBackButtonRectangleColor = 'yellow';
const birdBackButtonTextColor = 'red';
const birdLetterColor = 'BlueViolet';

birdGameClass.prototype = new GameClass();
function birdGameClass() {
  this.name = 'birdGame';
  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    console.log('inside define and initialize of bird player character');
    this.playerCharacter = new BirdClass();
    this.playerCharacter.initialize();
    this.collidingObject = this.playerCharacter;
  }
  this.collidingObject = undefined;
  this.titleScreenData = [{
	name: "Bird",
	fontSize: 27,
	spacing: 15,
	x: 138, y: 185
  }];
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

  this.pregameSpecialCode = function()
  {
    gameAudio = {};
    gameAudio.flap1 = new sfxOneShot("audio/flap01.mp3");
    gameAudio.flap2 = new sfxOneShot("audio/flap02.mp3");
    gameAudio.flapIndex = 0;
    gameAudio.playFlap = function() {
      if (gameAudio.flapIndex == 0) {
        gameAudio.flap1.play();
      } else {
        gameAudio.flap2.play();
      }
      gameAudio.flapIndex = gameAudio.flapIndex == 0 ? 1 : 0;
    }
  
  };

  this.superInitialize = function()
  {
    // initializePromptAndAnswerObjects();
    // promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    cloudManager.initialize();
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
    this.assignLeftOrRightDirectionToAnswers();
	  //this.superInitialize();
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
      collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);
      cloudManager.update();
    }
  };

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
    cloudManager.drawClouds();
    this.playerCharacter.draw();
    drawAnswersManager.draw();
    promptersManager.drawPromptsWhenAppropriate();
  };

  this.drawBackground = function()
  {
    let startingXOnCanvas = 0;
    let startingYOnCanvas = 0;
    let endingXOnCanvas = gameCanvas.width;
    let endingYOnCanvas = gameCanvas.height;
  	gameCanvasContext.drawImage(skyBackground, startingXOnCanvas,startingYOnCanvas,
                                               endingXOnCanvas, endingYOnCanvas);
  };

  this.handleSpaceBarDown = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt)
    {
      this.playerCharacter.flapUp();
      gameAudio.playFlap();
    }
  };

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

const birdGame = new birdGameClass();
