passOrBlockGameClass.prototype = new GameClass();

function PassOrBlockGameClass()
{
  this.name = "Pass or Block Game";
  this.FRAME_RATE = 1000/30;

  this.background = undefined;

  this.playerCharacter = undefined;
  this.background = undefined;
  this.backButtonColor = 'yellow';
  this.backButtonTextColor = 'blueViolet';

  this.textAnswerFontSize = 30;
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.LETTER_COLOR = 'cyan';

  this.answersYSpeed = 10;

  this.initialize = function()
  {
    initializePromptAndAnswerObjects();
    this.playerCharacter = new Paddle();
    this.background = new PassOrBlockBackground();
  }

  this.draw = function()
  {
    this.background.draw();
    this.playerCharacter.draw();
    drawAnswersManager.draw();
    promptersManager.drawPromptsWhenAppropriate();
  }

  this.update = function()
  {
    this.moveAnswers();
    this.playerCharacter.handleCollisionsWithAnswers();
    this.background.handleAnswersOffScreen();
  }

  this.handleLeftArrowDown = function()
  {
    this.playerCharacter.x -= 10;
  }

  this.handleRightArrowDown = function()
  {
    this.playerCharacter.x += 10;
  }

  this.moveAnswers = function()
  {
    promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate += this.answersYSpeed;
    promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate += this.answersYSpeed;
  }
}

function updateEverything()
{
  handlePaddlePasses();
  handlePaddleCollisions();
  handleOffTopSideOfScreen();
}
