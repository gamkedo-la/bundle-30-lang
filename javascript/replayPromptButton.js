function ReplayPromptButton()
{
  this.x = 0;
  this.y = gameCanvas.height - gameCanvas.height/12;

  this.width = gameCanvas.width/6;
  this.height = gameCanvas.height/12;

  this.draw = function()
  {
    if (fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame)
    {
      //rectangle
      gameCanvasContext.fillStyle = gameClassManager.currentGame.backButtonColor;
      gameCanvasContext.fillRect(this.x,this.y, this.width,this.height);

      //text
      //gameCanvasContext.fillStyle = gameClassManager.currentGame.backButtonTextColor;
      customFontFillText('Replay', 23, 15, 0,642);
      customFontFillText('Prompt', 23, 15, 0,670);
    }
  }

  this.insideClickCoordinates = function()
  {
    return (inputManager.mouseCoordinates.x > this.x && inputManager.mouseCoordinates.x < gameCanvas.width &&
        inputManager.mouseCoordinates.y > this.y && inputManager.mouseCoordinates.y < gameCanvas.height)
  }

  this.handleClick = function()
  {
    if (inputManager.mouseCoordinates.x > this.x && inputManager.mouseCoordinates.x < gameCanvas.width &&
        inputManager.mouseCoordinates.y > this.y && inputManager.mouseCoordinates.y < gameCanvas.height)
        {
          if (gameClassManager.currentGame.name === 'hello world game')
          {
            gameClassManager.currentGame.conversationAudioManager.promptAudio.play();
            gameClassManager.currentGame.NPCSpeechBubble.isBeingHeard = true;
          }
          else if (gameClassManager.currentGame.name === 'hello world 2 game')
          {
            gameClassManager.currentGame.imagePrompter.currentWidth = 150;
            gameClassManager.currentGame.imagePrompter.currentHeight = 150;
            gameClassManager.currentGame.imagePrompter.promptThePlayer();
          }
          else
          {
            promptersManager.currentPrompter.currentWidth = 150;
            promptersManager.currentPrompter.currentHeight = 150;
            promptersManager.promptThePlayer();
          }
        }
  }
}
