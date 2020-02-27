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
    console.log('this.currentGame: ' + this.currentGame);
    this.currentGame.initialize();
    fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame.associatedObject = gameToLoad;
    console.log('fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame.associatedObject.name: ' +
                 fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame.associatedObject.name)
  }

  this.currentFrameRate = 1000/30;
}

let gameClassManager = new GameClassManager();