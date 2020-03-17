frogRiverGameClass.prototype = new GameClass();

function frogRiverGameClass()
{
  this.name = 'frogRiverGame';
  this.playerCharacter = undefined;
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = 'px Helvetica';

  this.titleScreenData = [{name: "Frog",fontSize: 27,spacing: 15,x: 530, y: 265},
                          {name: "River",fontSize: 27,spacing: 15,x: 525, y: 305}];

  this.FRAME_RATE = 1000/30;

  this.playerCharacter = undefined;
  this.background = undefined;
  this.lilyPadManager = undefined;
  this.backButtonColor = 'yellow';
  this.backButtonTextColor = 'blueViolet';

  this.superInitialize = function()
  {
    console.log('inside superInitialize of frogRiverGame');
    this.playerCharacter = new FrogRiverPlayer();
    this.background = new FrogRiverBackground();
    this.lilyPadManager = new LilyPadManager();
    this.lilyPadManager.initializeLilyPads();
  }

  this.draw = function()
  {
    this.background.draw();
    this.lilyPadManager.drawLilyPads();
    this.playerCharacter.draw();
  }

  this.update = function()
  {
    this.lilyPadManager.moveLilyPads();
    this.lilyPadManager.handleOffScreenLilyPads();
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
    this.playerCharacter.checkForLilyLanding();
    if (this.playerCharacter.y === 50)
    {
      this.playerCharacter.y -= 50;
      this.playerCharacter.currentLilyPad = undefined;
    }
    if (this.playerCharacter.y === 0)
    {
      this.playerCharacter.y = 650;
    }
  }
}

const frogRiverGame = new frogRiverGameClass();
AVAILABLE_GAMES.push(frogRiverGame);
