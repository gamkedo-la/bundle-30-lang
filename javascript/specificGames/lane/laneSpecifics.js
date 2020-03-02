var laneBackButtonRectangleColor = 'Fuchsia';
var laneBackButtonTextColor = 'yellow';

function laneGameClass() {
	this.name = 'laneGame';

	this.FRAME_RATE = 1000/50;

	this.textAnswerFontSize = 30;
	this.textAnswerFontStyle = 'px Helvetica';

	this.initialize = function()
	{
		gameInterval.reset(this.FRAME_RATE);
		this.playerCharacter = new LaneCarClass();
		this.background = new LaneBackgroundClass();
		this.initializeLanePositions();
		initializePromptAndAnswerObjects();
		promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
	};

	this.update = function()
	{
		if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame)
    {
			this.background.moveYellowCenterDashes();
			this.background.handleDashArrayPopulation();
			this.moveAnswers();
			this.handleAnswersOffScreen();
			collisionsWithAnswersManager.handleCollisionsWithAnswers();
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
		this.carLeftLanePosition = gameCanvas.width/3;
		this.carRightLanePosition = gameCanvas.width/3 + gameCanvas.width/3.5;
	}

	this.handleLeftArrowDown = function()
	{
		if (gameClassManager.currentGame.playerCharacter.x !== this.carLeftLanePosition)
		gameClassManager.currentGame.playerCharacter.x = this.carLeftLanePosition;
	}

	this.handleRightArrowDown = function()
	{
		if (gameClassManager.currentGame.playerCharacter.x !== this.carRightLanePosition)
		{
			gameClassManager.currentGame.playerCharacter.x = this.carRightLanePosition;
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
