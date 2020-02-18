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
  }
}

let gameClassManager = new GameClassManager();
