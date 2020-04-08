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

	this.LETTER_COLOR = 'white';

	this.playerCharacter = undefined;
	this.defineAndInitializePlayerCharacter = function()
	{
		this.playerCharacter = new LaneCarClass();
		this.collidingObject = this.playerCharacter;
	}

  this.pregameSpecialCode = function()
  {
    gameAudio = {};
    gameAudio.car = new sfxLooping("audio/carEngine02.mp3");
    gameAudio.lane = new sfxOneShot("audio/carRev.mp3");
    gameAudio.playLane = function() {
    	gameAudio.lane.play();
    }
	
  };


  	this.superInitialize = function()
	{

		this.collidingObject = this.playerCharacter;
	  this.background = new LaneBackgroundClass();
	  this.background.initialize();
	  this.initializeLanePositions();
	  promptsAndAnswersManager.defineXAndYCoordinatesForTargets();
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
			this.moveAnswers();
			this.handleAnswersOffScreen();
			collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);
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
