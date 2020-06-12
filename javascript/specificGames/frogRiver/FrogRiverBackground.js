function FrogRiverBackground()
{
  this.image = "images\\Backgrounds\\river.png";

  this.draw = function()
  {
    drawFromSheet(this.image, 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
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
