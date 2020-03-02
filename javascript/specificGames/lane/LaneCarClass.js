function LaneCarClass()
{
  this.name = 'lane car';
  this.x = gameCanvas.width/3;
  this.y = gameCanvas.height - gameCanvas.height/8;

  this.width = gameCanvas.width/20;
  this.height = gameCanvas.width/10;

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'blue';
	  gameCanvasContext.fillRect(this.x,this.y, this.width,this.height);
  }
}
