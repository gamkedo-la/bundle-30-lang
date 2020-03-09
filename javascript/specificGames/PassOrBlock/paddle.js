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
    console.log(this.x);
    console.log(this.y);
    console.log('promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate: ' + promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate);
    console.log('promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 100: ' + (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 100));
    console.log('promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate: ' + promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate);
    console.log('promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 100: ' + (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 100));
    if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 25 > this.x &&
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 25 > this.x + this.width &&
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 25 > this.y &&
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 25 < this.y + this.height)
        {
          console.log('paddle collision with correct answer');
          gameClassManager.currentGame.answerYSpeed *= -1;
        }

    if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 25 > this.x &&
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 25 > this.x + this.width &&
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 25 > this.y &&
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 25 < this.y + this.height)
        {
          console.log('paddle collision with correct answer');
          gameClassManager.currentGame.answerYSpeed *= -1;
        }
  }
}
