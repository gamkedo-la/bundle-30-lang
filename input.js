function InputManager()
{
  this.gameCanvasClick = function(builtInDocumentEventObject)
  {
    switch(fullGameStateMachine.currentState)
    {
      case  fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.loading:
      return;
      break;

      case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.clickToLaunch:
      fullGameStateMachine.loadCurrentState.(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.transitionToTitleScreen);
      break;

      case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.transitionToTitleScreen:
      return;
      break;

      case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.titleScreen:
      titleScreen.handleGameCellClicks(builtInDocumentEventObject);
      fullGameStateMachine.loadCurrentState.(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame);
      break;

      case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
      handleBackButtonClick();//backButton.js, player goes back to menu/title screen
      break;
    }
  }

  this.mouseCoordinates = {mouseX:undefined,mouseY:undefined};

  this.calculateMousePosition = function(builtInDocumentEventObject)
  {
    var rect = gameCanvas.getBoundingClientRect();
    var root = document.documentElement;
    var x = builtInDocumentEventObject.clientX - rect.left - root.scrollLeft;
    var y = builtInDocumentEventObject.clientY - rect.top - root.scrollTop;
    this.mouseCoordinates.mouseX = x;
    this.mouseCoordinates.mouseY = y;
  }

  this.leftArrowIsBeingHeld = false;
  this.rightArrowIsBeingHeld = false;
  this.downArrowIsBeingHeld = false;
  this.upArrowIsBeingHeld = false;

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

      case 38://up arrow
      this.upArrowIsBeingHeld = true;
      switch(fullGameStateMachine.currentState)
      {
        case fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame:
        if (gameClassManager.currentGame.handleRightArrowDown)
        {
          gameClassManager.currentGame.handleRightArrowDown();
        }
        else
        {
          return;
        }
        else if (jumperGame.isPlaying())
        {

        }
        break;

        case 39://right arrow
        rightArrowIsBeingHeld = true;
        if (SNAKE_GAME.isPlaying())
        {
          playerSpeedX = 20;
          playerSpeedY = 0;
        }  else if (birdGame.isPlaying())
        {

        } else if (laneGame.isPlaying())
        {
          if (playerXCoordinate !== 380)
          {
            playerXCoordinate = 380;
          }
        }
        break;

        case 40://down arrow
        downArrowIsBeingHeld = true;
        if (SNAKE_GAME.isPlaying())
        {
          playerSpeedX = 0;
          playerSpeedY = 20;
        } else if (jumperGame.isPlaying())
        {
          playerYCoordinate += 100;
          if (playerYCoordinate > 700)//if the player goes below the screen
          {
            playerYCoordinate = 30;//put them at the top platform
          }
        }

      }

      break;

      case 32://spacebar
        if (birdGame.isPlaying())
        {
  		birdGame.onSpaceBarKeyDown();
        } else if (jumperGame.isPlaying())
        {
          jumperGame.onSpaceBarKeyDown();
        } else if (spaceShooterGame.isPlaying())
        {
          arrayOfBullets.push({x:playerXCoordinate,y:playerYCoordinate});
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
}

let inputManager = new InputManager();

var playerShouldBePlayingFinder = false;
var playerShouldBePlayingCatcher = false;

var frameRate = 1000/30;

function keyDown(builtInDocumentEventObject)
{

}

function keyUp(builtInDocumentEventObject)
{

  switch(builtInDocumentEventObject.keyCode)
  {
    case 37://left arrow
    leftArrowIsBeingHeld = false;
    if (birdGame.isPlaying())
    {

    }
    break;

    case 38://up arrow
    upArrowIsBeingHeld = false;
    break;

    case 39://right arrow
    rightArrowIsBeingHeld = false;
    if (birdGame.isPlaying())
    {
      rightArrowDown = false;
    }
    break;

    case 40://down arrow
    downArrowIsBeingHeld = false;
    break;
  }
}
