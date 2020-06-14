flyingBeeGameClass.prototype = new GameClass();
function flyingBeeGameClass()
{
  this.name = 'flying bee game';
  this.playerCharacter = undefined;

  this.answersOnRightSide = true;
  this.answersOnLeftSide = false;
  this.toggleAnswerPlacements = function()
  {
    if (this.answersOnRightSide === true)
    {
      this.answersOnRightSide = false;
      this.answersOnLeftSide = true;
    }
    else if (this.answersOnLeftSide === true)
    {
      this.answersOnLeftSide = false;
      this.answersOnRightSide = true;
    }
  }

  this.drawTransitionText = function()
  {
    customFontFillText(['Fly to the answers', symbolExclamationPointImage], 60,30, 100,50);
    customFontFillText([upArrowImage, ' ', symbolEqualsImage, ' Fly up'], 30,15, 210,200);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Fly right'], 30,15, 350,350);
    customFontFillText([downArrowImage, ' ', symbolEqualsImage, ' Fly down'], 30,15, 200,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Fly left'], 30,15, 50,350);
  }

  this.background = new FlyingBeeBackground();
  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/flyingBeeSong.mp3', 14.1);

  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new FlyingBeePlayerCharacter();
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

  this.LETTER_COLOR = 'black';
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';
	this.titleScreenData =
  [
	  {name: "Flying", fontSize: 25, spacing: 15, x: 420, y: 465},{name: "Bee", fontSize: 25, spacing: 10, x: 440, y: 505}
	];

  this.collidingObject = undefined;
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

    gameAudio.beeBuzz = new sfxLooping('audio/V/beeBuzz.mp3');
    gameAudio.beeBuzz.play();
  }

  this.handleLeftArrowDown = function()
	{
		inputManager.leftArrowIsBeingHeld = true;
	}

	this.handleUpArrowDown = function()
	{
		inputManager.upArrowIsBeingHeld = true;
	}

	this.handleRightArrowDown = function()
	{
		inputManager.rightArrowIsBeingHeld = true;
	}

	this.handleDownArrowDown = function()
	{
		inputManager.downArrowIsBeingHeld = true;
	}

  this.handleLeftArrowUp = function()
	{
		inputManager.leftArrowIsBeingHeld = false;
	}

	this.handleUpArrowUp = function()
	{
		inputManager.upArrowIsBeingHeld = false;
	}

	this.handleRightArrowUp = function()
	{
		inputManager.rightArrowIsBeingHeld = false;
	}

	this.handleDownArrowUp = function()
	{
		inputManager.downArrowIsBeingHeld = false;
	}

  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState !== fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
    {
      this.playerCharacter.move();
      // this.moveAnswers();
      // this.handleAnswersOffScreen();
      this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);
    }
  }

  this.draw = function()
  {
    this.background.draw();
    this.playerCharacter.draw();

    drawAnswersManager.draw();
    promptersManager.drawPromptsWhenAppropriate();
  }
}

const flyingBeeGame = new flyingBeeGameClass();

function FlyingBeeBackground()
{
  this.image = 'images\\Backgrounds\\flyingBee.png';
  this.draw = function()
  {
    drawFromSheet(this.image, 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}

function FlyingBeePlayerCharacter()
{
  this.image = 'images/sprites/Flying Bee/Simple Bee Facing Right.png';

  this.width = gameCanvas.width*0.15;
  this.height = gameCanvas.height*0.1;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height/2 - this.height/2;

  this.draw = function()
  {
    if (inputManager.leftArrowIsBeingHeld && !inputManager.upArrowIsBeingHeld &&
        !inputManager.downArrowIsBeingHeld)//flying left
        {
          this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing Left.png';
        }
    else if (inputManager.leftArrowIsBeingHeld && inputManager.upArrowIsBeingHeld &&
        !inputManager.downArrowIsBeingHeld)//flying up left up
        {
          this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing UpLeft.png';
        }
    else if (inputManager.leftArrowIsBeingHeld && !inputManager.upArrowIsBeingHeld &&
             inputManager.downArrowIsBeingHeld)//flying right
             {
               this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing DownLeft.png';
             }
    else if (inputManager.rightArrowIsBeingHeld && inputManager.upArrowIsBeingHeld &&
             !inputManager.downArrowIsBeingHeld)//flying right up
             {
               this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing UpRight.png';
             }
    else if (inputManager.rightArrowIsBeingHeld && !inputManager.upArrowIsBeingHeld &&
             inputManager.downArrowIsBeingHeld)// flying right down
             {
               this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing DownRight.png';
             }
    else if (inputManager.upArrowIsBeingHeld && !inputManager.rightArrowIsBeingHeld &&
             !inputManager.leftArrowIsBeingHeld)// flying up
             {
               this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing Up.png';
             }
    else if (inputManager.downArrowIsBeingHeld && !inputManager.rightArrowIsBeingHeld &&
             !inputManager.leftArrowIsBeingHeld)// flying down
             {
               this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing Down.png';
             }
    else
    {
      this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing Right.png';
    }
      drawFromSheet(this.image, this.x,this.y, this.width,this.height);
      //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.velocity = 7;
  this.move = function()
	{
		//console.log('inside space shooter movePlayer');
		if (inputManager.upArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.y -= this.velocity;
		}
		if (inputManager.rightArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.x += this.velocity;
		}
		if (inputManager.downArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.y += this.velocity;
		}
		if (inputManager.leftArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.x -= this.velocity;
		}
		// this.handleShipAtCanvasBoundaries();
	};


}
