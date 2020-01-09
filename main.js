var gameCanvas, gameCanvasContext, statsCanvas, statsCanvasContext;
console.log('anything');

window.onload = function()
{

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
  moveLettersIfAppropriate();
  handleCollisionsWithLetters();
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
  } else if (playerShouldBePlayingRunner) {
	  updateRunnerWorld();
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
    drawLetters();
    drawStatsBackground();
    drawStats();

    if (debugOn)
    {
      drawDebugStuff();
    }

  	if (playerShouldBePlayingRunner) {
  		drawRunnerWorld();
  	}
  }

  if (levelIsTransitioning)
  {
    drawTransitionScreen();
  }
}
//end of draw section
