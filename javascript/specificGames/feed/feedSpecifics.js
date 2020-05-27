feedGameClass.prototype = new GameClass();
function cVcShooterGameClass()
{
  this.name = 'cVcShooter Game';
  this.FRAME_RATE = 1000/30;
  this.titleScreenData = [
	{name: "feed", fontSize: 22, spacing: 12, x: 47, y: 270},
	{name: "Feed Who", fontSize: 22, spacing: 12, x: 26, y: 300}
  ];
  this.playerCharacter = undefined;
  this.cVcManager = undefined;
  this.background = undefined;

  this.backButtonColor = 'rgb(227,227,227)';
  this.backButtonTextColor = 'brown';

  this.playerShouldBeTargetingFirstLetter = true;
  this.playerShouldBeTargetingSecondLetter = false;
  this.playerShouldBeTargetingThirdLetter = false;

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/shootingGalleryMusic.mp3', 47.5);

  this.pregameSpecialCode = function()
  {
    gameAudio = {};
    gameAudio.targetHit = new sfxMulti(["audio/cVcSFX/targetHit1.mp3", "audio/cVcSFX/targetHit2.mp3", "audio/cVcSFX/targetHit3.mp3", "audio/cVcSFX/targetHit4.mp3"]);

    gameAudio.gunPop = new sfxMulti(['audio/cVcSFX/gunPop1.mp3','audio/cVcSFX/gunPop2.mp3','audio/cVcSFX/gunPop3.mp3','audio/cVcSFX/gunPop4.mp3']);
    gameAudio.gunshotBass = new sfxMulti(['audio/cVcSFX/gunshotBass1.mp3','audio/cVcSFX/gunshotBass2.mp3','audio/cVcSFX/gunshotBass3.mp3','audio/cVcSFX/gunshotBass4.mp3']);
  };

  this.initialize = function()
  {
    this.background = new cVcShooterBackground();
    this.playerCharacter = new ShooterPlayer();
    this.cVcManager = new CVCManager();
    this.cVcManager.initializeArraysOfCVCs();
    this.setCurrentLanguageArray();
    this.cVcManager.currentCVC = this.cVcManager.chooseARandomCVC(this.currentLanguageArray);
    this.cVcManager.currentCVC.initialize();
    promptersManager.loadCurrentPrompter(imageAndAudioPrompterForCVCs);
    promptersManager.currentPrompter.loadCurrentImage(this.cVcManager.currentCVC.imageAssociation);
    promptersManager.currentPrompter.loadCurrentAudio(this.cVcManager.currentCVC.audioAssociation);
  }

  this.currentLanguageArray = undefined;
  this.setCurrentLanguageArray = function()
  {
    if (languageSelectionScreen.languageNum === 0)
    {
      this.currentLanguageArray = this.cVcManager.arrayOfEnglishCVCs;
    }
    else if (languageSelectionScreen.languageNum === 1)
    {
      this.currentLanguageArray = this.cVcManager.arrayOfMandarinCVCs;
    }
    else if (languageSelectionScreen.languageNum === 2)
    {
      this.currentLanguageArray = this.cVcManager.arrayOfCentralVietnameseCVCs;
    }
    console.log('this.currentLanguageArray: ' + this.currentLanguageArray);
  }

  this.draw = function()
  {
    this.background.draw();
    this.playerCharacter.draw();
    if (this.playerCharacter.arrayOfGunSmokeParticles.length > 0)
    {
      for (let i = 0; i < this.playerCharacter.arrayOfGunSmokeParticles.length; i++)
      {
        this.playerCharacter.arrayOfGunSmokeParticles[i].draw();
      }
    }
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

      for (let i = 0; i < this.playerCharacter.arrayOfGunSmokeParticles.length; i++)
      {
        this.playerCharacter.arrayOfGunSmokeParticles[i].move();
        if (this.playerCharacter.arrayOfGunSmokeParticles[i].alpha < 0.1)
        {
          gameClassManager.currentGame.playerCharacter.arrayOfGunSmokeParticles.splice(i,1);
        }
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
    fireBullet();
    this.playerCharacter.rotateGun();
    this.playerCharacter.generateSmoke();
  }

}

const cVcShooterGame = new cVcShooterGameClass();
