var levelIsTransitioning = false;
var transitionIsFadingIn = false;
var transitionIsFadingOut = false;

function MiniGameTransitioner()
{
  this.draw = function()
  {
    //fade stuff
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

    //background
    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, 640,700);

    //text
    this.drawTransitionText();
  }

  this.initialize = function()
  {
    console.log('before global alpha');
    gameCanvasContext.globalAlpha = 0;
    console.log('after global alpha');
    if (gameClassManager.currentGame.drawTransitionText)
    {
      this.drawTransitionText = gameClassManager.currentGame.drawTransitionText();
    }
    else
    {
      this.drawTransitionText = customFontFillText(['placeholder transition text'], 30, 15, 50,300);
    }
  }

  this.drawTransitionText = undefined;
}

let miniGameTransitioner = new MiniGameTransitioner();
