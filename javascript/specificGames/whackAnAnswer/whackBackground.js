function WhackBackground()
{
  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
    gameCanvasContext.drawImage(whackTableBeneathSurface, 0,0, gameCanvas.width,gameCanvas.height);
    gameCanvasContext.drawImage(whackTableSurface, 0,0, gameCanvas.width,gameCanvas.height);
  }
}
