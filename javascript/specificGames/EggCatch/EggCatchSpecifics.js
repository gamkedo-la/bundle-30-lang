eggCatchGameClass.prototype = new GameClass();
function eggCatchGameClass()
{
  this.name = 'egg catch game';

  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {

  }

  this.FRAME_RATE = 1000/30;
  this.background = new EggCatchBackground();

  this.titleScreenData =
  [
    {name: "Egg", fontSize: 25, spacing: 12, x: 45, y: 565},
    {name: "Catch", fontSize: 25, spacing: 10, x: 37, y: 605}
  ];

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

  this.LETTER_COLOR = 'black';
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.arrayOfAnswerHolders = [];
  this.eggAnswerHolder1 = new EggAnswerHolder(eggImage1);
  this.eggAnswerHolder2 = new EggAnswerHolder(eggImage2);
  this.arrayOfAnswerHolders.push(this.eggAnswerHolder1);
  this.arrayOfAnswerHolders.push(this.eggAnswerHolder2);
  this.assignAnswerHolder = function()
  {
    let randomNumber = getRandomIntInclusive(0, this.arrayOfAnswerHolders.length - 1);
    return this.arrayOfAnswerHolders[randomNumber];
  }

  this.chicken1 = undefined;
  this.chicken2 = undefined;

  this.answersXSpeed = 4;

  this.pregameSpecialCode = function()
  {

  }

  this.superInitialize = function()
  {
    this.imageAnswerWidth = gameCanvas.width/7;
		this.imageAnswerHeight = gameCanvas.height/9;
		this.audioImageAnswerWidth = gameCanvas.width/6;
    this.audioImageAnswerHeight = gameCanvas.height/7;

    this.imageAnswerHolderWidth = gameCanvas.width/4;
		this.imageAnswerHolderHeight = gameCanvas.height/5;
		this.audioImageAnswerHolderWidth = gameCanvas.width/5;
    this.audioImageAnswerHolderHeight = gameCanvas.height/6;
    drawAnswersManager.initialize();

    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();

    this.playerCharacter = new BasketPlayerCharacter();
    this.chicken1 = new Chicken(gameCanvas.width*0.25,gameCanvas.height*0.22);
    this.chicken2 = new Chicken(gameCanvas.width*0.6,gameCanvas.height*0.22);
  }

  this.handleLeftArrowDown = function()
  {
    this.playerCharacter.x -= 3;
  }

  this.handleRightArrowDown = function()
  {
    this.playerCharacter.x  += 3;
  }

  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState !== fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
    {

      this.moveAnswers();
      this.handleAnswersOffScreen();

    }
   }

   this.draw = function()
   {
     this.background.draw();
     this.playerCharacter.draw();
     this.chicken1.draw();
     this.chicken2.draw();
     drawAnswersManager.draw();
     promptersManager.drawPromptsWhenAppropriate();
   }

   this.moveAnswers = function()
   {
     promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate += 3;
     promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate += 3;
   }

   this.handleAnswersOffScreen = function()
   {

   }
}

const eggCatchGame = new eggCatchGameClass();

function EggCatchBackground()
{
  this.image = eggCatchBackgroundImage;
  this.draw = function()
  {
    gameCanvasContext.drawImage(daytimeImage, 0,0, gameCanvas.width,gameCanvas.height);
    gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}

function EggAnswerHolder(image)
{
  this.image = image;
}
