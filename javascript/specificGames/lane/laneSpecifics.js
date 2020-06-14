var laneBackButtonRectangleColor = 'Fuchsia';
var laneBackButtonTextColor = 'yellow';

laneGameClass.prototype = new GameClass();
function laneGameClass() {
	this.name = 'laneGame';
	this.FRAME_RATE = 1000/50;
	this.titleScreenData = [{
	  name: "Lane",
	  fontSize: 27,
	  spacing: 15,
	  x: 237, y: 185
	}];
	this.textAnswerFontSize = 30;
	this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

	this.drawTransitionText = function()
  {
    customFontFillText(['Drive to the answers!', symbolExclamationPointImage], 55,30, 0,50);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Lane Change right'], 40,15, gameCanvas.width*0.225,250);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Lane Change left'], 40,15, gameCanvas.width*0.225,450);
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

	this.amountCorrect = 0;

	this.answerHolderImage = 'images\\sprites\\Lane\\gasCan.png';
	this.assignAnswerHolder = function()
	{
		let gasCanAnswerHolder = new GasCanAnswerHolder(this.answerHolderImage);
		return gasCanAnswerHolder;
	}

	this.LETTER_COLOR = 'white';

	this.playerCharacter = undefined;
	this.defineAndInitializePlayerCharacter = function()
	{
		this.playerCharacter = new LaneCarClass();
		this.collidingObject = this.playerCharacter;
	}

	this.collisionsWithAnswersManager = new LaneCollisionsManager();

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/200419i.mp3', 12.7);

  this.pregameSpecialCode = function()
  {
    gameAudio = {};
    gameAudio.car = new sfxLooping("audio/carEngine02.mp3");
    gameAudio.lane = new sfxOneShot("audio/carRev.mp3");
    gameAudio.playLane = function() {
    	gameAudio.lane.play();
    }

  };

  this.startGameSpecialCode = function()
  {
	  gameAudio.car.play();
  }

  this.postGameSpecialCode = function()
  {
  	gameAudio.car.stop();
  }


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

		drawAnswersManager.initialize();
		this.collidingObject = this.playerCharacter;
	  this.background = new LaneBackgroundClass();
	  this.background.initialize();
	  this.initializeLanePositions();
	  promptsAndAnswersManager.defineXAndYCoordinatesForTargets();
      musicManager.addTrack(new MusicTrack('audio/backgroundTracks/200419.mp3', 76.7));
	};

	this.update = function()
	{
		if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame)
    {
			this.background.moveYellowCenterDashes();
			this.background.handleDashArrayPopulation();
			this.background.laneGrassImage1.scrollDown();
			this.background.laneGrassImage2.scrollDown();
			this.background.laneGrassImage1.handleScrollingOffScreen();
			this.background.laneGrassImage2.handleScrollingOffScreen();
			this.background.asphaltImage1.scrollDown();
			this.background.asphaltImage2.scrollDown();
			this.background.asphaltImage1.handleScrollingOffScreen();
			this.background.asphaltImage2.handleScrollingOffScreen();
			this.background.billboard.move();
			this.background.billboard.handleOffScreen();
			this.moveAnswers();
			this.handleAnswersOffScreen();
			this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);
		}
	};

  this.draw = function()
  {
	  this.background.draw();
	  this.playerCharacter.draw();
		drawAnswersManager.draw();
		promptersManager.drawPromptsWhenAppropriate();
	}

	this.playerCharacter = undefined;

	this.background = undefined;

	this.carLeftLanePosition = undefined;
	this.carRightLanePosition = undefined;

	this.initializeLanePositions = function()
	{
		this.carLeftLanePosition = gameCanvas.width/2 - this.playerCharacter.width - this.playerCharacter.width/2;
		this.carRightLanePosition = gameCanvas.width/2 + this.playerCharacter.width/2;
	}

	this.handleLeftArrowDown = function()
	{
		if (gameClassManager.currentGame.playerCharacter.x !== this.carLeftLanePosition)
		{
			gameClassManager.currentGame.playerCharacter.x = this.carLeftLanePosition;
			gameAudio.playLane();
		}
	}

	this.handleRightArrowDown = function()
	{
		if (gameClassManager.currentGame.playerCharacter.x !== this.carRightLanePosition)
		{
			gameClassManager.currentGame.playerCharacter.x = this.carRightLanePosition;
			gameAudio.playLane();
		}
	}

	this.answersYSpeed = 2.5;

	this.moveAnswers = function()
  {
    promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate += this.answersYSpeed;
    promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate += this.answersYSpeed;
  }

	this.handleAnswersOffScreen = function()
  {
    if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate > gameCanvas.height)
    {
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate = -10;
    }

    if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate > gameCanvas.height)
    {
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate = -10;
    }
  }
}

const laneGame = new laneGameClass();

function LaneCollisionsManager() {
    CollisionsWithAnswersManager.call(this);

    this.insideBoxColliderForStringAnswer = function(
        collidingObject, targetPromptAndAnswerPairing, answerWidth)
    {
        return (targetPromptAndAnswerPairing.yCoordinate + answerWidth/2 > collidingObject.y)
    }
}

LaneCollisionsManager.prototype = new CollisionsWithAnswersManager();
LaneCollisionsManager.prototype.constructor = LaneCollisionsManager;

function LaneCarClass()
{
  this.name = 'lane car';
  this.image = 'images\\sprites\\Lane\\car.png';
  this.x = gameCanvas.width/3.25;
  this.y = gameCanvas.height - gameCanvas.height/4;

  this.width = gameCanvas.width/7;
  this.height = gameCanvas.width/4;

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }
}

function GasCanAnswerHolder(image)
{
  this.image = image;
}

function LaneBackgroundClass()
{

  this.laneGrassImage1 = undefined;
  this.laneGrassImage2 = undefined;

  this.asphaltImage1 = undefined;
  this.asphaltImage2 = undefined;

  this.billboard = undefined;

  this.initialize = function()
  {
    this.laneGrassImage1 = new LaneGrassImage(0, 'images\\Backgrounds\\LaneGrass1.png');
    this.laneGrassImage2 = new LaneGrassImage(-gameCanvas.height, 'images\\Backgrounds\\LaneGrass2.png');

    this.asphaltImage1 = new AsphaltImage(0, 'images\\Backgrounds\\road1.png');
    this.asphaltImage2 = new AsphaltImage(-gameCanvas.height, 'images\\Backgrounds\\road2.png');

    this.billboard = new Billboard();
  }

  let dashPictureNumber = 1;
  let currentDashPicture = 'images\\Backgrounds\\roadDash.png';

  function chooseDashPicture()
  {
    if (dashPictureNumber === 1)
    {
      currentDashPicture = 'images\\Backgrounds\\roadDash.png';
      dashPictureNumber = 2;
    }
    else if (dashPictureNumber === 2)
    {
      currentDashPicture = 'images\\Backgrounds\\roadDash3.png';
      dashPictureNumber = 1;
    }
    return currentDashPicture;
  }

  let arrayOfYellowCenterDashes = [-1, 0, 1, 2, 3, 4, 5, 6].map(function(dashIndex) {
		return {x: 320 - 7.5, y: dashIndex*100, image:chooseDashPicture()};
	});
	let dashHeight = 75;
	let dashWidth = 15;

  this.draw = function()
	{
		this.drawLaneGrass();

	  this.drawLaneRoadAsphalt();
	  drawLaneYellowCenterDashes();
    this.billboard.draw();
	}

	this.drawLaneGrass = function()
	{
    this.laneGrassImage1.draw();
    this.laneGrassImage2.draw();
	}

	this.drawLaneRoadAsphalt = function()
	{
    this.asphaltImage1.draw();
    this.asphaltImage2.draw();
	}

	function drawLaneYellowCenterDashes()
	{
		for (let dashIndex = 0; dashIndex < arrayOfYellowCenterDashes.length; dashIndex++)
		{
      drawFromSheet(arrayOfYellowCenterDashes[dashIndex].image, arrayOfYellowCenterDashes[dashIndex].x,
                                  arrayOfYellowCenterDashes[dashIndex].y, dashWidth,dashHeight)
      // gameCanvasContext.drawImage(arrayOfYellowCenterDashes[dashIndex].image, arrayOfYellowCenterDashes[dashIndex].x,
      //                             arrayOfYellowCenterDashes[dashIndex].y, dashWidth,dashHeight);
		}
	}

	this.moveYellowCenterDashes = function()
	{
		for (let dashIndex = 0; dashIndex < arrayOfYellowCenterDashes.length; dashIndex++)
		{
			arrayOfYellowCenterDashes[dashIndex].y += 3;
		}
	}

	this.spawnANewDashIfAppropriate = function()
	{
		if (arrayOfYellowCenterDashes[0].y > 0)
		{
			arrayOfYellowCenterDashes.unshift({x:320 - 7.5,y:-100,image:chooseDashPicture()});
		}
	}

	this.deleteDashesOffBottomOfScreen = function()
	{
		if (arrayOfYellowCenterDashes[arrayOfYellowCenterDashes.length - 1].y > 700)
		{
			arrayOfYellowCenterDashes.splice(arrayOfYellowCenterDashes.length - 1,1);
		}
	}

	this.handleDashArrayPopulation = function()
	{
		this.spawnANewDashIfAppropriate();
		this.deleteDashesOffBottomOfScreen();
	}
}

function LaneGrassImage(drawingStartingY,image)
{
  this.drawingStartingX = 0;
  this.drawingStartingY = drawingStartingY;
  this.width = gameCanvas.width;
  this.height = gameCanvas.height;
  this.image = image;

  this.draw = function()
  {
    drawFromSheet(image, this.drawingStartingX,this.drawingStartingY, this.width,this.height);
    //gameCanvasContext.drawImage(image, this.drawingStartingX,this.drawingStartingY, this.width,this.height);
  }

  this.scrollDown = function()
  {
    this.drawingStartingY += 3;
  }

  this.handleScrollingOffScreen = function()
  {
    if (this.drawingStartingY > gameCanvas.height)
    {
      this.drawingStartingY = -gameCanvas.height;
    }
  }
}

function AsphaltImage(drawingStartingY, image)
{
  this.drawingStartingX = gameCanvas.width/2 - gameCanvas.width/4;
  this.drawingStartingY = drawingStartingY;
  this.width = gameCanvas.width/2;
  this.height = gameCanvas.height;

  this.image = image;

  this.draw = function()
  {
    drawFromSheet(image, this.drawingStartingX,this.drawingStartingY, this.width,this.height);
    //gameCanvasContext.drawImage(image, this.drawingStartingX,this.drawingStartingY, this.width,this.height);
  }

  this.scrollDown = function()
  {
    this.drawingStartingY += 3;
  }

  this.handleScrollingOffScreen = function()
  {
    if (this.drawingStartingY > gameCanvas.height)
    {
      this.drawingStartingY = -gameCanvas.height;
    }
  }
}

function Billboard()
{
  this.image = 'images\\sprites\\Lane\\billboard.png';
  this.width = gameCanvas.width/4;
  this.height = gameCanvas.height/3;

  this.x = 10;
  this.y = 0;

  this.yVelocity = 3;

  this.move = function()
  {
    this.y += this.yVelocity;
  }

  this.handleOffScreen = function()
  {
    if (this.y > gameCanvas.height)
    {
      this.y = -this.height;
    }
  }

  this.bannerMessageCharacters = ['G','o','o','d',' ','J','o','b','!'];

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);

    let arrayOfCharacterTypes = [];
    for (let bannerMessageIndex = 0; bannerMessageIndex < gameClassManager.currentGame.amountCorrect; bannerMessageIndex++)
             {
               arrayOfCharacterTypes.push(this.bannerMessageCharacters[bannerMessageIndex])
             }
             console.log()
             customFontFillText(arrayOfCharacterTypes, 30, 15, this.x + 15,this.y + 60);
  }
}
