function LaneCarClass()
{
  this.name = 'lane car';
  this.image = laneCarImage;
  this.x = gameCanvas.width/3.25;
  this.y = gameCanvas.height - gameCanvas.height/4;

  this.width = gameCanvas.width/7;
  this.height = gameCanvas.width/4;

  this.draw = function()
  {
    gameCanvasContext.drawImage(laneCarImage, this.x,this.y, this.width,this.height);
  }
}
