function LanguageSelectionScreen()
{
  this.draw = function()
  {
    //console.log('inside draw language select screen');
    this.drawBackground();
    this.drawHeader();
    this.drawCellsAndCheckForHighlighting();
    this.drawLanguageNames();
    this.drawPlayButton();
  }

  this.drawBackground = function()
  {
    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
    fancyBG();
  }

  this.drawHeader = function()
  {
    customFontFillText('Choose A Language', 50, 25, gameCanvas.width/2 - 150,50);
  }

  this.drawCellsAndCheckForHighlighting = function()
  {
    //basic cell outlines
    gameCanvasContext.strokeStyle = 'white';
    for (let cellRowIndex = 0; cellRowIndex < 1; cellRowIndex++)
    {
      for (let cellColumnIndex = 0; cellColumnIndex < 3; cellColumnIndex++)
      {
        this.cellXTopLeftCoordinate = cellColumnIndex*100 + 20;
        this.cellYTopLeftCoordinate = cellRowIndex*100 + 150;
        gameCanvasContext.strokeRect(this.cellXTopLeftCoordinate,this.cellYTopLeftCoordinate, 100,100);
        //highlight cell if the mouse is inside it
        if (inputManager.mouseCoordinates.x > this.cellXTopLeftCoordinate &&
            inputManager.mouseCoordinates.x < this.cellXTopLeftCoordinate + 100 &&
            inputManager.mouseCoordinates.y > this.cellYTopLeftCoordinate &&
            inputManager.mouseCoordinates.y < this.cellYTopLeftCoordinate + 100)
            {
              gameCanvasContext.fillStyle = 'white';
              gameCanvasContext.fillRect(this.cellXTopLeftCoordinate,this.cellYTopLeftCoordinate, 100,100);
            }
      }
    }
  };

  this.drawLanguageNames = function()
  {
    customFontFillText('English', 20,12, 30,180);

    customFontFillText('Simplified', 15,9, 125,165);
    customFontFillText('Chinese', 20,12, 130,195);

    customFontFillText('Central', 20,12, 230,165);
    customFontFillText('Vietnamese', 15,9, 225,200);
  }

  this.drawPlayButton = function()
  {
    let width = gameCanvas.width/4;
    let height = gameCanvas.height/7;
    let startingX = gameCanvas.width/2 - (width/2);
    let startingY = gameCanvas.height - (height*1.5);

    gameCanvasContext.strokeStyle = 'black';
    gameCanvasContext.strokeRect(startingX,startingY, width,height);
    customFontFillText('Customize', 30, 15, startingX + width/32,startingY + 35);
  }

  this.startGame = function()
  {
    genAudio.playTransitionMusic();
    gameClassManager.initializeCurrentGame();
    promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    // if (gameClassManager.currentGame) console.log("gameClassManager.currentGame: " + gameClassManager.currentGame.name);
    miniGameTransitioner.initialize();
    fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.transitionToMiniGame);

  }

  this.goToLanguageCustomizationScreen = function()
  {
    if (this.languageNum === 0)
    {
      fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.englishCustomizationScreen.associatedObject = englishCustomizationScreen;
      fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.englishCustomizationScreen);
      promptsAndAnswersManager.assignCurrentLanguageArray();
    }
    else if (this.languageNum === 1)
    {
      fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.mandarinCustomizationScreen.associatedObject = mandarinCustomizationScreen;
      fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.mandarinCustomizationScreen);
      promptsAndAnswersManager.assignCurrentLanguageArray();
    }
    else if (this.languageNum === 2)
    {
      promptsAndAnswersManager.assignCurrentLanguageArray();
      this.startGame();
    }
  }

  this.handlePlayButtonClick = function()
  {
    let width = gameCanvas.width/4;
    let height = gameCanvas.height/7;
    let startingX = gameCanvas.width/2 - (width/2);
    let startingY = gameCanvas.height - (height*1.5);

    if (inputManager.mouseCoordinates.x > startingX && inputManager.mouseCoordinates.x < startingX + width &&
        inputManager.mouseCoordinates.y > startingY && inputManager.mouseCoordinates.y < startingY + height &&
        this.languageNum >= 0)
        {

          genAudio.playClick();

          if (isLanguageCustomizationActive)
          {

            this.goToLanguageCustomizationScreen();
          }
          else
          {

            this.startGame();
          }
        }
  }

  this.languageNum = -1;

  this.handleLanguageCellClicks = function()
  {

    // TODO: all the x,y,w,h are stored in GAME_NAMES
    // we could use that data and avoid the giant IF and hardcoded values here

    //console.log("MAIN MENU mouse pos is "+inputManager.mouseCoordinates.x+"," +inputManager.mouseCoordinates.y);

    var mouseCol = Math.floor((inputManager.mouseCoordinates.x - 20)/100);
    var mouseRow = Math.floor((inputManager.mouseCoordinates.y - 150)/100);
    if (mouseCol >= 0 && mouseCol < 3 && mouseRow >= 0 && mouseRow < 1)
    {
      this.languageNum = mouseCol + mouseRow *6;
      //promptsAndAnswersManager.assignCurrentLanguageArray();
      genAudio.playClick();
    }
  }
}

let languageSelectionScreen;
