function InputManager()
{
  this.gameCanvasClick = function(builtInDocumentEventObject)
  {
    switch(fullGameStateMachine.currentState)
    {
      case  fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.loading:
      console.log('game is still loading, nothing should happen');
      return;
      break;

      case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.clickToLaunch:
      fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.transitionToTitleScreen);
      loadingAndSplashScreen.handleClickAfterLoading();
      break;

      case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.transitionToTitleScreen:
      return;
      break;

      case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.titleScreen:
      titleScreen.handleGameCellClicks(builtInDocumentEventObject);
      break;

      case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
      backButton.handleClick();//backButton.js, player goes back to menu/title screen
      break;
    }
  }

  this.mouseCoordinates = {x:undefined,y:undefined};

  this.calculateMousePosition = function(builtInDocumentEventObject)
  {
    var rect = gameCanvas.getBoundingClientRect();
    var root = document.documentElement;
    var x = builtInDocumentEventObject.clientX - rect.left - root.scrollLeft;
    var y = builtInDocumentEventObject.clientY - rect.top - root.scrollTop;
    inputManager.mouseCoordinates.x = x;
    inputManager.mouseCoordinates.y = y;
  }

  this.leftArrowIsBeingHeld = false;
  this.rightArrowIsBeingHeld = false;
  this.downArrowIsBeingHeld = false;
  this.upArrowIsBeingHeld = false;
  this.spaceBarIsBeingHeld = false;

  this.keyDown = function(builtInDocumentEventObject)
  {
      builtInDocumentEventObject.preventDefault();
      switch(builtInDocumentEventObject.keyCode)
      {
        case 37://left arrow
        this.leftArrowIsBeingHeld = true;
        switch(fullGameStateMachine.currentState)
        {
          case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
          if (gameClassManager.currentGame.handleLeftArrowDown)
          {
            gameClassManager.currentGame.handleLeftArrowDown();
          }
          else
          {
            return;
          }
        }
        break;

        case 38://up arrow
        this.upArrowIsBeingHeld = true;
        switch(fullGameStateMachine.currentState)
        {
          case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
          if (gameClassManager.currentGame.handleUpArrowDown)
          {
            gameClassManager.currentGame.handleUpArrowDown();
          }
        }
        break;

        case 39://right arrow
        this.rightArrowIsBeingHeld = true;
        switch(fullGameStateMachine.currentState)
        {
          case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
          if (gameClassManager.currentGame.handleRightArrowDown)
          {
            gameClassManager.currentGame.handleRightArrowDown();
          }
        }
        break;

        case 40://down arrow
        this.downArrowIsBeingHeld = true;
        switch(fullGameStateMachine.currentState)
        {
          case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
          if (gameClassManager.currentGame.handleDownArrowDown)
          {
            gameClassManager.currentGame.handleDownArrowDown();
          }
        }
        break;


      case 32://spacebar
      switch(fullGameStateMachine.currentState)
      {
        case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
        if (gameClassManager.currentGame.handleSpaceBarDown)
        {
          gameClassManager.currentGame.handleSpaceBarDown();
        }
      }
      break;

      case 68://d
      if (debugOn === true)
      {
        debugOn = false;
      } else if (debugOn === false)
      {
        debugOn = true;
      }
      break;

      case 107://number pad +
      turnMasterVolumeUp();
      break;

      case 109://number pad -
      turnMasterVolumeDown();
      break;
    }
  }

  this.handleKeyUp = function(builtInDocumentEventObject)
  {
    switch(builtInDocumentEventObject.keyCode)
    {
      case 37://left arrow
      this.leftArrowIsBeingHeld = false;
      break;

      case 38://up arrow
      this.upArrowIsBeingHeld = false;
      break;

      case 39://right arrow
      this.rightArrowIsBeingHeld = false;
      break;

      case 40://down arrow
      this.downArrowIsBeingHeld = false;
      break;

      case 32://spacebar
      this.spaceBarIsBeingHeld = false;
      break;
    }
  }
}

let inputManager = new InputManager();

var playerShouldBePlayingFinder = false;
var playerShouldBePlayingCatcher = false;
