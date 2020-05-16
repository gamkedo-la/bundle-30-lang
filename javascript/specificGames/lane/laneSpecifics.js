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

	this.answerHolderImage = gasCanImage;
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
