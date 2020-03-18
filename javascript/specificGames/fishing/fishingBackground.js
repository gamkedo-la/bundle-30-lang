function FishingBackground()
{
  this.waterImage = fishingGameWaterBackgroundImage;
  this.skyImage = skyBackground;
  this.draw = function()
  {
    gameCanvasContext.drawImage(this.skyImage, 0,0, gameCanvas.width,gameCanvas.height*0.3);
    gameCanvasContext.drawImage(this.waterImage, 0,gameCanvas.height*0.3, gameCanvas.width,gameCanvas.height*0.7);
  }
}
