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
    gameCanvasContext.globalAlpha = 0;
    transitionIsFadingIn = true;
    if (gameClassManager.currentGame && // this can sometimes be null
        gameClassManager.currentGame.drawTransitionText)
    {
      this.drawTransitionText = gameClassManager.currentGame.drawTransitionText;
    }
    else
    {
      this.drawTransitionText = (function () {
        customFontFillText(['placeholder transition text'], 30, 15, 50,300);
      });
    }
  }

  this.drawTransitionText = undefined;
}

let miniGameTransitioner = new MiniGameTransitioner();
