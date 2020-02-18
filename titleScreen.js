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
        if (mouseCoordinates.mouseX > this.cellXTopLeftCoordinate && mouseCoordinates.mouseX < this.cellXTopLeftCoordinate + 100 &&
            mouseCoordinates.mouseY > this.cellYTopLeftCoordinate && mouseCoordinates.mouseY < this.cellYTopLeftCoordinate + 100)
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
  ];

  this.drawGameNames = function()
  {
    GAME_NAMES.forEach(function (nameDataArray) {
  	nameDataArray.forEach(function(nameData) {
  	  customFontFillText(nameData.name, nameData.fontSize, nameData.spacing, nameData.x, nameData.y);
  	});
    });
  }

  this.draw = function()
  {
    this.drawHeader();
    this.drawCellsAndCheckForHighlighting();
    this.drawGameNames();
  }
}

let titleScreen = new TitleScreenClass();

function handleGameCellClicks()
{
  //1st row
  if (mouseCoordinates.mouseX > 20 && mouseCoordinates.mouseX < 120 &&
      mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
  {
    // console.log('snake cell clicked');
    gameClassManager.loadCurrentGame(SNAKE_GAME);
    console.log("gameClassManager.currentGame: " + gameClassManager.currentGame);
    SNAKE_GAME.startPlaying();
    SNAKE_GAME.isTransitioningIn = true;
    playerShouldSeeTitleScreen = false;
    gameInterval.reset(SNAKE_GAME.FRAME_RATE);
    fullGameStateMachine.playingAGameState = true;
    // setOrResetCorrectLetter();
    levelIsTransitioning = true;
  }
  else if (mouseCoordinates.mouseX > 120 && mouseCoordinates.mouseX < 220 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
  {
	birdGame.startPlaying();
        playerShouldSeeTitleScreen = false;
	gameInterval.reset(birdGame.frameRate);
	letterSpawnInterval.reset(birdGame.letterSpawnRate);
        fullGameStateMachine.playingAGameState = true;
        // setOrResetCorrectLetter();
        levelIsTransitioning = true;
      }
  else if (mouseCoordinates.mouseX > 220 && mouseCoordinates.mouseX < 320 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
      {
		laneGame.startPlaying();
        playerShouldSeeTitleScreen = false;
        letterSpawnInterval.reset(laneLetterSpawnRate);
        fullGameStateMachine.playingAGameState = true;
        gameInterval.reset(laneFrameRate);
        // setOrResetCorrectLetter();
        levelIsTransitioning = true;
      }
  else if (mouseCoordinates.mouseX > 320 && mouseCoordinates.mouseX < 420 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
      {
        jumperGame.startPlaying();
        playerShouldSeeTitleScreen = false;
        fullGameStateMachine.playingAGameState = true;
        gameInterval.reset(jumperGame.frameRate);
        // setOrResetCorrectLetter();
        initializeLettersForJumper();
        levelIsTransitioning = true;
      }
  else if (mouseCoordinates.mouseX > 420 && mouseCoordinates.mouseX < 520 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
      {
        playerShouldBePlayingFinder = true;
        playerShouldSeeTitleScreen = false;
        fullGameStateMachine.playingAGameState = true;
        levelIsTransitioning = true;
      }
  else if (mouseCoordinates.mouseX > 520 && mouseCoordinates.mouseX < 620 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
      {
        playerShouldBePlayingCatcher = true;
        playerShouldSeeTitleScreen = false;
        fullGameStateMachine.playingAGameState = true;
        levelIsTransitioning = true;
      }

  //2nd row
  else if (mouseCoordinates.mouseX > 120 && mouseCoordinates.mouseX < 220 &&
           mouseCoordinates.mouseY > 250 && mouseCoordinates.mouseY < 350)
      {
        spaceShooterGame.startPlaying();
        playerShouldSeeTitleScreen = false;
        fullGameStateMachine.playingAGameState = true;
        gameInterval.reset(spaceShooterFrameRate);
        // setOrResetCorrectLetter();
        letterSpawnInterval.reset(spaceShooterLetterSpawnRate);
        levelIsTransitioning = true;
      }
  else if (mouseCoordinates.mouseX > 20 && mouseCoordinates.mouseX < 120 &&
           mouseCoordinates.mouseY > 250 && mouseCoordinates.mouseY < 350)
      {
        spaceShooterGame.startPlaying();
        playerShouldSeeTitleScreen = false;
        fullGameStateMachine.playingAGameState = true;
        levelIsTransitioning = true;
      }
	else if (mouseCoordinates.mouseX > 220 && mouseCoordinates.mouseX < 320 &&
			 mouseCoordinates.mouseY > 250 && mouseCoordinates.mouseY < 350)
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
    // pinata 27,15,322,285
    else if (mouseCoordinates.mouseX > 320 && mouseCoordinates.mouseX < 420 &&
        mouseCoordinates.mouseY > 250 && mouseCoordinates.mouseY < 350)
    {   pinataGame.init();

        playerShouldBePlayingPinata = true;
        playerShouldSeeTitleScreen = false;
        fullGameStateMachine.playingAGameState = true;
        levelIsTransitioning = true;
    }

  //any game
  if (mouseCoordinates.mouseX > 20 && mouseCoordinates.mouseX < 620 &&
      mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 650)
      {
        // currentBackgroundMusic.pause();
        levelIsTransitioning = true;
        transitionIsFadingIn = true;
        // console.log(levelIsTransitioning);
        playARandomSoundInAMultisoundArray(arrayOfUIButtonSounds);
        transitionToLevelMusic1.play();
        // currentBackgroundMusic.pause();
        gameCanvasContext.globalAlpha = 0.0;

      }

}
