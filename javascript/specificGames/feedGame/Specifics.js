feedGameClass.prototype = new GameClass();
function feedGameClass()
{
  this.name = "feedGame";
  this.FRAME_RATE = 1000/30;

  this.background = undefined;
  this.titleScreenData =
  [
  	{name: "Feed", fontSize: 28, spacing: 11, x: 125, y: 478},
  	{name: "Who", fontSize: 28, spacing: 12, x: 125, y: 500}
  ];

  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new Paddle();
    this.collidingObject = this.playerCharacter;
  }

  this.background = undefined;
  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/PassBlockVolcano.mp3',66.5);
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

  this.fireLavaParticleManager = undefined;

  this.arrayOfAnswerHolders = [];
  this.arrayOfUpsideDownAnswerHolders = [];

  this.LETTER_COLOR = 'cyan';

  this.correctAnswersYSpeed = 4;
  this.incorrectAnswersYSpeed = 4;

  //this.collisionsWithAnswersManager = new feedCollisionsManager();

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

    this.foodAnswerHolder1 = new FoodAnswerHolder(lavaBall1Image);
    this.foodAnswerHolder2 = new FoodAnswerHolder(lavaBall2Image);
    this.foodAnswerHolder3 = new FoodAnswerHolder(lavaBall3Image);
    this.arrayOfAnswerHolders.push(this.foodAnswerHolder1);
    this.arrayOfAnswerHolders.push(this.foodAnswerHolder2);
    this.arrayOfAnswerHolders.push(this.foodAnswerHolder3);

    this.background = new feedBackground();
    this.playerCharacter = new feedPlayerCharacter();
    this.collisionsWithAnswersManager = new feedCollisionsManager();
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
      //setInterval(this.fireLavaParticleManager.generateAParticle(),250);
      this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.playerCharacter);
      this.background.handleAnswersOffScreen();
    }
  }

  this.handleLeftArrowDown = function()
  {
    this.playerCharacter.x -= 10;

    for (let i = 0; i < this.playerCharacter.arrayOfGems.length; i++)
    {
      this.playerCharacter.arrayOfGems[i].x -= 10;
    }
  }

  this.handleRightArrowDown = function()
  {
    this.playerCharacter.x += 10;

    for (let i = 0; i < this.playerCharacter.arrayOfGems.length; i++)
    {
      this.playerCharacter.arrayOfGems[i].x += 10;
    }
  }

  this.moveAnswers = function()
  {
    promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate += this.incorrectAnswersYSpeed;
    promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate += this.correctAnswersYSpeed;
  }
}

const feedGame = new feedGameClass();

function FoodAnswerHolder(image)
{
  this.image = image;
}

function feedPlayerCharacter()
  {
    this.width = gameCanvas.width*0.2;
    this.height = gameCanvas.height*0.1;
    this.x = gameCanvas.width/2 - this.width/2;
    this.y = gameCanvas.height*0.8;
    this.image = basketImage;

    this.draw = function()
    {
      gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    }
  }
