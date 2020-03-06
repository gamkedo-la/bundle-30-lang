function SnakeBackground()
{
  this.draw = function()
  {
    gameCanvasContext.drawImage(snakeGrassBackground, 0,0, gameCanvas.width,gameCanvas.height);
  }
}
