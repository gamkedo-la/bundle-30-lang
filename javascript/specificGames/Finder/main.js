window.onload = function()
{
  gameCanvas = document.getElementById("letterFinderCanvas");
  gameCanvas.addEventListener('click', canvasClick, false);//canvasClick is in input.js
  canvasDrawingContext = gameCanvas.getContext("2d");
  
  setInterval(gameLoop, 1000/15);
}

function gameLoop()
{
  drawEverything();
  updateEverything();
}

function drawEverything()
{
  if (titleScreen)
  {
    drawTitleScreen();
  }
  else
    {
      drawBackground();
    }
}

function drawBackground()
{
  canvasDrawingContext.fillStyle = 'black';
  canvasDrawingContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
}

function updateEverything()
{

}
