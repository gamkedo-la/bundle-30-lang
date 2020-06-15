// normal, two second long transitions
var TRANSITION_SPEED_MULTIPLIER = 1;
var TITLESCREEN_TRANSITION_TIME = 2000;

const SKIP_TRANSITIONS = false; // instant, good for debugging

if (SKIP_TRANSITIONS) {
    TRANSITION_SPEED_MULTIPLIER = 10;
    TITLESCREEN_TRANSITION_TIME = 1;
    //console.log("SKIP_TRANSITIONS is true");
}

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
      transitionScreenVisualFadeLevel += 0.01 * TRANSITION_SPEED_MULTIPLIER;
      gameCanvasContext.globalAlpha = transitionScreenVisualFadeLevel;
      if (transitionScreenVisualFadeLevel > 0.9)
      {
        transitionIsFadingIn = false;
        transitionIsFadingOut = true;
      }
    } else if (transitionScreenVisualFadeLevel > 0 && transitionIsFadingOut)
    {
      transitionScreenVisualFadeLevel -= 0.01 * TRANSITION_SPEED_MULTIPLIER;
      gameCanvasContext.globalAlpha = transitionScreenVisualFadeLevel;
    }

    //background
    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, 640,700);
    fancyBG();

    //text
    this.drawTransitionText();

    if (SKIP_TRANSITIONS) {
        //console.log("Skipping transition!");
        transitionIsFadingIn = false;
        transitionIsFadingOut = false;
        transitionScreenVisualFadeLevel = 1;
        gameCanvasContext.globalAlpha = 1;
        levelIsTransitioning = false;
    }

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
