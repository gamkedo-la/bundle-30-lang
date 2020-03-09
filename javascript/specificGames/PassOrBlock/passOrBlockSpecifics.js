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

  this.correctAnswersYSpeed = 4;
  this.incorrectAnswersYSpeed = 4;

  this.initialize = function()
  {
    initializePromptAndAnswerObjects();
    gameInterval.reset(this.FRAME_RATE);

    this.playerCharacter = new Paddle();
    this.background = new PassOrBlockBackground();
    promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
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
    if (!promptsAndAnswersManager.shouldBeDrawingAPrompt &&
    fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame)
    {
      this.moveAnswers();
      this.playerCharacter.handleCollisionsWithAnswers();
      this.background.handleAnswersOffScreen();
    }
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
    promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate += this.correctAnswersYSpeed;
    promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate += this.incorrectAnswersYSpeed;
  }
}

let passOrBlockGame = new PassOrBlockGameClass();
