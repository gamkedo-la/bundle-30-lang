var playerShouldSeePleaseWaitForDownloading = true;

function promptPlayerForClickAfterLoading()
{
  drawLoadingOrSplashOrTitleScreenBackground();
  gameCanvasContext.fillStyle = 'lime';
  gameCanvasContext.font = '30px Helvetica';
  gameCanvasContext.fillText("Downloading done. Click to start", 0,250);
}

function drawPleaseWaitForLoadingMessage()
{
  drawLoadingOrSplashOrTitleScreenBackground();
  gameCanvasContext.fillStyle = 'lime';
  gameCanvasContext.font = '30px Helvetica';
  gameCanvasContext.fillText("The game is downloading. Please Wait.", 0,50);
}

function handleDualPurposeSplashAndLoadingSceneClick()
{
  playerShouldSeeDualPurposeLoadingSplashScreen = false;
  playerShouldSeeTitleScreen = true;
  setSourcesForAudioObjects();
  populateMultisoundArrays();
  playARandomSoundInAMultisoundArray(arrayOfUIButtonSounds);
  //setInterval(updateGameFrame, frameRate);
  gameInterval.start();
}
