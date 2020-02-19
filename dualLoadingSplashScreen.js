function LoadingAndSplashScreen()
{
  this.handleClickWhileLoading = function()
  {
    return;
  }

  this.handleClickAfterLoading = function()
  {
    fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.titleScreenStatus);
    console.log('game recognizes click after loading');
    setSourcesForAudioObjects();
    populateMultisoundArrays();
    playARandomSoundInAMultisoundArray(arrayOfUIButtonSounds);
    //setInterval(updateGameFrame, frameRate);
    playerShouldSeePleaseWaitForDownloading = false;
    initializePromptAndAnswerObjects();


    currentBackgroundMusic = titleScreenMusic;
    currentBackgroundMusic.play();
    currentBackgroundMusic.loop = true;
    gameInterval.start();

    if (gameIsOnAServerAndCanUseWebAudioAPI)
    {
      initializeWebAudioAPI();
    }

    promptersManager.instantiatePrompters();
  }
}

let loadingAndSplashScreen = new LoadingAndSplashScreen();

function promptPlayerForClickAfterLoading()
{
  drawLoadingOrSplashOrTitleScreenBackground();
  // gameCanvasContext.fillStyle = 'lime';
  // gameCanvasContext.font = '30px Helvetica';
  // gameCanvasContext.fillText("Downloading done. Click to start", 0,250);
  //
  let sentenceArray1 = ['Downloading done', symbolPeriodImage];
  customFontFillText(sentenceArray1, 30, 20, 150, 250);

  let sentenceArray2 = ['Click to start', symbolPeriodImage];
  customFontFillText(sentenceArray2, 30, 20, 165, 350);
}

function drawPleaseWaitForLoadingMessage()
{
  drawLoadingOrSplashOrTitleScreenBackground();
  gameCanvasContext.fillStyle = 'lime';
  gameCanvasContext.font = '30px Helvetica';
  gameCanvasContext.fillText("The game is downloading. Please Wait.", 0,50);
}
