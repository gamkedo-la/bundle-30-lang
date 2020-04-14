function TransitionToTitleScreen()
{
  console.log('transitioning to title screen, should switch states in 2 second');

  this.changeFullGameStateAfterTwoSeconds = function()
  {
    setTimeout(function()
    {
      fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.titleScreen)
    }, 2000);
  };

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);

    fancyBG();

    customFontFillText(['Placeholder transition text'], 30, 15,
                        0,gameCanvas.height/2);
    customFontFillText(['to title screen'], 30, 15,
                        0,gameCanvas.height/2 + 35);
  }

}

let transitionToTitleScreen = new TransitionToTitleScreen();
