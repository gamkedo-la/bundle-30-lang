PassOrBlockGameClass.prototype = new GameClass();
function PassOrBlockGameClass()
{
  this.name = "Pass or Block Game";
  this.FRAME_RATE = 1000/30;

  this.background = undefined;
  this.titleScreenData = [
	{name: "Pass", fontSize: 22, spacing: 12, x: 542, y: 167},
	{name: "Block", fontSize: 22, spacing: 12, x: 535, y: 207}
  ];
  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new Paddle();
    this.collidingObject = this.playerCharacter;
  }
  this.background = undefined;
  this.backButtonColor = 'yellow';
  this.backButtonTextColor = 'blueViolet';

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

  this.currentAnswerHolderWidth = undefined;
  this.currentAnswerHolderHeight = undefined;

  this.arrayOfAnswerHolders = [];

  this.LETTER_COLOR = 'cyan';

  this.correctAnswersYSpeed = 4;
  this.incorrectAnswersYSpeed = 4;

  this.collisionsWithAnswersManager = new PassOrBlockCollisionsManager();

  this.superInitialize = this.initialize;
  this.initialize = function()
  {
    this.imageAnswerWidth = gameCanvas.width/8;
    this.imageAnswerHeight = gameCanvas.height/9;
    this.imageAnswerHolderWidth = gameCanvas.width/4;
    this.imageAnswerHolderHeight = gameCanvas.height/5;

    this.audioImageAnswerWidth = gameCanvas.width/6;
    this.audioImageAnswerHeight = gameCanvas.height/7;
    this.audioImageAnswerHolderWidth = gameCanvas.width/5;
    this.audioImageAnswerHolderHeight = gameCanvas.height/6;

    this.lavaAnswerHolder1 = new LavaAnswerHolder(lavaBall1Image);
    this.lavaAnswerHolder2 = new LavaAnswerHolder(lavaBall2Image);
    this.lavaAnswerHolder3 = new LavaAnswerHolder(lavaBall3Image);
    this.arrayOfAnswerHolders.push(this.lavaAnswerHolder1);
    this.arrayOfAnswerHolders.push(this.lavaAnswerHolder2);
    this.arrayOfAnswerHolders.push(this.lavaAnswerHolder3);


    this.background = new PassOrBlockBackground();
    this.superInitialize();
  }

  this.assignAnswerHolder = function()
  {
      let randomNumber = getRandomIntInclusive(0, this.arrayOfAnswerHolders.length - 1);
      return this.arrayOfAnswerHolders[randomNumber];
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
    if (!promptersManager.shouldBeDrawingAPrompt &&
    fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame)
    {
      this.moveAnswers();
      this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.playerCharacter);
      //this.playerCharacter.handleCollisionsWithAnswers();
      this.background.handleAnswersOffScreen();
    }
  }

  this.handleLeftArrowDown = function()
  {
    this.playerCharacter.x -= 10;
  }

  this.handleRightArrowDown = function()
  {
    this.playerCharacter.x += 10;
  }

  this.moveAnswers = function()
  {
    promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate += this.incorrectAnswersYSpeed;
    promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate += this.correctAnswersYSpeed;
  }
}

const passOrBlockGame = new PassOrBlockGameClass();

function LavaAnswerHolder(image)
{
  this.image = image;
}
