function GameClass()
{
  this.pregameSpecialCode = function()
  {
    //console.log("no pregame special code is used by this game");
  };
  this.postLoadInit = function()
  {
    //console.log("no post load special code is used by this game");
  };

  this.initialize = function()
  {
    //console.log('inside initialization of GameClass');
    if (gameClassManager.currentGame.playerCharacter === undefined)
    {
      if (gameClassManager.currentGame !== memoryGame)
      {
        gameClassManager.currentGame.defineAndInitializePlayerCharacter();
      }
    }
    if (gameClassManager.currentGame.pregameSpecialCode !== undefined)
    {
      gameClassManager.currentGame.pregameSpecialCode();
    }
    gameInterval.reset(this.FRAME_RATE);
    drawAnswersManager.initialize();
  };

  this.FRAME_RATE = 30;
  this.gameFrameRate = undefined;//number

  this.imageAnswerWidth = 100;
  this.imageAnswerHeight = 100;
  this.audioImageAnswerWidth = 100;
  this.audioImageAnswerHeight = 100;

  this.textAnswerFontSize  = 30;
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/titleScreenMusic.mp3', 6.1);

  this.collisionsWithAnswersManager = undefined;

  this.backButtonColor = "yellow";

  this.update = function(){};
  this.draw = function(){};
}

function GameClassManager()
{
  this.currentGame = undefined;
  this.loadCurrentGame = function(gameToLoad)
  {

    // If the game has some code to execute after it's done, execute it
    // Check here to make sure it executes even when SINGLE_PLAYER_RANDOM changes the game
    if (this.currentGame !== undefined && this.currentGame.postGameSpecialCode) {
      this.currentGame.postGameSpecialCode();
    }

    //console.log('inside loadCurrentGame()');
    this.currentGame = gameToLoad;

    // this is undefined when the user clicks empty space in the menu screen
    if(typeof this.currentGame === "undefined") {
        //console.log("Ignoring a click on the background of the menu.");
        return;
    }

    if(typeof this.currentGame.pregameSpecialCode !== 'undefined') {
      this.currentGame.pregameSpecialCode();
      //this.initializeCurrentGame();
    } else {
      //console.log("no pregameSpecialCode function for this game type");
    }
    fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame.associatedObject = gameToLoad;
    //console.log('this.currentGame.name: ' + this.currentGame.name);
  }

  this.initializeCurrentGame = function()
  {
    this.currentGame.initialize();

    if (this.currentGame.superInitialize !== undefined)
    {
      this.currentGame.superInitialize();
    }

    if (this.currentGame.collisionsWithAnswersManager == undefined){
      this.currentGame.collisionsWithAnswersManager = new CollisionsWithAnswersManager();
    }

    this.currentGame.collisionsWithAnswersManager.initialize(this.currentGame);
  }

  this.currentFrameRate = 1000/30;
}

let gameClassManager = new GameClassManager();
