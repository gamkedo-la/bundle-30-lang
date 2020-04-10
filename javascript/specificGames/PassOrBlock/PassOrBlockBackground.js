function PassOrBlockBackground()
{

  this.volcanoImage = volcanoImage;
  this.spaceBackgrondImage = spaceBackgroundForVolcanoGame;
  this.draw = function()
  {
    gameCanvasContext.drawImage(this.spaceBackgrondImage, 0,0, gameCanvas.width,gameCanvas.height);
    gameCanvasContext.drawImage(this.volcanoImage, 0,gameCanvas.height*0.7, gameCanvas.width,gameCanvas.height*0.3);
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
    if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate //-
        /*promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.height*/ < 0)
    {
      amountCorrect++;
      this.correctAnswerOffScreen = true;
      this.checkIfBothAnswersAreOffScreenAndResetIfSo();
    }
    if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate //-
        /*promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.height*/ < 0)
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

      gameClassManager.currentGame.collisionsWithAnswersManager.resetAnswers();
      gameClassManager.currentGame.correctAnswersYSpeed = 4;
      gameClassManager.currentGame.incorrectAnswersYSpeed = 4;
    }
  }
}
