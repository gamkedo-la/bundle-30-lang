snakeGameClass.prototype = new GameClass();
function snakeGameClass()
{
  this.name = 'Snake Game';
  this.titleScreenData = [{
	name: "Snake",
	fontSize: 27,
	spacing: 15,
	x: 30, y: 185
  }];

  this.FRAME_RATE = 1000/10;

  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new SnakeClass();
    this.playerCharacter.initialize();
    this.collidingObject = this.playerCharacter;
  }
  this.background = undefined;
  this.backButtonColor = 'yellow';
  this.backButtonTextColor = 'blueViolet';

  this.isTransitioningIn = false;

  this.textAnswerFontSize = 30;
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.pregameSpecialCode = function()
  {
    gameAudio = {};
    gameAudio.slither = new sfxMulti(["audio/snake_slither_01.mp3", "audio/snake_slither_02.mp3", "audio/snake_slither_03.mp3", "audio/snake_slither_04.mp3"]);
	  gameAudio.playSlither = function() {
	    gameAudio.slither.play();
  	}
  };

  this.superInitialize = this.initialize;
  this.initialize = function()
  {
	  this.playerCharacter = new SnakeClass();
    this.background = new SnakeBackground();
    this.playerCharacter.initialize();
    this.collidingObject = this.playerCharacter;
    initializePromptAndAnswerObjects();
    promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
	  this.superInitialize();
  };

  //update section
  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState !== fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
    {
      this.playerCharacter.update();
      this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);
    }
  }

  //draw section
  this.draw = function()
  {
    this.background.draw();    // this.background.draw();
    this.playerCharacter.draw();
    drawAnswersManager.draw();
    promptersManager.drawPromptsWhenAppropriate();
  }

  this.drawTransitionText = function()
  {
    customFontFillText(['Eat the answers', symbolExclamationPointImage], 60,30, 100,50);
    customFontFillText([upArrowImage, ' ', symbolEqualsImage, ' move up'], 30,15, 210,200);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' move right'], 30,15, 350,350);
    customFontFillText([downArrowImage, ' ', symbolEqualsImage, ' move down'], 30,15, 200,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' move left'], 30,15, 50,350);
  }

  this.LETTER_COLOR = 'cyan';

  this.handleLeftArrowDown = function()
  {
    if (this.playerCharacter.headOrientation != 1){
        this.playerCharacter.headOrientation = 1;
    }
    if (!this.playerCharacter.middleX)
    {
      this.playerCharacter.middleX = this.playerCharacter.x;
      this.playerCharacter.middleY = this.playerCharacter.y;
    }
    this.playerCharacter.speedX = -20;
    this.playerCharacter.speedY = 0;
    gameAudio.playSlither();
  }

  this.handleUpArrowDown = function()
  {
    if (!this.playerCharacter.middleX)
    {
      this.playerCharacter.middleX = this.playerCharacter.x;
      this.playerCharacter.middleY = this.playerCharacter.y;
    }
    this.playerCharacter.speedX = 0;
    this.playerCharacter.speedY = -20;
    if (this.playerCharacter.headOrientation != 0){
        this.playerCharacter.headOrientation = 0;
    }
    gameAudio.playSlither();
  }

  this.handleRightArrowDown = function()
  {
    if (!this.playerCharacter.middleX)
    {
      this.playerCharacter.middleX = this.playerCharacter.x;
      this.playerCharacter.middleY = this.playerCharacter.y;
    }
    if (this.playerCharacter.headOrientation != 3){
        this.playerCharacter.headOrientation = 3;
    }
    this.playerCharacter.speedX = 20;
    this.playerCharacter.speedY = 0;
    gameAudio.playSlither();
  }

  this.handleDownArrowDown = function()
  {
    if (!this.playerCharacter.middleX)
    {
      this.playerCharacter.middleX = this.playerCharacter.x;
      this.playerCharacter.middleY = this.playerCharacter.y;
    }
    if (this.playerCharacter.headOrientation != 2){
        this.playerCharacter.headOrientation = 2;
    }
    this.playerCharacter.speedX = 0;
    this.playerCharacter.speedY = 20;
    gameAudio.playSlither();
  }
}

const snakeGame = new snakeGameClass();
