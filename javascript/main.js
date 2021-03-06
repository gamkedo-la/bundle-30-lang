var gameCanvas, gameCanvasContext, statsCanvas, statsCanvasContext, backButton;


window.onload = function()
{


  gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.style.display = "inline";
  gameCanvasContext = gameCanvas.getContext('2d');

  gameCanvasContext.mozImageSmoothingEnabled = false;
  gameCanvasContext.imageSmoothingEnabled = false;
  gameCanvasContext.msImageSmoothingEnabled = false;
  gameCanvasContext.imageSmoothingEnabled = false;

  statsCanvas = document.getElementById("statsCanvas");
  statsCanvas.style.display = 'inline';
  statsCanvasContext = statsCanvas.getContext('2d');
  loadImages();
  loadingAndSplashScreen.drawPleaseWaitForLoadingMessage();

  document.addEventListener('keydown',inputManager.keyDown);
  document.addEventListener('keyup',inputManager.keyUp);
  document.addEventListener('click', inputManager.gameCanvasClick, false);
  gameCanvas.addEventListener('mousemove', inputManager.calculateMousePosition);
  gameInterval = new frameInterval(advanceGameFrame, gameClassManager.currentFrameRate);

  backButton = new BackButton();
  replayPromptButton = new ReplayPromptButton();
  modeSelectScreen = new ModeSelectScreen();
  modeSelectScreen.initialize();
  fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.modeSelectScreen.associatedObject = modeSelectScreen;
  languageSelectionScreen = new LanguageSelectionScreen();
  fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.languageSelectionScreen.associatedObject = languageSelectionScreen;

}

function advanceGameFrame()
{
  updateEverythingInTheGame();
  drawEverythingInTheGame();
}


//update section
function updateEverythingInTheGame()
{
  if (gameClassManager.currentGame !== undefined &&
      fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame)
  {
    gameClassManager.currentGame.update();
  }

  musicManager.update();


}
//end of update section

//draw section
function drawEverythingInTheGame()
{

  if (helperPrompt.isOn)
  {
    helperPrompt.draw();
    return;
  }

  if (fullGameStateMachine.currentState.associatedObject) // can sometimes be undefined
    fullGameStateMachine.currentState.associatedObject.draw();

  backButton.draw();
  replayPromptButton.draw();
  drawStatsBackground();
  drawStats();

  if (debugOn)
  {
    drawDebugStuff();
  }
}
//end of draw section
