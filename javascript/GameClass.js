function GameClass()
{
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
    //console.log('inside initialization of GameClass');
    if (gameClassManager.currentGame.playerCharacter === undefined)
    {
      gameClassManager.currentGame.defineAndInitializePlayerCharacter();
    }
    if (gameClassManager.currentGame.pregameSpecialCode !== undefined)
    {
      gameClassManager.currentGame.pregameSpecialCode();
    }
    gameInterval.reset(this.FRAME_RATE);
    drawAnswersManager.initialize();
  };

  this.gameFrameRate = undefined;//number

  this.imageAnswerWidth = 100;
  this.imageAnswerHeight = 100;
  this.audioImageAnswerWidth = 100;
  this.audioImageAnswerHeight = 100;

  this.textAnswerFontSize  = 30;
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/titleScreenMusic.mp3', 6.1);

  this.update = function(){};
  this.draw = function(){};
}

function GameClassManager()
{
  this.currentGame = undefined;
  this.loadCurrentGame = function(gameToLoad)
  {
    //console.log('inside loadCurrentGame()');
    this.currentGame = gameToLoad;
    if(typeof this.currentGame.pregameSpecialCode !== 'undefined') {
      this.currentGame.pregameSpecialCode();
      //this.initializeCurrentGame();
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
