finderGameClass.prototype = new GameClass();
function finderGameClass()
{
  this.name = 'finder game';
  this.playerCharacter = undefined;

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/finderSong.mp3', 9.6);

  this.drawTransitionText = function()
  {
    customFontFillText(['Unlock the treasure box!', symbolExclamationPointImage], 55,30, 25,50);
    customFontFillText([upArrowImage, ' ', symbolEqualsImage, ' Walk up'], 30,15, 210,200);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Walk right'], 30,15, 350,350);
    customFontFillText([downArrowImage, ' ', symbolEqualsImage, ' Walk down'], 30,15, 200,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Walk left'], 30,15, 50,350);
  }

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
    this.topRoom = new Room('images\\sprites\\Finder\\upperAndMiddleRooms.png', gameCanvas.height*0.2);
    this.middleRoom = new Room('images\\sprites\\Finder\\upperAndMiddleRooms.png', gameCanvas.height*0.2 + gameCanvas.height*0.2);
    this.bottomRoom = new Room('images\\sprites\\Finder\\bottomRoom.png', gameCanvas.height*0.2 + gameCanvas.height*0.2 + gameCanvas.height*0.2);
    this.trophy = {image:'images\\sprites\\Rewards\\Trophy.png',x:this.bottomRoom.x + 20,y:this.bottomRoom.y + 20,width:this.bottomRoom.width*0.6,height:this.bottomRoom.height*0.6};
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
    drawFromSheet(this.trophy.image, this.trophy.x,this.trophy.y, this.trophy.width,this.trophy.height);
    //gameCanvasContext.drawImage(this.trophy.image, this.trophy.x,this.trophy.y, this.trophy.width,this.trophy.height);
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
  this.image = 'images\\Backgrounds\\FinderBG.png';
  this.draw = function()
  {
    drawFromSheet(this.image, 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}

function FinderPlayerCharacter()
{
  this.image = "images\\sprites\\dodgeBall\\Player2.png";

  this.width = gameCanvas.width*0.1;
  this.height = gameCanvas.height*0.15;

  this.startingX = gameCanvas.width/2 - this.width/2;
  this.startingY = gameCanvas.height/2 - this.height/2;

  this.x = this.startingX;
  this.y = this.startingY;

  this.previousX = undefined;
  this.previousY = undefined;

  this.numberOfKeys = 0;

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.move = function()
  {
    this.previousX = this.x;
    this.previousY = this.y;
    if (inputManager.leftArrowIsBeingHeld === true)
    {
      this.x -= 5;
    }
    if (inputManager.upArrowIsBeingHeld === true)
    {
      this.y -= 5;
    }
    if (inputManager.rightArrowIsBeingHeld === true)
    {
      this.x += 5;
    }
    if (inputManager.downArrowIsBeingHeld === true)
    {
      this.y += 5;
    }
  }

  this.handleTrophyCollision = function()
  {
    let trophy = gameClassManager.currentGame.trophy;
    let bottomRoom = gameClassManager.currentGame.bottomRoom;
    let middleRoom = gameClassManager.currentGame.middleRoom;
    let topRoom = gameClassManager.currentGame.topRoom;

    if (this.x + this.width > trophy.x && this.x < trophy.x + trophy.width &&
        this.y + this.height > trophy.y && this.y < trophy.y + trophy.height)
        {
          this.x = this.startingX;
          this.y = this.startingY;
          this.numberOfKeys = 0;
          bottomRoom.hasADoor = true;
          middleRoom.hasADoor = true;
          topRoom.hasADoor = true;
        }
  }
}

function Room(image,y)
{
  this.image = image;
  this.y = y;

  this.width = gameCanvas.width*0.2;
  this.height = gameCanvas.height*0.2;

  this.x = gameCanvas.width - this.width;

  this.leftWallX = this.x;
  this.leftWallTopY = this.y;
  this.leftWallBottomY = this.y + this.height;
  this.wallWidth = 10;
  this.bottomWallLeftX = this.x;
  this.bottomWallRightX = this.x + this.width;
  this.bottomWallY = this.y + this.height;
  this.rightWallX = this.x + this.width;
  this.rightWallTopY = this.y;
  this.rightWallBottomY = this.y + this.height;
  this.doorLeftX = this.x + 10;
  this.doorRightX = this.x + this.width - 10;
  this.doorY = this.y;

  this.hasADoor = true;
  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    if (this.hasADoor)
    {
      drawFromSheet('images\\sprites\\Finder\\door.png', this.x,this.y, this.width,this.height)
      //gameCanvasContext.drawImage(doorImage, this.x,this.y, this.width,this.height);
    }
  }

  this.handlePlayerCollision = function()
  {
    let playerCharacter = gameClassManager.currentGame.playerCharacter;

    if (playerCharacter.previousX < this.leftWallX &&
        playerCharacter.y + playerCharacter.height > this.leftWallTopY &&
        playerCharacter.y < this.leftWallBottomY)
    {
      if (playerCharacter.x + playerCharacter.width > this.leftWallX)
      {
        console.log('left wall collision');
        playerCharacter.x = playerCharacter.previousX;
      }
    }

    if (playerCharacter.previousX > this.leftWallX + 10 &&
        playerCharacter.y + playerCharacter.height > this.leftWallTopY &&
        playerCharacter.y < this.leftWallBottomY)
    {
      if (playerCharacter.x <= this.leftWallX + 10)
      {
        playerCharacter.x = playerCharacter.previousX;
      }
    }

    if (playerCharacter.previousX < this.rightWallX &&
        playerCharacter.y + playerCharacter.height > this.rightWallTopY &&
        playerCharacter.y < this.rightWallBottomY)
    {
      if (playerCharacter.x + playerCharacter.width > this.rightWallX)
      {
        playerCharacter.x = playerCharacter.previousX;
      }
    }

    if (playerCharacter.previousY > 557 &&
        playerCharacter.x + playerCharacter.width > this.bottomWallLeftX &&
        playerCharacter.x < this.bottomWallRightX)
    {
      if (playerCharacter.y <= 557)
      {
        playerCharacter.y = playerCharacter.previousY;
      }
    }

    if (playerCharacter.previousY < 547 &&
        playerCharacter.x + playerCharacter.width > this.bottomWallLeftX &&
        playerCharacter.x < this.bottomWallRightX)
    {
      if (playerCharacter.y >= 547)
      {
        playerCharacter.y = playerCharacter.previousY;
      }
    }

    if (playerCharacter.previousY + playerCharacter.height < this.doorY &&
        playerCharacter.x + playerCharacter.width > this.doorLeftX &&
        playerCharacter.x < this.doorRightX)
    {

      if (playerCharacter.y + playerCharacter.height >= this.doorY)
      {
        console.log('door collision detected');
        if (!this.hasADoor)
        {
          console.log('no door here');
          return;
        }
        else if (this.hasADoor)
        {
          console.log('there is a door');
          if (playerCharacter.numberOfKeys < 1)
          {
            console.log('no key, should not enter room');
            playerCharacter.y = playerCharacter.previousY;
          }
          else if (playerCharacter.numberOfKeys > 0)
          {
            console.log('player has a key, should make the door disappear and room enterable');
            this.hasADoor = false;
            playerCharacter.numberOfKeys -= 1;
            console.log('playerCharacter.numberOfKeys: ' + playerCharacter.numberOfKeys);
          }
        }
      }
    }
  }
}
