var levelIsTransitioning = false;
var transitionIsFadingIn = false;
var transitionIsFadingOut = false;

function drawTransitionScreen(arraysOfGameSpecificCustomFontFillTextsForTransitionScreen)
{

  let transitionScreenVisualFadeLevel = gameCanvasContext.globalAlpha;

  if (transitionScreenVisualFadeLevel < 1 && transitionIsFadingIn)
  {
    transitionScreenVisualFadeLevel += 0.01;
    gameCanvasContext.globalAlpha = transitionScreenVisualFadeLevel;
    if (transitionScreenVisualFadeLevel > 0.9)
    {
      transitionIsFadingIn = false;
      transitionIsFadingOut = true;
    }
  } else if (transitionScreenVisualFadeLevel > 0 && transitionIsFadingOut)
  {
    transitionScreenVisualFadeLevel -= 0.01;
    gameCanvasContext.globalAlpha = transitionScreenVisualFadeLevel;
  }

  gameCanvasContext.fillStyle = 'orange';
  gameCanvasContext.fillRect(0,0, 640,700);

  console.log('SNAKE_GAME.gameIsPlaying: ' + SNAKE_GAME.gameIsPlaying);
  if (SNAKE_GAME.isTransitioningIn)
  {
    SNAKE_GAME.drawTransitionText();
  }
  else if (playerShouldBePlayingPinata)
  {
    pinataGame.drawTransitionText();
  }
  else {
    customFontFillText(['placeholder transition text'], 30, 15, 50,300);

  }
}
