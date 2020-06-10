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
  this.sprite = frogRiverCharacter;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }

  this.checkForLilyLanding = function()
  {
    let answerCount = frogRiverGame.answerCount;
    let additive = frogRiverGame.additiveToAnswers;
    let leftLilyIndex = answerCount + additive;


    for (let i = leftLilyIndex; i < leftLilyIndex + 2; i++)
    {

        let lilyToCheck = frogRiverGame.lilyPadManager.arrayOfLilyPads[i];
        let lilyLeftBoundary = lilyToCheck.xCoordinate;
        let lilyRightBoundary = lilyLeftBoundary + lilyToCheck.width;
        let frogCenterPoint = this.centerX;

        if (frogCenterPoint > lilyLeftBoundary && frogCenterPoint < lilyRightBoundary)
        {
          this.y = lilyToCheck.yCoordinate + 10;
          
          this.currentLilyPad = lilyToCheck;
          this.resetAnswersInOccupiedLilyLine();

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
          gameAudio.frogJump.play();
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


  this.resetAnswersInOccupiedLilyLine = function() {
    this.currentLilyPad.answer = undefined;
    this.currentLilyPad.lilyNeighbourOnSameLine.answer = undefined;
  }
}
