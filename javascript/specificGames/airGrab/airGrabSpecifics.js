AirGrabGameClass.prototype = new GameClass();

function AirGrabGameClass()
{
  this.name = 'airGrabGame';

  this.FRAME_RATE = 1000/30;

  this.textAnswerFontSize = 30;
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.LETTER_COLOR = 'black';

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
  this.arrayOfAnswerHolders = [];
  this.assignAnswerHolder = function()
  {
      let randomNumber = getRandomIntInclusive(0, this.arrayOfAnswerHolders.length - 1);
      return this.arrayOfAnswerHolders[randomNumber];
  }

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
    this.imageAnswerWidth = gameCanvas.width/8;
    this.imageAnswerHeight = gameCanvas.height/9;
    this.imageAnswerHolderWidth = gameCanvas.width/4;
    this.imageAnswerHolderHeight = gameCanvas.height/5;

    this.audioImageAnswerWidth = gameCanvas.width/6;
    this.audioImageAnswerHeight = gameCanvas.height/7;
    this.audioImageAnswerHolderWidth = gameCanvas.width/5;
    this.audioImageAnswerHolderHeight = gameCanvas.height/6;

    this.correctTextAnswerHolderWidth = undefined;
    this.incorrectTextAnswerHolderWidth = undefined;

    this.dollarBillAnswerHolder1 = new DollarBillAnswerHolder(bill1Image);
    this.dollarBillAnswerHolder2 = new DollarBillAnswerHolder(bill2Image);
    this.dollarBillAnswerHolder3 = new DollarBillAnswerHolder(bill3Image);
    this.dollarBillAnswerHolder4 = new DollarBillAnswerHolder(bill4Image);
    this.arrayOfAnswerHolders.push(this.dollarBillAnswerHolder1);
    this.arrayOfAnswerHolders.push(this.dollarBillAnswerHolder2);
    this.arrayOfAnswerHolders.push(this.dollarBillAnswerHolder3);
    this.arrayOfAnswerHolders.push(this.dollarBillAnswerHolder4);

    drawAnswersManager.initialize();
    this.background = new AirGrabBackground();
    this.playerCharacter.collisionsWithAnswersManager.initialize(gameClassManager.currentGame);
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

function DollarBillAnswerHolder(image)
{
  this.image = image;
}
