function LoadingAndSplashScreen()
{
  this.handleClickWhileLoading = function()
  {
    return;
  }

  this.handleClickAfterLoading = function()
  {
    fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.transitionToTitleScreen);
    transitionToTitleScreen.changeFullGameStateAfterTwoSeconds();
    // audioManager.initialize();
    // audioManager.multisoundPlayer.populateMultisoundArrays();
    // audioManager.multisoundPlayer.playARandomSoundInAMultisoundArray(audioManager.multisoundPlayer.arrayOfUIButtonSounds);
    // audioManager.currentBackgroundMusic = audioManager.titleScreenMusic;
    // audioManager.currentBackgroundMusic.play();
    // audioManager.currentBackgroundMusic.volume = 0;// for meetings
    // audioManager.currentBackgroundMusic.loop = true;
    genAudio.playClick();
    genAudio.playTitleMusic();

    gameInterval.start();

    if (gameIsOnAServerAndCanUseWebAudioAPI)
    {
      initializeWebAudioAPI();
    }

    promptersManager.instantiatePrompters();
    initializePromptAndAnswerObjects();
    populatePromptAndAnswerArrays();
  }

  this.promptPlayerForClickAfterLoading = function()
  {
    this.drawLoadingOrSplashOrTitleScreenBackground();

    let sentenceArray1 = ['Downloading done', symbolPeriodImage];
    customFontFillText(sentenceArray1, 30, 20, 150, 250);

    let sentenceArray2 = ['Click to start', symbolPeriodImage];
    customFontFillText(sentenceArray2, 30, 20, 165, 350);
  }

  this.draw = function()
  {
    if (fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.loading)
    {
      this.drawLoadingOrSplashOrTitleScreenBackground();
      this.drawPleaseWaitForLoadingMessage();
    }
    else if (fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.clickToLaunch)
    {
      this.promptPlayerForClickAfterLoading();
    }
  }

  this.drawLoadingOrSplashOrTitleScreenBackground = function()
  {
    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
  }

  this.drawPleaseWaitForLoadingMessage = function()
  {
    this.drawLoadingOrSplashOrTitleScreenBackground();
    gameCanvasContext.fillStyle = 'lime';
    gameCanvasContext.font = '30px Helvetica';
    gameCanvasContext.fillText("The game is downloading. Please Wait.", 0,50);
  }
}

let loadingAndSplashScreen = new LoadingAndSplashScreen();
