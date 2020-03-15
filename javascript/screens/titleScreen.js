const GAME_SPACE_SHOOTER = 7;

function TitleScreenClass()
{
  this.cellXTopLeftCoordinate = 0;
  this.cellYTopLeftCoordinate = 0;

  this.drawHeader = function()
  {
    customFontFillText(['Bundle of 30 Language Games'], 40, 20, 50,25);
    customFontFillText(['Choose A Game ', symbolExclamationPointImage], 25, 20, 175,100);
  }

  this.drawCellsAndCheckForHighlighting = function()
  {
    //basic cell outlines
    gameCanvasContext.strokeStyle = 'white';
    for (let cellRowIndex = 0; cellRowIndex < 5; cellRowIndex++)
    {
      for (let cellColumnIndex = 0; cellColumnIndex < 6; cellColumnIndex++)
      {
        this.cellXTopLeftCoordinate = cellColumnIndex*100 + 20;
        this.cellYTopLeftCoordinate = cellRowIndex*100 + 150;
        gameCanvasContext.strokeRect(this.cellXTopLeftCoordinate,this.cellYTopLeftCoordinate, 100,100);
        //highlight cell if the mouse is inside it
        if (inputManager.mouseCoordinates.x > this.cellXTopLeftCoordinate &&
            inputManager.mouseCoordinates.x < this.cellXTopLeftCoordinate + 100 &&
            inputManager.mouseCoordinates.y > this.cellYTopLeftCoordinate &&
            inputManager.mouseCoordinates.y < this.cellYTopLeftCoordinate + 100)
            {
              gameCanvasContext.fillStyle = 'white';
              gameCanvasContext.fillRect(this.cellXTopLeftCoordinate,this.cellYTopLeftCoordinate, 100,100);
            }
      }
    }
  };
  /* NOTE: this is a list of game names for unimplemented games, when implementing a game,
	 move the corresponding data to its titleScreenData attribute */
  const GAME_NAMES = [
    [{name: "Finder", fontSize: 27, spacing: 15, x: 420, y: 185}],//5
    [{name: "Air", fontSize: 27, spacing: 15, x: 445, y: 265}, {name: "Grab", fontSize: 27, spacing: 15, x: 437, y: 300}],//11
    [{name: "Frogger", fontSize: 27, spacing: 13, x: 520, y: 285}],//12
    [{name: "Memory", fontSize: 27, spacing: 15, x: 122, y: 385}],//14
    [{name: "Penalty", fontSize: 17, spacing: 12, x: 325, y: 375},{name: "Shootout", fontSize: 17, spacing: 12, x: 324, y: 405}],//16 // TODO: game is not implemented yet. Will remove comments when it is implemented.
    //[{name: "Balloon", fontSize: 17, spacing: 12, x: 425, y: 375},{name: "Pop", fontSize: 17, spacing: 12, x: 450, y: 405}],
    [{name: "Daytime", fontSize: 24, spacing: 12, x: 525, y: 380}],
    [{name: "Dodgeball", fontSize: 20, spacing: 10, x: 22, y: 480}],
    [{name: "Unscrambler", fontSize: 19, spacing: 9, x: 122, y: 480}],
    [{name: "Nighttime", fontSize: 20, spacing: 10, x: 222, y: 480}],
    [{name: "Frog", fontSize: 25, spacing: 15, x: 330, y: 465},{name: "Crate", fontSize: 25, spacing: 10, x: 330, y: 505}],
    [{name: "Flying", fontSize: 25, spacing: 15, x: 420, y: 465},{name: "Bee", fontSize: 25, spacing: 10, x: 440, y: 505}],
    [{name: "Fishing", fontSize: 25, spacing: 12, x: 520, y: 480}],
    [{name: "Egg", fontSize: 25, spacing: 12, x: 45, y: 565},{name: "Catch", fontSize: 25, spacing: 10, x: 37, y: 605}]
  ];

  this.drawGameNames = function()
  {
    AVAILABLE_GAMES.forEach(function (game) {
	  const nameDataArray = game.titleScreenData;
  	  nameDataArray.forEach(function(nameData) {
  		customFontFillText(nameData.name, nameData.fontSize, nameData.spacing, nameData.x, nameData.y);
  	  });
    });
	// NOTE: old code kept for drawing names of unavailable games
	GAME_NAMES.forEach(function (nameDataArray) {
  	  nameDataArray.forEach(function(nameData) {
  		customFontFillText(nameData.name, nameData.fontSize, nameData.spacing, nameData.x, nameData.y);
  	  });
    });
  }

  this.drawBackground = function()
  {
    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
  }

  this.draw = function()
  {
    this.drawBackground();
    this.drawHeader();
    this.drawCellsAndCheckForHighlighting();
    this.drawGameNames();
  }


  this.handleGameCellClicks = function()
  {

    // TODO: all the x,y,w,h are stored in GAME_NAMES
    // we could use that data and avoid the giant IF and hardcoded values here

    console.log("MAIN MENU mouse pos is "+inputManager.mouseCoordinates.x+"," +inputManager.mouseCoordinates.y);

    var gameNum = -1;

    var mouseCol = Math.floor((inputManager.mouseCoordinates.x - 20)/100);
    var mouseRow = Math.floor((inputManager.mouseCoordinates.y - 150)/100);
    if (mouseCol >= 0 && mouseCol < 6 && mouseRow >= 0 && mouseRow < 5)
    {
      gameNum = mouseCol + mouseRow *6;
    }
    if (gameNum !== -1)
    {
      if(gameNum == GAME_SPACE_SHOOTER) {
        console.log("trying to load space shooter, special casing it");
        spaceShooterGame.startPlaying();
        playerShouldSeeTitleScreen = false;
        fullGameStateMachine.playingAGameState = true;
        levelIsTransitioning = true;

        if(loadGameNum(gameNum) == false) {
          return;
        }
        gameClassManager.initializeCurrentGame();
        promptsAndAnswersManager.setOrResetPromptsAndAnswers();
      } else {
        loadGameNum(gameNum);
        gameClassManager.initializeCurrentGame();
        promptsAndAnswersManager.setOrResetPromptsAndAnswers();
      }
      gameClassManager.currentGame.postLoadInit();
    }

    // any game
    if (inputManager.mouseCoordinates.x > 20 && inputManager.mouseCoordinates.x < 620 &&
        inputManager.mouseCoordinates.y > 150 && inputManager.mouseCoordinates.y < 650)
        {
          fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.modeSelectScreen);
        }
  }


}

let titleScreen = new TitleScreenClass();

/*//1st row
//snake
else if (inputManager.mouseCoordinates.x > 20 && inputManager.mouseCoordinates.x < 120 &&
         inputManager.mouseCoordinates.y > 250 && inputManager.mouseCoordinates.y < 350)
    {
      spaceShooterGame.startPlaying();
      playerShouldSeeTitleScreen = false;
      fullGameStateMachine.playingAGameState = true;
      levelIsTransitioning = true;
    }
else if (inputManager.mouseCoordinates.x > 220 && inputManager.mouseCoordinates.x < 320 &&
     inputManager.mouseCoordinates.y > 250 && inputManager.mouseCoordinates.y < 350)
{
  // BUBBLE WRAP:
  else if (inputManager.mouseCoordinates.x > 120 && inputManager.mouseCoordinates.x < 220 &&
    inputManager.mouseCoordinates.y > 550 && inputManager.mouseCoordinates.y < 650)
{
  console.log("Clicked Bubble Wrap Button");
    gameClassManager.loadCurrentGame(bubbleWrapGame);

}
  // PINATA GAME:
  else if (inputManager.mouseCoordinates.x > 320 && inputManager.mouseCoordinates.x < 420 &&
      inputManager.mouseCoordinates.y > 250 && inputManager.mouseCoordinates.y < 350)
  {
    console.log("Clicked Pinata Button");
    gameClassManager.loadCurrentGame(pinataGame);
    gameInterval.reset(PINATAFRAMERATE);
  // do we still need to set these?
  playerShouldSeeTitleScreen = false;
  fullGameStateMachine.playingAGameState = true;
      levelIsTransitioning = true;
      if (gameIsOnAServerAndCanUseWebAudioAPI)
      {
          backgroundMusicBufferSource = webAudioAPIContext.createBufferSource();
          currentBackgroundMusic = backgroundMusicBufferSource;
          // FIXME: change to a new song for pinata
          loadWebAudioAPISound('audio/backgroundTracks/runnerBackground.mp3', backgroundMusicBufferSource);
          backgroundMusicBufferSource.loop = true;
          backgroundMusicBufferSource.loopStart = 6.9;
          backgroundMusicBufferSource.loopEnd = 1;
      }

  }
  // FIXME: this may trigger when you click the background and never started a game?
  */
