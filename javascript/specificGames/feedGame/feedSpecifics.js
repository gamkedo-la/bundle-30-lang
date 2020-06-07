feedGameClass.prototype = new GameClass();

function feedGameClass()
{
  this.name = 'feedGame';

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
	  {name: "Feed", fontSize: 27, spacing: 15, x: 122, y: 480},
	  {name: "Who", fontSize: 27, spacing: 15, x: 126, y: 495}
	];

  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new FeedGrabberPlayer();
    this.playerCharacter.initialize();
    this.collidingObject = this.playerCharacter;
  }

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/200412.mp3', 121.62);

  this.background = undefined;
  
  this.pregameSpecialCode = function()
  {
    gameAudio = {};
    gameAudio.clap = new sfxMulti(['audio/clap1.mp3','audio/clap2.mp3','audio/clap3.mp3','audio/clap4.mp3']);
    gameAudio.paperCrumple = new sfxMulti(['audio/paper1.mp3','audio/paper2.mp3','audio/paper3.mp3']);
  };

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

    this.foodAnswerHolder1 = new FoodAnswerHolder(bill1Image);
    this.foodAnswerHolder2 = new FoodAnswerHolder(bill2Image);
    this.foodAnswerHolder3 = new FoodAnswerHolder(bill3Image);
    this.foodAnswerHolder4 = new FoodAnswerHolder(bill4Image);
    this.arrayOfAnswerHolders.push(this.foodAnswerHolder1);
    this.arrayOfAnswerHolders.push(this.foodAnswerHolder2);
    this.arrayOfAnswerHolders.push(this.foodAnswerHolder3);
    this.arrayOfAnswerHolders.push(this.foodAnswerHolder4);

    this.initializeAnswerSettings();
    drawAnswersManager.initialize();
    this.background = new feedBackground();
    this.playerCharacter = new feedPlayerCharacter();
    this.collisionsWithAnswersManager = new feedCollisionsManager();
    //this.playerCharacter.collisionsWithAnswersManager.initialize(gameClassManager.currentGame);
  }

  this.draw = function()
  {
    this.playerCharacter.draw();
    drawAnswersManager.draw();
    this.background.draw();


    promptersManager.drawPromptsWhenAppropriate();
  }

  this.update = function()
  {
    this.moveAnswers();
  }

  this.handleClick = function()
  {
    //this.playerCharacter.handleClick();
  }

  this.moveAnswers = function()
  {
    let correctAnswer = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing;
    let incorrectAnswer = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing;



    correctAnswer.radians += correctAnswer.circlePathVelocity;
    correctAnswer.xCoordinate = correctAnswer.xCoordinate + (Math.cos(correctAnswer.radians) * 10) + correctAnswer.xSpeed;
    correctAnswer.yCoordinate = correctAnswer.yCoordinate + (Math.sin(correctAnswer.radians) * 10) + correctAnswer.ySpeed;

    incorrectAnswer.radians += incorrectAnswer.circlePathVelocity;
    incorrectAnswer.xCoordinate = incorrectAnswer.xCoordinate + (Math.cos(incorrectAnswer.radians) * 10) + incorrectAnswer.xSpeed;
    incorrectAnswer.yCoordinate = incorrectAnswer.yCoordinate + (Math.sin(incorrectAnswer.radians) * 10) + incorrectAnswer.ySpeed;
    this.checkAnswerWallCollisions();
  }

  this.updateAnswerPositions = function()
  {
    let correctAnswer = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing;
    let incorrectAnswer = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing;
    //move points over time

  }

  this.checkAnswerWallCollisions = function()
  {
    let correctAnswer = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing;
    let incorrectAnswer = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing;

    if (correctAnswer.xCoordinate + 50 > 500 || correctAnswer.xCoordinate  - 50 < 100)
    {
      correctAnswer.xSpeed *= -1;
    }
    if (correctAnswer.yCoordinate + 50 > 600 || correctAnswer.yCoordinate - 50 < 150)
    {
      correctAnswer.ySpeed *= -1;
    }

    if (incorrectAnswer.xCoordinate + 50 > 500 || incorrectAnswer.xCoordinate  - 50 < 100)
    {

      incorrectAnswer.xSpeed *= -1;
    }
    if (incorrectAnswer.yCoordinate + 50 > 600 || incorrectAnswer.yCoordinate - 50 < 150)
    {
      incorrectAnswer.ySpeed *= -1;
    }
  }

  this.initializeAnswerSettings = function()
  {
    promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xSpeed = getRandomArbitrary(-3,3);
    promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.ySpeed = getRandomArbitrary(-3,3);
    promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xSpeed = getRandomArbitrary(-3,3);
    promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.ySpeed = getRandomArbitrary(-3,3);
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
    this.image = armlessBodyImage;
  
    this.draw = function()
    {
      gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    }
  }