var gameCanvas, gameCanvasContext, statsCanvas, statsCanvasContext, runnerGame;
console.log('Bundle of 30 Language Games Starting...');

window.onload = function()
{
  runnerGame = new runnerGameClass()
  loadImages();

  gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.style.display = "inline";
  gameCanvasContext = gameCanvas.getContext('2d');

  statsCanvas = document.getElementById("statsCanvas");
  statsCanvas.style.display = 'inline';
  statsCanvasContext = statsCanvas.getContext('2d');

  drawPleaseWaitForLoadingMessage();


  document.addEventListener('keydown',keyDown);
  document.addEventListener('keyup',keyUp);
  document.addEventListener('click', gameCanvasClick, false);
  gameCanvas.addEventListener('mousemove', calculateMousePosition);
  gameInterval = new frameInterval(advanceGameFrame, frameRate);
  letterSpawnInterval = new frameInterval(spawnALetterIfAppropriate, letterSpawnRate);
  letterSpawnInterval.stop();//workaround for infinite spawning at the initialization

  // initializeCorrectLetterAudioTag();
}

function advanceGameFrame()
{
  updateEverythingInTheGame();
  drawEverythingInTheGame();
}


//update section
function updateEverythingInTheGame()
{
  moveGameSpecificPlayer();
  gameSpecificUpdates();
  handleGameSpecificSpritesOffScreen();
  //moveLettersIfAppropriate();//change to promptAndAnswerClass
  moveAnswersIfAppropriate();
  //handleCollisionsWithLetters();//change to promptAndAnswerClass
  handleCollisionsWithAnswers();
  // if (webAudioAPIContext.)
}

function gameSpecificUpdates()
{
  if (playerShouldBePlayingSnake)
  {
    updateSnakeTail();
  } else if (playerShouldBePlayingLane)
  {
    moveYellowCenterDashes();
    handleDashArrayPopulation();
  } else if (playerShouldBePlayingSpaceShooter)
  {
    moveSpaceShooterBullets();
  } else if (runnerGame.isPlaying()) {
    runnerGame.update();
  }
}

function handleGameSpecificSpritesOffScreen()
{
  if (playerShouldBePlayingSnake)
  {
    wrapSnakeIfOffScreen();
  } else if (playerShouldBePlayingBird) {
    handleBirdOffScreenPossibilities();
  }
}
//end of update section

//draw section
function drawEverythingInTheGame()
{
  if (!levelIsTransitioning)
  {
    drawGameSpecificBackground();
    drawBackButton();
    drawGameSpecificPlayer();
    if (playerShouldBePlayingSpaceShooter)
    {
      drawSpaceShooterBullets();
    }
    drawLetters();//change to promptAndAnswerClass
    //drawAnswers();
    drawStatsBackground();
    drawStats();

    if (debugOn)
    {
      drawDebugStuff();
    }

    if (runnerGame.isPlaying()) {
		runnerGame.draw();
	}
  }

  if (levelIsTransitioning)
  {
    drawTransitionScreen();
  }

  gameCanvasContext.drawImage(womenImage, 0,0, 80,70);
  gameCanvasContext.drawImage(womanImage, 0,70, 80,70);
  gameCanvasContext.drawImage(manImage, 0,140, 80,70);
  gameCanvasContext.drawImage(menImage, 0,210, 80,70);
}
//end of draw section
