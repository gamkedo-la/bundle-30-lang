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
    genAudio.playClick();
    genAudio.playTitleMusic();

    gameInterval.start();

    promptersManager.instantiatePrompters();
    initializePromptAndAnswerObjects();
    populatePromptAndAnswerArrays();
    mandarinCustomizationScreen = new LanguageCustomizationScreen('mandarin customization screen', promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings);
    //console.log('mandarinCustomizationScreen: ' + mandarinCustomizationScreen);
    mandarinCustomizationScreen.initializePromptAndAnswerGroupCheckBoxes();
    mandarinCustomizationScreen.initializeIndividualPromptsAndAnswerCheckBoxes();
    mandarinCustomizationScreen.initializeArrayOfDivs();
    englishCustomizationScreen = new LanguageCustomizationScreen('mandarin customization screen', promptsAndAnswersManager.arrayOfLogicalEnglishPromptAnswerGroupings);
    //console.log('mandarinCustomizationScreen: ' + mandarinCustomizationScreen);
    englishCustomizationScreen.initializePromptAndAnswerGroupCheckBoxes();
    englishCustomizationScreen.initializeIndividualPromptsAndAnswerCheckBoxes();
    englishCustomizationScreen.initializeArrayOfDivs();
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
    fancyBG();
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
