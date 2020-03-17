function FrogRiverBackground()
{
  this.image = frogRiverBackgroundImage;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}



function initializeOrResetLilyPads()
{
  
}

function drawLilyPads()
{
  for (let arrayOfLilyPadsIndex = 0; arrayOfLilyPadsIndex < arrayOfLilyPads.length; arrayOfLilyPadsIndex++)
  {
    arrayOfLilyPads[arrayOfLilyPadsIndex].draw();
  }
}

function moveLilyPads()
{
  for (let arrayOfLilyPadsIndex = 0; arrayOfLilyPadsIndex < arrayOfLilyPads.length; arrayOfLilyPadsIndex++)
  {
    arrayOfLilyPads[arrayOfLilyPadsIndex].move();
  }
}

function handleOffScreenLilyPads()
{
  for (let arrayOfLilyPadsIndex = 0; arrayOfLilyPadsIndex < arrayOfLilyPads.length; arrayOfLilyPadsIndex++)
  {
    arrayOfLilyPads[arrayOfLilyPadsIndex].handleOffScreen();
  }
}
