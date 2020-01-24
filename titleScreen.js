var playerShouldSeeTitleScreen = false;
var playerIsPlayingAnyGame = false;

var cellXTopLeftCoordinate = 0;
var cellYTopLeftCoordinate = 0;

function drawTitleScreen()
{
  drawTitleScreenHeader();
  drawCellTextAndCheckForHighlightingFromMouseOver();
  drawGameNames();
}

function drawTitleScreenHeader()
{
  //title text
  //customFontFillText(sentenceArray, fontSize, spacing, xCoordinate,yCoordinate)
  customFontFillText(['Bundle of 30 Language Games'], 40, 20, 50,25);
  customFontFillText(['Choose A Game ', symbolExclamationPointImage], 25, 20, 175,100);
}

function drawCellTextAndCheckForHighlightingFromMouseOver()
{
  //basic cell outlines
  gameCanvasContext.strokeStyle = 'white';
  for (let cellRowIndex = 0; cellRowIndex < 5; cellRowIndex++)
  {
    for (let cellColumnIndex = 0; cellColumnIndex < 6; cellColumnIndex++)
    {
      cellXTopLeftCoordinate = cellColumnIndex*100 + 20;
      cellYTopLeftCoordinate = cellRowIndex*100 + 150;
      gameCanvasContext.strokeRect(cellXTopLeftCoordinate,cellYTopLeftCoordinate, 100,100);
      //highlight cell if the mouse is inside it
      if (mouseCoordinates.mouseX > cellXTopLeftCoordinate && mouseCoordinates.mouseX < cellXTopLeftCoordinate + 100 &&
          mouseCoordinates.mouseY > cellYTopLeftCoordinate && mouseCoordinates.mouseY < cellYTopLeftCoordinate + 100)
          {
            gameCanvasContext.fillStyle = 'white';
            gameCanvasContext.fillRect(cellXTopLeftCoordinate,cellYTopLeftCoordinate, 100,100);
          }
    }
  }
}

function drawGameNames()
{
  // gameCanvasContext.fillStyle = 'blue';
  // gameCanvasContext.font = '27px Helvetica';


  //row 1
  // gameCanvasContext.fillText('Snake', 29,205);
  customFontFillText("Snake", 27, 15, 30,185);

  // gameCanvasContext.fillText('Bird', 142,205);
  customFontFillText('Bird', 27, 15, 138,185);

  // gameCanvasContext.fillText('Lane', 237,205);
  customFontFillText("Lane", 27, 15, 237,185);

  // gameCanvasContext.fillText('Jumper', 322,205);
  customFontFillText("Jumper", 27, 15, 322,185);

  // gameCanvasContext.fillText('Finder', 429,205);
  customFontFillText("Finder", 27, 15, 420,185);

  // gameCanvasContext.fillText('Catcher', 522,205);
  customFontFillText("Catcher", 22, 12, 527,187);


  //row two
  // gameCanvasContext.fillText('Shooter', 22,305);
  customFontFillText("Shooter", 22, 12, 24,285);

  // gameCanvasContext.fillText('Space', 130, 290);
  // gameCanvasContext.fillText('Shooter', 122,325);
  customFontFillText("Space", 25, 12, 130,270);
  customFontFillText("Shooter", 17, 10, 129,305);

	// gameCanvasContext.fillText('Runner', 224, 305);
  customFontFillText("Runner", 27, 13, 225,285);

  //customFontFillText("Piñata", 27, 15, 322,285);
  customFontFillText("Piñata", 27, 15, 322,285);

  customFontFillText("Air", 27, 15, 445,265);
  customFontFillText("Grab", 27, 15, 437,300);

  customFontFillText("Frog", 27, 15, 535,285);

  //row 3
  customFontFillText('Maze', 27, 15, 37,385);
}

function handleGameCellClicks()
{
  //1st row
  if (mouseCoordinates.mouseX > 20 && mouseCoordinates.mouseX < 120 &&
      mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
  {
    // console.log('snake cell clicked');
    playerShouldBePlayingSnake = true;
    playerShouldSeeTitleScreen = false;
    gameInterval.reset(snakeGameFrameRate);
    playerIsPlayingAnyGame = true;
    setOrResetCorrectLetter();
    levelIsTransitioning = true;
  }
  else if (mouseCoordinates.mouseX > 120 && mouseCoordinates.mouseX < 220 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
      {
        playerShouldBePlayingBird = true;
        playerShouldSeeTitleScreen = false;
        gameInterval.reset(birdGameFrameRate);
        letterSpawnInterval.reset(birdLetterSpawnRate);
        playerIsPlayingAnyGame = true;
        setOrResetCorrectLetter();
        levelIsTransitioning = true;
      }
  else if (mouseCoordinates.mouseX > 220 && mouseCoordinates.mouseX < 320 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
      {
        playerShouldBePlayingLane = true;
        playerShouldSeeTitleScreen = false;
        letterSpawnInterval.reset(laneLetterSpawnRate);
        playerIsPlayingAnyGame = true;
        gameInterval.reset(laneFrameRate);
        setOrResetCorrectLetter();
        levelIsTransitioning = true;
      }
  else if (mouseCoordinates.mouseX > 320 && mouseCoordinates.mouseX < 420 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
      {
        playerShouldBePlayingJumper = true;
        playerShouldSeeTitleScreen = false;
        playerIsPlayingAnyGame = true;
        gameInterval.reset(jumperFrameRate);
        setOrResetCorrectLetter();
        initializeLettersForJumper();
        levelIsTransitioning = true;
      }
  else if (mouseCoordinates.mouseX > 420 && mouseCoordinates.mouseX < 520 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
      {
        playerShouldBePlayingFinder = true;
        playerShouldSeeTitleScreen = false;
        playerIsPlayingAnyGame = true;
        levelIsTransitioning = true;
      }
  else if (mouseCoordinates.mouseX > 520 && mouseCoordinates.mouseX < 620 &&
           mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 250)
      {
        playerShouldBePlayingCatcher = true;
        playerShouldSeeTitleScreen = false;
        playerIsPlayingAnyGame = true;
        levelIsTransitioning = true;
      }

  //2nd row
  else if (mouseCoordinates.mouseX > 120 && mouseCoordinates.mouseX < 220 &&
           mouseCoordinates.mouseY > 250 && mouseCoordinates.mouseY < 350)
      {
        playerShouldBePlayingSpaceShooter = true;
        playerShouldSeeTitleScreen = false;
        playerIsPlayingAnyGame = true;
        gameInterval.reset(spaceShooterFrameRate);
        setOrResetCorrectLetter();
        letterSpawnInterval.reset(spaceShooterLetterSpawnRate);
        levelIsTransitioning = true;
      }
  else if (mouseCoordinates.mouseX > 20 && mouseCoordinates.mouseX < 120 &&
           mouseCoordinates.mouseY > 250 && mouseCoordinates.mouseY < 350)
      {
        playerShouldBePlayingSpaceShooter = true;
        playerShouldSeeTitleScreen = false;
        playerIsPlayingAnyGame = true;
        levelIsTransitioning = true;
      }
	else if (mouseCoordinates.mouseX > 220 && mouseCoordinates.mouseX < 320 &&
			 mouseCoordinates.mouseY > 250 && mouseCoordinates.mouseY < 350)
	{
		gameInterval.reset(RUNNERFRAMERATE);
        letterSpawnInterval.reset(RUNNERLETTERSPAWNRATE);
		playerShouldBePlayingRunner = true;
		playerShouldSeeTitleScreen = false;
		playerIsPlayingAnyGame = true;
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
        playerIsPlayingAnyGame = true;
        levelIsTransitioning = true;
    }

  //any game
  if (mouseCoordinates.mouseX > 20 && mouseCoordinates.mouseX < 620 &&
      mouseCoordinates.mouseY > 150 && mouseCoordinates.mouseY < 650)
      {
        levelIsTransitioning = true;
        transitionIsFadingIn = true;
        // console.log(levelIsTransitioning);
        playARandomSoundInAMultisoundArray(arrayOfUIButtonSounds);
        transitionToLevelMusic1.play();
        gameCanvasContext.globalAlpha = 0.0;
      }

}
