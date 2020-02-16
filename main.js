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
  //gameClassManager.currentGame.updateEverythingInTheGame();
  moveGameSpecificPlayer();
  gameSpecificUpdates();
  handleGameSpecificSpritesOffScreen();
  moveAnswersIfAppropriate();
}

function gameSpecificUpdates()
{
  if (birdGame.isPlaying()) {
	birdGame.update();
  }
  if (SNAKE_GAME.isPlaying())
  {
    SNAKE_GAME.update();
  } else if (laneGame.isPlaying())
  {
    laneGame.update();
  } else if (spaceShooterGame.isPlaying())
  {
	  spaceShooterGame.update();
  } else if (runnerGame.isPlaying()) {
    runnerGame.update();
  }
}

function handleGameSpecificSpritesOffScreen()
{
  if (SNAKE_GAME.isPlaying())
  {
    SNAKE_GAME.wrapSnakeIfOffScreen();
  } else if (birdGame.isPlaying()) {
	birdGame.handleOffScreenSprites();
  }
}
//end of update section

//draw section
function drawEverythingInTheGame()
{

  if (!levelIsTransitioning)
  {
    //gameClassManager.currentGame.drawEverythingInTheGame();
    drawGameSpecificBackground();
    drawBackButton();
    drawGameSpecificPlayer();
    if (spaceShooterGame.isPlaying())
    {
		spaceShooterGame.draw();
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
	} else if (SNAKE_GAME.isPlaying())
  {
    SNAKE_GAME.draw();
  }
  }

  if (levelIsTransitioning)
  {
    drawTransitionScreen();
  }
}
//end of draw section
