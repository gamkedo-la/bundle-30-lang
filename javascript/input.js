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
      loadingAndSplashScreen.handleClickAfterLoading();
      break;

      case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.transitionToTitleScreen:
      return;
      break;

      case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.titleScreen:
      titleScreen.handleGameCellClicks(builtInDocumentEventObject);
      break;

      case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.modeSelectScreen:
      modeSelectScreen.handlePlayButtonClick();
      modeSelectScreen.handleRadioButtonClicks();
      break;

      case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
      backButton.handleClick();//backButton.js, player goes back to menu/title screen
      break;
    }
  }//

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
		this.spaceBarIsBeingHeld = true;
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
        console.log('debug off');
      } else if (debugOn === false)
      {
        console.log('debug on');
        debugOn = true;
      }
      break;

      case 107://number pad +
      turnMasterVolumeUp();
      break;

      case 109://number pad -
      turnMasterVolumeDown();
      break;

      case 80://p
      if (fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
      {
        fullGameStateMachine.currentState = fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame;
      }
      else if (fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame)
      {
        fullGameStateMachine.currentState = fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame;
      }
    }
  }

  this.keyUp = function(builtInDocumentEventObject)
  {
    switch(builtInDocumentEventObject.keyCode)
    {
      case 37://left arrow
      this.leftArrowIsBeingHeld = false;
      switch(fullGameStateMachine.currentState)
      {
        case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
        if (gameClassManager.currentGame.handleLeftArrowUp)
        {
          gameClassManager.currentGame.handleLeftArrowUp();
        }
        else
        {
          return;
        }
      }
      break;

      case 38://up arrow
      this.upArrowIsBeingHeld = false;
      switch(fullGameStateMachine.currentState)
      {
        case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
        if (gameClassManager.currentGame.handleUpArrowUp)
        {
          gameClassManager.currentGame.handleUpArrowUp();
        }
        else
        {
          return;
        }
      }
      break;

      case 39://right arrow
      this.rightArrowIsBeingHeld = false;
      switch(fullGameStateMachine.currentState)
      {
        case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
        if (gameClassManager.currentGame.handleRightArrowUp)
        {
          gameClassManager.currentGame.handleRightArrowUp();
        }
        else
        {
          return;
        }
      }
      break;

      case 40://down arrow
      this.downArrowIsBeingHeld = false;
      switch(fullGameStateMachine.currentState)
      {
        case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
        if (gameClassManager.currentGame.handleDownArrowUp)
        {
          gameClassManager.currentGame.handleDownArrowUp();
        }
        else
        {
          return;
        }
      }
      break;

      case 32://spacebar
      this.spaceBarIsBeingHeld = false;
      switch(fullGameStateMachine.currentState)
      {
        case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
        if (gameClassManager.currentGame.handleSpaceBarUp)
        {
          gameClassManager.currentGame.handleSpaceBarUp();
        }
        else
        {
          return;
        }
      }
      break;
    }
  }
}

let inputManager = new InputManager();

var playerShouldBePlayingFinder = false;
var playerShouldBePlayingCatcher = false;
