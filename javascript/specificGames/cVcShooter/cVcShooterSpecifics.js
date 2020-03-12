function cVcShooterGameClass()
{
  this.name = 'cVcShooter Game';
  this.FRAME_RATE = 1000/30;

  this.playerCharacter = undefined;
  this.cVcManager = undefined;
  this.background = undefined;

  this.playerShouldBeTargetingFirstLetter = true;
  this.playerShouldBeTargetingSecondLetter = false;
  this.playerShouldBeTargetingThirdLetter = false;

  this.initialize = function()
  {
    this.background = new cVcShooterBackground();
    this.playerCharacter = new ShooterPlayer();
    this.cVcManager = new CVCManager();
    this.cVcManager.initializeArrayOfCVCs();
    this.cVcManager.currentCVC = this.cVcManager.chooseARandomCVC();
    this.cVcManager.currentCVC.initialize();
    promptersManager.loadCurrentPrompter(imageAndAudioPrompterForCVCs);
    promptersManager.currentPrompter.loadCurrentImage(this.cVcManager.currentCVC.imageAssociation);
    promptersManager.currentPrompter.loadCurrentAudio(this.cVcManager.currentCVC.audioAssociation);
  }

  this.draw = function()
  {
    this.background.draw();
    this.playerCharacter.draw();
    this.cVcManager.currentCVC.draw();
    drawBullets();
    promptersManager.drawPromptsWhenAppropriate();
  }

  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState !== fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
    {
      moveBullets();
      for (let i = 0; i < arrayOfBullets.length; i++)
      {
        arrayOfBullets[i].handleLetterCollisions(i);
      }
    }
  }

  this.handleLeftArrowDown = function()
  {
    this.playerCharacter.position -= 1;
    if (this.playerCharacter.position < 0)
    {
      this.playerCharacter.position = 2;
    }
  }

  this.handleRightArrowDown = function()
  {
    this.playerCharacter.position += 1;
    if (this.playerCharacter.position > 2)
    {
      this.playerCharacter.position = 0;
    }
  }

  this.handleSpaceBarDown = function()
  {
    console.log('bullet fired from space bar');
    fireBullet();
  }
}

let cVcShooterGame = new cVcShooterGameClass();
