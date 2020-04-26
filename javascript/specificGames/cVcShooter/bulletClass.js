function Bullet(i)
{
  this.xPosition = cVcShooterGame.playerCharacter.position*200 + 97;
  this.yPosition = gameCanvas.height - 170;

  this.move = function()
  {
    this.yPosition -= 50;
  }

  this.draw = function()
  {
    gameCanvasContext.drawImage(galleryBulletImage, this.xPosition,this.yPosition, 10,30);
  }

  this.handleLetterCollisions = function(i)
  {
    if (this.yPosition <= 150)
    {
      if (cVcShooterGame.playerShouldBeTargetingFirstLetter &&
          this.xPosition > cVcShooterGame.cVcManager.currentCVC.firstLetterCollisionRangeLeftPoint &&
          this.xPosition < cVcShooterGame.cVcManager.currentCVC.firstLetterCollisionRangeRightPoint)
      {
        amountCorrect++;
        cVcShooterGame.playerShouldBeTargetingFirstLetter = false;
        cVcShooterGame.playerShouldBeTargetingSecondLetter = true;
        arrayOfBullets.splice(i,1);
        gameAudio.targetHit.play();
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
          gameAudio.targetHit.play();
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
          gameAudio.targetHit.play();
          calculateAccuracy();
          cVcShooterGame.cVcManager.currentCVC = cVcShooterGame.cVcManager.chooseARandomCVC(cVcShooterGame.currentLanguageArray);
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
  gameAudio.gunPop.play();
  gameAudio.gunshotBass.play();
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
