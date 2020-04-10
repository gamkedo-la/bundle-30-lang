frogRiverGameClass.prototype = new GameClass();

function frogRiverGameClass()
{
  this.name = 'frogRiverGame';
  this.playerCharacter = undefined;
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';
  
  this.titleScreenData = [{name: "Frog",fontSize: 27,spacing: 15,x: 530, y: 265},
                          {name: "River",fontSize: 27,spacing: 15,x: 525, y: 305}];

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

  this.pregameSpecialCode = function()
  {
    this.lilyPadManager = new LilyPadManager();
    this.lilyPadManager.initializeLilyPads();
  }

  this.superInitialize = function()
  {
    console.log('inside superInitialize of frogRiverGame');
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
    drawAnswersManager.draw();
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
    if (frogRiverGame.answerCount !== -1)
    {
      this.playerCharacter.checkForLilyLanding();
    }

    if (this.answerCount === -1)
    {
      this.playerCharacter.y = 600;
      this.collisionsWithAnswersManager.resetAnswers();
      this.playerCharacter.currentLilyPad = undefined;
      this.answerCount = 4;
      this.additiveToAnswers = 4;
    }

  }

  this.answerCount = 4;
  this.additiveToAnswers = 4;
}

const frogRiverGame = new frogRiverGameClass();
