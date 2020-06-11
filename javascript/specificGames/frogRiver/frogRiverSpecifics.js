frogRiverGameClass.prototype = new GameClass();

function frogRiverGameClass()
{
  this.name = 'frogRiverGame';
  this.playerCharacter = undefined;
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.imageAnswerWidth = 70;
  this.imageAnswerHeight = 70;
  // this.imageAnswerHolderWidth = 60;
  // this.imageAnswerHolderHeight = 60;
  this.audioImageAnswerWidth = 70;
  this.audioImageAnswerHeight = 70;
  // this.audioImageAnswerHolderWidth = 60;
  // this.audioImageAnswerHolderHeight = 60;

  this.titleScreenData = [{name: "Frog",fontSize: 27,spacing: 15,x: 530, y: 265},
                          {name: "River",fontSize: 27,spacing: 15,x: 525, y: 305}];

  this.drawTransitionText = function()
  {
    customFontFillText(['Jump on the Answer', symbolExclamationPointImage], 60,30, 50,50);
    customFontFillText([upArrowImage, ' ', symbolEqualsImage, ' Jump Up'], 30,15, 210,200);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Move right'], 30,15, 350,350);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Move left'], 30,15, 50,350);
  }

  this.FRAME_RATE = 1000/30;

  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new FrogRiverPlayer();
  }
  this.background = undefined;
  this.lilyPadManager = undefined;
  this.backButtonColor = 'yellow';
  this.backButtonTextColor = 'blueViolet';

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/200410.mp3', 73.46);

  this.pregameSpecialCode = function()
  {
    this.lilyPadManager = new LilyPadManager();
    this.lilyPadManager.initializeLilyPads();
    gameAudio.frogJump = new sfxOneShot('audio/V/frogJump.mp3');
    gameAudio.riverComplete = new sfxOneShot('audio/V/riverComplete.mp3');
  }

  this.superInitialize = function()
  {
    this.background = new FrogRiverBackground();
    // initializePromptAndAnswerObjects();
    // promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    // promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
  }

  this.draw = function()
  {
    this.background.draw();
    this.lilyPadManager.drawLilyPads();
    this.playerCharacter.draw();

    if(this.answerCount > -1){
      drawAnswersManager.draw();
    }
    
    promptersManager.drawPromptsWhenAppropriate();
  }

  this.update = function()
  {
    this.lilyPadManager.moveLilyPads();
    this.lilyPadManager.handleOffScreenLilyPads();
    this.playerCharacter.updateCenterX();
    this.playerCharacter.moveWhileOnLilyPad();
    this.playerCharacter.handleOffScreen();
  }

  this.handleLeftArrowDown = function()
  {
    if (this.playerCharacter.y === 600)
    {
      this.playerCharacter.x -= 3;
    }
  };

  this.handleRightArrowDown = function()
  {
    if (this.playerCharacter.y === 600)
    {
      this.playerCharacter.x += 3;
    }
  }

  this.handleUpArrowDown = function()
  {
    if (this.answerCount === -1)
    {
      gameAudio.riverComplete.play();
    }

    if (this.answerCount === -1)
    {
      this.playerCharacter.y = 600;
      this.playerCharacter.currentLilyPad = undefined;
      this.answerCount = 4;
      this.additiveToAnswers = 4;
      this.collisionsWithAnswersManager.resetAnswers();
    }
    else{
      this.playerCharacter.checkForLilyLanding();
    }

  }

  this.answerCount = 4;
  this.additiveToAnswers = 4;
}

const frogRiverGame = new frogRiverGameClass();
