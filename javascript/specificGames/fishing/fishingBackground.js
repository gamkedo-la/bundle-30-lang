const WATER_HEIGHT = 210;

function FishingBackground()
{
  this.waterImage = 'images\\Backgrounds\\underwater2.png';
  this.skyImage = 'images\\Backgrounds\\runnerSunAndSky.png';
  this.draw = function()
  {
    drawFromSheet(this.skyImage, 0,0, gameCanvas.width,gameCanvas.height*0.3);
    drawFromSheet(this.waterImage, 0,gameCanvas.height*0.3, gameCanvas.width,gameCanvas.height*0.7);
    //gameCanvasContext.drawImage(this.skyImage, 0,0, gameCanvas.width,gameCanvas.height*0.3);
    //gameCanvasContext.drawImage(this.waterImage, 0,gameCanvas.height*0.3, gameCanvas.width,gameCanvas.height*0.7);
  }
}
