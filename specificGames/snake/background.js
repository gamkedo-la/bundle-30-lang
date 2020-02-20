function SnakeBackground()
{
  this.color = 'brown';
  this.draw = function()
  {
    gameCanvasContext.fillStyle = this.color;
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
  }
}
