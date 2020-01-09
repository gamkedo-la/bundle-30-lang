var levelIsTransitioning = false;
var transitionIsFadingIn = false;
var transitionIsFadingOut = false;

function drawTransitionScreen(specificTransitionScreenText)
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

  //customFontFillText(string, fontSize, spacing, xCoordinate,yCoordinate)
  customFontFillText('Awesometastical Placeholder', 20, 15, 0,310);
  customFontFillText('Transition Screen...', 20, 15, 0,350);
  customFontFillText('Woooooaaaahhh!!!', 20, 15, 0, 390);
}

const transitionToSnakeTextLine1 = 'Eat the answer!';
const transitionToSnakeTextLine2 = '';
