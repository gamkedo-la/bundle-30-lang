function WhackBackground()
{
  this.draw = function()
  {
    gameCanvasContext.drawImage(whackTableBeneathSurface, 0,0, gameCanvas.width,gameCanvas.height);
    gameCanvasContext.drawImage(whackTableSurface, 0,0, gameCanvas.width,gameCanvas.height);
  }
}
