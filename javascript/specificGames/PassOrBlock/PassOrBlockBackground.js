function PassOrBlockBackground()
{
  gameCanvasContext.fillStyle = 'black';
  gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);

  this.handleAnswersOffScreen = function()
  {
    this.handleAnswersOffBottomOfScreen();
    this.handleAnswersOffTopOfScreen();
  }

  this.handleAnswersOffBottomOfScreen = function()
  {
    if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.y > gameCanvas.height)
    {

    }
    if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.y < 0)
    {

    }
  }

  this.handleAnswersOffTopOfScreen = function()
  {
    if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.y > gameCanvas.height)
    {
      
    }
    if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.y < 0)
    {

    }
  }
}
