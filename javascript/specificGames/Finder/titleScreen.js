let titleScreen = true;

function drawTitleScreen()
{
  drawBackground();
  canvasDrawingContext.fillStyle = 'green';
  canvasDrawingContext.font = '30px Helvetica';
  canvasDrawingContext.fillText("Letter Finder", gameCanvas.width/2 - 50,gameCanvas.height/2 - 50);
  canvasDrawingContext.fillText("Click to play", gameCanvas.width/2 - 50,gameCanvas.height/2 + 50);
}
