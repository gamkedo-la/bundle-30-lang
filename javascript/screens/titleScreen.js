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
  }

  const GAME_NAMES = [
    [{name: "Snake", fontSize: 27, spacing: 15, x: 30, y: 185}],//1
    [{name: "Bird", fontSize: 27, spacing: 15, x: 138, y: 185}],//2
    [{name: "Lane", fontSize: 27, spacing: 15, x: 237, y: 185}],//3
    [{name: "Jumper", fontSize: 27, spacing: 15, x: 322, y: 185}],//4
    [{name: "Finder", fontSize: 27, spacing: 15, x: 420, y: 185}],//5
    [{name: "Catcher", fontSize: 22, spacing: 12, x: 527, y: 187}],//6
    [{name: "Shooter", fontSize: 22, spacing: 12, x: 24, y: 285}],//7
    [{name: "Space", fontSize: 25, spacing: 12, x: 130, y: 270}, {name: "Shooter", fontSize: 17, spacing: 10, x: 129, y: 305}],//8
    [{name: "Runner", fontSize: 27, spacing: 13, x: 225, y: 285}],//9
    [{name: "Piñata", fontSize: 27, spacing: 15, x: 322, y: 285}],//10
    [{name: "Air", fontSize: 27, spacing: 15, x: 445, y: 265}, {name: "Grab", fontSize: 27, spacing: 15, x: 437, y: 300}],//11
    [{name: "Frog", fontSize: 27, spacing: 15, x: 535, y: 285}],//12
    [{name: "Maze", fontSize: 27, spacing: 15, x: 37, y: 385}],//13
    [{name: "Memory", fontSize: 27, spacing: 15, x: 122, y: 385}],//14
    [{name: "Flower", fontSize: 27, spacing: 15, x: 222, y: 385}],//15

  ];

  this.drawGameNames = function()
  {
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

    //1st row
    //snake
    if (inputManager.mouseCoordinates.x > 20 && inputManager.mouseCoordinates.x < 120 &&
        inputManager.mouseCoordinates.y > 150 && inputManager.mouseCoordinates.y < 250)
    {
      gameClassManager.loadCurrentGame(SNAKE_GAME);
    }
    //bird
    else if (inputManager.mouseCoordinates.x > 120 && inputManager.mouseCoordinates.x < 220 &&
             inputManager.mouseCoordinates.y > 150 && inputManager.mouseCoordinates.y < 250)
    {
    console.log('inside check coordinates of birdGame mouse click');
    gameClassManager.loadCurrentGame(birdGame);

    }
    else if (inputManager.mouseCoordinates.x > 220 && inputManager.mouseCoordinates.x < 320 &&
             inputManager.mouseCoordinates.y > 150 && inputManager.mouseCoordinates.y < 250)
    {
	  gameClassManager.loadCurrentGame(laneGame);
    }
    else if (inputManager.mouseCoordinates.x > 320 && inputManager.mouseCoordinates.x < 420 &&
             inputManager.mouseCoordinates.y > 150 && inputManager.mouseCoordinates.y < 250)
    {
	  gameClassManager.loadCurrentGame(jumperGame);
    }
    else if (inputManager.mouseCoordinates.x > 420 && inputManager.mouseCoordinates.x < 520 &&
             inputManager.mouseCoordinates.y > 150 && inputManager.mouseCoordinates.y < 250)
        {
          playerShouldBePlayingFinder = true;
          playerShouldSeeTitleScreen = false;
          fullGameStateMachine.playingAGameState = true;
          levelIsTransitioning = true;
        }
    else if (inputManager.mouseCoordinates.x > 520 && inputManager.mouseCoordinates.x < 620 &&
             inputManager.mouseCoordinates.y > 150 && inputManager.mouseCoordinates.y < 250)
        {
          playerShouldBePlayingCatcher = true;
          playerShouldSeeTitleScreen = false;
          fullGameStateMachine.playingAGameState = true;
          levelIsTransitioning = true;
        }

    //2nd row
    else if (inputManager.mouseCoordinates.x > 120 && inputManager.mouseCoordinates.x < 220 &&
             inputManager.mouseCoordinates.y > 250 && inputManager.mouseCoordinates.y < 350)
        {
          spaceShooterGame.startPlaying();
          playerShouldSeeTitleScreen = false;
          fullGameStateMachine.playingAGameState = true;
          gameInterval.reset(spaceShooterFrameRate);
          // setOrResetCorrectLetter();
          letterSpawnInterval.reset(spaceShooterLetterSpawnRate);
          levelIsTransitioning = true;
        }
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
  		gameInterval.reset(RUNNERFRAMERATE);
        letterSpawnInterval.reset(RUNNERLETTERSPAWNRATE);
  		runnerGame.startPlaying();
  		playerShouldSeeTitleScreen = false;
  		fullGameStateMachine.playingAGameState = true;
          levelIsTransitioning = true;
          if (gameIsOnAServerAndCanUseWebAudioAPI)
          {
              backgroundMusicBufferSource = webAudioAPIContext.createBufferSource();
              currentBackgroundMusic = backgroundMusicBufferSource;
              loadWebAudioAPISound('audio/backgroundTracks/runnerBackground.mp3', backgroundMusicBufferSource);
              backgroundMusicBufferSource.loop = true;
              backgroundMusicBufferSource.loopStart = 6.9;
              backgroundMusicBufferSource.loopEnd = 1;
          }
      }
      // PINATA GAME:
      else if (inputManager.mouseCoordinates.x > 320 && inputManager.mouseCoordinates.x < 420 &&
          inputManager.mouseCoordinates.y > 250 && inputManager.mouseCoordinates.y < 350)
      {
        gameClassManager.loadCurrentGame(pinataGame);
        gameInterval.reset(PINATAFRAMERATE);
        letterSpawnInterval.reset(999999999999999); // never? FIXME
        //pinataGame.initialize(); // this is now called by the game nanager somewhere
        //runnerGame.startPlaying();
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
      //flower
      else if (inputManager.mouseCoordinates.x > 220 && inputManager.mouseCoordinates.x < 320 &&
             inputManager.mouseCoordinates.y > 350 && inputManager.mouseCoordinates.y < 450)
             {
             gameClassManager.loadCurrentGame(flowerGame);
             }
      // FIXME: this may trigger when you click the background and never started a game?
      // any game
    if (inputManager.mouseCoordinates.x > 20 && inputManager.mouseCoordinates.x < 620 &&
        inputManager.mouseCoordinates.y > 150 && inputManager.mouseCoordinates.y < 650)
        {
          if (gameClassManager.currentGame) console.log("gameClassManager.currentGame: " + gameClassManager.currentGame.name);
          miniGameTransitioner.initialize();
          audioManager.currentBackgroundMusic.pause();
          fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.transitionToMiniGame);

          audioManager.multisoundPlayer.playARandomSoundInAMultisoundArray(audioManager.multisoundPlayer.arrayOfUIButtonSounds);
          audioManager.transitionToLevelMusic1.play();
          // gameCanvasContext.globalAlpha = 0.0;
        }
  }
}

let titleScreen = new TitleScreenClass();
