function Paddle()
{
  this.width = 100;
  this.height = 25;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height - this.height*2;

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.fillRect(this.x,this.y, this.width,this.height);
  }

  this.handleCollisionsWithAnswers = function()
  {
    if (this.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
        this.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 100 &&
        this.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate &&
        this.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 100)
        {
          gameClassManager.currentGame.answerYSpeed *= -1;
        }

    if (this.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
        this.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 100 &&
        this.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate &&
        this.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 100)
        {
          gameClassManager.currentGame.answerYSpeed *= -1;
        }
  }
}
