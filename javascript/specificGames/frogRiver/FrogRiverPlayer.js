function FrogRiverPlayer()
{
  this.x = Math.random() * 640;
  this.y = 600;

  this.width = 64;
  this.height = 50;
  this.centerX = this.x + this.width/2;

  this.updateCenterX = function()
  {
    this.centerX = this.x + this.width/2;
  }

  this.color = 'DarkGreen';

  this.draw = function()
  {
    gameCanvasContext.fillStyle = this.color;
    gameCanvasContext.fillRect(this.x,this.y, this.width,this.height);
  }

  this.checkForLilyLanding = function()
  {
    let answerCount = frogRiverGame.answerCount;
    console.log('answerCount: ' + answerCount);
    let additive = frogRiverGame.additiveToAnswers;
    console.log('additive: ' + additive);
    let leftLilyIndex = answerCount + additive;
    console.log('leftLilyIndex: ' + leftLilyIndex);


    for (let i = leftLilyIndex; i < leftLilyIndex + 2; i++)
    {

        console.log('i: ' + i);
        console.log(frogRiverGame.lilyPadManager.arrayOfLilyPads[i]);
        let lilyToCheck = frogRiverGame.lilyPadManager.arrayOfLilyPads[i];
        let lilyLeftBoundary = lilyToCheck.xCoordinate;
        let lilyRightBoundary = lilyLeftBoundary + lilyToCheck.width;
        let frogCenterPoint = this.centerX;

        if (frogCenterPoint > lilyLeftBoundary && frogCenterPoint < lilyRightBoundary)
            {
              this.y = lilyToCheck.yCoordinate + 10;
              console.log('this.y: ' + this.y);
              this.currentLilyPad = lilyToCheck;
              if (answerCount === -1)
              {
                frogRiverGame.playerCharacter.currentLilyPad = undefined;
              }

              if (lilyToCheck.answer === promptsAndAnswersManager.correctTargetPromptAndAnswerPairing)
              {
                amountCorrect++;
              }
              else
              {
                amountIncorrect++;
              }
              frogRiverGame.answerCount--;
              frogRiverGame.additiveToAnswers--;
              frogRiverGame.collisionsWithAnswersManager.resetAnswers();

            }
      }

    }


  this.currentLilyPad = undefined;

  this.moveWhileOnLilyPad = function()
  {
    if (this.currentLilyPad !== undefined)
    {
      this.x += this.currentLilyPad.speed*this.currentLilyPad.direction;
    }
  }

  this.handleOffScreen = function()
  {
    if (this.x > 690)
    {
      {
        this.x = -50;
      }
    }
    if (this.x < -50)
    {
      this.x = 690;
    }
  }

}
