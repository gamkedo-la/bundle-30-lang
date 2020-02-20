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

  loadingAndSplashScreen.drawPleaseWaitForLoadingMessage();

  document.addEventListener('keydown',inputManager.keyDown);
  document.addEventListener('keyup',inputManager.keyUp);
  document.addEventListener('click', inputManager.gameCanvasClick, false);
  gameCanvas.addEventListener('mousemove', inputManager.calculateMousePosition);
  gameInterval = new frameInterval(advanceGameFrame, gameClassManager.currentFrameRate);
  letterSpawnInterval = new frameInterval(spawnALetterIfAppropriate, letterSpawnRate);
  letterSpawnInterval.stop();//workaround for infinite spawning at the initialization
}

function advanceGameFrame()
{
  updateEverythingInTheGame();
  drawEverythingInTheGame();
}


//update section
function updateEverythingInTheGame()
{
  if (gameClassManager.currentGame !== undefined)
  {
    gameClassManager.currentGame.update();
  }
}
//end of update section

//draw section
function drawEverythingInTheGame()
{
  switch(fullGameStateMachine.currentState)
  {
    case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.transitionToTitleScreen:
    transitionToTitleScreen.draw();
    break;

    case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.titleScreen:
    titleScreen.draw();
    break;

    case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.transitionToMiniGame:
    miniGameTransitioner.draw();
    break;

    case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
    gameClassManager.currentGame.draw();
  }
  drawStatsBackground();
  drawStats();

  if (debugOn)
  {
    drawDebugStuff();
  }
}
//end of draw section
