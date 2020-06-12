function TransitionToTitleScreen()
{
  console.log('transitioning to title screen, should switch states in 2 second');

  this.changeFullGameStateAfterTwoSeconds = function()
  {
    setTimeout(function()
    {
      fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.titleScreen)
    }, TITLESCREEN_TRANSITION_TIME);
  };

  this.draw = function()
  {

    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);

    fancyBG();

    customFontFillText(['Welcome to '], gameCanvas.width*0.08, gameCanvas.width*0.075,
                        gameCanvas.width/2 - gameCanvas.width*0.4,gameCanvas.height/2 - 100);
    customFontFillText(['Bundle of 30 Language Games!'], gameCanvas.width*0.075, gameCanvas.width*0.035,
                        gameCanvas.width*0.01,gameCanvas.height/2 + 50);
  }


}

let transitionToTitleScreen = new TransitionToTitleScreen();
