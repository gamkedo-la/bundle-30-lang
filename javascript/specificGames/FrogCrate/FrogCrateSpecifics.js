frogCrateGameClass.prototype = new GameClass();
function frogCrateGameClass()
{
  this.name = 'frog crate game';
  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new FrogCratePlayer();
    this.playerCharacter.tongue = new Tongue();
    this.collidingObject = this.playerCharacter.tongue;

    let fly1OscillationVelocity = getRandomArbitrary(-0.035,0.035);
    let fly2OscillationVelocity = getRandomArbitrary(-0.035,0.035);

    this.fly1 = new Fly("images\\sprites\\frogCrate\\cartoonFly.png", 1,fly1OscillationVelocity);
    this.fly2 = new Fly("images\\sprites\\frogCrate\\cartoonFly.png", -1, fly2OscillationVelocity);
  }

  this.drawTransitionText = function()
  {
    customFontFillText(['Catch the answers!', symbolExclamationPointImage], 60,30, 50,50);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Move right'], 30,15, 350,350);
    customFontFillText(['Space bar', ' ', symbolEqualsImage, ' Shoot'], 30,15, 175,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Move left'], 30,15, 50,350);
  }

  this.textAnswerFontSize = '15';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';
  this.LETTER_COLOR = "black";

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/200410.mp3', 73.46);

  this.titleScreenData =
  [
    {name: "Frog", fontSize: 25, spacing: 15, x: 330, y: 465},
    {name: "Crate", fontSize: 25, spacing: 10, x: 330, y: 505}
  ]

  this.background = new FrogCrateBackground();

  this.fly1 = undefined;
  this.fly2 = undefined;

  this.intialize = function()
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


  }

  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState !== fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
        {
          this.playerCharacter.move();
          this.playerCharacter.stretchTongue();
          this.playerCharacter.returnTongue();
          this.playerCharacter.updateTongueLength();

          this.moveFlys();
          this.handleFliesAtEdgesOfScreen();
          this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);
        }
  }

  this.moveFlys = function()
  {
    this.fly1.move();
    this.fly2.move();
  }

  this.handleFliesAtEdgesOfScreen = function()
  {
    this.fly1.handleEndOfScreenDirectionChanges();
    this.fly2.handleEndOfScreenDirectionChanges();
  }

  this.draw = function()
  {
    this.background.draw();
    this.playerCharacter.draw();

    this.fly1.draw();
    this.fly2.draw();

    drawAnswersManager.draw();
    promptersManager.drawPromptsWhenAppropriate();
  }

  this.handleRightArrowDown = function()
  {
    inputManager.rightArrowIsBeingHeld = true;
  }
  this.handleRightArrowUp = function()
  {
    inputManager.rightArrowIsBeingHeld = false;
  }

  this.handleLeftArrowDown = function()
  {
    inputManager.leftArrowIsBeingHeld = true;
  }
  this.handleLeftArrowUp = function()
  {
    inputManager.leftArrowIsBeingHeld = false;
  }

  this.handleSpaceBarDown = function()
  {
    console.log('space bar pressed');
    if (this.playerCharacter.tongueShouldBeStretchingOut === true || this.playerCharacter.tongueShouldBeReturningToMouth === true)
    {
      return;
    }

    this.playerCharacter.tongueShouldBeStretchingOut = true;
  }
}

const frogCrateGame = new frogCrateGameClass();

function FrogCrateBackground()
{
  this.waterImage = "images\\Backgrounds\\Lake.png";
  this.grassImage = 'images\\Backgrounds\\Grass.png';
  this.skyImage = "images\\Backgrounds\\Sky.png";
  this.bathStoneImage = "images\\sprites\\frogCrate\\bathStone.png";
  this.draw = function()
  {
    drawFromSheet(this.skyImage, 0,0, gameCanvas.width,gameCanvas.height);
    drawFromSheet(this.grassImage, 0,gameCanvas.height*0.35, gameCanvas.width,gameCanvas.height*0.75);
    drawFromSheet(this.waterImage, 0,gameCanvas.height*0.4, gameCanvas.width,gameCanvas.height*0.5);
    drawFromSheet(this.bathStoneImage, 0,gameCanvas.height*0.9, gameCanvas.width,gameCanvas.height*0.15);
    // gameCanvasContext.drawImage(this.skyImage, 0,0, gameCanvas.width,gameCanvas.height);
    // gameCanvasContext.drawImage(this.grassImage, 0,gameCanvas.height*0.35, gameCanvas.width,gameCanvas.height*0.75);
    // gameCanvasContext.drawImage(this.waterImage, 0,gameCanvas.height*0.4, gameCanvas.width,gameCanvas.height*0.5);
    // gameCanvasContext.drawImage(this.bathStoneImage, 0,gameCanvas.height*0.9, gameCanvas.width,gameCanvas.height*0.15);
  }
}

function FrogCratePlayer()
{
  this.frogInBowlImage = "images\\sprites\\frogCrate\\FrogInBowl.png";


  this.width = gameCanvas.width*0.2;
  this.height = gameCanvas.height*0.15;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height*0.8;

  this.tongue = undefined;

  this.draw = function()
  {
    drawFromSheet(this.tongue.image, this.tongue.x,this.tongue.y, this.tongue.width,this.tongue.height);
    drawFromSheet(this.frogInBowlImage, this.x,this.y, this.width,this.height);
    // gameCanvasContext.drawImage(this.tongue.image, this.tongue.x,this.tongue.y, this.tongue.width,this.tongue.height);
    // gameCanvasContext.drawImage(this.frogInBowlImage, this.x,this.y, this.width,this.height);
  }

  this.move = function()
  {
    if (inputManager.rightArrowIsBeingHeld === true)
    {
      this.x += 5;
      this.tongue.x += 5;
    }
    if (inputManager.leftArrowIsBeingHeld === true)
    {
      this.x -= 5;
      this.tongue.x -= 5;
    }
  }

  this.tongueShouldBeStretchingOut = false;
  this.stretchTongue = function()
  {
    if (this.tongueShouldBeStretchingOut === true)
    {
      this.tongue.y -= 10;
      if (this.tongue.y <= 0)
      {
        this.tongueShouldBeStretchingOut = false;
        this.tongueShouldBeReturningToMouth = true;
      }
    }
  }

  this.tongueShouldBeReturningToMouth = false;
  this.returnTongue = function()
  {
    if (this.tongueShouldBeReturningToMouth === true)
    {
      this.tongue.y += 10;
      if (this.tongue.y >= this.y - 10)
      {
        this.tongue.y = this.y - 10;
        this.tongueShouldBeReturningToMouth = false;
      }
    }
  }

  this.updateTongueLength = function()
  {
    this.tongue.height = this.y - this.tongue.y + 10;
  }
}

function Tongue()
{
  let playerCharacter = gameClassManager.currentGame.playerCharacter;

  this.image = "images\\sprites\\frogCrate\\frogTongue.png";
  this.width = 10;
  this.x = playerCharacter.x + playerCharacter.width/2 - 1.5;
  this.y = playerCharacter.y - 10;
  this.height = playerCharacter.y - playerCharacter.tongueY + 10;
}

function Fly(image, initialDirectionNumber, oscillationVelocityY)
{
  this.image = image;
  this.width = gameCanvas.width*0.1;
  this.height = gameCanvas.height*0.15;
  this.x = getRandomArbitrary(0,gameCanvas.width - this.width);
  this.y = getRandomArbitrary(this.height*2,gameCanvas.height*0.3);

  this.answerStringWidth = 10;
  this.answerStringHeight = 100;
  this.answerStringX = this.x + this.width/2 - this.answerStringWidth;
  this.answerStringY = this.y + this.height/2;

  this.isCorrectAnswer = undefined;
  this.answerX = this.answerStringX - 50;
  this.answerY = this.answerStringY + this.answerStringHeight + this.answerStringHeight;

  this.direction = initialDirectionNumber;

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'brown';
    gameCanvasContext.fillRect(this.answerStringX,this.answerStringY, this.answerStringWidth,this.answerStringHeight);
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.oscillationVelocityY = oscillationVelocityY;
  this.circleAngleInRadians = 0;
  this.move = function()
  {
    this.x += 3*this.direction;
    this.circleAngleInRadians += this.oscillationVelocityY;
    this.y = this.y + Math.sin(this.circleAngleInRadians);

    this.answerStringX += 3*this.direction;
    this.answerStringY = this.answerStringY + Math.sin(this.circleAngleInRadians);

    if (this.isCorrectAnswer === true)
    {
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate += 3*this.direction;
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate = this.y + Math.sin(this.circleAngleInRadians);
    }
    else if (this.isCorrectAnswer === false)
    {
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate += 3*this.direction;
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate = this.y + Math.sin(this.circleAngleInRadians);
    }
    this.answerX += 3*this.direction;
    this.answerY = this.y + Math.sin(this.circleAngleInRadians);
  }

  this.handleEndOfScreenDirectionChanges = function()
  {
    if (this.x <= 0)
    {
      this.direction *= -1;
    }
    if (this.x + this.width >= gameCanvas.width)
    {
      this.direction *= - 1;
    }
  }
}
