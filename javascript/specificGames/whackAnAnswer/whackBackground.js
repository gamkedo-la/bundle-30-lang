function WhackBackground()
{
  this.image = whackBackgroundImage;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}
