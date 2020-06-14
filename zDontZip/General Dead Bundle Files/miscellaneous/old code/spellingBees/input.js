function InputManager()
{

  this.leftArrowIsBeingHeld = false;
  this.upArrowIsBeingHeld = false;
  this.rightArrowIsBeingHeld = false;
  this.downArrowIsBeingHeld = false;

  this.handlePlayerKeyDowns = function(builtInDocumentEventObject)
  {

    if (builtInDocumentEventObject !== undefined)
    {
      switch(builtInDocumentEventObject.keyCode)
      {
        case 37://left arrow
          spellingBeesGame.inputManager.leftArrowIsBeingHeld = true;
        break;

        case 38://up arrow
          spellingBeesGame.inputManager.upArrowIsBeingHeld = true;
        break;

        case 39://right arrow
          spellingBeesGame.inputManager.rightArrowIsBeingHeld = true;
        break;

        case 40://down arrow
          spellingBeesGame.inputManager.downArrowIsBeingHeld = true;
        break;

        case 80://p
          spellingBeesGame.pauseButton.toggleEngagement();
        break;
      }
    }
  }

  this.handlePlayerKeyUps = function(builtInDocumentEventObject)
  {
    if (builtInDocumentEventObject !== undefined)
    {
      switch(builtInDocumentEventObject.keyCode)
      {
        case 37://left arrow
          spellingBeesGame.inputManager.leftArrowIsBeingHeld = false;
        break;

        case 38://up arrow
          spellingBeesGame.inputManager.upArrowIsBeingHeld = false;
        break;

        case 39://right arrow
          spellingBeesGame.inputManager.rightArrowIsBeingHeld = false;
        break;

        case 40://down arrow
          spellingBeesGame.inputManager.downArrowIsBeingHeld = false;
        break;
      }
    }
  }

  this.handleCanvasClick = function()
  {
    spellingBeesGame.splashScreen.shouldBeSplashing = false;
    spellingBeesGame.audioPrompter.promptThePlayer();
  }
}

spellingBeesGame.inputManager = new InputManager();
