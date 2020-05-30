finderGameClass.prototype = new GameClass();
function finderGameClass()
{
  this.name = 'finder game';
  this.playerCharacter = undefined;

  this.backgroundMusic = undefined;

  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new FinderPlayerCharacter();
  }

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

  this.LETTER_COLOR = 'white';
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.titleScreenData =
  [
    {name: "Finder", fontSize: 27, spacing: 15, x: 420, y: 185}
  ];

  this.collidingObject = undefined;
  this.topRoom = undefined;
  this.middleRoom = undefined;
  this.bottomRoom = undefined;

  this.trophy = undefined;
  this.initialize = function()
  {
    this.defineAndInitializePlayerCharacter();

    this.imageAnswerWidth = gameCanvas.width*0.1;
    this.imageAnswerHeight = gameCanvas.height*0.1;
    this.audioImageAnswerWidth = gameCanvas.width*0.1;
    this.audioImageAnswerHeight = gameCanvas.height*0.1;

    this.imageAnswerHolderWidth = gameCanvas.width*0.15;
    this.imageAnswerHolderHeight = gameCanvas.height*0.15;
    this.audioImageAnswerHolderWidth = gameCanvas.width*0.15;
    this.audioImageAnswerHolderHeight = gameCanvas.height*0.15;
    drawAnswersManager.initialize();

    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
    this.collidingObject = this.playerCharacter;

    this.background = new finderBackground();
    this.topRoom = new Room(upperAndMiddleRoomsImage, gameCanvas.height*0.2);
    this.middleRoom = new Room(upperAndMiddleRoomsImage, gameCanvas.height*0.2 + gameCanvas.height*0.2);
    this.bottomRoom = new Room(bottomRoomImage, gameCanvas.height*0.2 + gameCanvas.height*0.2 + gameCanvas.height*0.2);
    this.trophy = {image:trophyImage,x:this.bottomRoom.x + 20,y:this.bottomRoom.y + 20,width:this.bottomRoom.width*0.6,height:this.bottomRoom.height*0.6};
  }

  this.handleLeftArrowDown = function()
  {
    inputManager.leftArrowIsBeingHeld = true;
  }
  this.handleLeftArrowUp = function()
  {
    inputManager.leftArrowIsBeingHeld = false;
  }
  this.handleRightArrowDown = function()
  {
    inputManager.rightArrowIsBeingHeld = true;
  }
  this.handleRightArrowUp = function()
  {
    inputManager.rightArrowIsBeingHeld = false;
  }
  this.handleDownArrowDown = function()
  {
    inputManager.downArrowIsBeingHeld = true;
  }
  this.handleDownArrowUp = function()
  {
    inputManager.downArrowIsBeingHeld = false;
  }
  this.handleUpArrowDown = function()
  {
    inputManager.upArrowIsBeingHeld = true;
  }
  this.handleUpArrowUp = function()
  {
    inputManager.upArrowIsBeingHeld = false;
  }

  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState !== fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
    {
      this.playerCharacter.move();
      this.topRoom.handlePlayerCollision();
      this.middleRoom.handlePlayerCollision();
      this.bottomRoom.handlePlayerCollision();
      this.playerCharacter.handleTrophyCollision();
    }
    this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);
  }

  this.draw = function()
  {
    this.background.draw();
    this.playerCharacter.draw();
    this.topRoom.draw();
    this.middleRoom.draw();
    this.bottomRoom.draw();
    gameCanvasContext.drawImage(this.trophy.image, this.trophy.x,this.trophy.y, this.trophy.width,this.trophy.height);
    drawAnswersManager.draw();
    promptersManager.drawPromptsWhenAppropriate();
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.font = "30px Helvetica";
    gameCanvasContext.fillText('You have ' + this.playerCharacter.numberOfKeys + ' keys', gameCanvas.width/2 - 100,gameCanvas.height*0.1);
  }
}

const finderGame = new finderGameClass();

function finderBackground()
{
  this.image = finderBackgroundImage;
  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}
