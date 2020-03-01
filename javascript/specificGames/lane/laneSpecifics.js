var laneBackButtonRectangleColor = 'Fuchsia';
var laneBackButtonTextColor = 'yellow';

function laneGameClass() {
	this.name = 'laneGame';

	this.FRAME_RATE = 1000/50;

	this.initialize = function()
	{
		gameInterval.reset(this.FRAME_RATE);
		this.playerCharacter = new LaneCarClass();
		this.background = new LaneBackgroundClass();
		this.initializeLanePositions();
		this.initializePromptAndAnswerObjects();
    this.shuffleAndResetPromptsAndAnswers();
		this.loadPromptsManager();
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
			this.handleCollisionsWithAnswers();
		}
	};

  this.draw = function()
  {
	  this.background.draw();
	  this.playerCharacter.draw();
		drawAnswersManager.draw();
		this.drawPromptsWhenAppropriate();
	}

	this.drawPromptsWhenAppropriate = function()
  {
    if (promptersManager.shouldBeDrawingAPrompt)
    {
			console.log('inside drawing prompt when appropriate');
      promptersManager.currentPrompter.updatePromptImage();
      promptersManager.currentPrompter.drawThePrompt();
    }
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

	this.initializePromptAndAnswerObjects = function()
  {
    initializePromptAndAnswerObjects();
  }

  this.shuffleAndResetPromptsAndAnswers = function()
  {
    promptsAndAnswersManager.setOrResetPromptsAndAnswers();
  }

  this.loadPromptsManager = function()
  {
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
  }

  this.promptThePlayer = function()
  {
    promptersManager.promptThePlayer();
  }

	this.answersYSpeed = 5;

	this.moveAnswers = function()
  {
		console.log('inside move answers in lane game');
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

	this.handleCollisionsWithAnswers = function()
	{
		collisionsWithAnswersManager.handleCollisionsWithAnswers();
	}
}

const laneGame = new laneGameClass();
