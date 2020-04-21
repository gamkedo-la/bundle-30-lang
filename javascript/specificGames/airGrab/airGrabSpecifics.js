AirGrabGameClass.prototype = new GameClass();

function AirGrabGameClass()
{
  this.name = 'airGrabGame';

  this.FRAME_RATE = 1000/30;

  this.textAnswerFontSize = 30;
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.imageAnswerWidth = undefined;
  this.imageAnswerHeight = undefined;
  this.imageAnswerHolderWidth = undefined;
  this.imageAnswerHolderHeight = undefined;

  this.audioImageAnswerWidth = undefined;
  this.audioImageAnswerHeight = undefined;
  this.audioImageAnswerHolderWidth = undefined;
  this.audioImageAnswerHolderHeight = undefined;

  this.correctTextAnswerHolderWidth = undefined;
  this.incorrectTextAnswerHolderWidth = undefined;

  this.answerHolderImage = undefined;
  this.arrayOfAnswerHolders = [bill1Image,bill2Image,bill3Image,bill4Image]

  this.titleScreenData = [
	  {name: "Air", fontSize: 27, spacing: 15, x: 445, y: 265},
	  {name: "Grab", fontSize: 27, spacing: 15, x: 437, y: 300}
	];

  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new GrabberPlayer();
    this.playerCharacter.initialize();
    this.collidingObject = this.playerCharacter;
  }

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/200412.mp3', 121.62);

  this.background = undefined;

  this.superInitialize = function()
  {
    this.background = new AirGrabBackground();
  }

  this.draw = function()
  {
    this.background.draw();
    this.playerCharacter.draw();
    drawAnswersManager.draw();
    promptersManager.drawPromptsWhenAppropriate();
  }

  this.update = function()
  {

  }

  this.handleClick = function()
  {
    this.playerCharacter.handleClick();
  }
}

const airGrabGame = new AirGrabGameClass();
