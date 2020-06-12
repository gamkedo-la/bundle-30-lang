function LaneCarClass()
{
  this.name = 'lane car';
  this.image = 'images\\sprites\\Lane\\car.png';
  this.x = gameCanvas.width/3.25;
  this.y = gameCanvas.height - gameCanvas.height/4;

  this.width = gameCanvas.width/7;
  this.height = gameCanvas.width/4;

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }
}

function GasCanAnswerHolder(image)
{
  this.image = image;
}
