function Paddle()
{
  this.width = 100;
  this.height = 25;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height - this.height*5;

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.fillRect(this.x,this.y, this.width,this.height);
  }

  this.handleCollisionsWithAnswers = function()
  {
    let correctAnswerLeftSide = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate;
    let correctAnswerRightSide = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.width;
    let correctAnswerTopSide = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate;
    let correctAnswerBottomSide = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.height;

    let incorrectAnswerLeftSide = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate;
    let incorrectAnswerRightSide = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.width;
    let incorrectAnswerTopSide = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate;
    let incorrectAnswerBottomSide = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.height;

    let paddleRightSide = this.x + this.width;
    let paddleLeftSide = this.x;
    let paddleBottomSide = this.y + this.height;
    let paddleTopSide = this.y;

    if (correctAnswerLeftSide > paddleRightSide || correctAnswerRightSide < paddleLeftSide ||
        correctAnswerTopSide > paddleBottomSide || correctAnswerBottomSide < paddleTopSide)
        {

        }
        else
        {
          gameClassManager.currentGame.correctAnswersYSpeed *= -1;
        }

    if (incorrectAnswerLeftSide > paddleRightSide || incorrectAnswerRightSide < paddleLeftSide ||
        incorrectAnswerTopSide > paddleBottomSide || incorrectAnswerBottomSide < paddleTopSide)
        {

        }
        else
        {
          gameClassManager.currentGame.incorrectAnswersYSpeed *= -1;
        }
  }
}
