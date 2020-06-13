function SnakeBackground()
{
  this.draw = function()
  {
    drawFromSheet('images\\Backgrounds\\Grass.png', 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage('images\\Backgrounds\\Grass.png', 0,0, gameCanvas.width,gameCanvas.height);
  }
}
