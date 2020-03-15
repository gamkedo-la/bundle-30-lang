function Bullet(i)
{
  this.xPosition = cVcShooterGame.playerCharacter.position*200 + 97;
  this.yPosition = gameCanvas.height - 170;

  this.move = function()
  {
    this.yPosition -= 20;
  }

  this.draw = function()
  {
    gameCanvasContext.fillRect(this.xPosition,this.yPosition, 10,20);
  }

  this.handleLetterCollisions = function(i)
  {
    if (this.yPosition <= 30)
    {
      if (cVcShooterGame.playerShouldBeTargetingFirstLetter &&
          this.xPosition > cVcShooterGame.cVcManager.currentCVC.firstLetterCollisionRangeLeftPoint &&
          this.xPosition < cVcShooterGame.cVcManager.currentCVC.firstLetterCollisionRangeRightPoint)
      {
        amountCorrect++;
        cVcShooterGame.playerShouldBeTargetingFirstLetter = false;
        cVcShooterGame.playerShouldBeTargetingSecondLetter = true;
        arrayOfBullets.splice(i,1);
        calculateAccuracy();
        return;
      }
      else if (cVcShooterGame.playerShouldBeTargetingSecondLetter &&
               this.xPosition > cVcShooterGame.cVcManager.currentCVC.secondLetterCollisionRangeLeftPoint &&
               this.xPosition < cVcShooterGame.cVcManager.currentCVC.secondLetterCollisionRangeRightPoint)
      {
          amountCorrect++;
          cVcShooterGame.playerShouldBeTargetingSecondLetter = false;
          cVcShooterGame.playerShouldBeTargetingThirdLetter = true;
          arrayOfBullets.splice(i,1);
          calculateAccuracy();
          return;
      }
      else if (cVcShooterGame.playerShouldBeTargetingThirdLetter &&
               this.xPosition > cVcShooterGame.cVcManager.currentCVC.thirdLetterCollisionRangeLeftPoint &&
               this.xPosition < cVcShooterGame.cVcManager.currentCVC.thirdLetterCollisionRangeRightPoint)
      {
        {
          amountCorrect++;
          cVcShooterGame.playerShouldBeTargetingThirdLetter = false;
          arrayOfBullets = [];
          calculateAccuracy();
          cVcShooterGame.cVcManager.currentCVC = cVcShooterGame.cVcManager.chooseARandomCVC();
          cVcShooterGame.cVcManager.currentCVC.initialize();
          promptersManager.loadCurrentPrompter(imageAndAudioPrompterForCVCs);
          promptersManager.currentPrompter.loadCurrentImage(cVcShooterGame.cVcManager.currentCVC.imageAssociation);
          promptersManager.currentPrompter.loadCurrentAudio(cVcShooterGame.cVcManager.currentCVC.audioAssociation);
          cVcShooterGame.playerShouldBeTargetingFirstLetter = true;
          // promptersManager.currentPrompter.togglePromptingBoolean();
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
          if (nextGame === SINGLE_PLAYER_RANDOM || nextGame === TWO_PLAYER_RANDOM)
          {
            cycleCount++;
            if (cycleCount === CYCLE_LIMIT_FOR_RANDOM_GAME_RELOAD)
            {
              loadRandomGame();
              gameClassManager.initializeCurrentGame();
              cycleCount = 0;
            }
          }

          promptersManager.currentPrompter.promptThePlayer();
          return;
        }
      }
      else
      {
        amountIncorrect++;
        arrayOfBullets.splice(i,1);
        calculateAccuracy();
        return;
      }//end of letter order checks and collision range checks
    }//end of y position check
  }//end of handleLetterCollisions
}//end of bulletClass

var arrayOfBullets = [];

function fireBullet()
{
  let bullet = new Bullet();
  arrayOfBullets.push(bullet);
  console.log(arrayOfBullets);
}

function moveBullets()
{
  for (let i = 0; i < arrayOfBullets.length; i++)
  {
    arrayOfBullets[i].move();
  }
}

function drawBullets()
{
  for (let i = 0; i < arrayOfBullets.length; i++)
  {
    arrayOfBullets[i].draw();
  }
}

function handleBulletCollisionsWithLetters()
{
  for (let i = 0; i < arrayOfBullets.length; i++)
  {
    arrayOfBullets[i].handleLetterCollisions();
  }

}
