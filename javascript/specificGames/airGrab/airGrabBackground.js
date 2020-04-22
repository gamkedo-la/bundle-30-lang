function AirGrabBackground()
{
  this.plasticLayerImage = plasticImage;
  this.topLayerImage = airBoothTopLayerImage;

  this.draw = function()
  {
    gameCanvasContext.globalAlpha = 0.3;
    gameCanvasContext.drawImage(this.plasticLayerImage, 0,0, gameCanvas.width,gameCanvas.height);
    gameCanvasContext.globalAlpha = 1;
    gameCanvasContext.drawImage(this.topLayerImage, 0,0, gameCanvas.width,gameCanvas.height);
  }
}
