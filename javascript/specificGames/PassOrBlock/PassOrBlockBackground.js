function PassOrBlockBackground()
{

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'blue';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
  }

  this.handleAnswersOffScreen = function()
  {
    this.handleAnswersOffBottomOfScreen();
    this.handleAnswersOffTopOfScreen();
  }

  this.correctAnswerOffScreen = false;
  this.incorrectAnswerOffScreen = false;

  this.handleAnswersOffBottomOfScreen = function()
  {
    if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate > gameCanvas.height)
    {
      amountIncorrect++;
      this.correctAnswerOffScreen = true;
      this.checkIfBothAnswersAreOffScreenAndResetIfSo();
    }
    if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate > gameCanvas.height)
    {
      amountCorrect++;
      this.incorrectAnswerOffScreen = true;
      this.checkIfBothAnswersAreOffScreenAndResetIfSo();
    }
  }

  this.handleAnswersOffTopOfScreen = function()
  {
    if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate < 0)
    {
      amountCorrect++;
      this.correctAnswerOffScreen = true;
      this.checkIfBothAnswersAreOffScreenAndResetIfSo();
    }
    if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate < 0)
    {
      amountIncorrect++;
      this.incorrectAnswerOffScreen = true;
      this.checkIfBothAnswersAreOffScreenAndResetIfSo();
    }
  }

  this.checkIfBothAnswersAreOffScreenAndResetIfSo = function()
  {
    if (this.correctAnswerOffScreen && this.incorrectAnswerOffScreen)
    {
      this.correctAnswerOffScreen = false;
      this.incorrectAnswerOffScreen = false;

      collisionsWithAnswersManager.resetAnswers();
      gameClassManager.currentGame.correctAnswersYSpeed = 4;
      gameClassManager.currentGame.incorrectAnswersYSpeed = 4;
    }
  }
}
