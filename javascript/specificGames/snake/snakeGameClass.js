function getRandomIntInclusive(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

snakeGameClass.prototype = new GameClass();
function snakeGameClass()
{
  this.name = 'Snake Game';
  this.FRAME_RATE = 1000/10;

  this.playerCharacter = undefined;
  this.background = undefined;
  this.backButtonColor = 'yellow';
  this.backButtonTextColor = 'blueViolet';

  this.isTransitioningIn = false;

  this.textAnswerFontSize = 30;
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.initialize = function()
  {
    initializePromptAndAnswerObjects();
    this.playerCharacter = new SnakeClass();
    this.background = new SnakeBackground();
    this.playerCharacter.initialize();
    gameInterval.reset(this.FRAME_RATE);
    promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
  }

  //update section
  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt)
    {
      this.playerCharacter.update();
      collisionsWithAnswersManager.handleCollisionsWithAnswers();
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
    this.playerCharacter.speedX = -20;
    this.playerCharacter.speedY = 0;
  }

  this.handleUpArrowDown = function()
  {
    this.playerCharacter.speedX = 0;
    this.playerCharacter.speedY = -20;
  }

  this.handleRightArrowDown = function()
  {
    this.playerCharacter.speedX = 20;
    this.playerCharacter.speedY = 0;
  }

  this.handleDownArrowDown = function()
  {
    this.playerCharacter.speedX = 0;
    this.playerCharacter.speedY = 20;
  }
}

const SNAKE_GAME = new snakeGameClass();
