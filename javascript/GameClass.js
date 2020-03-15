function GameClass()
{
  let gameIsPlaying = false;

  this.isPlaying = function() {
	   return gameIsPlaying;
  };

  this.startPlaying = function() {
	   gameIsPlaying = true;
  };

  this.stopPlaying = function() {
	   gameIsPlaying = false;
  };

  this.pregameSpecialCode = function()
  {
    console.log("no pregame special code is used by this game");
  };
  this.postLoadInit = function()
  {
    console.log("no post load special code is used by this game");
  };

  this.initialize = function()
  {
    console.log('initialize function from GameClass');
	  initializePromptAndAnswerObjects();
	  gameInterval.reset(this.FRAME_RATE);
    promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
  };

  this.gameFrameRate = undefined;//number
  this.update = function(){};
  this.draw = function(){};
}

function GameClassManager()
{
  this.currentGame = undefined;
  this.loadCurrentGame = function(gameToLoad)
  {
    this.currentGame = gameToLoad;
    if(typeof this.currentGame.pregameSpecialCode !== 'undefined') {
      this.currentGame.pregameSpecialCode();
    } else {
      console.log("no pregameSpecialCode function for this game type");
    }
    fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame.associatedObject = gameToLoad;
    console.log('this.currentGame.name: ' + this.currentGame.name);
  }

  this.initializeCurrentGame = function()
  {
    this.currentGame.initialize();
    if (this.currentGame.superInitialize !== undefined)
    {
      this.currentGame.superInitialize();
    }
  }

  this.currentFrameRate = 1000/30;
}

let gameClassManager = new GameClassManager();
